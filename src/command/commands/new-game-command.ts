import { BotCommand } from '../bot-command';
import { BotAction, NewGameAction } from '@action/index';
import { BoardSizeVariant } from '@game/board-size';

const defaultSize = BoardSizeVariant.medium;

@BotCommand.Command
class NewGameCommand extends BotCommand {
  constructor() {
    super(/^(new|n)\s*(small|medium|big)?\s*$/);
  }

  private static getBoardSize(size: string | undefined): BoardSizeVariant {
    switch (size) {
      case 'small':
        return BoardSizeVariant.small;
      case 'medium':
        return BoardSizeVariant.medium;
      case 'big':
        return BoardSizeVariant.big;
      default:
        return defaultSize;
    }
  }

  protected process(args: RegExpMatchArray): BotAction {
    return new NewGameAction(NewGameCommand.getBoardSize(args[2]));
  }
}
