import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import ShortcutsDialog from "./ShortcutsDialog"

const meta = {
  title: "Components / Keyboard Shortcuts",
  component: ShortcutsDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `?` dialog. Its rows are generated from `@/lib/keyboard-shortcuts` -- add a shortcut there and it appears here with no change to this component. The binding lives in the headless `KeyboardShortcuts` component that `BaseLayout` mounts once per page; there is no visible trigger, so this story renders the dialog directly. Rows flagged `desktopOnly` are hidden below `md`, where those bindings do not exist, and modifier caps resolve per platform -- Cmd glyphs on Apple hardware, `Ctrl` everywhere else -- so this snapshot varies by the machine rendering it.",
      },
    },
  },
} satisfies Meta<typeof ShortcutsDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
