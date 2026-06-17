---
title: Ethereum dla programistów Go
description: Dowiedz się, jak programować dla Ethereum przy użyciu projektów i narzędzi opartych na Go
lang: pl
incomplete: true
---

<FeaturedText>Dowiedz się, jak programować dla Ethereum przy użyciu projektów i narzędzi opartych na Go</FeaturedText>

Użyj Ethereum do tworzenia zdecentralizowanych aplikacji (dapp). Te aplikacje dapp mogą być godne zaufania, co oznacza, że po wdrożeniu w Ethereum zawsze będą działać zgodnie z zaprogramowaniem. Są one zdecentralizowane, co oznacza, że działają w sieci peer-to-peer i nie mają pojedynczego punktu awarii. Żaden pojedynczy podmiot ani osoba ich nie kontroluje, a ich cenzurowanie jest prawie niemożliwe. Mogą kontrolować zasoby cyfrowe w celu tworzenia nowych rodzajów aplikacji.

## Wprowadzenie do inteligentnych kontraktów i języka Solidity {#getting-started-with-smart-contracts-and-solidity}

**Zrób pierwsze kroki w integracji Go z Ethereum**

Potrzebujesz najpierw bardziej podstawowego wprowadzenia? Sprawdź [ethereum.org/learn](/learn/) lub [ethereum.org/developers](/developers/).

- [Wyjaśnienie pojęcia blockchain](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Zrozumienie inteligentnych kontraktów](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Napisz swój pierwszy inteligentny kontrakt](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Dowiedz się, jak kompilować i wdrażać Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Samouczek dotyczący kontraktów](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Artykuły i książki dla początkujących {#beginner-articles-and-books}

- [Wprowadzenie do Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Użyj Golang do połączenia z Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Wdrażanie inteligentnych kontraktów Ethereum przy użyciu Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Przewodnik krok po kroku po testowaniu i wdrażaniu inteligentnych kontraktów Ethereum w Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [E-book: Programowanie Ethereum w Go](https://goethereumbook.org/) – _Twórz aplikacje Ethereum za pomocą Go_

## Artykuły i dokumentacja dla średniozaawansowanych {#intermediate-articles-and-docs}

- [Dokumentacja Go Ethereum](https://geth.ethereum.org/docs) – _Dokumentacja oficjalnej implementacji Ethereum w Golang_
- [Przewodnik programisty Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) – _Ilustrowany przewodnik obejmujący drzewo stanu, dowody wielokrotne (multi-proofs) i przetwarzanie transakcji_
- [Erigon i bezstanowe Ethereum](https://youtu.be/3-Mn7OckSus?t=394) – _Konferencja Społeczności Ethereum 2020 (EthCC 3)_
- [Erigon: optymalizacja klientów Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) – _Devcon 4 (2018)_
- [GoDoc dla Go Ethereum](https://godoc.org/github.com/ethereum/go-ethereum)
- [Tworzenie aplikacji dapp w Go z użyciem Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Praca z prywatną siecią Ethereum przy użyciu Golang i Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Testy jednostkowe kontraktów Solidity w Ethereum za pomocą Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Krótki przewodnik po używaniu Geth jako biblioteki](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Zaawansowane wzorce użycia {#advanced-use-patterns}

- [Symulowany backend Geth](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Aplikacje Blockchain-as-a-Service wykorzystujące Ethereum i Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Rozproszone przechowywanie danych IPFS i Swarm w aplikacjach blockchain Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Klienci mobilni: biblioteki i węzły Inproc Ethereum](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Natywne aplikacje dapp: powiązania Go z kontraktami Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Projekty i narzędzia Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) – _Oficjalna implementacja protokołu Ethereum w języku Go_
- [Analiza kodu Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) – _Przegląd i analiza kodu źródłowego Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) – _Szybsza pochodna Go Ethereum, z naciskiem na węzły archiwalne_
- [Golem](https://github.com/golemfactory/golem) – _Golem tworzy globalny rynek mocy obliczeniowej_
- [Quorum](https://github.com/jpmorganchase/quorum) – _Wymagająca zezwolenia implementacja Ethereum wspierająca prywatność danych_
- [Prysm](https://github.com/prysmaticlabs/prysm) – _Implementacja Ethereum „Serenity” 2.0 w Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) – _Zdecentralizowany Twitter: usługa mikroblogowania działająca na blockchainie Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implementacja w Golang i rozszerzenie specyfikacji Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) – _Pula kopania Ethereum typu open source_
- [Portfel HD Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) – _Derywacje portfela HD Ethereum w Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) – _Wsparcie dla wielu rodzajów sieci Ethereum_
- [Lekki klient Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) – _Implementacja Geth dla lekkiego podprotokołu Ethereum_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) – _Prosta implementacja portfela Ethereum i narzędzia w Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) – _Wydajny dostęp do danych blockchain przez Go SDK dla ponad 200 blockchainów_

Szukasz więcej zasobów? Sprawdź [ethereum.org/developers](/developers/)

## Współtwórcy społeczności Go {#go-community-contributors}

- [Discord Geth](https://discordapp.com/invite/nthXNEv)
- [Gist Geth](https://gitter.im/ethereum/go-ethereum)
- [Slack Gophers](https://invite.slack.golangbridge.org/) – [kanał #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange – Ethereum](https://ethereum.stackexchange.com/)
- [Gitter Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter Ethereum](https://gitter.im/ethereum/home)
- [Gitter lekkiego klienta Geth](https://gitter.im/ethereum/light-client)

## Inne zagregowane listy {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [ConsenSys: Ostateczna lista narzędzi dla programistów Ethereum](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Źródło na GitHubie](https://github.com/ConsenSys/ethereum-developer-tools-list)