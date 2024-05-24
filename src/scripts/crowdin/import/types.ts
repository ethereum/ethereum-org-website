export type BucketsList = Record<string, number[]>

export type LangTrackerEntry = {
  buckets: number[]
  jsonCopyCount: number
  mdCopyCount: number
  error: string
}

export type TrackerObject = {
  emptyBuckets: number
  langs: Record<string, LangTrackerEntry>
}

export type SelectionItem = {
  repoLangCode: string
  crowdinLangCode: string
  buckets: number[]
}

export type SummaryItem = {
  repoLangCode: string
  buckets: string[] | number[]
  jsonCopyCount: number
  mdCopyCount: number
  error?: string
}
