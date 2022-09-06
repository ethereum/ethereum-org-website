import React, { ReactNode } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Flex, LinkBox, LinkOverlay } from "@chakra-ui/react"

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

const CardContainer = (props) => {
  return (
    <Flex
      p={4}
      justify="space-between"
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

const Card = (props) => {
  const { title, description, caption, link, image, alt } = props

  const isLink = !!link
  const Title = isLink ? LinkOverlay : Box

  return (
    <CardContainer>
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
        <Title href={link}>{title}</Title>

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
    </CardContainer>
  )
}

const CardList: React.FC<IProps> = ({ content, clickHandler = () => null }) => (
  <Box bg="background" width="full">
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
