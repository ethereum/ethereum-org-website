// Libraries
import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"
import styled from "@emotion/styled"
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
import { FilterBurgerIcon } from "../../components/icons/wallets"

// Utils
import { translateMessageId } from "../../utils/translations"
import { trackCustomEvent } from "../../utils/matomo"
import { getImage } from "../../utils/image"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

// Styles
const PageStyled = styled(Page)<{ showMobileSidebar: boolean }>`
  ${({ showMobileSidebar }) =>
    showMobileSidebar &&
    `
    pointer-events: none;
  `}
`

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
  pointer-events: none;
`

const FilterBurgerStyled = styled(FilterBurgerIcon)`
  pointer-events: none;
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
  pointer-events: auto;
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
  const resetWalletFilter = React.useRef(() => {})
  const wrapperRef = useRef<HTMLDivElement>(null)

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

  useOnClickOutside(wrapperRef, () => setShowMobileSidebar(false), ["mouseup"])

  return (
    <PageStyled showMobileSidebar={showMobileSidebar}>
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
            <p>
              <Translation id="page-find-wallet-filters" />
            </p>
            <SecondaryText>
              {Object.values(filters).reduce((acc, filter) => {
                if (filter) {
                  acc += 1
                }
                return acc
              }, 0)}{" "}
              {translateMessageId("page-find-wallet-active", intl)}
            </SecondaryText>
          </div>
          {showMobileSidebar ? (
            <StyledIcon name="cancel" />
          ) : (
            <FilterBurgerStyled />
          )}
        </MobileFilterToggle>
      </MobileFilterToggleContainer>
      <TableContent>
        <FilterSidebar showMobileSidebar={showMobileSidebar} ref={wrapperRef}>
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
              <p>
                <Translation id="page-find-wallet-profile-filters" />
              </p>
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
                {translateMessageId("page-find-wallet-feature-filters", intl)} (
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
              resetWalletFilter.current()
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
                resetWalletFilter={resetWalletFilter}
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
            <Translation id="page-find-wallet-footnote-1" />
          </i>
        </p>
        <p>
          <i>
            <Translation id="page-find-wallet-footnote-2" />
          </i>
        </p>
        <p>
          <i>
            <Translation id="page-find-wallet-footnote-3" />
          </i>
        </p>
      </Note>
    </PageStyled>
  )
}

export default FindWalletPage

export const walletImage = graphql`
  fragment walletImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 56
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  {
    hero: file(relativePath: { eq: "wallets/find-wallet-hero.png" }) {
      ...walletImage
    }
    airgap: file(relativePath: { eq: "wallets/airgap.png" }) {
      ...walletImage
    }
    argent: file(relativePath: { eq: "wallets/argent.png" }) {
      ...walletImage
    }
    brave: file(relativePath: { eq: "wallets/brave.png" }) {
      ...walletImage
    }
    coin98: file(relativePath: { eq: "wallets/coin98.png" }) {
      ...walletImage
    }
    coinbase: file(relativePath: { eq: "wallets/coinbase.png" }) {
      ...walletImage
    }
    frame: file(relativePath: { eq: "wallets/frame.png" }) {
      ...walletImage
    }
    keystone: file(relativePath: { eq: "wallets/keystone.png" }) {
      ...walletImage
    }
    loopring: file(relativePath: { eq: "wallets/loopring.png" }) {
      ...walletImage
    }
    metamask: file(relativePath: { eq: "wallets/metamask.png" }) {
      ...walletImage
    }
    numio: file(relativePath: { eq: "wallets/numio.png" }) {
      ...walletImage
    }
    portis: file(relativePath: { eq: "wallets/portis.png" }) {
      ...walletImage
    }
    tallyho: file(relativePath: { eq: "wallets/tallyho.png" }) {
      ...walletImage
    }
    safe: file(relativePath: { eq: "wallets/safe.png" }) {
      ...walletImage
    }
    coinwallet: file(relativePath: { eq: "wallets/coinwallet.png" }) {
      ...walletImage
    }
    ambire: file(relativePath: { eq: "wallets/ambire.png" }) {
      ...walletImage
    }
    zengo: file(relativePath: { eq: "wallets/zengo.png" }) {
      ...walletImage
    }
    linen: file(relativePath: { eq: "wallets/linen.png" }) {
      ...walletImage
    }
    imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
      ...walletImage
    }
    foxwallet: file(relativePath: { eq: "wallets/foxwallet.png" }) {
      ...walletImage
    }
    mycrypto: file(relativePath: { eq: "wallets/mycrypto.png" }) {
      ...walletImage
    }
    pillar: file(relativePath: { eq: "wallets/pillar.png" }) {
      ...walletImage
    }
    mew: file(relativePath: { eq: "wallets/mew.png" }) {
      ...walletImage
    }
    unstoppable: file(relativePath: { eq: "wallets/unstoppable.png" }) {
      ...walletImage
    }
    myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
      ...walletImage
    }
    alpha: file(relativePath: { eq: "wallets/alpha.png" }) {
      ...walletImage
    }
    opera: file(relativePath: { eq: "wallets/opera.png" }) {
      ...walletImage
    }
    guarda: file(relativePath: { eq: "wallets/guarda.png" }) {
      ...walletImage
    }
    web3auth: file(relativePath: { eq: "wallets/web3auth.png" }) {
      ...walletImage
    }
    bridge: file(relativePath: { eq: "wallets/bridge.png" }) {
      ...walletImage
    }
    torus: file(relativePath: { eq: "wallets/torus.png" }) {
      ...walletImage
    }
    tokenpocket: file(relativePath: { eq: "wallets/tokenpocket.png" }) {
      ...walletImage
    }
    oneinch: file(relativePath: { eq: "wallets/1inch.png" }) {
      ...walletImage
    }
    rainbow: file(relativePath: { eq: "wallets/rainbow.png" }) {
      ...walletImage
    }
    status: file(relativePath: { eq: "wallets/status.png" }) {
      ...walletImage
    }
    aktionariat: file(relativePath: { eq: "wallets/aktionariat.png" }) {
      ...walletImage
    }
    sequence: file(relativePath: { eq: "wallets/sequence.png" }) {
      ...walletImage
    }
    trezor: file(relativePath: { eq: "wallets/trezor.png" }) {
      ...walletImage
    }
    ledger: file(relativePath: { eq: "wallets/ledger.png" }) {
      ...walletImage
    }
    infinity_wallet: file(relativePath: { eq: "wallets/infinity_wallet.png" }) {
      ...walletImage
    }
    exodus: file(relativePath: { eq: "wallets/exodus.png" }) {
      ...walletImage
    }
    rabbywallet: file(relativePath: { eq: "wallets/rabbywallet.png" }) {
      ...walletImage
    }
    bitcoindotcom: file(relativePath: { eq: "wallets/bitcoindotcom.png" }) {
      ...walletImage
    }
    zerion: file(relativePath: { eq: "wallets/zerion.png" }) {
      ...walletImage
    }
    enkrypt: file(relativePath: { eq: "wallets/enkrypt.png" }) {
      ...walletImage
    }
    gridplus: file(relativePath: { eq: "wallets/gridplus.png" }) {
      ...walletImage
    }
    bitkeep: file(relativePath: { eq: "wallets/bitkeep.png" }) {
      ...walletImage
    }
    blockwallet: file(relativePath: { eq: "wallets/blockwallet.png" }) {
      ...walletImage
    }
    okx: file(relativePath: { eq: "wallets/okx.jpeg" }) {
      ...walletImage
    }
    onekey: file(relativePath: { eq: "wallets/onekey.png" }) {
      ...walletImage
    }
    apex: file(relativePath: { eq: "wallets/apex.png" }) {
      ...walletImage
    }
  }
`
