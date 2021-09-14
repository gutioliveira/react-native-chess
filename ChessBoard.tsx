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
  i: number;
  j: number;
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

class Pawn extends Piece {
  constructor(color: team, position: Position) {
    super(color, position);
    this.name = "Pawn";
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

const COLORS = ["white", "black"];

const ChessBoard = () => {
  const [chessBoard, setChessBoard] = useState<Board>([]);
  const [greenPositions, setGreenPositions] = useState<any>({});
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [turn, setTurn] = useState(0);

  const fillPieces = (team: team, chessBoard: Board) => {
    const firstRow = team === "white" ? 6 : 1;
    const secondRow = team === "white" ? 7 : 0;
    // for (let i = 0; i < ROW_COLUMN_SIZE; i++) {
    //   chessBoard[firstRow][i] = pieceFactory(PAWNS, team, {
    //     i: firstRow,
    //     j: i,
    //   });
    // }
    PIECES_ORDER.forEach((item, index) => {
      chessBoard[secondRow][index] = pieceFactory(item, team, {
        i: secondRow,
        j: index,
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

  const cancelMovement = () => {
    setCurrentPiece(null);
    setGreenPositions({});
  };

  const onPiecePress = (i: string, j: string) => {
    console.log(
      `I = ${i} J = ${j}`,
      JSON.stringify(currentPiece),
      JSON.stringify(greenPositions)
    );
    try {
      if (currentPiece && greenPositions[i][j]) {
        console.log(`caiu123`);
        const I = currentPiece.position.i;
        const J = currentPiece.position.j;
        const chessBoardCopy = Array.from(chessBoard);
        chessBoardCopy[I][J] = null;
        currentPiece.position.i = parseInt(i);
        currentPiece.position.j = parseInt(j);
        chessBoardCopy[parseInt(i)][parseInt(j)] = currentPiece;
        setTurn(turn + 1);
        console.log(`chessBoardCopy`, JSON.stringify(chessBoardCopy));
        cancelMovement();
        setChessBoard(chessBoardCopy);
      } else {
        cancelMovement();
      }
    } catch (e) {
      cancelMovement();
    }
  };

  const onLongPress = (piece: Piece) => {
    if (piece && COLORS[turn % 2] === piece.color) {
      const gPositions = piece.getAvailableMovements(chessBoard);
      setGreenPositions(
        gPositions.reduce((acc, currentValue, index, array) => {
          if (!acc[currentValue.i]) {
            acc[currentValue.i] = {};
          }
          acc[currentValue.i][currentValue.j] = true;
          return acc;
        }, {})
      );
      setCurrentPiece(piece);
    }
  };

  return (
    <>
      {
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Current Turn</Text>
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: COLORS[turn % 2],
              borderWidth: 1,
              marginLeft: 5,
            }}
          />
        </View>
      }
      <View style={styles.container}>
        {chessBoard.map((item: any, i: number) => {
          let color = i % 2;
          return (
            <View style={{ flexDirection: "row" }}>
              {item.map((cell: Piece, j: number) => {
                // console.log(`CELL ${JSON.stringify(cell)}`);
                let backgroundColor =
                  j === 0 ? COLORS[color] : COLORS[(color + j) % 2];

                try {
                  if (greenPositions[i][j]) {
                    backgroundColor = "green";
                  }
                } catch (e) {}

                return (
                  <TouchableWithoutFeedback
                    onLongPress={() => onLongPress(cell)}
                    onPress={() => onPiecePress(i.toString(), j.toString())}
                  >
                    <View
                      style={{
                        width: width / ROW_COLUMN_SIZE,
                        height: width / ROW_COLUMN_SIZE,
                        backgroundColor,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {cell && (
                        <Text
                          style={{
                            backgroundColor: cell.color,
                            color: cell.color === "black" ? "white" : "black",
                          }}
                        >
                          {cell.name}
                        </Text>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          );
        })}
      </View>
    </>
  );
};

export default ChessBoard;
