import type { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes } from "@/storybook/modes"

import { StaticLayout } from "../Static"

import {
  ArticleBody,
  CONTRIBUTORS,
  LANG,
  LAST_EDIT,
  TOC_ITEMS,
} from "./fixtures"

const meta = {
  title: "Layouts / Static",
  component: StaticLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    chromatic: { modes: { ...langViewportModes } },
    docs: {
      description: {
        component:
          'The layout behind most standalone markdown pages (`/about/`, `/community/*`, and similar). Renders a breadcrumb + h1 hero from `frontmatter.title`, the article column with its table of contents, and the contributor/edit footer.\n\nIt also owns the `staticComponents` MDX registry -- the set of components a static markdown page may reference by name. `contentNotTranslated` forces `dir="ltr"` on the body, so an untranslated English page embedded in an RTL locale still reads correctly.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-screen-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StaticLayout>

export default meta

type Story = StoryObj<typeof meta>

const baseArgs = {
  slug: "/community/",
  tocItems: TOC_ITEMS,
  lastEditLocaleTimestamp: LAST_EDIT,
  contributors: CONTRIBUTORS,
  contentNotTranslated: false,
  frontmatter: {
    title: "Ethereum community",
    description: "Meet the people building and using Ethereum.",
    lang: LANG,
  },
  children: <ArticleBody />,
}

export const Default: Story = { args: baseArgs }

export const EditButtonHidden: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`frontmatter.hideEditButton` drops the edit-on-GitHub affordance, for pages whose source isn't editable here.",
      },
    },
  },
  args: {
    ...baseArgs,
    frontmatter: { ...baseArgs.frontmatter, hideEditButton: true },
  },
}

export const NotTranslated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`contentNotTranslated` pins the body to `dir="ltr"`. Switch the story to the `ar` locale to see the chrome flip to RTL while the untranslated article stays left-to-right.',
      },
    },
  },
  args: { ...baseArgs, contentNotTranslated: true },
}
