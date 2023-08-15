---
title: Nodos como servicio
description: Una visión general para principiantes de los servicios de nodos, los pros y los contras, y los proveedores populares.
lang: es
sidebarDepth: 2
---

## Introducción {#Introduction}

Ejecutar tu propio [ nodo de Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) puede ser desafiante, especialmente al principio o durante una escalada rápida. Hay un [número de servicios](#popular-node-services) que ejecutan infraestructuras de nodo optimizadas para ti; así podrás centrarte en desarrollar tu producto o aplicación. Te explicaremos el funcionamiento de los servicios de nodos, las ventajas y desventajas de usarlos, y haremos una lista con los proveedores por si estás interesado en ponerte en marcha.

## Requisitos previos {#prerequisites}

Si aún no entiendes qué son los nodos y los clientes, consulta [Nodos y clientes](/developers/docs/nodes-and-clients/).

## ¿Cómo funcionan los servicios de nodos? {#how-do-node-services-work}

Los proveedores de servicios de nodos ejecutan clientes de nodos distribuidos para ti, así que tú no tienes que hacerlo.

Estos servicios suelen proporcionar una clave de API, que puedes usar para escribir y leer desde la blockchain. Además, suelen incluir acceso a [redes de pruebas de Ethereum](/developers/docs/networks/#ethereum-testnets), además de a la red principal.

Algunos servicios te ofrecen tu propio nodo que ellos gestionan para ti, mientras que otros usan equilibradores de carga para distribuir la actividad a través de los nodos.

Casi todos los servicios de nodos son extremadamente fáciles de integrar, incluyen cambios de una línea en tu código para intercambiar tu nodo autoalojado o incluso cambiar entre los mismos servicios.

Muchas veces, los servicios de nodos ejecutan una serie de [clientes de nodos](/developers/docs/nodes-and-clients/#execution-clients) y [tipos](/developers/docs/nodes-and-clients/#node-types), lo que le permite acceder a los nodos de los archivos y completos además de a los métodos específicos de los clientes en una API.

Es importante remarcar que los servicios de nodos no almacenan ni deben almacenar sus claves o información privadas.

## ¿Cuáles son las ventajas de usar un servicio de nodos? {#benefits-of-using-a-node-service}

El principal beneficio de usar un servicio de nodo es no tener que dedicar tiempo de ingeniería para mantener y administrar los nodos tú mismo. Esto te permite centrarte en crear tu producto, en lugar de tener que preocuparte por el mantenimiento de la infraestructura.

Ejecutar tus propios nodos puede ser muy caro, desde el almacenamiento al ancho de banda o al carísimo tiempo de ingeniería. Things like spinning up more nodes when scaling, upgrading nodes to the latest versions, and ensuring state consistency, can distract from building and spending resources on your desired web3 product.

## ¿Cuáles son las desventajas de utilizar un servicio de nodos? {#cons-of-using-a-node-service}

Al utilizar un servicio de nodos, estás centralizando el aspecto infraestructural de tu producto. Por este motivo, los proyectos que se basan en la descentralización como uno de sus puntos fuertes quizá prefieran utilizar nodos autoalojados que externalizarlos a un tercero.

Más información sobre [las ventajas de ejecutar tu propio nodo](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servicios de nodos populares {#popular-node-services}

A continuación se incluye una lista con algunos de los proveedores de nodos de Ethereum más populares. Si echas de menos alguno, puedes añadirlo. Cada servicio de nodos ofrece diferentes beneficios y características, además de niveles gratuitos o de pago. Te recomendamos que investigues cuáles se adaptan mejor a tus necesidades antes de tomar una decisión.

- [**Alchemy**](https://www.alchemy.com/)
  - [Documentos](https://docs.alchemyapi.io/)
  - Características
    - Opción de nivel gratuito
    - Escala según el uso
    - Datos de archivo gratuitos
    - Herramientas de análisis
    - Panel
    - Puntos de conexión de API exclusivos
    - Webhooks
    - Asistencia directa
- [**Ankr**](https://www.ankr.com/)
  - [Documentos](https://docs.ankr.com/)
  - Características
    - Protocolo Ankr: acceso abierto a los puntos de conexión de la API RPC pública para más de ocho cadenas
    - Cargar el saldo y supervisar la salud del nodo para un puerto de salida rápido y seguro al nodo disponible más cercano
    - Nivel prémium que habilita el punto de conexión WSS y límite de tasa ilimitado
    - Despliegue de nodo completo y validador para más de 40 cadenas en un clic
    - Escala según el uso
    - Herramientas de análisis
    - Panel
    - Puntos de conexión RPC, HTTPS y WSS
    - Asistencia directa
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentos](https://ubiquity.docs.blockdaemon.com/)
  - Beneficios
    - Panel
    - Base por nodo
    - Análisis
- [**Chainstack**](https://chainstack.com/)
  - [Documentos](https://docs.chainstack.com/)
  - Características
    - Nodos compartidos libres
    - Nodos de archivo compartidos
    - Asistencia en relación con GraphQL
    - Puntos de conexión RPC y WSS
    - Nodos dedicados completos y de archivo
    - Sincronización rápida para los despliegues dedicados
    - Traiga su nube
    - Precio por hora
    - Asistencia directa 24 horas
- [**GetBlock**](https://getblock.io/)
  - [Documentos](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Características
    - Acceso a más de 40 nodos de la cadena de bloques
    - 40.000 peticiones gratuitas diarias
    - Número ilimitado de claves de API
    - Alta velocidad de conexión a 1 GB/s
    - Rastro + Archivo
    - Análisis avanzados
    - Actualizaciones automáticas
    - Asistencia técnica
- [**InfStones**](https://infstones.com/)
  - Características
    - Opción de nivel gratuito
    - Escala según el uso
    - Análisis
    - Panel
    - Puntos de conexión de API exclusivos
    - Nodos completos dedicados
    - Sincronización rápida para los despliegues dedicados
    - Asistencia directa 24 horas
    - Acceso a más de 50 nodos de la cadena de bloques
- [**Infura**](https://infura.io/)
  - [Documentos](https://infura.io/docs)
  - Características
    - Opción de nivel gratuito
    - Escala según el uso
    - Datos de archivo de pago
    - Asistencia directa
    - Panel
- [**Kaleido**](https://kaleido.io/)
  - [Documentos](https://docs.kaleido.io/)
  - Características
    - Free startier tier
    - One-click Ethereum node deployment
    - Customizable clients and algorithms (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ administrative and service APIs
    - RESTful interface for Ethereum transaction submission (Apache Kafka backed)
    - Outbound streams for event delivery (Apache Kafka backed)
    - Deep collection of "off-chain" and ancillary services (e.g. bilateral encrypted messaging transport)
    - Straightforward network onboarding with governance and role-based access control
    - Sophisticated user management for both administrators and end users
    - Highly scalable, resilient, enterprise-grade infrastructure
    - Cloud HSM private key management
    - Ethereum Mainnet Tethering
    - ISO 27k and SOC 2, Type 2 certifications
    - Dynamic runtime configuration (e.g. adding cloud integrations, altering node ingresses, etc.)
    - Support for multi-cloud, multi-region and hybrid deployment orchestrations
    - Simple hourly SaaS-based pricing
    - SLAs and 24x7 support
- [**Moralis**](https://moralis.io/)
  - [Documentos](https://docs.moralis.io/)
  - Características
    - Nodos compartidos libres
    - Nodos de archivo compartidos libres
    - Concentrada en la privacidad (sin políticas de registros)
    - Soporte de cadena cruzada
    - Escala según el uso
    - Panel
    - SDK exclusivo de Ethereum
    - Puntos de conexión de API exclusivos
    - Soporte técnico directo
- [**Pocket Network**](https://www.pokt.network/)
  - [Documentos](https://docs.pokt.network/home/)
  - Características
    - Protocolo descentralizado RPC y marketplace
    - 1M Solicitudes por día Gratis (por punto final, máx. 2)
    - [Endpoints públicos](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Programa Pre-Stake+ (si necesita más de 1M solicitudes por día)
    - 15+ Blockchains soportados
    - +6400 nodos ganando POKT por alojar aplicaciones
    - Nodo de archivo, Nodo de archivo con rastreo, & Soporte de nodo de Testnet
    - Diversidad de clientes para nodos Mainnet de Ethereum
    - Ningún punto único de fracaso
    - Sin pérdida de tiempo
    - Costo efectivo Tokenomics cerca de cero (apuesta POKT una vez para el ancho de banda de red)
    - Ningún costo mensual sumidero, convierte su infraestructura en un activo
    - Equilibrio de carga incluido en el Protocolo
    - Escala infinitamente el número de peticiones por día y nodos por hora a medida que vas
    - La opción más privada y resistente a la censura
    - Soporte para desarrolladores
    - [Portal Pocket](https://bit.ly/ETHorg_POKTportal)Panel de control y análisis
- [**QuikNode**](https://www.quiknode.io/)
  - Características
    - Prueba gratuita de 7 días
    - Soporte variado
    - Webhook
    - Panel
    - Análisis
- [**Rivet**](https://rivet.cloud/)
  - [Documentos](https://rivet.readthedocs.io/en/latest/)
  - Características
    - Opción de nivel gratuito
    - Escala según el uso
- [**SettleMint**](https://console.settlemint.com/)
  - [Documentos](https://docs.settlemint.com/)
  - Características
    - Prueba gratuita
    - Escala según el uso
    - Soporte para GraphQL
    - Endpoints RPC y WSS
    - Nodos completos dedicados
    - Trae tu nube
    - Herramientas de análisis
    - Panel
    - Precio de pago por hora
    - Asistencia directa
- [**Watchdata**](https://watchdata.io/)
  - [Documentos](https://docs.watchdata.io/)
  - Características
    - Data reliability
    - Uninterrupted connection with no downtime
    - Process automation
    - Free tariffs
    - High limits that suit any user
    - Support for various nodes
    - Resource scaling
    - High processing speeds

## Más información {#further-reading}

- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)

## Tutoriales relacionados {#related-tutorials}

- [Primeros pasos con el desarrollo de Ethereum usando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guía para enviar transacciones usando Web 3.0 y Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
