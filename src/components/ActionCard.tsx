import { StaticImageData } from "next/image"
import type { ReactNode } from "react"
import {
  Box,
  type BoxProps,
  Flex,
  Heading,
  LinkBox,
  type LinkBoxProps,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react"

import { Image } from "@/components/Image"
import { BaseLink } from "@/components/Link"
import Text from "@/components/OldText"

const linkBoxFocusStyles: BoxProps = {
  borderRadius: "base",
  boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
  bg: "tableBackgroundHover",
  transition: "transform 0.1s",
  transform: "scale(1.02)",
}

const linkFocusStyles: BoxProps = {
  textDecoration: "none",
}

export type ActionCardProps = Omit<LinkBoxProps, "title"> & {
  children?: ReactNode
  href: string
  alt?: string
  image: StaticImageData
  imageWidth?: number
  title: ReactNode
  description?: ReactNode
  className?: string
  isRight?: boolean
  isBottom?: boolean
}

const ActionCard = ({
  href,
  alt,
  image,
  imageWidth = 220,
  title,
  description,
  children,
  className,
  isRight,
  isBottom = true,
  ...props
}: ActionCardProps) => {
  const descriptionColor = useColorModeValue("blackAlpha.700", "whiteAlpha.800")

  return (
    <LinkBox
      boxShadow="
	  0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05)"
      color="text"
      flex="1 1 372px"
      _hover={linkBoxFocusStyles}
      _focus={linkBoxFocusStyles}
      className={className}
      m={4}
      {...props}
    >
      <Flex
        h="260px"
        bg="cardGradient"
        direction="row"
        justify={isRight ? "flex-end" : "center"}
        align={isBottom ? "flex-end" : "center"}
        className="action-card-image-wrapper"
        boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
      >
        <Image
          src={image}
          width={imageWidth}
          maxH="full"
          alt={alt || ""}
          style={{ objectFit: "cover" }}
        />
      </Flex>
      <Box p={6} className="action-card-content">
        <Heading
          as="h3"
          fontSize="2xl"
          mt={2}
          mb={4}
          fontWeight={600}
          lineHeight={1.4}
        >
          <LinkOverlay
            as={BaseLink}
            color="text"
            hideArrow
            textDecoration="none"
            href={href}
            _hover={linkFocusStyles}
            _focus={linkFocusStyles}
          >
            {title}
          </LinkOverlay>
        </Heading>
        <Text mb={0} color={descriptionColor}>
          {description}
        </Text>
        {children && <Box mt={8}>{children}</Box>}
      </Box>
    </LinkBox>
  )
}

export default ActionCard
