import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import { Twemoji } from "react-emoji-render"

import CardList from "../../components/CardList"
import { EdnPage } from "../../components/SharedStyledComponents"

// const Table = styled.div`
//   background-color: ${(props) => props.theme.colors.background};
//   box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
//   width: 100%;
//   margin-bottom: 0rem;
// `

// const StyledCardList = styled(CardList)`
//   margin-bottom: -2rem;
// `

// const Item = styled.div`
//   text-decoration: none;
//   display: flex;
//   font-family: "SFMono-Regular", monospace;
//   text-transform: uppercase;
//   font-weight: 600;
//   color: ${(props) => props.theme.colors.text} !important;
//   box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
//   background: ${(props) => props.theme.colors.cardGradient};
//   margin-bottom: 1px;
//   margin-top: 0rem;
//   padding: 1rem;
//   width: 100%;
// `
// const Emoji = styled(Twemoji)`
//   margin-right: 1rem;
// `

const TutorialsPage = ({ data }) => {
  const allTutorials = data.allTutorials.nodes.map((tutorial) => {
    return {
      to: tutorial.fields.slug,
      title: tutorial.frontmatter.title,
      description: tutorial.frontmatter.description,
      author: tutorial.frontmatter.author,
      tags: tutorial.frontmatter.tags,
    }
  })

  return (
    <EdnPage>
      <h1>Tutorials</h1>
      <h2>All</h2>
      <ul>
        {allTutorials.map((tutorial) => {
          return (
            <li key={tutorial.to}>
              <Link to={tutorial.to}>{tutorial.title}</Link> by{" "}
              {tutorial.author}, about {tutorial.description}
              <ul>
                {tutorial.tags.map((tag, idx) => {
                  return <li key={idx}>{tag}</li>
                })}
              </ul>
            </li>
          )
        })}
      </ul>
      {/* TODO group & display tutorials by tag */}
      {/* <Table>
        <Item>
          <Emoji svg text=":page_with_curl:" /> Smart contracts
        </Item>
        <StyledCardList content={smartContractTutorials} />
      </Table>
      <Table>
        <Item>
          <Emoji svg text=":computer:" /> Nodes and clients
        </Item>
        <StyledCardList content={nodesTutorials} />
      </Table>
      <Table>
        <Item>
          <Emoji svg text=":shield:" /> Security
        </Item>
        <StyledCardList content={securityTutorials} />
      </Table> */}
    </EdnPage>
  )
}
export default TutorialsPage

export const query = graphql`
  query {
    allTutorials: allMdx(filter: { slug: { regex: "/tutorials/" } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
          tags
        }
        timeToRead
      }
    }
  }
`
