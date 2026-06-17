---
title: "Datos y análisis"
description: "Cómo obtener análisis y datos en cadena para usarlos en sus aplicaciones descentralizadas (dapps)"
lang: es
---

## Introducción {#introduction}

A medida que el uso de la red sigue creciendo, existirá una cantidad cada vez mayor de información valiosa en los datos en cadena. A medida que el volumen de datos aumenta rápidamente, calcular y agregar esta información para generar informes o impulsar una aplicación descentralizada (dapp) puede convertirse en una tarea que requiera mucho tiempo y procesamiento.

Aprovechar los proveedores de datos existentes puede acelerar el desarrollo, producir resultados más precisos y reducir los esfuerzos de mantenimiento continuo. Esto permitirá que un equipo se concentre en la funcionalidad principal que su proyecto intenta ofrecer.

## Requisitos previos {#prerequisites}

Debería comprender el concepto básico de los [exploradores de bloques](/developers/docs/data-and-analytics/block-explorers/) para entender mejor su uso en el contexto del análisis de datos. Además, familiarícese con el concepto de un [índice](/glossary/#index) para comprender los beneficios que aportan al diseño de un sistema.

En términos de fundamentos arquitectónicos, comprender qué son una [API](https://www.wikipedia.org/wiki/API) y [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), aunque sea en teoría.

## Exploradores de bloques {#block-explorers}

Muchos [exploradores de bloques](/developers/docs/data-and-analytics/block-explorers/) ofrecen puertas de enlace de [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) que proporcionarán a los desarrolladores visibilidad de datos en tiempo real sobre bloques, transacciones, validadores, cuentas y otras actividades en cadena.

Los desarrolladores pueden luego procesar y transformar estos datos para brindar a sus usuarios información e interacciones únicas con la [cadena de bloques](/glossary/#blockchain). Por ejemplo, [Etherscan](https://etherscan.io) y [Blockscout](https://eth.blockscout.com) proporcionan datos de ejecución y consenso para cada slot de 12 segundos.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) es un protocolo de indexación que proporciona una manera fácil de consultar datos de la cadena de bloques a través de API abiertas conocidas como subgrafos.

Con The Graph, los desarrolladores pueden beneficiarse de:

- Indexación descentralizada: permite indexar datos de la cadena de bloques a través de múltiples indexadores, eliminando así cualquier punto único de falla
- Consultas GraphQL: proporciona una potente interfaz GraphQL para consultar datos indexados, lo que hace que la recuperación de datos sea muy sencilla
- Personalización: defina su propia lógica para transformar y almacenar datos de la cadena de bloques, y reutilice subgrafos publicados por otros desarrolladores en la red The Graph

Siga esta guía de [inicio rápido](https://thegraph.com/docs/en/quick-start/) para crear, desplegar y consultar un subgrafo en 5 minutos.

## Diversidad de clientes {#client-diversity}

La [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/) es importante para la salud general de la red Ethereum porque proporciona resistencia a errores y vulnerabilidades. Actualmente existen varios paneles de diversidad de clientes, incluidos [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) y [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) preprocesa los datos de la cadena de bloques en tablas de bases de datos relacionales (DuneSQL), permite a los usuarios consultar datos de la cadena de bloques mediante SQL y crear paneles basados en los resultados de las consultas. Los datos en cadena se organizan en 4 tablas sin procesar: `blocks`, `transactions`, (eventos) `logs` y (llamadas) `traces`. Los contratos y protocolos populares han sido decodificados, y cada uno tiene su propio conjunto de tablas de eventos y llamadas. Esas tablas de eventos y llamadas se procesan aún más y se organizan en tablas de abstracción según el tipo de protocolos, por ejemplo, dex, préstamos, monedas estables (stablecoins), etc.

## SQD {#sqd}

[SQD](https://sqd.dev/) es una plataforma de datos hiperescalable y descentralizada optimizada para proporcionar un acceso eficiente y sin permisos a grandes volúmenes de datos. Actualmente sirve datos históricos en cadena, incluidos registros de eventos, recibos de transacciones, rastreos y diferencias de estado por transacción. SQD ofrece un potente conjunto de herramientas para crear canales personalizados de extracción y procesamiento de datos, logrando una velocidad de indexación de hasta 150 mil bloques por segundo.

Para comenzar, visite la [documentación](https://docs.sqd.dev/) o vea [ejemplos de EVM](https://github.com/subsquid-labs/squid-evm-examples) de lo que puede construir con SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) es un indexador de datos líder que brinda a los desarrolladores API rápidas, confiables, descentralizadas y personalizadas para sus proyectos Web3. SubQuery empodera a los desarrolladores de más de 165 ecosistemas (incluido Ethereum) con abundantes datos indexados para crear experiencias intuitivas e inmersivas para sus usuarios. SubQuery Network impulsa sus aplicaciones imparables con una red de infraestructura resistente y descentralizada. Utilice el conjunto de herramientas para desarrolladores de cadenas de bloques de SubQuery para crear las aplicaciones Web3 del futuro, sin perder tiempo construyendo un backend personalizado para actividades de procesamiento de datos.

Para comenzar, visite la [guía de inicio rápido de Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) para empezar a indexar datos de la cadena de bloques de Ethereum en minutos en un entorno local de Docker para realizar pruebas antes de pasar a producción en un [servicio administrado de SubQuery](https://managedservice.subquery.network/) o en la [red descentralizada de SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) es una API de datos de la cadena de bloques en tiempo real que proporciona datos enriquecidos para más de 70 millones de tokens en más de 80 redes. Los desarrolladores pueden acceder a precios estructurados de tokens, saldos de billeteras, historial de transacciones y análisis agregados (volumen, liquidez, billeteras únicas) sin mantener una infraestructura de indexación personalizada. Codex admite la entrega de datos en menos de un segundo a través de integraciones de WebSocket y webhooks.

Para comenzar, visite la [documentación](https://docs.codex.io), pruebe el [Explorador](https://docs.codex.io/explore) o regístrese en el [panel de control](https://dashboard.codex.io/signup).

## Lenguaje de consulta de EVM {#evm-query-language}

EVM Query Language (EQL) es un lenguaje similar a SQL diseñado para consultar cadenas de la EVM (Máquina Virtual de Ethereum). El objetivo final de EQL es admitir consultas relacionales complejas sobre los ciudadanos de primera clase de la cadena EVM (bloques, cuentas y transacciones) al tiempo que proporciona a los desarrolladores e investigadores una sintaxis ergonómica para el uso diario. Con EQL, los desarrolladores pueden obtener datos de la cadena de bloques utilizando una sintaxis familiar similar a SQL y eliminar la necesidad de código repetitivo complejo. EQL admite solicitudes de datos estándar de la cadena de bloques (por ejemplo, recuperar el nonce y el saldo de una cuenta en Ethereum o recuperar el tamaño y la marca de tiempo del bloque actual) y agrega continuamente soporte para solicitudes y conjuntos de características más complejos.

## Lecturas adicionales {#further-reading}

- [Explorando datos cripto I: Arquitecturas de flujo de datos](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Descripción general de Graph Network](https://thegraph.com/docs/en/about/)
- [Entorno de pruebas de consultas de Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Ejemplos de código de API en Etherscan](https://etherscan.io/apis#contracts)
- [Documentación de la API en Blockscout](https://docs.blockscout.com/devs/apis)
- [Explorador de la cadena de balizas Beaconcha.in](https://beaconcha.in)
- [Conceptos básicos de Dune](https://docs.dune.com/#dune-basics)
- [Guía de inicio rápido de Ethereum en SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Descripción general de la red SQD](https://docs.sqd.dev/)
- [Lenguaje de consulta de EVM](https://eql.sh/blog/alpha-release-notes)

## Tutoriales: Datos y análisis / SQL en Ethereum {#tutorials}

- [Aprenda temas fundamentales de Ethereum con SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Consulte datos de Ethereum en cadena con SQL para comprender los fundamentos de las transacciones, los bloques y el gas._