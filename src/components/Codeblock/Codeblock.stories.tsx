import { Meta, StoryObj } from "@storybook/nextjs"

import Codeblock from "."

const meta = {
  title: "Components / Content / Codeblock",
  component: Codeblock,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Syntax-highlighted code block built on `prism-react-renderer`. Renders a line-numbered listing, with optional Copy and Show all / Show less controls. Languages with copy-button support: `js`, `json`, `python`, `solidity`. `bash` blocks suppress line numbers. Pass `fromHomepage` to render without the top bar (no copy, no collapse).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Codeblock>

export default meta

type Story = StoryObj<typeof meta>

const solidityExample = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() external {
        count += 1;
    }

    function reset() external {
        count = 0;
    }
}`

const jsExample = `import { createPublicClient, http } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const block = await client.getBlock()
console.log(block.number)`

const pythonExample = `from web3 import Web3

w3 = Web3(Web3.HTTPProvider("https://mainnet.example/v3/KEY"))

latest = w3.eth.get_block("latest")
print(latest.number)`

const bashExample = `pnpm install
pnpm dev`

export const Default: Story = {
  args: {
    codeLanguage: "language-solidity",
    children: solidityExample,
  },
}

export const JavaScript: Story = {
  args: {
    codeLanguage: "language-js",
    children: jsExample,
  },
}

export const Python: Story = {
  args: {
    codeLanguage: "language-python",
    children: pythonExample,
  },
}

export const Bash: Story = {
  args: {
    codeLanguage: "language-bash",
    children: bashExample,
  },
}

export const Collapsible: Story = {
  args: {
    codeLanguage: "language-solidity",
    allowCollapse: true,
    children: Array.from(
      { length: 40 },
      (_, i) => `    uint256 line${i} = ${i};`
    ).join("\n"),
  },
}

export const NoCollapse: Story = {
  args: {
    codeLanguage: "language-solidity",
    allowCollapse: false,
    children: solidityExample,
  },
}

export const FromHomepage: Story = {
  args: {
    codeLanguage: "language-solidity",
    fromHomepage: true,
    children: solidityExample,
  },
}
