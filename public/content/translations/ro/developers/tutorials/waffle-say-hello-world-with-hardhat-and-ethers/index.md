---
title: "Waffle spune „Salut, lume”; tutorial cu Hardhat și eteri"
description: Realizează primul tău proiect Waffle cu hardhat și ethers.js
author: "MiZiet"
tags:
  - "waffle"
  - "contracte inteligente"
  - "solidity"
  - "testare"
  - "hardhat"
  - "ethers.js"
skill: beginner
lang: ro
published: 2020-10-16
---

În acest tutorial [Waffle](https://ethereum-waffle.readthedocs.io) veți învăța cum să configurați un proiect de contract inteligent simplu „Hello world”, utilizând [hardhat](https://hardhat.org/) și [ethers.js](https://docs.ethers.io/v5/). Apoi veți învăța cum să adăugați o nouă funcționalitate la contractul dvs. inteligent și cum să îl testați cu Waffle.

Să începem creând un nou proiect:

```bash
yarn init
```

sau

```bash
npm init
```

și instalând pachetele necesare:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

sau

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Următorul pas este crearea unui exemplu de proiect hardhat executând `npx hardhat`.

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

Selectați `Crearea unui exemplu de proiect`

Structura proiectului nostru ar trebui să fie:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributs
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Acum să vorbim despre unele dintre aceste fișiere: {#now-lets-talk}

- Greeter.sol - contractul nostru inteligent scris în solidity;

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

Contractul nostru inteligent poate fi împărțit în trei:

1. „constructor” - unde declarăm o variabilă de tip string numită `greeting`,
2. funcția „greet” -o funcție care va returna `greeting` atunci când este apelată,
3. funcția „setGreeting” - o funcție care ne permite să schimbăm valoarea `greeting`.

- sample-test.js - fișierul nostru de teste

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

### La pasul următor ne vom compila contractul și vom rula testele: {#compiling-and-testing}

Testele Waffle folosesc Mocha (un framework de testare) cu Chai (o bibliotecă de afirmații). Trebuie doar să rulați `testul npx hardhat` și să așteptați să apară următorul mesaj.

```bash
✓ Should return the new greeting once it's changed
```

### Lucrurile merg grozav până acum, haideți să facem proiectul puțin mai complex<Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Imaginați-vă cum ar fi ca cineva să adauge un string gol ca salut. Nu ar fi un salut călduros, nu?  
Să avem grijă ca acest lucru să nu se întâmple:

Atunci când cineva transmite un string gol, trebuie să folosim funcția solidity `revert`. Este bine că putem testa cu ușurință această funcționalitate cu validatorul-matcher chai `to.be.revertedWith()` al lui Waffle.

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

Se pare că nu a mers noul nostru test:

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

Să implementăm această funcționalitate în contractul nostru inteligent:

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

Acum funcția noastră „setGreeting” arată astfel:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Să rulăm din nou testele:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Felicitări! Ați reușit :)

### Concluzie {#conclusion}

Am făcut un proiect simplu cu Waffle, Hardhat și ethers.js. Am învățat cum să configurăm un proiect, să adăugăm un test și să implementăm noi funcționalități.

Dacă doriți să vă testați contractele inteligente și cu alți validatori-matchers chai excelenți, consultați [documentele oficiale Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
