import { BotAction, BotActionProps } from '@action/bot-action';
import { UpdateDisplayAction } from '@action/actions/update-display-action';

export class FlagAction extends BotAction {
  execute(props: BotActionProps): Promise<any> {
    props.state.game?.flag();
    return new UpdateDisplayAction().execute(props);
  }
}
