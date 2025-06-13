import { useMemo } from "react"

export function useHasChanges<T>(original: T, current: T): boolean {
  return useMemo(() => JSON.stringify(original) !== JSON.stringify(current), [original, current])
}