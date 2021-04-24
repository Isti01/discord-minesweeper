const abc = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase());

export interface Position {
  x: number;
  y: number;
}

export interface NormalizedOffset {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
}

export type Offset = Position;

export const resolveOffsetText = (text: string): Offset => ({
  x: Number.parseInt(text.substr(1)),
  y: abc.indexOf(text.charAt(0).toLowerCase()),
});
