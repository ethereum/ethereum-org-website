---
title: "Waffle: Mockagem dinâmica e teste de chamadas de contrato"
description: Tutorial avançado do Waffle para usar mockagem dinâmica e testar chamadas de contrato
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "smart contracts",
    "solidez",
    "testando",
    "simulando"
  ]
skill: intermediate
lang: pt-br
published: 14/11/2020
---

## Do que se trata este tutorial? {#what-is-this-tutorial-about}

Neste tutorial, você aprenderá a:

- usar mockagem dinâmica
- testar interações entre contratos inteligentes

Suposições:

- você já sabe como escrever um contrato inteligente simples em `Solidity`
- você tem familiaridade com `JavaScript` e `TypeScript`
- você já fez outros tutoriais do `Waffle` ou sabe uma ou duas coisas sobre ele

## Mockagem dinâmica {#dynamic-mocking}

Por que a mockagem dinâmica é útil? Bem, ela nos permite escrever testes de unidade em vez de testes de integração. O que isso significa? Isso significa que não precisamos nos preocupar com as dependências dos contratos inteligentes, e assim podemos testar todos eles em completo isolamento. Deixe-me mostrar exatamente como você pode fazer isso.

### **1. Projeto** {#1-project}

Antes de começarmos, precisamos preparar um projeto simples em node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

Vamos começar adicionando o typescript e as dependências de teste - mocha e chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Agora vamos adicionar o `Waffle` e o `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

A estrutura do seu projeto deve se parecer com isto agora:

```
.
├── contracts
├── package.json
└── test
```

### **2. Contrato inteligente** {#2-smart-contract}

Para iniciar a mockagem dinâmica, precisamos de um contrato inteligente com dependências. Não se preocupe, eu cuido disso para você!

Aqui está um contrato inteligente simples escrito em `Solidity` cujo único propósito é verificar se estamos ricos. Ele usa um token ERC20 para verificar se temos tokens suficientes. Coloque-o em `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Como queremos usar a mockagem dinâmica, não precisamos do ERC20 completo, e é por isso que estamos usando a interface IERC20 com apenas uma função.

É hora de construir este contrato! Para isso, usaremos o `Waffle`. Primeiro, vamos criar um arquivo de configuração `waffle.json` simples que especifica as opções de compilação.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Agora estamos prontos para construir o contrato com o Waffle:

```bash
npx waffle
```

Fácil, certo? Na pasta `build/`, apareceram dois arquivos correspondentes ao contrato e à interface. Nós os usaremos mais tarde para testar.

### **3. Testando** {#3-testing}

Vamos criar um arquivo chamado `AmIRichAlready.test.ts` para o teste em si. Primeiro de tudo, temos que lidar com as importações. Nós precisaremos deles para mais tarde:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

Além das dependências de JS, precisamos importar nosso contrato e interface já compilados:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

O Waffle usa o `chai` para testes. No entanto, antes de podermos usá-lo, temos que injetar os matchers do Waffle no próprio chai:

```typescript
use(solidity)
```

Precisamos implementar a função `beforeEach()` que irá redefinir o estado do contrato antes de cada teste. Primeiro, vamos pensar no que precisamos lá. Para implantar um contrato, precisamos de duas coisas: uma carteira e um contrato ERC20 implantado para passá-lo como argumento para o contrato `AmIRichAlready`.

Primeiro, criamos uma carteira:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Em seguida, precisamos implantar um contrato ERC20. Aqui está a parte complicada - nós temos apenas uma interface. Esta é a parte em que Waffle vem nos salvar. O Waffle tem uma função mágica `deployMockContract()` que cria um contrato usando apenas a _ABI_ da interface:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Agora, com a carteira e o ERC20 implantado, podemos prosseguir e implantar o contrato `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Com tudo isso, nossa função `beforeEach()` está terminada. Até agora o seu arquivo `AmIRichAlready.test.ts` deve se parecer com isto:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Vamos escrever o primeiro teste para o contrato `AmIRichAlready`. Sobre o que você acha que nosso teste deveria ser? Sim, você está certo! Devemos verificar se já estamos ricos :)

Mas espere um segundo. Como nosso contrato mockado saberá quais valores retornar? Nós não implementamos nenhuma lógica para a função `balanceOf()`. Novamente, o Waffle pode ajudar aqui. Nosso contrato mockado agora tem alguns recursos novos e sofisticados:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Com este conhecimento, podemos finalmente escrever nosso primeiro teste:

```typescript
it("retorna falso se a carteira tiver menos de 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Vamos analisar este teste em partes:

1. Nós configuramos nosso contrato ERC20 mockado para sempre retornar um saldo de 999.999 tokens.
2. Verificamos se o método `contract.check()` retorna `false`.

Estamos prontos para executá-lo:

![Um teste passando](./test-one.png)

Então o teste funciona, mas... ainda há espaço para melhorias. A função `balanceOf()` sempre retornará 99999. Podemos melhorá-lo especificando uma carteira para a qual a função deve retornar algo, assim como um contrato real:

```typescript
it("retorna falso se a carteira tiver menos de 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Até agora, testamos apenas o caso em que não somos ricos o suficiente. Vamos testar o oposto em vez disso:

```typescript
it("retorna verdadeiro se a carteira tiver pelo menos 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Você roda os testes...

![Dois testes passando](test-two.png)

...e aqui está! Nosso contrato parece funcionar como o esperado :)

## Testando chamadas de contrato {#testing-contract-calls}

Vamos resumir o que fizemos até agora. Testamos a funcionalidade do nosso contrato `AmIRichAlready` e ele parece estar funcionando corretamente. Isso significa que terminamos, certo? Não exatamente! O Waffle nos permite testar nosso contrato ainda mais a fundo. Mas como exatamente? Bem, no arsenal do Waffle, existem os matchers `calledOnContract()` e `calledOnContractWith()`. Eles nos permitirão verificar se nosso contrato chamou o contrato mockado ERC20. Aqui está um teste básico com um desses matchers:

```typescript
it("verifica se o contrato chamou balanceOf no token ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Podemos ir ainda mais longe e melhorar este teste com o outro matcher que eu mencionei:

```typescript
it("verifica se o contrato chamou balanceOf com uma carteira específica no token ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Vamos verificar se os testes estão corretos:

![Três testes passando](test-three.png)

Ótimo, todos os testes passaram.

Testar chamadas de contrato com o Waffle é muito fácil. E aqui está a melhor parte. Esses matchers funcionam tanto com contratos normais quanto com contratos mockados! Isso ocorre porque o Waffle registra e filtra as chamadas da EVM em vez de injetar código, como é o caso de bibliotecas de teste populares para outras tecnologias.

## A linha de chegada {#the-finish-line}

Parabéns! Agora você sabe como usar o Waffle para testar chamadas de contrato e fazer mock de contratos dinamicamente. Há muito mais recursos interessantes para descobrir. Eu recomendo mergulhar na documentação do Waffle.

A documentação do Waffle está disponível [aqui](https://ethereum-waffle.readthedocs.io/).

O código-fonte deste tutorial pode ser encontrado [aqui](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Tutoriais nos quais você também pode se interessar:

- [Testando contratos inteligentes com o Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
