"use client"

import React from "react"
import {
  CircleCheckIcon,
  LanguagesIcon,
  MessageCircleMoreIcon,
  PencilRulerIcon,
  Zap,
} from "lucide-react"

import { ChildOnlyProp } from "@/lib/types"

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
import {
  ListItem,
  ListProps,
  OrderedList,
  UnorderedList,
} from "@/components/ui/list"

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
        sizes="160px"
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

const CheckList = ({ className, ...props }: ListProps) => (
  <UnorderedList
    className={cn(
      "m-0 my-2 list-none space-y-2 text-xs text-body-medium",
      className
    )}
    {...props}
  />
)

type CheckItemProps = ChildOnlyProp & {
  owned?: boolean
}

const CheckItem = ({ children, owned }: CheckItemProps) => (
  <ListItem className="mb-0 flex items-center gap-2">
    <CircleCheckIcon
      className={cn("size-4 text-body-medium", owned && "text-success")}
    />
    {children}
  </ListItem>
)

type CollectiblesCurrentYearProps = {
  badges: BadgeWithOwned[]
  address?: `0x${string}`
}

const CollectiblesCurrentYear = ({
  badges,
  address,
}: CollectiblesCurrentYearProps) => {
  const { t } = useTranslation("page-collectibles")

  const socialBadges = React.useMemo(
    () => badges.filter((b) => b.category === "Events/Calls"),
    [badges]
  )
  const developerBadge = React.useMemo(
    () =>
      badges.find(
        (b) => b.category === "Github" && b.name.startsWith("1 PR merged")
      ),
    [badges]
  )
  const developer5Badge = React.useMemo(
    () =>
      badges.find(
        (b) => b.category === "Github" && b.name.startsWith("5 PRs merged")
      ),
    [badges]
  )
  const developer10Badge = React.useMemo(
    () =>
      badges.find(
        (b) => b.category === "Github" && b.name.startsWith("10 PRs merged")
      ),
    [badges]
  )
  const writingBadge = React.useMemo(
    () =>
      badges.find(
        (b) =>
          b.category === "Github" && b.name.startsWith("Content contributor")
      ),
    [badges]
  )
  const designBadge = React.useMemo(
    () =>
      badges.find(
        (b) =>
          b.category === "Design" && b.name.startsWith("Design contributor")
      ),
    [badges]
  )
  const userTestingBadge = React.useMemo(
    () =>
      badges.find(
        (b) => b.category === "Design" && b.name.startsWith("User testing")
      ),
    [badges]
  )
  const gitpoapBadge = React.useMemo(
    () =>
      badges.find(
        (b) => b.category === "Github" && b.name.startsWith("GitPOAP")
      ),
    [badges]
  )
  const translationBadge = React.useMemo(
    () =>
      badges.find(
        (b) =>
          b.category === "Translation" &&
          b.name.startsWith("250 words translated")
      ),
    [badges]
  )
  const translation1kBadge = React.useMemo(
    () =>
      badges.find(
        (b) =>
          b.category === "Translation" &&
          b.name.startsWith("1,000 words translated")
      ),
    [badges]
  )
  const translation10kBadge = React.useMemo(
    () =>
      badges.find(
        (b) =>
          b.category === "Translation" &&
          b.name.startsWith("10,000 words translated")
      ),
    [badges]
  )
  const translation50kBadge = React.useMemo(
    () =>
      badges.find(
        (b) =>
          b.category === "Translation" &&
          b.name.startsWith("50,000 words translated")
      ),
    [badges]
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
                <h4 className="text-lg font-bold">
                  {t("page-collectibles-code-content-developer-title")}
                </h4>
                <p>{t("page-collectibles-code-content-developer-desc")}</p>
                <CheckList>
                  <CheckItem owned={developerBadge.owned}>
                    {t("page-collectibles-code-content-developer-1pr")}
                  </CheckItem>
                  {developer5Badge && (
                    <CheckItem owned={developer5Badge.owned}>
                      {t("page-collectibles-code-content-developer-5pr")}
                    </CheckItem>
                  )}
                  {developer10Badge && (
                    <CheckItem owned={developer10Badge.owned}>
                      {t("page-collectibles-code-content-developer-10pr")}
                    </CheckItem>
                  )}
                </CheckList>
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
                <h4 className="text-lg font-bold">
                  {t("page-collectibles-code-content-writing-title")}
                </h4>
                <p>{t("page-collectibles-code-content-writing-desc")}</p>
                <CheckList>
                  <CheckItem owned={writingBadge.owned}>
                    {t("page-collectibles-code-content-writing-1pr")}
                  </CheckItem>
                </CheckList>
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
                <h4 className="text-lg font-bold">
                  {t("page-collectibles-code-content-design-title")}
                </h4>
                <p>{t("page-collectibles-code-content-design-desc")}</p>
                <CheckList>
                  <CheckItem owned={designBadge.owned}>
                    {t("page-collectibles-code-content-design-1issue")}
                  </CheckItem>
                  <CheckItem owned={userTestingBadge.owned}>
                    {t("page-collectibles-code-content-design-user-testing")}
                  </CheckItem>
                </CheckList>
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
                <h4 className="text-lg font-bold">
                  {t("page-collectibles-code-content-gitpoap-title")}
                </h4>
                <p>{t("page-collectibles-code-content-gitpoap-desc")}</p>
                <CheckList>
                  <CheckItem owned={gitpoapBadge.owned}>
                    {t("page-collectibles-code-content-gitpoap-1pr")}
                  </CheckItem>
                </CheckList>
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
                <h4 className="text-lg font-bold">
                  {t("page-collectibles-translations-title")}
                </h4>
                <p>{t("page-collectibles-translations-badge-desc")}</p>
                <CheckList>
                  <CheckItem owned={translationBadge.owned}>
                    {t("page-collectibles-translations-250")}
                  </CheckItem>
                  {translation1kBadge && (
                    <CheckItem owned={translation1kBadge.owned}>
                      {t("page-collectibles-translations-1000")}
                    </CheckItem>
                  )}
                  {translation10kBadge && (
                    <CheckItem owned={translation10kBadge.owned}>
                      {t("page-collectibles-translations-10000")}
                    </CheckItem>
                  )}
                  {translation50kBadge && (
                    <CheckItem owned={translation50kBadge.owned}>
                      {t("page-collectibles-translations-50000")}
                    </CheckItem>
                  )}
                </CheckList>
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

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-2">
          {socialBadges.map((badge) => (
            <Link key={badge.id} href={badge.link} hideArrow className="group">
              <div className="flex w-full flex-col items-center gap-4 rounded-xl p-4 text-center text-sm">
                <Image
                  src={badge.image}
                  width={130}
                  height={130}
                  alt={badge.name}
                  sizes="128px"
                  className={cn(
                    "size-24 transition-transform group-hover:scale-105 group-hover:transition-transform md:size-32",
                    address && !badge.owned && "grayscale"
                  )}
                />
                <div className="text-primary">
                  {badge.name
                    .replace(/ - ethereum.org community/, "")
                    .replace(/^ethereum.org /, "")
                    .trim()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectiblesCurrentYear
