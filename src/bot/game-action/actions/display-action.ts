import { GameAction, GameActionProps } from '@bot/game-action';
import { NoGameAction } from '@bot/game-action/actions/no-game-action';
import { MessageEmbed } from 'discord.js';

export class DisplayAction extends GameAction {
  execute(props: GameActionProps): Promise<any> {
    const game = props.state.game;
    if (game === undefined) {
      return new NoGameAction().execute(props);
    }

    const content = game.boardText.map((line) => ({
      value: line.join('\t'),
      name: '\u200B',
      inline: true,
    }));

    return props.channel.send(new MessageEmbed({ fields: content }));
  }
}
