import { BotAction, BotActionProps } from '@action/bot-action';
import { UpdateDisplayAction } from '@action/actions/update-display-action';
import { NoGameAction } from '@action/actions/no-game-action';

export class StepSizeAction extends BotAction {
  constructor(private readonly size: number) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    if (!props.state.game) return new NoGameAction().execute(props);

    props.state.stepSize = this.size;
    return new UpdateDisplayAction().execute(props);
  }
}
