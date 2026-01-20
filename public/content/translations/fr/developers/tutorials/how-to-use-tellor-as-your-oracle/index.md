---
title: Comment configurer Tellor comme oracle
description: "Un guide pour débuter l'intégration de l'oracle Tellor dans votre protocole"
author: "Tellor"
lang: fr
tags: [ "solidité", "contrats intelligents", "oracles" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Question surprise : votre protocole est presque terminé, mais il a besoin d'un oracle pour accéder aux données hors chaîne... Que faites-vous ?

## (Prérequis recommandés) {#soft-prerequisites}

Cet article vise à rendre l'accès à un flux d'oracle aussi simple et direct que possible. Cela dit, nous partons du principe que vous avez les compétences de codage suivantes afin de nous concentrer sur l'aspect oracle.

Hypothèses :

- vous pouvez naviguer dans un terminal
- vous avez installé npm
- vous savez utiliser npm pour gérer les dépendances

Tellor est un oracle actif et open source, prêt à être implémenté. Ce guide du débutant est là pour montrer la facilité avec laquelle on peut se lancer avec Tellor, fournissant à votre projet un oracle entièrement décentralisé et résistant à la censure.

## Vue d'ensemble {#overview}

Tellor est un système d'oracle où les parties peuvent demander la valeur d'un point de données hors chaîne (p. ex., BTC/USD) et où des rapporteurs s'affrontent pour ajouter cette valeur à une banque de données en chaîne, accessible par tous les contrats intelligents Ethereum. Les entrées de cette banque de données sont sécurisées par un réseau de rapporteurs ayant mis des actifs en jeu. Tellor utilise des mécanismes d'incitation crypto-économiques, récompensant les soumissions de données honnêtes des rapporteurs et punissant les mauvais acteurs par l'émission du jeton de Tellor, Tributes (TRB), et un mécanisme de litige.

Dans ce tutoriel, nous aborderons :

- La configuration de la boîte à outils initiale dont vous aurez besoin pour être opérationnel.
- La présentation d'un exemple simple.
- La liste des adresses de réseaux de test sur lesquels vous pouvez actuellement tester Tellor.

## UsingTellor {#usingtellor}

La première chose à faire est d'installer les outils de base nécessaires pour utiliser Tellor comme votre oracle. Utilisez [ce paquet](https://github.com/tellor-io/usingtellor) pour installer les contrats utilisateur de Tellor :

`npm install usingtellor`

Une fois installé, cela permettra à vos contrats d'hériter des fonctions du contrat « UsingTellor ».

Super ! Maintenant que vous avez préparé les outils, passons à un exercice simple où nous récupérons le prix du bitcoin :

### Exemple BTC/USD {#btcusd-example}

Héritez du contrat UsingTellor, en passant l'adresse Tellor comme argument du constructeur :

Voici un exemple :

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Ce contrat a maintenant accès à toutes les fonctions dans UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Pour obtenir la liste complète des adresses de contrat, référez-vous à [ce document](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Pour en faciliter l'utilisation, le dépôt UsingTellor est fourni avec une version du contrat [Tellor Playground](https://github.com/tellor-io/TellorPlayground) pour une intégration plus facile. Consultez [cette page](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) pour une liste des fonctions utiles.

Pour une implémentation plus robuste de l'oracle Tellor, consultez la liste complète des fonctions disponibles [ici](https://github.com/tellor-io/usingtellor/blob/master/README.md).
