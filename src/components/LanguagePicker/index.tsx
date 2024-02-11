import { useEffect } from "react"
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  type PopoverContentProps,
  PopoverFooter,
  type PopoverProps,
  PopoverTrigger,
  Text,
  type UseDisclosureReturn,
} from "@chakra-ui/react"

import { Button } from "@/components/Buttons"
import { BaseLink } from "@/components/Link"

import MenuItem from "./MenuItem"
import NoResultsCallout from "./NoResultsCallout"
import { useLanguagePicker } from "./useLanguagePicker"

type LanguagePickerProps = Omit<PopoverContentProps, "children"> & {
  children: React.ReactNode
  placement?: PopoverProps["placement"]
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
  const { t, refs, disclosure, filterValue, setFilterValue, filteredNames } =
    useLanguagePicker(handleClose, menuState)
  const { inputRef, firstItemRef, noResultsRef, footerRef } = refs
  const { isOpen, onOpen, onClose } = disclosure

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isOpen && e.key === "ArrowDown") {
        e.preventDefault()
        // setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen])

  return (
    <Popover
      isLazy
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement={placement}
      initialFocusRef={inputRef}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        borderRadius="base"
        py="0"
        bg="background.highlight"
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
            onClick={() => onClose()}
          >
            {t("common:close")}
          </Button>
        </Flex>

        <Box p="4">
          <Box fontSize="xs" color="body.medium">
            {t("page-languages-filter-label")}{" "}
            <Text as="span" textTransform="lowercase">
              ({filteredNames.length} {t("common:languages")})
            </Text>
          </Box>
          <InputGroup>
            <Input
              ref={inputRef}
              type="search"
              autoComplete="off"
              placeholder={t("page-languages-filter-placeholder")}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              // onBlur={(e) => {
              //   if (e.relatedTarget?.tagName.toLowerCase() === "div") {
              //     e.currentTarget.focus()
              //   }
              // }}
              h="8"
              mt="1"
              mb="2"
              color="body.base"
              // onKeyDown={(e) => {
              //   // Navigate to first result on enter
              //   if (e.key === "Enter") {
              //     e.preventDefault()
              //     firstItemRef.current?.click()
              //   }
              //   // If Tab/ArrowDown, focus on first item if available, NoResults link otherwise
              //   if (e.key === "Tab" || e.key === "ArrowDown") {
              //     e.preventDefault()
              //     ;(filteredNames.length === 0
              //       ? noResultsRef
              //       : firstItemRef
              //     ).current?.focus()
              //     e.stopPropagation()
              //   }
              // }}
            />
            <InputRightElement
              hideBelow="lg" // TODO: Confirm breakpoint after nav-menu PR merged
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
        </Box>

        {/* Main Language selection menu */}
        <PopoverBody
          w="full"
          p="4"
          overflow="auto"
          sx={{ "[role=menuitem]": { py: "3", px: "2" } }}
        >
          <List m="0">
            {filteredNames.map((displayInfo, index) => (
              <ListItem key={"item-" + displayInfo.localeOption}>
                <MenuItem
                  displayInfo={displayInfo}
                  ref={index === 0 ? firstItemRef : null}
                  // onKeyDown={(e) => {
                  //   if (e.key !== "\\") return
                  //   e.preventDefault()
                  //   inputRef.current?.focus()
                  // }}
                  // onClick={() =>
                  //   onClose({
                  //     eventAction: "Locale chosen",
                  //     eventName: displayInfo.localeOption,
                  //   })
                  // }
                />
              </ListItem>
            ))}
          </List>

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
        </PopoverBody>

        {/* Footer callout */}
        <PopoverFooter
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
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default LanguagePicker
