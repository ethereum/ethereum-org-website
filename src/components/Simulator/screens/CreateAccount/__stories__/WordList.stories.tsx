import type { Meta, StoryObj } from "@storybook/react/*"

import { WordList as Component } from "../WordList"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / WordList",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const WordList: StoryObj<typeof meta> = {
  args: {
    words: ["fake", "none", "nope", "back", "stop", "halt", "cease"],
    wordsSelected: 2,
  },
}
