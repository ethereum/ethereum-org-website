---
title: Solo stake uw ETH
description: Een overzicht van hoe u moet beginnen met solo staking van uw ETH
lang: nl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie de neushoorn op haar eigen computerchip.
sidebarDepth: 2
summaryPoints:
  - Ontvang maximale beloningen rechtstreeks uit het protocol voor het goed en online laten functioneren van uw validator
  - Voer home-hardware uit en voeg persoonlijk toe aan de beveiliging en decentralisatie van het Ethereum-netwerk
  - Verwijder vertrouwen en geef nooit de controle over de sleutels tot uw geld op
---

## Wat is solo staking? {#what-is-solo-staking}

Solo staking is de handeling van het [uitvoeren van een Ethereum-node](/run-a-node/) aangesloten op het internet en het storten van 32 ETH om een [validator](#faq)te activeren, wat u de mogelijkheid geeft om rechtstreeks deel te nemen aan netwerkconsensus.

**Solo staking verhoogt de decentralisatie van het Ethereum-netwerk**, waardoor Ethereum beter bestand is tegen censuur en robuuster is tegen aanvallen. Andere staking-methoden helpen het netwerk mogelijk niet op dezelfde manier. Solo staking is de beste staking-optie voor het beveiligen van Ethereum.

Een Ethereum-node bestaat uit zowel een uitvoeringslaag (EL)-client, als een consensuslaag (CL)-client. Deze clients zijn software die naast elkaar werken, samen met een geldige set ondertekeningssleutels, om transacties en blokken te verifiëren, het juiste hoofd van de chain te attesteren en blokken voor te stellen.

Solo stakers zijn verantwoordelijk voor het bedienen van de hardware die nodig is om deze clients uit te voeren. Het is ten zeerste aangeraden om hiervoor een speciale machine te gebruiken die u thuis bedient. Dit is zeer nuttig voor de gezondheid van het netwerk.

Een solo staker ontvangt beloningen rechtstreeks uit het protocol voor het goed en online laten functioneren van zijn/haar validator.

## Waarom solo staken? {#why-stake-solo}

Solo staking brengt meer verantwoordelijkheid met zich mee, maar biedt je maximale controle over je fondsen en staking-instellingen.

<CardGrid>
  <Card title="Verdien nieuwe ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Volledige controle" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Netwerkbeveiliging" emoji="🔐" description="Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Overwegingen voordat u begint met solo staking {#considerations-before-staking-solo}

We zouden heel graag willen dat solo staking toegankelijk en risicovrij zou zijn voor iedereen, maar dit is niet de realiteit. Er zijn enkele praktische en serieuze overwegingen om in gedachten te houden voordat u kiest voor het solo staken van uw ETH.

<InfoGrid>
<ExpandableCard title="Verplicht lezen" eventCategory="SoloStaking" eventName="clicked required reading">
Bij het beheren van uw eigen node moet u wat tijd besteden om te leren hoe u de software gebruikt die u heeft gekozen. Dit heeft betrekking op het lezen van relevante documentatie en letten op communicatiekanalen van die dev-teams.

Hoe meer u begrijpt van de software die u gebruikt en hoe proof-of-stake werkt, hoe minder risico's er zullen zijn als staker, en hoe makkelijker het zal zijn om problemen op te lossen die zich kunnen voordoen.
</ExpandableCard>

<ExpandableCard title="Comfortabel met computers" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Node setup vereist een redelijk comfortniveau bij het werken met computers, hoewel nieuwe tools dit makkelijker maken na verloop van tijd. Het begrijpen van de opdrachtregelinterface is nuttig, maar niet langer strikt nodig.

Het vereist ook een zeer elementaire hardwareinstallatie en enig begrip van de aanbevolen minimum specificaties.
</ExpandableCard>

<ExpandableCard title="Veilig sleutelbeheer" eventCategory="SoloStaking" eventName="clicked secure key management">
Net als de wijze waarop privé-sleutels je Ethereum-adres beveiligen, moet je specifieke sleutels genereren voor je validator. Je moet begrijpen hoe je alle zaadzinnen of privé-sleutels veilig kunt bewaren.{' '}

<a href="/security/">Ethereum-beveiliging en scampreventie</a>
</ExpandableCard>

<ExpandableCard title="Onderhoud" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware faalt af en toe, netwerkverbindingen geven soms fouten en client-software moet soms bijgewerkt worden. Node-onderhoud is onvermijdelijk en vereist af en toe uw aandacht. U moet er zeker van zijn dat u op de hoogte blijft van alle verwachte netwerkupgrades of andere kritische client-upgrades.
</ExpandableCard>

<ExpandableCard title="Betrouwbare uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Uw beloningen zijn in verhouding tot de tijd die uw validator online is en juist attesteert. Downtime leidt tot boetes in verhouding tot hoeveel andere andere validators offline zijn op hetzelfde moment, maar <a href="#faq">leidt niet tot slashing</a>. Bandbreedte is ook van belang, omdat de beloningen verminderen voor attesten die niet op tijd worden ontvangen. De vereisten zullen verschillen, maar een minimum van +/- 10 MB/s wordt aanbevolen.
</ExpandableCard>

<ExpandableCard title="Slashing-risico" eventCategory="SoloStaking" eventName="clicked slashing risk">
Anders dan inactiviteitsboetes voor offline zijn, is er ook <em>slashing</em>. Dit is een veel serieuzere boete gereserveerd voor kwaadwillige misdrijven. Door een minderheid-client met sleutels enkel op één machine tegelijk te gebruiken, wordt het risico op slashing geminimaliseerd. Toch moeten alle stakers zich bewust zijn van de risico's van slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Meer over slashing en de levenscyclus van validators</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Hoe het werkt {#how-it-works}

<StakingHowSoloWorks />

Zolang je actief bent, verdien je ETH-beloningen, die periodiek worden gestort op je opnameadres.

Indien ooit gewenst, kunt u stoppen als validator; hiermee hoeft u niet meer online te blijven, wat wel het verkrijgen van verdere beloningen stopt. Je resterende saldo wordt dan opgenomen op het opnameadres dat je tijdens het instellen hebt opgegeven.

[Meer over staking-opnames](/staking/withdrawals/)

## Aan de slag met het Staking Launchpad {#get-started-on-the-staking-launchpad}

Het Staking Launchpad is een open-source applicatie die u helpt om een staker te worden. Het begeleidt u bij het kiezen van uw clients, het genereren van uw sleutels en het storten van uw ETH op het staking-stortingscontract. Er is een checklist beschikbaar om er zeker van te zijn dat u alles heeft ingevuld om uw validator veilig in te stellen.

<StakingLaunchpadWidget />

## Wat te overwegen met tools voor nodes en client-instelling {#node-tool-considerations}

Er is een groeiend aantal tools en services om u te helpen als solo staker van uw ETH, maar elk heeft verschillende risico's en voordelen.

Attribuutindicatoren worden hieronder gebruikt om opmerkelijke sterke of zwakke punten aan te geven die een genoemde staking tool kan hebben. Gebruik deze sectie als referentie voor hoe we deze attributen definiëren wanneer u een tool kiest om u te helpen op uw staking-traject.

<StakingConsiderations page="solo" />

## Onderzoek tools voor nodes en de instelling van clients {#node-and-client-tools}

Er zijn verschillende opties beschikbaar om u te helpen met uw installatie. Gebruik bovenstaande indicatoren om u door de onderstaande tools heen te leiden.

<ProductDisclaimer />

### Node-tools

<StakingProductsCardGrid category="nodeTools" />

Houd rekening met het belang van het kiezen van een [minoriteit-client](/developers/docs/nodes-and-clients/client-diversity/), aangezien dit de veiligheid van het netwerk verbetert en uw risico beperkt. Tools die je in staat stellen om een minderheid-client in te stellen worden aangeduid als <em style={{ textTransform: "uppercase" }}>"multi-client."</em>

### Sleutelgenerators

Deze tools worden gebruikt als een alternatief voor de [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/), om te helpen met het genereren van sleutels.

<StakingProductsCardGrid category="keyGen" />

Heb je een voorstel voor een stakingtool die we hebben gemist? Bekijk ons [productlijstbeleid](/contributing/adding-staking-products/) om te zien of het passend zou zijn en om het ter beoordeling in te dienen.

## Bekijk solo staking-handleidingen {#staking-guides}

<StakingGuides />

## Veelgestelde vragen {#faq}

Dit zijn enkele van de meest voorkomende vragen over staking die de moeite waard zijn om te weten.

<ExpandableCard title="Wat is een validator?">

Een <em>validator</em> is een virtuele entiteit die op Ethereum bestaat en deelneemt aan de consensus van het Ethereum-protocol. Validators worden vertegenwoordigd door een saldo, een publieke sleutel en andere eigenschappen. Een <em>validator-client</em> is de software die namens de validator handelt door de privé-sleutel ervan te bewaren en te gebruiken. Een enkele validator-client kan verschillende sleutelparen hebben die verschillende validators kunnen controleren.

</ExpandableCard>

<ExpandableCard title="Kan ik meer dan 32 ETH storten?">
Voor elk sleutelpaar gekoppeld aan een validator moet precies 32 ETH geactiveerd worden. Meer ETH gestort op een enkele set sleutels verhoogt het beloningspotentieel niet, aangezien elke validator is beperkt tot een <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effectief saldo</a> van 32 ETH. Dit betekent dat staking wordt uitgevoerd in 32 ETH-incrementen, elk met zijn eigen set sleutels en saldo.

Stort niet meer dan 32 ETH voor één enkele validator. Het zal je beloningen niet verhogen. Als er een opnameadres is ingesteld voor de validator, zullen overtollige fondsen boven 32 ETH automatisch worden opgenomen op dit adres tijdens de volgende <a href="/staking/withdrawals/#validator-sweeping">validator-sweep</a>.

Als solo staking u te veeleisend lijkt, overweeg dan om een <a href="/staking/saas/">staking-as-a-service</a> provider te gebruiken, of als je met minder dan 32 ETH werkt, bekijk dan de <a href="/staking/pools/">staking pools</a>.
</ExpandableCard>

<ExpandableCard title="Word ik geslashed als ik offline ga? (tldr: Nee.)">
Offline gaan wanneer het netwerk correct wordt afgesloten, zal NIET resulteren in slashing. Kleine <em>inactiviteitsboetes</em> worden opgelopen als uw validator niet beschikbaar is gedurende een bepaalde tijdsperiode (elk 6,4 minuten lang), maar dit is heel anders dan <em>slashing</em>. Deze boetes zijn iets minder dan de beloning die u zou hebben verdiend als de validator beschikbaar was om te attesteren, en deze verliezen kunnen worden terugverdiend door ongeveer evenveel tijd weer online te blijven.

Merk op dat boetes voor inactiviteit proportioneel zijn aan hoeveel validators tegelijkertijd offline zijn. In gevallen waarbij een groot deel van het netwerk tegelijk geheel offline is, zullen de boetes voor elk van deze validators groter zijn dan wanneer er een enkele validator niet beschikbaar is.

In extreme gevallen, als het netwerk stopt met werken doordat meer dan een derde van de validators offline is, zullen deze gebruikers ondervinden wat bekend staat als een <em>kwadratisch inactiviteitslek</em>, wat een exponentiële afvoer van ETH van offline validator-accounts is. Dit stelt het netwerk in staat om zichzelf uiteindelijk te genezen door het verbranden van ETH van inactieve validators totdat hun saldo 16 ETH bereikt, op welk moment ze automatisch zullen worden verwijderd uit de validator-pool. De resterende online validators zullen uiteindelijk weer meer dan 2/3 van het netwerk omvatten, waarmee voldaan wordt aan de supermeerderheid die nodig is om de chain opnieuw te voltooien.
</ExpandableCard>

<ExpandableCard title="Hoe zorg ik ervoor dat ik niet geslashed zal worden?">
Kort samengevat kan dit nooit volledig worden gegarandeerd, maar als u te goeder trouw handelt, een minderheid-client uitvoert en uw ondertekeningssleutels op slechts één machine tegelijk houdt, is het risico om geslashed te worden bijna nul.

Er zijn slechts enkele specifieke manieren die ertoe kunnen leiden dat een validator geslashed en uit het netwerk verwijderd wordt. Op het moment van schrijven, zijn de slashings die zich hebben voorgedaan uitsluitend het resultaat geweest van overbodige hardware-instellingen waarbij ondertekeningssleutels op twee aparte machines tegelijk werden opgeslagen. Dit kan per ongeluk resulteren in een <em>dubbele stem</em> van uw sleutels, wat een overtreding is die tot slashing kan leiden.

Het uitvoeren van een supermeerderheid-client (elke client die gebruikt wordt door meer dan 2/3 van het netwerk) houdt ook het risico in van een mogelijke slashing in het geval dat deze client een bug heeft die resulteert in een chain fork. Dit kan leiden tot een onjuiste fork die afgerond wordt. Om terug te corrigeren naar de beoogde chain moet u een <em>surround vote</em> indienen door te proberen een afgerond blok ongedaan te maken. Dit is ook een overtreding die tot slashing kan leiden; dit kan worden vermeden door simpelweg een minderheid-client te gebruiken.

Gelijkwaardige bugs in een <em>minderheid-client zouden nooit afgerond worden</em> en zouden dus nooit resulteren in een surround vote; het zou simpelweg leiden tot inactiviteitsboetes, <em>niet tot slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Meer informatie over het belang van het uitvoeren van een minderheid-client.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Meer informatie over slashing-preventie</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Welke client is de beste?">
Individuele clients kunnen wat betreft prestatie en gebruikersinterface lichtjes variëren, omdat ze elk ontwikkeld zijn door verschillende teams die verschillende programmeertalen gebruiken. Dat gezegd hebbende, is geen enkele de "beste" client. Alle productie-clients zijn uitstekende stukken software, die allemaal dezelfde kernfuncties uitvoeren om te synchroniseren en te communiceren met de blockchain.

Aangezien alle productie-clients dezelfde basisfunctionaliteit bieden, is het in feite erg belangrijk dat u kiest voor een <strong>minderheid-client</strong> - dit betekent een client die op dit moment NIET wordt gebruikt door de meerderheid van de validators op het netwerk. Dit kan contraproductief klinken, maar met een meerderheid- of supermeerderheid-client heeft u een verhoogd risico op slashing in het geval van een bug in die client. Het uitvoeren van een minderheid-client beperkt deze risico's aanzienlijk.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Meer informatie over de reden waarom client-diversiteit cruciaal is</a>
</ExpandableCard>

<ExpandableCard title="Kan ik gewoon een VPS (virtuele privé-server) gebruiken?">
Hoewel een virtuele privé-server (VPS) kan worden gebruikt als vervanging voor thuishardware, zijn de fysieke toegang en locatie van uw validator-client <em>ook van belang</em>. Gecentraliseerde cloudoplossingen zoals Amazon Web Services of Digital Ocean maken het mogelijk om hardware niet zelf te hoeven verkrijgen en bedienen, ten koste van het centraliseren van het netwerk.

Hoe meer validator-clients draaien op een enkele gecentraliseerde cloud-opslagoplossing, hoe gevaarlijker het wordt voor deze gebruikers. Elke gebeurtenis die deze providers offline haalt, of dat nu het geval is door aanvallen, regelgevingseisen of gewoon door stroom- en internetproblemen, zorgt ervoor dat elke validator-client die van deze server afhankelijk is tegelijkertijd offline gaat.

Offline boetes zijn evenredig aan hoeveel andere validators er tegelijkertijd offline zijn. Het gebruik van een VPS verhoogt het risico dat offline boetes zwaarder zullen zijn, en verhoogt uw risico op kwadratische lekkage of slashing in het geval dat de uitval groot genoeg is. Om uw eigen risico en het risico voor het netwerk te minimaliseren, worden gebruikers sterk aangemoedigd om hun eigen hardware te verkrijgen en gebruiken.
</ExpandableCard>

<ExpandableCard title="Hoe kan ik mijn beloningen ontgrendelen of mijn ETH terugkrijgen?">

Voor elke opname uit de Beacon Chain moeten opnamegegevens worden ingesteld.

Nieuwe stakers stellen dit in op het moment dat ze de sleutel genereren en een storting doen. Bestaande stakers die dit nog niet hebben ingesteld, kunnen hun sleutels upgraden om deze functionaliteit te ondersteunen.

Zodra de opnamegegevens zijn ingesteld, worden beloningsbetalingen (verzamelde ETH over de eerste 32) automatisch periodiek naar het opnameadres verzonden.

Om je volledige saldo te ontgrendelen en terug te krijgen, moet je ook het proces van het afsluiten van je validator voltooien.

<ButtonLink href="/staking/withdrawals/">Meer over staking-opnames</ButtonLink>
</ExpandableCard>

## Verder lezen {#further-reading}

- [De staking-directory van Ethereum](https://www.staking.directory/) - _Eridian en Spacesider_
- [Ethereum's Client Diversity Problem](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Helping Client Diversity](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client diversity on Ethereum's consensus layer](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [How To: Shop For Ethereum Validator Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Step by Step: How to join the Ethereum 2.0 Testnet](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Eth2 Slashing Prevention Tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
