---
title: "Journaliser les données des contrats intelligents avec les événements"
description: "Une introduction aux événements des contrats intelligents et comment vous pouvez les utiliser pour journaliser des données"
author: "jdourlens"
tags: ["contrats intelligents", "Remix", "Solidity", "événements"]
skill: intermediate
breadcrumb: "Journalisation des événements"
lang: fr
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans Solidity, les [événements](/developers/docs/smart-contracts/anatomy/#events-and-logs) sont des signaux émis que les contrats intelligents peuvent déclencher. Les applications décentralisées (dapps), ou tout ce qui est connecté à l'API JSON-RPC d'Ethereum, peuvent écouter ces événements et agir en conséquence. Un événement peut également être indexé afin que l'historique des événements puisse être consulté ultérieurement.

## Événements {#events}

L'un des événements les plus courants sur la chaîne de blocs Ethereum est l'événement `Transfer` qui est émis par les jetons ERC-20 lorsque quelqu'un transfère des jetons.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La signature de l'événement est déclarée à l'intérieur du code du contrat et peut être émise avec le mot-clé emit. Par exemple, l'événement de transfert journalise qui a envoyé le transfert (_from_), à qui (_to_) et combien de jetons ont été transférés (_value_).

Revenons au contrat intelligent `Counter` de [déployer votre premier contrat intelligent](/developers/tutorials/deploying-your-first-smart-contract/) et journalisons chaque fois que la valeur est modifiée. Cela ressemblerait à ceci :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Variable publique de type unsigned int pour conserver le nombre de comptages
    uint256 public count = 0;

    // Fonction qui incrémente notre compteur
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter non nécessaire pour obtenir la valeur du compteur
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Remarquez que :

- **Ligne 6** : nous déclarons notre événement et ce qu'il contient, l'ancienne valeur et la nouvelle valeur.

- **Ligne 14** : Lorsque nous incrémentons notre variable count, nous émettons l'événement.

Si nous déployons maintenant le contrat et appelons la fonction increment, nous verrons que Remix l'affichera automatiquement si vous cliquez sur la nouvelle transaction dans un tableau nommé logs.

![Capture d'écran de Remix](./remix-screenshot.png)

Les journaux sont vraiment utiles pour déboguer vos contrats intelligents, mais ils sont également importants si vous créez des applications utilisées par différentes personnes et facilitent la réalisation d'analyses pour suivre et comprendre comment votre contrat intelligent est utilisé. Les journaux générés par les transactions sont affichés dans les explorateurs de blocs populaires et vous pouvez également, par exemple, les utiliser pour créer des scripts hors chaîne pour écouter des événements spécifiques et prendre des mesures lorsqu'ils se produisent.
