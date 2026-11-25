import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { MAIN_NAV_ID } from "@/lib/constants"

import ShortcutsDialog from "./ShortcutsDialog"

const meta = {
  title: "Components / Keyboard Shortcuts",
  component: ShortcutsDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: fn(),
  },
  // Stands in for the desktop bar, so the desktop-only rows show
  beforeEach: () => {
    const bar = document.createElement("ul")
    bar.id = MAIN_NAV_ID
    bar.hidden = true
    document.body.append(bar)
    return () => bar.remove()
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `?` dialog. Its rows are generated from `@/lib/keyboard-shortcuts` -- add a shortcut there and it appears here with no change to this component. The binding lives in the headless `KeyboardShortcuts` component that `BaseLayout` mounts once per page; there is no visible trigger, so this story renders the dialog directly. Rows flagged `desktopOnly` show only while the desktop nav bar is on the page, since those bindings live in it (the story stands one in), and modifier caps resolve per platform -- Cmd glyphs on Apple hardware, `Ctrl` everywhere else -- so this snapshot varies by the machine rendering it.",
      },
    },
  },
} satisfies Meta<typeof ShortcutsDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
