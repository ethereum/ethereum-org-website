import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { useEventCallback } from "./useEventCallback"
import { useEventListener } from "./useEventListener"

// Code source: https://usehooks-ts.com/react-hook/use-local-storage

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent<{ key: string; value: unknown }>
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  // State to store our value
  // Pass initial value to support hydration server-client
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const valueRef = useRef(initialValue)

  const updateStoredValue = useCallback((value: T) => {
    valueRef.current = value
    setStoredValue(value)
  }, [])

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      )
      return
    }

    // Keep functional updates current even before React renders the next state.
    const newValue = value instanceof Function ? value(valueRef.current) : value
    updateStoredValue(newValue)

    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }

    // Share the in-memory value even when persistence failed. Reading storage
    // here would replace it with stale data in every mounted consumer.
    window.dispatchEvent(
      new CustomEvent("local-storage", { detail: { key, value: newValue } })
    )
  })

  useEffect(() => {
    updateStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStorageChange = useCallback(
    (event: StorageEvent | WindowEventMap["local-storage"]) => {
      if ("detail" in event) {
        if (event.detail.key === key) {
          updateStoredValue(event.detail.value as T)
        }
        return
      }
      if (event.key && event.key !== key) {
        return
      }
      updateStoredValue(readValue())
    },
    [key, readValue, updateStoredValue]
  )

  // this only works for other documents, not the current one
  useEventListener("storage", handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener("local-storage", handleStorageChange)

  return [storedValue, setValue]
}

// A wrapper for "JSON.parse()" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "")
  } catch {
    return undefined
  }
}
