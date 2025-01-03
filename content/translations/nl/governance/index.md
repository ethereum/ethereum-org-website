---
title: Ethereum governance
description: Een intro over hoe besluiten over Ethereum worden genomen.
lang: nl
---

# Introductie tot Ethereum governance {#introduction}

_Als niemand de baas is van Ethereum, hoe worden dan besluiten over eerdere en toekomstige wijzigingen in het netwerk gemaakt? Ethereum governance verwijst naar het proces dat het mogelijk maakt om dergelijke beslissingen te nemen._

<Divider />

## Wat is governance? {#what-is-governance}

Governance is het systeem dat het mogelijk maakt om besluiten te nemen. In een typische organisatiestructuur kan het uitvoerend team of de raad van bestuur het laatste woord hebben over de besluitvorming. Of misschien stemmen aandeelhouders over voorstellen om veranderingen door te voeren. In een politiek bestel kunnen gekozen ambtenaren wetgeving uitvaardigen die proberen om de wensen van hun kiezers te vertegenwoordigen.

## Gedecentraliseerd bestuur {#decentralized-governance}

Niemand bezit of beheert het Ethereum-protocol. Er moeten echter nog steeds besluiten worden genomen over de doorvoering van wijzigingen om de levensduur en de welvaart van het netwerk optimaal te houden. Dit gebrek aan eigendom maakt traditionele organisatiebestuur een onverenigbare oplossing.

## Ethereum governance {#ethereum-governance}

Ethereum governance is het proces waarmee protocolwijzigingen worden aangebracht. Het is belangrijk om erop te wijzen dat dit proces niet gerelateerd is aan de manier waarop mensen en applicaties het protocol gebruiken - Ethereum is permissieloos. Iedereen van overal ter wereld kan deelnemen aan on-chain activiteiten. Er zijn geen regels ingesteld voor wie wel of niet een toepassing kan bouwen of een transactie kan verzenden. Er is echter een proces om wijzigingen aan het kernprotocol voor te stellen, waar gedecentraliseerde applicaties bovenop draaien. Omdat zoveel mensen afhankelijk zijn van de stabiliteit van Ethereum, is er een zeer hoge coördinatiedrempel voor kernveranderingen, inclusief sociale en technische processen, om ervoor te zorgen dat eventuele wijzigingen aan Ethereum veilig zijn en gesteund worden door de gemeenschap.

### On-chain vs off-chain governance {#on-chain-vs-off-chain}

Blockchain-technologie maakt nieuwe governance-capaciteiten mogelijk, bekend als on-chain governance. On-chain governance is wanneer de voorgestelde wijzigingen in het protocol worden besloten door een stemming van belanghebbenden, meestal door houders van een governance token. Het stemmen vindt plaats op de blockchain. Bij sommige vormen van on-chain governance zijn de voorgestelde protocolwijzigingen al in code geformuleerd en worden deze automatisch geïmplementeerd als de belanghebbenden de wijzigingen goedkeuren.

De tegenovergestelde benadering, off-chain governance, is het proces waarbij beslissingen over protocolwijzigen plaatsvinden via een informeel proces van maatschappelijke discussie, die, als ze worden goedgekeurd, in code zouden worden omgezet.

**Governance bij Ethereum vindt off-chain plaats** met een grote verscheidenheid aan belanghebbenden die bij het proces betrokken zijn.

_Terwijl governance bij Ethereum op protocolniveau off-chain is, gebruiken veel use-cases die zijn gebouwd bovenop Ethereum, zoals DAO's, on-chain governance._

<ButtonLink href="/dao/">
  Meer over DAO's
</ButtonLink>

<Divider />

## Wie is er betrokken? {#who-is-involved}

Er zijn verschillende belanghebbenden in de [Ethereum-gemeenschap](/community/), en elk speelt een rol in het governance-proces. Alle belanghebbenden startend van het verst van het protocol tot het meest dichtbij, zijn:

- **Ether-houders**: deze mensen hebben een willekeurige hoeveelheid ETH. [Meer over ETH](/eth/).
- **Applicatie-gebruikers**: deze mensen communiceren met applicaties op de Ethereum-blockchain.
- **Applicatie-/gereedschapsontwikkelaars**: deze mensen schrijven applicaties die worden uitgevoerd op de Ethereum-blockchain (bijv. DeFi, NFT's, enz.) of bouwen gereedschap om te communiceren met Ethereum (bijv. portemonnees, testsuites, enz.). [Meer over dapps](/dapps/).
- **Nodebeheerders**: deze mensen voeren nodes uit die blokken en transacties propageren, waarbij ze elke ongeldige transactie of blok die ze tegenkomen verwerpen. [Meer over nodes](/developers/docs/nodes-and-clients/).
- **EIP-auteurs**: deze mensen stellen wijzigingen voor aan het Ethereum-protocol, in de vorm van Ethereum-verbeteringsvoorstellen (EIPs). [Meer over EIPs](/eips/).
- **Validators**: deze mensen draaien nodes die nieuwe blokken kunnen toevoegen aan de Ethereum-blockchain.
- **Protocolontwikkelaars** (oftewel "Kernontwikkelaars" ): deze mensen onderhouden de verschillende Ethereum-implementaties (bijv. go-ethereum, Nethermind, Besu, Erigon in de uitvoeringslaag of Prysm, Lighthouse, Nimbus, Teku, Lodestar in de consensuslaag). [Meer over Ethereum clients](/developers/docs/nodes-and-clients/).

_Opmerking: elk individu kan deel uitmaken van meerdere van deze groepen (bijv. een protocolontwikkelaar kan een EIP steunen en een Beacon Chain-validator uitvoeren en DeFi-applicaties gebruiken). Voor conceptuele duidelijkheid is het echter het gemakkelijkst om ze te onderscheiden._

<Divider />

## Wat is een EIP? {#what-is-an-eip}

Een belangrijk proces dat wordt gebruikt in Ethereum governance is het voorstel van **Ethereum Improvement Proposals (EIPs)**. EIP's zijn standaarden die potentiële nieuwe functies of processen voor Ethereum specificeren. Iedereen binnen de Ethereum-gemeenschap kan een EIP maken. Als je geïnteresseerd bent in het schrijven van een EIP of wilt deelnemen aan collegiale toetsing en/of bestuur, kijk dan op:

<ButtonLink href="/eips/">
  Meer over EIP's
</ButtonLink>

<Divider />

## Het formele proces {#formal-process}

Het formele proces voor het introduceren van wijzigingen in het Ethereum-protocol is als volgt:

1. **Stel een kern-EIP voor**: zoals beschreven in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) is de eerste stap om een wijziging van Ethereum formeel voor te stellen, deze te beschrijven in een kern-EIP. Dit zal fungeren als de officiële specificatie voor een EIP die protocolontwikkelaars zullen implementeren, indien geaccepteerd.

2. **Presenteer uw EIP aan protocolontwikkelaars**: zodra u een kern-EIP heeft waarvoor u de inbreng van de gemeenschap heeft verzameld, moet u het presenteren aan de protocolontwikkelaars. U kunt dit doen door het voor te stellen als discussie-onderwerp tijdens een [AllCoreDevs-oproep](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Het is waarschijnlijk dat sommige discussies al asynchroon hebben plaatsgevonden op het [Ethereum Magician's forum](https://ethereum-magicians.org/) of in de [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw).

> Mogelijke resultaten van deze fase zijn:

> - Het EIP zal in aanmerking worden genomen voor een toekomstige netwerkupgrade
> - Technische wijzigingen zullen worden aangevraagd
> - Het kan worden afgewezen als het geen prioriteit is of als de verbetering niet groot genoeg is in verhouding tot de ontwikkelingsinspanningen

3. **Itereren naar een definitief voorstel:** na feedback te hebben ontvangen van alle relevante belanghebbenden, zult u waarschijnlijk wijzigingen moeten aanbrengen in uw oorspronkelijke voorstel om de beveiliging ervan te verbeteren of beter in de behoeften van verschillende gebruikers te voorzien. Zodra uw EIP alle wijzigingen heeft opgenomen waarvan u denkt dat ze nodig zijn, moet u het opnieuw presenteren aan de protocolontwikkelaars. Vervolgens gaat u naar de volgende stap van dit proces, of er ontstaan nieuwe problemen die opnieuw een ronde iteraties ten aanzien van uw voorstel vereisen.

4. **EIP opgenomen in netwerkupgrade**: ervan uitgaande dat het EIP is goedgekeurd, getest en geïmplementeerd, wordt het gepland als onderdeel van een netwerkupgrade. Gezien de hoge coördinatiekosten van netwerkupgrades (iedereen moet tegelijkertijd upgraden), worden EIP's over het algemeen gebundeld in upgrades.

5. **Netwerkupgrade geactiveerd**: nadat de netwerkupgrade is geactiveerd, zal het EIP live op het Ethereum-netwerk verschijnen. _Opmerking: netwerkupgrades worden meestal geactiveerd op testnetten voordat ze worden geactiveerd op het Ethereum Mainnet._

Deze stroom, hoewel zeer vereenvoudigd, geeft een overzicht van de belangrijke fasen voor het activeren van een protocolwijziging voor Ethereum. Laten we nu kijken naar de informele factoren die tijdens dit proces een rol spelen.

## Het informele proces {#informal-process}

### Voorafgaand werk begrijpen {#prior-work}

EIP Champions zouden zich vertrouwd moeten maken met eerder werk en voorstellen alvorens een EIP te creëren die serieus overwogen kan worden om in het Ethereum Mainnet te worden ingezet. Op deze manier brengt het EIP hopelijk iets nieuws mee dat eerder niet is verworpen. De drie belangrijkste plaatsen om dit te onderzoeken zijn de [EIP repository](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) en [ethresear.ch](https://ethresear.ch/).

### Werkgroepen {#working-groups}

Het is onwaarschijnlijk dat de eerste versie van een EIP zonder bewerkingen of veranderingen op het Ethereum Mainnet geïmplementeerd zal worden. Over het algemeen zullen EIP Champions werken met een subset van protocolontwikkelaars om hun voorstel te speciferen, te implementeren, te testen, te itereren en te voltooien. Historisch gezien hebben deze werkgroepen meerdere maanden (en soms jaren!) werk vereist. Evenzo moeten EIP Champions voor dergelijke wijzigingen relevante applicatie-/gereedschapsontwikkelaars betrekken bij hun inspanningen om feedback van eindgebruikers te verzamelen en eventuele implementatiedisico's te beperken.

### Gemeenschapsconsensus {#community-consensus}

Hoewel sommige EIP's eenvoudige technische verbeteringen zijn met minimale nuance, zijn sommige complexer en komen met afwegingen die verschillende belanghebbenden op verschillende manieren zullen treffen. Dit betekent dat sommige EIP's binnen de community controversiëler zijn dan andere.

Er is geen duidelijk draaiboek over hoe omgegaan moet worden met controversiële voorstellen. Dit is het resultaat van het gedecentraliseerde ontwerp van Ethereum, waarbij geen enkele groep belanghebbenden de andere kan dwingen door middel van brute kracht: protocolontwikkelaars kunnen ervoor kiezen om geen codewijzigingen door te voeren; nodebeheerders kunnen ervoor kiezen om niet de nieuwste Ethereum-client te draaien; applicatieteams en gebruikers kunnen ervoor kiezen om geen transacties te doen op de chain. Aangezien protocolontwikkelaars geen enkele manier hebben om mensen te dwingen om netwerkupgrades te accepteren, zullen ze het over het algemeen vermijden om EIP's te implementeren wanneer de betwistbaarheid ervan zwaarder weegt dan de voordelen voor de bredere gemeenschap.

Van de EIP-Champions wordt verwacht dat ze om feedback vragen van alle relevante belanghebbenden. Als uzelf de Champion bent van een omstreden EIP, moet u proberen om de bezwaren aan te pakken om consensus te creëren rond uw EIP. Gezien de grootte en diversiteit van de Ethereum-gemeenschap is er geen enkele statistiek (bijv. een muntstemming) die gebruikt kan worden om de consensus van de gemeenschap te meten, en van de EIP Champions wordt verwacht dat ze zich aanpassen aan de omstandigheden van hun voorstel.

Naast de veiligheid van het Ethereum-netwerk, is er historisch gezien significante betekenis toegekend door protocolontwikkelaars aan wat de applicatie-/gereedschapsontwikkelaars waarderen, gezien het feit dat hun gebruik en ontwikkeling op Ethereum het ecosysteem aantrekkelijk maakt voor andere belanghebbenden. Daarnaast moeten EIP's worden geïmplementeerd op alle client-implementaties die worden beheerd door verschillende teams. Een deel van dit proces betekent meestal het overtuigen van meerdere teams van protocolontwikkelaars dat een bepaalde verandering waardevol is en dat het de eindgebruikers helpt of een veiligheidsprobleem oplost.

<Divider />

## Omgaan met meningsverschillen {#disagreements}

Het hebben van veel belanghebbenden met verschillende beweegredenen en overtuigingen betekent dat meningsverschillen vaak voorkomen.

Over het algemeen worden meningsverschillen behandeld met langdurige discussies in openbare fora om de grondoorzaak van het probleem te begrijpen. Op deze manier heeft iedereen de kans om zijn stem te laten horen. Meestal wint één groep of wordt er een middenweg bereikt. Als een groep zich sterk genoeg voelt, kan het doordrukken van een bepaalde verandering leiden tot een splitsing van de keten. Er is sprake van een ketensplitsing wanneer sommige belanghebbenden protesteren tegen de tenuitvoerlegging van een protocolwijziging, wat resulteert verschillende, incompatibele versies van het werkende protocol, waaruit twee verschillende blockchains ontstaan.

### De DAO-fork {#dao-fork}

Forks zijn de momenten waarop grote technische verbeteringen of veranderingen in het netwerk moeten worden aangebracht en de "regels" van het protocol moeten worden gewijzigd. [Ethereum-clients](/developers/docs/nodes-and-clients/) moeten hun software bijwerken om de nieuwe fork-regels te implementeren.

De DAO-fork was een reactie op de [DAO-aanval van 2016](https://www.coindesk.com/understanding-dao-hack-journalists) waarbij een onveilig [DAO](/glossary/#dao)-contract meer dan dan 3,6 miljoen ETH verloor in een hack. De fork verplaatste de fondsen van het foutieve contract naar een nieuw contract, waardoor iedereen die in de hack geld had verloren dit kon terugvorderen.

Deze handelswijze werd via een stemming door de Ethereum-gemeenschap goedgekeurd. Elke ETH-houder kon stemmen via een transactie op [een stemplatform](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Het besluit om te forken behaalde meer dan 85 procent van de stemmen.

Het is belangrijk om op te merken dat, hoewel het protocol een fork uitvoerde om de hack terug te draaien, het belang dat de stemming over de beslissing om te forken discutabel is om een paar redenen:

- De opkomst bij de stemming was ongelooflijk laag
- De meeste mensen wisten niet dat er een stemming gaande was
- De stemming vertegenwoordigde alleen ETH-houders, geen van de andere deelnemers in het systeem

Een subset van de gemeenschap weigerde te forken, hoofdzakelijk omdat ze vonden dat het DAO-incident geen defect was in het protocol. Zij gingen verder met het vormen van [Ethereum Classic](https://ethereumclassic.org/).

Vandaag de dag heeft de Ethereum-gemeenschap een beleid van niet-interventie in gevallen van contractbugs of verloren geld om de geloofwaardige neutraliteit van het systeem te handhaven.

Bekijk meer over de DAO-hack:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Het nut van forking {#forking-utility}

De Ethereum/Ethereum Classic fork is een uitstekend voorbeeld van een gezonde fork. We hadden twee groepen die het wat sommige kernwaarden betreft sterk genoeg met elkaar oneens waren om te denken dat het de moeite waard was om hun specifieke aanpak voort te zetten.

De mogelijkheid om te forken ten aanzien van aanzienlijke politieke, filosofische of economische verschillen speelt een grote rol in het succes van Ethereum governance. Zonder de mogelijkheid om te forken was het alternatief een doorlopende strijd, gedwongen onwillige deelname voor degenen die uiteindelijk Ethereum Classic hebben gevormd en een in toenemende mate andere visie over hoe succes eruitziet voor Ethereum.

<Divider />

## Beacon Chain governance {#beacon-chain}

Het governance-proces van Ethereum weegt vaak snelheid en efficiëntie af tegen openheid en inclusiviteit. Om de ontwikkeling van de Beacon Chain te versnellen, werd het losgekoppeld van het proof-of-work Ethereum-netwerk en heeft het zijn eigen bestuurspraktijken gevolgd.

Hoewel de specificatie en de ontwikkelingsimplementaties altijd volledig open-source zijn geweest, werden de formele processen om updates voor te stellen zoals hierboven beschreven niet gebruikt. Hierdoor konden onderzoekers en uitvoerders sneller wijzigingen doorvoeren en hierover overeenstemming bereiken.

Toen de Beacon Chain fuseerde met de Ethereum-uitvoeringslaag op 15 september 2022, was The Merge voltooid als onderdeel van de [netwerkupgrade van Parijs](/geschiedenis/#paris). Het voorstel [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) werd gewijzigd van 'Laatste oproep' naar 'Definitief', waarmee de overgang naar proof-of-stake werd voltooid.

<ButtonLink href="/roadmap/merge/">
  Meer over de merge
</ButtonLink>

<Divider />

## Hoe kan ik meedoen? {#get-involved}

- [Stel een EIP voor](/eips/#participate)
- [Bespreek huidige voorstellen](https://ethereum-magicians.org/)
- [Neem deel aan een R&D-discussie](https://ethresear.ch/)
- [Doe mee met de Ethereum R&D-discord](https://discord.gg/mncqtgVSVw)
- [Voer een node uit](/developers/docs/nodes-and-clients/run-a-node/)
- [Draag bij de ontwikkeling van clients](/developers/docs/nodes-and-clients/#execution-clients)
- [Kernleerprogramma voor ontwikkelaars](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Lees verder {#further-reading}

Governance in Ethereum is niet strikt gedefinieerd. Verschillende deelnemers van de gemeenschap hebben er verschillende perspectieven op. Hier zijn er een paar:

- [Notes on Blockchain Governance](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [How does Ethereum Governance work?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [How Ethereum governance works](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [What is an Ethereum core developer?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Governance, Part 2: Plutocracy Is Still Bad](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Moving beyond coin voting governance](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
