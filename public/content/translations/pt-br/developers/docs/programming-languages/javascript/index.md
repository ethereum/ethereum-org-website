---
title: Ethereum para desenvolvedores JavaScript
description: Aprenda a desenvolver para Ethereum utilizando projetos e ferramentas baseados em JavaScript.
lang: pt-br
---

O JavaScript está entre as linguagens mais populares no ecossistema Ethereum. De fato, existe uma [equipe](https://github.com/ethereumjs) dedicada a trazer o máximo de Ethereum para o JavaScript possível.

Existem oportunidades para escrever JavaScript (ou algo próximo) em [todos os níveis da pilha](/developers/docs/ethereum-stack/).

## Interagir com o Ethereum {#interact-with-ethereum}

### Bibliotecas de API JavaScript {#javascript-api-libraries}

Se você deseja escrever em JavaScript para consultar a blockchain, enviar transações e muito mais, a maneira mais conveniente de fazer isso é usando uma [biblioteca de API JavaScript](/developers/docs/apis/javascript/). Estas APIs permitem que os desenvolvedores interajam facilmente com os [nós na rede Ethereum](/developers/docs/nodes-and-clients/).

Você pode usar essas bibliotecas para interagir com contratos inteligentes na Ethereum, assim é possível construir um dapp onde você só usa JavaScript para interagir com contratos preexistentes.

**Confira**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _inclui implementação de carteira Ethereum e utilitários em JavaScript e TypeScript._
- [viem](https://viem.sh) – _uma Interface TypeScript para o Ethereum que fornece primitivas de baixo nível e sem estado para interagir com o Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _uma meta-biblioteca TypeScript com cache, hooks e mocks de teste integrados para um desenvolvimento Ethereum sem esforço em várias bibliotecas web3._

### Contratos inteligentes {#smart-contracts}

Se você é um desenvolvedor JavaScript e quer escrever seu próprio contrato inteligente, talvez queira se familiarizar com o [Solidity](https://solidity.readthedocs.io). Esta é a linguagem de contrato inteligente mais popular e é sintaticamente semelhante ao JavaScript, o que pode torná-la mais fácil de aprender.

Mais sobre [contratos inteligentes](/developers/docs/smart-contracts/).

## Entenda o protocolo {#understand-the-protocol}

### A máquina virtual Ethereum {#the-ethereum-virtual-machine}

Existe uma implementação em JavaScript da [máquina virtual Ethereum](/developers/docs/evm/). Apoia as regras de fork (bifurcação) mais recentes. As regras de bifurcação referem-se a alterações feitas na EVM como resultado de melhorias planejadas.

Divide-se em vários pacotes de JavaScript que você pode conferir para entender melhor:

- Contas
- Blocos
- A blockchain em si
- Transações
- E mais...

Isso ajudará você a entender coisas como "qual é a estrutura de dados de uma conta?".

Se você prefere ler código, esse JavaScript poderia ser uma ótima alternativa à leitura em nossa documentação.

**Confira a EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nós e clientes {#nodes-and-clients}

Um cliente Ethereumjs está em desenvolvimento ativo que permite você explorar como os clientes Ethereum funcionam em um idioma que você entende; JavaScript!

**Confira o cliente**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Outros projetos {#other-projects}

Há também muitas outras coisas acontecendo na terra da Ethereum JavaScript, incluindo:

- bibliotecas de utilitários de carteira.
- ferramentas para gerar, importar e exportar chaves da Ethereum.
- uma implementação da `merkle-patricia-tree` – uma estrutura de dados descrita no Yellow Paper do Ethereum.

Explore o que mais lhe interessa no [repositório EthereumJS](https://github.com/ethereumjs)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_
