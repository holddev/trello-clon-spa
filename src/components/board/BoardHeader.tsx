
import { Button } from "../UI/Button"
import { Icons } from "../Icons"
import type { Board } from "../../types/types"

interface Props {
  board: Board | undefined
  onStar: (star: boolean) => void
}

export const BoardHeader = ({ board, onStar }: Props) => {

  return (
    <div className="py-2 pl-12 pr-2 flex items-center gap-4 bg-gradient-to-br from-primary to-violet-500">
      <h3 className="text-xl font-semibold text-white/90" >
        {board ? board.title : '...'}
      </h3>
      {
        board && (
          <Button
            onClick={() => board && onStar(!board.is_favorite)}
            className="flex gap-2 items-center"
          >
            {<Icons icon={board.is_favorite ? "starFilled" : "star"} className="size-4" />}
            {board.is_favorite ? "Destacado" : "Destacar"}
          </Button>
        )}
    </div>
  )
}