---
title: "Vývojové sítě"
description: "Přehled vývojových sítí a dostupných nástrojů, nápomocných při vytváření aplikací pro Ethereum."
lang: cs
---

Když vytváříte aplikaci pro Ethereum se smart kontrakty, budete ji chtít před nasazením spustit nejdříve v místní síti, abyste zjistili, jak funguje.

Podobně jako můžete na svém počítači spustit lokální server pro vývoj webu, můžete pomocí vývojové sítě vytvořit lokální instanci blockchainu a otestovat svou dapp. Tyto vývojové sítě Etherea poskytují funkce, které umožňují mnohem rychlejší iteraci než veřejná testovací síť (například nemusíte řešit získávání ETH).

## Předpoklady {#prerequisites}

Měli byste rozumět [základům Ethereum stacku](/developers/docs/ethereum-stack/) a [ethereových sítí](/developers/docs/networks/), než se pustíte do vývojových sítí.

## Co je to vývojová síť? {#what-is-a-development-network}

Vývojové sítě jsou v zásadě klienti Etherea (implementace Etherea) navrženi speciálně pro lokální vývoj.

**Proč jen lokálně nespustit standardní uzel Etherea?**

_Můžete_ [spustit uzel](/developers/docs/nodes-and-clients/#running-your-own-node), ale protože vývojové sítě jsou účelově vytvořeny pro vývoj, často obsahují praktické funkce, jako jsou:

- Deterministické naplnění vašeho lokálního blockchainu daty (např. účty se zůstatky ETH)
- Okamžitá produkce bloků s každou přijatou transakcí, a to popořadě a bez zpoždění
- Vylepšená funkce debugování a protokolování

## Dostupné nástroje {#available-projects}

**Poznámka**: Většina [vývojových frameworků](/developers/docs/frameworks/) obsahuje vestavěnou vývojovou síť. Doporučujeme začít s frameworkem pro [nastavení vašeho lokálního vývojového prostředí](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Lokální síť Etherea určená pro vývoj. Umožňuje nasazovat kontrakty, spouštět testy a ladit kód.

Síť Hardhat Network je integrovaná s Hardhatem, vývojovým prostředím Etherea pro profesionály.

- [Webové stránky](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Lokální Beacon Chainy {#local-beacon-chains}

Někteří konsensuální klienti mají vestavěné nástroje pro spuštění lokálních Beacon Chainů pro účely testování. Jsou k dispozici pokyny pro Lighthouse, Nimbus a Lodestar:

- [Lokální testovací síť s použitím Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lokální testovací síť s použitím Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Veřejné testovací řetězce Etherea {#public-beacon-testchains}

Existují také dvě udržované veřejné testovací implementace Etherea: Sepolia a Hoodi. Doporučenou testovací sítí s dlouhodobou podporou je Hoodi, na které může kdokoli volně validovat. Sepolia používá sadu validátorů s oprávněním, což znamená, že na této testovací síti není obecný přístup k novým validátorům.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Kurtosis Ethereum Package {#kurtosis}

Kurtosis je systém pro sestavování testovacích prostředí s více kontejnery, který vývojářům umožňuje lokálně spouštět reprodukovatelné instance blockchainových sítí.

Balíček Ethereum Kurtosis lze použít k rychlému vytvoření parametrizovatelné, vysoce škálovatelné a soukromé testovací sítě Ethereum přes Docker nebo Kubernetes. Balíček podporuje všechny hlavní klienty exekuční vrstvy (EL) a vrstvy konsensu (CL). Kurtosis elegantně zpracovává všechna lokální mapování portů a servisní připojení pro reprezentativní síť, která se má používat v pracovních postupech validace a testování týkajících se základní infrastruktury Etherea.

- [Ethereum network package](https://github.com/kurtosis-tech/ethereum-package)
- [Webové stránky](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentace](https://docs.kurtosis.com/)

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Vývojářské frameworky](/developers/docs/frameworks/)
- [Nastavení lokálního vývojového prostředí](/developers/local-environment/)
