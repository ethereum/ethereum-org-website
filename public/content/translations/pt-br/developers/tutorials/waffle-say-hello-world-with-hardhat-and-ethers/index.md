---
title: "Tutorial de 'olá mundo' do Waffle com Hardhat e Ethers"
description: "Faça seu primeiro projeto Waffle com Hardhat e ethers.js"
author: "MiZiet"
tags:
  [
    "waffle",
    "smart contracts",
    "solidez",
    "testando",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: pt-br
published: 2020-10-16
---

Neste tutorial do [Waffle](https://ethereum-waffle.readthedocs.io), aprenderemos a configurar um projeto simples de contrato inteligente "olá mundo", usando [Hardhat](https://hardhat.org/) e [ethers.js](https://docs.ethers.io/v5/). Em seguida, aprenderemos como adicionar uma nova funcionalidade ao nosso contrato inteligente e como testá-lo com o Waffle.

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

O próximo passo é criar um projeto de amostra do Hardhat executando `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Bem-vindo ao Hardhat v2.0.3 👷‍

? O que você quer fazer? …
❯ Criar um projeto de amostra
Criar um hardhat.config.js vazio
Sair
```

Selecione `Criar um projeto de amostra`

A estrutura do nosso projeto deve ser parecida com esta:

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

### Agora vamos falar sobre alguns desses arquivos: {#now-lets-talk}

- Greeter.sol - nosso contrato inteligente escrito em Solidity;

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

1. construtor - onde declaramos uma variável do tipo string chamada `greeting`,
2. função greet - uma função que retornará a `greeting` quando chamada,
3. função setGreeting - uma função que nos permite alterar o valor de `greeting`.

- sample-test.js - nosso arquivo de testes

```js
describe("Greeter", function () {
  it("Deve retornar a nova saudação assim que for alterada", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Olá, mundo!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Olá, mundo!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### O próximo passo consiste em compilar nosso contrato e executar testes: {#compiling-and-testing}

Os testes do Waffle usam Mocha (um framework de teste) com Chai (uma biblioteca de asserção). Tudo o que você precisa fazer é executar `npx hardhat test` e esperar que a seguinte mensagem apareça.

```bash
✓ Deve retornar a nova saudação assim que for alterada
```

### Até agora tudo parece ótimo, vamos adicionar um pouco mais de complexidade ao nosso projeto <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Imagine uma situação em que alguém adiciona uma string vazia como saudação. Não seria uma saudação calorosa, certo?  
Vamos garantir que isso não aconteça:

Queremos usar o `revert` do Solidity quando alguém passa uma string vazia. O bom é que podemos testar facilmente essa funcionalidade com o matcher `to.be.revertedWith()` do Chai do Waffle.

```js
it("Deve reverter ao passar uma string vazia", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Olá, mundo!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "A saudação não deve estar vazia"
  )
})
```

Parece que nosso novo teste não passou:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Deve retornar a nova saudação assim que for alterada (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Deve reverter ao passar uma string vazia


  1 aprovado (2s)
  1 reprovado
```

Vamos implementar essa funcionalidade em nosso contrato inteligente:

```solidity
require(bytes(_greeting).length > 0, "A saudação não deve estar vazia");
```

Agora, nossa função setGreeting se parece com isto:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "A saudação não deve estar vazia");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Vamos executar os testes novamente:

```bash
✓ Deve retornar a nova saudação assim que for alterada (1467ms)
✓ Deve reverter ao passar uma string vazia (276ms)

2 aprovados (2s)
```

Parabéns! Você conseguiu :)

### Conclusão {#conclusion}

Fizemos um projeto simples com Waffle, Hardhat e ethers.js. Aprendemos como configurar um projeto, adicionar um teste e implementar uma nova funcionalidade.

Para mais excelentes matchers do Chai para testar seus contratos inteligentes, confira a [documentação oficial do Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
