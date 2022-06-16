import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  View,
  Dimensions,
  Text,
  PanResponder,
} from "react-native";
import { ROW_COLUMN_SIZE } from "./src/constants";
import { pieceFactory } from "./src/factory/piece-factory";
import Pawn from "./src/pieces/pawn";
import Piece from "./src/pieces/piece";
import { Board, PieceInterface, Position, team } from "./src/types";

const { width, height } = Dimensions.get(`window`);

const styles = {
  container: {
    width,
    height: width,
    backgroundColor: "red",
    borderWidth: 1.0,
  },
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

const PIECES_ORDER = [
  ROOK,
  KNIGHT, // KNIGHT,
  BISHOP, // BISHOP,
  QUEEN, // QUEEN,
  KING,
  BISHOP, // BISHOP,
  KNIGHT, // KNIGHT,
  ROOK,
];

const COLORS = ["white", "black"];

const ChessBoard = () => {
  const [chessBoard, setChessBoard] = useState<Board>([]);
  const [panBoard, setPanBoard] = useState<Board>([[]]);
  const [greenPositions, setGreenPositions] = useState<any>({});
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [turn, setTurn] = useState(0);

  const whoseTurn = turn % 2 === 0 ? "white" : "black";

  const fillPieces = (team: team, chessBoard: Board) => {
    const firstRow = team === "white" ? 6 : 1;
    const secondRow = team === "white" ? 7 : 0;
    for (let i = 0; i < ROW_COLUMN_SIZE; i++) {
      chessBoard[firstRow][i] = pieceFactory(PAWNS, team, {
        i: firstRow,
        j: i,
      });
    }
    PIECES_ORDER.forEach((item, index) => {
      chessBoard[secondRow][index] = item
        ? pieceFactory(item, team, {
            i: secondRow,
            j: index,
          })
        : null;
    });
  };

  const getReleaseSquare = (moveX: number, moveY: number): boolean => {
    const squareSize = width / ROW_COLUMN_SIZE;
    const boardWidth = squareSize * ROW_COLUMN_SIZE;
    const yRangeMin = (height - boardWidth) / 2.0;
    const yRangeMax = yRangeMin + boardWidth;
    const isOnBoard = moveY >= yRangeMin && moveY <= yRangeMax;
    if (isOnBoard) {
      onPiecePress(Math.floor((moveY - yRangeMin) / squareSize).toString(), Math.floor(moveX/squareSize).toString())
      return true;
    }
    return false;
  };

  useEffect(() => {
    const c = [];
    const p = [];
    for (let i = 0; i < ROW_COLUMN_SIZE; i++) {
      c.push(new Array(ROW_COLUMN_SIZE).fill(null));
      p.push(new Array(ROW_COLUMN_SIZE).fill(null));
    }
    fillPieces("white", c);
    fillPieces("black", c);
    setChessBoard(c);
    setPanBoard(p);
  }, []);

  useEffect(() => {
    if (chessBoard.length === 8) {
      const panBoardLocal: any[] = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ];
      for (let i = 0; i < ROW_COLUMN_SIZE; i++) {
        for (let j = 0; j < ROW_COLUMN_SIZE; j++) {
          if (
            chessBoard[i][j] !== null &&
            chessBoard[i][j].color === whoseTurn
          ) {
            const pan = new Animated.ValueXY();
            panBoardLocal[i][j] = {
              pan,
              panResponder: PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderStart: () => {
                  onLongPress(chessBoard[i][j]);
                },
                onPanResponderMove: Animated.event([
                  null,
                  {
                    dx: pan.x, // x,y are Animated.Value
                    dy: pan.y,
                  },
                ]),
                onPanResponderRelease: (evt, gestureState) => {
                  if (
                    getReleaseSquare(gestureState.moveX, gestureState.moveY)
                  ) {
                    cancelMovement();
                    Animated.spring(
                      pan, // Auto-multiplexed
                      {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                      } // Back to zero
                    ).start();
                  }
                },
              }),
            };
          }
        }
      }
      setPanBoard(panBoardLocal);
    }
  }, [chessBoard, currentPiece]);

  const cancelMovement = () => {
    setCurrentPiece(null);
    setGreenPositions({});
  };

  const onPiecePress = (i: string, j: string) => {
    try {
      if (currentPiece && greenPositions[i][j]) {
        setTurn(turn + 1);
        cancelMovement();
        setChessBoard(currentPiece.move(greenPositions[i][j], chessBoard));
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
        gPositions.reduce<any>((acc, currentValue, index, array) => {
          if (!acc[currentValue.i]) {
            acc[currentValue.i] = {};
          }
          acc[currentValue.i][currentValue.j] = {
            i: currentValue.i,
            j: currentValue.j,
            specialMovements: currentValue.specialMovements,
          };
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
            <View key={`ROW_${i}_${turn}`} style={{ flexDirection: "row" }}>
              {item.map((cell: Piece, j: number) => {
                let backgroundColor =
                  j === 0 ? COLORS[color] : COLORS[(color + j) % 2];

                try {
                  if (greenPositions[i][j]) {
                    backgroundColor = "green";
                  }
                } catch (e) {}

                return (
                  <View
                    key={`COLUMN_${i}_${j}_${panBoard[i][j] ? "panBoard" : "noPanBoard"}_${turn}`}
                    style={[
                      {
                        width: width / ROW_COLUMN_SIZE,
                        height: width / ROW_COLUMN_SIZE,
                        backgroundColor,
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    {cell &&
                      (panBoard[i][j] ? (
                        <Animated.View
                          {...panBoard[i][j].panResponder.panHandlers}
                          style={[panBoard[i][j].pan.getLayout()]}
                        >
                          <Text
                            style={{
                              backgroundColor: cell.color,
                              color: cell.color === "black" ? "green" : "blue",
                            }}
                          >
                            {cell.name}
                          </Text>
                        </Animated.View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              backgroundColor: cell.color,
                              color: cell.color === "black" ? "grey" : "black",
                            }}
                          >
                            {cell.name}
                          </Text>
                        </View>
                      ))}
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "red",
                        right: 0,
                        bottom: 0,
                      }}
                    >
                      <Text>{`${i} ${j}`}</Text>
                    </View>
                  </View>
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
