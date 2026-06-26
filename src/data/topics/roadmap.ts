import type { TopicConfig } from "."

export const roadmap: TopicConfig = {
  translationNs: "common",
  dropdown: {
    textKey: "nav-roadmap-options",
    ariaLabelKey: "nav-roadmap-options-alt",
    matomoCategory: "Roadmap dropdown",
    items: [
      {
        textKey: "nav-roadmap-home",
        href: "/roadmap/",
        matomoEvent: "clicked roadmap home",
      },
      {
        textKey: "nav-roadmap-security",
        href: "/roadmap/security",
        matomoEvent: "clicked roadmap security",
      },
      {
        textKey: "nav-roadmap-scaling",
        href: "/roadmap/scaling",
        matomoEvent: "clicked roadmap scaling home",
      },
      {
        textKey: "nav-roadmap-user-experience",
        href: "/roadmap/user-experience/",
        matomoEvent: "clicked roadmap user experience home",
      },
      {
        textKey: "nav-roadmap-future-proofing",
        href: "/roadmap/future-proofing",
        matomoEvent: "clicked roadmap future-proofing home",
      },
    ],
  },
}
