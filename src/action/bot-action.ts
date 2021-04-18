import { Message, MessageEmbed, TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';

export abstract class BotAction {
  public abstract execute(props: BotActionProps): Promise<any>;

  protected sendMessage(
    text: string,
    channel: BotActionChannel
  ): Promise<Message> {
    return channel.send(new MessageEmbed({ description: text }));
  }

  protected updateMessage(boardText: string, gameMessage: Message) {
    return gameMessage.edit(new MessageEmbed({ description: boardText }));
  }
}

export type BotActionChannel = TextChannel;

export interface BotActionProps {
  channel: BotActionChannel;
  author: User;
  state: ChannelState;
}
