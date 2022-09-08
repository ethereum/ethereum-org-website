import { TranslationKey } from "../../utils/translations"

export type SectionKey =
  | "useEthereum"
  | "learn"
  | "developers"
  | "enterprise"
  | "community"

export interface IItem {
  text: TranslationKey
  to: string
  items?: Array<IItem>
  isPartiallyActive?: boolean
}

export interface ISection {
  text: TranslationKey
  ariaLabel: TranslationKey
  to?: string
  isPartiallyActive?: boolean
  items: Array<IItem>
}

export type ISections = {
  [key in SectionKey]: ISection
}
