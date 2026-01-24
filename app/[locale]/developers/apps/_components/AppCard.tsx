import type { DeveloperAppMeta } from "@/data/developer-apps/types"

import { Link } from "@/i18n/routing"

interface AppCardProps {
  app: DeveloperAppMeta
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link
      href={`?app=${app.id}`}
      scroll={false}
      className="group block rounded-lg border border-body-light bg-background p-6 transition-colors hover:border-primary hover:bg-background-highlight"
    >
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-body-medium">
        {app.category}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-body group-hover:text-primary">
        {app.title}
      </h3>
      <p className="text-sm text-body-medium">{app.summary}</p>
    </Link>
  )
}
