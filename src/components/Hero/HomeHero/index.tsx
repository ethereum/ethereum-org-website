import { getImageProps } from "next/image"
import { useTranslation } from "next-i18next"
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import Morpher from "@/components/Morpher"

import heroDesktopImg from "@/public/images/home/hero.png"
import heroMobileImg from "@/public/images/home/hero-mobile.png"

const HomeHero = () => {
  const { t } = useTranslation("page-index")

  const common = {
    alt: t("page-index:page-index-hero-image-alt"),
    priority: true,
  }
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    sizes: "(max-width: 1504px) 100vw, 1504px",
    src: heroDesktopImg,
  })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 480,
    src: heroMobileImg,
  })

  return (
    <Box>
      <Box h={{ base: "300px", sm: "350px", md: "380px", lg: "440px" }}>
        <picture>
          <source media="(min-width: 480px)" srcSet={desktop} />
          <source media="(max-width: 479px)" srcSet={mobile} />
          {/* Fallback image: mobile version */}
          <img
            {...rest}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </picture>
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
