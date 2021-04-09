import { Game } from '@game/game';
import sharp from 'sharp';
import { BoardSize } from '@game/board-size';

export const gameToImage = async (game: Game): Promise<Buffer> => {
  const board = game.boardSvg;
  const boardSize = game.boardSize;

  const padding = 8;
  const squareSize = 32;

  const svgWidth = (squareSize + padding) * boardSize.width + padding;
  const svgHeight = (squareSize + padding) * boardSize.height + padding;

  const svgContent = doLayout(board, squareSize, padding, boardSize);

  const viewBox = `viewBox='${-padding} ${-padding} ${svgWidth}`
  const position = `width='${svgWidth}' height='${svgHeight}'`

  const svg = `<svg ${position} ${viewBox} ${svgHeight}'>${svgContent}</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
};

// every element of board is mission the opening svg tag to easily append dynamic attributes
function doLayout(
  board: string[][],
  boxSize: number,
  padding: number,
  boardSize: BoardSize
): string {
  const boxWidth = boxSize + padding;
  let svg = '';

  for (let x = 0; x < boardSize.width; x++) {
    for (let y = 0; y < boardSize.height; y++) {
      const pos = `x='${x * boxWidth}' y='${y * boxWidth}'`;
      svg += `<svg ${pos} width='${boxSize}' height='${boxSize}' ${board[x][y]}`;
    }
  }

  return svg;
}
