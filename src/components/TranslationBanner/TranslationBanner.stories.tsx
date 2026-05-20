import { Meta, StoryObj } from "@storybook/nextjs"

import TranslationBanner from "."

const meta = {
  title: "Components / Callouts / TranslationBanner",
  component: TranslationBanner,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'Pre-unification visual reference for the existing `TranslationBanner`. Client component with three gates: it renders only when the active locale is **not** the default (English), the current pathname matches one of `DO_NOT_TRANSLATE_PATHS` (legal pages, etc.), and the user has not previously dismissed it (`localStorage[dont-show-translation-banner-<path>]` !== `"true"`). Slated to be absorbed into the unified `Callout` per #18133 as a dismissible composition.\n\n**To see the banner in Storybook**, switch the locale toolbar to a non-English locale (e.g. German) and clear `localStorage` for the dismissal key if it has been set previously. The `usePathname` gate may still suppress the banner depending on the Storybook iframe path -- this is documented here as a known limitation of storying the component in isolation.',
      },
    },
  },
} satisfies Meta<typeof TranslationBanner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NonEnglishLocale: Story = {
  parameters: {
    locale: "de",
    docs: {
      description: {
        story:
          "Forces a non-English locale parameter for storybook-next-intl. The banner remains gated on pathname and dismissal state, so it may still render nothing.",
      },
    },
  },
}
