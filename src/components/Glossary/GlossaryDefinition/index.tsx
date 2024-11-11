import { ComponentProps } from "react"

import IdAnchor from "@/components/IdAnchor"
import Translation from "@/components/Translation"
import { Stack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { DEFAULT_GLOSSARY_NS } from "@/lib/constants"

interface GlossaryDefinitionProps {
  term: string
  size?: "md" | "sm"
  options?: ComponentProps<typeof Translation>["options"]
}

// Override the default `a` mapping to prevent displaying the glossary tooltip
// in the glossary definition
const components = {
  a: InlineLink,
}

const GlossaryDefinition = ({
  term,
  size = "md",
  options = { ns: DEFAULT_GLOSSARY_NS },
}: GlossaryDefinitionProps) => {
  const textClasses = size === "sm" ? "mb-0" : ""

  return (
    <Stack className="mb-8 items-stretch gap-4 text-start">
      <h4
        className={term ? "group relative scroll-mt-28" : ""}
        {...(term ? { "data-group": true, id: term } : {})}
      >
        <IdAnchor id={term} />
        <Translation
          id={term + "-term"}
          options={options}
          transform={components}
        />
      </h4>

      <div className={cn("inline-block", textClasses)}>
        <Translation
          id={term + "-definition"}
          options={options}
          transform={components}
        />
      </div>
    </Stack>
  )
}

export default GlossaryDefinition
