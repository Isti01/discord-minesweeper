import { BotAction, BotActionProps } from '@action/bot-action';
import { UpdateDisplayAction } from '@action/actions/update-display-action';
import { Offset } from '@game/position';
import { NoGameAction } from '@action/actions/no-game-action';
import { GotoAction } from '@action/actions/goto-action';

export class FlagAction extends BotAction {
  constructor(private readonly offset?: Offset) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    const game = props.state.game;
    if (!game) {
      return new NoGameAction().execute(props);
    }

    if (this.offset) {
      await new GotoAction(this.offset).execute(props);
    }

    game.flag();
    return new UpdateDisplayAction().execute(props);
  }
}
