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
  - Bewaar staking-tokens in je eigen portemonnee
---

## Wat zijn staking-pools? {#what-are-staking-pools}

Staking-pools zijn een gezamenlijke aanpak om veel gebruikers met kleinere hoeveelheden ETH de mogelijkheid te bieden de 32 ETH te verkrijgen die nodig zijn om een set validatorsleutels te activeren. De pooling-functionaliteit wordt oorspronkelijk niet ondersteund binnen het protocol, dus er zijn oplossingen ontwikkeld om aan deze behoefte te voldoen.

Sommige pools werken met smart contracts, waar fondsen kunnen worden gestort op een contract dat uw stake beheert en volgt zonder vertrouwenskwestie en u een token geeft die deze waarde vertegenwoordigt. Andere pools hebben mogelijk geen smart contracts en worden in plaats daarvan via de off-chain beheerd.

## Waarom staken met een pool? {#why-stake-with-a-pool}

Naast de voordelen die we hebben behandeld in onze [inleiding tot staking](/staking/), komt staking met een pool met nog een aantal andere duidelijke voordelen.

<CardGrid>
  <Card title="Lage barrière voor instap" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Stake vandaag nog" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Staking tokens" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Wat te overwegen {#what-to-consider}

Gepoolde of gedelegeerde staking wordt oorspronkelijk niet door het Ethereum-protocol ondersteund, maar gezien de vraag die er bestaat van gebruikers die minder dan 32 ETH willen staken, is er een groeiend aantal oplossingen gebouwd om aan deze vraag te voldoen.

Elke pool en de tools of slimme contracten die ze gebruiken, zijn door verschillende teams uitgebouwd, en aan elke pool zijn voordelen en risico's verbonden. Pools stellen gebruikers in staat hun ETH te ruilen tegen een token dat gestakete ETH vertegenwoordigt. Het token is nuttig omdat gebruikers hiermee elk bedrag aan ETH kunnen omwisselen voor een equivalent bedrag aan yield-bearing token dat een rendement genereert uit de staking-beloningen die worden toegepast op de onderliggende gestakete ETH (en vice versa) op gedecentraliseerde exchanges, ook al blijft de daadwerkelijke ETH gestaket op de consensuslaag. Dit betekent dat swaps heen en weer van een yield-bearing gestaket ETH-product en "ruwe ETH" snel en gemakkelijk zijn en niet alleen beschikbaar in veelvouden van 32 ETH.

Deze gestakete ETH-tokens hebben echter de neiging om kartelachtig gedrag te creëren, waarbij een groot deel van de gestakete ETH onder de controle van een paar gecentraliseerde organisaties terechtkomt in plaats van dat het wordt verspreid over vele onafhankelijke personen. Dit schept voorwaarden voor censuur of waarde-extractie. De gouden standaard voor staking zou altijd moeten zijn: personen die waar mogelijk validators op hun eigen hardware draaien.

[Meer over het risico van stakingtokens](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Hieronder zijn attribuutindicatoren gebruikt om opmerkelijke sterke of zwakke punten te signaleren die een genoemde staking-pool kan hebben. Gebruik deze sectie als referentie voor hoe we deze attributen definiëren terwijl u een pool kiest om u bij aan te sluiten.

<StakingConsiderations page="pools" />

## Onderzoek staking-pools {#explore-staking-pools}

Er zijn verschillende opties beschikbaar om u te helpen met uw installatie. Gebruik de bovenstaande indicatoren om u te helpen de onderstaande tools door te nemen.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Houd rekening met het belang van het kiezen van een service die de [cliëntendiversiteit](/developers/docs/nodes-and-clients/client-diversity/) serieus neemt, omdat dit de veiligheid van het netwerk verbetert en je risico's beperkt. Services waarvan er bewijs is dat ze het gebruik door de meerderheid van de cliënten beperken, worden aangegeven met <em style={{ textTransform: "uppercase" }}>"uitvoeringscliëntendiversiteit"</em> en <em style={{ textTransform: "uppercase" }}>"consensuscliëntendiversiteit."</em>

Heb je een voorstel voor een stakingtool die we hebben gemist? Bekijk ons [productlijstbeleid](/contributing/adding-staking-products/) om te zien of het passend zou zijn en om het ter beoordeling in te dienen.

## Veelgestelde vragen {#faq}

<ExpandableCard title="Hoe verdien ik beloningen?">
Normaal gesproken worden ERC-20-stakingtokens uitgegeven aan stakers en vertegenwoordigen deze de waarde van hun gestakete ETH plus beloningen. Houd in uw achterhoofd dat verschillende pools hun staking-beloningen verdelen onder hun gebruikers via ietwat verschillende methoden, maar dit is wat gebruikelijk is.
</ExpandableCard>

<ExpandableCard title="Wanneer kan ik mijn stake opnemen?">
Nu meteen! De Shanghai/Capella-netwerkupgrade vond plaats in april 2023 en introduceerde stake-opnames. Validatoraccounts die staking-pools ondersteunen, kunnen nu afsluiten en ETH opnemen naar het opgegeven opnameadres. Hierdoor krijg je de mogelijkheid om jouw deel van de stake in te wisselen voor de onderliggende ETH. Informeer bij je provider naar de mate waarin zij deze functionaliteit ondersteunen.

Of pools die gebruik maken van een ERC-20-stakingtoken staan toe dat gebruikers dit token op de open markt kunnen verhandelen. Hiermee kun je je stakingpositie verkopen en effectief 'opnemen' zonder dat je daadwerkelijk ETH uit het stakingcontract verwijdert.

<ButtonLink href="/staking/withdrawals/">Meer over staking-opnames</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Is dit anders dan staking met mijn exchange?">
Er zijn veel overeenkomsten tussen deze gepoolde staking-opties en gecentraliseerde exchanges, zoals de mogelijkheid om kleine hoeveelheden ETH te staken en deze te bundelen om validators te activeren.

In tegenstelling tot gecentraliseerde exchanges maken veel andere gepoolde stakingopties gebruik van slimme contracten en/of stakingtokens. Dit zijn meestal ERC-20-tokens die je in je eigen portemonnee kunt bewaren en die je net als elk ander token kunt kopen of verkopen. Dit biedt een laag van soevereiniteit en veiligheid door u de controle te geven over uw tokens, maar het geeft u nog steeds geen directe controle over de validator-client die namens u attesteert op de achtergrond.

Sommige pooling-opties zijn meer gedecentraliseerd dan andere als het gaat om de nodes waarmee ze ondersteund worden. Om de gezondheid en decentralisatie van het netwerk te bevorderen, worden stakers altijd aangemoedigd om een poolingservice te selecteren die een gedecentraliseerde set node-operators zonder toestemming mogelijk maakt.
</ExpandableCard>

## Verder lezen {#further-reading}

- [De staking-directory van Ethereum](https://www.staking.directory/) - _Eridian en Spacesider_
- [Staking met Rocket Pool - Staking Overview](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking Ethereum With Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido help docs_
