import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableWithoutFeedback } from "react-native";
import { ROW_COLUMN_SIZE } from "./src/constants";
import { pieceFactory } from "./src/factory/piece-factory";
import Pawn from "./src/pieces/pawn";
import Piece from "./src/pieces/piece";
import { Board, PieceInterface, Position, team } from "./src/types";

const { width } = Dimensions.get(`window`);

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

const PIECES_ORDER = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];

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
    // PIECES_ORDER.forEach((item, index) => {
    //   chessBoard[secondRow][index] = pieceFactory(item, team, {
    //     i: secondRow,
    //     j: index,
    //   });
    // });
    chessBoard[3][3] = new Pawn('black', {i: 3, j: 3}, true);
    chessBoard[3][2] = new Pawn('white', {i: 3, j: 2}, false);
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
        setTurn(turn + 1);
        cancelMovement();
        console.log('KKKKKK');
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
          acc[currentValue.i][currentValue.j] = { i: currentValue.i, j: currentValue.j, specialMovements: currentValue.specialMovements };
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
                      <View style={{position: 'absolute', backgroundColor: 'red', right: 0, bottom: 0}}>
                        <Text>{`${i} ${j}`}</Text>
                      </View>
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
