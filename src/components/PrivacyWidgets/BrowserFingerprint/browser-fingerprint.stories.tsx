import { Meta, StoryObj } from "@storybook/nextjs"

import { staticModes } from "../../../../.storybook/modes"
import type { BrowserInfo } from "../shared/browser-info"

import BrowserFingerprintClient from "./browser-fingerprint-client"

// Fixed values so snapshots never depend on the machine running them
const demoInfo: BrowserInfo = {
  timeZone: "Europe/Lisbon",
  utcOffsetMinutes: 60,
  city: "Lisbon",
  languages: ["en-GB", "pt-PT", "en"],
  device: "mac",
  cores: 8,
  memory: 8,
  screen: { width: 1512, height: 982, pixelRatio: 2 },
  touch: false,
  darkMode: false,
  gpu: "Apple M2",
  walletCount: 2,
  fingerprint: "3fa9-c21d-7b04",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
}

const meta = {
  title: "Components / Privacy / BrowserFingerprint",
  component: BrowserFingerprintClient,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { modes: staticModes },
    docs: {
      description: {
        component:
          "Shows what any website can read about the visitor's browser without asking: time zone, languages, device, screen, graphics chip, a wallet count (never names) and a fingerprint code. Values are read and shown locally; nothing is sent.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
  args: { demoInfo },
} satisfies Meta<typeof BrowserFingerprintClient>

export default meta

type Story = StoryObj<typeof meta>

/** As on /privacy/online/: closed until the reader asks */
export const Standalone: Story = {
  args: { variant: "standalone", hideLearnMore: true },
}

/** As in the lesson: already read, with the closing link */
export const Lesson: Story = {
  args: { variant: "lesson" },
}

/** A browser that hides its graphics chip and has no wallets */
export const Hardened: Story = {
  args: {
    variant: "lesson",
    demoInfo: { ...demoInfo, gpu: null, walletCount: 0, memory: null },
  },
}
