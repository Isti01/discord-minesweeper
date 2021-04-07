export enum BoardSize {
  small = 10,
  medium = 20,
  big = 30
}

export class BoardSizeUtil {
  public static getBombAmount(size: BoardSize): number {
    switch (size) {
      case BoardSize.small:
        return 10;
      case BoardSize.medium:
        return 40;
      case BoardSize.big:
        return 90;
    }
  }
}

