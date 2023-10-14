import React from "react"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { Box } from "@chakra-ui/react"

import Text from "./OldText"
import OldHeading from "./OldHeading"
import GatsbyImage from "./GatsbyImage"

export interface IProps {
  children?: React.ReactNode
  image: IGatsbyImageData
  alt: string
  title: string
  description: string
  className?: string
}

const ImageCard: React.FC<IProps> = ({
  image,
  alt,
  title,
  description,
  children,
}) => (
  <Box
    bg="searchBackground"
    borderRadius="base"
    border="1px"
    borderColor="lightBorder"
    p={6}
  >
    <GatsbyImage image={image} alt={alt} w={12} h={12} mb={4} />
    <OldHeading as="h3">{title}</OldHeading>
    <Text opacity={0.8}>{description}</Text>
    {children}
  </Box>
)

export default ImageCard
