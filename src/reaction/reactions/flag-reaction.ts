import { GameReaction } from '@reaction/game-reaction';
import { GuildEmoji, ReactionEmoji } from 'discord.js';
import { BotAction } from '@action/bot-action';
import { FlagAction } from '@action/actions/flag-action';

@GameReaction.Reaction
class FlagReaction extends GameReaction {
  readonly emojis = ['🚩'];

  process(emoji: GuildEmoji | ReactionEmoji): BotAction {
    return new FlagAction();
  }
}
