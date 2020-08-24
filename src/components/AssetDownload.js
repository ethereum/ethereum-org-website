import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Button from "./Button"
import Link from "./Link"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1rem;
`

const Image = styled(Img)`
  align-self: center;
  width: 100%;
`

const ImageBackground = styled.div`
  background: ${(props) => props.theme.colors.white600};
  width: 100%;
  padding: 2rem;
  text-align: center;
`

const ArtistSubtitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.m};
  color: ${(props) => props.theme.colors.text300};
  margin-right: 0.5rem;
`

const Caption = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 100%;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.white700};
  border-radius: 0px 0px 4px 4px;
  padding: 0.5rem 1rem;
`

// TODO update to Twemoji
// TODO change to https://ethereum.org
// TODO each item within a row should be same height
const AssetDownload = ({
  title,
  image,
  imageHasBackground = true,
  artistName,
  artistUrl,
}) => {
  return (
    <Container>
      <h3>{title}</h3>
      {imageHasBackground && (
        <ImageBackground>
          <Image fluid={image.fluid} />
        </ImageBackground>
      )}
      {!imageHasBackground && <Image fluid={image.fluid} />}
      {artistName && (
        <Caption>
          <ArtistSubtitle>🎨 Artist:</ArtistSubtitle>
          <Link to={artistUrl}>{artistName}</Link>
        </Caption>
      )}
      <div>
        <Button to={`http://localhost:8888${image.fluid.src}`}>Download</Button>
      </div>
    </Container>
  )
}

export default AssetDownload
