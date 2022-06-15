import { Board, Position, team } from "../types";
import Piece from "./piece";

export default class Rook extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Rook";
  }

  getAvailableMovements(chessBoard: Board) {
    return [
      ...this.horizontalMovements(chessBoard, false),
      ...this.verticalMovements(chessBoard, false),
    ];
  }
}
