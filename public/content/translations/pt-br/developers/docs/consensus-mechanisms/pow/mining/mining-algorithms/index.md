---
title: Algoritmos de mineração
description: Os algoritmos usados para mineração Ethereum
lang: pt-br
---

<InfoBanner emoji=":wave:">
A prova de trabalho não está mais subjacente ao mecanismo de consenso do Ethereum, o que significa que a mineração foi desativada. Em vez disso, o Ethereum é garantido por validadores que apostam em ETH. Você pode começar a fazer o staking do seu ETH hoje. Leia mais sobre <a href='/roadmap/merge/'>A Fusão</a> (The MErge), <a href='/developers/docs/consensus-mechanisms/pos/'>prova de participação</a> e <a href='/staking/'>participação (stake)</a>. Esta página é apenas de interesse histórico.
</InfoBanner>

A mineração Ethereum usou um algoritmo conhecido como Ethash. A ideia fundamental do algoritmo é que um minerador tente encontrar uma entrada de nonce usando a computação de força bruta, para que o hash resultante seja menor que um limite determinado pela dificuldade calculada. Esse nível de dificuldade pode ser ajustado dinamicamente, permitindo que a produção de blocos ocorra em intervalos regulares.

## Pré-Requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre o [consenso da prova de trabalho](/developers/docs/consensus-mechanisms/pow) e a [mineração](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto foi um algoritmo de pesquisa precursor para mineração Ethereum que Ethash substituiu. Era uma fusão de dois algoritmos diferentes: Dagger e Hashimoto. Foi apenas uma implementação de pesquisa e foi substituída pelo Ethash no momento em que a rede principal do Ethereum foi lançada.

[Dagger](http://www.hashcash.org/papers/dagger.html) envolve a geração de um [Grafo Acíclico Direcionado](https://en.wikipedia.org/wiki/Directed_acyclic_graph), cujas fatias aleatórias do hash são feitas juntas. O princípio central é que cada nonce requer apenas uma pequena porção de uma grande árvore de dados total. Recomputar a subárvore para cada nonce é proibitivo para a mineração – daí a necessidade de armazenar a árvore – mas tudo bem para uma única verificação de valor do nonce. O Dagger foi projetado para ser uma alternativa aos algoritmos existentes como o Scrypt, que fazem uso intenso de memória, mas que são difíceis de verificar conforme a utilização de memória aumenta para níveis genuinamente seguros. No entanto, Dagger era vulnerável à aceleração de hardware de memória compartilhada e caiu em favor de outras vias de pesquisa.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) é um algoritmo que adiciona resistência ASIC ao ser vinculado à E/S (ou seja, leituras de memória são o fator limitante no processo de mineração). A teoria é que a RAM está mais disponível do que a computação; bilhões de dólares em pesquisas já investigaram a otimização de RAM para diferentes casos de uso, o que geralmente envolvem padrões de acesso quase aleatórios (daí “memória de acesso aleatório”). Como resultado, é provável que a memória RAM existente esteja moderadamente próxima do ideal para avaliar o algoritmo. Hashimoto usa a blockchain como fonte de dados, satisfazendo simultaneamente (1) e (3) acima.

Dagger-Hashimoto usou versões modificadas dos algoritmos Dagger e Hashimoto. A diferença entre Dagger Hashimoto e Hashimoto é que, ao invés de usar a blockchain como fonte de dados, o Dagger Hashimoto usa um conjunto de dados gerados de forma personalizada, que atualiza com base nos dados do bloco a cada N blocos. O conjunto de dados é gerado usando o algoritmo Dagger, permitindo calcular com eficiência um subconjunto específico para cada nonce para o algoritmo de verificação de cliente leve. A diferença entre Dagger Hashimoto e Dagger é que, ao contrário do Dagger original, o conjunto de dados usado para consultar o bloco é semipermanente, sendo atualizado apenas em intervalos ocasionais (por exemplo, uma vez por semana). Isso significa que a porção do esforço de geração do conjunto de dados é próxima de zero, de modo que os argumentos de Sergio Lerner a respeito das acelerações de memória compartilhada tornam-se insignificantes.

Mais sobre [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash foi o algoritmo de mineração, que na verdade foi usado na rede principal Ethereum real, sob a agora obsoleta arquitetura de prova de trabalho. Ethash foi efetivamente um novo nome dado a uma versão específica do Dagger-Hashimoto depois que o algoritmo foi significativamente atualizado, enquanto ainda herdava os princípios fundamentais de seu antecessor. A Rede principal do Ethereum só utilizou o Ethash. Dagger Hashimoto era uma versão de pesquisa e desenvolvimento do algoritmo de mineração que foi substituído antes do início da mineração na Rede principal do Ethereum.

[Mais sobre Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_
