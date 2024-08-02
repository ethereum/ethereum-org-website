import { MdInfoOutline } from "react-icons/md"
import { Box, Icon } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { Image } from "@/components/Image"
import Text from "@/components/OldText"

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
  title: "Molecules / Display Content / Banner",
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

export const Banner: Story = {
  render: () => {
    return (
      <BannerComponent>
        <div>What </div>
      </BannerComponent>
    )
  },
}

export const BannerBody: Story = {
  render: () => {
    return (
      <BannerBodyComponent>
        <div>What </div>
      </BannerBodyComponent>
    )
  },
}

export const BannerImage: Story = {
  render: () => {
    return (
      <BannerImageComponent>
        <Image src={stats} alt="" width={400} />
      </BannerImageComponent>
    )
  },
}

export const BannerGrid: Story = {
  render: () => {
    const PAGE_WHAT_IS_ETH = "page-what-is-ethereum"
    return (
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
                <Box as="span">
                  <Icon as={MdInfoOutline} verticalAlign="middle" />
                </Box>
              </Text>
            </Box>
          </BannerGridCellComponent>
        ))}
      </BannerGridComponent>
    )
  },
}
