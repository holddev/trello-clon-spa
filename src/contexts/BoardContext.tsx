import { createContext } from "react";
import type { TaskBoard } from "../types/types";

interface BoardContextProps {
  boards: TaskBoard[]
  addBoard: (board: TaskBoard) => void
  removeBoard: ({ id }: { id: number }) => void
  updateBoard: (board: TaskBoard) => void
  reorderBoard: (boards: TaskBoard[]) => void
}

export const BoardContext = createContext<BoardContextProps | null>(null)