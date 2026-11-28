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

Le [22 novembre 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon), le hard fork Spurious Dragon a introduit l'[EIP-170](https://eips.ethereum.org/EIPS/eip-170) qui a ajouté une limite de taille de contrat intelligent de 24 576 octets (24 Kio). Pour vous, en tant que développeur Solidity, cela signifie que lorsque vous ajoutez de plus en plus de fonctionnalités à votre contrat, à un moment donné, vous atteindrez la limite et le compilateur vous avertira :

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Il existe un avertissement similaire pour le code de déploiement (initcode), que l'[EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) a limité à 49 152 octets lors de la mise à jour Shanghai.

La limite n'est pas permanente. L'[EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) l'augmente à 65 536 octets (64 Kio), et la limite de l'initcode à 131 072 octets, et elle est prévue pour la [mise à jour Glamsterdam](/roadmap/glamsterdam/). Jusqu'à ce que cette mise à jour soit activée sur le réseau sur lequel vous déployez, la limite y est de 24 576 octets, et même après, les contrats plus petits restent moins chers à déployer et plus faciles à auditer.

Cette limite a été introduite pour prévenir les attaques par déni de service (DOS). Tout appel à un contrat est relativement peu coûteux en termes de gaz. Cependant, l'impact d'un appel de contrat pour les nœuds Ethereum augmente de manière disproportionnée en fonction de la taille du code du contrat appelé (lecture du code depuis le disque, prétraitement du code, ajout de données à la preuve de Merkle). Chaque fois que vous avez une telle situation où l'attaquant nécessite peu de ressources pour causer beaucoup de travail aux autres, vous obtenez un potentiel d'attaques DOS.

À l'origine, c'était moins un problème car une limite naturelle de taille de contrat est la limite de gaz du bloc. Évidemment, un contrat doit être déployé au sein d'une transaction qui contient tout le bytecode du contrat. Si vous n'incluez que cette seule transaction dans un bloc, vous pouvez utiliser tout ce gaz, mais ce n'est pas infini. Aujourd'hui, la limite de gaz du bloc est de plusieurs dizaines de millions de gaz et a été augmentée à plusieurs reprises par les validateurs, donc à elle seule, elle permettrait de très grands contrats. Depuis la [mise à jour Fusaka](/roadmap/fusaka/), une seule transaction est également plafonnée à 16 777 216 gaz ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), mais cela reste bien au-dessus de ce que coûte le déploiement d'un contrat de 24 Kio, c'est pourquoi une limite de taille explicite est nécessaire.

Dans ce qui suit, nous examinerons certaines méthodes classées selon leur impact potentiel. Pensez-y en termes de perte de poids. La meilleure stratégie pour quelqu'un qui souhaite atteindre son poids cible (dans notre cas 24 ko) est de se concentrer d'abord sur les méthodes à fort impact. Dans la plupart des cas, il suffit de corriger votre alimentation pour y parvenir, mais parfois vous avez besoin d'un peu plus. Ensuite, vous pourriez ajouter un peu d'exercice (impact moyen) ou même des suppléments (faible impact).

## Fort impact {#big-impact}

### Séparer vos contrats {#separate-your-contracts}

Cela devrait toujours être votre première approche. Comment pouvez-vous séparer le contrat en plusieurs contrats plus petits ? Cela vous oblige généralement à concevoir une bonne architecture pour vos contrats. Les contrats plus petits sont toujours préférés du point de vue de la lisibilité du code. Pour diviser les contrats, posez-vous les questions suivantes :

- Quelles fonctions vont ensemble ? Chaque ensemble de fonctions pourrait être mieux dans son propre contrat.
- Quelles fonctions ne nécessitent pas de lire l'état du contrat ou seulement un sous-ensemble spécifique de l'état ?
- Pouvez-vous séparer le stockage et les fonctionnalités ?

### Bibliothèques {#libraries}

Une façon simple d'éloigner le code des fonctionnalités du stockage est d'utiliser une [bibliothèque](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Ne déclarez pas les fonctions de la bibliothèque comme internes car elles seront [ajoutées au contrat](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) directement lors de la compilation. Mais si vous utilisez des fonctions publiques, alors celles-ci seront en fait dans un contrat de bibliothèque séparé. Envisagez d'utiliser [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for) pour rendre l'utilisation des bibliothèques plus pratique.

### Proxies {#proxies}

Une stratégie plus avancée serait un système de proxy. Les bibliothèques utilisent `DELEGATECALL` en arrière-plan, ce qui exécute simplement la fonction d'un autre contrat avec l'état du contrat appelant. Consultez la section sur la [mise à niveau des contrats intelligents](/developers/docs/smart-contracts/upgrading/) pour en savoir plus sur les systèmes de proxy. Ils vous offrent plus de fonctionnalités, par exemple, ils permettent la mise à niveau, mais ils ajoutent également beaucoup de complexité. Je ne les ajouterais pas uniquement pour réduire la taille des contrats, à moins que ce ne soit votre seule option pour une raison quelconque.

## Impact moyen {#medium-impact}

### Supprimer des fonctions {#remove-functions}

Celle-ci devrait être évidente. Les fonctions augmentent considérablement la taille d'un contrat.

- **Externes** : Souvent, nous ajoutons beaucoup de fonctions de vue (view) pour des raisons de commodité. C'est parfaitement bien jusqu'à ce que vous atteigniez la limite de taille. Ensuite, vous devriez vraiment envisager de supprimer toutes celles qui ne sont pas absolument essentielles.
- **Internes** : Vous pouvez également supprimer les fonctions internes/privées et simplement intégrer le code en ligne (inline) tant que la fonction n'est appelée qu'une seule fois.

### Éviter les variables supplémentaires {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Un simple changement comme celui-ci a fait une différence de **0,28 ko** au moment où cet article a été écrit. Les économies exactes dépendent de la version de votre compilateur et de vos paramètres (avec Solidity 0.8.37, c'est environ 0,1 ko sans l'optimiseur et beaucoup moins avec), alors mesurez toujours. Il y a de fortes chances que vous puissiez trouver de nombreuses situations similaires dans vos contrats et celles-ci peuvent vraiment s'additionner pour atteindre des montants significatifs.

### Raccourcir les messages d'erreur {#shorten-error-message}

Les longs messages d'annulation (revert) et en particulier de nombreux messages d'annulation différents peuvent gonfler le contrat. Utilisez plutôt des codes d'erreur courts et décodez-les dans votre contrat. Un long message pourrait devenir beaucoup plus court :

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Utiliser des erreurs personnalisées au lieu de messages d'erreur {#use-custom-errors-instead-of-error-messages}

Les erreurs personnalisées ont été introduites dans [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Elles constituent un excellent moyen de réduire la taille de vos contrats, car elles sont encodées dans l'ABI sous forme de sélecteurs (tout comme le sont les fonctions).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Envisager une valeur d'exécution faible dans l'optimiseur {#consider-a-low-run-value-in-the-optimizer}

Vous pouvez également modifier les paramètres de l'optimiseur. La valeur par défaut de 200 signifie qu'il essaie d'optimiser le bytecode comme si une fonction était appelée 200 fois. Si vous la changez à 1, vous dites essentiellement à l'optimiseur d'optimiser pour le cas où chaque fonction n'est exécutée qu'une seule fois. Une fonction optimisée pour n'être exécutée qu'une seule fois signifie qu'elle est optimisée pour le déploiement lui-même. Sachez que **cela augmente les [coûts en gaz](/developers/docs/gas/) pour l'exécution des fonctions**, vous pourriez donc ne pas vouloir le faire. Si vous compilez avec `viaIR` activé, vérifiez la taille avec et sans, car le générateur de code basé sur l'IR peut produire des tailles de bytecode sensiblement différentes. Consultez les [options de l'optimiseur](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options) pour plus de détails.

## Faible impact {#small-impact}

### Éviter de passer des structures aux fonctions {#avoid-passing-structs-to-functions}

Si vous utilisez l'[ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (la valeur par défaut depuis Solidity 0.8.0), il peut être utile de ne pas passer de structures à une fonction. Au lieu de passer le paramètre sous forme de structure, passez directement les paramètres requis. Dans cet exemple, nous avons économisé **0,1 ko** supplémentaire.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Déclarer la bonne visibilité pour les fonctions et les variables {#declare-correct-visibility-for-functions-and-variables}

- Des fonctions ou des variables qui ne sont appelées que de l'extérieur ? Déclarez-les comme `external` au lieu de `public`.
- Des fonctions ou des variables appelées uniquement depuis l'intérieur du contrat ? Déclarez-les comme `private` ou `internal` au lieu de `public`.

### Supprimer les modificateurs {#remove-modifiers}

Les modificateurs, en particulier lorsqu'ils sont utilisés intensément, pourraient avoir un impact significatif sur la taille du contrat. Envisagez de les supprimer et d'utiliser des fonctions à la place.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Ces conseils devraient vous aider à réduire considérablement la taille du contrat. Encore une fois, je ne saurais trop insister, concentrez-vous toujours sur la division des contrats si possible pour obtenir le plus grand impact.
