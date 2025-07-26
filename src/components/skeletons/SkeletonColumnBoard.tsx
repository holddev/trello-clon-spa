import { cn } from "../../utils/utils"
import { Skeleton } from "../UI/Skeleton"
import { SkeletonCardTask } from "./SkeletonCardTask"

interface Props {
  className?: string
}

export const SkeletonBoardColumn = ({ className }: Props) => {
  const randomLength = Math.floor(Math.random() * 3) + 1

  return (
    <article className={cn("flex flex-col gap-2 p-3 bg-white dark:bg-gray-950 shadow-sm min-w-[250px] rounded-md animate-pulse", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-6 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>

      {/* Lista de tareas fake */}
      <div className="flex flex-col gap-2 bg-gradient-to-br from-primary/50 to-violet-500/50 dark:to-violet-700/50 rounded-md p-2">
        {Array.from({ length: randomLength }).map((_, idx) => (
          <SkeletonCardTask key={idx} />
        ))}

        <Skeleton className="mt-2 h-10 w-full rounded-md bg-transparent border-2 border-white border-dashed" />
      </div>
    </article>
  )
}
