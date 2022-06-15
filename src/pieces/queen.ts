import Piece from "./piece";
import { team, Position, Board } from "../types";

export default class Queen extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Queen";
  }
  getAvailableMovements(chessBoard: Board): Array<any> {
    return [
      ...this.horizontalMovements(chessBoard, false),
      ...this.verticalMovements(chessBoard, false),
      ...this.diagonalMovements(chessBoard, false),
    ];
  }
}
