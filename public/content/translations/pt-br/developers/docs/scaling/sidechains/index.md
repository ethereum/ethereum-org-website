---
title: Sidechains
description: Uma introdução às sidechains como uma solução de escalabilidade atualmente utilizada pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

Uma sidechain é uma blockchain separada que é executada de forma independente do [Ethereum](/) e está conectada à Rede Principal do Ethereum por uma ponte bidirecional. As sidechains podem ter parâmetros de bloco e [algoritmos de consenso](/developers/docs/consensus-mechanisms/) separados, que geralmente são projetados para o processamento eficiente de transações. O uso de uma sidechain envolve concessões, no entanto, pois elas não herdam as propriedades de segurança do Ethereum. Ao contrário das [soluções de escalabilidade de camada 2 (l2)](/layer-2/), as sidechains não publicam mudanças de estado e dados de transação de volta na Rede Principal do Ethereum.

As sidechains também sacrificam alguma medida de descentralização ou segurança para alcançar alta vazão ([trilema da escalabilidade](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). O Ethereum está, no entanto, comprometido em escalar sem comprometer a descentralização e a segurança.

## Como as sidechains funcionam? {#how-do-sidechains-work}

As sidechains são blockchains independentes, com diferentes históricos, roteiros de desenvolvimento e considerações de design. Embora uma sidechain possa compartilhar algumas semelhanças superficiais com o Ethereum, ela possui vários recursos distintos.

### Algoritmos de consenso {#consensus-algorithms}

Uma das qualidades que tornam as sidechains únicas (ou seja, diferentes do Ethereum) é o algoritmo de consenso usado. As sidechains não dependem do Ethereum para o consenso e podem escolher protocolos de consenso alternativos que atendam às suas necessidades. Alguns exemplos de algoritmos de consenso usados em sidechains incluem:

- [Prova de autoridade (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Prova de Participação (PoS) delegada](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolerância a falhas bizantinas](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Assim como o Ethereum, as sidechains têm nós validadores que verificam e processam transações, produzem blocos e armazenam o estado da blockchain. Os validadores também são responsáveis por manter o consenso em toda a rede e protegê-la contra ataques maliciosos.

#### Parâmetros de bloco {#block-parameters}

O Ethereum impõe limites aos [tempos de bloco](/developers/docs/blocks/#block-time) (ou seja, o tempo que leva para produzir novos blocos) e aos [tamanhos de bloco](/developers/docs/blocks/#block-size) (ou seja, a quantidade de dados contidos por bloco denominada em gás). Por outro lado, as sidechains frequentemente adotam parâmetros diferentes, como tempos de bloco mais rápidos e limites de gás mais altos, para alcançar alta vazão, transações rápidas e taxas baixas.

Embora isso tenha alguns benefícios, tem implicações críticas para a descentralização e a segurança da rede. Parâmetros de bloco, como tempos de bloco rápidos e tamanhos de bloco grandes, aumentam a dificuldade de executar um nó completo — deixando alguns "supernós" responsáveis por proteger a cadeia. Em tal cenário, a possibilidade de conluio de validadores ou de uma tomada de controle maliciosa da cadeia aumenta.

Para que as blockchains escalem sem prejudicar a descentralização, a execução de um nó deve ser aberta a todos — não necessariamente a partes com hardware especializado. É por isso que há esforços em andamento para garantir que todos possam [executar um nó completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) na rede Ethereum.

### Compatibilidade com a EVM {#evm-compatibility}

Algumas sidechains são compatíveis com a EVM e são capazes de executar contratos desenvolvidos para a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/). As sidechains compatíveis com a EVM suportam contratos inteligentes [escritos em Solidity](/developers/docs/smart-contracts/languages/), bem como outras linguagens de contrato inteligente da EVM, o que significa que os contratos inteligentes escritos para a Rede Principal do Ethereum também funcionarão em sidechains compatíveis com a EVM.

Isso significa que, se você quiser usar seu [aplicativo descentralizado (dapp)](/developers/docs/dapps/) em uma sidechain, é apenas uma questão de implantar seu [contrato inteligente](/developers/docs/smart-contracts/) nesta sidechain. Ela se parece, é sentida e age exatamente como a Mainnet — você escreve contratos em Solidity e interage com a cadeia por meio do RPC da sidechain.

Como as sidechains são compatíveis com a EVM, elas são consideradas uma [solução de escalabilidade](/developers/docs/scaling/) útil para dapps nativos do Ethereum. Com seu dapp em uma sidechain, os usuários podem desfrutar de taxas de gás mais baixas e transações mais rápidas, especialmente se a Mainnet estiver congestionada.

No entanto, como explicado anteriormente, o uso de uma sidechain envolve concessões significativas. Cada sidechain é responsável por sua segurança e não herda as propriedades de segurança do Ethereum. Isso aumenta a possibilidade de comportamento malicioso que pode afetar seus usuários ou colocar seus fundos em risco.

### Movimentação de ativos {#asset-movement}

Para que uma blockchain separada se torne uma sidechain da Rede Principal do Ethereum, ela precisa da capacidade de facilitar a transferência de ativos de e para a Rede Principal do Ethereum. Essa interoperabilidade com o Ethereum é alcançada usando uma ponte de blockchain. As [pontes](/bridges/) usam contratos inteligentes implantados na Rede Principal do Ethereum e em uma sidechain para controlar a transferência de fundos via ponte entre elas.

Embora as pontes ajudem os usuários a mover fundos entre o Ethereum e a sidechain, os ativos não são movidos fisicamente entre as duas cadeias. Em vez disso, mecanismos que normalmente envolvem cunhagem e queima são usados para transferir valor entre as cadeias. Mais sobre [como as pontes funcionam](/developers/docs/bridges/#how-do-bridges-work).

## Prós e contras das sidechains {#pros-and-cons-of-sidechains}

| Prós                                                                                                                        | Contras                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A tecnologia que sustenta as sidechains é bem estabelecida e se beneficia de extensas pesquisas e melhorias no design. | As sidechains abrem mão de alguma medida de descentralização e desnecessidade de confiança em troca de escalabilidade.                          |
| As sidechains suportam computação geral e oferecem compatibilidade com a EVM (elas podem executar dapps nativos do Ethereum).                    | Uma sidechain usa um mecanismo de consenso separado e não se beneficia das garantias de segurança do Ethereum.         |
| As sidechains usam modelos de consenso diferentes para processar transações de forma eficiente e reduzir as taxas de transação para os usuários.         | As sidechains exigem premissas de confiança mais altas (por exemplo, um quórum de validadores maliciosos da sidechain pode cometer fraude). |
| As sidechains compatíveis com a EVM permitem que os dapps expandam seu ecossistema.                                                            |                                                                                                                  |

### Use sidechains {#use-sidechains}

Vários projetos fornecem implementações de sidechains que você pode integrar aos seus dapps:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (anteriormente xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Leitura adicional {#further-reading}

- [Escalando dapps do Ethereum por meio de Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 de fev. de 2018 - Georgios Konstantopoulos_

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_