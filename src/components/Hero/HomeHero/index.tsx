import * as React from "react"
import { useTranslation } from "react-i18next"
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import { ButtonLink } from "../../Buttons"
import Morpher from "../../Morpher"
import Translation from "../../Translation"
import { CommonHeroProps } from "../utils"

export interface HomeHeroProps extends Pick<CommonHeroProps, "heroImgSrc"> {}

const HomeHero = ({ heroImgSrc }: HomeHeroProps) => {
  const { t } = useTranslation("common")
  return (
    <Box>
      <Image
        src={heroImgSrc}
        alt={t("page-index:page-index-hero-image-alt")}
        loading="eager"
        w="full"
        height={440}
      />
      <VStack>
        <Stack
          spacing={{ base: "4", lg: "7" }}
          textAlign="center"
          mx="4"
          py="8"
          maxW="2xl"
        >
          <Morpher />
          <VStack spacing="6">
            <Heading as="h1" size="2xl">
              <Translation id="page-index:page-index-title" />
            </Heading>
            <Text size="xl">
              <Translation id="page-index:page-index-description" />
            </Text>
            <ButtonLink to="/learn/">
              <Translation id="page-index:page-index-title-button" />
            </ButtonLink>
          </VStack>
        </Stack>
      </VStack>
    </Box>
  )
}

export default HomeHero
