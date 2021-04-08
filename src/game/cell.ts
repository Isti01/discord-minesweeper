export interface Cell {
  bomb: boolean;
  revealed: boolean;
  flagged: boolean;
  bombsAround: number;
}

export class CellUtil {
  public static displayCell(cell: Cell): string {
    if (cell.flagged) return '#️⃣';
    if (!cell.revealed) return '🟦';
    if (cell.bomb) return '💣';
    switch (cell.bombsAround) {
      case 1:
        return '1️⃣';
      case 2:
        return '2️⃣';
      case 3:
        return '3️⃣';
      case 4:
        return '4️⃣';
      case 5:
        return '5️⃣';
      case 6:
        return '6️⃣';
      case 7:
        return '7️⃣';
      case 8:
        return '8️⃣';
      default:
        return '0️⃣';
    }
  }
}
