export interface Cell {
  bomb: boolean;
  revealed: boolean;
  flagged: boolean;
  bombsAround: number;
}
