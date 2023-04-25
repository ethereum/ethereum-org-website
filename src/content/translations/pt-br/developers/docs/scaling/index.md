---
title: Dimensionamento
description: Uma introdução às diferentes opções de dimensionamento atualmente em desenvolvimento pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

## Visão geral do dimensionamento {#scaling-overview}

À medida que o número de usuários do Ethereum aumenta, a blockchain atinge certas limitações de capacidade. Isso tem elevado os custos de utilização da rede, criando a necessidade de "soluções de dimensionamento". Existem várias soluções sendo pesquisadas, testadas e implementadas que adotam diferentes abordagens para atingir metas semelhantes.

O objetivo principal do dimensionamento é aumentar a velocidade das transações (finalidade mais rápida) e as taxas de transferência (mais transações por segundo), sem sacrificar a descentralização ou a segurança (veja mais em [visão do Ethereum](/roadmap/vision/)). Na camada 1 da blockchain de Ethereum, a alta demanda leva a transações mais lentas e a [preços de gás](/developers/docs/gas/) inviáveis. Aumentar a capacidade da rede em termos de velocidade e taxa de transferência é fundamental para uma adoção significativa e massiva do Ethereum.

Embora a velocidade e a taxa de transferência sejam importantes, é essencial que tais soluções de dimensionamento habilitadas para tais fins permaneçam descentralizadas e seguras. Manter a barreira de entrada baixa para os operadores de nó é fundamental para prevenir uma progressão rumo a um poder de computação centralizado e inseguro.

Conceitualmente, primeiro classificamos o dimensionamento como dimensionamento on-chain ou dimensionamento off-chain.

## Pré-requisitos {#prerequisites}

Você deveria ter um bom entendimento de todos os tópicos fundamentais. Implementar soluções de dimensionamento é um conceito avançado, já que a tecnologia é menos testada e continua a ser pesquisada e desenvolvida.

## Dimensionamento on-chain {#on-chain-scaling}

Este método de dimensionamento requer alterações no protocolo Ethereum ([rede principal](/glossary/#mainnet) da camada 1). A fragmentação é atualmente o principal objetivo deste método de dimensionamento.

### Fragmentação {#sharding}

A fragmentação é o processo de dividir um banco de dados horizontalmente para repartir a carga de trabalho. No contexto do Ethereum, a fragmentação reduzirá o congestionamento da rede e aumentará o número de transações por segundo graças à geração de novas cadeias conhecidas como "fragmentos". Isso também irá aliviar a carga para cada validador, que não precisará mais processar a totalidade de todas as transações da rede.

Saiba mais sobre [fragmentação](/roadmap/danksharding/).

## Dimensionamento off-chain {#off-chain-scaling}

As soluções off-chain são implementadas separadamente da rede principal da camada 1. Ou seja, elas não requerem alterações no protocolo Ethereum Ethereum existente. Algumas soluções, conhecidas como soluções de "camada 2", derivam sua segurança diretamente do consenso da camada 1 do Ethereum, por exemplo, os [optimistic rollups](/developers/docs/scaling/layer-2-rollups/), os [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/) ou os [canais de estado](/developers/docs/scaling/state-channels/). Outras soluções envolvem a criação de novas cadeias em várias formas que derivam sua segurança separadamente da rede principal, como [sidechains](#sidechains), [validiums](#validium) ou [cadeias Plasma](#plasma). Essas soluções se comunicam com a rede principal, mas derivam sua segurança de forma diferente para obter uma variedade de objetivos.

### Dimensionamento da camada 2 {#layer-2-scaling}

Esta categoria de soluções off-chain deriva a sua segurança da rede principal do Ethereum.

A camada 2 é um termo coletivo para soluções projetadas para ajudar a dimensionar os aplicativos, manipulando para isso as transações fora da rede principal (camada 1) de Ethereum, tirando proveito do robusto modelo de segurança descentralizada fornecido pela rede principal. A velocidade das transações sofre quando a rede está ocupada, o que pode tornar a experiência do usuário ruim para certos tipos de dapps. E à medida que a rede fica mais movimentada, os preços do gás tendem a aumentar devido a que os remetentes das transações tendem a oferecer mais para processar sua transação antes que as dos outros. E essa conjuntura pode tornar o uso do Ethereum bem mais caro.

A maioria das soluções de camada 2 orbitam ao redor de um servidor, ou cluster de servidores, cada um dos quais pode ser referenciado como um nó, como um validador, como um operador, como um sequenciador de transações, como um produtor de blocos ou como algo semelhante. Dependendo da implementação, esses nós da camada 2 podem ser executados pelos indivíduos, pelas empresas ou pelas entidades que os usam, ou por um operador de terceiros, ou ainda por um grande grupo de indivíduos (da maneira similar à rede principal). Em geral, ao invés de serem enviadas diretamente para a camada 1 (rede principal), as transações são submetidas a esses nós da camada 2. Para algumas soluções, a camada 2 instancia as transações e as agrupa antes de ancorá-las à camada 1. Depois disso, elas são protegidas pela própria camada 1 e não podem ser mais alteradas. Os pormenores de como isso é feito variam significativamente entre diferentes tecnologias de camada 2 e suas diferentes implementações.

Uma instância específica da camada 2 pode ser aberta e compartilhada por muitos aplicativos, ou pode ser implantada por um projeto e dedicada especificamente a apoiar apenas seu aplicativos.

#### Por que a camada 2 é necessária? {#why-is-layer-2-needed}

- O aumento da quantidade de transações por segundo melhora significativamente a experiência de usuário e reduzem o congestionamento da rede na rede principal do Ethereum.
- As transações são agrupadas em única transação na rede principal do Ethereum, reduzindo assim as taxas de gás, tornando o Ethereum mais inclusivo e acessível para os usuários sem importar o lugar.
- Quaisquer atualizações de dimensionamento não devem ser feitas às custas da descentralização ou da segurança – a camada 2 se baseia na rede principal do Ethereum.
- Existem redes de camada 2 específicas de aplicativos que trazem seu próprio conjunto de melhorias ao trabalhar com ativos em escala.

[Mais sobre a camada 2](/layer-2/).

#### Rollups {#rollups}

Os rollups levam a execução das transações para fora da camada 1 e, posteriormente, tais dados são reportados para a camada 1, onde o consenso é alcançado. Como os dados de transação estão incluídos nos blocos da camada 1, isso permite que os rollups sejam protegidos pela segurança nativa do Ethereum.

Existem dois tipos de rolllups com diferentes modelos de segurança:

- **Optimistic rollups**: assumem que as transações são válidas por padrão e só executam computação através de uma [**prova de fraude**](/glossary/#fraud-proof), caso alguém levante alguma objeção. [Mais sobre optimistic-rollups](/developers/docs/scaling/optimistic-rollups/).
- **Rollups de conhecimento zero**: executam a computação off-chain e enviam uma [**prova de validade**](/glossary/#validity-proof) para a cadeia. [Mais sobre rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/).

#### Canais de Estado {#channels}

Os canais de estado utilizam contratos multisig para permitir que os participantes façam transações de forma rápida e livre off-chain, e em seguida, liquidam a finalidade com a rede principal. Isto minimiza o congestionamento, as taxas e os atrasos na rede. Neste momento, existem dois tipos de canais: canais de estado e canais de pagamento.

Saiba mais sobre [canais de estado](/developers/docs/scaling/state-channels/).

### Correntes paralelas {#sidechains}

Uma sidechain é uma blockchain independente e compatível com EVM que se executa em paralelo com a rede principal. Essas são compatíveis com Ethereum através de pontes de dois sentidos e são executadas de acordo com as regras de consenso escolhidas e com os parâmetros do bloco.

Saiba mais sobre [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

A cadeia Plasma é uma blockchain separada que é ancorada à cadeia principal do Ethereum, e usa provas de fraude (como as [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Saiba mais sobre [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Uma cadeia Validium usa provas de validade como rollups de conhecimento zero, mas os dados não são armazenados na cadeia Ethereum da camada 1 principal. Isso pode levar a 10 mil transações por segundo por cadeia Validium, e várias cadeias podem ser executadas em paralelo.

Saiba mais sobre [fragmentação](/developers/docs/scaling/validium/).

## Por que tantas soluções de dimensionamento são necessárias? {#why-do-we-need-these}

- O fato de ter múltiplas soluções pode ajudar a reduzir o congestionamento geral de qualquer parte da rede e também a impedir pontos únicos de falha.
- O todo é maior que a soma de suas partes. Diferentes soluções podem existir e ainda funcionar em harmonia, provocando um efeito exponencial na velocidade futura das transações e na quantidade de dados transferidos.
- Nem todas as soluções exigem diretamente o uso do algoritmo de consenso do Ethereum, e algumas alternativas podem oferecer benefícios que, de outro modo, seriam difíceis de obter.
- Nenhuma solução de dimensionamento é suficiente para satisfazer à [visão de Ethereum](/roadmap/vision/).

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Note que a explicação no vídeo usa o termo "Camada 2" para se referir a todas as soluções de escalonamento off-chain enquanto diferenciamos a "Camada 2" como uma solução off-chain que deriva sua segurança através do consenso principal da camada 1._

<YouTube id="7pWxCklcNsU" />

## Leitura adicional {#further-reading}

- [Um cronograma do Ethereum centrado em rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Análises atualizadas sobre o dimensionamento da camada 2 para Ethereum](https://www.l2beat.com/)
- [Avaliando as soluções de dimensionamento da camada 2 de Ethereum: um esquema de comparação](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Um guia incompleto sobre rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Ethereum com tecnologia de ZK-Rollups: campeões do mundo](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollups vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Dimensionamento blockchain de conhecimento zero](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Por que os rollups, junto com as fragmentações dos dados, são a única solução sustentável para atingir alto dimensionamento](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Que tipo de camada 3 faz sentido?](https://vitalik.ca/general/2022/09/17/layer_3.html)

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_
