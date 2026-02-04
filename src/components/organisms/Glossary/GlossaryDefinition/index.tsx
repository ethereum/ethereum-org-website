import { Stack } from "@/components/atoms/flex"
import InlineLink from "@/components/atoms/Link"
import IdAnchor from "@/components/molecules/IdAnchor"
import Translation from "@/components/utilities/Translation"

import { cn } from "@/lib/utils/cn"

import { DEFAULT_GLOSSARY_NS } from "@/lib/constants"

interface GlossaryDefinitionProps {
  term: string
  size?: "md" | "sm"
  ns?: string
}

// Override the default `a` mapping to prevent displaying the glossary tooltip
// in the glossary definition
const components = {
  a: InlineLink,
}

const GlossaryDefinition = ({
  term,
  size = "md",
  ns = DEFAULT_GLOSSARY_NS,
}: GlossaryDefinitionProps) => {
  const textClasses = size === "sm" ? "mb-0" : ""

  return (
    <Stack className="mb-8 items-stretch gap-4 text-start">
      <h4
        className={term ? "group relative scroll-mt-28" : ""}
        {...(term ? { "data-group": true, id: term } : {})}
      >
        <IdAnchor id={term} />
        <Translation id={term + "-term"} ns={ns} transform={components} />
      </h4>

      <div className={cn("inline-block", textClasses)}>
        <Translation id={term + "-definition"} ns={ns} transform={components} />
      </div>
    </Stack>
  )
}

export default GlossaryDefinition
