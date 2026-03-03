---
title: "Dados e Estatísticas"
description: "Como obter dados e análises on-chain usados em dapps"
lang: pt-br
---

## Introdução {#Introduction}

À medida que a utilização da rede continua a aumentar, crescerá dados valiosos on-chain. À medida que o volume de dados aumenta rapidamente, calcular e agregar essas informações para relatar ou dirigir um dapp pode se tornar uma dura empreitada de tempo e processo.

A alavancagem dos prestadores de dados existentes pode acelerar o desenvolvimento, produzir resultados mais precisos e reduzir os esforços contínuos de manutenção. Isso permitirá que uma equipe se concentre na funcionalidade central que seu projeto está tentando fornecer.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito básico de [Exploradores de Bloco](/developers/docs/data-and-analytics/block-explorers/) para entender melhor seu uso no contexto de análise de dados. Além disso, familiarize-se com o conceito de um [índice](/glossary/#index) para entender os benefícios que eles adicionam a um projeto de sistema.

Em termos de fundamentos de arquitetura, entender o que são [API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), mesmo que em teoria.

## Exploradores de Bloco {#block-explorers}

Muitos [Exploradores de Bloco](/developers/docs/data-and-analytics/block-explorers/) oferecem gateways de [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) que fornecem aos desenvolvedores visibilidade de dados em tempo real sobre blocos, transações, validadores, contas e outras atividades em cadeia.

Os desenvolvedores podem então processar e transformar esses dados para dar aos seus usuários insights e interações únicas com a [blockchain](/glossary/#blockchain). Por exemplo, [Etherscan](https://etherscan.io) e [Blockscout](https://eth.blockscout.com) fornecem dados de execução e consenso para cada slot de 12s.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) é um protocolo de indexação que oferece uma maneira fácil de consultar dados de blockchain por meio de APIs abertas conhecidas como subgráficos.

Com o The Graph, os desenvolvedores podem se beneficiar de:

- Indexação descentralizada: permite a indexação de dados de blockchain por meio de vários indexadores, eliminando assim qualquer ponto único de falha
- Consultas GraphQL: fornece uma interface GraphQL poderosa para consultar dados indexados, tornando a recuperação de dados super simples
- Personalização: Defina sua própria lógica para transformar e armazenar dados de blockchain, e reutilize subgráficos publicados por outros desenvolvedores na The Graph Network

Siga este guia de [início rápido](https://thegraph.com/docs/en/quick-start/) para criar, implantar e consultar um subgráfico em 5 minutos.

## Diversidade de clientes {#client-diversity}

A [diversidade de clientes](/developers/docs/nodes-and-clients/client-diversity/) é importante para a saúde geral da rede Ethereum, pois fornece resiliência a bugs e exploits. Existem agora vários painéis de diversidade de clientes, incluindo [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) e [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) pré-processa dados de blockchain em tabelas de banco de dados relacional (DuneSQL), permitindo que os usuários consultem dados de blockchain usando SQL e criem dashboards com base nos resultados das consultas. Os dados em cadeia são organizados em 4 tabelas brutas: `blocks`, `transactions`, `logs` (de evento) e `traces` (de chamada). Contratos e protocolos populares foram decodificados e cada um tem seu próprio conjunto de tabelas de eventos e chamadas. Essas tabelas de eventos e chamadas são processadas e organizadas em abstração de tabelas por tipo de protocolo, por exemplo, dex, lending, stablecoins etc.

## SQD {#sqd}

[SQD](https://sqd.dev/) é uma plataforma de dados descentralizada e hiperescalável, otimizada para fornecer acesso eficiente e sem permissão a grandes volumes de dados. Atualmente, ele fornece dados históricos on-chain, incluindo registros de eventos, recibos de transações, rastreamentos e diferenças de estado por transação. O SQD oferece um poderoso kit de ferramentas para criar pipelines personalizados de extração e processamento de dados, alcançando uma velocidade de indexação de até 150mil blocos por segundo.

Para começar, visite a [documentação](https://docs.sqd.dev/) ou veja [exemplos de EVM](https://github.com/subsquid-labs/squid-evm-examples) do que você pode construir com o SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) é um indexador de dados líder que fornece aos desenvolvedores APIs rápidas, confiáveis, descentralizadas e personalizadas para seus projetos web3. A SubQuery capacita desenvolvedores de mais de 165 ecossistemas (incluindo Ethereum) com dados indexados avançados para criar experiências intuitivas e imersivas para seus usuários. A SubQuery Network impulsiona seus aplicativos com uma infraestrutura resiliente e descentralizada. Utilize o kit de ferramentas para desenvolvedores de blockchain da SubQuery para construir os aplicativos web3 do futuro, sem precisar gastar tempo criando um back-end personalizado para atividades de processamento de dados.

Para começar, visite o [guia de início rápido do Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) para começar a indexar os dados da blockchain do Ethereum em minutos em um ambiente Docker local para testes antes de ir para produção em um [serviço gerenciado do SubQuery](https://managedservice.subquery.network/) ou na [rede descentralizada do SubQuery](https://app.subquery.network/dashboard).

## Linguagem de Consulta EVM {#evm-query-language}

O EQL é uma linguagem semelhante ao SQL por consultar EVM chains. O objetivo do EQL é dar suporte a consultar relações entre os EVM chain first-class citizens (blocos, contas e transações) e fornece aos desenvolvedores e pesquisadores uma sintaxe ergonômica por uso. Com o EQL, os desenvolvedores podem buscar dados de Cadeia de blocos usando uma sintaxe semelhante ao SQL sem códigos complexos. O EQL suporta solicitações aos dados de Cadeia de blocos e está continuamente suportando solicitações e featuresets mais complexos.

## Leitura adicional {#further-reading}

- [Explorando Dados de Cripto I: Arquiteturas de Fluxo de Dados](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Visão Geral da Graph Network](https://thegraph.com/docs/en/about/)
- [Playground de Consultas do Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Exemplos de código da API no EtherScan](https://etherscan.io/apis#contracts)
- [Documentação da API no Blockscout](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in, explorador da Beacon Chain](https://beaconcha.in)
- [Fundamentos do Dune](https://docs.dune.com/#dune-basics)
- [Guia de Início Rápido do Ethereum da SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Visão Geral da SQD Network](https://docs.sqd.dev/)
- [Linguagem de Consulta EVM](https://eql.sh/blog/alpha-release-notes)
