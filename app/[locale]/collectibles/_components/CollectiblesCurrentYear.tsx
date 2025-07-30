import React from "react"
import {
  CircleCheckIcon,
  LanguagesIcon,
  MessageCircleMoreIcon,
  PencilRulerIcon,
  Zap,
} from "lucide-react"

import { Image, ImageProps } from "@/components/Image"
import Translation from "@/components/Translation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import Link, { LinkProps } from "@/components/ui/Link"
import { ListItem, OrderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"

import { BadgeWithOwned } from "./CollectiblesContent"

import useTranslation from "@/hooks/useTranslation"

const HighlightCardGrid = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid grid-cols-1 gap-6 md:grid-cols-2", className)}
    {...props}
  />
)

const HighlightCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Card
    className={cn(
      "space-between flex flex-col overflow-hidden border border-background-highlight",
      className
    )}
    {...props}
  />
)

type HighlightCardContentProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className"
> &
  Pick<LinkProps, "href"> &
  Pick<ImageProps, "src" | "alt">

const HighlightCardBody = ({
  href,
  src,
  alt,
  className,
  children,
}: HighlightCardContentProps) => (
  <div className={cn("flex flex-1 gap-4 p-4 ring", className)}>
    <Link href={href} hideArrow>
      <Image
        src={src}
        width={500}
        height={500}
        alt={alt}
        className="w-32 md:w-40"
      />
    </Link>
    <div className="w-full">{children}</div>
  </div>
)

type HighlightCardFooterProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<LinkProps, "href">

const HighlightCardFooter = ({
  className,
  href,
  children,
  ...props
}: HighlightCardFooterProps) => (
  <div
    className={cn(
      "flex items-center gap-1 bg-background-highlight px-6 py-2",
      className
    )}
    {...props}
  >
    <Zap className="size-4 fill-primary text-primary" />
    <Link href={href} className="text-sm font-bold no-underline">
      {children}
    </Link>
  </div>
)

type CollectiblesCurrentYearProps = {
  badges: BadgeWithOwned[]
  address?: `0x${string}`
}

const CollectiblesCurrentYear: React.FC<CollectiblesCurrentYearProps> = ({
  badges,
  address,
}) => {
  const { t } = useTranslation("page-collectibles")

  const socialBadges = badges.filter((b) => b.category === "Events/Calls")
  const developerBadge = badges.find(
    (b) => b.category === "Github" && b.name.startsWith("1 PR merged")
  )
  const developer5Badge = badges.find(
    (b) => b.category === "Github" && b.name.startsWith("5 PRs merged")
  )
  const developer10Badge = badges.find(
    (b) => b.category === "Github" && b.name.startsWith("10 PRs merged")
  )
  const writingBadge = badges.find(
    (b) => b.category === "Github" && b.name.startsWith("Content contributor")
  )
  const designBadge = badges.find(
    (b) => b.category === "Design" && b.name.startsWith("Design contributor")
  )
  const userTestingBadge = badges.find(
    (b) => b.category === "Design" && b.name.startsWith("User testing")
  )
  const gitpoapBadge = badges.find(
    (b) => b.category === "Github" && b.name.startsWith("GitPOAP")
  )
  const translationBadge = badges.find(
    (b) =>
      b.category === "Translation" && b.name.startsWith("250 words translated")
  )
  const translation1kBadge = badges.find(
    (b) =>
      b.category === "Translation" &&
      b.name.startsWith("1,000 words translated")
  )
  const translation10kBadge = badges.find(
    (b) =>
      b.category === "Translation" &&
      b.name.startsWith("10,000 words translated")
  )
  const translation50kBadge = badges.find(
    (b) =>
      b.category === "Translation" &&
      b.name.startsWith("50,000 words translated")
  )

  return (
    <section className="mx-auto space-y-8 p-2">
      {/* Custom Code & Content block */}
      <div>
        <div className="flex items-center gap-2">
          <PencilRulerIcon className="h-6 w-auto" />
          <h3 className="text-2xl">
            {t("page-collectibles-code-content-title")}
          </h3>
        </div>
        <p className="mt-2">{t("page-collectibles-code-content-desc")}</p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="mt-4">
            <AccordionTrigger className="w-full justify-start !border-none !px-0 py-2 font-bold hover:bg-transparent [&[data-state=open]]:bg-transparent">
              {t("page-collectibles-instructions-label")}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <OrderedList className="mb-0 ms-3">
                <ListItem>
                  <Translation
                    id="page-collectibles-code-content-instructions-1"
                    ns="page-collectibles"
                  />
                </ListItem>
                <ListItem>
                  {t("page-collectibles-code-content-instructions-2")}
                </ListItem>
                <ListItem className="mb-0">
                  {t("page-collectibles-code-content-instructions-3")}
                </ListItem>
              </OrderedList>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <HighlightCardGrid className="mt-4">
          {/* First row: Developer & Writing */}
          {/* Developer */}
          {developerBadge && (
            <HighlightCard>
              <HighlightCardBody
                className={cn(
                  address && !developerBadge.owned && "[&_img]:grayscale"
                )}
                src={developerBadge.image}
                alt="Developer"
                href={developerBadge.link}
              >
                <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base dark:text-white">
                  {t("page-collectibles-code-content-developer-title")}
                </div>
                <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm dark:text-gray-300">
                  {t("page-collectibles-code-content-developer-desc")}
                </div>
                <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs dark:text-gray-400">
                  <li className="mb-1">
                    <CircleCheckIcon
                      className={`mr-2 inline h-4 w-auto align-middle ${developerBadge.owned ? "text-green-500" : "text-gray-300"}`}
                    />
                    {t("page-collectibles-code-content-developer-1pr")}
                  </li>
                  {developer5Badge && (
                    <li className="mb-1">
                      <CircleCheckIcon
                        className={`mr-2 inline h-4 w-auto align-middle ${developer5Badge.owned ? "text-green-500" : "text-gray-300"}`}
                      />
                      {t("page-collectibles-code-content-developer-5pr")}
                    </li>
                  )}
                  {developer10Badge && (
                    <li className="mb-1">
                      <CircleCheckIcon
                        className={`mr-2 inline h-4 w-auto align-middle ${developer10Badge.owned ? "text-green-500" : "text-gray-300"}`}
                      />
                      {t("page-collectibles-code-content-developer-10pr")}
                    </li>
                  )}
                </ul>
              </HighlightCardBody>
              <HighlightCardFooter href="https://github.com/ethereum/ethereum-org-website/issues">
                {t("page-collectibles-get-started")}
              </HighlightCardFooter>
            </HighlightCard>
          )}
          {/* Writing */}
          {writingBadge && (
            <HighlightCard>
              <HighlightCardBody
                className={cn(
                  address && !writingBadge.owned && "[&_img]:grayscale"
                )}
                src={writingBadge.image}
                alt="Developer"
                href={writingBadge.link}
              >
                <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base dark:text-white">
                  {t("page-collectibles-code-content-writing-title")}
                </div>
                <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm dark:text-gray-300">
                  {t("page-collectibles-code-content-writing-desc")}
                </div>
                <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs dark:text-gray-400">
                  <li className="mb-1">
                    <CircleCheckIcon
                      className={`mr-2 inline h-4 w-auto align-middle ${writingBadge.owned ? "text-green-500" : "text-gray-300"}`}
                    />
                    {t("page-collectibles-code-content-writing-1pr")}
                  </li>
                </ul>
              </HighlightCardBody>
              <HighlightCardFooter href="/contributing/#how-to-update-content">
                {t("page-collectibles-get-started")}
              </HighlightCardFooter>
            </HighlightCard>
          )}
          {/* Design */}
          {designBadge && userTestingBadge && (
            <HighlightCard>
              <HighlightCardBody
                className={cn(
                  address &&
                    !designBadge.owned &&
                    !userTestingBadge.owned &&
                    "[&_img]:grayscale"
                )}
                src={designBadge.image}
                alt="Developer"
                href={designBadge.link}
              >
                <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base dark:text-white">
                  {t("page-collectibles-code-content-design-title")}
                </div>
                <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm dark:text-gray-300">
                  {t("page-collectibles-code-content-design-desc")}
                </div>
                <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs dark:text-gray-400">
                  <li className="mb-1">
                    <CircleCheckIcon
                      className={`mr-2 inline h-4 w-auto align-middle ${designBadge.owned ? "text-green-500" : "text-gray-300"}`}
                    />
                    {t("page-collectibles-code-content-design-1issue")}
                  </li>
                  <li className="mb-1">
                    <CircleCheckIcon
                      className={`mr-2 inline h-4 w-auto align-middle ${userTestingBadge.owned ? "text-green-500" : "text-gray-300"}`}
                    />
                    {t("page-collectibles-code-content-design-user-testing")}
                  </li>
                </ul>
              </HighlightCardBody>
              <HighlightCardFooter href="/contributing/design/">
                {t("page-collectibles-get-started")}
              </HighlightCardFooter>
            </HighlightCard>
          )}
          {/* GitPOAP */}
          {gitpoapBadge && (
            <HighlightCard>
              <HighlightCardBody
                className={cn(
                  address && !gitpoapBadge.owned && "[&_img]:grayscale"
                )}
                src={gitpoapBadge.image}
                alt="Developer"
                href={gitpoapBadge.link}
              >
                <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base dark:text-white">
                  {t("page-collectibles-code-content-gitpoap-title")}
                </div>
                <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm dark:text-gray-300">
                  {t("page-collectibles-code-content-gitpoap-desc")}
                </div>
                <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs dark:text-gray-400">
                  <li className="mb-1">
                    <CircleCheckIcon
                      className={`mr-2 inline h-4 w-auto align-middle ${gitpoapBadge.owned ? "text-green-500" : "text-gray-300"}`}
                    />
                    {t("page-collectibles-code-content-gitpoap-1pr")}
                  </li>
                </ul>
              </HighlightCardBody>
              <HighlightCardFooter href="https://github.com/ethereum/ethereum-org-website/issues">
                {t("page-collectibles-get-started")}
              </HighlightCardFooter>
            </HighlightCard>
          )}
        </HighlightCardGrid>
      </div>

      {/* Translations section */}
      {translationBadge && (
        <div>
          <div className="flex items-center gap-2">
            <LanguagesIcon className="h-6 w-auto" />
            <h3 className="text-2xl">
              {t("page-collectibles-translations-title")}
            </h3>
          </div>

          <p className="mt-2">{t("page-collectibles-translations-desc")}</p>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="mt-4">
              <AccordionTrigger className="w-full justify-start !border-none !px-0 py-2 font-bold hover:bg-transparent [&[data-state=open]]:bg-transparent">
                {t("page-collectibles-instructions-label")}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <OrderedList className="mb-0 ms-3">
                  <ListItem>
                    <Translation
                      id="page-collectibles-translations-instructions-1"
                      ns="page-collectibles"
                    />
                  </ListItem>
                  <ListItem>
                    {t("page-collectibles-translations-instructions-2")}
                  </ListItem>
                  <ListItem className="mb-0">
                    {t("page-collectibles-translations-instructions-3")}
                  </ListItem>
                </OrderedList>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <HighlightCardGrid className="mt-4">
            <HighlightCard>
              <HighlightCardBody
                href={translationBadge.link}
                src={translationBadge.image}
                alt="Translations"
                className={cn(
                  address && !translationBadge.owned && "[&_img]:grayscale"
                )}
              >
                <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base dark:text-white">
                  {t("page-collectibles-translations-title")}
                </div>
                <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm dark:text-gray-300">
                  {t("page-collectibles-translations-badge-desc")}
                </div>
                <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs dark:text-gray-400">
                  <li className="mb-1">
                    <CircleCheckIcon
                      className={`mr-2 inline h-4 w-auto align-middle ${translationBadge.owned ? "text-green-500" : "text-gray-300"}`}
                    />
                    {t("page-collectibles-translations-250")}
                  </li>
                  {translation1kBadge && (
                    <li className="mb-1">
                      <CircleCheckIcon
                        className={`mr-2 inline h-4 w-auto align-middle ${translation1kBadge.owned ? "text-green-500" : "text-gray-300"}`}
                      />
                      {t("page-collectibles-translations-1000")}
                    </li>
                  )}
                  {translation10kBadge && (
                    <li className="mb-1">
                      <CircleCheckIcon
                        className={`mr-2 inline h-4 w-auto align-middle ${translation10kBadge.owned ? "text-green-500" : "text-gray-300"}`}
                      />
                      {t("page-collectibles-translations-10000")}
                    </li>
                  )}
                  {translation50kBadge && (
                    <li className="mb-1">
                      <CircleCheckIcon
                        className={`mr-2 inline h-4 w-auto align-middle ${translation50kBadge.owned ? "text-green-500" : "text-gray-300"}`}
                      />
                      {t("page-collectibles-translations-50000")}
                    </li>
                  )}
                </ul>
              </HighlightCardBody>
              <HighlightCardFooter href="/contributing/translation-program/">
                {t("page-collectibles-get-started")}
              </HighlightCardFooter>
            </HighlightCard>
          </HighlightCardGrid>
        </div>
      )}

      {/* Social section */}
      <div>
        <div className="flex items-center gap-2">
          <MessageCircleMoreIcon className="h-6 w-auto" />
          <h3 className="text-2xl">{t("page-collectibles-social-title")}</h3>
        </div>

        <p className="mt-2">{t("page-collectibles-social-desc")}</p>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="mt-4">
            <AccordionTrigger className="w-full justify-start !border-none !px-0 py-2 font-bold hover:bg-transparent [&[data-state=open]]:bg-transparent">
              {t("page-collectibles-instructions-label")}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <OrderedList className="mb-0 ms-3">
                <ListItem>
                  <Translation
                    id="page-collectibles-social-instructions-1"
                    ns="page-collectibles"
                  />
                </ListItem>
                <ListItem>
                  {t("page-collectibles-social-instructions-2")}
                </ListItem>
                <ListItem className="mb-0">
                  {t("page-collectibles-social-instructions-3")}
                </ListItem>
              </OrderedList>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4 grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-2">
          {socialBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex w-full flex-col items-center rounded-xl p-4"
            >
              <a
                href={badge.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2"
              >
                <Image
                  src={badge.image}
                  width={130}
                  height={130}
                  alt={badge.name}
                  className={`h-24 w-24 md:h-32 md:w-32 ${address && !badge.owned ? "grayscale filter" : ""}`}
                />
              </a>
              <div className="mb-1 mt-1 text-center text-sm font-bold text-[#3B2C4A] md:text-base dark:text-white">
                {badge.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectiblesCurrentYear
