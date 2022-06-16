import { Board, Position, team } from "../types";
import Piece from "./piece";
import Rook from "./rook";

export default class King extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "King";
  }

  castling(chessBoard: Board): Array<any> {
    const positions: Array<any> = [];
    const leftCastle = this.color === 'white' ? {i: 7, j: 0} : {i: 0, j: 0};
    const rightCastle = this.color === 'white' ? {i: 7, j: 7} : {i: 0, j: 7};

    if (this.hasMoved){
      return positions;
    }

    if (chessBoard[leftCastle.i][leftCastle.j]?.hasMoved === false){
      let proceed = true;
      for (let i = 1; i <= 3; i++){
        if (chessBoard[leftCastle.i][i]){
          proceed = false;
        }
      }
      if (proceed){
        positions.push({i: leftCastle.i, j: leftCastle.j + 2, specialMovements: [
          {
            i: leftCastle.i,
            j: leftCastle.j,
            value: null,
          },
          {
            i: leftCastle.i,
            j: leftCastle.j + 3,
            value: new Rook(this.color, {i: leftCastle.i, j: leftCastle.j + 3}),
          },
        ]});
      }
    }

    if (chessBoard[rightCastle.i][rightCastle.j]?.hasMoved === false){
      let proceed = true;
      for (let i = 6; i >= 5; i--){
        if (chessBoard[rightCastle.i][i]){
          proceed = false;
        }
      }
      if (proceed){
        positions.push({i: rightCastle.i, j: rightCastle.j - 1, specialMovements: [
          {
            i: rightCastle.i,
            j: rightCastle.j,
            value: null,
          },
          {
            i: rightCastle.i,
            j: rightCastle.j - 2,
            value: new Rook(this.color, {i: rightCastle.i, j: rightCastle.j - 2}),
          },
        ]});
      }
    }

    return positions;
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return [
      ...this.horizontalMovements(chessBoard, true),
      ...this.verticalMovements(chessBoard, true),
      ...this.diagonalMovements(chessBoard, true),
      ...this.castling(chessBoard)
    ];
  }
}
