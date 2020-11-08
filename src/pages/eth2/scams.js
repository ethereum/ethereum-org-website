import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import makeBlockie from "ethereum-blockies-base64"

import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import CardList from "../../components/CardList"
import Checkbox from "../../components/Checkbox"
import CopyToClipboard from "../../components/CopyToClipboard"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import Modal from "../../components/Modal"
import Icon from "../../components/Icon"
import Tooltip from "../../components/Tooltip"
import { Twemoji } from "react-emoji-render"
import Warning from "../../components/Warning"
import ScamCard from "../../components/ScamCard"
import {
  Page,
  ButtonSecondary,
  Divider,
} from "../../components/SharedStyledComponents"

const StyledPage = styled(Page)`
  padding-top: 4rem;
  margin: 0rem 2rem;
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 2rem;
  font-weight: 700;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

const ModalBody = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Image = styled(Img)`
  width: 100%;
  max-width: 372px;
`

const ModalOption = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0.5rem;
  justify-content: space-between;
  margin-left: 0rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`

const GithubButton = styled(ButtonLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
`

const KnownScamsPage = (data) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const scams = [
    {
      title: "Discord scam",
      description: "test description",
      scamUrl: "https://v2.stake-ethereum.org/?ref=adsjoe7",
      /* image: data.discordscam.childImageSharp.fixed, */
      date: "11/05/2020",
      platform: "discord",
    },
    {
      title: "Discord scam",
      description: "test description",
      scamUrl: "https://v2.stake-ethereum.org/?ref=adsjoe7",
      /* image: data.discord.childImageSharp.fluid, */
      date: "11/05/2020",
      platform: "discord",
    },
  ]
  return (
    <StyledPage>
      <PageMetadata
        title="Eth2 staking scams"
        description="A place to check and report known Eth2 staking scams."
      />
      <Header>
        <div>
          <Title>Eth2 staking scams</Title>
          <Subtitle>
            Unfortunately scams are inevitable. Here, you can check known scams
            or report any for the wider staking community.
          </Subtitle>
        </div>
        <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
          <ModalTitle>Report scam</ModalTitle>
          <p>
            If you've experienced or seen a scam, please report it to help
            protect the staking community. You'll need to use GitHub or let us
            know via{" "}
            <Link to="https://discord.gg/CetY6Y4">our Discord channel</Link>.
          </p>
          <ModalBody>
            <ModalOption>
              <p>
                <b>New to GitHub?</b>
                <br />
                Raise an issue – just fill in the requested information.
              </p>
              <GithubButton
                isSecondary
                to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=report_scam.md&title="
              >
                <GithubIcon name="github" /> <span>Raise issue</span>
              </GithubButton>
            </ModalOption>
            <ModalOption>
              <p>
                <b>Create a pull request</b>
                <br />
                Add the information and update the site yourself.
              </p>
              <GithubButton
                isSecondary
                to="https://github.com/ethereum/ethereum-org-website/new/dev/src/pages/eth2/scams"
              >
                <GithubIcon name="github" /> <span>Create pull request</span>
              </GithubButton>
            </ModalOption>
          </ModalBody>
        </Modal>
        <ButtonSecondary onClick={() => setModalOpen(true)}>
          Report scam
        </ButtonSecondary>
      </Header>
      <ScamCard content={scams} />
      {/* <Image fixed={data.discordscam.childImageSharp.fixed} /> */}
    </StyledPage>
  )
}

export default KnownScamsPage

/* export const scamImage = graphql`
  fragment scamImage on File {
    childImageSharp {
      fixed(width: 600) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
export const query = graphql`
  query {
    discordscam: file(relativePath: { eq: "eth2-scams/discord-scam.png" }) {
      ...scamImage
    }
  }
` */

export const query = graphql`
  query {
    discordscam: file(relativePath: { eq: "eth2-scams/discord-scam.png" }) {
      childImageSharp {
        fixed(width: 400) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
