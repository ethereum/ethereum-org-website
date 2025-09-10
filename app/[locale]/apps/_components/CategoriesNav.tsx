import { getTranslations } from "next-intl/server"

import TabNav from "@/components/ui/TabNav"

import { slugify } from "@/lib/utils/url"

import { appsCategories } from "@/data/apps/categories"

const CategoriesNav = async ({
  activeCategory = "",
}: {
  activeCategory: string
}) => {
  const t = await getTranslations("page-apps")

  const items = Object.values(appsCategories).map(
    ({ name, icon: Icon, slug }) => ({
      key: slug,
      label: t(name),
      href: `/apps/categories/${slug}`,
      icon: <Icon className="h-4 w-4" />,
    })
  )

  return (
    <TabNav
      items={items}
      activeKey={slugify(activeCategory)}
      customEventOptions={{
        eventCategory: "categories_page",
        eventAction: "navigation",
      }}
    />
  )
}

export default CategoriesNav
