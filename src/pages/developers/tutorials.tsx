import { useEffect, useMemo, useState } from "react"
import { GetStaticProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"
import {
  Badge,
  Box,
  chakra,
  Flex,
  forwardRef,
  Heading,
  useToken,
} from "@chakra-ui/react"

import { BasePageProps, Lang } from "@/lib/types"

import { Button, ButtonLink } from "@/components/Buttons"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import InlineLink, { BaseLink } from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import Modal from "@/components/Modal"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { getSkillTranslationId, Skill } from "@/components/TutorialMetadata"
import TutorialTags from "@/components/TutorialTags"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getTutorialsData } from "@/lib/utils/md"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  filterTutorialsByLang,
  getSortedTutorialTagsForLang,
} from "@/lib/utils/tutorial"

import externalTutorials from "@/data/externalTutorials.json"

import { useRtlFlip } from "@/hooks/useRtlFlip"

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

type Props = BasePageProps & {
  internalTutorials: ITutorial[]
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/tutorials"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      internalTutorials: getTutorialsData(locale!),
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<Props>

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
  href: string
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

const published = (locale: string, published: string) => {
  const localeTimestamp = getLocaleTimestamp(locale as Lang, published)

  return localeTimestamp !== "Invalid Date" ? (
    <span>
      <Emoji text=":calendar:" fontSize="sm" ms={2} me={2} />
      {localeTimestamp}
    </span>
  ) : null
}

const TutorialPage = ({
  internalTutorials,
  contentNotTranslated,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { locale } = useRouter()
  const { flipForRtl } = useRtlFlip()
  const tableBoxShadow = useToken("colors", "tableBoxShadow")
  const cardBoxShadow = useToken("colors", "cardBoxShadow")
  const filteredTutorialsByLang = useMemo(
    () =>
      filterTutorialsByLang(
        internalTutorials,
        externalTutorials,
        locale as Lang
      ),
    [internalTutorials, locale]
  )

  const allTags = useMemo(
    () => getSortedTutorialTagsForLang(filteredTutorialsByLang),
    [filteredTutorialsByLang]
  )

  const { t } = useTranslation()
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
  }, [filteredTutorialsByLang, selectedTags])

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

  const dir = contentNotTranslated ? "ltr" : "unset"
  return (
    <Flex
      as={MainArticle}
      flexDirection="column"
      alignItems="center"
      w="full"
      my={0}
      mx="auto"
      mt={16}
      dir={dir}
    >
      <PageMetadata
        title={t("page-developers-tutorials:page-tutorials-meta-title")}
        description={t(
          "page-developers-tutorials:page-tutorials-meta-description"
        )}
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
        mt={{ base: 4, sm: 0 }}
        mx={{ base: 4, sm: 0 }}
        mb={{ base: 4, sm: "1.625rem" }}
      >
        <Translation id="page-developers-tutorials:page-tutorial-title" />
      </Heading>
      <Text
        fontSize="xl"
        lineHeight="140%"
        color="text200"
        mb={4}
        textAlign="center"
      >
        <Translation id="page-developers-tutorials:page-tutorial-subtitle" />
      </Text>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        size={{ base: "full", md: "xl" }}
        contentProps={{ dir }}
        title={
          <Translation id="page-developers-tutorials:page-tutorial-submit-btn" />
        }
      >
        <Text>
          <Translation id="page-developers-tutorials:page-tutorial-listing-policy-intro" />{" "}
          <InlineLink href="/contributing/content-resources/">
            <Translation id="page-developers-tutorials:page-tutorial-listing-policy" />
          </InlineLink>
        </Text>
        <Text>
          <Translation id="page-developers-tutorials:page-tutorial-submit-tutorial" />
        </Text>
        <Flex flexDirection={{ base: "column", md: "row" }} gap="2">
          <Flex
            flex="1"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="border"
            borderRadius="base"
            p={4}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Text as="b">
              <Translation id="page-developers-tutorials:page-tutorial-new-github" />
            </Text>
            <Text>
              <Translation id="page-developers-tutorials:page-tutorial-new-github-desc" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
            >
              <Translation id="page-developers-tutorials:page-tutorial-raise-issue-btn" />
            </ButtonLink>
          </Flex>
          <Flex
            flex="1"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="border"
            borderRadius="base"
            p={4}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Text as="b">
              <Translation id="page-developers-tutorials:page-tutorial-pull-request" />
            </Text>
            <Text>
              <Translation id="page-developers-tutorials:page-tutorial-pull-request-desc-1" />{" "}
              <code>
                <Translation id="page-developers-tutorials:page-tutorial-pull-request-desc-2" />
              </code>{" "}
              <Translation id="page-developers-tutorials:page-tutorial-pull-request-desc-3" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              href="https://github.com/ethereum/ethereum-org-website/new/dev/src/content/developers/tutorials"
            >
              <Translation id="page-developers-tutorials:page-tutorial-pull-request-btn" />
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
        <Translation id="page-developers-tutorials:page-tutorial-submit-btn" />
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
            {Object.entries(allTags).map(([tagName, tagCount], idx) => {
              const name = `${tagName} (${tagCount})`
              const isActive = selectedTags.includes(tagName)
              return (
                <FilterTag
                  key={idx}
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
                <Translation id="page-developers-tutorials:page-find-wallet-clear" />
              </Button>
            )}
          </Flex>
        </Flex>
        {filteredTutorials.length === 0 && (
          <Box mt={0} textAlign="center" padding={12}>
            <Emoji text=":crying_face:" fontSize="5xl" mb={8} mt={8} />
            <OldHeading>
              <Translation id="page-developers-tutorials:page-tutorial-tags-error" />
            </OldHeading>
            <Text>
              <Translation id="page-developers-tutorials:page-find-wallet-try-removing" />
            </Text>
          </Box>
        )}
        {filteredTutorials.map((tutorial) => {
          return (
            <Flex
              as={BaseLink}
              textDecoration="none"
              flexDirection="column"
              justifyContent="space-between"
              fontWeight="normal"
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
              key={tutorial.href}
              href={tutorial.href ?? undefined}
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
                  me={{ base: 0, md: 24 }}
                  _after={{
                    ms: 0.5,
                    me: "0.3rem",
                    display: tutorial.isExternal ? "inline-block" : "none",
                    content: `"↗"`,
                    transform: flipForRtl,
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
                <Emoji text=":writing_hand:" fontSize="sm" me={2} />
                {tutorial.author}
                {tutorial.published ? (
                  <> •{published(locale!, tutorial.published!)}</>
                ) : null}
                {tutorial.timeToRead && (
                  <>
                    {" "}
                    •
                    <Emoji text=":stopwatch:" fontSize="sm" mx={2} />
                    {tutorial.timeToRead}{" "}
                    <Translation id="page-developers-tutorials:page-tutorial-read-time" />
                  </>
                )}
                {tutorial.isExternal && (
                  <>
                    {" "}
                    •<Emoji text=":link:" fontSize="sm" mx={2} />
                    <Box as="span" color="primary.base" cursor="pointer">
                      <Translation id="page-developers-tutorials:page-tutorial-external-link" />
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

export default TutorialPage
