---
title: "Ethereum pro vývojáře v Go"
description: "Naučte se vyvíjet pro Ethereum pomocí projektů a nástrojů založených na Go"
lang: cs
incomplete: true
---

<FeaturedText>Naučte se vyvíjet pro Ethereum pomocí projektů a nástrojů založených na Go</FeaturedText>

Použijte Ethereum k vytvoření decentralizovaných aplikací (neboli „dapps“). Tyto dapps mohou být důvěryhodné, což znamená, že jakmile jsou nasazeny na Ethereum, budou vždy běžet tak, jak byly naprogramovány. Jsou decentralizované, což znamená, že běží v peer-to-peer síti a neexistuje žádný centrální bod selhání. Žádný jediný subjekt ani osoba je neovládá a je téměř nemožné je cenzurovat. Mohou ovládat digitální aktiva za účelem vytváření nových druhů aplikací.

## Začínáme s chytrými kontrakty a jazykem Solidity {#getting-started-with-smart-contracts-and-solidity}

**Udělejte první kroky k integraci Go s Ethereem**

Potřebujete nejprve základnější úvod? Podívejte se na [ethereum.org/learn](/learn/) nebo [ethereum.org/developers](/developers/).

- [Vysvětlení blockchainu](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Porozumění chytrým kontraktům](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Napište svůj první chytrý kontrakt](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Naučte se kompilovat a nasazovat Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Výukový program pro kontrakty](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Články a knihy pro začátečníky {#beginner-articles-and-books}

- [Začínáme s Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Použití Golang pro připojení k Ethereu](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Nasazení chytrých kontraktů Etherea pomocí Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Podrobný průvodce testováním a nasazováním chytrých kontraktů Etherea v Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [E-kniha: Vývoj pro Ethereum s Go](https://goethereumbook.org/) - _Vývoj aplikací pro Ethereum pomocí Go_

## Články a dokumentace pro středně pokročilé {#intermediate-articles-and-docs}

- [Dokumentace Go Ethereum](https://geth.ethereum.org/docs) - _Dokumentace pro oficiální Ethereum Golang_
- [Programátorská příručka pro Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Ilustrovaný průvodce zahrnující strom stavu, vícenásobné důkazy a zpracování transakcí_
- [Erigon a bezstavové Ethereum](https://youtu.be/3-Mn7OckSus?t=394) - _Komunitní konference Etherea 2020 (EthCC 3)_
- [Erigon: optimalizace klientů Etherea](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 (2018)_
- [GoDoc pro Go Ethereum](https://godoc.org/github.com/ethereum/go-ethereum)
- [Vytvoření dapp v Go pomocí Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Práce se soukromou sítí Etherea pomocí Golang a Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Jednotkové testování kontraktů v Solidity na Ethereu pomocí Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Stručná referenční příručka pro použití Geth jako knihovny](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Pokročilé vzory použití {#advanced-use-patterns}

- [Simulovaný backend GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Aplikace Blockchain-as-a-Service využívající Ethereum a Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Distribuované úložiště IPFS a Swarm v blockchainových aplikacích Etherea](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Mobilní klienti: Knihovny a Inproc uzly Etherea](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Nativní dapps: Vazby Go na kontrakty Etherea](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Projekty a nástroje v Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Oficiální implementace protokolu Ethereum v Go_
- [Analýza kódu Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Revize a analýza zdrojového kódu Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Rychlejší derivát Go Ethereum se zaměřením na archivní uzly_
- [Golem](https://github.com/golemfactory/golem) - _Golem vytváří globální trh s výpočetním výkonem_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Implementace Etherea s řízeným přístupem podporující ochranu osobních údajů_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Implementace Etherea 'Serenity' 2.0 v Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Decentralizovaný Twitter: Služba pro mikroblogování běžící na blockchainu Etherea_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implementace a rozšíření specifikace Minimum Viable Plasma v Golang_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Open source fond pro těžbu Etherea_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _Odvození HD peněženky Etherea v Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Podpora pro mnoho druhů sítí Etherea_
- [Lehký klient Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Implementace lehkého subprotokolu Etherea v Geth_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Jednoduchá implementace peněženky Etherea a nástroje v Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _Efektivní přístup k datům blockchainu přes Go SDK pro více než 200 blockchainů_

Hledáte další zdroje? Podívejte se na [ethereum.org/developers](/developers/)

## Přispěvatelé z komunity Go {#go-community-contributors}

- [Discord Geth](https://discordapp.com/invite/nthXNEv)
- [Gist Geth](https://gitter.im/ethereum/go-ethereum)
- [Slack Gophers](https://invite.slack.golangbridge.org/) - [kanál #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Gitter Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter Etherea](https://gitter.im/ethereum/home)
- [Gitter lehkého klienta Geth](https://gitter.im/ethereum/light-client)

## Další agregované seznamy {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [ConsenSys: Definitivní seznam vývojářských nástrojů pro Ethereum](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Zdroj na GitHubu](https://github.com/ConsenSys/ethereum-developer-tools-list)