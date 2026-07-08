---
title: "Réduire la taille des contrats pour lutter contre la limite de taille des contrats"
description: "Que pouvez-vous faire pour éviter que vos contrats intelligents ne deviennent trop volumineux ?"
author: Markus Waas
lang: fr
tags: ["Solidity", "contrats intelligents", "stockage"]
skill: intermediate
breadcrumb: "Réduire la taille des contrats"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Pourquoi y a-t-il une limite ? {#why-is-there-a-limit}

Le [22 novembre 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon), le hard fork Spurious Dragon a introduit l'[EIP-170](https://eips.ethereum.org/EIPS/eip-170) qui a ajouté une limite de taille de contrat intelligent de 24,576 ko. Pour vous, en tant que développeur Solidity, cela signifie que lorsque vous ajoutez de plus en plus de fonctionnalités à votre contrat, vous atteindrez à un moment donné la limite et, lors du déploiement, vous verrez l'erreur :

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Cette limite a été introduite pour prévenir les attaques par déni de service (DOS). Tout appel à un contrat est relativement peu coûteux en termes de gaz. Cependant, l'impact d'un appel de contrat pour les nœuds Ethereum augmente de manière disproportionnée en fonction de la taille du code du contrat appelé (lecture du code depuis le disque, prétraitement du code, ajout de données à la preuve de Merkle). Chaque fois que vous vous trouvez dans une situation où l'attaquant a besoin de peu de ressources pour causer beaucoup de travail aux autres, vous avez un potentiel d'attaques DOS.

À l'origine, c'était moins un problème car une limite naturelle de taille de contrat est la limite de gaz du bloc. Évidemment, un contrat doit être déployé au sein d'une transaction qui contient tout le bytecode du contrat. Si vous n'incluez que cette seule transaction dans un bloc, vous pouvez utiliser tout ce gaz, mais il n'est pas infini. Depuis la [mise à niveau London](/ethereum-forks/#london), la limite de gaz du bloc a pu varier entre 15M et 30M d'unités en fonction de la demande du réseau.

Dans ce qui suit, nous examinerons quelques méthodes classées selon leur impact potentiel. Pensez-y en termes de perte de poids. La meilleure stratégie pour que quelqu'un atteigne son poids cible (dans notre cas 24 ko) est de se concentrer d'abord sur les méthodes à fort impact. Dans la plupart des cas, il suffit de corriger son alimentation pour y parvenir, mais parfois il en faut un peu plus. Ensuite, vous pourriez ajouter un peu d'exercice (impact moyen) ou même des suppléments (faible impact).

## Fort impact {#big-impact}

### Séparer vos contrats {#separate-your-contracts}

Cela devrait toujours être votre première approche. Comment pouvez-vous séparer le contrat en plusieurs contrats plus petits ? Cela vous oblige généralement à concevoir une bonne architecture pour vos contrats. Les contrats plus petits sont toujours préférés du point de vue de la lisibilité du code. Pour diviser les contrats, posez-vous les questions suivantes :

- Quelles fonctions vont ensemble ? Chaque ensemble de fonctions pourrait être mieux dans son propre contrat.
- Quelles fonctions ne nécessitent pas de lire l'état du contrat ou seulement un sous-ensemble spécifique de l'état ?
- Pouvez-vous séparer le stockage et les fonctionnalités ?

### Bibliothèques {#libraries}

Une façon simple d'éloigner le code des fonctionnalités du stockage est d'utiliser une [bibliothèque](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Ne déclarez pas les fonctions de la bibliothèque comme internes car elles seront [ajoutées au contrat](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) directement lors de la compilation. Mais si vous utilisez des fonctions publiques, alors celles-ci seront en fait dans un contrat de bibliothèque séparé. Envisagez d'utiliser [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) pour rendre l'utilisation des bibliothèques plus pratique.

### Proxys {#proxies}

Une stratégie plus avancée serait un système de proxy. Les bibliothèques utilisent `DELEGATECALL` en arrière-plan, ce qui exécute simplement la fonction d'un autre contrat avec l'état du contrat appelant. Consultez [cet article de blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) pour en savoir plus sur les systèmes de proxy. Ils vous offrent plus de fonctionnalités, par exemple, ils permettent la mise à niveau, mais ils ajoutent également beaucoup de complexité. Je ne les ajouterais pas uniquement pour réduire la taille des contrats, à moins que ce ne soit votre seule option pour une raison quelconque.

## Impact moyen {#medium-impact}

### Supprimer des fonctions {#remove-functions}

Celle-ci devrait être évidente. Les fonctions augmentent considérablement la taille d'un contrat.

- **Externes** : Souvent, nous ajoutons beaucoup de fonctions de vue (view) pour des raisons de commodité. C'est parfaitement bien jusqu'à ce que vous atteigniez la limite de taille. Ensuite, vous devriez vraiment envisager de supprimer toutes celles qui ne sont pas absolument essentielles.
- **Internes** : Vous pouvez également supprimer les fonctions internes/privées et simplement intégrer le code en ligne (inline) tant que la fonction n'est appelée qu'une seule fois.

### Éviter les variables supplémentaires {#avoid-additional-variables}

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

Un simple changement comme celui-ci fait une différence de **0,28 ko**. Il y a de fortes chances que vous puissiez trouver de nombreuses situations similaires dans vos contrats et celles-ci peuvent vraiment s'additionner pour atteindre des montants significatifs.

### Raccourcir les messages d'erreur {#shorten-error-message}

Les longs messages d'annulation (revert) et en particulier de nombreux messages d'annulation différents peuvent gonfler le contrat. Utilisez plutôt des codes d'erreur courts et décodez-les dans votre contrat. Un long message pourrait devenir beaucoup plus court :

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Utiliser des erreurs personnalisées au lieu de messages d'erreur {#use-custom-errors-instead-of-error-messages}

Les erreurs personnalisées ont été introduites dans [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Elles constituent un excellent moyen de réduire la taille de vos contrats, car elles sont encodées dans l'ABI en tant que sélecteurs (tout comme le sont les fonctions).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Envisager une valeur d'exécution faible dans l'optimiseur {#consider-a-low-run-value-in-the-optimizer}

Vous pouvez également modifier les paramètres de l'optimiseur. La valeur par défaut de 200 signifie qu'il essaie d'optimiser le bytecode comme si une fonction était appelée 200 fois. Si vous la changez à 1, vous dites essentiellement à l'optimiseur d'optimiser pour le cas où chaque fonction n'est exécutée qu'une seule fois. Une fonction optimisée pour ne s'exécuter qu'une seule fois signifie qu'elle est optimisée pour le déploiement lui-même. Sachez que **cela augmente les [coûts en gaz](/developers/docs/gas/) pour l'exécution des fonctions**, vous pourriez donc ne pas vouloir le faire.

## Faible impact {#small-impact}

### Éviter de passer des structures aux fonctions {#avoid-passing-structs-to-functions}

Si vous utilisez l'[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), il peut être utile de ne pas passer de structures (structs) à une fonction. Au lieu de passer le paramètre sous forme de structure, passez directement les paramètres requis. Dans cet exemple, nous avons économisé **0,1 ko** supplémentaire.

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

- Des fonctions ou des variables qui ne sont appelées que de l'extérieur ? Déclarez-les comme `external` au lieu de `public`.
- Des fonctions ou des variables appelées uniquement depuis l'intérieur du contrat ? Déclarez-les comme `private` ou `internal` au lieu de `public`.

### Supprimer les modificateurs {#remove-modifiers}

Les modificateurs (modifiers), surtout lorsqu'ils sont utilisés intensément, pourraient avoir un impact significatif sur la taille du contrat. Envisagez de les supprimer et d'utiliser plutôt des fonctions.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Ces conseils devraient vous aider à réduire considérablement la taille du contrat. Encore une fois, je ne saurais trop insister sur ce point : concentrez-vous toujours sur la division des contrats si possible pour obtenir le plus grand impact.