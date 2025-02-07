---
title: Blocks
description: 'Een overzicht van blocks in de Ethereum-blockchain: hun datastructuur, waarom ze nodig zijn en hoe ze worden gemaakt.'
lang: nl
---

Blocks zijn batches van transacties met een hash van de vorige block in de chain. Dit verbindt blocks met elkaar (in een chain) omdat hashes cryptografisch zijn afgeleid van de blockgegevens. Dit voorkomt fraude, omdat één verandering in een willekeurige block in de geschiedenis alle volgende blocks ongeldig zou maken, omdat alle daaropvolgende hashes zouden veranderen en iedereen die de blockchain beheert dit zou merken.

## Vereisten {#prerequisites}

Blocks zijn een zeer beginnersvriendelijk onderwerp. Maar om deze pagina beter te begrijpen, raden we u aan om eerst [accounts](/developers/docs/accounts/), [transacties](/developers/docs/transactions/) en onze [Inleiding tot Ethereum](/developers/docs/intro-to-ethereum/) te lezen.

## Waarom blocks? {#why-blocks}

Om ervoor te zorgen dat alle deelnemers op het Ethereum-netwerk een gesynchroniseerde status behouden en het eens zijn over de precieze geschiedenis van transacties, voegen we transacties samen in blocks. Dit betekent dat tientallen (of honderden) transacties tegelijk worden toegezegd, overeengekomen en gesynchroniseerd.

![Een diagram met een transactie in een block die statusveranderingen veroorzaakt](./tx-block.png) _Aangepast diagram van [Ethereum-EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Door de verbintenissen te spreiden, geven we alle netwerkdeelnemers genoeg tijd om tot een consensus te komen. Hoewel transactieverzoeken tientallen keren per seconde voorkomen, worden blocks op Ethereum slechts eens per twaalf seconden aangemaakt en toegezegd.

## Hoe blocks werken {#how-blocks-work}

Om de transactiegeschiedenis te bewaren, worden blocks strikt geordend (elke nieuwe block die aangemaakt wordt, bevat een verwijzing naar de bovenliggende block), en transacties binnen blocks worden ook strikt geordend. Behalve in zeldzame gevallen, zijn op elk gegeven moment alle deelnemers op het netwerk het eens over het exacte aantal blocks en de geschiedenis ervan, en proberen ze de huidige live transactie-aanvragen te bundelen in de volgende block.

Zodra een block is samengesteld door een willekeurig gekozen validator op het netwerk, wordt het verspreid naar de rest van het netwerk. Alle nodes voegen deze block toe aan het einde van hun blockchain en een nieuwe validator wordt geselecteerd om de volgende block te creëren. Het exacte proces van samenstelling van blocks en het proces van verbintenis/consensus wordt momenteel gespecificeerd door het "proof-of-stake"-protocol van Ethereum.

## Proof-of-stake protocol {#proof-of-work-protocol}

Proof-of-stake betekent het volgende:

- Validerende nodes moeten 32 ETH staken in een stortingscontract als onderpand tegen slecht gedrag. Dit helpt om het netwerk te beschermen, omdat aantoonbaar oneerlijke activiteiten ertoe leiden dat een deel of de hele stake wordt vernietigd.
- In elk slot (met een tussenpoos van twaalf seconden) wordt willekeurig een validator geselecteerd om de blockvoorsteller te worden. Ze bundelen transacties, voeren ze uit en bepalen een nieuwe 'status'. Ze zetten deze informatie in een block en geven deze door aan andere validators.
- Andere validators die over de nieuwe block horen, voeren de transacties opnieuw uit om er zeker van te zijn dat ze akkoord gaan met de voorgestelde verandering aan de globale toestand. Ervan uitgaande dat de block geldig is, voegen ze deze toe aan hun eigen database.
- Als een validator hoort over twee conflicterende blocks voor hetzelfde slot, dan gebruikt hij/zij zijn/haar forkkeuze-algoritme om degene te kiezen die ondersteund wordt door de meest gestakete ETH.

[Meer over proof-of-stake](/developers/docs/consensus-mechanisms/pos)

## Wat zit er in een block? {#block-anatomy}

Er zit veel informatie in een block. Op het hoogste niveau bevat een block de volgende velden:

| Veld             | Beschrijving                                                            |
|:---------------- |:----------------------------------------------------------------------- |
| `slot`           | het slot waar de block bij hoort                                        |
| `proposer_index` | de ID van de validator die de block voorstelt                           |
| `parent_root`    | de hash van de voorgaande block                                         |
| `state_root`     | de root-hash van het statusobject                                       |
| `body`           | een object dat verschillende velden bevat, zoals hieronder gedefinieerd |

De block-`body` bevat verschillende eigen velden:

| Veld                 | Beschrijving                                                                |
|:-------------------- |:--------------------------------------------------------------------------- |
| `randao_reveal`      | een waarde die wordt gebruikt om de volgende blockvoorsteller te selecteren |
| `eth1_data`          | informatie over het stortingscontract                                       |
| `graffiti`           | arbitraire gegevens die worden gebruikt om blocks te taggen                 |
| `proposer_slashings` | lijst met validators die moeten worden geslasht                             |
| `attester_slashings` | lijst van attesters die moeten worden geslasht                              |
| `attestations`       | lijst van bevestigingen ten gunste van de huidige block                     |
| `stortingen`         | lijst van nieuwe stortingen naar het stortingscontract                      |
| `voluntary_exits`    | lijst van validators die het netwerk verlaten                               |
| `sync_aggregate`     | subset van validators gebruikt om light clients te bedienen                 |
| `execution_payload`  | transacties doorgegeven door de uitvoeringsclient                           |

Het veld `bevestigingen` bevat een lijst van alle bevestigingen in de block. Bevestigingen hebben hun eigen gegevenstype dat verschillende gegevens bevat. Elke bevestiging bevat:

| Veld               | Beschrijving                                                           |
|:------------------ |:---------------------------------------------------------------------- |
| `aggregation_bits` | een lijst van welke validators hebben deelgenomen aan deze bevestiging |
| `data`             | een container met verschillende subvelden                              |
| `signature`        | geaggregeerde handtekening van alle bevestigende validators            |

Het `data`-veld in `attestation` bevat het volgende:

| Veld                | Beschrijving                                         |
|:------------------- |:---------------------------------------------------- |
| `slot`              | het slot waarop de bevestiging betrekking heeft      |
| `index`             | indexen voor bevestigingen validators                |
| `beacon_block_root` | de root-hash van de Beacon-blok dat dit object bevat |
| `bron`              | het laatste gerechtvaardigde controlepunt            |
| `target`            | de laatste epoch-grensblock                          |

Het uitvoeren van de transacties in de `execution_payload` werkt de globale status bij. Alle clients voeren de transacties in de `execution_payload` opnieuw uit om ervoor te zorgen dat de nieuwe status overeenkomt met die in het nieuwe blockveld `state_root`. Dit is hoe clients kunnen vaststellen dat een nieuwe block geldig en veilig is om toe te voegen aan hun blockchain. De `execution payload` zelf is een object met verschillende velden. Er is ook een `execution_payload_header` die belangrijke samenvattende informatie over de uitvoeringsgegevens bevat. Deze gegevensstructuren zijn als volgt georganiseerd:

De `execution_payload_header` bevat de volgende velden:

| Veld                | Beschrijving                                                                    |
|:------------------- |:------------------------------------------------------------------------------- |
| `parent_hash`       | hash van de bovenliggende block                                                 |
| `fee_recipient`     | accountadres voor het betalen van transactiekosten                              |
| `state_root`        | root-hash voor de globale status na het uitvoeren van wijzigingen in deze block |
| `receipts_root`     | hash van de transactie-ontvangstbewijzentrie                                    |
| `logs_bloom`        | datastructuur met gebeurtenislogs                                               |
| `prev_randao`       | waarde gebruikt in willekeurige validatorselectie                               |
| `block_number`      | het nummer van de huidige block                                                 |
| `gas_limit`         | maximaal aantal gas toegestaan in deze block                                    |
| `gas_used`          | de werkelijke hoeveelheid gas die in deze block is gebruikt                     |
| `timestamp`         | de blocktijd                                                                    |
| `extra_data`        | willekeurige aanvullende gegevens als ruwe bytes                                |
| `base_fee_per_gas`  | de waarde van de basiskost                                                      |
| `block_hash`        | Hash van de uitvoeringsblock                                                    |
| `transactions_root` | root-hash van de transacties in de payload                                      |
| `withdrawal_root`   | root-hash van de opnames in de payload                                          |

De `execution_payload` zelf bevat het volgende (merk op dat dit identiek is aan de header, behalve dat in plaats van de root hash van de transacties het de werkelijke lijst van transacties en opname-informatie bevat):

| Veld               | Beschrijving                                                                    |
|:------------------ |:------------------------------------------------------------------------------- |
| `parent_hash`      | hash van de bovenliggende block                                                 |
| `fee_recipient`    | accountadres voor het betalen van transactiekosten                              |
| `state_root`       | root-hash voor de globale status na het uitvoeren van wijzigingen in deze block |
| `receipts_root`    | hash van de transactie-ontvangstbewijzentrie                                    |
| `logs_bloom`       | datastructuur met gebeurtenislogs                                               |
| `prev_randao`      | waarde gebruikt in willekeurige validatorselectie                               |
| `block_number`     | het nummer van de huidige block                                                 |
| `gas_limit`        | maximaal aantal gas toegestaan in deze block                                    |
| `gas_used`         | de werkelijke hoeveelheid gas die in deze block is gebruikt                     |
| `timestamp`        | de blocktijd                                                                    |
| `extra_data`       | willekeurige aanvullende gegevens als ruwe bytes                                |
| `base_fee_per_gas` | de waarde van de basiskost                                                      |
| `block_hash`       | Hash van de uitvoeringsblock                                                    |
| `transacties`      | lijst van uit te voeren transacties                                             |
| `opnames`          | lijst met opname-objecten                                                       |

De `withdrawals`-lijst bevat `withdrawal`-objecten die op de volgende manier gestructureerd zijn:

| Veld             | Beschrijving                     |
|:---------------- |:-------------------------------- |
| `address`        | accountadres dat heeft opgenomen |
| `bedrag`         | opnamebedrag                     |
| `index`          | indexwaarde opname               |
| `validatorIndex` | indexwaarde validator            |

## Blocktijd {#block-time}

De blocktijd verwijst naar de tijd die blocks van elkaar scheidt. In Ethereum wordt tijd opgedeeld in eenheden van twaalf seconden die 'slots' worden genoemd. In elk slot wordt één validator geselecteerd om een block voor te stellen. Ervan uitgaande dat alle validators online en volledig functioneel zijn, is er een block in elk slot, wat betekent dat de blocktijd 12 seconden is. Soms kunnen validators echter offline zijn wanneer ze worden opgeroepen om een block voor te stellen, wat betekent dat slots soms leeg kunnen blijven.

Deze implementatie verschilt van op proof-of-work gebaseerde systemen waar blocktijden probabilistisch zijn en afgestemd worden door de beoogde mining-moeilijkheidsgraad van het protocol. De [gemiddelde blocktijd](https://etherscan.io/chart/blocktime) van Ethereum is hier een perfect voorbeeld van, waarbij de overgang van proof-of-work naar proof-of-stake duidelijk kan worden afgeleid op basis van de consistentie van de nieuwe blocktijd van 12s.

## Block grootte {#block-size}

Een laatste belangrijke opmerking is dat blocks zelf begrensd zijn in grootte. Elke block heeft een doelgrootte van 15 miljoen gas, maar de grootte van de blocks zal toenemen of afnemen in overeenstemming met de vraag van het netwerk, tot de blocklimiet van 30 miljoen gas (2x doelblockgrootte). De blockgaslimiet kan naar boven of beneden worden bijgesteld met een factor 1/1024 ten opzichte van de gaslimiet van de vorige block. Als gevolg hiervan kunnen validators de blockgaslimiet wijzigen via consensus. De totale hoeveelheid gas die door alle transacties in de block wordt verbruikt, moet minder zijn dan de blockgaslimiet. Dit is belangrijk omdat het ervoor zorgt dat blocks niet willekeurig groot kunnen zijn. Indien blocks willekeurig groot zouden kunnen zijn, dan zouden minder performante volledige nodes geleidelijk stoppen met het netwerk bij te kunnen houden omwille van ruimte- en snelheidsvereisten. Hoe groter de block, hoe groter de rekenkracht die nodig is om ze op tijd voor het volgende slot te verwerken. Dit is een centraliserende kracht die wordt tegengegaan door blockgroottes te beperken.

## Lees verder {#further-reading}

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_

## Verwante onderwerpen {#related-topics}

- [Transacties](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
