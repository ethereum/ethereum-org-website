import { Box, Flex, type FlexProps, Heading, Text } from "@chakra-ui/react"

import { Image, type ImageProps } from "@/components/Image"

export type CalloutBannerProps = FlexProps & {
  children?: React.ReactNode
  image: ImageProps["src"]
  imageWidth?: number
  title: string
  description: string
  alt: string
  alignImage?: FlexProps["alignItems"]
}

const CalloutBanner = ({
  image,
  imageWidth,
  title,
  description,
  alt,
  children,
  alignImage = "center",
  ...props
}: CalloutBannerProps) => {
  return (
    <Flex
      as="aside"
      flexDir={{ base: "column", md: "row-reverse" }}
      bg="layer2Gradient"
      borderRadius="base"
      {...props}
    >
      {image && (
        <Flex
          flex="1 1 50%"
          position="relative"
          justify="center"
          align={alignImage}
          minH={{ base: 200, md: "auto" }}
          px={{ base: 8, md: 0 }}
        >
          <Image
            src={image}
            width={imageWidth}
            alt={alt}
            position="absolute"
            w="full"
            maxH="150%"
            style={{
              objectFit: "contain",
            }}
          />
        </Flex>
      )}
      <Flex
        flex="1 1 50%"
        flexDir="column"
        gap="8"
        py="8"
        ps="8"
        pe={{ base: 8, lg: 0 }}
      >
        <Flex gap="2" flexDir="column">
          <Heading size="lg">{title}</Heading>
          <Text size="lg">{description}</Text>
        </Flex>
        <Box>{children}</Box>
      </Flex>
    </Flex>
  )
}

export default CalloutBanner
