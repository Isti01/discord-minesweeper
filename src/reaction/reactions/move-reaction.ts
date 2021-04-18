import { GameReaction } from '@reaction/index';
import { BotAction } from '@action/bot-action';
import { GuildEmoji, ReactionEmoji } from 'discord.js';
import { MoveAction } from '@action/actions/move-action';

const Reactions: { [key: string]: BotAction } = {
  ['⬅️']: new MoveAction({ x: -1, y: 0 }),
  ['⏪']: new MoveAction({ x: -3, y: 0 }),
  ['⬇️']: new MoveAction({ x: 0, y: 1 }),
  ['⏬']: new MoveAction({ x: 0, y: 3 }),
  ['⬆️']: new MoveAction({ x: 0, y: -1 }),
  ['⏫']: new MoveAction({ x: 0, y: -3 }),
  ['➡️']: new MoveAction({ x: 1, y: 0 }),
  ['⏩']: new MoveAction({ x: 3, y: 0 }),
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
