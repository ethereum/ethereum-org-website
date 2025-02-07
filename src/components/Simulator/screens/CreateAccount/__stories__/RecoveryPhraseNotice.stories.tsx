import type { Meta, StoryObj } from "@storybook/react/*"

import { RecoveryPhraseNotice as Component } from "../RecoveryPhraseNotice"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / RecoveryPhraseNotice",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const RecoveryPhraseNotice: StoryObj<typeof meta> = {}
