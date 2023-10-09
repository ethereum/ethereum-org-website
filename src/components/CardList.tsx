import { ReactNode } from "react"
import {
  Box,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  type BoxProps,
  type StackProps,
  useColorModeValue,
} from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"
import { Image } from "@/components/Image"
import * as url from "@/lib/utils/url"
import type { StaticImageData } from "next/image"

export type CardListItem = {
  title?: ReactNode
  description?: ReactNode
  caption?: ReactNode
  link?: string
  id?: string
  image?: string | StaticImageData
  alt?: string
}

const CardContainer = (props: StackProps) => (
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
    {...props} />
)

const Card = (props: CardListItem & Omit<StackProps, "title" | "id">) => {
  const { title, description, caption, link, image, alt, ...rest } = props

  const isLink = !!link
  const isExternal = url.isExternal(link || "")

  const descriptionColor = useColorModeValue("gray.500", "gray.400")

  return (
    <CardContainer {...rest}>
      {image && <Image src={image} alt={alt || ""} minW="20px" />}
      <Flex flex="1 1 75%" direction="column">
        {isLink ? (
          <LinkOverlay
            as={BaseLink}
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

export interface IProps extends Omit<BoxProps, "content"> {
  content: Array<CardListItem>
  clickHandler?: (idx: string | number) => void
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
