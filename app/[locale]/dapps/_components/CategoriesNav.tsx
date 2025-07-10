import TabNav from "@/components/ui/TabNav"

import { dappsCategories } from "@/data/dapps/categories"

const CategoriesNav = ({ activeCategory = "" }: { activeCategory: string }) => {
  const items = Object.values(dappsCategories).map(({ name, icon: Icon }) => ({
    key: name,
    label: name,
    href: `/dapps/categories/${name}`,
    icon: <Icon className="h-4 w-4" />,
  }))

  return <TabNav items={items} activeKey={activeCategory} />
}

export default CategoriesNav
