import React from "react"
import { IoCodeOutline } from "react-icons/io5"
import {
  Box,
  Flex,
  Hide,
  Icon,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react"

import { TranslationKey } from "@/lib/types"
import { ITitleCardItem } from "@/lib/interfaces"

import { Image } from "@/components/Image"
import { BaseLink } from "@/components/Link"
import Translation from "@/components/Translation"

export type TitleCardListProps = {
  content: Array<ITitleCardItem>
  className?: string
  clickHandler: (idx: number) => void
  headerKey: TranslationKey
  isCode: boolean
}

const TitleCardList = ({
  content,
  className,
  clickHandler,
  headerKey,
  isCode,
}: TitleCardListProps) => {
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
        <Icon as={IoCodeOutline} />
        <Translation id={headerKey} />
        {isCode && (
          <Hide below="s">
            <Flex>
              <Box
                width="12px"
                height="12px"
                bg="fail300"
                me={2}
                borderRadius="full"
              />
              <Box
                width="12px"
                height="12px"
                bg="gridYellow"
                me={2}
                borderRadius="full"
              />
              <Box
                width="12px"
                height="12px"
                bg="success300"
                me={2}
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
            display="flex"
            textDecoration="none"
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
              <Image
                src={image}
                alt={alt || ""}
                marginTop={1}
                me={4}
                minWidth={5}
              />
            )}
            <Flex flex="1 1 75%" flexDirection="column" me={8}>
              <LinkOverlay
                as={BaseLink}
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
              <Flex flex="1 0 25%" alignItems="center" flexWrap="wrap" me={4}>
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
              "*": { color: "black" },
            }}
          >
            {image && (
              <Image
                src={image}
                alt={alt || ""}
                marginTop={1}
                me={4}
                minWidth={5}
              />
            )}
            <Flex flex="1 1 75%" flexDirection="column" me={8}>
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
              <Flex flex="1 0 25%" alignItems="center" flexWrap="wrap" me={4}>
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
