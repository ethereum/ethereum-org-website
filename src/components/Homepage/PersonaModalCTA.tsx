"use client"

import { useState } from "react"
import { BookOpen, Building2, Code, ExternalLink } from "lucide-react"

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
  isExternal?: boolean
}

type PersonaCategory = {
  id: string
  label: string
  Icon: React.FC<{ className?: string }>
  iconBgClass: string
  iconColorClass: string
  links: PersonaLink[]
}

const categories: PersonaCategory[] = [
  {
    id: "beginners",
    label: "For beginners",
    Icon: BookOpen,
    iconBgClass: "bg-accent-a/20",
    iconColorClass: "text-accent-a",
    links: [
      { label: "What is Ethereum?", href: "/what-is-ethereum/" },
      { label: "Get a wallet", href: "/wallets/find-wallet/" },
    ],
  },
  {
    id: "developers",
    label: "For developers",
    Icon: Code,
    iconBgClass: "bg-primary-low-contrast",
    iconColorClass: "text-primary",
    links: [
      { label: "Developer Hub", href: "/developers/" },
      { label: "Docs", href: "/developers/docs/" },
    ],
  },
  {
    id: "enterprise",
    label: "For enterprise",
    Icon: Building2,
    iconBgClass: "bg-accent-c/20",
    iconColorClass: "text-accent-c",
    links: [
      { label: "Founders", href: "/founders/" },
      {
        label: "Institutions",
        href: "https://institutions.ethereum.org/",
        isExternal: true,
      },
    ],
  },
]

type PersonaModalCTAProps = {
  eventCategory: string
}

const PersonaModalCTA = ({ eventCategory }: PersonaModalCTAProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    if (open) {
      trackCustomEvent({
        eventCategory,
        eventAction: "start here",
        eventName: "start here",
      })
    }
    setIsOpen(open)
  }

  const handleLinkClick = (label: string) => {
    trackCustomEvent({
      eventCategory,
      eventAction: "modal",
      eventName: label,
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="solid" size="lg" className="gap-2">
          Start here
          <ChevronNext className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1440px] p-4 md:rounded-[32px] md:p-8">
        <DialogHeader className="pe-0 pt-8 md:pt-0">
          <DialogTitle className="text-center text-2xl font-bold md:text-4xl">
            What brings you here?
          </DialogTitle>
          <DialogDescription className="sr-only">
            Choose your path: resources for beginners, developers, or
            enterprise.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-3 md:gap-6">
          {categories.map(
            ({ id, label, Icon, iconBgClass, iconColorClass, links }) => (
              <div
                key={id}
                className="border-border-default flex flex-col rounded-3xl border p-6 md:p-10"
              >
                {/* Icon and Category Label */}
                <div className="mb-6 flex flex-col gap-2 md:mb-8 md:gap-4">
                  <div
                    className={cn(
                      "grid size-8 place-items-center rounded-lg md:size-16 md:rounded-2xl",
                      iconBgClass
                    )}
                  >
                    <Icon className={cn("size-4 md:size-8", iconColorClass)} />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {label}
                  </p>
                </div>

                {/* Links */}
                <div className="mt-auto flex flex-col gap-2 md:gap-4">
                  {links.map(({ label: linkLabel, href, isExternal }, idx) => (
                    <div key={linkLabel}>
                      {idx > 0 && <div className="mb-2 border-t md:mb-4" />}
                      <BaseLink
                        href={href}
                        onClick={() => handleLinkClick(linkLabel)}
                        hideArrow
                        className="group flex items-center justify-between text-xl font-bold text-primary no-underline transition-colors hover:text-primary-hover md:text-3xl"
                        {...(isExternal && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        <span className="flex items-center gap-1">
                          {linkLabel}
                          {isExternal && (
                            <ExternalLink className="size-3 text-body-medium md:size-4" />
                          )}
                        </span>
                        <ChevronNext className="size-5 text-primary transition-transform group-hover:translate-x-1" />
                      </BaseLink>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PersonaModalCTA
