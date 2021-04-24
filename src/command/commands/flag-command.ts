import { BotCommand } from '@command/bot-command';
import { BotAction } from '@action/bot-action';
import { resolveOffsetText } from '@game/position';
import { FlagAction } from '@action/actions';

@BotCommand.Command
export class FlagCommand extends BotCommand {
  constructor() {
    super(/^(flag|f)\s*(\w\s*\d+)?\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    const offsetText = args[2]?.replaceAll(' ', '');
    const offset = offsetText ? resolveOffsetText(offsetText) : undefined;

    return new FlagAction(offset);
  }
}
