import TabNav from "@/components/ui/TabNav"

import { appsCategories } from "@/data/apps/categories"

const CategoriesNav = ({ activeCategory = "" }: { activeCategory: string }) => {
  const items = Object.values(appsCategories).map(
    ({ name, icon: Icon, slug }) => ({
      key: name,
      label: name,
      href: `/apps/categories/${slug}`,
      icon: <Icon className="h-4 w-4" />,
    })
  )

  return (
    <TabNav
      items={items}
      activeKey={activeCategory}
      customEventOptions={{
        eventCategory: "categories_page",
        eventAction: "navigation",
      }}
    />
  )
}

export default CategoriesNav
