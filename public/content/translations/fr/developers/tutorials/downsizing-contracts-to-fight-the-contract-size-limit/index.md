---
title: "Réduire la taille des contrats pour ne pas dépasser la limite"
description: Que pouvez-vous faire pour éviter que vos contrats intelligents ne deviennent trop volumineux ?
author: Markus Waas
lang: fr
tags: [ "solidité", "contrats intelligents", "stockage" ]
skill: intermediate
published: 26/06/2020
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Pourquoi existe-t-il une limite ? {#why-is-there-a-limit}

Le 22 novembre 2016, le [hard fork Spurious Dragon](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) a introduit l'[EIP-170](https://eips.ethereum.org/EIPS/eip-170), qui a ajouté une limite de taille de contrat intelligent de 24,576 ko. Pour vous, en tant que développeur Solidity, cela signifie que lorsque vous ajoutez de plus en plus de fonctionnalités à votre contrat, à un moment donné, vous atteindrez la limite et, lors du déploiement, vous rencontrerez cette erreur :

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). Ce contrat pourrait ne pas être déployable sur le Réseau principal. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Cette limite a été apportée pour empêcher les attaques par déni de service (DOS). Tout appel vers un contrat est relativement peu coûteux en gaz. Cependant, l'impact d'un appel de contrat sur les nœuds Ethereum augmente de manière disproportionnée en fonction de la taille du code du contrat appelé (lecture du code sur le disque, pré-traitement du code et ajout des données à la preuve de Merkle). Dans une situation où l'attaquant n'a besoin que de peu de ressources pour donner beaucoup de travail aux autres nœuds, il y a un risque d'attaques DOS.

À l'origine, le problème était moins préoccupant, car la limite naturelle de la taille des contrats était la limite de gaz par bloc. Bien entendu, un contrat doit être déployé dans une transaction qui contient tout le bytecode du contrat. Si vous n'incluez ensuite que cette seule transaction dans un bloc, vous pourrez utiliser tout le gaz, mais il ne sera pas illimité. Depuis la [mise à niveau London](/ethereum-forks/#london), la limite de gaz par bloc a pu varier entre 15M et 30M d'unités en fonction de la demande du réseau.

Dans les prochaines lignes, nous examinerons certaines méthodes classées en fonction de leur impact potentiel. Considérez cela comme une perte de poids. La meilleure stratégie pour atteindre son poids cible (dans notre cas, 24 ko) est de se concentrer en premier lieu sur les méthodes à fort impact. Dans la plupart des cas, il suffit de revoir son régime alimentaire pour y parvenir, mais il faut parfois aller un peu plus loin. Ensuite, vous pouvez ajouter à cela un peu d'exercice (impact modéré) ou même des suppléments (impact faible).

## Grand impact {#big-impact}

### Séparez vos contrats {#separate-your-contracts}

Cela devrait toujours être votre première approche. Comment peut-on séparer le contrat en plusieurs petits contrats ? Cela vous oblige généralement à mettre en place une bonne architecture pour vos contrats. Des contrats plus petits sont toujours à préférer du point de vue de la lisibilité du code. Pour fractionner vos contrats, demandez-vous :

- Quelles sont les fonctions qui vont ensemble ? Chaque ensemble de fonctions peut faire l'objet d'un contrat distinct.
- Quelles sont les fonctions qui ne requièrent pas de lire l'état du contrat ou seulement une partie spécifique de son état ?
- Pouvez-vous séparer le stockage et les fonctionnalités ?

### Bibliothèques {#libraries}

Une façon simple de séparer le code des fonctionnalités du stockage est d'utiliser une [bibliothèque](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Ne déclarez pas les fonctions de la bibliothèque comme étant `internal`, car celles-ci seront directement [ajoutées au contrat](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) lors de la compilation. Mais si vous utilisez des fonctions `public`, celles-ci se trouveront en fait dans un contrat de bibliothèque distinct. Pensez à [utiliser `using for`](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) pour rendre l'utilisation des bibliothèques plus pratique.

### Proxys {#proxies}

Une méthode plus avancée consiste à utiliser le système de proxy. Les bibliothèques utilisent `DELEGATECALL` en coulisse, qui exécute simplement la fonction d'un autre contrat avec l'état du contrat appelant. Consultez [cet article de blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) pour en savoir plus sur les systèmes de proxy. Ils offrent plus de fonctionnalités, par exemple, ils permettent les mises à niveau, mais ils ajoutent aussi beaucoup de complexité. Je ne les ajouterais pas uniquement pour réduire la taille des contrats, à moins que ce ne soit votre seule option pour une raison quelconque.

## Impact moyen {#medium-impact}

### Supprimer des fonctions {#remove-functions}

Cela devrait être évident. Les fonctions augmentent considérablement la taille d'un contrat.

- **Externe** : Souvent, nous ajoutons de nombreuses fonctions `view` pour des raisons de commodité. Ce n'est pas vraiment un problème, jusqu'à ce que vous atteigniez la taille limite. Quand cela arrive, vous devriez vraiment penser à supprimer tous les éléments qui ne sont absolument pas essentiels.
- **Interne** : Vous pouvez également supprimer les fonctions `internal`/`private` et simplement inliner le code tant que la fonction n'est appelée qu'une seule fois.

### Évitez les variables supplémentaires {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Un simple changement comme celui-ci fait une différence de **0,28 ko**. Il y a de fortes chances que vous puissiez trouver de nombreuses situations similaires dans vos contrats, et elles peuvent engendrer une augmentation significative du poids total.

### Raccourcir les messages d'erreur {#shorten-error-message}

De longs messages `revert` et en particulier de nombreux messages `revert` différents peuvent alourdir le contrat. Utilisez plutôt des codes d'erreur courts et décodez-les dans votre contrat. Un long message peut ainsi devenir beaucoup plus court :

```solidity
require(msg.sender == owner, "Seul le propriétaire de ce contrat peut appeler cette fonction");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Utiliser des erreurs personnalisées au lieu de messages d'erreur

Les erreurs personnalisées ont été introduites dans [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). C'est un excellent moyen de réduire la taille de vos contrats, car ils sont encodés en ABI en tant que sélecteurs (tout comme le sont les fonctions).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Envisager une faible valeur de `runs` dans l'optimiseur {#consider-a-low-run-value-in-the-optimizer}

Vous pouvez également modifier les paramètres de l'optimiseur. La valeur par défaut de 200 signifie qu'il essaie d'optimiser le bytecode comme si une fonction était appelée 200 fois. Si vous la changez pour 1, vous indiquez simplement à l'optimiseur d'optimiser pour le cas où chaque fonction n'est exécutée qu'une seule fois. Une fonction optimisée pour une seule exécution signifie qu'elle est optimisée pour le déploiement lui-même. Sachez que **cela augmente les [coûts en gaz](/developers/docs/gas/) pour l'exécution des fonctions**, donc vous ne voudrez peut-être pas le faire.

## Faible impact {#small-impact}

### Évitez de passer des `structs` aux fonctions {#avoid-passing-structs-to-functions}

Si vous utilisez l'[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), il peut être utile de ne pas passer de `structs` à une fonction. Au lieu de passer le paramètre en tant que `struct`, passez les paramètres requis directement. Dans cet exemple, nous avons économisé **0,1 ko** de plus.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Déclarer la bonne visibilité pour les fonctions et les variables {#declare-correct-visibility-for-functions-and-variables}

- Des fonctions ou des variables uniquement appelées de l'extérieur ? Déclarez-les comme `external` au lieu de `public`.
- Des fonctions ou des variables uniquement appelées au sein du contrat ? Déclarez-les comme `private` ou `internal` au lieu de `public`.

### Supprimer les modificateurs {#remove-modifiers}

Les modificateurs, surtout lorsqu'ils sont utilisés de manière intensive, peuvent avoir un impact significatif sur la taille du contrat. Envisagez de les supprimer et d'utiliser plutôt des fonctions.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Ces conseils devraient vous aider à réduire considérablement la taille du contrat. Encore une fois, je ne saurais trop insister sur le fait qu'il faut toujours privilégier le fractionnement des contrats, si possible, afin d'obtenir un impact maximal.
