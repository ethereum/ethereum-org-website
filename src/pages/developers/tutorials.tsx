import React, { useEffect, useMemo, useState } from "react"
import styled from "@emotion/styled"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"

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
import Emoji from "../../components/OldEmoji"
import {
  ButtonSecondary,
  FakeLink,
  Page,
} from "../../components/SharedStyledComponents"

import { getLocaleTimestamp, INVALID_DATETIME } from "../../utils/time"

import externalTutorials from "../../data/externalTutorials.json"
import FeedbackCard from "../../components/FeedbackCard"
import { getSkillTranslationId, Skill } from "../../components/TutorialMetadata"
import { Context } from "../../types"
import { Lang } from "../../utils/languages"
import {
  filterTutorialsByLang,
  getSortedTutorialTagsForLang,
} from "../../utils/tutorials"

const SubSlogan = styled.p`
  font-size: 1.25rem;
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
  color: #000000;
  &:hover {
    text-decoration: none;
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
  font-size: 0.875rem;
  text-transform: uppercase;
`

const Title = styled.p<{ isExternal?: boolean | null }>`
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  font-size: 1.5rem;
  margin-right: 6rem;

  &:after {
    margin-left: 0.125em;
    margin-right: 0.3em;
    display: ${(props) => (props.isExternal ? "inline" : "none")};
    content: "↗";
    transition: all 0.1s ease-in-out;
    font-style: normal;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
  }
`

const PageTitle = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 2rem;
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
    margin: 0.5rem 0;
  }
`

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`

const published = (locale: string, published: string) => {
  const localeTimestamp = getLocaleTimestamp(locale as Lang, published)
  return localeTimestamp !== INVALID_DATETIME ? (
    <span>
      <Emoji text=":calendar:" size={1} ml={`0.5em`} mr={`0.5em`} />{" "}
      {localeTimestamp}
    </span>
  ) : null
}

export interface IExternalTutorial {
  url: string
  title: string
  description: string
  author: string
  authorGithub: string
  tags: Array<string>
  skillLevel: string
  timeToRead?: string
  lang: string
  publishDate: string
}

export interface ITutorial {
  to: string
  title: string
  description: string
  author: string
  tags?: Array<string>
  skill?: Skill
  timeToRead?: number | null
  published?: string | null
  lang: string
  isExternal: boolean
}

export interface ITutorialsState {
  activeTagNames: Array<string>
  filteredTutorials: Array<ITutorial>
}

const TutorialsPage = ({
  data,
  pageContext,
}: PageProps<Queries.DevelopersTutorialsPageQuery, Context>) => {
  const filteredTutorialsByLang = useMemo(
    () =>
      filterTutorialsByLang(
        data.allTutorials.nodes,
        externalTutorials,
        pageContext.locale
      ),
    [pageContext.locale]
  )

  const allTags = useMemo(
    () => getSortedTutorialTagsForLang(filteredTutorialsByLang),
    [filteredTutorialsByLang]
  )

  const intl = useIntl()
  const [isModalOpen, setModalOpen] = useState(false)
  const [filteredTutorials, setFilteredTutorials] = useState(
    filteredTutorialsByLang
  )
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])

  useEffect(() => {
    let tutorials = filteredTutorialsByLang

    if (selectedTags.length) {
      tutorials = tutorials.filter((tutorial) => {
        return selectedTags.every((tag) => (tutorial.tags || []).includes(tag))
      })
    }

    setFilteredTutorials(tutorials)
  }, [selectedTags])

  const handleTagSelect = (tagName: string) => {
    const tempSelectedTags = selectedTags

    const index = tempSelectedTags.indexOf(tagName)
    if (index > -1) {
      tempSelectedTags.splice(index, 1)
    } else {
      tempSelectedTags.push(tagName)
    }

    setSelectedTags([...tempSelectedTags])
  }

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
          <Link to="/contributing/content-resources/">
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
              variant="outline"
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
              variant="outline"
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
            {Object.entries(allTags).map(([tagName, tagCount]) => {
              const name = `${tagName} (${tagCount})`
              const isActive = selectedTags.includes(tagName)
              return (
                <Tag
                  name={name}
                  key={name}
                  isActive={isActive}
                  shouldShowIcon={false}
                  onClick={handleTagSelect}
                  value={tagName}
                />
              )
            })}
            {selectedTags.length > 0 && (
              <ClearLink onClick={() => setSelectedTags([])}>
                <Translation id="page-find-wallet-clear" />
              </ClearLink>
            )}
          </TagContainer>
        </TagsContainer>
        {filteredTutorials.length === 0 && (
          <ResultsContainer>
            <Emoji text=":crying_face:" size={3} mb={`2em`} mt={`2em`} />
            <h2>
              <Translation id="page-tutorial-tags-error" />
            </h2>
            <p>
              <Translation id="page-find-wallet-try-removing" />
            </p>
          </ResultsContainer>
        )}
        {filteredTutorials.map((tutorial) => {
          return (
            <TutorialCard
              key={tutorial.to}
              to={tutorial.to ?? undefined}
              hideArrow
            >
              <TitleContainer>
                <Title isExternal={tutorial.isExternal}>{tutorial.title}</Title>
                <Pill isSecondary={true}>
                  <Translation id={getSkillTranslationId(tutorial.skill!)} />
                </Pill>
              </TitleContainer>
              <Author>
                {/* TODO: Refactor each tutorial tag as a component */}
                <Emoji text=":writing_hand:" size={1} mr={`0.5em`} />
                {tutorial.author} •
                {published(intl.locale, tutorial.published ?? "")}
                {tutorial.timeToRead && (
                  <>
                    {" "}
                    •
                    <Emoji
                      text=":stopwatch:"
                      size={1}
                      ml={`0.5em`}
                      mr={`0.5em`}
                    />
                    {tutorial.timeToRead}{" "}
                    <Translation id="page-tutorial-read-time" />
                  </>
                )}
                {tutorial.isExternal && (
                  <>
                    {" "}
                    •<Emoji text=":link:" size={1} ml={`0.5em`} mr={`0.5em`} />
                    <FakeLink>
                      <Translation id="page-tutorial-external-link" />
                    </FakeLink>
                  </>
                )}
              </Author>
              <About>{tutorial.description}</About>
              <PillContainer>
                <TutorialTags tags={tutorial.tags ?? []} />
              </PillContainer>
            </TutorialCard>
          )
        })}
      </TutorialContainer>
      <FeedbackCard />
    </StyledPage>
  )
}
export default TutorialsPage

export const query = graphql`
  query DevelopersTutorialsPage {
    allTutorials: allMdx(
      filter: { slug: { regex: "/tutorials/" } }
      sort: { fields: frontmatter___published, order: DESC }
    ) {
      nodes {
        fields {
          slug
          readingTime {
            minutes
          }
        }
        frontmatter {
          title
          description
          tags
          author
          skill
          published
          lang
        }
      }
    }
  }
`
