import { Game } from '@game/game';
import { Cell, CellUtil } from '@game/cell';
import { MessageEmbed } from 'discord.js';
import { GameState } from '@game/game-state';

const abc = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

function padIndex(index: number, padding: number): string {
  return String(index).padStart(padding);
}

export class DiscordGame extends Game {
  private get boardText(): string {
    const padding = Math.ceil(Math.log10(this.size.height));

    const displayCols = (row: Cell[], y: number) =>
      `${padIndex(y, padding)}║ ` + row.map(displayRow(y)).join(' ');

    const displayRow = (y: number) => (cell: Cell, x: number) => {
      return CellUtil.displayCell(
        cell,
        this.playing,
        this.pos.x == x && this.pos.y == y
      );
    };
    return this.getHeader(padding) + this.cells.map(displayCols).join('\n');
  }

  private get cellAtPosition(): string {
    return CellUtil.displayCell(this.getNode(this.pos) as Cell, this.playing);
  }

  public getGameEmbed(stepSize: number): MessageEmbed {
    return new MessageEmbed({
      description:
        '```\n' + this.getTitle(stepSize) + '\n\n' + this.boardText + '\n```',
    });
  }

  private getTitle(stepSize: number): string {
    switch (this.state) {
      case GameState.lost:
        return 'You have lost the game :c';
      case GameState.won:
        return 'Congrats! You have won the game!';
      case GameState.playing:
        return `You are on ${abc[this.pos.x]}${
          this.pos.y
        }, which looks like this: ${
          this.cellAtPosition
        }\nThe current step size is ${stepSize}`;
    }
  }

  private getHeader(padding: number): string {
    const width = this.size.width;
    const letters = `${' '.repeat(padding)}║ ${abc.slice(0, width).join(' ')}`;
    const border = `${'═'.repeat(padding)}╬${'═'.repeat(width * 2)}`;
    return `${letters}\n${border}\n`;
  }
}
