---
title: Decentralizovaná úložiště
description: Přehled toho, co je decentralizované úložiště, a dostupné nástroje pro jeho integraci do dappek.
lang: cs
---

Na rozdíl od centralizovaného serveru, který provozuje jedna společnost nebo organizace, decentralizované úložné systémy sestávají z peer-to-peer sítě uživatelů-operátorů, kteří drží část celkových dat, čímž vytvářejí odolný systém sdílení souborů. Tyto systémy mohou být využívány v blockchainových aplikacích nebo v jakékoliv síti založené na peer-to-peer principu.

Ethereum samotné může být využíváno jako decentralizovaný úložný systém, což se děje například při ukládání kódu ve všech smart kontraktech. Když ale přijde na velké objemy dat, Ethereum není navčženo k tomuto účelu. Řetězec neustále roste, ale v době psaní tohoto textu se velikost blockchainu Etherea pohybuje kolem 500 GB až 1 TB ([v závislosti na klientovi](https://etherscan.io/chartsync/chaindefault)) a každý uzel v síti musí být schopen uložit všechna tato data. Pokud by řetězec expandoval na velké objemy dat (řekněme 5 TB), nebylo by nadále možné zajistit funkčnost všech síťových uzlů. Náklady na nasazení tak velkého množství dat na hlavní síť by také byly neúměrně vysoké kvůli poplatkům za [gas](/developers/docs/gas).

Z těchto důvodů potřebujeme jiný řetězec nebo metodologii k ukládání velkých objemů dat decentralizovaným způsobem.

Při zvažování možností decentralizovaného úložiště (dStorage) musí uživatel vzít v úvahu několik věcí.

- Mechanismus uchovávání / pobídková struktura
- Vymáhání uchovávání dat
- Decentralizace
- Konsenzus

## Mechanismus perzistence / pobídková struktura {#persistence-mechanism}

### Na bázi blockchainu {#blockchain-based}

Aby mohl kus dat přetrvat navždy, musíme použít mechanismus uchovávání. Například na Ethereu je tento mechanismus založen na tom, že celý řetězec musí být zohledněn při provozování síťového uzlu. Nové kusy dat jsou přidávány na konec řetězce, který neustále roste - což vyžaduje, aby každý uzel replikoval všechna vložená data.

Toto je známé jako **perzistence na bázi blockchainu**.

Problém s perzistencí na bázi blockchainu je v tom, že by se blockchain mohl příliš rozrůst, aby bylo možné všechna data reálně udržovat a ukládat (např. [mnoho zdrojů](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) odhaduje, že internet vyžaduje kapacitu úložiště přes 40 zettabytů).

I blockchain musí mít nějaký typ pobídkové struktury. V případě uchovávání založeném na blockchainu se platí validátorovi. Když jsou data přidána do řetězce, validátoři jsou placeni za jejich přidání.

Platformy s uchováváním založeným na blockchainu:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Na bázi kontraktů {#contract-based}

**Perzistence na bázi kontraktů** vychází z myšlenky, že data nemohou být replikována každým uzlem a ukládána navždy, ale místo toho musí být udržována prostřednictvím smluvních dohod. Tyto dohody jsou uzavírány s více uzly, které se zavázaly uchovávat kus dat po určitou dobu. Data musí být obnovena nebo refundována, kdykoli vyprší, aby byla zachována jejich existence.

Ve většině případů se místo ukládání všech dat on-chain ukládá na blockchain pouze haš, který odkazuje na umístění dat. Tímto způsobem není třeba, aby celý řetězec rostl kvůli ukládání všech dat.

Platformy s uchováváním založeným na kontraktu:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Další aspekty {#additional-consideration}

IPFS je distribuovaný systém pro ukládání a přístup k souborům, webovým stránkám, aplikacím a datům. Nemá zabudovaný motivační systém, ale může být použit s jakýmkoli z výše uvedených řešení založených na kontraktech pro dlouhodobé uchování dat. Dalším způsobem, jak uchovat data na IPFS, je spolupráce s pinningovou službou, která vaše data „připne“. Můžete také provozovat vlastní IPFS uzel a přispívat do sítě, abyste uchovali svá nebo cizí data zdarma!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(pinovací služba IPFS)_
- [web3.storage](https://web3.storage/) _(pinovací služba pro IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(pinovací služba IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(prohlížeč pinů IPFS)_
- [4EVERLAND](https://www.4everland.org/) _(pinovací služba IPFS)_
- [Filebase](https://filebase.com) _(pinovací služba IPFS)_
- [Spheron Network](https://spheron.network/) _(pinovací služba pro IPFS/Filecoin)_

SWARM je decentralizovaná technologie pro ukládání a distribuci dat s motivačním systémem a orákulem pro stanovení ceny za pronájem úložiště.

## Uchovávání dat {#data-retention}

Aby systémy mohly uchovávat data, musí mít nějaký mechanismus, který zajistí, že data budou uchována.

### Mechanismus výzvy {#challenge-mechanism}

Jedním z nejpopulárnějších způsobů, jak zajistit uchování dat, je použití nějakého typu kryptografické výzvy, která je poskytnuta síťovým uzlům, aby se ověřilo, zda stále mají data. Jednoduchým příkladem je proof-of-access od Arweave. Uzel je vyzván, aby prokázal, že má data jak z nejnovějšího bloku, tak z náhodného bloku z minulosti. Pokud uzel nemůže přijít s odpovědí, je penalizován.

Typy dStorage s mechanismem výzvy:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Decentralizace {#decentrality}

Neexistují skvělé nástroje pro měření úrovně decentralizace platforem, ale obecně platí, že byste měli používat nástroje, které nevyžadují nějakou formu KYC, což je důkaz, že nejsou centralizované.

Decentralizované nástroje bez KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Konsenzus {#consensus}

Většina těchto nástrojů má vlastní verzi [mechanismu konsensu](/developers/docs/consensus-mechanisms/), ale obecně jsou založeny buď na [**důkazu prací (PoW)**](/developers/docs/consensus-mechanisms/pow/), nebo na [**důkazu podílem (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Založeno na proof of work:

- Skynet
- Arweave

Založeno na proof of stake:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Související nástroje {#related-tools}

**IPFS – _meziplanetární souborový systém (InterPlanetary File System) je decentralizované úložiště a systém odkazů na soubory pro Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentace](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS – _bezpečné, soukromé a s S3 kompatibilní decentralizované cloudové objektové úložiště pro vývojáře._**

- [Storj.io](https://storj.io/)
- [Dokumentace](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia – _využívá kryptografii k vytvoření tržiště s cloudovým úložištěm, které nevyžaduje důvěru a umožňuje kupujícím a prodávajícím obchodovat přímo._**

- [Skynet.net](https://sia.tech/)
- [Dokumentace](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin – _Filecoin byl vytvořen stejným týmem, který stojí za IPFS. Je to pobídková vrstva nad ideály IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentace](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave – _Arweave je platforma dStorage (decentralizované úložiště) pro ukládání dat._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentace](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs – _Züs je dStorage platforma s důkazem podílem (proof-of-stake), tříštěním (sharding) a tzv. blobbery._**

- [zus.network](https://zus.network/)
- [Dokumentace](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network – _Crust je dStorage platforma postavená na IPFS._**

- [Crust.network](https://crust.network)
- [Dokumentace](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm – _distribuovaná úložná platforma a služba pro distribuci obsahu pro web3 stack Etherea._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentace](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB – _decentralizovaná peer-to-peer databáze postavená na IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentace](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im – _decentralizovaný cloudový projekt (databáze, souborové úložiště, výpočetní výkon a DID). Unikátní kombinace off-chain a on-chain peer-to-peer technologií. Kompatibilita s IPFS a více blockchainy._**

- [Aleph.im](https://aleph.cloud/)
- [Dokumentace](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic – _uživatelsky řízené databázové úložiště IPFS pro poutavé aplikace s velkým množstvím dat._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentace](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase – _decentralizované úložiště kompatibilní s S3 a geograficky redundantní pinovací služba pro IPFS. Všechny soubory nahrané do IPFS přes Filebase jsou automaticky pinovány na infrastrukturu Filebase s 3x replikací po celém světě._**

- [Filebase.com](https://filebase.com/)
- [Dokumentace](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND – _cloudová výpočetní platforma pro Web 3.0, která integruje základní schopnosti úložiště, výpočetního výkonu a sítě, je kompatibilní s S3 a poskytuje synchronní ukládání dat v decentralizovaných úložných sítích, jako jsou IPFS a Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentace](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido – _platforma typu blockchain jako služba (BaaS) s IPFS uzly na jedno kliknutí._**

- [Kaleido](https://kaleido.io/)
- [Dokumentace](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network – _Spheron je platforma jako služba (PaaS) určená pro dApps, které chtějí spouštět své aplikace na decentralizované infrastruktuře s nejlepším výkonem. Poskytuje výpočetní výkon, decentralizované úložiště, CDN a webhosting ihned k použití._**

- [spheron.network](https://spheron.network/)
- [Dokumentace](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Další čtení {#further-reading}

- [Co je to decentralizované úložiště?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) – _CoinMarketCap_
- [Boření pěti běžných mýtů o decentralizovaném úložišti](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) – _Storj_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Vývojářské frameworky](/developers/docs/frameworks/)
