import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import { Box, Flex, Text, Heading } from "@chakra-ui/react"
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

const Card = styled(Link)`
  text-decoration: none;
  flex: 1 1 372px;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);
  margin: 1rem;

  &:hover,
  &:focus {
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

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
    <Card to={to} className={className} hideArrow={true}>
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
          {title}
        </Heading>
        <Text mb={0} opacity={0.8}>
          {description}
        </Text>
        {children && <Box mt={8}>{children}</Box>}
      </Box>
    </Card>
  )
}

export default ActionCard
