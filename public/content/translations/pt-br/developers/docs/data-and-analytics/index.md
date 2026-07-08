---
title: "Dados e análises"
description: "Como obter análises e dados onchain para usar em seus dapps"
lang: pt-br
---

## Introdução {#introduction}

À medida que a utilização da rede continua a crescer, uma quantidade cada vez maior de informações valiosas existirá nos dados onchain. Como o volume de dados aumenta rapidamente, calcular e agregar essas informações para gerar relatórios ou impulsionar um aplicativo descentralizado (dapp) pode se tornar um esforço demorado e pesado em termos de processamento.

Aproveitar os provedores de dados existentes pode acelerar o desenvolvimento, produzir resultados mais precisos e reduzir os esforços contínuos de manutenção. Isso permitirá que uma equipe se concentre na funcionalidade principal que seu projeto está tentando fornecer.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito básico de [Exploradores de blocos](/developers/docs/data-and-analytics/block-explorers/) para compreender melhor o uso deles no contexto de análise de dados. Além disso, familiarize-se com o conceito de um [índice](/glossary/#index) para entender os benefícios que eles adicionam ao design de um sistema.

Em termos de fundamentos arquitetônicos, é importante entender o que são uma [API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), mesmo que na teoria.

## Exploradores de blocos {#block-explorers}

Muitos [Exploradores de blocos](/developers/docs/data-and-analytics/block-explorers/) oferecem gateways de [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) que fornecerão aos desenvolvedores visibilidade de dados em tempo real sobre blocos, transações, validadores, contas e outras atividades onchain.

Os desenvolvedores podem então processar e transformar esses dados para dar aos seus usuários insights e interações únicas com a [blockchain](/glossary/#blockchain). Por exemplo, o [Etherscan](https://etherscan.io) e o [Blockscout](https://eth.blockscout.com) fornecem dados de execução e consenso para cada slot de 12s.

## The Graph {#the-graph}

O [The Graph](https://thegraph.com/) é um protocolo de indexação que fornece uma maneira fácil de consultar dados da blockchain por meio de APIs abertas conhecidas como subgrafos.

Com o The Graph, os desenvolvedores podem se beneficiar de:

- Indexação descentralizada: permite indexar dados da blockchain por meio de vários indexadores, eliminando assim qualquer ponto único de falha
- Consultas GraphQL: fornece uma interface GraphQL poderosa para consultar dados indexados, tornando a recuperação de dados super simples
- Personalização: defina sua própria lógica para transformar e armazenar dados da blockchain e reutilize subgrafos publicados por outros desenvolvedores na rede The Graph

Siga este guia de [início rápido](https://thegraph.com/docs/en/quick-start/) para criar, implantar e consultar um subgrafo em 5 minutos.

## Diversidade de clientes {#client-diversity}

A [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/) é importante para a saúde geral da rede Ethereum porque fornece resiliência a bugs e explorações. Agora existem vários painéis de diversidade de clientes, incluindo [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) e [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

O [Dune Analytics](https://dune.com/) pré-processa dados da blockchain em tabelas de banco de dados relacional (DuneSQL), permite que os usuários consultem dados da blockchain usando SQL e criem painéis com base nos resultados da consulta. Os dados onchain são organizados em 4 tabelas brutas: `blocks`, `transactions`, (eventos) `logs` e (chamadas) `traces`. Contratos e protocolos populares foram decodificados, e cada um tem seu próprio conjunto de tabelas de eventos e chamadas. Essas tabelas de eventos e chamadas são processadas posteriormente e organizadas em tabelas de abstração pelo tipo de protocolos, por exemplo, dex, empréstimo, stablecoins, etc.

## SQD {#sqd}

A [SQD](https://sqd.dev/) é uma plataforma de dados descentralizada e hiperescalável otimizada para fornecer acesso eficiente e não permissionado a grandes volumes de dados. Atualmente, ela atende a dados históricos onchain, incluindo logs de eventos, recibos de transação, rastreamentos e diferenças de estado por transação. A SQD oferece um kit de ferramentas poderoso para criar pipelines personalizados de extração e processamento de dados, atingindo uma velocidade de indexação de até 150 mil blocos por segundo.

Para começar, visite a [documentação](https://docs.sqd.dev/) ou veja [exemplos de EVM](https://github.com/subsquid-labs/squid-evm-examples) do que você pode construir com a SQD.

## SubQuery Network {#subquery-network}

O [SubQuery](https://subquery.network/) é um indexador de dados líder que oferece aos desenvolvedores APIs rápidas, confiáveis, descentralizadas e personalizadas para seus projetos Web3. O SubQuery capacita desenvolvedores de mais de 165 ecossistemas (incluindo Ethereum) com dados indexados ricos para construir experiências intuitivas e imersivas para seus usuários. A SubQuery Network alimenta seus aplicativos imparáveis com uma rede de infraestrutura resiliente e descentralizada. Use o kit de ferramentas de desenvolvedor de blockchain do SubQuery para construir os aplicativos Web3 do futuro, sem gastar tempo construindo um backend personalizado para atividades de processamento de dados.

Para começar, visite o [guia de início rápido do Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) para começar a indexar dados da blockchain Ethereum em minutos em um ambiente Docker local para testes antes de entrar em operação em um [serviço gerenciado do SubQuery](https://managedservice.subquery.network/) ou na [rede descentralizada do SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

A [Codex](https://www.codex.io/) é uma API de dados de blockchain em tempo real que fornece dados enriquecidos para mais de 70 milhões de tokens em mais de 80 redes. Os desenvolvedores podem acessar preços estruturados de tokens, saldos de carteiras, histórico de transações e análises agregadas (volume, liquidez, carteiras exclusivas) sem manter uma infraestrutura de indexação personalizada. A Codex suporta entrega de dados em menos de um segundo por meio de integrações de WebSocket e webhook.

Para começar, visite a [documentação](https://docs.codex.io), experimente o [Explorer](https://docs.codex.io/explore) ou inscreva-se no [painel](https://dashboard.codex.io/signup).

## EVM Query Language {#evm-query-language}

A EVM Query Language (EQL) é uma linguagem semelhante a SQL projetada para consultar cadeias EVM (Ethereum Virtual Machine). O objetivo final da EQL é suportar consultas relacionais complexas em cidadãos de primeira classe da cadeia EVM (blocos, contas e transações), ao mesmo tempo em que fornece aos desenvolvedores e pesquisadores uma sintaxe ergonômica para uso diário. Com a EQL, os desenvolvedores podem buscar dados da blockchain usando uma sintaxe familiar semelhante a SQL e eliminar a necessidade de código boilerplate complexo. A EQL suporta solicitações de dados de blockchain padrão (por exemplo, recuperar o nonce e o saldo de uma conta no Ethereum ou buscar o tamanho e o carimbo de data/hora do bloco atual) e está continuamente adicionando suporte para solicitações e conjuntos de recursos mais complexos.

## Leitura adicional {#further-reading}

- [Explorando dados cripto I: arquiteturas de fluxo de dados](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Visão geral da rede The Graph](https://thegraph.com/docs/en/about/)
- [Playground de consultas do The Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Exemplos de código de API no Etherscan](https://etherscan.io/apis#contracts)
- [Documentação da API no Blockscout](https://docs.blockscout.com/devs/apis)
- [Explorador da Beacon Chain Beaconcha.in](https://beaconcha.in)
- [Noções básicas do Dune](https://docs.dune.com/#dune-basics)
- [Guia de início rápido do Ethereum no SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Visão geral da rede SQD](https://docs.sqd.dev/)
- [EVM Query Language](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## Tutoriais: Dados e análises / SQL no Ethereum {#tutorials}

- [Aprenda tópicos fundamentais do Ethereum com SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Consulte dados onchain do Ethereum com SQL para entender os fundamentos de transações, blocos e gás._
