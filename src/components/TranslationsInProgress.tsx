import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"

import { FakeLinkExternal, CardItem } from "./SharedStyledComponents"
import Translation from "./Translation"

import { GATSBY_FUNCTIONS_PATH } from "../constants"

const LangContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`
const LangItem = styled(CardItem)`
  flex: 1 1 200px;
`

type LanguageType = {
  name: string
  code: string
  translated_progress: string
  approved_progress: string
}

export interface IProps {}

const TranslationsInProgress: React.FC<IProps> = () => {
  const [translationsInProgress, setTranslationsInProgress] = useState<
    Array<LanguageType>
  >([])

  useEffect(() => {
    axios
      .get(`${GATSBY_FUNCTIONS_PATH}/translations`)
      .then((response) => {
        let languages: Array<LanguageType> = []
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
        const url = `https://crowdin.com/project/ethereum-org/${lang.code}`
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
