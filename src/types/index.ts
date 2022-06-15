export type team = "white" | "black";

export type Board = Array<Array<any>>;

export interface PieceInterface {
  name: string;
}

export interface Position {
  i: number;
  j: number;
  specialMovements?: Array<string>;
}

export interface SpecialMovement {
  type: string;
  args: any;
}