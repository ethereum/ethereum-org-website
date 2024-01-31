import { useTranslation } from "next-i18next"
import {
  Box,
  Flex,
  Input,
  Menu,
  MenuDivider,
  MenuItem as ChakraMenuItem,
  MenuList,
  type MenuListProps,
  type MenuProps,
  Text,
} from "@chakra-ui/react"

import { Button } from "@/components/Buttons"
import { BaseLink } from "@/components/Link"

import MenuItem from "./MenuItem"
import NoResultsCallout from "./NoResultsCallout"
import { useLanguagePicker } from "./useLanguagePicker"

type LanguagePickerProps = Omit<MenuListProps, "children"> & {
  children: React.ReactNode
  placement: MenuProps["placement"]
  handleClose?: () => void
}

const LanguagePicker = ({
  children,
  placement,
  handleClose,
  ...props
}: LanguagePickerProps) => {
  const { t } = useTranslation("page-languages")
  const {
    inputRef,
    firstItemRef,
    filterValue,
    setFilterValue,
    browserLocalesInfo,
    filteredNames,
  } = useLanguagePicker()

  return (
    <Menu
      isLazy
      initialFocusRef={inputRef}
      placement={placement}
      closeOnSelect={false}
    >
      {({ onClose }) => {
        const onMenuClose = () => {
          setFilterValue("")
          handleClose ? handleClose() : onClose()
        }
        return (
          <>
            {children}
            <MenuList
              position="relative"
              overflow="auto"
              borderRadius="base"
              py="0"
              {...props}
            >
              {/* Mobile Close bar */}
              <Flex
                justifyContent="end"
                hideFrom="lg" // TODO: Confirm breakpoint after nav-menu PR merged
                position="sticky"
                zIndex="sticky"
                top="0"
                bg="background.base"
              >
                <Button
                  p="4"
                  variant="ghost"
                  alignSelf="end"
                  onClick={onMenuClose}
                  textTransform="uppercase"
                  fontSize="xs"
                >
                  {t("close")}
                </Button>
              </Flex>

              {/* Main Language selection menu */}
              <Box
                position="relative"
                w="100%"
                minH="calc(100% - 53px)" // Fill height with space for close button on mobile
                p="4"
                bg="background.highlight"
                sx={{ "[role=menuitem]": { py: "3", px: "2" } }}
              >
                {browserLocalesInfo.length > 0 && (
                  <>
                    <Text fontSize="xs" color="body.medium">
                      {t("page-languages-browser-language")}
                    </Text>
                    {browserLocalesInfo.map((displayInfo) => (
                      <MenuItem
                        key={`item-${displayInfo.localeOption}`}
                        displayInfo={displayInfo}
                        onClick={onMenuClose}
                        isFeatured
                      />
                    ))}
                    <MenuDivider borderColor="body.medium" my="4" mx="-2" />
                  </>
                )}

                <Text fontSize="xs" color="body.medium">
                  {t("page-languages-filter-label")}{" "}
                  <Text as="span" textTransform="lowercase">
                    ({filteredNames.length} {t("common:languages")})
                  </Text>
                </Text>
                <ChakraMenuItem
                  onFocus={() => inputRef.current?.focus()}
                  p="0"
                  bg="transparent"
                  position="relative"
                  closeOnSelect={false}
                >
                  <Input
                    placeholder={t("page-languages-filter-placeholder")}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    ref={inputRef}
                    h="8"
                    mt="1"
                    mb="2"
                    bg="background.base"
                    color="body.base"
                    onKeyDown={(e) => {
                      // Navigate to first result on enter
                      if (e.key === "Enter") {
                        e.preventDefault()
                        firstItemRef.current?.click()
                      }
                    }}
                  />
                </ChakraMenuItem>

                {filteredNames.map((displayInfo, index) => {
                  const firstResult = index === 0
                  return (
                    <MenuItem
                      key={"item-" + displayInfo.localeOption}
                      displayInfo={displayInfo}
                      ref={firstResult ? firstItemRef : null}
                      onClick={onMenuClose}
                    />
                  )
                })}

                {filteredNames.length === 0 && (
                  <NoResultsCallout onClose={onMenuClose} />
                )}
              </Box>

              {/* Footer callout */}
              <Flex
                borderTop="2px"
                borderColor="primary.base"
                bg="primary.lowContrast"
                p="3"
                position="sticky"
                bottom="0"
                justifyContent="center"
              >
                <Text fontSize="xs" textAlign="center" color="body.base">
                  Help us translate ethereum.org.{" "}
                  <BaseLink
                    href="/contributing/translation-program"
                    onClick={onMenuClose}
                  >
                    Learn more
                  </BaseLink>
                </Text>
              </Flex>
            </MenuList>
          </>
        )
      }}
    </Menu>
  )
}

export default LanguagePicker
