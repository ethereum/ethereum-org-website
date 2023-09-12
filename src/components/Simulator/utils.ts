import { navigate } from "gatsby"
import { PATH_IDS } from "./constants"
import type { PathId } from "./types"

export const clearUrlParams = (location: Location): void => {
  navigate(location.pathname + location.hash, { replace: true })
}

export const getValidPathId = (pathIdString: string | null): PathId | null => {
  if (!isValidPathId(pathIdString)) return null
  return pathIdString
}

const isValidPathId = (pathIdString: string | null): pathIdString is PathId => {
  return PATH_IDS.includes(pathIdString as PathId)
}
