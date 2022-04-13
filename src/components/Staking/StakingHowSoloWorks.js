import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Link from "../Link"
import OrderedList from "../OrderedList"

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Image = styled(GatsbyImage)``

const StakingHowSoloWorks = () => {
  const intl = useIntl()
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
      Get some hardware: You need to <Link to="/run-a-node/">run a node</Link>{" "}
      to stake.
    </p>,
    <p>Sync an execution layer client</p>,
    <p>Sync a consensus layer client</p>,
    <p>Generate your keys and load them into your validator client</p>,
    <p>Monitor and maintain your node</p>,
  ]

  return (
    <Flex>
      <OrderedList listData={items} />
      <Image image={getImage(image)} />
    </Flex>
  )
}

export default StakingHowSoloWorks
