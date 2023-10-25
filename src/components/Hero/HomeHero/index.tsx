import * as React from "react"
import { useTranslation } from "react-i18next"
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react"
import { ButtonLink } from "../../Buttons"
import Morpher from "../../Morpher"
import Translation from "../../Translation"
import GatsbyImage from "../../GatsbyImage"
import { CommonHeroProps } from "../utils"

export interface HomeHeroProps extends Pick<CommonHeroProps, "heroImgSrc"> {}

const HomeHero = ({ heroImgSrc }: HomeHeroProps) => {
  const { t } = useTranslation()
  return (
    <Box>
      <GatsbyImage
        image={heroImgSrc}
        alt={t("page-index-hero-image-alt")}
        loading="eager"
        w="full"
        height={{ base: "300px", sm: "350px", md: "380px", lg: "440px" }}
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
              <Translation id="page-index-title" />
            </Heading>
            <Text size="xl">
              <Translation id="page-index-description" />
            </Text>
            <ButtonLink to="/learn/">
              <Translation id="page-index-title-button" />
            </ButtonLink>
          </VStack>
        </Stack>
      </VStack>
    </Box>
  )
}

export default HomeHero
