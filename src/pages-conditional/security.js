import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import ColorShadowCard from "../components/ColorShadowCard"
import Link from "../components/Link"
import DocLink from "../components/DocLink"
import Emoji from "../components/Emoji"
import PageMetadata from "../components/PageMetadata"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  width: 100%;
  margin: 0 2rem;
`

const IntroContainer = styled.header`
  display: flex;
  flex-direction: column;
  margin: 3rem;
  max-width: ${(props) => props.theme.breakpoints.s};
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin: 3rem 0;
    padding: 0 1rem;
  }
`

const Headline = styled.h2`
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem 0;
`

const SubTitle = styled.p`
  margin: 0;
  margin-bottom: 1rem;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    grid-template-columns: 1fr;
  }
`

const SectionTitle = styled.h3`
  font-weight: 500;
`

const Ul = styled.ul`
  margin-bottom: 3rem;
`

const SecurityPage = (props) => {
  const intl = useIntl()
  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-security-title", intl)}
        description={translateMessageId("page-security-subtitle", intl)}
      />
      <IntroContainer>
        <Emoji text=":warning:" size={4} ml={`5em`} />
        <Headline>
          <Translation id="page-security-title" />
        </Headline>
        <SubTitle>
          <Translation id="page-security-subtitle" />
        </SubTitle>
      </IntroContainer>
      <Grid>
        <ColorShadowCard bgColor="#F9EBB9">
          <SectionTitle>
            <Translation id="page-security-wallet-title" />
          </SectionTitle>
          <Ul>
            <li>
              <Translation id="page-security-wallet-tip-1" />
            </li>
          </Ul>
          <SectionTitle>
            <Translation id="page-security-wallet-subsection-1-title" />
          </SectionTitle>
          <Ul>
            <li>
              <Translation id="page-security-wallet-subsection-1-tip-1" />
            </li>
          </Ul>
        </ColorShadowCard>
        <ColorShadowCard bgColor="#D7EAFB">
          <SectionTitle>
            <Translation id="page-security-dapp-title" />
          </SectionTitle>
          <Ul>
            <li>
              <Translation id="page-security-dapp-tip-1" />
            </li>
          </Ul>
        </ColorShadowCard>
        <ColorShadowCard bgColor="#F9EBB9">
          <SectionTitle>
            <Translation id="page-security-community-title" />
          </SectionTitle>
          <Ul>
            <li>
              <Translation id="page-security-community-tip-1" />
            </li>
          </Ul>
        </ColorShadowCard>
        <ColorShadowCard bgColor="#EFCFE9">
          <SectionTitle>
            <Translation id="page-security-staking-title" />
          </SectionTitle>
          <Ul>
            <li>
              <Translation id="page-security-staking-tip-1" />{" "}
              <Link to="/eth2/deposit-contract/">
                <Translation id="page-security-staking-tip-1-link" />
              </Link>
            </li>
          </Ul>
        </ColorShadowCard>
      </Grid>
    </Page>
  )
}

export default SecurityPage
