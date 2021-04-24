import { BotAction, BotActionProps } from '@action/bot-action';

export class UpdateDisplayAction extends BotAction {
  async execute({ state, channel }: BotActionProps): Promise<any> {
    const { game, gameMessage } = state;
    if (!game || !gameMessage) return;

    return gameMessage.edit(game.getGameEmbed(state.stepSize));
  }
}
