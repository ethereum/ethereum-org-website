---
title: Testando um contrato inteligente simples com a biblioteca Waffle
description: Tutorial para iniciantes
author: Ewa Kowalska
tags: [ "smart contracts", "solidez", "Waffle", "testando" ]
skill: beginner
lang: pt-br
published: 26-02-2021
---

## Neste tutorial, você aprenderá a {#in-this-tutorial-youll-learn-how-to}

- Testar as alterações no saldo da carteira
- Testar a emissão de eventos com argumentos especificados
- Garantir que uma transação foi revertida

## Pré-requisitos {#assumptions}

- Você pode criar um novo projeto JavaScript ou TypeScript
- Você tem alguma experiência básica com testes em JavaScript
- Você já usou gerenciadores de pacotes como yarn ou npm
- Você possui conhecimentos básicos de contratos inteligentes e Solidity

## Primeiros passos {#getting-started}

O tutorial demonstra a configuração e execução de testes usando o yarn, mas não há problema se você preferir o npm. Fornecerei as devidas referências para a [documentação](https://ethereum-waffle.readthedocs.io/en/latest/index.html) oficial do Waffle.

## Instalar dependências {#install-dependencies}

[Adicione](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) as dependências ethereum-waffle e typescript às dependências de desenvolvimento (dev dependencies) do seu projeto.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Exemplo de contrato inteligente {#example-smart-contract}

Durante o tutorial, trabalharemos em um exemplo de contrato inteligente simples: o EtherSplitter. Ele não faz muito mais do que permitir que qualquer pessoa envie wei e o divida igualmente entre dois recebedores predefinidos.
A função `split` exige que o número de wei seja par, caso contrário, a transação será revertida. Para ambos os recebedores, ele executa uma transferência de wei, seguida da emissão do evento Transfer.

Coloque o trecho de código do EtherSplitter em `src/EtherSplitter.sol`.

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

Em seguida, crie o arquivo de configuração do Waffle no diretório raiz do projeto, `waffle.json`, e cole a seguinte configuração nele:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Execute `yarn build`. Como resultado, o diretório `build` aparecerá com o contrato EtherSplitter compilado em formato JSON.

## Configuração do teste {#test-setup}

Testar com o Waffle requer o uso de matchers do Chai e do Mocha, então você precisa [adicioná-los](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) ao seu projeto. Atualize seu arquivo package.json e adicione a entrada `test` na parte de scripts:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Se quiser [executar](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) seus testes, basta rodar `yarn test`.

## Testes {#testing}

Agora, crie o diretório `test` e crie o novo arquivo `test\EtherSplitter.test.ts`.
Copie o trecho abaixo e cole-o no nosso arquivo de teste.

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

  // adicione os testes aqui
})
```

Algumas palavras antes de começarmos.
O `MockProvider` fornece uma versão simulada (mock) da blockchain. Ele também fornece carteiras simuladas (mock) que nos servirão para testar o contrato EtherSplitter. Podemos obter até dez carteiras chamando o método `getWallets()` no provedor. No exemplo, obtemos três carteiras: uma para o remetente e duas para os recebedores.

Em seguida, declaramos uma variável chamada 'splitter' - este é o nosso contrato EtherSplitter simulado. Ele é criado antes de cada execução de um único teste pelo método `deployContract`. Este método simula a implantação de um contrato a partir da carteira passada como primeiro parâmetro (a carteira do remetente, no nosso caso). O segundo parâmetro é a ABI e o bytecode do contrato testado — passamos para lá o arquivo json do contrato EtherSplitter compilado no diretório `build`. O terceiro parâmetro é um array com os argumentos do construtor do contrato que, no nosso caso, são os dois endereços dos recebedores.

## changeBalances {#changebalances}

Primeiro, vamos verificar se o método `split` realmente altera os saldos das carteiras dos recebedores. Se dividirmos 50 wei da conta do remetente, esperamos que os saldos de ambos os recebedores aumentem em 25 wei. Usaremos o matcher `changeBalances` do Waffle:

```ts
it("Altera os saldos das contas", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Como primeiro parâmetro do matcher, passamos um array de carteiras dos recebedores e, como segundo, um array dos aumentos esperados nas contas correspondentes.
Se quiséssemos verificar o saldo de uma carteira específica, também poderíamos usar o matcher `changeBalance`, que não exige a passagem de arrays, como no exemplo abaixo:

```ts
it("Altera o saldo da conta", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Observe que, em ambos os casos de `changeBalance` e `changeBalances`, passamos a função `split` como um callback, porque o matcher precisa acessar o estado dos saldos antes e depois da chamada.

A seguir, testaremos se o evento Transfer foi emitido após cada transferência de wei. Vamos recorrer a outro matcher do Waffle:

## Emit {#emit}

```ts
it("Emite evento na transferência para o primeiro recebedor", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emite evento na transferência para o segundo recebedor", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

O matcher `emit` nos permite verificar se um contrato emitiu um evento ao chamar um método. Como parâmetros para o matcher `emit`, fornecemos o contrato simulado (mock) que prevemos que emitirá o evento, juntamente com o nome desse evento. No nosso caso, o contrato simulado é o `splitter` e o nome do evento é `Transfer`. Também podemos verificar os valores precisos dos argumentos com que o evento foi emitido — passamos para o matcher `withArgs` tantos argumentos quantos a nossa declaração de evento espera. No caso do contrato EtherSplitter, passamos os endereços do remetente e do recebedor, juntamente com o valor de wei transferido.

## revertedWith {#revertedwith}

Como último exemplo, verificaremos se a transação foi revertida no caso de um número ímpar de wei. Usaremos o matcher `revertedWith`:

```ts
it("Reverte quando a quantia de wei é ímpar", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

O teste, se passar, nos garantirá que a transação foi de fato revertida. No entanto, também deve haver uma correspondência exata entre as mensagens que passamos na instrução `require` e a mensagem que esperamos em `revertedWith`. Se voltarmos ao código do contrato EtherSplitter, na instrução `require` para a quantia de wei, fornecemos a mensagem: 'Uneven wei amount not allowed'. Isso corresponde à mensagem que esperamos no nosso teste. Se não fossem iguais, o teste falharia.

## Parabéns! {#congratulations}

Você deu seu primeiro grande passo para testar contratos inteligentes com o Waffle!
