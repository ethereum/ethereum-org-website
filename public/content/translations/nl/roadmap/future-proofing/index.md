---
title: Het toekomstbestendig maken van Ethereum
description: Deze upgrades verankeren Ethereum als de veerkrachtige, gedecentraliseerde basislaag voor de toekomst, wat deze toekomst ook mag inhouden.
lang: nl
image: /images/roadmap/roadmap-future.png
alt: "Ethereum-roadmap"
template: roadmap
---

Sommige delen van de routekaart zijn niet noodzakelijk om Ethereum verder op te schalen of beter te beveiligen op korte termijn, maar bereiden Ethereum beter voor op stabiliteit en betrouwbaarheid naar de toekomst toe.

## Kwantumresistentie {#quantum-resistance}

Een deel van de [cryptografie](/glossary/#cryptography) die het huidige Ethereum beveiligt, zal in gevaar komen wanneer kwantumcomputing een realiteit wordt. Hoewel kwantumcomputers waarschijnlijk nog tientallen jaren verwijderd zijn van een echte bedreiging voor de moderne cryptografie, wordt Ethereum gebouwd om nog eeuwen veilig te zijn. Dit betekent dat [Ethereum zo snel mogelijk kwantumbestendig](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) moet worden gemaakt.

De uitdaging voor Ethereum-ontwikkelaars is dat het huidige [proof-of-stake](/glossary/#pos)-protocol vertrouwt op een zeer efficiënt handtekeningenschema dat bekend staat bekend als BLS om stemmen op geldige [blocks](/glossary/#block) samen te voegen. Dit handtekeningschema wordt gekraakt door kwantumcomputers, maar de kwantumbestendige alternatieven zijn niet zo efficiënt.

Van de ["KZG"-verbintenisschema's](/roadmap/danksharding/#what-is-kzg) die op verschillende plaatsen bij Ethereum worden gebruikt om cryptografische geheimen te genereren, is bekend dat ze kwetsbaar voor kwantumcomputers zijn. Op dit moment wordt dit omzeild met “vertrouwde systemen” waarbij veel gebruikers willekeurigheid genereren die niet door een kwantumcomputer kan worden opgelost. De ideale oplossing zou echter zijn om kwantumveilige cryptografie te gebruiken. Er zijn twee toonaangevende benaderingen die efficiënte vervangers voor het BLS-schema zouden kunnen worden: [op STARK gebaseerde](https://hackmd.io/@vbuterin/stark_aggregation) en [op lattice gebaseerde](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) ondertekening. **Deze worden nog onderzocht en er worden prototypes van gemaakt**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Ontdek meer over KZG en vertrouwde systemen</ButtonLink>

## Eenvoudiger en efficiënter Ethereum {#simpler-more-efficient-ethereum}

Complexiteit creëert mogelijkheden voor bugs of kwetsbaarheden die kunnen worden uitgebuit door aanvallers. Daarom is een deel van de routekaart het vereenvoudigen van Ethereum en het verwijderen van code die door verschillende upgrades is blijven hangen, maar niet langer nodig is of nu verbeterd kan worden. Een compactere, eenvoudigere codebase is voor ontwikkelaars gemakkelijker te onderhouden en om over te redeneren.

Er zijn verschillende updates die zullen worden uitgevoerd op de [Ethereum Virtual Machine (EVM)](/developers/docs/evm) om hem eenvoudiger en efficiënter te maken. Deze omvatten [het verwijderen van de SELFDESTRUCT-opcode](https://hackmd.io/@vbuterin/selfdestruct) - een zelden gebruikt commando dat niet langer nodig is en in sommige omstandigheden gevaarlijk kan zijn om te gebruiken, vooral in combinatie met andere toekomstige upgrades van het opslagmodel van Ethereum. [Ethereum-clients](/glossary/#consensus-client) ondersteunen ook nog steeds een aantal oude transactietypes die nu volledig verwijderd kunnen worden. De manier waarop [gas](/glossary/#gas) wordt berekend kan ook worden verbeterd en er kunnen efficiëntere methodes worden gebruikt voor het rekenwerk dat ten grondslag ligt aan sommige cryptografische handelingen.

Op dezelfde manier kunnen er updates worden uitgevoerd voor andere onderdelen van de hedendaagse Ethereum-clients. Eén voorbeeld is dat de huidige uitvoerings- en consensusclients een ander type gegevenscompressie gebruiken. Het zou veel gemakkelijker en intuïtiever zijn om gegevens tussen clients te delen als het compressieschema van het hele netwerk gelijk zou zijn.

## Huidige vooruitgang {#current-progress}

De meeste upgrades die nodig zijn om Ethereum klaar te stomen voor de toekomst, bevinden zich **nog in de onderzoeksfase en het kan nog wel enkele jaren duren** voordat ze worden geïmplementeerd. Upgrades zoals het verwijderen van SELFDESTRUCT en het harmoniseren van het compressieschema dat gebruikt wordt in de uitvoerings- en consensusclients zullen waarschijnlijk eerder beschikbaar zijn dan kwantumbestendige cryptografie.

**Verder lezen**

- [Brandstof](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Data structures](/developers/docs/data-structures-and-encoding)
