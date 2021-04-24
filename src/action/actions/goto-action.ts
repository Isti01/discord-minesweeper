import { BotAction, BotActionProps } from '@action/bot-action';
import { Offset } from '@game/position';
import { UpdateDisplayAction } from '@action/actions/update-display-action';
import { NoGameAction } from '@action/actions/no-game-action';

export class GotoAction extends BotAction {
  constructor(
    private readonly offset: Offset,
    private readonly update = false
  ) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    const game = props.state.game;
    if (!game) return new NoGameAction().execute(props);

    game.goto(this.offset);
    if (this.update) return new UpdateDisplayAction().execute(props);
  }
}
