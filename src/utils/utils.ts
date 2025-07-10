import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD") // Elimina acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres diacríticos
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .replace(/-+/g, "-") // Reemplaza múltiples guiones por uno solo
    .replace(/^-|-$/g, ""); // Elimina guiones al inicio o final
}