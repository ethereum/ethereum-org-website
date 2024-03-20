import { ReactNode, useContext } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  List,
  Text,
} from "@chakra-ui/react"

import Select from "@/components/Select"

import { getLanguageCodeName } from "@/lib/utils/intl"
import { trackCustomEvent } from "@/lib/utils/matomo"
import {
  getAllWalletsLanguages,
  getWalletsTopLanguages,
} from "@/lib/utils/wallets"

import { WalletSupportedLanguageContext } from "@/contexts/WalletSupportedLanguageContext"

export const LanguageSupportFilter = () => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const { locale } = useRouter()

  // Context API
  const { supportedLanguage, setSupportedLanguage } = useContext(
    WalletSupportedLanguageContext
  )

  const allWalletsLanguages = getAllWalletsLanguages(locale!)
  const allWalletsLanguagesOptions = allWalletsLanguages!.map(
    ({ langCode, langName }) => {
      return {
        label: langName,
        value: langCode,
      }
    }
  )

  const handleLanguageFilterSelectChange = (selectedLanguage) => {
    if (!selectedLanguage) return

    setSupportedLanguage(selectedLanguage.value)

    trackCustomEvent({
      eventCategory: "WalletFilterSidebar",
      eventAction: `Language search`,
      eventName: getLanguageCodeName(selectedLanguage.value, locale!),
    })
  }

  const handleTopLanguageClick = (languageCode: string) => {
    setSupportedLanguage(languageCode)

    trackCustomEvent({
      eventCategory: "WalletFilterSidebar",
      eventAction: `Language search`,
      eventName: getLanguageCodeName(languageCode, locale!),
    })
  }

  return (
    <AccordionItem
      background="background.highlight"
      borderRadius="base"
      borderColor="transparent"
      p={6}
      zIndex={1}
    >
      {({ isExpanded }) => (
        <>
          <Heading
            as="h3"
            borderBottom={isExpanded ? "1px" : "none"}
            borderColor="body.light"
            fontSize="lg"
            fontWeight={600}
            lineHeight={1.4}
            py={1}
            ps={4}
            pe={2.5}
            borderRadius={1}
            _hover={{ color: "primary.hover" }}
          >
            <AccordionButton
              color="inherit"
              fontWeight="inherit"
              fontSize="inherit"
              p={0}
              textAlign="initial"
              _hover={{ background: "transparent" }}
            >
              <Text as="span" flex={1}>
                {t("page-find-wallet-languages-supported")}
              </Text>

              <AccordionIcon
                color="primary.base"
                boxSize={9}
                _hover={{ color: "primary.hover" }}
              />
            </AccordionButton>
          </Heading>

          <AccordionPanel as={List} p={0} m={0}>
            <Select
              instanceId="language-support-filter"
              aria-label={t("page-find-wallet-languages-supported")}
              aria-placeholder={t("page-find-wallet-languages-search-language")}
              options={allWalletsLanguagesOptions}
              onChange={handleLanguageFilterSelectChange}
              placeholder={getLanguageCodeName(supportedLanguage, locale!)}
              isSearchable
              variant="outline"
            />

            <Box mt={2}>
              <Text color="body.medium" size="sm">
                {t("page-find-wallet-popular-languages")}
              </Text>

              {getWalletsTopLanguages(5, locale!)
                .map<ReactNode>((language) => {
                  return (
                    <Text
                      key={language.code}
                      as="span"
                      color="primary.base"
                      size="sm"
                      cursor="pointer"
                      onClick={() => handleTopLanguageClick(language.code)}
                    >
                      {language.langName}
                    </Text>
                  )
                })
                // `.reduce()` used to generate the comma separator between languages
                .reduce((prev, curr) => [prev, ", ", curr])}
            </Box>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
