import { GameReaction } from '@reaction/index';
import { BotAction } from '@action/bot-action';
import { GuildEmoji, ReactionEmoji } from 'discord.js';
import { NoopAction } from '@action/actions';

const Reactions: { [key: string]: BotAction } = {
  ['⬅️']: new NoopAction(),
  ['⏪']: new NoopAction(),
  ['⬇️']: new NoopAction(),
  ['⏬']: new NoopAction(),
  ['⬆️']: new NoopAction(),
  ['⏫']: new NoopAction(),
  ['➡️']: new NoopAction(),
  ['⏩']: new NoopAction(),
};

@GameReaction.Reaction
class MoveReaction extends GameReaction {
  emojis = Object.keys(Reactions);

  matchesEmoji(emoji: GuildEmoji | ReactionEmoji): boolean {
    return Object.keys(Reactions).includes(emoji.name);
  }

  process(emoji: GuildEmoji | ReactionEmoji): BotAction {
    const action = Reactions[emoji.name];
    if (!action) {
      throw new Error(`${emoji.name} emoji has no move action defined`);
    }

    return action;
  }
}
