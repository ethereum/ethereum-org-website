import { useTranslations } from "next-intl"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes } from "@/storybook/modes"

import PageHeroComponent, { type PageHeroProps } from "."

import heroImg from "@/public/images/upgrades/merge.png"

const meta = {
  title: "Organisms / Layouts / Hero",
  component: PageHeroComponent,
  parameters: {
    layout: "none",
    // asPath lets the Breadcrumbs component resolve the "home" crumb label
    nextjs: { router: { asPath: "/en" } },
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
} satisfies Meta<typeof PageHeroComponent>

export default meta

type Story = StoryObj<typeof PageHeroComponent>

// Shared, translated content so each story below only declares the props that
// make its variation distinct (image, component, eyebrow, divider).
const useBaseProps = () => {
  const t = useTranslations("page-learn")

  const buttons: PageHeroProps["buttons"] = [
    {
      content: t("hero-button-lets-get-started"),
      toId: "what-is-crypto-ethereum",
      matomo: {
        eventCategory: "page hero buttons",
        eventAction: "click",
        eventName: "primary cta",
      },
    },
    {
      content: "Secondary",
      variant: "outline",
      matomo: {
        eventCategory: "page hero buttons",
        eventAction: "click",
        eventName: "secondary cta",
      },
    },
  ]

  return {
    title: t("hero-header"),
    description: t("hero-subtitle"),
    buttons,
  }
}

/**
 * The workhorse: breadcrumbs + image + two buttons, with the default bottom
 * divider. `title` is the page `<h1>`.
 */
export const PageHeroWithImage: Story = {
  render: () => (
    <PageHeroComponent
      breadcrumbs={{ slug: "/run-a-node/" }}
      heroImg={heroImg}
      {...useBaseProps()}
    />
  ),
}

/**
 * Text-only: omit `heroImg` and the hero collapses to a single text column.
 * Use for pages without a hero illustration.
 */
export const PageHeroTextOnly: Story = {
  render: () => (
    <PageHeroComponent
      breadcrumbs={{ slug: "/run-a-node/" }}
      {...useBaseProps()}
    />
  ),
}

/**
 * `variant="no-divider"` removes the default bottom border. Use when the
 * section immediately below the hero already provides its own top border.
 */
export const PageHeroNoDivider: Story = {
  render: () => (
    <PageHeroComponent
      breadcrumbs={{ slug: "/run-a-node/" }}
      heroImg={heroImg}
      {...useBaseProps()}
      variant="no-divider"
    />
  ),
}

/**
 * `heroComponent` renders an arbitrary node where the image would sit. On
 * desktop it sits beside the text; on mobile it folds *below* the text
 * (whereas `heroImg` stacks *above*). Use for widgets like a leaderboard or
 * stats panel. Mutually exclusive with `heroImg` at the type level.
 */
export const PageHeroWithComponent: Story = {
  render: () => (
    <PageHeroComponent
      breadcrumbs={{ slug: "/run-a-node/" }}
      heroComponent={
        <div className="grid min-h-48 place-items-center rounded-2xl border bg-background-highlight p-8 text-center text-body-medium">
          Custom component slot
        </div>
      }
      {...useBaseProps()}
    />
  ),
}

/**
 * `eyebrow` renders arbitrary content between the breadcrumbs and the title,
 * e.g. a status indicator or tag.
 */
export const PageHeroWithEyebrow: Story = {
  render: () => (
    <PageHeroComponent
      breadcrumbs={{ slug: "/run-a-node/" }}
      eyebrow={
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-success" />
          <p className="text-sm uppercase">Active</p>
        </div>
      }
      {...useBaseProps()}
    />
  ),
}
