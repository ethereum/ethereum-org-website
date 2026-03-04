import type { AppData } from "@/lib/types"

import AppCard from "@/components/AppCard"
import InlineLink from "@/components/ui/Link"

import { slugify } from "@/lib/utils/url"

interface GamingAppsGridProps {
  apps: AppData[]
}

const GamingAppsGrid = ({ apps }: GamingAppsGridProps) => {
  if (!apps || apps.length === 0) {
    return (
      <p className="text-body text-body-medium">
        Gaming apps are currently being loaded. In the meantime,{" "}
        <InlineLink href="/apps/categories/gaming">
          browse all gaming apps
        </InlineLink>
        .
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <AppCard
          key={app.name}
          name={app.name}
          description={app.description}
          thumbnail={app.image}
          tags={app.subCategory}
          href={`/apps/${slugify(app.name)}`}
        />
      ))}
    </div>
  )
}

export default GamingAppsGrid
