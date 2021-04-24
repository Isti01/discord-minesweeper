import { BotCommand } from '@command/bot-command';
import { BotAction } from '@action/bot-action';
import { GotoAction } from '@action/actions/goto-action';
import { resolveOffsetText } from '@game/position';

@BotCommand.Command
class GotoCommand extends BotCommand {
  public constructor() {
    super(/^goto\s*(\w\d+)\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    return new GotoAction(resolveOffsetText(args[1]), true);
  }
}
