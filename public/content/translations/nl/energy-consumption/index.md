---
title: Ethereum-energieverbruik
description: De basisinformatie die u nodig heeft om het energieverbruik van Ethereum te begrijpen.
lang: nl
---

# Ethereums energieuitgaven {#proof-of-stake-energy}

Ethereum is een groene blockchain. Het [proof-of-stake](/developers/docs/consensus-mechanisms/pos) consensusmechanisme van Ethereum gebruikt ETH in plaats van [energie om het netwerk te beveiligen](/developers/docs/consensus-mechanisms/pow). Het energieverbruik van Ethereum is ongeveer [~0,0026 TWh/jaar](https://carbon-ratings.com/eth-report-2022) over het hele wereldwijde netwerk.

De schatting van het energieverbruik voor Ethereum komt van een [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com)-onderzoek. Ze genereerden bottom-up schattingen van het elektriciteitsverbruik en de koolstofvoetafdruk van het Ethereum-netwerk ([zie het rapport](https://carbon-ratings.com/eth-report-2022)). Ze onderzochten het elektriciteitsverbruik van verschillende nodes met verschillende hardware- en client-softwareconfiguraties. De geschatte **2.601 MWh** (0,0026 TWh) voor het jaarlijkse elektriciteitsverbruik van het netwerk komt overeen met een jaarlijkse koolstofuitstoot van **870 ton CO2e** (bij toepassing van regiospecifieke koolstofintensiteitsfactoren). Deze waarde verandert naarmate nodes het netwerk betreden en verlaten - je kunt het volgen met behulp van een voortschrijdend gemiddelde schatting over 7 dagen door de [Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (merk op dat ze een iets andere methode gebruiken voor hun schattingen - details beschikbaar op hun site).

Om het energieverbruik van Ethereum te contextualiseren, kunnen we schattingen op jaarbasis vergelijken voor enkele andere producten en industrieën. Dit helpt ons beter te begrijpen of de schatting voor Ethereum hoog of laag is.

<EnergyConsumptionChart />

De bovenstaande grafiek toont het geschatte energieverbruik in TWh/jaar voor Ethereum, vergeleken met verschillende andere producten en industrieën. De schattingen zijn afkomstig van openbaar beschikbare informatie, die in juli 2023 is geraadpleegd, met links naar de bronnen in de onderstaande tabel.

|                         | Jaarlijks energieverbruik (TWh) | Vergelijking met PoS Ethereum |                                                                                      Bron                                                                                       |
|:----------------------- |:-------------------------------:|:-----------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Wereldwijde datacenters |               190               |            73,000x            |                                    [bron](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                 |               149               |            53.000x            |                                                                 [bron](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Goud delven             |               131               |            50.000x            |                                                                 [bron](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming in de VS\*     |               34                |            13.000x            |                 [bron](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum            |               21                |            8.100x             |                                                                    [bron](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                  |               19                |            7.300x             |                                           [bron](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                 |              0,457              |             176x              | [bron](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                  |              0.26               |             100x              |                                  [bron](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                  |              0.02               |              8x               |                               [bron](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**        |           **0,0026**            |            **1x**             |                                                               [bron](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Inclusief eindgebruikersapparaten zoals pc's, laptops en spelconsoles.

Het is ingewikkeld om nauwkeurige schattingen te maken van het energieverbruik, vooral als datgene wat gemeten wordt een complexe toeleveringsketen of inzetdetails heeft die de efficiëntie beïnvloeden. Zo variëren de schattingen van het energieverbruik van Netflix en Google afhankelijk van de vraag of ze alleen de energie meenemen die nodig is om hun systemen te onderhouden en content aan gebruikers te leveren (_directe uitgaven_) of dat ze de uitgaven meenemen die nodig zijn om content te produceren, bedrijfskantoren te runnen, te adverteren, enz. (_indirecte uitgaven_). Indirecte uitgaven kunnen ook de energie omvatten die nodig is om content te consumeren op eindgebruikersapparaten zoals tv's, computers en mobiele telefoons.

De bovenstaande schattingen zijn geen perfecte vergelijkingen. De hoeveelheid indirecte uitgaven die in aanmerking wordt genomen, verschilt per bron en omvat zelden de energie van eindgebruikersapparaten. Elke onderliggende bron bevat meer details over wat er gemeten wordt.

De bovenstaande tabel en grafiek bevatten ook vergelijkingen met Bitcoin en proof-of-work Ethereum. Het is belangrijk om op te merken dat het energieverbruik van proof-of-work netwerken niet statisch is en van dag tot dag verandert. Schattingen kunnen per bron sterk verschillen. Het onderwerp roept een genuanceerd [debat](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) op, niet alleen over de hoeveelheid verbruikte energie, maar ook over de bronnen van die energie en de daarmee samenhangende ethische vragen. Energieverbruik komt niet noodzakelijkerwijs exact overeen met de ecologische voetafdruk, omdat verschillende projecten verschillende energiebronnen kunnen gebruiken, waaronder een groter of kleiner aandeel hernieuwbare energie. Zo geeft de [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) aan dat de vraag naar Bitcoin-netwerken theoretisch zou kunnen worden gevoed door het afbranden van gas of door elektriciteit die anders verloren zou gaan bij transmissie en distributie. Ethereums route naar duurzaamheid was om het energievretende deel van het netwerk te vervangen door een groen alternatief.

Op de [Cambridge Blockchain Network Sustainability Index site](https://ccaf.io/cbnsi/ethereum) kun je schattingen bekijken van het energieverbruik en de koolstofuitstoot van vele industrieën.

## Schattingen per transactie {#per-transaction-estimates}

Veel artikelen schatten de energie-uitgaven "per transactie" voor blockchains. Dat kan misleidend zijn, omdat de energie die nodig is om een blok voor te stellen en te valideren onafhankelijk is van het aantal transacties binnen dat blok. Een eenheid van energieverbruik per transactie impliceert dat minder transacties leiden tot lagere energieuitgaven en vice versa. Dat is niet het geval. Schattingen per transactie zijn ook zeer gevoelig voor de manier waarop de transactieverwerking van een blockchain wordt gedefinieerd, en het aanpassen van deze definitie kan worden gegamed om de waarde groter of kleiner te doen lijken.

Bij Ethereum is de transactiedoorvoer bijvoorbeeld niet alleen die van de basislaag, maar ook de som van de transactiedoorvoer van alle "[laag 2](/layer-2/)"-rollups. Laag 2's worden doorgaans niet meegenomen in berekeningen, maar rekening houden met de extra energie die sequencers (klein) verbruiken en het aantal transacties dat zij verwerken (groot) zou de schattingen per transactie waarschijnlijk drastisch verlagen. Dit is een van de redenen waarom vergelijkingen van het energieverbruik per transactie op verschillende platforms misleidend kunnen zijn.

## Ethereums koolstofschuld {#carbon-debt}

De energie-uitgaven van Ethereum zijn zeer laag, maar dat is niet altijd het geval geweest. Ethereum gebruikte oorspronkelijk proof-of-work, dat veel grotere milieukosten had dan het huidige proof-of-stake mechanisme.

Vanaf het begin was Ethereum van plan om een op proof-of-stake gebaseerd consensusmechanisme te implementeren, maar om dat te doen zonder de veiligheid en decentralisatie op te offeren vergde jaren van gericht onderzoek en ontwikkeling. Daarom werd er een proof-of-work mechanisme gebruikt om het netwerk op te starten. Proof-of-work vereist dat miners hun computerhardware gebruiken om een waarde te berekenen en daarbij energie verbruiken.

![Vergelijking van het energieverbruik van Ethereum vóór en na The Merge, met links de Eiffeltoren (330 meter hoog) als symbool voor het hoge energieverbruik vóór The Merge en rechts een klein Lego-figuurtje van 4 cm hoog als symbool voor de drastische vermindering van het energieverbruik na The Merge](energy_consumption_pre_post_merge.png)

CCRI schat dat The Merge het jaarlijkse elektriciteitsverbruik van Ethereum met meer dan **99,988%** heeft verminderd. Ook de koolstofvoetafdruk van Ethereum werd verminderd met ongeveer **99,992%** (van 11.016.000 naar 870 ton CO2e). Om je een beeld te geven: de vermindering in uitstoot is vergelijkbaar met het hoogteverschil tussen de Eiffeltoren en een klein plastic speelgoedfiguurtje, zoals geïllustreerd in de figuur hierboven. Hierdoor worden de milieukosten voor het beveiligen van het netwerk drastisch verlaagd. Tegelijkertijd wordt aangenomen dat de beveiliging van het netwerk is verbeterd.

## Een groene toepassingslaag {#green-applications}

Terwijl het energieverbruik van Ethereum zeer laag is, is er ook een substantiële, groeiende en zeer actieve [**regenerative financiën (ReFi)**](/refi/)-community die op Ethereum bouwt. ReFi-applicaties gebruiken DeFi-componenten om financiële toepassingen te bouwen die positieve externe voordelen hebben voor de omgeving. ReFi maakt deel uit van een bredere ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk)-beweging die nauw is afgestemd op Ethereum en gericht is op het koppelen van technologische vooruitgang en milieubeheer. De gedecentraliseerde, toegestane en samengestelde aard van Ethereum maakt het tot de ideale basislaag voor de ReFi- en solarpunk-gemeenschappen.

Web3-financieringsplatforms voor eigen publieke goederen zoals [Gitcoin](https://gitcoin.co) voeren klimaatrondes uit om milieubewust bouwen op de toepassingslaag van Ethereum te stimuleren. Door de ontwikkeling van deze initiatieven (en andere, bijv. [DeSci](/desci/)) wordt Ethereum een ecologisch en sociaal netto positieve technologie.

<InfoBanner emoji=":evergreen_tree:">
  Als je denkt dat deze pagina nauwkeuriger kan worden gemaakt, meld dan een probleem of open een PR. De statistieken op deze pagina zijn schattingen gebaseerd op openbaar beschikbare gegevens - ze vertegenwoordigen geen officiële verklaringen of beloftes van het ethereum.org team of de Ethereum Foundation.
</InfoBanner>

## Verder lezen {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [White House-rapport over proof-of-work blockchains](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Ethereum Emissions: A Bottom-up Estimate](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Ethereum Energy Consumption Index](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Implications on the Electricity Consumption and Carbon Footprint of the Ethereum Network](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Energieverbruik van Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Gerelateerde onderwerpen {#related-topics}

- [De visie van Ethereum](/roadmap/vision/)
- [De Beacon Chain](/roadmap/beacon-chain)
- [De samenvoeging](/roadmap/merge/)
