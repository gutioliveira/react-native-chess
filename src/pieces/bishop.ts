import { Board, Position, team } from "../types";
import Piece from "./piece";

export default class Bishop extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Bishop";
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return this.diagonalMovements(chessBoard, false);
  }
}
