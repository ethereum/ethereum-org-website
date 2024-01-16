---
title: Gasper
description: Uma explicação do mecanismo de prova de participação do Gasper.
lang: pt-br
---

Gasper é uma combinação de Casper, o Gadget de Finalidade Amigável (Casper-FFG) e o algoritmo de escolha do fork de LMD-GHOST. Juntos, esses componentes formam o mecanismo de consenso que garante a prova de participação do Ethereum. Casper é o mecanismo que atualiza certos blocos para "finalizados" para que os novos participantes da rede possam ter certeza de que estão sincronizando a cadeia canônica. O algoritmo de escolha de fork usa votos acumulados para garantir que os nós possam selecionar facilmente o correto quando surgirem forks na blockchain.

**Observe** que a definição original de Casper-FFG foi levemente atualizada para inclusão no Gasper. Nesta página consideramos a versão atualizada.

## Pré-requisitos

Para entender este material, é necessário ler a página introdutória em [prova de participação](/developers/docs/consensus-mechanisms/pos/).

## O papel do Gasper {#role-of-gasper}

Gasper se encontra no topo de uma blockchain de prova de participação onde os nós fornecem ether como um depósito de segurança que pode ser destruído se eles forem lentos ou desonestos em propor ou validar blocos. Gasper é o mecanismo que define como os validadores são recompensados e punidos, decide quais blocos aceitar e rejeitar, e em qual fork da blockchain se baseará.

## O que é a finalidade? {#what-is-finality}

Finalidade é uma propriedade de certos blocos que significa que eles não podem ser revertidos a menos que tenha havido um fracasso crítico do consenso e um atacante tenha destruído pelo menos 1/3 do ether total em stake. Blocos finalizados podem ser considerados informações sobre as quais a blockchain está totalmente segura. Um bloco deve passar por um procedimento de atualização em duas etapas para que seja finalizado:

1. Dois terços do total do ether em stake devem ter votado a favor da inclusão desse bloco na cadeia canônica. Essa condição atualiza o bloco para "justificado". Blocos justificados dificilmente serão revertidos, mas podem ser em determinadas condições.
2. Quando outro bloco é justificado em cima de um bloco justificado, ele é atualizado para "finalizado". Finalizar um bloco é um compromisso de incluí-lo na cadeia canônica. Não pode ser revertido, a menos que um atacante destrua milhões de ether (bilhões de $USD).

Estas atualizações de blocos não acontecem em todos os slots. Em vez disso, apenas blocos adjacentes ao epoch podem ser justificados e finalizados. Estes blocos são conhecidos como "checkpoints". A atualização considera pares de checkpoints. Um "link da grande maioria" deve existir entre dois checkpoints sucessivos (ou seja, dois terços do total em stake de ether votam que o checkpoint B é o descendente correto do checkpoint A) para atualizar o checkpoint menos recente para finalizado e o bloco mais recente para justificado.

Dado que a finalidade requer um acordo de dois terços de que um bloco é canônico, um atacante não pode possivelmente criar uma cadeia finalizada alternativa sem:

1. Possuir ou manipular dois terços do ether em stake.
2. Destruir pelo menos um terço do ether em stake.

A primeira condição surge porque dois terços do ether em stake são necessários para finalizar uma cadeia. A segunda condição surge porque se dois terços do stake total votaram a favor de ambos forks, então um terço deve ter votado em ambos. O voto duplicado é uma condição de corte, que seria punida ao máximo, e um terço do stake total seria destruído. Desde maio de 2022, isto requer que um atacante queime cerca de US$ 10 bilhões de ether. O algoritmo que justifica e finaliza os blocos no Gasper é uma forma ligeiramente modificada de [Casper o Gadget de Finalidade Amigável (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Incentivos e cortes {#incentives-and-slashing}

Os validadores são recompensados por propor e validar blocos honestamente. Ether é dado como recompensa e adicionado ao stake deles. Por outro lado, validadores que estão ausentes e não conseguem agir quando chamados perdem essas recompensas e, às vezes, perdem uma pequena parte de seu stake existente. No entanto, as penalizações por estar off-line são pequenas e, na maioria dos casos, equivalem ao custo das recompensas perdidas. No entanto, algumas ações do validador são muito difíceis de fazer acidentalmente e significam alguma intenção maliciosa, tais como propor vários blocos para o mesmo slot, atestar em vários blocos para o mesmo slot, ou contradizer votos anteriores de checkpoint. Estes são comportamentos "de remoção" que são penalizados mais duramente: destruição de parte da participação do validador e o validador sendo removido da rede de validadores. Este processo dura 36 dias. No dia 1, há uma penalidade inicial de até 1 ETH. O ether do validador removido drena lentamente ao longo do período de saída, mas no dia 18 eles recebem uma “penalidade de correlação”, que é maior quando mais validadores são removidos ao mesmo tempo. A pena máxima é todo o stake. Essas recompensas e penalidades são concebidas para incentivar validadores honestos e desincentivar ataques na rede.

### Perda por inatividade {#inactivity-leak}

Além da segurança, o Gasper também fornece "uma vivacidade plausível". Esta condição prevê que enquanto dois terços do ether total em stake votarem honestamente e seguirem o protocolo, a cadeia poderá finalizar independentemente de qualquer outra atividade (como ataques, problemas de latência ou cortes). Em outras palavras, um terço do ether total em stake deve estar comprometido de alguma forma para evitar que a cadeia finalize. No Gasper, existe uma linha de defesa adicional contra uma falha de vivacidade, conhecida como o "perda por inatividade". Este mecanismo é ativado quando a cadeia falhou em finalizar por mais de quatro epochs. Os validadores que não estão atestando ativamente a cadeia da maioria, têm seu stake gradualmente drenado até que a maioria recupere dois terços do stake total, assegurando que as falhas de vivacidade sejam apenas temporárias.

### Escolha do fork {#fork-choice}

A definição original do Casper-FFG incluía um algoritmo de escolha de fork que determinava a regra: `follow the chain containing the justified checkpoint that has the greatest height` em que a altura é definida como a maior distância do bloco de início. No Gasper, a regra de escolha do fork original está descontinuada em favor de um algoritmo mais sofisticado chamado LMD-GHOST. É importante compreender que, em condições normais, uma regra de escolha de fork é desnecessária – há um único proponente de bloco para cada slot, e validadores honestos atestam isso. Um algoritmo de escolha de fork é necessário somente quando há uma grande assincronicidade de rede ou quando um proponente de blocos desonesto se equivoca. Quando esses casos surgem, o algoritmo de escolha do fork é uma defesa fundamental que protege a cadeia correta.

LMD-GHOST são as siglas de "latest message-driven greedy heaviest observed sub-tree". Esta é uma definição em jargão de um algoritmo que seleciona o fork com o maior peso acumulado de confimações como a canônica (subárvore mais pesada) e que se várias mensagens forem recebidas de um validador, apenas a última será considerada (orientada pela última mensagem). Antes de adicionar o bloco mais pesado à sua cadeia canônica, todo validador avalia cada bloco usando esta regra.

## Leitura Adicional {#further-reading}

- [Gasper: Combinando GHOST e Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper, o Mecanismo de Finalidade Amigável](https://arxiv.org/pdf/1710.09437.pdf)
