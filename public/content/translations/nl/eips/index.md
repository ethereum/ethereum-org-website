---
title: Voorstellen ter verbetering van Ethereum (EIPs)
description: De basisinformatie die u nodig heeft om Ethereum-verbeteringsvoorstellen (EIP's) te begrijpen.
lang: nl
---

# Inleiding tot Ethereum-verbeteringsvoorstellen (EIP's) {#introduction-to-ethereum-improvement-proposals-eips}

## Wat zijn EIP's? {#what-are-eips}

[Ethereum Improvement Proposals (EIP's)](https://eips.ethereum.org/) zijn normen die potentiële nieuwe functies of processen voor Ethereum specificeren. EIP's bevatten technische specificaties voor de voorgestelde wijzigingen en fungeren als de 'bron van waarheid' voor de gemeenschap. Netwerkverbeteringen en toepassingsnormen voor Ethereum worden besproken en ontwikkeld via het EIP-proces.

Iedereen binnen de Ethereum-gemeenschap kan een EIP maken. Richtlijnen voor het schrijven van EIP's zijn opgenomen in [EIP 1](https://eips.ethereum.org/EIPS/eip-1). Het EIP moet een beknopte technische specificatie van zijn motivering bieden. De EIP-auteur is verantwoordelijk voor het bouwen van consensus binnen de gemeenschap en het documenteren van afwijkende meningen. Gegeven de hoge technische maatstaf voor het indienen van een goed gevormd EIP, zijn de meeste EIP-auteurs applicatie- of protocolontwikkelaars.

## Waarom zijn EIP's belangrijk? {#why-do-eips-matter}

EIP's spelen een centrale rol in de manier waarop veranderingen plaatsvinden en worden gedocumenteerd over Ethereum. Ze zijn de manier waarop mensen veranderingen kunnen voorstellen, bespreken en aannemen. Er zijn [verschillende soorten EIP's](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), inclusief EIP's voor veranderingen in het protocol op laag niveau die de consensus beïnvloeden en een upgrade van het netwerk vereisen, evenals ERC's voor applicatiestandaarden. Bijvoorbeeld dankzij standaarden voor het maken van tokens, zoals [ERC20](https://eips.ethereum.org/EIPS/eip-20) of [ERC721](https://eips.ethereum.org/EIPS/eip-721), kunnen applicaties die interactie hebben met deze tokens, alle tokens behandelen met dezelfde regels. Dit maakt het eenvoudiger om interoperabele applicaties te creëren.

Elke netwerkupgrade bestaat uit een set EIP's die door elke [Ethereum client](/learn/#clients-and-nodes) op het netwerk geïmplementeerd moet worden. Dit impliceert dat we consensus moeten bereiken met andere clients van het Ethereum Mainnet; client-ontwikkelaars moeten ervoor zorgen dat ze allen de vereiste EIP's hebben geïmplementeerd.

Naast het leveren van een technische specificatie voor veranderingen, zijn EIP's de eenheid waaromheen het bestuur plaatsvindt in Ethereum: iedereen is vrij om er een voor te stellen, vervolgens zullen verschillende belanghebbenden in de gemeenschap debatteren over de vraag of het als standaard moet worden aangenomen of moet worden opgenomen in een upgrade van het netwerk. Daar niet-core EIP's niet door alle applicaties hoeven te worden aangenomen (u kunt bijvoorbeeld een niet-[ERC20 token](https://eips.ethereum.org/EIPS/eip-20)maken), maar core EIP's breed moeten worden aangenomen (omdat alle nodes moeten worden bijgewerkt om deel te blijven uitmaken van hetzelfde netwerk), vereisen core EIP's een bredere consensus binnen de gemeenschap dan niet-core EIP's.

## Geschiedenis van EIP's {#history-of-eips}

De [Ethereum Improvement Proposals (EIP's) GitHub repository](https://github.com/ethereum/EIPs) is gemaakt in oktober 2015. Het EIP-proces is gebaseerd op het proces van de [Bitcoin-verbeteringsvoorstellen (BIP's)](https://github.com/bitcoin/bips), dat zelf is gebaseerd op het proces van de [Python-verbeteringsvoorstellen (PEP's)](https://www.python.org/dev/peps/).

EIP-editors worden belast met het proces voor het beoordelen van EIP's op technische deugdelijkheid, juiste spelling/grammatica en codestijl. Martin Becze, Vitalik Buterin, Gavin Wood en nog een paar anderen waren de oorspronkelijke EIP-editors van 2015 tot eind 2016. De huidige EIP-editors zijn:

- Alex Beregszaszi (EWASM/Ethereum Foundation)
- Greg Colvin (Community)
- Casey Detrio (EWASM/Ethereum Foundation)
- Matt Garnett (Quilt)
- Hudson James (Ethereum Foundation)
- Nick Johnson (ENS)
- Nick Savers (Community)
- Micah Zoltu (Community)

EIP-editors samen met gemeenschapsleden van [Ethereum Cat Herders](https://ethereumcatherders.com/) en [Ethererum Magicians](https://ethereum-magicians.org/) beslissen welke EIP's geïmplementeerd worden, ze zijn verantwoordelijk voor de facilitering van EIP's en het verplaatsen van de EIP's naar de fase "Final" of "Withdrawn".

Volledig standaardisatieproces met grafiek is beschreven in [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Meer informatie {#learn-more}

Als u meer wilt lezen over EIP's, bekijk dan de [EIP-website](https://eips.ethereum.org/) waar u extra informatie kunt vinden, waaronder:

- [De verschillende soorten EIP's](https://eips.ethereum.org/)
- [Een lijst van elk EIP dat is gemaakt](https://eips.ethereum.org/all)
- [EIP-statussen en wat ze betekenen](https://eips.ethereum.org/)

## Doe mee {#participate}

Iedereen kan EIP of ERC maken, hoewel u [EIP-1](https://eips.ethereum.org/EIPS/eip-1) moet lezen waarin het EIP-proces beschreven staat, wat is EIP, soorten EIP's, wat het EIP-document moet bevatten, EIP-opmaak en -sjabloon, lijst van EIP-editors en alles wat u over EIP's moet weten voordat u er een maakt. Uw nieuwe EIP moet een nieuwe functie definiëren die niet echt complex is en niet super niche en die kan worden gebruikt door projecten in het Ethereum-ecosysteem. Het moeilijkste deel is facilitering; u als auteur moet mensen rond uw EIP faciliteren, feedback verzamelen, artikelen schrijven die de problemen beschrijven die uw EIP oplost en samenwerken met projecten om uw EIP te implementeren.

Als u geïnteresseerd bent om de besprekingen te volgen of uw input over EIP's te delen, bekijk het [Ethereum Magicians-forum](https://ethereum-magicians.org/), waar EIP's worden besproken met de gemeenschap.

Zie ook:

- [Hoe een EIP maken](https://eips.ethereum.org/EIPS/eip-1)

## Referenties {#references}

<cite class="citation">

Pagina-inhoud deels geleverd via [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) van Hudson Jameson

</cite>
