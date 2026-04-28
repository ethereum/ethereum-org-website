import { BookOpen, HelpCircle, Shield, ShieldAlert } from "lucide-react"

import type { ItemSection } from "./types"

export const sections: {
  getHelp: ItemSection[]
  learn: ItemSection[]
} = {
  getHelp: [
    {
      titleKey: "page-community-support-something-went-wrong",
      Svg: ShieldAlert,
      colorClass: "text-accent-b",
      descriptionKey: "page-community-support-something-went-wrong-description",
      eventAction: "Something went wrong",
      items: [
        {
          labelKey: "page-community-support-lost-funds-scam",
          href: "/community/support/scams/",
          eventName: "I lost funds to a scam or fraud",
        },
        {
          labelKey: "page-community-support-secure-remaining-funds",
          href: "/community/support/scams/#secure-assets",
          eventName: "Secure remaining funds and revoke permissions",
        },
        {
          labelKey: "page-community-support-report-scam",
          href: "/community/support/scams/#report",
          eventName: "Report a scam address or website",
        },
        {
          labelKey: "page-community-support-trace-funds",
          href: "/community/support/scams/#analyze",
          eventName: "Trace where funds were sent",
        },
        {
          labelKey: "page-community-support-sent-wrong-address",
          href: "/community/support/faq/#wrong-wallet",
          eventName: "I sent to the wrong address",
        },
        {
          labelKey: "page-community-support-lost-wallet-access",
          href: "/community/support/faq/#lost-wallet-access",
          eventName: "I lost access to my wallet",
        },
        {
          labelKey: "page-community-support-stuck-transaction",
          href: "/community/support/faq/#stuck-transaction",
          eventName: "My transaction is stuck",
        },
      ],
    },
    {
      titleKey: "page-community-support-protect-yourself",
      Svg: Shield,
      colorClass: "text-accent-a",
      descriptionKey: "page-community-support-protect-yourself-description",
      eventAction: "Protect yourself",
      items: [
        {
          labelKey: "page-community-support-common-scam-tactics",
          href: "/security/#common-scams",
          eventName: "Common scam tactics and how to spot them",
        },
        {
          labelKey: "page-community-support-recovery-experts-scams",
          href: "/community/support/scams/#recovery-scams",
          eventName: "Why recovery experts are always scams",
        },
        {
          labelKey: "page-community-support-identify-scam-tokens",
          href: "/guides/how-to-id-scam-tokens/",
          eventName: "How to identify scam tokens",
        },
        {
          labelKey: "page-community-support-full-security-guide",
          href: "/security/",
          eventName: "Full security and scam prevention guide",
        },
        {
          labelKey: "page-community-support-revoke-approvals",
          href: "/community/support/scams/#revoke-approvals",
          eventName: "Revoke unnecessary token approvals",
        },
      ],
    },
  ],
  learn: [
    {
      titleKey: "page-community-support-using-ethereum",
      Svg: BookOpen,
      colorClass: "text-primary",
      descriptionKey: "page-community-support-using-ethereum-description",
      eventAction: "Using Ethereum",
      items: [
        {
          labelKey: "page-community-support-create-account",
          href: "/guides/how-to-create-an-ethereum-account/",
          eventName: "How to create an Ethereum account",
        },
        {
          labelKey: "page-community-support-use-wallet",
          href: "/guides/how-to-use-a-wallet/",
          eventName: "How to use a wallet",
        },
        {
          labelKey: "page-community-support-swap-tokens",
          href: "/guides/how-to-swap-tokens/",
          eventName: "How to swap tokens",
        },
        {
          labelKey: "page-community-support-bridge-tokens",
          href: "/guides/how-to-use-a-bridge/",
          eventName: "How to bridge tokens to layer 2",
        },
        {
          labelKey: "page-community-support-revoke-token-access",
          href: "/guides/how-to-revoke-token-access/",
          eventName: "How to revoke token access",
        },
      ],
    },
    {
      titleKey: "page-community-support-common-misconceptions",
      Svg: HelpCircle,
      colorClass: "text-accent-c",
      descriptionKey:
        "page-community-support-common-misconceptions-description",
      eventAction: "Common misconceptions",
      items: [
        {
          labelKey: "page-community-support-is-ethereum-company",
          href: "/community/support/misconceptions/#not-a-company",
          eventName: "Is Ethereum a company?",
        },
        {
          labelKey: "page-community-support-recover-freeze-funds",
          href: "/community/support/misconceptions/#no-fund-access",
          eventName: "Can someone recover or freeze my funds?",
        },
        {
          labelKey: "page-community-support-mine-ethereum",
          href: "/community/support/misconceptions/#no-mining",
          eventName: "Can I still mine Ethereum?",
        },
        {
          labelKey: "page-community-support-is-support-team",
          href: "/community/support/misconceptions/#no-support-team",
          eventName: "Is there an Ethereum support team?",
        },
      ],
    },
  ],
}
