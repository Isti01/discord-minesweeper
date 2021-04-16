import { BotAction, BotActionProps, NoGameAction } from '../index';
import { DiscordGame } from '@game/discord-game';

export class DisplayAction extends BotAction {
  async execute(props: BotActionProps): Promise<any> {
    let game = props.state.game;
    if (!game) {
      return new NoGameAction().execute(props);
    }
    game = props.state.game as DiscordGame;

    await props.state.gameMessage?.delete().catch(console.log);

    props.state.gameMessage = await this.sendMessage(
      game.boardText,
      props.channel
    );
  }
}
