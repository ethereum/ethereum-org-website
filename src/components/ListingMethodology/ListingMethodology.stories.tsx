import { Meta, StoryObj } from "@storybook/nextjs"

import ListingMethodology from "."

const meta = {
  title: "Components / Widgets / ListingMethodology",
  component: ListingMethodology,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Section that documents the listing criteria for a directory page (e.g. find-wallet). Renders a heading + description, an optional link to the full criteria, an attribution + last-updated line, and the body criteria collapsed inside an `ExpandableCard`. Server-rendered and async (uses `getTranslations`). Designed for reuse across other directory pages even though only one consumer exists today.",
      },
    },
  },
} satisfies Meta<typeof ListingMethodology>

export default meta

type Story = StoryObj<typeof meta>

const sampleCriteria = (
  <div className="space-y-4">
    <p>
      Wallets are listed against an objective rubric covering security posture,
      open-source status, supported networks, and self-custody guarantees.
    </p>
    <ul className="ml-6 list-disc space-y-1">
      <li>Independently audited security model</li>
      <li>Source code available under an OSI-approved licence</li>
      <li>Supports at least one Ethereum mainnet client</li>
      <li>Self-custodial -- keys held by the user, not the issuer</li>
    </ul>
  </div>
)

export const Default: Story = {
  args: {
    heading: "Listing methodology",
    description:
      "Criteria used to evaluate wallets considered for inclusion in the find-a-wallet directory.",
    href: "/wallets/criteria/",
    lastUpdated: "May 2026",
    children: sampleCriteria,
  },
}

export const WithoutLink: Story = {
  args: {
    heading: "Listing methodology",
    description:
      "Criteria used to evaluate wallets considered for inclusion in the find-a-wallet directory.",
    lastUpdated: "May 2026",
    children: sampleCriteria,
  },
}

export const WithFooters: Story = {
  args: {
    heading: "Listing methodology",
    description:
      "Criteria used to evaluate dapps considered for inclusion in the dapps directory.",
    href: "/dapps/criteria/",
    lastUpdated: "May 2026",
    children: sampleCriteria,
    footers: [
      "Source code review handled by the ethereum.org team.",
      "Listings refreshed quarterly. Submit a correction via GitHub if a project's status has changed.",
    ],
  },
}
