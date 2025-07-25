import { createContext } from "react";
import type { Theme } from "../types/types";


interface ThemeProps {
  theme: Theme,
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeProps | null>(null)