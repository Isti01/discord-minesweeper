import { Message } from 'discord.js';
import { DiscordGame } from '@game/discord-game';

export interface ChannelState {
  game?: DiscordGame;
  prefix?: string;
  gameMessage?: Message;
  stepSize: number;
}
