import { Message, MessageEmbed, TextChannel, User } from 'discord.js';
import { ChannelState } from '@bot/channel-state';

export abstract class BotAction {
  private static createEmbed(text: string): MessageEmbed {
    return new MessageEmbed({ description: text });
  }

  public abstract execute(props: BotActionProps): Promise<any>;

  protected sendMessage(
    text: string,
    channel: BotActionChannel
  ): Promise<Message> {
    return channel.send(BotAction.createEmbed(text));
  }

  protected editMessage(text: string, message: Message): Promise<Message> {
    return message.edit(BotAction.createEmbed(text));
  }
}

export type BotActionChannel = TextChannel;

export interface BotActionProps {
  channel: BotActionChannel;
  author: User;
  state: ChannelState;
}
