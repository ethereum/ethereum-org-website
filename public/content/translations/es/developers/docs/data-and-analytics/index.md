---
title: Datos y análisis
description: "¿Cómo obtener datos y análisis en cadena para usarlos en tus dapps?"
lang: es
---

## Introducción {#Introduction}

A medida que aumente la utilización de la red, habrá una cantidad creciente de información valiosa en los datos en cadena. A medida que el volumen de datos crece rápidamente, calcular y agregar esta información para reportar o impulsar una dApp puede costar tiempo y el proceso puede ser un poco agotador.

El aprovechamiento de los proveedores de datos existentes puede agilizar el desarrollo, producir resultados más precisos y reducir los constantes esfuerzos de mantenimiento. Esto permitirá a un equipo concentrarse en la funcionalidad principal que su proyecto pretende ofrecer.

## Prerrequisitos {#prerequisites}

Debe comprender el concepto básico de [Exploradores de bloques](/developers/docs/data-and-analytics/block-explorers/) para comprender cómo usarlos mejor en el contexto de análisis de datos. Además, familiarícese con el concepto de un [índice](/glossary/#index) para comprender las ventajas que añaden al diseño de un sistema.

En cuanto a los fundamentos de la arquitectura, entender qué es una [API](https://www.wikipedia.org/wiki/API) y [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), incluso en teoría.

## Exploradores de bloques {#block-explorers}

Muchos [Exploradores de bloques](/developers/docs/data-and-analytics/block-explorers/) ofrecen gateways de [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) que proporcionarán a los desarrolladores visibilidad de los datos en tiempo real sobre bloques, transacciones, mineros, cuentas y otra actividad en la cadena.

Los desarrolladores pueden luego procesar y transformar estos datos para dar a sus usuarios una visión e interacciones únicas con la [cadena de bloques](/glossary/#blockchain). Por ejemplo, [Etherscan](https://etherscan.io) provee información de ejecución y consenso por cada ranura 12s.

## The Graph {#the-graph}

El [Graph Network](https://thegraph.com/) es un protocolo de indexación descentralizado para organizar datos de la cadena de bloques. En lugar de crear y gestionar almacenes de datos fuera de la cadena y centralizados para agregar datos en la cadena, con The Graph, los desarrolladores pueden crear aplicaciones sin servidor que se ejecutan completamente en infraestructura pública.

Usando [GraphQL](https://graphql.org/), los desarrolladores pueden consultar cualquiera de las API curadas, conocidas como sub-graphs, para adquirir la información necesaria que necesitan para manejar sus dApps. Consultando estos sub-graphs indexados, los informes y las dApps no solo consiguen ventajas de rendimiento y escalabilidad, sino también la precisión integrada de los consensos de la red. A medida que se añaden nuevas mejoras y/o sub-graphs a la red, sus proyectos pueden iterar rápidamente para aprovechar estas mejoras.

## Diversidad de clientes

La [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/) es importante para la salud general de la red de Ethereum porque esta provee resistencia a errores y exploits. Ahora hay varios paneles de diversidad de clientes, incluidos [clientdiversity.org](https://clientdiversity.org/), [ated.network](https://rated.network), [execution-diversity.info](https://execution-diversity.info/) y
Ethernodes.

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) preprocesa los datos de la cadena de bloques y los integra en tablas de bases de datos relacionales (PostgreSQL y DatabricksSQL), permitiendo a los usuarios consultar los datos de la cadena usando SQL y crear paneles de control con los resultados de dichas consultas. Los datos en cadena son organizados en 4 categorías: `bloques`, `transacciones`, `registros` (de eventos) y `rastreos` (de llamadas). Se decodificaron contratos y protocolos populares, y cada uno de ellos tiene sus propios conjuntos de llamadas y eventos. Estas tablas de eventos y llamadas son procesadas y organizadas en tablas abstractas ordenadas por el tipo de protocolo, por ejemplo: dex, préstamos, monedas estables, etc.

## Más información {#further-reading}

- [Descripción general de Graph Network](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Ejemplos de código API en EtherScan](https://etherscan.io/apis#contracts)
- [Explorador de la cadena de Baliza Beaconcha.in](https://beaconcha.in)
- [Aspectos básicos de Dune](https://docs.dune.com/#dune-basics)
