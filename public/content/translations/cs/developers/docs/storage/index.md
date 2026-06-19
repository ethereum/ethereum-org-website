---
title: "Decentralizované úložiště"
description: "Přehled toho, co je decentralizované úložiště, a dostupných nástrojů pro jeho integraci do decentralizované aplikace (dapp)."
lang: cs
authors: ["Patrick Collins"]
---

Na rozdíl od centralizovaného serveru provozovaného jedinou společností nebo organizací se systémy decentralizovaného úložiště skládají z peer-to-peer sítě uživatelů-provozovatelů, kteří uchovávají část celkových dat, čímž vytvářejí odolný systém pro sdílení a ukládání souborů. Ty mohou být součástí aplikace založené na blockchainu nebo jakékoli sítě založené na peer-to-peer.

Samotné Ethereum lze použít jako systém decentralizovaného úložiště, a také jím je, pokud jde o ukládání kódu ve všech chytrých kontraktech. Pokud však jde o velké objemy dat, k tomu Ethereum nebylo navrženo. Řetězec neustále roste, ale v době psaní tohoto textu má řetězec Etherea přibližně 500 GB – 1 TB ([v závislosti na klientovi](https://etherscan.io/chartsync/chaindefault)) a každý uzel v síti musí být schopen uložit všechna data. Pokud by se řetězec rozšířil na velké objemy dat (řekněme 5 TB), nebylo by pro všechny uzly proveditelné nadále fungovat. Navíc by náklady na nasazení takového množství dat na Mainnet byly kvůli poplatkům za [gas](/developers/docs/gas) neúnosně vysoké.

Kvůli těmto omezením potřebujeme jiný řetězec nebo metodiku pro ukládání velkého množství dat decentralizovaným způsobem.

Při zvažování možností decentralizovaného úložiště (dStorage) je několik věcí, které musí mít uživatel na paměti.

- Mechanismus perzistence / struktura pobídek
- Vynucování uchovávání dat
- Míra decentralizace
- Konsensus

## Mechanismus perzistence / struktura pobídek {#persistence-mechanism}

### Založené na blockchainu {#blockchain-based}

Aby data přetrvala navždy, musíme použít mechanismus perzistence. Například na Ethereu spočívá mechanismus perzistence v tom, že při provozování uzlu je třeba brát v úvahu celý řetězec. Nová data se připojují na konec řetězce a ten neustále roste – což vyžaduje, aby každý uzel replikoval všechna vložená data.

To je známé jako perzistence **založená na blockchainu**.

Problém s perzistencí založenou na blockchainu spočívá v tom, že by se řetězec mohl stát příliš velkým na to, aby bylo možné jej udržovat a reálně ukládat všechna data (např. [mnoho zdrojů](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) odhaduje, že internet vyžaduje úložnou kapacitu přes 40 zettabytů).

Blockchain musí mít také nějaký typ struktury pobídek. U perzistence založené na blockchainu se provádí platba validátorovi. Když jsou data přidána do řetězce, validátoři dostanou zaplaceno za jejich přidání.

Platformy s perzistencí založenou na blockchainu:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Založené na kontraktech {#contract-based}

Perzistence **založená na kontraktech** vychází z předpokladu, že data nemohou být replikována každým uzlem a ukládána navždy, a místo toho musí být udržována pomocí smluvních dohod (kontraktů). Jedná se o dohody uzavřené s více uzly, které slíbily uchovávat určitá data po určitou dobu. Aby data zůstala zachována, musí být tyto dohody po vypršení platnosti obnoveny nebo znovu zaplaceny.

Ve většině případů se místo ukládání všech dat onchain ukládá hash umístění dat v řetězci. Tímto způsobem se celý řetězec nemusí škálovat, aby pojal všechna data.

Platformy s perzistencí založenou na kontraktech:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Další úvahy {#additional-consideration}

IPFS je distribuovaný systém pro ukládání a přístup k souborům, webovým stránkám, aplikacím a datům. Nemá vestavěné schéma pobídek, ale pro dlouhodobější perzistenci jej lze použít s jakýmkoli z výše uvedených řešení pobídek založených na kontraktech. Dalším způsobem, jak zachovat data na IPFS, je spolupráce se službou pro připínání (pinning service), která vaše data „připne“ za vás. Můžete dokonce provozovat svůj vlastní uzel IPFS a přispívat do sítě k bezplatnému uchovávání vašich a/nebo cizích dat!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(služba pro připínání IPFS)_
- [web3.storage](https://web3.storage/) _(služba pro připínání IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(služba pro připínání IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(průzkumník připínání IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（služba pro připínání IPFS）_
- [Filebase](https://filebase.com) _(služba pro připínání IPFS)_
- [Spheron Network](https://spheron.network/) _(služba pro připínání IPFS/Filecoin)_

Swarm je technologie pro decentralizované ukládání a distribuci dat se systémem pobídek pro ukládání a orákulem pro ceny pronájmu úložiště.

## Uchovávání dat {#data-retention}

Aby bylo možné data uchovat, musí mít systémy nějaký mechanismus, který zajistí, že data budou skutečně uchována.

### Mechanismus výzev {#challenge-mechanism}

Jedním z nejpopulárnějších způsobů, jak zajistit uchování dat, je použití nějakého typu kryptografické výzvy, která je vydána uzlům, aby se ověřilo, že data stále mají. Jednoduchým příkladem je důkaz o přístupu (proof-of-access) sítě Arweave. Vydávají uzlům výzvu, aby zjistili, zda mají data jak v nejnovějším bloku, tak v náhodném bloku v minulosti. Pokud uzel nedokáže přijít s odpovědí, je penalizován.

Typy decentralizovaného úložiště (dStorage) s mechanismem výzev:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Míra decentralizace {#decentrality}

Neexistují skvělé nástroje pro měření úrovně decentralizace platforem, ale obecně budete chtít používat nástroje, které nemají nějakou formu KYC, což poskytuje důkaz, že nejsou centralizované.

Decentralizované nástroje bez KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Konsensus {#consensus}

Většina z těchto nástrojů má svou vlastní verzi [mechanismu konsensu](/developers/docs/consensus-mechanisms/), ale obecně jsou založeny buď na [**důkazu prací (PoW)**](/developers/docs/consensus-mechanisms/pow/) nebo [**důkazu podílem (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Založené na důkazu prací (PoW):

- Skynet
- Arweave

Založené na důkazu podílem (PoS):

- Ethereum
- Filecoin
- Züs
- Crust Network

## Související nástroje {#related-tools}

**IPFS – _InterPlanetary File System je systém pro decentralizované úložiště a odkazování na soubory pro Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentace](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS – _Bezpečné, soukromé a s S3 kompatibilní decentralizované cloudové objektové úložiště pro vývojáře._**

- [Storj.io](https://storj.io/)
- [Dokumentace](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia – _Využívá kryptografii k vytvoření tržiště cloudového úložiště nevyžadujícího důvěru, což umožňuje kupujícím a prodávajícím provádět transakce přímo._**

- [Skynet.net](https://sia.tech/)
- [Dokumentace](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin – _Filecoin byl vytvořen stejným týmem, který stojí za IPFS. Jedná se o vrstvu pobídek nad ideály IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentace](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave – _Arweave je platforma dStorage pro ukládání dat._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentace](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs – _Züs je platforma dStorage založená na důkazu podílem (PoS) se shardingem a blobbery._**

- [zus.network](https://zus.network/)
- [Dokumentace](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network – _Crust je platforma dStorage postavená na IPFS._**

- [Crust.network](https://crust.network)
- [Dokumentace](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm – _Distribuovaná platforma pro ukládání a služba pro distribuci obsahu pro Web3 stack Etherea._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentace](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB – _Decentralizovaná peer-to-peer databáze postavená na IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentace](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im – _Decentralizovaný cloudový projekt (databáze, ukládání souborů, výpočty a decentralizovaná identita (DID)). Unikátní spojení offchain a onchain peer-to-peer technologie. Kompatibilita s IPFS a více řetězci._**

- [Aleph.im](https://aleph.cloud/)
- [Dokumentace](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic – _Uživatelem řízené databázové úložiště IPFS pro datově bohaté a poutavé aplikace._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentace](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase – _S3 kompatibilní decentralizované úložiště a georedundantní služba pro připínání IPFS. Všechny soubory nahrané do IPFS přes Filebase jsou automaticky připnuty k infrastruktuře Filebase s trojnásobnou replikací po celém světě._**

- [Filebase.com](https://filebase.com/)
- [Dokumentace](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND – _Platforma pro cloud computing Web 3.0, která integruje základní funkce úložiště, výpočtů a sítí, je kompatibilní s S3 a poskytuje synchronní ukládání dat v sítích decentralizovaného úložiště, jako jsou IPFS a Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentace](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido – _Platforma blockchain-as-a-service s uzly IPFS na jedno kliknutí_**

- [Kaleido](https://kaleido.io/)
- [Dokumentace](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network – _Spheron je platforma jako služba (PaaS) navržená pro decentralizované aplikace (dapps), které chtějí spustit své aplikace na decentralizované infrastruktuře s nejlepším výkonem. Ve výchozím nastavení poskytuje výpočetní výkon, decentralizované úložiště, CDN a webhosting._**

- [spheron.network](https://spheron.network/)
- [Dokumentace](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 – _Resolver pro decentralizované webové stránky, podobný eth.limo, podporující všechny typy a neomezující se pouze na ENS a IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass – _Vyhledávač pro decentralizované webové stránky podporované IPFS a ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [Dokumentace](https://www.web3compass.net/statistics)

## Další čtení {#further-reading}

- [Co je decentralizované úložiště?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) – _CoinMarketCap_
- [Vyvrácení pěti běžných mýtů o decentralizovaném úložišti](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) – _Storj_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Vývojové frameworky](/developers/docs/frameworks/)