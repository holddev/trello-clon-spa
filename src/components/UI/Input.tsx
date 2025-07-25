import { cn } from "../../utils/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = ({ className, ...rest }: Props) => {
  return (
    <input
      className={cn(
        "border-2 border-transparent outline-none focus:border-i-primary/60",
        " bg-transparent w-full px-2 py-1",
        "bg-i-background text-i-foreground placeholder:text-i-foreground/50",
        className
      )}
      {...rest}
    />
  )
}