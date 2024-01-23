import { join } from 'path'

import { CONTENT_DIR, EDIT_CONTENT_URL } from '@/lib/constants'

export const getEditPath = (relativePath: string): string => join(EDIT_CONTENT_URL, CONTENT_DIR, relativePath, "index.md")
