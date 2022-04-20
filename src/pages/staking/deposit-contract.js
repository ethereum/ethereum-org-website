import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import makeBlockie from "ethereum-blockies-base64"
import { getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"

import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import CardList from "../../components/CardList"
import Checkbox from "../../components/Checkbox"
import CopyToClipboard from "../../components/CopyToClipboard"
import Emoji from "../../components/Emoji"
import InfoBanner from "../../components/InfoBanner"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import Tooltip from "../../components/Tooltip"

import {
  ButtonSecondary,
  FakeLink,
} from "../../components/SharedStyledComponents"
import { DEPOSIT_CONTRACT_ADDRESS } from "../../data/addresses.js"
import { translateMessageId } from "../../utils/translations"

const Page = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const LeftColumn = styled.div`
  flex: 1 1 50%;
  padding: 2rem;
  padding-top: 5rem;
`

const RightColumn = styled(LeftColumn)`
  flex: 1 1 50%;
  padding-top: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 1rem;
  }
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 2rem;
  font-weight: 700;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
`

const Subtitle = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 3.5rem;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const StyledButton = styled(ButtonLink)`
  margin-top: 0rem;
  margin-bottom: 3rem;
`

const CardTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 3px 3px 0px 0px;
  text-transform: uppercase;
  font-size: 0.875rem;
`

const AddressCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin-bottom: 2rem;
  max-width: 560px;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    position: sticky;
    top: 7.25rem; /* account for navbar */
  }
`

const Address = styled.div`
  font-family: ${(props) => props.theme.fonts.monospace};
  border-radius: 2px;
  font-size: 2rem;
  flex-wrap: wrap;
  text-transform: uppercase;
  line-height: 140%;
  margin-bottom: 1rem;
`

const CopyButton = styled(ButtonSecondary)`
  margin-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
    margin-top: 1rem;
  }
`

const CardContainer = styled.div`
  margin: 2rem;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
  }
`

const TitleText = styled.div``

const CardTitle = styled.h2`
  margin-top: 0rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const Caption = styled.div`
  color: ${(props) => props.theme.colors.text200};
  font-weight: 400;
  font-size: 0.875rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-bottom: 2rem;
  }
`

const StyledCheckbox = styled(Checkbox)`
  display: flex;
  min-height: 3.5rem;
  margin-bottom: 0.5rem;

  .styled-checkbox {
    margin-top: 0.25rem;
  }
`

const Blockie = styled.img`
  border-radius: 4px;
  height: 4rem;
  width: 4rem;
`

const TextToSpeech = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

const StyledFakeLink = styled(FakeLink)`
  margin-right: 0.5rem;
`

const CHUNKED_ADDRESS = DEPOSIT_CONTRACT_ADDRESS.match(/.{1,3}/g).join(" ")

const blockieSrc = makeBlockie(DEPOSIT_CONTRACT_ADDRESS)

const DepositContractPage = ({ data, location }) => {
  const intl = useIntl()

  const [state, setState] = useState({
    browserHasTextToSpeechSupport: false,
    textToSpeechRequest: undefined,
    isSpeechActive: false,
    showAddress: false,
    userHasUsedLaunchpad: false,
    userUnderstandsStaking: false,
    userWillCheckOtherSources: false,
  })

  useEffect(() => {
    const browserHasTextToSpeechSupport = !!window.speechSynthesis
    if (!browserHasTextToSpeechSupport) {
      return
    }
    // Create textToSpeechRequest
    let speech = new SpeechSynthesisUtterance()
    speech.lang = "en-US"
    speech.text = DEPOSIT_CONTRACT_ADDRESS.split("").join(" ")
    speech.volume = 1
    speech.rate = 0.5
    speech.pitch = 1
    // Add event listeners
    // Explicity set state in listener callback
    const speechCallbackState = {
      browserHasTextToSpeechSupport: true,
      textToSpeechRequest: speech,
      showAddress: true,
      userHasUsedLaunchpad: true,
      userUnderstandsStaking: true,
      userWillCheckOtherSources: true,
    }
    const onStartCallback = () =>
      setState({ ...speechCallbackState, isSpeechActive: true })
    const onEndCallback = () =>
      setState({ ...speechCallbackState, isSpeechActive: false })
    speech.addEventListener("start", onStartCallback)
    speech.addEventListener("end", onEndCallback)

    setState((prevState) => ({
      ...prevState,
      browserHasTextToSpeechSupport,
      textToSpeechRequest: speech,
    }))
    return () => {
      speech.removeEventListener("start", onStartCallback)
      speech.removeEventListener("end", onEndCallback)
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) {
      console.error(
        "Browser doesn't support the 'SpeechSynthesis' text-to-speech API"
      )
      return
    }
    if (state.isSpeechActive) {
      window.speechSynthesis.cancel()
    } else {
      window.speechSynthesis.speak(state.textToSpeechRequest)
    }
  }

  const addressSources = [
    {
      title: "ConsenSys",
      link: "https://consensys.net/blog/news/eth2-phase-0-deposit-contract-address/",
      image: getImage(data.consensys),
    },
    {
      title: "Ethereum Foundation",
      link: "https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/",
      image: getImage(data.ef),
    },
    {
      title: "Etherscan",
      link: `https://etherscan.io/address/${DEPOSIT_CONTRACT_ADDRESS}`,
      image: getImage(data.etherscan),
    },
    {
      title: "EthHub",
      link: "https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/deposit-contract/",
      image: getImage(data.ethhub),
    },
  ]

  const isButtonEnabled =
    state.userHasUsedLaunchpad &&
    state.userUnderstandsStaking &&
    state.userWillCheckOtherSources

  const textToSpeechText = state.isSpeechActive
    ? translateMessageId("page-staking-deposit-contract-stop-reading", intl)
    : translateMessageId("page-staking-deposit-contract-read-aloud", intl)
  const textToSpeechEmoji = state.isSpeechActive
    ? ":speaker_high_volume:"
    : ":speaker:"
  return (
    <Page>
      <PageMetadata
        title={translateMessageId(
          "page-staking-deposit-contract-meta-title",
          intl
        )}
        description={translateMessageId(
          "page-staking-deposit-contract-meta-desc",
          intl
        )}
      />
      <LeftColumn>
        <Breadcrumbs slug={location.pathname} startDepth={1} />
        <Title>
          <Translation id="page-staking-deposit-contract-title" />
        </Title>
        <Subtitle>
          <Translation id="page-staking-deposit-contract-subtitle" />
        </Subtitle>
        <h2>
          <Translation id="page-staking-deposit-contract-h2" />
        </h2>
        <p>
          <Translation id="page-staking-deposit-contract-staking" />{" "}
          <Link to="/staking/">
            <Translation id="page-staking-deposit-contract-staking-more-link" />
          </Link>
        </p>
        <StyledButton to="https://launchpad.ethereum.org">
          <Translation id="page-staking-deposit-contract-launchpad" />
        </StyledButton>
        <h2>
          <Translation id="page-staking-deposit-contract-staking-check" />
        </h2>
        <p>
          <Translation id="page-staking-deposit-contract-staking-check-desc" />
        </p>
        <CardList content={addressSources} />
      </LeftColumn>
      <RightColumn>
        <AddressCard>
          <CardTag>
            <Translation id="page-staking-deposit-contract-address-check-btn" />
          </CardTag>
          <CardContainer>
            {!state.showAddress && (
              <>
                <Row>
                  <CardTitle>
                    <Translation id="page-staking-deposit-contract-confirm-address" />
                  </CardTitle>
                </Row>
                <StyledCheckbox
                  size={1.5}
                  checked={state.userHasUsedLaunchpad}
                  callback={() =>
                    setState({
                      ...state,
                      userHasUsedLaunchpad: !state.userHasUsedLaunchpad,
                    })
                  }
                >
                  <Translation id="page-staking-deposit-contract-checkbox1" />
                </StyledCheckbox>
                <StyledCheckbox
                  size={1.5}
                  checked={state.userUnderstandsStaking}
                  callback={() =>
                    setState({
                      ...state,
                      userUnderstandsStaking: !state.userUnderstandsStaking,
                    })
                  }
                >
                  <Translation id="page-staking-deposit-contract-checkbox2" />
                </StyledCheckbox>
                <StyledCheckbox
                  size={1.5}
                  checked={state.userWillCheckOtherSources}
                  callback={() =>
                    setState({
                      ...state,
                      userWillCheckOtherSources:
                        !state.userWillCheckOtherSources,
                    })
                  }
                >
                  <Translation id="page-staking-deposit-contract-checkbox3" />
                </StyledCheckbox>
                <CopyButton
                  disabled={!isButtonEnabled}
                  onClick={() =>
                    setState({ ...state, showAddress: !state.showAddress })
                  }
                >
                  <Emoji text=":eyes:" size={1} />{" "}
                  <Translation id="page-staking-deposit-contract-reveal-address-btn" />
                </CopyButton>
              </>
            )}
            {state.showAddress && (
              <>
                <Row>
                  <TitleText>
                    <CardTitle>
                      <Translation id="page-staking-deposit-contract-address" />
                    </CardTitle>
                    <Caption>
                      <Translation id="page-staking-deposit-contract-address-caption" />
                    </Caption>
                  </TitleText>
                  <Blockie src={blockieSrc} />
                </Row>
                {state.browserHasTextToSpeechSupport && (
                  <TextToSpeech>
                    <StyledFakeLink onClick={handleTextToSpeech}>
                      <Translation id={textToSpeechText} />
                    </StyledFakeLink>{" "}
                    <Emoji text={textToSpeechEmoji} size={1} />
                  </TextToSpeech>
                )}
                <Tooltip
                  content={translateMessageId(
                    "page-staking-deposit-contract-warning",
                    intl
                  )}
                >
                  <Address>{CHUNKED_ADDRESS}</Address>
                </Tooltip>
                <ButtonRow>
                  <CopyToClipboard text={DEPOSIT_CONTRACT_ADDRESS}>
                    {(isCopied) => (
                      <CopyButton>
                        {!isCopied ? (
                          <div>
                            <Emoji text=":clipboard:" size={1} />{" "}
                            <Translation id="page-staking-deposit-contract-copy" />
                          </div>
                        ) : (
                          <div>
                            <Emoji text=":white_check_mark:" size={1} />{" "}
                            <Translation id="page-staking-deposit-contract-copied" />
                          </div>
                        )}
                      </CopyButton>
                    )}
                  </CopyToClipboard>
                  <Link
                    to={`https://etherscan.io/address/${DEPOSIT_CONTRACT_ADDRESS}`}
                  >
                    <Translation id="page-staking-deposit-contract-etherscan" />
                  </Link>
                </ButtonRow>
              </>
            )}
            <InfoBanner isWarning={true} emoji=":warning:" mt={`2rem`}>
              <div>
                <Translation id="page-staking-deposit-contract-warning-2" />{" "}
                <Link to="https://launchpad.ethereum.org">
                  <Translation id="page-staking-deposit-contract-launchpad-2" />
                </Link>
              </div>
            </InfoBanner>
          </CardContainer>
        </AddressCard>
      </RightColumn>
    </Page>
  )
}

export default DepositContractPage

export const sourceImage = graphql`
  fragment sourceImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 20
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query {
    consensys: file(relativePath: { eq: "projects/consensys.png" }) {
      ...sourceImage
    }
    ef: file(relativePath: { eq: "staking/ef-blog-logo.png" }) {
      ...sourceImage
    }
    ethhub: file(relativePath: { eq: "projects/ethhub.png" }) {
      ...sourceImage
    }
    etherscan: file(
      relativePath: { eq: "projects/etherscan-logo-circle.png" }
    ) {
      ...sourceImage
    }
  }
`
