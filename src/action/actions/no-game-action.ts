import { GameAction, GameActionProps } from '../index';

export class NoGameAction extends GameAction {
  execute({ channel }: GameActionProps): Promise<any> {
    return this.sendMessage('There is no active game in this channel', channel);
  }
}
