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
import Icon from "../components/Icon"
import NakedButton from "../components/NakedButton"

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

const Form = styled.form`
  margin: 0;
  position: relative;
  border-radius: 0.25em;
  width: clamp(min(400px, 100%), 50%, 600px);
`

const StyledInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.searchBorder};
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.searchBackground};
  padding: 0.5rem;
  padding-right: 2rem;
  border-radius: 0.25em;
  width: 100%;

  &:focus {
    outline: ${(props) => props.theme.colors.primary} auto 1px;
  }
`

const IconButton = styled(NakedButton)`
  position: absolute;
  top: 50%;
  margin-top: -12px;
  right: 6px;
`

const ResetIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
`

const LanguagesPage = () => {
  const intl = useIntl()
  const [keyword, setKeyword] = useState("")
  const resetKeyword = (e) => {
    e.preventDefault()
    setKeyword("")
  }
  const searchString = translateMessageId(
    "page-languages-filter-placeholder",
    intl
  )
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
            <Link to="/contributing/translation-program/">
              <Translation id="page-languages-learn-more" />
            </Link>
            .
          </p>
          <p>
            <Translation id="page-languages-resources-paragraph" />{" "}
            <Link to="/community/language-resources">
              <Translation id="page-languages-resources-link" />
            </Link>
            .
          </p>
          <h2>
            <Translation id="page-languages-translations-available" />:
          </h2>
          <Form>
            <StyledInput
              value={keyword}
              placeholder={searchString}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword === "" ? null : (
              <IconButton onClick={resetKeyword}>
                <ResetIcon name="close" />
              </IconButton>
            )}
          </Form>
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
            <Link to="/contributing/translation-program/">
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
