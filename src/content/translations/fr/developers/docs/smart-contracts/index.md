---
title: Introduction aux contrats intelligents
description: Présentation des contrats intelligents, axée sur leurs caractéristiques uniques et leurs limites
lang: fr
---

## Qu'est-ce qu'un contrat intelligent ? {#what-is-a-smart-contract}

Un "contrat intelligent" est simplement un programme exécuté sur la blockchain d'Ethereum. C'est un ensemble de code (ses fonctions) et de données (son état) qui réside à une adresse spécifique sur la blockchain Ethereum.

Le contrat intelligent est un type de [compte Ethereum](/developers/docs/accounts/). Cela signifie qu'il dispose d'un solde et peut envoyer des transactions sur le réseau. Cependant, il n'est pas contrôlé par un utilisateur, mais est plutôt déployé et exécuté comme un programme. Les comptes des utilisateurs peuvent ensuite interagir avec un contrat intelligent en soumettant des transactions qui exécutent une fonction définie sur le contrat intelligent. Un contrat intelligent peut définir des règles, comme un contrat normal, et les appliquer automatiquement via le code. Les contrats intelligents ne peuvent pas être supprimés par défaut et les interactions avec eux sont irréversibles.

## Pré-requis {#prerequisites}

Si vous venez tout juste de débuter ou si vous cherchez une introduction moins technique, nous vous recommandons notre [introduction aux contrats intelligents](/smart-contracts/).

Assurez-vous d'avoir lu les pages [Contrats](/developers/docs/accounts/), [Transactions](/developers/docs/transactions/) et [Machine virtuelle Ethereum](/developers/docs/evm/) avant de vous lancer dans le monde des contrats intelligents.

## Distributeur automatique numérique {#a-digital-vending-machine}

La meilleure métaphore pour décrire un contrat intelligent est peut-être celle d'un distributeur automatique, tel que décrit par [Nick Szabo](https://unenumerated.blogspot.com/). Avec les bonnes entrées, une certaine sortie est garantie.

Pour obtenir une sucrerie d'un distributeur automatique :

```
money + snack selection = snack dispensed
```

Cette logique est programmée dans les distributeurs automatiques.

Le contrat intelligent, comme un distributeur automatique, possède une logique programmée. Voici un exemple simple de la façon dont ce distributeur automatique pourrait ressembler à un contrat intelligent :

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

Tout comme un distributeur automatique peut remplacer un employé dans une boutique, les contrats intelligents peuvent remplacer les intermédiaires dans bon nombre d'industries.

## Sans autorisation {#permissionless}

N'importe qui peut rédiger un contrat intelligent et le déployer sur le réseau. Il vous suffit d'apprendre à coder dans un [langage de contrat intelligent](/developers/docs/smart-contracts/languages/) et de disposer de suffisamment d'ETH pour déployer votre contrat. Techniquement, le fait de déployer un contrat intelligent constitue une transaction. Vous devez donc payer pour le [carburant](/developers/docs/gas/), comme vous le feriez pour un simple transfert d'ETH. Les coûts en gaz requis pour déployer un contrat sont cependant beaucoup plus élevés.

Pour la rédaction des contrats intelligents, Ethereum propose aux développeurs des langages conviviaux :

- Solidity
- Vyper

[Plus d'infos sur les langages](/developers/docs/smart-contracts/languages/)

Toutefois, pour que la machine virtuelle Ethereum puisse interpréter et stocker un contrat, il doit être compilé avant d'être déployé. [Plus d'infos sur la compilation](/developers/docs/smart-contracts/compiling/)

## Composabilité {#composability}

Sur Ethereum, les contrats intelligents sont publics. Ils peuvent être considérés comme des API ouvertes. Cela signifie que vous pouvez appeler d'autres contrats intelligents dans votre propre contrat afin d'étendre considérablement les possibilités. Certains d'entre eux peuvent même déployer d'autres contrats.

En savoir plus sur la [composabilité des contrats intelligents](/developers/docs/smart-contracts/composability/).

## Limitations {#limitations}

Les contrats intelligents seuls ne peuvent pas obtenir d'informations sur les événements du "monde réel", dans la mesure où ils ne peuvent pas envoyer de requêtes HTTP. C'est un choix délibéré. Le fait de s'appuyer sur des informations externes pourrait compromettre le consensus, qui est essentiel en matière de sécurité et de décentralisation.

Il existe des moyens de contourner le problème en utilisant [oracles](/developers/docs/oracles/).

Une autre limitation des contrats intelligents est la taille maximale des contrats. Un contrat intelligent ne peut pas dépasser 24 Ko, sans quoi il sera à court de gaz. Ceci peut être contourné en utilisant [Le modèle du diamant](https://eips.ethereum.org/EIPS/eip-2535).

## Ressources de contrats intelligents {#smart-contract-resources}

**Contrats OpenZeppelin -** **_Bibliothèque la plus populaire pour développer des contrats intelligents de façon sécurisée_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum communautaire](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocs de construction sûrs, simples et flexibles pour les contrats intelligents_**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Complément d'information {#further-reading}

- [Les Contrats intelligents : La technologie Blockchain qui va remplacer les juristes](https://blockgeeks.com/guides/smart-contracts/) _- Blockgeeks_
- [Meilleures pratiques pour le développement de contrats intelligents](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _- Yos Riady, 10 novembre 2019_
- [Contrats propres - un guide sur les modèles et bonnes pratiques pour les contrats intelligents](https://www.wslyvh.com/clean-contracts/) _– 30 juillet 2020 - wslyvh_
