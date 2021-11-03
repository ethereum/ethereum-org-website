---
title: Ethereum Go fejlesztőknek
description: Tanulj meg Ethereumra fejleszteni Go-alapú projektek és eszközök használatával
lang: hu
sidebar: true
sidebarDepth: 1
---

# Ethereum Go fejlesztőknek {#ethereum-for-go-devs}

<div class="featured">Tanulj meg Ethereumra fejleszteni Go-alapú projektek és eszközök használatával</div>

Használj Ethereumot decentralizált alkalmazások (vagy "dappok") fejlesztésére, melyek kihasználják a kriptovaluta és a blokklánc technológia nyújtotta előnyöket. Ezek az appok megbízhatóak, ami azt jelenti, hogyha egyszer telepítették az Ethereumba, akkor mindig úgy fognak futni, ahogy programozták őket. Digitális vagyontárgyakat irányíthatnak, lehetőséget teremtve ezzel újfajta pénzügyi alkalmazások létrejöveteléhez. Decentralizáltak lehetnek, mely azt jelenti, hogy semmilyen entitás vagy személy nem irányítja őket és közel lehetetlen őket cenzúrázni.

<img src="https://i.imgur.com/MFg8Nop.png" width="100%" />

## Első lépések az okos szerződésekhez és a Solidity nyelvhez {#getting-started-with-smart-contracts-and-solidity}

**Tedd meg az első lépést, hogy integráld a Go-t Ethereummal**

Szűkséged van egy még kezdetlegesebb alapozóra? Tekintsd meg a [ethereum.org/learn](/hu/learn/) oldalt vagy a [ethereum.org/developers](/hu/developers/) oldalt.

- [Blokklánc ismertetése](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Okos Szerződések értelmezése](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Írd meg az első okos szerződésed](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tanuld meg hogyan kell Solidity-t fordítani és telepíteni](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Szerződés útmutató](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Cikkek és könyvek kezdőknek {#beginner-articles-and-books}

- [Ethereum kliens kiválasztása](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [Kezdő lépések Geth-tel](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Goland használata Ethereumra való kapcsolódásra](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Ethereum okos szerződések telepítése Golang használatával](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Egy útmutató, arról, hogy hogyan kell Ethereum okos szerződéseket tesztelni és telepíteni lépésről lépésre](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Ethereum Development with Go](https://goethereumbook.org/) - _Ethereum alkalmazások fejlesztése Go-val_

## Haladó cikkek és dokumentációk {#intermediate-articles-and-docs}

- [Go Ethereum Documentation](https://geth.ethereum.org/docs/) - _A hivatalos Ethereum Golang dokumentáció_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Egy dapp készítése Go-ban Geth-tel](https://kauri.io/article/60a36c1b17d645939f63415218dc24f9/creating-a-dapp-in-go-with-geth)
- [Dolgozz egy Ethereum Privát Hálózaton Golang-gel és Geth-tel](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Unit testing Solidity contracts on Ethereum with Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)

## Fejlett használati minták {#advanced-use-patterns}

- [The GETH Simulated Backend](https://kauri.io/article/6285c9692883411aa041b6b970405a17/v1/the-geth-simulated-backend)
- [Blockchain-as-a-Service appok Ethereum és Quorum használatával](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Elosztott tárhely IPDS és Swarm Ethereum blokklánc alkalmazásokban](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Mobile Clients: Library-k és Inproc Ethereum csomópontok](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Native DApps: Go megkötések Ethereum szerződésekre](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go projektek és eszközök {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Az Ethereum protokoll hivatalos Go implementációja_
- [Go Ethereum Code Analysis](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum forráskód áttekintése és elemzése_
- [Golem](https://github.com/golemfactory/golem) - _A Golem egy globális piacot teremt a számítási erő számára_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Egy engedélyköteles Ethereum implementáció, mely támogatja az adatvédelmet_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Ethereum 'Serenity' 2.0 Go implementáció_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Decentralizált Twitter: Egy microblogging szolgáltatás, mely az Ethereum blokkláncon fut_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _A Minimum Viable Plasma specifikációjának Golang implementációja és kiterjesztése_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Egy nyílt forráskódú Ethereum bányász pool_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _Ethereum HD Wallet levezetések Go-ban_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Az Ethereum hálózatok több fajtáját támogatja_
- [Geth Light Client](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Light Ethereum Subprotocol Geth implementációja_

Még több anyagot keresel? Tekintsd meg a [ethereum.org/developers](/hu/developers/) oldalt

## Go közösségi hozzájárulók {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://https:/gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth light Client Gitter](https://gitter.im/ethereum/light-client)

## Egyéb összesített lista {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: A Definitive List of Ethereum Developer Tools](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub source](https://github.com/ConsenSys/ethereum-developer-tools-list)
