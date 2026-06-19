import { Globe } from "lucide-react"

import { Image } from "@/components/Image"
import { Grid } from "@/components/ui/grid"
import { BaseLink } from "@/components/ui/Link"

import { LATEST_SOURCES } from "@/data/latest/sources"

// Per-source logos live in /public/images/latest/sources (square assets); the
// rounded corners are applied here via CSS. Sources without a logo fall back to
// a generic globe.
const SourceDirectory = () => (
  <Grid columns={4} size="narrow">
    {LATEST_SOURCES.map((source) => (
      <BaseLink
        key={source.feed}
        href={source.link}
        hideArrow
        className="flex items-center gap-3 rounded-lg border p-4 text-body no-underline duration-100 hover:bg-background-highlight hover:text-body"
      >
        {source.icon ? (
          <Image
            src={source.icon}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg border object-cover"
          />
        ) : (
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-background-highlight">
            <Globe className="size-5 text-body-medium" />
          </span>
        )}
        <span className="font-bold">{source.name}</span>
      </BaseLink>
    ))}
  </Grid>
)

export default SourceDirectory
