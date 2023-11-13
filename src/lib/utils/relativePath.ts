import { join } from "path"

export const getRelativePath = (routerPath: string, fileName: string) =>
  join("content", routerPath, fileName)

/**
 * Overcomes dev environment issue on Windows. Converts windows path to posix path.
 */
export const toPosixPath = (path: string) => path.replace(/\\/g, "/")
