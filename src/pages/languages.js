import React, { useState } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Link from "../components/Link"
import { Page, Content } from "../components/SharedStyledComponents"

import languageMetadata from "../data/translations"
import { translateMessageId } from "../utils/translations"
import { CardItem as LangItem } from "../components/SharedStyledComponents"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const ContentContainer = styled.div``

const LangContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const LangTitle = styled.div`
  font-size: 0.875rem;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0.04em;
  margin: 1.14em 0;
  text-transform: uppercase;
`

const StyledInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.searchBorder};
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.searchBackground};
  padding: 0.5rem;
  padding-right: 2rem;
  border-radius: 0.25em;
  width: 20%;
  max-width: 30em;
  min-width: 10em;
  &:focus {
    outline: ${(props) => props.theme.colors.primary} auto 1px;
  }
`

const LanguagesPage = () => {
  const intl = useIntl()
  const [keyword, setKeyword] = useState("")
  const searchString = translateMessageId("search", intl)
  let translationsCompleted = []
  for (const lang in languageMetadata) {
    const langMetadata = languageMetadata[lang]
    langMetadata["path"] = `/${lang}/`
    langMetadata["name"] = translateMessageId(`language-${lang}`, intl)
    const nativeLangTitle = langMetadata["language"]
    const englishLangTitle = langMetadata["name"]
    if (
      englishLangTitle.toLowerCase().includes(keyword.toLowerCase()) ||
      nativeLangTitle.toLowerCase().includes(keyword.toLowerCase())
    ) {
      translationsCompleted.push(languageMetadata[lang])
    }
  }
  translationsCompleted.sort((a, b) => a["name"].localeCompare(b["name"]))

  return (
    <StyledPage>
      <PageMetadata
        title={translateMessageId("page-languages-meta-title", intl)}
        description={translateMessageId("page-languages-meta-desc", intl)}
      />
      <Content>
        <ContentContainer>
          <h1>
            <Translation id="page-languages-h1" />
          </h1>
          <p>
            <Translation id="page-languages-p1" />
          </p>
          <p>
            <Translation id="page-languages-interested" />{" "}
            <Link to="/en/contributing/translation-program/">
              <Translation id="page-languages-learn-more" />
            </Link>
            .
          </p>
          <h2>
            <Translation id="page-languages-translations-available" />:
          </h2>
          <StyledInput
            value={keyword}
            placeholder={searchString}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <LangContainer>
            {translationsCompleted.map((lang) => (
              <LangItem to={lang.path} key={lang["name"]}>
                <LangTitle>{lang["name"]}</LangTitle>
                <h4>{lang.language}</h4>
              </LangItem>
            ))}
          </LangContainer>
          <h2>
            <Translation id="page-languages-want-more-header" />
          </h2>
          <p>
            <Translation id="page-languages-want-more-paragraph" />{" "}
            <Link to="/en/contributing/translation-program/">
              <Translation id="page-languages-want-more-link" />
            </Link>
            .
          </p>
        </ContentContainer>
      </Content>
    </StyledPage>
  )
}

export default LanguagesPage
