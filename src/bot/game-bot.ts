import { Bot } from '@bot/bot';
import { GameAction } from '@bot/game-action/game-action';
import { TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';

export class GameBot extends Bot {
  protected states = new Map<string, ChannelState>();

  constructor(token?: string) {
    super(token);
  }

  protected processAction(
    action: GameAction,
    channel: TextChannel,
    author: User
  ) {
    let game: ChannelState | undefined = this.states.get(channel.id);
    if (game === undefined) {
      game = {};
      this.states.set(channel.id, game);
    }

    return action.execute(channel, author, game);
  }
}
