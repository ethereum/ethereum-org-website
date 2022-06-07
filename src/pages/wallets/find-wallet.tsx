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
import WalletFilterSidebar from "../../components/FindWallet/WalletFilterSidebar"
import WalletPersonasSidebar from "../../components/FindWallet/WalletPersonasSidebar"

// Utils
import { translateMessageId } from "../../utils/translations"

// Styles
const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding: 3rem;
  background: ${(props) => props.theme.colors.layer2Gradient};
  margin-bottom: 44px;

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
  gap: 24px;
`

const FilterSidebar = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FilterTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  position: sticky;
  top: 76px;
  padding-top: 8px;
  background: ${(props) => props.theme.colors.background};
  z-index: 1;
`

const FilterTab = styled.div<{
  active: boolean
}>`
  height: 34px;
  width: 50%;
  text-align: center;
  background: ${(props) =>
    props.active === true ? props.theme.colors.primary : "none"};
  border-radius: 4px 4px 0px 0px;
  display: inline-block;
  line-height: 200%;
  vertical-align: middle;

  color: ${(props) =>
    props.active === true ? "white" : props.theme.colors.text};

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

const WalletContentHeader = styled.div`
  height: 42px;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  position: sticky;
  top: 76px;
  padding-top: 8px;
  background: ${(props) => props.theme.colors.background};
`

const FindWalletPage = ({ data, location }) => {
  const intl = useIntl()

  const [showFeatureFilters, setShowFeatureFilters] = useState(false)
  const [filters, setFilters] = useState({
    android: false,
    ios: false,
    linux: false,
    windows: false,
    macOS: false,
    firefox: false,
    chromium: false,
    hardware: false,
    open_source: false,
    non_custodial: false,
    hardware_support: false,
    walletconnect: false,
    rpc_importing: false,
    nft_support: false,
    connect_to_dapps: false,
    staking: false,
    swaps: false,
    layer_2: false,
    gas_fee_customization: false,
    ens_support: false,
    erc_20_support: false,
    buy_crypto: false,
    withdraw_crypto: false,
    multisig: false,
    social_recovery: false,
  })

  const updateFilterOption = (key) => {
    const updatedFilters = { ...filters }
    updatedFilters[key] = !updatedFilters[key]
    setFilters(updatedFilters)
  }

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
          image={getImage(data.hero)!}
          alt={translateMessageId("page-find-wallet-image-alt", intl)}
          loading="eager"
          objectFit="contain"
        />
      </HeroContainer>

      <TableContent>
        <FilterSidebar>
          <FilterTabs>
            <FilterTab
              active={!showFeatureFilters}
              onClick={() => setShowFeatureFilters(false)}
            >
              PROFILE FILTERS
            </FilterTab>
            <FilterTab
              active={showFeatureFilters}
              onClick={() => setShowFeatureFilters(true)}
            >
              FEATURE FILTERS
            </FilterTab>
          </FilterTabs>
          <div>
            {showFeatureFilters ? (
              <WalletFilterSidebar
                data={data}
                filters={filters}
                updateFilterOption={updateFilterOption}
              />
            ) : (
              <WalletPersonasSidebar setFilters={setFilters} />
            )}
          </div>
        </FilterSidebar>
        <WalletContent>
          <WalletContentHeader>Wallet</WalletContentHeader>
        </WalletContent>
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
    mobile: file(relativePath: { eq: "wallets/mobile.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`
