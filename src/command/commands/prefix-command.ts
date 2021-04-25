import { BotCommand } from '@command/bot-command';
import { BotAction } from '@action/bot-action';
import { PrefixAction } from '@action/actions';

@BotCommand.Command
class PrefixCommand extends BotCommand {
  constructor() {
    super(/^(prefix|p)\s+([a-zA-Z0-9!@#$%^&*_+\-=;':"\\|,.<>?]+)\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    console.log(args);
    return new PrefixAction(args[2]);
  }
}
