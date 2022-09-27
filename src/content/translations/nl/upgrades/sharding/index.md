---
title: Shardketens
description: Lees meer over shardketens - partities van het netwerk die Ethereum meer transactiecapaciteit geven en het runnen van Ethereum makkelijker maken.
lang: nl
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Sharding is een multi-fase upgrade om de schaalbaarheid en capaciteit van Ethereum te verbeteren.
summaryPoint2: Shardketens bieden extra, goedkopere opslaglagen voor applicaties en rollups om gegevens op te slaan.
summaryPoint3: Ze maken laag 2-oplossingen mogelijk die lage transactiekosten bieden terwijl ze de veiligheid van Ethereum vergroten.
summaryPoint4: Deze upgrade is gepland om na de merge van het hoofdnet met de Beacon Chain te volgen.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Shardketens zullen ergens in 2023 gereed zijn, afhankelijk van hoe snel het werk vordert na <a href="/upgrades/merge/">de merge</a>. Deze shards zullen Ethereum meer capaciteit geven om data op te slaan en op te vragen, maar ze zullen niet gebruikt worden voor het uitvoeren van code.
</UpgradeStatus>

## Wat is sharding? {#what-is-sharding}

Sharding is het proces van het horizontaal splitsen van een database om de belasting te spreiden - het is een algemeen bekend concept in de informatica. In de Ethereum-context zal sharding netwerkopstoppingen verminderen en de transacties per seconde verhogen door nieuwe ketens te creëren, die "shards" heten.

Dit is belangrijk om andere redenen dan schaalbaarheid.

## Eigenschappen van sharding {#features-of-sharding}

### Iedereen kan een node runnen {#everyone-can-run-a-node}

Sharding is een goede manier om op te schalen als u dingen gedecentraliseerd wilt houden, aangezien het alternatief is om op te schalen door de grootte van de bestaande database te vergroten. Dit zou Ethereum voor netwerkvalidators minder toegankelijk maken, omdat ze krachtige en dure computers nodig zouden hebben. Met shardketens hoeven validators alleen gegevens op te slaan / uit te voeren voor het deel (shard) dat ze valideren, niet het hele netwerk (zoals wat er vandaag gebeurt). Dit versnelt dingen en vermindert de hardwarevereisten aanzienlijk.

### Meer netwerkdeelname {#more-network-participation}

Dankzij sharding kunt u Ethereum uiteindelijk op een persoonlijke laptop of telefoon draaien. Dus meer mensen zouden in staat moeten zijn om deel te nemen aan Ethereum, of [clients](/developers/docs/nodes-and-clients/)uit te voeren in een 'geshard' Ethereum. Dit zal de veiligheid van het netwerk verbeteren, want hoe gedecentraliseerder het netwerk is, hoe kleiner het aanvalsgebied.

Met lagere hardwarevereisten maakt sharding het makkelijker om in uw eentje [clients](/developers/docs/nodes-and-clients/) te draaien, zonder te hoeven vertrouwen op intermediaire diensten. Overweeg om meerdere clients te gebruiken, als u dat kunt natuurlijk. Dit kan bijdragen aan de gezondheid van het netwerk door foutpunten verder terug te dringen. [Een Bacon Chain client draaien](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Eerst moet u een hoofdnet-client tegelijk met uw Beacon Chain-client uitvoeren. <a href="https://launchpad.ethereum.org" target="_blank">Het launchpad</a> laat u de hardwarevereisten en het proces zien. U kunt ook een <a href="/developers/docs/apis/backend/#available-libraries">backend API</a> gebruiken.
</InfoBanner>

## Shardketenversie 1: beschikbaarheid van gegevens {#data-availability}

Wanneer de eerste shardketens worden verzonden, zullen ze slechts extra gegevens aan het netwerk verstrekken. Ze behandelen geen transacties of slimme contracten. Maar ze bieden nog steeds ongelooflijke verbeteringen voor transacties per seconde in combinatie met rollups.

Rollups zijn een "laag 2"-technologie die vandaag de dag bestaat. Hiermee kunnen dapps transacties bundelen of "roll up" in een enkele transactie buiten de keten, een cryptografisch bewijs genereren en dit vervolgens naar de keten verzenden. Dit vermindert de gegevens die nodig zijn voor een transactie. Combineer dit met alle extra gegevensbeschikbaarheid van shards en je krijgt 100.000 transacties per seconde.

<InfoBanner isWarning={false}>
  De recente vooruitgang in het onderzoek en de ontwikkeling van oplossingen voor laag 2-opschaling heeft geleid tot het prioriteit geven aan de merge vóór de shardketens. Deze zullen de focus zijn na de overgang van het hoofdnet naar proof-of-stake.

[Meer over rollups](/developers/docs/scaling/layer--rollups)
</InfoBanner>

## Shardketenversie 2: uitvoering van code {#code-execution}

Het plan was altijd om extra functionaliteit toe te voegen aan shards, om ze meer te laten lijken op het [Ethereum-hoofdnet](/glossary/#mainnet) van vandaag. Hierdoor kunnen ze code opslaan en uitvoeren en transacties verwerken, aangezien elke shard zijn unieke reeks slimme contracten en accountsaldi zou bevatten. Cross-shard communicatie zou transacties tussen shards mogelijk maken.

Maar moet dit nog gebeuren, gezien de toegenomen transacties per seconde van versie 1-shards? Hierover wordt nog steeds gedebatteerd in de gemeenschap en het lijkt erop dat er verschillende oplossingen zijn.

### Hebben shards uitvoering van code nodig? {#do-shards-need-code-execution}

Vitalik Buterin, in zijn gesprek met de podcast Bankless, heeft drie mogelijkheden aangekaart die het overwegen waard zijn.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Uitvoering van de staat niet nodig {#state-execution-not-needed}

Dit zou betekenen dat we shards niet de mogelijkheid geven om slimme contracten te behandelen en ze als data-depots laten staan.

#### 2. Beschikken over enkele uitvoeringsshards {#some-execution-shards}

Misschien is er een compromis waarbij niet alle shards nodig zijn (op dit moment zijn er 64 gepland) om slimmer te zijn. We zouden deze functionaliteit gewoon aan een paar shards kunnen toevoegen en de rest met rust laten. Dit kan de levering versnellen.

#### 3. Wachten totdat we Zero Knowledge (ZK)-snarks kunnen doen {#wait-for-zk-snarks}

Tot slot, misschien moeten we dit debat nog eens bekijken wanneer invulling wordt gegeven aan ZK-snarks. Dit is een technologie die ertoe kan bijdragen dat er werkelijk particuliere transacties op het netwerk komen. Het is waarschijnlijk dat er slimmere shards voor nodig zijn, maar ze zijn nog steeds in onderzoek en ontwikkeling.

#### Andere bronnen {#other-sources}

Hier zijn nog wat meer gedachten over dezelfde materie:

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Dit is nog steeds een actief discussiepunt. We zullen deze pagina's bijwerken zodra we meer weten.

## Relatie tussen de upgrades {#relationship-between-upgrades}

Alle Ethereum-upgrades zijn ietwat met elkaar verbonden. Laten we daarom even samenvatten hoe de shardketens zich verhouden tot de andere upgrades.

### Shards en de Beacon Chain {#shards-and-beacon-chain}

De Beacon Chain bevat alle logica om shards te beveiligen en gesynchroniseerd te houden. De Beacon Chain coördineert de stakers in het netwerk, waarbij ze worden toegewezen aan shards waaraan ze moeten werken. En het zal ook de communicatie tussen shards vergemakkelijken door het ontvangen en opslaan van shardtransactiegegevens die toegankelijk zijn voor andere shards. Hierdoor geven shards een momentopname van de staat van Ethereum om alles up-to-date te houden.

<ButtonLink to="/upgrades/beacon-chain/">
  De Beacon Chain
</ButtonLink>

### Shards en de merge {#shards-and-docking}

Tegen de tijd dat er extra shards worden toegevoegd, zal het Ethereum-hoofdnet al worden beveiligd door de Beacon Chain met behulp van proof-of-stake. Dit stelt een vruchtbaar hoofdnet in staat om op basis hiervan shardketens te bouwen, aangedreven door laag 2-oplossingen die de schaalbaarheid enorm opschroeven.

Het valt te bezien of het hoofdnet zal bestaan als de enige "slimme" shard die de uitvoering van code kan verwerken – maar hoe dan ook, het besluit om shards uit te breiden kan zo nodig worden herzien.

<ButtonLink to="/upgrades/merge/">
  De merge
</ButtonLink>

<Divider />

### Meer informatie {#read-more}

<ShardChainsList />
