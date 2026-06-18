import { Globe } from "lucide-react"

import { Grid } from "@/components/ui/grid"
import { BaseLink } from "@/components/ui/Link"

import { LATEST_SOURCES } from "@/data/latest/sources"

// Icons are mocked for now: every entry falls back to a generic globe icon
// until real per-source logos land (see LatestSource.icon).
const SourceDirectory = () => (
  <Grid columns={4} size="narrow">
    {LATEST_SOURCES.map((source) => (
      <BaseLink
        key={source.feed}
        href={source.link}
        hideArrow
        className="flex items-center gap-3 rounded-lg border p-4 text-body no-underline duration-100 hover:bg-background-highlight hover:text-body"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-background-highlight">
          <Globe className="size-4 text-body-medium" />
        </span>
        <span className="font-bold">{source.name}</span>
      </BaseLink>
    ))}
  </Grid>
)

export default SourceDirectory
