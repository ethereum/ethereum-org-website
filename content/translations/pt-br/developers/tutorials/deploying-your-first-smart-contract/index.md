---
title: Implementando seu primeiro contrato inteligente
description: Uma introdução à implantação do seu primeiro contrato inteligente em uma rede de teste Ethereum
author: "jdourlens"
tags:
  - "contratos inteligentes"
  - "remix"
  - "solidity"
  - "implementação"
skill: beginner
lang: pt-br
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Acho que você está tão animado quanto nós para [implantar](/developers/docs/smart-contracts/deploying/) e interagir com o seu primeiro [contrato inteligente](/developers/docs/smart-contracts/) na blockchain Ethereum.

Não se preocupe, pois como este é o nosso primeiro contrato inteligente, vamos publicá-lo em uma [rede de testes local](/developers/docs/networks/), assim não custa nada para você implementar e brincar com ele o quanto quiser.

## Escrevendo nosso contrato {#writing-our-contract}

O primeiro passo é [visitar a Remix](https://remix.ethereum.org/) e criar um novo arquivo. Na parte superior esquerda da interface Remix adicione um novo arquivo e digite o nome do arquivo desejado.

![Adicionando um novo arquivo na interface Remix](./remix.png)

No novo arquivo, vamos colar o seguinte código.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Se você está acostumado com programação, você pode facilmente adivinhar o que este programa faz. Aqui está uma explicação linha a linha:

- Linha 4: Definimos um contrato com o nome `Counter`.
- Linha 7: Nosso contrato armazena um inteiro não assinado chamado `count` começando com 0.
- Linha 10: A primeira função vai modificar o estado do contrato e `increment()` nossa variável `count`.
- Linha 15: A segunda função é apenas um getter para ser capaz de ler o valor da variável `count` fora do contrato inteligente. Observe que, como definimos nossa variável `count` como pública, isso não é necessário, mas é mostrado como um exemplo.

Tudo isso para o nosso primeiro contrato inteligente simples. Como você deve saber, ele se parece com uma classe de linguagens OOP (Object-Oriented Programming, programação orientada a objetos) como Java ou C++. Agora é hora de brincar com o nosso contrato.

## Implantando nosso contrato {#deploying-our-contract}

Como escrevemos nosso primeiro contrato inteligente, nós agora faremos deploy para a blockchain para poder brincar com ele.

[Implantar o contrato inteligente no blockchain](/developers/docs/smart-contracts/deploying/) é, na verdade, apenas enviar uma transação que contém o código do contrato inteligente compilado sem especificar os destinatários.

Primeiro, vamos [compilar o contrato](/developers/docs/smart-contracts/compiling/) clicando no ícone de compilação no lado esquerdo:

![O ícone de compilação na barra de ferramentas Remix](./remix-compile-button.png)

Em seguida, clique no botão de compilação:

![O botão de compilação no compilador do solidity Remix](./remix-compile.png)

Você pode escolher selecionar a opção "Compilação automática", para que o contrato sempre seja compilado quando você salvar o conteúdo no editor de texto.

Em seguida, navegue para a tela de implantação e execução de transações:

![O ícone de compilação na barra de ferramentas do Remix](./remix-deploy.png)

Assim que você estiver na tela de transações "deploy and run" verifique se o nome do seu contrato aparece e clique em Deploy. Como você pode ver no topo da página, o ambiente atual é o "Javascript VM", o que significa que iremos implantar e interagir com nosso contrato inteligente em uma blockchain de teste local para podermos testar mais rápido e sem quaisquer custos.

![O botão de deploy no compilador do solidity Remix](./remix-deploy-button.png)

Quando você clicar no botão "Deploy", você verá seu contrato aparecer abaixo. Clique na seta à esquerda para expandi-la, para que possamos ver o conteúdo de nosso contrato. Esta é nossa variável `counter`, nossa função `increment()` e a getter `getCounter()`.

Se você clicar no botão `count` ou `getCount`, ele recuperará o conteúdo da variável `count` do contrato e o exibirá. Como ainda não chamamos a função `increment`, ela deve exibir 0.

![O botão de função no compilador do solidity Remix](./remix-function-button.png)

Vamos agora chamar a função `increment` clicando no botão. Você verá logs das transações que são feitas aparecendo no parte inferior da janela. Você verá que os logs são diferentes quando estiver pressionando o botão para recuperar os dados em vez do botão `increment`. Isso porque a leitura de dados na blockchain não necessita de quaisquer transações (escritas) ou taxas. Porque somente modificar o estado do blockchain requer fazer uma transação:

![Um log de transações](./transaction-log.png)

Após pressionar o botão de incremento que gerará uma transação para chamar nossa função `increment()` se clicarmos novamente nos botões count ou getCount, iremos ler o estado recém-atualizado de nosso contrato inteligente com a variável de contagem maior que 0.

![Estado recentemente atualizado do contrato inteligente](./updated-state.png)

No próximo tutorial, explicaremos [como você pode adicionar eventos aos seus contratos inteligentes](/developers/tutorials/logging-events-smart-contracts/). Eventos de registro são uma maneira conveniente para depurar seu contrato inteligente e entender o que está acontecendo durante a chamada de uma função.
