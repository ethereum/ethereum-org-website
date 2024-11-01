---
title: Intro tot Ethereum
description: Een inleiding van een dapp-ontwikkelaar tot de kernconcepten van Ethereum.
lang: nl
---

## Wat is een blockchain? {#what-is-a-blockchain}

Een blockchain is een openbare database die wordt bijgewerkt en gedeeld door vele computers in een netwerk.

“Block” verwijst naar de gegevens en status die worden opgeslagen in opeenvolgende groepen die “blocks” worden genoemd. Als u ETH naar iemand anders stuurt, moeten de transactiegegevens worden toegevoegd aan een block om succesvol te zijn.

“Chain” verwijst naar het feit dat elke block cryptografisch verwijst naar zijn bovenliggende block. Met andere woorden, blocks worden aan elkaar "gechaind" (geketend). De gegevens in een block kunnen niet veranderen zonder alle daaropvolgende blocks te veranderen, wat de consensus van het hele netwerk zou vereisen.

Elke computer in het netwerk moet instemmen met elke nieuw block en de chain als geheel. Deze computers staan bekend als "nodes". Nodes zorgen ervoor dat iedereen die interactie heeft met de blockchain, dezelfde gegevens heeft. Om deze gedistribueerde overeenkomst tot stand te brengen, hebben blockchains een consensusmechanisme nodig.

Ethereum gebruikt een op [proof-of-stake gebaseerd consensusmechanisme](/developers/docs/consensus-mechanisms/pos/). Iedereen die nieuwe blocks aan de chain wil toevoegen, moet ETH (de eigen munteenheid in Ethereum) gebruiken (staken) als onderpand en validatorsoftware uitvoeren. Deze “validators” kunnen vervolgens willekeurig worden geselecteerd om blocks voor te stellen die andere validators controleren en toevoegen aan de blockchain. Er is een systeem van beloningen en sancties dat deelnemers sterk stimuleert om eerlijk en zo veel mogelijk online beschikbaar te zijn.

Als u wilt zien hoe blockchaingegevens worden gehasht en vervolgens worden toegevoegd aan de geschiedenis van blockreferenties, ga dan zeker eens naar [deze demo](https://andersbrownworth.com/blockchain/blockchain) van Anders Brownworth en bekijk de bijbehorende video hieronder.

Bekijk Anders die hashes in blockchains uitlegt:

<YouTube id="_160oMzblY8" />

## Wat is Ethereum? {#what-is-ethereum}

Ethereum is een blockchain met een computer die erin is geïntegreerd. Het is de basis voor het bouwen van apps en organisaties op een gedecentraliseerde, toestemmingsvrije, censuurbestendige manier.

In het Ethereum-universum is er één enkele, canonieke computer (die de Ethereum Virtual Machine, of EVM, wordt genoemd) waarvan iedereen op het Ethereum-netwerk het eens is over de status. Iedereen die deelneemt aan het Ethereum-netwerk (elke Ethereum-node) houdt een kopie bij van de status van deze computer. Bovendien kan elke deelnemer een verzoek uitzenden naar deze computer om een willekeurige berekening uit te voeren. Wanneer een dergelijk verzoek wordt uitgezonden, controleren, valideren en voeren andere deelnemers op het netwerk de berekening uit. Deze uitvoering veroorzaakt een statusverandering in de EVM, die wordt vastgelegd en door het hele netwerk wordt verspreid.

Verzoeken om berekeningen worden transactieverzoeken genoemd. Het verslag van alle transacties en de huidige status van de EVM wordt opgeslagen op de blockchain, die op zijn beurt wordt opgeslagen en goedgekeurd door alle nodes.

Cryptografische mechanismen zorgen ervoor dat als transacties eenmaal als geldig zijn geverifieerd en aan de blockchain zijn toegevoegd, er later niet meer mee geknoeid kan worden. Dezelfde mechanismen zorgen er ook voor dat alle transacties worden ondertekend en uitgevoerd met de juiste “toestemmingen” (niemand mag in staat zijn om digitale activa te versturen vanaf het account van Alice, behalve Alice zelf).

## Wat is ether? {#what-is-ether}

**Ether (ETH)** is de eigen cryptovaluta van Ethereum. Het doel van ETH is om te zorgen voor een markt voor berekeningen. Een dergelijke markt zorgt voor een economische stimulans voor deelnemers om transactieverzoeken te verifiëren en uit te voeren en rekenkrachtbronnen aan het netwerk te leveren.

Elke deelnemer die een transactieverzoek uitzendt, moet ook een bepaalde hoeveelheid ETH aanbieden aan het netwerk als bounty. Het netwerk zal een deel van de bounty verbranden en de rest toekennen aan degene die uiteindelijk het werk doet om de transactie te verifiëren, uit te voeren, vast te leggen op de blockchain en uit te zenden naar het netwerk.

De hoeveelheid ETH die betaald wordt, komt overeen met de bronnen die nodig zijn om de berekening uit te voeren. Deze bounty's voorkomen ook dat kwaadwillende deelnemers het netwerk opzettelijk overbelasten door te vragen om het uitvoeren van oneindige berekeningen of andere scripts die veel bronnen gebruiken, omdat deze deelnemers moeten betalen voor berekeningsbronnen.

ETH wordt ook gebruikt om voor crypto-economische veiligheid te zorgen in het netwerk, en wel op drie manieren: 1) het wordt gebruikt als middel om validators te belonen die blocks voorstellen of oneerlijk gedrag van andere validators aanklagen; 2) het wordt ingezet door validators, als onderpand tegen oneerlijk gedrag. Als validators zich proberen te misdragen kan hun ETH vernietigd worden; 3) het wordt gebruikt om 'stemmen' te wegen voor nieuw voorgestelde blocks, als input voor het forkkeuzegedeelte van het consensusmechanisme.

## Wat zijn smart contracts? {#what-are-smart-contracts}

In de praktijk schrijven deelnemers niet telkens nieuwe code als ze een berekening op de EVM willen aanvragen. Applicatie-ontwikkelaars uploaden programma's (herbruikbare stukjes code) naar de EVM-status, en gebruikers doen verzoeken om deze stukjes code met verschillende parameters uit te voeren. We noemen de programma's die geüpload worden naar en uitgevoerd worden door het netwerk smart contracts.

Op een heel eenvoudige manier kunt u een smart contract vergelijken met een soort verkoopautomaat. Het is een script dat, wanneer het wordt aangeroepen met bepaalde parameters, bepaalde acties of berekeningen uitvoert als aan bepaalde voorwaarden wordt voldaan. Een eenvoudig smart contract voor verkopers kan bijvoorbeeld eigendom van een digitaal activum creëren en toewijzen als de aanvrager ETH naar een specifieke ontvanger stuurt.

Elke ontwikkelaar kan een smart contract aanmaken en openbaar maken voor het netwerk, waarbij de blockchain als datalaag wordt gebruikt, tegen een kost die aan het netwerk wordt betaald. Elke gebruiker kan dan het smart contract oproepen om zijn/haar code uit te voeren, opnieuw tegen een kost die betaald wordt aan het netwerk.

Met smart contracts kunnen ontwikkelaars dus willekeurig complexe apps en diensten voor gebruikers bouwen en implementeren, zoals marktplaatsen, financiële instrumenten, games, enz.

## Terminologie {#terminology}

### Blockchain {#blockchain}

De volgorde van alle blocks die zijn vastgelegd op het Ethereum-netwerk in de geschiedenis van het netwerk. Zo genoemd omdat elke block een verwijzing bevat naar de vorige block, wat ons helpt om alle blokken te ordenen (en dus controle te hebben over de exacte geschiedenis).

### ETH {#eth}

**Ether (ETH)** is de originele cryptovaluta van Ethereum. Gebruikers betalen ETH aan andere gebruikers om hun verzoeken voor code-uitvoering te laten volbrengen.

[Meer over ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

De Ethereum Virtual Machine is de globale virtuele computer waarvan elke deelnemer op het Ethereum-netwerk de status opslaat en ermee overeenkomt. Elke deelnemer kan de uitvoering van willekeurige code op de EVM aanvragen. De uitvoering van de code verandert de toestand van de EVM.

[Meer over de EVM](/developers/docs/evm/)

### Nodes {#nodes}

De échte fysieke apparaten die de EVM-status opslaan. Nodes communiceren met elkaar om informatie over de EVM-status en nieuwe statuswijzigingen door te geven. Elke gebruiker kan ook om de uitvoering van code vragen door een verzoek om uitvoering van code uit te zenden vanaf een node. Het Ethereum-netwerk zelf is het geheel van alle Ethereum-nodes en hun communicatie.

[Meer over nodes](/developers/docs/nodes-and-clients/)

### Accounts {#accounts}

Waar ETH wordt opgeslagen. Gebruikers kunnen accounts initialiseren, ETH op de accounts storten en ETH overmaken van hun accounts naar andere gebruikers. Accounts en accountsaldi worden opgeslagen in een grote tabel in de EVM. Ze maken deel uit van de algemene EVM-status.

[Meer over accounts](/developers/docs/accounts/)

### Transacties {#transactions}

Een "transactieverzoek" is de formele term voor een verzoek voor het uitvoeren van code op de EVM, en een "transactie" is een uitgevoerd transactieverzoek en de bijbehorende verandering in de EVM-status. Elke gebruiker kan een transactieverzoek naar het netwerk sturen vanaf een node. Om het transactieverzoek de overeengekomen EVM-status te laten beïnvloeden, moet het gevalideerd, uitgevoerd en “vastgelegd worden op het netwerk” door een andere node. De uitvoering van om het even welke code veroorzaakt een statusverandering in de EVM. Bij het vastleggen wordt deze statusverandering uitgezonden naar alle nodes in het netwerk. Enkele voorbeelden van transacties:

- Stuur X ETH van mijn account naar het account van Alice.
- Publiceer wat smart contract-code in EVM-status.
- De code van het smart contract uitvoeren op adres X in de EVM, met argumenten Y.

[Meer over transacties](/developers/docs/transactions/)

### Blocks {#blocks}

Het volume van transacties is erg hoog, dus transacties worden “vastgelegd” in batches, of blocks. Blocks bevatten over het algemeen tientallen tot honderden transacties.

[Meer over blocks](/developers/docs/blocks/)

### Smart Contracts {#smart-contracts}

Een herbruikbaar stukje code (een programma) dat een ontwikkelaar publiceert in EVM-status. Iedereen kan vragen dat de smart contract code wordt uitgevoerd door een transactieverzoek in te dienen. Omdat ontwikkelaars willekeurige uitvoerbare applicaties in de EVM kunnen schrijven (games, marktplaatsen, financiële instrumenten, etc.) door smart contracts te publiceren, worden deze vaak ook [dapps of gedecentraliseerde apps](/developers/docs/dapps/) genoemd.

[Meer over slimme contracten](/developers/docs/smart-contracts/)

## Verder lezen {#further-reading}

- [Ethereum-whitepaper](/whitepaper/)
- [Hoe werkt Ethereum nu eigenlijk?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** deze bron is nog steeds waardevol, maar houd er rekening mee dat hij dateert van vóór [de samenvoeging](/roadmap/merge) en daarom nog steeds verwijst naar het proof-of-work-mechanisme van Ethereum - Ethereum is nu beveiligd met [proof-of-stake](/developers/docs/consensus-mechanisms/pos))

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_

## Gerelateerde tutorials {#related-tutorials}

- [Een gids voor ontwikkelaars over Ethereum, deel 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _- Een zeer beginnersvriendelijke verkenning van Ethereum met Python en web3.py_
