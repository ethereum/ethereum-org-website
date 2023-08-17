import { join } from "path"

export const getRelativePath = (routerPath: string, fileName: string) =>
  join("content", routerPath, fileName)
