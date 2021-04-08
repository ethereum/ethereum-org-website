import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { FakeLinkExternal } from "./SharedStyledComponents"
import Translation from "./Translation"
import { CardItem } from "./SharedStyledComponents"

const LangContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`
const LangItem = styled(CardItem)`
  flex: 1 1 200px;
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
          <LangItem to={url} key={lang.code} hideArrow>
            <h4>{lang.name}</h4>
            <div>
              <Translation id="translation-progress" />:{" "}
              {lang.translated_progress}%
            </div>
            <div>
              <Translation id="review-progress" />: {lang.approved_progress}%
            </div>
            <FakeLinkExternal>
              <Translation id="page-developers-contribute" />
            </FakeLinkExternal>
          </LangItem>
        )
      })}
    </LangContainer>
  )
}

export default TranslationsInProgress
