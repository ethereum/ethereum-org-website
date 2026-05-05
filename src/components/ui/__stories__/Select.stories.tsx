import type { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../flex"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../select"

const meta = {
  title: "UI / Primitives / Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "Single-select dropdown built on Radix Select. Use `SelectGroup` + `SelectLabel` to group items, `SelectSeparator` between groups. Note: `Select` does not currently expose a `hasError` variant — error styling is applied via `className` on `SelectTrigger`.",
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const FRUITS = ["Apple", "Banana", "Cherry", "Date", "Elderberry"] as const

export const WithPlaceholder: Story = {
  render: () => (
    <div className="w-[220px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit.toLowerCase()}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-[220px]">
      <Select defaultValue="banana">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit.toLowerCase()}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <div className="w-[260px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick a network" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Layer 1</SelectLabel>
            <SelectItem value="mainnet">Ethereum</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Layer 2</SelectLabel>
            <SelectItem value="arbitrum">Arbitrum One</SelectItem>
            <SelectItem value="base">Base</SelectItem>
            <SelectItem value="op">OP Mainnet</SelectItem>
            <SelectItem value="zksync">zkSync Era</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <VStack className="w-[220px]">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled (no value)" />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit.toLowerCase()}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select disabled defaultValue="apple">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit.toLowerCase()}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </VStack>
  ),
}

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Select` lacks a built-in `hasError` variant. Apply `border-error` (and matching focus token) on `SelectTrigger` to mirror the error styling used by `Input` and `Textarea`.",
      },
    },
  },
  render: () => (
    <div className="w-[220px]">
      <Select>
        <SelectTrigger className="border-error focus-visible:outline-error hover:not-disabled:border-error">
          <SelectValue placeholder="Required" />
        </SelectTrigger>
        <SelectContent>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit.toLowerCase()}>
              {fruit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <div className="w-[220px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana" disabled>
            Banana (out of stock)
          </SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
