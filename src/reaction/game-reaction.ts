import { GuildEmoji, ReactionEmoji } from 'discord.js';
import { BotAction } from '@action/bot-action';

export abstract class GameReaction {
  static readonly Reactions: GameReaction[] = [];
  abstract readonly emojis: string[];

  static Reaction(target: new () => GameReaction) {
    console.log('Loaded Reaction', target);
    GameReaction.Reactions.push(new target());
  }

  static getEmojis(): string[] {
    return GameReaction.Reactions.flatMap((reaction) => reaction.emojis);
  }

  abstract matchesEmoji(emoji: GuildEmoji | ReactionEmoji): boolean;

  abstract process(emoji: GuildEmoji | ReactionEmoji): BotAction;
}
