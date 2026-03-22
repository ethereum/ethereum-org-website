---
title: "Sítě"
description: "Přehled sítí Etherea a návod, kde získat ether (ETH) testovací sítě pro testování vaší aplikace."
lang: cs
---

Sítě Etherea jsou skupiny propojených počítačů, které komunikují pomocí protokolu Ethereum. Existuje pouze jedna hlavní síť Etherea, ale nezávislé sítě, které dodržují stejná pravidla protokolu, mohou být vytvořeny pro testovací a vývojové účely. Existuje mnoho nezávislých „sítí“, které dodržují protokol, aniž by mezi sebou komunikovaly. Můžete si dokonce spustit vlastní síť na svém počítači k testování chytrých kontraktů a web3 aplikací.

Váš účet na Ethereu bude fungovat na různých sítích, ale zůstatek na účtu a historie transakcí se nepřenesou z hlavní sítě Etherea. Pro testovací účely je užitečné vědět, které sítě jsou k dispozici a jak získat ETH testovací sítě, abyste mohli experimentovat. Obecně platí, že z bezpečnostních důvodů se nedoporučuje používat účty z hlavní sítě na testovacích sítích nebo naopak.

## Předpoklady {#prerequisites}

Než si začnete číst o různých sítích, měli byste porozumět [základům Etherea](/developers/docs/intro-to-ethereum/), protože testnety vám poskytnou levnou a bezpečnou verzi Etherea, se kterou si můžete hrát.

## Veřejné sítě {#public-networks}

Veřejné sítě jsou přístupné komukoliv na světě s připojením k internetu. Každý může číst nebo vytvářet transakce na veřejném blockchainu a ověřovat prováděné transakce. Konsenzus mezi síťovými uzly rozhoduje o zahrnutí transakcí a stavu sítě.

### Mainnet Etherea {#ethereum-mainnet}

Hlavní síť je primární veřejný produkční blockchain Etherea, kde dochází k transakcím s reálnou hodnotou na distribuované účetní knize.

Když veřejnost nebo burzy diskutují o cenách ETH, mluví o ETH na hlavní síti.

### Testnety Etherea {#ethereum-testnets}

Kromě hlavní sítě existují veřejné testovací sítě. Tyto sítě používají vývojáři protokolu nebo chytrých kontraktů k testování jak vylepšení protokolu, tak potenciálních chytrých kontraktů v prostředí podobném produkčnímu prostředí, než budou nasazeny na hlavní síť. Můžete si je představit jako analogii mezi produkčním a testovacím serverem.

Předtím, než nasadíte jakýkoliv kód chytrého kontraktu, který napíšete, na hlavní síť, měli byste ho otestovat na testovací síti. Většina dappek, které se integrují s existujícími chytrými kontrakty, má kopie nasazené na testovacích sítích.

Většina testovacích sítí začala používáním povoleného mechanismu konsenzu důkazu autoritou. To znamená, že se vybere malý počet uzlů, které ověřují transakce a vytvářejí nové bloky – přičemž v tomto procesu uzamykají svoji identitu. Některé testovací sítě naopak používají otevřený mechanismus konsenzu důkazu podílem, kde si každý může vyzkoušet provozování validátora, podobně jako na hlavní síti Etherea.

ETH na testovacích sítích nemá mít žádnou skutečnou hodnotu. Přesto vznikly trhy vytvořené pro některé druhy testovacích ETH, které jsou nedostatkové nebo je těžké je získat. Protože k interakci s Ethereem (dokonce i na testovacích sítích) potřebujete ETH, většina lidí dostává testovací ETH zdarma z faucetů. Většina faucetů jsou webové aplikace, kde můžete zadat adresu, na kterou chcete ETH obdržet.

#### Kterou testovací síť bych měl/a použít?

Dva veřejné testnety, které vývojáři klientů v současné době udržují, jsou Sepolia a Hoodi. Sepolia je síť pro vývojáře kontraktů a aplikací, kteří je chtějí otestovat. Síť Hoodi umožňuje vývojářům protokolů testovat vylepšení sítě a stakerům testovat provoz validátorů.

#### Sepolia {#sepolia}

**Sepolia je doporučená výchozí testovací síť pro vývoj aplikací**. Síť Sepolia používá sadu validátorů s oprávněními, která je kontrolovaná týmy klientů a testovacími týmy.

##### Zdroje

- [Webové stránky](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucety

- [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia Faucet](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Faucet ekosystému Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia Faucet](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi je testnet pro testování validace a stakingu. Síť Hoodi je otevřená pro uživatele, kteří chtějí provozovat testnet validátor. Stakeři, kteří chtějí testovat vylepšení protokolu před jejich nasazením na mainnet, by proto měli používat Hoodi.

- Otevřená sada validátorů, uzamykatelé mohou testovat vylepšení sítě
- Obsáhlý stav, užitečné pro testování složitých interakcí chytrých kontraktů
- Delší synchronizace, vyžaduje více úložného prostoru pro provoz uzlu

##### Zdroje

- [Webové stránky](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Průzkumník](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucety

- [Chain Platform Hoodi Faucet](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [PoW Faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery je jedinečný druh testnetu, který se každý měsíc plně resetuje. Exekuční a konsensuální stav se každých 28 dní vrací zpět do geneze, což znamená, že vše, co se na testnetu stane, je pomíjivé. Díky tomu je ideální pro krátkodobé testování, rychlý bootstrap uzlů a aplikace typu „hello world“, které nepotřebují stálost.

- Vždy čerstvý stav, krátkodobé testování validátorů a aplikací
- Zahrnuje pouze základní sadu kontraktů
- Otevřená sada validátorů a snadný přístup k velkým finančním částkám
- Nejmenší požadavky na uzel a nejrychlejší synchronizace, v průměru &lt;5 GB

##### Zdroje

- [Webové stránky](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Komunitní chat](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Průzkumník Beacon](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucety

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky (zastaralý) {#holesky}

Testnet Holesky je od září 2025 zastaralý. Provozovatelé stakingu a poskytovatelé infrastruktury by místo toho měli pro testování validátorů používat Hoodi.

- [Oznámení o ukončení provozu testnetu Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) – _Blog EF, 1. září 2025_
- [Aktualizace testnetů Holesky a Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) – _Blog EF, 18. března 2025_

### Testnety druhé vrstvy {#layer-2-testnets}

[Druhá vrstva (L2)](/layer-2/) je souhrnný termín popisující specifickou sadu řešení pro škálování Etherea. Druhá vrstva je samostatný blockchain, který rozšiřuje Ethereum a dědí jeho bezpečnostní záruky. Testovací sítě druhé vrstvy jsou obvykle úzce spojeny s veřejnými testovacími sítěmi Etherea.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Testnet pro [Arbitrum](https://arbitrum.io/).

##### Zdroje

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucety

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia faucet](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Faucet](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Testnet pro [Optimism](https://www.optimism.io/).

##### Zdroje

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucety

- [Alchemy Faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia Faucet](https://ethfaucet.com/networks/optimism)
- [Testnet Faucet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Testnet pro [Starknet](https://www.starknet.io).

##### Zdroje

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucety

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## Soukromé sítě {#private-networks}

Síť Etherea je soukromá síť, pokud její uzly nejsou připojeny k veřejné síti (tj. k mainnetu nebo testnetu). V tomto kontextu znamená „privátní“ pouze vyhrazená nebo izolovaná, spíše než chráněná nebo bezpečná.

### Vývojářské sítě {#development-networks}

Chcete-li vyvíjet aplikaci na Ethereu, budete ji chtít nejprve spustit na privátní síti, abyste viděli, jak funguje, než ji nasadíte. Podobně jako vytváříte lokální server na svém počítači pro vývoj webu, můžete vytvořit lokální instanci blockchainu pro testování vaší dappky. To umožňuje mnohem rychlejší iteraci než na veřejné testovací síti.

Existují projekty a nástroje, které vám s tím pomohou. Přečtěte si více o [vývojářských sítích](/developers/docs/development-networks/).

### Konsorciální sítě {#consortium-networks}

Proces konsenzu je řízen předem definovanou sadou důvěryhodných uzlů. Např. soukromá síť známých akademických institucí, z nichž každá spravuje jeden uzel, a bloky jsou ověřovány prahovým počtem signatářů v této síti.

Pokud je veřejná síť Etherea jako veřejný internet, konsorciová síť je jako privátní intranet.

## <Emoji text="🚉" /> Proč jsou testnety Etherea pojmenovány po stanicích metra? {#why-naming}

Mnoho testnetů Etherea je pojmenováno po skutečných stanicích metra nebo vlakových nádražích. Tato tradice pojmenovávání začala brzy a odráží světová města, kde přispěvatelé žili nebo pracovali. Je to symbolické, zapamatovatelné a praktické. Stejně jako jsou testnety izolovány od mainnetu Etherea, linky metra jezdí odděleně od povrchové dopravy.

### <Emoji text="🚧" /> Běžně používané a starší testnety {#common-and-legacy-testnets}

- **Sepolia** – Čtvrť v řeckých Aténách napojená na metro. V současné době se používá pro testování chytrých kontraktů a dApps.
- **Hoodi** – Pojmenováno po stanici metra Hoodi v indickém Bengalúru. Používá se pro testování validátorů a vylepšení protokolu.
- **Goerli** _(zastaralý)_ – Pojmenováno po nádraží Görlitzer Bahnhof v německém Berlíně.
- **Rinkeby** _(zastaralý)_ – Pojmenováno po předměstí Stockholmu se stanicí metra.
- **Ropsten** _(zastaralý)_ – Odkazuje na oblast a bývalý terminál trajektů/metra ve Stockholmu.
- **Kovan** _(zastaralý)_ – Pojmenováno po stanici MRT v Singapuru.
- **Morden** _(zastaralý)_ – Pojmenováno po stanici londýnského metra. První veřejný testnet Etherea.

### <Emoji text="🧪" /> Ostatní specializované testnety {#other-testnets}

Některé testnety byly vytvořeny pro krátkodobé nebo pro vylepšení specifické testování a nemusí být nutně s tématikou metra:

- **Holesky** _(zastaralý)_ – Pojmenováno po stanici Holešovice v Praze. Používá se pro testování validátorů; zastaralý v roce 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(všechny zastaralé)_ a **Ephemery** – Účelově vytvořené pro simulace vylepšení, jako je Sloučení, Shanghai, nebo pro experimenty s validátory. Některé názvy jsou spíše regionální nebo tematické než založené na metru.

Používání názvů stanic metra pomáhá vývojářům rychle identifikovat a zapamatovat si testnety, aniž by se museli spoléhat na číselné ID řetězců. Odráží také kulturu Etherea: praktickou, globální a zaměřenou na člověka.

## Související nástroje {#related-tools}

- [Chainlist](https://chainlist.org/) _seznam EVM sítí pro připojení peněženek a poskytovatelů k odpovídajícímu Chain ID a Network ID_
- [Řetězce založené na EVM](https://github.com/ethereum-lists/chains) _GitHub repozitář metadat řetězců, který pohání Chainlist_

## Další čtení {#further-reading}

- [Návrh: Předvídatelný životní cyklus testnetů Etherea](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Evoluce testnetů Etherea](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
