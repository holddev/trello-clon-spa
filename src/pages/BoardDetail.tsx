import { useParams } from "react-router-dom"
import { BoardColumn } from "../components/board/BoardColumn"
import { BoardHeader } from "../components/board/BoardHeader"
import { useBoard } from "../hooks/useBoard"
import type { ReorderType, TaskBoard, TaskColumn } from "../types/types"
import { useEffect, useState } from "react"
import { useHasChanges } from "../hooks/useHasChanges"
import { Button } from "../components/UI/Button"
import { Icons } from "../components/Icons"
import { CreateBoardColumn } from "../components/board/CreateBoardColumn"

export const BoardDetail = () => {
  const { id } = useParams()
  const { boards } = useBoard()
  const board = boards.find(board => board.id.toString() === id)
  const [boardData, setBoardData] = useState<TaskBoard | undefined>(board)
  const hasChanges = useHasChanges(board, boardData)
  useEffect(() => {
    setBoardData(board)
  }, [board])

  if (!boardData) return null


  const handleReorderColumn = (change: ReorderType) => {
    if (change.type === "reorder") {
      const updatedData = boardData.columns.map(cols => {
        if (cols.id === change.columnId) {
          return {
            ...cols,
            tasks: change.updatedTasks
          }
        }
        return cols
      })
      setBoardData({
        ...boardData,
        columns: updatedData
      })
    }
    if (change.type === "move") {
      const updatedData = boardData.columns.map(cols => {
        if (cols.id === change.fromColumnId) {
          return {
            ...cols,
            tasks: change.fromTasks
          }
        }
        if (cols.id === change.toColumnId) {
          return {
            ...cols,
            tasks: change.toTasks
          }
        }

        return cols
      })
      setBoardData({
        ...boardData,
        columns: updatedData
      })
    }
  }
  const handleAddColumn = (newCol: TaskColumn) => {

    setBoardData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: [...prev.columns, newCol]
      };
    })
  }

  const handleDeleteColumn = (columnId: number) => {

    setBoardData((prev) => {
      if (!prev) return prev;

      const updatedColumns = prev.columns?.filter(
        (col) => col.id !== columnId
      ) ?? [];

      return {
        ...prev,
        columns: updatedColumns,
      };
    });
  }
  const handleUpdateColumn = (columnId: number, title: string) => {
    setBoardData((prev) => {
      if (!prev) return prev;

      const updatedColumns = prev.columns?.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            title
          };
        }
        return col;
      })
      return { ...prev, columns: updatedColumns };
    })
  }
  const handleToggleStarred = (star: boolean) => {
    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        isStarred: star
      }
    })
  }

  return (
    <>
      <BoardHeader
        board={boardData}
        onStar={handleToggleStarred}
      />
      {
        hasChanges && (
          <div className="flex justify-end">
            <Button
              className="m-2 flex gap-2 items-center"
            >
              <Icons icon="reorder" className="size-5" />Guardar Orden
            </Button>
          </div>
        )
      }

      <section className="relative flex gap-4 mb-24 mt-5 py-5 px-2 overflow-x-auto">
        {
          boardData.columns.map((col) => (
            <BoardColumn
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
              onTasksChange={handleReorderColumn}
              className="w-[270px]"
              columnTasks={col}
              key={col.title}
            />
          ))
        }
        <CreateBoardColumn onAddColumn={handleAddColumn} />
      </section>
    </>
  )
}