import { BotAction, BotActionProps } from '@action/bot-action';

export class StepSizeAction extends BotAction {
  constructor(private readonly size: number) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    props.state.stepSize = this.size;
  }
}
