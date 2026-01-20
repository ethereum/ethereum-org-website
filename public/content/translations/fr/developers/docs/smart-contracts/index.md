---
title: Introduction aux contrats intelligents
description: Présentation des contrats intelligents, axée sur leurs caractéristiques uniques et leurs limites
lang: fr
---

## Qu'est-ce qu'un contrat intelligent ? Qu'est-ce qu'un contrat intelligent ? {#what-is-a-smart-contract}

Un "contrat intelligent" est simplement un programme exécuté sur la blockchain d'Ethereum. C'est un ensemble de code (ses fonctions) et de données (son état) qui réside à une adresse spécifique sur la blockchain Ethereum.

Les contrats intelligents sont un type de [compte Ethereum](/developers/docs/accounts/). Ceci veut dire qu'ils ont un solde et peuvent être la cible de transactions. Cependant, il n'est pas contrôlé par un utilisateur, mais est plutôt déployé et exécuté comme un programme. Les comptes des utilisateurs peuvent ensuite interagir avec un contrat intelligent en soumettant des transactions qui exécutent une fonction définie sur le contrat intelligent. Un contrat intelligent peut définir des règles, comme un contrat normal, et les appliquer automatiquement via le code. Les contrats intelligents ne peuvent pas être supprimés par défaut et les interactions avec eux sont irréversibles.

## Prérequis {#prerequisites}

Si vous venez tout juste de débuter ou si vous cherchez une introduction moins technique, nous vous recommandons notre [introduction aux contrats intelligents](/smart-contracts/).

Assurez-vous d'avoir lu les articles sur les [comptes](/developers/docs/accounts/), les [transactions](/developers/docs/transactions/) et la [machine virtuelle Ethereum](/developers/docs/evm/) avant de vous lancer dans le monde des contrats intelligents.

## Un distributeur automatique numérique {#a-digital-vending-machine}

La meilleure métaphore pour un contrat intelligent est peut-être celle d'un distributeur automatique, comme le décrit [Nick Szabo](https://unenumerated.blogspot.com/). Avec les bonnes entrées, une certaine sortie est garantie.

Pour obtenir une sucrerie d'un distributeur automatique :

```
money + snack selection = snack dispensed
```

Cette logique est programmée dans les distributeurs automatiques.

Le contrat intelligent, comme un distributeur automatique, possède une logique programmée. Voici un exemple simple de ce à quoi ce distributeur automatique pourrait ressembler s'il était un contrat intelligent rédigé avec Solidity :

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Déclarer les variables d'état du contrat
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Lorsque le contrat 'VendingMachine' est déployé :
    // 1. définir l'adresse de déploiement comme propriétaire du contrat
    // 2. définir le solde de cupcakes du contrat intelligent déployé à 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permettre au propriétaire d'augmenter le solde de cupcakes du contrat intelligent
    function refill(uint amount) public {
        require(msg.sender == owner, "Seul le propriétaire peut réapprovisionner.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permettre à n'importe qui d'acheter des cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Vous devez payer au moins 1 ETH par cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Pas assez de cupcakes en stock pour finaliser cet achat");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Tout comme un distributeur automatique peut remplacer un employé dans une boutique, les contrats intelligents peuvent remplacer les intermédiaires dans bon nombre d'industries.

## Sans permission {#permissionless}

N'importe qui peut rédiger un contrat intelligent et le déployer sur le réseau. Il vous suffit d'apprendre à coder dans un [langage de contrat intelligent](/developers/docs/smart-contracts/languages/), et de disposer de suffisamment d'ETH pour déployer votre contrat. Techniquement, le déploiement d'un contrat intelligent est une transaction, vous devez donc payer du [gaz](/developers/docs/gas/) de la même manière que pour un simple transfert d'ETH. Toutefois, les frais de gaz pour le déploiement d'un contrat sont beaucoup plus élevés.

Pour la rédaction des contrats intelligents, Ethereum propose aux développeurs des langages conviviaux :

- solidity
- Vyper

[En savoir plus sur les langages](/developers/docs/smart-contracts/languages/)

Toutefois, pour que la machine virtuelle Ethereum puisse interpréter et stocker un contrat, il doit être compilé avant d'être déployé. [En savoir plus sur la compilation](/developers/docs/smart-contracts/compiling/)

## Composabilité {#composability}

Sur Ethereum, les contrats intelligents sont publics. Ils peuvent être considérés comme des API ouvertes. Cela signifie que vous pouvez appeler d'autres contrats intelligents dans votre propre contrat afin d'en étendre considérablement les fonctionnalités. Certains d'entre eux peuvent même déployer d'autres contrats.

En savoir plus sur la [composabilité des contrats intelligents](/developers/docs/smart-contracts/composability/).

## Limitations {#limitations}

Les contrats intelligents seuls ne peuvent pas obtenir d'informations sur les événements du "monde réel", dans la mesure où ils ne peuvent pas récupérer de données depuis des sources hors chaîne. Cela signifie qu'ils ne peuvent pas réagir aux événements du monde réel. C'est un choix délibéré. Le fait de s'appuyer sur des informations externes pourrait compromettre le consensus, qui est essentiel en matière de sécurité et de décentralisation.

Il est toutefois important que les applications de la blockchain puissent utiliser des données hors chaîne. La solution réside dans les [oracles](/developers/docs/oracles/), des outils qui ingèrent des données hors chaîne et les mettent à la disposition des contrats intelligents.

Une autre limitation des contrats intelligents est la taille maximale des contrats. Un contrat intelligent ne peut pas dépasser 24 Ko, sans quoi il sera à court de gaz. Il est possible de contourner ce problème en utilisant [le Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Contrats Multisig {#multisig}

Les contrats multisig (signature multiple) sont des comptes de contrats intelligents nécessitant plusieurs signatures valides pour exécuter une transaction. C'est très utile afin d'éviter les points de défaillance unique pour les contrats contenant des montants conséquents d'ether ou autres tokens. Les signatures multiples partagent la responsabilité d'exécution du contact ainsi que la gestion des clés entre plusieurs parties et évite la perte d'une unique clé privée amenant à la perte irréversible des fonds. Pour ces raisons, les contrats multisig peuvent être utilisés pour la simple gouvernance d'une DAO. Les contrats multisig requièrent N signatures parmi M signatures possibles et acceptables (où N ≤ M et M > 1) pour s'exécuter. `N = 3, M = 5` et `N = 4, M = 7` sont couramment utilisés. Une multi-signature 4/7 requiert quatre signatures valides sur les sept possibles. Cela signifie que les fonds restent récupérables même si trois signatures sont perdues. Dans ce cas, cela signifie également que la majorité des détenteurs de clés doivent accepter et signer pour que le contrat puisse être exécuté.

## Ressources sur les contrats intelligents {#smart-contract-resources}

**Contrats OpenZeppelin -** **_Bibliothèque pour le développement sécurisé de contrats intelligents._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum de la communauté](https://forum.openzeppelin.com/c/general/16)

## En savoir plus {#further-reading}

- [Coinbase : Qu'est-ce qu'un contrat intelligent ?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink : Qu'est-ce qu'un contrat intelligent ?](https://chain.link/education/smart-contracts)
- [Vidéo : Simply Explained - Smart Contracts](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft : Plateforme d'apprentissage et d'audit Web3](https://updraft.cyfrin.io)
