import { Cell } from './cell';
import { Position } from './position';
import { BoardSize, BoardSizeUtil } from './board-size';

export class Board {
  protected cells: Cell[];
  protected readonly nodesToReveal: number;
  protected readonly bombAmount: number;

  public constructor(protected readonly size: BoardSize) {
    this.bombAmount = BoardSizeUtil.getBombAmount(this.size);

    this.cells = this.generateCells();
    this.nodesToReveal = this.cells.length - this.bombAmount;
    this.calculateBombsAround();
  }

  private static shuffleArray(array: Cell[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  protected getNode(pos: Position): Cell | undefined {
    return this.cells[this.posToIndex(pos)];
  }

  private generateCells(): Cell[] {
    const array: Cell[] = Array.from({ length: this.size ** 2 }, (_, i) => ({
      revealed: false,
      bombsAround: 0,
      flagged: false,
      bomb: i < this.bombAmount,
    }));

    Board.shuffleArray(array);

    return array;
  }

  private indexToPos(index: number): Position {
    return {
      x: index % this.size,
      y: Math.floor(index / this.size),
    };
  }

  private posToIndex(pos: Position): number {
    return pos.x + pos.y * this.size;
  }

  private coordsToIndex(x: number, y: number): number {
    return x + y * this.size;
  }

  private calculateBombsAround() {
    const length = this.cells.length;
    for (let i = 0; i < length; i++) {
      const element = this.cells[i];
      if (element.bomb) {
        this.markFieldsAround(this.indexToPos(i));
      }
    }
  }

  private markFieldsAround(pos: Position) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue;

        const currentIndex = this.coordsToIndex(x + pos.x, y + pos.y);
        const cell: Cell | undefined = this.cells[currentIndex];
        if (cell !== undefined) {
          cell.bombsAround++;
        }
      }
    }
  }
}
