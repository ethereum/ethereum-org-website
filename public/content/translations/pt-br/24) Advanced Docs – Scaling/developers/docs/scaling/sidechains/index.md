---
title: Sidechains
description: Uma introdução às sidechains como solução de dimensionamento atualmente utilizada pela comunidade Ethereum
lang: pt-br
sidebarDepth: 3
---

Uma sidechain é uma blockchain separada que se executa independente do Ethereum e está conectada à rede principal do Ethereum por uma bridge nos dois sentidos. As sidechains podem ter parâmetros de blocos separados e [algoritmos de consenso](/developers/docs/consensus-mechanisms/), que são geralmente projetados para um processamento eficiente de transações. Entretanto, usar uma sidechain tem vantagens e desvantagens, já que elas não herdam as propriedades de segurança do Ethereum. Ao contrário das [soluções de dimensionamento da camada 2](/layer-2/), as sidechains não publicam alterações no estado e dados de transação de volta à rede principal do Ethereum.

As sidechains também sacrificam alguma medida de descentralização ou segurança para alcançar alta vazão de dados ([trilema do dimensionamento](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). O Ethereum, no entanto, comprometeu-se a dimensionar sem comprometer a descentralização e a segurança, conforme descrito na sua [declaração de visão](/roadmap/vision/) relacionada a atualizações.

## Como funcionam as sidechains? {#how-do-sidechains-work}

As sidechains são blockchains independentes, com diferentes histórias, roteiros de desenvolvimento e considerações de design. Embora uma sidechain possa aparentemente compartilhar algumas semelhanças com o Ethereum, ela tem vários recursos distintos.

### Algoritmos de consenso {#consensus-algorithms}

Uma das qualidades que tornam as sidechains únicas (ou seja, diferentes do Ethereum) é o algoritmo de consenso usado. As sidechains não contam com o Ethereum para consenso e podem escolher protocolos de consenso alternativos que atendam às suas necessidades. Alguns exemplos de algoritmos de consenso usados nas sidechains incluem:

- [Prova de autoridade](/developers/docs/consensus-mechanisms/poa/)
- [Prova de participação delegada](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolerância a falhas bizantinas](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Como o Ethereum, as sidechains têm nós de validação que verificam e processam transações, produzem blocos e armazenam o estado da blockchain. Os validadores são também responsáveis por manterem o consenso em toda a rede e protegê-la contra ataques maliciosos.

#### Parâmetros do bloco {#block-parameters}

O Ethereum coloca limites nos [tempos de bloco](/developers/docs/blocks/#block-time) (ou seja, o tempo que leva para produzir novos blocos) e os [tamanhos de blocos](/developers/docs/blocks/#block-size) (ou seja, a quantidade de dados contida por bloco denominada em gas). Inversamente, as sidechains muitas vezes adotam parâmetros diferentes, como tempos de bloco mais rápidos e limites de gás mais elevados, para alcançar altas transferências, transações rápidas e taxas baixas.

Embora isso tenha alguns benefícios, tem implicações críticas para a descentralização e segurança da rede. Parâmetros de bloco, como tempos de bloco rápidos e tamanhos grandes de blocos, aumentam a dificuldade de rodar um nó completo, deixando alguns "supernós" responsáveis pela segurança da cadeia. Em tal cenário, aumenta a possibilidade de colusão de validadores ou de uma tomada maliciosa da cadeia.

Para que as blockchains se dimensionem sem prejudicar a descentralização, executar um nó deve estar aberto a todos, e não necessariamente a terceiros com hardware especializado. É por isso que estão em curso esforços para garantir que todos possam [executar um nó completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) na rede Ethereum.

### Compatibilidade com EVM {#evm-compatibility}

Algumas sidechains são compatíveis com EVM e podem executar contratos desenvolvidos para a [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). As sidechains compatíveis com EVM suportam contratos inteligentes [escritos em Solidity](/developers/docs/smart-contracts/languages/), bem como outras linguagens de contratos inteligentes EVM, o que significa que contratos inteligentes escritos para a rede principal do Ethereum também funcionarão em sidechains compatíveis com EVM.

Isso significa que se você quer usar seu [dapp](/developers/docs/dapps/) na sidechain, é apenas uma questão de implantar seu [contrato inteligente](/developers/docs/smart-contracts/) nesta sidechain. A aparência e o comportamento dele se asemelham ao da rede principal. Você escreve contratos em Solidity e interage com a cadeia através da RPC da sidechain.

Como as sidechains são compatíveis com EVM, elas são consideradas uma útil [solução de dimensionamento](/developers/docs/scaling/) para dapps nativos do Ethereum. Com o seu dapp em uma sidechain, os usuários podem aproveitar taxas de gás mais baixas e transações mais rápidas, especialmente se a rede principal estiver congestionada.

No entanto, tal como foi explicado anteriormente, a utilização de uma sidechain envolve compromissos significativos. Cada sidechain é responsável pela sua segurança e não herda as propriedades de segurança do Ethereum. Isso aumenta a possibilidade de comportamentos maliciosos que possam afetar os usuários ou colocar seus fundos em risco.

### Movimento de ativos {#asset-movement}

Para que uma blockchain separada se torne uma sidechain para a rede principal do Ethereum, ela precisa da capacidade de facilitar a transferência de ativos de e para a rede principal do Ethereum. Esta interoperabilidade com o Ethereum é alcançada usando uma bridge de blockchain. As [bridges](/bridges/) usam contratos inteligentes implementados na rede principal do Ethereum e uma sidechain para controlar a comunicação de fundos entre elas.

Enquanto as bridges ajudam usuários a mover fundos entre o Ethereum e a sidechain, os ativos não são fisicamente movidos pelas duas cadeias. Em vez disso, os mecanismos que normalmente envolvem a mintagem (mint) e a queima (burn) são utilizados para transferir valor entre cadeias. Mais sobre [como as bridges funcionam](/developers/docs/bridges/#how-do-bridges-work).

## Prós e contras das sidechains {#pros-and-cons-of-sidechains}

| Prós                                                                                                                                          | Contras                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| A tecnologia que sustenta as sidechains está bem estabelecida e se beneficia de uma pesquisa abrangente e de melhorias na concepção.          | As sidechains abrem mão de alguma medida de descentralização e confiabilidade por dimensionamento.                                                |
| As sidechains suportam computação geral e oferecem compatibilidade com EVM (elas podem executar dapps nativos do Ethereum).                   | Uma sidechain utiliza um mecanismo separado de consenso e não se beneficia das garantias de segurança do Ethereum.                                |
| As sidechains usam diferentes modelos de consenso para processar transações com eficiência e taxas de transação mais baixas para os usuários. | As sidechains requerem suposições de confiança mais elevados (por exemplo, um quórum de validadores maliciosos da sidechain pode cometer fraude). |
| As sidechains compatíveis com EVM permitem que dapps expandam seu ecossistema.                                                                |                                                                                                                                                   |

### Usar sidechains {#use-sidechains}

Vários projetos fornecem implementações da cadeia Plasma que você pode integrar aos seus dapps:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (anteriormente xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Leitura adicional {#further-reading}

- [Como dimensionar dapps do Ethereum por meio de sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Georgios Konstantopoulos, 8 de fev., 2018 (em inglês))._

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_
