export interface Position {
  x: number;
  y: number;
}

export interface NormalizedOffset {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
}

export type Offset = Position;
