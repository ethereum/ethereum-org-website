export type SectionKey =
  | "useEthereum"
  | "learn"
  | "developers"
  | "enterprise"
  | "community"

export interface IItem {
  text: string
  to?: string
  items?: Array<IItem>
  isPartiallyActive?: boolean
}

export interface ISection {
  text: string
  ariaLabel: string
  items: Array<IItem>
}

export type ISections = {
  [key in SectionKey]: ISection
}
