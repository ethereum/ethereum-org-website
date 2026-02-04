import type { ChildOnlyProp } from "@/lib/types"

import { Flex } from "@/components/atoms/flex"

export const Template = (props: ChildOnlyProp) => (
  <Flex
    className="w-full justify-center gap-6 max-md:flex-col md:gap-8"
    {...props}
  />
)
