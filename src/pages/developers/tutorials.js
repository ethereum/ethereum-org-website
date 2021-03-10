import React, { useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import Translation from "../../components/Translation"
import { translateMessageId } from "../../utils/translations"
import Icon from "../../components/Icon"
import ButtonLink from "../../components/ButtonLink"
import Link from "../../components/Link"
import Modal from "../../components/Modal"
import PageMetadata from "../../components/PageMetadata"
import Pill from "../../components/Pill"
import Tag from "../../components/Tag"
import TutorialTags from "../../components/TutorialTags"
import Emoji from "../../components/Emoji"
import { Page, ButtonSecondary } from "../../components/SharedStyledComponents"

import { getLocaleTimestamp } from "../../utils/time"

const SubSlogan = styled.p`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 1rem;
  text-align: center;
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
  margin-top: 2rem;
  width: 66%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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
  margin: 0 0 1.625rem;
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
  margin: 2rem 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    padding: 1rem 0rem;
  }
`
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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

const GithubButton = styled(ButtonLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
`

const ModalBody = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    max-height: 16rem;
    overflow-y: scroll;
  }
`

const ModalOption = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0.5rem;
  justify-content: space-between;
  margin-left: 0rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`

const TutorialsPage = ({ data }) => {
  const intl = useIntl()

  const allTutorials = data.allTutorials.nodes.map((tutorial) => {
    return {
      to:
        tutorial.fields.slug.substr(0, 3) === "/en"
          ? tutorial.fields.slug.substr(3)
          : tutorial.fields.slug,
      title: tutorial.frontmatter.title,
      description: tutorial.frontmatter.description,
      author: tutorial.frontmatter.author,
      tags: tutorial.frontmatter.tags.map((tag) => tag.toLowerCase().trim()),
      skill: tutorial.frontmatter.skill,
      timeToRead: tutorial.timeToRead,
      published: tutorial.frontmatter.published,
    }
  })
  const allTags = data.allTags.group
  const sanitizedAllTags = Array.from(
    allTags.reduce(
      (m, { name, totalCount }) =>
        m.set(
          name.toLowerCase().trim(),
          (m.get(name.toLowerCase().trim()) || 0) + totalCount
        ),
      new Map()
    ),
    ([name, totalCount]) => ({ name, totalCount })
  ).sort((a, b) => a.name.localeCompare(b.name))

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
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <StyledPage>
      <PageMetadata
        title={translateMessageId("page-tutorials-meta-title", intl)}
        description={translateMessageId(
          "page-tutorials-meta-description",
          intl
        )}
      />

      <PageTitle>
        <Translation id="page-tutorial-title" />
      </PageTitle>
      <SubSlogan>
        <Translation id="page-tutorial-subtitle" />
      </SubSlogan>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <ModalTitle>
          <Translation id="page-tutorial-submit-btn" />
        </ModalTitle>
        <p>
          <Translation id="page-tutorial-listing-policy-intro" />{" "}
          <Link to="https://ethereum.org/en/contributing/adding-articles/">
            <Translation id="page-tutorial-listing-policy" />
          </Link>
        </p>
        <p>
          <Translation id="page-tutorial-submit-tutorial" />
        </p>
        <ModalBody>
          <ModalOption>
            <p>
              <b>
                <Translation id="page-tutorial-new-github" />
              </b>
              <br />
              <Translation id="page-tutorial-new-github-desc" />
            </p>
            <GithubButton
              isSecondary
              to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.md&title="
            >
              <GithubIcon name="github" />{" "}
              <span>
                <Translation id="page-tutorial-raise-issue-btn" />
              </span>
            </GithubButton>
          </ModalOption>
          <ModalOption>
            <p>
              <b>
                <Translation id="page-tutorial-pull-request" />
              </b>
              <br />
              <Translation id="page-tutorial-pull-request-desc-1" />{" "}
              <code>
                <Translation id="page-tutorial-pull-request-desc-2" />
              </code>{" "}
              <Translation id="page-tutorial-pull-request-desc-3" />
            </p>
            <GithubButton
              isSecondary
              to="https://github.com/ethereum/ethereum-org-website/new/dev/src/content/developers/tutorials"
            >
              <GithubIcon name="github" />{" "}
              <span>
                <Translation id="page-tutorial-pull-request-btn" />
              </span>
            </GithubButton>
          </ModalOption>
        </ModalBody>
      </Modal>
      <ButtonSecondary onClick={() => setModalOpen(true)}>
        <Translation id="page-tutorial-submit-btn" />
      </ButtonSecondary>
      <TutorialContainer>
        <TagsContainer>
          <TagContainer>
            {sanitizedAllTags.map((tag) => {
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
              <ClearLink onClick={clearActiveTags}>
                <Translation id="page-find-wallet-clear" />
              </ClearLink>
            )}
          </TagContainer>
        </TagsContainer>
        {hasNoTutorials && (
          <ResultsContainer>
            <Emoji text=":crying_face:" size={3} mb={`2em`} mt={`2em`} />
            <h2>
              <Translation id="page-tutorial-tags-error" />{" "}
              <b>
                <Translation id="page-find-wallet-yet" />
              </b>
            </h2>
            <p>
              <Translation id="page-find-wallet-try-removing" />
            </p>
          </ResultsContainer>
        )}
        {state.filteredTutorials.map((tutorial) => (
          <TutorialCard key={tutorial.to} to={tutorial.to}>
            <TitleContainer>
              <Title>{tutorial.title}</Title>
              <Pill isSecondary={true}>{tutorial.skill}</Pill>
            </TitleContainer>
            <Author>
              <Emoji text=":writing_hand:" size={1} mr={`0.5em`} />
              {tutorial.author} •
              <Emoji text=":calendar:" size={1} ml={`0.5em`} mr={`0.5em`} />
              {getLocaleTimestamp(intl.locale, tutorial.published)} •
              <Emoji text=":stopwatch:" size={1} ml={`0.5em`} mr={`0.5em`} />
              {tutorial.timeToRead} <Translation id="page-tutorial-read-time" />
            </Author>
            <About>{tutorial.description}</About>
            <PillContainer>
              <TutorialTags tags={tutorial.tags} />
            </PillContainer>
          </TutorialCard>
        ))}
      </TutorialContainer>
    </StyledPage>
  )
}
export default TutorialsPage

export const query = graphql`
  query {
    allTutorials: allMdx(
      filter: { slug: { regex: "/tutorials/" } }
      sort: { fields: frontmatter___published, order: DESC }
    ) {
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
