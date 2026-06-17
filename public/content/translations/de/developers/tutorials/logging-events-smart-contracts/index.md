---
title: Daten aus Smart Contracts mit Ereignissen loggen
description: Eine Einführung in Smart-Contract-Ereignisse und wie man sie zum Loggen von Daten verwenden kann
author: "jdourlens"
tags: ["Smart Contracts", "remix", "solidity", "Ereignisse"]
skill: intermediate
breadcrumb: Ereignis-Logging
lang: de
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity sind [Ereignisse](/developers/docs/smart-contracts/anatomy/#events-and-logs) ausgesendete Signale, die Smart Contracts auslösen können. Dezentrale Anwendungen (Dapps) oder alles, was mit der Ethereum-JSON-RPC-API verbunden ist, können auf diese Ereignisse hören und entsprechend handeln. Ein Ereignis kann auch indiziert werden, sodass der Ereignisverlauf später durchsuchbar ist.

## Ereignisse {#events}

Das häufigste Ereignis auf der Ethereum-Blockchain zum Zeitpunkt des Verfassens dieses Artikels ist das Transfer-Ereignis, das von ERC-20-Token ausgegeben wird, wenn jemand Token transferiert.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Die Ereignis-Signatur wird innerhalb des Vertragscodes deklariert und kann mit dem Schlüsselwort emit ausgegeben werden. Zum Beispiel loggt das Transfer-Ereignis, wer den Transfer gesendet hat (_from_), an wen (_to_) und wie viele Token transferiert wurden (_value_).

Wenn wir zu unserem Counter-Smart-Contract zurückkehren und beschließen, jedes Mal zu loggen, wenn der Wert geändert wird. Da dieser Vertrag nicht dazu gedacht ist, bereitgestellt zu werden, sondern als Basis für den Aufbau eines anderen Vertrags durch Erweiterung dient, wird er als abstrakter Vertrag bezeichnet. Im Fall unseres Zähler-Beispiels würde das so aussehen:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private Variable vom Typ unsigned int, um die Anzahl der Zählungen zu speichern
    uint256 private count = 0;

    // Funktion, die unseren Zähler inkrementiert
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter, um den Zählwert abzurufen
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Beachte Folgendes:

- **Zeile 5**: Wir deklarieren unser Ereignis und was es enthält, den alten Wert und den neuen Wert.

- **Zeile 13**: Wenn wir unsere Zählervariable inkrementieren, geben wir das Ereignis aus.

Wenn wir nun den Vertrag bereitstellen und die Inkrement-Funktion aufrufen, werden wir sehen, dass Remix dies automatisch anzeigt, wenn man auf die neue Transaktion innerhalb eines Arrays namens logs klickt.

![Remix screenshot](./remix-screenshot.png)

Logs sind sehr nützlich für das Debuggen deiner Smart Contracts, aber sie sind auch wichtig, wenn du Anwendungen baust, die von verschiedenen Personen genutzt werden. Sie erleichtern Analysen, um zu verfolgen und zu verstehen, wie dein Smart Contract genutzt wird. Die durch Transaktionen generierten Logs werden in beliebten Block-Explorern angezeigt, und du kannst sie beispielsweise auch verwenden, um offchain-Skripte zu erstellen, die auf bestimmte Ereignisse hören und bei deren Eintreten Aktionen ausführen.