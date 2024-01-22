import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdLanguage } from "react-icons/md"
import {
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

import { DEFAULT_LOCALE } from "@/lib/constants"

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

  return (
    <Menu isLazy>
      <MenuButton
        transition="color 0.2s"
        px={1.5}
        _hover={{
          color: "primary.hover",
          "& svg": {
            transform: "rotate(10deg)",
            transition: "transform 0.5s",
          },
        }}
      >
        <Icon as={MdLanguage} fontSize="2xl" verticalAlign="middle" me={2} />
        {t("common:languages")} {locale!.toUpperCase()}
      </MenuButton>
      <MenuList overflow="auto" maxH="30rem">
        <MenuItem key="all-locales-option">
          <BaseLink href={`/languages/${fromPageParameter}`}>
            View all languages
          </BaseLink>
        </MenuItem>
        <MenuDivider />
        {displayNames.map(({ localeChoice, source, target }) => (
          <MenuItem key={locale}>
            <BaseLink href={asPath} locale={localeChoice}>
              {source} ({target})
            </BaseLink>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguagePicker

