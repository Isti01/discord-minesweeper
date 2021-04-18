import { GameReaction } from '@reaction/game-reaction';
import { GuildEmoji, ReactionEmoji } from 'discord.js';
import { BotAction } from '@action/bot-action';
import { NoopAction } from '@action/actions';

const Emoji = '🚩';

@GameReaction.Reaction
class FlagReaction extends GameReaction {
  readonly emojis = [Emoji];

  matchesEmoji(emoji: GuildEmoji | ReactionEmoji): boolean {
    return emoji.name == Emoji;
  }

  process(emoji: GuildEmoji | ReactionEmoji): BotAction {
    return new NoopAction();
  }
}
