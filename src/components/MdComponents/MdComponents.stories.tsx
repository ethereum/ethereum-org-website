import pickBy from "lodash/pickBy"
import type { Meta, StoryObj } from "@storybook/react/*"

import { viewportModes } from "../../../.storybook/modes"

import MdComponentSet from "."

const meta = {
  title: "Molecules / Display Content / MdComponents",
  parameters: {
    layout: "none",
    chromatic: {
      modes: pickBy(viewportModes, (args) =>
        ["md", "lg"].includes(args.viewport)
      ),
    },
  },
} satisfies Meta

export default meta

const {
  ContentContainer,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  Title,
  p: Paragraph,
  FeaturedText,
  Divider,
  hr: HR,
  pre: Pre,
  Page,
} = MdComponentSet

const Para = () => (
  <Paragraph>
    Ether (also known by its ticker symbol, ETH) is the native currency
    transacted on Ethereum. ETH is needed to pay for usage of the Ethereum
    network (in the form of transaction fees). ETH is also used to secure the
    network with staking. When people talk about the price of Ethereum,
    they&apos;re referring to ETH the asset.
  </Paragraph>
)

export const MdComponents: StoryObj = {
  render: () => (
    <div className="mx-auto max-w-screen-lg">
      <Page>
        <ContentContainer>
          <Heading1>Heading1</Heading1>
          <Para />
          <Heading2>Heading2</Heading2>
          <Para />
          <Heading3>Heading3</Heading3>
          <Para />
          <Heading4>Heading4</Heading4>
          <Para />
          <Title>Title</Title>
          <Para />
          <Divider />
          <Pre>Lots of coding here</Pre>
          <HR />
          <FeaturedText>Feature Text</FeaturedText>
        </ContentContainer>
      </Page>
    </div>
  ),
}
