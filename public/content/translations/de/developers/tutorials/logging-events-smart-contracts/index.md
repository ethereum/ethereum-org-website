---
title: Protokollierung von Daten aus Smart Contracts mit Ereignissen
description: Eine Einführung in Smart-Contract-Ereignisse und wie Sie diese zur Datenprotokollierung verwenden können
author: "jdourlens"
tags:
  [
    "intelligente Verträge",
    "remix",
    "solidity",
    "ereignisse"
  ]
skill: intermediate
lang: de
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity sind [Ereignisse](/developers/docs/smart-contracts/anatomy/#events-and-logs) Signale, die von Smart Contracts ausgegeben werden können. Dapps oder alles, was mit der JSON-RPC-API von Ethereum verbunden ist, können auf diese Ereignisse lauschen und entsprechend reagieren. Ein Ereignis kann auch indiziert werden, sodass der Ereignisverlauf später durchsuchbar ist.

## Ereignisse {#events}

Das häufigste Ereignis auf der Ethereum-Blockchain ist zum Zeitpunkt der Erstellung dieses Artikels das Transfer-Ereignis, das von ERC20-Tokens ausgegeben wird, wenn jemand Token überträgt.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Die Ereignissignatur wird innerhalb des Vertragscodes deklariert und kann mit dem Schlüsselwort emit ausgegeben werden. Zum Beispiel protokolliert das Transfer-Ereignis, wer die Übertragung gesendet hat (_from_), an wen (_to_) und wie viele Token übertragen wurden (_value_).

Wenn wir zu unserem Counter-Smart-Contract zurückkehren und beschließen, jedes Mal zu protokollieren, wenn der Wert geändert wird. Da dieser Vertrag nicht zur Bereitstellung gedacht ist, sondern als Grundlage für die Erstellung eines anderen Vertrags durch Erweiterung dient, wird er als abstrakter Vertrag bezeichnet. Im Fall unseres Counter-Beispiels würde es so aussehen:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private Variable vom Typ unsigned int zur Speicherung der Anzahl der Zählungen
    uint256 private count = 0;

    // Funktion, die unseren Zähler inkrementiert
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter zum Abrufen des Zählwerts
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Beachten Sie Folgendes:

- **Zeile 5**: Wir deklarieren unser Ereignis und was es enthält: den alten Wert und den neuen Wert.

- **Zeile 13**: Wenn wir unsere Zählvariable inkrementieren, geben wir das Ereignis aus.

Wenn wir nun den Vertrag bereitstellen und die increment-Funktion aufrufen, sehen wir, dass Remix es automatisch anzeigt, wenn Sie auf die neue Transaktion in einem Array namens logs klicken.

![Remix-Screenshot](./remix-screenshot.png)

Logs sind sehr nützlich für das Debugging Ihrer Smart Contracts, aber sie sind auch wichtig, wenn Sie Anwendungen erstellen, die von verschiedenen Personen genutzt werden. Sie erleichtern die Analyse, um zu verfolgen und zu verstehen, wie Ihr Smart Contract genutzt wird. Die durch Transaktionen erzeugten Logs werden in gängigen Block-Explorern angezeigt und Sie können sie beispielsweise auch verwenden, um Off-Chain-Skripte zu erstellen, die auf bestimmte Ereignisse lauschen und bei deren Auftreten Maßnahmen ergreifen.
