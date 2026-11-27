---
title: Daten aus Smart Contracts mit Ereignissen loggen
description: "Eine Einführung in Smart-Contract-Ereignisse und wie man sie zum Loggen von Daten verwenden kann"
author: "jdourlens"
tags: ["Smart Contracts", "Remix", "Solidity", "Ereignisse"]
skill: intermediate
breadcrumb: Ereignis-Logging
lang: de
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity sind [Ereignisse](/developers/docs/smart-contracts/anatomy/#events-and-logs) ausgesendete Signale, die Smart Contracts auslösen können. Dezentrale Anwendungen (Dapps) oder alles, was mit der Ethereum-JSON-RPC-API verbunden ist, können auf diese Ereignisse hören und entsprechend handeln. Ein Ereignis kann auch indiziert werden, sodass der Ereignisverlauf später durchsuchbar ist.

## Ereignisse {#events}

Eines der häufigsten Ereignisse auf der Ethereum-Blockchain ist das `Transfer`-Ereignis, das von ERC-20-Token ausgesendet wird, wenn jemand Token transferiert.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Die Ereignis-Signatur wird innerhalb des Vertrags-Codes deklariert und kann mit dem Schlüsselwort emit ausgesendet werden. Zum Beispiel loggt das Transfer-Ereignis, wer den Transfer gesendet hat (_from_), an wen (_to_) und wie viele Token transferiert wurden (_value_).

Kehren wir zum `Counter`-Smart-Contract aus [Deinen ersten Smart Contract bereitstellen](/developers/tutorials/deploying-your-first-smart-contract/) zurück und loggen jedes Mal, wenn der Wert geändert wird. Das würde so aussehen:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Öffentliche Variable vom Typ unsigned int, um die Anzahl der Zählungen zu speichern
    uint256 public count = 0;

    // Funktion, die unseren Zähler inkrementiert
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Nicht notwendiger Getter, um den Zählerwert abzurufen
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Beachte Folgendes:

- **Zeile 6**: Wir deklarieren unser Ereignis und was es enthält: den alten Wert und den neuen Wert.

- **Zeile 14**: Wenn wir unsere count-Variable inkrementieren, senden wir das Ereignis aus.

Wenn wir nun den Vertrag bereitstellen und die Inkrement-Funktion aufrufen, werden wir sehen, dass Remix dies automatisch anzeigt, wenn du auf die neue Transaktion innerhalb eines Arrays namens logs klickst.

![Remix-Screenshot](./remix-screenshot.png)

Logs sind sehr nützlich für das Debugging deiner Smart Contracts, aber sie sind auch wichtig, wenn du Anwendungen erstellst, die von verschiedenen Personen genutzt werden. Sie erleichtern Analysen, um zu verfolgen und zu verstehen, wie dein Smart Contract genutzt wird. Die durch Transaktionen generierten Logs werden in beliebten Block-Explorern angezeigt und du kannst sie beispielsweise auch verwenden, um offchain-Skripte zu erstellen, die auf bestimmte Ereignisse hören und bei deren Eintreten Maßnahmen ergreifen.
