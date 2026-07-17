---
title: "Déployer votre premier contrat intelligent"
description: "Une introduction au déploiement de votre premier contrat intelligent sur un réseau de test Ethereum"
author: "jdourlens"
tags: ["contrats intelligents", "Remix", "Solidity", "déploiement"]
skill: beginner
breadcrumb: "Déployer un premier contrat"
lang: fr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

J'imagine que vous êtes aussi impatient que nous de [déployer](/developers/docs/smart-contracts/deploying/) et d'interagir avec votre premier [contrat intelligent](/developers/docs/smart-contracts/) sur la chaîne de blocs Ethereum.

Ne vous inquiétez pas, comme il s'agit de notre premier contrat intelligent, nous le déploierons sur un [réseau de test local](/developers/docs/networks/) afin que son déploiement ne vous coûte rien et que vous puissiez jouer avec autant que vous le souhaitez.

## Écrire notre contrat {#writing-our-contract}

La première étape consiste à [visiter Remix](https://remix.ethereum.org/) et à créer un nouveau fichier. Dans la partie supérieure gauche de l'interface de Remix, ajoutez un nouveau fichier et entrez le nom de fichier que vous souhaitez.

![Adding a new file in the Remix interface](./remix.png)

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

    // Getter non nécessaire pour obtenir la valeur du comptage
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Si vous avez l'habitude de programmer, vous pouvez facilement deviner ce que fait ce programme. Voici une explication ligne par ligne :

- Ligne 4 : Nous définissons un contrat avec le nom `Counter`.
- Ligne 7 : Notre contrat stocke un entier non signé nommé `count` commençant à 0.
- Ligne 10 : La première fonction modifiera l'état du contrat et `increment()` notre variable `count`.
- Ligne 15 : La deuxième fonction est juste un accesseur (getter) pour pouvoir lire la valeur de la variable `count` en dehors du contrat intelligent. Notez que, comme nous avons défini notre variable `count` comme publique, ce n'est pas nécessaire, mais c'est montré à titre d'exemple.

C'est tout pour notre premier contrat intelligent simple. Comme vous le savez peut-être, il ressemble à une classe issue des langages de POO (Programmation Orientée Objet) comme Java ou C++. Il est maintenant temps de jouer avec notre contrat.

## Déployer notre contrat {#deploying-our-contract}

Maintenant que nous avons écrit notre tout premier contrat intelligent, nous allons le déployer sur la chaîne de blocs pour pouvoir jouer avec.

[Déployer le contrat intelligent sur la chaîne de blocs](/developers/docs/smart-contracts/deploying/) consiste en fait simplement à envoyer une transaction contenant le code du contrat intelligent compilé sans spécifier de destinataire.

Nous allons d'abord [compiler le contrat](/developers/docs/smart-contracts/compiling/) en cliquant sur l'icône de compilation sur le côté gauche :

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Cliquez ensuite sur le bouton de compilation :

![The compile button in the Remix solidity compiler](./remix-compile.png)

Vous pouvez choisir de sélectionner l'option « Auto compile » (Compilation automatique) afin que le contrat soit toujours compilé lorsque vous enregistrez le contenu dans l'éditeur de texte.

Naviguez ensuite vers l'écran « deploy and run transactions » (déployer et exécuter des transactions) :

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Une fois que vous êtes sur l'écran « deploy and run transactions », vérifiez que le nom de votre contrat apparaît et cliquez sur « Deploy » (Déployer). Comme vous pouvez le voir en haut de la page, l'environnement actuel est « JavaScript VM », ce qui signifie que nous allons déployer et interagir avec notre contrat intelligent sur une chaîne de blocs de test locale pour pouvoir tester plus rapidement et sans aucun frais.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Une fois que vous avez cliqué sur le bouton « Deploy », vous verrez votre contrat apparaître en bas. Cliquez sur la flèche à gauche pour le développer afin de voir le contenu de notre contrat. Voici notre variable `counter`, notre fonction `increment()` et l'accesseur `getCounter()`.

Si vous cliquez sur le bouton `count` ou `getCount`, cela récupérera en fait le contenu de la variable `count` du contrat et l'affichera. Comme nous n'avons pas encore appelé la fonction `increment`, cela devrait afficher 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Appelons maintenant la fonction `increment` en cliquant sur le bouton. Vous verrez les journaux des transactions effectuées apparaître en bas de la fenêtre. Vous remarquerez que les journaux sont différents lorsque vous appuyez sur le bouton pour récupérer les données au lieu du bouton `increment`. C'est parce que la lecture de données sur la chaîne de blocs ne nécessite aucune transaction (écriture) ni frais. En effet, seule la modification de l'état de la chaîne de blocs nécessite d'effectuer une transaction :

![A log of transactions](./transaction-log.png)

Après avoir appuyé sur le bouton d'incrémentation qui générera une transaction pour appeler notre fonction `increment()`, si nous cliquons à nouveau sur les boutons count ou getCount, nous lirons le nouvel état mis à jour de notre contrat intelligent avec la variable count étant supérieure à 0.

![Newly updated state of the smart contract](./updated-state.png)

Dans le prochain tutoriel, nous verrons [comment vous pouvez ajouter des événements à vos contrats intelligents](/developers/tutorials/logging-events-smart-contracts/). La journalisation des événements est un moyen pratique de déboguer votre contrat intelligent et de comprendre ce qui se passe lors de l'appel d'une fonction.