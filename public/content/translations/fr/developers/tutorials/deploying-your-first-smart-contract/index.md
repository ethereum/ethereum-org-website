---
title: Déployer votre premier contrat intelligent
description: Introduction au déploiement de votre premier contrat intelligent sur un réseau de test Ethereum
author: "jdourlens"
tags:
  [
    "contrats intelligents",
    "remix",
    "solidité",
    "déploiement"
  ]
skill: beginner
lang: fr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Je suppose que vous êtes aussi enthousiaste que nous à l'idée de [déployer](/developers/docs/smart-contracts/deploying/) et d'interagir avec votre premier [contrat intelligent](/developers/docs/smart-contracts/) sur la blockchain Ethereum.

Ne vous inquiétez pas, comme il s'agit de notre premier contrat intelligent, nous le déploierons sur un [réseau de test local](/developers/docs/networks/) afin que son déploiement et son utilisation ne vous coûtent rien et que vous puissiez l'utiliser autant que vous le souhaitez.

## Rédiger notre contrat {#writing-our-contract}

La première étape consiste à [visiter Remix](https://remix.ethereum.org/) et à créer un nouveau fichier. Dans la partie supérieure gauche de l'interface Remix, ajoutez un nouveau fichier et saisissez le nom de fichier que vous souhaitez.

![Ajout d'un nouveau fichier dans l'interface Remix](./remix.png)

Dans le nouveau fichier, nous allons coller le code suivant.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variable publique de type entier non signé pour conserver le nombre de comptages
    uint256 public count = 0;

    // Fonction qui incrémente notre compteur
    function increment() public {
        count += 1;
    }

    // Accesseur non nécessaire pour obtenir la valeur du compteur
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Si vous êtes habitué à la programmation, vous pouvez facilement deviner ce que fait ce programme. Voici une explication ligne par ligne :

- Ligne 4 : nous définissons un contrat avec le nom `Counter`.
- Ligne 7 : notre contrat stocke un entier non signé nommé `count` commençant à 0.
- Ligne 10 : la première fonction modifiera l'état du contrat et `increment()` notre variable `count`.
- Ligne 15 : la seconde fonction est juste un accesseur (« getter ») pour pouvoir lire la valeur de la variable `count` en dehors du contrat intelligent. Notez que, comme nous avons défini notre variable `count` comme publique, cela n'est pas nécessaire mais est montré à titre d'exemple.

C'est tout pour notre premier contrat intelligent simple. Comme vous le savez peut-être, cela ressemble à une classe de langages POO (programmation orientée objet) comme Java ou C++. Il est maintenant temps d'interagir avec notre contrat.

## Déployer notre contrat {#deploying-our-contract}

Maintenant que nous avons écrit notre tout premier contrat intelligent, nous allons le déployer sur la blockchain pour pouvoir interagir avec.

[Déployer le contrat intelligent sur la blockchain](/developers/docs/smart-contracts/deploying/) consiste en fait simplement à envoyer une transaction contenant le code du contrat intelligent compilé sans spécifier de destinataires.

Nous allons d'abord [compiler le contrat](/developers/docs/smart-contracts/compiling/) en cliquant sur l'icône de compilation sur le côté gauche :

![L'icône de compilation dans la barre d'outils de Remix](./remix-compile-button.png)

Cliquez ensuite sur le bouton de compilation :

![Le bouton de compilation dans le compilateur Solidity de Remix](./remix-compile.png)

Vous pouvez choisir de sélectionner l'option « Auto compile » afin que le contrat soit toujours compilé lorsque vous sauvegardez le contenu dans l'éditeur de texte.

Ensuite, naviguez vers l'écran « déployer et exécuter les transactions » :

![L'icône de déploiement dans la barre d'outils Remix](./remix-deploy.png)

Une fois que vous êtes sur l'écran « déployer et exécuter les transactions », vérifiez bien que le nom de votre contrat apparaisse et cliquez sur Déployer. Comme vous pouvez le voir en haut de la page, l'environnement actuel est « JavaScript VM », ce qui signifie que nous allons déployer et interagir avec notre contrat intelligent sur une blockchain de test locale pour pouvoir tester plus rapidement et sans frais.

![Le bouton de déploiement dans le compilateur Solidity de Remix](./remix-deploy-button.png)

Une fois que vous avez cliqué sur le bouton « Déployer », vous verrez votre contrat apparaître en bas. Cliquez sur la flèche à gauche pour le développer afin de voir le contenu de notre contrat. Il s'agit de notre variable `counter`, de notre fonction `increment()` et de l'accesseur `getCounter()`.

Si vous cliquez sur le bouton `count` ou `getCount`, le contenu de la variable `count` du contrat sera récupéré et affiché. Comme nous n'avons pas encore appelé la fonction `increment`, la valeur 0 devrait s'afficher.

![Le bouton de fonction dans le compilateur Solidity de Remix](./remix-function-button.png)

Appelons maintenant la fonction `increment` en cliquant sur le bouton. Vous verrez les journaux des transactions effectuées apparaître en bas de la fenêtre. Vous verrez que les journaux sont différents lorsque vous appuyez sur le bouton pour récupérer les données, par opposition au bouton `increment`. C'est parce que la lecture des données sur la blockchain ne nécessite aucune transaction (écriture) ni aucun frais. En effet, seule la modification de l'état de la blockchain nécessite d'effectuer une transaction :

![Un journal de transactions](./transaction-log.png)

Après avoir appuyé sur le bouton `increment` qui génère une transaction pour appeler notre fonction `increment()`, si nous cliquons à nouveau sur les boutons `count` ou `getCount`, nous lirons l'état nouvellement mis à jour de notre contrat intelligent, avec la variable `count` supérieure à 0.

![État nouvellement mis à jour du contrat intelligent](./updated-state.png)

Dans le prochain tutoriel, nous verrons [comment vous pouvez ajouter des événements à vos contrats intelligents](/developers/tutorials/logging-events-smart-contracts/). La journalisation des événements est un moyen pratique de déboguer votre contrat intelligent et de comprendre ce qui se passe lors de l'appel d'une fonction.
