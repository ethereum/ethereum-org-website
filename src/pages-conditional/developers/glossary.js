import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import PageMetadata from "../../components/PageMetadata"
import Button from "../../components/Button"
import { Mixins } from "../../components/Theme"
import { Content, EdnPage } from "../../components/SharedStyledComponents"
import CalloutBanner from "../../components/CalloutBanner"
import glossary from "../../data/developer-glossary.yaml"
import Link from "../../components/Link"

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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

const GlossaryContainer = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin-bottom: 2rem;
  margin-top: 2rem;
  align-self: center;
  width: 66%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const GlossaryCard = styled.div`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 2rem;
  width: 100%;
  color: #000;
  &:hover {
    border-radius: 4px;
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
`

const Name = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  font-size: 24px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
  }
`

const P = styled.p`
  color: ${(props) => props.theme.colors.text200};
`

const Citation = styled.p`
  color: ${(props) => props.theme.colors.text200};
  font-style: italic;
`

const Glossary = ({ data }) => {
  return (
    <EdnPage>
      <PageMetadata
        title="Ethereum Glossary"
        description="An incomplete glossary of technical and non-technical terms related to Ethereum."
      />
      <Header>
        <H1>Ethereum Glossary</H1>
        <Subtitle>
          A glossary of technical and non-technical terms related to Ethereum.
        </Subtitle>
      </Header>
      <StyledContent>
        <GlossaryContainer>
          {glossary.map(({ id, name, definition, link }) => {
            return (
              <GlossaryCard key={id}>
                <Name>{name}</Name>
                <P>{definition}</P>
                {link && (
                  <P>
                    See <Link to={link}>{link}</Link>
                  </P>
                )}
              </GlossaryCard>
            )
          })}
        </GlossaryContainer>
        <Citation>
          Page content provided in part from{" "}
          <Link to="https://github.com/ethereumbook/ethereumbook">
            Mastering Ethereum
          </Link>{" "}
          by{" "}
          <Link to="https://ethereumbook.info">
            Andreas M. Antonopoulos, Gavin Wood
          </Link>
        </Citation>
      </StyledContent>
      <Content>
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

export const query = graphql`
  query {
    learn: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
