import { CalendarIcon, EditIcon, LoaderPinwheelIcon, Trash2Icon } from "lucide-react"
import { cn } from "../../utils/utils"
import type { Task } from "../../types/types"
import { Badge } from "../UI/Badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
interface Props {
  className?: string
  task: Task
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const CardTask = ({ className, task, onEdit, onDelete }: Props) => {

  return (
    <div className={cn("relative flex flex-col gap-2 rounded-md bg-white dark:bg-background shadow-sm hover:shadow-md p-2 text-foreground group", className)}>
      {task && task.isOptimistic && (
        <div className="absolute inset-0 w-full h-full backdrop-blur-[1.3px] grid place-content-center">
          <span className="flex items-center gap-2 text-sm text-primary">
            <LoaderPinwheelIcon className="size-5 animate-spin" />
            Guardando...
          </span>
        </div>
      )}
      <div className="flex items-center gap-1 flex-wrap font-semibold">
        {task.tags.map((tag) => (
          <Badge key={tag.id} className={cn("text-white/90 text-xs")} style={{ backgroundColor: tag.color }} >
            {tag.text}
          </Badge>
        ))}
      </div>
      <h4 className="font-semibold group-hover:text-primary transition text-sm">{task.title}</h4>
      <p className="text-pretty text-xs">{task.description}</p>
      <div className="flex items-center gap-2 justify-between">
        <span className="flex items-center gap-1 text-xs">
          <CalendarIcon className="size-3" />{format(new Date(task.created_at ?? new Date()), "dd MMM yyyy", { locale: es })}
        </span>
        <div className="flex items-center gap-1 text-white/90">
          <button
            title="Editar"
            aria-label="Editar"
            onClick={() => task.id && onEdit(task.id)}
            className="cursor-pointer rounded-full bg-violet-500 p-2"
          >
            <EditIcon className="size-4" />
          </button>
          <button
            title="Eliminar"
            aria-label="Eliminar"
            onClick={() => task.id && onDelete(task.id)}
            className="cursor-pointer rounded-full bg-red-500 p-2"
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}