---
title: Sítě
description: Přehled sítí Etherea a návod, kde získat ether (ETH) testovací sítě pro testování vaší aplikace.
lang: cs
---

Sítě Etherea jsou skupiny propojených počítačů, které komunikují pomocí protokolu Ethereum. Existuje pouze jedna hlavní síť Etherea, ale nezávislé sítě, které dodržují stejná pravidla protokolu, mohou být vytvořeny pro testovací a vývojové účely. Existuje mnoho nezávislých „sítí“, které dodržují protokol, aniž by mezi sebou komunikovaly. Můžete si dokonce spustit vlastní síť na svém počítači k testování chytrých kontraktů a web3 aplikací.

Váš účet na Ethereu bude fungovat na různých sítích, ale zůstatek na účtu a historie transakcí se nepřenesou z hlavní sítě Etherea. Pro testovací účely je užitečné vědět, které sítě jsou k dispozici a jak získat ETH testovací sítě, abyste mohli experimentovat. Obecně platí, že z bezpečnostních důvodů se nedoporučuje používat účty z hlavní sítě na testovacích sítích nebo naopak.

## Předpoklady {#prerequisites}

Předtím, než se začnete zabývat různými sítěmi, byste měli rozumět [základům Etherea](/developers/docs/intro-to-ethereum/), protože testovací sítě vám poskytnou levnou a bezpečnou verzi Etherea pro experimentování.

## Veřejné sítě {#public-networks}

Veřejné sítě jsou přístupné komukoliv na světě s připojením k internetu. Každý může číst nebo vytvářet transakce na veřejném blockchainu a ověřovat prováděné transakce. Konsenzus mezi síťovými uzly rozhoduje o zahrnutí transakcí a stavu sítě.

### Hlavní síť Ethereum {#ethereum-mainnet}

Hlavní síť je primární veřejný produkční blockchain Etherea, kde dochází k transakcím s reálnou hodnotou na distribuované účetní knize.

Když veřejnost nebo burzy diskutují o cenách ETH, mluví o ETH na hlavní síti.

### Testovací sítě Etherea {#ethereum-testnets}

Kromě hlavní sítě existují veřejné testovací sítě. Tyto sítě používají vývojáři protokolu nebo chytrých kontraktů k testování jak vylepšení protokolu, tak potenciálních chytrých kontraktů v prostředí podobném produkčnímu prostředí, než budou nasazeny na hlavní síť. Můžete si je představit jako analogii mezi produkčním a testovacím serverem.

Předtím, než nasadíte jakýkoliv kód chytrého kontraktu, který napíšete, na hlavní síť, měli byste ho otestovat na testovací síti. Většina dappek, které se integrují s existujícími chytrými kontrakty, má kopie nasazené na testovacích sítích.

Většina testovacích sítí začala používáním povoleného mechanismu konsenzu důkazu autoritou. To znamená, že se vybere malý počet uzlů, které ověřují transakce a vytvářejí nové bloky – přičemž v tomto procesu uzamykají svoji identitu. Některé testovací sítě naopak používají otevřený mechanismus konsenzu důkazu podílem, kde si každý může vyzkoušet provozování validátora, podobně jako na hlavní síti Etherea.

ETH na testovacích sítích nemá mít žádnou skutečnou hodnotu. Přesto vznikly trhy vytvořené pro některé druhy testovacích ETH, které jsou nedostatkové nebo je těžké je získat. Protože k interakci s Ethereem (dokonce i na testovacích sítích) potřebujete ETH, většina lidí dostává testovací ETH zdarma z faucetů. Většina faucetů jsou webové aplikace, kde můžete zadat adresu, na kterou chcete ETH obdržet.

#### Kterou testovací síť bych měl/a použít?

Dvě veřejné testovací sítě, které aktuálně udržují vývojáři klientů, jsou Sepolia a Goerli. Sepolia je síť pro vývojáře kontraktů a aplikací, kteří je chtějí otestovat. Síť Goerli umožňuje vývojářům protokolu testovat vylepšení sítě a také umožňuje uzamykatelům zkoušet provozování validátorů.

#### Sepolia {#sepolia}

**Sepolia je doporučená výchozí testovací síť pro vývoj aplikací**. Síť Sepolia používá povolenou sadu validátorů. Je poměrně nová, což znamená, že její stav a historie jsou stále celkem malé. To znamená, že síť se rychle synchronizuje a provozování uzlu na ní vyžaduje méně úložného prostoru. To je užitečné pro uživatele, kteří chtějí spustit uzel rychle a napřímo komunikovat se sítí.

- Uzavřená sada validátorů, kontrolována týmy klientů a testerů
- Nová testovací síť, méně spuštěných aplikací než na jiných testovacích sítích
- Rychlá synchronizace, provoz uzlu vyžaduje minimální úložný prostor

##### Zdroje

- [Web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucety

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia faucet](https://sepoliafaucet.com/)
- [Infura Sepolia faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia faucet](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum Ecosystem faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Goerli _(dlouhodobá podpora)_ {#goerli}

_Poznámka: [Testovací síť Goerli je zastaralá](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) a v roce 2023 bude nahrazena testovací sítí [Holesovice](https://github.com/eth-clients/holesovice). Zvažte přesun aplikací na testovací síť Sepolia._

Goerli je testovací síť pro testování validace a uzamčení. Síť Goerli je otevřená uživatelům, kteří chtějí provozovat validátor na testovací síti. Uzamykatelé, kteří chtějí testovat vylepšení protokolu před jejich nasazením na hlavní síť, by proto měli používat Goerli.

- Otevřená sada validátorů, uzamykatelé mohou testovat vylepšení sítě
- Obsáhlý stav, užitečné pro testování složitých interakcí chytrých kontraktů
- Delší synchronizace, vyžaduje více úložného prostoru pro provoz uzlu

##### Zdroje

- [Web](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)
- [Blockscout](https://eth-goerli.blockscout.com/)

##### Faucety

- [QuickNode Goerli Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://goerli-faucet.pk910.de/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)
- [All That Node Goerli Faucet](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase Wallet Faucet | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Chainstack Goerli faucet](https://faucet.chainstack.com/goerli-faucet)

Ke spuštění validátoru na testovací síti Holesky použijte [„laciný Holesky validátor“ launchpad](https://holesky.launchpad.ethstaker.cc/en/) od ethstaker.

### Testovací sítě druhé vrstvy {#layer-2-testnets}

[Druhá vrstva (L2)](/layer-2/) je souhrnný termín pro popis specifických sad škálovacích řešení Etherea. Druhá vrstva je samostatný blockchain, který rozšiřuje Ethereum a dědí jeho bezpečnostní záruky. Testovací sítě druhé vrstvy jsou obvykle úzce spojeny s veřejnými testovacími sítěmi Etherea.

#### Arbitrum Goerli {#arbitrum-goerli}

Testovací síť pro [Arbitrum](https://arbitrum.io/).

##### Faucety

- [Chainlink faucet](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

Testovací síť pro [Optimism](https://www.optimism.io/).

##### Faucety

- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Coinbase Wallet Faucet | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

Testovací síť pro [Starknet](https://www.starknet.io).

##### Faucety

- [Starknet faucet](https://faucet.goerli.starknet.io)

## Privátní sítě {#private-networks}

Síť Etherea je privátní, pokud její uzly nejsou připojeny k veřejné síti (tj. hlavní nebo testovací síť). V tomto kontextu znamená „privátní“ pouze vyhrazená nebo izolovaná, spíše než chráněná nebo bezpečná.

### Vývojové sítě {#development-networks}

Chcete-li vyvíjet aplikaci na Ethereu, budete ji chtít nejprve spustit na privátní síti, abyste viděli, jak funguje, než ji nasadíte. Podobně jako vytváříte lokální server na svém počítači pro vývoj webu, můžete vytvořit lokální instanci blockchainu pro testování vaší dappky. To umožňuje mnohem rychlejší iteraci než na veřejné testovací síti.

Existují projekty a nástroje, které vám s tím pomohou. Další informace o [vývojových sítích](/developers/docs/development-networks/).

### Konsorciové sítě {#consortium-networks}

Proces konsenzu je řízen předem definovanou sadou důvěryhodných uzlů. Např. soukromá síť známých akademických institucí, z nichž každá spravuje jeden uzel, a bloky jsou ověřovány prahovým počtem signatářů v této síti.

Pokud je veřejná síť Etherea jako veřejný internet, konsorciová síť je jako privátní intranet.

## Související nástroje {#related-tools}

- [Chainlist](https://chainlist.org/) _– seznam EVM sítí pro připojení peněženek a poskytovatelů k odpovídajícímu Chain ID a Network ID_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _– repozitář na GitHubu obsahující metadata řetězců, která napájí Chainlist_

## Další informace {#further-reading}

- [Návrh: Předvídatelný životní cyklus testovací sítě Etherea](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Vývoj testovacích sítí Etherea](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
