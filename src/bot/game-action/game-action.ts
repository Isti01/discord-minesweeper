import { TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';

export abstract class GameAction {
  public abstract execute(
    channel: TextChannel,
    author: User,
    game: ChannelState
  ): Promise<any>;
}
