import { BotCommand } from '../index';
import { BotAction, MessageAction } from '@action/index';

@BotCommand.Command
class HelpCommand extends BotCommand {
  constructor() {
    super(/^help\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    return new MessageAction('help //todo lol');
  }
}
