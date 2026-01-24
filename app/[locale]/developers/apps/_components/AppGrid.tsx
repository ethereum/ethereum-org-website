import type { DeveloperAppMeta } from "@/data/developer-apps/types"

import { AppCard } from "./AppCard"

interface AppGridProps {
  apps: DeveloperAppMeta[]
}

export function AppGrid({ apps }: AppGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  )
}
