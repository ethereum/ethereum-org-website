// Libraries
import React, { ReactElement, ReactNode } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useEffect, useState } from "react"
import * as ReactDOMServer from "react-dom/server"
import {
  Box,
  Flex,
  Img,
  Center,
  Heading,
  Text,
  FlexProps,
} from "@chakra-ui/react"

// Components
import Translation from "../components/Translation"
import ButtonLink from "./ButtonLink"
import Emoji from "./Emoji"
import Link from "./Link"

// Utils
import { getImage, getSrc, ImageDataLike } from "../utils/image"
import { trackCustomEvent } from "../utils/matomo"

export interface IHide {
  shouldHide: boolean
}

export interface IPropsBase extends FlexProps {
  children?: React.ReactNode
  alt: string
  artistName?: string
  artistUrl?: string
  src?: string
  title: string
}

interface IPropsWithSVG extends IPropsBase {
  svg: React.FC<React.SVGProps<SVGSVGElement>>
  image?: never
}
interface IPropsWithImage extends IPropsBase {
  svg?: never
  image: ImageDataLike | null
}
interface IPropsWithImageAndSVG extends IPropsBase {
  svg: React.FC<React.SVGProps<SVGSVGElement>>
  image: ImageDataLike | null
}

export type IProps = IPropsWithImage | IPropsWithSVG | IPropsWithImageAndSVG

const getSvgRendered = (Svg: React.FC<React.SVGProps<SVGSVGElement>>) => {
  const svgRendered = ReactDOMServer.renderToString(<Svg />)

  const addingSizeText = 'height="64" width="64" '
  const index = svgRendered.indexOf("<svg ") + 5

  if (svgRendered.includes("width=") && svgRendered.includes("height=")) {
    const svgRenderedReplaced = svgRendered
      .replace(/(width\s*=\s*["'](.*?)["'])/g, 'width="64"')
      .replace(/(height\s*=\s*["'](.*?)["'])/g, 'height="64"')

    return svgRenderedReplaced
  } else {
    const svgRenderedWithSize = [
      svgRendered.slice(0, index),
      addingSizeText,
      svgRendered.slice(index),
    ].join("")
    return svgRenderedWithSize
  }
}

const AssetDownload: React.FC<IProps> = ({
  alt,
  artistName,
  artistUrl,
  children,
  image,
  src,
  title,
  svg,
  ...rest
}) => {
  const baseUrl = `https://ethereum.org`
  const downloadUri = src ? src : image ? getSrc(image) : ""
  const downloadUrl = `${baseUrl}${downloadUri}`

  const Svg = svg
  const [svgUrl, setSvgUrl] = useState<string>("")

  useEffect(() => {
    if (Svg) {
      const svgFile = new File([getSvgRendered(Svg)], "filename.svg", {
        type: "image/svg+xml",
      })
      const svgUrl = URL.createObjectURL(svgFile)
      setSvgUrl(svgUrl)
    }
  }, [])

  return (
    <Flex
      maxW="100%"
      minW="170px"
      flex="1 1 45%"
      flexDirection="column"
      justifyContent="space-between"
      m={4}
      p={0}
      {...rest}
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
            {!image && Svg && <Svg />}
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
      <Flex gap={5} mt={4}>
        {downloadUrl && (
          <ButtonLink
            to={downloadUrl}
            onClick={() => {
              trackCustomEvent({
                eventCategory: "asset download button",
                eventAction: "click",
                eventName: title,
              })
            }}
          >
            <Translation id="page-assets-download-download" />
            <>&nbsp;(PNG)</>
          </ButtonLink>
        )}
        {svgUrl && (
          <ButtonLink
            to={svgUrl}
            download
            onClick={() => {
              trackCustomEvent({
                eventCategory: "asset download button",
                eventAction: "click",
                eventName: title,
              })
            }}
          >
            <Translation id="page-assets-download-download" />
            <>&nbsp;(SVG)</>
          </ButtonLink>
        )}
      </Flex>
    </Flex>
  )
}

export default AssetDownload
