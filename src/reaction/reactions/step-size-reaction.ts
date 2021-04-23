import { GameReaction } from '@reaction/game-reaction';
import { BotAction } from '@action/bot-action';
import { StepSizeAction } from '@action/actions';
import { GuildEmoji, ReactionEmoji } from 'discord.js';

const Reactions: { [key: string]: BotAction } = {
  ['1️⃣']: new StepSizeAction(1),
  ['2️⃣']: new StepSizeAction(2),
  ['3️⃣']: new StepSizeAction(3),
};

@GameReaction.Reaction
export class StepSizeReaction extends GameReaction {
  readonly emojis = Object.keys(Reactions);

  process(emoji: GuildEmoji | ReactionEmoji): BotAction {
    const action = Reactions[emoji.name];
    if (!action) {
      throw new Error(`${emoji.name} emoji has no move action defined`);
    }

    return action;
  }
}
