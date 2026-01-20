---
title: Consigner les données des contrats intelligents avec des événements
description: Une introduction aux événements de contrat intelligent et comment les utiliser pour consigner des données.
author: "jdourlens"
tags:
  [
    "contrats intelligents",
    "remix",
    "solidité",
    "événements"
  ]
skill: intermediate
lang: fr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En Solidity, les [événements](/developers/docs/smart-contracts/anatomy/#events-and-logs) sont des signaux que les contrats intelligents peuvent émettre. Les dapps, ou tout ce qui est connecté à l'API JSON-RPC d'Ethereum, peuvent écouter ces événements et agir en conséquence. Un événement peut également être indexé de sorte que son historique soit consultable ultérieurement.

## Événements {#events}

L'événement le plus courant sur la blockchain Ethereum au moment de la rédaction de cet article est l'événement Transfer, qui est émis par les jetons ERC20 lorsque quelqu'un transfère des jetons.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La signature de l'événement est déclarée dans le code du contrat et peut être émise avec le mot-clé « emit ». Par exemple, l'événement de transfert enregistre qui a envoyé le transfert (_from_), à qui (_to_) et combien de jetons ont été transférés (_value_).

Si nous revenons à notre contrat intelligent Counter et décidons de consigner chaque fois que la valeur est modifiée. Comme ce contrat n'est pas destiné à être déployé mais à servir de base à la construction d'un autre contrat en l'étendant : on l'appelle un contrat abstrait. Dans le cas de notre exemple de compteur, cela ressemblerait à ceci :

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

    // Getter pour obtenir la valeur du compteur
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Notez que :

- **Ligne 5** : nous déclarons notre événement et ce qu'il contient, l'ancienne valeur et la nouvelle valeur.

- **Ligne 13** : Lorsque nous incrémentons notre variable de comptage, nous émettons l'événement.

Si nous déployons maintenant le contrat et appelons la fonction d'incrémentation, nous verrons que Remix l'affichera automatiquement si vous cliquez sur la nouvelle transaction dans un tableau nommé « logs ».

![Capture d'écran de Remix](./remix-screenshot.png)

Les journaux sont très utiles pour déboguer vos contrats intelligents, mais ils sont aussi importants si vous créez des applications utilisées par différentes personnes, car ils facilitent l'analyse pour suivre et comprendre comment votre contrat intelligent est utilisé. Les journaux générés par les transactions sont affichés dans les explorateurs de blocs populaires et vous pouvez également, par exemple, les utiliser pour créer des scripts hors chaîne pour surveiller des événements spécifiques et prendre des mesures lorsqu'ils se produisent.
