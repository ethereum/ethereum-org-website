import React from "react"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Box, Heading, Image, Text } from "@chakra-ui/react"

import Link from "./Link"

export interface DataRow {
  logo: IGatsbyImageData
  coin: string
  apy: string
}

export interface IProps {
  url: string
  background: string
  image: IGatsbyImageData
  alt?: string
  name: string
  description?: string
  data?: Array<DataRow>
}

const DataProductCard: React.FC<IProps> = ({
  url,
  background,
  image,
  alt,
  name,
  description,
  data,
}) => (
  <Link
    href={url}
    color="text"
    background="searchBackground"
    border="1px solid"
    borderColor="lightBorder"
    borderRadius="4px"
    overflow="hidden"
    boxShadow="table"
    textDecoration="none"
    display="flex"
    flexDirection="column"
    _hover={{
      background: "tableBackgroundHover",
      boxShadow: "tableBoxShadow",
      transition: "transform 0.1s ease 0s",
      transform: "scale(1.02)",
    }}
    isExternal
    hideArrow
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="rgb(0 0 0 / 10%) 0px -1px 0px inset;"
      minH="200px"
      bg={background}
    >
      <Image
        as={GatsbyImage}
        image={image}
        objectFit="cover"
        alt={alt ? alt : `${name} logo`}
        width="100%"
        alignSelf="center"
        maxWidth="372px"
        maxHeight="257px"
      />
    </Box>
    <Box
      textAlign="left"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <Box>
        <Heading
          as="h3"
          size="lg"
          fontSize="1.5rem"
          fontWeight="600"
          lineHeight="1.4"
          margin="2rem 1rem"
          marginBottom="1rem"
        >
          {name}
        </Heading>
        <Text
          fontSize="sm"
          opacity="0.8"
          margin="0 1rem"
          marginBottom="1rem"
          lineHeight="140%"
        >
          {description}
        </Text>
      </Box>
      {data && (
        <Box
          overflowY="scroll"
          maxHeight="160px"
          marginBottom="1rem"
          borderTop="1px solid"
          borderColor="lightBorder"
        >
          {data.map(({ logo, coin, apy }, idx) => (
            <Box
              key={idx}
              color="text300"
              display="flex"
              fontSize="s"
              justifyContent="space-between"
              padding="1rem"
              textTransform="uppercase"
              border="1px solid"
              borderColor="lightBorder"
              borderLeft="0"
              borderRight="0"
            >
              <Box display="flex" alignItems="center">
                {logo && (
                  <Image
                    as={GatsbyImage}
                    image={logo}
                    objectFit="cover"
                    alt=""
                    minWidth="24px"
                    marginRight="0.5rem"
                  />
                )}
                {coin}
              </Box>
              <Box display="flex" alignItems="center">
                {apy}% APY
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  </Link>
)

export default DataProductCard
