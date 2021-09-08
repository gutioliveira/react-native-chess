import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableWithoutFeedback } from "react-native";

const ROW_COLUMN_SIZE = 8;

const { width } = Dimensions.get(`window`);

const styles = {
  container: {
    width,
    height: width,
    backgroundColor: "red",
    borderWidth: 1.0,
  },
};

type team = "white" | "black";

type Board = Array<Array<any>>;

interface PieceInterface {
  name: string;
}

interface Position {
  x: number;
  y: number;
}

class Piece {
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
        let x = this.position.x + 1;
        x < (limited ? this.position.x + 2 : ROW_COLUMN_SIZE);
        x++
      ) {
        if (chessBoard[x][this.position.y] === null) {
          positions.push({ x, y: this.position.y });
        } else if (chessBoard[x][this.position.y].color !== this.color) {
          positions.push({ x, y: this.position.y });
          break;
        } else {
          break;
        }
      }
    } catch (e) {}
    try {
      for (
        let x = this.position.x - 1;
        x >= (limited ? this.position.x - 1 : 0);
        x--
      ) {
        if (chessBoard[x][this.position.y] === null) {
          positions.push({ x, y: this.position.y });
        } else if (chessBoard[x][this.position.y].color !== this.color) {
          positions.push({ x, y: this.position.y });
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
        let y = this.position.y + 1;
        y < (limited ? this.position.y + 2 : ROW_COLUMN_SIZE);
        y++
      ) {
        if (chessBoard[this.position.x][y] === null) {
          positions.push({ x: this.position.x, y });
        } else if (chessBoard[this.position.x][y].color !== this.color) {
          positions.push({ x: this.position.x, y });
          break;
        } else {
          break;
        }
      }
    } catch (e) {}
    try {
      for (
        let y = this.position.y - 1;
        y >= (limited ? this.position.y - 1 : 0);
        y--
      ) {
        if (chessBoard[this.position.x][y] === null) {
          positions.push({ x: this.position.x, y });
        } else if (chessBoard[this.position.x][y].color !== this.color) {
          positions.push({ x: this.position.x, y });
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
      let { x, y } = this.position;

      do {
        x++;
        y++;
        if (chessBoard[x][y] === null) {
          positions.push({ x, y });
        } else if (chessBoard[x][y].color !== this.color) {
          positions.push({ x, y });
          break;
        } else {
          break;
        }
      } while (x < ROW_COLUMN_SIZE && y < ROW_COLUMN_SIZE && !limited);
    } catch (e) {}

    try {
      let { x, y } = this.position;

      do {
        x--;
        y--;
        if (chessBoard[x][y] === null) {
          positions.push({ x, y });
        } else if (chessBoard[x][y].color !== this.color) {
          positions.push({ x, y });
          break;
        } else {
          break;
        }
      } while (x > 0 && y > 0 && !limited);
    } catch (e) {}

    try {
      let { x, y } = this.position;

      do {
        x++;
        y--;
        if (chessBoard[x][y] === null) {
          positions.push({ x, y });
        } else if (chessBoard[x][y].color !== this.color) {
          positions.push({ x, y });
          break;
        } else {
          break;
        }
      } while (x < ROW_COLUMN_SIZE && y > 0 && !limited);
    } catch (e) {}

    try {
      let { x, y } = this.position;

      do {
        x--;
        y++;
        if (chessBoard[x][y] === null) {
          positions.push({ x, y });
        } else if (chessBoard[x][y].color !== this.color) {
          positions.push({ x, y });
          break;
        } else {
          break;
        }
      } while (x > 0 && y < ROW_COLUMN_SIZE && !limited);
    } catch (e) {}

    return positions;
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return [];
  }
}

const pieceFactory = (
  type: PieceInterface,
  color: team,
  position: Position
) => {
  switch (type.name) {
    case "queen":
      return new Queen(color, position);
    case "bishop":
      return new Bishop(color, position);
    case "rook":
      return new Rook(color, position);
    case "knight":
      return new Knight(color, position);
    case "king":
      return new King(color, position);
    case "pawn":
      return new Pawn(color, position);
    default:
      return new Piece(color, position);
  }
};

const PAWNS: PieceInterface = {
  name: "pawn",
};

const ROOK: PieceInterface = {
  name: "rook",
};

const KNIGHT: PieceInterface = {
  name: "knight",
};

const BISHOP: PieceInterface = {
  name: "bishop",
};

const QUEEN: PieceInterface = {
  name: "queen",
};

const KING: PieceInterface = {
  name: "king",
};

const PIECES_ORDER = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];

class Rook extends Piece {
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

class Bishop extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Bishop";
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return this.diagonalMovements(chessBoard, false);
  }
}

class Queen extends Piece {
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

class King extends Piece {
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

class Knight extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Knight";
  }

  knightMovement(chessBoard: Board): Array<any> {
    const positions: Array<any> = [];
    const possiblePositions = [
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: -1, y: 2 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
      { x: -1, y: -2 },
      { x: 1, y: -2 },
      { x: 2, y: -1 },
    ];

    possiblePositions.forEach((position) => {
      let { x, y } = this.position;
      x += position.x;
      y += position.y;
      try {
        if (chessBoard[x][y] === null) {
          positions.push({ x, y });
        } else if (chessBoard[x][y].color !== this.color) {
          positions.push({ x, y });
        }
      } catch (e) {}
    });

    return positions;
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return this.knightMovement(chessBoard);
  }
}

class Pawn extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Pawn";
  }

  pawnMovement(chessBoard: Board): Array<any> {
    const direction = this.color === "white" ? -1 : 1;
    const { x, y } = this.position;
    const firstMove = this.color === "white" ? y === 6 : y === 1;
    const positions = [];
    try {
      if (chessBoard[x][y + direction] === null) {
        positions.push({ x, y: y + direction });
      }
      if (firstMove && chessBoard[x][y + 2 * direction] === null) {
        positions.push({ x, y: y + 2 * direction });
      }
    } catch {}

    try {
      if (
        chessBoard[x + 1][y + direction] &&
        chessBoard[x + 1][y + direction].color !== this.color
      ) {
        positions.push({ x: x + 1, y: y + direction });
      }
    } catch {}
    try {
      if (
        chessBoard[x - 1][y + direction] &&
        chessBoard[x - 1][y + direction].color !== this.color
      ) {
        positions.push({ x: x - 1, y: y + direction });
      }
    } catch {}
    return positions;
  }

  getAvailableMovements(chessBoard: Board): Array<any> {
    return this.pawnMovement(chessBoard);
  }
}

const COLORS = ["white", "black"];

const ChessBoard = () => {
  const [chessBoard, setChessBoard] = useState<Board>([]);

  const fillPieces = (team: team, chessBoard: Board) => {
    const firstRow = team === "white" ? 6 : 1;
    const secondRow = team === "white" ? 7 : 0;
    for (let i = 0; i < ROW_COLUMN_SIZE; i++) {
      chessBoard[firstRow][i] = pieceFactory(PAWNS, team, {
        x: firstRow,
        y: i,
      });
    }
    PIECES_ORDER.forEach((item, index) => {
      chessBoard[secondRow][index] = pieceFactory(item, team, {
        x: secondRow,
        y: index,
      });
    });
  };

  useEffect(() => {
    let c = [];
    for (let i = 0; i < ROW_COLUMN_SIZE; i++) {
      c.push(new Array(ROW_COLUMN_SIZE).fill(null));
    }
    fillPieces("white", c);
    fillPieces("black", c);
    setChessBoard(c);
  }, []);

  console.log(JSON.stringify(chessBoard));

  const onPiecePress = (piece: Piece) => {
    console.log(
      `MOVEMENTS ${piece.name}(${piece.position.y}, ${piece.position.x}) - ${piece.color}: `,
      JSON.stringify(piece.getAvailableMovements(chessBoard))
    );
  };

  return (
    <View style={styles.container}>
      {chessBoard.map((item: any, y: number) => {
        let color = y % 2;
        return (
          <View style={{ flexDirection: "row" }}>
            {item.map((cell: Piece, x: number) => {
              // console.log(`CELL ${JSON.stringify(cell)}`);
              return (
                <View
                  style={{
                    width: width / ROW_COLUMN_SIZE,
                    height: width / ROW_COLUMN_SIZE,
                    backgroundColor:
                      x === 0 ? COLORS[color] : COLORS[(color + x) % 2],
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cell && (
                    <TouchableWithoutFeedback
                      onPress={() => onPiecePress(cell)}
                    >
                      <Text style={{ color: "red" }}>{cell.name}</Text>
                    </TouchableWithoutFeedback>
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default ChessBoard;
