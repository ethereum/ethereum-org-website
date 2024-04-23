import { Box, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react"

import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { CallToAction } from "../CallToAction"

export type ContentHeroProps = Omit<CommonHeroProps<string>, "header">

const ContentHero = (props: ContentHeroProps) => {
  const { breadcrumbs, heroImg, buttons, title, description, blurDataURL } =
    props
  return (
    <Box bgImg="bgMainGradient">
      <SimpleGrid columns={{ base: 1, lg: 2 }} maxW="1536px" mx="auto">
        <Box
          order={{ lg: 1 }}
          height={{ base: "300px", md: "400px", lg: "full" }}
        >
          <Image
            src={heroImg}
            alt=""
            priority
            blurDataURL={blurDataURL}
            width={760}
            height={451}
            sizes="100vw"
            boxSize="full"
            style={{ objectFit: "contain" }}
            flex={{ base: "1 1 100%", md: "none" }}
          />
        </Box>
        <Stack p={{ base: "8", lg: "16" }} spacing="9" justify="center">
          <Breadcrumbs {...breadcrumbs} />
          <Stack spacing="6">
            <Heading as="h1" size="2xl">
              {title}
            </Heading>
            {typeof description === "string" ? (
              <Text fontSize="lg">{description}</Text>
            ) : (
              description
            )}
            {buttons && (
              <HStack spacing="4">
                {buttons.map((button, idx) => {
                  if (!button) return
                  return <CallToAction key={idx} index={idx} {...button} />
                })}
              </HStack>
            )}
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
