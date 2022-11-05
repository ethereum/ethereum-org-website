import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import {
  Box,
  Flex,
  Text,
  Heading,
  BoxProps,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import Link from "./Link"

const Image = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const linkBoxFocusStyles: BoxProps = {
  borderRadius: "4px",
  boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
  bg: "tableBackgroundHover",
  transition: "transform 0.1s",
  transform: "scale(1.02)",
}

const linkFocusStyles: BoxProps = {
  textDecoration: "none",
}

export interface IProps {
  children?: React.ReactNode
  to: string
  alt?: string
  image: IGatsbyImageData | string
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
}) => {
  const isImageURL = typeof image === "string"

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
    >
      <Flex
        minH={"260px"}
        bg={"cardGradient"}
        direction={"row"}
        justify={isRight ? "flex-end" : "center"}
        align={isBottom ? "flex-end" : "center"}
        className="action-card-image-wrapper"
        boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
      >
        {!isImageURL && <Image image={image} alt={alt || ""} />}
        {isImageURL && (
          <img src={image} alt={alt} className="action-card-image" />
        )}
      </Flex>
      <Box p={6} className="action-card-content">
        <Heading as="h3" fontSize="2xl" mt={2} mb={4}>
          <LinkOverlay
            as={Link}
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
        <Text mb={0} opacity={0.8}>
          {description}
        </Text>
        {children && <Box mt={8}>{children}</Box>}
      </Box>
    </LinkBox>
  )
}

export default ActionCard
