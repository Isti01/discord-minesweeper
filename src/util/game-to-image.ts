import { Game } from '@game/game';
import sharp from 'sharp';

export const gameToImage = async (game: Game): Promise<Buffer> => {
  const board = game.boardSvg;
  const size = board.length;
  const padding = 15;
  const squareSize = 75;
  const svgSize = (squareSize + padding) * size + padding;

  const svgContent = doLayout(board, squareSize, padding);
  const svg = `<svg width='${svgSize}' height='${svgSize}' viewBox='${-padding} ${-padding} ${svgSize} ${svgSize}'>${svgContent}</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
};

// every element of board is mission the opening svg tag to easily append dynamic attributes
function doLayout(board: string[][], size: number, padding: number): string {
  const boxWidth = size + padding;
  let svg = '';

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      const pos = `x='${x * boxWidth}' y='${y * boxWidth}'`;
      svg += `<svg ${pos} width='${size}' height='${size}' ${board[x][y]}`;
    }
  }

  return svg;
}
