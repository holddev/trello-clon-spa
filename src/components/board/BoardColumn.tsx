import { EllipsisIcon, PlusIcon } from "lucide-react"
import { CardTask } from "./CardTask"
import type { ReorderType, Task, TaskColumn } from "../../types/types"
import { cn } from "../../utils/utils"
import { Badge } from "../UI/Badge"
import { Dropdown } from "../UI/Dropdown"
import { useDragAndDrop } from "@formkit/drag-and-drop/react"
import { startTransition, useOptimistic, useState } from "react"
import { CreateCardTask } from "./CreateCardTask"
import { Input } from "../UI/Input"


interface Props {
  className?: string
  columnTasks: TaskColumn
  onTasksChange: (change: ReorderType) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, title: string) => void
}

type OptimisticAction =
  | { type: 'create'; payload: Task }
  | { type: 'update'; payload: Task }
  | { type: 'delete'; payload: { id: number } };

export const BoardColumn = ({ className, columnTasks, onTasksChange, onUpdate, onDelete }: Props) => {
  const [creating, setCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined)

  const [title, setTitle] = useState(columnTasks.title)
  const [editingTitle, setEditingTitle] = useState(false)

  const [refParent, tasksData, setTaskData] = useDragAndDrop<HTMLDivElement, Task>(columnTasks.tasks, {
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
        return [...prev, { ...payload, isOptimistic: true }];
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


  const handleEditTask = (id: number, task: Task) => {
    startTransition(async () => {
      addOptimisticData({ type: "update", payload: task })
      const newTask = {
        ...task,
        isOptimistic: false,
      }
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTaskData((prev) => {
        return prev.map(task => {
          if (task.id === newTask.id) {
            return newTask
          }
          return task
        })
      })
      setIsEditing(undefined)
    })
  }

  const handleOnSaveTask = (newTask: Task) => {
    setCreating(false)
    startTransition(async () => {
      addOptimisticData({ type: "create", payload: newTask })
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTaskData((prev) => {
        console.log("hay esto en prev: ", prev)
        return [...prev, {
          ...newTask,
          id: prev.length + 1,
          isOptimistic: false,
        }]
      })

    })
  }

  const handleOnRemoveTask = (id: number) => {

    startTransition(async () => {
      addOptimisticData({ type: "delete", payload: { id } })
      await new Promise(resolve => setTimeout(resolve, 3000))
      setTaskData((prev) => {
        return prev.filter(task => task.id !== id)
      })
    })
  }

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
    <article className={cn("flex flex-col gap-2 p-3 bg-gray-200/50 min-w-[250px] rounded-md", className)}>
      <div className="flex items-center justify-between pb-2 text-foreground">
        {editingTitle ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm mr-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditingTitle(false)
                onUpdate(columnTasks.id, title)
              }
            }}
          />
        ) : (
          <h3 className="text-sm font-bold">{columnTasks.title}</h3>
        )
        }
        <div className="flex items-center gap-2">
          <Badge className={cn("bg-gray-300 text-xs")} >
            {columnTasks.tasks.length}
          </Badge>
          <Dropdown
            trigger={
              <EllipsisIcon className="size-4" />
            }
          >
            <ul className=" text-sm bg-background">
              {optionColumns.map(option => (
                <li className="w-full">
                  <button
                    onClick={() => option.action()}
                    className="w-full text-start px-3 py-1 rounded-md hover:bg-primary hover:text-white/90 transition"
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
        className="flex flex-col gap-2 bg-gradient-to-br from-primary/50 to-violet-500/50 rounded-md p-2"
      >
        {
          optimisticData.map((task) => {
            return (
              <div
                key={task.id}
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
              onCancel={() => setCreating(false)}
              onSave={handleOnSaveTask}
            />
          ) : (
            <button
              id="no-drag"
              onClick={() => setCreating(true)}
              className={cn(
                "bg-white text-foreground mt-2",
                "w-full flex items-center gap-1 ",
                "rounded-md p-2 shadow-sm hover:shadow-md cursor-pointer"
              )}
            >
              <PlusIcon className="size-4" />Nuevo
            </button>
          )
        }
      </div>
    </article>
  )
}