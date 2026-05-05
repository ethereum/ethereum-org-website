import type { Meta, StoryObj } from "@storybook/nextjs"

import { Center, Stack, VStack } from "../flex"
import InlineLink, { BaseLink, LinkWithArrow } from "../Link"
import { ListItem, UnorderedList } from "../list"

const meta = {
  title: "UI / Link",
  component: InlineLink,
  decorators: [
    (Story) => (
      <Center className="max-w-prose">
        <Story />
      </Center>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Link variants. `InlineLink` (default export) is the in-prose link with visited styling. `BaseLink` is the underlying primitive without visited styling -- use for nav/CTA contexts. `LinkWithArrow` appends a chevron that flips for RTL locales. All three auto-detect external URLs (open in new tab + external icon), `mailto:` (mail icon), and recognized file extensions (download icon).",
      },
    },
  },
} satisfies Meta<typeof InlineLink>

export default meta

type Story = StoryObj<typeof meta>

const MockParagraph = ({ href }: { href: string }) => (
  <p>
    Ethereum is open access to digital money and data-friendly services for
    everyone -- no matter your background or location. It is a{" "}
    <InlineLink href={href}>community-built</InlineLink> technology behind the
    cryptocurrency ether (ETH) and thousands of applications you can use today.
  </p>
)

export const InlineLinkStory: Story = {
  name: "InlineLink",
  parameters: {
    docs: {
      description: {
        story:
          "`InlineLink` (default export of `Link.tsx`). Use in prose; the visited state is preserved.",
      },
    },
  },
  args: { href: "#" },
  render: (args) => <MockParagraph href={args.href!} />,
}

export const BaseLinkStory: Story = {
  name: "BaseLink",
  parameters: {
    docs: {
      description: {
        story:
          "`BaseLink` is the underlying anchor without visited styling. Use in nav, CTA, or non-prose contexts.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-3">
      <BaseLink href="/learn">Internal nav link</BaseLink>
      <BaseLink href="https://ethresear.ch">External nav link</BaseLink>
      <BaseLink href="mailto:hello@example.com">mailto: link</BaseLink>
    </VStack>
  ),
}

export const LinkWithArrowStory: Story = {
  name: "LinkWithArrow",
  parameters: {
    docs: {
      description: {
        story:
          "`LinkWithArrow` appends a chevron that flips for RTL locales (Arabic, Urdu). Toggle the locale in the Storybook toolbar to see the flip.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-3">
      <LinkWithArrow href="/learn">Read more</LinkWithArrow>
      <LinkWithArrow href="/dapps">Explore dapps</LinkWithArrow>
    </VStack>
  ),
}

export const ExternalDetection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "External URLs (anything outside the site origin) open in a new tab and get an external-link icon.",
      },
    },
  },
  args: { href: "https://example.com" },
  render: (args) => <MockParagraph href={args.href!} />,
}

export const MailtoDetection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`mailto:` URLs are detected and rendered with a mail icon by `BaseLink`.",
      },
    },
  },
  render: () => (
    <p>
      Send feedback to{" "}
      <InlineLink href="mailto:hello@example.com">hello@example.com</InlineLink>
      .
    </p>
  ),
}

export const FileExtensionDetection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Recognized file extensions (e.g. `.pdf`) trigger download styling and a new-tab open behavior.",
      },
    },
  },
  render: () => (
    <p>
      Read the{" "}
      <InlineLink href="/ethereum-whitepaper.pdf">
        Ethereum whitepaper
      </InlineLink>{" "}
      for the original design rationale.
    </p>
  ),
}

export const HashLink: Story = {
  parameters: {
    docs: {
      description: {
        story: "Hash-only hrefs scroll within the page rather than navigating.",
      },
    },
  },
  render: () => (
    <p>
      Skip to the <InlineLink href="#summary">summary</InlineLink> for the
      bottom-line answer.
    </p>
  ),
}

export const LinkList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Realistic list of mixed internal and external links to confirm visited styling and external-icon placement.",
      },
    },
  },
  render: () => (
    <Stack className="gap-6">
      <UnorderedList className="list-disc">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ListItem key={idx + 1}>
            <InlineLink
              href={idx % 2 === 0 ? "https://example.com" : "#"}
            >{`List item ${idx % 2 === 0 ? "external" : "internal"} ${
              idx + 1
            }`}</InlineLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Stack>
  ),
}
