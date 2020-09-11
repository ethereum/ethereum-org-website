import React, { useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Link from "../../components/Link"
import Pill from "../../components/Pill"
import Tag from "../../components/Tag"
import { Content, EdnPage } from "../../components/SharedStyledComponents"
import { Twemoji } from "react-emoji-render"

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 2em !important;
    margin-top: 2em !important;
  }
`

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

const TutorialContainer = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin-bottom: 2rem;
  width: 66%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
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
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 1rem;
  }
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
const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 66%;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    width: 100%;
    padding: 0rem 2rem;
  }
`
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
    margin-bottom: 1rem;
  }
`
const ClearLink = styled.button`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
`

const ResultsContainer = styled.div`
  margin-top: 0rem;
  text-align: center;
  padding: 3rem;
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
      timeToRead: tutorial.timeToRead,
      published: tutorial.frontmatter.published,
    }
  })
  const allTags = data.allTags.group

  const [state, setState] = useState({
    activeTagNames: [],
    filteredTutorials: allTutorials,
  })

  const clearActiveTags = () => {
    setState({ activeTagNames: [], filteredTutorials: allTutorials })
  }

  const handleTagSelect = (tagName) => {
    const activeTagNames = state.activeTagNames

    // Add or remove the selected tag
    const index = activeTagNames.indexOf(tagName)
    if (index > -1) {
      activeTagNames.splice(index, 1)
    } else {
      activeTagNames.push(tagName)
    }

    // If no tags are active, show all tutorials, otherwise filter by active tag
    let filteredTutorials = allTutorials
    if (activeTagNames.length > 0) {
      filteredTutorials = allTutorials.filter((tutorial) => {
        for (const tag of activeTagNames) {
          if (!tutorial.tags.includes(tag)) {
            return false
          }
        }
        return true
      })
    }
    setState({ activeTagNames, filteredTutorials })
  }

  const hasActiveTags = state.activeTagNames.length > 0
  const hasNoTutorials = state.filteredTutorials.length === 0

  return (
    <StyledEdnPage>
      {/* TODO add PageMetaData */}

      <PageTitle>Ethereum Development Tutorials</PageTitle>
      <p>Welcome to our curated list of community tutorials.</p>
      <p>Filter tutorials by tag:</p>
      <TagsContainer>
        <TagContainer>
          {allTags.map((tag) => {
            const name = `${tag.name} (${tag.totalCount})`
            const isActive = state.activeTagNames.includes(tag.name)
            return (
              <Tag
                name={name}
                key={name}
                isActive={isActive}
                shouldShowIcon={false}
                onSelect={handleTagSelect}
                value={tag.name}
              />
            )
          })}
          {hasActiveTags && (
            <ClearLink onClick={clearActiveTags}>Clear filters</ClearLink>
          )}
        </TagContainer>
      </TagsContainer>

      <TutorialContainer>
        {hasNoTutorials && (
          <ResultsContainer>
            <Emoji svg text=":crying_face:" />
            <h2>
              No tutorials has all of these tags <b>yet</b>
            </h2>
            <p>Try removing a tag or two</p>
          </ResultsContainer>
        )}
        {state.filteredTutorials.map((tutorial) => {
          return (
            <TutorialCard key={tutorial.to} to={tutorial.to}>
              <TitleContainer>
                <Title>{tutorial.title}</Title>
                <StyledPill>{tutorial.skill}</StyledPill>
              </TitleContainer>
              <Author>
                <Twemoji svg text=":writing_hand:" /> {tutorial.author} •{" "}
                <Twemoji svg text=":calendar:" /> {tutorial.published} •{" "}
                <Twemoji svg text=":stopwatch:" /> {tutorial.timeToRead} min
              </Author>
              <About>{tutorial.description}</About>
              <PillContainer>
                {tutorial.tags.map((tag, idx) => {
                  return <StyledPill key={idx}>{tag}</StyledPill>
                })}
              </PillContainer>
            </TutorialCard>
          )
        })}
      </TutorialContainer>
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
          published
        }
        timeToRead
      }
    }
    allTags: allMdx {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
  }
`
