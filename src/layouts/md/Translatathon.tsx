import { ReactNode } from "react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, SharedFrontmatter } from "@/lib/interfaces"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import Card from "@/components/Card"
import { ContentHero, ContentHeroProps } from "@/components/Hero"
import { Image } from "@/components/Image"
import { ApplyNow } from "@/components/Translatathon/ApplyNow"
import { DatesAndTimeline } from "@/components/Translatathon/DatesAndTimeline"
import PaperformCallToAction from "@/components/Translatathon/PaperformCallToAction"
import { StepByStepInstructions } from "@/components/Translatathon/StepByStepInstructions"
import { TranslatathonCalendar } from "@/components/Translatathon/TranslatathonCalendar"
import { TranslatathonInANutshell } from "@/components/Translatathon/TranslatathonInANutshell"
import TranslatathonPrizes from "@/components/Translatathon/TranslatathonPrizes"
import { Flex } from "@/components/ui/flex"

import { ContentLayout } from "../ContentLayout"

import WhyWeDoItImage from "@/public/images/translatathon/man-baby-woman.png"
import HowDoesItWorkImage from "@/public/images/translatathon/round-table.png"
import robotImage from "@/public/images/wallet.png"

const ContentSplit = ({ children }) => {
  return (
    <Flex className="w-full flex-col md:flex-row">
      <div>{children}</div>
      <Flex className="max-h-[300px]">
        <Image src={robotImage} alt="robot" className="object-contain" />
      </Flex>
    </Flex>
  )
}

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    className="mt-8 w-full flex-col items-stretch gap-8 md:flex-row lg:me-8"
    {...props}
  />
)

const WhyWeDoItColumn = (props: ChildOnlyProp) => (
  <Flex className="my-auto w-full flex-col lg:m-0 lg:me-8">
    <div className="mx-auto h-[272px]">
      <Image src={WhyWeDoItImage} alt="" className="h-[272px]" />
    </div>
    <div>{props.children}</div>
  </Flex>
)

const HowDoesItWorkColumn = (props: ChildOnlyProp) => (
  <Flex className="my-auto w-full flex-col lg:m-0 lg:ms-8">
    <div className="mx-auto h-[272px]">
      <Image src={HowDoesItWorkImage} alt="" className="h-[272px]" />
    </div>
    <div>{props.children}</div>
  </Flex>
)

const CardContent = (props: ChildOnlyProp) => (
  <Flex className="my-auto w-full flex-1 flex-col rounded border border-body-light px-8 pb-8 lg:m-0">
    {props.children}
  </Flex>
)

const CardContainer = (props: ChildOnlyProp) => (
  <div className="mb-20 mt-8 grid grid-cols-[repeat(auto-fill,_minmax(100%,_280px),_1fr)] gap-8 lg:mt-0">
    {props.children}
  </div>
)

const EmojiCard = ({ emoji, title, description }) => (
  <Card
    emoji={emoji}
    title={title}
    description={description}
    className="flex-[1_1_30%] p-6"
  />
)

// Translatathon layout components
export const translatathonComponents = {
  // Export empty object if none needed
  ApplyNow,
  CardContainer,
  CardContent,
  ContentSplit,
  DatesAndTimeline,
  EmojiCard,
  HowDoesItWorkColumn,
  StepByStepInstructions,
  TranslatathonCalendar,
  TranslatathonInANutshell,
  TranslatathonPrizes,
  TwoColumnContent,
  WhyWeDoItColumn,
}

type TranslatathonLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    "slug" | "tocItems" | "contributors" | "lastEditLocaleTimestamp"
  > & {
    frontmatter: SharedFrontmatter
  }

export const TranslatathonLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contributors,
  lastEditLocaleTimestamp,
}: TranslatathonLayoutProps) => {
  const dropdownLinks: ButtonDropdownList = {
    text: "Translatathon menu",
    ariaLabel: "Translatathon menu",
    items: [
      {
        text: "Translatathon",
        href: "/contributing/translation-program/translatathon",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon translatathon hub",
        },
      },
      {
        text: "Details and submission criteria",
        href: "/contributing/translation-program/translatathon/details",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon details and submission criteria",
        },
      },
      {
        text: "Terms and conditions",
        href: "/contributing/translation-program/translatathon/terms-and-conditions",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon terms and conditions",
        },
      },
    ],
  }

  const heroProps = {
    ...frontmatter,
    breadcrumbs: { slug, startDepth: 1 },
    heroImg: "/images/heroes/translatathon-hero.svg",
    blurDataURL: "",
    description: (
      <>
        <p>Welcome to the Translatathon!</p>
        <p>
          A translation competition where you can compete for prizes
          by translating ethereum.org and other content into different
          languages.
        </p>
      </>
    ),
    buttons: [
      {
        content: (
          <PaperformCallToAction content="Apply to translate" variant="solid" />
        ) as ReactNode,
      },
    ],
  } satisfies ContentHeroProps

  return (
    <>
      <ContentLayout
        dir="ltr"
        tocItems={tocItems}
        dropdownLinks={dropdownLinks}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        heroSection={<ContentHero {...heroProps} />}
      >
        {children}
      </ContentLayout>
    </>
  )
}
