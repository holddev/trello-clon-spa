import { useEffect, useState } from "react"
import type { Board, ReorderBoard } from "../types/types"
import { BoardContext } from "./BoardContext"
import { useAuth } from "@clerk/clerk-react"
import { getBoards } from "../api/boards"

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boards, setBoads] = useState<Board[]>([])
  const [isLoadingBoards, setIsLoadingBoards] = useState(true);
  const { getToken } = useAuth()

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoadingBoards(true)
      const token = await getToken()
      const boardsFromApi = await getBoards({ token })
      const sortedBoards = boardsFromApi.sort((a, b) => a.order - b.order)
      setBoads(sortedBoards)
      setIsLoadingBoards(false)
    }

    fetchBoards()
  }, [getToken])

  const addBoard = (board: Board) => {
    const newBoards = [...boards, board]
    setBoads(newBoards)
  }

  const removeBoard = ({ id }: { id: number }) => {
    const newBoards = boards.filter((board) => board.id !== id)
    setBoads(newBoards)
  }

  const updateBoard = (board: Board) => {
    const newBoards = boards.map((b) => {
      if (b.id === board.id) {
        return board
      }
      return b
    })
    setBoads(newBoards)
  }

  const reorderBoard = (reorderBoards: ReorderBoard[]) => {

    const updatedBoards = boards.map((board) => {
      const match = reorderBoards.find((rb) => rb.id === board.id)
      if (match) {
        return {
          ...board,
          order: match.order,
        }
      }
      return board
    })

    const sortedBoards = updatedBoards.sort((a, b) => a.order - b.order)

    setBoads(sortedBoards)
  }

  return (
    <BoardContext value={{
      boards,
      isLoadingBoards,
      addBoard,
      removeBoard,
      updateBoard,
      reorderBoard,
    }}>
      {children}
    </BoardContext>
  )
}