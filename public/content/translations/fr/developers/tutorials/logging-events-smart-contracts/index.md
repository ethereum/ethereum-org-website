---
title: "Journaliser les données des contrats intelligents avec les événements"
description: "Une introduction aux événements des contrats intelligents et comment vous pouvez les utiliser pour journaliser des données"
author: "jdourlens"
tags: ["contrats intelligents", "Remix", "Solidity", "événements"]
skill: intermediate
breadcrumb: "Journalisation des événements"
lang: fr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans Solidity, les [événements](/developers/docs/smart-contracts/anatomy/#events-and-logs) sont des signaux émis que les contrats intelligents peuvent déclencher. Les applications décentralisées (dapps), ou tout ce qui est connecté à l'API JSON-RPC d'Ethereum, peuvent écouter ces événements et agir en conséquence. Un événement peut également être indexé afin que l'historique des événements puisse être consulté ultérieurement.

## Événements {#events}

L'événement le plus courant sur la chaîne de blocs Ethereum au moment de la rédaction de cet article est l'événement Transfert qui est émis par les jetons ERC-20 lorsque quelqu'un transfère des jetons.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La signature de l'événement est déclarée à l'intérieur du code du contrat et peut être émise avec le mot-clé emit. Par exemple, l'événement de transfert journalise qui a envoyé le transfert (_from_), à qui (_to_) et combien de jetons ont été transférés (_value_).

Si nous revenons à notre contrat intelligent Counter et décidons de journaliser chaque fois que la valeur est modifiée. Comme ce contrat n'est pas destiné à être déployé mais à servir de base pour construire un autre contrat en l'étendant : il est appelé un contrat abstrait. Dans le cas de notre exemple de compteur, cela ressemblerait à ceci :

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variable privée de type entier non signé pour conserver le nombre de comptages
    uint256 private count = 0;

    // Fonction qui incrémente notre compteur
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Accesseur pour obtenir la valeur du compte
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Remarquez que :

- **Ligne 5** : nous déclarons notre événement et ce qu'il contient, l'ancienne valeur et la nouvelle valeur.

- **Ligne 13** : Lorsque nous incrémentons notre variable count, nous émettons l'événement.

Si nous déployons maintenant le contrat et appelons la fonction d'incrémentation, nous verrons que Remix l'affichera automatiquement si vous cliquez sur la nouvelle transaction dans un tableau nommé logs.

![Remix screenshot](./remix-screenshot.png)

Les journaux sont vraiment utiles pour déboguer vos contrats intelligents, mais ils sont également importants si vous créez des applications utilisées par différentes personnes et facilitent la réalisation d'analyses pour suivre et comprendre comment votre contrat intelligent est utilisé. Les journaux générés par les transactions sont affichés dans les explorateurs de blocs populaires et vous pouvez également, par exemple, les utiliser pour créer des scripts hors chaîne afin d'écouter des événements spécifiques et de prendre des mesures lorsqu'ils se produisent.