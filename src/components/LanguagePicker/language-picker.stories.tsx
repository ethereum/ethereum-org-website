import type { Meta, StoryObj } from "@storybook/nextjs"

import type { LocaleDisplayInfo } from "@/lib/types"

import LanguagePicker from "."

const LANGUAGES: LocaleDisplayInfo[] = [
  {
    localeOption: "en",
    sourceName: "English",
    targetName: "English",
    englishName: "English",
    isBrowserDefault: true,
  },
  {
    localeOption: "es",
    sourceName: "Spanish",
    targetName: "Espanol",
    englishName: "Spanish",
  },
  {
    localeOption: "de",
    sourceName: "German",
    targetName: "Deutsch",
    englishName: "German",
  },
  {
    localeOption: "ja",
    sourceName: "Japanese",
    targetName: "日本語",
    englishName: "Japanese",
  },
  {
    localeOption: "ar",
    sourceName: "Arabic",
    targetName: "العربية",
    englishName: "Arabic",
  },
  {
    localeOption: "zh",
    sourceName: "Chinese Simplified",
    targetName: "简体中文",
    englishName: "Chinese Simplified",
  },
]

const meta = {
  title: "Components / Site Chrome / LanguagePicker",
  component: LanguagePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "The locale switcher in the site nav. Takes a prepared `LocaleDisplayInfo[]` -- it does no locale resolution itself, so the same component serves the desktop menu and the mobile sheet.\n\nEach entry carries both a `sourceName` (the language in the *current* UI language) and a `targetName` (the language in its own script), which is what lets a reader who can't read the current UI language still find their own. `isBrowserDefault` surfaces the browser-preferred locale near the top.\n\nThe menu renders inline rather than behind a trigger -- the nav supplies its own disclosure around it. Selecting a locale performs a hard navigation by design: a soft push to an intercepting `@modal` route would re-open the modal instead of switching locale.",
      },
    },
  },
} satisfies Meta<typeof LanguagePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { languages: LANGUAGES },
}

export const SingleLanguage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "One entry -- the search field and the no-results path still render, so the empty state stays reachable.",
      },
    },
  },
  args: { languages: [LANGUAGES[0]] },
}
