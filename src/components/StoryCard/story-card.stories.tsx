import type { Meta, StoryObj } from "@storybook/nextjs"

import type { Story as CommunityStory } from "@/lib/types"

import StoryCard from "."

const SHORT: CommunityStory = {
  storyKey: "short",
  name: "Ama",
  story:
    "I sent my first transaction on a bus in Accra and it settled before my stop. That was the moment it stopped being theory.",
  storyOriginal: null,
  twitter: null,
  country: "Ghana",
  date: "2025-03-14",
}

const LONG: CommunityStory = {
  storyKey: "long",
  name: "Mateo",
  story: [
    "I found Ethereum through a game. A friend sent me a link, I made a wallet, and I spent a weekend reading about what was actually happening underneath.",
    "Two years later I maintain a small library that other people depend on. I have never met most of them, and we have shipped together across six time zones.",
    "What kept me here was not the price. It was that nobody had to give me permission to start.",
  ].join("\n\n"),
  storyOriginal: [
    "Encontre Ethereum a traves de un juego. Un amigo me envio un enlace, cree una billetera y pase un fin de semana leyendo sobre lo que realmente pasaba por debajo.",
    "Dos anos despues mantengo una pequena libreria de la que dependen otras personas. Nunca conoci a la mayoria, y hemos publicado juntos en seis zonas horarias.",
    "Lo que me mantuvo aqui no fue el precio. Fue que nadie tuvo que darme permiso para empezar.",
  ].join("\n\n"),
  twitter: "https://twitter.com/ethereum",
  country: "Argentina",
  date: "2024-11-02",
}

const meta = {
  title: "Components / StoryCard",
  component: StoryCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "A single community story, used on `/stories` and `/10years`. Self-contained state, so it drops into a single-column list or a masonry grid unchanged.\n\nTwo behaviors worth knowing. The **flip toggle** swaps between the localized copy and the original-language submission, and hides itself when `storyOriginal` is absent or identical to `story` -- an English submission read in English shows no toggle. The **read-more expander** is gated behind `expandable`: pass `false` in masonry layouts, where an inline height change would reflow every column.",
      },
    },
  },
} satisfies Meta<typeof StoryCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { story: LONG },
}

export const NoOriginalLanguage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`storyOriginal: null` -- the flip toggle is hidden because there is nothing to flip to.",
      },
    },
  },
  args: { story: SHORT },
}

export const NotExpandable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`expandable={false}` shows the copy in full and drops the read-more control. This is what `/stories` uses so its masonry columns don't reflow.",
      },
    },
  },
  args: { story: LONG, expandable: false },
}

export const WithoutDate: Story = {
  parameters: {
    docs: {
      description: {
        story: "`showDate={false}` hides the submission date.",
      },
    },
  },
  args: { story: LONG, showDate: false },
}
