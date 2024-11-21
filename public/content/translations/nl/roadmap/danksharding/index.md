---
title: Danksharding
description: Ontdek meer over Proto-Danksharding en Danksharding, twee opeenvolgende upgrades voor het opschalen van Ethereum.
lang: nl
summaryPoints:
  - Danksharding is een upgrade in meerdere fasen om de schaalbaarheid en capaciteit van Ethereum te verbeteren.
  - De eerste fase, Proto-Danksharding, voegt gegevensblobs toe aan blocks
  - Gegevensblobs bieden een goedkopere manier voor rollups om gegevens op Ethereum te plaatsen en die kosten kunnen worden doorberekend aan gebruikers in de vorm van lagere transactiekosten.
  - Later zal een volledige Danksharding de verantwoordelijkheid voor het verifiëren van gegevensblobs verdelen over subsets van nodes, waardoor Ethereum verder zal opschalen naar meer dan 100.000 transacties per seconde.
---

# Danksharding {#danksharding}

**Danksharding** is hoe Ethereum een echt schaalbare blockchain kan worden, maar er zijn verschillende protocolupgrades nodig om dit te bereiken. **Proto-Danksharding** is een tussenstap. Beide hebben als doel om transacties op laag 2 zo goedkoop mogelijk te maken voor gebruikers en zullen Ethereum wellicht opschalen naar >100.000 transacties per seconde.

## Wat is Proto-Danksharding? {#what-is-protodanksharding}

Proto-Danksharding, ook bekend als [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), is een manier voor [rollups](/layer-2/#rollups) om goedkopere gegevens aan blocks toe te voegen. De naam komt van de twee onderzoekers die het idee hebben voorgesteld: Protolambda en Dankrad Feist. Historisch gezien zijn rollups beperkt in hoe goedkoop ze gebruikerstransacties kunnen maken door het feit dat ze hun transacties plaatsen in `CALLDATA`.

Dit is duur omdat het door alle Ethereum-nodes wordt verwerkt en voor altijd op de chain blijft staan, ook al hebben rollups de gegevens maar korte tijd nodig. Proto-Danksharding gebruikt gegevensblobs die kunnen worden verzonden en aan blocks kunnen worden gekoppeld. De gegevens in deze blobs zijn niet toegankelijk voor de EVM en worden automatisch verwijderd na een vaste tijdsperiode (op het moment van schrijven ingesteld op 4096 epochs, of ongeveer 18 dagen). Dit betekent dat rollups hun gegevens veel goedkoper kunnen verzenden en de besparingen kunnen doorrekenen aan eindgebruikers in de vorm van goedkopere transacties.

<ExpandableCard title="Waarom maken blobs rollups goedkoper?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollups zijn een manier om Ethereum op te schalen door transacties off-chain te bundelen en vervolgens de resultaten naar Ethereum te sturen. Een rollup bestaat in wezen uit twee delen: gegevens en een uitvoeringscontrole. De gegevens zijn de volledige opeenvolging van transacties die worden verwerkt door een rollup om de statuswijziging te produceren die wordt doorgestuurd naar Ethereum. De uitvoeringscontrole is het opnieuw uitvoeren van deze transacties door een eerlijke actor (een “bewijzer”) om er zeker van te zijn dat de voorgestelde statusverandering correct is. Om de uitvoeringscontrole uit te voeren, moeten de transactiegegevens lang genoeg beschikbaar zijn zodat iedereen ze kan downloaden en controleren. Dit betekent dat elk oneerlijk gedrag van de rollup-sequencer kan worden geïdentificeerd en aangevochten door de bewijzer. Dit hoeft echter niet voor altijd beschikbaar te zijn.

</ExpandableCard>

<ExpandableCard title="Waarom is het OK om blobgegevens te verwijderen?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollups plaatsen verbintenissen voor hun transactiegegevens op de chain en maken ook de feitelijke gegevens beschikbaar in gegevensblobs. Dit betekent dat bewijzers kunnen controleren of de verbintenissen geldig zijn of gegevens kunnen betwisten waarvan ze denken dat ze fout zijn. Op node-niveau worden de blobs met gegevens bewaard in de consensusclient. De consensusclients bevestigen dat ze de gegevens gezien hebben en dat ze verspreid zijn over het netwerk. Als de gegevens voor altijd bewaard zouden worden, zouden deze clients te groot worden en leiden tot grote hardwarevereisten voor het uitvoeren van nodes. De gegevens worden in plaats daarvan elke 18 dagen automatisch uit de node verwijderd. De consensusclientbevestigingen tonen aan dat er voldoende gelegenheid was voor bewijzers om de gegevens te verifiëren. De feitelijke gegevens kunnen off-chain worden opgeslagen door rollup-operators, gebruikers of anderen.

</ExpandableCard>

### Hoe worden blobgegevens geverifieerd? {#how-are-blobs-verified}

Rollups plaatsen de transacties die ze uitvoeren in gegevensblobs. Ze zorgen ook voor een "verbintenis" met de gegevens. Ze doen dit door een polynomiale functie in de gegevens te passen. Deze functie kan vervolgens op verschillende punten worden geëvalueerd. Als we bijvoorbeeld een uiterst eenvoudige functie `f(x) = 2x-1` definiëren, dan kunnen we deze functie evalueren door `x = 1`, `x = 2`, `x = 3`, wat de resultaten `1, 3 en 5` oplevert. Een bewijzer past dezelfde functie toe op de gegevens en evalueert deze op dezelfde punten. Als de oorspronkelijke gegevens worden gewijzigd, dan is de functie niet identiek, en dus ook de waarden die op elk punt worden geëvalueerd niet. In werkelijkheid zijn de verbintenis en het bewijs gecompliceerder omdat ze verpakt zijn in cryptografische functies.

### Wat is KZG? {#what-is-kzg}

KZG staat voor Kate-Zaverucha-Goldberg. Dit zijn de namen van de drie [originele auteurs](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) van een schema dat een gegevensblob reduceert tot een kleine [cryptografische "toezegging"](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). De blob met gegevens die wordt ingediend door een rollup, moet worden geverifieerd om er zeker van te zijn dat de rollup zich niet misdraagt. Dit houdt in dat een bewijzer de transacties in de blob opnieuw uitvoert om te controleren of de verbintenis geldig was. Conceptueel is dit hetzelfde als de manier waarop uitvoeringsclients de geldigheid van Ethereum-transacties op laag 1 controleren met Merkle-bewijzen. KZG is een alternatief bewijs waarbij een polynomiale vergelijking past bij de gegevens. De verbintenis evalueert de polynoom op een aantal geheime gegevenspunten. Een bewijzer past dezelfde polynoom toe op de gegevens en evalueert deze op dezelfde waarden, waarbij hij/zij controleert of het resultaat hetzelfde is. Dit is een manier om de gegevens te verifiëren die compatibel is met zero-knowledgetechnieken die gebruikt worden door sommige rollups en uiteindelijk andere delen van het protocol van Ethereum.

### Wat was de KZG-ceremonie? {#what-is-a-kzg-ceremony}

De KZG-ceremonie was een manier voor veel mensen uit de hele Ethereumgemeenschap om samen een geheime willekeurige getallenreeks te genereren die gebruikt kan worden om bepaalde gegevens te verifiëren. Het is erg belangrijk dat deze getallenreeks niet bekend is en door niemand nagemaakt kan worden. Om hiervoor te zorgen, kreeg iedereen die deelnam aan de ceremonie een string van de vorige deelnemer. Vervolgens creëerden ze een aantal nieuwe willekeurige waarden (bv. door hun browser de beweging van hun muis te laten meten) en combineerden die met de vorige waarde. Vervolgens stuurden ze de waarde door naar de volgende deelnemer en vernietigden deze vanaf hun lokale apparaat. Zolang één persoon in de ceremonie dit eerlijk heeft gedaan, zal de uiteindelijke waarde voor een aanvaller onkenbaar zijn.

De EIP-4844 KZG-ceremonie was open voor het publiek en tienduizenden mensen namen deel om hun eigen entropie (willekeurigheid) toe te voegen. In totaal waren er meer dan 140.000 bijdragen, waardoor het 's werelds grootste ceremonie van dit soort was. Om de ceremonie te ondermijnen zou 100% van de deelnemers actief oneerlijk moeten zijn. Vanuit het perspectief van de deelnemers, als ze weten dat ze eerlijk waren, is het niet nodig om iemand anders te vertrouwen omdat ze weten dat ze de ceremonie veilig hebben gesteld (ze hebben individueel voldaan aan de eis van 1 op de N eerlijke deelnemers).

<ExpandableCard title="Waar wordt het willekeurige nummer van de KZG-ceremonie voor gebruikt?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Wanneer een rollup gegevens in een blob plaatst, geven ze een “verbintenis” die ze op de chain plaatsen. Deze verbintenis is het resultaat van de evaluatie van een polynoom die op bepaalde punten op de gegevens past. Deze punten worden bepaald door de willekeurige getallen die tijdens de KZG-ceremonie worden gegenereerd. Bewijzers kunnen vervolgens de polynoom op dezelfde punten evalueren om de gegevens te verifiëren. Als ze op dezelfde waarden uitkomen, dan zijn de gegevens correct.

</ExpandableCard>

<ExpandableCard title="Waarom moeten de willekeurige gegevens van de KZG geheim blijven?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Als iemand de willekeurige locaties kent die gebruikt zijn voor de verbintenis, dan is het gemakkelijk voor hem/haar om een nieuwe polynoom te genereren die op die specifieke punten past (d.w.z. een “botsing”). Dit betekent dat ze gegevens kunnen toevoegen of verwijderen uit de blob en nog steeds een geldig bewijs kunnen leveren. Om dit te voorkomen krijgen de bewijzers, in plaats van de werkelijke geheime locaties, de locaties verpakt in een cryptografische “zwarte doos” die elliptische krommen gebruikt. Deze vervormen de waarden op zo'n manier dat de originele waarden niet kunnen worden achterhaald, maar met wat slimme algebra kunnen bewijzers en verificators nog steeds polynomen evalueren op de punten die ze vertegenwoordigen.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Danksharding noch Proto-Danksharding volgen het traditionele “sharding”-model dat erop gericht is om de blockchain in meerdere delen op te splitsen. Shard chains maken niet langer deel uit van de routekaart. In plaats daarvan gebruikt Danksharding een gespreide steekproef van gegevens over blobs om Ethereum op te schalen. Dit is veel eenvoudiger te implementeren. Dit model wordt ook wel "data-sharding" genoemd.
</InfoBanner>

## Wat is Danksharding? {#what-is-danksharding}

Danksharding is de volledige realisatie van de rollup-opschaling die begon met Proto-Danksharding. Danksharding brengt enorme hoeveelheden ruimte op Ethereum voor rollups om hun gecomprimeerde transactiegegevens te dumpen. Dit betekent dat Ethereum met gemak honderden individuele rollups kan ondersteunen en miljoenen transacties per seconde kan uitvoeren.

De manier waarop dit werkt is door de blobs die aan blocks vastzitten, uit te breiden van zes (6) in Proto-Danksharding naar 64 in volledige Danksharding. De rest van de benodigde wijzigingen zijn allemaal updates aan de manier waarop consensusclients werken om deze in staat te stellen om met de nieuwe grote blobs om te gaan. Verschillende van deze wijzigingen staan al op de planning voor andere doeleinden, onafhankelijk van Danksharding. Danksharding vereist bijvoorbeeld dat de scheiding tussen voorsteller en bouwer is geïmplementeerd. Dit is een upgrade die de taken van het bouwen van blocks en het voorstellen van blocks scheidt over verschillende validators. Op dezelfde manier is data availability sampling nodig voor Danksharding, maar het is ook nodig voor de ontwikkeling van zeer lichte clients die niet veel historische gegevens opslaan (“statusloze clients”).

<ExpandableCard title="Waarom heeft Danksharding een scheiding tussen voorsteller en bouwer nodig?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Een scheiding tussen voorsteller en bouwer is nodig om te voorkomen dat individuele validators dure verbintenissen en bewijzen moeten genereren voor 32MB aan blobgegevens. Dit zou de stakers thuis te veel belasten en hen verplichten om te investeren in krachtigere hardware, wat de decentralisatie niet ten goede komt. In plaats daarvan nemen gespecialiseerde blockbouwers de verantwoordelijkheid voor dit dure rekenwerk. Vervolgens stellen ze hun blocks beschikbaar aan blockvoorstellers om ze uit te zenden. De blockvoorsteller kiest simpelweg de block die het meest winstgevend is. Iedereen kan de blobs goedkoop en snel verifiëren, wat betekent dat elke normale validator kan controleren of de blockbouwers zich eerlijk gedragen. Hierdoor kunnen de grote blobs worden verwerkt zonder dat dit ten koste gaat van de decentralisatie. Blockbouwers die zich misdragen, kunnen gewoon uit het netwerk worden gezet en “geslasht”. Anderen zullen dan hun plaats innemen omdat het bouwen van blocks een winstgevende activiteit is.

</ExpandableCard>

<ExpandableCard title="Waarom heeft Danksharding data availability sampling nodig?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Data availability sampling is nodig voor validators om blobgegevens snel en efficiënt te verifiëren. Met behulp van data availability sampling kunnen de validators er heel zeker van zijn dat de blobgegevens beschikbaar waren en correct werden vastgelegd. Elke validator kan willekeurig een paar gegevenspunten nemen en een bewijs aanmaken, wat betekent dat geen enkele validator de hele blob hoeft te controleren. Als er gegevens ontbreken, worden deze snel geïdentificeerd en wordt de blob afgewezen.

</ExpandableCard>

### Huidige vooruitgang {#current-progress}

Volledige Danksharding zit er de eerste jaren nog niet aan te komen. Ondertussen is de KZG-ceremonie afgesloten met meer dan 140.000 bijdragen en is de [EIP](https://eips.ethereum.org/EIPS/eip-4844) voor Proto-Danksharding helemaal volgroeid. Dit voorstel is volledig geïmplementeerd in alle testnetten en is live gegaan op het hoofdnet met de Cancun-Deneb (“Dencun”) netwerkupgrade in maart 2024.

### Verder lezen {#further-reading}

- [Proto-Danksharding notities](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad's notities over Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto en Vitalik bespreken Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [De KZG-ceremonie](https://ceremony.ethereum.org/)
- [De lezing van Carl Beekhuizen op Devcon over vertrouwde systemen](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Meer over data availability sampling voor blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist over KZG-verbintenissen en bewijzen](https://youtu.be/8L2C6RDMV9Q)
- [KZG polynomiale verbintenissen](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
