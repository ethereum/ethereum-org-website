import { join } from "path"

export const getRelativePath = (routerPath: string, fileName: string) =>
  join("content", routerPath, fileName)

/**
 * Replaces back slashes of file paths generated in Windows OS with Node to forward slashes.
 */
export const toPosixPath = (path: string) => path.replace(/\\/g, "/")
