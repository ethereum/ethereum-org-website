---
title: Data a analytika
description: "Jak získat onchain analytiku a data pro použití ve vašich decentralizovaných aplikacích (dapp)"
lang: cs
---

## Úvod {#introduction}

S tím, jak využití sítě neustále roste, bude v onchain datech existovat stále větší množství cenných informací. Vzhledem k rychlému nárůstu objemu dat se může výpočet a agregace těchto informací za účelem reportování nebo řízení decentralizované aplikace (dapp) stát časově a procesně náročným úkolem.

Využití stávajících poskytovatelů dat může urychlit vývoj, přinést přesnější výsledky a snížit nároky na průběžnou údržbu. To umožní týmu soustředit se na základní funkce, které se jejich projekt snaží poskytovat.

## Předpoklady {#prerequisites}

Měli byste rozumět základnímu konceptu [průzkumníků bloků](/developers/docs/data-and-analytics/block-explorers/), abyste lépe pochopili jejich využití v kontextu datové analytiky. Kromě toho se seznamte s konceptem [indexu](/glossary/#index), abyste pochopili výhody, které přinášejí do návrhu systému.

Z hlediska architektonických základů je dobré alespoň teoreticky chápat, co je to [API](https://www.wikipedia.org/wiki/API) a [REST](https://www.wikipedia.org/wiki/Representational_state_transfer).

## Průzkumníky bloků {#block-explorers}

Mnoho [průzkumníků bloků](/developers/docs/data-and-analytics/block-explorers/) nabízí [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) brány, které vývojářům poskytnou přehled o datech v reálném čase týkajících se bloků, transakcí, validátorů, účtů a dalších onchain aktivit.

Vývojáři pak mohou tato data zpracovávat a transformovat, aby svým uživatelům poskytli jedinečné poznatky a interakce s [blockchainem](/glossary/#blockchain). Například [Etherscan](https://etherscan.io) a [Blockscout](https://eth.blockscout.com) poskytují data o provádění a konsensu pro každý 12sekundový slot.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) je indexovací protokol, který poskytuje snadný způsob dotazování na blockchainová data prostřednictvím otevřených API známých jako podgrafy.

S The Graph mohou vývojáři těžit z:

- Decentralizovaného indexování: Umožňuje indexovat blockchainová data prostřednictvím více indexerů, čímž se eliminuje jakýkoli jediný bod selhání.
- GraphQL dotazů: Poskytuje výkonné rozhraní GraphQL pro dotazování na indexovaná data, díky čemuž je získávání dat velmi jednoduché.
- Přizpůsobení: Definujte si vlastní logiku pro transformaci a ukládání blockchainových dat a znovu využijte podgrafy publikované jinými vývojáři v síti The Graph.

Postupujte podle tohoto [průvodce pro rychlý start](https://thegraph.com/docs/en/quick-start/) a vytvořte, nasaďte a dotazujte se na podgraf během 5 minut.

## Klientská diverzita {#client-diversity}

[Klientská diverzita](/developers/docs/nodes-and-clients/client-diversity/) je důležitá pro celkové zdraví sítě Ethereum, protože poskytuje odolnost vůči chybám a zneužitím. Nyní existuje několik řídicích panelů klientské diverzity, včetně [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) a [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) předzpracovává blockchainová data do tabulek relační databáze (DuneSQL), umožňuje uživatelům dotazovat se na blockchainová data pomocí SQL a vytvářet řídicí panely na základě výsledků dotazů. Onchain data jsou uspořádána do 4 surových tabulek: `blocks`, `transactions`, (události) `logs` a (volání) `traces`. Populární kontrakty a protokoly byly dekódovány a každý má svou vlastní sadu tabulek událostí a volání. Tyto tabulky událostí a volání jsou dále zpracovávány a organizovány do abstrakčních tabulek podle typu protokolů, například dex, půjčování, stablecoiny atd.

## SQD {#sqd}

[SQD](https://sqd.dev/) je decentralizovaná hyperškálovatelná datová platforma optimalizovaná pro poskytování efektivního přístupu k velkým objemům dat nevyžadujícího povolení. V současné době poskytuje historická onchain data, včetně protokolů událostí, účtenek transakcí, trasování a rozdílů stavů pro jednotlivé transakce. SQD nabízí výkonnou sadu nástrojů pro vytváření vlastních kanálů pro extrakci a zpracování dat, přičemž dosahuje rychlosti indexování až 150 tisíc bloků za sekundu.

Chcete-li začít, navštivte [dokumentaci](https://docs.sqd.dev/) nebo se podívejte na [příklady EVM](https://github.com/subsquid-labs/squid-evm-examples) toho, co můžete pomocí SQD vytvořit.

## Síť SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) je přední indexer dat, který vývojářům poskytuje rychlá, spolehlivá, decentralizovaná a přizpůsobená API pro jejich Web3 projekty. SubQuery poskytuje vývojářům z více než 165 ekosystémů (včetně Etherea) bohatá indexovaná data k budování intuitivních a pohlcujících zážitků pro jejich uživatele. Síť SubQuery pohání vaše nezastavitelné aplikace pomocí odolné a decentralizované infrastrukturní sítě. Použijte sadu nástrojů pro vývojáře blockchainu od SubQuery k budování Web3 aplikací budoucnosti, aniž byste trávili čas budováním vlastního backendu pro činnosti zpracování dat.

Chcete-li začít, navštivte [průvodce pro rychlý start na Ethereu](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) a začněte indexovat blockchainová data Etherea během několika minut v lokálním prostředí Docker pro testování, než přejdete do ostrého provozu na [spravované službě SubQuery](https://managedservice.subquery.network/) nebo na [decentralizované síti SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) je API pro blockchainová data v reálném čase, které poskytuje obohacená data pro více než 70 milionů tokenů napříč více než 80 sítěmi. Vývojáři mají přístup ke strukturovaným cenám tokenů, zůstatkům v peněženkách, historii transakcí a agregované analytice (objem, likvidita, unikátní peněženky), aniž by museli udržovat vlastní indexovací infrastrukturu. Codex podporuje doručování dat za méně než sekundu prostřednictvím integrací WebSocket a webhooků.

Chcete-li začít, navštivte [dokumentaci](https://docs.codex.io), vyzkoušejte [Explorer](https://docs.codex.io/explore) nebo se zaregistrujte na [řídicím panelu](https://dashboard.codex.io/signup).

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) je jazyk podobný SQL navržený pro dotazování na řetězce EVM (Ethereum Virtual Machine). Konečným cílem EQL je podporovat složité relační dotazy na prvotřídní entity EVM řetězce (bloky, účty a transakce) a zároveň poskytnout vývojářům a výzkumníkům ergonomickou syntaxi pro každodenní použití. S EQL mohou vývojáři načítat blockchainová data pomocí známé syntaxe podobné SQL a eliminovat potřebu složitého standardního (boilerplate) kódu. EQL podporuje standardní požadavky na blockchainová data (např. získání nonce a zůstatku účtu na Ethereu nebo načtení aktuální velikosti bloku a časového razítka) a neustále přidává podporu pro složitější požadavky a sady funkcí.

## Další čtení {#further-reading}

- [Zkoumání krypto dat I: Architektury toku dat](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Přehled sítě Graph](https://thegraph.com/docs/en/about/)
- [Hřiště pro dotazy Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Příklady kódu API na Etherscanu](https://etherscan.io/apis#contracts)
- [Dokumentace API na Blockscoutu](https://docs.blockscout.com/devs/apis)
- [Průzkumník Beacon chainu Beaconcha.in](https://beaconcha.in)
- [Základy Dune](https://docs.dune.com/#dune-basics)
- [Průvodce pro rychlý start SubQuery na Ethereu](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Přehled sítě SQD](https://docs.sqd.dev/)
- [EVM Query Language](https://eql.sh/blog/alpha-release-notes)

## Návody: Data a analytika / SQL na Ethereu {#tutorials}

- [Naučte se základní témata Etherea pomocí SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Dotazujte se na onchain data Etherea pomocí SQL, abyste pochopili základy transakcí, bloků a gasu._