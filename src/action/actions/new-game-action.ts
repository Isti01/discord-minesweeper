import { BotAction, BotActionProps } from '../bot-action';
import { BoardSizeVariant } from '@game/board-size';
import { DisplayAction } from '@action/actions/display-action';
import { DiscordGame } from '@game/discord-game';

export class NewGameAction extends BotAction {
  constructor(private readonly size: BoardSizeVariant) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    props.state.game = new DiscordGame(this.size);
    props.state.gameMessage = undefined;

    return new DisplayAction().execute(props);
  }
}
