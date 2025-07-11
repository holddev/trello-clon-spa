import { Skeleton } from "../UI/Skeleton"

export const SkeletonCardBoard = () => {
  return (
    <div className="relative p-3 bg-white shadow-sm flex flex-col rounded-md justify-between gap-2 overflow-hidden animate-pulse">
      <div className="flex">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
      </div>

      <Skeleton className="absolute top-1 right-1 h-5 w-5 rounded-full" />

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  )
}