---
title: "Tutoriel Waffle « Hello world » avec Hardhat et Ethers"
description: "Réalisez votre premier projet Waffle avec Hardhat et ethers.js"
author: "MiZiet"
tags:
  [
    "Waffle",
    "contrats intelligents",
    "Solidity",
    "test",
    "Hardhat",
    "ethers.js"
  ]
skill: beginner
lang: fr
published: 2020-10-16
---

Dans ce tutoriel [Waffle](https://ethereum-waffle.readthedocs.io), nous apprendrons à configurer un projet simple de contrat intelligent « Hello world », en utilisant [Hardhat](https://hardhat.org/) et [ethers.js](https://docs.ethers.io/v5/). Ensuite, nous apprendrons comment ajouter une nouvelle fonctionnalité à notre contrat intelligent et comment la tester avec Waffle.

Commençons par créer un nouveau projet :

```bash
yarn init
```

ou

```bash
npm init
```

et installez les paquets requis :

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

ou

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

L'étape suivante consiste à créer un projet d'exemple Hardhat en exécutant `npx hardhat`.

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

Sélectionnez `Create a sample project`

La structure de notre projet devrait ressembler à ceci :

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

### Parlons maintenant de certains de ces fichiers : {#now-lets-talk}

- Greeter.sol - notre contrat intelligent écrit en Solidity ;

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

Notre contrat intelligent peut être divisé en trois parties :

1. constructeur - où nous déclarons une variable de type `string` appelée `greeting`,
2. fonction `greet` - une fonction qui renverra la valeur `greeting` lorsqu'elle est appelée,
3. fonction `setGreeting` - une fonction qui nous permet de modifier la valeur de `greeting`.

- sample-test.js - notre fichier de tests

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

### L'étape suivante consiste à compiler notre contrat et à exécuter les tests : {#compiling-and-testing}

Les tests Waffle utilisent Mocha (un framework de test) avec Chai (une bibliothèque d'assertions). Il vous suffit d'exécuter `npx hardhat test` et d'attendre que le message suivant s'affiche.

```bash
✓ Should return the new greeting once it's changed
```

### Tout semble parfait jusqu'à présent. Ajoutons un peu de complexité à notre projet <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Imaginez que quelqu'un ajoute une chaîne vide en guise de salut. Ce ne serait pas un salut très chaleureux, n'est-ce pas ?  
Assurons-nous que cela ne se produise pas :

Nous voulons utiliser la fonction `revert` de Solidity lorsque quelqu'un transmet une chaîne de caractères vide. Heureusement, nous pouvons facilement tester cette fonctionnalité avec le matcher Chai de Waffle `to.be.revertedWith()`.

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

Il semblerait que notre nouveau test n'ait pas réussi :

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

Implémentons cette fonctionnalité dans notre contrat intelligent :

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

Maintenant, notre fonction `setGreeting` ressemble à ceci :

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Exécutons les tests à nouveau :

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Félicitations ! Vous y êtes arrivé :)

### Conclusion {#conclusion}

Nous avons réalisé un projet simple avec Waffle, Hardhat et ethers.js. Nous avons appris à configurer un projet, à ajouter un test et à implémenter de nouvelles fonctionnalités.

Pour découvrir d'autres matchers Chai très utiles pour tester vos contrats intelligents, consultez la [documentation officielle de Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
