---
title: Datenprotokollierung von Smart Contracts mit Ereignissen
description: "Eine Einführung in Smart-Contract-Ereignisse und wie Sie diese zur Datenprotokollierung verwenden können"
author: "jdourlens"
tags: ["Smart Contracts", "Remix", "Solidity", "Ereignisse"]
skill: intermediate
breadcrumb: Ereignisprotokollierung
lang: de
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In Solidity sind [Ereignisse](/developers/docs/smart-contracts/anatomy/#events-and-logs) ausgesendete Signale, die Smart Contracts auslösen können. Dapps oder alles, was mit der Ethereum-JSON-RPC-API verbunden ist, können auf diese Ereignisse hören und entsprechend handeln. Ein Ereignis kann auch indiziert werden, sodass der Ereignisverlauf später durchsuchbar ist.

## Ereignisse {#events}

Das häufigste Ereignis auf der Ethereum-Blockchain zum Zeitpunkt des Verfassens dieses Artikels ist das Transfer-Ereignis, das von ERC20-Token ausgegeben wird, wenn jemand Token überträgt.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Die Ereignissignatur wird innerhalb des Vertragscodes deklariert und kann mit dem Schlüsselwort emit ausgelöst werden. Zum Beispiel protokolliert das Transfer-Ereignis, wer die Überweisung gesendet hat (_from_), an wen (_to_) und wie viele Token übertragen wurden (_value_).

Kehren wir zu unserem Counter-Smart-Contract zurück und beschließen, jede Wertänderung zu protokollieren. Da dieser Vertrag nicht bereitgestellt werden soll, sondern als Basis für den Aufbau eines anderen Vertrags durch Erweiterung dient, wird er als abstrakter Vertrag bezeichnet. Im Fall unseres Zählerbeispiels würde das so aussehen:

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

Beachten Sie Folgendes:

- **Zeile 5**: Wir deklarieren unser Ereignis und was es enthält, den alten Wert und den neuen Wert.

- **Zeile 13**: Wenn wir unsere Zählervariable inkrementieren, lösen wir das Ereignis aus.

Wenn wir nun den Vertrag bereitstellen und die Inkrementierungsfunktion aufrufen, werden wir sehen, dass Remix dies automatisch anzeigt, wenn Sie auf die neue Transaktion innerhalb eines Arrays namens logs klicken.

![Remix-Screenshot](./remix-screenshot.png)

Protokolle (Logs) sind sehr nützlich für das Debugging Ihrer Smart Contracts, aber sie sind auch wichtig, wenn Sie Anwendungen erstellen, die von verschiedenen Personen verwendet werden. Sie erleichtern die Analyse, um zu verfolgen und zu verstehen, wie Ihr Smart Contract verwendet wird. Die durch Transaktionen generierten Protokolle werden in beliebten Blocksuchmaschinen angezeigt, und Sie können sie beispielsweise auch verwenden, um Off-Chain-Skripte zu erstellen, die auf bestimmte Ereignisse hören und bei deren Eintreten Maßnahmen ergreifen.