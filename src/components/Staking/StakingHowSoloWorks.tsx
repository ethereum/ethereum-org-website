import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import OrderedList from "../OrderedList"
import Translation from "../Translation"

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Image = styled(GatsbyImage)``

export interface IProps {}

const StakingHowSoloWorks: React.FC<IProps> = () => {
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "hackathon_transparent.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            layout: CONSTRAINED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  const items = [
    <p>
      <Translation id="page-staking-how-solo-works-item-1" />
    </p>,
    <p>
      <Translation id="page-staking-how-solo-works-item-2" />
    </p>,
    <p>
      <Translation id="page-staking-how-solo-works-item-3" />
    </p>,
    <p>
      <Translation id="page-staking-how-solo-works-item-4" />
    </p>,
    <p>
      <Translation id="page-staking-how-solo-works-item-5" />
    </p>,
  ]

  return (
    <Flex>
      <OrderedList listData={items} />
      <Image image={getImage(image)} />
    </Flex>
  )
}

export default StakingHowSoloWorks
