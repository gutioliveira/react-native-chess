import { PieceInterface, Position, team } from "../types";
import Bishop from "../pieces/bishop";
import Queen from "../pieces/queen";
import Rook from "../pieces/rook";
import Knight from "../pieces/knight";
import King from "../pieces/king";
import Pawn from "../pieces/pawn";
import Piece from "../pieces/piece";

export const pieceFactory = (
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
