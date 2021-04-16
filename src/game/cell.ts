export interface Cell {
  bomb: boolean;
  revealed: boolean;
  flagged: boolean;
  bombsAround: number;
}

export class CellUtil {
  public static displayCell(cell: Cell, selected?: boolean): string {
    if (selected) {
      return '×';
    }
    if (cell.flagged) {
      return '¡';
    }
    if (!cell.revealed) {
      return '■';
    }
    if (cell.bomb) {
      return '¤';
    }
    switch (cell.bombsAround) {
      case 1:
        return '1';
      case 2:
        return '2';
      case 3:
        return '3';
      case 4:
        return '4';
      case 5:
        return '5';
      case 6:
        return '6';
      case 7:
        return '7';
      case 8:
        return '8';
      default:
        return '0';
    }
  }
}
