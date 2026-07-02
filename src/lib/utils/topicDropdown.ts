import type {
  List as ButtonDropdownList,
  ListItem as ButtonDropdownListItem,
} from "@/components/ButtonDropdown"

import type { TopicConfig, TopicDropdownItem } from "@/data/topics"

/**
 * Maps a topic's `dropdown` config into the `ButtonDropdownList` the
 * `ButtonDropdown` component consumes, translating `textKey`s and preserving
 * nested `items` (rendered indented). `eventAction` is parameterized so each
 * call site keeps its existing Matomo casing.
 */
export const buildTopicDropdown = (
  dropdown: TopicConfig["dropdown"],
  t: (key: string) => string,
  eventAction = "click"
): ButtonDropdownList => {
  const mapItem = (item: TopicDropdownItem): ButtonDropdownListItem => ({
    text: t(item.textKey),
    href: item.href,
    matomo: {
      eventCategory: dropdown.matomoCategory,
      eventAction,
      eventName: item.matomoEvent,
    },
    ...(item.items ? { items: item.items.map(mapItem) } : {}),
  })

  return {
    text: t(dropdown.textKey),
    ariaLabel: t(dropdown.ariaLabelKey),
    items: dropdown.items.map(mapItem),
  }
}
