import { Board } from './board';
import { Offset, Position } from './position';
import { BoardSizeVariant } from './board-size';
import { clamp } from '@util/clamp';
import { GameState } from '@game/game-state';

export class Game extends Board {
  protected state = GameState.playing;
  protected numRevealed = 0;

  constructor(
    size: BoardSizeVariant = BoardSizeVariant.small,
    protected pos: Position = { x: 0, y: 0 }
  ) {
    super(size);
  }

  public get position(): Position {
    return { ...this.pos };
  }

  public get playing(): boolean {
    return this.state === GameState.playing;
  }

  public goto(offset: Offset): void {
    this.pos = this.clampPos(offset);
  }

  public move(offset: Offset) {
    if (!this.playing) return;

    this.pos = this.clampPos({
      x: this.pos.x + offset.x,
      y: this.pos.y + offset.y,
    });
  }

  public revealAt(pos: Position) {
    const node = this.getNode(pos);
    if (node === undefined || node.flagged || node.revealed) return;

    node.revealed = true;

    if (node.bomb) {
      this.state = GameState.lost;
    } else {
      if (node.bombsAround === 0) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;
            this.revealAt({ x: pos.x + x, y: pos.y + y });
          }
        }
      }

      this.numRevealed++;
      if (this.numRevealed === this.nodesToReveal) {
        this.state = GameState.won;
      }
    }
  }

  public reveal() {
    if (!this.playing) return;

    this.revealAt(this.pos);
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
