import { BotAction, BotActionProps } from '@action/bot-action';

export class NoopAction extends BotAction {
  async execute(props: BotActionProps): Promise<any> {}
}
