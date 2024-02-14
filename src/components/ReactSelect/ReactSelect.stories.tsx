import { useState } from "react"
import { Box } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import ReactSelect, { ReactSelectOnChange } from "."

// TODO: Work with closed PR diff: https://github.com/ethereum/ethereum-org-website/pull/10542/files

type ReactSelectType = typeof ReactSelect

const meta = {
  title: "Atoms / Form / Dropdown",
  component: ReactSelect,
  decorators: [
    (Story) => (
      <Box w="lg">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<ReactSelectType>

export default meta

type Story = StoryObj<typeof meta>

type SingleLayerOption = {
  label: string
  value: string
  [x: string]: unknown
}

const singleLayerOptions: SingleLayerOption[] = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Option 2",
    value: "option-2",
  },
  {
    label: "Option 3",
    value: "option-3",
  },
]

const SelectWrapper: ReactSelectType = <Option extends { value: string }>(
  props
) => {
  const [value, setValue] = useState<string | null>()

  const handleOnChange: ReactSelectOnChange<Option> = (newVal) => {
    console.log(newVal)

    setValue(newVal?.value)
    return
  }

  return (
    <>
      <div>Value selected: {value ?? "Please select an option"}</div>
      <ReactSelect onChange={handleOnChange} {...props} />
    </>
  )
}

// TODO: There should be multiple stories here. Don't forget about meaningful story names.
export const SingleLayerSelect: Story = {
  args: {
    options: singleLayerOptions,
  },
  render: (args) => <SelectWrapper {...args} />,
}

export const MultiGroupSelect: Story = {
  args: {
    options: [
      {
        label: "GroupOption 1",
        options: [
          {
            label: "GroupOption 1 Item 1",
            value: "g1-option-1",
          },
          {
            label: "GroupOption 1 Item 2",
            value: "g1-option-2",
          },
        ],
      },
    ],
  },
  render: (args) => <SelectWrapper {...args} />,
}
