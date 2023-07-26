import React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Link from "./Link"
import Translation from "./Translation"
import { TranslationKey } from "../utils/translations"
import {
  Flex,
  Box,
  Hide,
  Icon,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react"

import { IoCodeOutline } from "react-icons/io5"

export interface ITitleCardItem {
  title: string
  description: string
  caption?: string
  link?: string
  image?: IGatsbyImageData
  alt?: string
  id?: number
}

export interface IProps {
  content: Array<ITitleCardItem>
  className?: string
  clickHandler: (idx: number) => void
  headerKey: TranslationKey
  isCode: boolean
}

const TitleCardList: React.FC<IProps> = ({
  content,
  className,
  clickHandler,
  headerKey,
  isCode,
}) => {
  // This will be accessible with color contrast
  const descriptionCaptionColor = useColorModeValue(
    "blackAlpha.700",
    "whiteAlpha.700"
  )
  return (
    <Box
      bg="background.base"
      boxShadow="tableBox"
      width="100%"
      border-radius="sm"
      className={className}
    >
      <Flex
        bg="ednBackground"
        align="center"
        justifyContent="space-between"
        padding={4}
        flexDirection="row-reverse"
        fontWeight="600"
        borderBottom={0.25}
        borderBottomStyle="solid"
        borderBottomColor="text"
      >
        <Icon
          as={IoCodeOutline}
          _hover={{
            path: { fill: "tranparent" },
          }}
        />
        <Translation id={headerKey} />
        {isCode && (
          <Hide below="s">
            <Flex>
              <Box
                width="12px"
                height="12px"
                bg="fail300"
                marginRight={2}
                borderRadius="full"
              />
              <Box
                width="12px"
                height="12px"
                bg="gridYellow"
                marginRight={2}
                borderRadius="full"
              />
              <Box
                width="12px"
                height="12px"
                bg="success300"
                marginRight={2}
                borderRadius="full"
              />
            </Flex>
          </Hide>
        )}
      </Flex>
      {content.map((listItem, idx) => {
        const { title, description, caption, link, image, alt, id } = listItem
        const isLink = !!link

        return isLink ? (
          <LinkBox
            key={id || idx}
            as={Link}
            href={link}
            display="flex"
            textDecoration="none"
            hideArrow
            justifyContent="space-between"
            color="text"
            marginBottom="1px"
            padding={4}
            width="100%"
            boxShadow="0px 1px 1px var(--eth-colors-tableItemBoxShadow)"
            _hover={{
              textDecoration: "none",
              boxShadow: "0 0 1px var(--eth-colors-primary-base)",
              bg: "primary100",
              color: "black",
            }}
          >
            {image && (
              <Box
                as={GatsbyImage}
                marginTop={1}
                marginRight={4}
                minWidth={5}
                image={image}
                alt={alt || ""}
              />
            )}
            <Flex flex="1 1 75%" flexDirection="column" marginRight={8}>
              <LinkOverlay
                as={Link}
                href={link}
                hideArrow
                color="inherit"
                textDecoration="none"
                _hover={{
                  textDecoration: "none",
                }}
              >
                {title}
              </LinkOverlay>

              <Box
                fontSize="sm"
                marginBottom="0"
                color={descriptionCaptionColor}
              >
                {description}
              </Box>
            </Flex>
            {caption && (
              <Flex
                flex="1 0 25%"
                alignItems="center"
                flexWrap="wrap"
                marginRight={4}
              >
                <Box
                  fontSize="sm"
                  marginBottom="0"
                  color={descriptionCaptionColor}
                >
                  {caption}
                </Box>
              </Flex>
            )}
          </LinkBox>
        ) : (
          <Flex
            key={idx}
            onClick={() => clickHandler(idx)}
            width="100%"
            marginBottom="1px"
            padding={4}
            textDecoration="none"
            color="text"
            justifyContent="space-between"
            cursor="pointer"
            boxShadow="0px 1px 1px var(--eth-colors-tableItemBoxShadow)"
            _hover={{
              boxShadow: "0 0 1px var(--eth-colors-primary-base)",
              bg: "primary100",
              color: "black",
            }}
          >
            {image && (
              <Box
                as={GatsbyImage}
                marginTop={1}
                marginRight={4}
                minWidth={5}
                image={image}
                alt={alt || ""}
              />
            )}
            <Flex flex="1 1 75%" flexDirection="column" marginRight={8}>
              <Box>{title}</Box>

              <Box
                fontSize="sm"
                marginBottom="0"
                color={descriptionCaptionColor}
              >
                {description}
              </Box>
            </Flex>
            {caption && (
              <Flex
                flex="1 0 25%"
                alignItems="center"
                flexWrap="wrap"
                marginRight={4}
              >
                <Box
                  fontSize="sm"
                  marginBottom="0"
                  color={descriptionCaptionColor}
                >
                  {caption}
                </Box>
              </Flex>
            )}
          </Flex>
        )
      })}
    </Box>
  )
}

export default TitleCardList
