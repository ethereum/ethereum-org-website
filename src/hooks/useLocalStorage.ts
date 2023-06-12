import { useEffect, useState } from "react"

// This custom hook allows to read data from localStorage to initialize state
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(initialValue)
  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)

      setStoredValue(item ? JSON.parse(item) : initialValue)
    } catch (error) {
      console.log(error)

      return setStoredValue(initialValue)
    }
  }, [])

  return [storedValue, setValue] as const
}
