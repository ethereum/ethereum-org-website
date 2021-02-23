import React from "react"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Link from "../components/Link"
import { Page, Content } from "../components/SharedStyledComponents"
import { Mixins } from "../theme"

import languageMetadata from "../data/translations"
import { translateMessageId } from "../utils/translations"

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

const LangItem = styled(GatsbyLink)`
  text-decoration: none;
  margin: 1rem 1rem 1rem 0;
  padding: 1rem;
  width: 240px;
  list-style: none;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  /* box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1); */
  color: ${(props) => props.theme.colors.text};

  &:hover {
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
    border: 1px solid ${(props) => props.theme.colors.black300};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const LangTitle = styled.div`
  ${Mixins.textLevel6}
`

const LanguagesPage = () => {
  const intl = useIntl()

  let translationsCompleted = []
  for (const lang in languageMetadata) {
    const langMetadata = languageMetadata[lang]
    langMetadata["path"] = `/${lang}/`
    langMetadata["name"] = translateMessageId(`language-${lang}`, intl)
    translationsCompleted.push(languageMetadata[lang])
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
