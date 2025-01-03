---
title: Ethereum schalen
description: Rollups bundelen transacties off-chain, waardoor de kosten voor de gebruikers dalen. De manier waarop rollups momenteel gegevens gebruiken is echter te duur, waardoor het aantal goedkope transacties wordt beperkt. Proto-Danksharding lost dit op.
lang: nl
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum-roadmap"
template: roadmap
---

Ethereum wordt opgeschaald met [laag 2's](/layer-2/#rollups) (ook bekend als rollups), die transacties samenvoegen en de uitvoer naar Ethereum sturen. Hoewel rollups tot acht keer goedkoper zijn dan het hoofdnet van Ethereum, is het mogelijk om rollups verder te optimaliseren om de kosten voor eindgebruikers te verlagen. Rollups vertrouwen ook op een aantal gecentraliseerde componenten die ontwikkelaars kunnen verwijderen als de rollups zich ontwikkelen.

<InfoBanner mb={8} title="Transactiekosten">
  <ul style={{ marginBottom: 0 }}>
    <li>De rollups van vandaag zijn <strong>~5-20x</strong> goedkoper dan Ethereum laag 1</li>
    <li>ZK-rollups zullen de kosten binnenkort verlagen met <strong>~40-100x</strong></li>
    <li>Aankomende veranderingen aan Ethereum zullen Ethereum nog eens <strong>~100-1000x</strong> doen opschalen</li>
    <li style={{ marginBottom: 0 }}>Gebruikers zullen wellicht profiteren van transacties <strong>die minder dan $ 0,001 kosten</strong></li>
  </ul>
</InfoBanner>

## Gegevens goedkoper maken {#making-data-cheaper}

Rollups verzamelen grote aantallen transacties, voeren ze uit en dienen de resultaten in bij Ethereum. Dit genereert veel gegevens die openlijk beschikbaar moeten zijn, zodat iedereen de transacties zelf kan uitvoeren en kan controleren of de rollup-operator eerlijk was. Als iemand een discrepantie ontdekt, kan hij of zij dit aanvechten.

### Proto-Danksharding {#proto-danksharding}

Gegevens van rollups werden historisch gezien permanent opgeslagen op Ethereum, wat duur is. Meer dan 90% van de transactiekosten die gebruikers betalen voor rollups zijn te wijten aan deze gegevensopslag. Om de transactiekosten te verlagen, kunnen we deze gegevens verplaatsen naar een nieuwe tijdelijke 'blob'-opslag. Blobs zijn goedkoper omdat ze niet permanent zijn. Ze worden verwijderd uit Ethereum zodra ze niet langer nodig zijn. De opslag van rollupgegevens op de lange termijn wordt de verantwoordelijkheid van de mensen die ze nodig hebben, zoals rollupoperators, crypto-uitwisselingen, indexeringsdiensten enz. Blob-transacties toevoegen aan Ethereum maakt deel uit van een upgrade die bekend staat als “Proto-Danksharding”.

Met Proto-Danksharding is het mogelijk om veel blobs toe te voegen aan Ethereum-blocks. Dit zorgt voor nog een substantiële (>100x) opschaling van de verwerkingscapaciteit van Ethereum en een verlaging van de transactiekosten.

### Danksharding {#danksharding}

De tweede fase van het uitbreiden van blobgegevens is ingewikkeld, omdat er nieuwe methoden nodig zijn om te controleren of rollup-gegevens beschikbaar zijn op het netwerk en vertrouwt op [validators](/glossary/#validator) die hun [blockopbouw-](/glossary/#block) en blockvoorstelverantwoordelijkheden van elkaar gescheiden houden. Er is ook een manier nodig om cryptografisch aan te tonen dat validators kleine subsets van de blob-gegevens hebben geverifieerd.

Deze tweede stap staat bekend als ["Danksharding"](/roadmap/danksharding/). **Het duurt waarschijnlijk nog enkele jaren** voordat dit volledig is geïmplementeerd. Danksharding is afhankelijk van andere ontwikkelingen zoals [het gescheiden houden van de blockopbouw en blockvoorstellen](/roadmap/pbs) en nieuwe netwerkontwerpen die het netwerk in staat stellen om efficiënt te bevestigen dat gegevens beschikbaar zijn door willekeurig een paar kilobytes per keer te controleren, wat bekend staat als [data availability sampling (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Meer over Danksharding</ButtonLink>

## Rollups decentraliseren {#decentralizing-rollups}

[Rollups](/layer-2) schalen Ethereum al op. Een [rijk ecosysteem aan rollup-projecten](https://l2beat.com/scaling/tvl) stelt gebruikers in staat om snel en goedkoop transacties uit te voeren, met een reeks veiligheidsgaranties. Rollups zijn echter gebootstrapt via gecentraliseerde sequencers (computers die alle transactieverwerking en aggregatie doen voordat ze worden ingediend bij Ethereum). Dit is vatbaar voor censuur, omdat de operators van de sequencer gesanctioneerd, omgekocht of op een andere manier beïnvloed kunnen worden. Tegelijkertijd [variëren rollups](https://l2beat.com) in de manier waarop ze binnenkomende gegevens valideren. De beste manier is voor "bewijzers" om [fraudebewijzen](/glossary/#fraud-proof) of geldigheidsbewijzen in te dienen, maar nog niet alle rollups zijn zo ver. Zelfs de rollups die bewijzen van geldigheid/fraude gebruiken, gebruiken een kleine hoeveelheid bekende bewijzers. Daarom is de volgende cruciale stap in het opschalen van Ethereum om de verantwoordelijkheid voor het uitvoeren van sequencers en bewijzers over meer mensen te verdelen.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Meer over rollups</ButtonLink>

## Huidige vooruitgang {#current-progress}

Proto-Danksharding is het eerste onderdeel van deze routekaart dat moet worden geïmplementeerd als onderdeel van de netwerkupgrade Cancun-Deneb (“Dencun”) in maart 2024. **Volledige Danksharding duurt waarschijnlijk nog enkele jaren**, omdat het afhankelijk is van verschillende andere punten op de routekaart die eerst moeten worden aangepakt. Het decentraliseren van de rollup-infrastructuur wordt waarschijnlijk een geleidelijk proces. Er zijn veel verschillende rollups die net iets andere systemen opbouwen en die in een verschillend tempo volledig zullen decentraliseren.

[Meer over de Dencun netwerkupgrade](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
