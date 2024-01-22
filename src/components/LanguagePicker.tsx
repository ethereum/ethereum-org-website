import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import {
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { Button } from "./Buttons"

import i18nConfig from "@/../i18n.config.json"

type LocaleDisplayInfo = {
  localeChoice: string
  source: string
  target: string
}

type LanguagePickerProps = {
  fromPageParameter: string
}
const LanguagePicker = ({ fromPageParameter }: LanguagePickerProps) => {
  const { t } = useTranslation("page-translation")
  const { asPath, locale, locales } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
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

  const filteredDisplayNames = displayNames.filter(({ source }) =>
    source.toLowerCase().includes(filterValue.toLowerCase())
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
        insetInlineStart="-12"
        bg="primary.lowContrast"
        p="4"
        borderRadius="none"
      >
        <Text fontSize="xs" color="body.medium">
          Last language used
        </Text>

        <MenuItem
          key="item-en"
          bg="transparent"
          _hover={{ bg: "background.highlight" }}
          data-group
        >
          <BaseLink
            href={asPath}
            locale="en"
            color="body.base"
            textDecoration="none"
            _groupHover={{ textDecoration: "none" }}
            w="full"
          >
            <Text fontSize="lg" color="body.base">
              {
                displayNames.find(({ localeChoice }) => localeChoice === "en")
                  ?.source
              }
            </Text>
            <Text textTransform="uppercase" fontSize="xs" color="body.medium">
              {
                displayNames.find(({ localeChoice }) => localeChoice === "en")
                  ?.target
              }
            </Text>
          </BaseLink>
        </MenuItem>
        <MenuDivider borderColor="body.medium" my="4" />
        <Text fontSize="xs" color="body.medium">
          Filter languages list (## LANGS)
        </Text>
        <Input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          ref={inputRef}
          placeholder="Language..."
          bg="background.base"
          mt="1"
          mb="2"
        />

        {filteredDisplayNames.map(({ localeChoice, source, target }) => (
          <MenuItem
            key={"item-" + localeChoice}
            bg="transparent"
            _hover={{ bg: "background.highlight" }}
            data-group
          >
            <BaseLink
              href={asPath}
              locale={localeChoice}
              color="body.base"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              w="full"
              sx={{
                p: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <Text fontSize="lg" color="body.base">
                {source}
              </Text>
              <Text textTransform="uppercase" fontSize="xs" color="body.medium">
                {target}
              </Text>
            </BaseLink>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguagePicker

