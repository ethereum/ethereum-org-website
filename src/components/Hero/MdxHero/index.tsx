import * as React from "react"
import { Heading, Stack } from "@chakra-ui/react"

import Breadcrumbs, { BreadcrumbsProps } from "../../Breadcrumbs"
import { CommonHeroProps } from "../HubHero"

export interface MdxHeroProps extends Pick<CommonHeroProps, "title"> {
  breadcrumbs: BreadcrumbsProps
}

const MdxHero = (props: MdxHeroProps) => {
  const { breadcrumbs, title } = props
  return (
    <Stack py="8" px="6" spacing="6" w="full">
      <Breadcrumbs {...breadcrumbs} />
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
    </Stack>
  )
}

export default MdxHero
