import { use } from "react";
import { BoardContext } from "../contexts/BoardContext";

export const useBoard = () => {
  const context = use(BoardContext);
  if (!context) throw new Error("useBoard debe usarse dentro de BoardProvider");
  return context;
};