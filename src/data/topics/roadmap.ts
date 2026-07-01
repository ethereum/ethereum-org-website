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
        // Technical pages nested under their best-fitting parent section
        items: [
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
        ],
      },
      {
        textKey: "nav-roadmap-scaling",
        href: "/roadmap/scaling",
        matomoEvent: "clicked roadmap scaling home",
        items: [
          {
            textKey: "nav-roadmap-danksharding",
            href: "/roadmap/danksharding/",
            matomoEvent: "clicked roadmap danksharding",
          },
          {
            textKey: "nav-roadmap-zkevm",
            href: "/roadmap/zkevm/",
            matomoEvent: "clicked roadmap zkevm",
          },
        ],
      },
      {
        textKey: "nav-roadmap-user-experience",
        href: "/roadmap/user-experience/",
        matomoEvent: "clicked roadmap user experience home",
        items: [
          {
            textKey: "nav-roadmap-account-abstraction",
            href: "/roadmap/account-abstraction/",
            matomoEvent: "clicked roadmap account abstraction",
          },
        ],
      },
      {
        textKey: "nav-roadmap-future-proofing",
        href: "/roadmap/future-proofing",
        matomoEvent: "clicked roadmap future-proofing home",
        items: [
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
        ],
      },
    ],
  },
}
