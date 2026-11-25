---
title: Come visualizzare il tuo NFT nel tuo portafoglio (Parte 3/3 della serie di tutorial sugli NFT)
description: Questo tutorial descrive come visualizzare un NFT esistente su MetaMask!
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: Visualizzare l'NFT nel portafoglio
lang: it
published: 2021-04-22
---

Questo tutorial è la Parte 3/3 della serie di tutorial sugli NFT, in cui visualizziamo il nostro NFT appena coniato. Tuttavia, puoi usare il tutorial generale per qualsiasi token ERC-721 usando MetaMask, inclusi quelli sulla Mainnet o su qualsiasi testnet. Se desideri imparare a coniare il tuo NFT su Ethereum, dovresti dare un'occhiata alla [Parte 1 su Come scrivere e distribuire uno smart contract per NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Congratulazioni! Sei arrivato alla parte più breve e semplice della nostra serie di tutorial sugli NFT: come visualizzare il tuo NFT appena coniato su un portafoglio virtuale. Useremo MetaMask per questo esempio, poiché è quello che abbiamo usato nelle due parti precedenti.

Come prerequisito, dovresti avere già installato MetaMask, come estensione del browser o app mobile, e dovrebbe includere l'account su cui hai coniato il tuo NFT. Puoi ottenere MetaMask gratuitamente dalla [pagina di download di MetaMask](https://metamask.io/download).

## Passaggio 1: imposta la tua rete su Sepolia {#set-network-to-sepolia}

Poiché il nostro NFT è stato coniato sulla rete di test Sepolia, vorrai selezionare Sepolia come tua rete. MetaMask nasconde le reti di test per impostazione predefinita, quindi prima attivale:

1. Apri il menu nell'angolo in alto a destra e seleziona "Reti".
2. Scorri verso il basso fino alla fine dell'elenco delle reti e attiva "Mostra reti di test".
3. Seleziona "Sepolia" dall'elenco delle reti.

Consulta la [guida di MetaMask alla visualizzazione delle testnet](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) se i menu sembrano diversi nella tua versione di MetaMask.

## Passaggio 2: aggiungi il tuo oggetto da collezione a MetaMask {#add-nft-to-metamask}

MetaMask rileva gli NFT automaticamente solo su alcune reti, che non includono Sepolia, quindi dovrai importare il tuo NFT manualmente. Per farlo hai bisogno dell'indirizzo dello smart contract dell'NFT e dell'ID del token ERC-721 del tuo NFT, che dovresti riuscire a trovare su Etherscan in base all'hash della transazione del tuo NFT coniato nella Parte II del nostro tutorial. Se hai usato il contratto della Parte 1, il tuo primo NFT ha l'ID del token 1.

![Come trovare l'hash della transazione e l'ID del token ERC-721](./findNFTEtherscan.png)

Quindi, in MetaMask (estensione o mobile):

1. Vai alla sezione "NFT" della schermata iniziale e seleziona "Importa NFT".
2. Seleziona Sepolia come rete e incolla l'indirizzo dello smart contract del tuo NFT nella casella "Indirizzo".
3. Inserisci l'ID del tuo token nella casella "ID token" e seleziona "Importa".

Potresti dover aggiornare un paio di volte per visualizzare il tuo NFT, ma sarà lì <Emoji text="😄" size={1} />! Se MetaMask dice che non sei il proprietario dell'NFT, verifica di aver selezionato l'account su cui hai coniato l'NFT. Per ulteriore aiuto, consulta la [guida di MetaMask agli NFT](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Congratulazioni! Hai coniato con successo un NFT e ora puoi visualizzarlo! Non vediamo l'ora di vedere come conquisterai il mondo degli NFT!
