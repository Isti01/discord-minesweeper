import { GameAction, GameActionProps } from '@bot/game-action/game-action';

export class MessageAction extends GameAction {
  constructor(private readonly message: string) {
    super();
  }

  async execute({ channel }: GameActionProps): Promise<any> {
    return this.sendMessage(this.message, channel);
  }
}
