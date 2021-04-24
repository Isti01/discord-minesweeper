import { BotCommand } from '../index';
import { BotAction, MessageAction } from '@action/index';

@BotCommand.Command
class HelpCommand extends BotCommand {
  constructor() {
    super(/^(help|h)\s*$/);
  }

  protected process(args: RegExpMatchArray): BotAction {
    return new MessageAction(
      'display - (d) displays the current game\n' +
        'flag - (f) flags the current field\n' +
        'flag [coordinates] - (f [coordinates]) flags the field at the coordinates\n' +
        'goto [coordinates] - (g [coordinates]) goes to the coordinates\n' +
        'help - (h) helps you out with the commands\n' +
        'new - (n) creates a game with medium size\n' +
        'new (small | medium | big) - (n (small | medium | big)) creates a game with the given size\n' +
        'reveal - (r) reveals the current field\n' +
        'reveal [coordinates] - (r [coordinates]) reveals the field at the coordinates\n'
    );
  }
}
