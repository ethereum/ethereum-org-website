---
title: Gas en kosten
description:
lang: nl
---

Gas is essentieel voor het Ethereum-netwerk. Het is de brandstof die het mogelijk maakt om te blijven werken, net zoals een auto benzine nodig heeft om te kunnen rijden.

## Randvoorwaarden {#prerequisites}

Om deze pagina beter te begrijpen, raden we u aan om u eerst in te lezen over [ transacties](/developers/docs/transactions/) en [EVM](/developers/docs/evm/).

## Wat is gas? {#what-is-gas}

Gas verwijst naar de eenheid die de hoeveelheid rekenkracht meet die nodig is om specifieke bewerkingen op het Ethereum-netwerk uit te voeren.

Omdat elke Ethereum-transactie rekenkracht vereist om te worden uitgevoerd, moet er voor die bronnen worden betaald om ervoor te zorgen dat Ethereum niet kwetsbaar wordt voor spam en niet vast kan komen te zitten in oneindige rekenlussen. De berekening wordt betaald in de vorm van een gaskost.

De gaskost is **de hoeveelheid gas die wordt gebruikt om een bepaalde bewerking uit te voeren, vermenigvuldigd met de kosten per gaseenheid**. De kost worden betaald, of een transactie nu geslaagd is of niet.

![Een diagram dat toont waar gas nodig is in EVM-activiteiten](./gas.png) _Aangepast diagram van [Ethereum EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gaskosten moeten worden betaald in de eigen munteenheid van Ethereum, ether (ETH). Gasprijzen worden meestal weergegeven in gwei, een benaming van ETH. Elke gwei is gelijk aan een miljardste van een ETH (0,000000001 ETH of 10<sup>-9</sup> ETH).

In plaats van te zeggen dat uw gas 0,000000001 ether kost, kunt u bijvoorbeeld zeggen dat uw gas 1 gwei kost.

Het woord 'gwei' is een samentrekking van 'giga-wei', wat 'miljard wei' betekent. Eén gwei is gelijk aan één miljard wei. Wei zelf (genoemd naar [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), maker van [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) is de kleinste eenheid van ETH.

## Hoe worden gaskosten berekend? {#how-are-gas-fees-calculated}

U kunt de hoeveelheid gas die u bereid bent te betalen instellen wanneer u een transactie indient. Door een bepaalde hoeveelheid gas aan te bieden, biedt u om uw transactie op te nemen in de volgende block. Als u te weinig aanbiedt, zullen validators uw transactie minder snel selecteren voor opname, waardoor uw transactie mogelijk te laat of helemaal niet wordt uitgevoerd. Als u te veel aanbiedt, verspilt u misschien wat ETH. Dus hoe weet u hoeveel u moet betalen?

Het totale aantal gas dat u betaalt, is verdeeld in twee componenten: de `basiskost` en de `prioriteitskost` (fooi).

De `basiskost` is ingesteld door het protocol. U moet minstens dit bedrag betalen om uw transactie als geldig te beschouwen. De `prioriteitskost` is een fooi die u toevoegt aan de basiskosten om uw transactie aantrekkelijk te maken voor validators, zodat ze deze kiezen voor opname in de volgende block.

Een transactie die alleen de `basiskost` betaalt, is technisch geldig maar wordt waarschijnlijk niet opgenomen omdat het de validators geen stimulans biedt om deze transactie boven een andere transactie te verkiezen. De 'juiste' `prioriteitskosten` worden bepaald door het netwerkgebruik op het moment dat u uw transactie verstuurt. Als er veel vraag is, moet u uw `prioriteitskosten` misschien hoger instellen, maar als er minder vraag is, kunt u minder betalen.

Laten we bijvoorbeeld zeggen dat Jordan 1 ETH moet betalen aan Taylor. Voor een ETH-overdracht zijn 21.000 eenheden gas nodig en de basiskost is 10 gwei. Jordan geeft een fooi van 2 gwei.

De totale kosten zijn nu:

`gebruikte eenheden gas * (basiskost + prioriteitskost)`

waarbij de `basiskost` een door het protocol ingestelde waarde is en de `prioriteitskost` een door de gebruiker ingestelde waarde als fooi voor de validator.

dat wil zeggen `21.000 * (10 + 2) = 252.000 gwei` (0,000252 ETH).

Wanneer Jordan het geld verstuurt, wordt er 1,000252 ETH afgetrokken van het account van Jordan. Taylor krijgt 1,0000 ETH. De validator ontvangt de fooi van 0,000042 ETH. De `basiskost` van 0,00021 ETH wordt verbrand.

### Basiskost {#base-fee}

Elke block heeft een basiskost die fungeert als een reserveprijs. Om in aanmerking te komen voor een opname in een block, moet de aangeboden prijs per gas ten minste gelijk zijn aan de basiskost. De basiskost wordt onafhankelijk van de huidige block berekend en wordt in plaats daarvan bepaald door de blocks ervoor, waardoor transactiekosten voorspelbaarder worden voor gebruikers. Wanneer de block wordt aangemaakt, wordt deze **basiskost "verbrand"**, wat betekent dat deze uit circulatie wordt genomen.

De basiskost wordt berekend door een formule die de grootte van de vorige block (de hoeveelheid gas gebruikt voor alle transacties) vergelijkt met de doelgrootte. De basiskost wordt verhoogd met maximaal 12,5% per block als de doelblockgrootte wordt overschreden. Deze exponentiële groei maakt het economisch niet haalbaar om de blockgrootte oneindig lang hoog te houden.

| Blocknummer | Inbegrepen gas | Verhoging kost | Huidige basiskost |
| ----------- | --------------:| --------------:| -----------------:|
| 1           |            15M |             0% |          100 gwei |
| 2           |            30M |             0% |          100 gwei |
| 3           |            30M |          12,5% |        112,5 gwei |
| 4           |            30M |          12,5% |        126,6 gwei |
| 5           |            30M |          12,5% |        142,4 gwei |
| 6           |            30M |          12,5% |        160,2 gwei |
| 7           |            30M |          12,5% |        180,2 gwei |
| 8           |            30M |          12,5% |        202,7 gwei |

Volg de bovenstaande tabel. Om een transactie op blocknummer 9 aan te maken, moet een wallet de gebruiker zeker laten weten dat de **maximale basiskost** die aan de volgende block wordt toegevoegd, `huidige basiskost * 112,5%` of `202.7 gwei * 112,5% = 228,1 gwei` is.

Het is ook belangrijk om op te merken dat het onwaarschijnlijk is dat we lange pieken van volledige blocks zullen krijgen, vanwege de snelheid waarmee de basiskost stijgt voorafgaand aan een volledig block.

| Blok nummer | Inbegrepen Gas | Kosten verhoging | Huidige basisvergoeding |
| ----------- | --------------:| ----------------:| -----------------------:|
| 30          |            30M |            12,5% |             2705,6 gwei |
| ...         |            ... |            12,5% |                     ... |
| 50          |            30M |            12,5% |            28531,3 gwei |
| ...         |            ... |            12,5% |                     ... |
| 100         |            30M |            12,5% |         10302608,6 gwei |

### Prioriteitskost (fooi) {#priority-fee}

De prioriteitskost (fooi) stimuleert validators om een transactie in de block op te nemen. Zonder fooien zou het voor validators economisch haalbaar zijn om lege blocks te minen, omdat ze dezelfde blockbeloning zouden ontvangen. Kleine fooien geven validators een minimale stimulans om een transactie op te nemen. Om transacties bij voorkeur uit te voeren vóór andere transacties in dezelfde block, kan een hogere fooi worden gebruikt om te proberen concurrerende transacties te overbieden.

### Maximale kost {#maxfee}

Om een transactie op het netwerk uit te voeren, kunnen gebruikers een maximumlimiet opgeven die ze bereid zijn te betalen om hun transactie uit te voeren. Deze optionele parameter staat bekend als de `maxFeePerGas`. Om een transactie uit te voeren, moet de maximumkost hoger zijn dan de som van de basiskost en de fooi. De afzender van de transactie krijgt het verschil terug tussen de maximumkost en de som van de basiskosten en de fooi.

### Blockgrootte {#block-size}

Elke block heeft een doelgrootte van 15 miljoen gas, maar de grootte van de blocks zal toenemen of afnemen in overeenstemming met de netwerkvraag, tot de blocklimiet van 30 miljoen gas (2x de doelgrootte van de block). Het protocol bereikt een evenwichtige blockgrootte van gemiddeld 15 miljoen via het proces van _tâtonnement_. Dit betekent dat als de blockgrootte groter is dan de doelblockgrootte, zal het protocol de basiskost voor de volgende block verhogen. Op dezelfde manier verlaagt het protocol de basiskost als de blockgrootte kleiner is dan de doelblockgrootte. Het bedrag waarmee de basiskost wordt aangepast, is evenredig met hoe ver de huidige blockgrootte verwijderd is van het doel. [Meer over blocks](/developers/docs/blocks/).

### Gaskosten berekenen in de praktijk {#calculating-fees-in-practice}

U kunt expliciet aangeven hoeveel u bereid bent te betalen om uw transactie uitgevoerd te krijgen. De meeste aanbieders van wallets zullen echter automatisch een aanbevolen transactiekost instellen (basisbedrag + aanbevolen prioriteitskost) om de complexiteit voor hun gebruikers te verminderen.

## Waarom bestaan gaskosten? {#why-do-gas-fees-exist}

Kortom, de gaskosten helpen het Ethereum-netwerk veilig te houden. Door een bijdrage (kost) te vragen voor elke berekening die op het netwerk wordt uitgevoerd, voorkomen we dat slechte actoren het netwerk spammen. Om onbedoelde of vijandige oneindige lussen of andere verspilling van rekenkracht in code te voorkomen, moet elke transactie een limiet instellen op het aantal rekenstappen dat de code kan gebruiken. De fundamentele rekeneenheid is 'gas'.

Hoewel een transactie een limiet bevat, wordt gas dat niet wordt gebruikt in een transactie teruggegeven aan de gebruiker (d.w.z. `maximumkost - (basiskost + fooi)` wordt teruggegeven).

![Schema dat toont hoe ongebruikt gas wordt terugbetaald](../transactions/gas-tx.png) _Aangepast diagram van [Ethereum EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Wat is de gaslimiet? {#what-is-gas-limit}

De gaslimiet verwijst naar de maximale hoeveelheid gas die u bereid bent te verbruiken voor een transactie. Meer ingewikkelde transacties met [smart contracts](/developers/docs/smart-contracts/) vereisen meer rekenwerk, dus ze vereisen een hogere gaslimiet dan een eenvoudige betaling. Voor een standaard ETH-overdracht is een gaslimiet van 21.000 eenheden gas nodig.

Als u bijvoorbeeld een gaslimiet van 50.000 instelt voor een eenvoudige ETH-overdracht, dan zou de EVM 21.000 verbruiken en zou u de resterende 29.000 terugkrijgen. Als u echter te weinig gas invoert, bijvoorbeeld een gaslimiet van 20.000 voor een eenvoudige ETH-overdracht, zal de EVM uw 20.000 gaseenheden verbruiken in een poging de transactie uit te voeren, maar deze zal niet voltooid worden. De EVM herroept vervolgens alle wijzigingen, maar omdat de validator al 20.000 gaseenheden aan werk heeft uitgevoerd, wordt dat gas verbruikt.

## Waarom kunnen de gaskosten zo oplopen? {#why-can-gas-fees-get-so-high}

Hoge gaskosten zijn te wijten aan de populariteit van Ethereum. Als er te veel vraag is, moeten gebruikers hogere fooibedragen aanbieden om te proberen de transacties van andere gebruikers te overbieden. Een hogere fooi kan het waarschijnlijker maken dat uw transactie in de volgende block terechtkomt. Complexere smart contract-apps kunnen ook veel handelingen uitvoeren om hun functies te ondersteunen, waardoor ze veel gas verbruiken.

## Initiatieven om de gaskosten te verminderen {#initiatives-to-reduce-gas-costs}

De [schaalbaarheidsupgrades](/roadmap/) van Ethereum moeten uiteindelijk enkele van de problemen met de gaskosten oplossen, waardoor het platform duizenden transacties per seconde kan verwerken en wereldwijd kan opschalen.

Opschaling van laag 2 is een primair initiatief om de gaskosten, gebruikerservaring en schaalbaarheid sterk te verbeteren. [Meer over opschaling van laag 2](/developers/docs/scaling/#layer-2-scaling).

## Gaskosten monitoren {#monitoring-gas-fees}

Als u de gasprijzen wilt monitoren, zodat u uw ETH voor minder kunt versturen, kunt u veel verschillende tools gebruiken, zoals:

- [Etherscan](https://etherscan.io/gastracker) _Schatter voor de transactiegasprijs_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitor en volg de Ethereum- en L2-gasprijzen om transactiekosten te verlagen en geld te besparen_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Chrome-extensie die gasprijzen schat, die zowel transacties van type 0 en type 2 EIP-1559-transacties ondersteunt._
- [Cryptoneur Gas Fee Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Bereken de gaskosten in uw lokale valuta voor verschillende transactietypes op het hoofdnet, Arbitrum en Polygon._

## Gerelateerde tools {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API voor gasschatting, ondersteund door Blocknative's wereldwijde mempool-dataplatform_

## Verder lezen {#further-reading}

- [Uitleg over Ethereum-gas](https://defiprime.com/gas)
- [Het gasverbruik van uw smart contracts verminderen](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Proof-of-stake versus Proof-of-work](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Gasoptimalisatiestrategieën voor ontwikkelaars](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559-documentatie](https://eips.ethereum.org/EIPS/eip-1559).
- [Tim Beiko's EIP-1559-bronnen](https://hackmd.io/@timbeiko/1559-resources).
