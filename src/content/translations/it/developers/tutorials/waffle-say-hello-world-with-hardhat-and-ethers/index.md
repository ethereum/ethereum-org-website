---
title: "Tutorial Waffle Hello world con hardhat ed ethers"
description: Crea il tuo primo progetto Waffle con hardhat ed ethers.js
author: "MiZiet"
tags:
  - "waffle"
  - "smart contract"
  - "Solidity"
  - "test"
  - "hardhat"
  - "ethers.js"
skill: beginner
lang: it
published: 2020-10-16
---

In questo tutorial di [Waffle](https://ethereum-waffle.readthedocs.io), impareremo come configurare un semplice progetto di smart contract "Hello World" usando [hardhat](https://hardhat.org/) e [ethers.js](https://docs.ethers.io/v5/). Quindi impareremo come aggiungere una nuova funzionalità allo smart contract e come testarla con Waffle.

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

Il prossimo passaggio consiste nel creare un progetto hardhat di esempio eseguendo `npx hardhat`.

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

La struttura del nostro progetto sarà simile a:

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

### Ora parliamo di alcuni di questi file: {#now-lets-talk}

- Greeter.sol - il nostro Smart Contract scritto in Solidity;

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

Il nostro smart contract è divisibile in tre parti:

1. costruttore - posizione in cui dichiariamo una variabile di tipo di stringa chiamata `greeting`,
2. funzione greet - funzione che restituirà `greeting` quando chiamata,
3. funzione setGreeting - funzione che ci consente di cambiare il valore di `greeting`.

- sample-test.js - file per il test

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

### Il prossimo passaggio consiste nel compilare il contratto ed eseguire test: {#compiling-and-testing}

I test di Waffle usano Mocha (un framework di test) con Chai (una libreria di asserzione). È sufficiente eseguire `npx hardhat test` e attendere che compaia il messaggio seguente.

```bash
✓ Should return the new greeting once it's changed
```

### Finora tutto bene, adesso aggiungiamo un po' di complessità al nostro progetto <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Immagina una situazione in cui qualcuno aggiunge una stringa vuota come formula di saluto. Non sarebbe un bel saluto, vero?  
Assicuriamoci che non succeda:

Vogliamo usare `revert` di Solidity quando qualcuno passa una stringa vuota. Un aspetto positivo è che possiamo facilmente testare questa funzionalità con il matcher chai di Waffle `to.be.revertedWith()`.

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

Sembra che il nostro nuovo test non sia riuscito:

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

Implementiamo questa funzionalità nel nostro smart contract:

```solidity
require(bytes(_greeting).length > 0, "Il saluto non dovrebbe esser vuoto");
```

Ora, la nostra funzione setGreeting somiglia a:

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

### Conclusioni {#conclusion}

Abbiamo realizzato un semplice progetto con Waffle, Hardhat ed ethers.js. Abbiamo imparato come configurare un progetto, aggiungere un test e implementare nuove funzionalità.

Per informazioni su altri utili matcher chai per testare gli smart contract, consulta la [documentazione ufficiale di Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
