import React, { ReactNode } from "react"
import { StaticImageData } from "next/image"
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react"

import { Image } from "./Image"
import { BaseLink } from "./Link"
import Text from "./OldText"

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

export interface IProps extends Omit<LinkBoxProps, "title"> {
  children?: React.ReactNode
  to: string
  alt?: string
  image: StaticImageData
  title: ReactNode
  description?: ReactNode
  className?: string
  isRight?: boolean
  isBottom?: boolean
}

const ActionCard: React.FC<IProps> = ({
  to,
  alt,
  image,
  title,
  description,
  children,
  className,
  isRight,
  isBottom = true,
  ...rest
}) => {
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
      {...rest}
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
          alt={alt || ""}
          h="full"
          style={{ objectFit: "contain" }}
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
            to={to}
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
