import { Button } from "@/components/ui/buttons/Button"
import { Flex, type FlexProps } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

type CategoryTabsProps = FlexProps & {
  categories: Array<string>
  activeIndex?: number
  setActiveIndex?: (i: number) => void
}
export const CategoryTabs = ({
  categories,
  activeIndex = 0,
  setActiveIndex,
  className,
  ...flexProps
}: CategoryTabsProps) => (
  <Flex className={cn("gap-6", className)} {...flexProps}>
    {categories.map((category, index) => {
      const isActiveIndex = activeIndex === index
      const fontWeightClass = isActiveIndex && "font-bold"
      return setActiveIndex ? (
        <Button
          key={category}
          variant="ghost"
          className={cn(
            fontWeightClass,
            "p-0 pb-2 text-body",
            isActiveIndex && "!text-[initial]"
          )}
          disabled={isActiveIndex}
          onClick={() => setActiveIndex(index)}
        >
          {category}
        </Button>
      ) : (
        <p className={cn(fontWeightClass, "mb-2")} key={category}>
          {category}
        </p>
      )
    })}
  </Flex>
)
