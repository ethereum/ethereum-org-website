import { useRef, useState } from "react"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  calc,
  Center,
  Flex,
  Show,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import type { BasePageProps, ChildOnlyProp, Lang, Wallet } from "@/lib/types"

import BannerNotification from "@/components/Banners/BannerNotification"
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
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import {
  BASE_TIME_UNIT,
  DEFAULT_LOCALE,
  NAV_BAR_PX_HEIGHT,
  WALLETS_FILTERS_DEFAULT,
} from "@/lib/constants"

import { useWalletPersonas } from "../../hooks/useWalletPersonas"

import { WalletSupportedLanguageContext } from "@/contexts/WalletSupportedLanguageContext"
import { useWalletTable } from "@/hooks/useWalletTable"
import HeroImage from "@/public/images/wallets/wallet-hero.png"

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

type Props = BasePageProps & {
  wallets: Wallet[]
}

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/wallets/find-wallet"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const supportedLocaleWallets = getSupportedLocaleWallets(locale!)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale!)
  const walletsData = supportedLocaleWallets.concat(noSupportedLocaleWallets)

  const wallets = walletsData.map((wallet) => ({
    ...wallet,
    supportedLanguages: getSupportedLanguages(
      wallet.languages_supported,
      locale!
    ),
  }))

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      wallets,
    },
    // Updated once a day
    revalidate: BASE_TIME_UNIT * 24,
  }
}) satisfies GetStaticProps<Props>

const FindWalletPage = ({
  wallets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { pathname } = useRouter()
  const { t } = useTranslation("page-wallets-find-wallet")
  const personas = useWalletPersonas()
  const resetWalletFilter = useRef(() => {})

  const [filters, setFilters] = useState(WALLETS_FILTERS_DEFAULT)
  const [selectedPersona, setSelectedPersona] = useState<number[]>([])
  const [supportedLanguage, setSupportedLanguage] = useState(DEFAULT_LOCALE)

  const { isOpen: showMobileSidebar, onOpen, onClose } = useDisclosure()

  const {
    featureDropdownItems,
    filteredWallets,
    updateMoreInfo,
    walletCardData,
  } = useWalletTable({ filters, supportedLanguage, t, walletData: wallets })

  const updatePersonaUponFilterChange = (filters) => {
    const newSelectedPersona: number[] = []
    const trueFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value)
    )
    if (Object.keys(trueFilters).length === 0) {
      setSelectedPersona([])
      return
    }

    for (let i = 0; i < personas.length; i++) {
      const truePresetFilters = Object.fromEntries(
        Object.entries(personas[i].presetFilters).filter(([_, value]) => value)
      )
      const isPersonaSelected = Object.entries(truePresetFilters).every(
        ([key, value]) => trueFilters[key] === value
      )
      if (isPersonaSelected) {
        newSelectedPersona.push(i)
      }
    }

    setSelectedPersona(newSelectedPersona)
  }

  const updateFilterOption = (key) => {
    const updatedFilters = { ...filters }
    updatedFilters[key] = !updatedFilters[key]
    setFilters(updatedFilters)
    updatePersonaUponFilterChange(updatedFilters)
  }

  const updateFilterOptions = (keys, value) => {
    const updatedFilters = { ...filters }
    for (const key of keys) {
      updatedFilters[key] = value
    }
    setFilters(updatedFilters)
    updatePersonaUponFilterChange(updatedFilters)
  }

  const resetFilters = () => {
    setSelectedPersona([])
    setFilters(WALLETS_FILTERS_DEFAULT)
    setSupportedLanguage(DEFAULT_LOCALE)
  }

  return (
    <Flex as={MainArticle} direction="column" position="relative" w="full">
      <PageMetadata
        title={t("page-find-wallet-meta-title")}
        description={t("page-find-wallet-meta-description")}
        image="/images/wallets/wallet-hero.png"
      />

      <BannerNotification shouldShow={true}>
        {t("page-find-wallet-footnote-1")}
      </BannerNotification>

      <Flex
        direction={{ base: "column", sm: "row" }}
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
            <InlineLink href="/wallets">
              {t("page-find-wallet-desc-2-wallets-link")}
            </InlineLink>
          </Subtitle>
        </Box>
        <Center w={{ base: "full", sm: "50%" }}>
          <Image
            src={HeroImage}
            // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
            sizes="(max-width: 480px) 100vw, 500px"
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
          resetWalletFilter={resetWalletFilter}
        />
      </Box>

      {/* Context value is updated when using the language filter */}
      <WalletSupportedLanguageContext.Provider
        value={{ supportedLanguage, setSupportedLanguage }}
      >
        {/* Mobile filters menu */}
        <Box hideFrom="lg">
          <MobileFiltersMenu
            totalWallets={filteredWallets.length}
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
        </Box>

        <Box px={{ md: 4, "2xl": 0 }}>
          <Flex pt={4} pb={6} gap={6}>
            {/* Filters sidebar */}
            {/* Use `Show` instead of `hideBelow` prop to avoid rendering the sidebar on mobile */}
            <Show above="lg">
              <WalletFilterSidebar
                top={calc(NAV_BAR_PX_HEIGHT).subtract("2px").toString()}
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

            {/* Wallets table */}
            <Box mt={0.5} w="full">
              <WalletTable
                filters={filters}
                resetFilters={resetFilters}
                resetWalletFilter={resetWalletFilter}
                filteredWallets={filteredWallets}
                totalWallets={walletCardData.length}
                updateMoreInfo={updateMoreInfo}
                featureDropdownItems={featureDropdownItems}
                onOpen={onOpen}
              />
            </Box>
          </Flex>
        </Box>
      </WalletSupportedLanguageContext.Provider>
    </Flex>
  )
}

export default FindWalletPage
