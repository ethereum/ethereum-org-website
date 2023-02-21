import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Box,
  Flex,
  Container,
  Img,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react"

import Translation from "../components/Translation"
import ButtonLink from "./ButtonLink"
import Emoji from "./Emoji"
import Link from "./Link"

import { getImage, getSrc, ImageDataLike } from "../utils/image"

export interface IHide {
  shouldHide: boolean
}

export interface IPropsBase {
  children?: React.ReactNode
  alt: string
  artistName?: string
  artistUrl?: string
  src?: string
  shouldHide?: boolean
  title: string
}

interface IPropsWithSVG extends IPropsBase {
  svg: React.FC<React.SVGProps<SVGSVGElement> & { alt: string }>
  image?: never
}
interface IPropsWithImage extends IPropsBase {
  svg?: never
  image: ImageDataLike | null
}

export type IProps = IPropsWithImage | IPropsWithSVG

// TODO add ability to download SVGs
const AssetDownload: React.FC<IProps> = ({
  alt,
  artistName,
  artistUrl,
  children,
  image,
  src,
  shouldHide = false,
  title,
  svg,
}) => {
  const baseUrl = `https://ethereum.org`
  const downloadUri = src ? src : image ? getSrc(image) : ""
  const downloadUrl = `${baseUrl}${downloadUri}`
  const Svg = svg

  return (
    <Box
      display={{
        base: shouldHide ? "none" : "flex",
        lg: "flex",
      }}
      maxW="100%"
      minW="170px"
      flex="1 1 45%"
      flexDirection="column"
      justifyContent="space-between"
      m={4}
      p={0}
      opacity={shouldHide ? 0 : 1}
    >
      <Heading as="h4" fontSize={{ base: "md", md: "xl" }} fontWeight="500">
        {title}
      </Heading>
      <Box>
        {children && (
          <Flex
            border="1px"
            borderColor="white700"
            w="100%"
            p={8}
            textAlign="center"
            justify="center"
          >
            {children}
          </Flex>
        )}
        {!children && (
          <Center border="1px" borderColor="white700" p={8} w="100%">
            {Svg && <Svg alt={alt} />}
            {image && (
              <Img
                as={GatsbyImage}
                image={getImage(image)!}
                alt={alt}
                w="100%"
                alignSelf="center"
              />
            )}
          </Center>
        )}
        {artistName && (
          <Flex
            mb={4}
            border="1px"
            borderTop="none"
            borderColor="white700"
            py={2}
            px={4}
            borderRadius="0 0 4px 4px"
          >
            <Flex mr={2} fontSize="md" textColor="text300">
              <Emoji text=":artist_palette:" mr={2} fontSize="2xl" />
              <Translation id="page-assets-download-artist" />
            </Flex>
            {artistUrl && <Link to={artistUrl}>{artistName}</Link>}
            {!artistUrl && <Text m={0}>{artistName}</Text>}
          </Flex>
        )}
      </Box>
      <Box mt={4} p={0}>
        {!Svg && (
          <ButtonLink to={downloadUrl}>
            <Translation id="page-assets-download-download" />
          </ButtonLink>
        )}
      </Box>
    </Box>
  )
}

export default AssetDownload
