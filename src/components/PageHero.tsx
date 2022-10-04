import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Wrap, WrapItem } from "@chakra-ui/react"

import { Content } from "./SharedStyledComponents"
import ButtonLink, { IProps as IButtonLinkProps } from "./ButtonLink"
import Button, { IProps as IButtonProps } from "./Button"

export interface IIsReverse {
  isReverse: boolean
}

const HeroContainer = styled.div<IIsReverse>`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0rem;
  padding: 0rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: ${(props) =>
      props.isReverse ? `column` : `column-reverse`};
    /* accounts for when we want image above or below text */
    padding: 0;
  }
`

const HeroContent = styled.div`
  max-width: 640px;
  padding: 8rem 0 8rem 2rem;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 4rem 0;
    max-width: 100%;
  }
`

const HeroImg = styled(GatsbyImage)`
  flex: 1 1 50%;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  margin-top: 3rem;
  margin-left: 3rem;
  width: 100%;
  max-width: 624px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0;
    margin-left: 0;
    max-width: 560px;
  }
`

const Header = styled.h2`
  font-weight: 700;
  font-size: 3rem;
  max-width: 100%;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.text00};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 2.5rem;
  }
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.text300};
`

const Subtitle = styled.div`
  font-size: 1.5rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 1.25rem;
  }
`

export interface IButtonLink extends IButtonLinkProps {
  content: ReactNode
}

export interface IButton extends IButtonProps {
  content: ReactNode
}

export interface IContent {
  buttons?: Array<IButtonLink | IButton>
  title: ReactNode
  header: ReactNode
  subtitle: ReactNode
  image: IGatsbyImageData
  alt: string
}

export interface IProps {
  content: IContent
  isReverse?: boolean
  children?: ReactNode
  className?: string
}

function isButtonLink(button: IButton | IButtonLink): button is IButtonLink {
  return (button as IButtonLink).to !== undefined
}

const PageHero: React.FC<IProps> = ({
  content,
  isReverse = false,
  children,
  className,
}) => {
  const { buttons, title, header, subtitle, image, alt } = content
  return (
    <Content>
      <HeroContainer isReverse={isReverse} className={className}>
        <HeroContent>
          <Title>{title}</Title>
          <Header>{header}</Header>
          <Subtitle>{subtitle}</Subtitle>
          {buttons && (
            <Wrap spacing={2}>
              {buttons.map((button, idx) => {
                if (isButtonLink(button)) {
                  return (
                    <WrapItem>
                      <ButtonLink
                        key={idx}
                        variant={button.variant}
                        to={button.to}
                      >
                        {button.content}
                      </ButtonLink>
                    </WrapItem>
                  )
                }

                if (button.toId) {
                  return (
                    <WrapItem>
                      <Button
                        key={idx}
                        variant={button.variant}
                        toId={button.toId}
                      >
                        {button.content}
                      </Button>
                    </WrapItem>
                  )
                }
              })}
            </Wrap>
          )}
          {children}
        </HeroContent>
        <HeroImg image={image} objectFit="contain" alt={alt} loading="eager" />
      </HeroContainer>
    </Content>
  )
}

export default PageHero
