---
title: "Sítě"
description: "Přehled sítí Etherea a kde získat testnetový ether (ETH) pro testování vaší aplikace."
lang: cs
---

[Sítě Etherea](/) jsou skupiny propojených počítačů, které komunikují pomocí protokolu Etherea. Existuje pouze jeden Ethereum Mainnet, ale pro účely testování a vývoje lze vytvořit nezávislé sítě, které dodržují stejná pravidla protokolu. Existuje mnoho nezávislých „sítí“, které dodržují protokol, aniž by spolu vzájemně interagovaly. Můžete dokonce spustit jednu lokálně na svém vlastním počítači pro testování vašich chytrých kontraktů a Web3 aplikací.

Váš účet na Ethereu bude fungovat napříč různými sítěmi, ale zůstatek na účtu a historie transakcí se z hlavní sítě Etherea nepřevedou. Pro účely testování je užitečné vědět, které sítě jsou k dispozici a jak získat testnetové ETH na hraní. Obecně se z bezpečnostních důvodů nedoporučuje znovu používat účty z Mainnetu na testnetech nebo naopak.

## Předpoklady {#prerequisites}

Než si přečtete o různých sítích, měli byste porozumět [základům Etherea](/developers/docs/intro-to-ethereum/), protože testovací sítě vám poskytnou levnou a bezpečnou verzi Etherea na hraní.

## Veřejné sítě {#public-networks}

Veřejné sítě jsou přístupné komukoli na světě s připojením k internetu. Kdokoli může číst nebo vytvářet transakce na veřejném blockchainu a validovat prováděné transakce. Konsensus mezi účastníky sítě rozhoduje o zahrnutí transakcí a stavu sítě.

### Ethereum Mainnet {#ethereum-mainnet}

Mainnet je primární veřejný produkční blockchain Etherea, kde na distribuované účetní knize probíhají transakce se skutečnou hodnotou.

Když lidé a burzy diskutují o cenách ETH, mluví o ETH na Mainnetu.

### Testnety Etherea {#ethereum-testnets}

Kromě Mainnetu existují veřejné testnety. Jedná se o sítě používané vývojáři protokolu nebo vývojáři chytrých kontraktů k testování jak aktualizací protokolu, tak potenciálních chytrých kontraktů v prostředí podobném produkčnímu před nasazením na Mainnet. Představte si to jako obdobu produkčních a testovacích (staging) serverů.

Jakýkoli kód kontraktu, který napíšete, byste měli před nasazením na Mainnet otestovat na testnetu. Mezi decentralizovanými aplikacemi (dapp), které se integrují s existujícími chytrými kontrakty, má většina projektů kopie nasazené na testnetech.

Většina testnetů začínala s využitím mechanismu konsensu důkaz autority s řízeným přístupem. To znamená, že k validaci transakcí a vytváření nových bloků je vybrán malý počet uzlů – přičemž v tomto procesu dávají v sázku svou identitu. Alternativně některé testnety disponují otevřeným mechanismem konsensu důkaz podílem (PoS), kde si každý může vyzkoušet provozování validátoru, stejně jako na Ethereum Mainnetu.

ETH na testnetech by nemělo mít žádnou skutečnou hodnotu; nicméně vznikly trhy pro určité typy testnetového ETH, které se stalo vzácným nebo obtížně dostupným. Vzhledem k tomu, že k interakci s Ethereem (i na testnetech) potřebujete ETH, většina lidí získává testnetové ETH zdarma z faucetů. Většina faucetů jsou webové aplikace, do kterých můžete zadat adresu, na kterou požadujete zaslání ETH.

#### Který testnet bych měl použít? {#which-testnet-should-i-use}

Dva veřejné testnety, které vývojáři klientů v současné době udržují, jsou Sepolia a Hoodi. Sepolia je síť pro vývojáře kontraktů a aplikací k testování jejich aplikací. Síť Hoodi umožňuje vývojářům protokolu testovat aktualizace sítě a stakerům testovat provozování validátorů.

#### Sepolia {#sepolia}

**Sepolia je doporučený výchozí testnet pro vývoj aplikací**. Síť Sepolia používá sadu validátorů s řízeným přístupem, kterou kontrolují klientské a testovací týmy.

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
- [ethfaucet.com Sepolia Faucet](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [OpenFaucet.org Sepolia Faucet](https://openfaucet.org/ethereum-sepolia)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi je testnet pro testování validace a stakingu. Síť Hoodi je otevřená pro uživatele, kteří chtějí provozovat testnetový validátor. Stakeři, kteří chtějí otestovat aktualizace protokolu před jejich nasazením na Mainnet, by proto měli použít Hoodi.

- Otevřená sada validátorů, stakeři mohou testovat aktualizace sítě
- Velký stav, užitečný pro testování složitých interakcí chytrých kontraktů
- Delší doba synchronizace a vyžaduje více úložného prostoru pro provoz uzlu

##### Zdroje

- [Webové stránky](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Průzkumník](https://explorer.hoodi.ethpandaops.io/)
- [Synchronizace kontrolních bodů (Checkpoint Sync)](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucety

- [Chain Platform Hoodi Faucet](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [OpenFaucet.org Hoodi Faucet](https://openfaucet.org/ethereum-hoodi)
- [PoW Faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery je unikátní druh testnetu, který se každý měsíc plně resetuje. Stav provádění a konsensu se každých 28 dní vrací zpět do genesis, což znamená, že vše, co se na testnetu stane, je pomíjivé. Díky tomu je ideální pro krátkodobé testování, rychlé spuštění uzlu a aplikace typu „hello world“, které nepotřebují trvalost.

- Vždy čerstvý stav, krátkodobé testování validátorů a aplikací
- Obsahuje pouze základní sadu kontraktů
- Otevřená sada validátorů a snadný přístup k velkému množství prostředků
- Nejmenší požadavky na uzel a nejrychlejší synchronizace, v průměru &lt;5 GB

##### Zdroje

- [Webové stránky](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Komunitní chat](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Průzkumník Beacon chainu](https://beaconlight.ephemery.dev/)
- [Synchronizace kontrolních bodů (Checkpoint Sync)](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucety {#faucets}

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky (zastaralé) {#holesky}

Testnet Holesky je od září 2025 zastaralý. Provozovatelé stakingu a poskytovatelé infrastruktury by měli k testování validátorů místo toho používat Hoodi.

- [Oznámení o ukončení testnetu Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1. září 2025_
- [Aktualizace testnetů Holesky a Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog EF, 18. března 2025_

### Testnety vrstvy 2 {#layer-2-testnets}

[Vrstva 2 (l2)](/layer-2/) je souhrnný termín popisující specifickou sadu řešení pro škálování Etherea. Vrstva 2 je samostatný blockchain, který rozšiřuje Ethereum a dědí jeho bezpečnostní záruky. Testnety vrstvy 2 jsou obvykle úzce spjaty s veřejnými testnety Etherea.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Testnet pro [Arbitrum](https://arbitrum.io/).

##### Zdroje

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucety

- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia faucet](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia Faucet](https://ethfaucet.com/networks/arbitrum)
- [OpenFaucet.org Arbitrum Sepolia Faucet](https://openfaucet.org/arbitrum-sepolia)
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
- [OpenFaucet.org Optimism Sepolia Faucet](https://openfaucet.org/optimism-sepolia)
- [Testnet Faucet](https://docs.optimism.io/app-developers/tools/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Testnet pro [Starknet](https://www.starknet.io).

##### Zdroje

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucety

- [Alchemy Faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia Faucet](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet Faucet](https://starknet-faucet.vercel.app/)

## Soukromé sítě {#private-networks}

Síť Etherea je soukromá síť, pokud její uzly nejsou připojeny k veřejné síti (tj. Mainnetu nebo testnetu). V tomto kontextu slovo soukromá znamená pouze vyhrazená nebo izolovaná, nikoli chráněná nebo bezpečná.

### Vývojové sítě {#development-networks}

Při vývoji aplikace pro Ethereum ji budete chtít spustit na soukromé síti, abyste před jejím nasazením viděli, jak funguje. Podobně jako si pro vývoj webu vytváříte lokální server na svém počítači, můžete si vytvořit lokální instanci blockchainu pro testování vaší decentralizované aplikace (dapp). To umožňuje mnohem rychlejší iteraci než veřejný testnet.

Existují projekty a nástroje, které s tím pomáhají. Zjistěte více o [vývojových sítích](/developers/docs/development-networks/).

### Sítě konsorcia {#consortium-networks}

Proces konsensu je řízen předem definovanou sadou uzlů, které jsou důvěryhodné. Například soukromá síť známých akademických institucí, z nichž každá spravuje jeden uzel, a bloky jsou validovány prahovým počtem signatářů v rámci sítě.

Pokud je veřejná síť Etherea jako veřejný internet, síť konsorcia je jako soukromý intranet.

## <Emoji text="🚉" /> Proč jsou testnety Etherea pojmenovány po stanicích metra? {#why-naming}

Mnoho testnetů Etherea je pojmenováno po skutečných stanicích metra nebo vlaků. Tato tradice pojmenovávání začala brzy a odráží světová města, kde přispěvatelé žili nebo pracovali. Je to symbolické, zapamatovatelné a praktické. Stejně jako jsou testnety izolovány od Ethereum Mainnetu, linky metra jezdí odděleně od povrchové dopravy.

### <Emoji text="🚧" /> Běžně používané a starší testnety {#common-and-legacy-testnets}

- **Sepolia** - Čtvrť s napojením na metro v řeckých Aténách. V současnosti se používá pro testování chytrých kontraktů a dApp.
- **Hoodi** - Pojmenováno po stanici metra Hoodi v indickém Bengalúru. Používá se pro testování validátorů a aktualizací protokolu.
- **Goerli** _(zastaralé)_ - Pojmenováno po Görlitzer Bahnhof v německém Berlíně.
- **Rinkeby** _(zastaralé)_ - Pojmenováno po předměstí Stockholmu se stanicí metra.
- **Ropsten** _(zastaralé)_ - Odkazuje na oblast a bývalý terminál trajektů/metra ve Stockholmu.
- **Kovan** _(zastaralé)_ - Pojmenováno po stanici singapurského metra (MRT).
- **Morden** _(zastaralé)_ - Pojmenováno po stanici londýnského metra. První veřejný testnet Etherea.

### <Emoji text="🧪" /> Další specializované testnety {#other-testnets}

Některé testnety byly vytvořeny pro krátkodobé testování nebo testování specifických aktualizací a nemusí mít nutně tématiku metra:

- **Holesky** _(zastaralé)_ - Pojmenováno po nádraží Holešovice v Praze. Používalo se pro testování validátorů; zastaralé v roce 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(všechny zastaralé)_ a **Ephemery** - Účelově vytvořené pro simulace aktualizací jako Merge, Šanghaj nebo experimenty s validátory. Některé názvy jsou spíše regionální nebo tematické než založené na metru.

Používání názvů stanic metra pomáhá vývojářům rychle identifikovat a zapamatovat si testnety, aniž by se museli spoléhat na číselná ID řetězců (chain ID). Odráží to také kulturu Etherea: praktickou, globální a zaměřenou na lidi.

## Související nástroje {#related-tools}

- [Chainlist](https://chainlist.org/) _seznam EVM sítí pro připojení peněženek a poskytovatelů ke správnému ID řetězce (Chain ID) a ID sítě (Network ID)_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _repozitář na GitHubu s metadaty řetězců, který pohání Chainlist_

## Další čtení {#further-reading}

- [Návrh: Předvídatelný životní cyklus testnetů Etherea](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Evoluce testnetů Etherea](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
