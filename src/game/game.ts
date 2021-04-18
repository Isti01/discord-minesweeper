import { Board } from './board';
import { Offset, Position } from './position';
import { BoardSize, BoardSizeVariant } from './board-size';
import { Cell } from '@game/cell';
import { deepClone } from '@util/deep-clone';
import { clamp } from '@util/clamp';

export class Game extends Board {
  protected state = GameState.playing;
  protected numRevealed = 0;

  constructor(
    size: BoardSizeVariant = BoardSizeVariant.small,
    protected pos: Position = { x: 0, y: 0 }
  ) {
    super(size);
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

  public move(offset: Offset) {
    if (!this.playing) return;

    this.pos = this.clampPos({
      x: this.pos.x + offset.x,
      y: this.pos.y + offset.y,
    });
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

  private clampPos(offset: Offset): Offset {
    return {
      x: clamp(0, this.size.width - 1, offset.x),
      y: clamp(0, this.size.height - 1, offset.y),
    };
  }
}

enum GameState {
  lost,
  won,
  playing,
}
