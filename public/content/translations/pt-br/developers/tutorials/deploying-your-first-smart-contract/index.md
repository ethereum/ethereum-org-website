---
title: Implantando seu primeiro contrato inteligente
description: "Uma introdução à implantação do seu primeiro contrato inteligente em uma rede de teste da Ethereum"
author: "jdourlens"
tags: ["contratos inteligentes", "Remix", "Solidity", "implantação"]
skill: beginner
breadcrumb: Implantar primeiro contrato
lang: pt-br
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Imagino que você esteja tão animado quanto nós para [implantar](/developers/docs/smart-contracts/deploying/) e interagir com seu primeiro [contrato inteligente](/developers/docs/smart-contracts/) na blockchain da Ethereum.

Não se preocupe, como é o nosso primeiro contrato inteligente, nós o implantaremos em uma [rede de teste local](/developers/docs/networks/) para que não custe nada para você implantar e brincar o quanto quiser com ele.

## Escrevendo nosso contrato {#writing-our-contract}

O primeiro passo é [visitar o Remix](https://remix.ethereum.org/) e criar um novo arquivo. Na parte superior esquerda da interface do Remix, adicione um novo arquivo e insira o nome de arquivo que desejar.

![Adding a new file in the Remix interface](./remix.png)

No novo arquivo, colaremos o seguinte código.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variável pública do tipo unsigned int para manter o número de contagens
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

Se você está acostumado a programar, pode adivinhar facilmente o que este programa faz. Aqui está uma explicação linha por linha:

- Linha 4: Definimos um contrato com o nome `Counter`.
- Linha 7: Nosso contrato armazena um número inteiro sem sinal (unsigned integer) chamado `count` começando em 0.
- Linha 10: A primeira função modificará o estado do contrato e executará `increment()` em nossa variável `count`.
- Linha 15: A segunda função é apenas um *getter* para poder ler o valor da variável `count` fora do contrato inteligente. Note que, como definimos nossa variável `count` como pública, isso não é necessário, mas é mostrado como um exemplo.

Isso é tudo para o nosso primeiro contrato inteligente simples. Como você deve saber, ele se parece com uma classe de linguagens de POO (Programação Orientada a Objetos), como Java ou C++. Agora é hora de brincar com nosso contrato.

## Implantando nosso contrato {#deploying-our-contract}

Como escrevemos nosso primeiro contrato inteligente, agora vamos implantá-lo na blockchain para podermos brincar com ele.

[Implantar o contrato inteligente na blockchain](/developers/docs/smart-contracts/deploying/) é, na verdade, apenas enviar uma transação contendo o código do contrato inteligente compilado sem especificar nenhum destinatário.

Primeiro, vamos [compilar o contrato](/developers/docs/smart-contracts/compiling/) clicando no ícone de compilação no lado esquerdo:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Em seguida, clique no botão de compilar:

![The compile button in the Remix solidity compiler](./remix-compile.png)

Você pode optar por selecionar a opção "Auto compile" (Compilação automática) para que o contrato seja sempre compilado quando você salvar o conteúdo no editor de texto.

Em seguida, navegue até a tela "deploy and run transactions" (implantar e executar transações):

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Quando estiver na tela "deploy and run transactions", verifique se o nome do seu contrato aparece e clique em Deploy (Implantar). Como você pode ver no topo da página, o ambiente atual é "JavaScript VM", o que significa que vamos implantar e interagir com nosso contrato inteligente em uma blockchain de teste local para podermos testar mais rápido e sem nenhuma taxa.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Depois de clicar no botão "Deploy", você verá seu contrato aparecer na parte inferior. Clique na seta à esquerda para expandi-lo e vermos o conteúdo do nosso contrato. Esta é a nossa variável `counter`, nossa função `increment()` e o *getter* `getCounter()`.

Se você clicar no botão `count` ou `getCount`, ele irá recuperar o conteúdo da variável `count` do contrato e exibi-lo. Como ainda não chamamos a função `increment`, ele deve exibir 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Vamos agora chamar a função `increment` clicando no botão. Você verá os logs das transações que são feitas aparecendo na parte inferior da janela. Você verá que os logs são diferentes quando você pressiona o botão para recuperar os dados em vez do botão `increment`. Isso ocorre porque a leitura de dados na blockchain não precisa de nenhuma transação (escrita) ou taxas. Porque apenas a modificação do estado da blockchain requer a realização de uma transação:

![A log of transactions](./transaction-log.png)

Após pressionar o botão de incremento que gerará uma transação para chamar nossa função `increment()`, se clicarmos novamente nos botões count ou getCount, leremos o estado recém-atualizado do nosso contrato inteligente com a variável count sendo maior que 0.

![Newly updated state of the smart contract](./updated-state.png)

No próximo tutorial, abordaremos [como você pode adicionar eventos aos seus contratos inteligentes](/developers/tutorials/logging-events-smart-contracts/). Registrar eventos em log é uma maneira conveniente de depurar seu contrato inteligente e entender o que está acontecendo ao chamar uma função.