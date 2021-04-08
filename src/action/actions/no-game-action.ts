import { BotAction, BotActionProps } from '../index';

export class NoGameAction extends BotAction {
  execute({ channel }: BotActionProps): Promise<any> {
    return this.sendMessage('There is no active game in this channel', channel);
  }
}
