// Libraries
import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"

// Components
import ButtonLink from "./ButtonLink"
import Link from "./Link"

// Utils
import { translateMessageId } from "../utils/translations"

// Styles
const ImageWrapper = styled.div<{
  background: string
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`

const Image = styled(GatsbyImage)`
  width: 100%;
  align-self: center;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const Card = styled.div`
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-decoration: none;
  padding: 0.5rem;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0.75rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const StyledButtonLink = styled(ButtonLink)`
  margin: 0.5rem;
`

const Children = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export interface IProps {
  url?: string
  background: string
  image: string
  name: string
  description: string
  note?: string
  alt?: string
  bridge?: string
  tokenLists?: string
  ecosystemPortal?: string
}

const Layer2ProductCard: React.FC<IProps> = ({
  url,
  background,
  image,
  name,
  description,
  note = "",
  alt = "",
  children,
  bridge,
  tokenLists,
  ecosystemPortal,
}) => {
  const intl = useIntl()

  return (
    <Card>
      <ImageWrapper background={background}>
        <Image image={image} alt={alt} objectFit="contain" />
      </ImageWrapper>
      <Content className="hover">
        <div>
          <Title>{name}</Title>
          {children && <Children>{children}</Children>}
          <Description>{description}</Description>
          {note.length > 0 && (
            <Description>
              {translateMessageId("layer-2-note", intl)} {note}
            </Description>
          )}
        </div>
        {bridge && (
          <Link to={bridge}>
            {name} {translateMessageId("layer-2-bridge", intl)}
          </Link>
        )}
        {ecosystemPortal && (
          <Link to={ecosystemPortal}>
            {name} {translateMessageId("layer-2-ecosystem-portal", intl)}
          </Link>
        )}
        {tokenLists && (
          <Link to={tokenLists}>
            {name} {translateMessageId("layer-2-token-lists", intl)}
          </Link>
        )}
      </Content>
      <StyledButtonLink to={url}>
        {translateMessageId("layer-2-explore", intl)} {name}
      </StyledButtonLink>
    </Card>
  )
}

export default Layer2ProductCard
