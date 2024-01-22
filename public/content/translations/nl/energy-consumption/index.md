---
title: Ethereum-energieverbruik
description: De basisinformatie die u nodig heeft om het energieverbruik van Ethereum te begrijpen.
lang: nl
---

# Ethereum-energieverbruik {#introduction}

De huidige energieuitgaven van Ethereum met [proof-of-work](/developers/docs/consensus-mechanisms/#proof-of-work) zijn te hoog en moeilijk te onderhouden. Het oplossen van de energieuitgaven zonder veiligheid en decentralisatie op te offeren is een belangrijke technische uitdaging en is al jaren een speerpunt van onderzoek en ontwikkeling. Laten we onderzoeken waarom Ethereum een grote invloed op het milieu heeft gehad en hoe de volgende netwerkupgrade naar [proof-of-stake](/developers/docs/consensus-mechanisms/pos) dit drastisch zal veranderen.

## Energie beveiligt het netwerk {#energy-secures-the-network}

Transacties op de Ethereum-blockchain worden gevalideerd door [miners](/developers/docs/consensus-mechanisms/pow/mining). Miners bundelen transacties in geordende blokken en voegen ze toe aan de Ethereum-blockchain. De nieuwe blokken worden uitgezonden naar alle andere nodebeheerders die de transacties onafhankelijk uitvoeren en controleren of ze geldig zijn. Elke oneerlijkheid toont aan dat er sprake is van inconsistentie tussen verschillende nodes. "Eerlijke" blokken worden toegevoegd aan de blockchain en worden een onveranderlijk deel van de geschiedenis.

De mogelijkheid voor miners om een nieuw blok toe te voegen werkt alleen zolang er kosten zijn verbonden aan het minen en zolang het onvoorspelbaar is welke specifieke node de volgende blok toevoegt. Er wordt voldaan aan deze condities door het opleggen van proof-of-work (PoW). Om in aanmerking te komen voor het indienen van een transactieblok, moet een miner een willekeurige rekenkundige puzzel sneller oplossen dan elke andere miner. Het oplossen van deze puzzel creëert concurrentie tussen miners en kosten in de vorm van energieuitgaven. Om de blockchain met succes te frauderen zou een oneerlijke miner consequent de proof-of-work-race moeten winnen, wat zeer onwaarschijnlijk en veel te duur is.

Ethereum gebruikt dit proof-of-work-principe sinds zijn ontstaan. De migratie van proof-of-work naar proof-of-stake is altijd een fundamentele doelstelling van Ethereum geweest. Het ontwikkelen van een proof-of-stake-systeem dat zich houdt aan de kernbeginselen van veiligheid en decentralisatie van Ethereum is echter niet triviaal. Er zijn veel onderzoeken en doorbraken nodig geweest op het gebied van cryptografie, cryptoeconomie en mechanismeontwerp om tot het punt te komen waarop de overgang mogelijk is.

## Energie-uitgaven voor proof-of-work {#proof-of-work}

Proof-of-work is een solide manier om het netwerk te beveiligen en eerlijke veranderingen af te dwingen van de blockchain, maar het is om verschillende redenen problematisch. Aangezien het recht om een blok te minen het oplossen van een willekeurige computerpuzzel vereist, kunnen miners hun kans op succes vergroten door te investeren in krachtigere hardware. Dit zorgt ervoor dat miners steeds krachtigere hardware gaan gebruiken die steeds meer energie verbruikt. Het proof-of-work-protocol van Ethereum heeft momenteel een totaal jaarlijks energieverbruik dat ongeveer gelijk is aan dat van Finland <sup>[^1]</sup> en een koolstofvoetafdruk vergelijkbaar met Zwitserland<sup>[^1]</sup>.

## Proof-of-stake {#proof-of-stake}

Een groenere toekomst voor Ethereum wordt al gebouwd in de vorm van een [**proof-of-stake (PoS)** chain](/roadmap/beacon-chain/). Onder [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) is het willekeurig oplossen van puzzels niet nodig. Het verwijderen van puzzeloplossingen vermindert drastisch de energieuitgaven die nodig zijn om het netwerk te beveiligen. Miners worden vervangen door validators die dezelfde functie uitvoeren, behalve dat in plaats van hun activa op voorhand uit te geven in de vorm van computerwerk, gaan ze ETH staken als onderpand tegen oneerlijk gedrag. Als de validator lui is (offline terwijl hij/zij een validatiedienst zou moeten uitvoeren), kan zijn/haar gestakete ETH langzaam verdwijnen, terwijl oneerlijk gedrag er waarschijnlijk toe leidt dat de gestakete activa worden weggenomen. Dit zorgt ervoor dat de validators actief en eerlijk gaan meewerken met het beveiligen van het netwerk.

Op dezelfde manier als bij proof-of-work, zou een kwaadaardige entiteit ten minste 51 procent van de totale hoeveelheid ETH die gestaket is in het netwerk nodig zijn om een [aanval van 51%](/glossary/#51-attack) uit te voeren. Maar anders dan bij proof-of-work, waar het potentiële verlies van een mislukte aanval alleen de kosten is van het genereren van de hash-kracht die nodig is voor het minen, bij proof-of-stake is het mogelijke verlies van een aanval de totale hoeveelheid ETH die wordt gebruikt als onderpand. Deze ontmoedigende structuur maakt netwerkbeveiliging met proof-of-stake mogelijk, terwijl het niet langer nodig is om energie te besteden aan willekeurige berekeningen. Gedetailleerde uitleg van de netwerkbeveiliging onder proof-of-stake kan [hier](/developers/docs/consensus-mechanisms/pos/) en [hier](https://vitalik.ca/general/2017/12/31/pos_faq.html) worden gevonden.

## De merge {#the-merge}

Er is een functionele proof-of-stake-keten genaamd de [Beacon Chain](/roadmap/beacon-chain/) die sinds december 2020 loopt en die de levensvatbaarheid van het proof-of-stake-protocol aantoont. De merge verwijst naar het moment waarop Ethereum proof-of-work achterlaat en proof-of-stake volledig accepteert. The Merge is expected to happen ~Q3/Q4 2022. [Meer over de merge](/roadmap/merge/).

## Energie-uitgaven van proof-of-stake {#proof-of-stake-energy}

De Beacon Chain vergroot niet alleen het vertrouwen in het proof-of-stake-mechanisme, maar maakt ook de raming van het energiegebruik van Ethereum na de merge mogelijk. Een [recente schatting](https://blog.ethereum.org/2021/05/18/country-power-no-more/) suggereerde dat de merge naar proof-of-stake zou kunnen resulteren in 99,5% minder energieverbruik, dus proof-of-stake is ongeveer 2000 keer energiezuiniger dan proof-of-work. De energie-uitgaven van Ethereum zullen ruwweg gelijk zijn aan de kosten van het runnen van een thuiscomputer voor elke node op het netwerk.

![afbeelding](energy_use_per_transaction.png)

<p style={{ textAlign: "center" }}><small><i>Volgens dezelfde bron wordt de schatting van het in de cijfers gebruikte PoW-energieverbruik per tx op basis van <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">gegevens in mei 2021</a>, op het moment van dit schrijven, gesteld op <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 Kwh</a></i></small></p>

Laten we deze cijfers vergelijken met een dienst zoals Visa. 100.000 Visa-transacties gebruiken 149 kWh energie<sup>[^2]</sup>. Ervan uitgaande dat sharding is geïmplementeerd, zal de huidige transactiesnelheid van Ethereum (15 transacties per seconde) met ten minste 64x (het aantal shards) toenemen, waarbij geen rekening is gehouden met extra optimalisering via rollups. Een realistische schatting voor gesharde Ethereum na de merge met rollups is [25.000 - 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transacties per seconde. We kunnen deze gegevens gebruiken om de maximale en minimale energiekosten per transactie te schatten.

- 25.000 transacties per seconde.
- `100.000 / 25.000 = 4` seconden voor het verwerken van 100.000 transacties.

We kunnen ook de energie-uitgaven van Ethereum per seconde ramen, met een voorzichtige schatting dat 10.000 actieve validators het netwerk beveiligen (er zijn meer dan [250.000 validators op de Beacon Chain](https://beaconscan.com/) op dit moment, maar veel validators kunnen maar op één enkele node werken. Momenteel zijn er naar schatting 3.000 tot 4.000 individuele nodes, dus 10.000 is een conservatieve schatting voor na de merge):

`1,44 kWh dagelijks gebruik * 10.000 netwerknodes = 14.400 kWh` per dag. Er zijn 86.400 seconden in een dag, dus `14.400 / 86.400 = 0,1667 kWh` per seconde.

Als we dat vermenigvuldigen met de hoeveelheid tijd die het kost om 100.000 transacties te verwerken: `0,1667 * 4 = 0,667 kWh`.

Dit is ongeveer 0,4% van de energie die door Visa wordt gebruikt voor hetzelfde aantal transacties, of een verlaging van de energie-uitgaven met een factor van circa 225 in vergelijking met het huidige proof-of-work-netwerk van Ethereum.

Als we de berekening met de maximale transacties per seconde herhalen, komen we op een verbruik van 0,1667 kWh per seconde. Dit is ongeveer 0,1% van het energieverbuik van Visa, of een vermindering van ongeveer 894x.

_Opmerking: het is niet helemaal accuraat om te vergelijken op basis van het aantal transacties, aangezien het energieverbruik van Ethereum tijdgebonden is. Het energieverbruik van Ethereum is in 1 minuut hetzelfde, ongeacht of het 1 of 1000 transacties uitvoert._

_We moeten ook bedenken dat Ethereum niet beperkt is tot eenvoudige financiële transacties, maar ook een compleet platform is dat gebouwd is voor slimme contracten en gedecentraliseerde applicaties._

## Een groener Ethereum {#green-ethereum}

Hoewel het energieverbruik van Ethereum historisch aanzienlijk is, is er veel tijd en intellect van ontwikkelaars geïnvesteerd in de overgang van energiehongerige naar energie-efficiënte blokvalidatie. Om [Bankless](http://podcast.banklesshq.com/)te citeren: de beste manier om de energie te verminderen die door proof-of-work wordt verbruikt, is door het simpelweg "uit te schakelen", wat de aanpak is die Ethereum heeft aangenomen.

<InfoBanner emoji=":evergreen_tree:">
  Als u denkt dat deze statistieken onjuist zijn of nauwkeuriger kunnen worden gemaakt, meld dan een probleem of PR. Dit zijn schattingen van het ethereum.org team die zijn gemaakt met publiek toegankelijke informatie en het huidige Ethereum-stappenplan. Deze verklaringen vertegenwoordigen geen officiële belofte van de Ethereum Foundation.
</InfoBanner>

## Verder lezen {#further-reading}

- [A country's worth of power, no more](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Carl Beekhuizen, 18 mei 2021_
- [Energieverbruik van Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Ethereum-emissies: een bottom-up-schatting](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Ethereum-energieverbruikindex](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) —_[@InsideTheSim](https://twitter.com/InsideTheSim)_

## Gerelateerde onderwerpen {#related-topics}

- [De visie van Ethereum](/roadmap/vision/)
- [De Beacon Chain](/roadmap/beacon-chain)
- [De merge](/roadmap/merge/)
- [Sharding](/roadmap/beacon-chain/)

### Voetteksten en bronnen {#footnotes-and-sources}

#### 1. Proof-of-work-energieverbruik van Ethereum {#fn-1}

[Energieverbruik per land inc. Ethereum (geannualiseerde TWh)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Energieverbruik van Visa {#fn-2}

[Het gemiddelde energieverbruik van het Bitcoin-netwerk per transactie in vergelijking met het VISA-netwerk vanaf 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Financieel rapport Visa, vierde kwartaal 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
