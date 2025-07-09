import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { dappsCategories } from "@/data/dapps/categories"

const CategoriesNav = ({ activeCategory = "" }: { activeCategory: string }) => {
  return (
    <div className="flex w-full justify-center">
      <nav className="flex w-full max-w-fit gap-1 overflow-x-auto rounded-2xl bg-background p-0.5 shadow md:border md:shadow-lg lg:w-auto">
        {Object.values(dappsCategories).map(({ name, icon: Icon }) => (
          <ButtonLink
            key={name}
            href={`/dapps/categories/${name}`}
            variant="ghost"
            isSecondary
            className={cn(
              "relative flex-shrink-0 text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
              activeCategory === name && "!text-primary"
            )}
          >
            {activeCategory === name && (
              <div className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast" />
            )}
            <span className="relative z-10">
              <Icon className="h-4 w-4" />
            </span>
            <span className="relative z-10">{name}</span>
          </ButtonLink>
        ))}
      </nav>
    </div>
  )
}

export default CategoriesNav
