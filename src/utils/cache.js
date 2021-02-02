import axios from "axios"

const ONE_HOUR = 1000 * 60 * 60

const writeToCache = (key, value) => {
  localStorage.setItem(
    key,
    JSON.stringify({ value, timestamp: new Date().getTime() })
  )
}

const readFromCache = (key) => JSON.parse(localStorage.getItem(key)) || null

const getFreshData = async (url, cacheResponse = false) => {
  const { data } = await axios.get(url)
  cacheResponse && writeToCache(url, data)
  return data
}

const getCachedData = (url) => readFromCache(url)

export const getData = async (url) => {
  const cachedData = getCachedData(url)
  const now = new Date().getTime()
  if (cachedData && now - cachedData.timestamp < ONE_HOUR) {
    return cachedData.value
  } else {
    return getFreshData(url, true)
  }
}
