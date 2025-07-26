
import { Button } from "../UI/Button"
import { Icons } from "../Icons"
import type { Board } from "../../types/types"
import { ToggleTheme } from "../ToggleTheme"

interface Props {
  board: Board | undefined
  onStar: (star: boolean) => void
}

export const BoardHeader = ({ board, onStar }: Props) => {

  return (
    <div className="relative py-2 pl-12 pr-2 flex items-center gap-4 bg-gradient-to-br from-primary to-violet-500 dark:from-primary/80 dark:to-violet-700">
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
      <ToggleTheme className="absolute right-1 top-3" />
    </div>
  )
}