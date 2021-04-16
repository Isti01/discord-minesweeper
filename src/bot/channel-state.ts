import { Game } from '@game/game';
import { Message } from 'discord.js';

export interface ChannelState {
  game?: Game;
  prefix?: string;
  gameMessage?: Message;
}
