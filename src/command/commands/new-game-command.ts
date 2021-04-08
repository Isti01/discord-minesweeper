import { GameCommand } from '../game-command';
import { GameAction, NewGameAction } from '@action/index';
import { BoardSizeVariant } from '@game/board-size';

const defaultSize = BoardSizeVariant.medium;

@GameCommand.Command
class NewGameCommand extends GameCommand {
  constructor() {
    super(/^new\s*$|^new\s*(small|medium|big)\s*$/);
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

  protected process(args: RegExpMatchArray): GameAction {
    return new NewGameAction(NewGameCommand.getBoardSize(args[1]));
  }
}
