import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import type { NFT } from "../interfaces"

export const useNFT = (): Array<NFT> => {
  const data = useStaticQuery(graphql`
    {
      deepPanic: file(relativePath: { eq: "deep-panic.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 120
            height: 120
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  return [
    {
      title: "Cool art",
      image: getImage(data.deepPanic)!,
    },
  ]
}
