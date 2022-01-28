import React, { useEffect, useState } from "react"
import styled from "styled-components"

import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Emoji from "./Emoji"
import Translation from "./Translation"

const H3 = styled.h3`
  font-weight: 700;
  line-height: 100%;
  margin-top: 0;
  margin-bottom: 0;
`

const BannerContainer = styled.div`
  display: ${(props) => (props.isOpen ? `block` : `none`)};
  bottom: 2rem;
  right: 2rem;
  position: fixed;
  z-index: 99;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    bottom: 0rem;
    right: 0rem;
  }
`

const StyledBanner = styled.div`
  padding: 1rem;
  max-height: 100%;
  max-width: 600px;
  background: ${(props) => props.theme.colors.infoBanner};
  color: ${(props) => props.theme.colors.black300};
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
    box-shadow: 0px -4px 10px 0px ${(props) => props.theme.colors.text} 10%;
  }
`

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.isPageRightToLeft ? `flex-end` : `flex-start`};
  margin: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2.5rem;
  }
`

const BannerClose = styled.div`
  position: absolute;
  top: 0;
  right: ${(props) => (props.isPageRightToLeft ? `auto` : 0)};
  margin: 1rem;
`
const BannerCloseIcon = styled(Icon)`
  cursor: pointer;
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

const SecondaryButtonLink = styled(ButtonLink)`
  margin-left: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-left: 0rem;
    margin-top: 0.5rem;
  }
  color: #333;
  border: 1px solid #333;
  background-color: transparent;
`

const TranslationBanner = ({
  shouldShow,
  isPageRightToLeft,
  originalPagePath,
  isPageContentEnglish,
}) => {
  const [isOpen, setIsOpen] = useState(shouldShow)

  useEffect(() => {
    setIsOpen(shouldShow)
  }, [originalPagePath, shouldShow])

  const headerTextId = isPageContentEnglish
    ? "translation-banner-title-new"
    : "translation-banner-title-update"

  const bodyTextId = isPageContentEnglish
    ? "translation-banner-body-new"
    : "translation-banner-body-update"

  return (
    <BannerContainer isOpen={isOpen}>
      <StyledBanner>
        <BannerContent isPageRightToLeft={isPageRightToLeft}>
          <Row>
            <H3>
              <Translation id={headerTextId} />
            </H3>
            <StyledEmoji
              ml={"0.5rem"}
              size={1.5}
              text=":globe_showing_asia_australia:"
            />
          </Row>
          <p>
            <Translation id={bodyTextId} />
          </p>
          <ButtonRow>
            <div>
              <ButtonLink to="/en/contributing/translation-program/">
                <Translation id="translation-banner-button-translate-page" />
              </ButtonLink>
            </div>
            {!isPageContentEnglish && (
              <div>
                <SecondaryButtonLink isSecondary to={`/en${originalPagePath}`}>
                  <Translation id="translation-banner-button-see-english" />
                </SecondaryButtonLink>
              </div>
            )}
          </ButtonRow>
        </BannerContent>
        <BannerClose
          onClick={() => setIsOpen(false)}
          isPageRightToLeft={isPageRightToLeft}
        >
          <BannerCloseIcon name="close" />
        </BannerClose>
      </StyledBanner>
    </BannerContainer>
  )
}

export default TranslationBanner
