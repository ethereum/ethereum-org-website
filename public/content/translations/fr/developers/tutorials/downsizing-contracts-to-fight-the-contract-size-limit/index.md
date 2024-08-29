---
title: "Réduire la taille des contrats pour ne pas dépasser la limite"
description: Que pouvez-vous faire pour éviter que vos contrats intelligents ne deviennent trop volumineux ?
author: Markus Waas
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "stockage"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Pourquoi existe-t-il une limite ? {#why-is-there-a-limit}

Le [22 novembre 2016,](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) la fourche Spurious Dragon a introduit [EIP-170](https://eips.ethereum.org/EIPS/eip-170), qui a ajouté une limite de taille des contrats intelligents de 24,576 kb. Pour vous, en tant que développeur Solidity, cela signifie que lorsque vous ajoutez de plus en plus de fonctionnalités à votre contrat, à un moment donné, vous atteindrez la limite et, lors du déploiement, vous rencontrerez cette erreur :

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Cette limite a été apportée pour empêcher les attaques par déni de service (DOS). Tout appel vers un contrat est relativement peu coûteux en gaz. Cependant, l'impact d'un appel de contrat sur les nœuds Ethereum augmente de manière exponentielle en fonction de la taille du code du contrat appelé (lecture du code sur le disque, pré-traitement du code et ajout des données à la preuve de Merkle). Dans une situation où l'attaquant n'a besoin que de peu de ressources pour donner beaucoup de travail aux autres nœuds, il y a un risque d'attaques DOS.

À l'origine, le problème était moins préoccupant, car la limite naturelle de la taille des contrats était la limite de gaz par bloc. Bien entendu, un contrat doit être déployé dans une transaction qui contient tout le bytecode du contrat. Si vous n'incluez ensuite que cette seule transaction dans un bloc, vous pourrez utiliser tout le gaz, mais il ne sera pas illimité. Depuis la [mise à niveau de Londres](/history/#london), la limite de gaz de bloc a pu varier entre 15M et 30M unités selon la demande du réseau.

Dans les prochaines lignes, nous examinerons certaines méthodes classées en fonction de leur impact potentiel. Considérez ça comme perdre du poids. La meilleure stratégie pour atteindre son poids cible (dans notre cas, 24 kb) est de se concentrer en premier lieu sur les méthodes à fort impact. Dans la plupart des cas, il suffit de revoir son régime alimentaire pour y parvenir, mais il faut parfois aller un peu plus loin. Ensuite, vous pouvez ajouter à cela un peu d'exercice (impact modéré) ou même des suppléments (impact faible).

## Impact important {#big-impact}

### Séparez vos contrats {#separate-your-contracts}

Cela devrait toujours être votre première approche. Comment peut-on séparer le contrat en plusieurs petits contrats ? Cela vous oblige généralement à mettre en place une bonne architecture pour vos contrats. Des contrats plus petits sont toujours à préférer du point de vue de la lisibilité du code. Pour fractionner vos contrats, demandez-vous :

- Quelles sont les fonctions qui vont ensemble ? Chaque ensemble de fonctions peut faire l'objet d'un contrat distinct.
- Quelles sont les fonctions qui ne requièrent pas de lire l'état du contrat ou seulement une partie spécifique de son état ?
- Pouvez-vous séparer le stockage et les fonctionnalités ?

### Bibliothèques {#libraries}

Une façon simple de séparer le code fonctionnel du stockage est d'utiliser une [bibliothèque](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Ne déclarez pas les fonctions de la bibliothèque comme internes, sinon elles seront [ajoutées au contrat](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) directement, lors de la compilation. Mais si vous utilisez des fonctions publiques, celles-ci seront en fait dans un contrat de bibliothèque séparé. Pensez à utiliser « [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) » pour rendre l'utilisation des bibliothèques plus pratique.

### Proxies {#proxies}

Une méthode plus avancée consiste à utiliser le système de proxy. Les bibliothèques utilisent `DELEGATECALL` en coulisse, qui exécute simplement la fonction d'un autre contrat avec l'état du contrat appelant. Consultez cette [publication de blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) pour en savoir plus sur les systèmes de proxy. Cela vous offrira plus de fonctionnalités, comme permettre les mise à niveau, par exemple, mais ils ajoutent aussi beaucoup de complexité. Je ne les ajouterais pas uniquement pour réduire la taille des contrats, à moins que ce ne soit votre seule option pour une raison quelconque.

## Impact modéré {#medium-impact}

### Supprimez des fonctions {#remove-functions}

Cela devrait être évident. Les fonctions augmentent considérablement la taille d'un contrat.

- **Externe** : Souvent, nous ajoutons beaucoup de fonctions « view », pour des raisons de commodité. Ce n'est pas vraiment un problème, jusqu'à ce que vous atteigniez la taille limite. Quand cela arrive, vous devriez vraiment penser à supprimer tous les éléments qui ne sont absolument pas essentiels.
- **Interne** : Vous pouvez également supprimer les fonctions internes/privées et mettre le code dans la ligne, à condition qu'elles ne soient appelées qu'une fois.

### Évitez les variables inutiles {#avoid-additional-variables}

Un simple changement comme celui-ci :

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

représente une différence de **0,28 kb**. Il y a de fortes chances que vous puissiez trouver de nombreuses situations similaires dans vos contrats, et elles peuvent engendrer une augmentation significative du poids total.

### Abrégez les messages d'erreur {#shorten-error-message}

Les longs messages d'annulation et, en particulier, les nombreux messages différents d'annulation peuvent alourdir le contrat. Utilisez plutôt des codes d'erreur courts et décodez-les dans votre contrat. Un long message peut ainsi devenir beaucoup plus court :

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### Utiliser des erreurs personnalisées au lieu de messages d'erreur

Des erreurs personnalisées ont été introduites dans [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Ils sont un excellent moyen de réduire la taille de vos contrats, car ils sont encodés ABI en tant que sélecteurs (comme les fonctions).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Envisagez une valeur d'exécution faible dans l'optimiseur {#consider-a-low-run-value-in-the-optimizer}

Vous pouvez également modifier les paramètres de l'optimiseur. La valeur par défaut à 200 signifie qu'il va essayer d'optimiser le bytecode comme si une fonction était appelée 200 fois. Si vous la définissez à 1, vous demandez simplement à l'optimiseur d'optimiser dans le cas où chaque fonction n'est exécutée qu'une seule fois. Une fonction optimisée pour une seule exécution signifie qu'elle est optimisée pour le déploiement lui-même. Sachez que **cela augmente les [coûts en gaz](/developers/docs/gas/) pour l'exécution des fonctions**, donc vous ne voudrez peut-être pas le faire.

## Impact faible {#small-impact}

### Évitez de passer des structures aux fonctions {#avoid-passing-structs-to-functions}

Si vous utilisez [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), il peut être utile de ne pas passer de structures à une fonction. Au lieu de passer le paramètre comme structure...

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

... passez les paramètres requis directement. Dans l'exemple ci-dessus, nous avons économisé **0,1 kb** de plus.

### Spécifiez des visibilités appropriées pour vos fonctions et variables {#declare-correct-visibility-for-functions-and-variables}

- Des fonctions ou des variables uniquement appelées de l'extérieur ? Déclarez-les `external` au lieu de `public`.
- Des fonctions ou des variables uniquement appelées au sein du contrat ? Déclarez-les `private` ou `internal` au lieu de `public`.

### Retirez les modificateurs {#remove-modifiers}

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
