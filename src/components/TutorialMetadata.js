import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import CopyToClipboard from "./CopyToClipboard"
import Pill from "./Pill"
import Link from "./Link"
import TutorialTags from "./TutorialTags"
import { getLocaleTimestamp } from "../utils/time"
import { FakeLink } from "./SharedStyledComponents"
import Emoji from "./Emoji"
import Translation from "./Translation"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    border-bottom: 0px;
  }
`

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const SkillPill = styled(Pill)`
  align-self: flex-start;
  margin-bottom: 0.5rem;
`

const HorizontalContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  margin-top: -1rem;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
  justify-content: flex-start;
`

const DataContainer = styled.div`
  margin-right: 1rem;
`

const AddressContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-right: 1rem;
`

const Code = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "SFMono-Regular", monospace;
  background: ${(props) => props.theme.colors.ednBackground};
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  font-size: 14px;
  &:hover {
    background: ${(props) => props.theme.colors.primary100};
  }
`

const AllCapsTranslation = styled(Translation)`
  text-transform: uppercase;
`

const TutorialMetadata = ({ tutorial, data }) => {
  const intl = useIntl()

  const frontmatter = tutorial.frontmatter
  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author
  const address = frontmatter.address

  return (
    <Container>
      <TagsContainer>
        <PillContainer>
          <TutorialTags tags={frontmatter.tags} />
        </PillContainer>
        <SkillPill isSecondary={true}>{frontmatter.skill}</SkillPill>
      </TagsContainer>
      <HorizontalContainer>
        {author && (
          <DataContainer>
            <Emoji size={1} mr={`0.5em`} text=":writing_hand:" />
            {author}
          </DataContainer>
        )}
        {hasSource && (
          <DataContainer>
            <Emoji size={1} mr={`0.5em`} text=":books:" />
            <Link to={frontmatter.sourceUrl}>{frontmatter.source}</Link>
          </DataContainer>
        )}
        {published && (
          <DataContainer>
            <Emoji size={1} mr={`0.5em`} text=":calendar:" />
            {getLocaleTimestamp(intl.locale, published)}
          </DataContainer>
        )}
        <DataContainer>
          <Emoji size={1} mr={`0.5em`} text=":stopwatch:" />
          {tutorial.timeToRead}{" "}
          <Translation id="comp-tutorial-metadata-minute-read" />
        </DataContainer>
      </HorizontalContainer>
      <HorizontalContainer>
        {address && (
          <AddressContainer>
            <CopyToClipboard text={frontmatter.address}>
              {(isCopied) => (
                <FakeLink>
                  {!isCopied ? (
                    <Code>
                      <AllCapsTranslation id="comp-tutorial-metadata-tip-author" />{" "}
                      {frontmatter.address}
                    </Code>
                  ) : (
                    <Code>
                      <AllCapsTranslation id="comp-tutorial-metadata-tip-author" />{" "}
                      {frontmatter.address} <Translation id="copied" />
                      <Emoji
                        size={1}
                        ml={`0.5em`}
                        mr={`0.5em`}
                        text=":white_check_mark:"
                      />
                    </Code>
                  )}
                </FakeLink>
              )}
            </CopyToClipboard>
          </AddressContainer>
        )}
      </HorizontalContainer>
    </Container>
  )
}

export default TutorialMetadata
