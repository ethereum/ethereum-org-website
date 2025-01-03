---
title: "Tutorial Waffle diz hello world com hardhat e ethers"
description: Faça seu primeiro projeto Waffle com hardhat e ethers.js
author: "MiZiet"
tags:
  - "waffle"
  - "contratos inteligentes"
  - "solidity"
  - "testando"
  - "hardhat"
  - "ethers.js"
skill: intermediate
lang: pt-br
published: 2020-10-16
---

Neste [tutorial do Waffle](https://ethereum-waffle.readthedocs.io), aprenderemos como criar um simples projeto de contrato inteligente "Hello world", usando [hardhat](https://hardhat.org/) e [ethers. s](https://docs.ethers.io/v5/). Em seguida, aprenderemos como adicionar uma nova funcionalidade ao nosso contrato inteligente e como testá-lo com Waffle.

Vamos começar criando um novo projeto:

```bash
yarn init
```

ou

```bash
npm init
```

e instalando os pacotes necessários:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

ou

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

O próximo passo é criar um projeto hardhat de amostra, executando `npx hardhat`.

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

? O que você deseja fazer? …
★ Crie um projeto de exemplo
Crie um hardhat.config.js vazio
Saia
```

Selecione `Create a sample project`

A nossa estrutura de projetos deverá ficar assim:

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

### Agora vamos falar sobre alguns desses arquivos: {#now-lets-talk}

- Greeter.sol - nosso smart contract escrito em Solidity;

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

Nosso contrato inteligente pode ser dividido em três partes:

1. constructor - onde declaramos uma variável de tipo string chamada `greeting`,
2. function greet - função que retornará  `greeting` quando chamada,
3. function setGreeting - uma função que nos permite alterar o valor da função `greeting`.

- sample-test.js - nosso arquivo de testes

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

### O próximo passo consiste em compilar nosso contrato e executar testes: {#compiling-and-testing}

Testes de Waffle usam Mocha (um framework de teste) com Chai (uma biblioteca de asserção). Tudo o que você precisa fazer é executar `npx hardhat test` e esperar que a seguinte mensagem apareça.

```bash
✓ Deve retornar a nova saudação uma vez alterada
```

### Tudo parece ótimo até agora, vamos adicionar mais complexidade ao nosso projeto <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Imagine uma situação quando alguém adiciona uma string vazia como saudação. Não seria uma saudação calorosa, né?  
Vamos nos certicar que isso não aconteça:

Queremos usar o `revert` do Solidity quando alguém passar uma string vazia. Uma coisa boa é que podemos facilmente testar esta funcionalidade com o chai matcher do Waffle `to.be.revertedWith()`.

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

Parece que o nosso novo teste não passou:

```bash
Implantando um Greeter com saudação: Olá, mundo!
Mude de saudação de 'Hello, world!' para 'Hola, mundo!'
    ✓ Deve devolver a nova saudação uma vez que ela tenha sido alterada (1514ms)
Implantando um Greeter com saudação: Olá, mundo!
Mudar saudação de 'Olá, mundo!' para ''
    1) Deve reverter quando passar uma seqüência vazia


  1 passagem (2s)
  1 falhando
```

Vamos implementar esta funcionalidade em nosso contrato inteligente:

```solidity
require(bytes(_greeting).length > 0, "Greeting message is empty");
```

Agora, nossa função setGreeting se parece com isso:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Vamos executar os testes novamente:

```bash
✓ Deve retornar a nova saudação quando ela for alterada (1467ms)
✓ Deve reverter quando passar uma string vazia (276ms)

2 passagem (2s)
```

Parabéns! Você terminou :)

### Conclusão {#conclusion}

Fizemos um projeto simples com Waffle, Hardhat e ethers.js. Aprendemos como criar um projeto, adicionar um teste e implementar novas funcionalidades.

Para mais combinações excelentes de chai para testar seus smart contracts, confira a [documentação oficial da Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
