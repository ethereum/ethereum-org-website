import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import makeBlockie from "ethereum-blockies-base64"

import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import CardList from "../../components/CardList"
import Checkbox from "../../components/Checkbox"
import CopyToClipboard from "../../components/CopyToClipboard"
import Link from "../../components/Link"
import Tooltip from "../../components/Tooltip"
import { Twemoji } from "react-emoji-render"
import Warning from "../../components/Warning"

import {
  ButtonSecondary,
  FakeLink,
} from "../../components/SharedStyledComponents"

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
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
`

const Subtitle = styled.div`
  font-size: 20px;
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

const DumbTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 8px;
  width: 100%;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  background: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 3px 3px 0px 0px;
  text-transform: uppercase;
  font-size: 14px;
`

const AddressCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  max-width: 560px;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    position: sticky;
    top: 6.25rem; /* account for navbar */
  }
`

const Address = styled.div`
  font-family: "SFMono-Regular", monospace;
  border-radius: 2px;
  font-size: 2rem;
  flex-wrap: wrap;
  text-transform: uppercase;
  line-height: 140%;
  margin-bottom: 1rem;
`

const CopyButton = styled(ButtonSecondary)`
  margin-top: 0rem;
  margin-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
    margin-top: 1rem;
  }
`

const CardContainer = styled.div`
  margin: 2rem;
  margin-bottom: 0rem;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2rem;
  margin-bottom: 2rem;
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
  font-weight: 500;
  margin-bottom: 1rem;
`

const Caption = styled.h6`
  color: ${(props) => props.theme.colors.text200};
  font-weight: 500;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-bottom: 2rem;
  }
`

const SyledCheckbox = styled(Checkbox)`
  display: flex;
  min-height: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    min-height: 4rem;
  }
`

const Blockie = styled.img`
  border-radius: 4px;
  height: 4rem;
  width: 4rem;
`

const TextToSpeech = styled.div`
  display: flex;
`

const StyledFakeLink = styled(FakeLink)`
  margin-right: 0.5rem;
  &:hover {
    cursor: ${(props) => (props.isActive ? `progress` : `cursor`)} !important;
  }
`

// TODO update
const STAKING_CONTRACT_ADDRESS = "0x94fce6c90537f04b97253d649c15dbbccb5079c2"
const CHUNKED_ADDRESS = STAKING_CONTRACT_ADDRESS.match(/.{1,3}/g).join(" ")

const blockieSrc = makeBlockie(STAKING_CONTRACT_ADDRESS)

const StakingAddressPage = ({ data, location }) => {
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
    speech.text = STAKING_CONTRACT_ADDRESS.split("").join(" ")
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

    setState({
      ...state,
      browserHasTextToSpeechSupport,
      textToSpeechRequest: speech,
    })
    return () => {
      speech.removeEventListener("start", onStartCallback)
      speech.removeEventListener("end", onEndCallback)
    }
  }, [])

  const handleTextToSpeech = () => {
    window.speechSynthesis.speak(state.textToSpeechRequest)
  }

  const addressSources = [
    {
      title: "ConsenSys",
      link: "https://consensys.net",
      image: data.consensys.childImageSharp.fixed,
    },
    {
      title: "EthHub",
      link: "https://ethhub.io",
      image: data.ethhub.childImageSharp.fixed,
    },
    {
      title: "Etherscan",
      link: "https://etherscan.io/",
      image: data.etherscan.childImageSharp.fixed,
    },
  ]

  const isButtonEnabled =
    state.userHasUsedLaunchpad &&
    state.userUnderstandsStaking &&
    state.userWillCheckOtherSources

  const textToSpeechText = state.isSpeechActive
    ? "Reading address aloud"
    : "Read address aloud"
  const textToSpeechEmoji = state.isSpeechActive
    ? ":speaker_high_volume:"
    : ":speaker:"
  return (
    <Page>
      <LeftColumn>
        <Breadcrumbs slug={location.pathname} startDepth={1} />
        <Title>Check the Phase 0 staking address</Title>
        <Subtitle>
          This is the address for the Eth2 staking contract.
          <br /> Use this page to confirm you’re using the correct deposit
          address.
        </Subtitle>
        <h2>This is not where you stake</h2>
        {/* TODO add URL */}
        <p>
          To stake your ETH in Eth2 you must use the dedicated launchpad product
          and follow the instructions. Sending ETH to this address will not make
          you a staker and will result in a failed transaction.{" "}
          <Link to="#">More on staking</Link>
        </p>
        {/* TODO add URL */}
        <StyledButton to="#">Stake using launchpad</StyledButton>
        <h2>Check these sources</h2>
        <p>
          We expect there to be a lot of fake addresses and scams out there. To
          be safe, check the Eth2 staking address you're using against the
          address on this page. We recommend checking it with other trustworthy
          sources too.
        </p>
        <CardList content={addressSources} />
      </LeftColumn>
      <RightColumn>
        <AddressCard>
          <DumbTag>Check staking address</DumbTag>
          <CardContainer>
            {!state.showAddress && (
              <>
                <Row>
                  <CardTitle>Confirm to reveal address</CardTitle>
                </Row>
                <SyledCheckbox
                  size={1.5}
                  checked={state.userHasUsedLaunchpad}
                  callback={() =>
                    setState({
                      ...state,
                      userHasUsedLaunchpad: !state.userHasUsedLaunchpad,
                    })
                  }
                >
                  I’ve already used the launchpad to set up my Eth2 validator.
                </SyledCheckbox>
                <SyledCheckbox
                  size={1.5}
                  checked={state.userUnderstandsStaking}
                  callback={() =>
                    setState({
                      ...state,
                      userUnderstandsStaking: !state.userUnderstandsStaking,
                    })
                  }
                >
                  I understand not to send ETH to this address in order to
                  stake.
                </SyledCheckbox>
                <SyledCheckbox
                  size={1.5}
                  checked={state.userWillCheckOtherSources}
                  callback={() =>
                    setState({
                      ...state,
                      userWillCheckOtherSources: !state.userWillCheckOtherSources,
                    })
                  }
                >
                  I'm going to check with other sources.
                </SyledCheckbox>
                <CopyButton
                  disabled={!isButtonEnabled}
                  onClick={() =>
                    setState({ ...state, showAddress: !state.showAddress })
                  }
                >
                  <Twemoji svg text=":eyes:" /> Reveal address
                </CopyButton>
              </>
            )}
            {state.showAddress && (
              <>
                <Row>
                  <TitleText>
                    <CardTitle>Eth2 staking address</CardTitle>

                    {state.browserHasTextToSpeechSupport && (
                      <TextToSpeech>
                        <StyledFakeLink
                          isActive={state.isSpeechActive}
                          onClick={handleTextToSpeech}
                        >
                          {textToSpeechText}
                        </StyledFakeLink>{" "}
                        <Twemoji svg text={textToSpeechEmoji} />
                      </TextToSpeech>
                    )}

                    <Caption>We have added spaces for legibility</Caption>
                  </TitleText>
                  <Blockie src={blockieSrc} />
                </Row>
                <Tooltip content="Check each character carefully.">
                  <Address>{CHUNKED_ADDRESS}</Address>
                </Tooltip>

                <ButtonRow>
                  <CopyToClipboard text={STAKING_CONTRACT_ADDRESS}>
                    {(isCopied) => (
                      <CopyButton>
                        {!isCopied ? (
                          <div>
                            <Twemoji svg text=":clipboard:" /> Copy address
                          </div>
                        ) : (
                          <div>
                            <Twemoji svg text=":white_check_mark:" /> Copied
                            address
                          </div>
                        )}
                      </CopyButton>
                    )}
                  </CopyToClipboard>
                  <Link
                    to={`https://etherscan.io/address/${STAKING_CONTRACT_ADDRESS}`}
                  >
                    View contract on Etherscan
                  </Link>
                </ButtonRow>
              </>
            )}
            <Warning emoji=":warning:">
              {/* TODO add URL */}
              <div>
                Sending funds to this address won’t work and won’t make you a
                staker. We will never ask you to send ETH without you first
                going through the <Link to="#">the launchpad</Link>.
              </div>
            </Warning>
          </CardContainer>
        </AddressCard>
      </RightColumn>
    </Page>
  )
}

export default StakingAddressPage

export const sourceImage = graphql`
  fragment sourceImage on File {
    childImageSharp {
      fixed(height: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    consensys: file(relativePath: { eq: "eth2-staking/consensys.png" }) {
      ...sourceImage
    }
    ethhub: file(relativePath: { eq: "eth2-staking/ethhub.png" }) {
      ...sourceImage
    }
    etherscan: file(
      relativePath: { eq: "eth2-staking/etherscan-logo-circle.png" }
    ) {
      ...sourceImage
    }
  }
`
