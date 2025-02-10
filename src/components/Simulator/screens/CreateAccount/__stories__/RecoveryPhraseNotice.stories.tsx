import type { Meta, StoryObj } from "@storybook/react/*"

import { PhoneDecorator } from "@/components/Simulator/__stories__/PhoneDecorator"

import { RecoveryPhraseNotice as Component } from "../RecoveryPhraseNotice"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / RecoveryPhraseNotice",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [PhoneDecorator],
} satisfies Meta<typeof Component>

export default meta

export const RecoveryPhraseNotice: StoryObj<typeof meta> = {}
