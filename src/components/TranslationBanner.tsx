import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Box, CloseButton, Flex, Heading, useToken } from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

import { ButtonLink } from "./Buttons"
import Emoji from "./Emoji"

export type TranslationBannerProps = {
  shouldShow: boolean
  originalPagePath: string
  isPageContentEnglish: boolean
}

const TranslationBanner = ({
  shouldShow,
  originalPagePath,
  isPageContentEnglish,
}: TranslationBannerProps) => {
  const [isOpen, setIsOpen] = useState(shouldShow)
  const [textColor] = useToken("colors", ["text"])
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const dir = isLangRightToLeft(locale! as Lang) ? "rtl" : "ltr"

  useEffect(() => {
    setIsOpen(shouldShow)
  }, [originalPagePath, shouldShow])

  const headerTextId = isPageContentEnglish
    ? "translation-banner-title-new"
    : "translation-banner-title-update"

  const bodyTextId = isPageContentEnglish
    ? "translation-banner-body-new"
    : "translation-banner-body-update"

  return (
    <Box
      as="aside"
      display={isOpen ? "block" : "none"}
      bottom={{ base: 0, md: 8 }}
      insetInlineEnd={{ base: 0, md: 8 }}
      position="fixed"
      zIndex="banner"
      dir={dir}
    >
      <Flex
        p="1rem"
        maxH="100%"
        maxW={{ base: "100%", md: "600px" }}
        bg="infoBanner"
        color="black300"
        justify="space-between"
        boxShadow={{
          base: `0px -4px 10px 0px ${textColor} 10%`,
          md: "rgba(0, 0, 0, 0.16) 0px 2px 4px 0px",
        }}
        borderRadius="sm"
      >
        <Flex flexDirection="column" m={4} mt={{ base: 10, sm: 4 }}>
          <Flex
            align={{ base: "flex-start", sm: "center" }}
            mb={4}
            flexDirection={{ base: "column-reverse", sm: "row" }}
          >
            <Heading
              as="h3"
              fontSize="2xl"
              fontWeight="700"
              lineHeight="100%"
              my="0"
            >
              {t(headerTextId)}
            </Heading>
            <Emoji
              text=":globe_showing_asia_australia:"
              fontSize="2xl"
              ms={2}
              mb={{ base: 4, sm: "auto" }}
            />
          </Flex>
          <p>{t(bodyTextId)}</p>
          <Flex
            align={{ base: "flex-start", sm: "center" }}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Box>
              <ButtonLink href="/contributing/translation-program/">
                {t("translation-banner-button-translate-page")}
              </ButtonLink>
            </Box>
            {/* Todo: Reimplement once fixed */}
            {/* Issue: https://github.com/ethereum/ethereum-org-website/issues/12292 */}
            {/* {!isPageContentEnglish && (
              <Box>
                <ButtonLink
                  href={originalPagePath}
                  variant="outline"
                  ms={{ base: 0, sm: 2 }}
                  mt={{ base: 2, sm: 0 }}
                  borderColor="#333333"
                  color="#333333"
                  lang={DEFAULT_LOCALE}
                >
                  {t("translation-banner-button-see-english")}
                </ButtonLink>
              </Box>
            )} */}
          </Flex>
        </Flex>
        <CloseButton
          position="absolute"
          top="0"
          insetInlineEnd="0"
          margin={2}
          color="secondary"
          _hover={{
            color: "primary.base",
          }}
          onClick={() => setIsOpen(false)}
        />
      </Flex>
    </Box>
  )
}

export default TranslationBanner
