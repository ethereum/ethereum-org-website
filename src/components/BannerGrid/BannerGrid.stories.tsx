import { useTranslations } from "next-intl"
import { MdInfoOutline } from "react-icons/md"
import { Meta, StoryObj } from "@storybook/react"

import { ChildOnlyProp } from "@/lib/types"

import { Image } from "@/components/Image"
import Tooltip from "@/components/Tooltip"
import InlineLink from "@/components/ui/Link"

import { langViewportModes } from "../../../.storybook/modes"
import { ContentContainer } from "../MdComponents"

import {
  Banner as BannerComponent,
  BannerBody as BannerBodyComponent,
  BannerGrid as BannerGridComponent,
  BannerGridCell as BannerGridCellComponent,
  BannerImage as BannerImageComponent,
} from "."

import stats from "@/public/images/upgrades/newrings.png"

const meta = {
  title: "Molecules / Display Content / Banner Grid",
  component: BannerComponent,
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative w-full">
        <ContentContainer>
          <Story />
        </ContentContainer>
      </div>
    ),
  ],
} satisfies Meta<typeof BannerComponent>

export default meta

type Story = StoryObj<typeof meta>

const PAGE_WHAT_IS_ETH = "page-what-is-ethereum"

const tooltipContent = ({ apiUrl, apiProvider, ariaLabel }) => {
  const t = useTranslations("common")

  return (
    <div>
      {t("data-provided-by")}{" "}
      <InlineLink href={apiUrl} aria-label={ariaLabel}>
        {apiProvider}
      </InlineLink>
    </div>
  )
}

const StatPrimary = (props: ChildOnlyProp) => (
  <div className="mb-4 text-5xl leading-none" {...props} />
)

const StatDescription = (props: ChildOnlyProp) => (
  <div className="text-md text-[#666] dark:text-[#b2b2b2]" {...props} />
)

export const Banner: Story = {
  render: () => {
    return (
      <BannerComponent>
        <div className="text-md text-[#666] dark:text-[#b2b2b2]">Banner</div>
      </BannerComponent>
    )
  },
}

export const BannerBody: Story = {
  render: () => {
    return (
      <BannerComponent>
        <BannerBodyComponent>
          <div className="text-md text-[#666] dark:text-[#b2b2b2]">
            Banner Body
          </div>
        </BannerBodyComponent>
      </BannerComponent>
    )
  },
}

export const BannerImage: Story = {
  render: () => {
    return (
      <BannerComponent>
        <BannerImageComponent>
          <Image src={stats} alt="" width={400} />
        </BannerImageComponent>
      </BannerComponent>
    )
  },
}

export const BannerGridCell: Story = {
  render: () => {
    const t = useTranslations(PAGE_WHAT_IS_ETH)

    return (
      <BannerComponent>
        <BannerBodyComponent>
          <BannerGridCellComponent>
            <StatPrimary>4k+</StatPrimary>
            <StatDescription>
              {t("page-what-is-ethereum-ethereum-in-numbers-stat-1-desc")}
              <span className="whitespace-nowrap">
                &nbsp;
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://dappradar.com/rankings/protocol/ethereum",
                    apiProvider: "State of the dapps",
                    ariaLabel: "Read more about Ethereum projects stats",
                  })}
                >
                  <span>
                    <MdInfoOutline className="inline-block align-middle" />
                  </span>
                </Tooltip>
              </span>
            </StatDescription>
          </BannerGridCellComponent>
        </BannerBodyComponent>
      </BannerComponent>
    )
  },
}

export const BannerGrid: Story = {
  render: () => {
    const t = useTranslations(PAGE_WHAT_IS_ETH)

    return (
      <BannerComponent>
        <BannerBodyComponent>
          <BannerGridComponent>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
              <BannerGridCellComponent key={item}>
                <StatPrimary>{item}k+</StatPrimary>
                <StatDescription>
                  {t("page-what-is-ethereum-ethereum-in-numbers-stat-1-desc")}
                  <span className="whitespace-nowrap">
                    &nbsp;
                    <Tooltip
                      content={tooltipContent({
                        apiUrl:
                          "https://dappradar.com/rankings/protocol/ethereum",
                        apiProvider: "State of the dapps",
                        ariaLabel: "Read more about Ethereum projects stats",
                      })}
                    >
                      <span>
                        <MdInfoOutline className="inline-block align-middle" />
                      </span>
                    </Tooltip>
                  </span>
                </StatDescription>
              </BannerGridCellComponent>
            ))}
          </BannerGridComponent>
        </BannerBodyComponent>
        <BannerImageComponent>
          <Image src={stats} alt="" width={400} />
        </BannerImageComponent>
      </BannerComponent>
    )
  },
}
