import { createContext } from "react";
import type { Board, ReorderBoard } from "../types/types";

interface BoardContextProps {
  boards: Board[],
  isLoadingBoards: boolean,
  addBoard: (board: Board) => void
  removeBoard: ({ id }: { id: number }) => void
  updateBoard: (board: Board) => void
  reorderBoard: (boards: ReorderBoard[]) => void
}

export const BoardContext = createContext<BoardContextProps | null>(null)