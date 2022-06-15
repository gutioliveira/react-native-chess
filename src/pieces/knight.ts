import Piece from "./piece";
import { team, Position, Board } from "../types";

export default class Knight extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Knight";
  }

  knightMovement(chessBoard: Board): Array<any> {
    const positions: Array<any> = [];
    const possiblePositions = [
      { i: 2, j: 1 },
      { i: 1, j: 2 },
      { i: -1, j: 2 },
      { i: -2, j: 1 },
      { i: -2, j: -1 },
      { i: -1, j: -2 },
      { i: 1, j: -2 },
      { i: 2, j: -1 },
    ];

    possiblePositions.forEach((position) => {
      let { i, j } = this.position;
      i += position.i;
      j += position.j;
      try {
        if (chessBoard[i][j] === null) {
          positions.push({ i, j });
        } else if (chessBoard[i][j].color !== this.color) {
          positions.push({ i, j });
        }
      } catch (e) {}
    });

    return positions;
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return this.knightMovement(chessBoard);
  }
}
