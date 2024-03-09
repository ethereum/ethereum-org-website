---
title: Testando um contrato inteligente simples com a biblioteca Waffle
description: Tutorial para iniciantes
author: Ewa Kowalska
tags:
  - "contratos inteligentes"
  - "solidity"
  - "Waffle"
  - "testando"
skill: intermediate
lang: pt-br
published: 2021-02-26
---

## Neste tutorial, você aprenderá como {#in-this-tutorial-youll-learn-how-to}

- Testar as mudanças do saldo da carteira
- Testar a emissão de eventos com argumentos especificados
- Assegurar que uma transação foi revertida

## Suposições {#assumptions}

- Você pode criar um novo projeto JavaScript ou TypeScript
- Você tem alguma experiência básica com testes em JavaScript
- Você tem usado gerenciadores de pacotes como Yarn ou NPM
- Você possui um conhecimento muito básico de contratos inteligentes e Solidity

# Introdução {#getting-started}

O tutorial demonstra a configuração do teste e a execução usando yarn, mas não há problema se você preferir npm - Eu fornecerei referências adequadas a [documentação](https://ethereum-waffle.readthedocs.io/en/latest/index.html) oficial do Waffle.

## Instalando Dependências {#install-dependencies}

[Adicione](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) as dependências do ethereum-waffle e typescript às dependências de desenvolvimento do seu projeto.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Exemplo de contrato inteligente {#example-smart-contract}

Durante o tutorial, nós trabalharemos em um exemplo de contrato inteligente simples - EtherSplitter. Não faz nada de mais, além de permitir que qualquer um envie somas em wei e divida-as igualmente entre dois destinatários predefinidos. A função split exige que a quantidade de wei seja par, caso contrário, ela será anulada. Para ambos os destinatários, ela realiza uma transferência em wei, seguido da emissão do evento Transferir.

Coloque o trecho de código EtherSplitter em `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Compilar o contrato {#compile-the-contract}

Para [compilar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) o contrato, adicione a seguinte entrada ao arquivo package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Em seguida, crie o arquivo de configuração do Waffle, no diretório raiz do projeto - `waffle.json` - e então cole a seguinte configuração lá:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Execute `yarn build`. Como resultado, o diretório `build` aparecerá com o contrato compilado, EtherSplitter, no formato JSON.

## Teste de configuração {#test-setup}

Testar com Waffle requer usar os matchers (comparadores) Chai e Mocha, então você precisa [adicionar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) ao seu projeto. Atualize seu arquivo package.json e adicione a entrada `test` na parte de scripts:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Se você quiser [executar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) seus testes, basta executar `yarn test`.

# Testando {#testing}

Agora crie o diretório `test` e crie o novo arquivo `test\EtherSplitter.test.ts`. Copie o trecho de código abaixo e cole-o em nosso arquivo de teste.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // add the tests here
})
```

Algumas palavras antes de começarmos. O `MockProvider` vem com uma versão em mock (simulada de um objeto real) da blockchain. Ele também fornece o mock de carteiras que nos servirão para testar o contrato EtherSplitter. Podemos obter até dez carteiras chamando o método `getWallets()` no provedor. No exemplo, nós obtemos três carteiras - para o remetente e duas para os destinatários.

Em seguida, declaramos uma variável chamada 'splitter' - este é o nosso contrato mock EtherSplitter. Ele é criado antes de cada execução de um único teste pelo método `deployContract`. Este método simula a implantação de um contrato, da carteira passada como primeiro parâmetro (a carteira do remetente em nosso caso). O segundo parâmetro é a ABI e o bytecode do contrato testado — passamos para lá o arquivo json do contrato EtherSplitter compilado no diretório `build`. O terceiro parâmetro é uma matriz com os argumentos do construtor do contrato que, no nosso caso, são os dois endereços dos destinatários.

## changeBalances {#changebalances}

Primeiro, verificaremos se o método split realmente altera os saldos das carteiras dos destinatários. Se dividirmos 50 wei da conta do remetente, nós esperaríamos que os saldos de ambos os destinatários aumentassem em 25 wei. Nós usaremos o matcher `changeBalances` do Waffle:

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Como o primeiro parâmetro do matcher, nós passamos um array de carteiras dos destinatários e, como segundo - um array de aumentos esperados nas contas correspondentes. Se nós quiséssemos verificar o saldo de uma carteira específica, também poderíamos usar o matcher `changeBalance`, que não requer a passagem de arrays, como no exemplo abaixo:

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Observe que, em ambos os casos de `changeBalance` e de `changeBalances`, transmitimos a função split como um retorno de chamada, pois o comparador precisa acessar o estado dos saldos antes e depois da chamada.

A seguir, testaremos se o evento Transfer foi emitido após cada transferência de wei. Vamos passar para outro comparador do Waffle:

## Emit {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

O matcher `emit` nos permite verificar, se um contrato emitiu um evento ao chamar um método. Como parâmetros para o matcher `emit`, nós fornecemos o mock do contrato, que prevemos para emitir o evento, juntamente com o nome desse evento. Em nosso caso, o contrato simulado é o `splitter` e o nome do evento é `Transfer`. Nós também podemos verificar os valores precisos dos argumentos, com os quais o evento foi emitido - nós passamos tantos argumentos para o matcher `withArgs`, como espera a nossa declaração de evento. No caso do contrato EtherSplitter, passamos os endereços do remetente e do destinatário, juntamente com a quantia de wei transferida.

## revertedWith {#revertedwith}

Como último exemplo, nós verificaremos se a transação foi revertida, em caso de número desigual de wei. Usaremos o matcher `revertedWith`:

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

O teste, se aprovado, nos garantirá que a transação foi revertida de fato. No entanto, também deve haver uma correspondência exata entre as mensagens que passamos, na instrução `require` e a mensagem que esperamos em `revertedWith`. Se voltarmos ao código do contrato EtherSplitter, na declaração `require` para a quantidade wei, fornecemos a mensagem: 'Quantidade de wei desigual não permitida'. Isso corresponde à mensagem que esperamos em nosso teste. Se eles não fossem iguais, o teste falharia.

# Parabéns! {#congratulations}

Você acabou de dar seu primeiro grande passo para testar contratos inteligentes com Waffle! Caso esteja interessado em outros tutoriais do Waffle:

- [Testando ERC20 com Waffle](/developers/tutorials/testing-erc-20-tokens-with-waffle/)
- [Waffle: simulações dinâmicas e testando chamadas de contrato](/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/#gatsby-focus-wrapper)
- [Waffle diga olá mundo tutorial com capacete de segurança e ethers](/developers/tutorials/waffle-say-hello-world-with-hardhat-and-ethers/)
