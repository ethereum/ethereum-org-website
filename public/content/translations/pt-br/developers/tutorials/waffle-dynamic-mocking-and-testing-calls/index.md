---
title: "Waffle: simulações dinâmicas e testando chamadas de contrato"
description: Tutorial avançado de Waffle para usar simulação dinâmica e testar chamadas contratuais
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "Contratos Inteligentes"
  - "solidity"
  - "Testes"
  - "simulando"
skill: intermediate
lang: pt-br
published: 2020-11-14
---

## Do que se trata esse tutorial? {#what-is-this-tutorial-about}

Neste tutorial, você aprenderá:

- use simulação dinâmica
- testar interações entre contratos inteligentes

Pressupostos:

- você já sabe como escrever um contrato inteligente simples em `Solidity`
- você conhece o seu `JavaScript` e `TypeScript`
- você fez outros `tutoriais` do Waffle ou sabe alguma coisa sobre isso

## Simulação dinâmica {#dynamic-mocking}

Por que a simulação dinâmica é útil? Bem, isso permite-nos escrever testes unitários em vez de testes de integração. O que isso significa? Isso significa que não precisamos nos preocupar com as dependências dos contratos inteligentes, assim podemos testar todos eles em total isolamento. Deixe-me te mostrar como exatamente você pode fazer isso.

### **1. Projeto** {#1-project}

Antes de começar, precisamos preparar um projeto simples no node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

Vamos começar adicionando typescript e testes de dependências - mocha & chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Agora vamos adicionar `Waffle` e `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

A nossa estrutura de projetos deverá ficar assim:

```
.
├── contracts
├── package.json
└── test
```

### **2. Contrato inteligente** {#2-smart-contract}

Para iniciar uma simulação dinâmica, precisamos de um contrato inteligente com dependências. Não se preocupe, nós ajudamos você!

Aqui está um simples contrato inteligente escrito na `Solidity` cujo único objetivo é conferir se somos ricos. Ele usa o token ERC20 para verificar se temos tokens suficientes. Coloque em `./contracts/AmIRichAlready.sol`.

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

Como queremos usar simulação dinâmica, não precisamos de todo o ERC20, é por isso que estamos usando a interface IERC20 com apenas uma função.

É hora de construir este contrato! Para isso, usaremos o `Waffle`. Primeiro, vamos criar um arquivo de configuração simples `waffle.json` que especifica as opções de compilação.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Agora estamos prontos para construir o contrato com Waffle:

```bash
npx waffle
```

Fácil, certo? Na pasta `de compilação/` dois arquivos correspondentes ao contrato e a interface apareceu. Nós os utilizaremos mais tarde para testar.

### **3. Testando** {#3-testing}

Vamos criar um arquivo chamado `AmIRichAlready.test.ts` para os testes reais. Em primeiro lugar, temos de lidar com as importações. Nós precisaremos deles para mais tarde:

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

Exceto para dependências JS, precisamos importar nossa interface e contrato construídos:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle usa `chai` para testes. No entanto, antes de podermos usá-lo, temos que injetar os "matchers" de Waffle em si mesmo:

```typescript
use(solidity)
```

Precisamos implementar a função `beforeEach()` que irá redefinir o estado do contrato antes de cada teste. Primeiro, vamos pensar no que precisamos lá. Para implantar um contrato, precisamos de duas coisas: uma carteira e um contrato ERC20 implementado para passá-la como um argumento para o contrato `AmIRichalready`.

Em primeiro lugar, criamos uma carteira:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Depois, precisamos de implantar um contrato do ERC20. Aqui está a parte complicada - nós temos apenas uma interface. Esta é a parte em que Waffle vem nos salvar. Waffle tem uma função mágica `deployMockContract()` que cria um contrato usando apenas o _abi_ da interface:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Agora com a carteira e o ERC20 implantados, podemos ir em frente e implantar o contrato `AmIRichalready` (Contrato:

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

Vamos fazer o primeiro teste para o contrato `AmIRichalready`. Sobre o que acha que o nosso teste deveria ser? Sim, você tem razão! Deveríamos verificar se já somos ricos :)

Um, pera um segundo. Como o nosso contrato simulado saberá quais valores retornar? Não implementamos nenhuma lógica para a função `balanceOf()`. Mais uma vez, Waffle pode ajudar aqui. Nosso contrato simulado tem algumas coisas novas e bonitas agora:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Com esse conhecimento, podemos finalmente escrever nosso primeiro teste:

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Vamos travar esse teste em partes:

1. Definimos nosso contrato simulado no ERC20 para sempre devolver o saldo de tokens de 9999999999.
2. Verifique se o método `contract.check()` retorna `false`.

Nós estamos prontos para disparar a fera:

![Um test passando](test-one.png)

Então o teste funciona, mas... ainda há espaço para melhorias. A função `saldoOf()` sempre retornará 99999. Podemos melhorá-la especificando uma carteira para a qual a função deve retornar algo - como um contrato de verdade:

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Até agora, nós testamos apenas o caso em que não estamos ricos o suficiente. Em vez disso, vamos testar o oposto:

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Você executa os testes...

![Dois testes passando](test-two.png)

E aqui está você! Nosso contrato parece funcionar como pretendido :)

## Testando chamadas de contrato {#testing-contract-calls}

Vamos resumir o que fez até agora. Nós testamos a funcionalidade do nosso contrato de `AmIRichalready` e parece que ele está funcionando corretamente. Isso significa que estamos prontos, né? Não exatamente! Waffle permite-nos testar ainda mais o nosso contrato. Mas o quanto exatamente? Bem, no arsenal de Waffle há um `calledOnContract()` e `calledOnContractWith()` correspondentes. Eles nos permitirão verificar se nosso contrato chamado de simulação (mock, em inglês) do ERC20. Aqui está um teste básico com um desses matchers:

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Podemos ir ainda mais longe e melhorar este teste com o outro "matcher" que eu te falei:

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Vamos verificar se os testes estão corretos:

![Três testes passando](test-three.png)

Ótimo, todos os testes são verdes.

Testar chamadas de contrato com Waffle é super fácil. E aqui está a melhor parte. Esses "matchers" trabalham com contratos normais e simulados! É porque o Waffle registra e filtra chamadas EVM em vez de injetar código, como é no caso de bibliotecas de teste populares de outras tecnologias.

## A Linha de Chegada {#the-finish-line}

Parabéns! Agora você sabe como usar Waffle para testar chamadas de contrato e contratos simulados dinamicamente. Há características muito mais interessantes para descobrir. Recomendo mergulhar na documentação do Waffle.

A documentação do Waffle está disponível [aqui](https://ethereum-waffle.readthedocs.io/).

O código fonte deste tutorial pode ser encontrado [aqui](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Você pode também estar interessado em:

- [Testando contratos inteligentes com Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
