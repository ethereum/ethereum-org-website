---
title: Een beter beveiligd Ethereum
description: Ethereum is het veiligste en meest gedecentraliseerde smart contractplatform dat er bestaat. Er kunnen echter nog steeds verbeteringen worden aangebracht zodat Ethereum tot ver in de toekomst bestand blijft tegen elke vorm van aanvallen.
lang: nl
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-roadmap"
template: roadmap
---

**Ethereum is nu al een zeer veilig**, gedecentraliseerd [smart contract](/glossary/#smart-contract)-platform. Toch zijn er nog steeds verbeteringen mogelijk, zodat Ethereum tot ver in de toekomst bestand blijft tegen alle mogelijke soorten aanvallen. Deze verbeteringen omvatten subtiele veranderingen in de manier waarop [Ethereum-clients](/glossary/#consensus-client) omgaan met concurrerende [blocks](/glossary/#block), evenals het verhogen van de snelheid waarmee het netwerk blocks als ["gefinaliseerd"](/developers/docs/consensus-mechanisms/pos/#finality) beschouwt (wat betekent dat ze niet kunnen worden gewijzigd zonder extreme economische verliezen voor een aanvaller).

Er zijn ook verbeteringen die het censureren van transacties veel moeilijker maken door de indieners van blocks blind te maken voor de werkelijke inhoud van hun blocks, en nieuwe manieren om te identificeren wanneer een client aan het censureren is. Samen zullen deze verbeteringen het [proof-of-stake](/glossary/#pos) protocol upgraden zodat gebruikers, van individuen tot bedrijven, direct vertrouwen hebben in hun apps, gegevens en activa op Ethereum.

## Opnames staken {#staking-withdrawals}

De upgrade van [proof-of-work](/glossary/#pow) naar proof-of-stake begon met Ethereum-pioniers die hun ETH hebben "gestaket" in een depositocontract. Deze ETH wordt gebruikt om het netwerk te beschermen. Er is een tweede update uitgevoerd op 12 april 2023 om het mogelijk te maken om de gestakete ETH op te nemen. Sindsdien kunnen validators vrij ETH staken of opnemen.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Lees meer over opnames</ButtonLink>

## Verdediging tegen aanvallen {#defending-against-attacks}

Er kunnen verbeteringen worden aangebracht in het proof-of-stake-protocol van Ethereum. Eén hiervan staat bekend als [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739). Dit is een veiliger [forkkeuze](/glossary/#fork)-algoritme dat bepaalde geavanceerde soorten aanvallen moeilijker maakt.

Het verkorten van de tijd die Ethereum nodig heeft om blocks te [finaliseren](/glossary/#finality) zorgt wellicht voor een betere gebruikerservaring en voorkomt gesofisticeerde "reorg"-aanvallen, waarbij aanvallers zeer recente blocks proberen te herschikken om winst er uit te halen of bepaalde transacties te censureren. [**Single slot-finaliteit (SSF)**](/roadmap/single-slot-finality/) is een **manier om de finaliteitsvertraging te minimaliseren**. Op dit moment zijn er blocks ter waarde van 15 minuten die een aanvaller theoretisch andere validators kan laten herconfigureren. Met SSF zijn dat er 0. Gebruikers, van individuen tot apps en crypto-uitwisselingen, profiteren van de snelle zekerheid dat hun transacties niet worden ongedaan gemaakt en het netwerk profiteert van het feit dat een hele klasse aanvallen wordt tegengehouden.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Lees meer over single slot-finaliteit</ButtonLink>

## Verdediging tegen censuur {#defending-against-censorship}

Decentralisatie voorkomt dat individuen of kleine [validatorgroepen](/glossary/#validator) te veel invloed krijgen. Nieuwe stakingtechnologieën kunnen ervoor zorgen dat de validators van Ethereum zo gedecentraliseerd mogelijk blijven, terwijl ze ook worden beschermd tegen hardware-, software- en netwerkstoringen. Dit omvat ook software die de validatorverantwoordelijkheden verdeelt over verschillende [nodes](/glossary/#node). Dit staat bekend als **distributed validator technology (DVT)**. [Stakingpools](/glossary/#staking-pool) worden gestimuleerd om DVT te gebruiken omdat het verschillende computers in staat stelt om gezamenlijk deel te nemen aan validatie, wat zorgt voor redundantie en fouttolerantie. Het verdeelt ook validatorsleutels over verschillende systemen, in plaats van dat één operator meerdere validators uitvoert. Dit maakt het moeilijker voor oneerlijke operators om aanvallen op Ethereum te coördineren. Over het algemeen is het idee om veiligheidsvoordelen te behalen door validators als _gemeenschappen_ uit te voeren in plaats van als individuen.

<ButtonLink variant="outline-color" href="/staking/dvt/">Lees meer over distributed validator technology</ButtonLink>

Het implementeren van **de scheiding tussen voorstellers en bouwers (proposer-builder separation, PBS)** verbetert de ingebouwde verdediging van Ethereum tegen censuur drastisch. PBS staat één validator toe om een block te creëren en een andere om het uit te zenden over het netwerk van Ethereum. Dit zorgt ervoor dat de winsten van professionele, winstmaximaliserende blockbouwalgoritmes eerlijker worden verdeeld over het netwerk, **waardoor voorkomen wordt dat de stake zich na verloop van tijd concentreert** bij de best presterende institutionele stakers. De blockaanbieder kiest de meest winstgevende block die hem/haar wordt aangeboden door een markt van blockbouwers. Om te kunnen censureren, zou een blockvoorsteller vaak een minder winstgevende block moeten kiezen, wat **economisch irrationeel zou zijn en ook duidelijk voor de rest van de validators zou moeten zijn** op het netwerk.

Er bestaan mogelijke toevoegingen aan PBS, zoals versleutelde transacties en inclusielijsten, die de censuurbestendigheid van Ethereum verder kunnen verbeteren. Deze maken de blockbouwer en -voorsteller blind voor de daadwerkelijke transacties in hun blocks.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Lees meer over scheiding tussen voorstellers en bouwers</ButtonLink>

## Bescherming van validators {#protecting-validators}

Het is mogelijk dat een gesofisticeerde aanvaller aankomende validators kan identificeren en ze kan spammen om te voorkomen dat ze blocks voorstellen. Dit staat bekend als een **denial of service (DoS)**-aanval. Het implementeren van [**geheime leidersselectie (secret leader election, SLE)**](/roadmap/secret-leader-election) biedt bescherming tegen dit type aanval door te voorkomen dat blockvoorstellers vooraf bekend zijn. Dit gebeurt door een reeks cryptografische verbintenissen die kandidaat-blockvoorstellers vertegenwoordigen voortdurend door elkaar te halen en hun volgorde te gebruiken om te bepalen welke validator wordt geselecteerd, en wel op een zodanige manier dat alleen de validators zelf hun volgorde van tevoren kennen.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Ontdek meer over geheime leidersverkiezing</ButtonLink>

## Huidige vooruitgang {#current-progress}

**Veiligheidsupgrades op de routekaart bevinden zich in een vergevorderd onderzoeksstadium**, maar zullen naar verwachting pas over enige tijd worden geïmplementeerd. De volgende stappen voor view-merge, PBS, SSF en SLE is het voltooien van een specificatie en beginnen met het bouwen van prototypes.
