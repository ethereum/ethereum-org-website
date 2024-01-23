import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import {
  forwardRef,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemProps,
  MenuList,
  Text,
} from "@chakra-ui/react"

import { BaseLink, LinkProps } from "@/components/Link"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { Button } from "./Buttons"

import i18nConfig from "@/../i18n.config.json"

type LocaleDisplayInfo = {
  localeChoice: string
  source: string
  target: string
}

type ItemProps = MenuItemProps & Pick<LinkProps, "href" | "locale">

const Item = forwardRef((props: ItemProps, ref) => (
  <MenuItem
    as={BaseLink}
    ref={ref}
    flexDir="column"
    w="full"
    alignItems="start"
    borderRadius="base"
    bg="transparent"
    color="body.base"
    textDecoration="none"
    data-group
    _hover={{ bg: "background.base", textDecoration: "none" }}
    _focus={{ bg: "background.base" }}
    sx={{
      p: {
        textDecoration: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    }}
    {...props}
  />
))

const LanguagePicker = () => {
  const { t } = useTranslation("page-translation")
  const router = useRouter()
  const { asPath, locale, locales } = router
  const inputRef = useRef<HTMLInputElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)
  const [filterValue, setFilterValue] = useState("")

  const displayNames: LocaleDisplayInfo[] =
    locales
      ?.map((localeChoice): LocaleDisplayInfo => {
        const sourceFallback = new Intl.DisplayNames([locale!], {
          type: "language",
        }).of(localeChoice)
        const targetFallback = new Intl.DisplayNames([localeChoice], {
          type: "language",
        }).of(localeChoice)

        const i18nKey = "language-" + locale!.toLowerCase()
        const source = t(i18nKey) === i18nKey ? sourceFallback : t(i18nKey)
        const target =
          i18nConfig.find(({ code }) => code === localeChoice)?.name ||
          targetFallback
        if (!source || !target)
          throw new Error("Missing language name, locale: " + localeChoice)
        return { localeChoice, source, target }
      })
      .sort((a, b) =>
        b.localeChoice === DEFAULT_LOCALE ? 1 : a.source.localeCompare(b.source)
      ) || []

  const filteredNames = displayNames.filter(
    ({ localeChoice, source, target }) =>
      (localeChoice + source + target)
        .toLowerCase()
        .includes(filterValue.toLowerCase())
  )

  return (
    <Menu isLazy initialFocusRef={inputRef}>
      <MenuButton
        as={Button}
        variant="ghost"
        color="body.base"
        transition="color 0.2s"
        _hover={{
          color: "primary.hover",
          bg: "primary.lowContrast",
          "& svg": {
            transform: "rotate(10deg)",
            transition: "transform 0.5s",
          },
        }}
        sx={{
          "& svg": {
            transform: "rotate(0deg)",
            transition: "transform 0.5s",
          },
        }}
      >
        <Icon as={BsTranslate} fontSize="2xl" verticalAlign="middle" me={2} />
        {t("common:languages")} {locale!.toUpperCase()}
      </MenuButton>
      <MenuList
        overflow="auto"
        maxH="calc(100svh - 5rem)"
        position="absolute"
        w="xs"
        insetInlineStart={{ base: "-40", xl: "-36" }}
        bg="primary.lowContrast"
        p="4"
        borderRadius="none"
      >
        <Text fontSize="xs" color="body.medium">
          Last language used
        </Text>
        <Item key="item-en" href={asPath} locale="en">
          <Text fontSize="lg" color="body.base">
            {
              displayNames.find(
                ({ localeChoice }) => localeChoice === DEFAULT_LOCALE
              )?.source
            }
          </Text>
          <Text textTransform="uppercase" fontSize="xs" color="body.medium">
            {
              displayNames.find(
                ({ localeChoice }) => localeChoice === DEFAULT_LOCALE
              )?.target
            }
          </Text>
        </Item>
        <MenuDivider borderColor="body.medium" my="4" />
        <Text fontSize="xs" color="body.medium">
          Filter languages list (## LANGS)
        </Text>
        <MenuItem
          onFocus={() => inputRef.current?.focus()}
          p="0"
          bg="transparent"
        >
          <Input
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            ref={inputRef}
            h="8"
            placeholder="Type to filter"
            bg="background.base"
            mt="1"
            mb="2"
            onKeyDown={(e) => {
              // If Enter, navigate to first result
              if (e.key === "Enter") {
                e.preventDefault()
                firstItemRef.current?.click()
              }
              // If ArrowDown, move focus to first result
              if (e.key === "ArrowDown") {
                e.preventDefault()
                firstItemRef.current?.focus()
              }
            }}
          />
        </MenuItem>
        {filteredNames.map(({ localeChoice, source, target }, index) => (
          <Item
            key={"item-" + localeChoice}
            href={asPath}
            locale={localeChoice}
            ref={index === 0 ? firstItemRef : null}
          >
            <Text fontSize="lg" color="body.base">
              {source}
            </Text>
            <Text textTransform="uppercase" fontSize="xs" color="body.medium">
              {target}
            </Text>
          </Item>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguagePicker

