import { useState } from "react"
import { CardBoardBase } from "./CardBoardBase"
import { CheckIcon, XIcon } from "lucide-react"
import { Input } from "../UI/Input"


export const CardBoardCreate = ({ onCreate, onCancel }: {
  onCreate: (title: string) => void,
  onCancel?: () => void,
}) => {
  const [title, setTitle] = useState("")

  return (
    <CardBoardBase className="h-full flex flex-col gap-2">
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título del tablero"
        onKeyDown={(e) => e.key === "Enter" && title.trim() && onCreate(title.trim())}
      />
      <div className="flex justify-between w-fit gap-2 text-white/90">
        <button title="Guardar" onClick={() => onCreate(title.trim())} className="cursor-pointer p-2 bg-green-500 hover:bg-green-600 rounded-full transition">
          <CheckIcon className="size-4" />
        </button>
        <button title="Cancelar" onClick={onCancel} className="cursor-pointer p-2 bg-red-500 hover:bg-red-600 rounded-full transition">
          <XIcon className="size-4" />
        </button>
      </div>
    </CardBoardBase>
  )
}
