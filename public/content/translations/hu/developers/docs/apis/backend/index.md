---
title: Backend API könyvtárak
description: Bevezetés az Ethereum kliens API-okba, melyek lehetővé teszik, hogy interakcióba lépj a blokklánccal az alkalmazásodban.
lang: hu
---

Ahhoz, hogy egy szoftver alkalmazás interakcióba lépjen az Ethereum blokklánccal (vagyis képes legyen blokklánc adatok olvasására és/vagy tranzakció küldésre a hálózatra), rá kell csatlakoznia egy Ethereum csomópontra.

Erre a célra minden Ethereum-kliens implementálja a [JSON-RPC](/developers/docs/apis/json-rpc/) specifikációt, így egységes [módszerek](/developers/docs/apis/json-rpc/#json-rpc-methods) állnak rendelkezésre, amelyekre az alkalmazások támaszkodhatnak.

Ha egy bizonyos programnyelvet szeretnél használni, hogy csatlakozz egy Ethereum csomóponttal, akkor fejleszd ki a saját megoldásodat, de ugyanakkor számos kényelmes könyvtár létezik az ökoszisztémán belül, melyek megkönnyítik ezt. Ezekkel a könyvtárakkal a fejlesztők intuitív, egysoros metódusokat írhatnak, hogy kezdeményezzenek egy JSON RPC kérést (a háttérben), mely interakcióba lép az Ethereummal.

## Előfeltételek {#prerequisites}

Érdemes lehet előbb alaposan megismerni az [Ethereum stacket](/developers/docs/ethereum-stack/) és az [Ethereum-klienseket](/developers/docs/nodes-and-clients/).

## Miért használj egy könyvtárat? {#why-use-a-library}

Ezek a könyvtárak elveszik a komplexitás nagy részét, mely Ethereum csomóponthoz történő közvetlen csatlakozással jár. Ezenkívül használati függvényeket is szolgáltatnak (pl.: ETH konvertálása Gwei-be), így fejlesztőként kevesebb időt kell az Ethereum kliensek bonyodalmaival foglalkoznod és több időd jut egyedi funkcionalitást kialakítani az alkalmazásodnak.

## Elérhető könyvtárak {#available-libraries}

**Alchemy -** **_Ethereum Fejlesztési Platform._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentáció](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_Ethereum Web API-k._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentáció](https://www.blockcypher.com/dev/ethereum/)

**Blast by Bware Labs -** **_Decentralizált API-k az Ethereum főhálózatra és teszthálózatokra._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentáció](https://docs.blastapi.io)
- [Discord](https://discord.com/invite/VPkWESgtvV)

**Infura -** **_Az Ethereum API, mint szolgáltatás._**

- [infura.io](https://infura.io)
- [Dokumentáció](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Coinbase Cloud Node -** **_Blokklánc-infrastruktúra API._**

- [Coinbase Cloud Node](https://www.coinbase.com/cloud/products/node)
- [Dokumentáció](https://docs.cloud.coinbase.com/node/reference/welcome-to-node)

**DataHub by Figment -** **_Web3 API szolgáltatások az Ethereum főhálózattal és teszthálózatokkal._**

- [DataHub](https://www.figment.io/datahub)
- [Dokumentáció](https://docs.figment.io/introduction/what-is-datahub)

**NFTPort -** **_Ethereum-adatok és Mint API-k._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentáció](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Nodesmith -** **_JSON-RPC API-hozzáférés az Ethereum főhálózathoz és teszthálózatokhoz._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Dokumentáció](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Futtasson saját, ETH-et és ETC-t is támogató Ethereum API szolgáltatásokat._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Osztott és dedikált Ethereum-csomópontok mint szolgáltatás._**

- [chainstack.com](https://chainstack.com)
- [Dokumentáció](https://docs.chainstack.com)
- [Ethereum API reference](https://docs.chainstack.com/api/ethereum/ethereum-api-reference)

**QuickNode -** **_Blokklánc-infrastruktúra mint szolgáltatás._**

- [quicknode.com](https://quicknode.com)
- [Dokumentáció](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Python Tooling -** **_Különféle Ethereum-könyvtárak Python-nal való interakciókhoz_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j -** **_Java/Android/Kotlin/Scala integrációs könyvtár Ethereumra._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumentáció](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_Ethereum és Ethereum Classic API-k mint szolgáltatás, amelyeket nyílt forráskódú szoftver működtet._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentáció](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_Egy nyílt forráskódú .NET integrációs könyvtár blokkláncoknak._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentáció](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Tatum -** **_A végső blokklánc-fejlesztési platform._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentáció](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata -** **_Egyszerű és megbízható API-hozzáférés az Ethereum-blokklánchoz._**

- [Watchdata](https://watchdata.io/)
- [Dokumentáció](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok -** **_Sebességorientált Ethereum-csomópontok mint JSON-RPC/WebSockets API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentáció](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

**NOWNodes – _Teljes csomópontok és blokkfelfedezők._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentáció](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**Moralis -** **_Vállalati szintű EVM API-szolgáltató._**

- [moralis.io](http://moralis.io)
- [Dokumentáció](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://discord.com/invite/KYswaxwEtg)
- [Fórum](https://forum.moralis.io/)

**Chainbase -** **_Teljes web3-adatinfrastruktúra az Ethereumra._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentáció](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**GetBlock-** **_Blokklánc mint szolgáltatás a Web3 fejlesztéshez_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentáció](https://getblock.io/docs/)

**BlockPi -** **_Hatékonyabb és gyorsabb RPC-szolgáltatások_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentáció](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Tokenview -** **_Az általános multikripto blokklánc API-k platformja._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentáció](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [ Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Web3js beállítása az Ethereum-blokklánc használatához JavaScriptben](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Útmutató a web3.js projektben való beállításához.._
- [Okosszerződés hívása JavaScriptből](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– A DAI token használatával tekintse meg, hogyan hívhat be szerződéseket a JavaScript segítségével._
