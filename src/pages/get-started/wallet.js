import React, { useEffect, useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useToasts } from "react-toast-notifications"
import styled from "styled-components"
import { ethers } from "ethers"
import axios from "axios"

import Emoji from "../../components/Emoji"
import Modal from "../../components/Modal"
import Link from "../../components/Link"
import LoadingPage from "../../components/LoadingPage"
import Button from "../../components/Button"
import {
  Page,
  FakeButtonPrimary,
} from "../../components/SharedStyledComponents"

const NETWORK = "goerli"

// TODO delete once Page styles are merged in `deposit-address` branch
const StyledPage = styled(Page)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 0rem;
  margin-bottom: 0rem;
  min-height: 100vh;
  background: radial-gradient(
    102.85% 102.85% at 47.01% 102.85%,
    rgba(255, 246, 37, 0.7) 0%,
    #ff7324 26.04%,
    #f952b6 67.71%,
    #1c1ce1 100%
  );
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const LeftColumn = styled.div`
  width: 30%;
  padding-left: 7rem;
  padding-top: 16rem;
`

const Intro = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    position: sticky;
    top: 6.25rem; /* account for navbar */
  }
`

const RightColumn = styled.div`
  width: 70%;
  padding-left: 9rem;
  padding-right: rem;
  padding-top: 8rem;
  margin-bottom: 7rem;
`
const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`

const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.text};
`

const WalletAddress = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
`

const MiniAddressCard = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MiniAddress = styled.p`
  font-size: 16px;
  font-family: "SFMono-Regular", monospace;
  font-weight: 600;
  line-height: 100%;
  margin: 0;
`

const LargeAddress = styled.p`
  font-size: 24px;
  font-family: "SFMono-Regular", monospace;
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
const StyledP = styled.p`
  color: ${(props) => props.theme.colors.white};
`

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const WalletCard = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  border: 1px solid ${(props) => props.theme.colors.border};
  max-width: 800px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 4px;
  margin-right: 2rem;
`

const LargeP = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  margin: 0;
`

const ReceiveButton = styled(FakeButtonPrimary)`
  margin-top: 0;
  margin-right: 0.5rem;
`

const CreateWalletPage = () => {
  const [wallet, setWallet] = useState({})
  const [balance, setBalance] = useState("0.0")
  const [transactions, setTransactions] = useState([])
  const [isCreatingWallet, setIsCreatingWallet] = useState(true)
  const [isReceivingFunds, setIsReceivingFunds] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha()
  const { addToast } = useToasts()

  useEffect(() => {
    async function fetchData(address) {
      await fetchBalance(address)
    }
    let wallet
    try {
      const privateKey = window.localStorage.getItem("privateKey")
      wallet = new ethers.Wallet(privateKey)
      setIsCreatingWallet(false)
    } catch {
      wallet = ethers.Wallet.createRandom()
      window.localStorage.setItem("privateKey", wallet.privateKey)
      setTimeout(() => {
        addToast("Wallet created!", {
          appearance: "success",
          autoDismiss: true,
        })
        setIsCreatingWallet(false)
      }, 3000)
    }

    setWallet(wallet)
    fetchData(wallet.address)
  }, [addToast])

  const [isModalOpen, setModalOpen] = useState(false)

  const fetchBalance = async (address) => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.GATSBY_PROVIDER_ENDPOINT,
      NETWORK
    )
    const balance = await provider.getBalance(address)
    const balanceString = ethers.utils.formatEther(balance)
    setBalance(balanceString)
  }

  const handleFaucetRequest = async () => {
    if (!executeRecaptcha) {
      return
    }
    setIsReceivingFunds(true)

    const captchaResponse = await executeRecaptcha(wallet.address)
    axios
      .post("/.netlify/functions/faucet", {
        walletAddress: wallet.address,
        captchaResponse: captchaResponse,
      })
      .then((resp) => {
        setIsReceivingFunds(false)
        addToast("Received 2 ETH!", {
          appearance: "success",
          autoDismiss: true,
        })
        const txs = transactions
        txs.push(resp.data.pendingTxHash)
        setTransactions(txs)
        // TODO delay fetching balance?
        // `resp` only provides pending tx hash... takes time to confirm
        fetchBalance(wallet.address)
      })
      .catch((error) => {
        console.error(error)
        setIsReceivingFunds(false)
        addToast("Something went wrong. Please try again later.", {
          appearance: "error",
          autoDismiss: true,
        })
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
          <StyledP>We’ve created you a wallet.</StyledP>
          <StyledP>
            Notice how you didn’t need to provide any personal information.
            Anyone can create an account, anywhere in the world.
          </StyledP>
          <FakeButtonPrimary onClick={() => setModalOpen(true)}>
            Get to know your wallet
          </FakeButtonPrimary>
        </Intro>
      </LeftColumn>
      <RightColumn>
        <WalletCard>
          <WalletAddress>
            <RowSpaceBetween>
              <H2>Your Ethereum address</H2>
            </RowSpaceBetween>
            <p>
              A unique identifier that you can share with others to receive
              funds.
            </p>
            {/* <LargeAddress>{wallet.address}</LargeAddress> */}
          </WalletAddress>
          <MiniAddressCard>
            <Emoji marginRight={0.5} size={1.5} text=":bust_in_silhouette:" />
            <MiniAddress>{wallet.address}</MiniAddress>
            <Button marginLeft={1.5} to="#">
              Copy address
            </Button>
          </MiniAddressCard>
          <WalletAddress>
            <RowSpaceBetween>
              <H2>Your balance</H2>
            </RowSpaceBetween>
            <p>With a wallet, you can accept tokens and have a balance.</p>
            <TokenBalance>
              <LargeP>ETH</LargeP>
              <LargeP>{balance}</LargeP>
            </TokenBalance>
            <TokenBalance>
              <LargeP>DAI</LargeP>
              <LargeP>0.0</LargeP>
            </TokenBalance>
            <Row>
              <ReceiveButton
                onClick={handleFaucetRequest}
                disabled={isReceivingFunds}
              >
                {receiveButtonText}
              </ReceiveButton>
              <Button marginRight={0.5} to="#">
                Send funds
              </Button>
              <Button isSecondary to="#">
                Swap tokens
              </Button>
            </Row>
          </WalletAddress>
          {transactions.length > 0 && (
            <WalletAddress>
              <RowSpaceBetween>
                <H2>Activity</H2>
              </RowSpaceBetween>
              <p>
                Here's all the activity from this account. This information is
                public.
              </p>
              <h3>Today</h3>
              {transactions.map((tx, i) => {
                return (
                  <Transaction key={i}>
                    <LargeP>
                      <Link to={`https://goerli.etherscan.io/tx/${tx}`}>
                        Received 2.0 ETH
                      </Link>
                    </LargeP>
                    <LargeP>+2 ETH</LargeP>
                  </Transaction>
                )
              })}
            </WalletAddress>
          )}
        </WalletCard>
      </RightColumn>
    </StyledPage>
  )
}

export default CreateWalletPage
