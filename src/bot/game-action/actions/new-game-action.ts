import { GameAction } from '@bot/game-action/game-action';
import { BoardSize } from '@game/board-size';
import { TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';
import { Game } from '@game/game';

export class NewGameAction extends GameAction {
  constructor(private readonly size: BoardSize) {
    super();
  }

  async execute(
    channel: TextChannel,
    author: User,
    game: ChannelState
  ): Promise<any> {
    game.game = new Game(this.size);

    return channel.send({ content: 'The New Game Was Created Successfully' });
  }
}
