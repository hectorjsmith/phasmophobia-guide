import { useMemo } from "react"

const compareStringsAsc = (a, b) => {
  return a.toUpperCase().localeCompare(b.toUpperCase())
}

export const useSortedEvidence = (evidence) => {
  return useMemo(() => evidence.sort((a, b) => {
    return compareStringsAsc(a.name, b.name)
  }), [evidence])
}

export const useSortedGhosts = (ghosts) => {
  return useMemo(() => ghosts.sort((a, b) => {
    return compareStringsAsc(a.name, b.name)
  }), [ghosts])
}
