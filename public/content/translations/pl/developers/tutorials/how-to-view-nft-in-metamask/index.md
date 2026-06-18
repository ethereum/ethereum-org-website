---
title: Jak wyświetlić swój NFT w portfelu (Część 3/3 serii samouczków o NFT)
description: Ten samouczek opisuje, jak wyświetlić istniejący NFT w MetaMask!
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: Wyświetlanie NFT w portfelu
lang: pl
published: 2021-04-22
---

Ten samouczek to część 3/3 serii samouczków o NFT, w której wyświetlamy nasz nowo wybity NFT. Możesz jednak użyć tego ogólnego samouczka dla dowolnego tokena ERC-721 korzystającego z MetaMask, w tym w Sieci głównej lub dowolnej sieci testowej. Jeśli chcesz dowiedzieć się, jak wybić własny NFT na Ethereum, sprawdź [Część 1 o tym, jak napisać i wdrożyć inteligentny kontrakt NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Gratulacje! Dotarłeś do najkrótszej i najprostszej części naszej serii samouczków o NFT — jak wyświetlić świeżo wybity NFT w wirtualnym portfelu. W tym przykładzie będziemy używać MetaMask, ponieważ to z niego korzystaliśmy w dwóch poprzednich częściach.

Wymaganiem wstępnym jest posiadanie zainstalowanej aplikacji mobilnej MetaMask, która powinna zawierać konto, na którym wybito NFT — aplikację można pobrać za darmo na [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) lub [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## Krok 1: Ustaw swoją sieć na Sepolia {#set-network-to-sepolia}

Na górze aplikacji naciśnij przycisk „Portfel” (Wallet), po czym zostaniesz poproszony o wybranie sieci. Ponieważ nasz NFT został wybity w sieci Sepolia, musisz wybrać Sepolia jako swoją sieć.

![How to set Sepolia as your network on MetaMask Mobile](./goerliMetamask.gif)

## Krok 2: Dodaj swój przedmiot kolekcjonerski do MetaMask {#add-nft-to-metamask}

Gdy znajdziesz się w sieci Sepolia, wybierz zakładkę „Przedmioty kolekcjonerskie” (Collectibles) po prawej stronie i dodaj adres inteligentnego kontraktu NFT oraz identyfikator tokena ERC-721 swojego NFT — powinieneś móc je znaleźć w Etherscan na podstawie hasha transakcji z Twojego NFT wdrożonego w Części II naszego samouczka.

![How to find your transaction hash and ERC-721 token ID](./findNFTEtherscan.png)

Być może będziesz musiał odświeżyć kilka razy, aby zobaczyć swój NFT — ale na pewno tam będzie <Emoji text="😄" size={1} />!

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

Gratulacje! Pomyślnie wybiłeś NFT i możesz go teraz wyświetlić! Nie możemy się doczekać, aby zobaczyć, jak zawojujesz świat NFT!