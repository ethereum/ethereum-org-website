---
title: Escalabilidade
description: Uma introdução às diferentes opções de dimensionamento atualmente em desenvolvimento pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

## Visão geral da escalabilidade {#scaling-overview}

À medida que o número de usuários do Ethereum aumenta, a blockchain atinge certas limitações de capacidade. Isso tem elevado os custos de utilização da rede, criando a necessidade de "soluções de dimensionamento". Existem várias soluções sendo pesquisadas, testadas e implementadas que adotam diferentes abordagens para atingir metas semelhantes.

O principal objetivo da escalabilidade é aumentar a velocidade de transação (finalidade mais rápida) e a taxa de transferência de transações (maior número de transações por segundo), sem sacrificar a descentralização ou a segurança. Na blockchain de camada 1 da Ethereum, a alta demanda leva a transações mais lentas e [preços de gás](/developers/docs/gas/) inviáveis. Aumentar a capacidade da rede em termos de velocidade e taxa de transferência é fundamental para uma adoção significativa e massiva do Ethereum.

Embora a velocidade e a taxa de transferência sejam importantes, é essencial que tais soluções de dimensionamento habilitadas para tais fins permaneçam descentralizadas e seguras. Manter a barreira de entrada baixa para os operadores de nó é fundamental para prevenir uma progressão rumo a um poder de computação centralizado e inseguro.

Conceptually we first categorize scaling as either onchain scaling or offchain scaling.

## Pré-requisitos {#prerequisites}

Você deveria ter um bom entendimento de todos os tópicos fundamentais. Implementar soluções de dimensionamento é um conceito avançado, já que a tecnologia é menos testada e continua a ser pesquisada e desenvolvida.

## Escalabilidade na cadeia {#onchain-scaling}

A escalabilidade na cadeia exige alterações no protocolo Ethereum (camada 1 da [Mainnet](/glossary/#mainnet)). A solução de fragmentação da blockchain era aguardada há muito tempo para escalar o Ethereum. Isso implicava dividir a blockchain em partes discretas (fragmentos), que seriam verificadas por subconjuntos de validadores. No entanto, a técnica de escalabilidade principal adotada foi a de escalar por rollups de camada 2. Ela é suportada pela adição de uma nova forma mais barata de dados anexados aos blocos Ethereum, que foi especialmente criada para tornar os rollups baratos para os usuários.

### Sharding {#sharding}

Fragmentação é o processo de dividir um banco de dados. Subconjuntos de validadores seriam responsáveis por seus próprios fragmentos, em vez de manter o controle de todo o Ethereum. O sharding esteve no [roadmap](/roadmap/) da Ethereum por um longo tempo e foi planejado para ser lançado antes do The Merge para prova de participação. No entanto, o rápido desenvolvimento de [rollups de camada 2](#layer-2-scaling) e a invenção do [Danksharding](/roadmap/danksharding) (adicionando blobs de dados de rollup a blocos da Ethereum que podem ser verificados de forma muito eficiente por validadores) levou a comunidade Ethereum a favorecer a escalabilidade centrada em rollups em vez da escalabilidade por sharding. Isso também ajudará a manter a lógica de consenso do Ethereum mais simples.

## Escalabilidade fora da cadeia {#offchain-scaling}

Os offchain solutions são separados do layer 1 Mainnet. Algumas soluções, conhecidas como soluções de "camada 2", derivam sua segurança diretamente do consenso da camada 1 do Ethereum, como os [optimistic rollups](/developers/docs/scaling/optimistic-rollups/), [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/) ou [canais de estado](/developers/docs/scaling/state-channels/). Outras soluções envolvem a criação de novas cadeias em várias formas que derivam sua segurança separadamente da Mainnet, como [sidechains](#sidechains), [validiums](#validium) ou [plasma chains](#plasma). Essas soluções se comunicam com a Mainnet, mas derivam sua segurança de forma diferente para atingir uma variedade de objetivos.

### Escalabilidade da Camada 2 {#layer-2-scaling}

Esta categoria de offchain solutions obtém segurança da Rede principal do Ethereum.

A camada 2 é um termo coletivo de soluções projetadas para ajudar a dimensionar os aplicativos, gerenciando transações fora da rede principal (camada 1) do Ethereum, aproveitando o robusto modelo de segurança descentralizada da Mainnet (Rede principal). A velocidade das transações é reduzida quando a rede está ocupada, o que pode tornar a experiência do usuário ruim para certos tipos de dapps. À medida que a rede fica mais movimentada, os preços do gás aumentam, pois os remetentes de transações tendem a oferecer mais para processar sua transação antes das dos outros. Isso pode tornar o uso do Ethereum bem mais caro.

A maioria das soluções de camada 2 orbitam ao redor de um servidor, ou cluster de servidores, cada um dos quais pode ser referenciado como um nó, como um validador, como um operador, como um sequenciador de transações, como um produtor de blocos ou como algo semelhante. Dependendo da implementação, esses nós da camada 2 podem ser executados pelos indivíduos, empresas ou entidades que os usam, por um operador de terceiros ou por um grande grupo de indivíduos (semelhante à Mainnet). Em geral, ao invés de serem enviadas diretamente para a camada 1 (rede principal), as transações são submetidas a esses nós da camada 2. Para algumas soluções, o camada 2 agrupa-os antes de os transmitir ao camada 1, no qual ficam protegidos e não podem ser alterados. Os pormenores de como isso é feito variam significativamente entre diferentes tecnologias de camada 2 e implementações.

Uma instância específica da camada 2 pode ser aberta e compartilhada por muitos aplicativos, ou pode ser implantada por um projeto e dedicada a dar suporte apenas ao seu aplicativo.

#### Por que a camada 2 é necessária? {#why-is-layer-2-needed}

- O aumento da quantidade de transações por segundo melhora significativamente a experiência de usuário e reduzem o congestionamento da rede na rede principal do Ethereum.
- As transações são agrupadas em uma única transação para a Mainnet da Ethereum, reduzindo as taxas de gás para os usuários e tornando a Ethereum mais inclusiva e acessível para pessoas em todos os lugares.
- Quaisquer atualizações de dimensionamento não devem ser feitas às custas da descentralização ou da segurança – a camada 2 se baseia na rede principal do Ethereum.
- Existem redes de camada 2 específicas para aplicativos que trazem seu próprio conjunto de eficiências ao trabalhar com ativos em escala.

[Mais sobre a camada 2](/layer-2/).

#### Rollups {#rollups}

Os rollups executam a transação fora da camada 1 e, em seguida, os dados são publicados na camada 1, na qual o consenso é alcançado. Como os dados de transação estão incluídos nos blocos da camada 1, isso permite que os rollups fiquem protegidos pela segurança nativa da Ethereum.

Existem dois tipos de rollups com diferentes modelos de segurança:

- **Optimistic rollups**: presumem que as transações são válidas por padrão e só executam a computação, por meio de uma [**prova de fraude**](/glossary/#fraud-proof), no caso de uma contestação. [Mais sobre Optimistic rollups](/developers/docs/scaling/optimistic-rollups/).
- **Rollups de conhecimento zero**: executam a computação fora da cadeia e enviam uma [**prova de validade**](/glossary/#validity-proof) para a cadeia. [Mais sobre rollups de conhecimento zero](/developers/docs/scaling/zk-rollups/).

#### State channels {#channels}

Os canais de estado utilizam multisig contracts para permitir que os participantes realizarem transações de forma rápida e livre off-chain por final settlement à rede principal. Isso minimiza o congestionamento, as taxas e os atrasos na rede. Atualmente, existem dois tipos de canais: canais de estado e canais de pagamento.

Saiba mais sobre [canais de estado](/developers/docs/scaling/state-channels/).

### Sidechains {#sidechains}

Uma sidechain é uma blockchain independente, compatível com a EVM, que funciona em paralelo à Mainnet. Elas são compatíveis com a Ethereum por meio de pontes bidirecionais e funcionam sob suas próprias regras de consenso e parâmetros de bloco.

Saiba mais sobre [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Uma plasma chain é uma blockchain separada que é ancorada à cadeia principal da Ethereum e usa provas de fraude (como os [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Saiba mais sobre o [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Uma cadeia Validium usa provas de validade como rollups de conhecimento zero, mas os dados não são armazenados na cadeia Ethereum da camada 1 principal. Isso pode levar a 10 mil transações por segundo por cadeia Validium, e várias cadeias podem ser executadas em paralelo.

Saiba mais sobre o [Validium](/developers/docs/scaling/validium/).

## Por que tantas soluções de dimensionamento são necessárias? {#why-do-we-need-these}

- Várias soluções podem ajudar a reduzir o congestionamento geral em qualquer parte da rede e também evitar pontos únicos de falha.
- O todo é maior que a soma de suas partes. Diferentes soluções podem existir e ainda funcionar em harmonia, provocando um efeito exponencial na velocidade futura das transações e na quantidade de dados transferidos.
- Nem todas as soluções exigem diretamente o uso do algoritmo de consenso do Ethereum, e algumas alternativas podem oferecer benefícios que, de outro modo, seriam difíceis de obter.

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Vídeo usa o termo “Camada 2" para se referir a todas as soluções de escalabilidade off-chain, enquanto nós diferenciamos o “Camada 2" como solução offchain que obtém segurança do consenso da layer 1 Mainnet._

<YouTube id="7pWxCklcNsU" />

## Leitura adicional {#further-reading}

- [Um roteiro da Ethereum centrado em rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Análises atualizadas sobre soluções de escalabilidade de camada 2 para a Ethereum](https://www.l2beat.com/)
- [Avaliando as soluções de escalabilidade de camada 2 da Ethereum: uma estrutura de comparação](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Um guia incompleto sobre rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollups com tecnologia da Ethereum: os melhores do mundo](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollups vs. ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Por que rollups + data shards são a única solução sustentável para alta escalabilidade](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Que tipo de camada 3 faz sentido?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilidade de Dados ou: Como os Rollups Aprenderam a Parar de Se Preocupar e Amar o Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [O Guia Prático para Rollups da Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_
