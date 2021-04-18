import { BotAction, BotActionProps } from '@action/bot-action';
import { Offset } from '@game/position';
import { UpdateDisplayAction } from '@action/actions/update-display-action';

export class MoveAction extends BotAction {
  constructor(private readonly offset: Offset) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    const game = props.state.game;
    if (!game) return;

    game.move(this.offset);
    return new UpdateDisplayAction().execute(props);
  }
}
