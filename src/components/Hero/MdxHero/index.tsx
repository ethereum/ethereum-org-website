import { Heading, Stack } from "@chakra-ui/react"
import * as React from "react"
import Breadcrumbs, { IProps as BreadcrumbsProps } from "../../Breadcrumbs"
import { CommonHeroProps } from "../utils"

export interface MdxHeroProps extends Pick<CommonHeroProps, "title"> {
  breadcrumbs: BreadcrumbsProps
}

const MdxHero = (props: MdxHeroProps) => {
  const { breadcrumbs, title } = props
  return (
    <Stack py="8" px="6" spacing="6" w="full">
      {/* TODO:
       * Recommend the Breadcrumbs component
       * not have a spacing style (`mb`) and
       * let the parent handle the spacing.
       *
       * This change would be done when the component is applied
       * to prod.
       */}
      <Breadcrumbs {...breadcrumbs} mb={0} />
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
    </Stack>
  )
}

export default MdxHero
