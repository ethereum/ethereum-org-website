import * as React from "react"
import { Box, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import Breadcrumbs, { IProps as BreadcrumbsProps } from "../../Breadcrumbs"
import GatsbyImage from "../../GatsbyImage"
import { CallToAction } from "../CallToAction"
import { CommonHeroProps } from "../utils"

export interface ContentHeroProps extends Omit<CommonHeroProps, "header"> {
  breadcrumbs: BreadcrumbsProps
}

const ContentHero = (props: ContentHeroProps) => {
  const { breadcrumbs, heroImgSrc, buttons, title, description } = props
  return (
    <Box bgImg="bgMainGradient">
      <SimpleGrid columns={{ base: 1, lg: 2 }} maxW="1536px" mx="auto" gap="4">
        <Box
          height={{ base: "300px", md: "400px", lg: "full" }}
          order={{ lg: 1 }}
        >
          <GatsbyImage
            alt=""
            image={heroImgSrc}
            loading="eager"
            objectFit="contain"
            boxSize="full"
          />
        </Box>
        <Stack p={{ base: "8", lg: "16" }} spacing="9" justify="center">
          <Breadcrumbs {...breadcrumbs} />
          <Stack spacing="6">
            <Heading as="h1" size="2xl">
              {title}
            </Heading>
            <Text fontSize="lg">{description}</Text>
            <HStack spacing="4">
              {buttons
                ? buttons.map((button, idx) => {
                    if (!button) return

                    return <CallToAction key={idx} index={idx} {...button} />
                  })
                : null}
            </HStack>
          </Stack>
          {/* TODO:
           * Add conditional Big Stat box here
           */}
        </Stack>
      </SimpleGrid>
    </Box>
  )
}

export default ContentHero
