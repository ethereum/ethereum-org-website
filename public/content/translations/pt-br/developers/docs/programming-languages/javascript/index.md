---
title: Ethereum para desenvolvedores JavaScript
description: Aprenda a desenvolver para Ethereum usando projetos e ferramentas baseados em JavaScript.
lang: pt-br
---

JavaScript está entre as linguagens mais populares no ecossistema Ethereum. De fato, há uma [equipe](https://github.com/ethereumjs) dedicada a trazer o máximo possível do Ethereum para o JavaScript.

Há oportunidades para escrever JavaScript (ou algo parecido) em [todos os níveis da pilha](/developers/docs/ethereum-stack/).

## Interagir com o Ethereum {#interact-with-ethereum}

### Bibliotecas de API JavaScript {#javascript-api-libraries}

Se você quiser escrever em JavaScript para consultar a blockchain, enviar transações e muito mais, a maneira mais conveniente de fazer isso é usando uma [biblioteca de API JavaScript](/developers/docs/apis/javascript/). Essas APIs permitem que os desenvolvedores interajam facilmente com os [nós na rede Ethereum](/developers/docs/nodes-and-clients/).

Você pode usar essas bibliotecas para interagir com contratos inteligentes no Ethereum, de modo que é possível construir um aplicativo descentralizado (dapp) onde você usa apenas JavaScript para interagir com contratos pré-existentes.

**Confira**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _inclui implementação de carteira Ethereum e utilitários em JavaScript e TypeScript._
- [Viem](https://viem.sh) – _uma interface TypeScript para Ethereum que fornece primitivas sem estado de baixo nível para interagir com o Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _uma metabiblioteca TypeScript com cache integrado, hooks e mocks de teste para um desenvolvimento Ethereum sem esforço em bibliotecas Web3._

### Contratos inteligentes {#smart-contracts}

Se você é um desenvolvedor JavaScript e deseja escrever seu próprio contrato inteligente, pode ser interessante se familiarizar com a [Solidity](https://solidity.readthedocs.io). Esta é a linguagem de contrato inteligente mais popular e é sintaticamente semelhante ao JavaScript, o que pode facilitar o aprendizado.

Mais sobre [contratos inteligentes](/developers/docs/smart-contracts/).

## Entender o protocolo {#understand-the-protocol}

### A máquina virtual Ethereum {#the-ethereum-virtual-machine}

Existe uma implementação em JavaScript da [máquina virtual do Ethereum](/developers/docs/evm/). Ela suporta as regras de bifurcação mais recentes. As regras de bifurcação referem-se a alterações feitas na EVM como resultado de atualizações planejadas.

Ela é dividida em vários pacotes JavaScript que você pode conferir para entender melhor:

- Contas
- Blocos
- A própria blockchain
- Transações
- E muito mais...

Isso ajudará você a entender coisas como "qual é a estrutura de dados de uma conta?".

Se você prefere ler código, este JavaScript pode ser uma ótima alternativa à leitura de nossa documentação.

**Confira a EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nós e clientes {#nodes-and-clients}

Um cliente EthereumJS está em desenvolvimento ativo, o que permite que você se aprofunde em como os clientes Ethereum funcionam em uma linguagem que você entende: JavaScript!

**Confira o cliente**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Outros projetos {#other-projects}

Há também muitas outras coisas acontecendo no mundo do JavaScript no Ethereum, incluindo:

- bibliotecas de utilitários de carteira.
- ferramentas para gerar, importar e exportar chaves Ethereum.
- uma implementação da `merkle-patricia-tree` – uma estrutura de dados descrita no yellow paper do Ethereum.

Aprofunde-se no que mais lhe interessar no [repositório do EthereumJS](https://github.com/ethereumjs)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_