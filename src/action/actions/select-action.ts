import { BotAction, BotActionProps } from '@action/bot-action';
import { UpdateDisplayAction } from '@action/actions/update-display-action';

export class SelectAction extends BotAction {
  execute(props: BotActionProps): Promise<any> {
    props.state.game?.reveal();
    return new UpdateDisplayAction().execute(props);
  }
}
