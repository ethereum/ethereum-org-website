import React from "react"
import styled from "styled-components"

import Link from "./Link"
import Emoji from "./Emoji"
import Translation from "./Translation"

import docLinks from "../data/developer-docs-links.yaml"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 604px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

// TODO make entire card a link
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  width: 262px;
  height: 82px;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  @media (max-width: 604px) {
    width: 100%;
  }
`

const PreviousCard = styled(Card)`
  justify-content: flex-start;
`

const NextCard = styled(Card)`
  justify-content: flex-end;
`
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 166px;
  height: 100%;
  word-wrap: break-word;
  padding: 1rem;
  line-height: 1rem;
`

const PreviousTextDiv = styled(TextDiv)`
  align-items: flex-start;
  padding-left: 0rem;
`

const NextTextDiv = styled(TextDiv)`
  align-items: flex-end;
  padding-right: 0rem;
`

const PreviousNavLink = styled(Link)`
  text-align: left;
`

const NextNavLink = styled(Link)`
  text-align: right;
`

const EmojiLink = styled(Link)`
  text-decoration: none;
  padding: 1rem;
  height: 100%;
`

const UppercaseSpan = styled.span`
  text-transform: uppercase;
`

const DocsNav = ({ relativePath }) => {
  // Construct array of all linkable documents in order recursively
  const docsArray = []
  const getDocs = (links) => {
    for (let item of links) {
      // If object has 'items' key
      if (item.items) {
        // And if item has a 'to' key
        // Add 'to' path and 'id' to docsArray
        item.to && docsArray.push({ to: item.to, id: item.id })
        // Then recursively add sub-items
        getDocs(item.items)
      } else {
        // If object has no further 'items', add and continue
        docsArray.push({ to: item.to, id: item.id })
      }
    }
  }

  // Initiate recursive loop with full docLinks yaml
  getDocs(docLinks)

  // Find index that matches current page
  let currentIndex = 0
  for (let i = 0; i < docsArray.length; i++) {
    if (relativePath.indexOf(docsArray[i].to) > -1) {
      currentIndex = i
    }
  }

  // Extract previous and next doc based on current index +/- 1
  const previousDoc = currentIndex - 1 > 0 ? docsArray[currentIndex - 1] : null
  const nextDoc =
    currentIndex + 1 < docsArray.length ? docsArray[currentIndex + 1] : null

  return (
    <Container>
      {previousDoc ? (
        <PreviousCard>
          <EmojiLink to={previousDoc.to}>
            <Emoji text=":point_left:" size={3} />
          </EmojiLink>
          <PreviousTextDiv>
            <UppercaseSpan>
              <Translation id="previous" />
            </UppercaseSpan>
            <PreviousNavLink to={previousDoc.to}>
              <Translation id={previousDoc.id} />
            </PreviousNavLink>
          </PreviousTextDiv>
        </PreviousCard>
      ) : (
        <div />
      )}
      {nextDoc ? (
        <NextCard>
          <NextTextDiv>
            <UppercaseSpan>
              <Translation id="next" />
            </UppercaseSpan>
            <NextNavLink to={nextDoc.to}>
              <Translation id={nextDoc.id} />
            </NextNavLink>
          </NextTextDiv>
          <EmojiLink to={nextDoc.to}>
            <Emoji text=":point_right:" size={3} />
          </EmojiLink>
        </NextCard>
      ) : (
        <div />
      )}
    </Container>
  )
}

export default DocsNav
