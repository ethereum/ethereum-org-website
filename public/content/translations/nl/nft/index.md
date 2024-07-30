---
title: Niet-vervangbare tokens (NFT's)
description: Een overzicht van NFT's op Ethereum
lang: nl
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /images/infrastructure_transparent.png
alt: Een Eth-logo dat via een hologram wordt weergegeven.
summaryPoint1: Een manier om iets unieks te vertegenwoordigen als een op Ethereum gebaseerd activum.
summaryPoint2: NFT's geven meer macht aan contentmakers dan ooit tevoren.
summaryPoint3: Mogelijk gemaakt door slimme contracten op de Ethereum-blockchain.
---

## What are NFTs? {#what-are-nfts}

NFT's zijn tokens die elk uniek zijn. Elke NFT heeft verschillende eigenschappen (niet-fungibel) en is bewijsbaar schaars. Dit is anders dan tokens zoals bij ERC-20's, waarbij elk token in een set identiek is en dezelfde eigenschappen heeft ('fungibel'). Het maakt je niet uit welk specifiek dollarbiljet je in je portemonnee hebt, want ze zijn allemaal identiek en evenveel waard. Het maakt je echter _wel_ uit welke specifieke NFT je bezit, omdat ze allemaal individuele eigenschappen hebben die ze onderscheiden van andere ('niet-fungibel').

De uniciteit van elke NFT maakt tokenisering van zaken zoals kunst, verzamelobjecten, of zelfs vastgoed mogelijk, waarbij één unieke NFT een specifiek uniek item in de echte wereld of een specifiek uniek digitaal item vertegenwoordigt. Het eigendom van een asset wordt beveiligd door de Ethereum-blockchain – niemand kan het eigendomsverleden ervan aanpassen of een nieuw NFT in het leven roepen via kopiëren/plakken.

<YouTube id="Xdkkux6OxfM" />

## Het internet van activa {#internet-of-assets}

NFT's en Ethereum lossen een aantal van de problemen op die op dit moment op het internet voorkomen. Naarmate alles digitaler wordt, is er een noodzaak om de eigenschappen van fysieke voorwerpen zoals schaarste, uniekheid en bewijs van eigendom te herhalen. op een manier die niet wordt gecontroleerd door een centrale organisatie. Bijvoorbeeld, met NFT's kun je een mp3-muzieknummer bezitten die niet eigen is aan de specifieke muziek-app van een bepaald bedrijf, of je kunt in het bezit zijn van een social media handle die je kunt verkopen of inwisselen, maar die niet willekeurig van je kan worden afgenomen door de provider van het platform.

Dit is hoe het internet van NFT's eruitziet in vergelijking met het internet dat de meesten van ons tegenwoordig gebruiken...

### Een vergelijking {#nft-comparison}

| Het NFT-internet                                                                                                                                | Het internet vandaag                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Je bezit je eigen assets! Enkel jij kunt ze verkopen of inwisselen.                                                                             | Je huurt een asset van een bepaalde organisatie.                                                                                                                                        |
| NFT's zijn digitaal uniek, geen twee NFT's zijn hetzelfde.                                                                                      | Een kopie van een entiteit kan doorgaans niet onderscheiden worden van het origineel.                                                                                                   |
| Eigendom van een NFT is geregistreerd op de blockchain en kan door iedereen geverifieerd worden.                                                | Eigendomsgegevens van digitale items worden opgeslagen op servers die worden beheerd door instellingen – die meestal gesloten zijn voor het publiek en die je dus maar moet vertrouwen. |
| NFT's zijn slimme contracten op Ethereum. Dit betekent dat ze eenvoudig gebruikt kunnen worden in andere slimme contracten en apps op Ethereum! | Bedrijven met digitale items hebben doorgaans hun eigen "walled garden"-infrastructuur nodig.                                                                                           |
| Content-makers kunnen hun werk overal verkopen en hebben toegang tot een wereldwijde markt.                                                     | Makers zijn afhankelijk van de infrastructuur en distributie van de platforms die ze gebruiken. Hiervoor zijn vaak voorwaarden en geografische beperkingen van kracht.                  |
| Makers van NFT's kunnen eigendomsrechten over hun eigen werk behouden, en royalties rechtstreeks in het NFT-contract programmeren.              | Platforms, zoals muziekstreamingservices, behouden het grootste deel van de winst uit de verkoop.                                                                                       |

## Hoe werken NFT's? {#how-nfts-work}

Zoals alle tokens op Ethereum, worden NFT's verstrekt via een slim contract. Het slimme contract voldoet aan één of meerdere NFT-standaarden (doorgaans ERC-721 of ERC-1155) die bepalen welke functionaliteiten het contract heeft. Het contract kan NFT's creëren ('minten') en ze toewijzen aan een specifieke eigenaar. Eigendom is vastgelegd in het contract via het koppelen van een NFT aan een specifiek adres. De NFT heeft een ID en is doorgaans geassocieerd met metadata die dit specifieke token uniek maken.

Wanneer iemand een NFT creëert of 'mint', voert hij/zij in werkelijkheid een functie uit in het slimme contract dat een specifiek NFT toewijst aan zijn/haar adres. Deze informatie is opgeslagen in het geheugen van het contract, dat deel uitmaakt van de blockchain. De maker van het contract kan extra logica in het contract schrijven, zoals bijvoorbeeld het limiteren van het totale aanbod of het definiëren van een royalty dat wordt betaald aan de maker elke keer dat het token wordt overgedragen.

## Waar worden NFT's voor gebruikt? {#nft-use-cases}

NFT's worden voor veel dingen gebruikt, waaronder:

- aantonen dat je een evenement hebt bijgewoond
- certificeren dat je een cursus hebt afgerond
- bezitten van items voor games
- digitale kunst
- het tokeniseren van echte activa
- bewijzen van je online identiteit
- blokkeren van toegang tot inhoud
- ticketverkoop
- gedecentraliseerde (internet)domeinnamen
- onderpand in DeFi

Misschien ben je een artiest die zijn werk wil delen via NFT's, zonder de controle te verliezen en inkomsten op te offeren aan tussenpersonen. Je kunt een nieuw contract aanmaken en het aantal NFT's, hun eigenschappen en een koppeling naar een uniek kunstwerk specifiëren. Als artiest kun je de royalty's waar je recht op hebt programmeren in het slimme contract (bijv. 5% van de verkoopprijs naar het contract van de eigenaar overmaken elke keer dat een NFT wordt overgedragen). Je kunt ook altijd bewijzen dat je de NFT's hebt gemaakt, want je bent in het bezit van de portemonnee via welke het contract is geïmplementeerd. Je kopers kunnen eenvoudig bewijzen dat ze een authentieke NFT uit jouw collectie bezitten, omdat het adres van hun portemonnee geassocieerd is met een token in jouw slimme contract. Ze kunnen het gebruiken in het hele Ethereum-ecosysteem en vertrouwen hebben in de authenticiteit ervan.

Of neem bijvoorbeeld een kaartje voor een sportevenement. Net zoals een organisator van een evenement kan kiezen hoeveel tickets hij wil verkopen, kan de maker van een NFT beslissen hoeveel replica's er bestaan. Soms gaat het om exacte replica's, zoals 5000 algemene toelatingskaartjes. Soms worden er replica's gemaakt die zeer vergelijkbaar zijn, maar elk lichtjes verschillend van elkaar, zoals een ticket met een toegewezen zitplaats. Deze kunnen peer-to-peer worden gekocht en verkocht zonder ticketbeheerders te betalen, en de koper kan altijd de authenticiteit van het ticket garanderen door het controleren van het contractadres.

Op ethereum.org worden NFT's gebruikt om te laten zien dat mensen hebben bijgedragen aan ons Github-archief of hebben deelgenomen aan gesprekken, en we hebben zelfs onze eigen NFT-domeinnaam. Als je een bijdrage levert aan ethereum.org, kun je een POAP-NFT claimen. Sommige crypto-bijeenkomsten hebben POAP's gebruikt als tickets. [Meer over bijdragen](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Deze website heeft een alternatieve domeinnaam, mogelijk gemaakt door NFT's, **ethereum.eth**. Ons `.org`-adres wordt centraal beheerd door een aanbieder van domeinnaamsystemen (DNS), terwijl ethereum`.eth` is geregistreerd op Ethereum via de Ethereum Name Service (ENS). En het is eigendom van en wordt beheerd door ons. [Bekijk ons ENS-record](https://app.ens.domains/name/ethereum.eth)

[Meer over ENS](https://app.ens.domains)

<Divider />

### NFT-beveiliging {#nft-security}

De veiligheid van Ethereum komt van proof-of-stake. Het systeem is ontworpen om kwaadaardige acties economisch te ontmoedigen, waardoor Ethereum manipulatiebestendig is. Dit is wat NFT's mogelijk maakt. Zodra het blok met jouw NFT-transactie wordt afgerond, zou het een aanvaller miljoenen ETH kosten om het te veranderen. Iedereen die Ethereum-software gebruikt, zou onmiddellijk in staat zijn om oneerlijke manipulatie met een NFT te detecteren, en de slechte speler wordt dan economisch gestraft en verwijderd.

Beveiligingskwesties met betrekking tot NFT's hebben meestal te maken met phishing-scams, kwetsbaarheden van slimme contracten of gebruikersfouten (zoals het per ongeluk blootgeven van privésleutels), waardoor goede portemonneebeveiliging van cruciaal belang is voor NFT-eigenaren.

<ButtonLink href="/security/">
  Meer over beveiliging
</ButtonLink>

## Verder lezen {#further-reading}

- [A beginner's guide to NFTs](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, januari 2020_
- [EtherscanNFT tracker](https://etherscan.io/nft-top-contracts)
- [ERC-721-tokenstandaard](/developers/docs/standards/tokens/erc-721/)
- [ERC-1155-tokenstandaard](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
