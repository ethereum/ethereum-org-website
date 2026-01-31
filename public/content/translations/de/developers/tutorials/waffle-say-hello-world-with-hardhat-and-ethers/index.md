---
title: "Waffle „Hallo Welt“-Tutorial mit Hardhat und Ethers"
description: Erstelle dein erstes Waffle-Projekt mit Hardhat und ethers.js
author: "MiZiet"
tags:
  [
    "Waffle",
    "intelligente Verträge",
    "solidity",
    "testen",
    "Hardhat",
    "ethers.js"
  ]
skill: beginner
lang: de
published: 16.10.2020
---

In diesem [Waffle](https://ethereum-waffle.readthedocs.io)-Tutorial lernen wir, wie man ein einfaches „Hallo Welt“-Smart-Contract-Projekt mit [Hardhat](https://hardhat.org/) und [ethers.js](https://docs.ethers.io/v5/) einrichtet. Dann werden wir lernen, wie wir eine neue Funktionalität zu unserem Smart Contract hinzufügen und wie wir sie mit Waffle testen können.

Beginnen wir mit der Erstellung eines neuen Projekts:

```bash
yarn init
```

oder

```bash
npm init
```

und die Installation der erforderlichen Pakete:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

oder

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Der nächste Schritt ist die Erstellung eines Hardhat-Beispielprojekts durch Ausführen von `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.3 👷‍

? Was möchtest du tun? …
❯ Ein Beispielprojekt erstellen
Eine leere hardhat.config.js erstellen
Beenden
```

Wähle `Create a sample project` aus

Die Struktur unseres Projekts sollte so aussehen:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Sprechen wir nun über einige dieser Dateien: {#now-lets-talk}

- Greeter.sol – unser in Solidity geschriebener Smart Contract;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Greeter wird mit Begrüßung bereitgestellt:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Ändere Begrüßung von '%s' zu '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Unser Smart Contract kann in drei Teile unterteilt werden:

1. Konstruktor – hier deklarieren wir eine String-Variable namens `greeting`,
2. Funktion greet – eine Funktion, die bei Aufruf `greeting` zurückgibt,
3. Funktion setGreeting – eine Funktion, mit der wir den `greeting`-Wert ändern können.

- sample-test.js – unsere Testdatei

```js
describe("Greeter", function () {
  it("Sollte die neue Begrüßung zurückgeben, sobald sie geändert wurde", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hallo, Welt!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hallo, Welt!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Der nächste Schritt besteht darin, unseren Smart Contract zu kompilieren und Tests auszuführen: {#compiling-and-testing}

Waffle-Tests verwenden Mocha (ein Test-Framework) mit Chai (einer Assertions-Bibliothek). Du musst nur `npx hardhat test` ausführen und warten, bis die folgende Nachricht erscheint.

```bash
✓ Sollte die neue Begrüßung zurückgeben, sobald sie geändert wurde
```

### Bisher sieht alles super aus, lass uns unserem Projekt etwas mehr Komplexität verleihen <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Stell dir eine Situation vor, in der jemand eine leere Zeichenkette als Begrüßung einfügt. Das wäre keine herzliche Begrüßung, oder?  
Sorgen wir dafür, dass das nicht passiert:

Wir wollen `revert` von Solidity verwenden, wenn jemand eine leere Zeichenkette übergibt. Das Gute ist, dass wir diese Funktionalität einfach mit dem Chai-Matcher `to.be.revertedWith()` von Waffle testen können.

```js
it("Sollte bei Übergabe einer leeren Zeichenkette zurückgesetzt werden", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hallo, Welt!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Die Begrüßung darf nicht leer sein"
  )
})
```

Sieht so aus, als ob unser neuer Test nicht erfolgreich war:

```bash
Greeter wird mit Begrüßung bereitgestellt: Hallo, Welt!
Ändere Begrüßung von 'Hallo, Welt!' zu 'Hola, mundo!'
    ✓ Sollte die neue Begrüßung zurückgeben, sobald sie geändert wurde (1514ms)
Greeter wird mit Begrüßung bereitgestellt: Hallo, Welt!
Ändere Begrüßung von 'Hallo, Welt!' zu ''
    1) Sollte bei Übergabe einer leeren Zeichenkette zurückgesetzt werden


  1 bestanden (2s)
  1 fehlgeschlagen
```

Implementieren wir diese Funktionalität in unseren Smart Contract:

```solidity
require(bytes(_greeting).length > 0, "Die Begrüßung darf nicht leer sein");
```

Unsere setGreeting-Funktion sieht nun so aus:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Die Begrüßung darf nicht leer sein");
console.log("Ändere Begrüßung von '%s' zu '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Führen wir die Tests erneut aus:

```bash
✓ Sollte die neue Begrüßung zurückgeben, sobald sie geändert wurde (1467ms)
✓ Sollte bei Übergabe einer leeren Zeichenkette zurückgesetzt werden (276ms)

2 bestanden (2s)
```

Glückwunsch! Du hast es geschafft :)

### Fazit {#conclusion}

Wir haben ein einfaches Projekt mit Waffle, Hardhat und ethers.js erstellt. Wir haben gelernt, wie man ein Projekt einrichtet, einen Test hinzufügt und neue Funktionalität implementiert.

Weitere großartige Chai-Matcher zum Testen deiner Smart Contracts findest du in der [offiziellen Waffle-Dokumentation](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
