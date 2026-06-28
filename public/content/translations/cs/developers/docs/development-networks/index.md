---
title: "Vývojové sítě"
description: "Přehled vývojových sítí a dostupných nástrojů, které pomáhají při tvorbě aplikací na Ethereu."
lang: cs
---

Když vytváříte aplikaci na [Ethereu](/) s chytrými kontrakty, budete ji chtít před nasazením spustit na lokální síti, abyste viděli, jak funguje.

Podobně jako při vývoji webu můžete na svém počítači spustit lokální server, můžete použít vývojovou síť k vytvoření lokální instance blockchainu pro testování vaší decentralizované aplikace (dapp). Tyto vývojové sítě Etherea poskytují funkce, které umožňují mnohem rychlejší iteraci než veřejný testnet (například se nemusíte starat o získávání ETH z testnetového faucetu).

## Předpoklady {#prerequisites}

Než se ponoříte do vývojových sítí, měli byste rozumět [základům technologického zásobníku Etherea](/developers/docs/ethereum-stack/) a [sítím Etherea](/developers/docs/networks/).

## Co je to vývojová síť? {#what-is-a-development-network}

Vývojové sítě jsou v podstatě klienti Etherea (implementace Etherea) navržení speciálně pro lokální vývoj.

**Proč prostě nespustit standardní uzel Etherea lokálně?**

_Mohli_ byste [spustit uzel](/developers/docs/nodes-and-clients/#running-your-own-node), ale protože jsou vývojové sítě účelově vytvořeny pro vývoj, často obsahují užitečné funkce, jako jsou:

- Deterministické naplnění vašeho lokálního blockchainu daty (např. účty se zůstatky ETH)
- Okamžité vytváření bloků s každou přijatou transakcí, popořadě a bez zpoždění
- Vylepšené funkce pro ladění a logování

## Dostupné nástroje {#available-projects}

**Poznámka**: Většina [vývojových frameworků](/developers/docs/frameworks/) obsahuje vestavěnou vývojovou síť. Doporučujeme začít s frameworkem pro [nastavení vašeho lokálního vývojového prostředí](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Lokální síť Etherea navržená pro vývoj. Umožňuje vám nasadit vaše kontrakty, spouštět testy a ladit váš kód.

Hardhat Network je vestavěná v nástroji Hardhat, vývojovém prostředí Etherea pro profesionály.

- [Webové stránky](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Lokální Beacon Chainy {#local-beacon-chains}

Někteří klienti konsensu mají vestavěné nástroje pro spuštění lokálních beacon chainů pro účely testování. K dispozici jsou pokyny pro Lighthouse, Nimbus a Lodestar:

- [Lokální testnet pomocí klienta Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lokální testnet pomocí klienta Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Veřejné testovací sítě Etherea {#public-beacon-testchains}

Existují také dvě udržované veřejné testovací implementace Etherea: Sepolia a Hoodi. Doporučený testnet s dlouhodobou podporou je Hoodi, na kterém může kdokoli volně validovat. Sepolia používá sadu validátorů s řízeným přístupem, což znamená, že na tomto testnetu není obecný přístup pro nové validátory.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Kurtosis Ethereum Package {#kurtosis}

Kurtosis je systém pro sestavování vícekontajnerových testovacích prostředí, který umožňuje vývojářům lokálně spouštět reprodukovatelné instance blockchainových sítí.

Balíček Ethereum Kurtosis lze použít k rychlému vytvoření parametrizovatelného, vysoce škálovatelného a soukromého testnetu Etherea přes Docker nebo Kubernetes. Balíček podporuje všechny hlavní klienty exekuční vrstvy (EL) a vrstvy konsensu (CL). Kurtosis elegantně zpracovává všechna mapování lokálních portů a připojení služeb pro reprezentativní síť, která se má použít v pracovních postupech validace a testování týkajících se základní infrastruktury Etherea.

- [Balíček sítě Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Webové stránky](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentace](https://docs.kurtosis.com/)

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Vývojové frameworky](/developers/docs/frameworks/)
- [Nastavení lokálního vývojového prostředí](/developers/local-environment/)

## Návody: Vývojové sítě a testovací prostředí na Ethereu {#tutorials}

- [Vývoj a testování dApps s lokálním testnetem Etherea s více klienty](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Jak spustit lokální testnet Etherea s více klienty pomocí nástroje Kurtosis pro vývoj a testování dApps._