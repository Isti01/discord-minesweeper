import { BotAction, BotActionProps, NoGameAction } from '../index';
import { Game } from '@game/game';

export class DisplayAction extends BotAction {
  async execute(props: BotActionProps): Promise<any> {
    let game = props.state.game;
    if (!game) {
      return new NoGameAction().execute(props);
    }
    game = props.state.game as Game;

    await props.state.gameMessage?.delete().catch(console.log);
    return this.sendMessage('```\n' + game.boardText + '\n```', props.channel);
  }
}
