// Native implementation of lodash functions used within repo

const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const groupBy = <T, K extends PropertyKey>(
  array: T[],
  iteratee: ((item: T) => K) | keyof T
): Record<K, T[]> => {
  return array.reduce(
    (result, item) => {
      const key =
        typeof iteratee === "function" ? iteratee(item) : (item[iteratee] as K)
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(item)
      return result
    },
    {} as Record<K, T[]>
  )
}

const merge = <T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!target || typeof target !== "object") return target

  const result = { ...target } as Record<string, unknown>

  for (const source of sources) {
    if (!source || typeof source !== "object") continue

    for (const [key, value] of Object.entries(source)) {
      if (value === undefined) continue

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        result[key] &&
        typeof result[key] === "object" &&
        !Array.isArray(result[key])
      ) {
        // Recursively merge nested objects
        result[key] = merge(
          result[key] as Record<string, unknown>,
          value as Record<string, unknown>
        )
      } else {
        // Direct assignment for primitives, arrays, or null values
        result[key] = value
      }
    }
  }

  return result as T
}

const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[] | K,
  ...restKeys: K[]
): Pick<T, K> => {
  // Handle array case: pick(obj, ['key1', 'key2'])
  if (Array.isArray(keys)) {
    return keys.reduce(
      (result, key) => {
        if (key in obj) {
          result[key] = obj[key]
        }
        return result
      },
      {} as Pick<T, K>
    )
  }

  // Handle multiple arguments case: pick(obj, 'key1', 'key2')
  const allKeys = [keys, ...restKeys]
  return allKeys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    },
    {} as Pick<T, K>
  )
}

const pickBy = <T>(
  obj: Record<string, T>,
  predicate: (value: T, key: string) => boolean
): Record<string, T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(value, key))
  )
}

const reverse = <T>(array: T[]): T[] => {
  return [...array].reverse()
}

const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array] // Create a copy to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const sortBy = <T>(
  array: T[],
  iteratees:
    | (keyof T | ((item: T) => unknown))[]
    | keyof T
    | ((item: T) => unknown)
): T[] => {
  const iterateesArray = Array.isArray(iteratees) ? iteratees : [iteratees]

  return [...array].sort((a, b) => {
    for (const iteratee of iterateesArray) {
      let aVal: unknown, bVal: unknown

      if (typeof iteratee === "function") {
        aVal = iteratee(a)
        bVal = iteratee(b)
      } else {
        aVal = a[iteratee]
        bVal = b[iteratee]
      }

      // Handle comparison of unknown types
      if (aVal === bVal) continue
      if (aVal == null) return -1
      if (bVal == null) return 1

      // Convert to string for comparison if needed
      const aStr = String(aVal)
      const bStr = String(bVal)

      if (aStr < bStr) return -1
      if (aStr > bStr) return 1
    }
    return 0
  })
}
const union = <T>(...arrays: T[][]): T[] => {
  const combined = arrays.flat()
  return [...new Set(combined)]
}

export {
  capitalize,
  groupBy,
  merge,
  pick,
  pickBy,
  reverse,
  shuffle,
  sortBy,
  union,
}
