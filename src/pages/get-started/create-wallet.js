import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ethers } from "ethers"

import Button from "../../components/Button"
import { Page } from "../../components/SharedStyledComponents"

// TODO delete once Page styles are merged in `deposit-address` branch
const StyledPage = styled(Page)`
  margin: 10rem auto 0;
`

const CreateWalletPage = () => {
  const [wallet, setWallet] = useState({})

  useEffect(() => {
    let wallet
    const privateKey = window.localStorage.getItem("privateKey")
    if (privateKey) {
      // TODO what could go wrong here? User could set value to any string...
      wallet = new ethers.Wallet(privateKey)
    } else {
      wallet = ethers.Wallet.createRandom()
      window.localStorage.setItem("privateKey", wallet.privateKey)
    }

    if (wallet.address) {
      setWallet(wallet)
    } else {
      // TODO catch error on wallet creation instead?
      console.error("Error creating a wallet.")
    }
  }, [])

  // TODO need loading state?
  return (
    <StyledPage>
      <h1>Your wallet</h1>
      <p>We’ve created you a wallet.</p>
      <p>
        Notice how you didn’t need to provide any personal information. Anyone
        can create an account, anywhere in the world.
      </p>
      <h2>Your Ethereum address</h2>
      <p>
        A unique identifier that you can share this with others to receive funds
      </p>
      <p>{wallet.address}</p>
      <Button to="#">Do some stuff!</Button>
    </StyledPage>
  )
}

export default CreateWalletPage
