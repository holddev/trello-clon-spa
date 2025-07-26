import { EllipsisIcon, PlusIcon } from "lucide-react"
import { CardTask } from "./CardTask"
import type { Column, newTask, ReorderType, Task } from "../../types/types"
import { cn } from "../../utils/utils"
import { Badge } from "../UI/Badge"
import { Dropdown } from "../UI/Dropdown"
import { useDragAndDrop } from "@formkit/drag-and-drop/react"
import { startTransition, useOptimistic, useState } from "react"
import { CreateCardTask } from "./CreateCardTask"
import { Input } from "../UI/Input"
import { useAuth } from "@clerk/clerk-react"
import { createTask, deleteTask, editTask } from "../../api/tasks"
import { toast } from "../../utils/toast"


interface Props {
  className?: string
  columnTasks: Column
  onTasksChange: (change: ReorderType) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, title: string) => void
}

type OptimisticAction =
  | { type: 'create'; payload: newTask }
  | { type: 'update'; payload: Task }
  | { type: 'delete'; payload: { id: number } };

export const BoardColumn = ({ className, columnTasks, onTasksChange, onUpdate, onDelete }: Props) => {
  const [creating, setCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined)

  const [title, setTitle] = useState(columnTasks.title)
  const [editingTitle, setEditingTitle] = useState(false)
  const { getToken } = useAuth()

  const [refParent, tasksData, setTaskData] = useDragAndDrop<HTMLDivElement, Task>(columnTasks.tasks ?? [], {
    group: "board",
    multiDrag: true,
    onDragend: (data) => {
      const fromColumnId = columnTasks.id
      const toColumnId = data.parent.el.dataset.columnId
      const oldTasks = tasksData
      const newTasks = data.values as Task[]

      if (!Number(toColumnId)) return

      if (oldTasks.length === newTasks.length && fromColumnId === Number(toColumnId)) {
        return onTasksChange({
          type: "reorder",
          columnId: fromColumnId,
          updatedTasks: oldTasks,
        })
      }

      if (toColumnId === undefined) return
      console.log("movidos:", {
        id: toColumnId,
        tasks: newTasks
      })
      console.log("original quedo: ", {
        id: fromColumnId,
        tasks: oldTasks
      })
      return onTasksChange({
        type: "move",
        fromColumnId: fromColumnId,
        toColumnId: Number(toColumnId),
        fromTasks: oldTasks,
        toTasks: newTasks,
      })
    },
    draggable: (el) => {
      return el.id !== "no-drag";
    }
  })
  const [optimisticData, addOptimisticData] = useOptimistic(
    tasksData,
    (prev, action: OptimisticAction) => {
      const { type, payload } = action

      if (type === "create") {
        const tempTask: Task = {
          ...payload,
          created_at: (new Date()).toString(),
          id: Math.random(),
          isOptimistic: true,
        }
        if (prev.some(task => task.title === tempTask.title)) {
          return prev;
        }
        return [...prev, tempTask];
      }
      if (type === "update") {
        return prev.map((task) => {
          if (task.id === payload.id) {
            return {
              ...task,
              ...payload,
              isOptimistic: true,
            };
          }
          return task;
        })
      }
      if (type === "delete") {
        return prev.map((task) => {
          if (task.id === payload.id) {
            return {
              ...task,
              isOptimistic: true,
            };
          }
          return task;
        })
      }
      return [...prev]
    }
  )

  // Methods for tasks
  const handleEditTask = (id: number, task: Partial<Task>) => {
    const originalTask = tasksData.find(t => t.id === id)
    if (!originalTask) {
      toast.error("No se encontró la tarea original.")
      return
    }

    startTransition(async () => {
      const optimisticTask: Task = {
        ...originalTask,
        ...task,
        isOptimistic: true,
      }
      addOptimisticData({ type: "update", payload: optimisticTask })

      const token = await getToken()
      const editedTask = await editTask({ token, id, body: task })

      if (!editedTask) {
        toast.error("Algo salío mal...")
        setIsEditing(undefined)
        return
      }

      setTaskData((prev) => {
        return prev.map(task => {
          if (task.id === optimisticTask.id) {
            return ({ ...optimisticTask, isOptimistic: false })
          }
          return task
        })
      })
      setIsEditing(undefined)
    })
  }

  const handleOnSaveTask = (newTask: newTask) => {
    setCreating(false)

    startTransition(async () => {
      addOptimisticData({ type: "create", payload: newTask })
      const token = await getToken()
      const createdTask = await createTask({ token, body: newTask })

      if (!createdTask) {
        toast.error("Algo salío mal...")
        return
      }

      setTaskData((prev) => {
        return [...prev, createdTask]
      })
      toast.ok("Tarea creada...")

    })
  }

  const handleOnRemoveTask = (id: number) => {

    startTransition(async () => {
      addOptimisticData({ type: "delete", payload: { id } })
      const token = await getToken()
      const deletedTask = await deleteTask({ token, id })

      if (!deletedTask) {
        toast.error("Algo salío mal...")
        return
      }

      setTaskData((prev) => {
        return prev.filter(task => task.id !== id)
      })
      toast.ok("Tarea eliminada...")
    })
  }

  // Methods for cols
  const handleremoveColumn = () => {
    onDelete(columnTasks.id)
  }
  const handleUpdateColumn = () => {
    setEditingTitle(true)
  }

  const optionColumns = [
    {
      name: "Editar",
      action: handleUpdateColumn,
    },
    {
      name: "Eliminar",
      action: handleremoveColumn,
    }
  ]

  return (
    <article className={cn("flex flex-col gap-2 p-3 bg-gray-200/50 dark:bg-black/40 min-w-[250px] rounded-md", className)}>
      <div className="flex items-center justify-between pb-2 text-foreground group">
        {editingTitle ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm mr-2"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (title === columnTasks.title || title === "") {
                  setEditingTitle(false)
                  return
                }
                setEditingTitle(false)
                onUpdate(columnTasks.id, title)
              }
            }}
          />
        ) : (
          <h3 className="text-sm font-bold group-hover:text-primary transition">{columnTasks.title}</h3>
        )
        }
        <div className="flex items-center gap-2">
          <Badge className={cn("text-foreground bg-white dark:bg-gray-700 text-xs font-semibold rounded-full shadow-sm")} >
            {columnTasks.tasks?.length ?? 0}
          </Badge>
          <Dropdown
            trigger={
              <EllipsisIcon className="size-4" />
            }
          >
            <ul className=" text-sm bg-background">
              {optionColumns.map(option => (
                <li key={option.name} className="w-full">
                  <button
                    onClick={() => option.action()}
                    className="w-full text-start px-3 py-1 rounded-md hover:bg-primary hover:text-white/90 transition cursor-pointer"
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      </div>
      <div
        data-column-id={columnTasks.id}
        ref={refParent}
        className="flex flex-col gap-2 bg-gradient-to-br from-primary/50 to-violet-500/50 dark:to-violet-700/50 rounded-md p-2"
      >
        {
          optimisticData.map((task, index) => {
            return (
              <div
                key={`${task.id}-${index}`}
                className="relative w-full h-full"
              >
                {
                  isEditing === task.id ? (
                    <CreateCardTask
                      id="no-drag"
                      task={task}
                      onCancel={() => setIsEditing(undefined)}
                      onEdit={handleEditTask}
                    />
                  )
                    : (
                      <CardTask
                        className="w-full cursor-grab"
                        task={task}
                        onDelete={handleOnRemoveTask}
                        onEdit={(id) => setIsEditing(id)}
                      />
                    )
                }
              </div>
            )
          }
          )
        }
        {
          creating ? (
            <CreateCardTask
              id="no-drag"
              columnId={columnTasks.id}
              positionTask={columnTasks?.tasks?.length ?? 0}
              onCancel={() => setCreating(false)}
              onSave={handleOnSaveTask}
            />
          ) : (
            <button
              id="no-drag"
              onClick={() => setCreating(true)}
              className={cn(
                "text-white/60 rounded-md border-2 border-white/60 border-dashed mt-2",
                "hover:text-white hover:border-white transition",
                "w-full flex items-center gap-1 ",
                "rounded-md p-2 shadow-sm hover:shadow-md cursor-pointer"
              )}
            >
              <PlusIcon className="size-4" />Añadir Tarjeta
            </button>
          )
        }
      </div>
    </article>
  )
}