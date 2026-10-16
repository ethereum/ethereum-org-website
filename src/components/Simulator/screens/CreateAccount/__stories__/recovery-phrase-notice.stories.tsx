import type { Meta, StoryObj } from "@storybook/nextjs"

import { PhoneDecorator } from "@/components/Simulator/__stories__/PhoneDecorator"

import { RecoveryPhraseNotice as Component } from "../RecoveryPhraseNotice"

const meta = {
  title:
    "Components / Features / Simulator / Screens / CreateAccount / RecoveryPhraseNotice",
  component: Component,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [PhoneDecorator],
} satisfies Meta<typeof Component>

export default meta

export const RecoveryPhraseNotice: StoryObj<typeof meta> = {}
