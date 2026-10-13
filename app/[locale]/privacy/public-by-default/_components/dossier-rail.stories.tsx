import { fn } from "storybook/test"
import { Meta, StoryObj } from "@storybook/nextjs"

import { staticModes } from "../../../../../.storybook/modes"

import { DossierRail } from "./dossier-rail"

// en + ar at lg, each in light and dark
const themedModes = Object.fromEntries(
  Object.entries(staticModes).flatMap(([key, mode]) => [
    [`${key} light`, { ...mode, theme: "light" }],
    [`${key} dark`, { ...mode, theme: "dark" }],
  ])
)

const meta = {
  title: "Pages / Privacy / DossierRail",
  component: DossierRail,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { modes: themedModes },
    docs: {
      description: {
        component:
          'The "What they know" dossier from the Public by Default lesson. Entries are grouped by witness; collected entries use the leak token, entries hidden by a fix use primary.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    onReset: fn(),
  },
} satisfies Meta<typeof DossierRail>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    state: { collected: [], fixesOn: [], privateMode: false },
  },
}

export const Partial: Story = {
  args: {
    state: {
      collected: ["tz", "langs", "device", "fp", "ip", "linked", "holdings"],
      fixesOn: [],
      privateMode: false,
    },
  },
}

export const WithFixes: Story = {
  args: {
    state: {
      collected: [
        "tz",
        "langs",
        "device",
        "fp",
        "ip",
        "linked",
        "holdings",
        "rpclog",
        "networth",
        "salary",
        "friend",
        "kyc",
      ],
      fixesOn: ["browser", "tor", "node"],
      privateMode: false,
    },
  },
}
