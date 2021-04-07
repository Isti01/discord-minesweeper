import { GameAction } from '@bot/game-action/game-action';
import { TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';

export class MessageAction extends GameAction {
  constructor(private readonly message: string) {
    super();
  }

  async execute(
    channel: TextChannel,
    author: User,
    game: ChannelState
  ): Promise<any> {
    return channel.send({ content: this.message });
  }
}
