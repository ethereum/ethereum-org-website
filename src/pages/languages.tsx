import { Box, Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React, { useState } from "react"
import { MdClose } from "react-icons/md"

import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"

import { CardItem as LangItem } from "../components/SharedStyledComponents"
import { Language, languageMetadata } from "../utils/languages"
import { TranslationKey } from "../utils/translations"

const LanguagesPage = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const redirectTo =
    location.search.split("from=").length > 1
      ? location.search.split("from=")[1]
      : "/"
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
    <Flex direction="column" align="center" w="full" mx="auto">
      <PageMetadata
        title={t("page-languages-meta-title")}
        description={t("page-languages-meta-desc")}
      />
      <Box py={4} px={8} w="full">
        <Box>
          <Heading as="h1" fontSize={{ base: "2rem", sm: "2.5rem" }}>
            <Translation id="page-languages-h1" />
          </Heading>
          <Text>
            <Translation id="page-languages-p1" />
          </Text>
          <Text>
            <Translation id="page-languages-interested" />{" "}
            <Link to="/contributing/translation-program/">
              <Translation id="page-languages-learn-more" />
            </Link>
            .
          </Text>
          <Text>
            <Translation id="page-languages-resources-paragraph" />{" "}
            <Link to="/community/language-resources">
              <Translation id="page-languages-resources-link" />
            </Link>
            .
          </Text>
          <Heading fontSize={{ base: "2xl", md: "2rem" }}>
            <Translation id="page-languages-translations-available" />:
          </Heading>
          <Box
            as="form"
            position="relative"
            borderRadius="0.25em"
            w="clamp(min(400px, 100%), 50%, 600px)"
          >
            <Input
              border="1px solid"
              borderColor="searchBorder"
              color="text"
              bg="searchBackground"
              p={2}
              pr={8}
              borderRadius="0.25em"
              w="full"
              _focus={{
                outline: "auto 1px",
                outlineColor: "primary",
              }}
              value={keyword}
              placeholder={searchString}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword !== "" && (
              <IconButton
                icon={<MdClose />}
                onClick={resetKeyword}
                position="absolute"
                insetInlineEnd={1}
                aria-label={t("clear")}
                variant="icon"
                _hover={{ svg: { fill: "primary" } }}
              />
            )}
          </Box>
          <Flex my={8} wrap="wrap" w="full">
            {translationsCompleted.map((lang) => (
              <LangItem to={redirectTo} language={lang.code} key={lang["name"]}>
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
                <Heading as="h4" fontSize={{ base: "md", md: "xl" }}>
                  {lang.localName}
                </Heading>
              </LangItem>
            ))}
          </Flex>
          <Heading fontSize={{ base: "2xl", md: "2rem" }}>
            <Translation id="page-languages-want-more-header" />
          </Heading>
          <Text>
            <Translation id="page-languages-want-more-paragraph" />{" "}
            <Link to="/contributing/translation-program/">
              <Translation id="page-languages-want-more-link" />
            </Link>
            .
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default LanguagesPage

export const query = graphql`
  query LanguagesPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-languages", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
