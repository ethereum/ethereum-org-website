import { Castle, LockKeyhole, Shield } from "lucide-react"
import { Meta, StoryObj } from "@storybook/nextjs"

import { CardTitle } from "@/components/ui/card"

import { HighlightCard, HighlightCardContent, HighlightStack, IconBox } from "."

const meta = {
  title: "Components / Cards / HighlightCard",
  component: HighlightCard,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Composition family for the in-content 'highlight' layout: a coloured `IconBox`, an optional `CardTitle`, and `HighlightCardContent` body, optionally stacked through `HighlightStack` to produce the divided list seen on the 'What is Ethereum' / 'What is Ether' pages. None of the parts are linkable on their own -- this is purely a content layout.",
      },
    },
  },
} satisfies Meta<typeof HighlightCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HighlightCard>
      <IconBox>
        <Shield className="text-accent-a" />
      </IconBox>
      <div>
        <CardTitle className="mb-2">Censorship resistance</CardTitle>
        <HighlightCardContent>
          <p>
            No government or company has control over Ethereum. Decentralization
            makes it nearly impossible for anyone to stop you from receiving
            payments or using services on Ethereum.
          </p>
        </HighlightCardContent>
      </div>
    </HighlightCard>
  ),
}

export const Stack: Story = {
  render: () => (
    <HighlightStack>
      <HighlightCard>
        <IconBox>
          <Shield className="text-accent-a" />
        </IconBox>
        <div>
          <CardTitle className="mb-2">Censorship resistance</CardTitle>
          <HighlightCardContent>
            <p>
              No single entity can stop you from sending value or interacting
              with applications on Ethereum.
            </p>
          </HighlightCardContent>
        </div>
      </HighlightCard>
      <HighlightCard>
        <IconBox>
          <LockKeyhole className="text-accent-b" />
        </IconBox>
        <div>
          <CardTitle className="mb-2">Strong security guarantees</CardTitle>
          <HighlightCardContent>
            <p>
              Ethereum is secured by hundreds of thousands of validators
              distributed worldwide.
            </p>
          </HighlightCardContent>
        </div>
      </HighlightCard>
      <HighlightCard>
        <IconBox>
          <Castle className="text-accent-c" />
        </IconBox>
        <div>
          <CardTitle className="mb-2">Reliability</CardTitle>
          <HighlightCardContent>
            <p>
              The network has run continuously since 2015 and is designed for
              long-term operation.
            </p>
          </HighlightCardContent>
        </div>
      </HighlightCard>
    </HighlightStack>
  ),
}

export const IconBoxOnly: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconBox>
        <Shield className="text-accent-a" />
      </IconBox>
      <IconBox>
        <LockKeyhole className="text-accent-b" />
      </IconBox>
      <IconBox>
        <Castle className="text-accent-c" />
      </IconBox>
    </div>
  ),
}
