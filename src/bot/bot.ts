import { Client, TextChannel, User } from 'discord.js';
import { GameAction } from '@bot/game-action/game-action';

const defaultPrefix = '$';

export abstract class Bot {
  protected readonly bot = new Client();
  protected states = new Map<string, { prefix?: string }>();

  protected constructor(token?: string) {
    this.listen();
    this.bot.login(token).then(() => console.log('Logged In'));
  }

  protected listen() {
    this.bot.on('message', async ({ content, channel, author }) => {
      if (author.id === this.bot.user?.id || !(channel instanceof TextChannel))
        return;

      const prefix = this.states.get(channel.id)?.prefix || defaultPrefix;
      if (!content.startsWith(prefix)) return;

      const command = content.substr(prefix.length).toLowerCase();
      const action = this.processCommand(command);

      return this.processAction(action, channel, author);
    });
  }

  protected abstract processCommand(commandText: string): GameAction;

  protected abstract processAction(
    action: GameAction,
    channel: TextChannel,
    author: User
  ): Promise<void>;
}
