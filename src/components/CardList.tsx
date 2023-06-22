import React, { ReactNode } from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import {
  Box,
  BoxProps,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  StackProps,
  useColorModeValue,
} from "@chakra-ui/react"

import * as url from "../utils/url"
import Link from "./Link"

export type CardListItem = {
  title?: ReactNode
  description?: ReactNode
  caption?: ReactNode
  link?: string
  id?: string
  image?: IGatsbyImageData
  alt?: string
}

export interface IProps extends BoxProps {
  content: Array<CardListItem>
  clickHandler?: (idx: string | number) => void
}

const CardContainer = (props: StackProps) => {
  return (
    <HStack
      spacing={4}
      p={4}
      color="text"
      border="1px solid"
      borderColor="border"
      _hover={{
        borderRadius: "base",
        boxShadow: "0 0 1px var(--eth-colors-primary)",
        background: "tableBackgroundHover",
      }}
      {...props}
    />
  )
}

const Card = (props: CardListItem & Omit<StackProps, "title" | "id">) => {
  const { title, description, caption, link, image, alt, ...rest } = props

  const isLink = !!link
  const isExternal = url.isExternal(link || "")

  const descriptionColor = useColorModeValue("gray.500", "gray.400")

  return (
    <CardContainer {...rest}>
      {image && (
        <Box as={GatsbyImage} image={image} alt={alt || ""} minW="20px" />
      )}
      <Flex flex="1 1 75%" direction="column">
        {isLink ? (
          <LinkOverlay
            as={Link}
            href={link}
            hideArrow
            color="text"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {title}
          </LinkOverlay>
        ) : (
          <Box>{title}</Box>
        )}

        <Box fontSize="sm" mb={0} color={descriptionColor}>
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
      {isExternal && <Box>↗</Box>}
    </CardContainer>
  )
}

const CardList: React.FC<IProps> = ({
  content,
  clickHandler = () => null,
  ...rest
}) => (
  <Box bg="background.base" w="full" {...rest}>
    {content.map((listItem, idx) => {
      const { link, id } = listItem
      const isLink = !!link

      return isLink ? (
        <LinkBox key={id || idx}>
          <Card {...listItem} />
        </LinkBox>
      ) : (
        <Card
          key={idx}
          onClick={() => clickHandler(idx)}
          mb={4}
          {...listItem}
        />
      )
    })}
  </Box>
)

export default CardList
