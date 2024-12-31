---
title: Dados e Estatísticas
description: Como obter dados e análises on-chain para uso em dapps
lang: pt-br
---

## Introdução {#Introduction}

À medida que a utilização da rede continua a aumentar, irá existir uma quantidade crescente de informações valiosas nos dados on-chain. À medida que o volume de dados aumenta rapidamente, calcular e agregar essas informações para relatar ou dirigir um dapp pode se tornar uma dura empreitada de tempo e processo.

A alavancagem dos prestadores de dados existentes pode acelerar o desenvolvimento, produzir resultados mais precisos e reduzir os esforços contínuos de manutenção. Isso permitirá que uma equipe se concentre na funcionalidade central que seu projeto está tentando fornecer.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito básico de [Exploradores de Bloco](/developers/docs/data-and-analytics/block-explorers/) para entender melhor usá-los no contexto da análise de dados. Além disso, familiarize-se com o conceito de um [índice](/glossary/#index) para entender os benefícios que eles adicionam a uma concepção do sistema.

Em termos de fundamentos arquitetônicos, entendendo o que uma [API](https://www.wikipedia.org/wiki/API) e [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) são, mesmo em teoria.

## Exploradores de bloco {#block-explorers}

Muitos [Exploradores de blocos](/developers/docs/data-and-analytics/block-explorers/) oferecem [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) gateways que fornecerão aos desenvolvedores visibilidade em dados em tempo real em blocos, transações, mineiros, contas e outras atividades on-chain.

Desenvolvedores podem então processar e transformar esses dados para dar aos seus usuários percepções e interações exclusivas com a [blockchain](/glossary/#blockchain). Por exemplo, [Etherscan](https://etherscan.io) fornece dados de execução e consenso para cada slot de 12s.

## The Graph {#the-graph}

A [rede Graph Network](https://thegraph.com/) é um protocolo descentralizado de indexação para a organização de dados blockchain. Em vez de construir e gerenciar lojas de dados off-chain e centralizadas para agregação de dados on-chain com The Graph, os desenvolvedores podem construir aplicativos sem servidor que são executados inteiramente na infraestrutura pública.

Usando o [GraphQL](https://graphql.org/), os desenvolvedores podem consultar qualquer uma das APIs abertas selecionadas, conhecidas como subgráficos, para adquirir as informações necessárias para impulsionar seu dapp. Ao consultar esses subgráficos indexados, relatórios e dapps, não apenas obtêm benefícios de desempenho e escalabilidade, como também a precisão incorporada fornecida pelo consenso da rede. Como novas melhorias e/ou subgráficos são adicionados à rede, seus projetos podem iterar rapidamente para tirar proveito dessas melhorias.

## Diversidade dos clientes

A [diversidade do cliente](/developers/docs/nodes-and-clients/client-diversity/) é importante para a saúde geral da rede Ethereum porque fornece resiliência a bugs e explorações. Agora existem vários painéis de diversidade do cliente, incluindo [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://rated.network/), [supermajority.info](https://supermajority.info//) e [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

O [Dune Analytics](https://dune.com/) pré-processa dados da blockchain em tabelas de banco de dados relacional (DuneSQL), que permite aos usuários consultar dados da blockchain usando SQL e criem painéis com base nos resultados da consulta. Os dados on-chain são organizados em 4 tabelas brutas: `blocos`, `transações`, (evento) `registros` e (chamada) `traços`. Contratos e protocolos populares foram decodificados e cada um tem seu próprio conjunto de tabelas de eventos e chamadas. Essas tabelas de eventos e chamadas são processadas e organizadas em abstração de tabelas por tipo de protocolo, por exemplo, dex, lending, stablecoins etc.

## Leitura Adicional {#further-reading}

- [Visão geral da rede de gráficos](https://thegraph.com/docs/en/about/network/)
- [Área de consulta de gráficos](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Exemplos de código de API em EtherScan](https://etherscan.io/apis#contracts)
- [Explorador de Beacon Chain Beaconcha.in](https://beaconcha.in)
- [Fundamentos do Dune](https://docs.dune.com/#dune-basics)
