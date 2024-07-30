import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"

import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { CallToAction } from "../CallToAction"

export type ContentHeroProps = Omit<CommonHeroProps<string>, "header">

const ContentHero = (props: ContentHeroProps) => {
  const {
    breadcrumbs,
    heroImg,
    buttons,
    title,
    description,
    blurDataURL,
    maxHeight,
  } = props
  return (
    <Box bgImg="bgMainGradient">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        maxW="1536px"
        mx="auto"
        alignItems="center"
      >
        <Box
          order={{ lg: 1 }}
          height={{
            base: "300px",
            md: "400px",
            lg: maxHeight ? maxHeight : "full",
          }}
        >
          <Image
            src={heroImg}
            alt=""
            priority
            blurDataURL={blurDataURL}
            width={760}
            height={451}
            // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
            sizes="(max-width: 992px) 100vw, 760px"
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
              <Stack direction={{ base: "column", md: "row" }} spacing="4">
                {buttons.map((button, idx) => {
                  if (!button) return
                  return <CallToAction key={idx} index={idx} {...button} />
                })}
              </Stack>
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
