import React, { useState, useEffect } from "react"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import { languageMetadata } from "../utils/translations"
import { Mixins } from "../components/Theme"
import SEO from "../components/SEO"
import Translation from "../components/Translation"
import Link from "../components/Link"

import axios from "axios"

// TODO re-use elsewhere
const PageContainer = styled.div`
  width: 85vw;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding-top: 6rem;
  @media screen and (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 8rem;
  }
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

// DOM error for nested `a` tags
const FakeLink = styled.div`
  color: ${(props) => props.theme.colors.primary};
  &:after {
    margin-left: 0.125em;
    margin-right: 0.3em;
    display: inline-block;
    content: "↗";
    transition: all 0.1s ease-in-out;
    font-style: normal;
  }
  &:hover {
    &:after {
      transform: translate(0.15em, -0.2em);
    }
  }
`

const LanguagesPage = () => {
  const intl = useIntl()
  const [translationsInProgress, setTranslationsInProgress] = useState([])

  let translationsCompleted = []
  for (const lang in languageMetadata) {
    const langMetadata = languageMetadata[lang]
    langMetadata["path"] = `/${lang}/`
    translationsCompleted.push(languageMetadata[lang])
  }
  translationsCompleted.sort((a, b) =>
    a["language-english"].localeCompare(b["language-english"])
  )

  useEffect(() => {
    axios
      .get("/.netlify/functions/translations")
      .then((response) => {
        let languages = []
        if (response.data && response.data.data) {
          languages = response.data.data
        }
        languages.sort((a, b) => a.name.localeCompare(b.name))
        setTranslationsInProgress(languages)
      })
      .catch((error) => {
        // TODO add toast message on fails
        console.error(error)
      })
  }, [])

  return (
    <PageContainer>
      <SEO
        title={intl.formatMessage({ id: "page-translations-meta-title" })}
        description={intl.formatMessage({ id: "page-translations-meta-desc" })}
      />
      <ContentContainer>
        <h1>
          <Translation id="page-translations-h1" />
        </h1>
        <p>
          <Translation id="page-translations-p1" />
        </p>
        <p>
          <Translation id="page-translations-interested" />{" "}
          <a href="#ethereum-org-translation-program">
            <Translation id="page-translations-learn-more" />
          </a>
        </p>
        <h2>
          <Translation id="page-translations-translations-available" />:
        </h2>
      </ContentContainer>

      <LangContainer>
        {translationsCompleted.map((lang) => {
          return (
            <LangItem to={lang.path} key={lang.language}>
              <LangTitle>{lang["language-english"]}</LangTitle>
              <h4>{lang.language}</h4>
            </LangItem>
          )
        })}
      </LangContainer>

      <ContentContainer>
        <h2 id="ethereum-org-translation-program">
          <Translation id="page-translations-program" />
        </h2>
        <p>
          <Translation id="page-translations-program-intro" />
        </p>
        <ol>
          <li>
            <Translation id="page-translations-program-follow" />{" "}
            <Link to="https://crowdin.com/project/ethereumfoundation/invite">
              <Translation id="page-translations-program-invite" />
            </Link>{" "}
            <Translation id="page-translations-program-join" />.
            <ul>
              <li>
                <Translation id="page-translations-program-account" />{" "}
                <Link to="https://support.crowdin.com/online-editor/">
                  <Translation id="page-translations-program-docs" />
                </Link>
                .
              </li>
            </ul>
          </li>
          <li>
            <Translation id="page-translations-program-find" />{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
              <Translation id="page-translations-program-issue" />
            </Link>
            .
            <ul>
              <li>
                <Translation id="page-translations-program-version" />{" "}
                <Link to="https://crowdin.com/project/ethereumfoundation/fil#">
                  <Translation id="page-translations-program-filipino" />
                </Link>{" "}
                <Translation id="page-translations-program-version-two" />.
              </li>
            </ul>
          </li>
          <li>
            <Translation id="page-translations-program-complete" />
          </li>
        </ol>
        <p>
          <Translation id="page-translations-program-question" />{" "}
          <Link to="https://crowdin.com/project/ethereumfoundation/fil#">
            <Translation id="page-translations-program-discord" />
          </Link>{" "}
          <Translation id="page-translations-program-channel" />.
        </p>
        <p>
          <Translation id="page-translations-program-participate" />.
        </p>
        <h2>
          <Translation id="page-translations-translations-in-progress" />:
        </h2>
      </ContentContainer>

      <LangContainer>
        {translationsInProgress.map((lang) => {
          const url = `https://crowdin.com/project/ethereumfoundation/${lang.code}`
          return (
            <LangItem to={url} key={lang.code}>
              <h4>{lang.name}</h4>
              <div>
                <Translation id="page-translations-translation-progress" />:{" "}
                {lang.translated_progress}%
              </div>
              <div>
                <Translation id="page-translations-review-progress" />:{" "}
                {lang.approved_progress}%
              </div>
              <FakeLink>
                <Translation id="page-translations-contribute" />
              </FakeLink>
            </LangItem>
          )
        })}
      </LangContainer>
    </PageContainer>
  )
}

export default LanguagesPage
