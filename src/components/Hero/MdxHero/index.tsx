import { Heading, Stack } from "@chakra-ui/react"

import { CommonHeroProps } from "@/lib/types"

import Breadcrumbs, { type BreadcrumbsProps } from "@/components/Breadcrumbs"

export type MdxHeroProps = Pick<CommonHeroProps, "title"> & {
  breadcrumbs: BreadcrumbsProps
}

const MdxHero = ({ breadcrumbs, title }: MdxHeroProps) => (
  <Stack py="8" px="6" spacing="6" w="full">
    <Breadcrumbs {...breadcrumbs} />
    <Heading as="h1" size="2xl">
      {title}
    </Heading>
  </Stack>
)

export default MdxHero
