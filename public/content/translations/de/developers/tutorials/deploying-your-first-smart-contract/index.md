---
title: Deinen ersten Smart Contract bereitstellen
description: Eine Einführung in die Bereitstellung deines ersten Smart Contracts in einem Ethereum-Testnetzwerk
author: "jdourlens"
tags:
  [
    "intelligente Verträge",
    "remix",
    "solidity",
    "Bereitstellung"
  ]
skill: beginner
lang: de
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ich nehme an, du bist genauso aufgeregt wie wir, deinen ersten [Smart Contract](/developers/docs/smart-contracts/) auf der Ethereum-Blockchain [bereitzustellen](/developers/docs/smart-contracts/deploying/) und mit ihm zu interagieren.

Keine Sorge, da dies unser erster Smart Contract ist, werden wir ihn in einem [lokalen Testnetzwerk](/developers/docs/networks/) bereitstellen, sodass es dich nichts kostet, ihn bereitzustellen und so viel damit zu spielen, wie du möchtest.

## Schreiben unseres Vertrags {#writing-our-contract}

Der erste Schritt ist, [Remix zu besuchen](https://remix.ethereum.org/) und eine neue Datei zu erstellen. Füge im oberen linken Teil der Remix-Benutzeroberfläche eine neue Datei hinzu und gib den gewünschten Dateinamen ein.

![Hinzufügen einer neuen Datei in der Remix-Benutzeroberfläche](./remix.png)

In die neue Datei fügen wir den folgenden Code ein.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Öffentliche Variable vom Typ vorzeichenlose Ganzzahl, um die Anzahl der Zählvorgänge zu speichern
    uint256 public count = 0;

    // Funktion, die unseren Zähler erhöht
    function increment() public {
        count += 1;
    }

    // Nicht notwendiger Getter, um den Zählwert zu erhalten
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Wenn du mit dem Programmieren vertraut bist, kannst du leicht erraten, was dieses Programm tut. Hier ist eine Erklärung, Zeile für Zeile:

- Zeile 4: Wir definieren einen Vertrag mit dem Namen `Counter`.
- Zeile 7: Unser Vertrag speichert eine vorzeichenlose Ganzzahl namens `count`, die bei 0 beginnt.
- Zeile 10: Die erste Funktion ändert den Zustand des Vertrags und erhöht (`increment()`) unsere Variable `count`.
- Zeile 15: Die zweite Funktion ist nur ein Getter, um den Wert der Variable `count` außerhalb des Smart Contracts auslesen zu können. Beachte, dass dies nicht notwendig ist, da wir unsere `count`-Variable als öffentlich (public) definiert haben, sondern nur als Beispiel dient.

Das ist alles für unseren ersten einfachen Smart Contract. Wie du vielleicht weißt, sieht es aus wie eine Klasse aus OOP-Sprachen (objektorientierte Programmierung) wie Java oder C++. Jetzt ist es an der Zeit, mit unserem Vertrag zu spielen.

## Bereitstellung unseres Vertrags {#deploying-our-contract}

Nachdem wir unseren allerersten Smart Contract geschrieben haben, werden wir ihn nun in der Blockchain bereitstellen, um damit spielen zu können.

[Die Bereitstellung des Smart Contracts in der Blockchain](/developers/docs/smart-contracts/deploying/) ist eigentlich nur das Senden einer Transaktion, die den Code des kompilierten Smart Contracts enthält, ohne einen Empfänger anzugeben.

Zuerst [kompilieren wir den Vertrag](/developers/docs/smart-contracts/compiling/), indem wir auf das Kompilieren-Symbol auf der linken Seite klicken:

![Das Kompilieren-Symbol in der Remix-Symbolleiste](./remix-compile-button.png)

Klicke dann auf die Schaltfläche „Kompilieren“:

![Die Schaltfläche „Kompilieren“ im Remix-Solidity-Compiler](./remix-compile.png)

Du kannst die Option „Auto compile“ wählen, damit der Vertrag immer kompiliert wird, wenn du den Inhalt im Texteditor speicherst.

Navigiere dann zum Bildschirm „Deploy and run transactions“:

![Das Bereitstellungssymbol in der Remix-Symbolleiste](./remix-deploy.png)

Sobald du auf dem Bildschirm „Deploy and run transactions“ bist, überprüfe, ob dein Vertragsname erscheint, und klicke auf „Deploy“. Wie du oben auf der Seite sehen kannst, ist die aktuelle Umgebung „JavaScript VM“. Das bedeutet, dass wir unseren Smart Contract in einer lokalen Test-Blockchain bereitstellen und mit ihm interagieren, um schneller und ohne Gebühren testen zu können.

![Die Schaltfläche „Deploy“ im Remix-Solidity-Compiler](./remix-deploy-button.png)

Sobald du auf die Schaltfläche „Deploy“ geklickt hast, siehst du deinen Vertrag unten erscheinen. Klicke auf den Pfeil links, um ihn zu erweitern, damit wir den Inhalt unseres Vertrags sehen. Das sind unsere Variable `counter`, unsere Funktion `increment()` und der Getter `getCounter()`.

Wenn du auf die Schaltfläche `count` oder `getCount` klickst, wird der Inhalt der `count`-Variable des Vertrags abgerufen und angezeigt. Da wir die Funktion `increment` noch nicht aufgerufen haben, sollte 0 angezeigt werden.

![Die Funktionsschaltfläche im Remix-Solidity-Compiler](./remix-function-button.png)

Rufen wir nun die Funktion `increment` auf, indem wir auf die Schaltfläche klicken. Du wirst am unteren Rand des Fensters die Protokolle der durchgeführten Transaktionen sehen. Du wirst sehen, dass die Protokolle anders aussehen, wenn du die Schaltfläche zum Abrufen der Daten anstelle der Schaltfläche `increment` drückst. Das liegt daran, dass das Lesen von Daten auf der Blockchain keine Transaktionen (Schreibvorgänge) oder Gebühren erfordert. Denn nur die Änderung des Zustands der Blockchain erfordert eine Transaktion:

![Ein Transaktionsprotokoll](./transaction-log.png)

Nachdem du die Schaltfläche `increment` gedrückt hast, die eine Transaktion zum Aufruf unserer `increment()`-Funktion generiert, lesen wir den neu aktualisierten Zustand unseres Smart Contracts, wenn wir wieder auf die Schaltflächen `count` oder `getCount` klicken, wobei die Variable `count` größer als 0 ist.

![Neu aktualisierter Zustand des Smart Contracts](./updated-state.png)

Im nächsten Tutorial befassen wir uns damit, [wie du Events zu deinen Smart Contracts hinzufügen kannst](/developers/tutorials/logging-events-smart-contracts/). Die Protokollierung von Events ist eine bequeme Möglichkeit, deinen Smart Contract zu debuggen und zu verstehen, was beim Aufruf einer Funktion passiert.
