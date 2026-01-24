import type { Category } from "@/data/developer-apps/types"

import { Link } from "@/i18n/routing"

interface CategoryHeaderProps {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <Link
          href="/developers/apps"
          className="text-sm text-primary hover:underline"
        >
          &larr; All Apps
        </Link>
      </div>
      <h1 className="mb-4 text-4xl font-bold">{category.title}</h1>
      <p className="text-lg text-body-medium">{category.description}</p>
    </div>
  )
}
