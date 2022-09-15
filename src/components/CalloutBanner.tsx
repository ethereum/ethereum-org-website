import React from "react"
import styled from "@emotion/styled"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Flex, Heading, Text } from "@chakra-ui/react"

import Translation from "./Translation"
import { TranslationKey } from "../utils/translations"

const Content = styled.div`
  // padding-left: 2rem;
  // flex: 1 0 50%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 2rem;
    // padding-left: 1rem;
    // flex-direction: column;
    // width: 100%;
  }
  // @media (max-width: ${(props) => props.theme.breakpoints.s}) {
  //   padding-left: 0;
  // }
`

const Image = styled(GatsbyImage)<{ maximagewidth?: number }>`
  align-self: center; /* prevents crop */
  width: 100%;
  max-width: ${(props) => `${props.maximagewidth}px`};
  margin-top: -6rem;
  margin-bottom: -6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 0rem;
    margin-top: -6rem;
  }
`

export interface IProps {
  children?: React.ReactNode
  image: IGatsbyImageData
  maxImageWidth?: number
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  alt: string
  className?: string
  id?: string
}

const CalloutBanner: React.FC<IProps> = ({
  image,
  maxImageWidth,
  titleKey,
  descriptionKey,
  alt,
  children,
  className,
  id,
}) => (
  <Flex
    direction={{ base: "column", lg: "row-reverse" }}
    bg="layer2Gradient"
    p={{ base: 8, sm: 12 }}
    mx={{ base: 8, lg: 4 }}
    mt={{ base: 16, lg: 24 }}
    mb={{ base: 16, lg: 4 }}
    borderRadius="base"
    className={className}
    id={id}
  >
    <Image
      image={image}
      alt={alt}
      maximagewidth={maxImageWidth}
      objectFit="contain"
    />
    <Content>
      <Heading as="h2" mt={0} fontSize="2rem" lineHeight="1.4">
        <Translation id={titleKey} />
      </Heading>
      <Text fontSize="xl" w="90%" lineHeight="140%" mb={8} color="text200">
        <Translation id={descriptionKey} />
      </Text>
      {children}
    </Content>
  </Flex>
)

export default CalloutBanner
