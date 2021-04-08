import { GameCommand } from '../index';
import { GameAction, MessageAction } from '@action/index';

@GameCommand.Command
class HelpCommand extends GameCommand {
  constructor() {
    super(/^help\s*$/);
  }

  protected process(args: RegExpMatchArray): GameAction {
    return new MessageAction('help //todo lol');
  }
}
