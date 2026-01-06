import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

interface OrganizerCTAProps {
  title: string
  subtitle: string
  buttonText: string
  buttonHref?: string
  className?: string
}

export default function OrganizerCTA({
  title,
  subtitle,
  buttonText,
  buttonHref = "https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_event.yaml",
  className,
}: OrganizerCTAProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-gradient-to-br from-primary via-primary-high-contrast to-primary px-6 py-12 text-white md:px-12 md:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <p className="mb-8 text-white/80">{subtitle}</p>
        <ButtonLink
          href={buttonHref}
          variant="outline"
          className="border-white text-white hover:bg-white/10"
        >
          {buttonText}
        </ButtonLink>
      </div>
    </section>
  )
}
