import type { ReactNode } from "react"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

export type SimpleHeroButton = {
  href: string
  label: string
  variant?: "outline" | "solid"
  isSecondary?: boolean
}

export type SimpleHeroProps = {
  /**
   * Breadcrumbs component to render
   */
  breadcrumbs: ReactNode
  /**
   * The main title of the hero
   */
  title: string
  /**
   * The subtitle/description content
   */
  subtitle: ReactNode
  /**
   * Optional buttons to render
   */
  buttons?: SimpleHeroButton[]
  /**
   * Optional className for styling
   */
  className?: string
}

const SimpleHero = ({
  breadcrumbs,
  title,
  subtitle,
  buttons,
  className,
}: SimpleHeroProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-8 px-4 pb-4 pt-11 md:w-1/2 md:px-8",
        className
      )}
    >
      {breadcrumbs}
      <h1 className="text-[2.5rem] leading-[1.4] md:text-5xl">{title}</h1>
      <div className="text-xl leading-[1.4] text-body-medium">{subtitle}</div>
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {buttons.map((button, index) => (
            <ButtonLink
              key={index}
              href={button.href}
              variant={button.variant || "solid"}
              isSecondary={button.isSecondary}
            >
              {button.label}
            </ButtonLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default SimpleHero
