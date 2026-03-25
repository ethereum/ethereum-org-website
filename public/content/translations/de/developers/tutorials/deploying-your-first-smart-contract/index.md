---
title: Bereitstellung deines ersten Smart Contracts
description: "Eine Einführung in die Bereitstellung deines ersten Smart Contracts in einem Ethereum-Testnetzwerk"
author: "jdourlens"
tags: ["Smart Contracts", "Remix", "Solidity", "Bereitstellung"]
skill: beginner
breadcrumb: Ersten Vertrag bereitstellen
lang: de
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ich nehme an, du bist genauso aufgeregt wie wir, deinen ersten [Smart Contract](/developers/docs/smart-contracts/) auf der Ethereum-Blockchain [bereitzustellen](/developers/docs/smart-contracts/deploying/) und mit ihm zu interagieren.

Keine Sorge, da es unser erster Smart Contract ist, werden wir ihn in einem [lokalen Testnetzwerk](/developers/docs/networks/) bereitstellen, sodass die Bereitstellung für dich kostenlos ist und du so viel damit herumspielen kannst, wie du möchtest.

## Unseren Vertrag schreiben {#writing-our-contract}

Der erste Schritt besteht darin, [Remix zu besuchen](https://remix.ethereum.org/) und eine neue Datei zu erstellen. Füge im oberen linken Teil der Remix-Benutzeroberfläche eine neue Datei hinzu und gib den gewünschten Dateinamen ein.

![Hinzufügen einer neuen Datei in der Remix-Benutzeroberfläche](./remix.png)

In die neue Datei fügen wir den folgenden Code ein.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Öffentliche Variable vom Typ unsigned int, um die Anzahl der Zählungen zu speichern
    uint256 public count = 0;

    // Funktion, die unseren Zähler inkrementiert
    function increment() public {
        count += 1;
    }

    // Nicht notwendiger Getter, um den Zählerwert abzurufen
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Wenn du an das Programmieren gewöhnt bist, kannst du leicht erraten, was dieses Programm macht. Hier ist eine zeilenweise Erklärung:

- Zeile 4: Wir definieren einen Vertrag mit dem Namen `Counter`.
- Zeile 7: Unser Vertrag speichert eine vorzeichenlose Ganzzahl (unsigned integer) namens `count`, die bei 0 beginnt.
- Zeile 10: Die erste Funktion ändert den Zustand des Vertrags und erhöht (`increment()`) unsere Variable `count`.
- Zeile 15: Die zweite Funktion ist nur ein Getter, um den Wert der Variablen `count` außerhalb des Smart Contracts lesen zu können. Beachte, dass dies nicht zwingend erforderlich ist, da wir unsere Variable `count` als öffentlich (public) definiert haben, aber es wird hier als Beispiel gezeigt.

Das ist alles für unseren ersten einfachen Smart Contract. Wie du vielleicht weißt, sieht er aus wie eine Klasse aus OOP-Sprachen (objektorientierte Programmierung) wie Java oder C++. Es ist nun an der Zeit, mit unserem Vertrag zu spielen.

## Unseren Vertrag bereitstellen {#deploying-our-contract}

Da wir unseren allerersten Smart Contract geschrieben haben, werden wir ihn nun auf der Blockchain bereitstellen, um damit spielen zu können.

[Die Bereitstellung des Smart Contracts auf der Blockchain](/developers/docs/smart-contracts/deploying/) ist eigentlich nur das Senden einer Transaktion, die den Code des kompilierten Smart Contracts enthält, ohne einen Empfänger anzugeben.

Wir werden zuerst [den Vertrag kompilieren](/developers/docs/smart-contracts/compiling/), indem wir auf das Kompilieren-Symbol auf der linken Seite klicken:

![Das Kompilieren-Symbol in der Remix-Symbolleiste](./remix-compile-button.png)

Klicke dann auf die Schaltfläche „Kompilieren“ (Compile):

![Die Schaltfläche „Kompilieren“ im Remix-Solidity-Compiler](./remix-compile.png)

Du kannst die Option „Auto compile“ auswählen, damit der Vertrag immer kompiliert wird, wenn du den Inhalt im Texteditor speicherst.

Navigiere dann zum Bildschirm „Deploy and run transactions“ (Transaktionen bereitstellen und ausführen):

![Das Bereitstellen-Symbol in der Remix-Symbolleiste](./remix-deploy.png)

Sobald du dich auf dem Bildschirm „Deploy and run transactions“ befindest, überprüfe noch einmal, ob der Name deines Vertrags angezeigt wird, und klicke auf „Deploy“ (Bereitstellen). Wie du oben auf der Seite sehen kannst, ist die aktuelle Umgebung „JavaScript VM“. Das bedeutet, dass wir unseren Smart Contract auf einer lokalen Test-Blockchain bereitstellen und mit ihm interagieren werden, um schneller und ohne Gebühren testen zu können.

![Die Schaltfläche „Bereitstellen“ im Remix-Solidity-Compiler](./remix-deploy-button.png)

Sobald du auf die Schaltfläche „Deploy“ geklickt hast, wird dein Vertrag unten angezeigt. Klicke auf den Pfeil auf der linken Seite, um ihn zu erweitern, damit wir den Inhalt unseres Vertrags sehen können. Dies sind unsere Variable `counter`, unsere Funktion `increment()` und der Getter `getCounter()`.

Wenn du auf die Schaltfläche `count` oder `getCount` klickst, wird der Inhalt der Variablen `count` des Vertrags abgerufen und angezeigt. Da wir die Funktion `increment` noch nicht aufgerufen haben, sollte 0 angezeigt werden.

![Die Funktionsschaltfläche im Remix-Solidity-Compiler](./remix-function-button.png)

Lass uns nun die Funktion `increment` aufrufen, indem wir auf die Schaltfläche klicken. Du wirst sehen, dass unten im Fenster Protokolle (Logs) der durchgeführten Transaktionen erscheinen. Du wirst feststellen, dass die Protokolle anders aussehen, wenn du die Schaltfläche zum Abrufen der Daten drückst, anstatt der Schaltfläche `increment`. Das liegt daran, dass das Lesen von Daten auf der Blockchain keine Transaktionen (Schreiben) oder Gebühren erfordert. Denn nur das Ändern des Zustands der Blockchain erfordert die Durchführung einer Transaktion:

![Ein Protokoll von Transaktionen](./transaction-log.png)

Nach dem Drücken der Schaltfläche „increment“, die eine Transaktion zum Aufruf unserer Funktion `increment()` generiert, können wir, wenn wir wieder auf die Schaltflächen „count“ oder „getCount“ klicken, den neu aktualisierten Zustand unseres Smart Contracts lesen, wobei die Variable „count“ größer als 0 ist.

![Neu aktualisierter Zustand des Smart Contracts](./updated-state.png)

Im nächsten Tutorial werden wir behandeln, [wie du Ereignisse zu deinen Smart Contracts hinzufügen kannst](/developers/tutorials/logging-events-smart-contracts/). Das Protokollieren von Ereignissen (Logging Events) ist eine bequeme Möglichkeit, deinen Smart Contract zu debuggen und zu verstehen, was beim Aufruf einer Funktion passiert.