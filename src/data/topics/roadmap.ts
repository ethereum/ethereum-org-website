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
      // Additional technical pages
      {
        textKey: "nav-roadmap-account-abstraction",
        href: "/roadmap/account-abstraction/",
        matomoEvent: "clicked roadmap account abstraction",
      },
      {
        textKey: "nav-roadmap-danksharding",
        href: "/roadmap/danksharding/",
        matomoEvent: "clicked roadmap danksharding",
      },
      {
        textKey: "nav-roadmap-pbs",
        href: "/roadmap/pbs/",
        matomoEvent: "clicked roadmap pbs",
      },
      {
        textKey: "nav-roadmap-secret-leader-election",
        href: "/roadmap/secret-leader-election/",
        matomoEvent: "clicked roadmap secret leader election",
      },
      {
        textKey: "nav-roadmap-single-slot-finality",
        href: "/roadmap/single-slot-finality/",
        matomoEvent: "clicked roadmap single slot finality",
      },
      {
        textKey: "nav-roadmap-statelessness",
        href: "/roadmap/statelessness/",
        matomoEvent: "clicked roadmap statelessness",
      },
      {
        textKey: "nav-roadmap-verkle-trees",
        href: "/roadmap/verkle-trees/",
        matomoEvent: "clicked roadmap verkle trees",
      },
      {
        textKey: "nav-roadmap-zkevm",
        href: "/roadmap/zkevm/",
        matomoEvent: "clicked roadmap zkevm",
      },
    ],
  },
}
