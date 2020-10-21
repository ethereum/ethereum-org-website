import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ethers } from "ethers"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import axios from "axios"

import Emoji from "../../components/Emoji"
import Modal from "../../components/Modal"
import LoadingPage from "../../components/LoadingPage"
import Button from "../../components/Button"
import {
  Page,
  FakeButton,
  FakeButtonPrimary,
} from "../../components/SharedStyledComponents"

// TODO move
const API_ENDPOINT = `http://127.0.0.1:8000`

// TODO delete once Page styles are merged in `deposit-address` branch
const StyledPage = styled(Page)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 0rem;
  margin-bottom: 0rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const LeftColumn = styled.div`
  width: 25%;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 7rem;
`

const Intro = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    position: sticky;
    top: 6.25rem; /* account for navbar */
  }
`

const RightColumn = styled.div`
  width: 75%;
  border-left: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 20rem;
  padding-top: 4.7rem;
`
const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const WalletAddress = styled.div`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.ednBackground};
  width: 40%;
  margin: 1.5rem;
  margin-right: 1rem;
`
const WalletBalance = styled.div`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.ednBackground};
  width: 60%;
  margin: 1.5rem;
  margin-left: 1rem;
`

const AddressBar = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 1rem 1.5rem;
  position: sticky;
`

const Address = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  margin: 0;
`
const LargeAddress = styled.p`
  font-size: 40px;
  font-family: "SFMono-Regular", monospace;
  font-weight: 600;
  line-height: 100%;
  margin: 0;
`

const Token = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  margin: 0;
`

const Balance = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  margin: 0;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const RowSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const WalletRow = styled.div`
  display: flex;
  align-items: flex-start;
`

const TokenBalance = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

const P = styled.p`
  line-height: 100%;
  margin: 0;
`

const TxHistory = styled.div`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 1rem;
`

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const FakeButtonHover = styled(FakeButton)`
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.1);
    transform: translateY(-1px);
  }
`

const ReceiveButton = styled(FakeButtonPrimary)`
  margin-top: 0;
  margin-right: 0.5rem;
`

const CreateWalletPage = () => {
  const [wallet, setWallet] = useState({})
  const [isCreatingWallet, setIsCreatingWallet] = useState(true)
  const [isReceivingFunds, setIsReceivingFunds] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha()

  useEffect(() => {
    let wallet
    const privateKey = window.localStorage.getItem("privateKey")
    if (privateKey) {
      // TODO what could go wrong here? User could set value to any string...
      wallet = new ethers.Wallet(privateKey)
      setIsCreatingWallet(false)
      // TODO fetch wallet balance
    } else {
      wallet = ethers.Wallet.createRandom()
      window.localStorage.setItem("privateKey", wallet.privateKey)
      setTimeout(() => setIsCreatingWallet(false), 3000)
    }

    if (wallet.address) {
      setWallet(wallet)
    } else {
      // TODO catch error on wallet creation instead?
      console.error("Error creating a wallet.")
    }
  }, [])

  const [isModalOpen, setModalOpen] = useState(false)

  const handleFaucetRequest = async () => {
    console.log("handleFaucetRequest")
    if (!executeRecaptcha) {
      return
    }
    setIsReceivingFunds(true)

    const captchaResponse = await executeRecaptcha(wallet.address)
    const body = {
      walletAddress: wallet.address,
      captchaResponse: captchaResponse,
    }
    // TODO set loading state
    axios
      .post(`${API_ENDPOINT}/api/v1/faucet/request`, body)
      .then((resp) => {
        setIsReceivingFunds(false)
        // TODO add success toast
        // TODO fetch wallet balance
        console.log("**********YAY*********")
        console.log(resp)
        console.log("**********YAY*********")
      })
      .catch((e) => {
        setIsReceivingFunds(false)
        // TODO add fail toast
        console.error("********FAIL*********")
        console.error(e)
        console.error("********FAIL*********")
      })
  }

  if (isCreatingWallet) {
    return <LoadingPage text={"Creating wallet..."} />
  }

  const receiveButtonText = isReceivingFunds ? "Pending..." : "Receive funds"
  return (
    <StyledPage>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <WalletAddress>
          <H2>Your Ethereum address</H2>
          <p>
            A unique identifier that you can share with others to receive funds.
          </p>
          <LargeAddress>{wallet.address}</LargeAddress>
        </WalletAddress>
      </Modal>
      <LeftColumn>
        <Intro>
          <H1>Your wallet</H1>
          <p>We’ve created you a wallet.</p>
          <p>
            Notice how you didn’t need to provide any personal information.
            Anyone can create an account, anywhere in the world.
          </p>
          <FakeButtonPrimary onClick={() => setModalOpen(true)}>
            Get to know your wallet
          </FakeButtonPrimary>
        </Intro>
      </LeftColumn>
      <RightColumn>
        <AddressBar>
          <Row>
            <Emoji marginRight={0.5} size={1} text=":bust_in_silhouette:" />
            <Address>{wallet.address}</Address>
          </Row>
          <Row>
            <ReceiveButton
              onClick={handleFaucetRequest}
              disabled={isReceivingFunds}
            >
              <Emoji marginRight={0.5} size={1} text=":down-left_arrow:" />
              {receiveButtonText}
            </ReceiveButton>
            <Button isSecondary to="#">
              <Emoji marginRight={0.5} size={1} text=":repeat:" />
              Swap tokens
            </Button>
          </Row>
        </AddressBar>
        <WalletRow>
          <WalletAddress>
            <RowSpaceBetween>
              <H2>Your Ethereum address</H2>
              <FakeButtonHover onClick={() => setModalOpen(true)}>
                <Emoji text=":thinking_face:" />
              </FakeButtonHover>
            </RowSpaceBetween>
            <p>
              A unique identifier that you can share with others to receive
              funds.
            </p>
            <LargeAddress>{wallet.address}</LargeAddress>
          </WalletAddress>
          <WalletBalance>
            <RowSpaceBetween>
              <H2>Your balance</H2>
              <FakeButtonHover onClick={() => setModalOpen(true)}>
                <Emoji text=":thinking_face:" />
              </FakeButtonHover>
            </RowSpaceBetween>
            <p>With a wallet, you can accept tokens and have a balance.</p>
            <TokenBalance>
              <Token>ETH</Token>
              <Balance>0</Balance>
            </TokenBalance>
            <TokenBalance>
              <Token>DAI</Token>
              <Balance>0</Balance>
            </TokenBalance>
            <Row>
              <Button marginRight={0.5} to="#">
                Receive funds
              </Button>
              <Button marginRight={0.5} to="#">
                Send funds
              </Button>
              <Button isSecondary to="#">
                Swap tokens
              </Button>
            </Row>
          </WalletBalance>
        </WalletRow>
        <TxHistory>
          <RowSpaceBetween>
            <H2>Activity</H2>
            <FakeButtonHover onClick={() => setModalOpen(true)}>
              <Emoji text=":thinking_face:" />
            </FakeButtonHover>
          </RowSpaceBetween>
          <p>
            Here's all the activity from this account. This information is
            public.
          </p>
          <h3>Today</h3>
          <Transaction>
            <P>Received 10 Dai</P>
            <P>-10 Dai</P>
          </Transaction>
          <Transaction>
            <P>Sent 10 Dai</P>
            <P>-10 Dai</P>
          </Transaction>
          <h3>Yesterday</h3>
          <Transaction>
            <P>Sent 10 Dai</P>
            <P>-10 Dai</P>
          </Transaction>
          <h3>13 October 2020</h3>
          <Transaction>
            <P>Sent 10 Dai</P>
            <P>-10 Dai</P>
          </Transaction>
        </TxHistory>
      </RightColumn>
    </StyledPage>
  )
}

export default CreateWalletPage
