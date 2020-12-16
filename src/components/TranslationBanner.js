import React, { useRef } from "react"
import styled from "styled-components"
import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Emoji from "./Emoji"
import Translation from "../components/Translation"

const H3 = styled.h3`
  font-weight: 700;
  line-height: 100%;
  margin-top: 0;
  margin-bottom: 0;
`

const BannerContainer = styled.div`
  bottom: 2rem;
  right: 2rem;
  position: fixed;
  z-index: 1001;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    bottom: 0rem;
    right: 0rem;
  }
`

const StyledBanner = styled.div`
  position: relative;
  padding: 1rem;
  height: auto;
  cursor: auto;
  max-height: 100%;
  max-width: 600px;
  background: ${(props) => props.theme.colors.infoBanner};
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px;
  width: 100%;
  border-radius: 8px;
  margin: 0px auto;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
    box-shadow: 0px -4px 10px 0px ${(props) => props.theme.colors.text} 10%;
  }
`

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2.5rem;
  }
`

const BannerClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
`
const BannerCloseIcon = styled(Icon)`
  cursor: pointer;
  fill: ${(props) => props.theme.colors.black300};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledEmoji = styled(Emoji)`
  padding-top: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-bottom: 1rem;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-left: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-left: 0rem;
    margin-top: 0.5rem;
  }
`

const TranslationBanner = ({ isEnglish, shouldDisplay, setShouldDisplay }) => {
  const ref = useRef()

  return (
    <>
      {shouldDisplay && (
        <BannerContainer>
          <StyledBanner ref={ref}>
            <BannerContent>
              <Row>
                {!isEnglish && (
                  <H3>
                    <Translation id="common-translation-banner-title" />{" "}
                  </H3>
                )}
                {isEnglish && (
                  <H3>
                    <Translation id="common-translation-banner-is-english-title" />
                  </H3>
                )}

                <StyledEmoji
                  ml={"0.5rem"}
                  size={1.5}
                  text=":globe_showing_asia_australia:"
                />
              </Row>
              {!isEnglish && (
                <p>
                  <Translation id="common-translation-banner-body" />
                </p>
              )}
              {isEnglish && (
                <p>
                  <Translation id="common-translation-banner-is-english-body" />
                </p>
              )}
              <ButtonRow>
                <div>
                  <ButtonLink to="/contributing/translation-program/">
                    <Translation id="common-translation-banner-translation-program-button" />
                  </ButtonLink>
                </div>
                {isEnglish && (
                  <div>
                    <StyledButtonLink isSecondary to="#">
                      <Translation id="common-translation-banner-is-english-see-english-button" />
                    </StyledButtonLink>
                  </div>
                )}
              </ButtonRow>
            </BannerContent>
            <BannerClose onClick={() => setShouldDisplay(false)}>
              <BannerCloseIcon name="close" />
            </BannerClose>
          </StyledBanner>
        </BannerContainer>
      )}
    </>
  )
}

export default TranslationBanner
