import { Box, ChakraProvider } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Trilemma from "."

const meta = {
  title: "Molecules / Trilemma",
  component: Trilemma,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Box
          w="100vw"
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="radial-gradient(46.28% 66.31% at 66.95% 58.35%, #e6e6f7 0%, #e7edfa 50%, #e9fbfa 100%)"
        >
          <Story />
        </Box>
      </ChakraProvider>
    ),
  ],
} satisfies Meta<typeof Trilemma>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Trilemma />,
}
