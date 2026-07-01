import type { TopicConfig } from "."

export const upgrade: TopicConfig = {
  // All four dropdown keys live in page-upgrades-index.json (the aria-label
  // isn't duplicated into page-upgrades.json). The old client-side layout
  // used a `page-upgrades-index:`-prefixed key on top of a `page-upgrades`
  // namespace; the server-side equivalent is to scope to the namespace that
  // actually owns the dropdown keys.
  translationNs: "page-upgrades-index",
  dropdown: {
    textKey: "page-upgrades-upgrades-guide",
    ariaLabelKey: "page-upgrades-upgrades-aria-label",
    matomoCategory: "upgrade menu",
    items: [
      {
        textKey: "page-upgrades-upgrades-beacon-chain",
        href: "/roadmap/beacon-chain/",
        matomoEvent: "/roadmap/beacon-chain/",
      },
      {
        textKey: "page-upgrades-upgrades-docking",
        href: "/roadmap/merge/",
        matomoEvent: "/roadmap/merge/",
      },
      {
        textKey: "page-upgrades-upgrades-dencun",
        href: "/roadmap/dencun/",
        matomoEvent: "/roadmap/dencun/",
      },
      {
        textKey: "page-upgrades-upgrades-pectra",
        href: "/roadmap/pectra/",
        matomoEvent: "/roadmap/pectra/",
      },
      {
        textKey: "page-upgrades-upgrades-fusaka",
        href: "/roadmap/fusaka/",
        matomoEvent: "/roadmap/fusaka/",
      },
      {
        textKey: "page-upgrades-upgrades-glamsterdam",
        href: "/roadmap/glamsterdam/",
        matomoEvent: "/roadmap/glamsterdam/",
      },
      {
        textKey: "page-upgrades-upgrades-forks",
        href: "/ethereum-forks/",
        matomoEvent: "/ethereum-forks/",
      },
    ],
  },
  showLastUpdatedInHero: true,
}
