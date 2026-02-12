---
title: "Guida 'Hello World' di Waffle con Hardhat ed ethers"
description: Crea il tuo primo progetto Waffle con Hardhat ed ethers.js
author: "MiZiet"
tags:
  [
    "waffle",
    "smart contract",
    "Solidity",
    "test",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: it
published: 2020-10-16
---

In questa guida di [Waffle](https://ethereum-waffle.readthedocs.io), impareremo a impostare un semplice progetto di contratto intelligente "Hello world", utilizzando [Hardhat](https://hardhat.org/) ed [ethers.js](https://docs.ethers.io/v5/). Poi, impareremo come aggiungere una nuova funzionalità al nostro contratto intelligente e come testarla con Waffle.

Iniziamo creando un nuovo progetto:

```bash
yarn init
```

o

```bash
npm init
```

e installando i pacchetti necessari:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

o

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Il passo successivo è creare un progetto Hardhat di esempio eseguendo `npx hardhat`.

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

Seleziona `Create a sample project`

La struttura del nostro progetto dovrebbe apparire così:

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

### Ora parliamo di alcuni di questi file: {#now-lets-talk}

- Greeter.sol - il nostro contratto intelligente scritto in Solidity;

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

Il nostro contratto intelligente può essere diviso in tre parti:

1. constructor - dove dichiariamo una variabile di tipo stringa chiamata `greeting`,
2. funzione greet - una funzione che restituirà `greeting` quando chiamata,
3. funzione setGreeting - una funzione che ci permette di cambiare il valore di `greeting`.

- sample-test.js - il nostro file dei test

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

### Il passo successivo consiste nel compilare il nostro contratto ed eseguire i test: {#compiling-and-testing}

I test di Waffle usano Mocha (un framework di test) con Chai (una libreria di asserzioni). Tutto ciò che devi fare è eseguire `npx hardhat test` e attendere che appaia il seguente messaggio.

```bash
✓ Should return the new greeting once it's changed
```

### Finora tutto sembra ottimo, aggiungiamo un po' di complessità al nostro progetto <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Immagina una situazione in cui qualcuno aggiunge una stringa vuota come saluto. Non sarebbe un saluto molto caloroso, giusto?  
Assicuriamoci che non accada:

Vogliamo usare `revert` di Solidity quando qualcuno passa una stringa vuota. L'aspetto positivo è che possiamo testare facilmente questa funzionalità con il matcher chai di Waffle `to.be.revertedWith()`.

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

Sembra che il nostro nuovo test non sia passato:

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

Implementiamo questa funzionalità nel nostro contratto intelligente:

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

Ora la nostra funzione setGreeting ha questo aspetto:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Eseguiamo di nuovo i test:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Congratulazioni! Ce l'hai fatta :)

### Conclusione {#conclusion}

Abbiamo realizzato un semplice progetto con Waffle, Hardhat ed ethers.js. Abbiamo imparato a impostare un progetto, aggiungere un test e implementare nuove funzionalità.

Per altri fantastici matcher di Chai per testare i tuoi contratti intelligenti, consulta la [documentazione ufficiale di Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
