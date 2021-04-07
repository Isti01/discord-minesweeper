import { GameAction } from '@bot/game-action';

export const gameCommands: GameCommand[] = [];

export abstract class GameCommand {
  protected constructor(protected readonly pattern: RegExp | string) {}

  static Command<T extends GameCommand>(target: new () => T) {
    gameCommands.push(new target());
  }

  public processCommand(commandText: string): GameAction | null {
    const regexMatch = commandText.match(this.pattern);
    if (regexMatch === null) return null;

    return this.process(regexMatch);
  }

  protected abstract process(args: RegExpMatchArray): GameAction;
}
