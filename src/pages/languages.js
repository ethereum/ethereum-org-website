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

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const ContentContainer = styled.div`
  max-width: ${(props) => props.theme.breakpoints.m};
`

const LangContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`

const LangItem = styled(GatsbyLink)`
  text-decoration: none;
  margin: 1rem 1rem 1rem 0;
  padding: 1rem;
  flex: 0 1 260px;
  list-style: none;
  border-radius: 0.5rem;
  width: 100%;
  border: 1px dotted ${(props) => props.theme.colors.lightBorder};
  box-shadow: 0 1px 4px ${(props) => props.theme.colors.boxShadow};
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: ${(props) => props.theme.colors.text};

  &:hover {
    box-shadow: 0 4px 8px ${(props) => props.theme.colors.boxShadowHover};
    border: 1px dotted ${(props) => props.theme.colors.primary};
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
    langMetadata["name"] = intl.formatMessage({
      id: `language-${lang}`,
    })
    translationsCompleted.push(languageMetadata[lang])
  }
  translationsCompleted.sort((a, b) => a["name"].localeCompare(b["name"]))

  return (
    <StyledPage>
      <PageMetadata
        title={intl.formatMessage({ id: "page-translations-meta-title" })}
        description={intl.formatMessage({ id: "page-translations-meta-desc" })}
      />
      <Content>
        <ContentContainer>
          <h1>
            <Translation id="page-translations-h1" />
          </h1>
          <p>
            <Translation id="page-translations-p1" />
          </p>
          <p>
            <Translation id="page-translations-interested" />{" "}
            <Link to="/en/contributing/translation-program/">
              <Translation id="page-translations-learn-more" />
            </Link>
            .
          </p>
          <h2>
            <Translation id="page-translations-translations-available" />:
          </h2>
        </ContentContainer>

        <LangContainer>
          {translationsCompleted.map((lang) => {
            return (
              <LangItem to={lang.path} key={lang["name"]}>
                <LangTitle>{lang["name"]}</LangTitle>
                <h4>{lang.language}</h4>
              </LangItem>
            )
          })}
        </LangContainer>
        <ContentContainer>
          <h2>Want to see ethereum.org in a different language?</h2>
          <p>
            ethereum.org translators are always translating pages in as many
            languages as possible. To see what they're working on right now or
            to sign up to join them, read about our{" "}
            <Link to="/en/contributing/translation-program/">
              Translation Program
            </Link>
            .
          </p>
        </ContentContainer>
      </Content>
    </StyledPage>
  )
}

export default LanguagesPage
