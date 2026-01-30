---
title: Ethereum dla deweloperów Go
description: Dowiedz się, jak programować dla Ethereum przy użyciu projektów i narzędzi w języku Go
lang: pl
incomplete: true
---

<FeaturedText>Dowiedz się, jak programować dla Ethereum przy użyciu projektów i narzędzi opartych na Go</FeaturedText>

Użyj Ethereum do tworzenia aplikacji zdecentralizowanych (lub „dapp”). Te aplikacje zdecentralizowane mogą być godne zaufania, co oznacza, że ​​po wdrożeniu w Ethereum zawsze będą działać tak, jak zaprogramowano. Są one zdecentralizowane, czyli działają w sieci peer-to-peer, przez co nie ma pojedynczego punktu awarii. Żaden podmiot ani osoba nie sprawuje nad nimi kontroli, a cenzurowanie jest prawie niemożliwe. Mogą kontrolować zasoby cyfrowe w celu tworzenia nowych rodzajów aplikacji.

## Pierwsze kroki z inteligentnymi kontraktami i językiem Solidity {#getting-started-with-smart-contracts-and-solidity}

**Rozpocznij integrowanie Go z Ethereum**

Potrzebujesz bardziej podstawowych informacji? Sprawdź [ethereum.org/learn](/learn/) lub [ethereum.org/developers](/developers/).

- [Wyjaśnienie Blockchain](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Zrozumienie inteligentnych kontraktów](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Napisz swój pierwszy inteligentny kontrakt](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Dowiedz się, jak kompilować i wdrażać Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Samouczek dotyczący kontraktów](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Artykuły i książki dla początkujących {#beginner-articles-and-books}

- [Wprowadzenie do Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Użyj Golang, aby połączyć się z Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Wdrażanie inteligentnych kontraktów Ethereum za pomocą Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Przewodnik krok po kroku po testowaniu i wdrażaniu inteligentnych kontraktów Ethereum w Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Rozwój Ethereum za pomocą Go](https://goethereumbook.org/) - _Tworzenie aplikacji Ethereum za pomocą Go_

## Artykuły i dokumentacja dla średnio zaawansowanych {#intermediate-articles-and-docs}

- [Dokumentacja Go Ethereum](https://geth.ethereum.org/docs/) - _Dokumentacja oficjalnego Golang Ethereum_
- [Przewodnik programisty Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Ilustrowany przewodnik obejmujący drzewo stanu, wielokrotne dowody i przetwarzanie transakcji_
- [Erigon i bezstanowe Ethereum](https://youtu.be/3-Mn7OckSus?t=394) – _Konferencja społeczności Ethereum 2020 (EthCC 3)_
- [Erigon: optymalizacja klientów Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 (2018)_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Tworzenie dappki w Go za pomocą Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Praca z prywatną siecią Ethereum za pomocą Golang i Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Testowanie jednostkowe kontraktów Solidity na Ethereum za pomocą Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Krótki przewodnik po używaniu Geth jako biblioteki](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Zaawansowane wzorce użycia {#advanced-use-patterns}

- [Symulowany backend GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Aplikacje Blockchain-as-a-Service wykorzystujące Ethereum i Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Rozproszone przechowywanie danych IPFS i Swarm w aplikacjach blockchain Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Klienci mobilni: Biblioteki i węzły Inproc Ethereum](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Natywne dapki: powiązania Go z kontraktami Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Projekty i narzędzia Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Oficjalna implementacja protokołu Ethereum w Go_
- [Analiza kodu Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Przegląd i analiza kodu źródłowego Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Szybsza pochodna Go Ethereum, z naciskiem na węzły archiwalne_
- [Golem](https://github.com/golemfactory/golem) - _Golem tworzy globalny rynek mocy obliczeniowej_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Implementacja Ethereum z uprawnieniami, wspierająca prywatność danych_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Implementacja Ethereum „Serenity” 2.0 w Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Zdecentralizowany Twitter: usługa mikroblogowania działająca na blockchainie Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implementacja i rozszerzenie w Golang specyfikacji Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Pula wydobywcza Ethereum o otwartym kodzie źródłowym_
- [Portfel HD Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Pochodne portfela HD Ethereum w Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Wsparcie dla wielu rodzajów sieci Ethereum_
- [Lekki klient Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Implementacja Geth podprotokołu Light Ethereum_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Prosta implementacja portfela Ethereum i narzędzia w Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _Wydajny dostęp do danych blockchain za pomocą Go SDK dla ponad 200 blockchainów_

Szukasz więcej materiałów? Sprawdź [ethereum.org/developers](/developers/)

## Współtwórcy społeczności Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [kanał #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Gitter lekkiego klienta Geth](https://gitter.im/ethereum/light-client)

## Inne zagregowane listy {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Ostateczna lista narzędzi dla deweloperów Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Źródło na GitHubie](https://github.com/ConsenSys/ethereum-developer-tools-list)
