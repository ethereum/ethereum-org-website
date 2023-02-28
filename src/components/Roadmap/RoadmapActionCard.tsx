import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ActionCard, { IProps } from "../ActionCard"

import { getImage } from "../../utils/image"

const RoadmapActionCard: React.FC<IProps> = ({
  to,
  alt,
  image,
  title,
  description,
  children,
}) => {
  const data = useStaticQuery(graphql`
    query RoadmapActionCard {
      futureProofing: file(relativePath: { eq: "upgrades/core.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            layout: CONSTRAINED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      scaling: file(relativePath: { eq: "eth.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            layout: CONSTRAINED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      security: file(relativePath: { eq: "hackathon_transparent.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            layout: CONSTRAINED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      userExperience: file(relativePath: { eq: "enterprise-eth.png" }) {
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

  return (
    <ActionCard
      to={to}
      alt={alt}
      image={getImage(data[image])}
      title={title}
      description={description}
    >
      {children}
    </ActionCard>
  )
}

export default RoadmapActionCard
