// Libraries
import {
  Flex,
  Box,
  useTheme,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Hide,
  DrawerHeader,
  Show,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { shuffle } from "lodash"

// Components
import BannerNotification from "../../components/BannerNotification"
import Breadcrumbs from "../../components/Breadcrumbs"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import WalletFilterSidebar from "../../components/FindWallet/WalletFilterSidebar"
import WalletTable from "../../components/FindWallet/WalletTable"
import OldHeading from "../../components/OldHeading"
import GatsbyImage from "../../components/GatsbyImage"

// Data
import walletData from "../../data/wallets/wallet-data"

// Icons
import { FilterBurgerIcon } from "../../components/icons/wallets"

// Utils
import { trackCustomEvent } from "../../utils/matomo"
import { getImage } from "../../utils/image"

import type { ChildOnlyProp } from "../../types"
import { NAV_BAR_PX_HEIGHT } from "../../constants"
import { Button } from "../../components/Buttons"

const Subtitle = ({ children }: ChildOnlyProp) => (
  <Text
    fontSize="xl"
    lineHeight={1.4}
    color="body.medium"
    mb={6}
    _last={{ mb: 8 }}
  >
    {children}
  </Text>
)

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
  const { isOpen: showMobileSidebar, onOpen, onClose } = useDisclosure()

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
    <Flex direction="column" position="relative" w="full">
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
          <OldHeading
            as="h1"
            fontSize={{ base: "2.5rem", md: "5xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-find-wallet-title" />
          </OldHeading>
          <Subtitle>
            <Translation id="page-find-wallet-description" />
          </Subtitle>
          <Subtitle>
            <Translation id="page-find-wallet-desc-2" />
          </Subtitle>
        </Box>
        <GatsbyImage
          w={{ base: "full", sm: "50%" }}
          image={getImage(data.hero)!}
          alt=""
          loading="eager"
          objectFit="contain"
        />
      </Flex>

      <Hide above="lg">
        <Box
          display={{ base: "block", lg: "none" }}
          position="sticky"
          top={NAV_BAR_PX_HEIGHT}
          bg="background.base"
          w="full"
          zIndex="docked"
          py="5px"
        >
          <Button
            rightIcon={<FilterBurgerIcon />}
            variant="outline"
            borderInlineStart="none"
            borderInlineStartRadius="none"
            gap={4}
            sx={{
              svg: {
                boxSize: 8,
                line: { stroke: "primary.base" },
                circle: { stroke: "primary.base" },
              },
            }}
            onClick={() => {
              showMobileSidebar ? onClose() : onOpen()
              trackCustomEvent({
                eventCategory: "MobileFilterToggle",
                eventAction: `Tap MobileFilterToggle`,
                eventName: `show mobile filters ${!showMobileSidebar}`,
              })
            }}
          >
            <Box>
              <Text>
                <Translation id="page-find-wallet-filters" />
              </Text>
              <Text fontSize="sm" lineHeight="14px" color="body.medium">
                {Object.values(filters).reduce(
                  (acc, filter) => (filter ? acc + 1 : acc),
                  0
                )}{" "}
                {t("page-find-wallet-active")}
              </Text>
            </Box>
          </Button>
        </Box>
        <Drawer
          isOpen={showMobileSidebar}
          placement="start"
          onClose={onClose}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader mb={4}>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody position="relative">
              <WalletFilterSidebar
                position="absolute"
                inset={2}
                overflow="auto"
                {...{
                  filters,
                  resetWalletFilter,
                  updateFilterOption,
                  updateFilterOptions,
                  resetFilters,
                  selectedPersona,
                  setFilters,
                  setSelectedPersona,
                }}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Hide>
      <Flex px={{ base: 0, md: 8 }} pt={4} pb={6} gap={6}>
        <Show above="lg">
          <WalletFilterSidebar
            maxW="330px"
            top={NAV_BAR_PX_HEIGHT}
            {...{
              filters,
              resetWalletFilter,
              updateFilterOption,
              updateFilterOptions,
              resetFilters,
              selectedPersona,
              setFilters,
              setSelectedPersona,
            }}
          />
        </Show>
        <Box
          w="full"
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
        p={4}
        m={4}
        sx={{
          p: {
            fontSize: "sm",
            lineHeight: "18px",
            p: "1",
            m: 0,
          },
        }}
      >
        <Text fontStyle="italic">
          <Translation id="page-find-wallet-footnote-1" />
        </Text>
        <Text fontStyle="italic">
          <Translation id="page-find-wallet-footnote-2" />
        </Text>
        <Text fontStyle="italic">
          <Translation id="page-find-wallet-footnote-3" />
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
    phantom: file(relativePath: { eq: "wallets/phantom.png" }) {
      ...walletImage
    }
    XDEFI: file(relativePath: { eq: "wallets/XDEFI.png" }) {
      ...walletImage
    }
  }
`
