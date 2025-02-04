import pickBy from "lodash/pickBy"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { viewportModes } from "../../../../.storybook/modes"
import { Explanation as ExplanationComponent } from "../Explanation"

const meta = {
  title: "Molecules / Display Content / Simulator / Explanation",
  component: ExplanationComponent,
  parameters: {
    chromatic: {
      modes: pickBy(viewportModes, (arg) =>
        ["2xl", "base"].includes(arg.viewport)
      ),
    },
  },
  args: {
    explanation: {
      header: "Begin your journey by downloading a wallet",
      description: (
        <div className="[&_p]:mb-4">
          <p>To get started, you&apos;ll need to download a wallet app.</p>
          <p>
            Most people use mobile apps, but desktop apps and browser extensions
            are also available.
          </p>
          <p>
            Let&apos;s set up a mobile wallet. Click &quot;Install a
            wallet&quot; to get started.
          </p>
        </div>
      ),
    },
    nav: {
      regressStepper: fn(),
      progressStepper: fn(),
      step: 0,
      totalSteps: 3,
      openPath: fn(),
    },
    nextPathSummary: { Icon: fn(), primaryText: "" },
    nextPathId: "send-receive",
    finalCtaLink: { href: "#", label: "Next Step", isPrimary: true },
  },
} satisfies Meta<typeof ExplanationComponent>

export default meta

type Story = StoryObj<typeof meta>

export const FirstStep: Story = {}

export const EndStep: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      totalSteps: 1,
    },
  },
}
