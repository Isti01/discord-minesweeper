import { Board } from './board';
import { Offset, Position } from './position';
import { BoardSize, BoardSizeVariant } from './board-size';
import { Cell, CellUtil } from '@game/cell';
import { deepClone } from '@util/deep-clone';

const abc = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

function padIndex(index: number, padding: number): string {
  return String(index).padStart(padding);
}

export class Game extends Board {
  protected state = GameState.playing;
  protected numRevealed = 0;

  constructor(
    size: BoardSizeVariant = BoardSizeVariant.small,
    protected pos: Position = { x: 0, y: 0 }
  ) {
    super(size);
  }

  public get boardText(): string {
    const padding = Math.ceil(Math.log10(this.size.height));

    const displayCols = (row: Cell[], y: number) =>
      `${padIndex(y, padding)}║ ` + row.map(displayRow(y)).join(' ');

    const displayRow = (y: number) => (cell: Cell, x: number) => {
      return CellUtil.displayCell(cell, this.pos.x == x && this.pos.y == y);
    };
    return (
      '```\n' +
      this.getHeader(padding) +
      this.cells.map(displayCols).join('\n') +
      '\n```'
    );
  }

  public get boardSize(): BoardSize {
    return { ...this.size };
  }

  public get board(): Cell[][] {
    return deepClone(this.cells);
  }

  public get position(): Position {
    return { ...this.pos };
  }

  public get won(): boolean {
    return this.state === GameState.won;
  }

  public get lost(): boolean {
    return this.state === GameState.lost;
  }

  public get playing(): boolean {
    return this.state === GameState.playing;
  }

  public move(o: Offset): boolean {
    if (!this.playing) return false;

    const newPos = {
      x: this.pos.x + o.x,
      y: this.pos.y + o.y,
    };

    if (!this.isInside(newPos.x, newPos.y)) {
      return false;
    }

    this.pos = newPos;
    return true;
  }

  public reveal(): boolean {
    if (!this.playing) return false;

    const node = this.getNode(this.pos);
    if (node === undefined || node.flagged) return false;

    node.revealed = true;

    if (node.bomb) {
      this.state = GameState.lost;
    } else {
      this.numRevealed++;
      if (this.numRevealed === this.nodesToReveal) {
        this.state = GameState.won;
      }
    }
    return true;
  }

  public flag(): boolean {
    if (!this.playing) return false;

    const node = this.getNode(this.pos);
    if (node === undefined || node.revealed) return false;

    node.flagged = !node.flagged;
    return true;
  }

  private getHeader(padding: number): string {
    const width = this.size.width;
    const letters = `${' '.repeat(padding)}║ ${abc.slice(0, width).join(' ')}`;
    const border = `${'═'.repeat(padding)}╬${'═'.repeat(width * 2)}`;
    return `${letters}\n${border}\n`;
  }
}

enum GameState {
  lost,
  won,
  playing,
}
