---
title: Finalidade de slot único
description: Explicação sobre a finalidade de slot único
lang: pt-br
---

Leva cerca de 15 minutos para um bloco do [Ethereum](/) ser finalizado. No entanto, podemos fazer com que o mecanismo de consenso do Ethereum valide blocos de forma mais eficiente e diminua drasticamente o tempo até a finalidade. Em vez de esperar quinze minutos, os blocos poderiam ser propostos e finalizados no mesmo slot. Esse conceito é conhecido como **finalidade de slot único (SSF)**.

## O que é finalidade? {#what-is-finality}

No mecanismo de consenso baseado em Prova de Participação (PoS) do Ethereum, a finalidade refere-se à garantia de que um bloco não pode ser alterado ou removido da blockchain sem queimar pelo menos 33% do total de ETH em stake. Esta é uma segurança "criptoeconômica" porque a confiança vem do custo extremamente alto associado à alteração da ordem ou do conteúdo da cadeia, o que impediria qualquer ator econômico racional de tentar fazê-lo.

## Por que buscar uma finalidade mais rápida? {#why-aim-for-quicker-finality}

O tempo atual até a finalidade provou ser muito longo. A maioria dos usuários não quer esperar 15 minutos pela finalidade, e é inconveniente para aplicativos e corretoras que podem querer uma alta vazão de transações ter que esperar tanto tempo para ter certeza de que suas transações são permanentes. Ter um atraso entre a proposta de um bloco e a finalização também cria uma oportunidade para reorganizações curtas que um invasor poderia usar para censurar certos blocos ou extrair MEV. O mecanismo que lida com a atualização de blocos em estágios também é bastante complexo e foi corrigido várias vezes para fechar vulnerabilidades de segurança, tornando-o uma das partes da base de código do Ethereum onde bugs sutis têm maior probabilidade de surgir. Todos esses problemas poderiam ser eliminados reduzindo o tempo até a finalidade para um único slot.

## O compromisso entre descentralização, tempo e sobrecarga {#the-decentralization-time-overhead-tradeoff}

A garantia de finalidade não é uma propriedade imediata de um novo bloco; leva tempo para um novo bloco ser finalizado. A razão para isso é que validadores representando pelo menos 2/3 do total de ETH em stake na rede precisam votar no bloco ("atestar") para que ele seja considerado finalizado. Cada nó validador na rede precisa processar atestações de outros nós para saber se um bloco atingiu, ou não, esse limite de 2/3.

Quanto menor o tempo permitido para alcançar a finalização, mais poder de computação é exigido em cada nó, porque o processamento da atestação precisa ser feito mais rapidamente. Além disso, quanto mais nós validadores existirem na rede, mais atestações precisarão ser processadas para cada bloco, o que também aumenta o poder de processamento exigido. Quanto mais poder de processamento for exigido, menos pessoas poderão participar, pois é necessário um hardware mais caro para executar cada nó validador. Aumentar o tempo entre os blocos diminui o poder de computação exigido em cada nó, mas também prolonga o tempo até a finalidade, porque as atestações são processadas mais lentamente.

Portanto, há um compromisso (trade-off) entre a sobrecarga (poder de computação), a descentralização (número de nós que podem participar da validação da cadeia) e o tempo até a finalidade. O sistema ideal equilibra o mínimo de poder de computação, o máximo de descentralização e o mínimo de tempo até a finalidade.

O atual mecanismo de consenso do Ethereum equilibrou esses três parâmetros ao:

- **Definir o stake mínimo em 32 ETH**. Isso estabelece um limite superior no número de atestações de validadores que precisam ser processadas por nós individuais e, portanto, um limite superior nos requisitos computacionais para cada nó.
- **Definir o tempo até a finalidade em ~15 minutos**. Isso dá tempo suficiente para que validadores executados em computadores domésticos normais processem com segurança as atestações para cada bloco.

Com o design do mecanismo atual, para reduzir o tempo até a finalidade, é necessário reduzir o número de validadores na rede ou aumentar os requisitos de hardware para cada nó. No entanto, há melhorias que podem ser feitas na forma como as atestações são processadas que podem permitir que mais atestações sejam contadas sem aumentar a sobrecarga em cada nó. O processamento mais eficiente permitirá que a finalidade seja determinada dentro de um único slot, em vez de ao longo de duas épocas.

## Caminhos para a SSF {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

O mecanismo de consenso atual combina atestações de vários validadores, conhecidos como comitês, para reduzir o número de mensagens que cada validador precisa processar para validar um bloco. Todo validador tem a oportunidade de atestar em cada época (32 slots), mas em cada slot, apenas um subconjunto de validadores, conhecido como 'comitê', atesta. Eles fazem isso dividindo-se em sub-redes nas quais alguns validadores são selecionados para serem 'agregadores'. Cada um desses agregadores combina todas as assinaturas que veem de outros validadores em sua sub-rede em uma única assinatura agregada. O agregador que inclui o maior número de contribuições individuais passa sua assinatura agregada para o propositor de bloco, que a inclui no bloco junto com a assinatura agregada dos outros comitês.

Esse processo fornece capacidade suficiente para que todo validador vote em cada época, porque `32 slots * 64 committees * 256 validators per committee = 524,288 validators per epoch`. No momento da redação deste artigo (fevereiro de 2023), existem ~513.000 validadores ativos.

Neste esquema, só é possível que todo validador vote em um bloco distribuindo suas atestações por toda a época. No entanto, existem maneiras potenciais de melhorar o mecanismo para que _todo validador tenha a chance de atestar em cada slot_.
</ExpandableCard>

Desde que o mecanismo de consenso do Ethereum foi projetado, o esquema de agregação de assinaturas (BLS) provou ser muito mais escalável do que se pensava inicialmente, enquanto a capacidade dos clientes de processar e verificar assinaturas também melhorou. Acontece que processar atestações de um grande número de validadores é realmente possível dentro de um único slot. Por exemplo, com um milhão de validadores, cada um votando duas vezes em cada slot, e os tempos de slot ajustados para 16 segundos, os nós seriam obrigados a verificar assinaturas a uma taxa mínima de 125.000 agregações por segundo para processar todas as 1 milhão de atestações dentro do slot. Na realidade, leva cerca de 500 nanossegundos para um computador normal fazer uma verificação de assinatura, o que significa que 125.000 podem ser feitas em ~62,5 ms - muito abaixo do limite de um segundo.

Ganhos adicionais de eficiência poderiam ser obtidos criando supercomitês de, por exemplo, 125.000 validadores selecionados aleatoriamente por slot. Apenas esses validadores podem votar em um bloco e, portanto, apenas esse subconjunto de validadores decide se um bloco é finalizado. Se isso é uma boa ideia ou não, se resume a quão caro a comunidade preferiria que um ataque bem-sucedido ao Ethereum fosse. Isso ocorre porque, em vez de exigir 2/3 do total de ether em stake, um invasor poderia finalizar um bloco desonesto com 2/3 do ether em stake _naquele supercomitê_. Esta ainda é uma área ativa de pesquisa, mas parece plausível que, para um conjunto de validadores suficientemente grande para exigir supercomitês em primeiro lugar, o custo de atacar um desses subcomitês será extremamente alto (por exemplo, o custo de ataque denominado em ETH seria `2/3 * 125,000 * 32 = ~2.6 million ETH`). O custo do ataque pode ser ajustado aumentando o tamanho do conjunto de validadores (por exemplo, ajustar o tamanho do validador para que o custo do ataque seja igual a 1 milhão de ether, 4 milhões de ether, 10 milhões de ether, etc.). [Pesquisas preliminares](https://youtu.be/ojBgyFl6-v4?t=755) da comunidade parecem sugerir que 1 a 2 milhões de ether é um custo de ataque aceitável, o que implica ~65.536 a 97.152 validadores por supercomitê.

No entanto, a verificação não é o verdadeiro gargalo - é a agregação de assinaturas que realmente desafia os nós validadores. Para escalar a agregação de assinaturas, provavelmente será necessário aumentar o número de validadores em cada sub-rede, aumentar o número de sub-redes ou adicionar camadas adicionais de agregação (ou seja, implementar comitês de comitês). Parte da solução pode ser permitir agregadores especializados - semelhante a como a construção de blocos e a geração de compromissos para dados de rollup serão terceirizadas para construtores de blocos especializados sob a separação propositor-construtor (PBS) e o danksharding.

## Qual é o papel da regra de escolha de fork na SSF? {#role-of-the-fork-choice-rule}

O mecanismo de consenso atual depende de um forte acoplamento entre o dispositivo de finalidade (o algoritmo que determina se 2/3 dos validadores atestaram uma determinada cadeia) e a regra de escolha de fork (o algoritmo que decide qual cadeia é a correta quando há várias opções). O algoritmo de escolha de fork considera apenas os blocos _desde_ o último bloco finalizado. Sob a SSF, não haveria blocos para a regra de escolha de fork considerar, porque a finalidade ocorre no mesmo slot em que o bloco é proposto. Isso significa que, sob a SSF, _ou_ o algoritmo de escolha de fork _ou_ o dispositivo de finalidade estaria ativo a qualquer momento. O dispositivo de finalidade finalizaria blocos onde 2/3 dos validadores estivessem online e atestando honestamente. Se um bloco não for capaz de exceder o limite de 2/3, a regra de escolha de fork entraria em ação para determinar qual cadeia seguir. Isso também cria uma oportunidade para manter o mecanismo de vazamento por inatividade que recupera uma cadeia onde >1/3 dos validadores ficam offline, embora com algumas nuances adicionais.

## Questões pendentes {#outstanding-issues}

O problema de escalar a agregação aumentando o número de validadores por sub-rede é que isso leva a uma carga maior na rede ponto a ponto. O problema de adicionar camadas de agregações é que é bastante complexo de projetar e adiciona latência (ou seja, pode levar mais tempo para o propositor de bloco ouvir de todos os agregadores de sub-rede). Também não está claro como lidar com o cenário em que há mais validadores ativos na rede do que pode ser processado de forma viável em cada slot, mesmo com a agregação de assinatura BLS. Uma solução potencial é que, como todos os validadores atestam em cada slot e não há comitês sob a SSF, o limite de 32 ETH no saldo efetivo poderia ser removido inteiramente, o que significa que os operadores que gerenciam vários validadores poderiam consolidar seu stake e executar menos, reduzindo o número de mensagens que os nós validadores precisam processar para contabilizar todo o conjunto de validadores. Isso depende de grandes stakers concordarem em consolidar seus validadores. Também é possível impor um limite fixo no número de validadores ou na quantidade de ETH em stake a qualquer momento. No entanto, isso exige algum mecanismo para decidir quais validadores têm permissão para participar e quais não têm, o que pode criar efeitos secundários indesejados.

## Progresso atual {#current-progress}

A SSF está na fase de pesquisa. Não se espera que seja lançada por vários anos, provavelmente após outras atualizações substanciais, como as [árvores Verkle](/roadmap/verkle-trees/) e o [danksharding](/roadmap/danksharding/).

## Leitura adicional {#further-reading}

- [Vitalik sobre a SSF na EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Notas de Vitalik: Caminhos para a finalidade de slot único](https://notes.ethereum.org/@vbuterin/single_slot_finality)