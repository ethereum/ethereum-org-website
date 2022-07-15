// Libraries
import React, { useState } from "react"
import { graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"
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
import { trackCustomEvent } from "../../utils/matomo"

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
  height: 90vh;
  overflow: hidden;
  position: sticky;
  top: 76px;
  margin-bottom: 150px;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
  padding-bottom: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem 0 0;
    margin-bottom: 120px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 1rem 0 0;
    margin-bottom: 230px;
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

const MobileFilterToggle = styled.div<{ showMobileSidebar: boolean }>`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-left: none;
    border-radius: 0px 4px 4px 0px;
    padding: 6px 20px 10px 20px;
    margin: auto;
    margin-left: 0;
    z-index: 1;
    width: 100%;
    max-width: ${(props) => (props.showMobileSidebar ? "330px" : "150px")};
    background: ${(props) =>
      props.showMobileSidebar
        ? props.theme.colors.background
        : props.theme.colors.background};
  }

  p {
    margin: 0;
  }

  svg {
    width: 32px;
    height: 32px;
    line {
      stroke: ${(props) => props.theme.colors.primary};
    }
    circle {
      stroke: ${(props) => props.theme.colors.primary};
    }
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
  width: 24;
  height: 24;
`

const SecondaryText = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: ${(props) => props.theme.colors.text200};
`

const FilterSidebar = styled.div<{ showMobileSidebar: boolean }>`
  max-width: 330px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  overflow-y: scroll;
  background: ${(props) => props.theme.colors.background};
  transition: 0.5s all;
  z-index: 20;
  border-radius: 0px 8px 0px 0px;
  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.theme.colors.lightBorder}
    ${(props) => props.theme.colors.background};
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.lightBorder};
    border-radius: 4px;
    border: 2px solid ${(props) => props.theme.colors.background};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: ${(props) => (props.showMobileSidebar ? "350px" : "350px")};
    left: ${(props) => (props.showMobileSidebar ? "0" : "-400px")};
    height: ${(props) => (props.showMobileSidebar ? "100%" : "100%")};
    display: ${(props) => (props.showMobileSidebar ? "flex" : "none")};
    position: ${(props) => (props.showMobileSidebar ? "absolute" : "relative")};
    box-shadow: ${(props) =>
      props.showMobileSidebar ? "0 800px 0 800px rgb(0 0 0 / 65%)" : "none"};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: ${(props) => (props.showMobileSidebar ? "90%" : "90%")};
    height: ${(props) => (props.showMobileSidebar ? "100%" : "100%")};
    display: ${(props) => (props.showMobileSidebar ? "flex" : "none")};
  }
`

const FilterTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  position: sticky;
  top: 0;
  background: ${(props) => props.theme.colors.background};
  z-index: 1;

  p {
    margin: 0;
    letter-spacing: 0.02rem;
    font-size: 0.9rem;
    width: 100%;
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
  padding: 0.9rem 0.4rem;
  display: flex;
  justify-items: center;
  align-items: center;

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
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.theme.colors.lightBorder}
    ${(props) => props.theme.colors.background};
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.lightBorder};
    border-radius: 4px;
    border: 2px solid ${(props) => props.theme.colors.background};
  }
  table {
    margin: 0;
  }

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
    padding-top: 0.2rem;
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
  eip_1559_support: false,
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
          alt=""
          loading="eager"
          objectFit="contain"
        />
      </HeroContainer>
      <MobileFilterToggleContainer>
        <MobileFilterToggle
          showMobileSidebar={showMobileSidebar}
          onClick={() => {
            setShowMobileSidebar(!showMobileSidebar)
            trackCustomEvent({
              eventCategory: "MobileFilterToggle",
              eventAction: `Tap MobileFilterToggle`,
              eventName: `show mobile filters ${!showMobileSidebar}`,
            })
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
          {showMobileSidebar ? <StyledIcon name="cancel" /> : <FilterBurger />}
        </MobileFilterToggle>
      </MobileFilterToggleContainer>
      <TableContent>
        <FilterSidebar showMobileSidebar={showMobileSidebar}>
          <FilterTabs>
            <FilterTab
              active={!showFeatureFilters}
              onClick={() => {
                setShowFeatureFilters(false)
                trackCustomEvent({
                  eventCategory: "WalletFilterSidebar",
                  eventAction: `WalletFilterSidebar tab clicked`,
                  eventName: `show user personas`,
                })
              }}
            >
              <p>Profile Filters</p>
            </FilterTab>
            <FilterTab
              active={showFeatureFilters}
              onClick={() => {
                setShowFeatureFilters(true)
                trackCustomEvent({
                  eventCategory: "WalletFilterSidebar",
                  eventAction: `WalletFilterSidebar tab clicked`,
                  eventName: `show feature filters`,
                })
              }}
            >
              <p>
                Feature Filters (
                {Object.values(filters).reduce((acc, filter) => {
                  if (filter) {
                    acc += 1
                  }
                  return acc
                }, 0)}
                )
              </p>
            </FilterTab>
          </FilterTabs>
          <ResetContainer
            role="button"
            aria-labelledby="reset-filter"
            onClick={() => {
              resetFilters()
              trackCustomEvent({
                eventCategory: "WalletFilterReset",
                eventAction: `WalletFilterReset clicked`,
                eventName: `reset filters`,
              })
            }}
          >
            <ResetIcon
              aria-hidden="true"
              name="arrowCounterClockwise"
              size="14"
            />
            <p id="reset-filter" aria-hidden="true">
              {"Reset filters".toUpperCase()}
            </p>
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
            Their descriptions have been provided by the wallet projects
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
    mycrypto: file(relativePath: { eq: "wallets/mycrypto.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    pillar: file(relativePath: { eq: "wallets/pillar.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    mew: file(relativePath: { eq: "wallets/mew.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    unstoppable: file(relativePath: { eq: "wallets/unstoppable.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    alpha: file(relativePath: { eq: "wallets/alpha.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    opera: file(relativePath: { eq: "wallets/opera.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    guarda: file(relativePath: { eq: "wallets/guarda.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    web3auth: file(relativePath: { eq: "wallets/web3auth.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    bridge: file(relativePath: { eq: "wallets/bridge.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    torus: file(relativePath: { eq: "wallets/torus.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    tokenpocket: file(relativePath: { eq: "wallets/tokenpocket.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    oneinch: file(relativePath: { eq: "wallets/1inch.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    rainbow: file(relativePath: { eq: "wallets/rainbow.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    status: file(relativePath: { eq: "wallets/status.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    aktionariat: file(relativePath: { eq: "wallets/aktionariat.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`
