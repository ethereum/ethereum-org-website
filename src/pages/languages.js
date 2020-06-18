import React, { useState, useEffect } from "react"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"
import { useIntl, FormattedMessage } from "gatsby-plugin-intl"

import { languageMetadata } from "../utils/translations"
import { Mixins } from "../components/Theme"
import SEO from "../components/SEO"
import Link from "../components/Link"

import axios from "axios"

// TODO re-use elsewhere
const PageContainer = styled.div`
  width: 85vw;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 0 auto;
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

// TODO use theme variables
const LangItem = styled(GatsbyLink)`
  margin: 1rem 1rem 1rem 0;
  padding: 1rem;
  flex: 0 1 260px;
  list-style: none;
  border-radius: 0.5rem;
  width: 100%;
  border: 1px dotted #333;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: ${(props) => props.theme.colors.text};

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24);
  }
`

const LangTitle = styled.div`
  ${Mixins.textLevel6}
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
          <FormattedMessage id="page-translations-h1" />
        </h1>
        <p>
          <FormattedMessage id="page-translations-p1" />
        </p>
        <p>
          <FormattedMessage id="page-translations-interested" />{" "}
          <a href="#ethereum-org-translation-program">
            <FormattedMessage id="page-translations-learn-more" />
          </a>
        </p>
        <h2>
          <FormattedMessage id="page-translations-translations-available" />:
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
          <FormattedMessage id="page-translations-program" />
        </h2>
        <p>
          <FormattedMessage id="page-translations-program-intro" />
        </p>
        <ol>
          <li>
            <FormattedMessage id="page-translations-program-follow" />{" "}
            <Link to="https://crowdin.com/project/ethereumfoundation/invite">
              <FormattedMessage id="page-translations-program-invite" />
            </Link>{" "}
            <FormattedMessage id="page-translations-program-join" />.
            <ul>
              <li>
                <FormattedMessage id="page-translations-program-account" />{" "}
                <Link to="https://support.crowdin.com/online-editor/">
                  <FormattedMessage id="page-translations-program-docs" />
                </Link>
                .
              </li>
            </ul>
          </li>
          <li>
            <FormattedMessage id="page-translations-program-find" />{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
              <FormattedMessage id="page-translations-program-issue" />
            </Link>
            .
            <ul>
              <li>
                <FormattedMessage id="page-translations-program-version" />{" "}
                <Link to="https://crowdin.com/project/ethereumfoundation/fil#">
                  <FormattedMessage id="page-translations-program-filipino" />
                </Link>{" "}
                <FormattedMessage id="page-translations-program-version-two" />.
              </li>
            </ul>
          </li>
          <li>
            <FormattedMessage id="page-translations-program-complete" />
          </li>
        </ol>
        <p>
          <FormattedMessage id="page-translations-program-question" />{" "}
          <Link to="https://crowdin.com/project/ethereumfoundation/fil#">
            <FormattedMessage id="page-translations-program-discord" />
          </Link>{" "}
          <FormattedMessage id="page-translations-program-channel" />.
        </p>
        <p>
          <FormattedMessage id="page-translations-program-participate" />.
        </p>
        <h2>
          <FormattedMessage id="page-translations-translations-in-progress" />:
        </h2>
      </ContentContainer>

      <LangContainer>
        {translationsInProgress.map((lang) => {
          const url = `https://crowdin.com/project/ethereumfoundation/${lang.code}`
          return (
            <LangItem to={url} key={lang.code}>
              <h4>{lang.name}</h4>
              <div>
                <FormattedMessage id="page-translations-translation-progress" />
                : {lang.translated_progress}%
              </div>
              <div>
                <FormattedMessage id="page-translations-review-progress" />:{" "}
                {lang.approved_progress}%
              </div>
              <Link to={url}>
                <FormattedMessage id="page-translations-contribute" />
              </Link>
            </LangItem>
          )
        })}
      </LangContainer>
    </PageContainer>
  )
}

export default LanguagesPage
