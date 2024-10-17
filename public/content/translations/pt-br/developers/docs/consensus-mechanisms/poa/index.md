---
title: Prova de autoridade (PoA)
description: Uma explicação do protocolo de consenso de prova de autoridade e seu papel no ecossistema.
lang: pt-br
---

**Prova de autoridade (PoA)** é um algoritmo de consenso baseado em reputação que é uma versão modificada de [prova de participação](/developers/docs/consensus-mechanisms/pos/). É usado principalmente por cadeias privadas, redes de teste e redes de desenvolvimento local. PoA é um algoritmo de consenso baseado em reputação que exige confiança em um conjunto de signatários autorizados para produzir blocos, e não em um mecanismo baseado em participação na PoS.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [mecanismo de consenso](/developers/docs/consensus-mechanisms/).

## O que é Prova de autoridade (PoA)? {#what-is-poa}

Prova de autoridade é uma versão modificada de **[prova de participação](/developers/docs/consensus-mechanisms/pos/) (PoS)**, que é um algoritmo de consenso baseado em participação na PoS. O termo foi introduzido pela primeira vez em 2017 por Gavin Wood, e esse algoritmo de consenso tem sido usado principalmente por cadeias privadas, redes de teste e redes de desenvolvimento local, pois elimina a necessidade de recursos de alta qualidade, como a PoW, e supera os problemas de dimensionamento da PoS ao ter um pequeno subconjunto de nós armazenando a blockchain e produzindo blocos.

A Prova de autoridade requer a confiança em um conjunto de signatários autorizados definidos no [bloco gênesis](/glossary/#genesis-block). Na maioria das implementações atuais, todos os signatários autorizados mantêm o mesmo poder e privilégios ao determinar o consenso da cadeia. A ideia por trás do staking de reputação é que cada validador autorizado seja conhecido por todos por meio de processos como "conheça seu cliente" (KYC), ou por ter uma organização conhecida como a única validadora. Dessa forma, se um validador fizer algo errado, sua identidade será conhecida.

Existem várias implementações da PoA, mas a implementação padrão do Ethereum é **clique**, que implementa [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique é um padrão fácil de implementar e de fácil utilização para desenvolvedores, suportando todos os tipos de sincronização de clientes. Outras implementações incluem [IBFT- 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) e [Aura](https://openethereum.github.io/Chain-specification).

## Como funciona {#how-it-works}

Na PoA, um conjunto de signatários autorizados é selecionado para criar novos blocos. Os signatários são selecionados com base em sua reputação e são os únicos autorizados a criar novos blocos. Os signatários são selecionados em turnos alternados, e cada signatário pode criar um bloco em um período de tempo específico. O tempo de criação do bloco é fixo, e os signatários são obrigados a criar um bloco dentro desse prazo.

A reputação neste contexto não é algo quantificado, e sim a reputação de corporações conhecidas como Microsoft e Google. Portanto, a maneira de selecionar os signatários confiáveis não é algorítmica, e sim o ato humano normal de confiança, em que uma entidade, por exemplo, a Microsoft, cria uma rede privada de PoA entre centenas ou milhares de startups e o papel propriamente dito como o único signatário confiável com a possibilidade de adicionar outros signatários conhecidos como o Google no futuro. Assim sendo, sem dúvida, as startups confiariam que a Microsoft agiria de maneira honesta o tempo todo e usaria a rede. Isso resolve a necessidade de participar de diferentes redes pequenas/privadas que foram construídas para diferentes propósitos para mantê-las descentralizadas e funcionando, juntamente com a necessidade de mineradores, o que consome muita energia e recursos. Algumas redes privadas usam o padrão PoA, como a VeChain, e algumas o modificam, como a Binance, que usa [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), que é uma versão modificada personalizada da PoA e da PoS.

O processo de votação é feito pelos próprios signatários. Cada signatário vota para adicionar ou remover um signatário em seu bloco ao criar um novo bloco. Os votos são contados pelos nós, e os signatários são adicionados ou removidos com base nos votos que atingem um certo limite `SIGNER_LIMIT`.

Pode haver uma situação em que ocorre pequenas bifurcações; a dificuldade de um bloco depende de saber se o bloco foi assinado na sequência ou fora da sequência. Os blocos "dentro da sequência" têm dificuldade 2 e os blocos "fora da sequência" têm dificuldade 1. No caso de bifurcações pequenas, a cadeia com mais signatários validando blocos "na sequência" acumulará a maior dificuldade e vencerá.

## Vetores de ataque {#attack-vectors}

### Signatários maliciosos {#malicious-signers}

Um usuário malicioso pode ser adicionado à lista de signatários, ou uma chave/máquina de assinatura pode ser comprometida. Nesse cenário, o protocolo precisa ser capaz de se defender contra reorganizações e spam. A solução proposta é que, dada uma lista de N signatários autorizados, qualquer signatário pode cunhar apenas 1 bloco de cada K. Isso garante que o dano seja limitado e o restante dos validadores pode votar para eliminar o usuário malicioso.

### Censura {#censorship-attack}

Outro vetor de ataque interessante é quando um signatário (ou grupo de signatários) tenta censurar blocos que votam para removê-lo da lista de autorização. Para contornar isso, a frequência de cunhagem permitida de signatários é restrita a 1 em N/2. Isso garante que signatários mal-intencionados precisem controlar pelo menos 51% das contas signatárias, momento em que eles efetivamente se tornariam a nova fonte de verdade para a cadeia.

### Spam {#spam-attack}

Outro pequeno vetor de ataque são signatários maliciosos injetando novas propostas de votação dentro de cada bloco que eles cunham. Como os nós precisam contabilizar todos os votos para criar a lista real de signatários autorizados, eles devem registrar todos os votos ao longo do tempo. Sem impor um limite à janela de votação, ela poderia crescer lentamente, mas sem limites. A solução é colocar uma janela _móvel_ de blocos W, após a qual os votos são considerados obsoletos. _Uma janela razoável pode ser de 1 a 2 épocas._

### Blocos simultâneos {#concurrent-blocks}

Em uma rede PoA, quando há N signatários autorizados, cada signatário tem permissão para cunhar 1 bloco de K, o que significa que N-K+1 validadores têm permissão para cunhar em qualquer momento. Para evitar que esses validadores corram para conseguir os blocos, cada signatário deve adicionar um pequeno "deslocamento" aleatório ao tempo de liberação de um novo bloco. Embora esse processo garanta que pequenas bifurcações sejam raras, bifurcações ocasionais ainda podem acontecer, assim como na rede principal. Se for descoberto que um signatário está abusando de seu poder e causando caos, os outros signatários poderão votar para expulsá-lo.

Se, por exemplo, houver 10 signatários autorizados e cada signatário tiver permissão para criar 1 bloco entre 20, então, a qualquer momento, 11 validadores poderão criar blocos. Para evitar que esses validadores corram para conseguir blocos, cada signatário adiciona um pequeno "deslocamento" aleatório ao tempo de liberação de um novo bloco. Isso reduz a ocorrência de pequenas bifurcações, mas ainda permite bifurcações ocasionais, como visto na Rede principal do Ethereum. Se um signatário abusar de sua autoridade e causar interrupções, ele poderá ser eliminado da rede.

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                    | Contras                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mais dimensionável do que outros mecanismos populares como PoS e PoW, pois é baseado em um número limitado de signatários de bloco                                      | As redes PoA normalmente têm um número relativamente pequeno de nós de validação. Isso torna uma rede PoA mais centralizada.               |
| As blockchains PoA são incrivelmente baratas de executar e manter                                                                                                       | Tornar-se um signatário autorizado geralmente está fora do alcance de uma pessoa comum, porque a blockchain requer entidades com reputação estabelecida.   |
| As transações são confirmadas muito rapidamente, podendo levar menos de 1 segundo, pois apenas um número limitado de signatários é necessário para validar novos blocos | Os signatários maliciosos podem reorganizar, duplicar os gastos, censurar transações na rede. Esses tipos de ataque são mitigados, mas ainda são possíveis |

## Leitura adicional {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique padrão_
- [Estudo de Prova de autoridade](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [O que é Prova de autoridade](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Prova de autoridade explicada](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA em blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique explicado](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA obsoleta, especificação Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, outra implementação da PoA](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

Assista a uma explicação visual da prova de autoridade:

<YouTube id="Mj10HSEM5_8" />

## Tópicos relacionados {#related-topics}

- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
- [Prova de participação](/developers/docs/consensus-mechanisms/pos/)
