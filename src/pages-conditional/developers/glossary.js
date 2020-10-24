import React from "react"
import styled from "styled-components"

import PageMetadata from "../../components/PageMetadata"
// import Translation from "../../components/Translation"
import { Mixins } from "../../components/Theme"

import { Content, EdnPage } from "../../components/SharedStyledComponents"

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
  margin-top: -1rem;
`
const H1 = styled.h1`
  color: ${(props) => props.theme.colors.text};
  ${Mixins.textLevel2}
  font-style: normal;
  font-weight: normal;
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  text-align: center;
  margin-bottom: 0rem;
`

const Subtitle = styled.h2`
  ${Mixins.textLevel4}
  color: ${(props) => props.theme.colors.text300};
  max-width: 55ch;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
`

const Glossary = ({ data }) => {
  return (
    <EdnPage>
      <PageMetadata
        title="Ethereum Glossary"
        description="A glossary of technical and non-technical terms related to Ethereum."
      />
      <Header>
        <H1>Ethereum Glossary</H1>
        <Subtitle>
          A glossary of technical and non-technical terms related to Ethereum.
        </Subtitle>
      </Header>
      <Content>
        {/* TODO: Content */}
        <CalloutBanner
          image={data.learn.childImageSharp.fluid}
          title="Learn with documentation"
          description="Want to learn more? Go to our documentation to find the explanations
          you need."
        >
          <div>
            <Button to="/en/developers/docs/">Browse docs</Button>
          </div>
        </CalloutBanner>
      </Content>
    </EdnPage>
  )
}

export default Glossary
