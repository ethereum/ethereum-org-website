---
title: Gasper
description: "Uma explicação do mecanismo de Prova de Participação (PoS) Gasper."
lang: pt-br
---

O Gasper é uma combinação do Casper the Friendly Finality Gadget (Casper FFG) e do algoritmo de escolha de fork LMD-GHOST. Juntos, esses componentes formam o mecanismo de consenso que protege o Ethereum em Prova de Participação (PoS). O Casper é o mecanismo que atualiza certos blocos para "finalizados" para que os novos participantes da rede possam ter certeza de que estão sincronizando a cadeia canônica. O algoritmo de escolha de fork usa votos acumulados para garantir que os nós possam selecionar facilmente a correta quando surgirem bifurcações na blockchain.

**Observação:** a definição original do Casper FFG foi ligeiramente atualizada para inclusão no Gasper. Nesta página, consideramos a versão atualizada.

## Pré-requisitos {#prerequisites}

Para entender este material, é necessário ler a página introdutória sobre [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/).

## O papel do Gasper {#role-of-gasper}

O Gasper opera sobre uma blockchain de Prova de Participação (PoS), onde os nós fornecem ether como um depósito de segurança que pode ser destruído se forem preguiçosos ou desonestos ao propor ou validar blocos. O Gasper é o mecanismo que define como os validadores são recompensados e punidos, decidem quais blocos aceitar e rejeitar e em qual bifurcação da blockchain construir.

## O que é finalidade? {#what-is-finality}

A finalidade é uma propriedade de certos blocos que significa que eles não podem ser revertidos, a menos que tenha havido uma falha crítica de consenso e um invasor tenha destruído pelo menos 1/3 do total de ether em stake. Blocos finalizados podem ser considerados como informações sobre as quais a blockchain tem certeza. Um bloco deve passar por um procedimento de atualização de duas etapas para ser finalizado:

1. Dois terços do total de ether em stake devem ter votado a favor da inclusão desse bloco na cadeia canônica. Essa condição atualiza o bloco para "justificado". É improvável que blocos justificados sejam revertidos, mas eles podem ser sob certas condições.
2. Quando outro bloco é justificado no topo de um bloco justificado, ele é atualizado para "finalizado". Finalizar um bloco é um compromisso de incluir o bloco na cadeia canônica. Ele não pode ser revertido a menos que um invasor destrua milhões de ether (bilhões de dólares).

Essas atualizações de bloco não acontecem em todos os slots. Em vez disso, apenas os blocos de limite de época podem ser justificados e finalizados. Esses blocos são conhecidos como "pontos de verificação". A atualização considera pares de pontos de verificação. Um "link de supermaioria" deve existir entre dois pontos de verificação sucessivos (ou seja, dois terços do total de ether em stake votando que o ponto de verificação B é o descendente correto do ponto de verificação A) para atualizar o ponto de verificação menos recente para finalizado e o bloco mais recente para justificado.

Como a finalidade requer um acordo de dois terços de que um bloco é canônico, um invasor não pode criar uma cadeia finalizada alternativa sem:

1. Possuir ou manipular dois terços do total de ether em stake.
2. Destruir pelo menos um terço do total de ether em stake.

A primeira condição surge porque dois terços do ether em stake são necessários para finalizar uma cadeia. A segunda condição surge porque, se dois terços do stake total votaram a favor de ambas as bifurcações, então um terço deve ter votado em ambas. O voto duplo é uma condição de penalização que seria punida ao máximo, e um terço do stake total seria destruído. Em maio de 2022, isso exigia que um invasor queimasse cerca de US$ 10 bilhões em ether. O algoritmo que justifica e finaliza blocos no Gasper é uma forma ligeiramente modificada do [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Incentivos e penalização {#incentives-and-slashing}

Os validadores são recompensados por propor e validar blocos honestamente. O ether é recompensado e adicionado ao seu stake. Por outro lado, os validadores que estão ausentes e não agem quando chamados perdem essas recompensas e, às vezes, perdem uma pequena parte de seu stake existente. No entanto, as penalidades por estar offline são pequenas e, na maioria dos casos, equivalem a custos de oportunidade por perder recompensas. No entanto, algumas ações do validador são muito difíceis de fazer acidentalmente e significam alguma intenção maliciosa, como propor vários blocos para o mesmo slot, atestar vários blocos para o mesmo slot ou contradizer votos de pontos de verificação anteriores. Esses são comportamentos passíveis de penalização que são punidos com mais severidade — a penalização resulta na destruição de parte do stake do validador e na remoção do validador da rede de validadores. Esse processo leva 36 dias. No dia 1, há uma penalidade inicial de até 1 ETH. Em seguida, o ether do validador penalizado é drenado lentamente durante o período de saída, mas no dia 18, ele recebe uma "penalidade de correlação", que é maior quando mais validadores são penalizados na mesma época. A penalidade máxima é todo o stake. Essas recompensas e penalidades são projetadas para incentivar validadores honestos e desincentivar ataques à rede.

### Vazamento por inatividade {#inactivity-leak}

Além da segurança, o Gasper também fornece "vivacidade plausível". Essa é a condição de que, desde que dois terços do total de ether em stake estejam votando honestamente e seguindo o protocolo, a cadeia poderá ser finalizada independentemente de qualquer outra atividade (como ataques, problemas de latência ou penalizações). Dito de outra forma, um terço do total de ether em stake deve ser de alguma forma comprometido para impedir que a cadeia seja finalizada. No Gasper, há uma linha de defesa adicional contra uma falha de vivacidade, conhecida como "vazamento por inatividade". Esse mecanismo é ativado quando a cadeia não consegue ser finalizada por mais de quatro épocas. Os validadores que não estão atestando ativamente a cadeia majoritária têm seu stake gradualmente drenado até que a maioria recupere dois terços do stake total, garantindo que as falhas de vivacidade sejam apenas temporárias.

### Escolha de fork {#fork-choice}

A definição original do Casper FFG incluía um algoritmo de escolha de fork que impunha a regra: `follow the chain containing the justified checkpoint that has the greatest height` onde a altura é definida como a maior distância do bloco gênesis. No Gasper, a regra original de escolha de fork foi descontinuada em favor de um algoritmo mais sofisticado chamado LMD-GHOST. É importante perceber que, em condições normais, uma regra de escolha de fork é desnecessária - há um único propositor de bloco para cada slot, e validadores honestos atestam isso. É apenas em casos de grande assincronicidade da rede ou quando um propositor de bloco desonesto se equivocou que um algoritmo de escolha de fork é necessário. No entanto, quando esses casos surgem, o algoritmo de escolha de fork é uma defesa crítica que protege a cadeia correta.

LMD-GHOST significa "latest message-driven greedy heaviest observed sub-tree" (subárvore observada mais pesada e gananciosa orientada pela mensagem mais recente). Essa é uma maneira cheia de jargões para definir um algoritmo que seleciona a bifurcação com o maior peso acumulado de atestados como a canônica (subárvore mais pesada e gananciosa) e que, se várias mensagens forem recebidas de um validador, apenas a mais recente será considerada (orientada pela mensagem mais recente). Antes de adicionar o bloco mais pesado à sua cadeia canônica, cada validador avalia cada bloco usando essa regra.

## Leitura adicional {#further-reading}

- [Gasper: Combinando GHOST e Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)