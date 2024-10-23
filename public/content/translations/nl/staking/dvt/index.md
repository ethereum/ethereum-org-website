---
title: Gedistribueerde validatortechnologie
description: Gedistribueerde validatortechnologie maakt de verspreide werking van een Ethereum-validator door verschillende partijen mogelijk.
lang: nl
---

# Gedistribueerde validatortechnologie {#distributed-validator-technology}

Gedistribueerde validatortechnologie (DVT) is een aanpak voor validatorbeveiliging die cruciale management- en ondertekeningsverantwoordelijkheden verdeelt over verschillende groepen, om het aantal zwakke punten te verlagen en de veerkracht van validators te verhogen.

Het doet dit door het **opsplitsen van de privé-sleutel** die gebruikt wordt om een validator te beveiligen **verspreid over vele computers** die georganiseerd zijn in een "cluster". Dit heeft als voordeel dat het heel moeilijk wordt voor een aanvaller om toegang te krijgen tot de sleutel, omdat deze niet in zijn geheel is opgeslagen in één machine. Het laat ook toe dat sommige nodes offline gaan, omdat het benodigde ondertekenen kan worden uitgevoerd door een subset van de machines in iedere cluster. Dit verkleint het aantal zwakke punten in het netwerk en maakt de gehele validatorset robuuster.

![Een diagram dat laat zien hoe een enkele validatorsleutel is opgedeeld in sleutelshares en verdeeld onder meerdere nodes met variërende componenten.](./dvt-cluster.png)

## Waarom hebben we DVT nodig? {#why-do-we-need-dvt}

### Beveiliging {#security}

Validators genereren twee publieke-privé-sleutelparen: validatorsleutel om deel te nemen in consensus en opnamesleutels om toegang te krijgen tot fondsen. Hoewel validators opnamesleutels in koude opslag kunnen beveiligen, moeten hun privé-sleutels 24/7 online zijn. Als de privé-sleutel van een validator gecompromitteerd is, kan een aanvaller de validator controleren, wat kan leiden tot slashing of verlies van de ETH van de staker. DVT kan dit risico helpen verminderen. Zo werkt het:

Door gebruik te maken van DVT, kunnen stakers deelnemen aan staking en tegelijkertijd de privé-sleutel van de validator bewaren in koude opslag. Dit wordt verwezenlijkt door het versleutelen van de originele, volledige validatorsleutel die vervolgens wordt opgesplitst in sleutelshares. De sleutelshares bestaan online en zijn verdeeld over meerdere nodes, wat een gedistribueerde werking van de validator mogelijk maakt. Dit is mogelijk omdat Ethereum-validators BLS-handtekeningen gebruiken die additief zijn. Dit betekent dat de volledige sleutel kan worden gereconstrueerd door het optellen van de onderdelen ervan. Dit stelt de staker in staat om de volledige, originele 'master' validatorsleutel veilig offline te bewaren.

### Geen zwakke punten {#no-single-point-of-failure}

Wanneer een validator verdeeld is over meerdere operators en machines, is het bestand tegen individuele hardware- en softwarestoringen zonder offline te gaan. Het risico op verstoringen kan ook verkleind worden door het gebruik van diverse hardware- en softwareconfiguraties verspreid over de nodes in een cluster. Deze weerbaarheid is niet voorhanden voor validatorconfiguraties met een enkele node - het komt vanuit de DVT-laag.

Als een van de onderdelen van een machine in een cluster ophoudt te werken (als er bijvoorbeeld vier operators in een validatorcluster en één daarvan een specifieke client gebruikt die een bug heeft), zorgen de anderen ervoor dat de validator blijft draaien.

### Decentralisatie {#decentralization}

Het ideale scenario voor Ethereum is om zo veel mogelijk onafhankelijk werkende validators te hebben. Een aantal staking-providers zijn echter erg populair geworden en vertegenwoordigen een aanzienlijk aandeel van de totale hoeveelheid gestakete ETH op het netwerk. DVT maakt het mogelijk voor deze operators om te bestaan en tegelijkertijd de decentralisatie van stake te bewaren. Dit komt omdat de sleutels voor elke validator verdeeld zijn over vele machines en het zou een veel grotere samenspanning vereisen voor een validator om kwaadaardig te worden.

Zonder DVT is het eenvoudiger voor staking-providers om slechts één of twee client-configuraties te ondersteunen voor al hun validators, wat de impact van een client-bug groter maakt. DVT kan worden gebruikt om het risico te spreiden over meerdere client-configuraties en verschillende hardware. Dit creëert weerbaarheid door diversiteit.

**DVT biedt de volgende voordelen aan Ethereum:**

1. **Decentralisatie** van Ethereums proof-of-stake consensus
2. Verzekert het **'live zijn'** van het netwerk
3. Creëert **foutentolerantie** voor validators
4. **Minimaal vertrouwen nodig** voor validatorwerking
5. **Geminimaliseerde slashing**- en downtime-risico's
6. **Verbetert diversiteit** (client, datacenter, locatie, regulering, enz.)
7. **Verbeterde beveiliging** van validatorsleutelbeheer

## Hoe werkt DVT? {#how-does-dvt-work}

Een DVT-oplossing bevat de volgende onderdelen:

- **[Shamir's secret sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validators gebruiken [BLS-sleutels](https://en.wikipedia.org/wiki/BLS_digital_signature). Individuele BLS-'sleutelshares' ('sleutelshares') kunnen worden gecombineerd tot één geaggregeerde sleutel (handtekening). Bij DVT is de privé-sleutel voor een validator de gecombineerde BLS-handtekening van elke operator in de cluster.
- **[Drempelhandtekeningschema](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Bepaalt het aantal individuele sleutelshares dat vereist is voor ondertekeningstaken, bijv. 3 van de 4.
- **[Gedistribueerde sleutelgeneratie (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Cryptografisch proces dat de sleutelshares genereert en wordt gebruikt om de shares van een bestaande of nieuwe validatorsleutel te distribueren naar de nodes in een cluster.
- **[Multiparty computation (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - De volledige validatorsleutel wordt in het geheim gegenereerd met behulp van multiparty computation. De volledige sleutel is nooit bekend bij een individuele operator. Hij/zij kent alleen zijn/haar eigen deel ervan (zijn/haar 'share').
- **Consensusprotocol** - Het consensusprotocol selecteert één node om de blokvoorsteller te zijn. Ze delen het blok met de andere nodes in het cluster, die hun sleutelshares toevoegen aan de geaggregeerde handtekening. Wanneer er voldoende sleutelshares zijn verzameld, wordt het blok op Ethereum voorgesteld.

Gedistribueerde validators beschikken over ingebouwde fouttolerantie en kunnen blijven draaien, zelfs als enkele individuele nodes offline gaan. Dit betekent dat het cluster veerkrachtig is, zelfs als sommige nodes erin kwaadaardig of lui blijken te zijn.

## DVT-toepassingsscenario's {#dvt-use-cases}

DVT heeft aanzienlijke gevolgen voor de bredere staking-industrie:

### Solo stakers {#solo-stakers}

DVT maakt ook niet-custodiale staking mogelijk door je de mogelijkheid te bieden je validatorsleutel te distribueren over externe nodes terwijl de volledige sleutel volledig offline blijft. Dit betekent dat thuis-stakers niet per se hardware-uitgaven hoeven te doen, terwijl het verdelen van de sleutelshares hen kan helpen om zich te wapenen tegen mogelijke hacks.

### Staking as a service (SaaS) {#saas}

Operators (zoals staking pools en institutionele stakers) die veel validators beheren, kunnen DVT gebruiken om hun risico te verminderen. Door hun infrastructuur te distribueren, kunnen ze redundantie toevoegen aan hun activiteiten en de typen hardware die ze gebruiken diversifiëren.

DVT verdeelt verantwoordelijkheid voor het sleutelbeheer over meerdere nodes, wat betekent dat sommige operationele kosten ook gedeeld kunnen worden. DVT kan ook het operationele risico en de verzekeringskosten voor staker-providers verminderen.

### Staking pools {#staking-pools}

Vanwege standaard validatorinstellingen zijn staking pools en liquid staking providers gedwongen om verschillende niveaus van vertrouwen bij één operator te hebben, omdat winsten en verliezen door de hele pool worden gedeeld. Ze zijn ook afhankelijk van operators om de ondertekeningssleutels te beveiligen, omdat ze tot nu toe geen andere optie hadden.

Hoewel er traditioneel inspanningen worden gedaan om risico's te spreiden door stakes te verdelen over meerdere operators, beheert elke operator nog steeds een aanzienlijke stake onafhankelijk. Vertrouwen op één enkele operator brengt enorme risico's met zich mee als deze ondermaats presteert, downtime ondervindt, gecompromitteerd raakt of kwaadaardig handelt.

Door gebruik te maken van DVT wordt het vereiste vertrouwen dat van operators wordt gevraagd aanzienlijk verminderd. **Pools kunnen operators in staat stellen om stakes te houden zonder bewaring van validatorsleutels** (omdat enkel sleutelshares worden gebruikt). Het maakt het ook mogelijk om beheerde stakes te verdelen over meer operators (bijv. in plaats van dat een enkele operator 1000 validators beheert, maakt DVT het mogelijk om die validators collectief door meerdere operators te laten beheren). Uiteenlopende operatorconfiguraties zorgen ervoor dat als er een operator uitvalt, de anderen nog steeds kunnen attesteren. Dit resulteert in redundantie en diversificatie, wat leidt tot betere prestaties en veerkracht terwijl de beloningen worden gemaximaliseerd.

Een ander voordeel van het minimaliseren van het moeten vertrouwen op een enkele operator is dat staking pools meer open en toestemmingsloze deelname van operators kunnen toestaan. Door dit te doen, kunnen diensten hun risico's verkleinen en de decentralisatie van Ethereum ondersteunen door zowel zorgvuldig samengestelde als toestemmingsloze sets van operators te gebruiken, bijvoorbeeld door home- of kleinere stakers te koppelen aan grotere.

## Potentiële nadelen bij het gebtuik van DVT {#potential-drawbacks-of-using-dvt}

- **Bijkomend onderdeel** - het introduceren van een DVT-node voegt nog een extra onderdeel toe dat potentieel vatbaar is voor defecten of kwetsbaarheden. Een manier om dit te beperken is om te streven naar meerdere implementaties van een DVT-node, wat betekent dat er meerdere DVT-clients zijn (net zoals er meerdere clients zijn voor de consensus- en uitvoeringslagen).
- **Operationele kosten** - daar DVT de validator verdeelt over meerdere partijen, zijn er meer nodes nodig voor de werking in plaats van slechts één node, wat hogere operationele kosten met zich meebrengt.
- **Mogelijk verhoogde latentie** - aangezien DVT gebruikmaakt van een consensusprotocol om consensus te bereiken tussen de verschillende nodes die een validator bedienen, kan dit mogelijk leiden tot verhoogde latentie.

## Verder lezen {#further-reading}

- [Specificaties van Ethereum voor gedistribueerde validators (hoog niveau)](https://github.com/ethereum/distributed-validator-specs)
- [Technische specificaties van Ethereum voor gedistribueerde validators](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Demo-app voor Shamir Secret Sharing](https://iancoleman.io/shamir/)
