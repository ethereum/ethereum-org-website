---
title: "Datos y análisis"
description: "Cómo obtener analíticas y datos en cadena para usarlos en sus DApps"
lang: es
---

## Introducción {#Introduction}

A medida que se difunda más el uso de la red, aumentará la cantidad de información valiosa que existirá en los datos de la cadena. A medida que el volumen de datos crece rápidamente, calcular y agregar esta información para reportar o impulsar una dApp puede costar tiempo y el proceso puede ser un poco agotador.

El aprovechamiento de los proveedores de datos existentes puede agilizar el desarrollo, producir resultados más precisos y reducir los constantes esfuerzos de mantenimiento. Esto permitirá a un equipo concentrarse en la funcionalidad principal que su proyecto pretende ofrecer.

## Requisitos previos {#prerequisites}

Debe comprender el concepto básico de los [exploradores de bloques](/developers/docs/data-and-analytics/block-explorers/) para comprender mejor su uso en el contexto del análisis de datos. Además, familiarícese con el concepto de un [índice](/glossary/#index) para comprender los beneficios que aportan al diseño de un sistema.

En cuanto a los fundamentos de la arquitectura, es importante comprender qué son una [API](https://www.wikipedia.org/wiki/API) y [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), aunque sea en teoría.

## Exploradores de bloques {#block-explorers}

Muchos [exploradores de bloques](/developers/docs/data-and-analytics/block-explorers/) ofrecen puertas de enlace de [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) que proporcionarán a los desarrolladores visibilidad de los datos en tiempo real sobre bloques, transacciones, validadores, cuentas y otras actividades en la cadena.

Los desarrolladores pueden procesar y transformar estos datos para ofrecer a sus usuarios información e interacciones únicas con la [cadena de bloques](/glossary/#blockchain). Por ejemplo, [Etherscan](https://etherscan.io) y [Blockscout](https://eth.blockscout.com) proporcionan datos de ejecución y consenso para cada ranura de 12 s.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) es un protocolo de indexación que proporciona una forma sencilla de consultar datos de la cadena de bloques a través de API abiertas conocidas como subgrafos.

Con The Graph, los desarrolladores pueden beneficiarse de:

- Una indexación descentralizada: permite la indexación de datos de la cadena de bloques a través de múltiples indexadores, eliminando así cualquier punto único de fallo
- Consultas sobre GraphQL: proporciona una potente interfaz GraphQL para consultar datos indexados, lo que hace que la recuperación de datos sea extremadamente sencilla
- Personalización: defina su propia lógica para transformar y almacenar datos de la cadena de bloques, y reutilice los subgrafos publicados por otros desarrolladores en The Graph Network

Siga esta guía de [inicio rápido](https://thegraph.com/docs/en/quick-start/) para crear, desplegar y consultar un subgrafo en 5 minutos.

## Diversidad de clientes {#client-diversity}

La [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/) es importante para la salud general de la red de Ethereum porque proporciona resiliencia ante errores y exploits. Actualmente existen varios paneles de control sobre la diversidad de clientes, como [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) y [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) preprocesa los datos de la cadena de bloques en tablas de bases de datos relacionales (DuneSQL), permite a los usuarios consultar datos de la cadena de bloques usando SQL y crear paneles de control basados en los resultados de las consultas. Los datos en la cadena se organizan en 4 tablas sin procesar: `blocks`, `transactions`, `logs` (de eventos) y `traces` (de llamadas). Se decodificaron contratos y protocolos populares, y cada uno de ellos tiene sus propios conjuntos de llamadas y eventos. Estas tablas de eventos y llamadas son procesadas y organizadas en tablas abstractas ordenadas por el tipo de protocolo, por ejemplo: dex, préstamos, monedas estables, etc.

## SQD {#sqd}

[SQD](https://sqd.dev/) es una plataforma de datos hiperescalable y descentralizada, optimizada para proporcionar un acceso eficiente y sin permisos a grandes volúmenes de datos. Actualmente sirve datos históricos en la cadena, incluidos registros de eventos, recibos de transacciones, rastros y diferencias de estado por transacción. SQD ofrece un potente conjunto de herramientas para crear canalizaciones personalizadas de extracción y procesamiento de datos, logrando una velocidad de indexación de hasta 150 k bloques por segundo.

Para empezar, visite la [documentación](https://docs.sqd.dev/) o consulte los [ejemplos de EVM](https://github.com/subsquid-labs/squid-evm-examples) de lo que puede crear con SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) es un indexador de datos líder que ofrece a los desarrolladores API rápidas, fiables, descentralizadas y personalizadas para sus proyectos de la web3. SubQuery ofrece a los desarrolladores de más de 165 ecosistemas (incluido Ethereum) datos indexados enriquecidos para crear experiencias intuitivas e inmersivas para sus usuarios. SubQuery Network impulsa sus aplicaciones imparables con una red de infraestructura resiliente y descentralizada. Utilice el kit de herramientas de desarrollo de cadena de bloques de SubQuery para construir las aplicaciones web3 del futuro, sin gastar tiempo construyendo un backend personalizado para las actividades de procesamiento de datos.

Para empezar, visite la [guía de inicio rápido de Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) para comenzar a indexar los datos de la cadena de bloques de Ethereum en minutos en un entorno local de Docker para realizar pruebas antes de publicarlo en un [servicio administrado de SubQuery](https://managedservice.subquery.network/) o en la [red descentralizada de SubQuery](https://app.subquery.network/dashboard).

## Lenguaje de consulta de EVM {#evm-query-language}

El lenguaje de consultas de la EVM (EQL en inglés) es un lenguaje tipo SQL diseñado para consultar cadenas de la EVM (máquina virtual de Ethereum). Su objetivo final es permitir consultas complejas relacionadas con ciudadanos de primera clase de cadenas EVM (bloques, cuentas y transacciones) mientras proporciona a desarrolladores e investigadores una sintaxis ergonómica para el uso del día a día. Con EQL, los desarrolladores pueden obtener datos de la cadena de bloques usando una sintaxis similar a la de SQL y eliminar la necesidad de un conjunto de códigos predefinidos complejos. EQL admite peticiones estándar de datos de la cadena de bloque (p. ej., obtener el nonce y el saldo de la cuenta en Ethereum o el tamaño de bloque actual y su marca de tiempo) y añade continuamente soporte para peticiones y funcionalidades más complejas.

## Lecturas recomendadas {#further-reading}

- [Explorando los datos de criptomonedas I: Arquitecturas de flujo de datos](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Descripción general de Graph Network](https://thegraph.com/docs/en/about/)
- [Playground de consultas de The Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Ejemplos de código de la API en EtherScan](https://etherscan.io/apis#contracts)
- [Documentación de la API en Blockscout](https://docs.blockscout.com/devs/apis)
- [Explorador de la Cadena de baliza Beaconcha.in](https://beaconcha.in)
- [Conceptos básicos de Dune](https://docs.dune.com/#dune-basics)
- [Guía de inicio rápido de SubQuery para Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Descripción general de la red SQD](https://docs.sqd.dev/)
- [Lenguaje de consulta de EVM](https://eql.sh/blog/alpha-release-notes)
