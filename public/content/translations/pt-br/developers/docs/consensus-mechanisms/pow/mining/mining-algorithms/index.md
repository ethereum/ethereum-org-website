---
title: "Algoritmos de mineração"
description: "Uma visão detalhada dos algoritmos usados para a mineração do Ethereum."
lang: pt-br
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
A Prova de Trabalho (PoW) não é mais a base do mecanismo de consenso do Ethereum, o que significa que a mineração foi desativada. Em vez disso, o Ethereum é protegido por validadores que fazem stake de ETH. Você pode começar a fazer staking do seu ETH hoje. Leia mais sobre <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Prova de Participação (PoS)</a> e <a href='/staking/'>staking</a>. Esta página é apenas para interesse histórico.
</AlertDescription>
</AlertContent>
</Alert>

A mineração do Ethereum usava um algoritmo conhecido como Ethash. A ideia fundamental do algoritmo é que um minerador tenta encontrar uma entrada de nonce usando computação de força bruta para que o hash resultante seja menor que um limite determinado pela dificuldade calculada. Esse nível de dificuldade pode ser ajustado dinamicamente, permitindo que a produção de blocos aconteça em um intervalo regular.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre o [consenso de Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow) e [mineração](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

O Dagger Hashimoto foi um algoritmo de pesquisa precursor para a mineração do Ethereum que o Ethash substituiu. Era uma fusão de dois algoritmos diferentes: Dagger e Hashimoto. Foi apenas uma implementação de pesquisa e foi substituído pelo Ethash na época em que a Rede Principal do Ethereum foi lançada.

O [Dagger](http://www.hashcash.org/papers/dagger.html) envolve a geração de um [Grafo Acíclico Direcionado (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), cujas fatias aleatórias são transformadas em hash juntas. O princípio central é que cada nonce requer apenas uma pequena porção de uma grande árvore de dados total. Recalcular a subárvore para cada nonce é proibitivo para a mineração - daí a necessidade de armazenar a árvore - mas aceitável para a verificação do valor de um único nonce. O Dagger foi projetado para ser uma alternativa aos algoritmos existentes, como o Scrypt, que exigem muita memória, mas são difíceis de verificar quando sua exigência de memória aumenta para níveis genuinamente seguros. No entanto, o Dagger era vulnerável à aceleração de hardware de memória compartilhada e foi abandonado em favor de outras vias de pesquisa.

O [Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) é um algoritmo que adiciona resistência a ASIC por ser limitado por E/S (ou seja, as leituras de memória são o fator limitante no processo de mineração). A teoria é que a RAM é mais disponível do que a computação; bilhões de dólares em pesquisas já investigaram a otimização da RAM para diferentes casos de uso, que frequentemente envolvem padrões de acesso quase aleatórios (daí "memória de acesso aleatório"). Como resultado, a RAM existente provavelmente está moderadamente próxima do ideal para avaliar o algoritmo. O Hashimoto usa a blockchain como fonte de dados, satisfazendo simultaneamente (1) e (3) acima.

O Dagger-Hashimoto usou versões alteradas dos algoritmos Dagger e Hashimoto. A diferença entre o Dagger Hashimoto e o Hashimoto é que, em vez de usar a blockchain como fonte de dados, o Dagger Hashimoto usa um conjunto de dados gerado de forma personalizada, que é atualizado com base nos dados do bloco a cada N blocos. O conjunto de dados é gerado usando o algoritmo Dagger, permitindo calcular eficientemente um subconjunto específico para cada nonce para o algoritmo de verificação do cliente leve. A diferença entre o Dagger Hashimoto e o Dagger é que, diferentemente do Dagger original, o conjunto de dados usado para consultar o bloco é semipermanente, sendo atualizado apenas em intervalos ocasionais (por exemplo, uma vez por semana). Isso significa que a parcela do esforço de geração do conjunto de dados é próxima de zero, de modo que os argumentos de Sergio Lerner sobre acelerações de memória compartilhada se tornam insignificantes.

Mais sobre o [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

O Ethash foi o algoritmo de mineração que foi realmente usado na Rede Principal do Ethereum real sob a arquitetura agora obsoleta de Prova de Trabalho (PoW). O Ethash foi efetivamente um novo nome dado a uma versão específica do Dagger-Hashimoto depois que o algoritmo foi significativamente atualizado, enquanto ainda herdava os princípios fundamentais de seu predecessor. A Rede Principal do Ethereum usou apenas o Ethash - o Dagger Hashimoto foi uma versão de P&D do algoritmo de mineração que foi substituída antes do início da mineração na Rede Principal do Ethereum.

[Mais sobre o Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_