import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"

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

  const CATEGORY_NAME = "category-name"

  return (
    <Box boxSize="full">
      <Heading
        as="h3"
        id={CATEGORY_NAME}
        fontSize="2xl"
        borderBottom="2px solid"
        borderColor="border"
        paddingBottom={4}
        marginBottom={0}
      >
        {category}
      </Heading>
      <Flex
        as={List}
        aria-labelledby={CATEGORY_NAME}
        m={0}
        flexDirection="column"
        height="inherit"
      >
        {content.map(({ title, description, link, image, alt, id }, idx) => (
          <Flex
            as={ListItem}
            key={id || idx}
            color="text"
            marginBottom="px"
            marginTop={8}
            height="inherit"
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
              justifyContent="space-between"
              flexDir={{ base: "column", sm: "row" }}
              paddingBottom={4}
              width="full"
              marginLeft={{ base: 4, sm: 6 }}
              borderBottom="1px solid"
              borderColor="border"
            >
              <Box flex={1}>
                <Box>{title}</Box>
                <Box fontSize="sm" marginBottom={0} opacity="0.6">
                  {description}
                </Box>
              </Box>
              {link && (
                <ButtonLink
                  variant="outline"
                  to={link}
                  alignSelf="center"
                  marginLeft={{ base: 0, sm: 8 }}
                  paddingY={1}
                  paddingX={6}
                  borderRadius="sm"
                  marginTop={{ base: 4, sm: 0 }}
                >
                  <Translation id="page-dapps-ready-button" />
                  <VisuallyHidden>to {title} website</VisuallyHidden>
                </ButtonLink>
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default ProductList
