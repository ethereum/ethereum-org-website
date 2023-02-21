---
title: Ethereum Go fejlesztőknek
description: Tanulj meg Ethereumra fejleszteni Go-alapú projektek és eszközök használatával
lang: hu
incomplete: true
---

<div class="featured">Tanulj meg Ethereumra fejleszteni Go-alapú projektek és eszközök használatával</div>

Használd az Ethereumot decentraizált alkalmazások (avagy "dappok") fejlesztésére. Ezek a dappok megbízhatóak, ami azt jelenti, hogyha egyszer telepítették az Ethereumba, akkor mindig úgy fognak futni, ahogy programozták őket. Decentralizáltak, ami azt jelenti, hogy egy peer-to-peer hálózaton futnak és nincs lehetőség egyetlen hiba miatti leállásra (single point of failure). Nincs olyan entitás vagy személy, ami irányítaná őket és szinte lehetetlen őket cenzúrázni. Digitális eszközöket irányíthatnak, lehetőséget teremtve ezzel újfajta alkalmazások létrejöveteléhez.

## Első lépések az Okosszerződésekkel és a Solidity nyelvvel {#getting-started-with-smart-contracts-and-solidity}

**Tedd meg az első lépést, hogy integráld a Go-t Ethereummal**

Szükséged van egy méginkább kezdőknek szóló alapozóra? Tekintsd meg az [ethereum.org/learn](/learn/) oldalt vagy a [ethereum.org/developers](/developers/) oldalt.

- [Blokklánc ismertetése](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Okosszerződések értelmezése](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Írd meg az első Okosszerződésed](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tanuld meg a Solidity fordítását és telepítését](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Szerződés útmutató](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Cikkek és könyvek kezdőknek {#beginner-articles-and-books}

- [Ethereum kliens kiválasztása](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [Kezdő lépések Geth-tel](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golang használata Ethereumra való kapcsolódásra](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Ethereum okosszerződések telepítése Golang használatával](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Egy útmutató, arról, hogy hogyan kell Ethereum okosszerződéseket tesztelni és telepíteni lépésről lépésre](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Ethereum Development with Go](https://goethereumbook.org/) - _Ethereum alkalmazások fejlesztése Go-val_

## Haladó cikkek és dokumentációk {#intermediate-articles-and-docs}

- [Go Ethereum Documentation](https://geth.ethereum.org/docs/) - _A hivatalos Ethereum Golang dokumentáció_
- [Erigon Programmer's Guide](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Illusztrált útmutató, mely bemutatja az állapot fát, többszöri bizonyítékokat és a tranzakció feldolgozást_
- [Erigon és az állapot nélküli Ethereum](https://youtu.be/3-Mn7OckSus?t=394) - _2020 Ethereum Közösségi Konferenica (EthCC 3)_
- [Erigon: Ethereum kliensek optimalizálása](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Egy dapp készítése Go-ban Geth-tel](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Munka Ethereum Privát Hálózaton Golang-gel és Geth-tel](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Solidity szerződések unit test-je Ethereumon Go-val](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Gyors referencia a Geth könyvtárként való használatára](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Fejlett használati minták {#advanced-use-patterns}

- [A GETH szimulált Backend](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Blockchain-as-a-Service appok Ethereum és Quorum használatával](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Elosztott tárhely IPDS és Swarm Ethereum blokklánc alkalmazásokban](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Mobile Clients: Library-k és Inproc Ethereum csomópontok](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Native DApps: Go megkötések Ethereum szerződésekre](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go projektek és eszközök {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Az Ethereum protokoll hivatalos Go implementációja_
- [Go Ethereum Code Analysis](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum forráskód áttekintése és elemzése_
- [Erigon](https://github.com/ledgerwatch/erigon) - _A Go Ethereum gyorsabb származéka_
- [Golem](https://github.com/golemfactory/golem) - _A Golem egy globális piacot teremt a számítási teljesítmény számára_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Egy engedélyköteles Ethereum implementáció, mely támogatja az adatvédelmet_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Ethereum 'Serenity' 2.0 Go implementáció_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Decentralizált Twitter: Egy microblogging szolgáltatás, mely az Ethereum blokkláncon fut_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _A Minimum Viable Plasma specifikációjának Golang implementációja és kiterjesztése_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Egy nyílt forráskódú Ethereum bányász pool_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _Ethereum HD Wallet levezetések Go-ban_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Az Ethereum hálózatok több fajtáját támogatja_
- [Geth Light Client](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Light Ethereum Subprotocol Geth implementációja_

Még több anyagot keresel? Tekintsd meg az [ethereum.org/developers](/developers/) oldalt

## Go közösségi hozzájárulók {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth light Client Gitter](https://gitter.im/ethereum/light-client)

## Egyéb összesített lista {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: A Definitive List of Ethereum Developer Tools](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub source](https://github.com/ConsenSys/ethereum-developer-tools-list)
