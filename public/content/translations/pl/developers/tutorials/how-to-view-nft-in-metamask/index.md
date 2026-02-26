---
title: "Jak wyświetlić swoje NFT w portfelu (część 3/3 serii samouczków o NFT)"
description: "Ten samouczek opisuje, jak wyświetlić istniejące NFT na MetaMask!"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity" ]
skill: beginner
lang: pl
published: 2021-04-22
---

Ten samouczek jest częścią 3/3 w serii samouczków NFT, w której oglądamy nasze nowo wybite NFT. Możesz jednak użyć ogólnego samouczka dla dowolnego tokena ERC-721 za pomocą MetaMask, w tym w sieci głównej lub dowolnej sieci testowej. Jeśli chcesz dowiedzieć się, jak wybić własne NFT na Ethereum, zapoznaj się z [częścią 1 o tym, jak napisać i wdrożyć inteligentny kontrakt NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Gratulacje! Dotarłeś do najkrótszej i najprostszej części naszej serii samouczków NFT — jak wyświetlić swoje świeżo wybite NFT w wirtualnym portfelu. W tym przykładzie będziemy używać MetaMask, ponieważ jest to to, czego używaliśmy w poprzednich dwóch częściach.

Jako warunek wstępny, powinieneś mieć już zainstalowany MetaMask na telefonie komórkowym, a także powinno zawierać konto, na które wybiłeś swoje NFT — aplikację można pobrać za darmo na [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) lub [Androida](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## Krok 1: Ustaw sieć na Sepolia {#set-network-to-sepolia}

U góry aplikacji naciśnij przycisk „Portfel”, po czym zostaniesz poproszony o wybranie sieci. Ponieważ nasze NFT zostało wybite w sieci Sepolia, musisz wybrać Sepolia jako swoją sieć.

![Jak ustawić sieć Sepolia jako swoją sieć na MetaMask Mobile](./goerliMetamask.gif)

## Krok 2: Dodaj swój przedmiot kolekcjonerski do MetaMask {#add-nft-to-metamask}

Gdy znajdziesz się w sieci Sepolia, wybierz zakładkę „Przedmioty kolekcjonerskie” po prawej stronie i dodaj adres inteligentnego kontraktu NFT oraz ID tokena ERC-721 Twojego NFT — które powinieneś być w stanie znaleźć na Etherscan na podstawie haszu transakcji z wdrożenia Twojego NFT w części II naszego samouczka.

![Jak znaleźć hasz transakcji i ID tokena ERC-721](./findNFTEtherscan.png)

Może być konieczne kilkukrotne odświeżenie strony, aby zobaczyć swoje NFT — ale na pewno tam będzie <Emoji text="😄" size={1} />!

![Jak przesłać swoje NFT do MetaMask](./findNFTMetamask.gif)

Gratulacje! Pomyślnie wybiłeś NFT i możesz je teraz zobaczyć! Nie możemy się doczekać, aby zobaczyć, jak podbijesz świat NFT!
