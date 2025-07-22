---
title: Voorstellen ter verbetering van Ethereum (EIPs)
description: De basisinformatie die u nodig hebt om EIP's te begrijpen
lang: nl
---

# Inleiding tot voorstellen van verbetering van Ethereum (Ethereum Improvement Proposals, EIP's) {#introduction-to-ethereum-improvement-proposals}

## Wat zijn EIP's? {#what-are-eips}

[Ethereum Improvement Proposals (EIP's)](https://eips.ethereum.org/) zijn standaarden die potentiële nieuwe functies of processen voor Ethereum specificeren. EIP's bevatten technische specificaties voor de voorgestelde wijzigingen en fungeren als de 'bron van waarheid' voor de gemeenschap. Netwerkverbeteringen en toepassingsstandaarden voor Ethereum worden besproken en ontwikkeld via het EIP-proces.

Iedereen binnen de Ethereum-gemeenschap kan een EIP maken. Richtlijnen voor het schrijven van EIP's staan in [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Een EIP moet vooral een beknopte technische specificatie bieden met een kleine hoeveelheid motivatie. De EIP-maker is verantwoordelijk voor het bereiken van een consensus binnen de gemeenschap en het documenteren van alternatieve meningen. Gezien de hoge technische drempel om een goed geformuleerde EIP in te dienen, zijn historisch gezien de meeste makers van EIP's ontwikkelaars van toepassingen of protocollen.

## Waarom zijn EIP's belangrijk? {#why-do-eips-matter}

EIP's spelen een centrale rol in de manier waarop veranderingen plaatsvinden en worden gedocumenteerd over Ethereum. Ze zijn de manier waarop mensen veranderingen kunnen voorstellen, bespreken en aannemen. Er zijn [verschillende soorten EIP's](https://eips.ethereum.org/EIPS/eip-1#eip-types), waaronder kern-EIP's voor veranderingen in het protocol op laag niveau die de consensus beïnvloeden en een upgrade van het netwerk vereisen, zoals [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), en ERC's voor toepassingsstandaarden zoals [EIP-20](https://eips.ethereum.org/EIPS/eip-20) en [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Elke netwerkupgrade bestaat uit een set EIP's die door elke [Ethereum client](/learn/#clients-and-nodes) op het netwerk geïmplementeerd moet worden. Dit betekent dat om in consensus te blijven met andere clients op het hoofdnet van Ethereum, clientontwikkelaars ervoor moeten zorgen dat ze allemaal de vereiste EIP's hebben geïmplementeerd.

Naast het leveren van een technische specificatie voor veranderingen, zijn EIP's de eenheid waaromheen het bestuur plaatsvindt in Ethereum: iedereen is vrij om er een voor te stellen, vervolgens zullen verschillende belanghebbenden in de gemeenschap debatteren over de vraag of het als standaard moet worden aangenomen of moet worden opgenomen in een upgrade van het netwerk. Omdat EIP's die niet tot de kern behoren, niet door alle toepassingen hoeven te worden overgenomen (het is bijvoorbeeld mogelijk om een fungible-token te creëren die EIP-20 niet implementeert), maar EIP's die wel tot de kern behoren op grote schaal moeten worden overgenomen (omdat alle nodes een upgrade moeten uitvoeren om deel te blijven uitmaken van hetzelfde netwerk), vereisen EIP's die wel tot de kern behoren een bredere consensus binnen de gemeenschap dan EIP's die niet tot de kern behoren.

## Geschiedenis van EIP's {#history-of-eips}

De [Ethereum Improvement Proposals (EIP's) GitHub repository](https://github.com/ethereum/EIPs) is gemaakt in oktober 2015. Het EIP-proces is gebaseerd op het proces van de [Bitcoin-verbeteringsvoorstellen (BIP's)](https://github.com/bitcoin/bips), dat zelf is gebaseerd op het proces van de [Python-verbeteringsvoorstellen (PEP's)](https://www.python.org/dev/peps/).

EIP-editors hebben als taak om EIP's te beoordelen op technische correctheid, opmaakproblemen en het corrigeren van spelling, grammatica en codestijl. Martin Becze, Vitalik Buterin, Gavin Wood en nog een paar anderen waren de oorspronkelijke EIP-editors van 2015 tot eind 2016.

De huidige EIP-editors zijn

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emeritus EIP-editors zijn

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Wilt u EIP-editor worden? Ga dan naar [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

EIP-editors beslissen wanneer een voorstel klaar is om een EIP te worden en ondersteunen EIP-editors bij de verdere ontwikkeling van hun voorstellen. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) helpen bij het organiseren van bijeenkomsten tussen de EIP-editors en de gemeenschap (zie [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Volledig standaardisatieproces met grafiek is beschreven in [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Meer informatie {#learn-more}

Wilt u meer weten over EIP's? Bekijk dan de [website over EIP's](https://eips.ethereum.org/) en [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Hier vindt u enkele nuttige links:

- [Een lijst van elk verbeteringsvoorstel voor Ethereum](https://eips.ethereum.org/all)
- [Een beschrijving van alle EIP-types](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Een beschrijving van alle EIP-statussen](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Educatieve gemeenschapsprojecten {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) - *PEEPanEIP is een educatieve videoserie die verbeteringsvoorstellen voor Ethereum (EIP's) en belangrijke functies van aankomende upgrades bespreekt.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) - *EIPs For Nerds levert uitgebreide overzichten in ELI5-stijl. Hierin staan verschillende verbeteringsvoorstellen voor Ethereum (EIP's), waaronder kern-EIP's en EIP's voor de applicatie-/infrastructuurlaag (ERC's), om lezers te informeren en consensus te bereiken over voorgestelde wijzigingen aan het Ethereum-protocol.*
- [EIPs.wtf](https://www.eips.wtf/) - *EIPs.wtf geeft extra informatie over verbeteringsvoorstellen voor Ethereum (EIP's), zoals hun status, implementatiedetails, gerelateerde pull requests en feedback van de gemeenschap.*
- [EIP.Fun](https://eipfun.substack.com/) - *EIP.Fun brengt het laatste nieuws over verbeteringsvoorstellen voor Ethereum (EIP's), updates over EIP-bijeenkomsten en meer.*
- [EIPs Insight](https://eipsinsight.com/) - *EIPs Insight is een beschrijving van de status van verbeteringsvoorstellen voor Ethereum (EIP's) en statistieken op basis van informatie uit verschillende bronnen.*

## Doe mee {#participate}

Iedereen kan een EIP aanmaken. Voordat er een voorstel kan worden ingediend, moet er eerst [EIP-1](https://eips.ethereum.org/EIPS/eip-1) gelezen worden, waarin het EIP-proces wordt beschreven en hoe je een EIP schrijft. Bovendien moet er feedback worden gevraagd op [Ethereum Magicians](https://ethereum-magicians.org/), waar voorstellen eerst worden besproken met de gemeenschap voordat een concept wordt ingediend.

## Referenties {#references}

<cite class="citation">

Pagina-inhoud deels geleverd via [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) van Hudson Jameson

</cite>
