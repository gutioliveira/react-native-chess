import Piece from "../pieces/piece";

export type team = "white" | "black";

export type Board = Array<Array<any>>;

export interface PieceInterface {
  name: string;
}

export interface Position {
  i: number;
  j: number;
  specialMovements?: Array<SpecialMovement>;
}

export interface SpecialMovement {
  i: number;
  j: number;
  value: Piece | null;
}