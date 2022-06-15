import Piece from "./piece";
import { team, Position, Board, SpecialMovement } from "../types";
import { EN_PASSANT, KILL_PASSANT } from "../constants";

export default class Pawn extends Piece {
  enPassant: boolean;

  constructor(color: team, position: Position, enPassant = false) {
    super(color, position);
    this.name = "Pawn";
    this.enPassant = enPassant;
  }

  pawnMovement(chessBoard: Board): Array<Position> {
    const direction = this.color === "white" ? -1 : 1;
    const { i, j } = this.position;
    const firstMove = this.color === "white" ? i === 6 : i === 1;
    const positions: Position[] = [];
    console.log(`firstMove ${firstMove}`);
    try {
      console.log(`${i + direction}, ${j}\n`);
      if (chessBoard[i + direction][j] === null) {
        positions.push({ i: i + direction, j: j, specialMovements: [
          {i: i + direction, j: j, value: new Pawn(this.color, {i: i + direction, j: j}, false)}
        ]});
      }
      if (firstMove && chessBoard[i + 2 * direction][j] === null) {
        positions.push({ i: i + 2 * direction, j: j, specialMovements: [
          {i: i + 2 * direction, j: j, value: new Pawn(this.color, {i: i + 2 * direction, j: j}, true)}
        ] });
      }
      if (chessBoard[i][j+1] !== null && chessBoard[i][j+1].name === this.name && chessBoard[i][j+1].enPassant){
        positions.push({ i: i + direction, j: j+1, specialMovements: [{i, j: j+1, value: null}]});
      }
      if (chessBoard[i][j-1] !== null && chessBoard[i][j-1].name === this.name && chessBoard[i][j-1].enPassant){
        positions.push({ i: i + direction, j: j-1, specialMovements: [{i, j: j-1, value: null}]});
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
