---
title: Implantando seu primeiro contrato inteligente
description: "Uma introdução à implantação do seu primeiro contrato inteligente em uma rede de teste Ethereum"
author: "jdourlens"
tags: [ "smart contracts", "remix", "solidez", "implantação" ]
skill: beginner
lang: pt-br
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Imagino que você esteja tão animado quanto nós para [implantar](/developers/docs/smart-contracts/deploying/) e interagir com seu primeiro [contrato inteligente](/developers/docs/smart-contracts/) na blockchain Ethereum.

Não se preocupe, pois como este é o nosso primeiro contrato inteligente, vamos implantá-lo em uma [rede de teste local](/developers/docs/networks/) para que não custe nada para você implantar e brincar com ele o quanto quiser.

## Escrevendo nosso contrato {#writing-our-contract}

O primeiro passo é [visitar o Remix](https://remix.ethereum.org/) e criar um novo arquivo. Na parte superior esquerda da interface do Remix, adicione um novo arquivo e digite o nome do arquivo que desejar.

![Adicionando um novo arquivo na interface do Remix](./remix.png)

No novo arquivo, colaremos o código a seguir.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variável pública do tipo inteiro não assinado para manter o número de contagens
    uint256 public count = 0;

    // Função que incrementa nosso contador
    function increment() public {
        count += 1;
    }

    // Getter não necessário para obter o valor da contagem
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Se você tem experiência com programação, pode adivinhar facilmente o que este programa faz. Aqui está uma explicação linha por linha:

- Linha 4: Definimos um contrato com o nome `Counter`.
- Linha 7: Nosso contrato armazena um inteiro sem sinal chamado `count` começando em 0.
- Linha 10: A primeira função modificará o estado do contrato e `increment()` nossa variável `count`.
- Linha 15: A segunda função é apenas um getter para poder ler o valor da variável `count` fora do contrato inteligente. Observe que, como definimos nossa variável `count` como pública, isso não é necessário, mas é mostrado como um exemplo.

Isto é tudo para o nosso primeiro contrato inteligente simples. Como você deve saber, ele se parece com uma classe de linguagens OOP (Programação Orientada a Objetos) como Java ou C++. Agora é hora de brincar com o nosso contrato.

## Implantando nosso contrato {#deploying-our-contract}

Como escrevemos nosso primeiro contrato inteligente, agora vamos implantá-lo na blockchain para podermos brincar com ele.

[Implantar o contrato inteligente na blockchain](/developers/docs/smart-contracts/deploying/) é, na verdade, apenas enviar uma transação que contém o código do contrato inteligente compilado sem especificar nenhum destinatário.

Primeiro, vamos [compilar o contrato](/developers/docs/smart-contracts/compiling/) clicando no ícone de compilação no lado esquerdo:

![O ícone de compilação na barra de ferramentas do Remix](./remix-compile-button.png)

Em seguida, clique no botão de compilação:

![O botão de compilação no compilador Solidity do Remix](./remix-compile.png)

Você pode selecionar a opção "Compilação automática" para que o contrato seja sempre compilado quando você salvar o conteúdo no editor de texto.

Em seguida, navegue para a tela "DEPLOY & RUN TRANSACTIONS":

![O ícone de implantação na barra de ferramentas do Remix](./remix-deploy.png)

Quando estiver na tela "DEPLOY & RUN TRANSACTIONS", verifique se o nome do seu contrato aparece e clique em Deploy. Como você pode ver na parte superior da página, o ambiente atual é "JavaScript VM", o que significa que vamos implantar e interagir com nosso contrato inteligente em uma blockchain de teste local para podermos testar mais rápido e sem nenhuma taxa.

![O botão de implantação no compilador Solidity do Remix](./remix-deploy-button.png)

Depois de clicar no botão "Deploy", você verá seu contrato aparecer na parte inferior. Clique na seta à esquerda para expandi-lo para vermos o conteúdo do nosso contrato. Esta é a nossa variável `counter`, a nossa função `increment()` e o getter `getCounter()`.

Se você clicar no botão `count` ou `getCount`, ele recuperará o conteúdo da variável `count` do contrato e o exibirá. Como ainda não chamamos a função `increment`, ela deve exibir 0.

![O botão de função no compilador Solidity do Remix](./remix-function-button.png)

Vamos agora chamar a função `increment` clicando no botão. Você verá os logs das transações realizadas aparecendo na parte inferior da janela. Você verá que os logs são diferentes quando você pressiona o botão para recuperar os dados em vez do botão `increment`. Isso porque a leitura de dados na blockchain não precisa de nenhuma transação (escrita) ou taxa. Porque apenas a modificação do estado da blockchain exige a realização de uma transação:

![Um log de transações](./transaction-log.png)

Depois de pressionar o botão de incremento que irá gerar uma transação para chamar nossa função `increment()`, se clicarmos de volta nos botões `count` ou `getCount`, leremos o estado recém-atualizado de nosso contrato inteligente com a variável de contagem sendo maior que 0.

![Estado recém-atualizado do contrato inteligente](./updated-state.png)

No próximo tutorial, abordaremos [como você pode adicionar eventos aos seus contratos inteligentes](/developers/tutorials/logging-events-smart-contracts/). Registrar eventos é uma maneira conveniente de depurar seu contrato inteligente e entender o que está acontecendo ao chamar uma função.
