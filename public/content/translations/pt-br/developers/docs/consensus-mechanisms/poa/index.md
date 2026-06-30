---
title: Prova de autoridade (PoA)
description: Uma explicação do protocolo de consenso de prova de autoridade e seu papel no ecossistema da blockchain.
lang: pt-br
---

**A prova de autoridade (PoA)** é um algoritmo de consenso baseado em reputação que é uma versão modificada da [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/). Ela é usada principalmente por cadeias privadas, redes de teste e redes de desenvolvimento local. A PoA é um algoritmo de consenso baseado em reputação que exige confiar em um conjunto de signatários autorizados para produzir blocos, em vez de um mecanismo baseado em stake na PoS.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é prova de autoridade (PoA)? {#what-is-poa}

A prova de autoridade é uma versão modificada da **[Prova de Participação](/developers/docs/consensus-mechanisms/pos/) (PoS)**, sendo um algoritmo de consenso baseado em reputação em vez de um mecanismo baseado em stake na PoS. O termo foi introduzido pela primeira vez em 2017 por Gavin Wood, e esse algoritmo de consenso tem sido usado principalmente por cadeias privadas, redes de teste e redes de desenvolvimento local, pois supera a necessidade de recursos de alta qualidade, como a PoW exige, e supera os problemas de escalabilidade com a PoS por ter um pequeno subconjunto de nós armazenando a blockchain e produzindo blocos.

A prova de autoridade exige confiar em um conjunto de signatários autorizados que são definidos no [bloco gênesis](/glossary/#genesis-block). Na maioria das implementações atuais, todos os signatários autorizados mantêm poder e privilégios iguais ao determinar o consenso da cadeia. A ideia por trás do staking de reputação é que cada validador autorizado seja bem conhecido por todos através de processos como KYC (Know Your Customer), ou por ter uma organização renomada como a única validadora — dessa forma, se um validador fizer algo errado, a sua identidade será conhecida.

Existem várias implementações de PoA, mas a implementação padrão do Ethereum é o **clique**, que implementa a [EIP-225](https://eips.ethereum.org/EIPS/eip-225). O Clique é favorável aos desenvolvedores e é um padrão fácil de implementar, suportando todos os tipos de sincronização de cliente. Outras implementações incluem o [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) e o [Aura](https://openethereum.github.io/Chain-specification).

## Como funciona {#how-it-works}

Na PoA, um conjunto de signatários autorizados é selecionado para criar novos blocos. Os signatários são selecionados com base em sua reputação e são os únicos com permissão para criar novos blocos. Os signatários são selecionados em um formato round-robin e cada signatário tem permissão para criar um bloco em um período de tempo específico. O tempo de criação do bloco é fixo, e os signatários devem criar um bloco dentro desse período de tempo.

A reputação neste contexto não é uma coisa quantificada; em vez disso, é a reputação de corporações famosas como a Microsoft e o Google, portanto, a maneira de selecionar os signatários confiáveis não é algorítmica, mas sim o ato humano normal de _confiança_ em que uma entidade, digamos, por exemplo, a Microsoft, cria uma rede privada PoA entre centenas ou milhares de startups e assume o papel como a única signatária confiável com a possibilidade de adicionar outros signatários famosos, como o Google, no futuro. As startups, sem dúvida, confiariam na Microsoft para agir de maneira honesta o tempo todo e usariam a rede. Isso resolve a necessidade de fazer stake em diferentes redes pequenas/privadas que foram construídas para propósitos diferentes para mantê-las descentralizadas e funcionando, além da necessidade de mineradores, o que consome muita energia e recursos. Algumas redes privadas usam o padrão PoA de maneira original, como a VeChain, e algumas o modificam, como a Binance, que usa o [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), o qual é uma versão customizada e modificada de PoA e PoS.

O processo de votação é feito pelos próprios signatários. Cada signatário vota pela adição ou remoção de um signatário em seu bloco ao criar um novo bloco. Os votos são computados pelos nós, e os signatários são adicionados ou removidos com base nos votos que atingem um determinado limite `SIGNER_LIMIT`.

Pode haver uma situação em que ocorram pequenos forks; a dificuldade de um bloco depende de o bloco ter sido assinado na sua vez ou fora da vez. Blocos "na vez" têm dificuldade 2, e blocos "fora da vez" têm dificuldade 1. No caso de pequenos forks, a cadeia com a maioria dos signatários selando blocos "na vez" acumulará a maior dificuldade e vencerá.

## Vetores de ataque {#attack-vectors}

### Signatários mal-intencionados {#malicious-signers}

Um usuário mal-intencionado pode ser adicionado à lista de signatários, ou uma máquina/chave de assinatura pode ser comprometida. Em um cenário assim, o protocolo precisa ser capaz de se defender contra reorgs e envios de spam. A solução proposta é que, dada uma lista de N signatários autorizados, qualquer signatário só pode cunhar 1 bloco a cada K blocos. Isso garante que os danos sejam limitados e que os demais validadores possam votar para expulsar o usuário mal-intencionado.

### Censura {#censorship-attack}

Outro vetor de ataque interessante é se um signatário (ou grupo de signatários) tentar censurar os blocos que votam pela remoção deles da lista de autorização. Para contornar isso, a frequência de cunhagem permitida dos signatários é restrita a 1 em N/2. Isso garante que os signatários mal-intencionados precisem controlar pelo menos 51% das contas de assinatura, momento em que eles se tornariam efetivamente a nova fonte da verdade para a cadeia.

### Spam {#spam-attack}

Outro pequeno vetor de ataque consiste em signatários mal-intencionados injetando novas propostas de voto dentro de cada bloco que eles cunham. Como os nós precisam computar todos os votos para criar a lista real de signatários autorizados, eles devem registrar todos os votos ao longo do tempo. Sem colocar um limite na janela de votação, isso poderia crescer lentamente, mas de forma ilimitada. A solução é colocar uma janela _móvel_ de W blocos após a qual os votos são considerados obsoletos. _Uma janela razoável pode ser de 1 a 2 épocas._

### Blocos concorrentes {#concurrent-blocks}

Em uma rede PoA, quando há N signatários autorizados, cada signatário tem permissão para cunhar 1 bloco a cada K blocos, o que significa que N-K+1 validadores têm permissão para cunhar em um determinado momento. Para impedir que esses validadores disputem pela criação dos blocos, cada signatário deve adicionar um pequeno "deslocamento" (offset) aleatório no momento em que lança um novo bloco. Embora esse processo garanta que os pequenos forks sejam raros, forks ocasionais ainda podem acontecer, assim como na Mainnet. Se um signatário for descoberto abusando do seu poder e causando o caos, os outros signatários podem votar para expulsá-lo.

Se, por exemplo, houver 10 signatários autorizados e cada signatário puder criar 1 bloco a cada 6 blocos, em qualquer momento, 5 validadores poderão criar blocos. Para impedi-los de correr para criar blocos, cada signatário adiciona um pequeno "deslocamento" aleatório no momento em que lança um novo bloco. Isso reduz a ocorrência de pequenos forks, mas ainda permite forks ocasionais, como visto na Rede Principal do Ethereum. Se um signatário usar indevidamente a sua autoridade e causar interrupções, ele poderá ser expulso da rede por votação.

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                                | Contras                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mais escalável que outros mecanismos populares, como PoS e PoW, pois é baseado em um número limitado de signatários de blocos                                                       | As redes PoA geralmente têm um número relativamente pequeno de nós de validação. Isso torna uma rede PoA mais centralizada.                                              |
| As blockchains baseadas em PoA são incrivelmente baratas para operar e manter                                                                                                       | Tornar-se um signatário autorizado normalmente está fora do alcance de uma pessoa comum, porque a blockchain requer entidades com reputação estabelecida.                |
| As transações são confirmadas muito rapidamente, podendo levar menos de 1 segundo, porque apenas um número limitado de signatários é necessário para validar os novos blocos        | Signatários mal-intencionados podem causar reorg, gasto duplo ou censurar transações na rede. Esses ataques são mitigados, mas ainda são possíveis                       |

## Leitura adicional {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Padrão Clique_
- [Estudo da Prova de Autoridade](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Criptoeconomia_
- [O que é Prova de Autoridade](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Prova de Autoridade Explicada](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [PoA em blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique explicado](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA obsoleto, especificação Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, outra implementação de PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Aprende melhor visualmente? {#visual-learner}

Assista a uma explicação visual da prova de autoridade:

<VideoWatch slug="proof-of-authority-explained" />

## Tópicos relacionados {#related-topics}

- [Prova de Trabalho](/developers/docs/consensus-mechanisms/pow/)
- [Prova de Participação](/developers/docs/consensus-mechanisms/pos/)