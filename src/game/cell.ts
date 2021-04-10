import config from '../config.json';

const { sprites } = config;

export interface Cell {
  bomb: boolean;
  revealed: boolean;
  flagged: boolean;
  bombsAround: number;
}

export class CellUtil {
  public static displayCell(cell: Cell, selected?: boolean): string {
    if (cell.flagged) {
      return selected ? sprites.flagged_selected : sprites.flagged;
    }
    if (!cell.revealed) {
      return selected ? sprites.unrevealed_selected : sprites.unrevealed;
    }
    if (cell.bomb) {
      return selected ? sprites.bomb_selected : sprites.bomb;
    }
    switch (cell.bombsAround) {
      case 1:
        return selected ? sprites.one_selected : sprites.one;
      case 2:
        return selected ? sprites.two_selected : sprites.two;
      case 3:
        return selected ? sprites.three_selected : sprites.three;
      case 4:
        return selected ? sprites.four_selected : sprites.four;
      case 5:
        return selected ? sprites.five_selected : sprites.five;
      case 6:
        return selected ? sprites.six_selected : sprites.six;
      case 7:
        return selected ? sprites.seven_selected : sprites.seven;
      case 8:
        return selected ? sprites.eight_selected : sprites.eight;
      default:
        return selected ? sprites.zero_selected : sprites.zero;
    }
  }
}
