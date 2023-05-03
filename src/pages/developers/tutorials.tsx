// Libraries
import React, { useEffect, useMemo, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  useToken,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"

// Components
import Translation from "../../components/Translation"
import ButtonLink from "../../components/ButtonLink"
import Link from "../../components/Link"
import Modal from "../../components/Modal"
import PageMetadata from "../../components/PageMetadata"
import Tag from "../../components/Tag"
import TutorialTags from "../../components/TutorialTags"
import Emoji from "../../components/Emoji"
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

const SubSlogan = ({ children }) => {
  return (
    <Text
      fontSize="xl"
      lineHeight="140%"
      mb={4}
      textAlign="center"
      color="text200"
    >
      {children}
    </Text>
  )
}

const ModalOption = ({ children }) => {
  const borderColor = useToken("colors", "border")
  return (
    <Box
      border={`1px solid ${borderColor}`}
      borderRadius="4px"
      p={4}
      display="flex"
      flexDir="column"
      w={{ base: "100%", md: "50%" }}
      justifyContent="space-between"
      m={{ base: "0.5rem 0px", md: "0.5rem 0.5rem 1.5rem 0rem" }}
    >
      {children}
    </Box>
  )
}

const Title = ({ children, isExternal }) => {
  return (
    <Text
      color="text"
      fontWeight="semibold"
      fontSize="2xl"
      mr={{ base: "0", md: "24" }}
      _after={{
        marginLeft: 0.5,
        marginRight: "0.3em",
        display: isExternal ? "inline" : "none",
        content: '"↗"',
        transition: "all 0.1s ease-in-out",
        fontStyle: "normal",
      }}
    >
      {children}
    </Text>
  )
}

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

  const borderColor = useToken("colors", "border")
  const tableBoxShadow = useToken("colors", "tableBoxShadow")

  return (
    <Container
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={16}
      mx="auto"
    >
      <PageMetadata
        title={t("page-tutorials-meta-title")}
        description={t("page-tutorials-meta-description")}
      />
      <Heading
        as="h1"
        fontStyle="normal"
        fontWeight="semibold"
        fontFamily="monospace"
        textTransform="uppercase"
        fontSize="2rem"
        lineHeight="140%"
        textAlign="center"
        margin={{ base: "0 0 1.625rem", sm: "4" }}
      >
        <Translation id="page-tutorial-title" />
      </Heading>
      <SubSlogan>
        <Translation id="page-tutorial-subtitle" />
      </SubSlogan>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <Heading
          as="h2"
          mt={0}
          mb={4}
          fontSize={{ base: "2xl", md: "2rem" }}
          lineHeight={1.4}
          fontWeight="semibold"
        >
          <Translation id="page-tutorial-submit-btn" />
        </Heading>
        <p>
          <Translation id="page-tutorial-listing-policy-intro" />{" "}
          <Link to="/contributing/content-resources/">
            <Translation id="page-tutorial-listing-policy" />
          </Link>
        </p>
        <p>
          <Translation id="page-tutorial-submit-tutorial" />
        </p>
        <Box
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          maxH={{ base: "16rem", md: "auto" }}
          overflowY={{ base: "scroll", md: "auto" }}
        >
          <ModalOption>
            <p>
              <b>
                <Translation id="page-tutorial-new-github" />
              </b>
              <br />
              <Translation id="page-tutorial-new-github-desc" />
            </p>
            <ButtonLink
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={2}
              variant="outline"
              to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
            >
              <Icon as={FaGithub} color="text" mr={2} boxSize="24px" />{" "}
              <span>
                <Translation id="page-tutorial-raise-issue-btn" />
              </span>
            </ButtonLink>
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
            <ButtonLink
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={2}
              variant="outline"
              to="https://github.com/ethereum/ethereum-org-website/new/dev/src/content/developers/tutorials"
            >
              <Icon as={FaGithub} color="text" mr={2} boxSize="24px" />{" "}
              <span>
                <Translation id="page-tutorial-pull-request-btn" />
              </span>
            </ButtonLink>
          </ModalOption>
        </Box>
      </Modal>
      <Button
        variant="outline"
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
      </Button>
      <Box
        my={8}
        w={{ base: "100%", md: "66%" }}
        boxShadow={`${tableBoxShadow}`}
      >
        <Flex
          justifyContent="center"
          m={8}
          pb={8}
          borderBottom={`1px solid ${borderColor}`}
          flexDirection={{ base: "row", md: "column" }}
          padding={{ md: "1rem 0rem" }}
        >
          <Flex
            flexWrap="wrap"
            alignItems="center"
            mb={{ md: "4" }}
            maxW={{ md: "full" }}
          >
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
                boxShadow="none !important"
                color="primary"
                textDecoration="underline"
                variant="link"
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
          </Flex>
        </Flex>
        {filteredTutorials.length === 0 && (
          <Box mt={0} textAlign="center" p={12}>
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
          const tableItemBoxShadow = useToken("colors", "tableItemBoxShadow")
          const primary = useToken("colors", "primary")
          return (
            <Link
              key={tutorial.to}
              to={tutorial.to ?? undefined}
              hideArrow
              color="text !important"
              textDecoration="none"
              display="flex"
              flexDirection="column"
              mb="px"
              justifyContent="space-between"
              padding={8}
              boxShadow={`0 1px 1px ${tableItemBoxShadow}`}
              width="full"
              _hover={{
                textDecoration: "none",
                borderRadius: "4px",
                backgroundColor: "tableBackgroundHover",
                boxShadow: `0 0 1px ${primary}`,
              }}
            >
              <Flex
                justifyContent="space-between"
                alignItems="flex-start"
                flexDirection={{ base: "column", md: "row" }}
                mb={{ md: "-1rem", base: "2rem" }}
              >
                <Title isExternal={tutorial.isExternal}>{tutorial.title}</Title>
                <Badge variant="secondary">
                  <Translation id={getSkillTranslationId(tutorial.skill!)} />
                </Badge>
              </Flex>
              <Text color="text200" textTransform="uppercase" fontSize="sm">
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
                    <Text color="primary" cursor="pointer">
                      <Translation id="page-tutorial-external-link" />
                    </Text>
                  </>
                )}
              </Text>
              <Text color="text200">{tutorial.description}</Text>
              <Box display="flex" flexWrap="wrap" width="full">
                <TutorialTags tags={tutorial.tags ?? []} />
              </Box>
            </Link>
          )
        })}
      </Box>
      <FeedbackCard />
    </Container>
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
