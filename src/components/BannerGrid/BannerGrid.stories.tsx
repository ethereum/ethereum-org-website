import { MdInfoOutline } from "react-icons/md"
import { Box, Icon } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { Image } from "@/components/Image"
import InlineLink from "@/components/Link"
import Text from "@/components/OldText"
import Tooltip from "@/components/Tooltip"

import { getTranslation } from "@/storybook-utils"

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
      <Box position="relative" w="full">
        <ContentContainer>
          <Story />
        </ContentContainer>
      </Box>
    ),
  ],
} satisfies Meta<typeof BannerComponent>

export default meta

type Story = StoryObj<typeof meta>

const PAGE_WHAT_IS_ETH = "page-what-is-ethereum"

const tooltipContent = ({ apiUrl, apiProvider, ariaLabel }) => (
  <div>
    {getTranslation("data-provided-by", "common")}{" "}
    <InlineLink href={apiUrl} aria-label={ariaLabel}>
      {apiProvider}
    </InlineLink>
  </div>
)

export const Banner: Story = {
  render: () => {
    return (
      <BannerComponent>
        <Box fontSize="md" color="text200">
          Banner
        </Box>
      </BannerComponent>
    )
  },
}

export const BannerBody: Story = {
  render: () => {
    return (
      <BannerComponent>
        <BannerBodyComponent>
          <Box fontSize="md" color="text200">
            Banner Body
          </Box>
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
    return (
      <BannerComponent>
        <BannerBodyComponent>
          <BannerGridCellComponent>
            <Box fontSize="5xl" mb={4} lineHeight={1}>
              4k+
            </Box>
            <Box fontSize="md" color="text200">
              {getTranslation(
                "page-what-is-ethereum-ethereum-in-numbers-stat-1-desc",
                PAGE_WHAT_IS_ETH
              )}
              <Text as="span" whiteSpace="nowrap">
                &nbsp;
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://dappradar.com/rankings/protocol/ethereum",
                    apiProvider: "State of the dapps",
                    ariaLabel: "Read more about Ethereum projects stats",
                  })}
                >
                  <Box as="span">
                    <Icon as={MdInfoOutline} verticalAlign="middle" />
                  </Box>
                </Tooltip>
              </Text>
            </Box>
          </BannerGridCellComponent>
        </BannerBodyComponent>
      </BannerComponent>
    )
  },
}

export const BannerGrid: Story = {
  render: () => {
    return (
      <BannerComponent>
        <BannerBodyComponent>
          <BannerGridComponent>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
              <BannerGridCellComponent key={item}>
                <Box fontSize="5xl" mb={4} lineHeight={1}>
                  {item}k+
                </Box>
                <Box fontSize="md" color="text200">
                  {getTranslation(
                    "page-what-is-ethereum-ethereum-in-numbers-stat-1-desc",
                    PAGE_WHAT_IS_ETH
                  )}
                  <Text as="span" whiteSpace="nowrap">
                    &nbsp;
                    <Tooltip
                      content={tooltipContent({
                        apiUrl:
                          "https://dappradar.com/rankings/protocol/ethereum",
                        apiProvider: "State of the dapps",
                        ariaLabel: "Read more about Ethereum projects stats",
                      })}
                    >
                      <Box as="span">
                        <Icon as={MdInfoOutline} verticalAlign="middle" />
                      </Box>
                    </Tooltip>
                  </Text>
                </Box>
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
