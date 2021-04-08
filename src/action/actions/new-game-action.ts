import { BotAction, BotActionProps } from '../bot-action';
import { BoardSizeVariant } from '@game/board-size';
import { Game } from '@game/game';

export class NewGameAction extends BotAction {
  constructor(private readonly size: BoardSizeVariant) {
    super();
  }

  async execute({ channel, state }: BotActionProps): Promise<any> {
    state.game = new Game(this.size);

    return this.sendMessage('The New Game Was Created Successfully', channel);
  }
}
