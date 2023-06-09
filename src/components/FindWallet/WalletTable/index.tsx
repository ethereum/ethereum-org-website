// Libraries
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Select from "react-select"
import { FaDiscord, FaGlobe, FaTwitter } from "react-icons/fa"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  chakra,
  Flex,
  HStack,
  Icon,
  Img,
  keyframes,
  List,
  ListItem,
  SimpleGrid,
  Text,
  SkipNavContent,
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
import {
  COMPARE_FEATURES_SKIP_LINK,
  FILTERED_RESULTS_SKIP_LINK,
} from "../../../pages/wallets/find-wallet"

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
            bg: "primary",
            borderColor: "primary",

            ".react-select__value-container": {
              ".react-select__single-value": {
                color: "background",
              },
            },

            ".react-select__indicators": {
              ".react-select__indicator": {
                color: "background",
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
            bg: "primary",
            color: "buttonColor",
            _hover: {
              bg: "primary",
            },
          },
        },
      },
    }}
    {...props}
  />
)

const FeatureIconCol = ({
  className,
  featSelect,
}: {
  className: string
  featSelect: object
}) => (
  <Box
    className={className}
    animation={`${fadeIn} 0.375s`}
    placeSelf="center"
    sx={{
      "&.fade": {
        animation: `${fadeOut} 0.375s`,
      },
      [`&.${secondCol}, &.${thirdCol}`]: {
        hideBelow: "md",
      },
    }}
  >
    {featSelect ? <GreenCheckProductGlyphIcon /> : <WarningProductGlyphIcon />}
  </Box>
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
    <Box w="full">
      {/* Feature comparison dropdowns */}
      <SkipNavContent id={COMPARE_FEATURES_SKIP_LINK}>
        <SimpleGrid
          bg="background"
          borderBottom="1px"
          borderColor="primary"
          fontSize="0.9rem"
          fontWeight="normal"
          templateColumns={{
            base: "auto",
            sm: "60% auto 0% 0% 5%",
            md: "40% auto auto auto 5%",
          }}
          w="full"
          rowGap={{ base: 4, sm: 0 }}
          columnGap={2}
          alignItems="center"
          p={2}
          position="sticky"
          top={0}
          zIndex="docked"
          sx={{
            "& > *": {
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
        >
          <Box textAlign="center" aria-hidden>
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
          </Box>

          <Box>
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
          </Box>
          <Box>
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
                updateDropdown(
                  selectedOption,
                  setSecondFeatureSelect,
                  secondCol
                )
              }}
              defaultValue={secondFeatureSelect}
              isSearchable={false}
            />
          </Box>
          <Box>
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
          </Box>
        </SimpleGrid>
      </SkipNavContent>
      <SkipNavContent id={FILTERED_RESULTS_SKIP_LINK}>
        {/* Filtered Wallet List */}
        <Accordion
          as={List}
          aria-label={t("page-find-wallet-filtered-results")}
          m={0}
          allowMultiple
        >
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
              <AccordionItem
                key={idx}
                as={ListItem}
                borderTop="none"
                borderBottom="1px"
                borderColor="lightBorder"
                m={0}
                _hover={{ bg: "boxShadow", transition: "0.5s all" }}
                sx={{
                  h2: {
                    m: 0,
                  },
                }}
              >
                <h2>
                  <AccordionButton
                    onClick={() => {
                      updateMoreInfo(wallet.key)
                      trackCustomEvent({
                        eventCategory: "WalletMoreInfo",
                        eventAction: `More info wallet`,
                        eventName: `More info ${wallet.name} ${wallet.moreInfo}`,
                      })
                    }}
                    py={6}
                    px={{ base: 4, lg: 1 }}
                  >
                    <SimpleGrid
                      templateColumns={{
                        base: "60% auto 0% 0% 5%",
                        md: "40% auto auto auto 5%",
                      }}
                      w="full"
                      sx={{
                        ".chakra-text": {
                          m: 0,
                          textAlign: "initial",
                        },
                      }}
                    >
                      <HStack
                        spacing={4}
                        pl="0.3rem"
                        sx={{
                          "& .chakra-text": {
                            _first: {
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            },
                            _notFirst: {
                              mt: "0.1rem",
                              fontSize: "0.9rem",
                              lineHeight: 4,
                            },
                          },
                        }}
                      >
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
                            <Flex
                              as={List}
                              aria-label="available social media sites"
                              gap="0.8rem"
                              m={0}
                            >
                              <ListItem>
                                <SocialLink
                                  to={wallet.url}
                                  hideArrow
                                  customEventOptions={{
                                    eventCategory: "WalletExternalLinkList",
                                    eventAction: `Go to wallet`,
                                    eventName: `${wallet.name} ${idx}`,
                                    eventValue: JSON.stringify(filters),
                                  }}
                                  aria-label={`${wallet.name} website`}
                                >
                                  <Icon as={FaGlobe} fontSize="2xl" />
                                </SocialLink>
                              </ListItem>

                              {wallet.twitter && (
                                <ListItem>
                                  <SocialLink
                                    to={wallet.twitter}
                                    hideArrow
                                    customEventOptions={{
                                      eventCategory: "WalletExternalLinkList",
                                      eventAction: `Go to wallet`,
                                      eventName: `${wallet.name} ${idx}`,
                                      eventValue: JSON.stringify(filters),
                                    }}
                                    aria-label={`${wallet.name} twitter`}
                                  >
                                    <Icon
                                      as={FaTwitter}
                                      color="#1da1f2"
                                      fontSize="2xl"
                                    />
                                  </SocialLink>
                                </ListItem>
                              )}
                              {wallet.discord && (
                                <ListItem>
                                  <SocialLink
                                    to={wallet.discord}
                                    hideArrow
                                    customEventOptions={{
                                      eventCategory: "WalletExternalLinkList",
                                      eventAction: `Go to wallet`,
                                      eventName: `${wallet.name} ${idx}`,
                                      eventValue: JSON.stringify(filters),
                                    }}
                                    aria-label={`${wallet.name} discord`}
                                  >
                                    <Icon
                                      as={FaDiscord}
                                      color="#7289da"
                                      fontSize="2xl"
                                    />
                                  </SocialLink>
                                </ListItem>
                              )}
                            </Flex>
                          </Box>
                        </Box>
                      </HStack>
                      <FeatureIconCol
                        className={firstCol}
                        featSelect={wallet[firstFeatureSelect.filterKey!]}
                      />
                      <FeatureIconCol
                        className={secondCol}
                        featSelect={wallet[secondFeatureSelect.filterKey!]}
                      />
                      <FeatureIconCol
                        className={thirdCol}
                        featSelect={wallet[thirdFeatureSelect.filterKey!]}
                      />
                      <AccordionIcon
                        color="primary"
                        fontSize="2xl"
                        placeSelf="center"
                      />
                    </SimpleGrid>
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0} pr={4}>
                  <WalletMoreInfo
                    wallet={wallet}
                    filters={filters}
                    idx={idx}
                    featureDropdownItems={featureDropdownItems}
                  />
                </AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </SkipNavContent>
    </Box>
  )
}

export default WalletTable
