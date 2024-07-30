import { Box, Heading, Stack, Text } from "@chakra-ui/react"

import type { CommonHeroProps } from "@/lib/types"

import { CallToAction } from "@/components/Hero/CallToAction"
import { Image } from "@/components/Image"

export type HubHeroProps = Omit<CommonHeroProps, "breadcrumbs" | "blurDataURL">

const HubHero = ({
  heroImg,
  title,
  header,
  description,
  buttons,
}: HubHeroProps) => {
  if (buttons && buttons.length > 2) {
    throw new Error(
      "Can not have more than two call-to-action buttons in this hero component."
    )
  }

  return (
    <Box position="relative">
      <Image
        src={heroImg}
        alt=""
        priority
        // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
        sizes="(max-width: 1504px) 100vw, 1504px"
        style={{ width: "100vw", objectFit: "cover" }}
        h={{
          base: "192px",
          md: "256px",
          lg: "320px",
          xl: "576px",
          "2xl": "672px",
        }}
      />
      <Stack
        spacing="4"
        p={{ base: "4", lg: "8" }}
        textAlign={{ base: "center", xl: "start" }}
        borderRadius={{ xl: "base" }}
        bg={{ xl: "hubHeroContentBg" }}
        position={{ xl: "absolute" }}
        maxW={{ xl: "sm" }}
        top={{ xl: "50%" }}
        transform={{ xl: "translateY(-50%)" }}
        backdropFilter={{ xl: "auto" }}
        backdropBlur={{ xl: "base" }}
        wordBreak="break-word"
        sx={{
          "inset-inline-start": { xl: "32px" },
        }}
      >
        {title ? (
          <Text
            as="h1"
            size="md"
            color="body.medium"
            fontWeight="normal"
            textTransform="uppercase"
          >
            {title}
          </Text>
        ) : null}
        <Stack
          alignSelf="center"
          spacing={{ base: "2", md: "1" }}
          maxW="container.md"
        >
          <Heading as={title ? "h2" : "h1"} size="2xl">
            {header}
          </Heading>
          <Text size="lg">{description}</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={{ md: "center", xl: "start" }}
          spacing="4"
        >
          {buttons?.map((button, idx) => {
            if (!button) return
            return <CallToAction key={idx} index={idx} {...button} />
          })}
        </Stack>
      </Stack>
    </Box>
  )
}

export default HubHero
