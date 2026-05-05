import { useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "../buttons/Button"
import { PersistentPanel } from "../persistent-panel"

const meta = {
  title: "UI / PersistentPanel",
  component: PersistentPanel,
  args: {
    open: false,
    children: null,
  },
  parameters: {
    docs: {
      description: {
        component:
          "Custom side-panel overlay tuned for expensive content. Unlike `Sheet` (which mounts/unmounts on every open), `PersistentPanel` lazy-mounts on first open and then stays mounted -- toggles only flip CSS visibility. Use for heavy filter forms, virtualized lists, or any content where re-mount cost matters. For lighter cases, prefer `Sheet`.",
      },
    },
  },
} satisfies Meta<typeof PersistentPanel>

export default meta

type Story = StoryObj<typeof meta>

type DemoProps = {
  side?: "left" | "right" | "top" | "bottom"
  initialOpen?: boolean
  ariaLabel: string
  body?: React.ReactNode
}

const PanelDemo = ({
  side = "left",
  initialOpen = true,
  ariaLabel,
  body,
}: DemoProps) => {
  const [open, setOpen] = useState(initialOpen)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button
        ref={triggerRef}
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close panel" : "Open panel"}
      </Button>
      <PersistentPanel
        open={open}
        side={side}
        onOpenChange={setOpen}
        triggerRef={triggerRef}
        aria-label={ariaLabel}
      >
        <div className="flex h-full flex-col gap-4">
          <h2 className="text-lg font-semibold">{ariaLabel}</h2>
          {body ?? (
            <p className="text-sm text-body-medium">
              Panel content stays mounted between opens. Open/close several
              times — the children do not unmount.
            </p>
          )}
          <Button
            className="mt-auto"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </PersistentPanel>
    </>
  )
}

export const Default: Story = {
  render: () => <PanelDemo ariaLabel="Default panel" />,
}

export const SideLeft: Story = {
  render: () => <PanelDemo side="left" ariaLabel="Left panel" />,
}

export const SideRight: Story = {
  render: () => <PanelDemo side="right" ariaLabel="Right panel" />,
}

export const SideTop: Story = {
  render: () => <PanelDemo side="top" ariaLabel="Top panel" />,
}

export const SideBottom: Story = {
  render: () => <PanelDemo side="bottom" ariaLabel="Bottom panel" />,
}

const LazyMountProbe = () => {
  const [renderCount, setRenderCount] = useState(0)

  // Counts every render of the panel children
  return (
    <div>
      <p className="text-sm text-body-medium">
        Render count: <strong>{renderCount}</strong>
      </p>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setRenderCount((n) => n + 1)}
      >
        Bump
      </Button>
    </div>
  )
}

export const LazyMountAndPersistence: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Open the panel, bump the counter, close, then reopen — the counter retains its value because children are not unmounted. Compare this against `Sheet`, where each open is a fresh mount.",
      },
    },
  },
  render: () => (
    <PanelDemo
      side="left"
      initialOpen={false}
      ariaLabel="Lazy-mount probe"
      body={<LazyMountProbe />}
    />
  ),
}

export const StartsClosed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates lazy mount: the panel children do not render until the first open. Inspect the DOM before clicking — there is no panel element until then.",
      },
    },
  },
  render: () => (
    <PanelDemo
      side="left"
      initialOpen={false}
      ariaLabel="Initially-closed panel"
    />
  ),
}
