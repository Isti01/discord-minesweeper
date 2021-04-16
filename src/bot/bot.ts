import {
  Client,
  Message,
  MessageReaction,
  PartialUser,
  TextChannel,
  User,
} from 'discord.js';
import { ChannelState } from '@bot/channel-state';
import { botCommands } from '@command/index';
import { BotAction, MessageAction } from '@action/index';
import '@command/commands'; // To create the command classes and run the decorators

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
    if (author.id === this.bot.user?.id) return;

    switch (emoji.name) {
      case '➡':
        console.log('right');
    }

    console.log(emoji.name, emoji.identifier);

    console.log('On Emoji');
  }

  protected listen() {
    this.bot.on('message', this.onMessage.bind(this));
    this.bot.on('messageReactionAdd', this.onEmoji.bind(this));
    this.bot.on('messageReactionRemove', this.onEmoji.bind(this));
  }

  protected processAction(
    action: BotAction,
    channel: TextChannel,
    author: User
  ) {
    let state: ChannelState | undefined = this.states.get(channel.id);
    if (state === undefined) {
      state = {};
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
