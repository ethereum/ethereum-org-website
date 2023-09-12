import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Center } from "@chakra-ui/react"

import OrderedList from "../OrderedList"
import Translation from "../Translation"
import GatsbyImage from "../GatsbyImage"

import { getImage } from "../../utils/image"

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
    <Center
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
    >
      <OrderedList listData={items} />
      <GatsbyImage image={getImage(image)!} alt="" />
    </Center>
  )
}

export default StakingHowSoloWorks
