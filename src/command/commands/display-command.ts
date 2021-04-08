import { BotCommand } from '../index';
import { DisplayAction, BotAction } from '@action/index';

@BotCommand.Command
class DisplayCommand extends BotCommand {
  constructor() {
    super(/show\s*/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    return new DisplayAction();
  }
}
