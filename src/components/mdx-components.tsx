import React from "react"
import styled from "@emotion/styled"
import {
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react"

import Link from "./Link"
import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import Callout from "../components/Callout"
import Contributors from "../components/Contributors"
import FeedbackCard from "../components/FeedbackCard"
import InfoBanner from "../components/InfoBanner"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import ExpandableCard from "../components/ExpandableCard"
import Roadmap from "../components/Roadmap"
import SectionNav from "../components/SectionNav"
import DocLink from "../components/DocLink"
import GhostCard from "../components/GhostCard"
import MatomoOptOut from "../components/MatomoOptOut"
import {
  Divider,
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  CardContainer,
} from "../components/SharedStyledComponents"
import Emoji from "../components/OldEmoji"
import UpcomingEventsList from "../components/UpcomingEventsList"
import Icon from "../components/Icon"
import SocialListItem from "../components/SocialListItem"
import YouTube from "../components/YouTube"
import TranslationChartImage from "../components/TranslationChartImage"
import EnergyConsumptionChart from "../components/EnergyConsumptionChart"

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
export default {
  a: Link,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  h4: Header4,
  p: Paragraph,
  ol: OrderedList,
  ul: UnorderedList,
  // li: (props) => <chakra.li mb={3} {...props} />,
  li: ListItem,
  pre: Pre,
  hr: HR,
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
}
