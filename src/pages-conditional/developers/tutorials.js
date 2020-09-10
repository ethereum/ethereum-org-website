import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import { Twemoji } from "react-emoji-render"

import CardList from "../../components/CardList"
import { EdnPage } from "../../components/SharedStyledComponents"
import Pill from "../../components/Pill"

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

const TutorialCard = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 2rem;
  width: 100%;
  color: #000;
  &:hover {
    border-radius: 4px;
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
`

const Background = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin-bottom: 2rem;
  width: 66%;
`

const StyledEdnPage = styled(EdnPage)`
  margin-top: 12rem;
`

const PillContainer = styled.div`
  display: flex;
  width: 100%;
`

const StyledPill = styled(Pill)`
  margin: 0.5rem;
  font-family: "SFMono-Regular", monospace;
`

const About = styled.p`
  color: ${(props) => props.theme.colors.text200};
`

const Author = styled.p`
  color: ${(props) => props.theme.colors.text200};
  font-size: 14px;
  text-transform: uppercase;
`

const Title = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  font-size: 24px;
  margin-right: 6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
  }
`

const PageTitle = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -1rem;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`

const TutorialsPage = ({ data }) => {
  const allTutorials = data.allTutorials.nodes.map((tutorial) => {
    return {
      to: tutorial.fields.slug,
      title: tutorial.frontmatter.title,
      description: tutorial.frontmatter.description,
      author: tutorial.frontmatter.author,
      tags: tutorial.frontmatter.tags,
      skill: tutorial.frontmatter.skill,
    }
  })

  return (
    <StyledEdnPage>
      <PageTitle>Tutorials</PageTitle>
      <h2>All</h2>
      <Background>
        {allTutorials.map((tutorial) => {
          return (
            <TutorialCard key={tutorial.to} to={tutorial.to}>
              <TitleContainer>
                <Title>{tutorial.title}</Title>
                <StyledPill>{tutorial.skill}</StyledPill>
              </TitleContainer>
              <Author>{tutorial.author}</Author>
              <About>{tutorial.description}</About>
              <PillContainer>
                {tutorial.tags.map((tag, idx) => {
                  return <StyledPill key={idx}>{tag}</StyledPill>
                })}
              </PillContainer>
            </TutorialCard>
          )
        })}
      </Background>
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
    </StyledEdnPage>
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
          author
          skill
        }
        timeToRead
      }
    }
  }
`
