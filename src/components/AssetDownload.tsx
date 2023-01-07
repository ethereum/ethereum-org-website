import React from "react"
import styled from "@emotion/styled"
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
    <Container
      display={{
        base: "flex",
        lg: `${(props) => (props.shouldHide ? `none` : `flex`)}`,
      }}
      maxWidth="100%"
      flex="1 1 45%"
      flexDirection="column"
      justifyContent="space-between"
      margin="4"
      padding="0"
      opacity={(props) => (props.shouldHide ? 0 : 1)}
      shouldhide={shouldHide}
    >
      <Heading as="h4" size="md" fontWeight="500">
        {title}
      </Heading>
      <Box>
        {children && <ImageContainer>{children}</ImageContainer>}
        {!children && (
          <Center border="1px" borderColor="white.700" padding={8}>
            {Svg && <Svg alt={alt} />}
            {image && (
              <Img
                as={GatsbyImage}
                image={getImage(image)!}
                alt={alt}
                width="100%"
                alignSelf="center"
              />
            )}
          </Center>
        )}
        {artistName && (
          <Flex
            marginBottom={4}
            border="1px"
            borderTop="none"
            borderColor="white.700"
            padding="0.5rem 1rem"
            borderRadius="0 0 4px 4px"
          >
            <Flex mr={2} fontSize="md" textColor="gray.300">
              <Emoji text=":artist_palette:" mr={2} fontSize="2xl" />
              <Translation id="page-assets-download-artist" />
            </Flex>
            {artistUrl && <Link to={artistUrl}>{artistName}</Link>}
            {!artistUrl && <Text m={0}>{artistName}</Text>}
          </Flex>
        )}
      </Box>
      <Container mt={4} p={0} maxW="none">
        {!Svg && (
          <ButtonLink to={downloadUrl}>
            <Translation id="page-assets-download-download" />
          </ButtonLink>
        )}
      </Container>
    </Container>
  )
}

export default AssetDownload
