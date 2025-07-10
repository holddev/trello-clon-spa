import { ArrowRightIcon, ClockFadingIcon, EditIcon, LoaderPinwheelIcon, SaveIcon, Trash2Icon } from "lucide-react"
import { Icons } from "../Icons"
import { Link } from "react-router-dom"
import { CardBoardBase } from "./CardBoardBase"
import { useState } from "react"
import { Input } from "../UI/Input"
import { cn, generateSlug } from "../../utils/utils"
import { format } from 'date-fns'
import { es } from "date-fns/locale"
import type { Board } from "../../types/types"

interface Props {
  board: Board
  onToggleStar: (id: number) => void
  onUpdateBoard: (id: number, title: string) => void
  onRemoveBoard: (id: number) => void
}

export const CardBoard = ({ board, onToggleStar, onUpdateBoard, onRemoveBoard }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(board.title)

  const handleUpdateBoard = () => {
    onUpdateBoard(board.id, title.trim())
    setIsEditing(false)
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim()) {
      handleUpdateBoard()
    }
  }

  const handleActiveEdit = () => { setIsEditing(true) }

  return (
    <CardBoardBase className="flex flex-col justify-between gap-2 overflow-hidden">
      <div className="flex">
        <div className="w-full flex flex-col gap-2">
          {isEditing ? (
            <Input
              autoFocus
              onKeyDown={handleOnKeyDown}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-7 text-sm"
            />
          ) : (
            <h3
              onDoubleClick={() => setIsEditing(true)}
              className="font-semibold group-hover:text-primary transition line-clamp-2"
            >
              {board.title}
            </h3>
          )}
          <span className="flex items-center gap-1 text-sm">
            <ClockFadingIcon className="size-4" />
            {format(board?.created_at || new Date(), "dd MMM", { locale: es })}
          </span>
        </div>
        <span className="w-fit text-6xl font-bold text-primary/20 group-hover:text-primary/40 transition" >
          {board.cols ?? 0}
        </span>
      </div>
      <button onClick={() => onToggleStar(board.id)} className="absolute right-1 top-1 cursor-pointer">
        <Icons icon={board.is_favorite ? "starFilled" : "star"} className="size-5 text-yellow-500" />
      </button>
      <div className="flex items-center justify-between text-white/90">

        <div className="flex items-center gap-2">
          <button
            disabled={board.isOptimistic}
            onClick={isEditing ? handleUpdateBoard : handleActiveEdit}
            className={cn("cursor-pointer transition p-2 rounded-full",
              isEditing ? "bg-yellow-600" : "bg-sky-500"
            )}
            title="Editar"
          >
            {isEditing
              ? <SaveIcon className="size-4" />
              : <EditIcon className="size-4" />}
          </button>
          <button
            onClick={() => onRemoveBoard(board.id)}
            className={cn("cursor-pointer transition p-2 rounded-full bg-red-500")}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>

        <Link
          to={`/dashboard/${board.id}/${generateSlug(board.title)}`}
          title="Abrir"
          className="rounded-full flex items-center gap-1 px-3 py-1
          transition duration-300 bg-primary/70 group-hover:bg-primary/90 
          lg:opacity-0 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          Abrir
          <ArrowRightIcon className="size-4" />
        </Link>

      </div>
      {board.isOptimistic && (
        <div className="absolute inset-0 w-full h-full backdrop-blur-[1.3px] grid place-content-center">
          <span className="flex items-center gap-2 text-sm text-primary">
            <LoaderPinwheelIcon className="size-5 animate-spin" />
            Guardando...
          </span>
        </div>
      )}
    </CardBoardBase >
  )
}