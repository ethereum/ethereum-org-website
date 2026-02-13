import { AppWindowMac } from "lucide-react"
import Image from "next/image"
import { Meta, StoryObj } from "@storybook/react"

import { CardBanner } from "@/components/ui/card"
import { VStack } from "@/components/ui/flex"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import TruncatedText from "@/components/ui/TruncatedText"

import AppCard from "."

const meta = {
  title: "Molecules / Display Content / AppCard",
  component: AppCard,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppCard>

export default meta

type Story = StoryObj<typeof meta>

// Sample data using real images
const sampleApp = {
  name: "Uniswap",
  description:
    "Uniswap is a decentralized exchange protocol that allows users to swap tokens without intermediaries. It uses an automated market maker model.",
  thumbnail: "/images/dapps/uni.png",
  category: "DeFi",
  categoryTagStatus: "tag" as const,
  tags: ["Exchange", "AMM", "Trading"],
}

// Layout variants
export const LayoutVertical: Story = {
  args: {
    ...sampleApp,
    layout: "vertical",
    href: "/apps/uniswap",
  },
}

export const LayoutHorizontal: Story = {
  args: {
    ...sampleApp,
    layout: "horizontal",
    href: "/apps/uniswap",
  },
}

export const LayoutComparison = {
  render: () => (
    <VStack className="items-stretch gap-8">
      <div>
        <p className="mb-2 text-sm text-body-medium">Vertical (default)</p>
        <AppCard {...sampleApp} layout="vertical" href="/apps/uniswap" />
      </div>
      <div>
        <p className="mb-2 text-sm text-body-medium">Horizontal</p>
        <AppCard {...sampleApp} layout="horizontal" href="/apps/uniswap" />
      </div>
    </VStack>
  ),
}

// Image sizes
export const ImageSizes = {
  render: () => (
    <VStack className="items-stretch gap-4">
      {(["xs", "small", "thumbnail", "medium", "large"] as const).map(
        (size) => (
          <div key={size}>
            <p className="mb-2 text-sm text-body-medium">Size: {size}</p>
            <AppCard
              {...sampleApp}
              layout="horizontal"
              imageSize={size}
              href="/apps/uniswap"
            />
          </div>
        )
      )}
    </VStack>
  ),
}

// With/without description
export const WithDescription: Story = {
  args: {
    ...sampleApp, // includes description
    layout: "vertical",
    href: "/apps/uniswap",
  },
}

export const WithoutDescription: Story = {
  args: {
    name: sampleApp.name,
    thumbnail: sampleApp.thumbnail,
    category: sampleApp.category,
    categoryTagStatus: sampleApp.categoryTagStatus,
    tags: sampleApp.tags,
    // No description prop = no description shown
    layout: "vertical",
    href: "/apps/uniswap",
  },
}

// With/without category tag
export const WithCategoryTag: Story = {
  args: {
    ...sampleApp, // includes category
    layout: "vertical",
    href: "/apps/uniswap",
  },
}

export const WithoutCategoryTag: Story = {
  args: {
    name: sampleApp.name,
    description: sampleApp.description,
    thumbnail: sampleApp.thumbnail,
    // No category prop = no tag shown
    tags: sampleApp.tags,
    layout: "horizontal",
    href: "/apps/uniswap",
  },
}

// Fallback icon (when no thumbnail)
export const WithFallbackIcon: Story = {
  args: {
    name: "Unknown App",
    description: "An app without a thumbnail image",
    tags: ["Development", "Tools"],
    layout: "horizontal",
    imageSize: "thumbnail",
    fallbackIcon: <AppWindowMac className="size-10" />,
    href: "/apps/unknown",
  },
}

// As link vs static
export const AsLink: Story = {
  args: {
    ...sampleApp,
    layout: "horizontal",
    href: "/apps/uniswap",
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `href` prop - renders as a clickable link with hover effect",
      },
    },
  },
}

export const AsStatic: Story = {
  args: {
    ...sampleApp,
    layout: "horizontal",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Without `href` prop - renders as static content, no hover effect",
      },
    },
  },
}

// Different category tag statuses
export const CategoryTagStatuses = {
  render: () => (
    <VStack className="items-stretch gap-4">
      {(
        [
          { status: "tag", category: "DeFi" },
          { status: "success", category: "Collectible" },
          { status: "error", category: "Social" },
          { status: "warning", category: "Gaming" },
          { status: "normal", category: "Bridge" },
        ] as const
      ).map(({ status, category }) => (
        <AppCard
          key={status}
          name={`${category} App`}
          thumbnail="/images/dapps/uni.png"
          category={category}
          categoryTagStatus={status}
          tags={["Tag 1", "Tag 2"]}
          layout="horizontal"
          href="/apps/example"
        />
      ))}
    </VStack>
  ),
}

// Real-world examples
export const AppsPageStyle = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <p className="text-sm text-body-medium">
        As used on /apps page (vertical with description)
      </p>
      <AppCard
        name="Aave"
        description="Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets."
        thumbnail="/images/dapps/aave.png"
        category="DeFi"
        categoryTagStatus="tag"
        tags={["Lending", "Borrowing", "Flash Loans"]}
        layout="vertical"
        imageSize="large"
        href="/apps/aave"
        customEventOptions={{
          eventCategory: "apps",
          eventAction: "click",
          eventName: "aave",
        }}
      />
    </VStack>
  ),
}

export const DeveloperAppsPageStyle = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <p className="text-sm text-body-medium">
        As used on /developers/tools page (horizontal, no category, no tracking)
      </p>
      <AppCard
        name="Hardhat"
        thumbnail="/images/dapps/uni.png"
        tags={["Testing", "Debugging", "Solidity"]}
        layout="horizontal"
        imageSize="thumbnail"
        href="?appId=hardhat"
      />
      <AppCard
        name="Foundry"
        tags={["Testing", "Fuzzing", "Solidity"]}
        layout="horizontal"
        imageSize="thumbnail"
        fallbackIcon={<AppWindowMac className="size-10" />}
        href="?appId=foundry"
      />
    </VStack>
  ),
}

// Category list style (inside bordered container, no card hover)
export const CategoryListStyle = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <p className="text-sm text-body-medium">
        Apps listed by category (bordered container, no card-level hover)
      </p>
      <div className="flex flex-col rounded-xl border">
        <div className="rounded-t-xl border-b p-4">
          <p className="text-lg font-bold">DeFi</p>
        </div>
        <div className="flex flex-col">
          {[
            { name: "Aave", tags: ["Lending", "Borrowing"] },
            { name: "Uniswap", tags: ["Exchange", "AMM"] },
            { name: "Compound", tags: ["Lending", "Interest"] },
          ].map((app) => (
            <div key={app.name} className="border-b last:border-b-0">
              <AppCard
                name={app.name}
                thumbnail="/images/dapps/uni.png"
                tags={app.tags}
                layout="horizontal"
                imageSize="medium"
                hover="none"
                href={`/apps/${app.name.toLowerCase()}`}
                customEventOptions={{
                  eventCategory: "apps",
                  eventAction: "top_apps",
                  eventName: `app name ${app.name}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </VStack>
  ),
}

// Highlight card style (banner + description + static AppCard)
export const HighlightCardCover = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <p className="text-sm text-body-medium">
        Banner with fit=&quot;cover&quot; - image fills and may crop
      </p>
      <LinkBox className="group w-full rounded-xl p-3 hover:bg-background-highlight">
        <LinkOverlay href="/apps/uniswap" className="no-underline">
          {/* Banner image - cover crops to fill */}
          <CardBanner fit="cover" background="accent-a" className="mb-2">
            <Image
              src="/images/dapps/uni.png"
              alt="App banner"
              width={400}
              height={200}
            />
          </CardBanner>
          {/* Description */}
          <div className="mb-4">
            <TruncatedText>
              Uniswap is a decentralized exchange protocol that allows users to
              swap tokens without intermediaries. It uses an automated market
              maker model for liquidity provision.
            </TruncatedText>
          </div>
          {/* Static AppCard (no href - parent handles link) */}
          <AppCard
            name="Uniswap"
            thumbnail="/images/dapps/uni.png"
            category="DeFi"
            categoryTagStatus="tag"
            tags={["Exchange", "AMM"]}
            layout="horizontal"
            imageSize="medium"
          />
        </LinkOverlay>
      </LinkBox>
    </VStack>
  ),
}

export const HighlightCardContain = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <p className="text-sm text-body-medium">
        Banner with fit=&quot;contain&quot; - image fully visible with blur
        background
      </p>
      <LinkBox className="group w-full rounded-xl p-3 hover:bg-background-highlight">
        <LinkOverlay href="/apps/uniswap" className="no-underline">
          {/* Banner image - contain shows full image with blur bg */}
          <CardBanner fit="contain" background="accent-a" className="mb-2">
            <Image
              src="/images/dapps/uni.png"
              alt="App banner"
              width={400}
              height={200}
            />
          </CardBanner>
          {/* Description */}
          <div className="mb-4">
            <TruncatedText>
              Uniswap is a decentralized exchange protocol that allows users to
              swap tokens without intermediaries. It uses an automated market
              maker model for liquidity provision.
            </TruncatedText>
          </div>
          {/* Static AppCard (no href - parent handles link) */}
          <AppCard
            name="Uniswap"
            thumbnail="/images/dapps/uni.png"
            category="DeFi"
            categoryTagStatus="tag"
            tags={["Exchange", "AMM"]}
            layout="horizontal"
            imageSize="medium"
          />
        </LinkOverlay>
      </LinkBox>
    </VStack>
  ),
}
