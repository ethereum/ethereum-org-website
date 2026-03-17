---
title: Pontes
description: "Uma visão geral da ponte para desenvolvedores"
lang: pt-br
---

Com a proliferação de blockchains L1 e soluções de [escalabilidade](/developers/docs/scaling/) L2, juntamente com um número cada vez maior de aplicativos descentralizados se tornando cross-chain, a necessidade de comunicação e movimentação de ativos entre redes tornou-se uma parte essencial da infraestrutura de rede. Há diferentes tipos de bridges para ajudar a tornar isso possível.

## Necessidade de pontes {#need-for-bridges}

Bridges existem para conectar redes blockchain. Elas permitem conectividade e interoperabilidade entre blockchains.

Blockchains existem em ambientes isolados, o que significa que não há maneira de blockchains negociarem e se comunicarem com outros blockchains naturalmente. Como resultado, embora possa haver atividade e inovação significantes dentro de um ecossistema, elas estão limitadas pela falta de conexão e interoperabilidade com outros ecossistemas.

Bridges oferecem uma maneira de os ambientes isolados de blockchain se conectarem entre si. Elas estabelecem uma rota de transporte entre blockchains onde tokens, mensagens, dados arbitrários e até mesmo chamadas de [contrato inteligente](/developers/docs/smart-contracts/) podem ser transferidos de uma rede para outra.

## Benefícios das pontes {#benefits-of-bridges}

De maneira simples, as bridges desbloqueiam numerosos casos de uso, já que possibilitam que as redes blockchain troquem dados e movam ativos entre si.

Blockchains têm pontos fortes, pontos fracos e abordagens exclusivos para a criação de aplicativos (como velocidade, taxa de transferência, custo etc.). As bridges ajudam o desenvolvimento do ecossistema cripto como um todo, ao permitir que as blockchains alavanquem as inovações umas das outras.

Para os desenvolvedores, as bridges habilitam o seguinte:

- a transferência de qualquer dado, informações e ativos entre as chains.
- desbloquear novos recursos e casos de uso para protocolos, já que as bridges
  expandem o espaço de desenho do que os protocolos podem oferecer. Por exemplo, um protocolo de yield farming originalmente implantado na rede principal do Ethereum pode oferecer pools de liquidez em todas as chains compatíveis com EVM.
- a oportunidade de alavancar os pontos fortes das diferentes blockchains. Por exemplo, os desenvolvedores podem se beneficiar das taxas mais baixas oferecidas pelas diferentes soluções de L2, implantando seus dapps em roolups e sidechains, e os usuários podem conectá-los por meio da bridge.
- colaboração entre desenvolvedores de vários ecossistemas blockchain para desenvolver novos produtos.
- atrair usuários e comunidades de vários ecossistemas para seus dapps.

## Como as bridges funcionam? {#how-do-bridges-work}

Embora existam muitos [tipos de designs de pontes](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), três maneiras de facilitar a transferência de ativos entre redes se destacam:

- **Bloquear e cunhar –** Bloqueia ativos na rede de origem e cunha ativos na rede de destino.
- **Queimar e cunhar –** Queima ativos na rede de origem e cunha ativos na rede de destino.
- **Swaps atômicos –** Troca de ativos na rede de origem por ativos na rede de destino com outra parte.

## Tipos de pontes {#bridge-types}

Geralmente, as bridges podem ser classificadas como um dos seguintes tipos:

- **Pontes nativas –** Essas pontes são normalmente construídas para impulsionar a liquidez em um blockchain específico, facilitando para os usuários moverem fundos para o ecossistema. Por exemplo, a [Arbitrum Bridge](https://bridge.arbitrum.io/) foi construída para facilitar que os usuários façam a ponte da Rede Principal do Ethereum para a Arbitrum. Outras pontes semelhantes incluem a Polygon PoS Bridge, a [Optimism Gateway](https://app.optimism.io/bridge), etc.
- **Pontes baseadas em validador ou oráculo –** Essas pontes dependem de um conjunto de validadores externos ou oráculos para validar as transferências entre redes. Exemplos: Multichain e Across.
- **Pontes de passagem de mensagens generalizadas –** Essas pontes podem transferir ativos, juntamente com mensagens e dados arbitrários entre redes. Exemplos: Axelar, LayerZero e Nomad.
- **Redes de liquidez –** Essas pontes focam principalmente na transferência de ativos de uma rede para outra por meio de atomic swaps. Geralmente, elas não suportam o envio de mensagens entre cadeias. Exemplos: Connext e Hop.

## Vantagens e desvantagens a considerar {#trade-offs}

Com bridges, não há soluções perfeitas. Em vez disso, existem apenas compromissos feitos para cumprir uma finalidade. Desenvolvedores e usuários podem avaliar bridges com base nos seguintes fatores:

- **Segurança –** Quem verifica o sistema? Bridges protegidas por validadores externos são tipicamente menos seguras do que as bridges que são locais ou nativamente protegidas pelos validadores do blockchain.
- **Conveniência –** Quanto tempo leva para concluir uma transação e quantas transações um usuário precisa assinar? Para um desenvolvedor, quanto tempo leva para integrar uma bridge e qual é a complexidade do processo?
- **Conectividade –** Quais são as diferentes redes de destino que uma ponte pode conectar (isto é, rollups, sidechains, outras blockchains de camada 1, etc.), e qual a dificuldade para integrar um novo blockchain?
- **Capacidade de passar dados mais complexos –** Uma ponte pode permitir a transferência de mensagens e dados arbitrários mais complexos entre redes, ou ela suporta apenas transferências de ativos entre redes?
- **Custo-benefício –** Quanto custa transferir ativos entre redes por meio de uma ponte? Normalmente, as bridges cobram uma taxa fixa ou variável, dependendo dos custos de gás e da liquidez de rotas específicas. É igualmente fundamental avaliar a relação custo-benefício de uma ponte baseada no capital necessário para garantir a sua segurança.

Em termos gerais, as bridges podem ser categorizadas como confiáveis e não confiáveis.

- **Confiáveis –** Pontes confiáveis são verificadas externamente. Elas usam um conjunto externo de verificadores (federações com sistemas de computação multi-sig e multi-partes, rede de oráculos) para enviar dados através das cadeias. Como resultado, elas podem oferecer grande conectividade e permitir a transmissão de mensagens totalmente generalizadas através das cadeias. Elas também tendem a funcionar bem com velocidade e custo-eficácia. Isto vem à custa da segurança, uma vez que os usuários têm de confiar na segurança da bridge.
- **Sem necessidade de confiança –** Essas pontes dependem dos blockchains que estão conectando e de seus validadores para transferir mensagens e tokens. Elas são "não confiáveis" porque não agregam novas suposições de confiança (em adição aos blockchains). Como resultado, bridges não confiáveis são consideradas mais seguras do que as bridges confiáveis.

Para avaliar bridges não confiáveis baseadas em outros fatores, temos de dividi-las em mensagens generalizadas que são enviadas a bridges e redes de liquidez.

- **Pontes de passagem de mensagens generalizadas –** Essas pontes se destacam pela segurança e pela capacidade de transferir dados mais complexos entre redes. Normalmente, também apresentam uma boa relação custo-benefício. No entanto, estes pontos fortes geralmente afetam a conectividade para clientes leves de bridge (ex: IBC) e apresentam desvantagens em termos de velocidade para bridges otimistas (ex: Nomad) que usam provas de fraude.
- **Redes de liquidez –** Essas pontes usam atomic swaps para transferir ativos e são sistemas verificados localmente (ou seja, usam os validadores dos blockchains subjacentes para verificar as transações). Como resultado, apresentam grande segurança e velocidade. Além disso, elas são consideradas relativamente eficazes em termos de custos e oferecem uma boa conectividade. No entanto, a maior desvantagem é sua incapacidade de enviar dados mais complexos, já que elas não suportam o envio de mensagens cross-chain.

## Riscos das pontes {#risk-with-bridges}

As pontes são responsáveis pelos três [maiores hacks em DeFi](https://rekt.news/leaderboard/) e ainda estão nos estágios iniciais de desenvolvimento. Usar qualquer bridge traz os seguintes riscos:

- **Risco de contrato inteligente –** Embora muitas pontes tenham sido aprovadas em auditorias, basta uma falha em um contrato inteligente para que os ativos fiquem expostos a hacks (ex.: a [Wormhole Bridge da Solana](https://rekt.news/wormhole-rekt/)).
- **Riscos financeiros sistêmicos –** Muitas pontes usam ativos encapsulados (wrapped assets) para cunhar versões canônicas do ativo original em uma nova rede. Isso expõe o ecossistema a riscos sistêmicos. Um exemplo foi o que aconteceu com versões encapsuladas de tokens.
- **Risco de contraparte –** Algumas pontes utilizam um design confiável que exige que os usuários confiem na premissa de que os validadores não entrarão em conluio para roubar os fundos dos usuários. A necessidade de os usuários confiarem nesses atores externos os expõe a riscos como rug pull, censura e outras atividades maliciosas.
- **Questões em aberto –** Como as pontes estão nos estágios iniciais de desenvolvimento, há muitas perguntas sem resposta relacionadas a como as pontes se comportarão em diferentes condições de mercado, como em momentos de congestionamento da rede e durante eventos imprevistos, como ataques no nível da rede ou reversões de estado. Esta incerteza comporta certos riscos, cujo grau ainda é desconhecido.

## Como os dApps podem usar bridges? {#how-can-dapps-use-bridges}

Aqui estão algumas aplicações práticas que os desenvolvedores podem considerar sobre as bridges e levar seus dApps cross-chain:

### Integrando pontes {#integrating-bridges}

Para desenvolvedores, há muitas maneiras adicionar suporte a bridges:

1. **Construindo sua própria ponte –** Construir uma ponte segura e confiável não é fácil, especialmente se você seguir uma rota com confiança minimizada. Além disso, requer anos de experiência e conhecimento técnico em termos de dimensionamento e interoperabilidade. Adicionalmente, exigiria uma equipe ativa para manter uma bridge e atrair liquidez suficiente para torná-la viável.

2. **Mostrando aos usuários múltiplas opções de ponte –** Muitos [dapps](/developers/docs/dapps/) exigem que os usuários tenham seu token nativo para interagir com eles. Para permitir que os usuários acessem seus tokens, eles oferecem diferentes opções de bridge em seu site. No entanto, esse método é uma correção rápida para o problema, uma vez que leva o usuário para fora da interface do dapp e ainda requer que ele interaja com outros dapps e bridges. Trata-se de uma experiência pouco atraente e com maior probabilidade de erros.

3. **Integrando uma ponte –** Essa solução não exige que o dapp envie os usuários para a ponte externa e para as interfaces de DEX. Ela permite que dapps melhorem a experiência de integração do usuário. No entanto, esta abordagem tem suas limitações:

   - A avaliação e a manutenção das bridges são difíceis e demoradas.
   - Selecionar uma única bridge cria um ponto único de falha e dependência.
   - O dapp é limitado pelas capacidades da bridge.
   - Bridges por si só podem não ser suficientes. Os Dapps podem precisar de DEXs para oferecer mais funcionalidades, como swaps cross-chain.

4. **Integrando múltiplas pontes –** Essa solução resolve muitos problemas associados à integração de uma única ponte. No entanto, ela também tem limitações, já que integrar várias bridges consome recursos e cria sobrecargas técnicas e de comunicação para desenvolvedores, o recurso mais escasso em cripto.

5. **Integrando um agregador de pontes –** Outra opção para dapps é integrar uma solução de agregação de pontes que lhes dê acesso a múltiplas pontes. Agregadores de bridge herdam as forças de todas as bridges, e portanto, não são limitados pelas capacidades de uma única bridge. É importante observar que os agregadores de bridge normalmente mantêm as integrações da bridge, o que permite que o dapp não tenha que monitorar os aspectos técnicos e operacionais de uma integração de bridge.

Dito isto, os agregadores de bridge também têm as suas limitações. Por exemplo, enquanto eles podem oferecer mais opções de bridge, há muitas outras bridges disponíveis no mercado, além das oferecidas na plataforma do agregador. Além disso, tal como as bridges, os agregadores de bridge também estão expostos a riscos de contratos inteligentes e tecnológicos, ou seja, uma maior quantidade de contratos inteligentes implica em mais riscos.

Se um dapp for integrar uma bridge ou um agregador, existem diferentes opções com base no do grau de integração pretendido. Por exemplo, se for apenas uma integração front-end para melhorar a experiência de integração do usuário, um dapp integraria o widget. No entanto, se a integração é para conhecer mais em detalhes estratégias cross-chain, como staking, yield farming etc, o dapp integra o SDK ou API.

### Fazendo deploy de um dapp em múltiplas redes {#deploying-a-dapp-on-multiple-chains}

Para fazer deploy de um dapp em múltiplas redes, os desenvolvedores podem usar plataformas de desenvolvimento como [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. Normalmente, essas plataformas vêm com plugins compostos que podem habilitar dapps para cross-chain. Por exemplo, os desenvolvedores podem usar um proxy de implantação determinístico oferecido pelo [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Exemplos:

- [Como construir dapps de cross-chain](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Construindo um Marketplace de NFT de Múltiplas Redes](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Construindo dapps de NFT de múltiplas redes](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitorando a atividade de contratos entre redes {#monitoring-contract-activity-across-chains}

Para monitorar atividades de contrato entre cadeias, os desenvolvedores podem usar subgraphs e plataformas de desenvolvedores, como Tenderly, para acompanhar os contratos inteligentes em tempo real. Essas plataformas também têm ferramentas que oferecem maior funcionalidade de monitoramento de dados para atividades entre redes, como a verificação de [eventos emitidos por contratos](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Ferramentas

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Leitura adicional {#further-reading}

- [Pontes de Blockchain](/bridges/) – ethereum.org
- [Estrutura de Risco de Pontes do L2Beat](https://l2beat.com/bridges/summary)
- [Pontes de Blockchain: Construindo Redes de Cripto-redes](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 de setembro de 2021 – Dmitriy Berenzon
- [O Trilema da Interoperabilidade](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 de outubro de 2021 – Arjun Bhuptani
- [Clusters: Como as pontes confiáveis e com confiança minimizada moldam o cenário de múltiplas redes](https://blog.celestia.org/clusters/) - 4 de outubro de 2021 – Mustafa Al-Bassam
- [LI.FI: Com as pontes, a confiança é um espectro](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 de abril de 2022 – Arjun Chand
- [O estado das soluções de interoperabilidade de rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 de junho de 2024 – Alex Hook
- [Aproveitando a segurança compartilhada para interoperabilidade segura entre redes: Comitês de Estado de Lagrange e além](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 de junho de 2024 – Emmanuel Awosika

Além disso, aqui estão algumas apresentações perspicazes de [James Prestwich](https://twitter.com/_prestwich) que podem ajudar a desenvolver uma compreensão mais profunda sobre pontes:

- [Construindo Pontes, Não Jardins Murados](https://youtu.be/ZQJWMiX4hT0)
- [Analisando as Pontes](https://youtu.be/b0mC-ZqN8Oo)
- [Por que as Pontes Estão Queimando?](https://youtu.be/c7cm2kd20j8)
