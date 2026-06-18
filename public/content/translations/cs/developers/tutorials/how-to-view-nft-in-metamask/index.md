---
title: Jak si zobrazit NFT ve své peněžence (Část 3/3 ze série tutoriálů o NFT)
description: Tento tutoriál popisuje, jak si zobrazit existující NFT v MetaMasku!
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: Zobrazení NFT v peněžence
lang: cs
published: 2021-04-22
---

Tento tutoriál je 3. částí ze série tutoriálů o NFT, kde si zobrazíme naše nově vyražené NFT. Tento obecný tutoriál však můžete použít pro jakýkoli token ERC-721 pomocí MetaMasku, a to včetně Mainnetu nebo jakéhokoli testnetu. Pokud byste se chtěli naučit, jak razit vlastní NFT na Ethereu, měli byste se podívat na [1. část o tom, jak napsat a nasadit chytrý kontrakt pro NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Gratulujeme! Dostali jste se k nejkratší a nejjednodušší části naší série tutoriálů o NFT — jak si zobrazit čerstvě vyražené NFT ve virtuální peněžence. Pro tento příklad budeme používat MetaMask, protože jsme ho používali i v předchozích dvou částech.

Jako předpoklad byste již měli mít nainstalovaný MetaMask na mobilu a měl by obsahovat účet, na který jste své NFT vyrazili — aplikaci můžete získat zdarma pro [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) nebo [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## Krok 1: Nastavte svou síť na Sepolia {#set-network-to-sepolia}

V horní části aplikace stiskněte tlačítko „Wallet“ (Peněženka), po kterém budete vyzváni k výběru sítě. Vzhledem k tomu, že naše NFT bylo vyraženo v síti Sepolia, budete chtít jako svou síť vybrat Sepolia.

![How to set Sepolia as your network on MetaMask Mobile](./goerliMetamask.gif)

## Krok 2: Přidejte svůj sběratelský předmět do MetaMasku {#add-nft-to-metamask}

Jakmile budete v síti Sepolia, vyberte záložku „Collectibles“ (Sběratelské předměty) vpravo a přidejte adresu chytrého kontraktu NFT a ID tokenu ERC-721 vašeho NFT — to byste měli být schopni najít na Etherscanu na základě hashe transakce z vašeho NFT nasazeného ve II. části našeho tutoriálu.

![How to find your transaction hash and ERC-721 token ID](./findNFTEtherscan.png)

Možná budete muset několikrát obnovit stránku, abyste své NFT viděli — ale bude tam <Emoji text="😄" size={1} />!

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

Gratulujeme! Úspěšně jste vyrazili NFT a nyní si ho můžete zobrazit! Nemůžeme se dočkat, až uvidíme, jak vezmete svět NFT útokem!