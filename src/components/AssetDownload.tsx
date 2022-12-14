// Libraries
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useEffect, useState } from "react"
import * as ReactDOMServer from "react-dom/server"
import Button from "./Button"
import {
  Box,
  Flex,
  Img,
  Center,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

// Components
import Translation from "../components/Translation"
import ButtonLink from "./ButtonLink"
import Emoji from "./Emoji"
import Link from "./Link"

// Utils
import { getImage, getSrc, ImageDataLike } from "../utils/image"
import theme from "../@chakra-ui/gatsby-plugin/theme"
import { trackCustomEvent } from "../utils/matomo"

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
interface IPropsWithImageAndSVG extends IPropsBase {
  svg: React.FC<React.SVGProps<SVGSVGElement> & { alt: string }>
  image: ImageDataLike | null
}

export type IProps = IPropsWithImage | IPropsWithSVG | IPropsWithImageAndSVG

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
  const [svgUrl, setSvgUrl] = useState<string>("")
  const SvgImage = () => {
    return <>{Svg && <Svg alt={alt} />}</>
  }

  const getSvgRendered = () => {
    const svgRendered = ReactDOMServer.renderToString(<SvgImage></SvgImage>)

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

  useEffect(() => {
    const svgFile = new File([getSvgRendered()], "filename.svg", {
      type: "image/svg+xml",
    })
    const svgUrl = URL.createObjectURL(svgFile)
    setSvgUrl(svgUrl)
  }, [])

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
            {!image && Svg && <Svg alt={alt} />}
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
      {!Svg && (
        <Box mt={4} p={0}>
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
          </ButtonLink>
        </Box>
      )}
      {Svg && image && svgUrl && (
        <Box mt={4} p={0}>
          <Flex gap={5}>
            <Button>
              <Link
                to={downloadUrl}
                color="white"
                style={{ textDecoration: "none" }}
                download
              >
                <Translation id="page-assets-download-download" />
                <>&nbsp;(PNG)</>
              </Link>
            </Button>
            <Button>
              <Link
                to={svgUrl}
                color="white"
                style={{ textDecoration: "none" }}
                download={alt}
              >
                <Translation id="page-assets-download-download" />
                <>&nbsp;(SVG)</>
              </Link>
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default AssetDownload
