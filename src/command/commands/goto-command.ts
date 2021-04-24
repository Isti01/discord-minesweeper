import { BotCommand } from '@command/bot-command';
import { BotAction } from '@action/bot-action';
import { resolveOffsetText } from '@game/position';
import { GotoAction } from '@action/actions';

@BotCommand.Command
class GotoCommand extends BotCommand {
  public constructor() {
    super(/^goto\s*(\w\d+)\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    return new GotoAction(resolveOffsetText(args[1]), true);
  }
}
