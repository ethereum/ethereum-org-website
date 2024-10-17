---
title: Inleiding tot blockchainbruggen
description: Met bruggen kunnen gebruikers hun fondsen verplaatsen over verschillende blockchains
lang: nl
---

# Blockchain bridges {#prerequisites}

_Web3 is geëvolueerd naar een ecosysteem van L1-blockchains en L2-schaaloplossingen, beiden ontworpen met unieke mogelijkheiden en afwegingen. Naarmate het aantal blockchainprotocollen toeneemt, groeit de vraag om activa over chains te verplaatsen mee. Om deze vraag te kunnen beantwoorden hebben we bruggen nodig._

<Divider />

## Wat zijn bruggen? {#what-are-bridges}

Blockchainbruggen werken zoals de bruggen in onze fysieke wereld. Net zoals een fysieke brug twee fysieke locaties verbindt, verbindt een blockchainbrug twee blockchain-ecosystemen. **Bruggen vergemakkelijken de communicatie tussen blockchains door de overdracht van informatie en activa**.

Laten we een voorbeeld nemen:

Je bent in de VS en je plant een reis naar Europa. Je hebt USD, maar je hebt EUR nodig om uit te geven. Om je USD om te zetten in EUR kun je een wisselkantoor gebruiken voor een kleine vergoeding.

Maar wat doe je als je een vergelijkbare omwisseling wilt maken om een andere [blockchain](/glossary/#blockchain) te gebruiken? Laten we zeggen dat je [ETH](/glossary/#ether) op het Ethereum Mainnet wilt omruilen voor ETH op [Arbitrum](https://arbitrum.io/). Net als de valutaruil die we voor EUR hebben gemaakt, hebben we een mechanisme nodig om onze ETH van Ethereum naar Arbitrum te verplaatsen. Bruggen maken een dergelijke transactie mogelijk. In dit geval heeft [Arbitrum een eigen brug](https://bridge.arbitrum.io/) die ETH kan overzetten van het Mainnet naar Arbitrum.

## Waarom hebben we bruggen nodig? {#why-do-we-need-bridges}

Alle blockchains hebben hun beperkingen. Ethereum heeft [rollups](/glossary/#rollups) nodig om te kunnen schalen en om de vraag bij te kunnen houden. Als alternatief worden L1's zoals Solana en Avalanche anders ontworpen, om hogere doorvoer mogelijk te maken, maar ten koste van decentralisatie.

Alle blockchains ontwikkelen zich echter in geïsoleerde omgevingen en hebben verschillende regels en [consensusmechanismen](/glossary/#consensus). Dit betekent dat tokens niet zomaar tussen blockchains kunnen communiceren.

Bruggen bestaan voor het verbinden van blockchains, waardoor gegevens en tokens tussen deze systemen kunnen worden overgebracht.

**Bruggen maken het volgende mogelijk**:

- de cross-chain overdracht van activa en informatie.
- [dapps](/glossary/#dapp) om toegang te krijgen tot de sterke punten van verschillende blockchains – waardoor hun capaciteiten worden verbeterd (aangezien protocollen nu meer ontwerpruimte hebben voor innovatie).
- gebruikers die toegang hebben tot nieuwe platforms en gebruik maken van de voordelen van verschillende chains.
- ontwikkelaars van verschillende blockchain-ecosystemen om samen te werken en nieuwe platforms te bouwen voor de gebruikers.

[Hoe tokens naar laag 2 bridgen](/guides/how-to-use-a-bridge/)

<Divider />

## Toepassingsscenario's voor bruggen {#bridge-use-cases}

De volgende zijn enkele scenario's waar je een brug kunt gebruiken:

### Lagere transactiekosten {#transaction-fees}

Laten we zeggen dat je ETH hebt op het Ethereum Mainnet, maar goedkopere transactiekosten wilt om verschillende dapps te onderzoeken. Door je ETH te overbruggen van het Mainnet naar een Ethereum L2-rollup, kun je genieten van lagere transactiekosten.

### Dapps op andere blockchains {#dapps-other-chains}

Als je Aave op Ethereum Mainnet hebt gebruikt om USDT uit te lenen, maar de rente voor het uitlenen van USDT via Aave op Polygon hoger is.

### Verken blockchain-ecosystemen {#explore-ecosystems}

Als je ETH hebt op het Ethereum Mainnet en je een alt L1 wilt verkennen om hun eigen dapps uit te proberen. Je kunt dan een brug gebruiken om je ETH van het Ethereum Mainnet naar de alt L1 te verplaatsen.

### Bezit native crypto-activa {#own-native}

Laten we zeggen dat je native Bitcoin (BTC) wilt hebben, maar dat je alleen fondsen hebt op Ethereum Mainnet. Voor het krijgen van blootstelling aan BTC op Ethereum, kun je Wrapped Bitcoin (WBTC) kopen. WBTC is echter een [ERC-20](/glossary/#erc-20)-token dat hoort bij het Ethereum-netwerk, wat betekent dat het een Ethereum-versie van Bitcoin is en niet het oorspronkelijke activum op de Bitcoin-blockchain. Om je eigen BTC te bezitten, moet je je activa overbruggen van Ethereum naar Bitcoin met behulp van een brug. Dit zal je WBTC overbruggen en omzetten in echte BTC. Of je zou ook BTC kunnen bezitten die je wilt gebruiken in Ethereum [DeFi](/glossary/#defi)-protocollen. Hiervoor zou overbrugging de andere kant op vereisen, van BTC naar WBTC, dat vervolgens kan worden gebruikt als een activum op Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Je kunt ook al het bovenstaande doen met behulp van een <a href="/get-eth/">gecentraliseerde exchange</a>. Tenzij je fondsen echter al op een exchange staan, zou dit meerdere stappen vergen, en dus ben je waarschijnlijk beter af met het gebruik van een brug.
</InfoBanner>

<Divider />

## Soorten bruggen {#types-of-bridge}

Bruggen hebben vele soorten ontwerpen en details. Over het algemeen vallen bruggen binnen twee categorieën: vertrouwde bruggen en vertrouwensloze bruggen.

| Vertrouwde bruggen                                                                                                                                                                              | Vertrouwensloze bruggen                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Vertrouwde bruggen zijn afhankelijk van een centrale entiteit of systeem voor hun activiteiten.                                                                                                 | Vertrouwensloze bruggen werken met slimme contracten en algoritmes.                                                                             |
| Ze hebben veronderstellingen omtrent vertrouwen met betrekking tot het bewaren van de fondsen en de veiligheid van de brug. Gebruikers vertrouwen meestal op de reputatie van de brug-operator. | Ze zijn vertrouwensloos, d.w.z. dat de veiligheid van de brug hetzelfde is als die van de onderliggende blockchain.                             |
| Gebruikers moeten de controle over hun crypto-activa afstaan.                                                                                                                                   | Door [slimme contracten](/glossary/#smart-contract) stellen vertrouwensloze bruggen gebruikers in staat om controle te houden over hun fondsen. |

In een notendop kunnen we zeggen dat vertrouwde bruggen veronderstellingen omtrent vertrouwen hebben, terwijl het vertrouwen wordt geminimaliseerd en er geen nieuwe vertrouwensveronderstellingen worden gecreëerd bij vertrouwensloze bruggen. Hier staat hoe deze termen kunnen worden beschreven:

- **Vertrouwensloos**: gelijkwaardige beveiliging aan de onderliggende domeinen. Zoals beschreven door [Arjun Bhuptani in dit artikel.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Veronderstellingen omtrent vertrouwen:** zich verwijderend van de veiligheid van de onderliggende domeinen door externe verificateurs toe te voegen aan het systeem. waardoor het minder crypto-economisch veilig is.

Bekijk volgend voorbeeld om een beter inzicht te krijgen in de belangrijkste verschillen tussen de twee benaderingen:

Stel je voor dat je bij de beveiligingscontrolepost op het vliegveld bent. Er zijn hier twee soorten controlepunten:

1. Handmatige controlepunten - beheerd door ambtenaren die handmatig alle details van je ticket en identiteit controleren voordat ze je de instapkaart geven.
2. Zelfcheck-in - beheerd door een machine waar je je vluchtgegevens invoert en de instapkaart ontvangt na controle.

Handmatige controlepunten zijn vergelijkbaar met een op vertrouwen gebaseerd model, omdat het voor zijn activiteiten afhankelijk is van een derde partij, bijv. de ambtenaren. Als gebruiker vertrouw je erop dat de ambtenaren de juiste beslissingen nemen en je persoonlijke informatie correct gebruiken.

Zelf-check-in is vergelijkbaar met een vertrouwensloos model, aangezien het de rol van de ambtenaar verwijdert en technologie gebruikt voor zijn functioneren. Gebruikers blijven altijd de controle over hun gegevens houden en hoeven geen derde te vertrouwen met hun privé-gegevens.

Veel overbruggingsoplossingen kiezen tussen deze twee modellen met verschillende mate van vertrouwen.

<Divider />

## Risico's van bruggen {#bridge-risk}

Bruggen bevinden zich in een vroege fase van ontwikkeling. Het is zeer waarschijnlijk dat het optimale brugontwerp nog niet ontdekt is. Interactie met een brug brengt de volgende risico's mee:

- **Risico van slimme contracten -** het risico van een fout in de code die kan leiden tot verlies van fondsen
- **Technologierisico -** softwarestoringen, code met bugs, menselijke fouten, spam en kwaadwillige aanvallen kunnen mogelijk gebruikersactiviteiten verstoren

Aangezien vertrouwde bruggen vertrouwensveronderstellingen toevoegen, brengen ze bovendien extra risico's met zich mee, zoals:

- **Censuurrisico -** brug-operators kunnen theoretisch verhinderen dat gebruikers hun activa overdragen via de brug
- **Bewaringsrisico -** brug-operators kunnen samenspannen om fondsen van gebruikers te stelen

Gebruikersfondsen zijn in gevaar als:

- er een fout in het slimme contract zit
- de gebruiker een fout maakt
- de onderliggende blockchain gehacked is
- de brug-operators kwaadaardige bedoelingen in een vertrouwde brug hebben
- de brug gehackt word

Een recente hack was de brug van Solana’s Wormhole [waarbij 120.000 wETH ($ 325 miljoen USD) werd gestolen tijdens de hack](https://rekt.news/wormhole-rekt/). Vele van de [top hacks in blockchains betroffen bridges](https://rekt.news/leaderboard/).

Bruggen zijn cruciaal voor gebruikers van Ethereum L2's, en zelfs voor gebruikers die verschillende ecosystemen willen verkennen. Gezien de risico's van interactie met bruggen moeten gebruikers echter de afwegingen begrijpen die door de bruggen gemaakt worden. Dit zijn enkele [strategieën voor cross-chain beveiliging](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Verder lezen {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 june 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 juli 2022 - Bartek Kiepuszewski_
- ["Why the future will be multi-chain, but it will not be cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8 januari 2022 - Vitalik Buterin_
