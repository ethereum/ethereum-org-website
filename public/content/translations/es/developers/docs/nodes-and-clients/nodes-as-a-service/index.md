---
title: Nodos como servicio
description: Una visión general para principiantes de los servicios de nodos, los pros y los contras, y los proveedores populares.
lang: es
sidebarDepth: 2
---

## Introducción {#Introduction}

Ejecutar su propio [nodo de Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) puede ser un desafío, especialmente al empezar o al escalar rápidamente. Existen [varios servicios](#popular-node-services) que ejecutan infraestructuras de nodos optimizadas para usted, de modo que pueda centrarse en desarrollar su aplicación o producto. Te explicaremos el funcionamiento de los servicios de nodos, las ventajas y desventajas de usarlos, y haremos una lista con los proveedores por si estás interesado en ponerte en marcha.

## Requisitos previos {#prerequisites}

Si aún no entiende qué son los nodos y los clientes, consulte [Nodos y clientes](/developers/docs/nodes-and-clients/).

## Participantes {#stakoooooooooooooors}

Los participantes en solitario deben ejecutar su propia infraestructura en lugar de depender de otros proveedores. Esto conlleva la ejecución de un cliente de ejecución acoplado con un cliente de consenso. Antes de [La fusión](/roadmap/merge), era posible ejecutar solo un cliente de consenso y utilizar un proveedor centralizado para los datos de ejecución; esto ya no es posible: un participante en solitario debe ejecutar ambos clientes. Sin embargo, hay servicios disponibles para facilitar este proceso.

[Más información sobre cómo ejecutar un nodo](/developers/docs/nodes-and-clients/run-a-node/).

Los servicios descritos en esta página hacen referencia a nodos que no se estén apostando.

## ¿Cómo funcionan los servicios de nodos? {#how-do-node-services-work}

Los proveedores de servicios de nodos ejecutan clientes de nodos distribuidos sin que usted se dé cuenta, por lo tanto usted no tiene que hacerlo.

Estos servicios suelen proporcionar una clave de API, que puede usar para escribir y leer desde la cadena de bloques. A menudo incluyen acceso a las [redes de prueba de Ethereum](/developers/docs/networks/#ethereum-testnets), además de a la red principal.

Algunos servicios le ofrecen su propio nodo exclusivo que ellos gestionan en su nombre, mientras que otros usan equilibradores de carga para distribuir la actividad a través de los nodos.

Casi todos los servicios de nodos son extremadamente fáciles de integrar, incluyen cambios de una línea en su código para intercambiar su nodo autoalojado, o incluso cambiar entre los mismos servicios.

A menudo, los servicios de nodos ejecutan una variedad de [clientes de nodo](/developers/docs/nodes-and-clients/#execution-clients) y [tipos](/developers/docs/nodes-and-clients/#node-types), lo que le permite acceder a nodos completos y de archivo, además de a los métodos específicos del cliente en una API.

Es importante remarcar que los servicios de nodos no almacenan ni deben almacenar sus claves o información privadas.

## ¿Qué ventajas supone el uso de un servicio de nodos? {#benefits-of-using-a-node-service}

La principal ventaja que se obtiene al usar un servicio de nodo es no tener que dedicar parte de su tiempo a la ingeniería con el mantenimiento y la administración de los nodos. Esto le permite centrarse en crear su producto, en lugar de tener que preocuparse por el mantenimiento de la infraestructura.

Ejecutar sus propios nodos puede ser muy caro: desde el almacenamiento al ancho de banda, pasando por el elevadísimo coste que supone el tiempo dedicado a la ingeniería. Operaciones como activar más nodos al escalar, actualizar los nodos a las últimas versiones y asegurar la consistencia del estado pueden desviar la atención de la construcción y de la asignación de recursos en su producto Web3 deseado.

## ¿Qué desventajas supone el uso de un servicio de nodos? {#cons-of-using-a-node-service}

Al utilizar un servicio de nodos, centraliza el aspecto infraestructural de su producto. Por este motivo, los proyectos que se basan en la descentralización como uno de sus puntos fuertes quizá prefieran utilizar nodos autoalojados que externalizarlos a un tercero.

[Más información sobre los beneficios de ejecutar su propio nodo](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servicios de nodos populares {#popular-node-services}

A continuación se incluye una lista con algunos de los proveedores de nodos de Ethereum más populares. Si nota que falta alguno, puede añadirlo. Cada servicio de nodos ofrece diferentes beneficios y características, además de niveles gratuitos o de pago. Te recomendamos que investigues cuáles se adaptan mejor a tus necesidades antes de tomar una decisión.

- [**Alchemy**](https://alchemy.com/)
  - [Documentación](https://www.alchemy.com/docs/)
  - Funciones
    - El mayor nivel gratis con un cómputo de 300 millones de unidades al mes (~30M getLatestBlock requests)
    - Compatibilidad multicadena para Polygon, Starknet, Optimism, Arbitrum
    - Funciona con ~70 % de las mayores DApps de Ethereum y volumen de transacciones de DeFi
    - Alertas de Webhooks en tiempo real a través de las notificaciones de Alchemy
    - Estabilidad/Fiabilidad y mejor compatibilidad en su categoría
    - API NFT de Alchemy
    - Panel de control con Explorador de Solicitudes, Mempool Watcher y Composer
    - Acceso intregrado a un grifo de red de pruebas
    - Comunidad constructora activa en Discord con 18.000 usuarios

- [**Allnodes**](https://www.allnodes.com/)
  - [Documentación](https://docs.allnodes.com/)
  - Funciones
    - Sin límites de tarifa con el token PublicNode creado en la página de la cartera de Allnodes.
    - Puntos de conexión RPC gratuitos y centrados en la privacidad (más de 100 cadenas de bloques) en [PublicNode](https://www.publicnode.com)
    - Nodos dedicados sin límites de velocidad para más de 90 cadenas de bloques
    - Nodos de archivo exclusivos para más de 30 cadenas de bloques
    - Disponible en 3 regiones (EE. UU., UE, Asia)
    - Instantáneas para más de 100 cadenas de bloques en [PublicNode](https://www.publicnode.com/snapshots)
    - Soporte técnico 24/7 con SLA de tiempo de actividad del 99,90%-99,98% (depende del plan).
    - Precio por hora
    - Pague con tarjeta de crédito, PayPal o Crypto

- [**All That Node**](https://allthatnode.com/)
  - [Documentación](https://docs.allthatnode.com/)
  - Funciones
    - 50.000 solicitudes por día con nivel gratuito
    - Soporte para más de 40 protocolos
    - Compatibilidad con las API JSON-RPC (EVM, Tendermint), REST y Websocket
    - Acceso ilimitado a la fecha de archivo
    - Soporte técnico 24/7 y tiempo de actividad de más del 99,9%
    - Faucet disponible en múltiples cadenas
    - Acceso ilimitado a terminales con un número ilimitado de claves de API
    - API de Rastreo/Depuración compatible
    - Actualizaciones automáticas

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Documentación](https://aws.amazon.com/managed-blockchain/resources/)
  - Funciones
    - Nodos de Ethereum completamente gestionados
    - Disponible en seis regiones
    - JSON-RPC sobre HTTP y WebSockets seguros
    - Soporta 3 cadenas
    - SLA, soporte de AWS 24/7
    - Go-ethereum y Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Documentación](https://docs.ankr.com/)
  - Funciones
    - Protocolo Ankr: acceso abierto a los puntos de conexión de la API RPC pública para más de ocho cadenas.
    - Carga del saldo y supervisión del estado del nodo como pasarela rápida y segura al nodo disponible más cercano.
    - Nivel prémium que habilita el punto de conexión WSS y límite de tasa ilimitado
    - Despliegue de nodo completo y validador para más de 40 cadenas en un solo clic.
    - Escalabilidad en función del uso
    - Herramientas de análisis
    - Panel de control
    - Terminales de conexión RPC, HTTPS y WSS
    - Asistencia directa

- [**Blast**](https://blastapi.io/)
  - [Documentación](https://docs.blastapi.io/)
  - Funciones
    - Compatible con RPC y WSS
    - Alojamiento de nodo multiregión
    - Infraestructura descentralizada
    - API pública
    - Plan gratuito exclusivo
    - Compatible con multicadena (más de 17 cadenas de bloques)
    - Nodos de archivos
    - Soporte de Discord 24/7
    - Supervisión y alertas 24/7
    - Un acuerdo de nivel de servicio (o SLA) total del 99,9 %
    - Pago en criptomoneda

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentación](https://ubiquity.docs.blockdaemon.com/)
  - Beneficios
    - Panel de control
    - Base por nodo
    - Analíticas

- [**BlockPI**](https://blockpi.io/)
  - [Documentación](https://docs.blockpi.io/)
  - Funciones
    - Estructura de nodos robusta y distribuida
    - Puntos de conexión RPC, HTTPS y WSS
    - Paquete de registro gratuito y abono mensual
    - Método de trazabilidad + Soporte de datos de archivos
    - Paquetes con una validez de hasta 90 días
    - Plan personalizado y pago en función del uso
    - Pago en criptomoneda
    - Soporte directo y soporte técnico

- [**Chainbase**](https://www.chainbase.com/)
  - [Documentación](https://docs.chainbase.com)
  - Funciones
    - Servicio de RPC de alta disponibilidad, velóz y escalable
    - Compatibilidad con multicadena
    - Tarifas gratuitas
    - Panel de control sencillo para el usuario
    - Proporciona servicios de datos de la cadena de bloques más allá de RPC

- [**Chainstack**](https://chainstack.com/)
  - [Documentación](https://docs.chainstack.com/)
  - Funciones
    - Nodos compartidos libres
    - Nodos de archivo compartidos
    - Compatible con GraphQL
    - Terminales de conexión RPC y WSS
    - Nodos dedicados completos y de archivo
    - Sincronización rápida para los despliegues dedicados
    - Traiga su nube (Bring Your Own Cloud o BYOC)
    - Precio por hora
    - Soporte directo 24/7

- [**dRPC**](https://drpc.org/)
  - [Documentación](https://drpc.org/docs)
  - NodeCloud: Infraestructura RPC Plug-n-play a partir de 10 $ (USD): máxima velocidad, sin límites
  - Características de NodeCloud:
    - Soporte de API para 185 redes
    - Piscina distribuida de más de 40 proveedores
    - Cobertura global con nueve (9) geoclústeres
    - Sistema de balanceo de carga impulsado por IA
    - Precios de tarifa plana de pago por uso: sin subidas, sin vencimiento, sin permanencia
    - Claves ilimitadas, ajustes granulares de claves, roles de equipo, protección de front-end
    - Tarifa plana para métodos de 20 unidades de cómputo (UC) por método
    - [Lista de cadenas de puntos de conexión públicos](https://drpc.org/chainlist)
    - [Calculadora de precios](https://drpc.org/pricing#calculator)
  - NodeCore: stack de código abierto para organizaciones que desean un control total

- [**GetBlock**](https://getblock.io/)
  - [Documentación](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Funciones
    - Acceso a más de 40 nodos de la cadena de bloques
    - 40.000 solicitudes gratuitas diarias
    - Número ilimitado de claves de API
    - Alta velocidad de conexión a 1 GB/s
    - Trazabilidad + Archivado
    - Analíticas avanzadas
    - Actualizaciones automáticas
    - Soporte técnico

- [**InfStones**](https://infstones.com/)
  - Funciones
    - Opción de nivel gratuito
    - Escalabilidad en función del uso
    - Analíticas
    - Panel de control
    - Terminales de conexión de API exclusivas
    - Nodos completos dedicados
    - Sincronización rápida para los despliegues dedicados
    - Soporte directo 24/7
    - Acceso a más de 50 nodos de la cadena de bloques

- [**Infura**](https://infura.io/)
  - [Documentación](https://infura.io/docs)
  - Funciones
    - Opción de nivel gratuito
    - Escalabilidad en función del uso
    - Datos de archivo de pago
    - Asistencia directa
    - Panel de control

- [**Kaleido**](https://kaleido.io/)
  - [Documentación](https://docs.kaleido.io/)
  - Funciones
    - Categoría de inicio gratuita
    - Despliegue de nodo de Ethereum en un clic
    - Clientes y algoritmos personalizables (Geth, Quorum y Besu || PoA, IBFT y Raft)
    - Más de 500 API administrativas y de servicio
    - Interfaz RESTful para envío de transacciones de Ethereum (Apache Kafka respaldado)
    - Flujos salientes para la entrega del evento (Apache Kafka respaldado)
    - Amplia colección de servicios "fuera de la cadena" y auxiliares (p. ej., transporte de mensajería cifrada bilateral)
    - Incorporación de la red sencilla con gobernanza y control de acceso basado en funciones
    - Gestión sofisticada de usuarios tanto para administradores como para usuarios finales
    - Infraestructura altamente escalable, resistente y de grado empresarial
    - Gestión de claves privadas HSM en la nube
    - Tethering en la red principal Ethereum
    - ISO 27k y SOC 2, Certificaciones de tipo 2
    - Configuración dinámica en tiempo de ejecución (p. ej., añadir integraciones en la nube, alterar las entradas de los nodos, etc.)
    - Compatible con multinube, multiregión y modelos de despliegue híbrido
    - Precios simples por hora basados en tasación SaaS
    - Soporte 24/7 y SLA

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Documentación](https://docs.lavanet.xyz/)
  - Funciones
    - Uso gratuito de la red de prueba
    - Redundancia decentralizada para elevado tiempo de actividad
    - Código abierto
    - Kit de desarrollo de software (o SDK) completamente decentralizado
    - Integración de Ethers.js
    - Interfaz de gestión de proyecto intuitiva
    - Integridad de datos basada en consenso
    - Compatibilidad con multicadena

- [**Moralis**](https://moralis.io/)
  - [Documentación](https://docs.moralis.io/)
  - Funciones
    - Nodos compartidos libres
    - Nodos de archivos compartidos libres
    - Enfoque centrado en la privacidad (sin políticas de registros)
    - Compatibilidad con la cadena cruzada
    - Escalabilidad en función del uso
    - Panel de control
    - SDK exclusivo de Ethereum
    - Terminales de conexión de API exclusivas
    - Asistencia técnica directa

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Documentación](https://docs.nodereal.io/docs/introduction)
  - Funciones
    - Servicios de API RPC de confianza, rápidos y escalables
    - API mejorada para desarrolladores de Web3
    - Compatibilidad con multicadena
    - Comience gratis

- [**NOWNodes**](https://nownodes.io/)
  - [Documentación](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Funciones
    - Acceso a más de 50 nodos de la cadena de bloques
    - Clave API gratuita
    - Exploradores de bloques
    - Tiempo de respuesta de la API ⩽ 1 seg
    - Equipo de Soporte 24/7
    - Gestor de cuentas personales
    - Copias de seguridad, archivos, documentos compartidos y nodos dedicados

- [**Pocket Network**](https://www.pokt.network/)
  - [Documentación](https://docs.pokt.network/home/)
  - Funciones
    - Protocolo RPC descentralizado y mercado
    - 1 millón de solicitudes por día en la categoría gratuita (por terminal, máx. 2)
    - [Puntos de conexión públicos](https://docs.pokt.network/developers/public-endpoints)
    - Programa Pre-Stake+ (si necesita más de 1 millón de solicitudes por día)
    - Compatibilidad con más de 15 cadenas de bloques
    - Más de 6.400 nodos que generan Pocket Network (POKT) por alojar aplicaciones
    - Nodo de archivo, nodo de archivo con rastreo y soporte de nodo de red de prueba
    - Diversidad de clientes para nodos de red principal de Ethereum
    - Ningún punto único de error
    - Sin tiempo de inactividad
    - Economía de tókenes (Tokenomics) rentable cercana a cero (una participación de POKT para el ancho de banda de red)
    - Ningún coste mensual irrecuperable, convierta su infraestructura en un activo
    - Equilibrio de carga incluido en el protocolo
    - Escale infinitamente el número de solicitides por día y nodos por hora en función del uso
    - La opción más privada y resistente a la censura
    - Soporte práctico para desarrolladores
    - Panel de control y análisis de [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Documentación](https://www.quicknode.com/docs/)
  - Funciones
    - Soporte técnico 24/7 y comunidad de desarrolladores en Discord
    - Geoequilibrado, multinube/metal, red de baja latencia
    - Compatibilidad con multicadena (Optism, Arbitrum, Poligon + otros 11)
    - Capas intermedias para mayor velocidad y estabilidad (enrutamiento de llamadas, caché, indexación)
    - Supervisión de contratos inteligentes a través de Webhooks
    - Panel de control intuitivo, suite de analíticas, compositor de RPC
    - Funciones de seguridad avanzadas (JWT, ocultación, elaboración de lista blanca)
    - API de analíticas y datos de NFT
    - [Certificado SOC2](https://www.quicknode.com/security)
    - Adecuado para desarrolladores y empresas

- [**Rivet**](https://rivet.cloud/)
  - [Documentación](https://rivet.readthedocs.io/en/latest/)
  - Funciones
    - Opción de nivel gratuito
    - Escalabilidad en función del uso

- [**SenseiNode**](https://senseinode.com)
  - [Documentación](https://docs.senseinode.com/)
  - Funciones
    - Nodos dedicados y compartidos
    - Panel de control
    - Alojamiento fuera de AWS en múltiples proveedores de alojamiento por diferentes ubicaciones en América Latina
    - Clientes Prism y Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Documentación](https://docs.settlemint.com/)
  - Funciones
    - Prueba gratuita
    - Escalabilidad en función del uso
    - Compatible con GraphQL
    - Terminales de conexión RPC y WSS
    - Nodos completos dedicados
    - Traiga su nube (Bring Your Own Cloud o BYOC)
    - Herramientas de análisis
    - Panel de control
    - Precio por hora
    - Asistencia directa

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Documentación](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Funciones
    - Categoría gratuita que incluye 25 millones de unidades Tenderly por mes
    - Acceso libre a datos históricos
    - Carga de flujos de trabajo con mucho texto de lectura hasta 8 veces más rápidas
    - Acceso a la lectura 100 % coherente
    - Terminales JSON-RPC
    - Constructor de solicitudes RPC basado en la interfaz y vista previa de las solicitudes
    - Estrechamente incorporado en las herramientas de desarrollo, depuración y pruebas de Tenderly
    - Simulaciones de transacciones
    - Analíticas de uso y filtrado
    - Cómoda y sencilla gestion de claves de acceso
    - Soporte de ingeniería dedicado por chat, correo electrónico y Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Documentación](https://services.tokenview.io/docs?type=nodeService)
  - Funciones
    - Soporte técnico 24/7 y comunidad de desarrolladores en Telegram
    - Compatibilidad con multicadena (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Tanto los terminales RPC como WSS están abiertos al uso
    - Acceso ilimitado para archivar datos API
    - Panel de control con explorador de solicitudes y Mempool Watcher
    - API de datos NFT y notificaciones Webhook
    - Pago con criptomoneda
    - Soporte externo para requisitos de comportamiento adicionales

- [**Watchdata**](https://watchdata.io/)
  - [Documentación](https://docs.watchdata.io/)
  - Funciones
    - Fiabilidad de datos
    - Conexión ininterrumpida sin tiempos de inactividad
    - Automatización de procesos
    - Tarifas gratuitas
    - Límites elevados que se adaptan a cualquier usuario
    - Compatibilidad con varios nodos
    - Escalabilidad de recursos
    - Velocidades de procesamiento altas

- [**ZMOK**](https://zmok.io/)
  - [Documentación](https://docs.zmok.io/)
  - Funciones
    - Se ejecuta como un servicio
    - Transacciones globales como zona de espera con métodos de búsqueda/filtrado
    - Tarifa ilimitada de transacciones y gas infinito por enviar transacciones
    - El más rápido del nuevo bloque en obtener y leer la cadena de bloques
    - El mejor precio por garantía de llamada API

- [**Zeeve**](https://www.zeeve.io/)
  - [Documentación](https://www.zeeve.io/docs/)
  - Funciones
    - Plataforma de automatización sin código de grado empresarial que proporciona implementación, supervisión y gestión de nodos y redes de la cadena de bloques.
    - Más de 30 protocolos e integraciones compatibles, y se siguen añadiendo más
    - Servicios de infraestructura Web3 de valor añadido como el almacenamiento descentralizado, la identidad descentralizada y API de datos de la cadena de bloques del libro mayor para casos de uso en el mundo real
    - El soporte 24/7 y el seguimiento proactivo garantizan el buen estado de los nodos todo el tiempo.
    - Los terminales RPC ofrecen acceso autenticado a las API, gestión sin complicaciones con panel de control intuitivo y análisis
    - Proporciona tanto una nube gestionada, como opciones de nuebe propias de libre elección y es compatible con los principales proveedores de nube, como AWS, Azure, Google Cloud, Digital Ocean y en las instalaciones.
    - Utilizamos el enrutamiento inteligente para elegir siempre el nodo más cercano a su usuario

## Lecturas adicionales {#further-reading}

- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)

## Tutoriales relacionados {#related-tutorials}

- [Introducción al desarrollo en Ethereum con Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guía para enviar transacciones con web3 y Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
