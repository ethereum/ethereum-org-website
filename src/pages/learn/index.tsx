import React from "react"
import { PageProps } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"

import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import FeedbackCard from "../../components/FeedbackCard"
import PageMetadata from "../../components/PageMetadata"

import { isLangRightToLeft } from "../../utils/translations"
import { Lang } from "../../utils/languages"
import type { Context } from "../../types"

import {
  Container,
  HeroBackground,
  HeroContainer,
  Hero,
  Page,
  InfoColumn,
  InfoTitle,
  ContentContainer,
} from "./styles"
import { query as pageQuery } from "./query"

const LearnPage = ({ data }: PageProps<Queries.LearnPageQuery, Context>) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale as Lang)

  const tocItems = [
    {
      id: "what-is-crypto-ethereum",
      title: "What is crypto and Ethereum?",
    },
    {
      id: "how-do-i-use-ethereum",
      title: "How do I use Ethereum?",
    },
  ]

  const heroContent = {
    title: "Learn Hub",
    header: "Learn about Ethereum",
    subtitle:
      "Your educational guide to the world of Ethereum. Learn how Ethereum works and how to connect to it. This page includes technical and non-technical articles, guides, and resources.",
    image: getImage(data.heroImage),
    alt: "", // TODO
    buttons: [
      {
        content: "Let's get started",
        pathId: tocItems[0].id,
      },
    ],
  }

  return (
    <Container>
      <PageMetadata title={"Learn Hub"} description={""} />

      <HeroBackground>
        <HeroContainer>
          <Hero content={heroContent} isReverse />
        </HeroContainer>
      </HeroBackground>

      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <InfoColumn>
          <InfoTitle>Learn Hub</InfoTitle>
          <StakingHomeTableOfContents items={tocItems} />
        </InfoColumn>

        <ContentContainer id="content">
          <h2 id={tocItems[0].id}>{tocItems[0].title}</h2>
          <p>
            You have probably heard a thing or two about cryptocurrencies,
            Bitcoin and blockchain, but do you know what those actually are and
            how they relate to Ethereum? And what is Ethereum anyway? Check out
            our introductory What is Ethereum page.
          </p>
          <p>
            Not only that Ethereum can do what Bitcoin does (transfer money
            globally), it’s capable of a lot more – people can actually deploy
            code onto the network. Because it’s so flexible, any kind of
            computer application can be launched on Ethereum.
          </p>

          <h2 id={tocItems[1].id}>{tocItems[1].title}</h2>
          <p>
            It’s actually quite simple once you get the hang of it. You need an
            application that is commonly called a “wallet”. Its an app that
            helps you store you funds and to authenticate/interact with
            applications on Ethereum.
          </p>
          <FeedbackCard />
        </ContentContainer>
      </Page>
    </Container>
  )
}

export default LearnPage

export const query = pageQuery
