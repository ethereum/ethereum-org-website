import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Link from "./Link"

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }

  ol {
    list-style: none;
    counter-reset: li-counter;
    padding-left: 2rem;
  }

  ol li {
    margin: 0 0 1rem 0;
    counter-increment: li-counter;
    position: relative;
  }
  ol li::before {
    content: counter(li-counter);
    position: absolute;
    top: -2px; /* adjusts circle + number up and down */
    left: -3rem;
    width: ${({ size }) => (size ? size : "35px")};
    aspect-ratio: 1;
    height: 2rem;
    padding-top: 7px; /* adjusts number up and down */
    line-height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.grayBackground};
    text-align: center;
  }
`

const Image = styled(GatsbyImage)``

const HowSoloStakingWorks = () => {
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
      Get some hardware: You need to <Link to="run-a-node">run a node</Link> to
      stake.
    </p>,
    <p>Sync an execution layer (EL) client</p>,
    <p>Sync a consensus layer (CL) client</p>,
    <p>Generate your keys: Load them into your validator client</p>,
    <p>Monitor and maintain your node</p>,
  ]

  return (
    <Flex>
      <ol>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
      <Image image={getImage(image)} />
    </Flex>
  )
}

export default HowSoloStakingWorks
