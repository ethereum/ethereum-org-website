---
title: So zeigen Sie Ihr NFT in Ihrer Wallet an (Teil 3/3 der NFT-Tutorial-Reihe)
description: "Dieses Tutorial beschreibt, wie Sie ein bestehendes NFT in MetaMask anzeigen können!"
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: NFT in Wallet anzeigen
lang: de
published: 2021-04-22
---

Dieses Tutorial ist Teil 3/3 der NFT-Tutorial-Reihe, in dem wir unseren neu geprägten NFT ansehen. Sie können das allgemeine Tutorial jedoch für jeden ERC-721-Token verwenden, der MetaMask nutzt, einschließlich im Mainnet oder in jedem Testnetz. Wenn Sie lernen möchten, wie Sie Ihren eigenen NFT auf Ethereum prägen, sollten Sie sich [Teil 1: Wie man einen NFT-Smart-Contract schreibt und bereitstellt](/developers/tutorials/how-to-write-and-deploy-an-nft) ansehen!

Herzlichen Glückwunsch! Sie haben es zum kürzesten und einfachsten Teil unserer NFT-Tutorial-Reihe geschafft – wie Sie Ihren frisch geprägten NFT in einer virtuellen Wallet anzeigen. Wir werden für dieses Beispiel MetaMask verwenden, da wir dies auch in den vorherigen zwei Teilen verwendet haben.

Als Voraussetzung sollten Sie MetaMask bereits installiert haben, entweder als Browser-Erweiterung oder als mobile App, und es sollte das Konto enthalten, auf das Sie Ihren NFT geprägt haben. Sie können MetaMask kostenlos von der [MetaMask-Downloadseite](https://metamask.io/download) herunterladen.

## Schritt 1: Stellen Sie Ihr Netzwerk auf Sepolia ein {#set-network-to-sepolia}

Da unser NFT im Sepolia-Testnetz geprägt wurde, sollten Sie Sepolia als Ihr Netzwerk auswählen. MetaMask verbirgt Testnetze standardmäßig, also schalten Sie diese zuerst ein:

1. Öffnen Sie das Menü in der oberen rechten Ecke und wählen Sie „Netzwerke“.
2. Scrollen Sie in der Netzwerkliste nach unten und aktivieren Sie „Testnetzwerke anzeigen“.
3. Wählen Sie „Sepolia“ aus der Netzwerkliste.

Sehen Sie sich den [Leitfaden von MetaMask zur Anzeige von Testnetzen](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) an, falls die Menüs in Ihrer Version von MetaMask anders aussehen.

## Schritt 2: Fügen Sie Ihr Sammlerstück zu MetaMask hinzu {#add-nft-to-metamask}

MetaMask erkennt NFTs nur in einigen Netzwerken automatisch, zu denen Sepolia nicht gehört. Daher müssen Sie Ihren NFT manuell importieren. Dafür benötigen Sie die NFT-Smart-Contract-Adresse und die ERC-721-Token-ID Ihres NFTs – diese sollten Sie auf Etherscan anhand des Transaktions-Hashs Ihres in Teil II unseres Tutorials geprägten NFTs finden können. Wenn Sie den Vertrag aus Teil 1 verwendet haben, hat Ihr erster NFT die Token-ID 1.

![So finden Sie Ihren Transaktions-Hash und Ihre ERC-721-Token-ID](./findNFTEtherscan.png)

Dann in MetaMask (Erweiterung oder mobil):

1. Gehen Sie auf dem Startbildschirm zum Abschnitt „NFTs“ und wählen Sie „NFT importieren“.
2. Wählen Sie Sepolia als Netzwerk aus und fügen Sie Ihre NFT-Smart-Contract-Adresse in das Feld „Adresse“ ein.
3. Geben Sie Ihre Token-ID in das Feld „Token-ID“ ein und wählen Sie „Importieren“.

Möglicherweise müssen Sie ein paar Mal aktualisieren, um Ihren NFT zu sehen – aber er wird da sein <Emoji text="😄" size={1} />! Wenn MetaMask meldet, dass Sie nicht der Eigentümer des NFTs sind, überprüfen Sie, ob Sie das Konto ausgewählt haben, auf das Sie den NFT geprägt haben. Weitere Hilfe finden Sie im [Leitfaden von MetaMask zu NFTs](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Herzlichen Glückwunsch! Sie haben erfolgreich einen NFT geprägt und können ihn nun ansehen! Wir können es kaum erwarten zu sehen, wie Sie die NFT-Welt im Sturm erobern werden!
