import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel"

const meta = {
  title: "UI / Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Embla-backed carousel. Compose `CarouselContent` + `CarouselItem`, with `CarouselPrevious` / `CarouselNext` anywhere inside the `Carousel` -- they read the API off context, so placement is free. Pass Embla options through `opts`, and grab the instance with `setApi` when you need to drive it externally (the roadmap page syncs two carousels this way).\n\n**Not recommended for new work.** It has unresolved RTL issues and its status is pending team discussion. For a plain horizontal scroll list, `EdgeScrollContainer` is the preferred component.",
      },
    },
  },
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

const Slide = ({ n }: { n: number }) => (
  <div className="flex h-40 items-center justify-center rounded border border-border bg-background-highlight text-h3">
    {n}
  </div>
)

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xl px-14">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((n) => (
          <CarouselItem key={n}>
            <Slide n={n} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const MultipleVisible: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Item width is set with basis utilities on `CarouselItem` -- Embla itself doesn't own the sizing.",
      },
    },
  },
  render: () => (
    <Carousel className="w-full max-w-xl px-14">
      <CarouselContent>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <CarouselItem key={n} className="basis-1/3">
            <Slide n={n} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Looping: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Embla options go through `opts`. With `loop`, the prev/next buttons never reach a disabled state.",
      },
    },
  },
  render: () => (
    <Carousel className="w-full max-w-xl px-14" opts={{ loop: true }}>
      <CarouselContent>
        {[1, 2, 3, 4].map((n) => (
          <CarouselItem key={n}>
            <Slide n={n} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
