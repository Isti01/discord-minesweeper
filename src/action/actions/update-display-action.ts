import { BotAction, BotActionProps } from '@action/bot-action';

export class UpdateDisplayAction extends BotAction {
  async execute({ state }: BotActionProps): Promise<any> {
    const { game, gameMessage } = state;
    if (!game || !gameMessage) return;

    return this.updateMessage(game.boardText, gameMessage);
  }
}
