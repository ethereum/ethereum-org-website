"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { dappsCategories } from "@/data/dapps/categories"

const CategoriesNav = () => {
  const pathname = usePathname()

  // Get the category name from the URL path
  const pathSegments = pathname.split("/")
  const categoryName = pathSegments[pathSegments.length - 2]

  return (
    <nav className="z-sticky inline-flex w-fit gap-1 overflow-x-auto bg-background p-2 shadow md:rounded-2xl md:border md:p-0.5 md:shadow-lg">
      {Object.values(dappsCategories).map(({ name, icon: Icon }) => (
        <ButtonLink
          key={name}
          href={`/dapps/categories/${name}`}
          variant="ghost"
          isSecondary
          className={cn(
            "relative text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
            categoryName === name && "!text-primary"
          )}
        >
          {categoryName === name && (
            <motion.div
              layoutId="active-section-highlight"
              className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
            />
          )}
          <span className="z-10">
            <Icon className="h-4 w-4" />
          </span>
          <span className="relative z-10">{name}</span>
        </ButtonLink>
      ))}
    </nav>
  )
}

export default CategoriesNav
