import { cn } from "../../utils/utils"

interface Props {
  children: React.ReactNode
  className?: string
}

export const CardBoardBase = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "relative h-full bg-gradient-to-br from-primary/20 via-white to-primary/20 shadow-sm p-3 hover:shadow-md flex gap-1 text-foreground rounded-md group",
        className
      )}
    >
      {children}
    </div>
  )
}