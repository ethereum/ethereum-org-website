---
title: Mecanismos de consenso
description: Uma explicação dos protocolos de consenso em sistemas distribuídos e o papel que desempenham no Ethereum.
lang: pt-br
---

O termo "mecanismo de consenso" é frequentemente usado de forma coloquial para se referir a protocolos de "prova de participação", "prova de trabalho" ou "prova de autoridade". No entanto, esses são apenas componentes nos mecanismos de consenso que protegem contra [ataques Sybil](/glossary/#sybil-attack). Mecanismos de consenso são a pilha completa de ideias, protocolos e incentivos que permitem que um conjunto distribuído de nós concorde com o estado da cadeia de blocos.

## Pré-requisitos {#prerequisites}

Para melhor entender esta página, recomendamos que você leia primeiro a nossa [Introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## O que é consenso? {#what-is-consensus}

Por consenso, queremos dizer que se chegou a um acordo geral. Considere um grupo de pessoas indo ao cinema. Se não houver desacordo sobre uma proposta de escolha de filme, então um consenso é alcançado. Se houver desacordo, o grupo deve ter meios para decidir qual filme assistir. Em casos extremos, o grupo eventualmente se separará.

Em relação à cadeia de blocos Ethereum, o processo é formalizado e chegar a um consenso significa que pelo menos 66% dos nós da rede concordam com o estado global da rede.

## O que é um mecanismo de consenso? {#what-is-a-consensus-mechanism}

O termo mecanismo de consenso refere-se a toda a pilha de protocolos, incentivos e ideias que permitem que uma rede de nós concorde com o estado de uma cadeia de blocos.

O Ethereum utiliza um mecanismo de consenso baseado em provas de participação que deriva sua segurança criptoeconômica de um conjunto de recompensas e penalidades aplicadas ao capital bloqueado pelos participantes. Essa estrutura de incentivos encoraja os participantes individuais a operar validadores honestos, pune aqueles que não o fazem e cria um custo extremamente alto para atacar a rede.

Em seguida, existe um protocolo que rege como validadores honestos são selecionados para propor ou validar blocos, processar transações e votar por sua visão do topo da cadeia. Nas raras situações em que vários blocos estão na mesma posição perto do topo da cadeia, existe um mecanismo de escolha da bifurcação que seleciona os blocos que compõem a cadeia "mais pesada", medido pelo número de validadores que votaram nos blocos ponderados pelo seu equilíbrio de ether colocado.

Alguns conceitos são importantes para o consenso que não estão explicitamente definidos no código, como a segurança adicional oferecida pela potencial coordenação social fora de banda como última linha de defesa contra ataques na rede.

Esses componentes juntos formam o mecanismo de consenso.

## Tipos de mecanismos de consenso {#types-of-consensus-mechanisms}

### Baseado em prova de trabalho {#proof-of-work}

Como o Bitcoin, o Ethereum já usou um protocolo de consenso baseado em **prova de trabalho (PoW)**.

#### Criação de blocos {#pow-block-creation}

Os mineradores competem para criar novos blocos preenchidos com transações processadas. O ganhador compartilha o novo bloco com o restante da rede e ganha alguns ETH recentemente cunhados. A corrida é vencida pelo computador que é capaz de resolver um quebra-cabeça matemático mais rápido. Isso produz o link criptográfico entre o bloco atual e o bloco anterior. Resolver o quebra-cabeça é o trabalho na “prova de trabalho”. A cadeia padrão é então determinada por uma regra de escolha de bifurcação que seleciona o conjunto de blocos que tiveram mais trabalho para minerá-los.

#### Segurança {#pow-security}

A rede é mantida segura pelo fato de que você precisaria de 51% da capacidade dos computadores da rede para defraudar a cadeia. Isso exigiria investimentos tão grandes em equipamentos e energia que é bastante provável que você teria mais prejuízos do que lucros.

Mais sobre [prova de trabalho](/developers/docs/consensus-mechanisms/pow/)

### Baseado em prova de participação {#proof-of-stake}

O Ethereum agora usa um protocolo de consenso baseado em **prova de participação (PoS)**.

#### Criação de blocos {#pos-block-creation}

Validadores criam blocos. Um validador é selecionado aleatoriamente em cada espaço para ser o proponente do bloco. Seu cliente de consenso solicita um pacote de transações como uma “carga de execução” de seu cliente de execução emparelhado. Eles envolvem isso em dados de consenso para formar um bloco, o qual eles enviam para outros nós na rede Ethereum. Essa produção de blocos é recompensada em ETH. Em casos raros, quando existem múltiplos blocos possíveis para um único espaço, ou os nós ouvem sobre blocos em tempos diferentes, o algoritmo da bifurcação escolhido seleciona o bloco que forma a cadeia com o maior peso de atestações (em que o peso é o número de validadores que atestam a escala pelo seu saldo ETH).

#### Segurança {#pos-security}

Um sistema de prova de participação é cripto-economicamente seguro porque um invasor que tentar assumir o controle da cadeia deverá destruir uma enorme quantidade de ETH. Um sistema de recompensas incentiva os participantes individuais a se comportarem honestamente, e as penalidades desincentivam os participantes de agirem modo malicioso.

Mais sobre [prova de participação](/developers/docs/consensus-mechanisms/pos/)

### Um guia visual {#types-of-consensus-video}

Saiba mais sobre os diferentes tipos de mecanismos de consenso utilizados no Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Resistência a ataques Sybil e seleção de cadeia {#sybil-chain}

Prova de trabalho e prova de participação por si só não são protocolos de consenso, mas são frequentemente referidos como tal por simplicidade. Na verdade, são mecanismos de resistência a ataques Sybil e bloqueiam os seletores de autores; eles são uma maneira de decidir quem é o autor do bloco mais recente. Outro componente importante é o algoritmo de seleção de cadeia (também conhecido como escolha da bifurcação), o qual permite que os nós escolham um único bloco correto no início da cadeia em cenários em que existem vários blocos na mesma posição.

**A resistência a ataques Sybil** mede como um protocolo se comporta frente um ataque Sybil. A resistência a esse tipo de ataque é essencial para uma cadeia de blocos descentralizada e permite que os mineradores e validadores sejam recompensados igualmente com base nos recursos colocados. A prova de trabalho e a prova de participação protegem contra isso fazendo os usuários gastarem muita energia ou colocarem muitas garantias. Essas proteções são um elemento econômico de dissuasão dos ataques Sybil.

Uma **regra de seleção de cadeia** é usada para decidir qual é a cadeia "correta". O Bitcoin usa a regra da "cadeia mais longa", o que significa que qualquer cadeia de blocos mais longa será aquela que o resto dos nós aceitam como válida e com a qual trabalha. Para as cadeias de prova de trabalho, a cadeia mais longa é determinada pela dificuldade cumulativa total da prova de trabalho. O Ethereum costumava usar a regra da cadeia mais longa também; no entanto, agora que o Ethereum é executado em prova de participação, ele adotou um algoritmo atualizado de escolha da bifurcação que mede o "peso" da cadeia. O peso é a soma acumulada dos votos do validador, ponderada pelos saldos de ether envolvidos do validador.

O Ethereum usa um mecanismo de consenso conhecido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) que combina a [prova de participação do Casper FFG](https://arxiv.org/abs/1710.09437) com a [regra de escolha de bifurcação GHOST](https://arxiv.org/abs/2003.03052).

## Leitura adicional {#further-reading}

- [O que é um algoritmo de consenso de blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [O que é Consenso de Nakamoto? Guia completo do principiante](https://blockonomi.com/nakamoto-consensus/)
- [Como o Casper funciona?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sobre a segurança e o desempenho das blockchains de prova de trabalho](https://eprint.iacr.org/2016/555.pdf)
- [Falha bizantina](https://en.wikipedia.org/wiki/Byzantine_fault)

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prova de participação](/developers/docs/consensus-mechanisms/pos/)
- [Prova de autoridade](/developers/docs/consensus-mechanisms/poa/)
