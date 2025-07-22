---
title: Inleiding tot Ether
description: Introductie van een ontwikkelaar tot de ether-cryptovaluta.
lang: nl
---

## Randvoorwaarden {#prerequisites}

Om deze pagina beter te begrijpen, raden we u aan om eerst [introductie tot Ethereum](/developers/docs/intro-to-ethereum/) te lezen.

## Wat is een cryptovaluta? {#what-is-a-cryptocurrency}

Een cryptovaluta is een ruilmiddel dat wordt beveiligd door een op blockchain gebaseerde ledger.

Een ruilmiddel is iets dat algemeen aanvaard wordt als betaling voor goederen en diensten, en een ledger is een gegevensopslag die transacties bijhoudt. Blockchaintechnologie zorgt ervoor dat gebruikers transacties kunnen doen op de ledger zonder afhankelijk te zijn van een vertrouwde derde partij om de ledger te beheren.

De eerste cryptovaluta was Bitcoin, gecreëerd door Satoshi Nakamoto. Sinds de release van Bitcoin in 2009 hebben mensen duizenden cryptovaluta's gecreëerd op veel verschillende blockchains.

## Wat is ether? {#what-is-ether}

**Ether (ETH)** is de cryptovaluta die gebruikt wordt voor veel zaken op het Ethereum-netwerk. In principe is dit de enige acceptabele vorm van betaling voor transactiekosten en na [de samenvoeging](/roadmap/merge) is ether vereist om blocks op het hoofdnet te valideren en voor te stellen. Ether wordt ook gebruikt als een primaire vorm van onderpand in de [DeFi](/defi) leningsmarkten, als rekeneenheid in NFT-marktplaatsen, als verdiende betaling voor het uitvoeren van diensten of het verkopen van echte goederen, en nog veel meer.

Ethereum stelt ontwikkelaars in staat om [**gedecentraliseerde applicaties (dapps)**](/developers/docs/dapps) te maken, die allemaal een pool van rekenkracht delen. Deze gedeelde pool is eindig, dus Ethereum heeft een mechanisme nodig om te bepalen wie deze mag gebruiken. Anders kan een dapp per ongeluk of met kwade bedoelingen alle netwerkbronnen opslokken, waardoor anderen geen toegang meer hebben.

De ether-cryptovaluta ondersteunt een prijsmechanisme voor de rekenkracht van Ethereum. Wanneer gebruikers een transactie willen uitvoeren, moeten ze ether betalen om hun transactie te laten herkennen op de blockchain. Deze gebruikskosten staan bekend als [gaskosten](/developers/docs/gas/), en de gaskosten zijn afhankelijk van de hoeveelheid rekenkracht die nodig is om de transactie uit te voeren en de netwerkwijde vraag naar rekenkracht op dat moment.

Daarom zou zelfs als een kwaadwillende dapp een oneindige lus zou indienen, de transactie uiteindelijk zonder ether komen te zitten en worden beëindigd, waardoor het netwerk weer normaal kan functioneren.

Het is [normaal](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [dat](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [Ethereum en ether door elkaar gehaald worden](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum). Wanneer mensen spreken over de “prijs van Ethereum”, bedoelen ze de prijs van ether.

## Minten van ether {#minting-ether}

Minten is het proces waarbij nieuwe ether wordt aangemaakt op de Ethereum-ledger. Het onderliggende Ethereum-protocol creëert de nieuwe ether, en het is niet mogelijk voor een gebruiker om ether te creëren.

Ether wordt gemint als beloning voor elke voorgestelde block en bij elk epoch-controlepunt voor andere validatoractiviteiten met betrekking tot het bereiken van consensus. Het totale uitgegeven bedrag hangt af van het aantal validators en hoeveel ether ze hebben gestaket. Deze totale uitgifte wordt gelijk verdeeld over de validators in het ideale geval dat alle validators eerlijk en online zijn, maar in werkelijkheid varieert dit op basis van de prestaties van de validator. Ongeveer 1/8 van de totale uitgifte gaat naar de blockvoorsteller. De rest wordt verdeeld over de andere validators. Blockvoorstellers ontvangen ook fooien uit transactiekosten en MEV-gerelateerde inkomsten, maar deze komen van gerecyclede ether, niet van nieuwe uitgifte.

## Ether verbranden {#burning-ether}

Naast het creëren van ether via blockbeloningen, kan ether ook worden vernietigd via een proces dat "verbranden" wordt genoemd. Wanneer ether wordt verbrand, wordt het permanent uit de circulatie gehaald.

Tijdens elke transactie op Ethereum wordt ether verbrand. Wanneer gebruikers voor hun transacties betalen, wordt een basisgasvergoeding, die door het netwerk wordt vastgesteld op basis van de vraag naar transacties, vernietigd. Dit, in combinatie met variabele blockgroottes en een maximale gaskost, vereenvoudigt het inschatten van de transactiekosten op Ethereum. Als de netwerkvraag hoog is, kunnen [blocks](https://etherscan.io/block/12965263) meer ether verbranden dan ze minten (produceren), waardoor de uitgifte van ether op een efficiënte manier wordt gecompenseerd.

Het verbranden van de basiskosten belemmert het vermogen van een blockproducent om transacties te manipuleren. Als blockproducenten bijvoorbeeld de basiskosten hebben ontvangen, kunnen ze hun eigen transacties gratis toevoegen en de basiskosten voor alle anderen verhogen. Als alternatief kunnen ze de basiskosten terugbetalen aan sommige gebruikers buiten de chain om, wat leidt tot een meer ondoorzichtige en complexe markt voor transactiekosten.

## Denominaties van Ether {#denominations}

Omdat de waarde van veel transacties op Ethereum klein is, heeft ether verschillende denominaties waarnaar kan worden verwezen als kleinere rekeneenheden. Van deze denominaties zijn Wei en gwei bijzonder belangrijk.

Wei is de kleinst mogelijke hoeveelheid ether en daarom zullen veel technische implementaties, zoals de [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), alle berekeningen baseren op Wei.

Gwei, kort voor giga-wei, wordt vaak gebruikt om de gaskosten op Ethereum te beschrijven.

| Denominatie | Waarde in ether  | Algemeen gebruik                |
| ----------- | ---------------- | ------------------------------- |
| Wei         | 10<sup>-18</sup> | Technische implementaties       |
| Gwei        | 10<sup>-9</sup>  | Gaskosten leesbaar door de mens |

## Overdracht van Ether {#transferring-ether}

Elke transactie op Ethereum bevat een `value`-veld, dat de hoeveelheid over te dragen ether specificeert. Dit wordt uitgedrukt in wei en verzonden van het adres van de verzender naar het adres van de ontvanger.

Wanneer het adres van de ontvanger een [smart contract](/developers/docs/smart-contracts/)is, kan deze overgedragen ether worden gebruikt om gas te betalen wanneer het smart contract zijn code uitvoert.

[Meer over transacties](/developers/docs/transactions/)

## Opvragen van ether {#querying-ether}

Gebruikers kunnen het ethersaldo van een [account](/developers/docs/accounts/) opvragen door het `balance`-veld van het account te controleren, die het etherbezit in wei weergeeft.

[Etherscan](https://etherscan.io) is een populaire tool om adressaldi te inspecteren via een webgebaseerde applicatie. [Deze Etherscan-pagina](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) toont het saldo voor de Ethereum Foundation. Accountsaldi kunnen ook worden opgevraagd via wallets of rechtstreeks door verzoeken in te dienen bij nodes.

## Verder lezen {#further-reading}

- [Defining Ether and Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) - _CME Group_
- [Ethereum Whitepaper](/whitepaper/): Het oorspronkelijke voorstel voor Ethereum. Dit document bevat een beschrijving van ether en de motivatie achter de creatie ervan.
- [Gwei Calculator](https://www.alchemy.com/gwei-calculator): gebruik deze gwei-calculator om eenvoudig wei, gwei en ether om te rekenen. Voer gewoon een willekeurige hoeveelheid wei, gwei of ETH in en bereken automatisch het omgerekende getal.

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_
