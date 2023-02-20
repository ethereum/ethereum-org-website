import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react"

import ButtonLink from "./ButtonLink"
import Translation from "./Translation"

export interface Content {
  title: string
  description: string
  link?: string
  image?: any
  alt: string
  id?: string
}

export interface IProps {
  content: Array<Content>
  category: string
}

const ProductList: React.FC<IProps> = ({ content, category }) => {
  const shadow = useColorModeValue("tableBox.light", "tableBox.dark")

  return (
    <Box width="full">
      <Heading
        as="h3"
        fontSize="2xl"
        borderBottom="2px solid"
        borderColor="border"
        paddingBottom={4}
        marginBottom={0}
      >
        {category}
      </Heading>
      {content.map(({ title, description, link, image, alt, id }, idx) => (
        <Flex
          key={id || idx}
          color="text"
          marginBottom="px"
          marginTop={8}
          alignItems={{ sm: "flex-start" }}
        >
          <Box width="5rem">
            {image && (
              <Image
                as={GatsbyImage}
                image={image}
                alt={alt}
                boxShadow={shadow}
                borderRadius="sm"
              />
            )}
          </Box>
          <Flex
            paddingBottom={4}
            width="full"
            alignItems={{ base: "flex-start", sm: "center" }}
            marginLeft={{ base: 4, sm: 6 }}
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor="border"
            flexDir={{ base: "column", sm: "row" }}
          >
            <Box flexDir="column">
              <Box>{title}</Box>
              <Box fontSize="sm" marginBottom={0} opacity="0.6">
                {description}
              </Box>
            </Box>
            {link && (
              <ButtonLink
                variant="outline"
                to={link}
                marginLeft={{ base: 0, sm: 8 }}
                paddingY={1}
                paddingX={6}
                borderRadius="sm"
                marginTop={{ base: 4, sm: 0 }}
              >
                <Translation id="page-dapps-ready-button" />
              </ButtonLink>
            )}
          </Flex>
        </Flex>
      ))}
    </Box>
  )
}

export default ProductList
