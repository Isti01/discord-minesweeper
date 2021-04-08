import { MessageEmbed, TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';

export abstract class GameAction {
  public abstract execute(props: GameActionProps): Promise<any>;

  protected sendMessage(
    text: string,
    channel: GameActionChannel
  ): Promise<any> {
    return channel.send(
      new MessageEmbed({
        description: text,
      })
    );
  }
}

export type GameActionChannel = TextChannel;

export interface GameActionProps {
  channel: GameActionChannel;
  author: User;
  state: ChannelState;
}
