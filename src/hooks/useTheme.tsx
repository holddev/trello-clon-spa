import { use } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return context;
};