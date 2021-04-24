import { GameReaction } from '@reaction/game-reaction';
import { GuildEmoji, ReactionEmoji } from 'discord.js';
import { BotAction } from '@action/bot-action';
import { RevealAction } from '@action/actions';

@GameReaction.Reaction
class RevealReaction extends GameReaction {
  readonly emojis = ['📍'];

  process(emoji: GuildEmoji | ReactionEmoji): BotAction {
    return new RevealAction();
  }
}
