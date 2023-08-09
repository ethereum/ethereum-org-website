// Libraries
import React, { useEffect, useMemo, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Badge,
  Button,
  chakra,
  forwardRef,
  Box,
  Flex,
  Heading,
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

const FilterTag = forwardRef<{ isActive: boolean; name: string }, "button">(
  (props, ref) => {
    const { isActive, name, ...rest } = props
    return (
      <chakra.button
        ref={ref}
        bg="none"
        bgImage="radial-gradient(46.28% 66.31% at 66.95% 58.35%,rgba(127, 127, 213, 0.2) 0%,rgba(134, 168, 231, 0.2) 50%,rgba(145, 234, 228, 0.2) 100%)"
        border="1px"
        borderColor={isActive ? "primary300" : "white800"}
        borderRadius="base"
        boxShadow={!isActive ? "table" : undefined}
        color="text"
        fontSize="sm"
        lineHeight={1.2}
        opacity={isActive ? 1 : 0.7}
        p={2}
        textTransform="uppercase"
        _hover={{
          color: "primary.base",
          borderColor: "text200",
          opacity: "1",
        }}
        {...rest}
      >
        {name}
      </chakra.button>
    )
  }
)

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
  const cardBoxShadow = useToken("colors", "cardBoxShadow")
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
      <Heading
        fontStyle="normal"
        fontWeight="semibold"
        fontFamily="monospace"
        textTransform="uppercase"
        fontSize="2rem"
        lineHeight="140%"
        textAlign="center"
        mt={{ base: 4, sm: 0 }}
        mx={{ base: 4, sm: 0 }}
        mb={{ base: 4, sm: "1.625rem" }}
      >
        <Translation id="page-tutorial-title" />
      </Heading>
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
        <Heading fontSize="2rem" lineHeight="1.4" mt={0} mb={4}>
          <Translation id="page-tutorial-submit-btn" />
        </Heading>
        <Text>
          <Translation id="page-tutorial-listing-policy-intro" />{" "}
          <Link to="/contributing/content-resources/">
            <Translation id="page-tutorial-listing-policy" />
          </Link>
        </Text>
        <Text>
          <Translation id="page-tutorial-submit-tutorial" />
        </Text>
        <Flex
          flexDirection={{ base: "column", md: "initial" }}
          maxH={{ base: 64, md: "initial" }}
          overflowY={{ base: "scroll", md: "initial" }}
        >
          <Flex
            borderWidth="1px"
            borderStyle="solid"
            borderColor="border"
            borderRadius="base"
            p={4}
            flexDirection="column"
            w={{ base: "full", md: "50%" }}
            justifyContent="space-between"
            mt={2}
            mb={{ base: 2, md: 6 }}
            ml={0}
            mr={{ base: 0, md: 2 }}
          >
            <Text as="b">
              <Translation id="page-tutorial-new-github" />
            </Text>
            <Text>
              <Translation id="page-tutorial-new-github-desc" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
            >
              <Translation id="page-tutorial-raise-issue-btn" />
            </ButtonLink>
          </Flex>
          <Flex
            borderWidth="1px"
            borderStyle="solid"
            borderColor="border"
            borderRadius="base"
            p={4}
            flexDirection="column"
            w={{ base: "full", md: "50%" }}
            justifyContent="space-between"
            mt={2}
            mb={{ base: 2, md: 6 }}
            ml={0}
            mr={{ base: 0, md: 2 }}
          >
            <Text as="b">
              <Translation id="page-tutorial-pull-request" />
            </Text>
            <Text>
              <Translation id="page-tutorial-pull-request-desc-1" />{" "}
              <code>
                <Translation id="page-tutorial-pull-request-desc-2" />
              </code>{" "}
              <Translation id="page-tutorial-pull-request-desc-3" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              to="https://github.com/ethereum/ethereum-org-website/new/dev/src/content/developers/tutorials"
            >
              <Translation id="page-tutorial-pull-request-btn" />
            </ButtonLink>
          </Flex>
        </Flex>
      </Modal>

      <Button
        variant="outline"
        color="text"
        borderColor="text"
        _hover={{
          color: "primary.base",
          borderColor: "primary.base",
          boxShadow: cardBoxShadow,
        }}
        _active={{
          bg: "secondaryButtonBackgroundActive",
        }}
        py={2}
        px={3}
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
        boxShadow={tableBoxShadow}
        mb={8}
        mt={8}
        w={{ base: "full", md: "66%" }}
      >
        <Flex
          justifyContent="center"
          m={8}
          pb={{ base: 4, md: 8 }}
          pt={{ base: 4, md: "initial" }}
          px={{ base: 0, md: "initial" }}
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="border"
          flexDirection={{ base: "column", md: "initial" }}
        >
          <Flex
            flexWrap="wrap"
            alignItems="center"
            gap={2}
            maxW={{ base: "full", md: "initial" }}
            mb={{ base: 4, md: "initial" }}
          >
            {Object.entries(allTags).map(([tagName, tagCount]) => {
              const name = `${tagName} (${tagCount})`
              const isActive = selectedTags.includes(tagName)
              return (
                <FilterTag
                  onClick={() => handleTagSelect(tagName)}
                  {...{ name, isActive }}
                />
              )
            })}
            {selectedTags.length > 0 && (
              <Button
                color="primary.base"
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
          </Flex>
        </Flex>
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
                boxShadow: "0 0 1px var(--eth-colors-primary-base)",
                bg: "tableBackgroundHover",
              }}
              key={tutorial.to}
              to={tutorial.to ?? undefined}
              hideArrow
            >
              <Flex
                justifyContent="space-between"
                mb={{ base: 8, md: -4 }}
                alignItems="flex-start"
                flexDirection={{ base: "column", md: "initial" }}
              >
                <Text
                  color="text"
                  fontWeight="semibold"
                  fontSize="2xl"
                  mr={{ base: 0, md: 24 }}
                  _after={{
                    ml: 0.5,
                    mr: "0.3rem",
                    display: tutorial.isExternal ? "inline" : "none",
                    content: `"↗"`,
                    transitionProperty: "all",
                    transitionDuration: "0.1s",
                    transitionTimingFunction: "ease-in-out",
                    fontStyle: "normal",
                  }}
                >
                  {tutorial.title}
                </Text>
                <Badge variant="secondary">
                  <Translation id={getSkillTranslationId(tutorial.skill!)} />
                </Badge>
              </Flex>
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
                    <Box as="span" color="primary.base" cursor="pointer">
                      <Translation id="page-tutorial-external-link" />
                    </Box>
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
