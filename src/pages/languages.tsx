import { join } from "path"

import React, { useState } from "react"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { MdClose } from "react-icons/md"
import { Box, Flex, IconButton, LinkBox, LinkOverlay } from "@chakra-ui/react"

import { BasePageProps, I18nLocale, TranslationKey } from "@/lib/types"

import Input from "@/components/Input"
import InlineLink, { BaseLink } from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import {
  getRequiredNamespacesForPage,
  languages,
} from "@/lib/utils/translations"

import { FROM_QUERY } from "@/lib/constants"

import OldHeading from "../components/OldHeading"

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/languages")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[1])

  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const LanguagesPage = () => {
  const { t } = useTranslation("page-languages")
  const { locale, query } = useRouter()

  const [keyword, setKeyword] = useState<string>("")
  const resetKeyword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setKeyword("")
  }
  const searchString = t("page-languages-filter-placeholder")
  let translationsCompleted: Array<I18nLocale> = []

  for (const lang in languages) {
    const langMetadata = {
      ...languages[lang],
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

      <Flex
        as={MainArticle}
        direction="column"
        align="center"
        w="full"
        mx="auto"
        mt={16}
      >
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
              const fromPath =
                FROM_QUERY in query ? (query[FROM_QUERY] as string) : ""
              const redirectTo = `/${lang.code}` + fromPath

              return (
                <LinkBox
                  key={lang["name"]}
                  textDecor="none"
                  m={4}
                  ms={0}
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
                      locale={lang.code}
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
