---
title: "Mafunzo ya Waffle ya kusema hello world kwa kutumia hardhat na ethers"
description: Tengeneza mradi wako wa kwanza wa Waffle kwa kutumia hardhat na ethers.js
author: "MiZiet"
tags:
  [
    "waffle",
    "mikataba erevu",
    "uimara",
    "majaribio",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: sw
published: 2020-10-16
---

Katika mafunzo haya ya [Waffle](https://ethereum-waffle.readthedocs.io), tutajifunza jinsi ya kuweka mradi rahisi wa mkataba-erevu wa "Hello world", kwa kutumia [hardhat](https://hardhat.org/) na [ethers.js](https://docs.ethers.io/v5/). Kisha tutajifunza jinsi ya kuongeza utendaji mpya kwenye mkataba-erevu wetu na jinsi ya kuujaribu kwa kutumia Waffle.

Wacha tuanze kwa kuunda mradi mpya:

```bash
yarn init
```

au

```bash
npm init
```

na kusakinisha vifurushi vinavyohitajika:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

au

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Hatua inayofuata ni kuunda mradi wa sampuli wa hardhat kwa kutumia `npx hardhat`.

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

Chagua `Create a sample project`

Muundo wa mradi wetu unapaswa kuonekana kama hivi:

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

### Sasa hebu tuzungumzie baadhi ya faili hizi: {#now-lets-talk}

- Greeter.sol - mkataba-erevu wetu ulioandikwa kwa solidity;

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

Mkataba-erevu wetu unaweza kugawanywa katika sehemu tatu:

1. constructor - ambapo tunatangaza kigezo cha aina ya string kinachoitwa `greeting`,
2. function greet - kazi ambayo itarudisha `greeting` inapoitwa,
3. function setGreeting - kazi inayoturuhusu kubadilisha thamani ya `greeting`.

- sample-test.js - faili yetu ya majaribio

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

### Hatua inayofuata inajumuisha kuandaa mkataba wetu na kuendesha majaribio: {#compiling-and-testing}

Majaribio ya Waffle hutumia Mocha (mfumo wa majaribio) na Chai (maktaba ya uhakikisho). Unachotakiwa kufanya ni kuendesha `npx hardhat test` na kusubiri ujumbe ufuatao uonekane.

```bash
✓ Should return the new greeting once it's changed
```

### Kila kitu kinaonekana vizuri hadi sasa, hebu tuongeze utata zaidi kwenye mradi wetu <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Fikiria hali ambapo mtu anaongeza string tupu kama salamu. Hiyo haitakuwa salamu ya ukarimu, sawa?  
Wacha tuhakikishe hilo halitokei:

Tunataka kutumia `revert` ya solidity mtu anapopitisha string tupu. Jambo zuri ni kwamba tunaweza kujaribu utendaji huu kwa urahisi na kilinganishi cha chai cha Waffle `to.be.revertedWith()`.

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

Inaonekana jaribio letu jipya halikufaulu:

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

Wacha tutekeleze utendaji huu katika mkataba-erevu wetu:

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

Sasa, kazi yetu ya setGreeting inaonekana hivi:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Wacha tuendeshe majaribio tena:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Hongera! Umefaulu :)

### Hitimisho {#conclusion}

Tulitengeneza mradi rahisi kwa Waffle, Hardhat na ethers.js. Tulijifunza jinsi ya kuweka mradi, kuongeza jaribio na kutekeleza utendaji mpya.

Kwa vilinganishi bora zaidi vya chai vya kujaribu mikataba-erevu yako, angalia [hati rasmi za Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
