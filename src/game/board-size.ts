export enum BoardSize {
  small = 8,
  medium = 10,
  big = 12,
}

export class BoardSizeUtil {
  public static getBombAmount(size: BoardSize): number {
    return Math.round(size ** 2 / 5);
  }
}
