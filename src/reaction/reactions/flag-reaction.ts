import { GameReaction } from '@reaction/game-reaction';
import { GuildEmoji, ReactionEmoji } from 'discord.js';
import { BotAction } from '@action/bot-action';
import { FlagAction } from '@action/actions';

@GameReaction.Reaction
class FlagReaction extends GameReaction {
  readonly emojis = ['🚩'];

  process(emoji: GuildEmoji | ReactionEmoji): BotAction {
    return new FlagAction();
  }
}
