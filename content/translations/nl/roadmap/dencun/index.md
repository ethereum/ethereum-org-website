---
title: Veelgestelde vragen over Cancun-Deneb (Dencun)
description: Veelgestelde vragen over de Cancun-Deneb (Dencun) netwerk-upgrade
lang: nl
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) is een upgrade voor het Ethereumnetwerk, die **Proto-Danksharding (EIP-4844)** activeert, en tijdelijke data **blobs** introduceert, voor een goedkopere [laag 2 (L2)](/woordenlijst/#laag-2) rollup-opslag.

Een nieuw transactietype stelt rollupaanbieders in staat om gegevens op een meer kosteneffectieve manier op te slaan in zogenaamde “blobs”. Blobs zijn gegarandeerd ongeveer 18 dagen beschikbaar voor het netwerk (om precies te zijn 4096 [epochs](/woordenlijst/#epoch)). Na deze periode worden blobs uit het netwerk verwijderd, maar applicaties kunnen nog steeds de geldigheid van hun gegevens verifiëren met behulp van bewijzen.

Dit verlaagt de kosten van rollups aanzienlijk, beperkt de groei van de chain en helpt om meer gebruikers te ondersteunen met behoud van veiligheid en een gedecentraliseerde groep van node-operators.

## Wanneer verwachten we dat de rollups lagere kosten zullen opleveren als gevolg van Proto-Danksharding? {#when}

- Deze upgrade is geactiveerd op epoch 269568, op **13-maart-2024 om 13:55 (UTC)**
- Alle grote rollupaanbieders, zoals Arbitrum of Optimism, hebben aangegeven dat blobs direct na de upgrade worden ondersteund
- De tijdlijn voor individuele rollupondersteuning kan variëren, omdat elke aanbieder hun systemen moet bijwerken om te profiteren van de nieuwe blobruimte

## Hoe kan ETH worden geconverteerd na de hard fork? {#scam-alert}

- **Geen actie nodig voor uw ETH**: na de Dencun-upgrade van Ethereum is het niet nodig om uw ETH te converteren of te upgraden. Uw rekeningsaldi zullen hetzelfde blijven, en de ETH die u momenteel bezit blijft toegankelijk in zijn bestaande vorm na de hard fork.
- **Let op voor scams!** <Emoji text="⚠️" />**Iedereen die u vraagt om uw ETH te “upgraden” probeert u te scammen.** Er is niets dat u hoeft te doen in verband met deze upgrade. Uw activa blijven volledig onaangetast. Onthoud dat geïnformeerd blijven de beste verdediging is tegen scams.

[Meer informatie over het herkennen en vermijden van scams](/beveiliging/)

## Welk probleem lost de Dencun netwerk-upgrade op? {#network-impact}

Dencun richt zich voornamelijk op **schaalbaarheid** (omgaan met meer gebruikers en meer transacties) met **betaalbare kosten**, terwijl **de decentralisatie** van het netwerk behouden blijft.

De Ethereum-gemeenschap heeft gekozen voor een “rollup-centrische” benadering van haar groei, waarbij rollups van laag 2 de primaire middelen zijn om op een veilige manier meer gebruikers aan te kunnen.

Rollup-netwerken zorgen voor de verwerking (of “uitvoering”) van transacties los van het hoofdnet en publiceren vervolgens een cryptografisch bewijs en/of gecomprimeerde transactiegegevens van de resultaten terug naar het hoofdnet voor het bijhouden van gegevens. Het opslaan van deze bewijzen brengt kosten met zich mee (in de vorm van [gas](/woordenlijst/#gas)), die vóór Proto-Danksharding permanent moesten worden opgeslagen door alle netwerknode-operators, waardoor het allemaal wat te duur werd.

De introductie van Proto-Danksharding in de Dencun-upgrade zorgt voor goedkopere gegevensopslag voor deze bewijzen doordat de node-operators deze gegevens slechts ongeveer 18 dagen hoeven op te slaan, waarna de gegevens veilig kunnen worden verwijderd om een uitbreiding van de hardwarevereisten te voorkomen.  Omdat rollups meestal een opnameperiode van 7 dagen hebben, is hun beveiligingsmodel onveranderd, zolang blobs beschikbaar zijn op L1 voor deze duur. De verwijderperiode van 18 dagen creëert een aanzienlijke buffer voor deze periode.

[Meer over de opschaling van Ethereum](/routekaart/opschalen/)

## Hoe wordt toegang verkregen tot oude blobgegevens? {#historical-access}

Hoewel reguliere Ethereum nodes altijd de huidige status van het netwerk zullen bewaren, kunnen historische blobgegevens ongeveer 18 dagen na de introductie worden verwijderd. Voordat deze gegevens worden verwijderd, zorgt Ethereum ervoor dat ze beschikbaar zijn gemaakt voor alle netwerkdeelnemers, zodat er tijd is voor:

- Geïnteresseerde partijen om de gegevens te downloaden en op te slaan.
- Voltooiing van alle rollup-uitdagingsperioden.
- Finalisatie van de rolluptransacties.

Historische blobgegevens kunnen om verschillende redenen wenselijk zijn en kunnen worden opgeslagen en geraadpleegd via verschillende gedecentraliseerde protocollen:

- **Indexeringsprotocollen van derde partijen**, zoals The Graph, slaan deze gegevens op via een gedecentraliseerd netwerk van node-operators die worden gestimuleerd door crypto-economische mechanismen.
- **BitTorrent** is een gedecentraliseerd protocol waar vrijwilligers deze gegevens kunnen bewaren en verspreiden naar anderen.
- **[Ethereum-portaalnetwerk](/ontwikkelaars/documenten/netwerklaag/portaal-netwerk/)** heeft als doel toegang te bieden tot alle Ethereum-gegevens via een gedecentraliseerd netwerk van node-operators door gegevens te verdelen onder de deelnemers, vergelijkbaar met BitTorrent.
- Het staat **individuele gebruikers** altijd vrij om hun eigen kopieën van gegevens op te slaan als historische referentie.
- **Rollup-aanbieders** worden gestimuleerd om deze gegevens op te slaan om de gebruikerservaring van hun rollup te verbeteren.
- **Block explorers** voeren meestal archiefnodes uit die al deze informatie indexeren en opslaan voor gemakkelijke historische referentie, en zijn toegankelijk voor gebruikers via een webinterface.

Het is belangrijk om op te merken dat het herstellen van de historische status werkt op basis van een **1-van-N vertrouwensmodel**. Dit betekent dat u slechts gegevens van één betrouwbare bron nodig hebt om de juistheid ervan te verifiëren aan de hand van de huidige status van het netwerk.

## Hoe draagt deze upgrade bij aan de bredere routekaart van Ethereum? {#roadmap-impact}

Proto-Danksharding vormt de basis voor de volledige implementatie van [Danksharding](/routekaart/danksharding/). Danksharding is ontworpen om de opslag van rollupgegevens te verdelen over node-operators, zodat elke operator slechts een klein deel van de totale gegevens hoeft te verwerken. Deze verdeling verhoogt het aantal gegevensblobs per block, wat essentieel is voor het opschalen van Ethereum om meer gebruikers en transacties aan te kunnen.

Deze schaalbaarheid is cruciaal voor [het ondersteunen van miljarden gebruikers op Ethereum](/routekaart/opschalen/) met betaalbare kosten en meer geavanceerde toepassingen, terwijl een gedecentraliseerd netwerk behouden blijft. Zonder deze wijzigingen zouden de hardwarevereisten voor node-operators escaleren, wat ertoe kan leiden dat er steeds duurdere apparaten nodig zijn. Dit kan kleinere operatoren uit de markt drukken, wat kan leiden tot een concentratie van netwerkcontrole bij een paar grote operatoren, wat indruist tegen het principe van decentralisatie.

## Heeft deze upgrade invloed op alle consensus- en validatorclients van Ethereum? {#client-impact}

Ja, Proto-Danksharding (EIP-4844) vraagt om updates voor zowel uitvoeringsclients als consensusclients. Alle belangrijke Ethereum-clients hebben versies uitgebracht die de upgrade ondersteunen. Om de synchronisatie met het Ethereum-netwerk na de upgrade in stand te houden, moeten beheerders van nodes ervoor zorgen dat ze een ondersteunde clientversie uitvoeren. Merk op dat de informatie over clientreleases tijdgevoelig is en dat gebruikers de laatste updates moeten raadplegen voor de meest actuele details. [Zie details over ondersteunde clientreleases](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

De consensusclients verwerken de validatorsoftware, die allemaal is bijgewerkt voor de upgrade.

## Hoe beïnvloedt Cancun-Deneb (Dencun) Goerli of andere Ethereum-testnetten? {#testnet-impact}

- Devnets, Goerli, Sepolia en Holesky hebben allemaal de Dencun-upgrade ondergaan en werken volledig met Proto-Danksharding
- Rollup-ontwikkelaars kunnen deze netwerken gebruiken voor EIP-4844-tests
- De meeste gebruikers zullen geen hinder ondervinden van deze wijziging van elk testnet

## Zullen alle transacties op L2's nu tijdelijke blobruimte gebruiken of kan dit gekozen worden? {#calldata-vs-blobs}

Rollup-transacties op laag 2 (L2) van Ethereum hebben de optie om twee soorten gegevensopslag te gebruiken: tijdelijke blobruimte of permanente calldata voor smart contracts. Blobruimte is een voordelige keuze, die tijdelijke opslag biedt tegen lagere kosten. Het garandeert de beschikbaarheid van gegevens voor alle noodzakelijke uitdagingsperioden. Aan de andere kant biedt calldata voor smart contracts permanente opslag, maar is duurder.

De beslissing tussen het gebruik van blobruimte of calldata wordt voornamelijk genomen door rollupaanbieders. Ze baseren deze beslissing op de huidige vraag naar blobruimte. Als de vraag naar blobruimte groot is, kunnen rollups kiezen voor calldata om ervoor te zorgen dat de gegevens tijdig worden geplaatst.

Hoewel het theoretisch mogelijk is voor gebruikers om het opslagtype van hun voorkeur te kiezen, zorgen rollupaanbieders meestal voor deze keuze. Door deze optie aan gebruikers aan te bieden, wordt het nog ingewikkelder. Dit geldt met name voor kosteneffectieve bundelingstransacties. Voor specifieke details over deze keuze moeten gebruikers de documentatie raadplegen die wordt geleverd door de individuele rollupaanbieders.

## Zal 4844 L1-gas verminderen? {#l1-fee-impact}

Niet significant. Er wordt een nieuwe gasmarkt geïntroduceerd die uitsluitend bestemd is voor blobruimte, voor gebruik door rollupaanbieders. Hoewel de kosten op L1 verlaagd kunnen worden door rollupgegevens naar blobs te verplaatsen, richt deze upgrade zich voornamelijk op de verlaging van L2-kosten. De vermindering van de kosten op L1 (hoofdnet) kan in mindere mate optreden als een effect van de tweede orde.

- L1-gasreductie wordt evenredig met toepassing/gebruik van blobgegevens door rollupaanbieders
- L1-gas zal waarschijnlijk concurrerend blijven ten opzichte van niet-rollupgerelateerde activiteiten
- Rollups die blobruimte gaan gebruiken, zullen minder L1-gas nodig hebben, waardoor de L1-gaskosten op de korte termijn zullen dalen
- De blobruimte is nog steeds beperkt, dus als blobs binnen een block verzadigd zijn/vol zitten, dan kan het zijn dat rollups hun gegevens in de tussentijd als permanente data moeten plaatsen, waardoor de L1- en L2-gasprijzen omhoog gaan

## Zal dit de kosten voor andere laag 1 EVM-blockchains verlagen? {#alt-l1-fee-impact}

Nee. De voordelen van Proto-Danksharding zijn specifiek voor laag 2-rollups van Ethereum die hun bewijzen opslaan op laag 1 (hoofdnet).

Alleen compatibel zijn met de Ethereum Virtual Machine (EVM) betekent niet dat een netwerk voordeel zal hebben van deze upgrade. Netwerken die onafhankelijk van Ethereum werken (al dan niet EVM-compatibel) slaan hun gegevens niet op Ethereum op en zullen geen voordeel ondervinden van deze upgrade.

[Meer over laag 2-rollups](/laag-2/)

## Leer je liever visueel? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

Ethereum opschalen, EIP-4844 — Finematics

<YouTube id="dFjyUY3e53Q" />

Basisbeginselen van blobruimte met Domothy — Bankloos

## Further reading {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard blob-transacties (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun hoofdnetaankondiging](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - Ethereum Foundation-blog
- [Het Transgalactisch Ethereumhandboek: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - Jon Charbonneau
- [Veelgestelde vragen over Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - Vitalik Buterin
- [Een diepgaande uitleg van EIP-4844: de kern van de Cancun-upgrade](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - Ebunker
- [AllCoreDevs-update 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - Tim Beiko
