import { CalendarIcon, CheckIcon, LoaderPinwheelIcon, XIcon } from "lucide-react"
import { cn } from "../../utils/utils"
import { Input } from "../UI/Input"
import { Textarea } from "../UI/Textarea"
import { useState } from "react"
import type { newTask, Tag, Task } from "../../types/types"
import { TagInput } from "../TagInput"

interface Props {
  id: string
  className?: string
  onCancel: () => void
  task?: Task
  columnId?: number
  positionTask?: number
  onSave?: (task: newTask) => void
  onEdit?: (id: number, task: Partial<Task>) => void
}

export const CreateCardTask = ({ id, task, columnId, positionTask, className, onSave, onEdit, onCancel }: Props) => {

  const [tags, setTags] = useState<Tag[]>(task?.tags ?? []);

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    // modo edicion
    if (task?.id) {
      const editedTask: Partial<Task> = {
        title: formData.title as string,
        description: formData.description as string,
        tags: tags
      }
      return onEdit?.(task.id, editedTask)
    }
    const newTask: newTask = {
      title: formData.title as string,
      description: formData.description as string,
      column_id: columnId ?? 0,
      position: positionTask ?? 0,
      tags: tags
    }
    return onSave?.(newTask)
  }

  return (
    <div id={id} className={cn("relative flex flex-col gap-2 rounded-md bg-white shadow-sm hover:shadow-md p-2 text-foreground group", className)}>
      {task && task.isOptimistic && (
        <div className="absolute inset-0 w-full h-full backdrop-blur-[1.3px] grid place-content-center">
          <span className="flex items-center gap-2 text-sm text-primary">
            <LoaderPinwheelIcon className="size-5 animate-spin" />
            Guardando...
          </span>
        </div>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Etiquetas</label>
          <TagInput initialTags={tags} onChange={setTags} />
        </div>
        <Input
          name="title"
          placeholder="Inserte el titulo"
          className="text-sm"
          defaultValue={task?.title}
        />
        <Textarea
          name="description"
          className="text-sm"
          placeholder="Ingrese el detalle de la tarea"
          rows={4}
          defaultValue={task?.description ?? ""}
        />
        <div className="flex items-center justify-between">
          <span className="flex text-xs items-center gap-1">
            <CalendarIcon className="size-3" />
            Cargando...
          </span>
          <div className="flex items-center gap-2 text-white/90">
            <button type="submit" title="Guardar" className="cursor-pointer p-2 bg-green-500 hover:bg-green-600 rounded-full transition">
              <CheckIcon className="size-4" />
            </button>
            <button onClick={onCancel} type="button" title="Cancelar" className="cursor-pointer p-2 bg-red-500 hover:bg-red-600 rounded-full transition">
              <XIcon className="size-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}