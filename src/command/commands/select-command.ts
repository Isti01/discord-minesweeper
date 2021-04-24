import { BotCommand } from '@command/bot-command';
import { BotAction } from '@action/bot-action';
import { resolveOffsetText } from '@game/position';
import { SelectAction } from '@action/actions';

@BotCommand.Command
class SelectCommand extends BotCommand {
  constructor() {
    super(/^(select|s)\s*(\w\s*\d+)?\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    const offsetText = args[2]?.replaceAll(' ', '');
    const offset = offsetText ? resolveOffsetText(offsetText) : undefined;

    return new SelectAction(offset);
  }
}
