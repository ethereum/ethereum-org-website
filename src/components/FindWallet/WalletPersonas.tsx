// Libraries
import React, { useState } from "react"
import styled from "styled-components"

// Styles
const Test = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Persona = styled.div<{
  selected: boolean
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  background: ${(props) =>
    props.selected === true ? "#432E1B" : props.theme.colors.ednBackground};
  border: 1px solid #3d3d3d;
  border-radius: 4px;
  cursor: pointer;
`

const H3 = styled.h3`
  color: ${(props) => props.theme.colors.primary};
`

// Types
interface Personas {
  title: string
  description: string
  featureHighlight: string[]
}

const WalletPersonas = () => {
  const [selectedPersona, setSelectedPersona] = useState(NaN)

  const personas: Personas[] = [
    {
      title: "I'm new to Ethereum",
      description: "You are a first time user looking for your first wallet",
      featureHighlight: ["feature", "feature", "feature", "feature"],
    },
    {
      title: "I'm a hodler",
      description:
        "You are someone that has tokens and don’t want to touch them",
      featureHighlight: ["feature", "feature", "feature", "feature"],
    },
    {
      title: "I'm use decentralized finance",
      description:
        "You are someone that follows DeFI and want’s a wallet easy to use",
      featureHighlight: ["feature", "feature", "feature", "feature"],
    },
    {
      title: "I'm a developer",
      description:
        "You are developer and needs a wallet that helps develop dapps",
      featureHighlight: ["feature", "feature", "feature", "feature"],
    },
    {
      title: "I use multiple chains",
      description:
        "You use wallets on other chains and wants to get in ethereum",
      featureHighlight: ["feature", "feature", "feature", "feature"],
    },
    {
      title: "I'm all about NFT's",
      description:
        "You are someone that is all about NFTs a wallet has to ready",
      featureHighlight: ["feature", "feature", "feature", "feature"],
    },
  ]

  return (
    <Test>
      {personas.map((persona, idx) => {
        return (
          <Persona
            selected={selectedPersona === idx}
            onClick={() => setSelectedPersona(idx)}
          >
            <H3>{persona.title}</H3>
            <p>{persona.description}</p>
            {persona.featureHighlight.map((feature) => (
              <p>{feature}</p>
            ))}
          </Persona>
        )
      })}
    </Test>
  )
}

export default WalletPersonas
