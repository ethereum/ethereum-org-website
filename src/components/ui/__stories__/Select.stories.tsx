import { SelectItem } from "@radix-ui/react-select"
import type { Meta, StoryObj } from "@storybook/react/*"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../Select"

const meta = {
  title: "Atoms / Form / ShadCn Dropdown",
  component: Select,
  parameters: {
    // TODO: Remove this when this story file becomes the primary one
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <div className="w-[32rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta

export const Dropdown: StoryObj<typeof meta> = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[
            { label: "Ethereum", value: "eth" },
            { label: "Bitcoin", value: "bit" },
            { label: "Dogecoin", value: "doge" },
          ].map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Layer2 Options</SelectLabel>
          {[
            { label: "Mainnet", value: "mainnet" },
            { label: "Arbitrum", value: "arbitrum" },
            { label: "Optimism", value: "optimism" },
          ].map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}
