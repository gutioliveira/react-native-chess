import Piece from "./piece";
import { team, Position, Board } from "../types";

export default class Pawn extends Piece {
  enPassant: boolean;

  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Pawn";
    this.enPassant = false;
  }

  pawnMovement(chessBoard: Board): Array<any> {
    const direction = this.color === "white" ? -1 : 1;
    const { i, j } = this.position;
    const firstMove = this.color === "white" ? i === 6 : i === 1;
    const positions = [];
    console.log(`firstMove ${firstMove}`);
    try {
      console.log(`${i + direction}, ${j}`);
      if (chessBoard[i + direction][j] === null) {
        positions.push({ i: i + direction, j: j });
      }
      if (firstMove && chessBoard[i + 2 * direction][j] === null) {
        positions.push({ i: i + 2 * direction, j: j });
      }
    } catch {}

    try {
      if (
        chessBoard[i + direction][j + 1] &&
        chessBoard[i + direction][j + 1].color !== this.color
      ) {
        positions.push({ j: j + 1, i: i + direction });
      }
    } catch {}

    try {
      if (
        chessBoard[i + direction][j - 1] &&
        chessBoard[i + direction][j - 1].color !== this.color
      ) {
        positions.push({ j: j - 1, i: i + direction });
      }
    } catch {}

    return positions;
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return this.pawnMovement(chessBoard);
  }
}
