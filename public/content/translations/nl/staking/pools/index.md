---
title: Gepoolde staking
description: Een overzicht van hoe u aan de slag kunt met gepoolde ETH-staking
lang: nl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie de neushoorn die in het zwembad zwemt.
sidebarDepth: 2
summaryPoints:
  - Stake en verdien beloningen met een willekeurig aantal ETH, door samen te werken met anderen
  - Sla het moeilijke deel over en vertrouw validatoractiviteiten aan een derde toe
  - Bewaar liquiditeitstokens in uw eigen portemonnee
---

## Wat zijn staking-pools? {#what-are-staking-pools}

Staking-pools zijn een gezamenlijke aanpak om veel gebruikers met kleinere hoeveelheden ETH de mogelijkheid te bieden de 32 ETH te verkrijgen die nodig zijn om een set validatorsleutels te activeren. De pooling-functionaliteit wordt oorspronkelijk niet ondersteund binnen het protocol, dus er zijn oplossingen ontwikkeld om aan deze behoefte te voldoen.

Sommige pools werken met smart contracts, waar fondsen kunnen worden gestort op een contract dat uw stake beheert en volgt zonder vertrouwenskwestie en u een token geeft die deze waarde vertegenwoordigt. Andere pools hebben mogelijk geen smart contracts en worden in plaats daarvan via de off-chain beheerd.

## Waarom staken met een pool? {#why-stake-with-a-pool}

Naast de voordelen die we hebben behandeld in onze [inleiding tot staking](/staking/), komt staking met een pool met nog een aantal andere duidelijke voordelen.

<CardGrid>
  <Card title="Lage barrière voor instap" emoji="🐟">
    Bent u geen whale? Geen probleem. De meeste staking-pools laten u vrijwel elke hoeveelheid ETH staken door samen te werken met andere stakers, in tegenstelling tot solo staking waar u 32 ETH voor nodig heeft.
  </Card>
  <Card title="Stake vandaag nog" emoji=":stopwatch:">
    Staken met een pool is net zo makkelijk als een token swap. U hoeft zich geen zorgen te maken over hardware-installatie en node-onderhoud. Pools maken het mogelijk voor u om uw ETH te storten, waardoor node-operators validators kunnen uitvoeren. Beloningen worden vervolgens verdeeld over alle bijdragers, minus een vergoeding voor de node-activiteiten.
  </Card>
  <Card title="Liquiditeitstokens" emoji=":droplet:">
    Veel staking-pools geven een token dat een claim op uw gestakete ETH en de beloningen die het genereert, vertegenwoordigt. Dit stelt u in staat om gebruik te maken van uw gestakete ETH, bijvoorbeeld als onderpand in DeFi-applicaties.
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## Wat te overwegen {#what-to-consider}

Gepoolde of gedelegeerde staking wordt oorspronkelijk niet door het Ethereum-protocol ondersteund, maar gezien de vraag die er bestaat van gebruikers die minder dan 32 ETH willen staken, is er een groeiend aantal oplossingen gebouwd om aan deze vraag te voldoen.

Elke pool en de tools of smart contracts die ervoor gebruikt worden, zijn door verschillende teams opgebouwd, en elke pool heeft zijn eigen risico's en voordelen.

Hieronder zijn attribuutindicatoren gebruikt om opmerkelijke sterke of zwakke punten te signaleren die een genoemde staking-pool kan hebben. Gebruik deze sectie als referentie voor hoe we deze attributen definiëren terwijl u een pool kiest om u bij aan te sluiten.

<StakingConsiderations page="pools" />

## Onderzoek staking-pools {#explore-staking-pools}

Er zijn verschillende opties beschikbaar om u te helpen met uw installatie. Gebruik de bovenstaande indicatoren om u te helpen de onderstaande tools door te nemen.

<InfoBanner emoji="⚠️" isWarning>
Houd rekening met het belang van het kiezen van een service die de <a href="/developers/docs/nodes-and-clients/client-diversity/">diversiteit van clients</a> serieus neemt, omdat dit de veiligheid van het netwerk verbetert en uw risico's beperkt. Services die bewijs hebben van het beperken van het gebruik van meerderheid-clients, zijn gemarkeerd als <em style={{ textTransform: "uppercase" }}>"diverse clients."</em>
</InfoBanner>

<StakingProductsCardGrid category="pools" />

Heeft u een suggestie voor een staking-tool die we hebben gemist? Bekijk ons [productlijstbeleid](/contributing/adding-staking-products/) om te zien of het een goede fit is en om het ter beoordeling in te dienen.

## Veelgestelde vragen {#faq}

<ExpandableCard title="Hoe verdien ik beloningen?">
Meestal worden ERC-20-liquiditeitstokens uitgegeven aan stakers die de waarde van hun gestakete ETH plus beloningen vertegenwoordigen. Houd in uw achterhoofd dat verschillende pools hun staking-beloningen verdelen onder hun gebruikers via ietwat verschillende methoden, maar dit is wat gebruikelijk is.
</ExpandableCard>

<ExpandableCard title="Wanneer kan ik mijn stake opnemen?">

Fondsen opnemen van een Ethereum-validator is momenteel niet mogelijk, wat de mogelijkheid beperkt om uw liquiditeitstokens in te wisselen voor de ETH-beloningen die in de consensuslaag vergrendeld zitten.

Of pools die gebruik maken van een ERC-20-liquiditeitstoken kunnen gebruikers dit token in de open markt laten verhandelen, waardoor u uw staking-positie kunt verkopen zonder daadwerkelijk ETH te verwijderen uit het staking-contract.
</ExpandableCard>

<ExpandableCard title="Is dit anders dan staking met mijn exchange?">
Er zijn veel overeenkomsten tussen deze gepoolde staking-opties en gecentraliseerde exchanges, zoals de mogelijkheid om kleine hoeveelheden ETH te staken en deze te bundelen om validators te activeren.

In tegenstelling tot gecentraliseerde exchanges gebruiken veel andere gepoolde staking-opties smart contracts en/of liquiditeitstokens, die meestal ERC-20-tokens zijn die in uw eigen portemonnee kunnen worden bewaard en net als elke andere token kunnen worden gekocht of verkocht. Dit biedt een laag van soevereiniteit en veiligheid door u de controle te geven over uw tokens, maar het geeft u nog steeds geen directe controle over de validator-client die namens u attesteert op de achtergrond.

Sommige pooling-opties zijn meer gedecentraliseerd dan andere als het gaat om de nodes waarmee ze ondersteund worden. Om de gezondheid en decentralisatie van het netwerk te bevorderen, worden stakers altijd aangemoedigd om een poolingservice te selecteren die een gedecentraliseerde set node-operators zonder toestemming mogelijk maakt.
</ExpandableCard>

## Verder lezen {#further-reading}

- [Staking met Rocket Pool - Staking Overview](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking Ethereum With Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido help docs_
