---
title: "Návod na ukázkový Hello World s Waffle, hardhat a ethers"
description: "Vytvořte svůj první Waffle projekt s hardhat a ethers.js"
author: "MiZiet"
tags:
  [
    "waffle",
    "smart kontrakt účty",
    "solidity",
    "testování",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: cs
published: 2020-10-16
---

V tomto [Waffle](https://ethereum-waffle.readthedocs.io) tutoriálu se naučíme, jak nastavit jednoduchý projekt s chytrým kontraktem "Hello world" s použitím [hardhat](https://hardhat.org/) a [ethers.js](https://docs.ethers.io/v5/). Poté se naučíme, jak do našeho chytrého kontraktu přidat novou funkcionalitu a jak ji otestovat pomocí Waffle.

Začněme vytvořením nového projektu:

```bash
yarn init
```

nebo

```bash
npm init
```

a instalací požadovaných balíčků:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

nebo

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Dalším krokem je vytvoření ukázkového projektu hardhat spuštěním `npx hardhat`.

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

? What do you want to do? …
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

Vyberte `Create a sample project`

Struktura našeho projektu by měla vypadat takto:

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

### Pojďme se nyní podívat na některé z těchto souborů: {#now-lets-talk}

- Greeter.sol – náš chytrý kontrakt napsaný v Solidity;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Deploying a Greeter with greeting:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Náš chytrý kontrakt lze rozdělit na tři části:

1. konstruktor – kde deklarujeme proměnnou typu string s názvem `greeting`,
2. funkce greet – funkce, která po zavolání vrátí `greeting`,
3. funkce setGreeting – funkce, která nám umožňuje změnit hodnotu `greeting`.

- sample-test.js – náš soubor s testy

```js
describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Další krok spočívá v kompilaci našeho kontraktu a spuštění testů: {#compiling-and-testing}

Waffle testy používají Mocha (testovací framework) s Chai (knihovna asercí). Vše, co musíte udělat, je spustit `npx hardhat test` a počkat, až se objeví následující zpráva.

```bash
✓ Should return the new greeting once it's changed
```

### Zatím to vypadá skvěle, pojďme do projektu přidat trochu na složitosti <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Představte si situaci, kde někdo vloží prázdný řetězec jako pozdrav. To by nebyl moc vřelý pozdrav, že?  
Postarejme se, aby se to nestalo:

Chceme použít funkci `revert` ze Solidity, když někdo předá prázdný řetězec. Dobrou zprávou je, že tuto funkcionalitu můžeme snadno otestovat pomocí Waffle chai matcheru `to.be.revertedWith()`.

```js
it("Should revert when passing an empty string", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Greeting should not be empty"
  )
})
```

Vypadá to, že náš nový test neprošel:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Should revert when passing an empty string


  1 passing (2s)
  1 failing
```

Pojďme tuto funkcionalitu implementovat do našeho chytrého kontraktu:

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

Nyní naše funkce setGreeting vypadá takto:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Pojďme znovu spustit testy:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Výborně! Dali jste to! :)

### Závěr {#conclusion}

Vytvořili jsme jednoduchý projekt s Waffle, Hardhat a ethers.js. Naučili jsme se, jak nastavit projekt, přidat test a implementovat novou funkcionalitu.

Pro více skvělých chai matcherů k testování vašich chytrých kontraktů se podívejte do [oficiální dokumentace Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
