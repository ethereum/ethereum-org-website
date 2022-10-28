// Libraries
import React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react"

// Components
import ButtonLink from "./ButtonLink"
import Link from "./Link"

export interface IProps {
  children?: React.ReactNode
  url?: string
  background: string
  image: IGatsbyImageData
  name: string
  description: string
  note?: string
  alt?: string
  bridge?: string
  tokenLists?: string
  ecosystemPortal?: string
}

const Layer2ProductCard: React.FC<IProps> = ({
  url,
  background,
  image,
  name,
  description,
  note = "",
  alt = "",
  children,
  bridge,
  tokenLists,
  ecosystemPortal,
}) => {
  const { t } = useTranslation()

  return (
    <Flex
      color="text"
      boxShadow={"0px 14px 66px rgba(0, 0, 0, 0.07)"}
      direction="column"
      justify="space-between"
      bg="searchBackground"
      borderRadius="base"
      border={"1px solid lightBorder"}
      textDecoration="none"
      padding={2}
      _hover={{ transition: "transform 0.1s", transform: "scale(1.02)" }}
    >
      <Center
        bg={background}
        boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
        minH="200px"
      >
        <Image
          as={GatsbyImage}
          image={image}
          alt={alt}
          objectFit="contain"
          alignSelf="center"
          maxW={{ base: "311px", sm: "372px" }}
          maxH={"257px"}
        />
      </Center>
      <Flex p={6} h="100%" direction="column">
        <Box>
          <Heading as="h3" fontSize={{ base: "xl", m: "2xl" }} mt={0} mb={3}>
            {name}
          </Heading>
          {children && (
            <Box mt={4} mb={4}>
              {children}
            </Box>
          )}
          <Text opacity="0.8" fontSize="sm" mb={2} lineHeight="140%">
            {description}
          </Text>
          {note.length > 0 && (
            <Text opacity="0.8" fontSize="sm" mb={2} lineHeight="140%">
              {t("layer-2-note")} {note}
            </Text>
          )}
        </Box>
        {bridge && (
          <Link to={bridge}>
            {name} {t("layer-2-bridge")}
          </Link>
        )}
        {ecosystemPortal && (
          <Link to={ecosystemPortal}>
            {name} {t("layer-2-ecosystem-portal")}
          </Link>
        )}
        {tokenLists && (
          <Link to={tokenLists}>
            {name} {t("layer-2-token-lists")}
          </Link>
        )}
      </Flex>
      <Box>
        <ButtonLink m={2} to={url} display="flex">
          {t("layer-2-explore")} {name}
        </ButtonLink>
      </Box>
    </Flex>
  )
}

export default Layer2ProductCard
