import { Cell } from './cell';
import { Position } from './position';
import { BoardSize, BoardSizeUtil, BoardSizeVariant } from './board-size';

export class Board {
  protected cells: Cell[][];
  protected readonly nodesToReveal: number;
  protected readonly bombAmount: number;
  protected readonly size: BoardSize;

  public constructor(sizeVariant: BoardSizeVariant) {
    this.bombAmount = BoardSizeUtil.getBombAmount(sizeVariant);
    this.size = BoardSizeUtil.getBoardSize(sizeVariant);

    this.cells = this.generateCells();
    this.nodesToReveal = this.cells.length - this.bombAmount;
    this.calculateBombsAround();
  }

  private static shuffleArray(array: Cell[]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  protected getNode(pos: Position): Cell | undefined {
    if (!this.isInside(pos.x, pos.y)) return;
    return this.cells[pos.x][pos.y];
  }

  protected isInside(x: number, y: number): boolean {
    return x >= 0 && x < this.size.width && y >= 0 && y < this.size.height;
  }

  private generateCells(): Cell[][] {
    const array: Cell[] = Array.from(
      { length: this.size.width * this.size.height },
      (_, i) => ({
        revealed: false,
        bombsAround: 0,
        flagged: false,
        bomb: i < this.bombAmount,
      })
    );

    Board.shuffleArray(array);

    const cells = Array.from(
      { length: this.size.width },
      () => new Array(this.size.height)
    );

    for (let i = 0; i < array.length; i++) {
      const pos = this.indexToPos(i);
      cells[pos.x][pos.y] = array[i];
    }

    return cells;
  }

  private indexToPos(index: number): Position {
    return {
      x: index % this.size.width,
      y: Math.floor(index / this.size.width),
    };
  }

  private calculateBombsAround() {
    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        if (this.cells[x][y].bomb) {
          this.markFieldsAround(x, y);
        }
      }
    }
  }

  private markFieldsAround(posX: number, posY: number) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue;

        const currentX = x + posX;
        const currentY = y + posY;
        if (this.isInside(currentX, currentY)) {
          this.cells[currentX][currentY].bombsAround++;
        }
      }
    }
  }
}
