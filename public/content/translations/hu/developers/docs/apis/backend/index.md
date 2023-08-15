---
title: Backend API könyvtárak
description: Bevezetés az Ethereum kliens API-okba, melyek lehetővé teszik, hogy interakcióba lépj a blokklánccal az alkalmazásodban.
lang: hu
---

Ahhoz, hogy egy szoftver alkalmazás interakcióba lépjen az Ethereum blokklánccal (vagyis képes legyen blokklánc adatok olvasására és/vagy tranzakció küldésre a hálózatra), rá kell csatlakoznia egy Ethereum csomópontra.

Erre a célra minden Ethereum kliens implementálja a JSON-RPC specifikációt, így egy egységes végpontkészlet áll rendelkezésre, amelyekre az alkalmazások támaszkodhatnak.

Ha egy bizonyos programnyelvet szeretnél használni, hogy csatlakozz egy Ethereum csomóponttal, akkor fejleszd ki a saját megoldásodat, de ugyanakkor számos kényelmes könyvtár létezik az ökoszisztémán belül, melyek megkönnyítik ezt. Ezekkel a könyvtárakkal a fejlesztők intuitív, egysoros metódusokat írhatnak, hogy kezdeményezzenek egy JSON RPC kérést (a háttérben), mely interakcióba lép az Ethereummal.

## Előfeltételek {#prerequisites}

Lehet, hogy érdemes megérteni az [Ethereum stacket](/developers/docs/ethereum-stack/) és az[Ethereum klienseket](/docs/nodes-and-clients/).

## Miért használj egy könyvtárat? {#why-use-a-library}

Ezek a könyvtárak elveszik a komplexitás nagy részét, mely Ethereum csomóponthoz történő közvetlen csatlakozással jár. Ezenkívül használati függvényeket is szolgáltatnak (pl.: ETH konvertálása Gwei-be), így fejlesztőként kevesebb időt kell az Ethereum kliensek bonyodalmaival foglalkoznod és több időd jut egyedi funkcionalitást kialakítani az alkalmazásodnak.

## Elérhető könyvtárak {#available-libraries}

**Alchemy -** **_Ethereum Fejlesztési Platform._**

- [alchemyapi.io](https://alchemyapi.io)
- [Dokumentáció](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.gg/kwqVnrA)

**BlockCypher -** **_Ethereum Web API-ok_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentáció](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_Az Ethereum API, mint szolgáltatás._**

- [infura.io](https://infura.io)
- [Dokumentáció](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_JSON-RPC API hozzáférés az Ethereum mainnet-hez és testnet-ekhez._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Dokumentáció](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Futtasd a saját Ethereum API szolgáltatásodat, mely támogatja az ETH-et és ETC-t is._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Elosztott és dedikált Ethereum csomópontok, mint szolgáltatás._**

- [chainstack.com](https://chainstack.com)
- [Dokumentáció](https://docs.chainstack.com)

**QuikNode -** **_Blokklánc fejlesztési platform._**

- [quiknode.io](https://quiknode.io)

**Python Tooling -** **_Különféle Ethereum library-k Python-nal való interakciókhoz_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j -** **_Egy Java/Android/Kotlin/Scala integráció library Ethereum-ra._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumentáció](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_Ethereum és Ethereum Classic API-ok mint szolgáltatás, melyet nyílt forráskódú szoftver működtet._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentáció](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Egy nyílt forráskódú .NET integrációs könyvtár blokkláncoknak._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentáció](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Állítsd be a Web3js, hogy JavaScriptben használd az Ethereum blokkláncot](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Intrukciók arról, hogyan állítsd be a web3.js-t a projektedben._
- [Okosszerződés hívása JavaScriptből](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– A DAI token használata, hogy lásd hogyan lehet szerződés függvényeket meghívni JavaScript használatával._
