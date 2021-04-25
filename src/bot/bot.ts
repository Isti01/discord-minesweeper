import {
  Client,
  GuildEmoji,
  Message,
  MessageReaction,
  PartialUser,
  ReactionEmoji,
  TextChannel,
  User,
} from 'discord.js';
import { ChannelState } from '@bot/channel-state';
import { botCommands } from '@command/index';
import { BotAction, MessageAction, NoopAction } from '@action/index';
import { GameReaction } from '@reaction/index';
import '@command/commands'; // To create the command classes and run the decorators
import '@reaction/reactions';
import { deepClone } from '@util/deep-clone';
import { BotPersistence } from '@bot/bot-persistence'; // To create the reaction classes and run the decorators

const defaultPrefix = '$';

export class Bot {
  protected readonly bot = new Client();
  protected readonly state = new BotPersistence('./channel-states');

  public constructor(token?: string) {
    this.listen();
    this.init(token).then(() =>
      console.log('The bot initialized successfully')
    );
  }

  async init(token?: string) {
    await this.state.init();
    console.log('Loaded previous states');

    await this.bot.login(token);
  }

  protected async onMessage({ content, channel, author }: Message) {
    if (author.id === this.bot.user?.id || !(channel instanceof TextChannel))
      return;

    const prefix = this.state.get(channel.id)?.prefix || defaultPrefix;
    if (!content.startsWith(prefix)) return;

    const command = content.substr(prefix.length).toLowerCase();
    const action = this.processCommand(command);

    return this.processAction(action, channel, author);
  }

  protected async onEmoji(
    { emoji, message }: MessageReaction,
    author: User | PartialUser
  ) {
    if (author.id == this.bot.user?.id) return;

    const channel = message.channel;
    if (!(channel instanceof TextChannel) || !(author instanceof User)) return;

    const state = this.state.get(channel.id);
    if (!state || !state.game || !state.gameMessage) return;
    if (state.gameMessage.id != message.id) return;

    const action = this.processEmoji(emoji);

    return action.execute({
      state: state,
      channel: channel,
      author: author,
    });
  }

  protected listen() {
    this.bot.on('message', this.onMessage.bind(this));
    this.bot.on('messageReactionAdd', this.onEmoji.bind(this));
    this.bot.on('messageReactionRemove', this.onEmoji.bind(this));
  }

  protected processEmoji(emoji: GuildEmoji | ReactionEmoji): BotAction {
    for (const reaction of GameReaction.Reactions) {
      if (reaction.matchesEmoji(emoji)) {
        return reaction.process(emoji);
      }
    }

    return new NoopAction();
  }

  protected async processAction(
    action: BotAction,
    channel: TextChannel,
    author: User
  ) {
    let state: ChannelState | undefined = this.state.get(channel.id);
    if (state === undefined) {
      state = { stepSize: 1 };
      this.state.set(channel.id, state);
    }

    const oldState = deepClone(state);

    await action.execute({ channel, author, state });

    return this.state.updateIfChanged(oldState, channel.id);
  }

  protected processCommand(commandText: string): BotAction {
    for (const command of botCommands) {
      const action = command.processCommand(commandText);

      if (action !== null) return action;
    }

    return new MessageAction('Command Not Found');
  }
}
