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

import ReactSelect from "@/components/ReactSelect"

import {
  getAllWalletsLanguages,
  getWalletsTopLanguages,
} from "@/lib/utils/wallets"

type LanguageSupportFilterProps = {}

export const LanguageSupportFilter = ({}: LanguageSupportFilterProps) => {
  // const { t } = useTranslation("page-wallets-find-wallet")
  const { locale } = useRouter()

  const allWalletsLanguages = getAllWalletsLanguages(locale!)
  const allWalletsLanguagesOptions = allWalletsLanguages!.map(
    ({ langCode, langName }) => {
      return {
        label: langName,
        value: langCode,
      }
    }
  )

  // const handleLayer2SelectChange: ReactSelectOnChange<Layer2Option> = (
  //   selectedOption
  // ) => {
  //   if (!selectedOption) return

  //   trackCustomEvent({
  //     eventCategory: `Selected layer 2 to bridge to`,
  //     eventAction: `Clicked`,
  //     eventName: `${selectedOption.l2.name} bridge selected`,
  //     eventValue: `${selectedOption.l2.name}`,
  //   })
  //   setSelectedL2(selectedOption.l2)
  // }

  const walletsTop5Languages = getWalletsTopLanguages(5, locale!).join(", ")

  return (
    <AccordionItem
      background="background.highlight"
      borderRadius="base"
      // Remove border color from global style
      borderColor="transparent"
      p={6}
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
                {/* TODO i18n */}
                <Text>Language support</Text>
              </Box>

              <AccordionIcon
                color="primary.base"
                boxSize={9}
                _hover={{ color: "primary.hover" }}
              />
            </AccordionButton>
          </Heading>

          <AccordionPanel as={List} p={0} m={0}>
            <ReactSelect
              instanceId="language-support-filter"
              // TODO
              // aria-label={t("page-get-eth-exchanges-header")}
              options={allWalletsLanguagesOptions}
              // TODO
              onChange={() => {}}
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
