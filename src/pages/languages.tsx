import { Box, Flex, IconButton, LinkBox, LinkOverlay } from "@chakra-ui/react"
import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import InlineLink, { BaseLink } from "../components/Link"
import Input from "../components/Input"
import PageMetadata from "../components/PageMetadata"
import Text from "../components/OldText"
import OldHeading from "../components/OldHeading"

import { getRequiredNamespacesForPath } from "@/lib/utils/translations"
import { languageMetadata } from "@/lib/utils/languages"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"

import { TranslationKey } from "@/lib/types"
import { Language } from "@/lib/interfaces"

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context
  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPath("/languages")
  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      lastDeployDate,
    },
  }
}

const LanguagesPage = () => {
  const { t } = useTranslation("page-languages")
  const { locale } = useRouter()

  const [keyword, setKeyword] = useState<string>("")
  const resetKeyword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setKeyword("")
  }
  const searchString = t("page-languages-filter-placeholder")
  let translationsCompleted: Array<Language> = []

  for (const lang in languageMetadata) {
    const langMetadata = {
      ...languageMetadata[lang],
      name: t(`language-${lang}` as TranslationKey),
    }

    const nativeLangTitle = langMetadata.localName
    const englishLangTitle = langMetadata.name
    if (
      englishLangTitle.toLowerCase().includes(keyword.toLowerCase()) ||
      nativeLangTitle.toLowerCase().includes(keyword.toLowerCase())
    ) {
      translationsCompleted.push(langMetadata)
    }
  }

  translationsCompleted.sort((a, b) => a["name"].localeCompare(b["name"]))

  return (
    <>
      <PageMetadata
        title={t("page-languages-meta-title")}
        description={t("page-languages-meta-desc")}
      />

      <Flex direction="column" align="center" w="full" mx="auto" mt={16}>
        <PageMetadata
          title={t("page-languages-meta-title")}
          description={t("page-languages-meta-desc")}
        />
        <Box py={4} px={8} w="full">
          <OldHeading
            as="h1"
            lineHeight={1.4}
            fontSize={{ base: "2.5rem", md: "3rem" }}
          >
            {t("page-languages-h1")}
          </OldHeading>
          <Text>{t("page-languages-p1")}</Text>
          <Text>
            {t("page-languages-interested")}{" "}
            <InlineLink to="/contributing/translation-program/">
              {t("page-languages-learn-more")}
            </InlineLink>
            .
          </Text>
          <Text>
            {t("page-languages-resources-paragraph")}{" "}
            <InlineLink to="/community/language-resources">
              {t("page-languages-resources-link")}
            </InlineLink>
            .
          </Text>
          <OldHeading lineHeight={1.4} fontSize={{ base: "2xl", md: "2rem" }}>
            {t("page-languages-translations-available")}:
          </OldHeading>
          <Box
            as="form"
            position="relative"
            borderRadius="0.25em"
            w="clamp(min(400px, 100%), 50%, 600px)"
          >
            <Input
              w="full"
              value={keyword}
              placeholder={searchString}
              onChange={(e) => setKeyword(e.target.value)}
              rightIcon={
                <IconButton
                  icon={<MdClose />}
                  onClick={resetKeyword}
                  display={keyword === "" ? "none" : undefined}
                  aria-label={t("clear")}
                  variant="ghost"
                  _hover={{ svg: { fill: "primary" } }}
                />
              }
            />
          </Box>
          <Flex my={8} wrap="wrap" w="full">
            {translationsCompleted.map((lang) => {
              const isActive = locale === lang.code
              const redirectTo = `/${lang.code}`

              return (
                <LinkBox
                  key={lang["name"]}
                  textDecor="none"
                  m={4}
                  ml={0}
                  p={4}
                  flexBasis="240px"
                  flexGrow={{ base: 1, sm: 0 }}
                  flexShrink={0}
                  border="1px solid"
                  borderColor="lightBorder"
                  borderRadius="sm"
                  color={isActive ? "primary.base" : "text"}
                  transitionProperty="common"
                  transitionDuration="normal"
                  _hover={{
                    boxShadow: "primary.base",
                    borderColor: "black300",
                  }}
                >
                  <Box
                    fontSize="sm"
                    lineHeight={1.6}
                    fontWeight="normal"
                    letterSpacing="0.04em"
                    my="1.14em"
                    textTransform="uppercase"
                  >
                    {lang["name"]}
                  </Box>
                  <OldHeading
                    as="h4"
                    lineHeight={1.4}
                    fontSize={{ base: "md", md: "xl" }}
                  >
                    <LinkOverlay
                      as={BaseLink}
                      to={redirectTo}
                      lang={lang.code}
                      textDecoration="none"
                      fontWeight="medium"
                      color="body.base"
                      _hover={{ textDecoration: "none" }}
                    >
                      {lang.localName}
                    </LinkOverlay>
                  </OldHeading>
                </LinkBox>
              )
            })}
          </Flex>
          <OldHeading lineHeight={1.4} fontSize={{ base: "2xl", md: "2rem" }}>
            {t("page-languages-want-more-header")}
          </OldHeading>
          <Text>
            {t("page-languages-want-more-paragraph")}{" "}
            <InlineLink to="/contributing/translation-program/">
              {t("page-languages-want-more-link")}
            </InlineLink>
            .
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export default LanguagesPage
