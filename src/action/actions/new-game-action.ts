import { GameAction, GameActionProps } from '../game-action';
import { BoardSize } from '@game/board-size';
import { Game } from '@game/game';

export class NewGameAction extends GameAction {
  constructor(private readonly size: BoardSize) {
    super();
  }

  async execute({ channel, state }: GameActionProps): Promise<any> {
    state.game = new Game(this.size);

    return this.sendMessage('The New Game Was Created Successfully', channel);
  }
}
