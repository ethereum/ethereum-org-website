"use client"

import { useRef, useState } from "react"
import { AppWindowMac, BookOpen, Code } from "lucide-react"
import { useTranslations } from "next-intl"

import { ChevronNext } from "@/components/Chevron"
import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-modal"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

type PersonaLink = {
  label: string
  href: string
  eventName: string
}

type PersonaCategory = {
  id: string
  label: string
  Icon: React.FC<{ className?: string }>
  iconBgClass: string
  iconColorClass: string
  links: PersonaLink[]
}

function useCategories() {
  const t = useTranslations("page-index")

  const categories: PersonaCategory[] = [
    {
      id: "beginners",
      label: t("page-index-modal-beginners"),
      Icon: BookOpen,
      iconBgClass: "bg-accent-a/20",
      iconColorClass: "text-accent-a",
      links: [
        {
          label: t("page-index-modal-what-is-ethereum"),
          href: "/what-is-ethereum/",
          eventName: "learn_ethereum",
        },
        {
          label: t("page-index-modal-pick-wallet"),
          href: "/wallets/find-wallet/",
          eventName: "pick_wallet",
        },
      ],
    },
    {
      id: "explorers",
      label: t("page-index-modal-explorers"),
      Icon: AppWindowMac,
      iconBgClass: "bg-accent-c/20",
      iconColorClass: "text-accent-c",
      links: [
        {
          label: t("page-index-modal-get-eth"),
          href: "/get-eth/",
          eventName: "get_eth",
        },
        {
          label: t("page-index-modal-try-apps"),
          href: "/apps/",
          eventName: "try_apps",
        },
      ],
    },
    {
      id: "builders",
      label: t("page-index-modal-builders"),
      Icon: Code,
      iconBgClass: "bg-primary-low-contrast",
      iconColorClass: "text-primary",
      links: [
        {
          label: t("page-index-modal-start-building"),
          href: "/developers/",
          eventName: "start_building",
        },
        {
          label: t("page-index-modal-docs"),
          href: "/developers/docs/",
          eventName: "docs",
        },
      ],
    },
  ]

  return { categories, t }
}

const CategoryCard = ({
  category: { id, label, Icon, iconBgClass, iconColorClass, links },
  onLinkClick,
  className,
}: {
  category: PersonaCategory
  onLinkClick: (eventName: string) => void
  className?: string
}) => (
  <div
    key={id}
    className={cn(
      "border-border-default flex flex-col rounded-3xl border p-6 md:p-10",
      className
    )}
  >
    <div className="mb-6 flex flex-col gap-2 md:mb-8 md:gap-4">
      <div
        className={cn(
          "grid size-8 place-items-center rounded-lg md:size-16 md:rounded-2xl",
          iconBgClass
        )}
      >
        <Icon className={cn("size-4 md:size-8", iconColorClass)} />
      </div>
      <p className="text-sm font-bold uppercase tracking-wider">{label}</p>
    </div>

    <div className="mt-auto flex flex-col gap-2 md:gap-4">
      {links.map(({ label: linkLabel, href, eventName }, idx) => (
        <div key={linkLabel}>
          {idx > 0 && <div className="mb-2 border-t md:mb-4" />}
          <BaseLink
            href={href}
            onClick={() => onLinkClick(eventName)}
            hideArrow
            className="group flex items-center justify-between text-xl font-bold text-primary no-underline transition-colors hover:text-primary-hover md:text-3xl"
          >
            {linkLabel}
            <ChevronNext className="size-5 text-primary transition-transform group-hover:translate-x-1" />
          </BaseLink>
        </div>
      ))}
    </div>
  </div>
)

type PersonaModalCTAProps = {
  eventCategory: string
}

const PersonaModalCTA = ({ eventCategory }: PersonaModalCTAProps) => {
  const { categories, t } = useCategories()
  const [isOpen, setIsOpen] = useState(false)
  // Track if modal was closed via link click (not ESC/outside click/X button)
  const closedViaLinkRef = useRef(false)

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Modal is opening - fire both cta_click and modal_open for funnel analysis
      closedViaLinkRef.current = false
      trackCustomEvent({
        eventCategory,
        eventAction: "cta_click",
        eventName: "start_here",
      })
      trackCustomEvent({
        eventCategory,
        eventAction: "modal_open",
        eventName: "persona_modal",
      })
    } else if (!closedViaLinkRef.current) {
      // Modal is closing without a link selection (ESC, click outside, X button)
      trackCustomEvent({
        eventCategory,
        eventAction: "modal_close",
        eventName: "persona_modal",
      })
    }
    setIsOpen(open)
  }

  const handleLinkClick = (eventName: string) => {
    closedViaLinkRef.current = true
    trackCustomEvent({
      eventCategory,
      eventAction: "modal_select",
      eventName,
    })
    setIsOpen(false)
  }

  // Collect links that are only reachable via the modal (not duplicated
  // elsewhere on the page) so crawlers can discover them without JS.
  const crawlerOnlyLinks = categories.flatMap((cat) =>
    cat.links.filter(
      ({ href }) => !["/what-is-ethereum/", "/get-eth/"].includes(href)
    )
  )

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="solid" size="lg" className="gap-2">
            {t("page-index-hero-cta")}
            <ChevronNext className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[1440px] p-4 md:rounded-[32px] md:p-8">
          <DialogHeader className="pe-0 pt-8 md:pt-0">
            <DialogTitle className="text-center text-2xl font-bold md:text-4xl">
              {t("page-index-modal-title")}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {t("page-index-modal-description")}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-3 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onLinkClick={handleLinkClick}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Static links for SEO — these URLs are only reachable via the JS
          dialog modal above, so we render them visually-hidden to ensure
          crawlers can discover them. */}
      <nav aria-label="Quick links" className="sr-only select-none">
        {crawlerOnlyLinks.map(({ label, href }) => (
          <BaseLink key={href} href={href}>
            {label}
          </BaseLink>
        ))}
      </nav>
    </>
  )
}

export default PersonaModalCTA
