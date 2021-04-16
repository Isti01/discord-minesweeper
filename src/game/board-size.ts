const WidthMultiplier = 1.875;

export interface BoardSize {
  width: number;
  height: number;
}

export enum BoardSizeVariant {
  small = 10,
  medium = 15,
  big = 20,
}

export class BoardSizeUtil {
  public static getBoardSize(size: BoardSizeVariant): BoardSize {
    return {
      height: size,
      width: Math.floor(WidthMultiplier * size),
    };
  }

  public static getBombAmount(size: BoardSizeVariant): number {
    return Math.round(size ** 2 / 4);
  }
}
