---
title: "Návrhy na zlepšení platformy Ethereum (EIP)"
description: "Základní informace, které potřebujete k pochopení EIP"
lang: cs
---

# Úvod do návrhů na zlepšení platformy Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Co jsou EIP? {#what-are-eips}

[Návrhy na zlepšení platformy Ethereum (EIP)](https://eips.ethereum.org/) jsou standardy specifikující potenciální nové funkce nebo procesy pro Ethereum. EIP obsahují technické specifikace pro navrhovaná vylepšení a fungují jako „zdroj správnosti“ pro komunitu. Diskuze a vývoj síťových vylepšení a aplikačních standardů Etherea probíhají právě prostřednictvím procesu EIP.

Kdokoli z komunity Ethereum má možnost vytvořit EIP. Pokyny pro psaní EIP jsou obsaženy v [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Každý EIP by měl poskytovat stručnou technickou specifikaci a částečně i popis motivace ke vzniku tohoto návrhu. Autor EIP je zodpovědný za dosažení shody v rámci komunity a zdokumentování alternativních názorů. Vzhledem k vysoké technické náročnosti, která je pro kvalitní EIP nezbytná, jich většinu navrhují vývojáři aplikací nebo protokolů.

## Proč na EIP záleží? {#why-do-eips-matter}

EIP hrají ústřední roli ve změnách a dokumentaci Etherea. Jedná se o standardní způsob, jak mohou členové komunity navrhovat, diskutovat a přijímat změny. Existují [různé typy EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), včetně základních EIP pro nízkoúrovňové změny protokolu, které ovlivňují konsensus a vyžadují upgrade sítě, jako je [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), a ERC pro standardy aplikací, jako jsou [EIP-20](https://eips.ethereum.org/EIPS/eip-20) a [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Každý upgrade sítě se skládá ze sady EIP, které musí implementovat každý [ethereový klient](/learn/#clients-and-nodes) v síti. To znamená, že aby vývojáři klientů zůstali v konsensu s ostatními klienty na hlavní síti Ethereum, musí se ujistit, že požadované EIP implementovali všichni.

Kromě poskytnutí technické specifikace změn jsou EIP také jednotkou, kolem které se v Ethereu odehrává řízení: Kdokoli může EIP navrhnout, a pokud se tak stane, různé zúčastněné strany v komunitě začnou diskutovat o jeho přijetí jako standardu nebo zahrnutí do vylepšení sítě. Protože EIP, které se netýkají klíčových částí Etherea, nemusí být přijaty všemi aplikacemi (například je možné vytvořit zastupitelný token, který neimplementuje EIP-20), ale základní EIP musí být široce přijaty (protože všechny síťové uzly musí implementovat stejné vylepšení, aby zůstaly součástí stejné sítě), základní EIP vyžadují širší konsensus v rámci komunity než EIP, které se netýkají klíčových částí protokolu.

## Historie EIP {#history-of-eips}

[GitHub repozitář Ethereum Improvement Proposals (EIPs)](https://github.com/ethereum/EIPs) byl založen v říjnu 2015. Proces EIP je založen na procesu [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips), který je sám založen na procesu [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/).

Editoři EIP mají za úkol revidovat EIP z hlediska technické správnosti, formátování a opravy pravopisu, gramatiky a stylu kódu. Martin Becze, Vitalik Buterin, Gavin Wood a několik dalších byli původními editory EIP od roku 2015 do konce roku 2016.

Současnými EIP editory jsou

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emeritními EIP editory jsou

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Pokud se chcete stát editorem EIP, podívejte se na [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Editoři EIP rozhodují, kdy je návrh připraven stát se EIP, a pomáhají autorům EIP přetavit jejich návrhy do realizovatelné podoby. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) pomáhají organizovat schůzky mezi editory EIP a komunitou (viz [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Celý proces standardizace spolu s grafem je popsán v [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Další informace {#learn-more}

Pokud se chcete o EIP dozvědět více, podívejte se na [web EIP](https://eips.ethereum.org/) a [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Zde je několik užitečných odkazů:

- [Seznam všech návrhů na zlepšení platformy Ethereum](https://eips.ethereum.org/all)
- [Popis všech typů EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Popis všech stavů EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Vzdělávací projekty komunity {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP je série vzdělávacích videí, která pojednává o návrzích na zlepšení platformy Ethereum (EIP) a klíčových funkcích nadcházejících upgradů._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf poskytuje další informace k návrhům na zlepšení platformy Ethereum (EIP), včetně jejich stavu, podrobností o implementaci, souvisejících pull requestů a zpětné vazby od komunity._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun poskytuje nejnovější zprávy o návrzích na zlepšení platformy Ethereum (EIP), aktualizace z jednání o EIP a další informace._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight je reprezentací stavu procesu návrhů na zlepšení platformy Ethereum (EIP) a statistik dle informací shromážděných z různých zdrojů._

## Zapojte se {#participate}

Každý může vytvořit EIP. Před odesláním návrhu je nutné si přečíst [EIP-1](https://eips.ethereum.org/EIPS/eip-1), který popisuje proces EIP a jak EIP napsat, a vyžádat si zpětnou vazbu na [Ethereum Magicians](https://ethereum-magicians.org/), kde jsou návrhy nejprve prodiskutovány s komunitou, než je předložen koncept.

## Odkazy {#references}

<cite class="citation">

Obsah stránky byl částečně převzat z [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) od Hudsona Jamesona

</cite>
