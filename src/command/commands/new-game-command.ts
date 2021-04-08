import { GameCommand } from '../game-command';
import { GameAction, NewGameAction } from '@action/index';
import { BoardSize } from '@game/board-size';

const defaultSize = BoardSize.medium;

@GameCommand.Command
class NewGameCommand extends GameCommand {
  constructor() {
    super(/^new\s*$|^new\s*(small|medium|big)\s*$/);
  }

  private static getBoardSize(size: string | undefined): BoardSize {
    switch (size) {
      case 'small':
        return BoardSize.small;
      case 'medium':
        return BoardSize.medium;
      case 'big':
        return BoardSize.big;
      default:
        return defaultSize;
    }
  }

  protected process(args: RegExpMatchArray): GameAction {
    return new NewGameAction(NewGameCommand.getBoardSize(args[1]));
  }
}
