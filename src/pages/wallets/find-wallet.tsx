// Libraries
import React, { useState, useRef } from "react"
import {
  Flex,
  Box,
  Image,
  Icon,
  Text,
  Heading,
  useTheme,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { shuffle } from "lodash"
import { MdOutlineCancel } from "react-icons/md"

// Components
import BannerNotification from "../../components/BannerNotification"
import Breadcrumbs from "../../components/Breadcrumbs"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import WalletFilterSidebar from "../../components/FindWallet/WalletFilterSidebar"
import WalletTable from "../../components/FindWallet/WalletTable"

// Data
import walletData from "../../data/wallets/wallet-data"

// Icons
import { FilterBurgerIcon } from "../../components/icons/wallets"

// Utils
import { trackCustomEvent } from "../../utils/matomo"
import { getImage } from "../../utils/image"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import type { ChildOnlyProp } from "../../types"

const Subtitle = ({ children }: ChildOnlyProp) => {
  return (
    <Text
      fontSize="xl"
      lineHeight={1.4}
      color="text200"
      _last={{
        mb: 8,
      }}
    >
      {children}
    </Text>
  )
}

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

export type FiltersType = typeof filterDefault

const randomizedWalletData = shuffle(walletData)

const FindWalletPage = ({ data, location }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const resetWalletFilter = React.useRef(() => {})
  const wrapperRef = useRef<HTMLDivElement>(null)

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
    <Flex
      direction="column"
      alignItems="center"
      w="full"
      mx="auto"
      pointerEvents={showMobileSidebar ? "none" : "auto"}
    >
      <PageMetadata
        title={t("page-find-wallet-meta-title")}
        description={t("page-find-wallet-meta-description")}
      />

      <BannerNotification shouldShow={true}>
        <Translation id="page-find-wallet-footnote-1" />
      </BannerNotification>

      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        position="relative"
        w="full"
        p={12}
        bg="layer2Gradient"
        mb="44px"
      >
        <Box w={{ base: "full", sm: "50%" }} mt={{ base: 8, sm: 0 }}>
          <Breadcrumbs slug={location.pathname} />
          <Heading
            as="h1"
            fontSize={{ base: "2.5rem", md: "5xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-find-wallet-title" />
          </Heading>
          <Subtitle>
            <Translation id="page-find-wallet-description" />
          </Subtitle>
          <Subtitle>
            <Translation id="page-find-wallet-desc-2" />
          </Subtitle>
        </Box>
        <Image
          as={GatsbyImage}
          w={{ base: "full", sm: "50%" }}
          image={getImage(data.hero)!}
          alt=""
          loading="eager"
          imgStyle={{
            objectFit: "contain",
          }}
        />
      </Flex>
      <Box
        position="sticky"
        top="76px"
        bg="background.base"
        w="full"
        zIndex={1}
        py="5px"
      >
        <Box
          display={{ base: "flex", lg: "none" }}
          gap={4}
          justifyContent="space-between"
          alignItems="center"
          border="1px solid"
          borderColor="primary.base"
          borderLeft="none"
          borderRightRadius="base"
          pt={1.5}
          px={5}
          pb={2.5}
          m="auto"
          ml={0}
          zIndex={1}
          w="full"
          maxW={showMobileSidebar ? "330px" : "150px"}
          bg="background.base"
          onClick={() => {
            setShowMobileSidebar(!showMobileSidebar)
            trackCustomEvent({
              eventCategory: "MobileFilterToggle",
              eventAction: `Tap MobileFilterToggle`,
              eventName: `show mobile filters ${!showMobileSidebar}`,
            })
          }}
          sx={{
            p: {
              m: 0,
            },
            svg: {
              pointerEvents: "none",
              boxSize: 8,
              line: {
                stroke: "primary.base",
              },
              circle: {
                stroke: "primary.base",
              },
            },
          }}
        >
          <Box>
            <Text>
              <Translation id="page-find-wallet-filters" />
            </Text>
            <Text fontSize="sm" lineHeight="14px" color="text200">
              {Object.values(filters).reduce((acc, filter) => {
                if (filter) {
                  acc += 1
                }
                return acc
              }, 0)}{" "}
              {t("page-find-wallet-active")}
            </Text>
          </Box>
          {showMobileSidebar ? (
            <Icon as={MdOutlineCancel} fill="primary.base" />
          ) : (
            <FilterBurgerIcon />
          )}
        </Box>
      </Box>
      <Flex
        px={{ base: 0, md: 8 }}
        pt={4}
        pb={0}
        w="full"
        gap={6}
        height="90vh"
        overflow="hidden"
        position="sticky"
        top="76px"
        mb={{ base: "230px", md: "120px", lg: "150px" }}
        borderBottom="1px solid"
        borderBottomColor="secondary"
      >
        <WalletFilterSidebar
          ref={wrapperRef}
          {...{
            filters,
            resetWalletFilter,
            updateFilterOption,
            updateFilterOptions,
            resetFilters,
            selectedPersona,
            setFilters,
            setSelectedPersona,
            showMobileSidebar,
          }}
        />
        <Box
          w="full"
          overflowY="scroll"
          sx={{
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.colors.lightBorder} ${theme.colors.background}`,

            "::-webkit-scrollbar": {
              width: 2,
            },
            "::-webkit-scrollbar-track": {
              bg: "background.base",
            },
            "::-webkit-scrollbar-thumb": {
              bgColor: "lightBorder",
              borderRadius: "base",
              border: "2px solid",
              borderColor: "background.base",
            },
            table: {
              m: 0,
            },
          }}
          display={{
            base: showMobileSidebar ? "none" : "block",
            sm: "block",
          }}
        >
          <WalletTable
            data={data}
            filters={filters}
            walletData={randomizedWalletData}
          />
        </Box>
      </Flex>
      <Box
        textAlign="center"
        p={5}
        sx={{
          p: {
            fontSize: "sm",
            lineHeight: "23px",
            pt: "0.2rem",
            m: 0,
          },
        }}
      >
        <Text>
          <Text as="i">
            <Translation id="page-find-wallet-footnote-1" />
          </Text>
        </Text>
        <Text>
          <Text as="i">
            <Translation id="page-find-wallet-footnote-2" />
          </Text>
        </Text>
        <Text>
          <Text as="i">
            <Translation id="page-find-wallet-footnote-3" />
          </Text>
        </Text>
      </Box>
    </Flex>
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
  query FindWalletPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-wallets-find-wallet", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    hero: file(relativePath: { eq: "wallets/find-wallet-hero.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
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
    taho: file(relativePath: { eq: "wallets/taho.png" }) {
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
    shapeshift: file(relativePath: { eq: "wallets/shapeshift.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`
