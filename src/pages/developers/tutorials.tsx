// Libraries
import React, { useEffect, useMemo, useState } from "react"
import styled from "@emotion/styled"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import { Badge, Box, Button, Flex, Text, useToken } from "@chakra-ui/react"

// Components
import Translation from "../../components/Translation"
import Icon from "../../components/Icon"
import ButtonLink from "../../components/ButtonLink"
import Link from "../../components/Link"
import Modal from "../../components/Modal"
import PageMetadata from "../../components/PageMetadata"
import Tag from "../../components/Tag"
import TutorialTags from "../../components/TutorialTags"
import Emoji from "../../components/Emoji"
import {
  ButtonSecondary,
  FakeLink,
} from "../../components/SharedStyledComponents"
import FeedbackCard from "../../components/FeedbackCard"
import { getSkillTranslationId, Skill } from "../../components/TutorialMetadata"

// Data
import externalTutorials from "../../data/externalTutorials.json"

// Utils
import { getLocaleTimestamp, INVALID_DATETIME } from "../../utils/time"
import { Lang } from "../../utils/languages"
import {
  filterTutorialsByLang,
  getSortedTutorialTagsForLang,
} from "../../utils/tutorials"
import { trackCustomEvent } from "../../utils/matomo"

// Types
import { Context } from "../../types"

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
      <Emoji text=":calendar:" fontSize="sm" ml={2} mr={2} /> {localeTimestamp}
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
  const tableBoxShadow = useToken("colors", "tableBoxShadow")
  const filteredTutorialsByLang = useMemo(
    () =>
      filterTutorialsByLang(
        data.allTutorials.nodes,
        externalTutorials,
        pageContext.language
      ),
    [pageContext.language]
  )

  const allTags = useMemo(
    () => getSortedTutorialTagsForLang(filteredTutorialsByLang),
    [filteredTutorialsByLang]
  )

  const { t } = useTranslation()
  const { language } = useI18next()
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
      trackCustomEvent({
        eventCategory: "tutorial tags",
        eventAction: "click",
        eventName: `${tagName} remove`,
      })
    } else {
      tempSelectedTags.push(tagName)
      trackCustomEvent({
        eventCategory: "tutorial tags",
        eventAction: "click",
        eventName: `${tagName} add`,
      })
    }

    setSelectedTags([...tempSelectedTags])
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      w="full"
      my={0}
      mx="auto"
      mt={16}
    >
      <PageMetadata
        title={t("page-tutorials-meta-title")}
        description={t("page-tutorials-meta-description")}
      />
      <PageTitle>
        <Translation id="page-tutorial-title" />
      </PageTitle>
      <Text
        fontSize="xl"
        lineHeight="140%"
        color="text200"
        mb={4}
        textAlign="center"
      >
        <Translation id="page-tutorial-subtitle" />
      </Text>
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
              to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
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
      <ButtonSecondary
        onClick={() => {
          setModalOpen(true)
          trackCustomEvent({
            eventCategory: "tutorials tags",
            eventAction: "click",
            eventName: "submit",
          })
        }}
      >
        <Translation id="page-tutorial-submit-btn" />
      </ButtonSecondary>
      <Box
        boxShadow={tableBoxShadow}
        mb={8}
        mt={8}
        w={{ base: "full", md: "66%" }}
      >
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
              <Button
                color="primary"
                textDecoration="underline"
                bg="none"
                border="none"
                cursor="pointer"
                p={0}
                _hover={{
                  bg: "none",
                }}
                onClick={() => {
                  setSelectedTags([])
                  trackCustomEvent({
                    eventCategory: "tutorial tags",
                    eventAction: "click",
                    eventName: "clear",
                  })
                }}
              >
                <Translation id="page-find-wallet-clear" />
              </Button>
            )}
          </TagContainer>
        </TagsContainer>
        {filteredTutorials.length === 0 && (
          <Box mt={0} textAlign="center" padding={12}>
            <Emoji text=":crying_face:" fontSize="5xl" mb={8} mt={8} />
            <h2>
              <Translation id="page-tutorial-tags-error" />
            </h2>
            <p>
              <Translation id="page-find-wallet-try-removing" />
            </p>
          </Box>
        )}
        {filteredTutorials.map((tutorial) => {
          return (
            <Flex
              as={Link}
              textDecoration="none"
              flexDirection="column"
              justifyContent="space-between"
              color="text"
              boxShadow="0px 1px 1px var(--eth-colors-tableItemBoxShadow)"
              mb="px"
              padding={8}
              w="full"
              _hover={{
                textDecoration: "none",
                borderRadius: "base",
                boxShadow: "0 0 1px var(--eth-colors-primary)",
                bg: "tableBackgroundHover",
              }}
              key={tutorial.to}
              to={tutorial.to ?? undefined}
              hideArrow
            >
              <TitleContainer>
                <Title isExternal={tutorial.isExternal}>{tutorial.title}</Title>
                <Badge variant="secondary">
                  <Translation id={getSkillTranslationId(tutorial.skill!)} />
                </Badge>
              </TitleContainer>
              <Text color="text200" fontSize="sm" textTransform="uppercase">
                {/* TODO: Refactor each tutorial tag as a component */}
                <Emoji text=":writing_hand:" fontSize="sm" mr={2} />
                {tutorial.author} •
                {published(language, tutorial.published ?? "")}
                {tutorial.timeToRead && (
                  <>
                    {" "}
                    •
                    <Emoji text=":stopwatch:" fontSize="sm" ml={2} mr={2} />
                    {tutorial.timeToRead}{" "}
                    <Translation id="page-tutorial-read-time" />
                  </>
                )}
                {tutorial.isExternal && (
                  <>
                    {" "}
                    •<Emoji text=":link:" fontSize="sm" ml={2} mr={2} />
                    <FakeLink>
                      <Translation id="page-tutorial-external-link" />
                    </FakeLink>
                  </>
                )}
              </Text>
              <Text color="text200">{tutorial.description}</Text>
              <Flex flexWrap="wrap" w="full">
                <TutorialTags tags={tutorial.tags ?? []} />
              </Flex>
            </Flex>
          )
        })}
      </Box>
      <FeedbackCard />
    </Flex>
  )
}
export default TutorialsPage

export const query = graphql`
  query DevelopersTutorialsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-developers-tutorials", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allTutorials: allMdx(
      filter: { slug: { regex: "/tutorials/" } }
      sort: { frontmatter: { published: DESC } }
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
