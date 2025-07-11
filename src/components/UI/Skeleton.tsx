import { cn } from "../../utils/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Skeleton = ({ className, ...rest }: Props) => {
  return (
    <div
      className={cn("bg-skeleton rounded-md", className)}
      {...rest}
    />
  )
}
