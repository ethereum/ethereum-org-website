import { Meta, StoryObj } from "@storybook/react"

import { Center, Stack } from "../flex"
import Link from "../Link"
import { ListItem, UnorderedList } from "../list"

const meta = {
  title: "Molecules / Navigation / Links",
  component: Link,
  decorators: [
    (Story) => (
      <Center className="max-w-prose">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

const MockParagraph = ({ href }: { href: string }) => (
  <p>
    Text body normal. Ethereum is open access to digital money and data-friendly
    services for everyone &ndash; no matter your background or location.
    It&apos;s a <Link href={href}>community-built</Link> technology behind the
    cryptocurrency ether (ETH) and thousands of applications you can use today.
  </p>
)

export const InternalLink: Story = {
  args: {
    href: "#",
  },
  render: (args) => <MockParagraph href={args.href!} />,
}

export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
  },
  render: (args) => <MockParagraph href={args.href!} />,
}

export const LinkList: Story = {
  render: () => (
    <Stack className="gap-6">
      <p>
        Text body normal. Ethereum is open access to digital money and
        data-friendly services for everyone &ndash; no matter your background or
        location. It&apos;s a community-built technology behind the
        cryptocurrency ether (ETH) and thousands of applications you can use
        today.
      </p>
      <UnorderedList>
        {Array.from({ length: 9 }).map((_, idx) => (
          <ListItem key={idx + 1}>
            <Link
              href={idx % 2 === 0 ? "https://example.com" : "#"}
            >{`List Item ${idx % 2 === 0 ? "External" : "Internal"} ${
              idx + 1
            }`}</Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Stack>
  ),
}
