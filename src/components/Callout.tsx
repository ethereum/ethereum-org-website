// Libraries
import React from "react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"
import Translation from "./Translation"
import { TranslationKey } from "../utils/translations"
// Components
import Emoji from "./OldEmoji"
import { Flex } from "@chakra-ui/react"

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const Image = styled(GatsbyImage)`
  margin-top: -10rem;
  align-self: center;
  max-width: 263px;
  min-height: 200px;
`

const Content = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export interface IProps {
  children?: React.ReactNode
  image?: string
  emoji?: string
  alt?: string
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  className?: string
}

const Callout: React.FC<IProps> = ({
  image,
  emoji,
  alt,
  titleKey,
  descriptionKey,
  children,
  className,
}) => (
  <Flex
    direction="column"
    bgGradient="linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  )"
    p={6}
    m={4}
    mt={32}
    mb={[16]}
    borderRadius="base"
    className={className}
  >
    {image && <Image image={image} alt={alt} />}
    <Content>
      <div>
        {emoji && <Emoji text={emoji} size={3} />}
        <h3>
          <Translation id={titleKey} />
        </h3>
        <Description>
          <Translation id={descriptionKey} />
        </Description>
      </div>
      {children}
    </Content>
  </Flex>
)

export default Callout
