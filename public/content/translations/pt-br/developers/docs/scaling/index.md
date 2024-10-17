---
title: Dimensionamento
description: Uma introdução às diferentes opções de dimensionamento atualmente em desenvolvimento pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

## Visão geral do dimensionamento {#scaling-overview}

À medida que o número de usuários do Ethereum aumenta, a blockchain atinge certas limitações de capacidade. Isso tem elevado os custos de utilização da rede, criando a necessidade de "soluções de dimensionamento". Existem várias soluções sendo pesquisadas, testadas e implementadas que adotam diferentes abordagens para atingir metas semelhantes.

O principal objetivo da escalabilidade é aumentar a velocidade das transações (finalidade mais rápida) e a capacidade de transações (maior número de transações por segundo) sem sacrificar a descentralização ou a segurança (mais sobre a [visão do Ethereum](/roadmap/vision/)). Na camada 1 da blockchain de Ethereum, a alta demanda leva a transações mais lentas e a [preços de gás](/developers/docs/gas/) inviáveis. Aumentar a capacidade da rede em termos de velocidade e taxa de transferência é fundamental para uma adoção significativa e massiva do Ethereum.

Embora a velocidade e a taxa de transferência sejam importantes, é essencial que tais soluções de dimensionamento habilitadas para tais fins permaneçam descentralizadas e seguras. Manter a barreira de entrada baixa para os operadores de nó é fundamental para prevenir uma progressão rumo a um poder de computação centralizado e inseguro.

Conceitualmente, primeiro classificamos o dimensionamento como dimensionamento on-chain ou dimensionamento off-chain.

## Pré-requisitos {#prerequisites}

Você deveria ter um bom entendimento de todos os tópicos fundamentais. Implementar soluções de dimensionamento é um conceito avançado, já que a tecnologia é menos testada e continua a ser pesquisada e desenvolvida.

## Dimensionamento on-chain {#on-chain-scaling}

A escalabilidade em cadeia requer mudanças no protocolo do Ethereum ([Mainnet](/glossary/#mainnet) de camada 1). A solução de fragmentação da blockchain era aguardada há muito tempo para escalar o Ethereum. Isso implicava dividir a blockchain em partes discretas (fragmentos), que seriam verificadas por subconjuntos de validadores. No entanto, a técnica de escalabilidade principal adotada foi a de escalar por rollups de camada 2. Ela é suportada pela adição de uma nova forma mais barata de dados anexados aos blocos Ethereum, que foi especialmente criada para tornar os rollups baratos para os usuários.

### Fragmentação {#sharding}

Fragmentação é o processo de dividir um banco de dados. Subconjuntos de validadores seriam responsáveis por seus próprios fragmentos, em vez de manter o controle de todo o Ethereum. A fragmentação esteve no [planejamento](/roadmap/) do Ethereum por muito tempo, com a intenção de ser enviada para prova de participação antes do The Merge (A Fusão). No entanto, o rápido desenvolvimento de [rollups de camada 2](#layer-2-scaling) e a invenção do [Danksharding](/roadmap/danksharding) (adicionando blobs de dados do rollup para blocos do Ethereum que podem ser verificados eficientemente pelos validadores) têm levado a comunidade Ethereum a preferir o dimensionamento centrado por rollup em vez do dimensionamento por fragmentação. Isso também ajudará a manter a lógica de consenso do Ethereum mais simples.

## Dimensionamento off-chain {#off-chain-scaling}

As soluções off-chain são implementadas separadamente da rede principal da camada 1. Ou seja, elas não requerem alterações no protocolo Ethereum existente. Algumas soluções, conhecidas como soluções de “camada 2”, obtêm sua segurança diretamente do consenso da camada 1 do Ethereum, por exemplo, os [rollups otimistas](/developers/docs/scaling/layer-2-rollups/), os [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/) ou os [canais de estado](/developers/docs/scaling/state-channels/). Outras soluções envolvem a criação de novas cadeias em várias formas, que obtêm sua segurança separadamente da Mainnet (Rede principal), como [cadeias laterais](#sidechains), [validiums](#validium) ou [cadeias Plasma](#plasma). Essas soluções se comunicam com a Mainnet (Rede principal), mas obtêm sua segurança de forma diferente para alcançar uma variedade de objetivos.

### Dimensionamento da camada 2 {#layer-2-scaling}

Esta categoria de soluções off-chain obtém sua segurança da Mainnet (Rede principal) do Ethereum.

A camada 2 é um termo coletivo de soluções projetadas para ajudar a dimensionar os aplicativos, gerenciando transações fora da rede principal (camada 1) do Ethereum, aproveitando o robusto modelo de segurança descentralizada da Mainnet (Rede principal). A velocidade das transações é reduzida quando a rede está ocupada, o que pode tornar a experiência do usuário ruim para certos tipos de dapps. À medida que a rede fica mais movimentada, os preços do gás aumentam, pois os remetentes de transações tendem a oferecer mais para processar sua transação antes das dos outros. Isso pode tornar o uso do Ethereum bem mais caro.

A maioria das soluções de camada 2 são centralizadas em torno de um servidor ou cluster de servidores, cada um dos quais pode ser referenciado como um nó, validador, operador, sequenciador, produtor de bloco, ou um termo semelhante. Dependendo da implementação, esses nós da camada 2 podem ser executados pelos indivíduos, empresas ou entidades que os usam, por um operador de terceiros ou por um grande grupo de indivíduos (semelhante à Mainnet). Em geral, as transações são submetidas a esses nós de camada 2, em vez de serem enviadas diretamente para a camada 1 (Mainnet). Para algumas soluções, a instância da camada 2 agrupa-os em grupos antes de ancorá-los na camada 1, na qual ficam protegidos e não podem ser alterados. Os pormenores de como isso é feito variam significativamente entre diferentes tecnologias de camada 2 e implementações.

Uma instância específica da camada 2 pode ser aberta e compartilhada por muitos aplicativos, ou pode ser implantada por um projeto e dedicada a dar suporte apenas ao seu aplicativo.

#### Por que a camada 2 é necessária? {#why-is-layer-2-needed}

- O aumento da quantidade de transações por segundo melhora significativamente a experiência de usuário e reduzem o congestionamento da rede na rede principal do Ethereum.
- As transações são agrupadas em única transação na rede principal do Ethereum, reduzindo assim as taxas de gás, tornando o Ethereum mais inclusivo e acessível para os usuários sem importar o lugar.
- Quaisquer atualizações de dimensionamento não devem ser feitas às custas da descentralização ou da segurança – a camada 2 se baseia na rede principal do Ethereum.
- Existem redes de camada 2 específicas de aplicativos que trazem seu próprio conjunto de melhorias ao trabalhar com ativos em escala.

[Mais sobre a camada 2](/layer-2/).

#### Rollups {#rollups}

Os rollups executam a transação fora da camada 1 e, em seguida, os dados são publicados na camada 1, na qual o consenso é alcançado. Como os dados de transação estão incluídos nos blocos da camada 1, isso permite que os rollups fiquem protegidos pela segurança nativa da Ethereum.

Existem dois tipos de rollups com diferentes modelos de segurança:

- **Optimistic rollups**: assumem que as transações são válidas por padrão e só executam computação através de uma [**prova de fraude**](/glossary/#fraud-proof), caso alguém levante alguma objeção. [Mais sobre optimistic-rollups](/developers/docs/scaling/optimistic-rollups/).
- **Rollups de conhecimento zero**: executam a computação off-chain e enviam uma [**prova de validade**](/glossary/#validity-proof) para a cadeia. [Mais sobre rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/).

#### Canais de Estado {#channels}

Os canais de estado utilizam contratos multisig para permitir que os participantes realizem transações de forma rápida e livre off-chain para, em seguida, liquidar a finalidade com a Mainnet. Isso minimiza o congestionamento, as taxas e os atrasos na rede. Atualmente, existem dois tipos de canais: canais de estado e canais de pagamento.

Aprenda mais sobre [canais de estado](/developers/docs/scaling/state-channels/).

### Correntes paralelas {#sidechains}

Uma sidechain (cadeia paralela) é uma blockchain independente e compatível com EVM que roda em paralelo à Mainnet (Rede principal). As sidechains são compatíveis com o Ethereum através de pontes bidirecionais e são executadas conforme as regras de consenso escolhidas e os parâmetros do bloco.

Saiba mais sobre [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

A cadeia plasma é uma blockchain separada que é ancorada à cadeia principal do Ethereum e usa provas de fraude (como os [rollups otimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar litígios.

Aprenda mais sobre o [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Uma cadeia Validium usa provas de validade como rollups de conhecimento zero, mas os dados não são armazenados na cadeia Ethereum da camada 1 principal. Isso pode levar a 10 mil transações por segundo por cadeia Validium, e várias cadeias podem ser executadas em paralelo.

Saiba mais sobre o [Validium](/developers/docs/scaling/validium/).

## Por que tantas soluções de dimensionamento são necessárias? {#why-do-we-need-these}

- O fato de ter múltiplas soluções pode ajudar a reduzir o congestionamento geral de qualquer parte da rede e também a impedir pontos únicos de falha.
- O todo é maior que a soma de suas partes. Diferentes soluções podem existir e ainda funcionar em harmonia, provocando um efeito exponencial na velocidade futura das transações e na quantidade de dados transferidos.
- Nem todas as soluções exigem diretamente o uso do algoritmo de consenso do Ethereum, e algumas alternativas podem oferecer benefícios que, de outro modo, seriam difíceis de obter.
- Nenhuma solução de dimensionamento é suficiente para satisfazer à [visão de Ethereum](/roadmap/vision/).

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Observe que a explicação no vídeo usa o termo “Camada 2" para se referir a todas as soluções de escalabilidade off-chain, enquanto nós diferenciamos a “Camada 2" como uma solução off-chain que deriva sua segurança a partir do consenso da Mainnet (Rede principal) de camada 1._

<YouTube id="7pWxCklcNsU" />

## Leitura adicional {#further-reading}

- [Um cronograma do Ethereum centrado em rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Análises atualizadas sobre o dimensionamento da camada 2 para Ethereum](https://www.l2beat.com/)
- [Avaliando as soluções de dimensionamento da camada 2 de Ethereum: um esquema de comparação](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Um guia incompleto sobre rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum com tecnologia de ZK-Rollups: campeões do mundo](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollups vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Dimensionamento blockchain de conhecimento zero](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Por que os rollups, junto com as fragmentações dos dados, são a única solução sustentável para atingir alto dimensionamento](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Que tipo de camada 3 faz sentido?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilidade de dados ou: como os rollups aprenderam a parar de se preocupar e amar o Ethereum](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups)

_Conhece um recurso da comunidade que te ajudou? Edite essa página e adicione!_
