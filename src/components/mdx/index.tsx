import React from "react"
import styled from "@emotion/styled"
import {
  chakra,
  ListItemProps,
  ListProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

import Link from "../Link"
import ButtonLink from "../ButtonLink"
import Card from "../Card"
import Callout from "../Callout"
import Contributors from "../Contributors"
import FeedbackCard from "../FeedbackCard"
import InfoBanner from "../InfoBanner"
import Logo from "../Logo"
import MeetupList from "../MeetupList"
import Pill from "../Pill"
import RandomAppList from "../RandomAppList"
import ExpandableCard from "../ExpandableCard"
import Roadmap from "../Roadmap"
import SectionNav from "../SectionNav"
import DocLink from "../DocLink"
import GhostCard from "../GhostCard"
import MatomoOptOut from "../MatomoOptOut"
import {
  Divider,
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  CardContainer,
} from "../SharedStyledComponents"
import Emoji from "../OldEmoji"
import UpcomingEventsList from "../UpcomingEventsList"
import Icon from "../Icon"
import SocialListItem from "../SocialListItem"
import YouTube from "../YouTube"
import TranslationChartImage from "../TranslationChartImage"
import EnergyConsumptionChart from "../EnergyConsumptionChart"
import UpgradeStatus from "../UpgradeStatus"

const Pre = styled.pre`
  max-width: 100%;
  overflow-x: scroll;
  background-color: ${(props) => props.theme.colors.preBackground};
  border-radius: 0.25rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.preBorder};
  white-space: pre-wrap;
`

const HR = styled.hr`
  width: 100%;
  margin: 2rem 0rem;
  margin-bottom: 1rem;
  display: inline-block;
  position: inherit;
  background: ${(props) => props.theme.colors.border};
`

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const MDXComponents = {
  a: Link,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  h4: Header4,
  p: Paragraph,
  pre: Pre,
  hr: HR,
  // Declaring the list components by using `chakra` factory. For some reason,
  // when passing the Chakra components (UnorderedList, ListItem, etc) it
  // doesn't send them with the custom styles defined in the theme
  // Based on how the official doc site is made
  // https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/components/mdx-components/mdx-components.tsx
  ol: (props: ListProps) => <chakra.ol apply="mdx.ol" {...props} />,
  ul: (props: ListProps) => <chakra.ul apply="mdx.ul" {...props} />,
  li: (props: ListItemProps) => <chakra.li apply="mdx.li" {...props} />,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  th: Th,
  tr: Tr,
  td: Td,
  MeetupList,
  RandomAppList,
  Roadmap,
  Link,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  FeedbackCard,
  Card,
  Divider,
  SectionNav,
  Pill,
  Emoji,
  DocLink,
  ExpandableCard,
  CardContainer,
  GhostCard,
  UpcomingEventsList,
  Icon,
  SocialListItem,
  MatomoOptOut,
  Callout,
  YouTube,
  TranslationChartImage,
  EnergyConsumptionChart,
  UpgradeStatus,
}

export default MDXComponents
