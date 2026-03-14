---
title: "Jak si zobrazit své NFT ve své peněžence (3. část ze 3 v sérii návodů o NFT)"
description: "Tento návod popisuje, jak si zobrazit stávající NFT v peněžence MetaMask!"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity" ]
skill: beginner
breadcrumb: "NFT v peněžence"
lang: cs
published: 2021-04-22
---

Tento návod je 3. část ze 3 v sérii návodů o NFT, ve které si zobrazíme své nově vyražené NFT. Tento obecný návod však můžete použít pro jakýkoli token ERC-721 s použitím peněženky MetaMask, a to jak na hlavní síti, tak na jakékoli testovací síti. Pokud se chcete naučit, jak si vyrazit vlastní NFT na Ethereu, podívejte se na [1. část o tom, jak napsat a nasadit chytrý kontrakt pro NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Výborně! Dostali jste se k nejkratší a nejjednodušší části naší série návodů o NFT – jak si zobrazit své čerstvě vyražené NFT ve virtuální peněžence. V tomto příkladu budeme používat MetaMask, protože jsme ho používali i v předchozích dvou částech.

Jako předpoklad byste měli mít již nainstalovanou mobilní aplikaci MetaMask, a ta by měla obsahovat účet, na který jste si své NFT vyrazili – aplikaci si můžete zdarma stáhnout pro [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) nebo [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## Krok 1: Nastavte síť na Sepolia {#set-network-to-sepolia}

V horní části aplikace stiskněte tlačítko „Peněženka“, poté budete vyzváni k výběru sítě. Protože naše NFT bylo vyraženo na síti Sepolia, budete chtít jako síť vybrat Sepolia.

![Jak nastavit Sepolia jako síť v mobilní aplikaci MetaMask](./goerliMetamask.gif)

## Krok 2: Přidejte svůj sběratelský předmět do MetaMask {#add-nft-to-metamask}

Jakmile budete na síti Sepolia, vyberte vpravo kartu „Sběratelské předměty“ a přidejte adresu chytrého kontraktu NFT a ID tokenu ERC-721 vašeho NFT – které byste měli najít na Etherscanu na základě hashe transakce z vašeho NFT nasazeného v II. části našeho návodu.

![Jak najít hash transakce a ID tokenu ERC-721](./findNFTEtherscan.png)

Možná budete muset několikrát obnovit stránku, abyste své NFT viděli – ale bude tam <Emoji text="😄" size={1} />!

![Jak nahrát své NFT do MetaMask](./findNFTMetamask.gif)

Výborně! Úspěšně jste vyrazili NFT a nyní si ho můžete prohlédnout! Nemůžeme se dočkat, až uvidíme, jak vezmete svět NFT útokem!
