import { ReactNode } from "react"
import { useTranslation } from "next-i18next"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import {
  Box,
  calc,
  Flex,
  FlexProps,
  forwardRef,
  Icon,
  keyframes,
  SimpleGrid,
  SimpleGridProps,
  Stack,
  Table,
  TableProps,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import {
  ColumnClassName,
  DropdownOption,
  SetFeatureSelectState,
  useWalletTable,
} from "@/components/FindWallet/WalletTable/useWalletTable"
import { WalletMoreInfo } from "@/components/FindWallet/WalletTable/WalletMoreInfo"
import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { Image } from "@/components/Image"
import Text from "@/components/OldText"
import ReactSelect, { ReactSelectOnChange } from "@/components/ReactSelect"
import Tag from "@/components/Tag"

import { trackCustomEvent } from "@/lib/utils/matomo"
import {
  formatSupportedLanguages,
  getSupportedLanguages,
  getWalletPersonas,
} from "@/lib/utils/wallets"

import { WalletData } from "@/data/wallets/wallet-data"

import { NAV_BAR_PX_HEIGHT } from "@/lib/constants"

import { WalletEmptyState } from "./WalletEmptyState"

import { useLanguagesList } from "@/hooks/useLanguagesList"

const Container = (props: TableProps) => (
  <Table
    w="full"
    sx={{
      th: {
        fontWeight: "normal",
        p: {
          fontSize: "0.9rem",
        },
      },
    }}
    {...props}
  />
)

const WalletContainer = (props: ChildOnlyProp) => (
  <Container
    borderBottom="1px"
    borderColor="lightBorder"
    _hover={{ bg: "chakra-subtle-bg", transition: "0.5s all" }}
    {...props}
  />
)

const Grid = forwardRef<SimpleGridProps, "tr">((props, ref) => (
  <SimpleGrid
    as={Tr}
    ref={ref}
    templateColumns={{
      base: "60% auto 0% 0% 5%",
      md: "100% auto auto auto auto",
    }}
    w="full"
    columnGap={2}
    alignItems="center"
    {...props}
  />
))

const WalletContentHeader = (props: ChildOnlyProp) => (
  <Grid
    bg="background.base"
    borderBottom="1px"
    borderColor="primary.base"
    templateColumns={{
      base: "auto",
      sm: "60% auto 0% 0% 5%",
      md: "40% auto auto auto 5%",
    }}
    rowGap={{ base: 4, sm: 0 }}
    p={2}
    position="sticky"
    top={{
      base: calc(NAV_BAR_PX_HEIGHT).add("4rem").toString(),
      lg: NAV_BAR_PX_HEIGHT,
    }}
    zIndex={1}
    sx={{
      th: {
        p: 0,
        borderBottom: "none",
        color: "currentColor",
        fontSize: "0.9rem",
        lineHeight: "revert",
        letterSpacing: "revert",
        textAlign: "revert",
        textTransform: "revert",
        "&:nth-of-type(2)": {
          display: { base: "flex", sm: "revert" },
          alignItems: "center",
          gap: 4,
        },
        "&:nth-of-type(3), &:nth-of-type(4)": {
          hideBelow: "md",
        },
      },
    }}
    {...props}
  />
)

const Wallet = forwardRef<ChildOnlyProp, "tr">((props, ref) => (
  <Grid
    ref={ref}
    cursor="pointer"
    py="25px"
    px={{ base: 4, lg: 1 }}
    sx={{
      p: {
        m: 0,
      },
      td: {
        padding: 0,
        borderBottom: "none",
        height: "full",
      },
      "td:nth-of-type(3), td:nth-of-type(4)": {
        hideBelow: "md",
      },
    }}
    templateColumns="auto"
    {...props}
  />
))

const FlexInfo = (props: FlexProps) => (
  <Flex
    gap={4}
    ps="0.3rem"
    sx={{
      p: {
        p: 0,
        fontSize: "1.2rem",
        fontWeight: "bold",
        "& + p": {
          mt: "0.1rem",
          fontSize: "0.9rem",
          lineHeight: 5,
          fontWeight: "normal",
        },
      },
    }}
    {...props}
  />
)

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const FlexInfoCenter = (props: { children: ReactNode; className?: string }) => (
  <FlexInfo
    animation={`${fadeIn} 0.375s`}
    cursor="pointer"
    justifyContent="center"
    height="full"
    sx={{
      "&.fade": {
        animation: `${fadeOut} 0.375s`,
      },
    }}
    {...props}
  />
)

export interface WalletTableProps {
  filters: Record<string, boolean>
  resetFilters: () => void
  resetWalletFilter: React.MutableRefObject<() => void>
  walletData: WalletData[]
}

const WalletTable = ({
  filters,
  resetFilters,
  resetWalletFilter,
  walletData,
}: WalletTableProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const {
    featureDropdownItems,
    filteredFeatureDropdownItems,
    filteredWallets,
    setFirstFeatureSelect,
    setSecondFeatureSelect,
    setThirdFeatureSelect,
    updateDropdown,
    updateMoreInfo,
    firstFeatureSelect,
    secondFeatureSelect,
    thirdFeatureSelect,
    walletCardData,
  } = useWalletTable({ filters, t, walletData })
  const languagesList = useLanguagesList()

  const handleFeatureSelectChange =
    (
      colName: ColumnClassName,
      featureDispatch: SetFeatureSelectState
    ): ReactSelectOnChange<DropdownOption> =>
    (selectedOption) => {
      if (!selectedOption) return
      updateDropdown(selectedOption, featureDispatch, colName)
      return
    }

  return (
    <Container>
      <WalletContentHeader>
        <Th sx={{ textAlign: "start !important" }}>
          {filteredWallets.length === walletCardData.length ? (
            <Text as="span">
              {t("page-find-wallet-showing-all-wallets")} (
              <strong>{walletCardData.length}</strong>)
            </Text>
          ) : (
            <Text as="span">
              {t("page-find-wallet-showing")}{" "}
              <strong>
                {filteredWallets.length} / {walletCardData.length}
              </strong>{" "}
              {t("page-find-wallet-wallets")}
            </Text>
          )}
        </Th>
        <Th>
          <Text as="span" hideFrom="sm" fontSize="md" whiteSpace="nowrap">
            {t("page-find-wallet-choose-features")}
          </Text>
          <ReactSelect
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={handleFeatureSelectChange(
              "firstCol",
              setFirstFeatureSelect
            )}
            defaultValue={firstFeatureSelect}
          />
        </Th>
        <Th>
          <ReactSelect
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={handleFeatureSelectChange(
              "secondCol",
              setSecondFeatureSelect
            )}
            defaultValue={secondFeatureSelect}
          />
        </Th>
        <Th>
          <ReactSelect
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={handleFeatureSelectChange(
              "thirdCol",
              setThirdFeatureSelect
            )}
            defaultValue={thirdFeatureSelect}
          />
        </Th>
      </WalletContentHeader>
      {filteredWallets.length === 0 && (
        <WalletEmptyState
          resetFilters={resetFilters}
          resetWalletFilter={resetWalletFilter}
        />
      )}

      {filteredWallets.length > 0 &&
        filteredWallets.map((wallet, idx) => {
          const deviceLabels: Array<string> = []

          wallet.ios && deviceLabels.push(t("page-find-wallet-iOS"))
          wallet.android && deviceLabels.push(t("page-find-wallet-android"))
          wallet.linux && deviceLabels.push(t("page-find-wallet-linux"))
          wallet.windows && deviceLabels.push(t("page-find-wallet-windows"))
          wallet.macOS && deviceLabels.push(t("page-find-wallet-macOS"))
          wallet.chromium && deviceLabels.push(t("page-find-wallet-chromium"))
          wallet.firefox && deviceLabels.push(t("page-find-wallet-firefox"))
          wallet.hardware && deviceLabels.push(t("page-find-wallet-hardware"))

          const walletPersonas = getWalletPersonas(wallet)
          const supportedLanguages = getSupportedLanguages(
            wallet.languages_supported,
            languagesList
          )

          return (
            <WalletContainer key={wallet.key}>
              <Wallet
                onClick={() => {
                  updateMoreInfo(wallet.key)
                  // Log "more info" event only on expanding
                  wallet.moreInfo &&
                    trackCustomEvent({
                      eventCategory: "WalletMoreInfo",
                      eventAction: `More info wallet`,
                      eventName: `More info ${wallet.name}`,
                    })
                }}
              >
                <Td lineHeight="revert">
                  <Flex justifyContent="space-between" alignItems="center">
                    <FlexInfo w={{ base: "100%", md: "auto" }}>
                      {/* Wallet image */}
                      <Box w="56px">
                        <Image
                          src={wallet.image}
                          alt=""
                          objectFit="contain"
                          boxSize="56px"
                        />
                      </Box>

                      <Box w={{ base: "100%", md: "auto" }}>
                        <Stack gap={5}>
                          <Text>{wallet.name}</Text>

                          {/* Wallet Personas supported */}
                          <Flex gap={1.5}>
                            {walletPersonas.map((persona) => (
                              <Tag
                                key={persona}
                                label={t(persona).toUpperCase()}
                              />
                            ))}
                          </Flex>

                          {/* Device labels */}
                          <Flex
                            alignItems="center"
                            gap={3}
                            display={deviceLabels.length > 0 ? "flex" : "none"}
                          >
                            <Icon as={DevicesIcon} fontSize="2xl" />

                            <Text
                              fontSize="1rem !important"
                              fontWeight="normal !important"
                            >
                              {deviceLabels.join(" · ")}
                            </Text>
                          </Flex>

                          {/* Supported languages */}
                          <Flex alignItems="center" gap={3}>
                            <Icon as={LanguagesIcon} fontSize="2xl" />

                            <Text
                              fontSize="1rem !important"
                              fontWeight="normal !important"
                            >
                              {formatSupportedLanguages(supportedLanguages)}
                            </Text>
                          </Flex>

                          {/* Wallet Website (desktop) */}
                          <Box display={{ base: "none", md: "block" }} w="auto">
                            <ButtonLink
                              to={wallet.url}
                              variant="outline"
                              w="auto"
                              isExternal
                            >
                              {t("page-find-wallet-visit-website")}
                            </ButtonLink>
                          </Box>
                        </Stack>
                      </Box>
                    </FlexInfo>

                    <FlexInfoCenter>
                      <Box>
                        <Icon
                          as={wallet.moreInfo ? MdExpandLess : MdExpandMore}
                          color="primary.base"
                          fontSize={{ base: "5xl", md: "4xl" }}
                        />
                      </Box>
                    </FlexInfoCenter>
                  </Flex>
                  {/* Wallet Website (mobile) */}
                  <Box
                    display={{ base: "block", md: "none" }}
                    mt={6}
                    w="100%"
                    ps={1}
                    pe={3}
                  >
                    <ButtonLink
                      to={wallet.url}
                      variant="outline"
                      w="100%"
                      isExternal
                    >
                      {t("page-find-wallet-visit-website")}
                    </ButtonLink>
                  </Box>
                </Td>
              </Wallet>

              {wallet.moreInfo && (
                <WalletMoreInfo
                  wallet={wallet}
                  filters={filters}
                  idx={idx}
                  featureDropdownItems={featureDropdownItems}
                />
              )}
            </WalletContainer>
          )
        })}
    </Container>
  )
}

export default WalletTable
