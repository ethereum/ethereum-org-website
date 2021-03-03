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
skill: de bază
lang: ro
sidebar: true
published: 2020-10-16
---

### În acest tutorial [Waffle](https://ethereum-waffle.readthedocs.io), vei învăța cum să configurezi un proiect simplu de contract inteligent „Salut, lume”, utilizând [hardhat](https://hardhat.org/) și [ethers.js](https://docs.ethers.io/v5/). Apoi vei învăța cum să adaugi o nouă funcționalitate la contractul tău inteligent și cum să-l testezi cu Waffle.

Să începem cu crearea unui nou proiect:

```bash
yarn init
```

sau

```bash
npm init
```

și instalează pachetele necesare:

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

👷 Bun venit la Hardhat v2.0.3 👷‍

? What do you want to do ? (Ce vrei să faci?) …
Create a sample project (Să creez un exemplu de proiect)
Create an empty hardhat.config.js
Quit
```

Selectează `Creează un exemplu de proiect`

Structura proiectelor noastre ar trebui să arate astfel:

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

### Acum să vorbim despre unele dintre aceste fișiere:

- Greeter.sol - contractul nostru inteligent scris în solidity;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Implementare program Greeter cu salutări:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Schimbare salut din '%s' în '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Contractul nostru inteligent poate fi împărțit în trei părți:

1. „constructor” - unde declarăm o variabilă de tip string numită `greeting`,
2. funcția „greet” -o funcție care va returna `greeting` atunci când este apelată,
3. funcția „setGreeting” - o funcție care ne permite să schimbăm valoarea `greeting`.

- sample-test.js - fișierul nostru de teste

```js
describe("Greeter", function () {
  it("Trebuie să returneze noul mesaj de salut odată ce a fost schimbat", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Salut, lume!")
    expect(await greeter.greet()).to.equal("Salut, lume!")
  })
})
```

### Pasul următor constă în compilarea contractelor și a testelor de execuție:

Testele Waffle folosesc Mocha (un cadru de testare) cu Chai (o bibliotecă de afirmații). Tot ce trebuie să faci este să rulezi `npx hardhat test` și să aștepți să apară următorul mesaj.

```bash
✓ Trebuie să returneze noul mesaj de salut odată ce a fost schimbat
```

### Totul arată bine până acum, hai să adăugăm ceva mai multă complexitate proiectului nostru :)

Imaginează-ți o situație când cineva adaugă un string gol ca salut. Nu ar fi un salut călduros, nu?  
Să ne asigurăm că acest lucru nu se întâmplă:

Vrem să folosim funcția solidity `revert` atunci când cineva transmite un string gol. Un lucru bun este că putem testa cu ușurință această funcționalitate cu validatorul matcher chai `to.bo.revertedWith()` a lui Waffle..

```js
it("Trebuie să se schimbe când se transmite un string gol", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Salutul nu trebuie să rămână gol"
  )
})
```

Se pare că noul nostru test nu a trecut:

```bash
Implementarea unui Greeter cu salut: Hello, world!
Schimbarea salutului din „Hello, world!” în „Salut, lume!”
    ✓ Trebuie să returneze noul mesaj de salut odată ce a fost schimbat (1514 ms)
Implementarea unui Greeter cu salut: Salut, lume!
Schimbarea salutului din „Salut, lume!” în „
    1) Trebuie să se schimbe când se transmite un string gol


  1 transmitere (2 s)
  1 nereușită
```

Să implementăm această funcționalitate în contractul nostru inteligent:

```solidity
require(bytes(_greeting).length > 0, "Mesajul de salut este gol");
```

Acum, funcția noastră „setGreeting” arată astfel:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Salutul nu trebuie să fie gol");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Să rulăm din nou testele:

```bash
✓ Trebuie să returneze noul mesaj de salut odată ce a fost schimbat (1467 ms)
✓ Trebuie să se schimbe când se transmite un string gol (276 ms)

2 transmiteri (2 secunde)
```

Felicitări! Ai reușit :)

### Concluzie

Am făcut un proiect simplu cu Waffle, Hardhat și ethers.js. Am învățat cum să configurăm un proiect, să adăugăm un test și să implementăm noi funcționalități.

Pentru mai mulți validatori matcher chai de mare valoare pentru testarea contractelor inteligente consultă [documentele oficiale Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
