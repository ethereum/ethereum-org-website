export type DirectoryItem = {
  id: number
  path: string
  updatedAt: string
}

export type BucketsList = Record<string, number[]>

export type QASummary = Record<string, string[]>
