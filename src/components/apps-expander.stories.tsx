import { Meta, StoryObj } from "@storybook/nextjs"

import AppCard from "@/components/AppCard"
import { Grid } from "@/components/ui/grid"

import AppsExpander from "./AppsExpander"

const meta = {
  title: "Components / AppsExpander",
  component: AppsExpander,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reveals the overflow half of a server-rendered grid. Every card is in the HTML either way, so this stays usable without JS and keeps the grid itself a Server Component. Overflow cards opt into hiding themselves with `group-data-[expanded=false]/apps:hidden` -- the expander does not know which children are hidden, so the caller decides where the fold sits.",
      },
    },
  },
} satisfies Meta<typeof AppsExpander>

export default meta

type Story = StoryObj<typeof meta>

const VISIBLE = 3

const items = [
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
]

export const Default: Story = {
  args: {
    matomoEvent: {
      eventCategory: "storybook",
      eventAction: "apps-expander",
      eventName: "Show more apps",
    },
    children: (
      <Grid columns={3} size="narrow" className="my-space-2x">
        {items.map((name, index) => (
          <AppCard
            key={name}
            name={name}
            description="A short description of what this app does"
            href="https://ethereum.org"
            className={
              index >= VISIBLE
                ? "group-data-[expanded=false]/apps:hidden"
                : undefined
            }
          />
        ))}
      </Grid>
    ),
  },
}
