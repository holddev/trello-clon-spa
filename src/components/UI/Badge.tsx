import { cn } from "../../utils/utils"

interface Props {
  className?: string
  children: React.ReactNode
}

export const Badge = ({ className, children }: Props) => {
  return (
    <span className={cn("bg-gray-500 px-2 py-1 rounded-md", className)}>
      {children}
    </span>
  )
}