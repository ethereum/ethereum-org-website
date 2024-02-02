import { join } from "path"

import { CONTENT_DIR, EDIT_CONTENT_URL } from "@/lib/constants"

export const getEditPath = (relativePath: string): string =>
  new URL(join(CONTENT_DIR, relativePath, "index.md"), EDIT_CONTENT_URL).href
