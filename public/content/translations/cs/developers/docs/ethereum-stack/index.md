---
title: "Úvod do stacku Etherea"
description: "Průvodce různými vrstvami Ethereum zásobníku a tím, jak do sebe zapadají."
lang: cs
---

Stejně jako každý softwarový zásobník se i kompletní „Ethereum zásobník“ bude lišit projekt od projektu v závislosti na vašich cílech.

Existují však základní komponenty Etherea, které pomáhají vytvořit mentální model interakce softwarových aplikací s ethereovým blockchainem. Pochopení vrstev zásobníku vám pomůže porozumět různým způsobům, jak lze Ethereum integrovat do softwarových projektů.

## Úroveň 1: Ethereum Virtual Machine {#ethereum-virtual-machine}

[Virtuální stroj Etherea (EVM)](/developers/docs/evm/) je běhové prostředí pro chytré kontrakty na Ethereu. Všechny chytré kontrakty a změny stavu na blockchainu Etherea jsou prováděny [transakcemi](/developers/docs/transactions/). EVM zajišťuje veškeré zpracování transakcí v síti Ethereum.

Stejně jako u každého virtuálního stroje vytváří EVM úroveň abstrakce mezi prováděným kódem a vykonávajícím strojem (uzlem Etherea). V současné době běží EVM na tisících uzlů rozmístěných po celém světě.

Pod kapotou používá EVM sadu instrukcí opkódu k provádění konkrétních úloh. Těchto (140 unikátních) opkódů umožňuje, aby byl EVM [Turingovsky kompletní](https://en.wikipedia.org/wiki/Turing_completeness), což znamená, že pokud má dostatek zdrojů, je schopen vypočítat téměř cokoli.

Jako vývojář dapps nemusíte o EVM vědět o moc víc než to, že existuje a spolehlivě a bez výpadků pohání všechny aplikace na Ethereu.

## Úroveň 2: Chytré kontrakty {#smart-contracts}

[Chytré kontrakty](/developers/docs/smart-contracts/) jsou spustitelné programy, které běží na ethereovém blockchainu.

Chytré kontrakty se píší pomocí specifických [programovacích jazyků](/developers/docs/smart-contracts/languages/), které se kompilují do bajtkódu EVM (nízkoúrovňové strojové instrukce nazývané opkódy).

Chytré kontrakty neslouží jen jako open source knihovny, ale jsou to v podstatě otevřené služby API, které jsou neustále v provozu a nelze je vypnout. Chytré kontrakty poskytují veřejné funkce, se kterými mohou uživatelé a aplikace ([dapps](/developers/docs/dapps/)) interagovat bez nutnosti povolení. Jakákoli aplikace se může integrovat s nasazenými chytrými kontrakty a skládat tak funkcionalitu, jako je přidávání [datových kanálů](/developers/docs/oracles/) nebo podpora směny tokenů. Kdokoli může navíc na Ethereum nasadit nové chytré kontrakty a přidat tak vlastní funkcionalitu, která bude vyhovovat potřebám jeho aplikace.

Jako vývojář dec. aplikací budete muset psát smart kontrakty pouze v případě, že budete chtít přidat vlastní funkcionalitu do blockchainu Etherea. Možná zjistíte, že většiny nebo všech potřeb vašeho projektu dosáhnete pouhou integrací s již existujícími smart kontrakty, například pokud chcete podporovat platby ve stablecoinech nebo umožnit decentralizovanou výměnu tokenů.

## Úroveň 3: Ethereové uzly {#ethereum-nodes}

Aby mohla aplikace interagovat s ethereovým blockchainem, musí se připojit k [ethereovému uzlu](/developers/docs/nodes-and-clients/). Připojení k uzlu vám umožní číst data z blockchainu a/nebo posílat transakce do sítě.

Ethereum uzly jsou počítače se spuštěným softwarem - Ethereum klientem. Klient je implementace Etherea, která ověřuje všechny transakce v každém bloku, čímž zajišťuje bezpečnost sítě a přesnost dat. **Ethereové uzly JSOU ethereový blockchain**. Společně uchovávají stav blockchainu Etherea a dosahují konsensu o transakcích, které mají za cíl měnit stav blockchainu.

Připojením vaší aplikace k ethereovému uzlu (prostřednictvím [JSON-RPC API](/developers/docs/apis/json-rpc/)) je vaše aplikace schopna číst data z blockchainu (například zůstatky na uživatelských účtech) a také vysílat do sítě nové transakce (například převod ETH mezi uživatelskými účty nebo provádění funkcí chytrých kontraktů).

## Úroveň 4: Klientská API pro Ethereum {#ethereum-client-apis}

Mnoho pomocných knihoven (vytvořených a spravovaných open source komunitou Etherea) umožňuje vašim aplikacím připojit se k ethereovému blockchainu a komunikovat s ním.

Pokud je vaše uživatelská aplikace webová, můžete si zvolit `npm install` [JavaScript API](/developers/docs/apis/javascript/) přímo do frontendu. Nebo se možná rozhodnete implementovat tuto funkcionalitu na straně serveru pomocí API pro [Python](/developers/docs/programming-languages/python/) nebo [Javu](/developers/docs/programming-languages/java/).

I když tato API nejsou nezbytnou součástí zásobníku, abstrahují od velké části složitosti přímé interakce s ethereovým uzlem. Poskytují také pomocné funkce (např. převod ETH na Gwei), takže jako vývojář můžete strávit méně času řešením složitostí klientů Etherea a více času se soustředit na funkcionalitu specifickou pro vaši aplikaci.

## Úroveň 5: Aplikace pro koncové uživatele {#end-user-applications}

Na nejvyšší úrovni zásobníku jsou aplikace určené pro uživatele. Jedná se o standardní aplikace, které dnes běžně vytváříte a používáte: především webové a mobilní aplikace.

Způsob vývoje těchto uživatelských rozhraní se v podstatě nemění. Uživatelé často nebudou potřebovat vědět, že aplikace, kterou používají, je vytvořena pomocí blockchainu.

## Jste připraveni vybrat si svůj zásobník? {#ready-to-choose-your-stack}

Podívejte se na našeho průvodce [nastavením místního vývojového prostředí](/developers/local-environment/) pro vaši ethereovou aplikaci.

## Další čtení {#further-reading}

- [Architektura aplikace Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
