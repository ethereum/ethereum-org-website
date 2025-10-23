---
title: Návrhy na zlepšení platformy Ethereum (EIP)
description: Základní informace, které potřebujete k pochopení EIP
lang: cs
---

# Úvod do návrhů na zlepšení platformy Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Co jsou EIP? {#what-are-eips}

[Návrhy na na zlepšení platformy Ethereum (Ethereum Improvement Proposals, EIP)](https://eips.ethereum.org/) jsou standardy specifikující potenciální nové funkce nebo procesy pro Ethereum. EIP obsahují technické specifikace pro navrhovaná vylepšení a fungují jako „zdroj správnosti“ pro komunitu. Diskuze a vývoj síťových vylepšení a aplikačních standardů Etherea probíhají právě prostřednictvím procesu EIP.

Kdokoli z komunity Ethereum má možnost vytvořit EIP. Pokyny pro psaní EIP jsou součástí [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Každý EIP by měl poskytovat stručnou technickou specifikaci a částečně i popis motivace ke vzniku tohoto návrhu. Autor EIP je zodpovědný za dosažení shody v rámci komunity a zdokumentování alternativních názorů. Vzhledem k vysoké technické náročnosti, která je pro kvalitní EIP nezbytná, jich většinu navrhují vývojáři aplikací nebo protokolů.

## Proč na EIP záleží? {#why-do-eips-matter}

EIP hrají ústřední roli ve změnách a dokumentaci Etherea. Jedná se o standardní způsob, jak mohou členové komunity navrhovat, diskutovat a přijímat změny. Existují [různé typy EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), včetně základních EIP pro nízkoúrovňové změny protokolů, které ovlivňují konsensus a vyžadují vylepšení sítě, jako je [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), a ERC pro aplikační standardy, jako je [EIP-20](https://eips.ethereum.org/EIPS/eip-20) a [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Každé vylepšení sítě se skládá ze sady EIP, které musí implementovat každý [ethereovský klient](/learn/#clients-and-nodes) v síti. To znamená, že aby vývojáři klientů zůstali v konsensu s ostatními klienty na hlavní síti Ethereum, musí se ujistit, že požadované EIP implementovali všichni.

Kromě poskytnutí technické specifikace změn jsou EIP také jednotkou, kolem které se v Ethereu odehrává řízení: Kdokoli může EIP navrhnout, a pokud se tak stane, různé zúčastněné strany v komunitě začnou diskutovat o jeho přijetí jako standardu nebo zahrnutí do vylepšení sítě. Protože EIP, které se netýkají klíčových částí Etherea, nemusí být přijaty všemi aplikacemi (například je možné vytvořit zastupitelný token, který neimplementuje EIP-20), ale základní EIP musí být široce přijaty (protože všechny síťové uzly musí implementovat stejné vylepšení, aby zůstaly součástí stejné sítě), základní EIP vyžadují širší konsensus v rámci komunity než EIP, které se netýkají klíčových částí protokolu.

## Historie EIP {#history-of-eips}

[GitHub repozitář Ethereum Improvement Proposals (EIPs)](https://eips.ethereum.org) byl založen v říjnu 2015. Proces EIP je založen na procesu [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips), který sám o sobě vychází z procesu [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/).

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

Pokud se chcete stát editorem EIP, podívejte se na návrh [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Editoři EIP rozhodují, kdy je návrh připraven stát se EIP, a pomáhají autorům EIP přetavit jejich návrhy do realizovatelné podoby. Setkání mezi editory EIP a komunitou pomáhají organizovat [Ethereum Cat Herders](https://www.ethereumcatherders.com/) (viz [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Celý proces standardizace spolu s grafem je popsán v [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Zjistit více {#learn-more}

Pokud si chcete přečíst více o EIP, podívejte se na [web EIP](https://eips.ethereum.org/) a [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Zde je několik užitečných odkazů:

- [Seznam všech návrhů na zlepšení platformy Ethereum](https://eips.ethereum.org/all)
- [Popis všech typů EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Popis všech stavů EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Komunitní vzdělávací projekty {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP je série vzdělávacích videí, která je zaměřena na návrhy na zlepšení platformy Ethereum (EIP) a klíčové funkce nadcházejících vylepšení.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *EIPs For Nerds poskytuje komplexní, jednoduché přehledy různých návrhů na zlepšení platformy Ethereum (EIP), včetně základních EIP a EIP na aplikační/infrastrukturní vrstvě (ERC), s cílem vzdělávat čtenáře a formovat konsenzus ohledně navrhovaných změn v protokolu Ethereum.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf poskytuje doplňující informace o návrzích na zlepšení platformy Ethereum (EIP), včetně jejich statusu, detailů implementace, souvisejících pull requestů a zpětné vazby od komunity.*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun poskytuje nejnovější zprávy o návrzích na zlepšení platformy Ethereum (EIP), aktualizace z jednání o EIP a další informace.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight představuje přehled stavu návrhů na zlepšení platformy Ethereum (EIP) a statistiky na základě informací z různých zdrojů.*

## Jak se zapojit {#participate}

Každý může vytvořit EIP. Před odesláním návrhu je třeba nastudovat si [EIP-1](https://eips.ethereum.org/EIPS/eip-1), který popisuje proces EIP a jak napsat EIP. Dalším krokem je vyžádat si zpětnou vazbu na webu [Ethereum Magicians](https://ethereum-magicians.org/), kde jsou návrhy nejprve prodiskutovány s komunitou.

## Reference {#references}

<cite class="citation">

Obsah stránky byl částečně převzat z [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) od Hudsona Jamesona

</cite>
