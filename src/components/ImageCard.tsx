import React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Box, Image, Text } from "@chakra-ui/react"

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
  className,
}) => (
  <Box bg="searchBackground" borderRadius="base" border="1px" borderColor="lightBorder" p={6}> 
    <Image as={GatsbyImage} src={image} alt={alt} w={12} h={12} mb={4}  />
    <Heading as="h3">{title}</Heading>
    <Text opacity={0.8} >{description}</Text>
    {children}
  </Box>
)

export default ImageCard