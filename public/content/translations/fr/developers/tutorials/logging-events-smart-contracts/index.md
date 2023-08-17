---
title: Consigner les données des contrats intelligents avec des événements
description: Introduction aux événements de contrats intelligents et manière dont vous pouvez les utiliser pour enregistrer les données
author: "jdourlens"
tags:
  - "contrats intelligents"
  - "remix"
  - "solidity"
  - "événements"
skill: intermediate
lang: fr
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans Solidity, [les événements](/developers/docs/smart-contracts/anatomy/#events-and-logs) envoient des signaux que les contrats intelligents peuvent lancer. Les dApps, ou tout autre élément connecté à l'API Ethereum JSON-RPC, peuvent écouter ces événements et agir en conséquence. Un événement peut également être indexé de sorte que son historique soit consultable ultérieurement.

## Évènements {#events}

L'événement le plus courant sur la blockchain Ethereum au moment de l'écriture de cet article est l'événement de 'Transfer' qui est émis par les jetons ERC20 lorsque quelqu'un transfère des jetons.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La signature de l'événement est déclarée à l'intérieur du code du contrat et peut être émise avec le mot clé 'emit'. Par exemple, l'évènement 'transfert' enregistre qui a initié le transfert (_à partir de_), à qui (_à_) et combien de jetons ont été transférés (_valeur_).

Si nous revenons à notre contrat intelligent Counter et décidons de procéder à un enregistrement chaque fois que la valeur est modifiée. Comme il n’est pas destiné à être déployé, ce contrat sert de base à la construction d’un autre contrat en l'étendant : cela s’appelle un contrat abstrait. Dans le cas de notre exemple de compteur, cela ressemblerait à ceci :

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private variable of type unsigned int to keep the number of counts
    uint256 private count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Notez que :

- **Ligne 5**: nous déclarons notre événement et ce qu'il contient, l'ancienne valeur et la nouvelle valeur.

- **Ligne 13** : Lorsque nous incrémentons notre variable de nombre, nous émettons l'événement.

Si nous déployons maintenant le contrat et appelons la fonction d'incrémentation, nous verrons que Remix l'affichera automatiquement si vous cliquez sur la nouvelle transaction dans un tableau nommé logs.

![Remixer une capture d'écran](./remix-screenshot.png)

Les journaux sont vraiment utiles pour déboguer vos contrats intelligents, mais ils sont également importants si vous construisez des applications utilisées par différentes personnes et facilitent les analyses du suivi et de la compréhension de l'utilisation de votre contrat intelligent. Les journaux générés par les transactions sont affichés dans les explorateurs de blocs populaires et vous pouvez également les utiliser par exemple pour créer des scripts hors chaîne pour surveiller des événements spécifiques et prendre des mesures lorsqu'ils se produisent.
