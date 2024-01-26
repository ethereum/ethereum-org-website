---
title: Déployer votre premier contrat intelligent
description: Introduction au déploiement de votre premier contrat intelligent sur le réseau de test Ethereum
author: "jdourlens"
tags:
  - "contrats intelligents"
  - "remix"
  - "solidity"
  - "déploiement"
skill: beginner
lang: fr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Je suppose que vous êtes aussi enthousiaste que nous à l'idée de [déployer](/developers/docs/smart-contracts/deploying/) et d'interagir avec votre premier [contrat intelligent](/developers/docs/smart-contracts/) sur la blockchain Ethereum.

Pas d'inquiétude, comme il s'agit de notre premier contrat, nous le déploierons sur un [réseau de test local](/developers/docs/networks/) afin qu'il ne vous coûte rien de le déployer et de vous amuser autant que vous le souhaitez avec.

## Rédiger notre contrat {#writing-our-contract}

La première étape est de [visiter Remix](https://remix.ethereum.org/) et de créer un nouveau fichier. Dans la partie supérieure gauche de l'interface Remix ajoutez un nouveau fichier et entrez le nom de fichier que vous voulez.

![Ajout d'un nouveau fichier dans l'interface Remix](./remix.png)

Dans ce nouveau fichier, nous collerons le code suivant.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Si vous êtes un habitué de la programmation, vous pouvez facilement deviner ce que fait ce programme. Voici une explication ligne par ligne :

- Ligne 4 : Nous définissons un contrat portant le nom `Counter`.
- Ligne 7 : Notre contrat stocke un entier non signé nommé `count` commençant à 0.
- Ligne 10 : La première fonction va modifier l'état du contrat et `incrémenter()` notre variable `count`.
- Ligne 15 : La seconde fonction permet de lire la valeur de la variable `count` en dehors du contrat intelligent. Notez que, comme nous avons défini notre variable `count` comme étant publique, ce n'est pas nécessaire mais est montré comme exemple.

Tout cela pour notre premier contrat intelligent simple. Comme vous le savez peut-être, il ressemble à une classe des langages OOP (Object-Oriented Programming) comme Java ou C++. Il est maintenant temps de jouer avec notre contrat.

## Déployer notre contract {#deploying-our-contract}

Notre tout premier contrat intelligent ayant été rédigé, nous allons maintenant le déployer sur la blockchain pour pouvoir jouer avec lui.

[Déployer le contrat intelligent sur la blockchain](/developers/docs/smart-contracts/deploying/) consiste en fait à envoyer une transaction contenant le code du contrat intelligent compilé sans spécifier de destinataires.

Nous allons d'abord [compiler le contrat](/developers/docs/smart-contracts/compiling/) en cliquant sur l'icône de compilation sur le côté gauche :

![L'icône de compilation dans la barre d'outils Remix](./remix-compile-button.png)

Cliquez ensuite sur le bouton compiler :

![Le bouton de compilation dans le compilateur solidity de Remix](./remix-compile.png)

Vous pouvez choisir de sélectionner l’option "Compilation automatique" pour que le contrat soit toujours compilé lorsque vous enregistrez le contenu dans l’éditeur de texte.

Ensuite, accédez à l'écran "déployer et executer" des transactions :

![L'icône deployer dans la barre d'outils Remix](./remix-deploy.png)

Une fois que vous êtes sur l’écran "déployer et exécuter", vérifiez que le nom de votre contrat apparaît et cliquez sur déployer. Comme vous pouvez le voir en haut de la page, l'environnement actuel est "JavaScript VM", ce qui signifie que nous allons déployer et interagir avec notre contrat intelligent sur une blockchain de test locale pour être en mesure de tester plus rapidement et sans frais.

![Le bouton deployer dans le compilateur solidity de Remix](./remix-deploy-button.png)

Une fois que vous avez cliqué sur le bouton « Déployer », vous verrez votre contrat apparaître en bas de page. Cliquez sur la flèche à gauche pour la développer pour voir le contenu de notre contrat. Ceci est notre variable `counter`, notre fonction `increment()` et l'accesseur `getCounter()`.

Si vous cliquez sur le bouton `count` ou `getCount` , il récupérera le contenu de la variable `count` du contrat et l'affichera. Comme nous n'avons pas encore appelé la fonction `incrément` , elle devrait afficher 0.

![Le bouton de fonction dans le compilateur solidity de Remix](./remix-function-button.png)

Appelons maintenant la fonction `increment` en cliquant sur le bouton. Vous verrez les journaux des transactions terminées apparaitre en bas de la fenêtre. Vous verrez que les journaux sont différents si vous appuyez sur le bouton de récupération des données plutôt que sur le bouton `increment`. C’est parce que la lecture des données sur la blockchain ne requiert ni transactions (écriture) ni frais. En effet, seule la modification de l'état de la blockchain nécessite de faire une transaction :

![Un journal des transactions](./transaction-log.png)

Après avoir appuyé sur le bouton increment qui va générer une transaction pour appeler notre fonction `increment()` si nous cliquons de nouveau sur le boutons count ou getCount, nous allons lire l'état récemment mis à jour de notre contrat intelligent avec une variable count supérieure à 0.

![État du contrat intelligent récemment mis à jour](./updated-state.png)

Dans le prochain tutoriel, nous aborderons [comment vous pouvez ajouter des événements à vos contrats intelligents](/developers/tutorials/logging-events-smart-contracts/). La journalisation des événements est un moyen pratique de déboguer votre contrat intelligent et de comprendre ce qui se passe en appelant une fonction.
