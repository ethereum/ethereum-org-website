import React from "react"
import styled from "styled-components"

const HoverCard = styled.div`
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);
  margin: 1rem;

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(
      1.02
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }
`

const Content = styled.div`
  padding: 1.5rem;
  margin-top: -1rem;
`

const Description = styled.p`
  opacity: 0.8;
`

const Image = styled.img`
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  background: radial-gradient(
    46.28% 66.31% at 66.95% 58.35%,
    #e6e6f7 0%,
    #e7edfa 50%,
    #e9fbfa 100%
  );
`

const Link = styled.a`
  flex: 1 1 424px;
`

const ActionCard = ({ to, image, title, description, children, className }) => {
  return (
    <Link href={to}>
      <HoverCard className={className}>
        <Image src={image} />
        <Content>
          <h3>{title}</h3>
          <Description>{description}</Description>
          {children}
        </Content>
      </HoverCard>
    </Link>
  )
}

export default ActionCard
