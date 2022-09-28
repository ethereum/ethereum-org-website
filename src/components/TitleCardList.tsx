import React from "react"
import styled from "@emotion/styled"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Icon from "./Icon"
import Link from "./Link"
import Translation from "./Translation"
import { TranslationKey } from "../utils/translations"
import {
  Flex,
  Box,
  Hide,
  Icon as ChakraIcon,
  Link as ChakraLink,
} from "@chakra-ui/react"

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
  icon: string
  isCode: boolean
}

const TitleCardList: React.FC<IProps> = ({
  content,
  className,
  clickHandler,
  headerKey,
  icon,
  isCode,
}) => (
  <Box
    bg="background"
    boxShadow="tableBoxShadow"
    width="100%"
    margin="2rem"
    border-radius="2px"
    className={className}
  >
    <Flex
      bg="ednBackground"
      align="center"
      justifyContent="space-between"
      padding="1rem"
      flexDirection="row-reverse"
      fontWeight="600"
      borderBottom="1px"
      borderBottomStyle="solid"
      borderBottomColor="text"
    >
      {icon && (
        <ChakraIcon
          as={Icon}
          name={icon}
          _hover={{
            path: { fill: "tranparent" },
          }}
        />
      )}
      <Translation id={headerKey} />
      {isCode && (
        <Hide below="s">
          <Flex>
            <Box
              width="12px"
              height="12px"
              bg="fail300"
              marginRight="0.5rem"
              borderRadius="64px"
            />
            <Box
              width="12px"
              height="12px"
              bg="gridYellow"
              marginRight="0.5rem"
              borderRadius="64px"
            />
            <Box
              width="12px"
              height="12px"
              bg="success300"
              marginRight="0.5rem"
              borderRadius="64px"
            />
          </Flex>
        </Hide>
      )}
    </Flex>
    {content.map((listItem, idx) => {
      let { title, description, caption, link, image, alt, id } = listItem
      const isLink = !!link
      console.log("isLink", image)
      console.log("caption", caption)
      return isLink ? (
        <ChakraLink
          key={id || idx}
          as={Link}
          to={link}
          textDecoration="none"
          display="flex"
          justifyContent="space-between"
          color="text"
          marginBottom="1px"
          padding="1rem"
          width="100%"
          boxShadow="0px 1px 1px var(--eth-colors-tableItemBoxShadow)"
          _hover={{
            textDecoration: "none",
            boxShadow: "0 0 1px var(--eth-colors-primary)",
            bg: "primary100",
            color: "black",
          }}
        >
          {image && (
            <GatsbyImage
              style={{
                marginTop: "4px",
                minWidth: "20px",
                marginRight: "1rem",
              }}
              image={image}
              alt={alt || ""}
            />
          )}
          <Flex flex="1 1 75%" flexDirection="column" marginRight="2rem">
            <Box>{title}</Box>

            <Box fontSize="s" marginBottom="0" opacity="0.7">
              {description}
            </Box>
          </Flex>
          {caption && (
            <Flex
              flex="1 0 25%"
              alignItems="center"
              flexWrap="wrap"
              marginRight="1rem"
            >
              <Box fontSize="s" marginBottom="0" opacity="0.7">
                {caption}
              </Box>
            </Flex>
          )}
        </ChakraLink>
      ) : (
        <Flex
          key={idx}
          onClick={() => clickHandler(idx)}
          width="100%"
          marginBottom="1px"
          padding="1rem"
          textDecoration="none"
          color="text"
          justifyContent="space-between"
          cursor="pointer"
          boxShadow="0px 1px 1px var(--eth-colors-tableItemBoxShadow)"
          _hover={{
            boxShadow: "0 0 1px var(--eth-colors-primary)",
            bg: "primary100",
            color: "black",
          }}
        >
          {image && (
            <GatsbyImage
              style={{
                marginTop: "4px",
                minWidth: "20px",
                marginRight: "1rem",
              }}
              image={image}
              alt={alt || ""}
            />
          )}
          <Flex flex="1 1 75%" flexDirection="column" marginRight="2rem">
            <Box>{title}</Box>

            <Box fontSize="0.875rem" marginBottom="0" opacity="0.7">
              {description}
            </Box>
          </Flex>
          {caption && (
            <Flex
              flex="1 0 25%"
              alignItems="center"
              flexWrap="wrap"
              marginRight="1rem"
            >
              <Box fontSize="0.875rem" marginBottom="0" opacity="0.7">
                {caption}
              </Box>
            </Flex>
          )}
        </Flex>
      )
    })}
  </Box>
)

export default TitleCardList
