"use client"

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import type { PrivacyLessonDossierId, PrivacyLessonFixId } from "@/lib/types"

import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"

import { catalogue, totalWeight } from "@/data/privacy-lesson/catalogue"
import { fixes } from "@/data/privacy-lesson/fixes"

import { useLocalStorage } from "@/hooks/useLocalStorage"

const STORAGE_PREFIX = "ethereum-org.privacy-lesson.v1"
export const STORAGE_KEYS = {
  dossier: `${STORAGE_PREFIX}.dossier`,
  fixes: `${STORAGE_PREFIX}.fixes`,
  mode: `${STORAGE_PREFIX}.mode`,
} as const

type Mode = "public" | "private"

// Module-level so the storage hook gets stable initial values
const EMPTY_DOSSIER: PrivacyLessonDossierId[] = []
const EMPTY_FIXES: PrivacyLessonFixId[] = []
const DEFAULT_MODE: Mode = "public"

const DOSSIER_IDS = new Set<string>(catalogue.map(({ id }) => id))
const FIX_IDS = new Set<string>(fixes.map(({ id }) => id))
const ALL_FIXES = fixes.map(({ id }) => id)

// Stored values come from an earlier visit (or another tab) and may be stale
// or malformed, so keep only ids the lesson still knows about.
const sanitize = <T extends string>(value: unknown, known: Set<string>): T[] =>
  Array.isArray(value)
    ? (value.filter(
        (id, i) =>
          typeof id === "string" && known.has(id) && value.indexOf(id) === i
      ) as T[])
    : []

export type DossierStatus = "unknown" | "known" | "hidden"

export interface LessonState {
  /** Entries someone has learned, in the order they were added */
  collected: PrivacyLessonDossierId[]
  /** Fixes the reader switched on (private mode overrides this, see `activeFixes`) */
  fixesOn: PrivacyLessonFixId[]
  privateMode: boolean
}

export interface LessonDerived {
  /** Fixes in effect: every fix in private mode, otherwise `fixesOn` */
  activeFixes: PrivacyLessonFixId[]
  statusOf: (id: PrivacyLessonDossierId) => DossierStatus
  /** Share of all dossier weight that is collected and not hidden, 0-1 */
  visibleShare: number
  /** Share of all dossier weight that is collected but hidden by a fix, 0-1 */
  hiddenShare: number
  knownCount: number
  hiddenCount: number
}

/** Pure, so stories and tests can derive the same view from a fixed state */
export const deriveLesson = ({
  collected,
  fixesOn,
  privateMode,
}: LessonState): LessonDerived => {
  const activeFixes = privateMode ? ALL_FIXES : fixesOn
  const collectedSet = new Set(collected)
  const isHidden = (id: PrivacyLessonDossierId) =>
    catalogue
      .find((entry) => entry.id === id)
      ?.fixes.some((fix) => activeFixes.includes(fix)) ?? false

  const statusOf = (id: PrivacyLessonDossierId): DossierStatus => {
    if (!collectedSet.has(id)) return "unknown"
    return isHidden(id) ? "hidden" : "known"
  }

  let visibleWeight = 0
  let hiddenWeight = 0
  let knownCount = 0
  let hiddenCount = 0
  for (const entry of catalogue) {
    const status = statusOf(entry.id)
    if (status === "known") {
      visibleWeight += entry.weight
      knownCount += 1
    }
    if (status === "hidden") {
      hiddenWeight += entry.weight
      hiddenCount += 1
    }
  }

  return {
    activeFixes,
    statusOf,
    visibleShare: totalWeight ? visibleWeight / totalWeight : 0,
    hiddenShare: totalWeight ? hiddenWeight / totalWeight : 0,
    knownCount,
    hiddenCount,
  }
}

interface LessonContextValue extends LessonState, LessonDerived {
  /** Adds entries to the dossier; returns the ones that were new */
  collect: (...ids: PrivacyLessonDossierId[]) => PrivacyLessonDossierId[]
  setFix: (id: PrivacyLessonFixId, on: boolean) => void
  setPrivateMode: (on: boolean) => void
  reset: () => void
  /** Increments on every reset; chapter state (useLessonStorage) clears itself on change */
  resetCount: number
}

const LessonContext = createContext<LessonContextValue | null>(null)

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  // useLocalStorage renders the initial (empty) value on the server and first
  // client render, then reads storage after mount. If storage is blocked, the
  // state still works for this visit and simply isn't kept.
  const [storedDossier, setStoredDossier] = useLocalStorage<unknown>(
    STORAGE_KEYS.dossier,
    EMPTY_DOSSIER
  )
  const [storedFixes, setStoredFixes] = useLocalStorage<unknown>(
    STORAGE_KEYS.fixes,
    EMPTY_FIXES
  )
  const [storedMode, setStoredMode] = useLocalStorage<unknown>(
    STORAGE_KEYS.mode,
    DEFAULT_MODE
  )

  const collected = useMemo(
    () => sanitize<PrivacyLessonDossierId>(storedDossier, DOSSIER_IDS),
    [storedDossier]
  )
  const fixesOn = useMemo(
    () => sanitize<PrivacyLessonFixId>(storedFixes, FIX_IDS),
    [storedFixes]
  )
  const privateMode = storedMode === "private"
  const [resetCount, setResetCount] = useState(0)

  // Chapters may collect several times in one tick (before a re-render), so
  // each call builds on the latest value rather than the rendered one.
  const latestCollected = useRef(collected)
  latestCollected.current = collected
  const latestFixes = useRef(fixesOn)
  latestFixes.current = fixesOn

  const collect = useCallback(
    (...ids: PrivacyLessonDossierId[]) => {
      const current = latestCollected.current
      const added = ids.filter(
        (id, i) => !current.includes(id) && ids.indexOf(id) === i
      )
      if (added.length) {
        const next = [...current, ...added]
        latestCollected.current = next
        setStoredDossier(next)
      }
      return added
    },
    [setStoredDossier]
  )

  const setFix = useCallback(
    (id: PrivacyLessonFixId, on: boolean) => {
      const current = latestFixes.current
      const next = on
        ? current.includes(id)
          ? current
          : [...current, id]
        : current.filter((fix) => fix !== id)
      latestFixes.current = next
      setStoredFixes(next)
      trackPrivacyLessonEvent("fix-toggled")
    },
    [setStoredFixes]
  )

  const setPrivateMode = useCallback(
    (on: boolean) => {
      setStoredMode(on ? "private" : "public")
      trackPrivacyLessonEvent("private-mode-toggled")
    },
    [setStoredMode]
  )

  const reset = useCallback(() => {
    latestCollected.current = EMPTY_DOSSIER
    latestFixes.current = EMPTY_FIXES
    setStoredDossier(EMPTY_DOSSIER)
    setStoredFixes(EMPTY_FIXES)
    setStoredMode(DEFAULT_MODE)
    setResetCount((count) => count + 1)
    trackPrivacyLessonEvent("lesson-reset")
  }, [setStoredDossier, setStoredFixes, setStoredMode])

  const value = useMemo<LessonContextValue>(() => {
    const state = { collected, fixesOn, privateMode }
    return {
      ...state,
      ...deriveLesson(state),
      collect,
      setFix,
      setPrivateMode,
      reset,
      resetCount,
    }
  }, [
    collected,
    fixesOn,
    privateMode,
    collect,
    setFix,
    setPrivateMode,
    reset,
    resetCount,
  ])

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}

export const useLesson = () => {
  const context = useContext(LessonContext)
  if (!context) throw new Error("useLesson must be used within LessonProvider")
  return context
}

/**
 * Per-chapter progress (answers, which bridges are linked, whether Send was
 * pressed) kept in this browser under the lesson's storage prefix, and
 * cleared by "Start over". Pass a module-level `initialValue` so it is stable.
 * Values are only ever read back by the lesson; validate them before use.
 */
export const useLessonStorage = <T,>(name: string, initialValue: T) => {
  const { resetCount } = useLesson()
  const [value, setValue] = useLocalStorage<T>(
    `${STORAGE_PREFIX}.${name}`,
    initialValue
  )
  const seenReset = useRef(resetCount)
  useEffect(() => {
    if (seenReset.current === resetCount) return
    seenReset.current = resetCount
    setValue(initialValue)
  }, [resetCount, initialValue, setValue])
  return [value, setValue] as const
}
