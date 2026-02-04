import type { Meta, StoryObj } from "@storybook/react"

import { Stack } from "../flex"
import { Heading, type HeadingLevel } from "../heading"

const meta = {
  title: "Atoms / Typography / Heading",
  component: Heading,
  parameters: {
    layout: null,
    chromatic: {
      modes: {
        "en-base": { viewport: "base", locale: "en" },
        "en-md": { viewport: "md", locale: "en" },
        "en-lg": { viewport: "lg", locale: "en" },
        "ar-base": { viewport: "base", locale: "ar" },
        "ar-md": { viewport: "md", locale: "ar" },
        "ar-lg": { viewport: "lg", locale: "ar" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

const sizes = ["xl", "lg", "md", "sm", "xs", "2xs"] as const
const levels: HeadingLevel[] = ["h1", "h2", "h3", "h4", "h5", "h6"]

/**
 * All 6 size variants at default weight, with labels.
 */
export const AllSizes: Story = {
  render: () => (
    <Stack>
      {sizes.map((size) => (
        <Heading key={size} size={size}>
          size=&quot;{size}&quot; — The quick brown fox
        </Heading>
      ))}
    </Stack>
  ),
}

/**
 * Each `as` level (h1–h6) at default size — should match
 * current global.css rendering of raw heading elements.
 */
export const SemanticLevels: Story = {
  render: () => (
    <Stack>
      {levels.map((level) => (
        <Heading key={level} as={level}>
          &lt;Heading as=&quot;{level}&quot;&gt; — The quick brown fox
        </Heading>
      ))}
    </Stack>
  ),
}

/**
 * Proves decoupling: h3 that looks like h1, h1 that looks like h4.
 */
export const DecoupledSizeAndLevel: Story = {
  render: () => (
    <Stack>
      <Heading as="h3" size="xl">
        h3 with size=&quot;xl&quot; (looks like h1)
      </Heading>
      <Heading as="h1" size="sm">
        h1 with size=&quot;sm&quot; (looks like h4)
      </Heading>
      <Heading as="h4" size="lg">
        h4 with size=&quot;lg&quot; (looks like h2)
      </Heading>
    </Stack>
  ),
}

/**
 * size="lg" in bold and black weights.
 */
export const WeightVariants: Story = {
  render: () => (
    <Stack>
      <Heading as="h2" weight="bold">
        weight=&quot;bold&quot; (default)
      </Heading>
      <Heading as="h2" weight="black">
        weight=&quot;black&quot; (SectionSubheader pattern)
      </Heading>
    </Stack>
  ),
}

/**
 * Confirms CVA overrides @layer base correctly.
 * Also shows className="font-normal" override for rare cases.
 */
export const WeightOverride: Story = {
  render: () => (
    <Stack>
      <Heading as="h2" weight="bold">
        weight=&quot;bold&quot; — CVA overrides global.css @layer base
      </Heading>
      <Heading as="h2" className="font-normal">
        className=&quot;font-normal&quot; — override via className
      </Heading>
    </Stack>
  ),
}
