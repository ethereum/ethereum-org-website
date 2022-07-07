import React from "react"
import styled, { useTheme } from "styled-components"
import Icon from "./Icon"
import Link from "./Link"
import Emoji from "./Emoji"

export interface IProps {
  to: string
  className?: string
  isExternal?: boolean
}

const Container = styled(Link)<{ isExternal: boolean }>`
  position: relative;
  z-index: 1;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  &:hover {
    box-shadow: 0 0 1px ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.tableBackgroundHover};
    border-radius: 4px;

    svg {
      fill: ${(props) => props.theme.colors.primary};
      transition: transform 0.1s;
      transform: scale(1.2)
        rotate(${({ isExternal }) => (isExternal ? "-45deg" : "0")});
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const TextCell = styled.div`
  flex: 1;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
`

const Title = styled.p`
  color: ${({ theme }) => theme.colors.text300};
  font-weight: 600;
  margin: 0;
`

const Arrow = styled(Icon)<{ isExternal: boolean }>`
  margin: 0rem 1.5rem;
  align-self: center;
  min-width: 2rem;
  transform: rotate(${({ isExternal }) => (isExternal ? "-45deg" : "0")});
`

const EmojiCell = styled.div`
  display: flex;
  align-items: center;
`

const DocLink: React.FC<IProps> = ({
  to,
  children,
  className,
  isExternal = false,
}) => {
  const theme = useTheme()

  return (
    <Container to={to} className={className} isExternal={isExternal} hideArrow>
      <EmojiCell>
        <Emoji size={1} text=":page_with_curl:" mr={`1rem`} />
      </EmojiCell>
      <TextCell>
        <Title>{children}</Title>
      </TextCell>
      <Arrow
        isExternal={isExternal}
        color={theme.colors.text}
        name="arrowRight"
      />
    </Container>
  )
}

export default DocLink
