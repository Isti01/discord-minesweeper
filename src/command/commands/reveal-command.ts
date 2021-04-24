import { BotCommand } from '@command/bot-command';
import { BotAction } from '@action/bot-action';
import { resolveOffsetText } from '@game/position';
import { RevealAction } from '@action/actions';

@BotCommand.Command
class RevealCommand extends BotCommand {
  constructor() {
    super(/^(select|s)\s*(\w\s*\d+)?\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    const offsetText = args[2]?.replaceAll(' ', '');
    const offset = offsetText ? resolveOffsetText(offsetText) : undefined;

    return new RevealAction(offset);
  }
}
