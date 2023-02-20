---
title: Dados e Estatísticas
description: Como obter dados e análises em cadeia para uso em seus dapps
lang: pt-br
---

## Introdução {#Introduction}

À medida que a utilização da rede continua a aumentar, irá existir uma quantidade crescente de informação valiosa nos dados da cadeia de dados. À medida que o volume de dados aumenta rapidamente, calcular e agregar essa informação para reportar ou dirigir um dApp pode se tornar um tempo e processar um esforço pesado.

A alavancagem dos prestadores de dados existentes pode acelerar o desenvolvimento, produzir resultados mais precisos e reduzir os esforços contínuos de manutenção. Isso permitirá que uma equipe se concentre na funcionalidade central que seu projeto está tentando fornecer.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito básico de [Exploradores de Bloco](/developers/docs/data-and-analytics/block-explorers/) para entender melhor usá-los no contexto da análise de dados. Além disso, familiarize-se com o conceito de um [índice](/glossary/#index) para entender os benefícios que eles adicionam a um design do sistema.

Em termos de fundamentos arquitetônicos, entendendo o que uma [API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) são, mesmo em teoria.

## The Graph {#the-graph}

A [rede Graph Network](https://thegraph.com/) é um protocolo descentralizado de indexação para a organização de dados da cadeia de blocos. Em vez de construir e gerenciar lojas de dados off-chain e centralizadas para agregação de dados on-chain com The Graph, os desenvolvedores podem construir aplicativos sem servidor que são executados inteiramente na infraestrutura pública.

Usando [GraphQL](https://graphql.org/), os desenvolvedores podem consultar qualquer uma das APIs abertas com curadoria, conhecido como subgráficos, para adquirir as informações necessárias para conduzir seu dApp. Ao consultar estes subgrafos indexados, relatórios e dApps não só obtêm benefícios de desempenho e escalabilidade como também a precisão incorporada fornecida pelo consenso de rede. Como novas melhorias e/ou subgrafos são adicionados à rede, seus projetos podem iterar rapidamente para tirar proveito dessas melhorias.

## Exploradores de bloco {#block-explorers}

Muitos [Exploradores de bloco](/developers/docs/data-and-analytics/block-explorers/) oferecem [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) gateways que fornecerão aos desenvolvedores visibilidade em dados em tempo real em blocos, transações, mineiros, contas e outras atividades em cadeia.

Desenvolvedores podem então processar e transformar esses dados para dar aos seus usuários percepções e interações exclusivas com a [cadeia de blocos](/glossary/#blockchain).

## Leitura Adicional {#further-reading}

- [Visão geral da rede de grafos](https://thegraph.com/docs/en/about/network/)
- [Área de consulta de grafos](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Exemplos de código de API em EtherScan](https://etherscan.io/apis#contracts)
