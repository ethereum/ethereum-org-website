---
title: "Sponsoring gas fees: How to cover transaction costs for your users"
description: Using account abstraction we can create smart contract wallets that accept transactions that either were sent by a specific EOA, or which were signed by that EOA. These smart contracts can then own tokens, which 
author: Ori Pomerantz
tags: ["gasless", "erc-20", "account abstraction"]
skill: intermediate
lang: en
published: 2026-03-15
---

## Introduction {#introduction}

A [previous article](/developers/tutorials/gasless) discussed using gasless access to your own application using EIP-712 signatures, but it is limited to your own smart contracts. Using [account abstraction](/roadmap/account-abstraction), we can create smart contract wallets that accept two types of transactions, and relay them to a requested destination:

- Transactions sent by a specific EOA (which require that EOA to have ETH)
- Transactions sent from anywhere, but signed by the same EOA. This way, we can provide a gasless way for an account to hold assets (tokens, etc.) and perform all the functions an EOA with gas can.

This way, we can provide a gasless way for an account to hold assets (tokens, etc.) and perform all the functions an EOA with gas can.

### Why we can't just relay request {#why-no-tx-origin}

## Seeing it in action {#in-action}

1. Ensure you have both [Node](https://nodejs.org/en/download) and [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Clone the application and install the necessary software.

    ```sh
    git clone https://github.com/qbzzt/260315-gasless-tokens.git
    cd 260315-gasless-tokens
    forge build
    cd server
    npm install
    ```

3. Edit `.env` to set `SEPOLIA_PRIVATE_KEY` to a wallet that has ETH on Sepolia. If you need Sepolia ETH, [use a faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia). Ideally, this private key should be different from the one you have in your browser wallet.

4. Start the server.

    ```sh
    npm run dev
    ```

5. Browse to the application at URL [`http://localhost:5173`](http://localhost:5173).

6. Click **Connect with Injected** to connect to a wallet. Approve in the wallet, and approve the change to Sepolia if necessary.

7. Scroll down and click **Deploy UserProxy (slow process)**.

8. You can see when the user proxy is deployed because there is an address next to **UserProxy access**. If you waited 24 seconds (2 blocks) and it still hasn't happened, there might be a problem with detecting changes. 

    If that is the case, go to the [Sepolia Explorer](https://eth-sepolia.blockscout.com/) and enter the deployment transaction hash you see in the output of the server at `npm run dev`. Click the contract that was created to see its address and copy it. Paste the address in the *Or enter existing proxy address* field and then click **Set proxy address**.

9. Click **Request more tokens for proxy** to submit a call to the ERC-20 contract's [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) function to get tokens. **Confirm** the signature in the wallet. Of course, the tokens get to the address of the proxy, not the user.

10. Scroll down and click the link under *Last transaction:*. This will open the browser to show you the `faucet` transaction.

11. In the *amount to transfer* enter a number between one and one thousand. Click **Transfer** to transfer the tokens to your own address. Before you click **Confirm** for the request, see that the data being signed is opaque. Users would have a hard time understanding what they are signing. Remember that, we will discuss it [below](#conclusion).

    ![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

12. After the transaction is confirmed, wait to see the change in both *your balance* and *proxy balance*. Note that this will also take some time, because Sepolia has a block time of 12 seconds.

## How it works {#how-work}

### The wallet samrt contract {#wallet-smart-contract}

### The relayer {#relayer}

### User interface {#user-interface}

#### The opaque signature issue {#opaque-signature}

## Conclusion {#conclusion}


7702, 4337, and 1271.