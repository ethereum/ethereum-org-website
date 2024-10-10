---
title: Backend API könyvtárak
description: Bevezetés az Ethereum kliens API-okba, melyek lehetővé teszik, hogy interakcióba lépj a blokklánccal az alkalmazásodban.
lang: hu
---

Ahhoz, hogy egy szoftver alkalmazás interakcióba lépjen az Ethereum blokklánccal (vagyis képes legyen blokklánc adatok olvasására és/vagy tranzakció küldésre a hálózatra), rá kell csatlakoznia egy Ethereum csomópontra.

Erre a célra minden Ethereum-kliens implementálja a [JSON-RPC](/developers/docs/apis/json-rpc/) specifikációt, így egységes [metódusok](/developers/docs/apis/json-rpc/#json-rpc-methods) állnak rendelkezésre, amelyekre az alkalmazások támaszkodhatnak.

Ha egy bizonyos programnyelvet szeretne használni, hogy kapcsolódjon egy Ethereum csomóponttal, akkor számos könyvtár létezik az ökoszisztémán belül, melyek megkönnyítik ezt. Ezekkel a könyvtárakkal a fejlesztők intuitív, egysoros metódusokat írhatnak, hogy kezdeményezzenek egy JSON RPC kérést (a háttérben), mely interakcióba lép az Ethereummal.

## Előfeltételek {#prerequisites}

Érdemes lehet előbb alaposan megismerni az [Ethereum stacket](/developers/docs/ethereum-stack/) és az [Ethereum-klienseket](/developers/docs/nodes-and-clients/).

## Miért használj egy könyvtárat? {#why-use-a-library}

Ezek a könyvtárak elveszik a komplexitás nagy részét, mely Ethereum csomóponthoz történő közvetlen csatlakozással jár. Ezenkívül használati függvényeket is szolgáltatnak (pl.: ETH konvertálása Gwei-be), így fejlesztőként kevesebb időt kell az Ethereum kliensek bonyodalmaival foglalkoznod és több időd jut egyedi funkcionalitást kialakítani az alkalmazásodnak.

## Elérhető könyvtárak {#available-libraries}

### Infrastruktúra és csomóponti szolgáltatások {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum Fejlesztési Platform._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentáció](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Csomópont mint szolgáltatás._**

- [All That Node.com](https://www.allthatnode.com/)
- [Dokumentáció](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_Decentralizált API-k az Ethereum főhálózatra és teszthálózatokra._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentáció](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_Hatékonyabb és gyorsabb RPC-szolgáltatások_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentáció](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Blokkfelfedező és tranzakciós API-ok**
- [Dokumentáció](https://docs.etherscan.io/)

**GetBlock-** **_Blokklánc mint szolgáltatás a Web3 fejlesztéshez_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentáció](https://getblock.io/docs/)

**Infura -** **_Az Ethereum API, mint szolgáltatás._**

- [infura.io](https://infura.io)
- [Dokumentáció](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Költséghatékony EVM JSON-RPC szolgáltató_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Dokumentáció](https://docs.noderpc.xyz/node-rpc)

**NOWNodes – _Teljes csomópontok és blokkfelfedezők._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentáció](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_Blokklánc-infrastruktúra mint szolgáltatás._**

- [quicknode.com](https://quicknode.com)
- [Dokumentáció](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Ethereum és Ethereum Classic API-k mint szolgáltatás, amelyeket nyílt forráskódú szoftver működtet._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentáció](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Sebességorientált Ethereum-csomópontok mint JSON-RPC/WebSockets API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentáció](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Fejlesztőeszközök {#development-tools}

**ethers-kt –** **_Async, nagy teljesítményű Kotlin/Java/Android könyvtár EVM-alapú blokkláncokhoz._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Példák](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Egy nyílt forráskódú .NET integrációs könyvtár blokkláncoknak._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentáció](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Különféle Ethereum-könyvtárak Python-nal való interakciókhoz_**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_A végső blokklánc-fejlesztési platform._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentáció](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Java/Android/Kotlin/Scala integrációs könyvtár Ethereumra._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumentáció](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blockchain-szolgáltatások {#blockchain-services}

**BlockCypher -** **_Ethereum Web API-k._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentáció](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Teljes web3-adatinfrastruktúra az Ethereumra._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentáció](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Osztott és dedikált Ethereum-csomópontok mint szolgáltatás._**

- [chainstack.com](https://chainstack.com)
- [Dokumentáció](https://docs.chainbase.com/docs)
- [Ethereum API reference](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_Blokklánc-infrastruktúra API._**

- [Coinbase Cloud Node](https://www.coinbase.com/cloud)
- [Dokumentáció](https://docs.cloud.coinbase.com/)

**DataHub by Figment -** **_Web3 API szolgáltatások az Ethereum főhálózattal és teszthálózatokkal._**

- [DataHub](https://www.figment.io/)
- [Dokumentáció](https://docs.figment.io/)

**Moralis -** **_Vállalati szintű EVM API-szolgáltató._**

- [moralis.io](https://moralis.io)
- [Dokumentáció](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Fórum](https://forum.moralis.io/)

**NFTPort -** **_Ethereum-adatok és Mint API-k._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentáció](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Az általános multikripto blokklánc API-k platformja._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentáció](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Egyszerű és megbízható API-hozzáférés az Ethereum-blokklánchoz._**

- [Watchdata](https://watchdata.io/)
- [Dokumentáció](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent –** **_Gazdagított blokklánc API-ok 200+ lánchoz._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokumentáció](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [ Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Web3js beállítása az Ethereum-blokklánc használatához JavaScriptben](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Útmutató a web3.js projektben való beállításához.._
- [Okosszerződés hívása JavaScriptből](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– A DAI token használatával tekintse meg, hogyan hívhat be szerződéseket a JavaScript segítségével._
