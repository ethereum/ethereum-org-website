import React, { useState, useRef } from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Twemoji } from "react-emoji-render"
import Icon from "../../components/Icon"
import { motion } from "framer-motion"
import Button from "../../components/Button"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import Pill from "../../components/Pill"
import Tag from "../../components/Tag"
import {
  EdnPage,
  FakeButtonSecondary,
} from "../../components/SharedStyledComponents"
import { getLocaleTimestamp } from "../../utils/time"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useKeyPress } from "../../hooks/useKeyPress"

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 2em !important;
    margin-top: 2em !important;
  }
`

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

const StyledEdnPage = styled(EdnPage)`
  margin-top: 12rem;
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

const GithubButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`

const ButtonContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
`

const StyledOverlay = styled(motion.div)`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  will-change: opacity;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`

// TODO extract Modal into standalone component
const Overlay = ({ isActive }) => {
  return (
    <StyledOverlay
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1001 : -1 }}
      transition={{ duration: 0.2 }}
    />
  )
}

const ModalContainer = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  position: fixed;
  z-index: 1002;
  cursor: pointer;
  padding: 15% 1rem 0;
  width: 100%;
  height: 100%;
`

const Modal = styled.div`
  position: relative;
  padding: 1rem;
  height: auto;
  cursor: auto;
  max-height: 100%;
  max-width: 600px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgb(189, 189, 189);
  margin: 0px auto;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`

const ModalBody = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const ModalClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
`
const ModalCloseIcon = styled(Icon)`
  cursor: pointer;
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
  const ref = useRef()
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
  const [isModalOpen, setModalOpen] = useState(false)
  // Close modal on outside clicks & `Escape` keypress
  useOnClickOutside(ref, () => setModalOpen(false))
  useKeyPress(`Escape`, () => setModalOpen(false))

  const toggleModal = (e) => {
    // If user clicks on "X" icon, close modal
    if (e.target.tagName === "path") {
      setModalOpen(false)
    } else {
      setModalOpen(true)
    }
  }

  return (
    <StyledEdnPage>
      <PageMetadata
        title="Ethereum Development Tutorials"
        description="Browse and filter vetted Ethereum community tutorials by topic."
      />

      <PageTitle>Ethereum Development Tutorials</PageTitle>
      <SubSlogan>Welcome to our curated list of community tutorials.</SubSlogan>
      <Overlay isActive={isModalOpen} />
      {isModalOpen && (
        <ModalContainer>
          <Modal ref={ref}>
            <ModalContent>
              <ModalTitle>Submit a tutorial</ModalTitle>
              <p>
                First, please read our{" "}
                <Link to="https://ethereum.org/en/contributing/adding-articles/">
                  article listing policy
                </Link>
                .
              </p>
              <p>
                To submit a tutorial, you'll need to use GitHub. We welcome you
                to create an issue or a PR.
              </p>
              <ModalBody>
                <ModalOption>
                  <p>
                    <b>New to GitHub?</b>
                    <br />
                    Raise an issue – just fill in the requested information and
                    paste your tutorial.
                  </p>
                  <GithubButton
                    isSecondary
                    to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.md&title="
                  >
                    <GithubIcon name="github" /> <span>Raise issue</span>
                  </GithubButton>
                </ModalOption>
                <ModalOption>
                  <p>
                    <b>Create a PR</b>
                    <br />
                    Please follow the{" "}
                    <code>tutorials/your-tutorial-name/index.md</code> naming
                    structure.
                  </p>
                  <GithubButton
                    isSecondary
                    to="https://github.com/ethereum/ethereum-org-website/new/dev/src/content/developers/tutorials"
                  >
                    <GithubIcon name="github" />{" "}
                    <span>Create pull request</span>
                  </GithubButton>
                </ModalOption>
              </ModalBody>
            </ModalContent>
            <ModalClose onClick={toggleModal}>
              <ModalCloseIcon name="close" />
            </ModalClose>
          </Modal>
        </ModalContainer>
      )}
      <FakeButtonSecondary onClick={toggleModal}>
        Submit a tutorial
      </FakeButtonSecondary>
      <TutorialContainer>
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
                <Pill isSecondary={true}>{tutorial.skill}</Pill>
              </TitleContainer>
              <Author>
                <Twemoji svg text=":writing_hand:" /> {tutorial.author} •{" "}
                <Twemoji svg text=":calendar:" />{" "}
                {getLocaleTimestamp(intl.locale, tutorial.published)} •{" "}
                <Twemoji svg text=":stopwatch:" /> {tutorial.timeToRead} min
              </Author>
              <About>{tutorial.description}</About>
              <PillContainer>
                {tutorial.tags.map((tag, idx) => {
                  return <TagPill key={idx}>{tag}</TagPill>
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
