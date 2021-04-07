import { GameCommand } from '@bot/game-command';
import { GameAction } from '@bot/game-action/game-action';
import { MessageAction } from '@bot/game-action/actions/message-action';

@GameCommand.Command
class HelpCommand extends GameCommand {
  constructor() {
    super(/^help\s*$/);
  }

  protected process(args: RegExpMatchArray): GameAction {
    return new MessageAction('help //todo lol');
  }
}
