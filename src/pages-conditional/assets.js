import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import AssetDownload from "../components/AssetDownload"
import Button from "../components/Button"
import Link from "../components/Link"
import EthVideo from "../components/EthVideo"
import { Page, Content } from "../components/SharedStyledComponents"

import darkVideo from "../assets/ethereum-hero-dark.mp4"
import lightVideo from "../assets/ethereum-hero-light.mp4"

const Image = styled(Img)`
  align-self: center;
  width: 100%;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 60%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const HeroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 2rem 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 2rem;
  }
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

const ArtistSubtitle = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text300};
`

const Caption = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: -3.1rem;
  margin-bottom: 1rem;
  width: 100%;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.white700};
  border-radius: 0px 0px 4px 4px;
  padding: 0.5rem 1rem;
`

const CaptionLink = styled(Link)`
  margin-left: 0.5rem;
`

const EthVideoAsset = styled(EthVideo)`
  max-height: 400px;
  max-width: 400px;
`

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

const LeftButton = styled(Button)`
  border-radius: 4px 0px 0px 4px;
`

const RightButton = styled(Button)`
  border-radius: 0px 4px 4px 0px;
`

const AssetsPage = ({ data }) => {
  console.log(data.hero)
  return (
    <Page>
      <Content>
        <HeroContainer>
          <Header>
            <Image fixed={data.favicon.childImageSharp.fixed} />
            <h1>ethereum.org assets</h1>
            <p>
              All assets used across ethereum.org are open-source and free to
              use
            </p>
            <Link to="/assets#illustrations">Illustrations</Link>
            <Link to="/assets#historical">Historical artworks</Link>
            <Link to="/assets#brand">Ethereum "brand" assets</Link>
          </Header>
        </HeroContainer>
        <h2 id="illustrations">Illustrations</h2>

        <Row>
          <AssetDownload
            title="ethereum.org hero"
            image={data.hero.childImageSharp}
            imageHasBackground={false}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>

        <Row>
          <AssetDownload
            title="Doge using dapps"
            image={data.doge.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title="Defi legos"
            image={data.developers.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title="Enterprise Ethereum"
            image={data.enterprise.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title="Robot wallet"
            image={data.wallet.childImageSharp}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title="Robot wallet"
            image={data.wallet.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title="Ethereum bazaar"
            image={data.whatIsEthereum.childImageSharp}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title="Ether (ETH)"
            image={data.eth.childImageSharp}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
        </Row>

        <Row>
          <AssetDownload
            title="Ethereum gif (light)"
            artistName="Lili Lashka"
            artistUrl="https://www.impermanence.co/"
            src={lightVideo}
          >
            <EthVideoAsset videoSrc={lightVideo} />
          </AssetDownload>
          <AssetDownload
            title="Ethereum gif (dark)"
            artistName="Lili Lashka"
            artistUrl="https://www.impermanence.co/"
            src={darkVideo}
          >
            <EthVideoAsset videoSrc={darkVideo} />
          </AssetDownload>
        </Row>

        {/* TODO */}
        <h2 id="historical">Historical artwork</h2>
        <Subtitle>Ethereum gif</Subtitle>
        <ImageBackground>
          <EthVideoAsset />
        </ImageBackground>
        <Caption>
          <ArtistSubtitle>🎨 Artist:</ArtistSubtitle>
          <CaptionLink to="https://www.impermanence.co/">
            Lili Lashka
          </CaptionLink>
        </Caption>
        <ButtonGroup>
          <LeftButton to="/src/assets/ethereum-hero-light.mp4">
            Download light mode
          </LeftButton>
          <RightButton isSecondary to="/src/assets/ethereum-hero-dark.mp4">
            Download dark mode
          </RightButton>
        </ButtonGroup>

        <h2 id="brand">Ethereum brand assets</h2>
        <Row>
          <SingleImageContainer>
            <Subtitle>Ethereum Foundation logo</Subtitle>
            <ImageBackground>
              <Image fixed={data.efLogo.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </SingleImageContainer>
          <SingleImageContainer>
            <Subtitle>Ethereum Foundation logo</Subtitle>
            <ImageBackground>
              <Image fixed={data.efLogo.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </SingleImageContainer>
          <SingleImageContainer>
            <Subtitle>Ethereum Foundation logo (white)</Subtitle>
            <ImageBackground>
              <Image fixed={data.efLogoWhite.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </SingleImageContainer>
        </Row>
        <Row>
          <ImageContainer>
            <Subtitle>ETH diamond (color)</Subtitle>
            <ImageBackground>
              <Image fixed={data.ethdiamond.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </ImageContainer>
          <ImageContainer>
            <Subtitle>ETH diamond (glyph)</Subtitle>
            <ImageBackground>
              <Image fixed={data.ethdiamondglyph.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </ImageContainer>
          <ImageContainer>
            <Subtitle>ETH diamond (purple)</Subtitle>
            <ImageBackground>
              <Image fixed={data.ethdiamondpurple.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </ImageContainer>
          <ImageContainer>
            <Subtitle>ETH diamond (gray)</Subtitle>
            <ImageBackground>
              <Image fixed={data.ethdiamondgray.childImageSharp.fixed} />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </ImageContainer>
          <ImageContainer>
            <Subtitle>ETH diamond (purple)</Subtitle>
            <ImageBackground>
              <Image
                fixed={data.ethdiamondpurplepurple.childImageSharp.fixed}
              />
            </ImageBackground>
            <Button to="/src/images/wallet.png">Download</Button>
          </ImageContainer>
          <Row>
            <ImageContainer>
              <Subtitle>ETH logo (black)</Subtitle>
              <Image fluid={data.ethlogoblack.childImageSharp.fluid} />
              <Button to="/src/images/wallet.png">Download</Button>
            </ImageContainer>
            <ImageContainer>
              <Subtitle>ETH logo landscape (black)</Subtitle>
              <Image fluid={data.ethlogolandscapeblack.childImageSharp.fluid} />
              <Button to="/src/images/wallet.png">Download</Button>
            </ImageContainer>
            <ImageContainer>
              <Subtitle>ETH logo wordmark (black)</Subtitle>
              <Image fluid={data.ethlogowordmarkblack.childImageSharp.fluid} />
              <Button to="/src/images/wallet.png">Download</Button>
            </ImageContainer>
          </Row>
          <Row>
            <ImageContainer>
              <Subtitle>ETH logo (black)</Subtitle>
              <Image fluid={data.ethlogoblackwhite.childImageSharp.fluid} />
              <Button to="/src/images/wallet.png">Download</Button>
            </ImageContainer>
            <ImageContainer>
              <Subtitle>ETH logo landscape (black)</Subtitle>
              <Image
                fluid={data.ethlogolandscapeblackwhite.childImageSharp.fluid}
              />
              <Button to="/src/images/wallet.png">Download</Button>
            </ImageContainer>
            <ImageContainer>
              <Subtitle>ETH logo wordmark (black)</Subtitle>
              <Image
                fluid={data.ethlogowordmarkblackwhite.childImageSharp.fluid}
              />
              <Button to="/src/images/wallet.png">Download</Button>
            </ImageContainer>
          </Row>
        </Row>
      </Content>
    </Page>
  )
}

export default AssetsPage

export const assetItem = graphql`
  fragment assetItem on File {
    childImageSharp {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
  query {
    favicon: file(relativePath: { eq: "favicon.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
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
    developers: file(relativePath: { eq: "developers-eth-lego.png" }) {
      ...assetItem
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      ...assetItem
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      ...assetItem
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      ...assetItem
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      ...assetItem
    }
    whatIsEthereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      ...assetItem
    }
    efLogo: file(relativePath: { eq: "ef-logo.png" }) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    efLogoWhite: file(relativePath: { eq: "ef-logo-white.png" }) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethdiamond: file(relativePath: { eq: "assets/eth-diamond.png" }) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethdiamondglyph: file(
      relativePath: { eq: "assets/eth-diamond-glyph.png" }
    ) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethdiamondpurple: file(
      relativePath: { eq: "assets/logo-purple-white/ethereum-icon-purple.png" }
    ) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethdiamondgray: file(
      relativePath: { eq: "assets/logo-black-gray/ethereum-icon-black.png" }
    ) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethdiamondpurplepurple: file(
      relativePath: { eq: "assets/logo-purple-purple/ethereum-icon-purple.png" }
    ) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethlogoblack: file(
      relativePath: {
        eq: "assets/logo-black-gray/ethereum-logo-portrait-black.png"
      }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethlogolandscapeblack: file(
      relativePath: {
        eq: "assets/logo-black-gray/ethereum-logo-landscape-black.png"
      }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethlogowordmarkblack: file(
      relativePath: { eq: "assets/logo-black-gray/ethereum-wordmark-black.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethlogoblackwhite: file(
      relativePath: {
        eq: "assets/logo-black-white/ethereum-logo-portrait-black.png"
      }
    ) {
      childImageSharp {
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethlogolandscapeblackwhite: file(
      relativePath: {
        eq: "assets/logo-black-white/ethereum-logo-landscape-black.png"
      }
    ) {
      childImageSharp {
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethlogowordmarkblackwhite: file(
      relativePath: {
        eq: "assets/logo-black-white/ethereum-wordmark-black.png"
      }
    ) {
      childImageSharp {
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    giflogo1: file(relativePath: { eq: "assets/eth_logo_1.png" }) {
      childImageSharp {
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
