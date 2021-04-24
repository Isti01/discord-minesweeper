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
import '@reaction/reactions'; // To create the reaction classes and run the decorators

const defaultPrefix = '$';

export class Bot {
  protected login: Promise<any>;
  protected readonly bot = new Client();
  protected states = new Map<string, ChannelState>();

  public constructor(token?: string) {
    this.listen();
    this.login = this.bot.login(token).then(() => console.log('Logged In'));
  }

  protected async onMessage({ content, channel, author }: Message) {
    if (author.id === this.bot.user?.id || !(channel instanceof TextChannel))
      return;

    const prefix = this.states.get(channel.id)?.prefix || defaultPrefix;
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

    const state = this.states.get(channel.id);
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

  protected processAction(
    action: BotAction,
    channel: TextChannel,
    author: User
  ) {
    let state: ChannelState | undefined = this.states.get(channel.id);
    if (state === undefined) {
      state = { stepSize: 1 };
      this.states.set(channel.id, state);
    }

    return action.execute({ channel, author, state });
  }

  protected processCommand(commandText: string): BotAction {
    for (const command of botCommands) {
      const action = command.processCommand(commandText);

      if (action !== null) return action;
    }

    return new MessageAction('Command Not Found');
  }
}
