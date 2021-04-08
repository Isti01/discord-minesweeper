import { GameAction, GameActionProps } from '../game-action';
import { BoardSizeVariant } from '@game/board-size';
import { Game } from '@game/game';

export class NewGameAction extends GameAction {
  constructor(private readonly size: BoardSizeVariant) {
    super();
  }

  async execute({ channel, state }: GameActionProps): Promise<any> {
    state.game = new Game(this.size);

    return this.sendMessage('The New Game Was Created Successfully', channel);
  }
}
