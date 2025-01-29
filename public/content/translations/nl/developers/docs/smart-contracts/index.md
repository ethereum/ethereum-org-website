---
title: Inleiding tot smart contracts
description: Een overzicht van smart contracts, met de nadruk op hun unieke kenmerken en beperkingen.
lang: nl
---

## Wat is een smart contract? {#what-is-a-smart-contract}

Een "smart contract" is eenvoudigweg een programma dat wordt uitgevoerd op de Ethereum-blockchain. Het is een verzameling code (de functies) en gegevens (de status) die zich op een specifiek adres op de Ethereum-blockchain bevindt.

Smart contracts zijn een soort [Ethereum-account](/developers/docs/accounts/). Dit betekent dat ze een saldo hebben en het doel kunnen zijn van transacties. Ze worden echter niet aangestuurd door een gebruiker, maar worden ingezet op het netwerk en werken zoals geprogrammeerd. Gebruikersaccounts kunnen dan interactie hebben met een smart contract door transacties in te dienen die een functie uitvoeren die op het smart contract is gedefinieerd. Smart contracts kunnen regels definiëren, zoals een normaal contract, en deze automatisch afdwingen via de code. Smart contracts kunnen standaard niet worden verwijderd en interacties ermee zijn onomkeerbaar.

## Vereisten {#prerequisites}

Als u nog maar net begint of op zoek bent naar een minder technische inleiding, raden we u onze [inleiding tot smart contracts](/smart-contracts/) aan.

Zorg ervoor dat u alles heeft gelezen over [accounts](/developers/docs/accounts/), [transacties](/developers/docs/transactions/) en de [Ethereum virtual machine](/developers/docs/evm/) voordat u in de wereld van smart contracts stapt.

## Een digitale verkoopautomaat {#a-digital-vending-machine}

Misschien is de beste metafoor voor een smart contract wel een verkoopautomaat, zoals beschreven door [Nick Szabo](https://unenumerated.blogspot.com/). Met de juiste input is een bepaalde output gegarandeerd.

Om een snack uit een verkoopautomaat te halen:

```
money + snack selection = snack dispensed
```

Deze logica zit in de verkoopautomaat geprogrammeerd.

Een smart contract heeft, net als een verkoopautomaat, logica in zich geprogrammeerd. Hier is een eenvoudig voorbeeld van hoe deze verkoopautomaat eruit zou kunnen zien als het een smart contract was dat in Solidity is geschreven:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Net zoals een verkoopautomaat de behoefte aan een fysieke verkoper wegneemt, kunnen smart contracts tussenpersonen in veel industrieën vervangen.

## Toestemmingsvrij {#permissionless}

Iedereen kan een smart contract schrijven en het inzetten op het netwerk. U hoeft alleen maar te leren programmeren in een [smart contract-taal](/developers/docs/smart-contracts/languages/) en genoeg ETH te hebben om uw contract in te zetten. Een smart contract inzetten is technisch gezien een transactie, dus moet u [gas](/developers/docs/gas/) betalen op dezelfde manier als u gas moet betalen voor een eenvoudige ETH-overdracht. De gaskosten voor het inzetten van een contract liggen echter veel hoger.

Ethereum heeft ontwikkelaarsvriendelijke talen om smart contracts te schrijven:

- Solidity
- Vyper

[Meer over talen](/developers/docs/smart-contracts/languages/)

Ze moeten echter worden gecompileerd voordat ze kunnen worden ingezet, zodat de virtual machine van Ethereum het contract kan interpreteren en opslaan. [Meer over compilatie](/developers/docs/smart-contracts/compiling/)

## Composbiliteit {#composability}

Slimme contracten zijn openbaar op Ethereum en kunnen worden gezien als open API's. Dit betekent dat u andere smart contracts kunt oproepen in uw eigen smart contract om de mogelijkheden enorm uit te breiden. Contracten kunnen zelfs andere contracten inzetten.

Ontdek meer over [componeerbaarheid van smart contracts](/developers/docs/smart-contracts/composability/).

## Beperkingen {#limitations}

Enkel smart contracts kunnen geen informatie krijgen over gebeurtenissen in de "echte wereld" omdat ze geen gegevens kunnen ophalen uit bronnen buiten de chain. Dit betekent dat ze niet kunnen reageren op gebeurtenissen in de echte wereld. Dit is zo bedoeld. Vertrouwen op externe informatie kan de consensus ondermijnen, wat belangrijk is voor veiligheid en decentralisatie.

Het is echter belangrijk voor blockchain-applicaties om gegevens buiten de chain om te kunnen gebruiken. De oplossing is [oracles](/developers/docs/oracles/), wat tools zijn die buiten de chain om gegevens opnemen en beschikbaar maken voor smart contracts.

Een andere beperking van smart contracts is de maximale contractgrootte. Een smart contract kan maximaal 24 KB groot zijn, anders geraakt het gas op. Dit kan omzeild worden door [het ruitpatroon](https://eips.ethereum.org/EIPS/eip-2535) te gebruiken.

## Multisig-contracten {#multisig}

Multisig (multiple-signature) contracten zijn smart contract-accounts die verschillende geldige handtekeningen vereisen om een transactie uit te voeren. Dit is erg handig om single points of failure te vermijden voor contracten die aanzienlijke hoeveelheden ether of andere tokens bevatten. Multisigs verdelen ook de verantwoordelijkheid voor contractuitvoering en sleutelbeheer tussen verschillende partijen en voorkomen dat het verlies van een enkele persoonlijke sleutel leidt tot onomkeerbaar verlies van middelen. Om deze redenen kunnen multisig-contracten worden gebruikt voor eenvoudig DAO-bestuur. Multisigs vereisen N handtekeningen van de M mogelijke aanvaardbare handtekeningen (waarbij N ≤ M, en M > 1) om uitgevoerd te kunnen worden. `N = 3, M = 5` en `N = 4, M = 7` worden vaak gebruikt. Een 4/7 multisig vereist vier van de zeven mogelijke geldige handtekeningen. Dit betekent dat de middelen nog steeds opvraagbaar zijn, zelfs als er drie handtekeningen verloren gaan. In dit geval betekent het ook dat de meerderheid van de sleutelhouders moet instemmen en ondertekenen om het contract uit te voeren.

## Bronnen smart contract {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Bibliotheek voor veilige ontwikkeling van smart contracts_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [Github](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community-forum](https://forum.openzeppelin.com/c/general/16)

## Verder lezen {#further-reading}

- [Coinbase: wat is een smart contract?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: wat is een smart contract?](https://chain.link/education/smart-contracts)
- [Video: Simply Explained - Smart Contracts](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: leer- en auditplatform voor Web3](https://updraft.cyfrin.io)
