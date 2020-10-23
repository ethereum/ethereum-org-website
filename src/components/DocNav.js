import React from "react"
import Emoji from "./Emoji"
import docLinks from "../data/developer-docs-links.yaml"
import styled from "styled-components"
import Link from "../components/Link"

const NavDocsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 604px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const NavDocsItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
  width: 262px;
  height: 82px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
`

const NavDocsPrevious = styled(NavDocsItem)`
  justify-content: flex-start;
`

const NavDocsNext = styled(NavDocsItem)`
  justify-content: flex-end;
`
const NavDocsItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 166px;
  max-height: 74px;
  overflow: hidden;
  word-wrap: break-word;
`

const NavDocsPreviousText = styled(NavDocsItemText)`
  align-items: flex-start;
`

const NavDocsNextText = styled(NavDocsItemText)`
  align-items: flex-end;
`

const NavLink = styled(Link)`
  line-height: 1rem;
`

const NavLinkPrevious = styled(NavLink)`
  text-align: left;
`

const NavLinkNext = styled(NavLink)`
  text-align: right;
`

const DocNav = ({ data, relativePath }) => {
  // Construct array of all linkable documents in order recursively
  const docsArray = []
  const getDocs = (links) => {
    for (let item of links) {
      if (item.items) {
        item.to && docsArray.push(item)
        getDocs(item.items)
      }
      docsArray.push(item)
    }
  }
  getDocs(docLinks)

  // Find index that matches current page
  let currentIndex = 0
  for (let i = 0; i < docsArray.length; i++) {
    // console.log(docsArray[i])
    // console.log(relativePath.indexOf(item.to))
    if (relativePath.indexOf(docsArray[i].to) > -1) {
      currentIndex = i
    }
  }
  console.log({ currentIndex })

  // Extract previous and next doc based on current index +/- 1
  const previousDoc = currentIndex - 1 > 0 ? docsArray[currentIndex - 1] : null
  const nextDoc =
    currentIndex + 1 < docsArray.length ? docsArray[currentIndex + 1] : null

  return (
    <NavDocsContainer>
      {previousDoc && (
        <NavDocsPrevious>
          <Emoji
            text=":backhand_index_pointing_left:"
            size={3}
            marginRight={1}
          />
          <NavDocsPreviousText>
            <span>PREVIOUS</span>
            <NavLinkPrevious to={previousDoc.to}>
              {previousDoc.title}
            </NavLinkPrevious>
          </NavDocsPreviousText>
        </NavDocsPrevious>
      )}
      {nextDoc && (
        <NavDocsNext>
          <NavDocsNextText>
            <span>NEXT</span>
            <NavLinkNext to={nextDoc.to}>{nextDoc.title}</NavLinkNext>
          </NavDocsNextText>
          <Emoji
            text=":backhand_index_pointing_right:"
            size={3}
            marginLeft={1}
          />
        </NavDocsNext>
      )}
    </NavDocsContainer>
  )
}

export default DocNav
