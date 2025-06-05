import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ children, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={cn(
        "bg-b-background hover:bg-b-background/90 text-b-foreground",
        "rounded-full cursor-pointer",
        "py-1 px-2 sm:py-2 sm:px-4",
        "transition-all duration-300 ease-in-out",
        "text-sm sm:text-base",
        rest.className
      )}
    >
      {children}
    </button >
  )
}