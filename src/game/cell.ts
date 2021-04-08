import config from '../config.json';

const { sprites } = config;

export interface Cell {
  bomb: boolean;
  revealed: boolean;
  flagged: boolean;
  bombsAround: number;
}

export class CellUtil {
  public static displayCell(cell: Cell): string {
    if (cell.flagged) return sprites.flagged;
    // if (!cell.revealed) return sprites.unrevealed;
    if (cell.bomb) return sprites.bomb;
    switch (cell.bombsAround) {
      case 1:
        return sprites.one;
      case 2:
        return sprites.two;
      case 3:
        return sprites.three;
      case 4:
        return sprites.four;
      case 5:
        return sprites.five;
      case 6:
        return sprites.six;
      case 7:
        return sprites.seven;
      case 8:
        return sprites.eight;
      default:
        return sprites.zero;
    }
  }
}
