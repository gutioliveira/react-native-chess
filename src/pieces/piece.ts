import { team, Position, Board, SpecialMovement } from "../types";
import { ROW_COLUMN_SIZE } from "../constants";

export default class Piece {
  color: team;
  position: Position;
  name: string;

  constructor(color: team, position: Position) {
    this.color = color;
    this.position = position;
    this.name = "piece";
  }

  horizontalMovements(chessBoard: Board, limited = false) {
    const positions = [];
    try {
      for (
        let j = this.position.j + 1;
        j < (limited ? this.position.j + 2 : ROW_COLUMN_SIZE);
        j++
      ) {
        if (chessBoard[this.position.i][j] === null) {
          positions.push({ j, i: this.position.i });
        } else if (chessBoard[this.position.i][j].color !== this.color) {
          positions.push({ j, i: this.position.i });
          break;
        } else {
          break;
        }
      }
    } catch (e) {}
    try {
      for (
        let j = this.position.j - 1;
        j >= (limited ? this.position.j - 1 : 0);
        j--
      ) {
        if (chessBoard[this.position.i][j] === null) {
          positions.push({ j, i: this.position.i });
        } else if (chessBoard[this.position.i][j].color !== this.color) {
          positions.push({ j, i: this.position.i });
          break;
        } else {
          break;
        }
      }
    } catch (e) {}

    return positions;
  }

  verticalMovements(chessBoard: Board, limited = false) {
    const positions = [];
    try {
      for (
        let i = this.position.i + 1;
        i < (limited ? this.position.i + 2 : ROW_COLUMN_SIZE);
        i++
      ) {
        if (chessBoard[i][this.position.j] === null) {
          positions.push({ j: this.position.j, i });
        } else if (chessBoard[i][this.position.j].color !== this.color) {
          positions.push({ j: this.position.j, i });
          break;
        } else {
          break;
        }
      }
    } catch (e) {}
    try {
      for (
        let i = this.position.i - 1;
        i >= (limited ? this.position.i - 1 : 0);
        i--
      ) {
        if (chessBoard[i][this.position.j] === null) {
          positions.push({ j: this.position.j, i });
        } else if (chessBoard[i][this.position.j].color !== this.color) {
          positions.push({ j: this.position.j, i });
          break;
        } else {
          break;
        }
      }
    } catch (e) {}

    return positions;
  }

  diagonalMovements(chessBoard: Board, limited = false) {
    const positions = [];
    try {
      let { j, i } = this.position;

      do {
        j++;
        i++;
        if (chessBoard[i][j] === null) {
          positions.push({ j, i });
        } else if (chessBoard[i][j].color !== this.color) {
          positions.push({ j, i });
          break;
        } else {
          break;
        }
      } while (j < ROW_COLUMN_SIZE && i < ROW_COLUMN_SIZE && !limited);
    } catch (e) {}

    try {
      let { j, i } = this.position;

      do {
        j--;
        i--;
        if (chessBoard[i][j] === null) {
          positions.push({ j, i });
        } else if (chessBoard[i][j].color !== this.color) {
          positions.push({ j, i });
          break;
        } else {
          break;
        }
      } while (j > 0 && i > 0 && !limited);
    } catch (e) {}

    try {
      let { j, i } = this.position;

      do {
        j++;
        i--;
        if (chessBoard[i][j] === null) {
          positions.push({ j, i });
        } else if (chessBoard[i][j].color !== this.color) {
          positions.push({ j, i });
          break;
        } else {
          break;
        }
      } while (j < ROW_COLUMN_SIZE && i > 0 && !limited);
    } catch (e) {}

    try {
      let { j, i } = this.position;

      do {
        j--;
        i++;
        if (chessBoard[i][j] === null) {
          positions.push({ j, i });
        } else if (chessBoard[i][j].color !== this.color) {
          positions.push({ j, i });
          break;
        } else {
          break;
        }
      } while (j > 0 && i < ROW_COLUMN_SIZE && !limited);
    } catch (e) {}

    return positions;
  }

  getAvailableMovements(chessBoard: Board): Array<Position> {
    return [];
  }

  move(position: Position, chessBoard: Board): Board {
    const board = Array.from(chessBoard);
    board[this.position.i][this.position.j] = null;
    this.position.i = position.i;
    this.position.j = position.j;
    board[position.i][position.j] = this;
    if (position.specialMovements){
      position.specialMovements.forEach((p: SpecialMovement) => {
        board[p.i][p.j] = p.value;
      });
    }
    return board;
  }

  specialMovements(specialMovements: Array<SpecialMovement>): void {}
}
