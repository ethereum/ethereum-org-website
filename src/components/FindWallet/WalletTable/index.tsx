// Libraries
import React, { ReactNode } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Select from "react-select"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import { FaDiscord, FaGlobe, FaTwitter } from "react-icons/fa"
import {
  Box,
  chakra,
  Flex,
  FlexProps,
  forwardRef,
  Icon,
  Img,
  keyframes,
  SimpleGrid,
  SimpleGridProps,
  Table,
  TableProps,
  Td,
  Text,
  Th,
  Tr,
} from "@chakra-ui/react"

// Components
import Link, { IProps as LinkProps } from "../../Link"
import { WalletMoreInfo } from "./WalletMoreInfo"

// Icons
import {
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "../../icons/staking"

// Utils
import { useWalletTable } from "./useWalletTable"
import { trackCustomEvent } from "../../../utils/matomo"
import { getImage } from "../../../utils/image"
import { WalletData } from "../../../data/wallets/wallet-data"
import { ChildOnlyProp } from "../../../types"

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
    _hover={{ bg: "boxShadow", transition: "0.5s all" }}
    {...props}
  />
)

const Grid = forwardRef<SimpleGridProps, "tr">((props, ref) => (
  <SimpleGrid
    as={Tr}
    ref={ref}
    templateColumns={{ base: "60% auto 0% 0% 5%", md: "40% auto auto auto 5%" }}
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
    top={0}
    zIndex="docked"
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
    {...props}
  />
))

const ChakraSelect = chakra((props: { className?: string }) => (
  <Select {...props} />
))
const StyledSelect = (props) => (
  <ChakraSelect
    w="full"
    sx={{
      ".react-select": {
        "&__control": {
          bg: "searchBackground",
          border: "1px",
          borderColor: "text",
          cursor: "pointer",
          pe: "0.3rem",
          transition: "0.5s all",

          ".react-select__value-container": {
            ".react-select__single-value": {
              color: "text",
            },
          },

          ".react-select__indicators": {
            ".react-select__indicator-separator": {
              bg: "none",
            },
            ".react-select__indicator": {
              color: "text",
              p: 0,
            },
          },

          "&:hover, &--is-focused": {
            bg: "primary.base",
            borderColor: "primary.base",

            ".react-select__value-container": {
              ".react-select__single-value": {
                color: "background.base",
              },
            },

            ".react-select__indicators": {
              ".react-select__indicator": {
                color: "background.base",
              },
            },
          },
        },

        "&__placeholder": {
          color: "text200",
        },

        "&__single-value, &__menu, &__input": {
          color: "text",
        },

        "&__menu": {
          bg: "searchBackground",
        },

        "&__option": {
          "&:hover, &--is-focused": {
            bg: "selectHover",
          },
          _active: {
            bg: "selectActive",
            color: "buttonColor !important",
          },

          "&--is-selected": {
            bg: "primary.base",
            color: "buttonColor",
            _hover: {
              bg: "primary.base",
            },
          },
        },
      },
    }}
    {...props}
  />
)

const FlexInfo = (props: FlexProps) => (
  <Flex
    alignItems="center"
    gap={4}
    pl="0.3rem"
    sx={{
      p: {
        p: 0,
        fontSize: "1.2rem",
        fontWeight: "bold",
        "& + p": {
          mt: "0.1rem",
          fontSize: "0.9rem",
          lineHeight: 4,
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

const SocialLink = (props: LinkProps) => (
  <Link
    display="flex"
    height={8}
    alignItems="center"
    verticalAlign="middle"
    transform="scale(1)"
    transition="transform 0.1s"
    _hover={{
      transform: "scale(1.15)",
    }}
    {...props}
  />
)

// Types
export interface DropdownOption {
  label: string
  value: string
  filterKey: string
  category: string
  icon: ReactNode
}

// Constants
const firstCol = "firstCol"
const secondCol = "secondCol"
const thirdCol = "thirdCol"

export interface WalletTableProps {
  data: Record<string, any>
  filters: Record<string, boolean>
  walletData: WalletData[]
}

const WalletTable = ({ data, filters, walletData }: WalletTableProps) => {
  const { t } = useTranslation()
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

  return (
    <Container>
      <WalletContentHeader>
        <Th>
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
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setFirstFeatureSelect, firstCol)
            }}
            defaultValue={firstFeatureSelect}
            isSearchable={false}
          />
        </Th>
        <Th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setSecondFeatureSelect, secondCol)
            }}
            defaultValue={secondFeatureSelect}
            isSearchable={false}
          />
        </Th>
        <Th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setThirdFeatureSelect, thirdCol)
            }}
            defaultValue={thirdFeatureSelect}
            isSearchable={false}
          />
        </Th>
      </WalletContentHeader>
      {filteredWallets.map((wallet, idx) => {
        const deviceLabels: Array<string> = []

        wallet.ios && deviceLabels.push(t("page-find-wallet-iOS"))
        wallet.android && deviceLabels.push(t("page-find-wallet-android"))
        wallet.linux && deviceLabels.push(t("page-find-wallet-linux"))
        wallet.windows && deviceLabels.push(t("page-find-wallet-windows"))
        wallet.macOS && deviceLabels.push(t("page-find-wallet-macOS"))
        wallet.chromium && deviceLabels.push(t("page-find-wallet-chromium"))
        wallet.firefox && deviceLabels.push(t("page-find-wallet-firefox"))
        wallet.hardware && deviceLabels.push(t("page-find-wallet-hardware"))

        return (
          <WalletContainer key={wallet.key}>
            <Wallet
              onClick={() => {
                updateMoreInfo(wallet.key)
                trackCustomEvent({
                  eventCategory: "WalletMoreInfo",
                  eventAction: `More info wallet`,
                  eventName: `More info ${wallet.name} ${wallet.moreInfo}`,
                })
              }}
            >
              <Td lineHeight="revert">
                <FlexInfo>
                  <Box>
                    <Img
                      as={GatsbyImage}
                      image={getImage(data[wallet.image_name])!}
                      alt=""
                      objectFit="contain"
                      boxSize="56px"
                    />
                  </Box>
                  <Box>
                    <Text>{wallet.name}</Text>
                    <Text
                      hideBelow="sm"
                      color="text200"
                      fontSize="0.7rem"
                      lineHeight="0.85rem"
                    >
                      {deviceLabels.join(" | ")}
                    </Text>
                    {deviceLabels.map((label) => (
                      <Text
                        key={label}
                        hideFrom="md"
                        fontSize="0.7rem"
                        lineHeight="0.85rem"
                        color="text200"
                      >
                        {label}
                      </Text>
                    ))}
                    <Box mt={4}>
                      <Flex gap="0.8rem">
                        <SocialLink
                          to={wallet.url}
                          hideArrow
                          customEventOptions={{
                            eventCategory: "WalletExternalLinkList",
                            eventAction: `Go to wallet`,
                            eventName: `${wallet.name} ${idx}`,
                            eventValue: JSON.stringify(filters),
                          }}
                        >
                          <Icon as={FaGlobe} fontSize="2xl" />
                        </SocialLink>
                        {wallet.twitter && (
                          <SocialLink
                            to={wallet.twitter}
                            hideArrow
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: JSON.stringify(filters),
                            }}
                          >
                            <Icon
                              as={FaTwitter}
                              color="#1da1f2"
                              fontSize="2xl"
                            />
                          </SocialLink>
                        )}
                        {wallet.discord && (
                          <SocialLink
                            to={wallet.discord}
                            hideArrow
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: JSON.stringify(filters),
                            }}
                          >
                            <Icon
                              as={FaDiscord}
                              color="#7289da"
                              fontSize="2xl"
                            />
                          </SocialLink>
                        )}
                      </Flex>
                    </Box>
                  </Box>
                </FlexInfo>
              </Td>
              <Td>
                <FlexInfoCenter className={firstCol}>
                  {wallet[firstFeatureSelect.filterKey!] ? (
                    <GreenCheckProductGlyphIcon />
                  ) : (
                    <WarningProductGlyphIcon />
                  )}
                </FlexInfoCenter>
              </Td>
              <Td>
                <FlexInfoCenter className={secondCol}>
                  {wallet[secondFeatureSelect.filterKey!] ? (
                    <GreenCheckProductGlyphIcon />
                  ) : (
                    <WarningProductGlyphIcon />
                  )}
                </FlexInfoCenter>
              </Td>
              <Td>
                <FlexInfoCenter className={thirdCol}>
                  {wallet[thirdFeatureSelect.filterKey!] ? (
                    <GreenCheckProductGlyphIcon />
                  ) : (
                    <WarningProductGlyphIcon />
                  )}
                </FlexInfoCenter>
              </Td>
              <Td>
                <FlexInfoCenter>
                  <Box>
                    <Icon
                      as={wallet.moreInfo ? MdExpandLess : MdExpandMore}
                      color="primary.base"
                      fontSize="2xl"
                    />
                  </Box>
                </FlexInfoCenter>
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
