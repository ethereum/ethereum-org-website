import { useContext } from "react"
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

import {
  getAllWalletsLanguages,
  getWalletsTopLanguages,
} from "@/lib/utils/wallets"

import { WalletSupportedLanguageContext } from "@/contexts/WalletSupportedLanguageContext"

export const LanguageSupportFilter = () => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const { locale } = useRouter()

  // Context API
  const { setSupportedLanguage } = useContext(WalletSupportedLanguageContext)

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

    // TODO: add matomo tracking
    setSupportedLanguage(selectedLanguage.value)
  }

  const walletsTop5Languages = getWalletsTopLanguages(5, locale!).join(", ")

  return (
    <AccordionItem
      background="background.highlight"
      borderRadius="base"
      borderColor="transparent"
      p={6}
      zIndex={0}
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
              <Box as="span" flex={1}>
                <Text>{t("page-find-wallet-languages-supported")}</Text>
              </Box>

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
              // TODO
              // aria-label={t("page-get-eth-exchanges-header")}
              options={allWalletsLanguagesOptions}
              onChange={handleLanguageFilterSelectChange}
              // TODO i18n
              placeholder={"Search language"}
              isSearchable
              variant="outline"
            />

            <Box mt={2}>
              <Text color="body.medium" fontSize="sm" lineHeight={1.6}>
                {/* TODO: i18n */}
                Most popular
              </Text>
              <Text color="primary.base" fontSize="sm" lineHeight={1.6}>
                {walletsTop5Languages}
              </Text>
            </Box>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
