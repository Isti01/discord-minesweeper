import { BotAction } from '@action/index';

export const botCommands: BotCommand[] = [];

export abstract class BotCommand {
  protected constructor(protected readonly pattern: RegExp | string) {}

  static Command(target: new () => BotCommand) {
    console.log('Loaded Command', target);
    botCommands.push(new target());
  }

  public processCommand(commandText: string): BotAction | null {
    const regexMatch = commandText.match(this.pattern);
    if (regexMatch === null) return null;

    return this.process(regexMatch);
  }

  protected abstract process(args: RegExpMatchArray): BotAction;
}
