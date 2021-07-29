---
title: Introduction aux contrats intelligents
description: Présentation des contrats intelligents, axée sur leurs caractéristiques uniques et leurs limites
lang: fr
sidebar: true
---

## Qu'est-ce qu'un contrat intelligent ?

Un "contrat intelligent" est simplement un programme exécuté sur la blockchain d'Ethereum. C'est un ensemble de code (ses fonctions) et de données (son état) qui réside à une adresse spécifique sur la blockchain Ethereum.

Le contrat intelligent est un type de [compte Ethereum](/en/developers/docs/accounts/). Cela signifie qu'il dispose d'un solde et peut envoyer des transactions sur le réseau. Cependant, il n'est pas contrôlé par un utilisateur, mais est plutôt déployé et exécuté comme un programme. Les comptes des utilisateurs peuvent ensuite interagir avec un contrat intelligent en soumettant des transactions qui exécutent une fonction définie sur le contrat intelligent. Un contrat intelligent peut définir des règles, comme un contrat normal, et les appliquer automatiquement via le code.

## Prérequis {#prerequisites}

Assurez-vous d'avoir lu les pages [Contrats](/developers/docs/accounts/), [Transactions](/developers/docs/transactions/) et [Machine virtuelle Ethereum](/developers/docs/evm/) avant de vous intéresser aux contrats intelligents.

<!-- TODO simpler example... scheduling payments in Ethereum is actually difficult -->
<!-- TODO show an example smart contract, e.g. an implementation of a vending machine -->

## Distributeur automatique numérique {#a-digital-vending-machine}

La meilleure métaphore pour décrire un contrat intelligent, comme le dit Nick Szabo, est peut être le distributeur automatique. Avec les bonnes entrées, une certaine sortie est garantie.

Pour obtenir une sucrerie d'un distributeur automatique :

```
argent + choix d'une sucrerie = obtention de la sucrerie
```

Cette logique est programmée dans les distributeurs automatiques.

Le contrat intelligent, comme un distributeur automatique, possède une logique programmée. Voici un exemple simple de ce à quoi ressemblerait ce distributeur automatique sous la forme d'un contrat intelligent :

```solidity
pragma solidity 0.6.11;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() public {
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

Tout comme un distributeur automatique peut remplacer un employé dans une boutique, les contrats intelligents peuvent remplacer les intermédiaires dans nombre d'industries.

## Sans autorisation {#permissionless}

N'importe qui peut rédiger un contrat intelligent et le déployer sur le réseau. Il vous suffit d'apprendre à coder dans un [langage de contrat intelligent](/en/developers/docs/smart-contracts/languages/) et de disposer de suffisamment d'ETH pour le déployer. Techniquement, déployer un contrat intelligent constitue une transaction. Vous devez donc payer pour le [carburant](/en/developers/docs/gas/), comme vous le feriez pour un simple transfert d'ETH. Le coût en carburant pour déployer un contrat est cependant beaucoup plus élevé.

Pour la rédaction des contrats intelligents, Ethereum propose aux développeurs des langages conviviaux :

- Solidity
- Vyper

[Plus d'infos sur les langages](/en/developers/docs/smart-contracts/languages/)

Toutefois, pour que la machine virtuelle Ethereum puisse interpréter et stocker un contrat, il doit être compilé avant d'être déployé. [Plus d'infos sur la compilation](/en/developers/docs/smart-contracts/compiling/)

## Composabilité {#composability}

Sur Ethereum, les contrats intelligents sont publics. Ils peuvent être considérés comme des API ouvertes. Cela signifie que vous pouvez appeler d'autres contrats intelligents dans votre propre contrat afin d'étendre considérablement ce qui est possible. Certains d'entre eux peuvent même déployer d'autres contrats.

En savoir plus sur la [composabilité des contrats](/developers/docs/smart-contracts/composability/).

## Limitations {#limitations}

Les contrats intelligents seuls ne peuvent pas obtenir d'informations sur les événements du "monde réel", car ils ne peuvent pas envoyer de demande HTTP. Ceci est intentionnel, car le fait de s'appuyer sur des informations externes pourrait compromettre le consensus, c'est donc important pour la sécurité et la décentralisation.

Il existe des moyens de contourner ce problème en utilisant les [oracles](/en/developers/docs/oracles/).

## Ressources de contrats intelligents {#smart-contract-resources}

**Contrats OpenZeppelin -** **_Bibliothèque la plus populaire pour développer des contrats intelligents de façon sécurisée_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum communautaire](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocs de construction sûrs, simples et flexibles pour les contrats intelligents_**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

## Complément d'information {#further-reading}

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _- Blockgeeks_
- [Best Practices for Smart Contract Development](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _- Yos Riady, 10 novembre 2019_
