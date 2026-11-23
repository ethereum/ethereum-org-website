import { useLocale, useTranslations } from "next-intl"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  getHistoryChapters,
  getHistoryLabels,
} from "@/data/open-source/history"

import HistoryChapters from "./history-chapters"

const SECTION_ID = "history"

const track = (name: string) => ({
  eventCategory: "open-source",
  eventAction: SECTION_ID,
  eventName: name,
})

// The page passes its rendered Further reading entries; placeholders here.
const CITATIONS = Object.fromEntries(
  Array.from({ length: 16 }, (_, i) => [
    i + 4,
    `Further reading entry ${i + 4}`,
  ])
)

// Mirrors the page: strings resolve here and the island receives them as props.
const Resolved = () => {
  const t = useTranslations("page-open-source")
  const locale = useLocale()
  return (
    <HistoryChapters
      chapters={getHistoryChapters(t, track, locale)}
      labels={getHistoryLabels(t)}
      startLabel={t("page-open-source-history-start")}
      startHint={t("page-open-source-history-start-hint")}
      startEvent={track("Start from beginning")}
      finalCtas={[
        {
          label: t("page-open-source-history-cta-switch"),
          href: "#how-to-switch-to-open-source-apps",
        },
        {
          label: t("page-open-source-history-cta-orgs"),
          href: "#open-beyond-code",
        },
      ]}
      citations={CITATIONS}
    />
  )
}

const meta = {
  title: "Pages / Open Source / HistoryChapters",
  component: Resolved,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Six era cards that open one stepped dialog, from the `/open-source` page. Content is data: `getHistoryChapters(t, track, locale)` in `src/data/open-source/history.ts` resolves every string server-side, so the island carries no i18n of its own. Read progress persists per chapter in `localStorage` (`open-source-history-progress`); clear it to reset the strips. A part-read chapter resumes on the furthest step seen. Below `md` the dialog goes full-bleed via the `fullscreenMobile` variant on `ui/dialog-modal`. Source markers open the citation in place (tooltip on desktop, popover on touch). Arrow keys and touch swipes step (mirrored in RTL), Enter takes the primary action (Next, the next chapter, or the closing hand-off), the segmented bar jumps (each beat of the story keeps its own icon and color in every chapter), and the last step of a chapter hands off to the next one inside the same dialog. `#history-<slug>` opens a chapter directly and the URL tracks the open one; a visually hidden copy of every chapter keeps the text crawlable.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flow max-w-4xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Resolved>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
