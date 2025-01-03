---
title: Statusloosheid, statusverval en geschiedenisverval
description: Uitleg over geschiedenisverval en statusloze Ethereum
lang: nl
---

# Statusloosheid, statusverval en geschiedenisverval {#statelessness}

De mogelijkheid om Ethereum-nodes op eenvoudige hardware te laten functioneren is cruciaal voor een werkelijke decentralisatie. Dit komt omdat het uitvoeren van een node gebruikers de mogelijkheid geeft om informatie te verifiëren door zelfstandig cryptografische controles uit te voeren in plaats van te vertrouwen op een derde partij die hen gegevens geeft. Het uitvoeren van een node stelt gebruikers in staat om transacties direct in te dienen bij het peer-to-peer netwerk van Ethereum in plaats van te moeten vertrouwen op een tussenpersoon. Decentralisatie is niet mogelijk als deze voordelen alleen beschikbaar zijn voor gebruikers met dure hardware. In plaats daarvan moeten nodes uitgevoerd kunnen worden met extreem bescheiden verwerkings- en geheugenvereisten, zodat ze op mobiele telefoons, microcomputers of onmerkbaar op een thuiscomputer kunnen draaien.

Vandaag de dag zijn de hoge schijfruimtevereisten de belangrijkste hindernis voor een universele toegang tot nodes. Dit is voornamelijk te wijten aan de noodzaak om grote delen van de statusgegevens van Ethereum op te slaan. Deze statusgegevens bevatten kritieke informatie die nodig is om nieuwe blocks en transacties correct te verwerken. Op het moment van schrijven wordt een snelle SSD van 2 TB aanbevolen om een volledige node van Ethereum te kunnen uitvoeren. Voor een node die geen oudere gegevens verwijdert, groeit de opslagbehoefte met ongeveer 14 GB per week en archiefnodes die alle gegevens sinds het ontstaan opslaan, naderen de 12 TB (op het moment van schrijven, in februari 2023).

Goedkopere harde schijven kunnen worden gebruikt om oudere gegevens op te slaan, maar deze zijn te traag om binnenkomende blocks bij te houden. Het behouden van de huidige opslagmodellen voor clients terwijl gegevens goedkoper en gemakkelijker worden opgeslagen, is slechts een tijdelijke en gedeeltelijke oplossing voor het probleem omdat de statusgroei van Ethereum “onbegrensd” is, wat betekent dat de opslagvereisten alleen maar kunnen toenemen en technologische verbeteringen steeds gelijke tred moeten houden met de voortdurende statusgroei. In plaats daarvan moeten clients nieuwe manieren vinden om blocks en transacties te verifiëren die niet afhankelijk zijn van het opzoeken van gegevens in lokale databases.

## Opslag verminderen voor nodes {#reducing-storage-for-nodes}

Er zijn verschillende manieren om de hoeveelheid gegevens die elke node moet opslaan te verminderen, waarbij voor elke manier het kernprotocol van Ethereum in verschillende mate moet worden bijgewerkt:

- **Vervallen van de geschiedenis**: stelt nodes in staat om statusgegevens ouder dan X blocks te verwerpen, maar verandert niet hoe Ethereum-clients statusgegevens verwerken
- **Vervallen van de status**: staat toe dat statusgegevens die niet vaak gebruikt worden inactief worden. Inactieve gegevens kunnen door clients worden genegeerd totdat ze weer worden geactiveerd.
- **Zwakke statusloosheid**: alleen blockproducenten hebben toegang nodig tot volledige statusgegevens, andere nodes kunnen blocks verifiëren zonder een lokale statusdatabase.
- **Sterke statusloosheid**: geen nodes hebben toegang nodig tot de volledige statusgegevens.

## Verval van gegevens {#data-expiry}

### Verval van geschiedenis {#history-expiry}

Het vervallen van de geschiedenis verwijst naar clients die oudere gegevens verwijderen die ze waarschijnlijk niet nodig hebben, zodat ze slechts een kleine hoeveelheid historische gegevens opslaan en oudere gegevens achterwege laten als er nieuwe gegevens binnenkomen. Er zijn twee redenen waarom clients historische gegevens nodig hebben: synchronisatie en het afhandelen van gegevensverzoeken. Oorspronkelijk moesten clients synchroniseren vanaf het ontstaansblock, waarbij ze moesten verifiëren dat elke opeenvolgend block correct was, helemaal tot aan de top van de chain. Vandaag de dag gebruiken clients “zwakke subjectiviteitscontrolepunten” om hun weg naar de top van de chain te bootstrappen. Deze controlepunten zijn vertrouwde startpunten, zoals een ontstaansblock in de buurt van het heden in plaats van het allereerste begin van Ethereum. Dit betekent dat clients alle informatie voorafgaand aan het meest recente zwakke subjectiviteitscontrolepunt kunnen verwijderen zonder de mogelijkheid te verliezen om te synchroniseren met de top van de chain. Op dit moment dienen clients verzoeken in (die binnenkomen via JSON-RPC) voor historische gegevens door deze uit hun lokale databases te halen. Bij het verval van de geschiedenis is dit echter niet mogelijk als de opgevraagde gegevens zijn verwijderd. Voor deze historische gegevens zijn innovatieve oplossingen nodig.

Eén optie is dat clients historische gegevens opvragen bij andere gebruikers via een oplossing zoals het Portal Network. Het Portal Network is een peer-to-peer netwerk in ontwikkeling voor het aanbieden van historische gegevens waar elke node een klein stukje van de geschiedenis van Ethereum opslaat, zodat de hele geschiedenis verspreid over het netwerk bestaat. Verzoeken worden ingediend door peers op te zoeken die de relevante gegevens opslaan en deze bij hen op te vragen. Als alternatief, omdat het meestal apps zijn die toegang nodig hebben tot historische gegevens, kan het hun verantwoordelijkheid worden om deze op te slaan. Er kunnen ook genoeg altruïstische actoren aanwezig zijn binnen Ethereum die bereid zijn om een historisch archief bij te houden. Het kan een DAO zijn die wordt opgestart om de opslag van historische gegevens te beheren, of idealiter wordt het een combinatie van al deze opties. Deze aanbieders kunnen de gegevens op verschillende manieren aanbieden, zoals op een torrent, FTP, Filecoin of IPFS.

Het vervallen van de geschiedenis is enigszins controversieel omdat Ethereum tot nu toe altijd impliciet de beschikbaarheid van historische gegevens heeft gegarandeerd. Een volledige synchronisatie vanaf het ontstaan is altijd standaard mogelijk geweest, zelfs als dit afhankelijk was van het opnieuw opbouwen van sommige oudere gegevens vanuit snapshots. Het vervallen van de geschiedenis verplaatst de verantwoordelijkheid voor het bieden van deze garantie buiten het kernprotocol van Ethereum. Dit kan nieuwe censuurrisico's met zich meebrengen als het uiteindelijk gecentraliseerde organisaties zijn die historische gegevens gaan leveren.

EIP-4444 is nog niet klaar om beschikbaar te worden, maar er wordt actief over gesproken. Interessant genoeg zijn de uitdagingen met EIP-4444 niet zozeer technisch, maar vooral community management. Om dit beschikbaar te kunnen maken, is er een community buy-in nodig die niet alleen overeenstemming omvat, maar ook toezeggingen om historische gegevens van betrouwbare entiteiten op te slaan en te leveren.

Deze upgrade verandert niet fundamenteel hoe Ethereum-nodes omgaan met statusgegevens, het verandert alleen hoe historische gegevens toegankelijk zijn.

### Verval van status {#state-expiry}

Het vervallen van de status heeft betrekking op het verwijderen van de status van individuele nodes als deze niet recentelijk is gebruikt. Dit kan op verschillende manieren worden geïmplementeerd:

- **Verval door huur**: accounts “huur” aanrekenen en ze laten vervallen wanneer hun huur nul bereikt
- **Verval door tijd**: accounts inactief maken als er gedurende een bepaalde tijd niet op/naar dat account is gelezen/geschreven

Verval door huur zou een directe huur kunnen zijn die aan accounts in rekening wordt gebracht om ze in de actieve statusdatabase te houden. Verval door tijd kan aftellen zijn vanaf de laatste interactie met het account, of het kan een periodiek verval van alle accounts zijn. Er kunnen ook mechanismen ingebouwd worden die elementen van zowel het tijd- als het huurgebaseerde model combineren, bijvoorbeeld individuele accounts blijven actief als ze een kleine vergoeding betalen voordat het tijdgebaseerde model afloopt. Bij statusverval is het belangrijk op te merken dat een inactieve status **niet verwijderd** wordt. Deze wordt gewoon apart van de actieve status opgeslagen. De inactieve status kan worden hersteld in de actieve status.

De manier waarop dit werkt is waarschijnlijk om een statusstructuur te gebruiken voor specifieke tijdsperioden (ongeveer ~1 jaar). Telkens als er een nieuwe periode begint, begint er ook een compleet nieuwe statusstructuur. Enkel de huidige statusstructuur kan worden gewijzigd, alle andere zijn onveranderlijk. Van Ethereum-nodes wordt verwacht dat ze uitsluitend de huidige statusstructuur en de meest recente bewaren. Dit vereist een manier om een adres te voorzien van een tijdstempel met de periode waarin het bestaat. Er zijn [verschillende manieren](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) om dit te doen, maar de beste optie vereist dat [adressen worden verlengd](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) om de extra informatie te bevatten met als bijkomend voordeel dat langere adressen veel veiliger zijn. Het item op de routekaart dat dit doet heet [uitbreiding adresruimte](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Net als bij het vervallen van de geschiedenis, wordt bij het vervallen van de status de verantwoordelijkheid voor het opslaan van oude statusgegevens weggenomen bij individuele gebruikers en overgedragen aan andere entiteiten zoals gecentraliseerde aanbieders, altruïstische leden van de gemeenschap of meer futuristische gedecentraliseerde oplossingen zoals het Portal Network.

Het vervallen van de status bevindt zich nog in de onderzoeksfase en is nog niet klaar om beschikbaar te worden. Het verlopen van de status kan later plaatsvinden dan bij statusloze clients en het vervallen van de geschiedenis, omdat deze upgrades grote statusgroottes gemakkelijk hanteerbaar maken voor de meerderheid van validators.

## Statelessness {#statelessness}

Staatloosheid is een beetje een verkeerde uitdrukking omdat het niet betekent dat het concept van “status” wordt geëlimineerd, maar het impliceert wel veranderingen in de manier waarop nodes van Ethereum omgaan met statusgegevens. Staatloosheid zelf bestaat in twee varianten: zwakke statusloosheid en sterke statusloosheid. Een zwakke statusloosheid stelt de meeste nodes in staat om statusloos te worden door de verantwoordelijkheid voor het opslaan van de status bij een paar nodes te leggen. Een sterke statusloosheid maakt het voor geen enkele node nodig om de volledige statusgegevens op te slaan. Zowel een zwakke als een sterke statusloosheid heeft de volgende voordelen voor normale validators:

- een bijna onmiddellijke synchronisatie
- de mogelijkheid om blocks buiten volgorde te valideren
- nodes die kunnen worden uitgevoerd met zeer lage hardwarevereisten (bijv. op telefoons)
- nodes kunnen op goedkope harde schijven uitgevoerd worden, omdat lezen/schrijven van schijven niet nodig is
- compatibel met toekomstige upgrades van de cryptografie van Ethereum

### Zwakke statusloosheid {#weak-statelessness}

Een zwakke statusloosheid brengt veranderingen met zich mee in de manier waarop Ethereum-nodes statusveranderingen verifiëren, maar het neemt de noodzaak voor het opslaan van de status in alle nodes op het netwerk niet volledig weg. Zwakke statusloosheid legt in plaats daarvan de verantwoordelijkheid voor het opslaan van de status bij de indieners van blocks, terwijl alle andere nodes op het netwerk blocks verifiëren zonder de volledige statusgegevens op te slaan.

**Bij zwakke statusloosheid is voor het voorstellen van blocks toegang tot volledige statusgegevens nodig, maar voor het verifiëren van blocks zijn geen statusgegevens nodig**

Om dit te realiseren, moeten [Verkle Trees](/roadmap/verkle-trees/) al geïmplementeerd zijn in Ethereum-clients. Verkle trees zijn een vervangende datastructuur voor het opslaan van statusgegevens van Ethereum die het mogelijk maken om kleine “getuigen” met een vaste grootte van de gegevens door te geven tussen andere gebruikers en deze in te zetten om blocks te verifiëren in plaats van blocks te verifiëren aan de hand van lokale databases. [Een scheiding van voorstellers en bouwers](/roadmap/pbs/) is ook nodig omdat dit toestaat dat blockbouwers gespecialiseerde nodes zijn met krachtigere hardware, en dat zijn degenen die toegang nodig hebben tot de volledige statusgegevens.

<ExpandableCard title="Waarom is het oké om te vertrouwen op een kleiner aantal blockvoorstellers?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Statusloosheid is afhankelijk van blockbouwers die een kopie van de volledige statusgegevens bijhouden, zodat ze getuigen kunnen genereren die gebruikt kunnen worden om de block te verifiëren. Andere nodes hebben geen toegang nodig tot de statusgegevens, alle informatie die nodig is om de block te verifiëren is beschikbaar in de getuige. Dit creëert een situatie waarin het voorstellen van een block duur wordt, maar het verifiëren van de block goedkoop, wat betekent dat minder operators een blockvoorstellende node zullen uitvoeren. De decentralisatie van blockvoorstellers is echter niet cruciaal zolang zoveel mogelijk deelnemers onafhankelijk kunnen verifiëren of de blocks die ze voorstellen geldig zijn.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Ontdek meer over Dankrad's opmerkingen</ButtonLink>
</ExpandableCard>

Blockvoorstellers gebruiken de statusgegevens om “getuigen” aan te maken. Dit is de minimale set gegevens die de waarden van de status bewijst die door de transacties in een block worden veranderd. Andere validators bewaren de status niet, ze bewaren alleen de status-root (een hash van de hele status). Ze ontvangen een block en een getuige en gebruiken deze om hun status-root bij te werken. Dit maakt een validatienode extreem licht.

Het onderzoek naar zwakke statusloosheid bevindt zich in een vergevorderd stadium, maar het is gebaseerd op de scheiding tussen voorstellers en bouwers en Verkle Trees zijn geïmplementeerd, zodat kleine getuigen tussen verschillende gebruikers kunnen worden doorgegeven. Dit betekent dat zwakke statusloosheid waarschijnlijk nog een paar jaar verwijderd is van het hoofdnet van Ethereum.

### Sterke statusloosheid {#strong-statelessness}

Een sterke statusloosheid maakt het voor geen enkele node nodig om statusgegevens op te slaan. In plaats daarvan worden transacties verzonden met getuigen die kunnen worden samengevoegd door blockproducenten. De blockproducenten zijn vervolgens verantwoordelijk voor het opslaan van alleen die statussen die nodig zijn voor het aanmaken van getuigen voor relevante accounts. De verantwoordelijkheid voor de status wordt bijna volledig verplaatst naar gebruikers, omdat ze getuigen en “toegangslijsten” sturen om aan te geven met welke accounts en opslagsleutels ze communiceren. Dit zorgt voor extreem lichte nodes, maar er zijn nadelen, zoals het lastiger maken van transacties met smart contracts.

Een sterke statusloosheid is bestudeerd door onderzoekers, maar er wordt op dit moment niet verwacht dat dit deel zal uitmaken van de Ethereum-routekaart. Het is waarschijnlijker dat een zwakke statusloosheid voldoende is voor de opschaalbehoeften van Ethereum.

## Huidige vooruitgang {#current-progress}

Een zwakke statusloosheid, het vervallen van de geschiedenis en van de status bevinden zich allemaal in de onderzoeksfase en zullen naar verwachting over enkele jaren beschikbaar worden. Er is geen garantie dat al deze voorstellen worden geïmplementeerd. Als bijvoorbeeld eerst het statusverval wordt geïmplementeerd, is het wellicht niet nodig om ook het geschiedenisverval te implementeren. Er bevinden zich nog andere punten op de routekaart, zoals [Verkle Trees](/roadmap/verkle-trees) en [de scheiding tussen voorstellers en bouwers](/roadmap/pbs) die eerst moeten worden aangepakt.

## Verder lezen {#further-reading}

- [Vitalik statusloosheid AMA](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Een theorie over statusgroottebeheer](https://hackmd.io/@vbuterin/state_size_management)
- [Herrijzenis-conflict-minimale statusbegrenzing](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Paden naar statusloosheid en statusverval](https://hackmd.io/@vbuterin/state_expiry_paths)
- [EIP-4444-specificatie](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes over EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Waarom het zo belangrijk is om statusloos te gaan](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [De originele statusloze clientconcept-notities](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Meer over statusverval](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Nog meer over statusverval](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
