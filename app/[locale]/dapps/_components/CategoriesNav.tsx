"use client"

import { motion } from "framer-motion"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { dappsCategories } from "@/data/dapps/categories"

const CategoriesNav = ({ activeCategory = "" }: { activeCategory: string }) => {
  return (
    <nav className="inline-flex w-fit gap-1 overflow-x-auto bg-background p-2 shadow md:rounded-2xl md:border md:p-0.5 md:shadow-lg">
      {Object.values(dappsCategories).map(({ name, icon: Icon }) => (
        <ButtonLink
          key={name}
          href={`/dapps/categories/${name}`}
          variant="ghost"
          isSecondary
          className={cn(
            "relative text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
            activeCategory === name && "!text-primary"
          )}
        >
          {activeCategory === name && (
            <motion.div
              layoutId="active-section-highlight"
              className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
            />
          )}
          <span className="relative z-10">
            <Icon className="h-4 w-4" />
          </span>
          <span className="relative z-10">{name}</span>
        </ButtonLink>
      ))}
    </nav>
  )
}

export default CategoriesNav
