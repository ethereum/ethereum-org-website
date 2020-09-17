import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { Twemoji } from "react-emoji-render"

import Pill from "./Pill"
import Link from "./Link"
import { getLocaleTimestamp } from "../utils/time"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    border-bottom: 0px;
  }
`

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: -1rem;
  margin-bottom: 2rem;
`

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const TagPill = styled(Pill)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`
const SkillPill = styled(Pill)`
  align-self: flex-start;
  margin-bottom: 0.5rem;
`

const HorizontalContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  margin-top: -1rem;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
  justify-content: flex-start;
`

const DataContainer = styled.div`
  margin-right: 1rem;
`

const IconEmoji = styled(Twemoji)`
  margin-right: 0.2rem;
`

const TutorialContributors = ({ tutorial }) => {
  const intl = useIntl()

  const frontmatter = tutorial.frontmatter
  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author

  return (
    <Container>
      <TagsContainer>
        <PillContainer>
          {frontmatter.tags.map((tag, idx) => {
            return <TagPill key={idx}>{tag}</TagPill>
          })}
        </PillContainer>
        <SkillPill isSecondary={true}>{frontmatter.skill}</SkillPill>
      </TagsContainer>
      <HorizontalContainer>
        {author && (
          <DataContainer>
            <IconEmoji svg text=":writing_hand:" /> {author}
          </DataContainer>
        )}
        {hasSource && (
          <DataContainer>
            <IconEmoji svg text=":books:" />{" "}
            <Link to={frontmatter.sourceUrl}>{frontmatter.source}</Link>
          </DataContainer>
        )}
        {published && (
          <DataContainer>
            <IconEmoji svg text=":calendar:" />{" "}
            {getLocaleTimestamp(intl.locale, published)}
          </DataContainer>
        )}
        <DataContainer>
          <IconEmoji svg text=":stopwatch:" /> {tutorial.timeToRead} minute read
        </DataContainer>
      </HorizontalContainer>
    </Container>
  )
}

export default TutorialContributors
