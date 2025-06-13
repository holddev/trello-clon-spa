import { cn } from "../../utils/utils"

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export const Textarea = ({ className, ...rest }: Props) => {
  return (
    <textarea
      {...rest}
      className={cn(
        "border-0 bg-transparent w-full outline-i-primary/60 px-2 py-1",
        "bg-i-background text-i-foreground placeholder:text-i-foreground/50",
        className
      )}
    />
  )

}