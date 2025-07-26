import { useState } from "react"
import { Input } from "../UI/Input"
import type { newColumn } from "../../types/types"
import { SaveIcon } from "lucide-react"

interface Props {
  onAddColumn: (column: newColumn) => void
  boardId: number
  position: number
}

export const CreateBoardColumn = ({ onAddColumn, boardId, position }: Props) => {
  const [title, setTitle] = useState("")

  const handleAddColumn = () => {
    if (!title.trim()) return

    const newColumn: newColumn = {
      title,
      board_id: boardId,
      position: position,
    }
    onAddColumn(newColumn)
    setTitle("")
  }

  return (
    <article className={"flex justify-between gap-2 p-3 h-fit bg-gray-200/50 dark:bg-black/40 min-w-[250px] rounded-md"}>
      <Input
        className="text-sm"
        placeholder="🎯Título para la columna"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddColumn()
          }
        }
        }
      />

      <button
        onClick={handleAddColumn}
        className="p-2 rounded-full bg-primary/90 hover:bg-primary transition w-fit cursor-pointer"
      >
        <SaveIcon className="size-4 text-white/90" />
      </button>
    </article>
  )
}