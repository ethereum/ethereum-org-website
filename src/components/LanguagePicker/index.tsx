import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Menu,
  MenuList,
  type MenuListProps,
  type MenuProps,
  Text,
  type UseDisclosureReturn,
  useEventListener,
} from "@chakra-ui/react"

import { Button } from "@/components/Buttons"
import { BaseLink } from "@/components/Link"

import MenuItem from "./MenuItem"
import NoResultsCallout from "./NoResultsCallout"
import { useLanguagePicker } from "./useLanguagePicker"

type LanguagePickerProps = Omit<MenuListProps, "children"> & {
  children: React.ReactNode
  placement?: MenuProps["placement"]
  handleClose?: () => void
  menuState?: UseDisclosureReturn
}

const LanguagePicker = ({
  children,
  placement,
  handleClose,
  menuState,
  ...props
}: LanguagePickerProps) => {
  const {
    t,
    refs,
    disclosure,
    filterValue,
    setFilterValue,
    filteredNames,
    handleInputFocus,
  } = useLanguagePicker(handleClose, menuState)
  const { inputRef, firstItemRef, noResultsRef, footerRef } = refs
  const { onClose } = disclosure

  /**
   * Adds a keydown event listener to focus filter input (\).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\") return
    e.preventDefault()
    inputRef.current?.focus()
  })

  return (
    <Menu isLazy placement={placement} autoSelect={false} {...disclosure}>
      {children}
      <MenuList
        position="relative"
        overflow="auto"
        borderRadius="base"
        py="0"
        onKeyDown={(e) => {
          if (e.key === "Tab" || e.key === "\\") {
            e.preventDefault()
            ;(e.shiftKey ? inputRef : footerRef).current?.focus()
          }
        }}
        {...props}
      >
        {/* Mobile Close bar */}
        <Flex
          justifyContent="end"
          hideFrom="md"
          position="sticky"
          zIndex="sticky"
          top="0"
          bg="background.base"
        >
          <Button
            p="4"
            variant="ghost"
            alignSelf="end"
            onClick={() => onClose()}
          >
            {t("common:close")}
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
          <FormControl>
            <FormLabel fontSize="xs" color="body.medium">
              {t("page-languages-filter-label")}{" "}
              <Text as="span" textTransform="lowercase">
                ({filteredNames.length} {t("common:languages")})
              </Text>
            </FormLabel>
            <InputGroup>
              <Input
                type="search"
                autoComplete="off"
                placeholder={t("page-languages-filter-placeholder")}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onBlur={(e) => {
                  if (e.relatedTarget?.tagName.toLowerCase() === "div") {
                    e.currentTarget.focus()
                  }
                }}
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
                  // If Tab/ArrowDown, focus on first item if available, NoResults link otherwise
                  if (e.key === "Tab" || e.key === "ArrowDown") {
                    e.preventDefault()
                    ;(filteredNames.length === 0
                      ? noResultsRef
                      : firstItemRef
                    ).current?.focus()
                    e.stopPropagation()
                  }
                }}
                onFocus={handleInputFocus}
              />
              <InputRightElement
                hideBelow="md"
                cursor="text"
              >
                <Kbd
                  fontSize="sm"
                  lineHeight="none"
                  me="2"
                  p="1"
                  py="0.5"
                  ms="auto"
                  border="1px"
                  borderColor="disabled"
                  color="disabled"
                  rounded="base"
                >
                  \
                </Kbd>
              </InputRightElement>
            </InputGroup>

            {filteredNames.map((displayInfo, index) => (
              <MenuItem
                key={"item-" + displayInfo.localeOption}
                displayInfo={displayInfo}
                ref={index === 0 ? firstItemRef : null}
                onKeyDown={(e) => {
                  if (e.key !== "\\") return
                  e.preventDefault()
                  inputRef.current?.focus()
                }}
                onClick={() =>
                  onClose({
                    eventAction: "Locale chosen",
                    eventName: displayInfo.localeOption,
                  })
                }
              />
            ))}

            {filteredNames.length === 0 && (
              <NoResultsCallout
                ref={noResultsRef}
                onClose={() =>
                  onClose({
                    eventAction: "Translation program link (no results)",
                    eventName: "/contributing/translation-program",
                  })
                }
              />
            )}
          </FormControl>
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
            {t("page-languages-recruit-community")}{" "}
            <BaseLink
              ref={footerRef}
              href="/contributing/translation-program"
              onClick={() =>
                onClose({
                  eventAction: "Translation program link (menu footer)",
                  eventName: "/contributing/translation-program",
                })
              }
            >
              {t("common:learn-more")}
            </BaseLink>
          </Text>
        </Flex>
      </MenuList>
    </Menu>
  )
}

export default LanguagePicker
