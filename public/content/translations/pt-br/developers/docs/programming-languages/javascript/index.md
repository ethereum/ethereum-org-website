---
title: Ethereum para desenvolvedores JavaScript
description: Aprenda a desenvolver para Ethereum utilizando projetos e ferramentas baseados em JavaScript.
lang: pt-br
---

O JavaScript está entre as linguagens mais populares no ecossistema Ethereum. De fato, existe uma [equipe](https://github.com/ethereumjs) dedicada a levar o máximo da Ethereum ao JavaScript possível.

Existem oportunidades para escrever JavaScript (ou algo parecido) em [todos os níveis de pilhas](/developers/docs/ethereum-stack/).

## Interagir com Ethereum {#interact-with-ethereum}

### Bibliotecas de API JavaScript {#javascript-api-libraries}

Se você deseja escrever JavaScript para consultar a blockchain, enviar transações e muito mais, a maneira mais conveniente para fazer isso é usando uma [biblioteca de API JavaScript](/developers/docs/apis/javascript/). Estas APIs permitem que os desenvolvedores interajam facilmente com os [nós da rede Ethereum](/developers/docs/nodes-and-clients/).

Você pode usar essas bibliotecas para interagir com contratos inteligentes na Ethereum, assim é possível construir um dapp onde você só usa JavaScript para interagir com contratos preexistentes.

**Confira**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js - Implementação completa de uma carteira Ethereum e utilidades em JavaScript e TypeScript.](https://docs.ethers.io/)

### Smart Contracts {#smart-contracts}

Se você for um desenvolvedor JavaScript que deseja escrever seu próprio contrato inteligente, você pode querer se familiarizar com [Solidity](https://solidity.readthedocs.io). Esta é a linguagem de contrato inteligente mais popular e é sintaticamente semelhante ao JavaScript, o que pode torná-la mais fácil de aprender.

Mais nos [contratos inteligentes](/developers/docs/smart-contracts/).

## Entender o protocolo {#understand-the-protocol}

### A Máquina Virtual da Ethereum {#the-ethereum-virtual-machine}

Há uma implementação JavaScript da [máquina virtual da Ethereum](/developers/docs/evm/). Apoia as regras de fork (bifurcação) mais recentes. As regras de bifurcação referem-se a alterações feitas na EVM como resultado de melhorias planejadas.

Divide-se em vários pacotes de JavaScript que você pode conferir para entender melhor:

- Contas
- Blocos
- A blockchain em si
- Transações
- E mais...

Isso ajudará você a entender coisas como "qual é a estrutura de dados de uma conta?".

Se você prefere ler código, esse JavaScript poderia ser uma ótima alternativa à leitura em nossa documentação.

**Confira o monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Nós e clientes {#nodes-and-clients}

Há um cliente Ethereumjs no desenvolvimento. Isso permitirá que você procure em como os clientes da Ethereum trabalham em uma linguagem que você entenda.

**Confira o monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-client)

## Outros projetos {#other-projects}

Há também muitas outras coisas acontecendo na terra da Ethereum JavaScript, incluindo:

- bibliotecas de utilitários de carteira.
- ferramentas para gerar, importar e exportar chaves da Ethereum.
- uma implementação da `merkle-patricia-tree` – uma estrutura de dados delineada no papel amarelo da Ethereum.

Explore o que mais lhe interessa no [repositório EthereumJS](https://github.com/ethereumjs)

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_
