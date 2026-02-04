import type { CommonHeroProps } from "@/lib/types"

import { Stack } from "@/components/atoms/flex"
import Breadcrumbs from "@/components/molecules/Breadcrumbs"

export type MdxHeroProps = Pick<CommonHeroProps, "breadcrumbs" | "title">

const MdxHero = ({ breadcrumbs, title }: MdxHeroProps) => (
  <Stack className="w-full gap-6 px-6 py-8">
    <Breadcrumbs {...breadcrumbs} />
    <h1>{title}</h1>
  </Stack>
)

export default MdxHero
