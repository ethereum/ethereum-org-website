import { useTranslation } from "next-i18next"
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react"

import type { CommonHeroProps } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"
import Morpher from "@/components/Morpher"

export type HomeHeroProps = Pick<CommonHeroProps, "heroImg">

const HomeHero = ({ heroImg }: HomeHeroProps) => {
  const { t } = useTranslation("page-index")
  return (
    <Box>
      <Box h={{ base: "300px", sm: "350px", md: "380px", lg: "440px" }}>
        <Image
          src={heroImg}
          alt={t("page-index:page-index-hero-image-alt")}
          // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
          sizes="(max-width: 1504px) 100vw, 1504px"
          w="full"
          h="full"
          priority
          style={{ objectFit: "cover" }}
        />
      </Box>
      <VStack>
        <Stack
          spacing={{ base: "4", lg: "7" }}
          textAlign="center"
          mx="4"
          py="8"
          maxW="2xl"
        >
          <Morpher />
          <VStack spacing="6" maxW={{ lg: "2xl" }}>
            <Heading as="h1" size="2xl">
              {t("page-index:page-index-title")}
            </Heading>
            <Text size="lg">{t("page-index:page-index-description")}</Text>
            <ButtonLink href="/learn/">
              {t("page-index:page-index-title-button")}
            </ButtonLink>
          </VStack>
        </Stack>
      </VStack>
    </Box>
  )
}

export default HomeHero
