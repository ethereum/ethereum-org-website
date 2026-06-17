---
title: Pontes
description: "Uma visão geral sobre pontes para desenvolvedores"
lang: pt-br
---

Com a proliferação de blockchains de camada 1 (l1) e soluções de [escalabilidade](/developers/docs/scaling/) de camada 2 (l2), juntamente com um número cada vez maior de aplicativos descentralizados (dapps) se tornando cross-chain, a necessidade de comunicação e movimentação de ativos entre cadeias tornou-se uma parte essencial da infraestrutura da rede. Diferentes tipos de pontes existem para ajudar a tornar isso possível.

## Necessidade de pontes {#need-for-bridges}

As pontes existem para conectar redes blockchain. Elas permitem conectividade e interoperabilidade entre blockchains.

As blockchains existem em ambientes isolados, o que significa que não há como as blockchains negociarem e se comunicarem com outras blockchains naturalmente. Como resultado, embora possa haver atividade e inovação significativas dentro de um ecossistema, ele é limitado pela falta de conectividade e interoperabilidade com outros ecossistemas.

As pontes oferecem uma maneira para que ambientes blockchain isolados se conectem uns aos outros. Elas estabelecem uma rota de transporte entre blockchains onde tokens, mensagens, dados arbitrários e até mesmo chamadas de [contratos inteligentes](/developers/docs/smart-contracts/) podem ser transferidos de uma cadeia para outra.

## Benefícios das pontes {#benefits-of-bridges}

Simplificando, as pontes desbloqueiam inúmeros casos de uso ao permitir que as redes blockchain troquem dados e movam ativos entre si.

As blockchains têm pontos fortes, pontos fracos e abordagens únicas para a construção de aplicativos (como velocidade, vazão, custos, etc.). As pontes ajudam o desenvolvimento do ecossistema cripto em geral, permitindo que as blockchains aproveitem as inovações umas das outras.

Para os desenvolvedores, as pontes permitem o seguinte:

- a transferência de quaisquer dados, informações e ativos entre cadeias.
- o desbloqueio de novos recursos e casos de uso para protocolos, pois as pontes expandem o espaço de design para o que os protocolos podem oferecer. Por exemplo, um protocolo para yield farming originalmente implantado na [Rede Principal do Ethereum](/) pode oferecer pools de liquidez em todas as cadeias compatíveis com a EVM.
- a oportunidade de aproveitar os pontos fortes de diferentes blockchains. Por exemplo, os desenvolvedores podem se beneficiar das taxas mais baixas oferecidas pelas diferentes soluções de camada 2 (l2) implantando seus dapps em rollups e sidechains, e os usuários podem fazer bridge entre eles.
- a colaboração entre desenvolvedores de vários ecossistemas blockchain para construir novos produtos.
- a atração de usuários e comunidades de vários ecossistemas para seus dapps.

## Como as pontes funcionam? {#how-do-bridges-work}

Embora existam muitos [tipos de designs de pontes](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), três maneiras de facilitar a transferência cross-chain de ativos se destacam:

- **Bloquear e cunhar –** Bloqueia ativos na cadeia de origem e cunha ativos na cadeia de destino.
- **Queimar e cunhar –** Queima ativos na cadeia de origem e cunha ativos na cadeia de destino.
- **Trocas atômicas (atomic swaps) –** Troca ativos na cadeia de origem por ativos na cadeia de destino com outra parte.

## Tipos de pontes {#bridge-types}

As pontes geralmente podem ser classificadas em uma das seguintes categorias:

- **Pontes nativas –** Essas pontes são normalmente construídas para impulsionar a liquidez em uma blockchain específica, tornando mais fácil para os usuários moverem fundos para o ecossistema. Por exemplo, a [Arbitrum Bridge](https://bridge.arbitrum.io/) foi construída para tornar conveniente para os usuários fazerem bridge da Rede Principal do Ethereum para a Arbitrum. Outras pontes desse tipo incluem a Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), etc.
- **Pontes baseadas em validadores ou oráculos –** Essas pontes dependem de um conjunto de validadores externos ou oráculos para validar transferências cross-chain. Exemplos: Multichain e Across.
- **Pontes de passagem de mensagens generalizadas –** Essas pontes podem transferir ativos, juntamente com mensagens e dados arbitrários entre cadeias. Exemplos: Axelar, LayerZero e Nomad.
- **Redes de liquidez –** Essas pontes se concentram principalmente na transferência de ativos de uma cadeia para outra por meio de trocas atômicas. Geralmente, elas não suportam a passagem de mensagens cross-chain. Exemplos: Connext e Hop.

## Concessões a considerar {#trade-offs}

Com as pontes, não existem soluções perfeitas. Em vez disso, existem apenas concessões (trade-offs) feitas para cumprir um propósito. Desenvolvedores e usuários podem avaliar as pontes com base nos seguintes fatores:

- **Segurança –** Quem verifica o sistema? Pontes protegidas por validadores externos são normalmente menos seguras do que pontes que são protegidas local ou nativamente pelos validadores da blockchain.
- **Conveniência –** Quanto tempo leva para concluir uma transação e quantas transações um usuário precisou assinar? Para um desenvolvedor, quanto tempo leva para integrar uma ponte e quão complexo é o processo?
- **Conectividade –** Quais são as diferentes cadeias de destino que uma ponte pode conectar (ou seja, rollups, sidechains, outras blockchains de camada 1 (l1), etc.) e quão difícil é integrar uma nova blockchain?
- **Capacidade de passar dados mais complexos –** Uma ponte pode permitir a transferência de mensagens e dados arbitrários mais complexos entre cadeias, ou ela suporta apenas transferências de ativos cross-chain?
- **Custo-benefício –** Quanto custa transferir ativos entre cadeias por meio de uma ponte? Normalmente, as pontes cobram uma taxa fixa ou variável, dependendo dos custos de gás e da liquidez de rotas específicas. Também é fundamental avaliar o custo-benefício de uma ponte com base no capital necessário para garantir sua segurança.

Em alto nível, as pontes podem ser categorizadas como confiáveis (trusted) e sem necessidade de confiança (trustless).

- **Confiáveis (Trusted) –** Pontes confiáveis são verificadas externamente. Elas usam um conjunto externo de verificadores (Federações com multi-sig, sistemas de computação multipartidária, rede de oráculos) para enviar dados entre cadeias. Como resultado, elas podem oferecer ótima conectividade e permitir a passagem de mensagens totalmente generalizada entre cadeias. Elas também tendem a ter um bom desempenho em termos de velocidade e custo-benefício. Isso ocorre à custa da segurança, pois os usuários precisam confiar na segurança da ponte.
- **Sem necessidade de confiança (Trustless) –** Essas pontes dependem das blockchains que estão conectando e de seus validadores para transferir mensagens e tokens. Elas são 'sem necessidade de confiança' porque não adicionam novas premissas de confiança (além das blockchains). Como resultado, as pontes sem necessidade de confiança são consideradas mais seguras do que as pontes confiáveis.

Para avaliar as pontes sem necessidade de confiança com base em outros fatores, devemos dividi-las em pontes de passagem de mensagens generalizadas e redes de liquidez.

- **Pontes de passagem de mensagens generalizadas –** Essas pontes se destacam pela segurança e pela capacidade de transferir dados mais complexos entre cadeias. Normalmente, elas também são boas em termos de custo-benefício. No entanto, esses pontos fortes geralmente vêm à custa da conectividade para pontes de clientes leves (ex: IBC) e desvantagens de velocidade para pontes otimistas (ex: Nomad) que usam provas de fraude.
- **Redes de liquidez –** Essas pontes usam trocas atômicas para transferir ativos e são sistemas verificados localmente (ou seja, usam os validadores das blockchains subjacentes para verificar as transações). Como resultado, elas se destacam em segurança e velocidade. Além disso, são consideradas comparativamente econômicas e oferecem boa conectividade. No entanto, a principal concessão é a incapacidade de passar dados mais complexos – já que não suportam a passagem de mensagens cross-chain.

## Riscos com pontes {#risk-with-bridges}

As pontes são responsáveis pelos três [maiores hacks em finanças descentralizadas (DeFi)](https://rekt.news/leaderboard/) e ainda estão nos estágios iniciais de desenvolvimento. O uso de qualquer ponte acarreta os seguintes riscos:

- **Risco de contrato inteligente –** Embora muitas pontes tenham passado com sucesso por auditorias, basta uma falha em um contrato inteligente para que os ativos fiquem expostos a hacks (ex: [Wormhole Bridge da Solana](https://rekt.news/wormhole-rekt/)).
- **Riscos financeiros sistêmicos** – Muitas pontes usam ativos empacotados (wrapped) para cunhar versões canônicas do ativo original em uma nova cadeia. Isso expõe o ecossistema a riscos sistêmicos, como já vimos versões empacotadas de tokens serem exploradas.
- **Risco de contraparte –** Algumas pontes utilizam um design confiável que exige que os usuários confiem na premissa de que os validadores não entrarão em conluio para roubar os fundos dos usuários. A necessidade de os usuários confiarem nesses atores terceirizados os expõe a riscos como puxadas de tapete (rug pulls), censura e outras atividades maliciosas.
- **Problemas em aberto –** Dado que as pontes estão nos estágios iniciais de desenvolvimento, há muitas perguntas sem resposta relacionadas a como as pontes se comportarão em diferentes condições de mercado, como tempos de congestionamento da rede e durante eventos imprevistos, como ataques no nível da rede ou reversões de estado. Essa incerteza apresenta certos riscos, cujo grau ainda é desconhecido.

## Como os dapps podem usar pontes? {#how-can-dapps-use-bridges}

Aqui estão algumas aplicações práticas que os desenvolvedores podem considerar sobre pontes e como levar seu dapp para cross-chain:

### Integrando pontes {#integrating-bridges}

Para os desenvolvedores, há muitas maneiras de adicionar suporte para pontes:

1. **Construindo sua própria ponte –** Construir uma ponte segura e confiável não é fácil, especialmente se você seguir uma rota mais minimizada em confiança. Além disso, requer anos de experiência e conhecimento técnico relacionado a estudos de escalabilidade e interoperabilidade. Adicionalmente, exigiria uma equipe prática para manter uma ponte e atrair liquidez suficiente para torná-la viável.

2. **Mostrando aos usuários várias opções de pontes –** Muitos [dapps](/developers/docs/dapps/) exigem que os usuários tenham seu token nativo para interagir com eles. Para permitir que os usuários acessem seus tokens, eles oferecem diferentes opções de pontes em seu site. No entanto, esse método é uma solução rápida para o problema, pois afasta o usuário da interface do dapp e ainda exige que ele interaja com outros dapps e pontes. Esta é uma experiência de integração complicada com um escopo maior de cometer erros.

3. **Integrando uma ponte –** Essa solução não exige que o dapp envie os usuários para as interfaces externas de pontes e DEXs. Ela permite que os dapps melhorem a experiência de integração do usuário. No entanto, essa abordagem tem suas limitações:

   - A avaliação e manutenção de pontes são difíceis e demoradas.
   - Selecionar uma ponte cria um único ponto de falha e dependência.
   - O dapp é limitado pelos recursos da ponte.
   - Pontes sozinhas podem não ser suficientes. Os dapps podem precisar de DEXs para oferecer mais funcionalidades, como trocas cross-chain.

4. **Integrando várias pontes –** Essa solução resolve muitos problemas associados à integração de uma única ponte. No entanto, ela também tem limitações, pois a integração de várias pontes consome recursos e cria sobrecargas técnicas e de comunicação para os desenvolvedores — o recurso mais escasso em cripto.

5. **Integrando um agregador de pontes –** Outra opção para dapps é integrar uma solução de agregação de pontes que lhes dê acesso a várias pontes. Os agregadores de pontes herdam os pontos fortes de todas as pontes e, portanto, não são limitados pelos recursos de nenhuma ponte individual. Notavelmente, os agregadores de pontes normalmente mantêm as integrações de pontes, o que poupa o dapp do incômodo de ficar por dentro dos aspectos técnicos e operacionais de uma integração de ponte.

Dito isso, os agregadores de pontes também têm suas limitações. Por exemplo, embora possam oferecer mais opções de pontes, normalmente há muito mais pontes disponíveis no mercado além daquelas oferecidas na plataforma do agregador. Além disso, assim como as pontes, os agregadores de pontes também estão expostos a riscos de contratos inteligentes e de tecnologia (mais contratos inteligentes = mais riscos).

Se um dapp seguir o caminho de integrar uma ponte ou um agregador, existem diferentes opções com base na profundidade que a integração deve ter. Por exemplo, se for apenas uma integração de front-end para melhorar a experiência de integração do usuário, um dapp integraria o widget. No entanto, se a integração for para explorar estratégias cross-chain mais profundas, como staking, yield farming, etc., o dapp integra o SDK ou a API.

### Implantando um dapp em várias cadeias {#deploying-a-dapp-on-multiple-chains}

Para implantar um dapp em várias cadeias, os desenvolvedores podem usar plataformas de desenvolvimento como [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. Normalmente, essas plataformas vêm com plugins compuníveis que podem permitir que os dapps se tornem cross-chain. Por exemplo, os desenvolvedores podem usar um proxy de implantação determinístico oferecido pelo [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Exemplos: {#examples}

- [Como construir dapps cross-chain](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Construindo um mercado de NFT cross-chain](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Construindo dapps de NFT cross-chain](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitorando a atividade de contratos entre cadeias {#monitoring-contract-activity-across-chains}

Para monitorar a atividade de contratos entre cadeias, os desenvolvedores podem usar subgrafos e plataformas de desenvolvedores como Tenderly para observar contratos inteligentes em tempo real. Tais plataformas também possuem ferramentas que oferecem maior funcionalidade de monitoramento de dados para atividades cross-chain, como a verificação de [eventos emitidos por contratos](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Ferramentas {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Leitura adicional {#further-reading}

- [Pontes de Blockchain](/bridges/) – ethereum.org
- [Estrutura de Risco de Pontes da L2BEAT](https://l2beat.com/bridges/summary)
- [Pontes de Blockchain: Construindo Redes de Criptoredes](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 de setembro de 2021 – Dmitriy Berenzon
- [O Trilema da Interoperabilidade](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1º de outubro de 2021 – Arjun Bhuptani
- [Clusters: Como Pontes Confiáveis e Minimizadas em Confiança Moldam o Cenário Multi-Chain](https://blog.celestia.org/clusters/) - 4 de outubro de 2021 – Mustafa Al-Bassam
- [LI.FI: Com Pontes, a Confiança é um Espectro](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 de abril de 2022 – Arjun Chand
- [O Estado das Soluções de Interoperabilidade de Rollups](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 de junho de 2024 – Alex Hook
- [Aproveitando a Segurança Compartilhada para Interoperabilidade Cross-Chain Segura: Comitês de Estado Lagrange e Além](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 de junho de 2024 – Emmanuel Awosika

Além disso, aqui estão algumas apresentações perspicazes de [James Prestwich](https://twitter.com/_prestwich) que podem ajudar a desenvolver uma compreensão mais profunda sobre pontes:

- [Construindo Pontes, Não Jardins Murados](https://youtu.be/ZQJWMiX4hT0)
- [Desconstruindo Pontes](https://youtu.be/b0mC-ZqN8Oo)
- [Por Que as Pontes Estão Queimando](https://youtu.be/c7cm2kd20j8)