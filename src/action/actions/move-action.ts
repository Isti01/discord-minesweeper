import { BotAction, BotActionProps } from '@action/bot-action';
import { NormalizedOffset } from '@game/position';
import { UpdateDisplayAction } from '@action/actions/update-display-action';

export class MoveAction extends BotAction {
  constructor(private readonly normalizedOffset: NormalizedOffset) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    const game = props.state.game;
    if (!game) return;

    game.move({
      x: this.normalizedOffset.x * props.state.stepSize,
      y: this.normalizedOffset.y * props.state.stepSize,
    });

    return new UpdateDisplayAction().execute(props);
  }
}
