import { Board, Position, team } from "../types";
import Piece from "./piece";

export default class King extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "King";
  }
  getAvailableMovements(chessBoard: Board): Array<any> {
    return [
      ...this.horizontalMovements(chessBoard, true),
      ...this.verticalMovements(chessBoard, true),
      ...this.diagonalMovements(chessBoard, true),
    ];
  }
}
