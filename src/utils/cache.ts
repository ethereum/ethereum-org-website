import axios from "axios"

const ONE_HOUR = 1000 * 60 * 60

export interface CacheStorage<T> {
  value: T
  timestamp: number
}

const emptyCacheItemStorage: CacheStorage<string> = {
  value: "",
  timestamp: 0,
}

const stringifyEmptyCacheItemStorage = JSON.stringify(emptyCacheItemStorage)

/**
 * Write inside the local storage the value returned by the API call for a given key
 * @param {string} key stored in the local storage
 * @param {T} value for a given key to write in the local storage
 */
export const writeToCache = <T>(key: string, value: T): void => {
  const cacheStorageItem: CacheStorage<T> = {
    value,
    timestamp: new Date().getTime(),
  }
  localStorage.setItem(key, JSON.stringify(cacheStorageItem))
}

/**
 * Retrieve the value stored in the local storage for a given key
 * If the value is not defined or the key does not exist, return a default CacheStorage
 * with an empty value and timestamp set to 0
 * @see CacheStorage
 * @param {string} key stored in the local storage
 * @returns {CacheStorage<T>} element stored in browser local storage
 */
const readFromCache = <T>(key: string): CacheStorage<T> => {
  return JSON.parse(
    localStorage.getItem(key) || stringifyEmptyCacheItemStorage
  ) as CacheStorage<T>
}

/**
 * API call to get the response data and store in the local storage if needed
 * @param {string} url API url
 * @param {boolean} cacheResponse should we store the value to the local storage
 * @returns {T} data response from the API
 */
export const getFreshData = async <T>(
  url: string,
  cacheResponse: boolean = false
): Promise<T> => {
  const { data } = await axios.get(url)
  cacheResponse && writeToCache(url, data)
  return data
}

const getCachedData = <T>(url: string): CacheStorage<T> => readFromCache(url)

/**
 * Get the data response from the local storage or the API
 * @param {string} url of the API
 * @returns {T} data from the API or the local storage
 */
export const getData = async <T>(url: string): Promise<T> => {
  const cachedData: CacheStorage<T> = getCachedData(url)
  const now = new Date().getTime()
  if (
    cachedData &&
    cachedData.timestamp > 0 &&
    now - cachedData.timestamp < ONE_HOUR
  ) {
    return cachedData.value
  } else {
    return getFreshData(url, true)
  }
}
