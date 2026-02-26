---
title: Testen eines einfachen Smart Contracts mit der Waffle-Bibliothek
description: "Tutorial für Anfänger"
author: Ewa Kowalska
tags:
  [
    "intelligente Verträge",
    "solidity",
    "Waffle",
    "testen"
  ]
skill: beginner
lang: de
published: 2021-02-26
---

## In diesem Tutorial lernen Sie, wie Sie {#in-this-tutorial-youll-learn-how-to}

- Die Änderungen des Wallet-Guthabens testen
- Die Emission von Ereignissen mit bestimmten Argumenten testen
- Sicherstellen, dass eine Transaktion rückgängig gemacht wurde

## Annahmen {#assumptions}

- Sie können ein neues JavaScript- oder TypeScript-Projekt erstellen
- Sie haben bereits grundlegende Erfahrung mit Tests in JavaScript
- Sie haben bereits Paketmanager wie yarn oder npm verwendet
- Sie besitzen Grundkenntnisse über Smart Contracts und Solidity

## Erste Schritte {#getting-started}

Das Tutorial demonstriert die Testeinrichtung und -ausführung mit yarn, aber es ist kein Problem, wenn Sie npm bevorzugen – ich werde entsprechende Verweise auf die offizielle Waffle-[Dokumentation](https://ethereum-waffle.readthedocs.io/en/latest/index.html) bereitstellen.

## Abhängigkeiten installieren {#install-dependencies}

[Fügen Sie](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) die Abhängigkeiten von ethereum-waffle und typescript zu den dev-Abhängigkeiten Ihres Projekts hinzu.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Beispiel für einen Smart Contract {#example-smart-contract}

Während des Tutorials werden wir an einem einfachen Smart-Contract-Beispiel arbeiten – EtherSplitter. Er tut nicht viel, außer jedem zu erlauben, einige Wei zu senden und sie gleichmäßig zwischen zwei vordefinierten Empfängern aufzuteilen.
Die split-Funktion erfordert, dass die Anzahl der Wei gerade ist, andernfalls wird sie rückgängig gemacht. Für beide Empfänger wird eine Wei-Überweisung durchgeführt, gefolgt von der Emission des Transfer-Ereignisses.

Platzieren Sie den EtherSplitter-Codeausschnitt in `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Den Vertrag kompilieren {#compile-the-contract}

Um den Vertrag zu [kompilieren](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract), fügen Sie den folgenden Eintrag in die Datei package.json ein:

```json
"scripts": {
    "build": "waffle"
  }
```

Als Nächstes erstellen Sie die Waffle-Konfigurationsdatei `waffle.json` im Stammverzeichnis des Projekts und fügen Sie dann die folgende Konfiguration dort ein:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Führen Sie `yarn build` aus. Als Ergebnis wird das `build`-Verzeichnis mit dem kompilierten EtherSplitter-Vertrag im JSON-Format angezeigt.

## Test-Setup {#test-setup}

Das Testen mit Waffle erfordert die Verwendung von Chai-Matchern und Mocha, daher müssen Sie diese zu Ihrem Projekt [hinzufügen](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests). Aktualisieren Sie Ihre package.json-Datei und fügen Sie den `test`-Eintrag im scripts-Teil hinzu:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Wenn Sie Ihre Tests [ausführen](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) möchten, führen Sie einfach `yarn test` aus.

## Tests {#testing}

Erstellen Sie nun das `test`-Verzeichnis und die neue Datei `test\EtherSplitter.test.ts`.
Kopieren Sie den folgenden Schnipsel und fügen Sie ihn in unsere Testdatei ein.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether-Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // Fügen Sie die Tests hier hinzu
})
```

Ein paar Worte, bevor wir anfangen.
Der `MockProvider` stellt eine Mock-Version der Blockchain bereit. Er liefert auch Mock-Wallets, die uns zum Testen des EtherSplitter-Vertrags dienen werden. Wir können bis zu zehn Wallets erhalten, indem wir die Methode `getWallets()` auf dem Provider aufrufen. Im Beispiel erhalten wir drei Wallets – für den Absender und für zwei Empfänger.

Als Nächstes deklarieren wir eine Variable namens „splitter“ – dies ist unser Mock-EtherSplitter-Vertrag. Er wird vor jeder Ausführung eines einzelnen Tests durch die Methode `deployContract` erstellt. Diese Methode simuliert die Bereitstellung eines Vertrags aus der als ersten Parameter übergebenen Wallet (in unserem Fall die Wallet des Absenders). Der zweite Parameter ist das ABI und der Bytecode des getesteten Vertrags – wir übergeben dort die JSON-Datei des kompilierten EtherSplitter-Vertrags aus dem `build`-Verzeichnis. Der dritte Parameter ist ein Array mit den Konstruktorargumenten des Vertrags, die in unserem Fall die beiden Adressen der Empfänger sind.

## changeBalances {#changebalances}

Zuerst werden wir prüfen, ob die split-Methode die Guthaben der Empfänger-Wallets tatsächlich ändert. Wenn wir 50 Wei vom Konto des Absenders aufteilen, würden wir erwarten, dass die Guthaben beider Empfänger um 25 Wei ansteigen. Wir werden den `changeBalances`-Matcher von Waffle verwenden:

```ts
it("Ändert die Kontostände", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Als ersten Parameter des Matchers übergeben wir ein Array der Wallets der Empfänger und als zweiten ein Array der erwarteten Zuwächse auf den entsprechenden Konten.
Wenn wir das Guthaben einer bestimmten Wallet überprüfen wollten, könnten wir auch den `changeBalance`-Matcher verwenden, der keine Übergabe von Arrays erfordert, wie im folgenden Beispiel:

```ts
it("Ändert den Kontostand", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Beachten Sie, dass wir in beiden Fällen von `changeBalance` und `changeBalances` die split-Funktion als Callback übergeben, da der Matcher vor und nach dem Aufruf auf den Zustand der Guthaben zugreifen muss.

Als Nächstes testen wir, ob das Transfer-Ereignis nach jeder Überweisung von Wei emittiert wurde. Wir werden uns einem anderen Matcher von Waffle zuwenden:

## Emit {#emit}

```ts
it("Emittiert ein Ereignis bei der Überweisung an den ersten Empfänger", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emittiert ein Ereignis bei der Überweisung an den zweiten Empfänger", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Der `emit`-Matcher ermöglicht es uns zu prüfen, ob ein Vertrag beim Aufruf einer Methode ein Ereignis emittiert hat. Als Parameter für den `emit`-Matcher geben wir den Mock-Vertrag, von dem wir erwarten, dass er das Ereignis emittiert, zusammen mit dem Namen dieses Ereignisses an. In unserem Fall ist der Mock-Vertrag `splitter` und der Name des Ereignisses `Transfer`. Wir können auch die genauen Werte der Argumente überprüfen, mit denen das Ereignis emittiert wurde – wir übergeben so viele Argumente an den `withArgs`-Matcher, wie unsere Ereignisdeklaration erwartet. Im Fall des EtherSplitter-Vertrags übergeben wir die Adressen des Absenders und des Empfängers zusammen mit dem überwiesenen Wei-Betrag.

## revertedWith {#revertedwith}

Als letztes Beispiel werden wir prüfen, ob die Transaktion bei einer ungeraden Anzahl von Wei rückgängig gemacht wurde. Wir verwenden den `revertedWith`-Matcher:

```ts
it("Wird bei ungeradem Wei-Betrag rückgängig gemacht", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Der Test, wenn er bestanden wird, stellt sicher, dass die Transaktion tatsächlich rückgängig gemacht wurde. Es muss jedoch auch eine exakte Übereinstimmung zwischen den Nachrichten geben, die wir in der `require`-Anweisung übergeben haben, und der Nachricht, die wir in `revertedWith` erwarten. Wenn wir zum Code des EtherSplitter-Vertrags zurückgehen, geben wir in der `require`-Anweisung für den Wei-Betrag die Nachricht an: 'Uneven wei amount not allowed'. Dies entspricht der Nachricht, die wir in unserem Test erwarten. Wären sie nicht gleich, würde der Test fehlschlagen.

## Herzlichen Glückwunsch! {#congratulations}

Sie haben Ihren ersten großen Schritt zum Testen von Smart Contracts mit Waffle gemacht!
