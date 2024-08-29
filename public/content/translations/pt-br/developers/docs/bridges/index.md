---
title: Pontes
description: Uma visão geral da ponte para desenvolvedores
lang: pt-br
---

Com a proliferação de soluções de blockchains L1 e de [dimensionamento](/developers/docs/scaling/) L2, junto com um número cada vez maior de aplicativos descentralizados cross-chain, a necessidade de comunicação e de movimentação de ativos entre as chains tornou-se uma parte essencial da infraestrutura das redes. Há diferentes tipos de bridges para ajudar a tornar isso possível.

## Necessidade de bridges {#need-for-bridges}

Bridges existem para conectar redes blockchain. Elas permitem conectividade e interoperabilidade entre blockchains.

Blockchains existem em ambientes isolados, o que significa que não há maneira de blockchains negociarem e se comunicarem com outros blockchains naturalmente. Como resultado, embora possa haver atividade e inovação significantes dentro de um ecossistema, elas estão limitadas pela falta de conexão e interoperabilidade com outros ecossistemas.

Bridges oferecem uma maneira de os ambientes isolados de blockchain se conectarem entre si. Eles estabelecem uma rota de transporte entre blockchains na qual tokens, mensagens, dados arbitrários, e até mesmo chamadas de [contratos inteligentes](/developers/docs/smart-contracts/) podem ser transferidos de uma cadeia para outra.

## Benefícios das bridges {#benefits-of-bridges}

De maneira simples, as bridges desbloqueiam numerosos casos de uso, já que possibilitam que as redes blockchain troquem dados e movam ativos entre si.

Blockchains têm pontos fortes, pontos fracos e abordagens exclusivos para a criação de aplicativos (como velocidade, taxa de transferência, custo etc.). As bridges ajudam o desenvolvimento do ecossistema cripto como um todo, ao permitir que as blockchains alavanquem as inovações umas das outras.

Para os desenvolvedores, as bridges habilitam o seguinte:

- a transferência de qualquer dado, informações e ativos entre as chains.
- desbloquear novos recursos e casos de uso para protocolos, já que as bridges expandem o espaço de desenho do que os protocolos podem oferecer. Por exemplo, um protocolo de yield farming originalmente implantado na rede principal do Ethereum pode oferecer pools de liquidez em todas as chains compatíveis com EVM.
- a oportunidade de alavancar os pontos fortes das diferentes blockchains. Por exemplo, os desenvolvedores podem se beneficiar das taxas mais baixas oferecidas pelas diferentes soluções de L2, implantando seus dapps em roolups e sidechains, e os usuários podem conectá-los por meio da bridge.
- colaboração entre desenvolvedores de vários ecossistemas blockchain para desenvolver novos produtos.
- atrair usuários e comunidades de vários ecossistemas para seus dapps.

## Como as bridges funcionam? {#how-do-bridges-work}

Embora haja muitos [tipos de desenhos de bridge](https://blog.li.fi/what-are-blockchain-bridges-and-how-can-we-classify-them-560dc6ec05fa), há três maneiras principais de facilitar a transferência de ativos entre as cadeias:

- **Lock and ming**: bloqueia os ativos na cadeia de origem e faz a "mintagem" na cadeia de destino.
- **Burn and mint**: faz o burn dos ativos na cadeia de origem e faz a mintagem de ativos na cadeia de destino.
- **Atomic swaps**: troca ativos na cadeia de origem por ativos na cadeia de destino com terceiros.

## Tipos de bridge {#bridge-types}

Geralmente, as bridges podem ser classificadas como um dos seguintes tipos:

- **Bridges nativas**: estas bridges são tipicamente criadas para criar liquidez em uma determinada blockchain, o que simplifica para os usuários mover fundos para o ecossistema. Por exemplo, a [Arbitrum Bridge](https://bridge.arbitrum.io/) foi criada para que os usuários pudessem fazer uma "ponte" entre a rede principal do Ethereum e a Arbitrum. Outras bridges incluem a Polygon PoS Bridge, a [Optimism Gateway](https://app.optimism.io/bridge) etc.
- **Bridges baseadas em validador ou oráculos**: estas bridges dependem de um conjunto de validadores externos ou oráculos para validar as transferências entre cadeias. Exemplos: Multichain e Across.
- **Bridges para o envio de mensagens generalizadas**: estas bridges podem transferir ativos, juntamente com mensagens e dados arbitrários entre cadeias. Exemplos: Nomad e LayerZero.
- **Redes de liquidez**: o objetivo principal destas bridges é a transferência de ativos de uma cadeia para outra através de atomic swaps. Geralmente, elas não suportam o envio de mensagens entre cadeias. Exemplos: Connext e Hop.

## Vantagens e desvantagens a considerar {#trade-offs}

Com bridges, não há soluções perfeitas. Em vez disso, existem apenas compromissos feitos para cumprir uma finalidade. Desenvolvedores e usuários podem avaliar bridges com base nos seguintes fatores:

- **Segurança –** Quem verifica o sistema? Bridges protegidas por validadores externos são tipicamente menos seguras do que as bridges que são locais ou nativamente protegidas pelos validadores do blockchain.
- **Conveniência –** Quanto tempo leva para completar uma transação e quantas transações um usuário precisa assinar? Para um desenvolvedor, quanto tempo leva para integrar uma bridge e qual é a complexidade do processo?
- **Connectivity –** Quais são as diferentes cadeias de destino que uma bridge pode conecta, por exemplo, rollups, sidechains, outras blockchains de camada etc, e quão difícil é integrar uma nova blockchain?
- **Capacidade de enviar dados mais complexos —** Uma bridge pode permitir a transferência de mensagens e dados arbitrários mais complexos entre cadeias ou só suporta transferências de ativos cross-chain?
- **Relação custo-benefício –** Quanto custa transferir ativos entre chains através de uma bridge? Normalmente, as bridges cobram uma taxa fixa ou variável, dependendo dos custos de gás e da liquidez de rotas específicas. É igualmente fundamental avaliar a relação custo-benefício de uma ponte baseada no capital necessário para garantir a sua segurança.

Em termos gerais, as bridges podem ser categorizadas como confiáveis e não confiáveis.

- **Confiável –** Bridges confiáveis são verificadas externamente. Elas usam um conjunto externo de verificadores (federações com sistemas de computação multi-sig e multi-partes, rede de oráculos) para enviar dados através das cadeias. Como resultado, elas podem oferecer grande conectividade e permitir a transmissão de mensagens totalmente generalizadas através das cadeias. Elas também tendem a funcionar bem com velocidade e custo-eficácia. Isto vem à custa da segurança, uma vez que os usuários têm de confiar na segurança da bridge.
- **Não confiáveis –** Estas bridges dependem das blockchains que estão conectando e seus validadores para transferir mensagens e tokens. Elas são "não confiáveis" porque não agregam novas suposições de confiança (em adição aos blockchains). Como resultado, bridges não confiáveis são consideradas mais seguras do que as bridges confiáveis.

Para avaliar bridges não confiáveis baseadas em outros fatores, temos de dividi-las em mensagens generalizadas que são enviadas a bridges e redes de liquidez.

- **Bridges para o envio de mensagens generalizadas –** Estas bridges apresentam excelente segurança e a capacidade de transferir dados mais complexos entre cadeias. Normalmente, também apresentam uma boa relação custo-benefício. No entanto, estes pontos fortes geralmente afetam a conectividade para clientes leves de bridge (ex: IBC) e apresentam desvantagens em termos de velocidade para bridges otimistas (ex: Nomad) que usam provas de fraude.
- **Redes de liquidez –** Estas bridges usam atomic swaps para a transferência de ativos e são sistemas verificados localmente (ou seja, elas usam os validadores dos blockchains subjacentes para verificar transações). Como resultado, apresentam grande segurança e velocidade. Além disso, elas são consideradas relativamente eficazes em termos de custos e oferecem uma boa conectividade. No entanto, a maior desvantagem é sua incapacidade de enviar dados mais complexos, já que elas não suportam o envio de mensagens cross-chain.

## Riscos com bridges {#risk-with-bridges}

As bridges são responsáveis pelos três principais [maiores hacks em DeFi](https://rekt.news/leaderboard/) e ainda estão nos estágios iniciais de desenvolvimento. Usar qualquer bridge traz os seguintes riscos:

- **Risco de contrato inteligente**: embora muitas bridges passaram com sucesso em auditorias, basta uma falha de contrato inteligente para que os ativos sejam expostos a hacks (ex: [Wormhole da bridge Solana](https://rekt.news/wormhole-rekt/)).
- **Riscos financeiros sistêmicos**: muitas bridges usam ativos encapsulados para mintar versões canônicas do ativo original em uma nova cadeia. Isso expõe o ecossistema a riscos sistêmicos. Um exemplo foi o que aconteceu com versões encapsuladas de tokens.
- **Risco de contraparte**: algumas bridges utilizam um design confiável que requer que os usuários confiem em que os validadores não roubarão fundos dos usuários. A necessidade de os usuários confiarem nesses atores externos os expõe a riscos como rug pull, censura e outras atividades maliciosas.
- **Problemas existentes**: dado que as bridges estão em fase inicial de desenvolvimento, existem muitas perguntas não respondidas relacionadas a como as bridges irão funcionar em diferentes condições de mercado, como tempos de congestionamento de rede e durante eventos imprevistos, como ataques a nível de rede ou estados de rollback. Esta incerteza comporta certos riscos, cujo grau ainda é desconhecido.

## Como os dApps podem usar bridges? {#how-can-dapps-use-bridges}

Aqui estão algumas aplicações práticas que os desenvolvedores podem considerar sobre as bridges e levar seus dApps cross-chain:

### Como integrar bridges {#integrating-bridges}

Para desenvolvedores, há muitas maneiras adicionar suporte a bridges:

1. **Criar sua própria bridge**: criar uma bridge segura e confiável não é fácil, especialmente se sua abordagem considerar uma rota de confiança minimizada. Além disso, requer anos de experiência e conhecimento técnico em termos de dimensionamento e interoperabilidade. Adicionalmente, exigiria uma equipe ativa para manter uma bridge e atrair liquidez suficiente para torná-la viável.

2. **Oferecer aos usuários várias opções de bridge**: muitos [dapps](/developers/docs/dapps/) exigem que os usuários tenham o próprio token nativo para interagir com eles. Para permitir que os usuários acessem seus tokens, eles oferecem diferentes opções de bridge em seu site. No entanto, esse método é uma correção rápida para o problema, uma vez que leva o usuário para fora da interface do dapp e ainda requer que ele interaja com outros dapps e bridges. Trata-se de uma experiência pouco atraente e com maior probabilidade de erros.

3. **Integrar uma bridge**: esta solução não requer que o dapp envie usuários para a bridge externa e interfaces DEX. Ela permite que dapps melhorem a experiência de integração do usuário. No entanto, esta abordagem tem suas limitações:

   - A avaliação e a manutenção das bridges são difíceis e demoradas.
   - Selecionar uma única bridge cria um ponto único de falha e dependência.
   - O dapp é limitado pelas capacidades da bridge.
   - Bridges por si só podem não ser suficientes. Os Dapps podem precisar de DEXs para oferecer mais funcionalidades, como swaps cross-chain.

4. **Integrar várias bridges**: esta solução resolve muitos problemas associados à integração de uma única bridge. No entanto, ela também tem limitações, já que integrar várias bridges consome recursos e cria sobrecargas técnicas e de comunicação para desenvolvedores, o recurso mais escasso em cripto.

5. **Integrar um agregador de bridge**: outra opção para dapps é integrar uma solução de agregação de bridges que permita a eles ter acesso a várias bridges. Agregadores de bridge herdam as forças de todas as bridges, e portanto, não são limitados pelas capacidades de uma única bridge. É importante observar que os agregadores de bridge normalmente mantêm as integrações da bridge, o que permite que o dapp não tenha que monitorar os aspectos técnicos e operacionais de uma integração de bridge.

Dito isto, os agregadores de bridge também têm as suas limitações. Por exemplo, enquanto eles podem oferecer mais opções de bridge, há muitas outras bridges disponíveis no mercado, além das oferecidas na plataforma do agregador. Além disso, tal como as bridges, os agregadores de bridge também estão expostos a riscos de contratos inteligentes e tecnológicos, ou seja, uma maior quantidade de contratos inteligentes implica em mais riscos.

Se um dapp for integrar uma bridge ou um agregador, existem diferentes opções com base no do grau de integração pretendido. Por exemplo, se for apenas uma integração front-end para melhorar a experiência de integração do usuário, um dapp integraria o widget. No entanto, se a integração é para conhecer mais em detalhes estratégias cross-chain, como staking, yield farming etc, o dapp integra o SDK ou API.

### Como implantar um dapp em múltiplas cadeias {#deploying-a-dapp-on-multiple-chains}

Para implantar um dapp em várias cadeias, os desenvolvedores podem usar plataformas de desenvolvimento como [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/) etc. Normalmente, essas plataformas vêm com plugins compostos que podem habilitar dapps para cross-chain. Por exemplo, os desenvolvedores podem usar um proxy de implantação determinístico oferecido pelo [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Exemplos:

- [Como criar dapps cross-chain](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Como criar um marketplace de NFT cross-chain](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Como criar dapps NFT cross-chain](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Como monitorar atividades de contrato entre cadeias {#monitoring-contract-activity-across-chains}

Para monitorar atividades de contrato entre cadeias, os desenvolvedores podem usar subgraphs e plataformas de desenvolvedores, como Tenderly, para acompanhar os contratos inteligentes em tempo real. Tais plataformas também têm ferramentas que oferecem melhor funcionalidade de monitoramento de dados para atividades cross-chain, tais como a busca por [eventos emitidos por contratos](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events) etc.

#### Ferramentas

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Leitura adicional {#further-reading}

- [Blockchain Bridges](/bridges/) – ethereum.org
- [Blockchain Bridges: Building Networks of Cryptonetworks](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) 8 set., 2021 – Dmitriy Berenzon
- [The Interoperability Trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) 1 out., 2021 – Arjun Bhuptani
- [Clusters: How Trusted & Trust-Minimized Bridges Shape the Multi-Chain Landscape](https://blog.celestia.org/clusters/) 4 out, 2021 – Mustafa Al-assam
- [LI.FI: With Bridges, Trust is a Spectrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) 28 abril, 2022 – Arjun Chand

Além disso, aqui estão algumas grandes apresentações úteis por[James Prestwich](https://twitter.com/_prestwich) que podem ajudar a desenvolver uma compreensão mais profunda das bridges:

- [Building Bridges, Not Walled Gardens](https://youtu.be/ZQJWMiX4hT0)
- [Breaking Down Bridges](https://youtu.be/b0mC-ZqN8Oo)
- [Why are the Bridges Burning](https://youtu.be/c7cm2kd20j8)
