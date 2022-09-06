import React, { ReactNode } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Flex } from "@chakra-ui/react"

import Link from "./Link"
import { ImageProp } from "../types"

export type CardListItem = {
  title?: ReactNode
  description?: ReactNode
  caption?: ReactNode
  link?: string
  id?: string | number
} & ImageProp

export interface IProps {
  content: Array<CardListItem>
  clickHandler?: (idx: string | number) => void
}

const CardList: React.FC<IProps> = ({ content, clickHandler = () => null }) => (
  <Box bg="background" width="full">
    {content.map((listItem, idx) => {
      const { title, description, caption, link, image, alt, id } = listItem
      const isLink = !!link
      return isLink ? (
        <Link
          key={id || idx}
          to={link}
          textDecoration="none"
          display="flex"
          justifyContent="space-between"
          p={4}
          color="text"
          border="1px solid"
          borderColor="border"
          _hover={{
            borderRadius: "base",
            boxShadow: "0 0 1px var(--eth-colors-primary)",
            background: "tableBackgroundHover",
          }}
        >
          {image && (
            <Box
              as={GatsbyImage}
              image={image}
              alt={alt}
              minW="20px"
              mr={4}
              mt={1}
            />
          )}
          <Flex flex="1 1 75%" direction="column" mr={8}>
            <Box>{title}</Box>

            <Box fontSize="sm" mb={0} opacity={0.6}>
              {description}
            </Box>
          </Flex>
          {caption && (
            <Flex flex="1 0 25%" align="center" wrap="wrap" mr={4}>
              <Box fontSize="sm" mb={0} opacity={0.6}>
                {caption}
              </Box>
            </Flex>
          )}
        </Link>
      ) : (
        <Flex
          key={idx}
          onClick={() => clickHandler(idx)}
          textDecoration="none"
          justify="space-between"
          p={4}
          mb={4}
          color="text"
          border="1px solid"
          borderColor="border"
          _hover={{
            borderRadius: "base",
            boxShadow: "0 0 1px var(--eth-colors-primary)",
            background: "tableBackgroundHover",
          }}
        >
          {image && (
            <Box
              as={GatsbyImage}
              image={image}
              alt={alt}
              minW="20px"
              mr={4}
              mt={1}
            />
          )}
          <Flex flex="1 1 75%" direction="column" mr={8}>
            <Box>{title}</Box>

            <Box fontSize="sm" mb={0} opacity={0.6}>
              {description}
            </Box>
          </Flex>
          {caption && (
            <Flex flex="1 0 25%" align="center" wrap="wrap" mr={4}>
              <Box fontSize="sm" mb={0} opacity={0.6}>
                {caption}
              </Box>
            </Flex>
          )}
        </Flex>
      )
    })}
  </Box>
)

export default CardList
