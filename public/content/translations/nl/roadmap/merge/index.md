---
title: De merge
description: Lees meer over de merge - wanneer het hoofdnet van Ethereum wordt gevoegd bij het gecoördineerde proof-of-stake systeem Beacon Chain.
lang: nl
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: Uiteindelijk zal het huidige Ethereum-hoofdnet "fuseren" met het Beacon Chain proof-of-stake systeem.
summaryPoint2: Dit markeert het einde van proof-of-work voor Ethereum, en de volledige overgang naar proof-of-stake.
summaryPoint3: Het is de bedoeling dat dit voorafgaat aan de uitrol van shardketens.
summaryPoint4: Vroeger noemden we dit "de docking."
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Deze upgrade bevat de officiële overschakeling naar proof-of-stake consensus. Dit elimineert de noodzaak van energie-intensieve mining en in plaats daarvan beveiligt het het netwerk met gestakete ether. Een waarlijk opwindende stap in het realiseren van de <a href="/roadmap/vision/">Ethereum-visie</a> - schaalbaarder, veiliger en duurzamer.
</UpgradeStatus>

## Wat is de merge? {#what-is-the-docking}

Het is belangrijk om te onthouden dat aanvankelijk de [Beacon Chain](/roadmap/beacon-chain/) apart werd verzonden van het [hoofdnet](/glossary/#mainnet) - de keten die we vandaag gebruiken. Het Ethereum-hoofdnet blijft beveiligd door [proof-of-work](/developers/docs/consensus-mechanisms/pow/), zelfs terwijl de Beacon Chain parallel draait met [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). De merge is het moment wanneer beide systemen eindelijk samenkomen.

Stel je voor dat Ethereum een ruimteschip is dat nog niet helemaal klaar is voor een interstellaire reis. Met de Beacon Chain heeft de gemeenschap een nieuwe motor en een geharde romp gebouwd. Als het zover is, zal het huidige schip aan dit nieuwe systeem koppelen en samensmelten tot één schip, klaar om serieuze lichtjaren te overbruggen en het heelal in te gaan.

## Samenvoegen met het hoofdnet {#docking-mainnet}

Als het klaar is, zal het Ethereum-hoofdnet "fuseren" met de Beacon Chain en zijn eigen shard worden die proof-of-stake gebruikt in plaats van [proof-of-work](/developers/docs/consensus-mechanisms/pow/).

Het hoofdnet zal de mogelijkheid om slimme contracten uit te voeren in het proof-of-stake systeem brengen, plus de volledige geschiedenis en huidige staat van Ethereum, om ervoor te zorgen dat de overgang soepel verloopt voor alle ETH-houders en -gebruikers.

## Na de merge {#after-the-merge}

Dit zal het einde betekenen van proof-of-work voor Ethereum en het tijdperk beginnen van een duurzamer, milieuvriendelijker Ethereum. Op dit punt zal Ethereum een stap dichter zijn bij het bereiken van de volledige schaalgrootte, veiligheid en duurzaamheid zoals geschetst in de [Ethereum-visie](/roadmap/vision/).

Het is belangrijk op te merken dat een implementatiedoel van de merge eenvoud is, om zo de overgang van proof-of-work naar proof-of-stake te versnellen. De ontwikkelaars richten hun inspanningen op deze overgang en minimaliseren extra functies die dit doel kunnen vertragen.

**Dit betekent dat een paar functies, zoals de mogelijkheid om gestakete ETH terug te trekken, iets langer zullen moeten wachten nadat de merge is voltooid.**De plannen omvatten een "opschoning"-upgrade om deze functies aan te pakken, die naar verwachting zeer snel zal gebeuren nadat de merge is voltooid.

## Relatie tussen upgrades {#relationship-between-upgrades}

Alle Ethereum-upgrades zijn ietwat met elkaar verbonden. Laten we daarom samenvatten hoe de merge zich verhoudt tot de andere upgrades.

### De merge en de Beacon Chain {#docking-and-beacon-chain}

Zodra de merge plaatsvindt, zullen stakers worden toegewezen om het Ethereum-hoofdnet te valideren. [Mining](/developers/docs/consensus-mechanisms/pow/mining/) zal niet langer nodig zijn, dus miners zullen waarschijnlijk hun inkomsten investeren in het staken in het nieuwe proof-of-stake systeem.

<ButtonLink href="/roadmap/beacon-chain/">
  De Baken Ketting
</ButtonLink>

### De merge en de opschoning na de merge {#merge-and-post-merge-cleanup}

Onmiddellijk na de merge zullen sommige functies, zoals het terugtrekken van gestakete ETH, nog niet ondersteund worden. Deze zijn gepland voor een latere upgrade die kort na de merge zal volgen.

Blijf op de hoogte met de [EF-blog voor onderzoek en ontwikkeling](https://blog.ethereum.org/category/research-and-development/). Voor degenen die nieuwsgierig zijn, lees meer over [What Happens After the Merge](https://youtu.be/7ggwLccuN5s?t=101), gepresenteerd door Vitalik op het ETHGlobal-evenement in april 2021.

### De merge en shardketens {#docking-and-shard-chains}

Oorspronkelijk was het plan om aan shardketens te werken voor de merge, om de schaalbaarheid aan te pakken. Maar met de opkomst van [laag 2-schalingsoplossingen](/developers/docs/scaling/#layer-2-scaling) is de prioriteit verschoven naar het omwisselen van proof-of-work naar proof-of-stake via de merge.

Dit zal een voortdurende beoordeling zijn van de gemeenschap over de noodzaak van mogelijk meerdere rondes van shardketens om eindeloze schaalbaarheid mogelijk te maken.

<ButtonLink href="/roadmap/danksharding/">
  Shardketens
</ButtonLink>

## Meer informatie {#read-more}

<MergeArticleList />
