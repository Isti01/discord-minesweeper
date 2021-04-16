import { Game } from '@game/game';
import { Cell, CellUtil } from '@game/cell';

const abc = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

function padIndex(index: number, padding: number): string {
  return String(index).padStart(padding);
}

export class DiscordGame extends Game {
  public get boardText(): string {
    const padding = Math.ceil(Math.log10(this.size.height));

    const displayCols = (row: Cell[], y: number) =>
      `${padIndex(y, padding)}║ ` + row.map(displayRow(y)).join(' ');

    const displayRow = (y: number) => (cell: Cell, x: number) => {
      return CellUtil.displayCell(cell, this.pos.x == x && this.pos.y == y);
    };
    return (
      '```\n' +
      this.getHeader(padding) +
      this.cells.map(displayCols).join('\n') +
      '\n```'
    );
  }

  private getHeader(padding: number): string {
    const width = this.size.width;
    const letters = `${' '.repeat(padding)}║ ${abc.slice(0, width).join(' ')}`;
    const border = `${'═'.repeat(padding)}╬${'═'.repeat(width * 2)}`;
    return `${letters}\n${border}\n`;
  }
}
