import { GameAction, GameActionProps } from '@bot/game-action';

export class NoGameAction extends GameAction {
  execute({ channel }: GameActionProps): Promise<any> {
    return this.sendMessage('There is no active game in this channel', channel);
  }
}
