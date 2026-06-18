---
title: Comment configurer Tellor comme votre oracle
description: "Un guide pour commencer à intégrer l'oracle Tellor dans votre protocole"
author: "Tellor"
lang: fr
tags: ["Solidity", "contrats intelligents", "oracles"]
skill: beginner
breadcrumb: Oracle Tellor
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Petit quiz : Votre protocole est presque terminé, mais il a besoin d'un oracle pour accéder à des données hors chaîne... Que faites-vous ?

## Prérequis (souples) {#soft-prerequisites}

Cet article vise à rendre l'accès à un flux d'oracle aussi simple et direct que possible. Cela dit, nous supposons ce qui suit concernant votre niveau de compétence en programmation afin de nous concentrer sur l'aspect oracle.

Hypothèses :

- vous savez naviguer dans un terminal
- vous avez installé npm
- vous savez comment utiliser npm pour gérer les dépendances

Tellor est un oracle en direct et open source prêt à être implémenté. Ce guide pour débutants est là pour montrer la facilité avec laquelle on peut être opérationnel avec Tellor, en fournissant à votre projet un oracle entièrement décentralisé et résistant à la censure.

## Vue d'ensemble {#overview}

Tellor est un système d'oracle où les parties peuvent demander la valeur d'un point de données hors chaîne (par exemple, BTC/USD) et où les rapporteurs sont en concurrence pour ajouter cette valeur à une banque de données onchain, accessible par tous les contrats intelligents Ethereum. Les entrées de cette banque de données sont sécurisées par un réseau de rapporteurs ayant staké. Tellor utilise des mécanismes d'incitation crypto-économiques, récompensant les soumissions de données honnêtes par les rapporteurs et punissant les mauvais acteurs par l'émission du jeton de Tellor, les Tributes (TRB), et un mécanisme de litige.

Dans ce tutoriel, nous aborderons :

- La configuration de la boîte à outils initiale dont vous aurez besoin pour être opérationnel.
- L'exploration d'un exemple simple.
- La liste des adresses de réseau de test des réseaux sur lesquels vous pouvez actuellement tester Tellor.

## UsingTellor {#usingtellor}

La première chose que vous voudrez faire est d'installer les outils de base nécessaires pour utiliser Tellor comme votre oracle. Utilisez [ce paquet](https://github.com/tellor-io/usingtellor) pour installer les contrats utilisateurs de Tellor :

`npm install usingtellor`

Une fois installé, cela permettra à vos contrats d'hériter des fonctions du contrat 'UsingTellor'.

Super ! Maintenant que vous avez préparé les outils, passons à un exercice simple où nous récupérons le prix du bitcoin :

### Exemple BTC/USD {#btcusd-example}

Héritez du contrat UsingTellor, en passant l'adresse de Tellor comme argument du constructeur :

Voici un exemple :

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Ce contrat a maintenant accès à toutes les fonctions de UsingTellor

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

Pour une liste complète des adresses de contrat, référez-vous [ici](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Pour plus de facilité d'utilisation, le dépôt UsingTellor est fourni avec une version du contrat [Tellor Playground](https://github.com/tellor-io/TellorPlayground) pour une intégration plus facile. Voir [ici](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) pour une liste de fonctions utiles.

Pour une implémentation plus robuste de l'oracle Tellor, consultez la liste complète des fonctions disponibles [ici](https://github.com/tellor-io/usingtellor/blob/master/README.md).