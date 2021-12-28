---
title: A Simple Guide to Using MetaMask With Your Decentralized Application
description: This tutorial shows you how to make different Web3 Transactions using the MetaMask provider in the browser.
author: "Blake Wood Jr."
tags: [
  "MetaMask", 
  "Getting Started",
]
skill: beginner
lang: en
sidebar: true
published: 2021-12-28
---

This tutorial will guide you step by step through some important topics on working with MetaMask to give you the basics for a good foundation. If you wish to view the open souce project I've made with React.js to transact with MetaMask, please visit [https://github.com/blakewood84/metamask-transactions](https://github.com/blakewood84/metamask-transactions)!

## Initializing Your Application {#initialize-your-application}

The first and most important step is initializing your app to support MetaMask. To do this you must check if MetaMask exists by calling `window.ethereum` in the browser. The code below will check if MetaMask exists by seeing if `window.ethereum === 'undefined'`. If `window.ethereum` is infact undefined, then we will alert the user to please install MetaMask:

<p align="center">
    <img src="./initialize_img1.png" alt="Initializing MetaMask Image 1" />
</p>


![How to set Ropsten as your network on MetaMask Mobile](./ropstenMetamask.gif)

## Step 2: Add your collectable to MetaMask {#add-nft-to-metamask}

Once you’re on the Ropsten network, select the “Collectibles” tab on the right and add the NFT smart contract address and the ERC-721 token ID of your NFT — which you should be able to find on Etherscan based on the transaction hash from your NFT deployed in Part II of our tutorial.

![How to find your transaction hash and ERC-721 token ID](./findNFTEtherscan.png)

You may need to refresh a couple times to view your NFT — but it will be there <Emoji text="😄" size={1} />!

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

Congrats! You have successfully minted an NFT, and you can now view it! We can’t wait to see how you’ll take the NFT world by storm!
