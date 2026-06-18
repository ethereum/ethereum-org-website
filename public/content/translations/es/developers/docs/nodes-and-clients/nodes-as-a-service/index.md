---
title: Nodos como servicio
description: Una descripción general de nivel básico sobre los servicios de nodos, sus pros y contras, y los proveedores populares.
lang: es
sidebarDepth: 2
---

## Introducción {#introduction}

Ejecutar su propio [nodo de Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) puede ser un desafío, especialmente al empezar o al escalar rápidamente. Hay una [serie de servicios](#popular-node-services) que ejecutan infraestructuras de nodos optimizadas por usted, para que pueda concentrarse en desarrollar su aplicación o producto. Explicaremos cómo funcionan los servicios de nodos, los pros y los contras de usarlos y enumeraremos proveedores si está interesado en comenzar.

## Requisitos previos {#prerequisites}

Si aún no comprende qué son los nodos y los clientes, consulte [Nodos y clientes](/developers/docs/nodes-and-clients/).

## Stakers {#stakoooooooooooooors}

Los stakers en solitario deben ejecutar su propia infraestructura en lugar de depender de proveedores externos. Esto significa ejecutar un cliente de ejecución junto con un cliente de consenso. Antes de [La Fusión](/roadmap/merge), era posible ejecutar solo un cliente de consenso y usar un proveedor centralizado para los datos de ejecución; esto ya no es posible: un staker en solitario debe ejecutar ambos clientes. Sin embargo, hay servicios disponibles para facilitar este proceso.

[Lea más sobre cómo ejecutar un nodo](/developers/docs/nodes-and-clients/run-a-node/).

Los servicios descritos en esta página son para nodos que no hacen staking.

## ¿Cómo funcionan los servicios de nodos? {#how-do-node-services-work}

Los proveedores de servicios de nodos ejecutan clientes de nodos distribuidos en segundo plano por usted, para que no tenga que hacerlo.

Estos servicios suelen proporcionar una clave de API que puede usar para escribir y leer de la cadena de bloques. A menudo incluyen acceso a las [redes de prueba de Ethereum](/developers/docs/networks/#ethereum-testnets) además de la Red principal.

Algunos servicios le ofrecen su propio nodo dedicado que administran por usted, mientras que otros usan balanceadores de carga para distribuir la actividad entre los nodos.

Casi todos los servicios de nodos son extremadamente fáciles de integrar, lo que implica cambios de una línea en su código para cambiar su nodo autohospedado, o incluso cambiar entre los propios servicios.

A menudo, los servicios de nodos ejecutarán una variedad de [clientes de nodos](/developers/docs/nodes-and-clients/#execution-clients) y [tipos](/developers/docs/nodes-and-clients/#node-types), lo que le permite acceder a nodos completos y de archivo además de métodos específicos del cliente en una sola API.

Es importante tener en cuenta que los servicios de nodos no almacenan ni deben almacenar sus claves privadas o información.

## ¿Cuáles son los beneficios de usar un servicio de nodos? {#benefits-of-using-a-node-service}

El principal beneficio de usar un servicio de nodos es no tener que dedicar tiempo de ingeniería a mantener y administrar los nodos usted mismo. Esto le permite concentrarse en construir su producto en lugar de tener que preocuparse por el mantenimiento de la infraestructura.

Ejecutar sus propios nodos puede ser muy costoso, desde el almacenamiento hasta el ancho de banda y el valioso tiempo de ingeniería. Cosas como poner en marcha más nodos al escalar, actualizar los nodos a las últimas versiones y garantizar la consistencia del estado, pueden distraerlo de la construcción y el gasto de recursos en su producto Web3 deseado.

## ¿Cuáles son las desventajas de usar un servicio de nodos? {#cons-of-using-a-node-service}

Al usar un servicio de nodos, está centralizando el aspecto de infraestructura de su producto. Por esta razón, los proyectos que consideran la descentralización de suma importancia podrían preferir nodos autohospedados en lugar de subcontratar a un tercero.

Lea más sobre los [beneficios de ejecutar su propio nodo](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servicios de nodos populares {#popular-node-services}

Aquí hay una lista de algunos de los proveedores de nodos de Ethereum más populares, ¡no dude en agregar los que falten! Cada servicio de nodos ofrece diferentes beneficios y características además de niveles gratuitos o de pago, debe investigar cuáles se adaptan mejor a sus necesidades antes de tomar una decisión.

- [**Alchemy**](https://alchemy.com/)
  - [Documentación](https://www.alchemy.com/docs/)
  - Características
    - El nivel gratuito más grande con 300 millones de unidades de cómputo por mes (~30 millones de solicitudes getLatestBlock)
    - Soporte multicadena para Polygon, Starknet, Optimism, Arbitrum
    - Impulsa ~70 % de las aplicaciones descentralizadas (dapps) de Ethereum más grandes y el volumen de transacciones de finanzas descentralizadas (DeFi)
    - Alertas de webhook en tiempo real a través de Alchemy Notify
    - Soporte y confiabilidad/estabilidad de primera clase
    - API de NFT de Alchemy
    - Panel de control con Request Explorer, Mempool Watcher y Composer
    - Acceso integrado a faucet de red de prueba
    - Comunidad activa de constructores en Discord con 18 mil usuarios

- [**Allnodes**](https://www.allnodes.com/)
  - [Documentación](https://docs.allnodes.com/)
  - Características
    - Sin límites de tasa con el token PublicNode creado en la página de cartera de Allnodes.
    - Puntos de conexión RPC gratuitos centrados en la privacidad (más de 100 cadenas de bloques) en [PublicNode](https://www.publicnode.com)
    - Nodos dedicados sin límites de tasa para más de 90 cadenas de bloques
    - Nodos de archivo dedicados para más de 30 cadenas de bloques
    - Disponible en 3 regiones (EE. UU., UE, Asia)
    - Instantáneas para más de 100 cadenas de bloques en [PublicNode](https://www.publicnode.com/snapshots)
    - Soporte técnico 24/7 con un SLA de tiempo de actividad del 99,90 % al 99,98 % (depende del plan).
    - Precios de pago por hora
    - Pague con tarjeta de crédito, PayPal o cripto

- [**All That Node**](https://allthatnode.com/)
  - [Documentación](https://docs.allthatnode.com/)
  - Características
    - 50 000 solicitudes por día con el nivel gratuito
    - Soporte para más de 40 protocolos
    - Soporte para API JSON-RPC (EVM, Tendermint), REST y Websocket
    - Acceso ilimitado a datos de archivo
    - Soporte técnico 24/7 y más del 99,9 % de tiempo de actividad
    - Faucet disponible en múltiples cadenas
    - Acceso ilimitado a puntos de conexión con un número ilimitado de claves de API
    - Soporte para API de rastreo/depuración
    - Actualizaciones automatizadas

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Documentación](https://aws.amazon.com/managed-blockchain/resources/)
  - Características
    - Nodos de Ethereum totalmente administrados
    - Disponible en seis regiones
    - JSON-RPC sobre HTTP y WebSockets seguros
    - Soporta 3 cadenas
    - SLA, soporte de AWS 24/7
    - Go-ethereum y Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Documentación](https://docs.ankr.com/)
  - Características
    - Protocolo Ankr: acceso abierto a puntos de conexión de API RPC públicos para más de 8 cadenas
    - Balanceo de carga y monitoreo del estado del nodo para una puerta de enlace rápida y confiable al nodo disponible más cercano
    - Nivel premium que habilita el punto de conexión WSS y un límite de tasa sin tope
    - Despliegue de nodo completo y nodo validador con un solo clic para más de 40 cadenas
    - Escale a medida que avanza
    - Herramientas de análisis
    - Panel de control
    - Puntos de conexión RPC, HTTPS y WSS
    - Soporte directo

- [**Blast**](https://blastapi.io/)
  - [Documentación](https://docs.blastapi.io/)
  - Características
    - Soporte para RPC y WSS
    - Alojamiento de nodos en múltiples regiones
    - Infraestructura descentralizada
    - API pública
    - Plan gratuito dedicado
    - Soporte multicadena (más de 17 cadenas de bloques)
    - Nodos de archivo
    - Soporte 24/7 en Discord
    - Monitoreo y alertas 24/7
    - Un SLA general del 99,9 %
    - Pague en cripto

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentación](https://ubiquity.docs.blockdaemon.com/)
  - Beneficios
    - Panel de control
    - Por nodo
    - Análisis

- [**BlockPI**](https://blockpi.io/)
  - [Documentación](https://docs.blockpi.io/)
  - Características
    - Estructura de nodos robusta y distribuida
    - Hasta 40 puntos de conexión HTTPS y WSS
    - Paquete de registro gratuito y paquete mensual
    - Método de rastreo + soporte de datos de archivo
    - Paquetes con validez de hasta 90 días
    - Plan personalizado y pago por uso
    - Pague en cripto
    - Soporte directo y soporte técnico

- [**Chainbase**](https://www.chainbase.com/)
  - [Documentación](https://docs.chainbase.com)
  - Características
    - Servicio RPC altamente disponible, rápido y escalable
    - Soporte multicadena
    - Tarifas gratuitas
    - Panel de control fácil de usar
    - Proporciona servicios de datos de cadena de bloques más allá de RPC

- [**Chainstack**](https://chainstack.com/)
  - [Documentación](https://docs.chainstack.com/)
  - Características
    - Nodos compartidos gratuitos
    - Nodos de archivo compartidos
    - Soporte para GraphQL
    - Puntos de conexión RPC y WSS
    - Nodos completos y de archivo dedicados
    - Tiempo de sincronización rápido para despliegues dedicados
    - Traiga su propia nube
    - Precios de pago por hora
    - Soporte directo 24/7

- [**dRPC**](https://drpc.org/)
  - [Documentación](https://drpc.org/docs)
  - NodeCloud: infraestructura RPC lista para usar desde $10 (USD): velocidad máxima, sin límites
  - Características de NodeCloud:
    - Soporte de API para 185 redes
    - Grupo distribuido de más de 40 proveedores
    - Cobertura global con nueve (9) geoclústeres
    - Sistema de balanceo de carga impulsado por IA
    - Precios fijos de pago por uso: sin aumentos, sin vencimiento, sin bloqueos
    - Claves ilimitadas, ajustes granulares de claves, roles de equipo, protección de front-end
    - Tarifa plana de métodos a 20 unidades de cómputo (CU) por método
    - [Lista de cadenas de puntos de conexión públicos](https://drpc.org/chainlist)
    - [Calculadora de precios](https://drpc.org/pricing#calculator)
  - NodeCore: pila de código abierto para organizaciones que desean un control total

- [**GetBlock**](https://getblock.io/)
  - [Documentación](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Características
    - Acceso a más de 40 nodos de cadenas de bloques
    - 40 mil solicitudes diarias gratuitas
    - Número ilimitado de claves de API
    - Alta velocidad de conexión a 1 GB/s
    - Rastreo + Archivo
    - Análisis avanzado
    - Actualizaciones automatizadas
    - Soporte técnico

- [**InfStones**](https://infstones.com/)
  - Características
    - Opción de nivel gratuito
    - Escale a medida que avanza
    - Análisis
    - Panel de control
    - Puntos de conexión de API únicos
    - Nodos completos dedicados
    - Tiempo de sincronización rápido para despliegues dedicados
    - Soporte directo 24/7
    - Acceso a más de 50 nodos de cadenas de bloques

- [**Infura**](https://infura.io/)
  - [Documentación](https://infura.io/docs)
  - Características
    - Opción de nivel gratuito
    - Escale a medida que avanza
    - Datos de archivo de pago
    - Soporte directo
    - Panel de control

- [**Kaleido**](https://kaleido.io/)
  - [Documentación](https://docs.kaleido.io/)
  - Características
    - Nivel inicial gratuito
    - Despliegue de nodo de Ethereum con un solo clic
    - Clientes y algoritmos personalizables (Geth, Quorum y Besu || PoA, IBFT y Raft)
    - Más de 500 API administrativas y de servicios
    - Interfaz RESTful para el envío de transacciones de Ethereum (respaldada por Apache Kafka)
    - Flujos salientes para la entrega de eventos (respaldados por Apache Kafka)
    - Amplia colección de servicios auxiliares y "fuera de la cadena" (por ejemplo, transporte de mensajería cifrada bilateral)
    - Incorporación de red sencilla con gobernanza y control de acceso basado en roles
    - Gestión de usuarios sofisticada tanto para administradores como para usuarios finales
    - Infraestructura de nivel empresarial altamente escalable y resistente
    - Gestión de claves privadas en Cloud HSM
    - Anclaje a la red principal de Ethereum
    - Certificaciones ISO 27k y SOC 2, Tipo 2
    - Configuración dinámica en tiempo de ejecución (por ejemplo, agregar integraciones en la nube, alterar los ingresos de los nodos, etc.)
    - Soporte para orquestaciones de despliegue multinube, multirregión e híbridas
    - Precios simples basados en SaaS por hora
    - SLA y soporte 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Documentación](https://docs.lavanet.xyz/)
  - Características
    - Uso gratuito de la red de prueba
    - Redundancia descentralizada para un alto tiempo de actividad
    - Código abierto
    - SDK totalmente descentralizado
    - Integración con Ethers.js
    - Interfaz intuitiva de gestión de proyectos
    - Integridad de datos basada en el consenso
    - Soporte multicadena

- [**Moralis**](https://moralis.io/)
  - [Documentación](https://docs.moralis.io/)
  - Características
    - Nodos compartidos gratuitos
    - Nodos de archivo compartidos gratuitos
    - Centrado en la privacidad (política de no registros)
    - Soporte de cadenas cruzadas
    - Escale a medida que avanza
    - Panel de control
    - SDK de Ethereum único
    - Puntos de conexión de API únicos
    - Soporte técnico directo

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Documentación](https://docs.nodereal.io/docs/introduction)
  - Características
    - Servicios de API RPC confiables, rápidos y escalables
    - API mejorada para desarrolladores de Web3
    - Soporte multicadena
    - Comience gratis

- [**NodeFlare**](https://nodeflare.app/)
  - [Documentación](https://nodeflare.app/docs/quick-start)
  - Características
    - 8 cadenas EVM, incluidas Ethereum, Base, Arbitrum One y Optimism
    - 4 regiones (Europa, Asia, Norteamérica) con conmutación por error automática al nodo en buen estado más cercano
    - Punto de conexión público gratuito (sin clave de API) + plan gratuito con 3 millones de unidades de cómputo/mes
    - Facturación por unidad de cómputo: pague solo por lo que usa, las llamadas más pesadas cuestan más
    - Sin limitación en los planes de pago

- [**NOWNodes**](https://nownodes.io/)
  - Características
    - Acceso a más de 50 nodos de cadenas de bloques
    - Clave de API gratuita
    - Exploradores de bloques
    - Tiempo de respuesta de la API ⩽ 1 seg
    - Equipo de soporte 24/7
    - Administrador de cuenta personal
    - Nodos compartidos, de archivo, de respaldo y dedicados

- [**Pocket Network**](https://www.pokt.network/)
  - [Documentación](https://docs.pokt.network/)
  - Características
    - Protocolo RPC descentralizado y mercado
    - Nivel gratuito de 1 millón de solicitudes por día (por punto de conexión, máximo 2)
    - Programa Pre-Stake+ (si necesita más de 1 millón de solicitudes por día)
    - Más de 15 cadenas de bloques compatibles
    - Más de 6400 nodos que ganan POKT por servir aplicaciones
    - Soporte para nodo de archivo, nodo de archivo con rastreo y nodo de red de prueba
    - Diversidad de clientes de nodos de la red principal de Ethereum
    - Sin punto único de falla
    - Cero tiempo de inactividad
    - Tokenómica rentable cercana a cero (haga staking de POKT una vez para obtener ancho de banda de red)
    - Sin costos hundidos mensuales, convierta su infraestructura en un activo
    - Balanceo de carga integrado en el protocolo
    - Escale infinitamente la cantidad de solicitudes por día y nodos por hora a medida que avanza
    - La opción más privada y resistente a la censura
    - Soporte práctico para desarrolladores
    - Panel de control y análisis de [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Documentación](https://www.quicknode.com/docs/)
  - Características
    - Soporte técnico 24/7 y comunidad de desarrolladores en Discord
    - Red de baja latencia, multinube/metal y geobalanceada
    - Soporte multicadena (Optimism, Arbitrum, Polygon + otros 11)
    - Capas intermedias para velocidad y estabilidad (enrutamiento de llamadas, caché, indexación)
    - Monitoreo de contratos inteligentes a través de webhooks
    - Panel de control intuitivo, suite de análisis, compositor RPC
    - Funciones de seguridad avanzadas (JWT, enmascaramiento, listas blancas)
    - API de datos y análisis de NFT
    - [Certificación SOC2](https://www.quicknode.com/security)
    - Adecuado para desarrolladores y empresas

- [**Rivet**](https://rivet.cloud/)
  - [Documentación](https://rivet.readthedocs.io/en/latest/)
  - Características
    - Opción de nivel gratuito
    - Escale a medida que avanza

- [**SenseiNode**](https://senseinode.com)
  - [Documentación](https://docs.senseinode.com/)
  - Características
    - Nodos dedicados y compartidos
    - Panel de control
    - Alojamiento fuera de AWS en múltiples proveedores de alojamiento en diferentes ubicaciones de América Latina
    - Clientes Prysm y Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Documentación](https://docs.settlemint.com/)
  - Características
    - Prueba gratuita
    - Escale a medida que avanza
    - Soporte para GraphQL
    - Puntos de conexión RPC y WSS
    - Nodos completos dedicados
    - Traiga su propia nube
    - Herramientas de análisis
    - Panel de control
    - Precios de pago por hora
    - Soporte directo

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Documentación](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Características
    - Nivel gratuito que incluye 25 millones de unidades de Tenderly por mes
    - Acceso gratuito a datos históricos
    - Cargas de trabajo con gran volumen de lectura hasta 8 veces más rápidas
    - Acceso de lectura 100 % consistente
    - Puntos de conexión JSON-RPC
    - Creador de solicitudes RPC basado en la interfaz de usuario y vista previa de solicitudes
    - Estrechamente integrado con las herramientas de desarrollo, depuración y prueba de Tenderly
    - Simulaciones de transacciones
    - Análisis de uso y filtrado
    - Gestión de claves de fácil acceso
    - Soporte de ingeniería dedicado a través de chat, correo electrónico y Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Documentación](https://services.tokenview.io/docs?type=nodeService)
  - Características
    - Soporte técnico 24/7 y comunidad de desarrolladores en Telegram
    - Soporte multicadena (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Tanto los puntos de conexión RPC como WSS están abiertos para su uso
    - Acceso ilimitado a la API de datos de archivo
    - Panel de control con Request Explorer y Mempool Watcher
    - API de datos de NFT y notificación de webhook
    - Pague en cripto
    - Soporte externo para requisitos de comportamiento adicionales

- [**Watchdata**](https://watchdata.io/)
  - [Documentación](https://docs.watchdata.io/)
  - Características
    - Confiabilidad de los datos
    - Conexión ininterrumpida sin tiempo de inactividad
    - Automatización de procesos
    - Tarifas gratuitas
    - Límites altos que se adaptan a cualquier usuario
    - Soporte para varios nodos
    - Escalado de recursos
    - Altas velocidades de procesamiento

- [**ZMOK**](https://zmok.io/)
  - [Documentación](https://docs.zmok.io/)
  - Características
    - Front-running como servicio
    - Mempool de transacciones globales con métodos de búsqueda/filtrado
    - Tarifa de transacción ilimitada y gas infinito para enviar transacciones
    - Obtención más rápida del nuevo bloque y lectura de la cadena de bloques
    - Garantía del mejor precio por llamada a la API

- [**Zeeve**](https://www.zeeve.io/)
  - [Documentación](https://www.zeeve.io/docs/)
  - Características
    - Plataforma de automatización sin código de nivel empresarial que proporciona despliegue, monitoreo y gestión de nodos y redes de cadenas de bloques
    - Más de 30 protocolos e integraciones compatibles, y sumando más
    - Servicios de infraestructura Web3 de valor agregado como almacenamiento descentralizado, identidad descentralizada y API de datos de libro mayor de cadena de bloques para casos de uso del mundo real
    - El soporte 24/7 y el monitoreo proactivo garantizan el estado de los nodos en todo momento.
    - Los puntos de conexión RPC ofrecen acceso autenticado a las API, gestión sin complicaciones con un panel de control intuitivo y análisis.
    - Proporciona opciones de nube administrada y de traer su propia nube para elegir, y es compatible con los principales proveedores de nube como AWS, Azure, Google Cloud, Digital Ocean y en las instalaciones.
    - Usamos enrutamiento inteligente para llegar al nodo más cercano a su usuario en todo momento


## Lecturas adicionales {#further-reading}

- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)

## Tutoriales relacionados {#related-tutorials}

- [Introducción al desarrollo de Ethereum usando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guía para enviar transacciones usando Web3 y Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)