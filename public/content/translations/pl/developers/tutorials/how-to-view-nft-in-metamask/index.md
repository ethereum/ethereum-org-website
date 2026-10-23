---
title: "Jak wyświetlić swój NFT w portfelu (Część 3/3 serii samouczków o NFT)"
description: "Ten samouczek opisuje, jak wyświetlić istniejący NFT w MetaMask!"
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "Wyświetlanie NFT w portfelu"
lang: pl
published: 2021-04-22
---

Ten samouczek to część 3/3 serii samouczków o niewymiennych tokenach (NFT), w której wyświetlamy nasz nowo wybity NFT. Możesz jednak użyć tego ogólnego samouczka dla dowolnego tokena ERC-721 korzystając z MetaMask, w tym w Sieci głównej lub dowolnej sieci testowej. Jeśli chcesz dowiedzieć się, jak wybić własny NFT na Ethereum, sprawdź [Część 1: Jak napisać i wdrożyć inteligentny kontrakt NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Gratulacje! Dotarłeś do najkrótszej i najprostszej części naszej serii samouczków o NFT — jak wyświetlić świeżo wybity NFT w wirtualnym portfelu. W tym przykładzie będziemy używać MetaMask, ponieważ to jego używaliśmy w poprzednich dwóch częściach.

Jako warunek wstępny, powinieneś już mieć zainstalowany MetaMask, jako rozszerzenie przeglądarki lub aplikację mobilną, i powinien on zawierać konto, na którym wybiłeś swój NFT. Możesz pobrać MetaMask za darmo ze [strony pobierania MetaMask](https://metamask.io/download).

## Krok 1: Ustaw swoją sieć na Sepolia {#set-network-to-sepolia}

Ponieważ nasz niewymienny token (NFT) został wybity w sieci testowej Sepolia, będziesz chciał wybrać Sepolia jako swoją sieć. MetaMask domyślnie ukrywa sieci testowe, więc najpierw musisz je włączyć:

1. Otwórz menu w prawym górnym rogu i wybierz „Sieci”.
2. Przewiń w dół do końca listy sieci i włącz opcję „Pokaż sieci testowe”.
3. Wybierz „Sepolia” z listy sieci.

Zobacz [przewodnik MetaMask dotyczący wyświetlania sieci testowych](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/), jeśli menu wygląda inaczej w Twojej wersji MetaMask.

## Krok 2: Dodaj swój przedmiot kolekcjonerski do MetaMask {#add-nft-to-metamask}

MetaMask automatycznie wykrywa niewymienne tokeny (NFT) tylko w niektórych sieciach, do których nie należy Sepolia, więc będziesz musiał zaimportować swój NFT ręcznie. Do tego potrzebujesz adresu inteligentnego kontraktu NFT oraz identyfikatora tokena ERC-721 Twojego NFT — które powinieneś móc znaleźć w Etherscan na podstawie hasha transakcji z Twojego NFT wybitego w Części II naszego samouczka. Jeśli użyłeś kontraktu z Części 1, Twój pierwszy NFT ma identyfikator tokena 1.

![Jak znaleźć hash transakcji i identyfikator tokena ERC-721](./findNFTEtherscan.png)

Następnie w MetaMask (rozszerzenie lub aplikacja mobilna):

1. Przejdź do sekcji „NFT” na ekranie głównym i wybierz „Importuj NFT”.
2. Wybierz Sepolia jako sieć i wklej adres inteligentnego kontraktu NFT w polu „Adres”.
3. Wprowadź swój identyfikator tokena w polu „Identyfikator tokena” i wybierz „Importuj”.

Być może będziesz musiał odświeżyć stronę kilka razy, aby zobaczyć swój NFT — ale na pewno tam będzie <Emoji text="😄" size={1} />! Jeśli MetaMask poinformuje, że nie jesteś właścicielem NFT, sprawdź, czy wybrałeś konto, na którym wybiłeś ten NFT. Aby uzyskać więcej pomocy, zobacz [przewodnik MetaMask dotyczący NFT](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Gratulacje! Pomyślnie wybiłeś NFT i możesz go teraz wyświetlić! Nie możemy się doczekać, aby zobaczyć, jak zawojujesz świat NFT!
