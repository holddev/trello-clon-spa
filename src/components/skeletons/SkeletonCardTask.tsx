import { Skeleton } from "../UI/Skeleton"

export const SkeletonCardTask = () => {
  return (
    <div className="bg-white w-full h-28 shadow-md rounded-md p-2 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Skeleton className="h-4 w-1/4 rounded-sm" />
        <Skeleton className="h-4 w-1/4 rounded-sm" />
      </div>
      <Skeleton className="h-4 w-3/4 rounded-sm" />
      <Skeleton className="h-4 w-full rounded-sm" />

      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/6 rounded-sm" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="size-7 rounded-full" />
        </div>
      </div>
    </div>
  )
}