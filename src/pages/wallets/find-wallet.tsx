import { useEffect, useRef, useState } from "react"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  Center,
  Flex,
  Hide,
  Show,
  Text,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp } from "@/lib/types"

import BannerNotification from "@/components/BannerNotification"
import Breadcrumbs from "@/components/Breadcrumbs"
import { MobileFiltersMenu } from "@/components/FindWallet/MobileFiltersMenu"
import WalletFilterPersona from "@/components/FindWallet/WalletFilterPersona"
import WalletFilterSidebar from "@/components/FindWallet/WalletFilterSidebar"
import WalletTable from "@/components/FindWallet/WalletTable"
import { Image } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import { WalletData } from "@/data/wallets/wallet-data"

import { NAV_BAR_PX_HEIGHT, WALLETS_FILTERS_DEFAULT } from "@/lib/constants"

import HeroImage from "@/public/wallets/wallet-hero.png"

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

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/wallets/find-wallet"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const FindWalletPage = () => {
  const { pathname, locale } = useRouter()
  const theme = useTheme()
  const { t } = useTranslation("page-wallets-find-wallet")
  const resetWalletFilter = useRef(() => {})
  const [filters, setFilters] = useState(WALLETS_FILTERS_DEFAULT)
  const [selectedPersona, setSelectedPersona] = useState(NaN)
  const { isOpen: showMobileSidebar, onOpen, onClose } = useDisclosure()

  const supportedLocaleWallets = getSupportedLocaleWallets(locale!)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale!)
  const [randomizedWalletData, setRandomizedWalletData] = useState<
    WalletData[]
  >(supportedLocaleWallets.concat(noSupportedLocaleWallets))

  // If any wallet supports user's locale, show them (shuffled) at the top and then the remaining ones
  useEffect(() => {
    setRandomizedWalletData(
      supportedLocaleWallets.concat(noSupportedLocaleWallets)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    setFilters(WALLETS_FILTERS_DEFAULT)
  }

  return (
    <Flex as={MainArticle} direction="column" position="relative" w="full">
      <PageMetadata
        title={t("page-find-wallet-meta-title")}
        description={t("page-find-wallet-meta-description")}
        image="/wallets/wallet-hero.png"
      />

      <BannerNotification shouldShow={true}>
        {t("page-find-wallet-footnote-1")}
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
          <Breadcrumbs slug={pathname} />
          <OldHeading
            as="h1"
            fontSize={{ base: "2.5rem", md: "5xl" }}
            lineHeight={1.4}
          >
            {t("page-find-wallet-title")}
          </OldHeading>
          <Subtitle>{t("page-find-wallet-description")}</Subtitle>
          <Subtitle>
            {t("page-find-wallet-desc-2")}{" "}
            <InlineLink to="/wallets">
              {t("page-find-wallet-desc-2-wallets-link")}
            </InlineLink>
          </Subtitle>
        </Box>
        <Center w={{ base: "full", sm: "50%" }}>
          <Image
            src={HeroImage}
            width={500}
            alt=""
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </Center>
      </Flex>

      {/* Wallet Personas */}
      <Box px={{ base: 4, "2xl": 0 }}>
        <OldHeading
          as="h3"
          fontSize="xl"
          fontWeight="bold"
          lineHeight={1.4}
          mt={0}
          mb={3}
        >
          {t("page-find-wallet-personas-title")}
        </OldHeading>

        <WalletFilterPersona
          resetFilters={resetFilters}
          setFilters={setFilters}
          selectedPersona={selectedPersona}
          setSelectedPersona={setSelectedPersona}
          showMobileSidebar={showMobileSidebar}
        />
      </Box>

      {/* Mobile filters menu */}
      <Hide above="lg">
        <MobileFiltersMenu
          filters={filters}
          resetWalletFilter={resetWalletFilter}
          updateFilterOption={updateFilterOption}
          updateFilterOptions={updateFilterOptions}
          resetFilters={resetFilters}
          selectedPersona={selectedPersona}
          setFilters={setFilters}
          setSelectedPersona={setSelectedPersona}
          showMobileSidebar={showMobileSidebar}
          onOpen={onOpen}
          onClose={onClose}
        />
      </Hide>

      <Box px={{ md: 4, "2xl": 0 }}>
        <Flex pt={4} pb={6} gap={6}>
          <Show above="lg">
            <WalletFilterSidebar
              w={{ md: "330px" }}
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
            mt={0.5}
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
              filters={filters}
              resetFilters={resetFilters}
              resetWalletFilter={resetWalletFilter}
              walletData={randomizedWalletData}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default FindWalletPage
