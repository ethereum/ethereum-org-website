import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack, VStack } from "../flex"
import { Tag, TagButton, TagsInlineText } from "../tag"

const meta = {
  title: "UI / Tag",
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          "Pill-style label. Combines `status` (color), `variant` (fill style), and `size`. `Tag` renders a `<div>`; `TagButton` renders a `<button>` with hover shadow and focus outline. `TagsInlineText` renders a delimited list of tag names as inline text.",
      },
    },
  },
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

const STATUSES = [
  "normal",
  "tag",
  "success",
  "error",
  "warning",
  "accent-a",
  "accent-b",
  "accent-c",
  "primary",
  "tag-green",
  "tag-yellow",
  "tag-red",
] as const

const VARIANTS = ["subtle", "high-contrast", "solid", "outline"] as const

const SIZES = ["small", "medium"] as const

export const Statuses: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All `status` values rendered with the default `subtle` variant.",
      },
    },
  },
  render: () => (
    <HStack className="flex-wrap gap-2">
      {STATUSES.map((status) => (
        <Tag key={status} status={status}>
          {status}
        </Tag>
      ))}
    </HStack>
  ),
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All `variant` values rendered with the default `normal` status.",
      },
    },
  },
  render: () => (
    <HStack className="flex-wrap gap-2">
      {VARIANTS.map((variant) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </HStack>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "`small` (text-2xs) and `medium` (text-xs, min-h-8, default).",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-2">
      {SIZES.map((size) => (
        <Tag key={size} status="tag" variant="subtle" size={size}>
          {size}
        </Tag>
      ))}
    </VStack>
  ),
}

export const StatusVariantMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Status x variant grid. Each row is a status; each column is a variant. Use this to spot styling regressions across the matrix.",
      },
    },
  },
  render: () => (
    <table className="border-separate border-spacing-2 text-xs">
      <thead>
        <tr>
          <th className="text-left text-body-medium" />
          {VARIANTS.map((variant) => (
            <th key={variant} className="text-left text-body-medium">
              {variant}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {STATUSES.map((status) => (
          <tr key={status}>
            <td className="pr-4 text-left text-body-medium">{status}</td>
            {VARIANTS.map((variant) => (
              <td key={variant}>
                <Tag status={status} variant={variant}>
                  Tag
                </Tag>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

export const Buttons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`TagButton` adds hover shadow and focus outline to make the tag a clickable button.",
      },
    },
  },
  render: () => (
    <HStack className="flex-wrap gap-2">
      {STATUSES.map((status) => (
        <TagButton key={status} status={status} type="button">
          {status}
        </TagButton>
      ))}
    </HStack>
  ),
}

export const InlineText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`TagsInlineText` renders a list as delimited inline text (default delimiter: `·`). `max` truncates the list.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-3">
      <TagsInlineText list={["Ethereum", "Arbitrum", "Base", "OP Mainnet"]} />
      <TagsInlineText
        list={["Ethereum", "Arbitrum", "Base", "OP Mainnet"]}
        delimiter="|"
      />
      <TagsInlineText
        list={["Ethereum", "Arbitrum", "Base", "OP Mainnet"]}
        max={2}
      />
      <TagsInlineText
        list={["Ethereum", "Arbitrum", "Base", "OP Mainnet"]}
        variant="light"
      />
    </VStack>
  ),
}
