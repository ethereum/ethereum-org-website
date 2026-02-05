---
title: Data a analytika
description: Jak získat on-chainové analýzy a data pro použití ve vašich dapps
lang: cs
---

## Úvod {#Introduction}

S rostoucím využíváním sítě se stále větší množství cenných informací nachází v on-chain datech. Jak objem dat rychle narůstá, výpočty a agregace těchto informací za účelem reportování nebo provozu dappek se mohou stát časově i procesně náročnými.

Využití stávajících poskytovatelů dat může urychlit vývoj, přinést přesnější výsledky a snížit náklady na údržbu. To umožní týmům vývojářů dappek soustředit se na hlavní funkce, které jejich projekt poskytuje.

## Předpoklady {#prerequisites}

Měli byste rozumět základnímu konceptu [průzkumníků bloků](/developers/docs/data-and-analytics/block-explorers/), abyste lépe pochopili jejich použití v kontextu analýzy dat. Kromě toho se seznamte s konceptem [indexu](/glossary/#index), abyste pochopili výhody, které přidávají k designu systému.

Z hlediska základů architektury pochopení, co jsou [API](https://www.wikipedia.org/wiki/API) a [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), a to i jen teoreticky.

## Průzkumníky bloků {#block-explorers}

Mnoho [průzkumníků bloků](/developers/docs/data-and-analytics/block-explorers/) nabízí [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) brány, které vývojářům poskytnou přehled o datech v reálném čase o blocích, transakcích, validátorech, účtech a dalších on-chain aktivitách.

Vývojáři pak mohou tato data zpracovávat a transformovat, aby svým uživatelům poskytli jedinečné vhledy a interakce s [blockchainem](/glossary/#blockchain). Například [Etherscan](https://etherscan.io) a [Blockscout](https://eth.blockscout.com) poskytují exekuční a konsensuální data pro každý 12s slot.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) je indexovací protokol, který poskytuje snadný způsob dotazování se na blockchainová data prostřednictvím otevřených API známých jako podgrafy.

Díky The Graph mohou vývojáři využívat:

- Decentralizované indexování: Umožňuje indexování blockchainových dat prostřednictvím několika indexerů, čímž se eliminuje jediný bod selhání.
- GraphQL dotazy: Poskytuje výkonné rozhraní GraphQL pro dotazování na indexovaná data, díky čemuž je získávání dat velmi jednoduché.
- Přizpůsobení: Definujte si vlastní logiku pro transformaci a ukládání blockchainových dat a znovu použijte podgrafy publikované jinými vývojáři v síti The Graph.

Postupujte podle tohoto [rychlého průvodce](https://thegraph.com/docs/en/quick-start/) a vytvořte, nasaďte a dotazujte se na podgraf během 5 minut.

## Diverzita klientů {#client-diversity}

[Diverzita klientů](/developers/docs/nodes-and-clients/client-diversity/) je důležitá pro celkové zdraví sítě Ethereum, protože poskytuje odolnost vůči chybám a exploitům. Nyní existuje několik dashboardů pro diverzitu klientů, včetně [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) a [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) předzpracovává blockchainová data do tabulek relační databáze (DuneSQL), umožňuje uživatelům dotazovat se na blockchainová data pomocí SQL a vytvářet dashboardy na základě výsledků dotazů. On-chainová data jsou uspořádána do 4 surových tabulek: `blocks`, `transactions`, (událostí) `logs` a (volání) `traces`. Populární kontrakty a protokoly byly dekódovány a každý z nich má svou vlastní sadu událostních a volacích tabulek. Tyto tabulky jsou dále zpracovávány a organizovány do abstraktních tabulek podle typu protokolů, například dex, půjčky, stablecoiny atd.

## SQD {#sqd}

[SQD](https://sqd.dev/) je decentralizovaná, hyperškálovatelná datová platforma optimalizovaná pro poskytování efektivního přístupu bez oprávnění k velkým objemům dat. V současné době poskytuje historická on-chainová data, včetně protokolů událostí, potvrzení o transakcích, stop a rozdílů stavů pro každou transakci. SQD nabízí výkonnou sadu nástrojů pro vytváření vlastních kanálů pro extrakci a zpracování dat a dosahuje rychlosti indexování až 150k bloků za sekundu.

Chcete-li začít, navštivte [dokumentaci](https://docs.sqd.dev/) nebo si prohlédněte [příklady pro EVM](https://github.com/subsquid-labs/squid-evm-examples) toho, co můžete s SQD vytvořit.

## Síť SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) je přední indexátor dat, který vývojářům poskytuje rychlá, spolehlivá, decentralizovaná a přizpůsobená API pro jejich web3 projekty. SubQuery umožňuje vývojářům z více než 165 ekosystémů (včetně Etherea) používat bohatě indexovaná data k vytváření intuitivních a imersivních zážitků pro jejich uživatele. Síť SubQuery pohání vaše nezastavitelné aplikace díky odolné a decentralizované infrastruktuře. Použijte vývojářskou sadu nástrojů SubQuery pro blockchain k vytváření web3 aplikací budoucnosti, aniž byste museli trávit čas budováním vlastního backendu pro zpracování dat.

Začněte tím, že navštívíte [rychlého průvodce pro Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) a během několika minut začnete indexovat data z blockchainu Etherea v místním prostředí Dockeru pro účely testování před nasazením na [spravovanou službu SubQuery](https://managedservice.subquery.network/) nebo do [decentralizované sítě SubQuery](https://app.subquery.network/dashboard).

## Dotazovací jazyk EVM {#evm-query-language}

Dotazovací jazyk EVM (EQL) je jazyk podobný SQL určený k dotazování na řetězce EVM (Ethereum Virtual Machine). Konečným cílem EQL je podporovat komplexní relační dotazy na prvky první třídy řetězce EVM (bloky, účty a transakce) a zároveň poskytovat vývojářům a výzkumníkům ergonomickou syntaxi pro každodenní použití. S EQL mohou vývojáři získávat blockchainová data pomocí známé syntaxe podobné SQL a eliminovat tak potřebu složitého šablonovitého kódu. EQL podporuje standardní požadavky na blockchainová data (např. získání nonce a zůstatku účtu na Ethereu nebo získání aktuální velikosti bloku a časového razítka) a neustále přidává podporu pro složitější požadavky a sady funkcí.

## Další čtení {#further-reading}

- [Zkoumání krypto dat I: Architektury datových toků](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Přehled sítě The Graph](https://thegraph.com/docs/en/about/)
- [Hřiště pro dotazy The Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Příklady kódu API na EtherScanu](https://etherscan.io/apis#contracts)
- [Dokumentace API na Blockscoutu](https://docs.blockscout.com/devs/apis)
- [Průzkumník řetězové vazby Beaconcha.in](https://beaconcha.in)
- [Základy Dune](https://docs.dune.com/#dune-basics)
- [Rychlý průvodce pro Ethereum od SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Přehled sítě SQD](https://docs.sqd.dev/)
- [Dotazovací jazyk EVM](https://eql.sh/blog/alpha-release-notes)
