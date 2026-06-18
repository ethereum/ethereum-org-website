---
title: Mecanismos de consenso
description: "Uma explicação dos protocolos de consenso em sistemas distribuídos e o papel que desempenham no Ethereum."
lang: pt-br
authors: ["Patrick Collins"]
---

O termo 'mecanismo de consenso' é frequentemente usado coloquialmente para se referir aos protocolos de 'Prova de Participação (PoS)', 'Prova de Trabalho (PoW)' ou 'prova de autoridade (PoA)'. No entanto, estes são apenas componentes nos mecanismos de consenso que protegem contra [ataques Sybil](/glossary/#sybil-attack). Os mecanismos de consenso são a pilha completa de ideias, protocolos e incentivos que permitem que um conjunto distribuído de nós concorde com o estado de uma blockchain.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## O que é consenso? {#what-is-consensus}

Por consenso, queremos dizer que um acordo geral foi alcançado. Considere um grupo de pessoas indo ao cinema. Se não houver discordância sobre a escolha de um filme proposto, então um consenso é alcançado. Se houver discordância, o grupo deve ter os meios para decidir qual filme assistir. Em casos extremos, o grupo acabará se dividindo.

Em relação à blockchain do [Ethereum](/), o processo é formalizado, e alcançar o consenso significa que pelo menos 66% dos nós da rede concordam com o estado global da rede.

## O que é um mecanismo de consenso? {#what-is-a-consensus-mechanism}

O termo mecanismo de consenso refere-se a toda a pilha de protocolos, incentivos e ideias que permitem que uma rede de nós concorde com o estado de uma blockchain.

O Ethereum usa um mecanismo de consenso baseado em Prova de Participação (PoS) que deriva sua segurança criptoeconômica de um conjunto de recompensas e penalidades aplicadas ao capital bloqueado pelos stakers. Essa estrutura de incentivos encoraja os stakers individuais a operar validadores honestos, pune aqueles que não o fazem e cria um custo extremamente alto para atacar a rede.

Em seguida, há um protocolo que governa como os validadores honestos são selecionados para propor ou validar blocos, processar transações e votar em sua visão do topo da cadeia. Nas raras situações em que vários blocos estão na mesma posição perto do topo da cadeia, há um mecanismo de escolha de fork que seleciona os blocos que compõem a cadeia mais 'pesada', medida pelo número de validadores que votaram nos blocos ponderados pelo seu saldo de ether em stake.

Alguns conceitos são importantes para o consenso que não estão explicitamente definidos no código, como a segurança adicional oferecida por uma potencial coordenação social fora da banda como uma última linha de defesa contra ataques à rede.

Esses componentes juntos formam o mecanismo de consenso.

## Tipos de mecanismos de consenso {#types-of-consensus-mechanisms}

### Baseado em Prova de Trabalho (PoW) {#proof-of-work}

Assim como o Bitcoin, o Ethereum já usou um protocolo de consenso baseado em **Prova de Trabalho (PoW)**.

#### Criação de blocos {#pow-block-creation}

Os mineradores competem para criar novos blocos preenchidos com transações processadas. O vencedor compartilha o novo bloco com o resto da rede e ganha alguns ETH recém-cunhados. A corrida é vencida pelo computador que consegue resolver um quebra-cabeça matemático mais rápido. Isso produz o link criptográfico entre o bloco atual e o bloco anterior. Resolver esse quebra-cabeça é o trabalho na "Prova de Trabalho (PoW)". A cadeia canônica é então determinada por uma regra de escolha de fork que seleciona o conjunto de blocos que tiveram mais trabalho realizado para minerá-los.

#### Segurança {#pow-security}

A rede é mantida segura pelo fato de que você precisaria de 51% do poder de computação da rede para fraudar a cadeia. Isso exigiria investimentos tão grandes em equipamentos e energia; é provável que você gaste mais do que ganharia.

Mais sobre [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Baseado em Prova de Participação (PoS) {#proof-of-stake}

O Ethereum agora usa um protocolo de consenso baseado em **Prova de Participação (PoS)**.

#### Criação de blocos {#pos-block-creation}

Os validadores criam blocos. Um validador é selecionado aleatoriamente em cada slot para ser o propositor de bloco. Seu cliente de consenso solicita um pacote de transações como uma 'carga de execução' de seu cliente de execução emparelhado. Eles envolvem isso em dados de consenso para formar um bloco, que enviam para outros nós na rede Ethereum. Essa produção de bloco é recompensada em ETH. Em casos raros, quando existem vários blocos possíveis para um único slot, ou os nós ouvem sobre blocos em momentos diferentes, o algoritmo de escolha de fork escolhe o bloco que forma a cadeia com o maior peso de atestações (onde o peso é o número de validadores atestando dimensionado pelo seu saldo de ETH).

#### Segurança {#pos-security}

Um sistema de Prova de Participação (PoS) é seguro criptoeconomicamente porque um invasor que tenta assumir o controle da cadeia deve destruir uma quantidade enorme de ETH. Um sistema de recompensas incentiva os stakers individuais a se comportarem honestamente, e as penalidades desincentivam os stakers de agirem maliciosamente.

Mais sobre [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/)

### Um guia visual {#types-of-consensus-video}

Assista mais sobre os diferentes tipos de mecanismos de consenso usados no Ethereum:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Resistência Sybil e seleção de cadeia {#sybil-chain}

A Prova de Trabalho (PoW) e a Prova de Participação (PoS) sozinhas não são protocolos de consenso, mas muitas vezes são referidas como tal por simplicidade. Na verdade, elas são mecanismos de resistência Sybil e seletores de autores de blocos; elas são uma maneira de decidir quem é o autor do bloco mais recente. Outro componente importante é o algoritmo de seleção de cadeia (também conhecido como algoritmo de escolha de fork) que permite que os nós escolham um único bloco correto no topo da cadeia em cenários onde existem vários blocos na mesma posição.

A **resistência Sybil** mede como um protocolo se sai contra um ataque Sybil. A resistência a esse tipo de ataque é essencial para uma blockchain descentralizada e permite que mineradores e validadores sejam recompensados igualmente com base nos recursos investidos. A Prova de Trabalho (PoW) e a Prova de Participação (PoS) protegem contra isso fazendo com que os usuários gastem muita energia ou coloquem muito colateral. Essas proteções são um impedimento econômico para ataques Sybil.

Uma **regra de seleção de cadeia** é usada para decidir qual cadeia é a cadeia "correta". O Bitcoin usa a regra da "cadeia mais longa", o que significa que qualquer blockchain que seja a mais longa será a que o resto dos nós aceitará como válida e com a qual trabalhará. Para cadeias de Prova de Trabalho (PoW), a cadeia mais longa é determinada pela dificuldade total cumulativa de Prova de Trabalho (PoW) da cadeia. O Ethereum também costumava usar a regra da cadeia mais longa; no entanto, agora que o Ethereum roda em Prova de Participação (PoS), ele adotou um algoritmo de escolha de fork atualizado que mede o 'peso' da cadeia. O peso é a soma acumulada dos votos dos validadores, ponderada pelos saldos de ether em stake dos validadores.

O Ethereum usa um mecanismo de consenso conhecido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) que combina a [Prova de Participação (PoS) Casper FFG](https://arxiv.org/abs/1710.09437) com a [regra de escolha de fork GHOST](https://arxiv.org/abs/2003.03052).

## Leitura adicional {#further-reading}

- [O que é um algoritmo de consenso de blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [O que é o Consenso de Nakamoto? Guia completo para iniciantes](https://blockonomi.com/nakamoto-consensus/)
- [Como o Casper funciona?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sobre a segurança e o desempenho de blockchains de Prova de Trabalho (PoW)](https://eprint.iacr.org/2016/555.pdf)
- [Falha bizantina](https://en.wikipedia.org/wiki/Byzantine_fault)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Prova de autoridade (PoA)](/developers/docs/consensus-mechanisms/poa/)