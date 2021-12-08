import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import Emoji from "./Emoji"

import Translation from "../components/Translation"
import ButtonLink from "./ButtonLink"
import Link from "./Link"

const Container = styled.div`
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  opacity: ${(props) => (props.shouldHide ? 0 : 1)};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: ${(props) => (props.shouldHide ? `none` : `flex`)};
  }
`

const Image = styled(Img)`
  align-self: center;
  width: 100%;
`

const ImageContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.white700};
  width: 100%;
  padding: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
`

const ArtistSubtitle = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.m};
  color: ${(props) => props.theme.colors.text300};
  margin-right: 0.5rem;
`

const Caption = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  border-left: 1px solid ${(props) => props.theme.colors.white700};
  border-bottom: 1px solid ${(props) => props.theme.colors.white700};
  border-right: 1px solid ${(props) => props.theme.colors.white700};
  border-radius: 0px 0px 4px 4px;
  padding: 0.5rem 1rem;
`

const ButtonContainer = styled.div`
  margin-top: 1rem;
`

// TODO add ability to download SVGs
const AssetDownload = ({
  alt,
  artistName,
  artistUrl,
  children,
  image,
  src,
  shouldHide = false,
  title,
}) => {
  const baseUrl = `https://ethereum.org`
  const downloadUri = src ? src : image.fluid.src
  const downloadUrl = `${baseUrl}${downloadUri}`

  return (
    <Container shouldHide={shouldHide}>
      <h4>{title}</h4>
      <div>
        {children && <ImageContainer>{children}</ImageContainer>}
        {!children && (
          <ImageContainer>
            <Image fluid={image.fluid} alt={alt} />
          </ImageContainer>
        )}
        {artistName && (
          <Caption>
            <ArtistSubtitle>
              <Emoji text=":artist_palette:" mr={`0.5em`} />
              <Translation id="page-assets-download-artist" />
            </ArtistSubtitle>
            {artistUrl && <Link to={artistUrl}>{artistName}</Link>}
            {!artistUrl && <span>{artistName}</span>}
          </Caption>
        )}
      </div>
      <ButtonContainer>
        <ButtonLink to={downloadUrl}>
          <Translation id="page-assets-download-download" />
        </ButtonLink>
      </ButtonContainer>
    </Container>
  )
}

export default AssetDownload
