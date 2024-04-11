export type NotionData = Record<string, string[]>

export type DirectoryItem = {
  id: number
  path: string
  updatedAt: string
}

export type DataDirectoryItem = { data: DirectoryItem }

export type ListProjectDirectoryResponse = {
  data: DataDirectoryItem[]
}

export type DirectoryAsBucket = {
  id: number
  bucket: {
    number: string
    title: string
  }
}

export type ParsedItem = DirectoryAsBucket & {
  updatedAt: string // Date format
}

export type BucketsList = Record<string, number[]>

export type QASummary = Record<string, string[]>
