import * as React from "react"
import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import GatsbyImage from "../../GatsbyImage"
import { CallToAction } from "../CallToAction"
import { CommonHeroProps } from "../utils"

export interface HubHeroProps extends CommonHeroProps {}

const HubHero = (props: HubHeroProps) => {
  const { heroImgSrc, title, header, description, buttons } = props

  if (buttons && buttons.length > 2) {
    throw Error(
      "Can not have more than two call-to-action buttons in this hero component."
    )
  }

  return (
    <Box position="relative">
      <GatsbyImage
        image={heroImgSrc}
        alt=""
        w="full"
        height={{
          base: "192px",
          md: "256px",
          lg: "320px",
          xl: "576px",
          "2xl": "672px",
        }}
        loading="eager"
      />
      <Stack
        spacing={{ base: "3", md: "4" }}
        p={{ base: "4", lg: "8" }}
        textAlign={{ base: "center", xl: "start" }}
        borderRadius={{ xl: "base" }}
        bg={{ xl: "hubHeroContentBg" }}
        position={{ xl: "absolute" }}
        insetStart={{ xl: "8" }}
        maxW={{ xl: "sm" }}
        top={{ xl: "50%" }}
        transform={{ xl: "translateY(-50%)" }}
        backdropFilter={{ xl: "auto" }}
        backdropBlur={{ xl: "base" }}
        wordBreak="break-word"
      >
        <Heading
          as="h1"
          size="sm"
          color="body.medium"
          fontWeight="normal"
          textTransform="uppercase"
        >
          {title}
        </Heading>
        <Stack
          alignSelf="center"
          spacing={{ base: "2", md: "1" }}
          maxW="container.md"
        >
          <Heading size="2xl">{header}</Heading>
          <Text size="lg">{description}</Text>
        </Stack>
        <HStack justify={{ md: "center", xl: "start" }} spacing="4">
          {buttons
            ? buttons.map((button, idx) => {
                if (!button) return
                return <CallToAction key={idx} {...button} index={idx} />
              })
            : null}
        </HStack>
      </Stack>
    </Box>
  )
}

export default HubHero
