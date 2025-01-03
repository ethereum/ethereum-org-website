---
title: De gebruikerservaring verbeteren
description: Voor de meeste mensen is het nog steeds te moeilijk om Ethereum te gebruiken. Om een massaal gebruik aan te moedigen, moet Ethereum de toegangsbarrières drastisch verlagen. Gebruikers moeten kunnen profiteren van gedecentraliseerde, toestemmingsvrije en censuurbestendige toegang tot Ethereum, maar dit moet net zo eenvoudig zijn als het gebruik van een traditionele web2-app.
lang: nl
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum-roadmap"
template: roadmap
---

**Het gebruik van Ethereum moet worden vereenvoudigd**, van het beheren van [sleutels](/glossary/#key) en [wallets](/glossary/#wallet) tot het starten van transacties. Om een massaal gebruik te faciliteren, moet Ethereum het gebruiksgemak drastisch verhogen, zodat gebruikers toestemmingsvrije en censuurbestendige toegang tot Ethereum kunnen ervaren met de eenvoudige ervaring van het gebruik van [Web2](/glossary/#web2)-apps.

## Voorbij seed phrases {#no-more-seed-phrases}

Ethereum-accounts worden beschermd door een sleutelpaar dat wordt gebruikt om accounts te identificeren (publieke sleutel) en berichten te ondertekenen (privésleutel). Een privésleutel is als een hoofdwachtwoord. Hiermee krijgt men volledige toegang tot een Ethereum-account. Dit is een andere manier van werken voor mensen die meer bekend zijn met banken en Web2-apps die namens een gebruiker rekeningen beheren. Om ervoor te zorgen dat Ethereum op grote schaal wordt gebruikt zonder afhankelijk te zijn van gecentraliseerde derde partijen, moet er een eenvoudige, moeiteloze manier zijn voor een gebruiker om zijn/haar activa in bewaring te nemen en controle te houden over zijn/haar gegevens zonder dat hij/zij iets hoeft te begrijpen van cryptografie met publiek-private sleutels en sleutelbeheer.

De oplossing hiervoor is het gebruik van [smart contract](/glossary/#smart-contract)-wallets voor interactie met Ethereum. Smart contract-wallets creëren manieren om accounts te beschermen als de sleutels verloren gaan of gestolen worden, bieden mogelijkheden voor een betere opsporing van fraude en verdediging, en geven wallets de mogelijkheid tot nieuwe functies. Hoewel smart contract-wallets vandaag de dag bestaan, zijn ze lastig te bouwen omdat het Ethereumprotocol ze beter moet ondersteunen. Deze extra ondersteuning staat bekend als accountabstractie.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Meer over accountabstractie</ButtonLink>

## Nodes voor iedereen

Gebruikers die [nodes](/glossary/#node) uitvoeren, hoeven derde partijen niet te vertrouwen om hen van gegevens te voorzien. Bovendien kunnen ze snel, vertrouwelijk en toestemmingsvrij communiceren met de Ethereum-[blockchain](/glossary/#blockchain). Op dit moment vereist het uitvoeren van een node echter technische kennis en veel schijfruimte, wat betekent dat veel mensen moeten vertrouwen op tussenschakels.

Er zijn verschillende upgrades die het uitvoeren van nodes veel eenvoudiger en veel minder bronnenintensief maken. De manier waarop gegevens worden opgeslagen, zal veranderen om een meer ruimtebesparende structuur te gebruiken die bekend staat als een **Verkle Tree**. Met [statusloosheid](/roadmap/statelessness) of het [verlopen van gegevens](/roadmap/statelessness/#data-expiry) hoeven Ethereum-nodes ook geen kopie van de volledige Ethereum-statusgegevens op te slaan, wat de behoefte aan harde schijfruimte drastisch vermindert. [Lichte nodes](/developers/docs/nodes-and-clients/light-clients/) zullen in de toekomst veel voordelen bieden ten opzichte van een volledige node. Ze kunnen echter gemakkelijk draaien op mobiele telefoons of in eenvoudige browser-apps.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Ontdek meer over Verkle Trees</ButtonLink>

Met deze upgrades worden de obstakels voor het uitvoeren van een node effectief tot nul gereduceerd. Gebruikers zullen kunnen profiteren van een beveiligde, toestemmingsvrije toegang tot Ethereum zonder merkbare schijfruimte of CPU op hun computer of mobiele telefoon op te hoeven offeren. Ook hoeven ze niet afhankelijk te zijn van derde partijen voor gegevens- of netwerktoegang wanneer ze apps gebruiken.

## Huidige vooruitgang {#current-progress}

Smart contract-wallets zijn al beschikbaar, maar er zijn meer upgrades nodig om ze zo gedecentraliseerd en toestemmingsvrij mogelijk te maken. EIP-4337 is een volwaardig voorstel dat geen veranderingen aan het protocol van Ethereum vereist. Het belangrijkste smart contract dat nodig is voor EIP-4337 werd **gelanceerd in maart 2023**.

**Een volledige statusloosheid bevindt zich nog in de onderzoeksfase** en het gaat waarschijnlijk nog een paar jaar duren wanneer dit wordt geïmplementeerd. Er staan verschillende mijlpalen op de weg naar een volledige statusloosheid, zoals het verlopen van gegevens, die eerder kunnen worden geïmplementeerd. Andere punten op de routekaart, zoals [Verkle Trees](/roadmap/verkle-trees/) en [de scheiding tussen voorstellers en bouwers](/roadmap/pbs/) moeten eerst worden aangepakt.

Verkle Tree-testnetten zijn reeds operationeel en de volgende fase is het uitvoeren van Verkle Tree-clients op private en vervolgens publieke testnetten. U kunt helpen de voortgang te versnellen door contracten op de testnets te implementeren of testnetclients uit te voeren.
