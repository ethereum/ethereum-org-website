---
title: Comment configurer Tellor comme Oracle
description: Un guide pour débuter l'intégration de l'oracle Tellor dans votre protocole
author: "Tellor"
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "oracles"
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Quiz Pop : Votre protocole est à peine terminé, mais il a besoin d'un oracle pour avoir accès aux données hors chaîne... Que faites-vous ?

## Prérequis (simple) {#soft-prerequisites}

Cet article a pour objectif de permettre l'accès à un flux oracle aussi simplement et efficacement que possible. Cela étant dit, nous supposons que votre niveau de compétence en codage est le suivant pour nous concentrer sur l'aspect oracle.

Hypothèses :

- vous pouvez naviguer dans un terminal
- vous avez un npm installé
- vous savez comment utiliser le npm pour gérer les dépendances

Tellor est un oracle direct et open source prêt à l'emploi. Ce guide pour débutants a pour objectif de montrer la facilité d'utilisation de Tellor, et de doter votre projet d'un oracle entièrement décentralisé et résistant à la censure.

## Aperçu {#overview}

Tellor est un système Oracle où les parties peuvent demander la valeur d'un point de données hors chaîne (par ex. BTC/USD). Les rapporteurs sont en concurrence pour ajouter cette valeur à une banque de données en chaîne accessible par tous les contrats intelligents Ethereum. Les entrées de cette banque de données sont sécurisées par un réseau de mises en jeu par des rapporteurs. Tellor utilise des mécanismes d'incitation crypto-économique, récompensant les déclarations honnêtes de données effectuées par des rapporteurs et punissant les mauvais acteurs grâce à la délivrance d'un jeton Tellor (les Tributes, ou TRB), et d'un mécanisme de conflit.

Dans ce tutoriel, nous allons passer en revue :

- La mise en place de la boite à outils initiale dont vous aurez besoin pour démarrer.
- Un exemple simple.
- La liste des adresses testnet des réseaux sur lesquels vous pourrez tester Tellor.

## Utiliser Tellor {#usingtellor}

La première chose à faire est d'installer les outils de base nécessaires pour utiliser Tellor comme oracle. Utilisez [ce paquet](https://github.com/tellor-io/usingtellor) pour installer les contrats utilisateur de Tellor :

`npm install usingtellor`

Une fois ces derniers installés, cela permettra à vos contrats d'hériter des fonctions du contrat 'UsingTellor'.

Génial ! Maintenant que vos outils sont prêts, intéressons-nous à un exercice simple où nous récupérons le prix de bitcoin :

### Exemple BTC/USD {#btcusd-example}

Hériter du contrat UsingTellor, en transmettant l'adresse Tellor en tant qu'argument de constructeur :

Voici un exemple :

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //This Contract now has access to all functions in UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Pour une liste complète des adresses de contrat, veuillez cliquer [ici](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Pour en faciliter l’utilisation, le dépôt de UsingTellor est livré avec une version du contrat [Tellor Playground](https://github.com/tellor-io/TellorPlayground) pour une intégration plus facile. Cliquez [ici](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) pour une liste des fonctions utiles.

Pour une implémentation plus robuste de l'oracle Tellor, consultez la liste complète des fonctions disponibles [ici.](https://github.com/tellor-io/usingtellor/blob/master/README.md)
