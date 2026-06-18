---
title: Escalonamento
description: "Uma introdução às diferentes opções de escalonamento atualmente em desenvolvimento pela comunidade Ethereum."
lang: pt-br
sidebarDepth: 3
---

## Visão geral do escalonamento {#scaling-overview}

À medida que o número de pessoas usando o [Ethereum](/) cresceu, a blockchain atingiu certas limitações de capacidade. Isso elevou o custo de uso da rede, criando a necessidade de "soluções de escalonamento". Existem várias soluções sendo pesquisadas, testadas e implementadas que adotam abordagens diferentes para atingir objetivos semelhantes.

O principal objetivo da escalabilidade é aumentar a velocidade das transações (finalidade mais rápida) e a vazão de transações (maior número de transações por segundo) sem sacrificar a descentralização ou a segurança. Na blockchain Ethereum de camada 1 (l1), a alta demanda leva a transações mais lentas e [preços de gás](/developers/docs/gas/) inviáveis. Aumentar a capacidade da rede em termos de velocidade e vazão é fundamental para a adoção significativa e em massa do Ethereum.

Embora a velocidade e a vazão sejam importantes, é essencial que as soluções de escalonamento que viabilizam esses objetivos permaneçam descentralizadas e seguras. Manter a barreira de entrada baixa para os operadores de nó é fundamental para evitar uma progressão em direção a um poder de computação centralizado e inseguro.

Conceitualmente, primeiro categorizamos o escalonamento como escalonamento onchain ou escalonamento offchain.

## Pré-requisitos {#prerequisites}

Você deve ter um bom entendimento de todos os tópicos fundamentais. A implementação de soluções de escalonamento é avançada, pois a tecnologia é menos testada na prática e continua sendo pesquisada e desenvolvida.

## Escalonamento onchain {#onchain-scaling}

O escalonamento onchain exige mudanças no protocolo Ethereum ([Mainnet](/glossary/#mainnet) de camada 1 (l1)). Por muito tempo, esperava-se que a fragmentação da blockchain escalonasse o Ethereum. Isso envolveria a divisão da blockchain em partes discretas (fragmentos) para serem verificadas por subconjuntos de validadores. No entanto, o escalonamento por rollups de camada 2 (l2) assumiu o papel de técnica principal de escalonamento. Isso é apoiado pela adição de uma nova forma mais barata de dados anexados aos blocos do Ethereum, que é especialmente projetada para tornar os rollups baratos para os usuários.

### Fragmentação {#sharding}

A fragmentação é o processo de divisão de um banco de dados. Subconjuntos de validadores seriam responsáveis por fragmentos individuais em vez de acompanhar todo o Ethereum. A fragmentação esteve no [roteiro](/roadmap/) do Ethereum por muito tempo e, em um momento, pretendia-se que fosse lançada antes do The Merge para a Prova de Participação (PoS). No entanto, o rápido desenvolvimento de [rollups de camada 2 (l2)](#layer-2-scaling) e a invenção do [danksharding](/roadmap/danksharding) (adicionando blobs de dados de rollup aos blocos do Ethereum que podem ser verificados de forma muito eficiente pelos validadores) levou a comunidade Ethereum a favorecer o escalonamento centrado em rollups em vez do escalonamento por fragmentação. Isso também ajudará a manter a lógica de consenso do Ethereum mais simples.

## Escalonamento offchain {#offchain-scaling}

As soluções offchain são implementadas separadamente da Mainnet de camada 1 (l1) - elas não exigem alterações no protocolo Ethereum existente. Algumas soluções, conhecidas como soluções de "camada 2 (l2)", derivam sua segurança diretamente do consenso do Ethereum de camada 1 (l1), como [rollups otimistas](/developers/docs/scaling/optimistic-rollups/), [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/) ou [canais de estado](/developers/docs/scaling/state-channels/). Outras soluções envolvem a criação de novas cadeias em várias formas que derivam sua segurança separadamente da Mainnet, como [sidechains](#sidechains), [validiums](#validium) ou [cadeias Plasma](#plasma). Essas soluções se comunicam com a Mainnet, mas derivam sua segurança de maneira diferente para obter uma variedade de objetivos.

### Escalonamento de camada 2 {#layer-2-scaling}

Esta categoria de soluções offchain deriva sua segurança da Mainnet do Ethereum.

Camada 2 (l2) é um termo coletivo para soluções projetadas para ajudar a escalonar seu aplicativo lidando com transações fora da Rede Principal do Ethereum (camada 1) enquanto aproveita o modelo de segurança descentralizado e robusto da Mainnet. A velocidade da transação sofre quando a rede está ocupada, tornando a experiência do usuário ruim para certos tipos de aplicativos descentralizados (dapps). E à medida que a rede fica mais ocupada, os preços do gás aumentam, pois os remetentes de transações tentam superar os lances uns dos outros. Isso pode tornar o uso do Ethereum muito caro.

A maioria das soluções de camada 2 (l2) é centrada em um servidor ou cluster de servidores, cada um dos quais pode ser chamado de nó, validador, operador, sequenciador, produtor de bloco ou termo semelhante. Dependendo da implementação, esses nós de camada 2 (l2) podem ser executados por indivíduos, empresas ou entidades que os utilizam, ou por um operador terceirizado, ou por um grande grupo de indivíduos (semelhante à Mainnet). De modo geral, as transações são enviadas para esses nós de camada 2 (l2) em vez de serem enviadas diretamente para a camada 1 (l1) (Mainnet). Para algumas soluções, a instância de camada 2 (l2) as agrupa em lotes antes de ancorá-las à camada 1 (l1), após o que são protegidas pela camada 1 (l1) e não podem ser alteradas. Os detalhes de como isso é feito variam significativamente entre diferentes tecnologias e implementações de camada 2 (l2).

Uma instância específica de camada 2 (l2) pode ser aberta e compartilhada por muitos aplicativos, ou pode ser implantada por um projeto e dedicada a suportar apenas o seu aplicativo.

#### Por que a camada 2 é necessária? {#why-is-layer-2-needed}

- O aumento de transações por segundo melhora muito a experiência do usuário e reduz o congestionamento da rede na Mainnet do Ethereum.
- As transações são agrupadas em uma única transação para a Mainnet do Ethereum, reduzindo as taxas de gás para os usuários e tornando o Ethereum mais inclusivo e acessível para pessoas em todos os lugares.
- Quaisquer atualizações na escalabilidade não devem ocorrer às custas da descentralização ou da segurança – a camada 2 (l2) é construída sobre o Ethereum.
- Existem redes de camada 2 (l2) específicas para aplicativos que trazem seu próprio conjunto de eficiências ao trabalhar com ativos em escala.

[Mais sobre a camada 2](/layer-2/).

#### Rollups {#rollups}

Os rollups realizam a execução de transações fora da camada 1 (l1) e, em seguida, os dados são postados na camada 1 (l1), onde o consenso é alcançado. Como os dados da transação são incluídos nos blocos da camada 1 (l1), isso permite que os rollups sejam protegidos pela segurança nativa do Ethereum.

Existem dois tipos de rollups com modelos de segurança diferentes:

- **Rollups otimistas**: pressupõem que as transações são válidas por padrão e só executam a computação, por meio de uma [**prova de fraude**](/glossary/#fraud-proof), no caso de uma contestação. [Mais sobre rollups otimistas](/developers/docs/scaling/optimistic-rollups/).
- **Rollups de conhecimento zero**: executam a computação offchain e enviam uma [**prova de validade**](/glossary/#validity-proof) para a cadeia. [Mais sobre rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/).

#### Canais de estado {#channels}

Os canais de estado utilizam contratos multisig para permitir que os participantes façam transações de forma rápida e livre offchain e, em seguida, liquidem a finalidade com a Mainnet. Isso minimiza o congestionamento da rede, as taxas e os atrasos. Os dois tipos de canais atualmente são canais de estado e canais de pagamento.

Saiba mais sobre [canais de estado](/developers/docs/scaling/state-channels/).

### Sidechains {#sidechains}

Uma sidechain é uma blockchain independente compatível com a EVM que é executada em paralelo à Mainnet. Elas são compatíveis com o Ethereum por meio de pontes bidirecionais e operam sob suas próprias regras escolhidas de consenso e parâmetros de bloco.

Saiba mais sobre [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Uma cadeia Plasma é uma blockchain separada que é ancorada à cadeia principal do Ethereum e usa provas de fraude (como [rollups otimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Saiba mais sobre [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Uma cadeia validium usa provas de validade como rollups de conhecimento zero, mas os dados não são armazenados na cadeia principal do Ethereum de camada 1 (l1). Isso pode levar a 10 mil transações por segundo por cadeia validium e várias cadeias podem ser executadas em paralelo.

Saiba mais sobre [Validium](/developers/docs/scaling/validium/).

## Por que tantas soluções de escalonamento são necessárias? {#why-do-we-need-these}

- Múltiplas soluções podem ajudar a reduzir o congestionamento geral em qualquer parte da rede e também evitar pontos únicos de falha.
- O todo é maior que a soma de suas partes. Diferentes soluções podem existir e trabalhar em harmonia, permitindo um efeito exponencial na velocidade e vazão futuras das transações.
- Nem todas as soluções exigem a utilização direta do algoritmo de consenso do Ethereum, e as alternativas podem oferecer benefícios que, de outra forma, seriam difíceis de obter.

## Prefere aprender visualmente? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Observe que a explicação no vídeo usa o termo "Camada 2" para se referir a todas as soluções de escalonamento offchain, enquanto nós diferenciamos a "Camada 2 (l2)" como uma solução offchain que deriva sua segurança por meio do consenso da Mainnet de camada 1 (l1)._

<VideoWatch slug="rollups-scaling-strategy" />

## Leitura adicional {#further-reading}

- [Um roteiro do Ethereum centrado em rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Análises atualizadas sobre soluções de escalonamento de Camada 2 para Ethereum](https://www.l2beat.com/)
- [Avaliando soluções de escalonamento de camada 2 do Ethereum: uma estrutura de comparação](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Um guia incompleto sobre rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollups alimentados por Ethereum: os melhores do mundo](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollups Otimistas vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Por que rollups + fragmentos de dados são a única solução sustentável para alta escalabilidade](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Que tipo de Camadas 3 fazem sentido?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilidade de Dados Ou: Como os Rollups Aprenderam a Parar de se Preocupar e Amar o Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [O guia prático para rollups do Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tutoriais: Crie Camadas 2 escalonáveis no Ethereum {#tutorials}

- [Tudo o que você pode armazenar em cache](/developers/tutorials/all-you-can-cache/) _– Como criar e usar um contrato de cache para reduzir os custos de dados de chamada (calldata) em rollups._
- [ABIs curtas para otimização de dados de chamada](/developers/tutorials/short-abi/) _– Como usar ABIs mais curtas para reduzir os custos de dados de chamada (calldata) para transações de camada 2 (l2)._