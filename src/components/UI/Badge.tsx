import { cn } from "../../utils/utils"

interface Props {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Badge = ({ className, style, children }: Props) => {
  return (
    <span
      className={cn("bg-gray-500 px-2 py-1 rounded-md", className)}
      style={style}
    >
      {children}
    </span>
  )
}