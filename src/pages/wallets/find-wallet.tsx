// Libraries
import React, { useState } from "react"
import { graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { shuffle } from "lodash"

// Components
import Breadcrumbs from "../../components/Breadcrumbs"
import Icon from "../../components/Icon"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import { Content, Page } from "../../components/SharedStyledComponents"
import Translation from "../../components/Translation"
import WalletFilterSidebar from "../../components/FindWallet/WalletFilterSidebar"
import WalletPersonasSidebar from "../../components/FindWallet/WalletPersonasSidebar"
import WalletTable from "../../components/FindWallet/WalletTable"

// Data
import walletData from "../../data/wallets/wallet-data"

// Icons
import FilterBurger from "../../assets/wallets/filter_burger.svg"

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

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem 0;
  }
`

const MobileFilterToggleContainer = styled.div`
  position: sticky;
  top: 76px;
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  z-index: 1;
  padding: 5px 0;
`

const MobileFilterToggle = styled.div`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: flex;
    float: left;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.codeBackground};
    border: 1px solid #404040;
    border-radius: 0px 4px 4px 0px;
    padding: 6px 20px 10px 20px;
    margin: auto;
    margin-left: 0;
    z-index: 1;
  }

  p {
    margin: 0;
  }

  svg {
    width: 24px;
    height: 24px;
    line {
      stroke: ${(props) => props.theme.colors.primary};
    }
    circle {
      stroke: ${(props) => props.theme.colors.primary};
    }
  }
`

const SecondaryText = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: ${(props) => props.theme.colors.text200};
`

const FilterSidebar = styled.div<{ showMobileSidebar: boolean }>`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: ${(props) => (props.showMobileSidebar ? "350px" : "0")};
    height: ${(props) => (props.showMobileSidebar ? "100%" : "0")};
    display: ${(props) => (props.showMobileSidebar ? "flex" : "none")};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: ${(props) => (props.showMobileSidebar ? "100%" : "0")};
    height: ${(props) => (props.showMobileSidebar ? "100%" : "0")};
    display: ${(props) => (props.showMobileSidebar ? "flex" : "none")};
  }
`

const FilterTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  position: sticky;
  top: 76px;
  padding-top: 8px;
  min-height: 50px;
  background: ${(props) => props.theme.colors.background};
  z-index: 1;

  p {
    margin: 0;
    letter-spacing: 0.02rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    top: 140px;
  }
`

const FilterTab = styled.div<{
  active: boolean
}>`
  width: 50%;
  text-align: center;
  background: ${(props) =>
    props.active === true ? props.theme.colors.primary : "none"};
  border-radius: 8px 0px 0px 0px;
  padding: 10px;
  vertical-align: middle;

  color: ${(props) =>
    props.active === true
      ? props.theme.colors.background
      : props.theme.colors.text};

  :last-child {
    border-radius: 0px 8px 0px 0px;
  }

  :hover {
    background: ${(props) =>
      props.active === true
        ? props.theme.colors.primary
        : props.theme.colors.selectHover};
  }
`

const WalletContent = styled.div<{ showMobileSidebar: boolean }>`
  width: 75%;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
    display: ${(props) => (props.showMobileSidebar ? "none" : "")};
  }
`

const Note = styled.div`
  text-align: center;
  padding: 20px;

  p {
    font-size: 14px;
    line-height: 23px;
    margin: 0;
  }
`

const ResetContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border-radius: 4px;
  width: 100%;
  margin: 0 auto;
  gap: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  :hover {
    p {
      color: ${(props) => props.theme.colors.selectHover};
    }
    svg {
      fill: ${(props) => props.theme.colors.selectHover};
    }
  }

  p {
    margin: 0;
    color: ${(props) => props.theme.colors.primary};
  }
  svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`

const ResetIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

const filterDefault = {
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
}

const randomizedWalletData = shuffle(walletData)

const FindWalletPage = ({ data, location }) => {
  const intl = useIntl()

  const [showFeatureFilters, setShowFeatureFilters] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [filters, setFilters] = useState(filterDefault)
  const [selectedPersona, setSelectedPersona] = useState(NaN)

  const updateFilterOption = (key) => {
    const updatedFilters = { ...filters }
    updatedFilters[key] = !updatedFilters[key]
    setFilters(updatedFilters)
    setSelectedPersona(NaN)
  }

  const updateFilterOptions = (keys, value) => {
    const updatedFilters = { ...filters }
    for (let key of keys) {
      updatedFilters[key] = value
    }
    setFilters(updatedFilters)
    setSelectedPersona(NaN)
  }

  const resetFilters = () => {
    setSelectedPersona(NaN)
    setFilters(filterDefault)
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
      <MobileFilterToggleContainer>
        <MobileFilterToggle
          onClick={() => {
            setShowMobileSidebar(!showMobileSidebar)
          }}
        >
          <div>
            <p>FILTERS</p>
            <SecondaryText>
              {Object.values(filters).reduce((acc, filter) => {
                if (filter) {
                  acc += 1
                }
                return acc
              }, 0)}{" "}
              active
            </SecondaryText>
          </div>
          <FilterBurger />
        </MobileFilterToggle>
      </MobileFilterToggleContainer>
      <TableContent>
        <FilterSidebar showMobileSidebar={showMobileSidebar}>
          <FilterTabs>
            <FilterTab
              active={!showFeatureFilters}
              onClick={() => setShowFeatureFilters(false)}
            >
              <p>Profile Filters</p>
            </FilterTab>
            <FilterTab
              active={showFeatureFilters}
              onClick={() => setShowFeatureFilters(true)}
            >
              <p>Feature Filters</p>
            </FilterTab>
          </FilterTabs>
          <ResetContainer onClick={resetFilters}>
            <ResetIcon name="arrowCounterClockwise" size="14" />
            <p>RESET FILTERS</p>
          </ResetContainer>
          <div>
            {showFeatureFilters ? (
              <WalletFilterSidebar
                filters={filters}
                updateFilterOption={updateFilterOption}
                updateFilterOptions={updateFilterOptions}
              />
            ) : (
              <WalletPersonasSidebar
                resetFilters={resetFilters}
                setFilters={setFilters}
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
              />
            )}
          </div>
        </FilterSidebar>
        <WalletContent showMobileSidebar={showMobileSidebar}>
          <WalletTable
            data={data}
            filters={filters}
            walletData={randomizedWalletData}
          />
        </WalletContent>
      </TableContent>
      <Note>
        <p>
          <i>
            Wallets listed on this page are not official endorsements, and are
            provided for informational purposes only.{" "}
          </i>
        </p>
        <p>
          <i>
            Their descriptions have been provided by the wallet companies
            themselves.{" "}
          </i>
        </p>
        <p>
          <i>
            We add products to this page based on criteria in our{" "}
            <Link to="/contributing/adding-products/">listing policy</Link>. If
            you'd like us to add a wallet,{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml&title=Suggest+a+wallet">
              raise an issue in GitHub
            </Link>
            .
          </i>
        </p>
      </Note>
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
    airgap: file(relativePath: { eq: "wallets/airgap.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    argent: file(relativePath: { eq: "wallets/argent.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    brave: file(relativePath: { eq: "wallets/brave.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    coin98: file(relativePath: { eq: "wallets/coin98.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    coinbase: file(relativePath: { eq: "wallets/coinbase.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    frame: file(relativePath: { eq: "wallets/frame.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    keystone: file(relativePath: { eq: "wallets/keystone.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    loopring: file(relativePath: { eq: "wallets/loopring.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    metamask: file(relativePath: { eq: "wallets/metamask.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    numio: file(relativePath: { eq: "wallets/numio.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    portis: file(relativePath: { eq: "wallets/portis.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    tallyho: file(relativePath: { eq: "wallets/tallyho.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    gnosis: file(relativePath: { eq: "wallets/gnosis.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    coinwallet: file(relativePath: { eq: "wallets/coinwallet.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    ambire: file(relativePath: { eq: "wallets/ambire.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    zengo: file(relativePath: { eq: "wallets/zengo.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    linen: file(relativePath: { eq: "wallets/linen.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    foxwallet: file(relativePath: { eq: "wallets/foxwallet.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`
