import { Bot } from '@bot/bot';
import { GameAction } from '@bot/game-action/game-action';
import { TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';
import { gameCommands } from '@bot/game-command';
import { MessageAction } from '@bot/game-action';
import './game-command/commands'; // To create command the classes and run the decorators

export class GameBot extends Bot {
  protected states = new Map<string, ChannelState>();

  constructor(token?: string) {
    super(token);
  }

  protected processAction(
    action: GameAction,
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

  protected processCommand(commandText: string): GameAction {
    for (const command of gameCommands) {
      const action = command.processCommand(commandText);

      if (action !== null) return action;
    }

    return new MessageAction('Command Not Found');
  }
}
