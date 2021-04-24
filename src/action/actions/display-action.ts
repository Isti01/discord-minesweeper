import { BotAction, BotActionProps, NoGameAction } from '../index';
import { DiscordGame } from '@game/discord-game';
import { Message } from 'discord.js';
import { GameReaction } from '@reaction/game-reaction';

export class DisplayAction extends BotAction {
  private static addReactions(message: Message): Promise<any> {
    return Promise.all(
      GameReaction.getEmojis().map((emoji) => message.react(emoji))
    );
  }

  async execute(props: BotActionProps): Promise<any> {
    let game = props.state.game;
    if (!game) {
      return new NoGameAction().execute(props);
    }
    game = props.state.game as DiscordGame;

    await props.state.gameMessage?.delete().catch(console.log);
    const message = await props.channel.send(
      game.getGameEmbed(props.state.stepSize)
    );

    props.state.gameMessage = message;
    await DisplayAction.addReactions(message);
  }
}
