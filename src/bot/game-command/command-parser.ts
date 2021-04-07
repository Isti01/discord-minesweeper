import { gameCommands } from './index';
import { GameAction } from '@bot/game-action';
import { MessageAction } from '@bot/game-action/actions/message-action';
import './commands'; // To create the classes

export class CommandParser {
  static readonly instance = new CommandParser();

  protected constructor() {}

  public parseCommand(commandText: string): GameAction {
    for (const command of gameCommands) {
      const action = command.processCommand(commandText);

      if (action !== null) return action;
    }

    return new MessageAction('Command Not Found');
  }
}
