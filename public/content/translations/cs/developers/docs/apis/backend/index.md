---
title: Backend API knihovny
description: "Úvod do klientských rozhraní API Etherea, která umožňují interakci s blockchainem z vaší aplikace."
lang: cs
---

Aby mohla softwarová aplikace komunikovat s ethereovým blockchainem (tj. číst data z blockchainu a/nebo posílat transakce do sítě), musí se připojit k ethereovému uzlu.

Za tímto účelem implementuje každý ethereový klient specifikaci [JSON-RPC](/developers/docs/apis/json-rpc/), takže existuje jednotná sada [metod](/developers/docs/apis/json-rpc/#json-rpc-methods), na které se aplikace mohou spolehnout.

Pokud chcete pro připojení k síťovému uzlu na Ethereu použít konkrétní programovací jazyk, vytvořte si vlastní řešení, ale v rámci ekosystému existuje několik užitečných knihoven, které vám to značně usnadní. Pomocí těchto knihoven mohou vývojáři psát intuitivní jednořádkové metody pro inicializaci JSON-RPC požadavků, které komunikují s Ethereem.

## Předpoklady {#prerequisites}

Mohlo by být užitečné porozumět [ethereovému stacku](/developers/docs/ethereum-stack/) a [ethereovým klientům](/developers/docs/nodes-and-clients/).

## Proč používat knihovnu? {#why-use-a-library}

Knihovny snižují složitost přímé interakce se síťovým uzlem Etherea. Poskytují také užitečné funkce (např. převod ETH na Gwei), takže jako vývojář můžete strávit méně času řešením složitostí ethereových klientů a více času se věnovat jedinečným funkcím své aplikace.

## Dostupné knihovny {#available-libraries}

### Infrastruktura a služby uzlů {#infrastructure-and-node-services}

**Alchemy –** **_Vývojářská platforma pro Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentace](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node –** **_Uzel jako služba._**

- [All That Node.com](https://www.allthatnode.com/)
- [Dokumentace](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast od Bware Labs –** **_Decentralizovaná API pro Ethereum Mainnet a testovací sítě._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentace](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi –** **_Poskytování efektivnějších a rychlejších služeb RPC_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentace](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Brána Cloudflare pro Ethereum.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Průzkumník bloků a APIs transakcí**

- [Dokumentace](https://docs.etherscan.io/)

**Blockscout – open-source prohlížeč bloků**

- [Dokumentace](https://docs.blockscout.com/)

**GetBlock –** **_Blockchain jako služba pro vývoj Web3_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentace](https://docs.getblock.io/)

**Infura –** **_Ethereum API jako služba._**

- [infura.io](https://infura.io)
- [Dokumentace](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC – _Nákladově efektivní poskytovatel EVM JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Dokumentace](https://docs.noderpc.xyz/node-rpc)

**NOWNodes –** **_Plnohodnotné uzly a prohlížeče bloků._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentace](https://nownodes.gitbook.io/documentation)

**QuickNode –** **_Blockchainová infrastruktura jako služba._**

- [quicknode.com](https://quicknode.com)
- [Dokumentace](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet –** **_API pro Ethereum a Ethereum Classic jako služba postavená na open-source softwaru._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentace](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok –** **_Ethereové uzly zaměřené na rychlost jako JSON-RPC/WebSockets API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentace](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Vývojářské nástroje {#development-tools}

**ethers-kt –** **_Asynchronní, vysoce výkonná knihovna pro Kotlin/Javu/Android pro blockchainy založené na EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Příklady](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum –** **_Open-source .NET integrační knihovna pro blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentace](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Nástroje pro Python –** **_Různé knihovny pro interakci s Ethereem přes Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum –** **_Špičková vývojářská platforma pro blockchain._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentace](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j –** **_Integrační knihovna pro Javu, Android, Kotlin a Scalu pro Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumentace](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blockchainové služby {#blockchain-services}

**BlockCypher –** **_Webová API pro Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentace](https://www.blockcypher.com/dev/ethereum/)

**Chainbase –** **_Komplexní datová infrastruktura web3 pro Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentace](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack –** **_Elastické a dedikované ethereové uzly jako služba._**

- [chainstack.com](https://chainstack.com)
- [Dokumentace](https://docs.chainstack.com/)
- [Referenční příručka API pro Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node –** **_API pro infrastrukturu blockchainu._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Dokumentace](https://docs.cdp.coinbase.com/)

**DataHub od Figmentu –** **_Služby API Web3 s Ethereum Mainnetem a testovacími sítěmi._**

- [DataHub](https://www.figment.io/)
- [Dokumentace](https://docs.figment.io/)

**Moralis –** **_Poskytovatel EVM API na podnikové úrovni._**

- [moralis.io](https://moralis.io)
- [Dokumentace](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Fórum](https://forum.moralis.io/)

**NFTPort –** **_Datová a mintovací API na Ethereu._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentace](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview –** **_Univerzální blockchainová platforma API pro více kryptoměn._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentace](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata –** **_Poskytuje jednoduchý a spolehlivý přístup přes API k blockchainu Etherea._**

- [Watchdata](https://watchdata.io/)
- [Dokumentace](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent –** **_Obohacená blockchainová API pro více než 200 blockchainů._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokumentace](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Vývojářské frameworky](/developers/docs/frameworks/)

## Související návody {#related-tutorials}

- [Nastavení Web3.js pro použití ethereového blockchainu v JavaScriptu](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Návod na nastavení web3.js ve vašem projektu._
- [Volání chytrých kontraktů z JavaScriptu](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Podívejte se, jak pomocí tokenu DAI volat funkce kontraktů v JavaScriptu._
