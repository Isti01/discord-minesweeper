import { GameAction, GameActionProps, NoGameAction } from '@bot/game-action';
import { gameToImage } from '@util/game-to-image';
import { Game } from '@game/game';
import { MessageAttachment } from 'discord.js';

export class DisplayAction extends GameAction {
  async execute(props: GameActionProps): Promise<any> {
    let game = props.state.game;
    if (!game) {
      return new NoGameAction().execute(props);
    }
    game = props.state.game as Game;

    const attachment = new MessageAttachment(await gameToImage(game));

    return props.channel.send('\u200B', attachment);
  }
}
