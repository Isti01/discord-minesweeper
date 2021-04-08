import { Board } from './board';
import { Offset, Position } from './position';
import { BoardSize } from './board-size';
import { Cell, CellUtil } from '@game/cell';
import { deepClone } from '@util/deep-clone';

export class Game extends Board {
  protected state = GameState.playing;
  protected numRevealed = 0;

  constructor(
    size: BoardSize = BoardSize.small,
    protected pos: Position = { x: 0, y: 0 }
  ) {
    super(size);
  }

  public get boardSvg(): string[][] {
    return this.cells.map((row) =>
      row.map((cell) => CellUtil.displayCell(cell))
    );
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
}

enum GameState {
  lost,
  won,
  playing,
}
