import { Link as NavigationMenuLink } from "@radix-ui/react-navigation-menu"

import type { MatomoEventOptions } from "@/lib/types"

import { ChevronNext } from "@/components/Chevron"
import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import Eyebrow from "@/components/ui/eyebrow"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { isHrefActive } from "@/lib/utils/url"

import type {
  NavFeatured,
  NavGroup,
  NavLink,
  NavSectionDetail,
  NavSectionKey,
} from "../types"
import { NAV_SECTION_ICONS } from "../useNavigation"

export type TrackLink = (href: string) => MatomoEventOptions

type HubCardProps = {
  sectionKey: NavSectionKey
  hub: NavSectionDetail["hub"]
  track: TrackLink
  className?: string
}

export const HubCard = ({
  sectionKey,
  hub,
  track,
  className,
  ...props
}: HubCardProps) => {
  const Icon = NAV_SECTION_ICONS[sectionKey]
  return (
    <Card
      href={hub.href}
      size="md"
      hoverLift={false}
      customEventOptions={track(hub.href)}
      className={cn("bg-tint-primary", className)}
      {...props}
    >
      <CardContent className="space-y-2">
        <Icon className="size-7 text-primary" aria-hidden />
        <CardTitle asChild size="sm" spacing="none">
          <span className="flex items-center gap-1 font-bold">
            {hub.label}
            <ChevronNext className="size-4 shrink-0 text-primary transition-transform group-hover/link:translate-x-0.5 motion-reduce:transition-none rtl:group-hover/link:-translate-x-0.5" />
          </span>
        </CardTitle>
        <CardParagraph size="sm">{hub.description}</CardParagraph>
      </CardContent>
    </Card>
  )
}

type FeaturedCardProps = {
  featured: NavFeatured
  track: TrackLink
  className?: string
}

export const FeaturedCard = ({
  featured,
  track,
  className,
  ...props
}: FeaturedCardProps) => (
  <Card
    href={featured.href}
    variant="nested"
    size="md"
    border
    hoverLift={false}
    customEventOptions={track(featured.href)}
    className={className}
    {...props}
  >
    <CardContent className="space-y-1">
      <Eyebrow className="text-xs">{featured.eyebrow}</Eyebrow>
      <CardTitle asChild size="sm" spacing="none">
        <span className="font-bold">{featured.label}</span>
      </CardTitle>
      <CardParagraph size="sm">{featured.description}</CardParagraph>
    </CardContent>
  </Card>
)

// Block-level flex for both variants: an inline-flex link would sit on the parent's taller line box
const headingClasses =
  "flex w-fit items-center gap-1 text-xs font-bold tracking-wider text-body-medium uppercase"

type GroupHeadingProps = {
  group: NavGroup
  headingId: string
  track: TrackLink
}

/** Group label; links to the group's hub page when it has one */
export const GroupHeading = ({
  group,
  headingId,
  track,
  ...props
}: GroupHeadingProps) =>
  group.href ? (
    <BaseLink
      id={headingId}
      href={group.href}
      isPartiallyActive={false}
      activeClassName="text-primary"
      customEventOptions={track(group.href)}
      className={cn(
        headingClasses,
        "group/heading no-underline hover:text-primary focus-visible:text-primary"
      )}
      {...props}
    >
      {group.label}
      <ChevronNext className="size-3.5 transition-transform group-hover/heading:translate-x-0.5 motion-reduce:transition-none rtl:group-hover/heading:-translate-x-0.5" />
    </BaseLink>
  ) : (
    <p id={headingId} className={headingClasses}>
      {group.label}
    </p>
  )

type MenuPanelProps = {
  sectionKey: NavSectionKey
  section: NavSectionDetail
  pathname: string
  track: TrackLink
}

/** Desktop mega menu panel: hub and featured cards beside the link groups */
const MenuPanel = ({
  sectionKey,
  section,
  pathname,
  track,
}: MenuPanelProps) => {
  const isActive = (href: string) => isHrefActive(href, pathname, false)

  const renderLink = ({ label, href }: NavLink) => (
    <li key={href} className="mb-0">
      <NavigationMenuLink asChild active={isActive(href)}>
        <BaseLink
          href={href}
          isPartiallyActive={false}
          activeClassName=""
          customEventOptions={track(href)}
          className={cn(
            "-mx-2 block rounded-md px-2 py-1.5 text-body no-underline",
            "hover:bg-background-highlight hover:text-primary focus-visible:bg-background-highlight focus-visible:text-primary",
            "data-active:bg-background-highlight data-active:text-primary"
          )}
        >
          {label}
        </BaseLink>
      </NavigationMenuLink>
    </li>
  )

  return (
    <div className="flex gap-6 p-6 max-xl:flex-col xl:gap-8">
      <div className="grid shrink-0 auto-rows-min gap-3 max-xl:grid-cols-2 xl:w-64">
        <NavigationMenuLink asChild active={isActive(section.hub.href)}>
          <HubCard sectionKey={sectionKey} hub={section.hub} track={track} />
        </NavigationMenuLink>
        {section.featured && (
          <NavigationMenuLink asChild active={isActive(section.featured.href)}>
            <FeaturedCard featured={section.featured} track={track} />
          </NavigationMenuLink>
        )}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-6 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {section.groups.map((group) => {
          const headingId = `nav-${group.id.replace("/", "-")}`
          return (
            <div key={group.id} className="min-w-0">
              {group.href ? (
                <NavigationMenuLink asChild active={isActive(group.href)}>
                  <GroupHeading
                    group={group}
                    headingId={headingId}
                    track={track}
                  />
                </NavigationMenuLink>
              ) : (
                <GroupHeading
                  group={group}
                  headingId={headingId}
                  track={track}
                />
              )}
              <ul
                aria-labelledby={headingId}
                className="m-0 mt-3 list-none space-y-0.5"
              >
                {group.items.map(renderLink)}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MenuPanel
