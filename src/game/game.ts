import { Board } from './board';
import { Offset, Position } from './position';
import { BoardSize } from './board-size';

export class Game extends Board {
  protected state = GameState.playing;
  protected numRevealed = 0;

  constructor(
    size: BoardSize = BoardSize.small,
    protected pos: Position = { x: 0, y: 0 }
  ) {
    super(size);
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

    if (!this.isInside(newPos)) {
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

  private isInside(pos: Position): boolean {
    return pos.x >= 0 && pos.x < this.size && pos.y >= 0 && pos.y < this.size;
  }
}

enum GameState {
  lost,
  won,
  playing,
}
