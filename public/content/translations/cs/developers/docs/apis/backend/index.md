---
title: "Knihovny backendového API"
description: "Úvod do API klientů Etherea, které vám umožní komunikovat s blockchainem z vaší aplikace."
lang: cs
---

Aby mohla softwarová aplikace komunikovat s blockchainem [Etherea](/) (tj. číst data z blockchainu a/nebo odesílat transakce do sítě), musí se připojit k uzlu Etherea.

Za tímto účelem každý klient Etherea implementuje specifikaci [JSON-RPC](/developers/docs/apis/json-rpc/), takže existuje jednotná sada [metod](/developers/docs/apis/json-rpc/#json-rpc-methods), na které se aplikace mohou spolehnout.

Pokud chcete k připojení k uzlu Etherea použít konkrétní programovací jazyk, existuje v ekosystému mnoho užitečných knihoven, které to značně usnadňují. S těmito knihovnami mohou vývojáři psát intuitivní jednořádkové metody pro inicializaci požadavků JSON-RPC (na pozadí), které komunikují s Ethereem.

## Předpoklady {#prerequisites}

Může být užitečné porozumět [technologickému zásobníku Etherea](/developers/docs/ethereum-stack/) a [klientům Etherea](/developers/docs/nodes-and-clients/).

## Proč používat knihovnu? {#why-use-a-library}

Tyto knihovny abstrahují velkou část složitosti přímé komunikace s uzlem Etherea. Poskytují také užitečné funkce (např. převod ETH na Gwei), takže jako vývojář můžete strávit méně času řešením složitostí klientů Etherea a více času se soustředit na jedinečnou funkcionalitu vaší aplikace.

## Dostupné knihovny {#available-libraries}

### Infrastruktura a služby uzlů {#infrastructure-and-node-services}

**Alchemy -** **_Vývojová platforma pro Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentace](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Uzel jako služba (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Dokumentace](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast od Bware Labs -** **_Decentralizovaná API pro Ethereum Mainnet a testovací sítě._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentace](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Poskytuje efektivnější a rychlejší služby RPC_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentace](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Prohlížeč bloků a API pro transakce**
- [Dokumentace](https://docs.etherscan.io/)

**Blockscout - Open source prohlížeč bloků**
- [Dokumentace](https://docs.blockscout.com/)

**GetBlock -** **_Blockchain jako služba pro vývoj ve Web3_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentace](https://docs.getblock.io/)

**Infura -** **_API Etherea jako služba._**

- [infura.io](https://infura.io)
- [Dokumentace](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Cenově dostupný poskytovatel EVM JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Dokumentace](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Plné uzly a prohlížeče bloků._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentace](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Blockchainová infrastruktura jako služba._**

- [quicknode.com](https://quicknode.com)
- [Dokumentace](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API pro Ethereum a Ethereum Classic jako služba poháněná open source softwarem._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentace](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Rychlostně orientované uzly Etherea jako API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentace](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Vývojové nástroje {#development-tools}

**ethers-kt -** **_Asynchronní, vysoce výkonná knihovna v Kotlin/Java/Android pro blockchainy založené na EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Příklady](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Open source integrační knihovna .NET pro blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentace](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Nástroje pro Python -** **_Různé knihovny pro interakci s Ethereem pomocí Pythonu._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Ultimátní platforma pro vývoj na blockchainu._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentace](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_Integrační knihovna v Java/Android/Kotlin/Scala pro Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumentace](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blockchainové služby {#blockchain-services}

**BlockCypher -** **_Webová API pro Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentace](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Komplexní datová infrastruktura Web3 pro Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentace](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Elastické a dedikované uzly Etherea jako služba._**

- [chainstack.com](https://chainstack.com)
- [Dokumentace](https://docs.chainstack.com/)
- [Reference API Etherea](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API pro blockchainovou infrastrukturu._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Dokumentace](https://docs.cdp.coinbase.com/)

**DataHub od Figment -** **_Služby API Web3 s Ethereum Mainnet a testovacími sítěmi._**

- [DataHub](https://www.figment.io/)
- [Dokumentace](https://docs.figment.io/)

**Moralis -** **_Poskytovatel podnikového EVM API._**

- [moralis.io](https://moralis.io)
- [Dokumentace](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Fórum](https://forum.moralis.io/)

**NFTPort -** **_API pro data a ražení na Ethereu._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentace](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Obecná platforma pro multi-krypto blockchainová API._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentace](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Poskytuje jednoduchý a spolehlivý přístup k API blockchainu Etherea._**

- [Watchdata](https://watchdata.io/)
- [Dokumentace](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_Obohacené API pro blockchainová data v reálném čase napříč desítkami sítí._**

- [codex.io](https://www.codex.io/)
- [Dokumentace](https://docs.codex.io)
- [Prohlížeč](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_Obohacená blockchainová API pro více než 200 sítí._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokumentace](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Vývojové frameworky](/developers/docs/frameworks/)

## Související návody {#related-tutorials}

- [Nastavení Web3.js pro použití blockchainu Etherea v JavaScriptu](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Pokyny pro nastavení Web3.js ve vašem projektu._
- [Volání chytrého kontraktu z JavaScriptu](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Podívejte se, jak pomocí tokenu DAI volat funkce kontraktů pomocí JavaScriptu._