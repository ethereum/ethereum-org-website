---
title: Introduction aux contrats intelligents
description: "Un aperçu des contrats intelligents, en se concentrant sur leurs caractéristiques uniques et leurs limites."
lang: fr
---

## Qu'est-ce qu'un contrat intelligent ? {#what-is-a-smart-contract}

Un « contrat intelligent » est simplement un programme qui s'exécute sur la chaîne de blocs [Ethereum](/). C'est un ensemble de code (ses fonctions) et de données (son état) qui réside à une adresse spécifique sur la chaîne de blocs Ethereum.

Les contrats intelligents sont un type de [compte Ethereum](/developers/docs/accounts/). Cela signifie qu'ils ont un solde et peuvent être la cible de transactions. Cependant, ils ne sont pas contrôlés par un utilisateur, ils sont plutôt déployés sur le réseau et s'exécutent tels qu'ils ont été programmés. Les comptes d'utilisateurs peuvent ensuite interagir avec un contrat intelligent en soumettant des transactions qui exécutent une fonction définie sur le contrat intelligent. Les contrats intelligents peuvent définir des règles, comme un contrat classique, et les appliquer automatiquement via le code. Les contrats intelligents ne peuvent pas être supprimés par défaut, et les interactions avec eux sont irréversibles.

## Prérequis {#prerequisites}

Si vous débutez ou si vous recherchez une introduction moins technique, nous vous recommandons notre [introduction aux contrats intelligents](/smart-contracts/).

Assurez-vous d'avoir lu les informations sur les [comptes](/developers/docs/accounts/), les [transactions](/developers/docs/transactions/) et la [machine virtuelle Ethereum](/developers/docs/evm/) avant de vous plonger dans le monde des contrats intelligents.

## Un distributeur automatique numérique {#a-digital-vending-machine}

La meilleure métaphore pour un contrat intelligent est peut-être celle d'un distributeur automatique, telle que décrite par [Nick Szabo](https://unenumerated.blogspot.com/). Avec les bonnes entrées, une certaine sortie est garantie.

Pour obtenir une collation d'un distributeur automatique :

```
argent + sélection de la collation = collation distribuée
```

Cette logique est programmée dans le distributeur automatique.

Un contrat intelligent, tout comme un distributeur automatique, intègre une logique programmée. Voici un exemple simple de ce à quoi ressemblerait ce distributeur automatique s'il s'agissait d'un contrat intelligent écrit en Solidity :

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Déclarer les variables d'état du contrat
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Lorsque le contrat 'VendingMachine' est déployé :
    // 1. définir l'adresse de déploiement comme propriétaire du contrat
    // 2. définir le solde de cupcakes du contrat intelligent déployé à 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permettre au propriétaire d'augmenter le solde de cupcakes du contrat intelligent
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permettre à quiconque d'acheter des cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Tout comme un distributeur automatique élimine le besoin d'un employé de vente, les contrats intelligents peuvent remplacer les intermédiaires dans de nombreux secteurs.

## Sans permission {#permissionless}

N'importe qui peut écrire un contrat intelligent et le déployer sur le réseau. Il vous suffit d'apprendre à coder dans un [langage de contrat intelligent](/developers/docs/smart-contracts/languages/) et d'avoir suffisamment d'ETH pour déployer votre contrat. Le déploiement d'un contrat intelligent est techniquement une transaction, vous devez donc payer du [gaz](/developers/docs/gas/) de la même manière que vous devez payer du gaz pour un simple transfert d'ETH. Cependant, les coûts en gaz pour le déploiement d'un contrat sont beaucoup plus élevés.

Ethereum dispose de langages adaptés aux développeurs pour écrire des contrats intelligents :

- Solidity
- Vyper

[En savoir plus sur les langages](/developers/docs/smart-contracts/languages/)

Cependant, ils doivent être compilés avant de pouvoir être déployés afin que la machine virtuelle d'Ethereum puisse interpréter et stocker le contrat. [En savoir plus sur la compilation](/developers/docs/smart-contracts/compiling/)

## Composabilité {#composability}

Les contrats intelligents sont publics sur Ethereum et peuvent être considérés comme des API ouvertes. Cela signifie que vous pouvez appeler d'autres contrats intelligents dans votre propre contrat intelligent pour étendre considérablement ce qui est possible. Les contrats peuvent même déployer d'autres contrats.

En savoir plus sur la [composabilité des contrats intelligents](/developers/docs/smart-contracts/composability/).

## Limites {#limitations}

Les contrats intelligents seuls ne peuvent pas obtenir d'informations sur les événements du « monde réel » car ils ne peuvent pas récupérer de données provenant de sources hors chaîne. Cela signifie qu'ils ne peuvent pas réagir aux événements du monde réel. C'est intentionnel. S'appuyer sur des informations externes pourrait compromettre le consensus, ce qui est important pour la sécurité et la décentralisation.

Cependant, il est important pour les applications de la chaîne de blocs de pouvoir utiliser des données hors chaîne. La solution réside dans les [oracles](/developers/docs/oracles/), qui sont des outils qui ingèrent des données hors chaîne et les rendent disponibles pour les contrats intelligents.

Une autre limite des contrats intelligents est la taille maximale du contrat. Un contrat intelligent peut faire au maximum 24 Ko, sinon il manquera de gaz. Cela peut être contourné en utilisant [le modèle Diamant (Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535).

## Contrats multisig {#multisig}

Les contrats multisig (à signatures multiples) sont des comptes de contrats intelligents qui nécessitent plusieurs signatures valides pour exécuter une transaction. C'est très utile pour éviter les points de défaillance uniques pour les contrats détenant des quantités substantielles d'ether ou d'autres jetons. Les multisigs divisent également la responsabilité de l'exécution du contrat et de la gestion des clés entre plusieurs parties et empêchent la perte d'une seule clé privée d'entraîner une perte irréversible de fonds. Pour ces raisons, les contrats multisig peuvent être utilisés pour la gouvernance simple d'une DAO. Les multisigs nécessitent N signatures sur M signatures acceptables possibles (où N ≤ M, et M > 1) pour s'exécuter. `N = 3, M = 5` et `N = 4, M = 7` sont couramment utilisés. Un multisig 4/7 nécessite quatre signatures valides sur sept possibles. Cela signifie que les fonds sont toujours récupérables même si trois signatures sont perdues. Dans ce cas, cela signifie également que la majorité des détenteurs de clés doivent être d'accord et signer pour que le contrat s'exécute.

## Ressources sur les contrats intelligents {#smart-contract-resources}

**Contrats OpenZeppelin -** **_Bibliothèque pour le développement sécurisé de contrats intelligents._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum communautaire](https://forum.openzeppelin.com/c/general/16)

## Lectures complémentaires {#further-reading}

- [Coinbase : Qu'est-ce qu'un contrat intelligent ?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink : Qu'est-ce qu'un contrat intelligent ?](https://chain.link/education/smart-contracts)
- [Vidéo : Simplement expliqué - Les contrats intelligents](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft : Plateforme d'apprentissage et d'audit Web3](https://updraft.cyfrin.io)

## Tutoriels : Signatures de contrats intelligents (EIP-1271) sur Ethereum {#tutorials}

- [EIP-1271 : Signature et vérification des signatures de contrats intelligents](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Comment l'EIP-1271 permet aux contrats intelligents de vérifier les signatures, avec une présentation de l'implémentation Safe._