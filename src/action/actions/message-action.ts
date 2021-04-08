import { BotAction, BotActionProps } from '../bot-action';

export class MessageAction extends BotAction {
  constructor(private readonly message: string) {
    super();
  }

  async execute({ channel }: BotActionProps): Promise<any> {
    return this.sendMessage(this.message, channel);
  }
}
