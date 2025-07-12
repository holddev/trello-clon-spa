'use client';
import { useParams } from "react-router-dom"
import { BoardColumn } from "../components/board/BoardColumn"
import { BoardHeader } from "../components/board/BoardHeader"
import type { BoardDetails, newColumn, ReorderType } from "../types/types"
import { useEffect, useState, useTransition } from "react"
import { useHasChanges } from "../hooks/useHasChanges"
import { Button } from "../components/UI/Button"
import { Icons } from "../components/Icons"
import { CreateBoardColumn } from "../components/board/CreateBoardColumn"
import { editBoard, getBoardById } from "../api/boards"
import { useAuth } from "@clerk/clerk-react"
import { createColumn, deleteColumn, editColumn } from "../api/columns";
import { toast } from "../utils/toast";
import { updateTasksOrder } from "../api/tasks";
import { CircleAlertIcon, LoaderPinwheelIcon } from "lucide-react";
import { SkeletonBoardColumn } from "../components/skeletons/SkeletonColumnBoard";

export const BoardDetail = () => {
  const { id } = useParams()

  const { getToken } = useAuth()

  const [originalBoardData, setOriginalBoardData] = useState<BoardDetails>()
  const [boardData, setBoardData] = useState<BoardDetails>()
  const hasChanges = useHasChanges(originalBoardData, boardData)
  const [loadingOrder, startTransition] = useTransition()
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    async function fetchBoard() {
      setIsLoadingData(true)
      const token = await getToken()
      if (!token) return
      if (!id) return
      const board = await getBoardById({ token, id: Number(id) })
      if (!board) return setIsLoadingData(false)
      const boardOrdered = {
        ...board,
        columns: board.columns.map((col) => ({
          ...col,
          tasks: [...col.tasks].sort((a, b) => a.position - b.position),
        })),
      }
      setBoardData(boardOrdered)
      setOriginalBoardData(boardOrdered)
      setIsLoadingData(false)
    }
    fetchBoard()
  }, [getToken, id])


  const buildChangedTasksPayload = () => {
    const changes: { id: number; column_id: number; position: number }[] = []

    const originalTaskMap = new Map<number, { column_id: number; position: number }>()

    originalBoardData?.columns.forEach(col => {
      col.tasks.forEach((task, index) => {
        originalTaskMap.set(task.id, {
          column_id: col.id,
          position: index
        })
      })
    })

    boardData?.columns.forEach(col => {
      col.tasks.forEach((task, index) => {
        const original = originalTaskMap.get(task.id)
        if (!original) return

        const hasMoved = original.column_id !== col.id || original.position !== index

        if (hasMoved) {
          changes.push({
            id: task.id,
            column_id: col.id,
            position: index
          })
        }
      })
    })

    return changes
  }

  const handleSaveOrder = async () => {
    const token = await getToken()
    if (!token) return

    const changes = buildChangedTasksPayload()


    startTransition(async () => {
      const updatedOrder = await updateTasksOrder({ token, body: changes })
      if (!updatedOrder) {
        toast.error("Algo salío mal...")
        return
      }
      setOriginalBoardData(boardData)
      toast.ok("Orden actualizado...")
    })
  }
  const handleReorderColumn = (change: ReorderType) => {
    if (!boardData) return
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
  const handleAddColumn = async (newCol: newColumn) => {
    toast.loading("Creando columna...")
    const token = await getToken()
    if (!token) return

    const columnCreated = await createColumn({ token, body: newCol })

    if (columnCreated) {
      setBoardData((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          columns: [...prev.columns, columnCreated]
        }
        setOriginalBoardData(updated)
        return updated;
      })
      toast.ok("Columna creada...")
    } else {
      toast.error("Algo salío mal...")
    }
  }
  const handleDeleteColumn = async (columnId: number) => {
    toast.loading("Eliminando columna...")
    const token = await getToken()
    if (!token) return

    const deletedColumn = await deleteColumn({ token, id: columnId })

    if (deletedColumn) {
      setBoardData((prev) => {
        if (!prev) return prev;

        const updatedColumns = prev.columns?.filter(
          (col) => col.id !== columnId
        ) ?? [];

        const updated = {
          ...prev,
          columns: updatedColumns
        }
        setOriginalBoardData(updated)

        return updated;
      });
      toast.ok("Columna eliminada...")
    } else {
      toast.error("Algo salío mal...")
    }
  }
  const handleUpdateColumn = async (columnId: number, title: string) => {
    toast.loading("Actualizando columna...")
    const token = await getToken()
    if (!token) return

    const editedColum = await editColumn({ token, id: columnId, body: { title } })
    if (editedColum) {
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
        const updated = { ...prev, columns: updatedColumns }
        setOriginalBoardData(updated)

        return updated;
      })
      toast.ok("Columna actualizada...")
    } else {
      toast.error("Algo salío mal...")
    }
  }
  const handleToggleStarred = async (star: boolean) => {
    if (!boardData) return
    toast.loading("Actualizando tablero...")
    const token = await getToken()
    const updatedBoard = await editBoard({ token, id: boardData.id, body: { is_favorite: star } })
    if (!updatedBoard) return

    setBoardData((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        is_favorite: star
      }
      setOriginalBoardData(updated)
      return updated
    })
  }

  if (!id) return <>Recurso no encontrado</>
  const randomLength = Math.floor(Math.random() * 3) + 1

  return (
    <>
      <BoardHeader
        boardId={Number(id)}
        onStar={handleToggleStarred}
      />
      {
        hasChanges && (
          <div className="flex justify-end">
            <Button
              className="m-2 flex gap-2 items-center"
              onClick={handleSaveOrder}
            >
              {
                loadingOrder
                  ? (<><LoaderPinwheelIcon className="animate-spin size-5" /> Guardando...</>)
                  : (<><Icons icon="reorder" className="size-5" />Guardar Orden</>)
              }
            </Button>
          </div>
        )
      }

      <section className="relative flex gap-4 mb-24 mt-5 py-5 px-2 overflow-x-auto">
        {isLoadingData
          ? (
            <>
              {
                Array.from({ length: randomLength }).map(() => (
                  <div>
                    <SkeletonBoardColumn />
                  </div>
                ))
              }
            </>
          )
          : (
            <>
              {
                boardData && (
                  <>
                    {
                      boardData.columns && boardData.columns.map((col) => (
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
                    <CreateBoardColumn
                      boardId={boardData.id}
                      position={boardData.columns.length}
                      onAddColumn={handleAddColumn}
                    />
                  </>
                )
              }
            </>
          )
        }
      </section >
      {!boardData && (<>
        <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
          <CircleAlertIcon className="size-10 text-red-500/50" />
          <p className="text-lg font-medium text-foreground">No se encontró la tarea o tablero.</p>
        </div>
      </>)}
    </>
  )
}