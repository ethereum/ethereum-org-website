// Libraries
import React, { useState } from "react"
import { graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

// Components
import Breadcrumbs from "../../components/Breadcrumbs"
import PageMetadata from "../../components/PageMetadata"
import { Content, Page } from "../../components/SharedStyledComponents"
import Translation from "../../components/Translation"

// Utils
import { translateMessageId } from "../../utils/translations"

// Styles
const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding: 3rem;
  background: ${(props) => props.theme.colors.layer2Gradient};

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
  }
`

const HeroContent = styled.div`
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2rem;
    width: 100%;
  }
`

const Subtitle = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  &:last-of-type {
    margin-bottom: 2rem;
  }
`

const HeroImage = styled(GatsbyImage)`
  width: 50%;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const TableContent = styled(Content)`
  display: flex;
  padding: 1rem 0;
  gap: 24px;
`

const FilterSidebar = styled.div`
  width: 25%;
`

const FilterTabs = styled.div`
  height: 34px;
  display: flex;
  border-bottom: 1px solid #f4d0a7;
  cursor: pointer;
`

const FilterTab = styled.div`
  width: 50%;
  text-align: center;
  background: ${(props) =>
    props.active === true ? props.theme.colors.primary : "none"};
  border-radius: 4px 4px 0px 0px;
  display: inline-block;
  line-height: 200%;
  vertical-align: middle;

  :hover {
    background: ${(props) =>
      props.active === true
        ? props.theme.colors.primary
        : props.theme.colors.selectHover};
  }
`

const WalletContent = styled.div`
  width: 75%;
`

const FindWalletPage = ({ data, location }) => {
  const intl = useIntl()

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-find-wallet-meta-title", intl)}
        description={translateMessageId(
          "page-find-wallet-meta-description",
          intl
        )}
      />

      <HeroContainer>
        <HeroContent>
          <Breadcrumbs slug={location.pathname} />
          <h1>
            <Translation id="page-find-wallet-title" />
          </h1>
          <Subtitle>
            <Translation id="page-find-wallet-description" />
          </Subtitle>
          <Subtitle>
            <Translation id="page-find-wallet-desc-2" />
          </Subtitle>
        </HeroContent>
        <HeroImage
          image={getImage(data.hero)}
          alt={translateMessageId("page-find-wallet-image-alt", intl)}
          loading="eager"
          objectFit="contain"
        />
      </HeroContainer>

      <TableContent>
        <FilterSidebar>
          <FilterTabs>
            <FilterTab
              active={!showAdvancedFilters}
              onClick={() => setShowAdvancedFilters(false)}
            >
              PROFILE FILTERS
            </FilterTab>
            <FilterTab
              active={showAdvancedFilters}
              onClick={() => setShowAdvancedFilters(true)}
            >
              ADVANCED FILTERS
            </FilterTab>
          </FilterTabs>
        </FilterSidebar>
        <WalletContent>Wallet</WalletContent>
      </TableContent>
    </Page>
  )
}

export default FindWalletPage

export const query = graphql`
  {
    hero: file(relativePath: { eq: "wallets/find-wallet-hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`
