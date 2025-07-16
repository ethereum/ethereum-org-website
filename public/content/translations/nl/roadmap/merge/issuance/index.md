---
title: Hoe de samenvoeging de ETH-aanvoer beïnvloedde
description: Overzicht van de impact van de samenvoeging op de ETH-aanvoer
lang: nl
---

# Hoe de samenvoeging de ETH-aanvoer beïnvloedde {#how-the-merge-impacts-ETH-supply}

De samenvoeging betekende de overgang van het Ethereumnetwerk van proof-of-work naar proof-of-stake, en vond plaats in september 2022. De manier waarop ETH werd uitgegeven onderging veranderingen op het moment van die overgang. Voorheen werd nieuwe ETH uitgegeven vanuit twee bronnen: de uitvoeringslaag (d.w.z. het hoofdnet) en de consensuslaag (d.w.z. Beacon Chain). Sinds de samenvoeging is de uitgifte op de uitvoeringslaag nu niets meer. Laten we dit eens meer in detail bekijken.

## Bestanddelen van ETH-uitgifte {#components-of-eth-issuance}

We kunnen de aanvoer van ETH opsplitsen in twee belangrijke krachten: uitgifte en verbranding.

De **uitgifte** van ETH is het proces van het aanmaken van ETH dat nog niet eerder bestond. De **verbranding** van ETH is wanneer bestaande ETH wordt vernietigd, waardoor het uit de circulatie wordt gehaald. De snelheid van uitgifte en verbranding wordt berekend op basis van verschillende parameters, en het evenwicht tussen deze parameters bepaalt de resulterende inflatie/deflatiesnelheid van ether.

<Card
emoji=":chart_decreasing:"
title="ETH-uitgifte tldr">

- Voor de overgang naar proof-of-stake kregen miners ongeveer 13.000 ETH/dag
- Stakers krijgen ongeveer 1.700 ETH/dag, op basis van ongeveer 14 miljoen totaal gestakete ETH
- De exacte staking-uitgifte fluctueert op basis van de totale hoeveelheid gestakete ETH
- **Sinds de samenvoeging blijft alleen de ~1.700 ETH/dag over, waardoor de totale nieuwe ETH-uitgifte met ~88% daalt**
- De verbranding: dit schommelt volgens de vraag van het netwerk. Als een gemiddelde gasprijs van minstens 16 gwei wordt vastgesteld voor een bepaalde dag, compenseert dit effectief de ~1700 ETH die wordt uitgegeven aan validators en brengt dit de netto ETH-inflatie op nul of minder voor die dag.

</Card>

## Voorafgaand aan samenvoeging (historisch) {#pre-merge}

### Uitgifte uitvoeringslaag {#el-issuance-pre-merge}

Onder proof-of-work hadden miners alleen interactie met de uitvoeringslaag en werden ze beloond met blockbeloningen als ze de eerste miner waren die de volgende block oploste. Sinds de [Constantinople-upgrade](/history/#constantinople) in 2019 was deze beloning 2 ETH per block. Miners werden ook beloond voor het publiceren van [ommer](/glossary/#ommer)-blocks, wat geldige blocks waren die niet in de langste/canonieke chain terechtkwamen. Deze beloningen waren maximaal 1,75 ETH per ommer en kwamen _bovenop_ de beloning die werd uitgegeven uit de canonieke block. Het miningproces was een economisch intensieve activiteit, waarvoor historisch gezien een hoog niveau van ETH-uitgifte nodig was om in stand te worden gehouden.

### Uitgifte consensuslaag {#cl-issuance-pre-merge}

De [Beacon Chain](/history/#beacon-chain-genesis) ging live in 2020. In plaats van miners, wordt het beveiligd door validators die proof-of-stake gebruiken. Deze chain werd gebootstrapt door Ethereum-gebruikers die ETH eenmalig storten in een smart contract op het hoofdnet (de uitvoeringslaag), waar de Beacon Chain naar luistert en de gebruiker crediteert met een gelijke hoeveelheid ETH op de nieuwe chain. Totdat de samenvoeging plaatsvond, verwerkten de validators van de Beacon Chain geen transacties en kwamen ze in wezen tot een consensus over de status van de validatorpool zelf.

Validators op de Beacon Chain worden beloond met ETH voor het bevestigen van de status van de chain en het voorstellen van blocks. Beloningen (of sancties) worden berekend en verdeeld bij elke epoch (elke 6,4 minuten) op basis van de prestaties van de validator. Validatorbeloningen bedragen **beduidend** minder dan de miningbeloningen die voorheen werden uitgegeven onder proof-of-work (2 ETH elke ~13,5 seconden), omdat het uitvoeren van een validerende node economisch niet zo intensief is en dus niet zo'n hoge beloning vereist of rechtvaardigt.

### Overzicht uitgifte voorafgaand aan samenvoeging {#pre-merge-issuance-breakdown}

Totale ETH-aanvoer: **~120.520.000 ETH** (ten tijde van de samenvoeging in september 2022)

**Uitgifte uitvoeringslaag:**

- Werd geschat op 2,08 ETH per 13,3 seconden\*: **~4.930.000** ETH uitgegeven in een jaar
- Resulteerde in een inflatiepercentage van **bijna 4,09%** (4,93M per jaar / 120,5M in totaal)
- \*Dit is inclusief de 2 ETH per canonieke block, plus een gemiddelde van 0,08 ETH in de loop van de tijd van ommer-blocks. Gebruikt ook 13,3 seconden, het basisdoel voor blocktijd zonder invloed van een [moeilijkheidsbom](/glossary/#difficulty-bomb). ([Zie bron](https://bitinfocharts.com/ethereum/))

**Uitgifte consensuslaag:**

- Met in totaal 14.000.000 gestakete ETH is de uitgiftesnelheid van ETH ongeveer 1700 ETH/dag ([Zie bron](https://ultrasound.money/))
- Resulteert in **~620.500** uitgegeven ETH in één jaar
- Resulteerde in een inflatiepercentage van **bijna 0,52%** (620.500 per jaar / 119,3M in totaal)

<InfoBanner>
<strong>Totaal uitgiftepercentage op jaarbasis (voorafgaand aan de samenvoeging): ~4.61%</strong> (4.09% + 0.52%)<br/><br/>
<strong>~88,7%</strong> van die uitgifte ging naar miners op de uitvoeringslaag (4,09 / 4,61 * 100)<br/><br/>
<strong>~11,3%</strong> werd uitgegeven aan stakers op de consensuslaag (0,52 / 4,61 * 100)
</InfoBanner>

## Na de samenvoeging (vandaag de dag) {#post-merge}

### Uitgifte uitvoeringslaag {#el-issuance-post-merge}

Uitgifte uitvoeringslaag is sinds de samenvoeging nul. Proof-of-work is niet langer een geldig middel voor blockproductie onder de bijgewerkte consensusregels. Alle activiteiten van de uitvoeringslaag worden verpakt in "beacon blocks", die worden gepubliceerd en geattesteerd door proof-of-stake validators. Beloningen voor het attesteren en publiceren van beacon blocks worden apart verrekend op de consensuslaag.

### Uitgifte consensuslaag {#cl-issuance-post-merge}

De uitgifte van de consensuslaag gaat vandaag de dag door zoals vóór de samenvoeging, met kleine beloningen voor validators die blocks attesteren en voorstellen. Validatorbeloningen worden nog steeds toegevoegd aan _validatorsaldi_ die binnen de consensuslaag worden beheerd. In tegenstelling tot de huidige accounts ("uitvoerings"-accounts), die op het hoofdnet kunnen handelen, kunnen deze aparte Ethereum-accounts niet vrij handelen met andere Ethereum-accounts. Middelen op deze accounts kunnen alleen worden opgenomen op één gespecificeerd uitvoeringsadres.

Sinds de Shanghai/Capella-upgrade die plaatsvond in april 2023, zijn deze opnames geactiveerd voor stakers. Stakers worden gestimuleerd om hun _verdiensten/beloningen (saldo van meer dan 32 ETH)_ op te nemen, omdat deze middelen anders niet bijdragen aan hun stake-gewicht (dat maximaal 32 is).

Stakers kunnen er ook voor kiezen om te stoppen en hun volledige validatorsaldo op te nemen. Om ervoor te zorgen dat Ethereum stabiel blijft, wordt het aantal validators dat tegelijkertijd vertrekt gelimiteerd.

Ongeveer 0,33% van het totale aantal validators kan op een bepaalde dag vertrekken. Standaard kunnen vier (4) validators per epoch (elke 6,4 minuten, of 900 per dag) vertrekken. Eén extra (1) validator is toegestaan om te vertrekken voor elke 65.536 (2<sup>16</sup>) extra validators boven 262.144 (2<sup>18</sup>). Bijvoorbeeld, met meer dan 327.680 validators kunnen er vijf (5) vertrekken per epoch (1.125 per dag). Zes (6) zullen worden toegestaan met een totaal aantal actieve validators van meer dan 393.216, enzovoort.

Naarmate meer validators vertrekken, zal het maximale aantal vertrekkende validators geleidelijk worden verminderd tot een minimum van vier om opzettelijk te voorkomen dat grote destabiliserende hoeveelheden ETH tegelijkertijd worden opgenomen.

### Overzicht van inflatie na de samenvoeging {#post-merge-inflation-breakdown}

- Totale ETH-aanvoer: **~120.520.000 ETH** (ten tijde van de samenvoeging in september 2022)
- Uitgifte uitvoeringslaag: **0**
- Uitgifte consensuslaag: hetzelfde als hierboven, **~0,52%** jaarlijkse uitgiftepercentage (met 14 miljoen totaal gestakete ETH)

<InfoBanner>
Totaal uitgiftepercentage op jaarbasis: <strong>~0.52%</strong><br/><br/>
Nettovermindering in jaarlijkse ETH-uitgifte: <strong>~88.7%</strong> ((4.61% - 0.52%) / 4.61% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" />De verbranding {#the-burn}

De tegengestelde kracht van ETH-uitgifte is de snelheid waarmee ETH wordt verbrand. Om een transactie op Ethereum uit te voeren, moet een minimale kost (bekend als een "basiskost") worden betaald, die continu fluctueert (van block tot block) afhankelijk van de netwerkactiviteit. Deze kost wordt betaald in ETH en is _vereist_ om de transactie als geldig te beschouwen. Deze kost wordt _verbrand_ tijdens het transactieproces, waardoor het uit circulatie wordt gehaald.

<InfoBanner>
Kosten verbranden ging live met <a href="/history/#london">de London-upgrade</a> in augustus 2021, en bleef ongewijzigd sinds de samenvoeging.
</InfoBanner>

Bovenop de verbranding van de kosten die door de London-upgrade zijn geïmplementeerd, kunnen validators ook sancties krijgen als ze offline zijn, of erger nog, ze kunnen worden geslasht voor het overtreden van specifieke regels die de veiligheid van het netwerk in gevaar brengen. Deze sancties leiden tot een vermindering van ETH van het saldo van deze validator, wat niet direct beloond wordt op een ander account, waardoor het effectief wordt verbrand/verwijderd uit de circulatie.

### Gemiddelde gasprijs voor deflatie berekenen {#calculating-average-gas-price-for-deflation}

Zoals hierboven besproken, is de hoeveelheid ETH die op een bepaalde dag wordt uitgegeven, afhankelijk van het totaal aantal gestakete ETH. Op het moment van schrijven is dit ongeveer 1700 ETH/dag.

Om de gemiddelde gasprijs te bepalen die nodig is om deze uitgifte in een bepaalde periode van 24 uur volledig te compenseren, beginnen we met het berekenen van het totaal aantal blocks op een dag, met een blocktijd van 12 seconden:

- `(1 block / 12 seconden) * (60 seconden/minuut) = 5 blocks/minuut`
- `(5 blocks/minuut) * (60 minuten/uur) = 300 blocks/uur`
- `(300 blocks/uur) * (24 uur/dag) = 7200 blocks/dag`

Elke block richt zich op `15x10^6 gas/block` ([meer over gas](/developers/docs/gas/)). Hiermee kunnen we de gemiddelde gasprijs (in gwei/gas) berekenen die nodig is om de uitgifte te compenseren, met een totale dagelijkse ETH-uitgave van 1700 ETH:

- `7200 blocks/day * 15x10^6 gas/block *`**`Y gwei/gas`**`* 1 ETH/ 10^9 gwei = 1700 ETH/day`

Oplossen voor `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (afgerond op slechts twee significante cijfers)

Een andere manier om deze laatste stap te herschikken zou zijn om `1700` te vervangen door een variabele `X` die staat voor de dagelijkse ETH-uitgifte, en de rest te vereenvoudigen tot:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

We kunnen dit vereenvoudigen en schrijven als een functie van `X`:

- `f(X) = X/108` waarbij `X` de dagelijkse ETH-uitgifte is en `f(X)` de gwei/gasprijs vertegenwoordigt die nodig is om alle nieuw uitgegeven ETH te compenseren.

Dus, bijvoorbeeld, als `X` (dagelijkse ETH-uitgifte) stijgt tot 1800 op basis van het totaal aantal gestakete ETH, dan zou `f(X)` (gwei vereist om alle uitgiftes te compenseren) `17 gwei` zijn (met gebruik van 2 significante cijfers)

## Verder lezen {#further-reading}

- [De merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dashboards beschikbaar om de uitgifte en verbranding van ETH in realtime te visualiseren_
- [Het in kaart brengen van de Ethereum-uitgifte](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
