import { BotCommand } from '../index';
import { BotAction, DisplayAction } from '@action/index';

@BotCommand.Command
class DisplayCommand extends BotCommand {
  constructor() {
    super(/(display|d)\s*/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    return new DisplayAction();
  }
}
