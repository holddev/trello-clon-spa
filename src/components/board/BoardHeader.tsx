
import { Button } from "../UI/Button"
import { Icons } from "../Icons"
import type { TaskBoard } from "../../types/types"

interface Props {
  board: TaskBoard
  onStar: (star: boolean) => void
}

export const BoardHeader = ({ board, onStar }: Props) => {
  return (
    <div className="py-2 pl-12 pr-2 flex items-center gap-4 bg-gradient-to-br from-primary to-violet-500">
      <h3 className="text-xl font-semibold text-white/90" >{board.title}</h3>
      <Button
        onClick={() => onStar(!board.isStarred)}
        className="flex gap-2 items-center"
      >
        <Icons icon={board.isStarred ? "starFilled" : "star"} className="size-4" />
        {board.isStarred ? "Destacado" : "Destacar"}
      </Button>
    </div>
  )
}