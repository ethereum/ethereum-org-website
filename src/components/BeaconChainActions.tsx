import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { useIntl } from "react-intl"

import { translateMessageId } from "../utils/translations"
import { getImage, ImageDataLike } from "../utils/image"

import CardList from "./CardList"
import Card from "./Card"
import ButtonLink from "./ButtonLink"
import Translation from "./Translation"

import type { CardListItem } from "./CardList"

const Container = styled.div`
  margin-bottom: 4rem;
`

const StyledCardContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledCardLeft = styled(Card)`
  margin-left: 0rem;
  margin-right: 1rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
    margin-bottom: 2rem;
  }
`

const StyledCardRight = styled(Card)`
  margin-left: 0rem;
  margin-left: 1rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-left: 0rem;
  }
`

const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;

  a {
    display: none;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-bottom: 0.75rem;
`

export const DataLogo = graphql`
  fragment DataLogo on File {
    childImageSharp {
      gatsbyImageData(
        width: 24
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

const BeaconStaticQuery = graphql`
  query {
    beaconscan: file(relativePath: { eq: "upgrades/etherscan.png" }) {
      ...DataLogo
    }
    beaconchain: file(relativePath: { eq: "upgrades/beaconchainemoji.png" }) {
      ...DataLogo
    }
  }
`

type BeaconQueryTypes = {
  beaconscan: ImageDataLike | null
  beaconchain: ImageDataLike | null
}

const BeaconChainActions: React.FC = () => {
  const intl = useIntl()
  const data = useStaticQuery<BeaconQueryTypes>(BeaconStaticQuery)

  const datapoints: Array<CardListItem> = [
    {
      title: "beaconscan",
      image: getImage(data.beaconscan)!,
      alt: "",
      link: "https://beaconscan.com",
      description: translateMessageId("consensus-beaconscan-desc", intl),
    },
    {
      title: "beaconcha.in",
      image: getImage(data.beaconchain)!,
      alt: "",
      link: "https://beaconcha.in",
      description: translateMessageId("consensus-beaconcha-in-desc", intl),
    },
  ]

  //TODO: we should refactor the naming here instead of using authors into the description field
  const reads: Array<CardListItem> = [
    {
      title: translateMessageId(
        "page-upgrade-article-title-two-point-oh",
        intl
      ),
      description: "Status",
      link: "https://our.status.im/two-point-oh-the-beacon-chain/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-beacon-chain-explainer",
        intl
      ),
      description: "Ethos.dev",
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-sharding-consensus",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethereum-foundation",
        intl
      ),
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
    },
  ]

  return (
    <Container>
      <StyledCardContainer>
        <StyledCardLeft
          emoji=":money_with_wings:"
          title={translateMessageId("consensus-become-staker", intl)}
          description={translateMessageId("consensus-become-staker-desc", intl)}
        >
          <StyledButtonLink to="https://launchpad.ethereum.org">
            <Translation id="get-started" />
          </StyledButtonLink>
          <ButtonLink variant="outline" to="/staking/">
            <Translation id="page-upgrades-index-staking-learn" />
          </ButtonLink>
        </StyledCardLeft>
        <StyledCardRight
          emoji=":computer:"
          title={translateMessageId("consensus-run-beacon-chain", intl)}
          description={translateMessageId(
            "consensus-run-beacon-chain-desc",
            intl
          )}
        >
          <ButtonLink variant="outline" to="/upgrades/get-involved/">
            <Translation id="consensus-run-beacon-chain" />
          </ButtonLink>
        </StyledCardRight>
      </StyledCardContainer>
      <H3>
        <Translation id="consensus-explore" />
      </H3>

      <CardList content={datapoints} />
      <H3>
        <Translation id="read-more" />
      </H3>
      <CardList content={reads} />
    </Container>
  )
}

export default BeaconChainActions
