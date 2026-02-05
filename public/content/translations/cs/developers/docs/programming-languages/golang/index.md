---
title: Ethereum pro vývojáře v Go
description: Naučte se vyvíjet pro Ethereum pomocí projektů a nástrojů v jazyce Go
lang: cs
incomplete: true
---

<FeaturedText>Naučte se vyvíjet pro Ethereum pomocí projektů a nástrojů v jazyce Go</FeaturedText>

Použijte Ethereum k vytváření decentralizovaných aplikací (neboli "dapps"). Tyto aplikace mohou být důvěryhodné, což znamená, že jakmile je jednou nasadíte na Ethereum, budou vždy spouštěny přesně tak, jak jsou naprogramovány. Jsou decentralizované, což znamená, že běží na síti peer-to-peer a neexistuje žádný jediný bod selhání. Nekontroluje je žádná jediná entita ani osoba a je téměř nemožné je cenzurovat. Mohou ovládat digitální aktiva, aby mohly vytvářet nové druhy aplikací.

## Začínáme s chytrými kontrakty a jazykem Solidity {#getting-started-with-smart-contracts-and-solidity}

**Udělejte své první kroky k integraci jazyka Go s Ethereem**

Potřebujete nejdříve úplně základní informace? Podívejte se na [ethereum.org/learn](/learn/) nebo [ethereum.org/developers](/developers/).

- [Vysvětlení blockchainu](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Porozumění chytrým kontraktům](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Napište svůj první chytrý kontrakt](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Naučte se kompilovat a nasazovat Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Tutoriál ke kontraktům](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Články a knihy pro začátečníky {#beginner-articles-and-books}

- [Začínáme s Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Použití Golang k připojení k Ethereu](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Nasazení chytrých kontraktů na Ethereu pomocí Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Podrobný průvodce testováním a nasazením chytrých kontraktů na Ethereu v Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Vývoj pro Ethereum s Go](https://goethereumbook.org/) – _Vyvíjejte aplikace pro Ethereum pomocí Go_

## Články a dokumentace pro středně pokročilé {#intermediate-articles-and-docs}

- [Dokumentace Go Ethereum](https://geth.ethereum.org/docs/) – _Dokumentace pro oficiální podporu jazyka Go v projektu Ethereum_
- [Programátorská příručka Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) – _Ilustrovaný průvodce včetně stavového stromu, multi-proofs a zpracování transakcí_
- [Erigon a bezestavové Ethereum](https://youtu.be/3-Mn7OckSus?t=394) – _Konference komunity Etherea 2020 (EthCC 3)_
- [Erigon: optimalizace klientů Etherea](https://www.youtube.com/watch?v=CSpc1vZQW2Q) – _Devcon 4 2018_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Vytvoření dapp v Go pomocí Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Práce se soukromou sítí Ethereum pomocí Golang a Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Unit testování kontraktů Solidity na Ethereu s Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Rychlá reference pro používání Geth jako knihovny](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Pokročilé vzory použití {#advanced-use-patterns}

- [Simulovaný backend GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Aplikace typu Blockchain jako služba využívající Ethereum a Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Distribuované úložiště IPFS a Swarm v blockchainových aplikacích Etherea](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Mobilní klienti: knihovny a Inproc uzly Ethereum](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Nativní dapps: Go bindings pro kontrakty Etherea](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go projekty a nástroje {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) – _Oficiální implementace protokolu Ethereum v Go_
- [Analýza kódu Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) – _Přehled a analýza zdrojového kódu Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) – _Rychlejší derivát Go Ethereum se zaměřením na archivní uzly_
- [Golem](https://github.com/golemfactory/golem) – _Golem vytváří globální trh s výpočetním výkonem_
- [Quorum](https://github.com/jpmorganchase/quorum) – _Implementace Etherea s kontrolou přístupu, která podporuje ochranu soukromí_
- [Prysm](https://github.com/prysmaticlabs/prysm) – _Implementace Etherea 'Serenity' 2.0 v Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) – _Decentralizovaný Twitter: Mikroblogovací služba běžící na blockchainu Etherea_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Implementace v Golang a rozšíření specifikace Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) – _Open-source těžební pool pro Ethereum_
- [Ethereum HD peněženka](https://github.com/miguelmota/go-ethereum-hdwallet) – _Odvození Ethereum HD peněženky v Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) – _Podpora pro mnoho druhů sítí Ethereum_
- [Geth lehký klient](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) – _Implementace Geth lehkého subprotokolu Etherea_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) – _Jednoduchá implementace peněženky Ethereum a utility v Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) – _Efektivní přístup k blockchainovým datům prostřednictvím Go SDK pro více než 200 blockchainů_

Hledáte další informační zdroje? Podívejte se na [ethereum.org/developers](/developers/)

## Přispěvatelé komunity Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gitter](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) – [kanál #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange – Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth lehký klient Gitter](https://gitter.im/ethereum/light-client)

## Další souhrnné seznamy {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Definitivní seznam vývojářských nástrojů pro Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Zdroj na GitHubu](https://github.com/ConsenSys/ethereum-developer-tools-list)
