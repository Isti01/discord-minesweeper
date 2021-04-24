import { BotCommand } from '@command/bot-command';
import { BotAction } from '@action/bot-action';
import { StepSizeAction } from '@action/actions';

@BotCommand.Command
class StepCommand extends BotCommand {
  constructor() {
    super(/^(step|s)\s*([12345])?\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    const stepSizeText = args[2];
    const stepSize = stepSizeText ? Number.parseInt(stepSizeText) : 1;

    return new StepSizeAction(stepSize);
  }
}
