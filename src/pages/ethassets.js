import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Button from "../components/Button"
import { Page, Divider } from "../components/SharedStyledComponents"

const Image = styled(Img)`
  align-self: center;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 60%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
  justify-content: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    margin-bottom: 0rem;
  }
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  margin: 2rem 0rem;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`

const TwoColumn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  justify-content: space-between;
`

const StyledPage = styled(Page)`
  margin: 2rem;
  align-items: flex-start;
`

const SingleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0rem;
`

const ImageBackground = styled.div`
  background: ${(props) => props.theme.colors.white600};
  width: 100%;
  padding: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
  width: 360px;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`
const TwoColumnImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
  width: 640px;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem;
  }
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text};
`

const AssetsPage = ({ data }) => {
  return (
    <StyledPage>
      <HeroContainer>
        <Header>
          <Image fixed={data.favicon.childImageSharp.fixed} />
          <h1>ethereum.org assets</h1>
          <p>
            All assets used across ethereum.org are open-source and free to use
          </p>
        </Header>
      </HeroContainer>
      <Column>
        <Subtitle>ethereum.org hero</Subtitle>
        <SingleImageContainer>
          <Image fluid={data.hero.childImageSharp.fluid} />
        </SingleImageContainer>
      </Column>
      <Button to="/src/images/wallet.png">Download</Button>
      <Row>
        <ImageContainer>
          <Subtitle>Doge using dapps</Subtitle>
          <Image fluid={data.dogecomputer.childImageSharp.fluid} />
          <Button to="/src/images/wallet.png">Download</Button>
        </ImageContainer>
        <ImageContainer>
          <Subtitle>Enterprise Ethereum</Subtitle>
          <Image fluid={data.enterprise.childImageSharp.fluid} />
          <Button to="/src/images/wallet.png">Download</Button>
        </ImageContainer>
        <ImageContainer>
          <Subtitle>Defi lego </Subtitle>
          <Image fluid={data.developers.childImageSharp.fluid} />
          <Button to="/src/images/wallet.png">Download</Button>
        </ImageContainer>
      </Row>
      <Row>
        <TwoColumnImageContainer>
          <Subtitle>Ethereum bazaar</Subtitle>
          <Image fluid={data.whatisethereum.childImageSharp.fluid} />
          <Button to="/src/images/wallet.png">Download</Button>
        </TwoColumnImageContainer>
        <TwoColumnImageContainer>
          <Subtitle>Ether (ETH)</Subtitle>
          <Image fluid={data.eth.childImageSharp.fluid} />
          <Button to="/src/images/wallet.png">Download</Button>
        </TwoColumnImageContainer>
      </Row>
      <TwoColumn>
        <ImageColumn>
          <Subtitle>Robot wallet</Subtitle>
          <Image fluid={data.wallet.childImageSharp.fluid} />
          <Button to="/src/images/wallet.png">Download</Button>
        </ImageColumn>
        <ImageColumn>
          <SingleImageContainer>
            <Subtitle>Ethereum Foundation logo</Subtitle>
            <ImageBackground>
              <Image fixed={data.eflogo.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </SingleImageContainer>
          <SingleImageContainer>
            <Subtitle>Ethereum Foundation logo</Subtitle>
            <ImageBackground>
              <Image fixed={data.eflogo.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </SingleImageContainer>
          <SingleImageContainer>
            <Subtitle>Ethereum Foundation logo (white)</Subtitle>
            <ImageBackground>
              <Image fixed={data.eflogowhite.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </SingleImageContainer>
        </ImageColumn>
      </TwoColumn>
    </StyledPage>
  )
}

export default AssetsPage

export const query = graphql`
  query {
    favicon: file(relativePath: { eq: "favicon.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developers: file(relativePath: { eq: "home/developers-eth-lego.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    eflogo: file(relativePath: { eq: "ef-logo.png" }) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    eflogowhite: file(relativePath: { eq: "ef-logo-white.png" }) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    dogecomputer: file(relativePath: { eq: "home/doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    enterprise: file(relativePath: { eq: "home/enterprise-eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    whatisethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
