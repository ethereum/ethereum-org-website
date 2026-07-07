---
title: Úvod do návrhů na vylepšení Etherea (EIPs)
metaTitle: Návrhy na vylepšení Etherea (EIPs)
description: Základní informace, které potřebujete k pochopení EIP
lang: cs
---

## Co jsou EIP? {#what-are-eips}

[Návrhy na vylepšení Etherea (EIPs)](https://eips.ethereum.org/) jsou standardy specifikující potenciální nové funkce nebo procesy pro Ethereum. EIP obsahují technické specifikace navrhovaných změn a fungují jako „zdroj pravdy“ pro komunitu. Upgrady sítě a aplikační standardy pro [Ethereum](/) jsou diskutovány a vyvíjeny prostřednictvím procesu EIP.

Kdokoli v komunitě Etherea má možnost vytvořit EIP. Pokyny pro psaní EIP jsou obsaženy v [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP by měl primárně poskytovat stručnou technickou specifikaci s malým množstvím motivace. Autor EIP je zodpovědný za dosažení konsensu v rámci komunity a dokumentování alternativních názorů. Vzhledem k vysoké technické bariéře pro předložení dobře formulovaného EIP jsou historicky většinou autoři EIP typicky vývojáři aplikací nebo protokolů.

## Proč jsou EIP důležité? {#why-do-eips-matter}

EIP hrají ústřední roli v tom, jak na Ethereu probíhají a jak jsou dokumentovány změny. Jsou způsobem, jak mohou lidé navrhovat, diskutovat a přijímat změny. Existují [různé typy EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), včetně hlavních (core) EIP pro nízkoúrovňové změny protokolu, které ovlivňují konsensus a vyžadují upgrade sítě, jako je [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), a ERC pro aplikační standardy, jako jsou [EIP-20](https://eips.ethereum.org/EIPS/eip-20) a [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Každý upgrade sítě se skládá ze sady EIP, které musí implementovat každý [klient Etherea](/learn/#clients-and-nodes) v síti. To znamená, že aby vývojáři klientů zůstali v konsensu s ostatními klienty na síti Ethereum Mainnet, musí se ujistit, že všichni implementovali požadované EIP.

Kromě poskytování technické specifikace pro změny jsou EIP jednotkou, kolem které se v Ethereu odehrává správa: kdokoli může svobodně podat návrh a různé zúčastněné strany v komunitě pak budou diskutovat, aby určily, zda by měl být přijat jako standard nebo zahrnut do upgradu sítě. Protože vedlejší (non-core) EIP nemusí být přijaty všemi aplikacemi (například je možné vytvořit zaměnitelný token, který neimplementuje EIP-20), ale hlavní (core) EIP musí být široce přijaty (protože všechny uzly musí provést upgrade, aby zůstaly součástí stejné sítě), vyžadují hlavní EIP širší konsensus v rámci komunity než vedlejší EIP.

## Historie EIP {#history-of-eips}

[Repozitář GitHub pro návrhy na vylepšení Etherea (EIPs)](https://github.com/ethereum/EIPs) byl vytvořen v říjnu 2015. Proces EIP je založen na procesu [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips), který sám vychází z procesu [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/).

Editoři EIP mají za úkol proces kontroly EIP z hlediska technické správnosti, problémů s formátováním a opravy pravopisu, gramatiky a stylu kódu. Martin Becze, Vitalik Buterin, Gavin Wood a několik dalších byli původními editory EIP od roku 2015 do konce roku 2016.

Současní editoři EIP jsou

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emeritní editoři EIP jsou

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Pokud byste se chtěli stát editorem EIP, podívejte se na [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Editoři EIP rozhodují o tom, kdy je návrh připraven stát se EIP, a pomáhají autorům EIP posouvat jejich návrhy vpřed. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) pomáhají organizovat schůzky mezi editory EIP a komunitou (viz [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Úplný proces standardizace spolu s grafem je popsán v [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Zjistěte více {#learn-more}

Pokud si chcete o EIP přečíst více, podívejte se na [webové stránky EIP](https://eips.ethereum.org/) a [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Zde je několik užitečných odkazů:

- [Seznam všech návrhů na vylepšení Etherea](https://eips.ethereum.org/all)
- [Popis všech typů EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Popis všech stavů EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Komunitní vzdělávací projekty {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP je vzdělávací video série, která diskutuje o návrzích na vylepšení Etherea (EIPs) a klíčových funkcích nadcházejících upgradů.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf poskytuje další informace o návrzích na vylepšení Etherea (EIPs), včetně jejich stavu, podrobností o implementaci, souvisejících pull requestů a zpětné vazby od komunity.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun poskytuje nejnovější zprávy o návrzích na vylepšení Etherea (EIPs), aktuální informace o schůzkách k EIP a další.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight je reprezentací stavu procesu návrhů na vylepšení Etherea (EIPs) a statistik podle informací shromážděných z různých zdrojů.*

## Zapojte se {#participate}

Kdokoli může vytvořit EIP. Před podáním návrhu si musíte přečíst [EIP-1](https://eips.ethereum.org/EIPS/eip-1), který nastiňuje proces EIP a jak EIP napsat, a vyžádat si zpětnou vazbu na [Ethereum Magicians](https://ethereum-magicians.org/), kde jsou návrhy nejprve diskutovány s komunitou před předložením konceptu.

## Odkazy {#references}

<cite class="citation">

Obsah stránky je částečně převzat z [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) od Hudsona Jamesona

</cite>