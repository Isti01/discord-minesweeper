import { GameCommand } from '@bot/game-command';
import { DisplayAction, GameAction } from '@bot/game-action';

@GameCommand.Command
class DisplayCommand extends GameCommand {
  constructor() {
    super(/show\s*/);
  }

  protected process(args: RegExpMatchArray): GameAction {
    return new DisplayAction();
  }
}
