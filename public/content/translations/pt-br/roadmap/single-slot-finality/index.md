---
title: Finalidade de espaço único
description: Explicação da finalidade de espaço único
lang: pt-br
---

# Finalidade de espaço único {#single-slot-finality}

Demora aproximadamente 15 minutos para finalizar um bloco do Ethereum. Entretanto, podemos fazer com que o mecanismo de consenso do Ethereum valide blocos de forma mais eficiente, o que reduzirá drasticamente o tempo de finalização. Em vez de esperar 15 minutos, os blocos podem ser propostos e finalizados em um mesmo espaço. Esse conceito é conhecido como **finalidade de espaço único (single slot finality, SSF)**.

## O que é a finalidade? {#what-is-finality}

No mecanismo de consenso de prova de participação (proof-of-stake, PoS) do Ethereum, finalizar se refere à garantia de que o bloco não pode ser alterado ou removido do blockchain sem queimar pelo menos 33% do total de ETH em participação na rede. Essa é uma segurança "criptoeconômica", pois a confiança vem do custo extremamente alto associado à alteração da ordem ou do conteúdo da cadeia, o que impediria qualquer agente econômico racional de tentar fazê-lo.

## Por que ter como objetivo uma finalidade mais rápida? {#why-aim-for-quicker-finality}

O tempo atual da finalidade (finalização) é muito longo. A maioria dos usuários não quer esperar 15 minutos pela finalidade, e é inconveniente para os aplicativos e corretoeas que podem querer uma alta taxa de transferência de transações ter que esperar tanto tempo para garantir que as transações são permanentes. O atraso entre a proposta e a finalização de um bloco também cria uma oportunidade para pequenas reformulações que um invasor poderia usar para censurar blocos específicos ou extrair MEV. O mecanismo que processa a atualização dos blocos em fases é bem complexo e foi corrigido diversas vezes para fechar as vulnerabilidades de segurança, tornando-o uma das partes da base de código do Ethereum em que há maior probabilidade de surgir falhas sutis. Todas essas questões poderiam ser eliminadas ao reduzir o tempo de finalidade em um único espaço.

## A compensação entre descentralização/tempo/sobrecarga {#the-decentralization-time-overhead-tradeoff}

A garantia de finalidade não é uma propriedade imediata de um novo bloco. A finalização de um bloco demora. O motivo disso é que os validadores que representam pelo menos 2/3 do total de ETH em participação na rede precisam votar no bloco ("atestar") para que ele seja considerado finalizado. Cada nó de validação na rede precisa processar as atestações de outros nós para saber se um bloco atingiu ou não o limite de 2/3.

Quanto menor for o tempo permitido para a finalização, maior será a capacidade de computação necessária em cada nó, pois o processamento da atestação precisa ser feito mais rapidamente. Além disso, quanto mais nós de validação existirem na rede, mais atestações precisarão ser processadas para cada bloco, o que também aumenta a capacidade de processamento necessária. Quanto mais poder de processamento for necessário, menos pessoas poderão participar devido o alto custo de hardware necessário para executar um nó de validação. Aumentar o tempo entre os blocos reduz a capacidade de computação necessária em cada nó, mas também aumenta o tempo até a finalização, pois as atestações são processadas mais lentamente.

Portanto, há uma compensação entre a sobrecarga (poder de computação), a descentralização (número de nós que podem participar da validação da cadeia) e o tempo até a finalização. O sistema ideal balanceia o mínimo poder de computação, a máxima descentralização e o tempo mínimo para a finalização.

O mecanismo atual de consenso do Ethereum balanceou esses três parâmetros da seguinte forma:

- **Definição da participação mínima para 32 ETH**. Isso define um limite superior para o número de atestações de validadores que precisam ser processadas por nós individuais e, portanto, um limite superior de requisitos computacionais para cada nó.
- **Definição do tempo de finalização em ~15 minutos**. Isso dá tempo suficiente para que os validadores que executam em computadores domésticos normais processem com segurança as atestações de cada bloco.

Com o design do mecanismo atual, para reduzir o tempo de finalização, é necessário reduzir o número de validadores na rede ou aumentar os requisitos de hardware para cada nó. Entretanto, há aprimoramentos que podem ser feitos na forma como as atestações são processadas, que podem permitir que mais atestações sejam contadas sem aumentar a sobrecarga em cada nó. O processamento mais eficiente permitirá que a finalidade seja determinada em um único espaço, em vez de em duas épocas.

## Rotas para SSF {#routes-to-ssf}

<ExpandableCard title= "Por que não podemos ter SSF hoje?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

O mecanismo de consenso atual combina atestações de diversos validadores, conhecidos como "comitês", para reduzir o número de mensagens que cada validador precisa processar para validar um bloco. Cada validador tem a oportunidade de atestar em cada época (32 espaços), mas em cada espaço, apenas um subconjunto de validadores, conhecido como uma atestação de "comitê". Eles fazem isso ao se dividir em sub-redes, nas quais alguns validadores são selecionados para serem "agregadores". Esses agregadores combinam, em uma única assinatura agregada, todas as assinaturas que observam de outros validadores na respectiva sub-rede. O agregador que inclui o maior número de contribuições individuais passa a assinatura agregada ao proponente do bloco, que a inclui no bloco juntamente com a assinatura agregada dos demais comitês.

Esse processo oferece capacidade suficiente para cada validador votar em cada época, porque "32 espaços _ 64 comitês _ 256 validadores por comitê = 524.288 validadores por época". No momento da redação deste artigo (fevereiro de 2023), há aproximadamente 513.000 validadores ativos.

Nesse esquema, só é possível que cada validador vote em um bloco se distribuir as respectivas atestações por toda a época. Entretanto, há potencialmente maneiras de aprimorar o mecanismo para que _cada validador tenha a chance de atestar em cada espaço_.
</ExpandableCard>

Desde que o mecanismo de consenso do Ethereum foi projetado, o esquema de agregação de assinaturas (BLS) foi considerado muito mais dimensionável do que se pensava inicialmente, enquanto a capacidade dos clientes de processar e verificar assinaturas também melhorou. Foi constatado que o processamento de atestações de um grande número de validadores é realmente possível em um único espaço. Por exemplo, com um milhão de validadores, cada um votando duas vezes em cada espaço, e os tempos de espaço ajustados para 16 segundos, os nós precisariam verificar as assinaturas a uma taxa mínima de 125.000 agregações por segundo para processar o um milhão de atestações no espaço. Na realidade, um computador comum demora aproximadamente 500 nanossegundos para fazer uma verificação de assinatura, o que significa que 125.000 podem ser feitas em ~62,5 ms, muito abaixo do limite de um segundo.

Outros ganhos de eficiência poderiam ser obtidos com a criação de supercomitês de, por exemplo, 125.000 validadores selecionados aleatoriamente por espaço. Apenas esses validadores podem votar em um bloco e, portanto, apenas esse subconjunto de validadores decide se um bloco é finalizado. Se essa é ou não uma boa ideia, depende do quanto que a comunidade prefere que custe um ataque bem-sucedido à Ethereum. Isso porque, em vez de exigir 2/3 do total de ether em participação, o invasor poderia finalizar um bloco desonesto com 2/3 do ether em participação, _no supercomitê_. Essa ainda é uma área de pesquisa ativa, mas parece plausível que, para que um conjunto de validadores suficientemente grande possa exigir supercomitês, o custo de atacar um desses subcomitês será extremamente alto (por exemplo, o custo de ataque denominado ETH seria `2/3 * 125.000 * 32 = ~2,6 milhões de ETH`). O custo do ataque pode ser ajustado ao aumentar o tamanho do conjunto de validadores (por exemplo, ajustar o tamanho do validador para que o custo do ataque seja igual a 1 milhão de ether, 4 milhões de ether, 10 milhões de ether etc.). [Pesquisas preliminares](https://youtu.be/ojBgyFl6-v4?t=755) da comunidade parecem sugerir que 1-2 milhões de ether é um custo aceitável de ataque, o que implica ~65.536 - 97.152 validadores por supercomitê.

Entretanto, a verificação não é o verdadeiro obstáculo, mas sim a agregação de assinaturas que realmente apresenta um desafio aos nós validadores. Para dimensionar a agregação de assinaturas, provavelmente será necessário aumentar o número de validadores em cada sub-rede, aumentar o número de sub-redes ou adicionar outras camadas de agregação (ou seja, implementar comitês de comitês). Parte da solução pode ser permitir agregadores especializados, semelhante à maneira como a construção de blocos e a geração de compromissos para dados de rollup serão terceirizados para construtores de blocos especializados na proposta de separação entre proponente e construtor (PBS) e no Danksharding.

## Qual é o papel da regra de escolha de bifurcação na SSF? {#role-of-the-fork-choice-rule}

O mecanismo de consenso atual se baseia em um forte acoplamento entre o dispositivo de finalidade (o algoritmo que determina se 2/3 dos validadores atestaram uma cadeia específica) e a regra de escolha de bifurcação (o algoritmo que decide qual cadeia é a correta quando há várias opções). O algoritmo de escolha da bifurcação apenas considera os blocos _desde_ o último bloco finalizado. Na SSF, não haveria nenhum bloco a ser considerado pela regra de escolha de bifurcação, pois a finalização ocorre no mesmo espaço em que o bloco é proposto. Isso significa que, na SSF, _ou_ o algoritmo de escolha de bifurcação _ou_ o mecanismo de finalidade estaria ativo a qualquer momento. O mecanismo de finalidade finalizaria os blocos em que 2/3 dos validadores estivessem online e atestando honestamente. Se um bloco não conseguir ultrapassar o limite de 2/3, a regra de escolha de bifurcação entrará em ação para determinar qual cadeia seguir. Isso também cria uma oportunidade de manter o mecanismo de vazamento de inatividade que recupera uma cadeia em que >1/3 dos validadores ficam offline, embora com algumas nuances adicionais.

## Problemas pendentes {#outstanding-issues}

O problema da escalabilidade da agregação por meio do aumento do número de validadores por sub-rede é que isso aplica uma carga maior na rede ponto a ponto. O problema ao adicionar camadas de agregações é que é bastante complexo de projetar e adiciona latência (ou seja, poderia levar mais tempo para o proponente do bloco 'ouvir' todos os agregadores da sub-rede). Também não está claro como lidar com o cenário em que há mais validadores ativos na rede do que é possível processar em cada espaço, mesmo com a agregação de assinaturas BLS. Uma possível solução é que, como todos os validadores atestam em todos os espaços e não há comitês na SSF, o limite de 32 ETH no saldo poderia ser totalmente removido, o que significa que os operadores que gerenciam vários validadores poderiam consolidar a participação e executar menos, o que reduziria o número de mensagens que os nós de validação precisam processar para contabilizar todo o conjunto de validadores. Isso depende de os grandes participantes concordarem com a consolidação dos respectivos validadores. Também é possível impor um limite fixo ao número de validadores ou à quantidade de ETH em participação a qualquer momento. Entretanto, isso exige um mecanismo para decidir quais validadores podem participar e quais não podem, o que pode criar efeitos secundários indesejados.

## Progresso atual {#current-progress}

A SSF está em fase de pesquisa. A implementação não deverá ocorrer por vários anos, provavelmente apenas após outras melhorias consideráveis, como [Verkle Trees](/roadmap/verkle-trees/) e [Danksharding](/roadmap/danksharding]).

## Leitura adicional {#further-reading}

- [Vitalik sobre SSF na EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Notas de Vitalik: caminhos para a finalidade de espaço único](https://notes.ethereum.org/@vbuterin/single_slot_finality)
