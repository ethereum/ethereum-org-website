import React, { useState, useEffect } from "react"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"
import axios from "axios"
import { FakeLinkExternal } from "./SharedStyledComponents"

const LangContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`

const LangItem = styled(GatsbyLink)`
  text-decoration: none;
  margin: 1rem 1rem 1rem 0;
  padding: 1rem;
  flex: 1 1 200px;
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

const TranslationsInProgress = () => {
  const [translationsInProgress, setTranslationsInProgress] = useState([])

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
    <LangContainer>
      {translationsInProgress.map((lang) => {
        const url = `https://crowdin.com/project/ethereumfoundation/${lang.code}`
        return (
          <LangItem to={url} key={lang.code}>
            <h4>{lang.name}</h4>
            <div>Translation progress: {lang.translated_progress}%</div>
            <div>Review progress: {lang.approved_progress}%</div>
            <FakeLinkExternal>Contribute</FakeLinkExternal>
          </LangItem>
        )
      })}
    </LangContainer>
  )
}

export default TranslationsInProgress
