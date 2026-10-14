"use client"

import {
  createContext,
  type PointerEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import type { AnatomyState } from "./anatomy/tokens"

/*
 * Hover and focus for interactive diagrams, built into InteractiveDiagram so
 * every diagram behaves the same: pointing at a part (or focusing its label)
 * draws its outline in the strongest line, turns its label to its role
 * colour, dims the other parts slightly, and shows its one-line definition
 * in the figure's status line. Parts opt in with `data-part="<id>"` on their
 * group in the drawing.
 */

interface DiagramHoverValue {
  hovered: string | null
  setHovered: (part: string | null) => void
}

const DiagramHoverContext = createContext<DiagramHoverValue>({
  hovered: null,
  setHovered: () => {},
})

export function DiagramHoverProvider({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const value = useMemo(() => ({ hovered, setHovered }), [hovered])
  return (
    <DiagramHoverContext.Provider value={value}>
      {children}
    </DiagramHoverContext.Provider>
  )
}

export const useDiagramHover = () => useContext(DiagramHoverContext)

/**
 * How to draw one part: hovered beats active, and while another part is
 * hovered this one dims.
 */
export function usePartState(litPart: string | null) {
  const { hovered } = useDiagramHover()
  return {
    hovered,
    state: (part: string): AnatomyState =>
      hovered === part ? "hover" : litPart === part ? "lit" : "rest",
    dimmed: (part: string) => hovered !== null && hovered !== part,
  }
}

const partAt = (target: EventTarget | null) =>
  target instanceof Element
    ? (target.closest<HTMLElement | SVGElement>("[data-part]")?.dataset.part ??
      null)
    : null

/**
 * Pointer handlers for the element wrapping a drawing: a mouse or pen hover
 * follows the pointer; a tap selects a part until the next tap elsewhere.
 */
export function useHoverTargets() {
  const { setHovered } = useDiagramHover()
  return {
    onPointerMove: (event: PointerEvent) => {
      if (event.pointerType !== "touch") setHovered(partAt(event.target))
    },
    onPointerLeave: (event: PointerEvent) => {
      if (event.pointerType !== "touch") setHovered(null)
    },
    onClick: (event: { target: EventTarget | null }) =>
      setHovered(partAt(event.target)),
  }
}

/**
 * Whether the diagram is on screen: `seen` turns true once it comes near the
 * viewport (to load the drawing) and `visible` follows it (to pause
 * animations and timers while it is off screen).
 */
export function useDiagramInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      setSeen(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setSeen(true)
      },
      { rootMargin: "200px 0px" }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, visible, seen }
}
