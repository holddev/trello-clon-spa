import { MoonIcon, SunIcon } from "lucide-react"
import { cn } from "../utils/utils";
import { useTheme } from "../hooks/useTheme";

interface Props {
  className?: string
}

export const ToggleTheme = ({ className }: Props) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn("p-2 rounded-full cursor-pointer bg-background shadow-sm",
        theme === "dark"
          ? "border-2 border-blue-500 text-blue-500 hover:bg-black/50"
          : "border-2 border-yellow-600 text-yellow-600 hover:bg-white/80",
        className
      )}
    >
      {
        theme === "dark"
          ? <MoonIcon className="size-4" />
          : <SunIcon className="size-4" />
      }
    </button >
  )
}