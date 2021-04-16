import { BotAction, BotActionProps } from '../bot-action';
import { BoardSizeVariant } from '@game/board-size';
import { Game } from '@game/game';
import { DisplayAction } from '@action/actions/display-action';

export class NewGameAction extends BotAction {
  constructor(private readonly size: BoardSizeVariant) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    props.state.game = new Game(this.size);

    return new DisplayAction().execute(props);
  }
}
