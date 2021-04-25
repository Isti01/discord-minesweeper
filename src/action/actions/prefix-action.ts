import { BotAction, BotActionProps } from '@action/bot-action';

export class PrefixAction extends BotAction {
  constructor(private readonly prefix: string) {
    super();
  }

  async execute(props: BotActionProps): Promise<any> {
    props.state.prefix = this.prefix;

    return this.sendMessage(
      `Your prefix has been set to ${this.prefix}`,
      props.channel
    );
  }
}
