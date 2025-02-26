import React, {
  type ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react"
import { GetStaticProps, InferGetServerSidePropsType } from "next"
import { useLocale } from "next-intl"
import { FaGithub } from "react-icons/fa"

import { BasePageProps, Lang, Params } from "@/lib/types"

import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { getSkillTranslationId, Skill } from "@/components/TutorialMetadata"
import TutorialTags from "@/components/TutorialTags"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import Modal from "@/components/ui/dialog-modal"
import { Flex, FlexProps } from "@/components/ui/flex"
import { Tag, TagButton } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
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

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"

type Props = BasePageProps & {
  internalTutorials: ITutorial[]
}

type LinkFlexProps = FlexProps & {
  href: string
}

const FilterTag = forwardRef<
  HTMLButtonElement,
  { isActive: boolean; name: string } & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { isActive, name, ...rest } = props
  return (
    <TagButton
      ref={ref}
      variant={isActive ? "solid" : "outline"}
      status={isActive ? "tag" : "normal"}
      className="justify-center"
      {...rest}
    >
      {name}
    </TagButton>
  )
})

FilterTag.displayName = "FilterTag"

const Text = ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

const LinkFlex = ({ href, children, ...props }: LinkFlexProps) => {
  return (
    <Flex asChild {...props}>
      <a href={href}>{children}</a>
    </Flex>
  )
}

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/tutorials"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale!, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      internalTutorials: getTutorialsData(locale!),
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<Props, Params>

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
      <Emoji text=":calendar:" className="me-2 ms-2 text-sm" />
      {localeTimestamp}
    </span>
  ) : null
}

const TutorialPage = ({
  internalTutorials,
  contentNotTranslated,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const locale = useLocale()
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

  const modalSize = useBreakpointValue({ base: "xl", md: "md" } as const)
  return (
    <MainArticle
      className={`mx-auto my-0 mt-16 flex w-full flex-col items-center ${dir}`}
    >
      <PageMetadata
        title={t("page-developers-tutorials:page-tutorials-meta-title")}
        description={t(
          "page-developers-tutorials:page-tutorials-meta-description"
        )}
      />
      <h1 className="no-italic mb-4 text-center font-monospace text-[2rem] font-semibold uppercase leading-[1.4] max-sm:mx-4 max-sm:mt-4 sm:mb-[1.625rem]">
        <Translation id="page-developers-tutorials:page-tutorial-title" />
      </h1>
      <Text className="mb-4 text-center leading-xs text-body-medium">
        <Translation id="page-developers-tutorials:page-tutorial-subtitle" />
      </Text>

      <Modal
        open={isModalOpen}
        onOpenChange={(open) => setModalOpen(open)}
        size={modalSize}
        contentProps={{ dir }}
        title={
          <Translation id="page-developers-tutorials:page-tutorial-submit-btn" />
        }
      >
        <Text>
          <Translation id="page-developers-tutorials:page-tutorial-listing-policy-intro" />
        </Text>
        <Flex className="flex-col gap-2 md:flex-row">
          <Flex className="w-full flex-col justify-between rounded-sm border border-border p-4">
            <b>
              <Translation id="page-developers-tutorials:page-tutorial-create-an-issue" />
            </b>
            <Text>
              <Translation id="page-developers-tutorials:page-tutorial-create-an-issue-desc" />
            </Text>
            <ButtonLink
              variant="outline"
              href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
            >
              <FaGithub />
              <Translation id="page-developers-tutorials:page-tutorial-raise-issue-btn" />
            </ButtonLink>
          </Flex>
        </Flex>
      </Modal>

      <Button
        className="px-3 py-2 text-body"
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
        <Translation id="page-developers-tutorials:page-tutorial-submit-btn" />
      </Button>

      <div className="my-8 w-full shadow-table-box md:w-2/3">
        <Flex className="m-8 flex-col justify-center border-b border-border px-0 pb-4 pt-4 md:pb-8">
          <Flex className="mb-4 max-w-full flex-wrap items-center gap-2">
            <div className="flex w-full flex-wrap gap-2 lg:grid lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 2xl:grid-cols-5">
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
            </div>
            {selectedTags.length > 0 && (
              <Button
                className="cursor-pointer p-0 text-primary underline"
                variant="ghost"
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
          <div className="mt-0 p-12 text-center">
            <Emoji text=":crying_face:" className="my-8 text-5xl" />
            <h2 className="mb-8 mt-12 leading-xs">
              <Translation id="page-developers-tutorials:page-tutorial-tags-error" />
            </h2>
            <Text>
              <Translation id="page-developers-tutorials:page-find-wallet-try-removing" />
            </Text>
          </div>
        )}
        {filteredTutorials.map((tutorial) => {
          return (
            <LinkFlex
              className="mb-px w-full flex-col justify-between border-b p-8 text-border no-underline duration-100 hover:bg-background-highlight"
              key={tutorial.href}
              href={tutorial.href ?? undefined}
            >
              <Flex className="mb-8 flex-col items-start justify-between gap-y-4 md:-mb-4 md:flex-row">
                <Text
                  className={cn(
                    "relative me-0 text-2xl font-semibold text-body after:ml-2 after:inline-block after:italic after:transition-all after:duration-100 after:ease-in-out after:content-['↗'] md:me-24",
                    tutorial.isExternal ? "after:inline-block" : "after:hidden"
                  )}
                >
                  {tutorial.title}
                </Text>
                <Tag variant="outline">
                  <Translation id={getSkillTranslationId(tutorial.skill!)} />
                </Tag>
              </Flex>
              <Text className="mt-6 uppercase text-body-medium">
                <Emoji text=":writing_hand:" className="me-2 text-sm" />
                {tutorial.author}
                {tutorial.published ? (
                  <> •{published(locale!, tutorial.published!)}</>
                ) : null}
                {tutorial.timeToRead && (
                  <>
                    {" "}
                    •
                    <Emoji text=":stopwatch:" className="mx-2 text-sm" />
                    {tutorial.timeToRead}{" "}
                    <Translation id="page-developers-tutorials:page-tutorial-read-time" />
                  </>
                )}
                {tutorial.isExternal && (
                  <>
                    {" "}
                    •<Emoji text=":link:" className="mx-2 text-sm" />
                    <span className="cursor-pointer text-primary">
                      <Translation id="page-developers-tutorials:page-tutorial-external-link" />
                    </span>
                  </>
                )}
              </Text>
              <Text className="text-body-medium">{tutorial.description}</Text>
              <Flex className="w-full flex-wrap">
                <TutorialTags tags={tutorial.tags ?? []} />
              </Flex>
            </LinkFlex>
          )
        })}
      </div>
      <FeedbackCard />
    </MainArticle>
  )
}

export default TutorialPage
