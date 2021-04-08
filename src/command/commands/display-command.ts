import { GameCommand } from '../index';
import { DisplayAction, GameAction } from '@action/index';

@GameCommand.Command
class DisplayCommand extends GameCommand {
  constructor() {
    super(/show\s*/);
  }

  protected process(args: RegExpMatchArray): GameAction {
    return new DisplayAction();
  }
}
