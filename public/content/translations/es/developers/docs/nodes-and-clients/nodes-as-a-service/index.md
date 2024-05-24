---
title: Nodos como servicio
description: Una visión general para principiantes de los servicios de nodos, los pros y los contras, y los proveedores populares.
lang: es
sidebarDepth: 2
---

## Introducción {#Introduction}

Ejecutar su propio [ nodo de Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) puede ser desafiante, especialmente al principio o durante una escalada rápida. Hay un [número de servicios](#popular-node-services) que ejecutan infraestructuras de nodo optimizadas para ti; así podrás centrarte en desarrollar tu producto o aplicación. Te explicaremos el funcionamiento de los servicios de nodos, las ventajas y desventajas de usarlos, y haremos una lista con los proveedores por si estás interesado en ponerte en marcha.

## Requisitos previos {#prerequisites}

Si aún no entiende claramente lo que son los nodos y los clientes, consulte [Nodos y clientes](/developers/docs/nodes-and-clients/).

## Participantes {#stakoooooooooooooors}

Los participantes en solitario deben ejecutar su propia infraestructura en lugar de depender de otros proveedores. Esto conlleva la ejecución de un cliente de ejecución acoplado con un cliente de consenso. Antes de [La Fusión](/roadmap/merge), se podía ejecutar un cliente de consenso solo y servirse de un proveedor centralizado para ejecutar los datos. Esto ya no se puede hacer, ahora un participante en solitario debe ejecutar ambos clientes. Sin embargo, hay servicios disponibles para facilitar este proceso.

[Descubra más cosas sobre un nodo en ejecución](/developers/docs/nodes-and-clients/run-a-node/).

Los servicios descritos en esta página hacen referencia a nodos que no se estén apostando.

## ¿Cómo funcionan los servicios de nodos? {#how-do-node-services-work}

Los proveedores de servicios de nodos ejecutan clientes de nodos distribuidos sin que usted se dé cuenta, por lo tanto usted no tiene que hacerlo.

Estos servicios suelen proporcionar una clave de API, que puede usar para escribir y leer desde la cadena de bloques. Suelen incluir acceso a las [redes de prueba](/developers/docs/networks/#ethereum-testnets)además de la red principal.

Algunos servicios le ofrecen su propio nodo exclusivo que ellos gestionan en su nombre, mientras que otros usan equilibradores de carga para distribuir la actividad a través de los nodos.

Casi todos los servicios de nodos son extremadamente fáciles de integrar, incluyen cambios de una línea en su código para intercambiar su nodo autoalojado, o incluso cambiar entre los mismos servicios.

Muchas veces, los servicios de nodos ejecutan una serie de [clientes de nodos](/developers/docs/nodes-and-clients/#execution-clients) y [tipos](/developers/docs/nodes-and-clients/#node-types), lo que le permite acceder a los nodos de los archivos y completos, además de tener acceso a los métodos específicos de los clientes en una API.

Es importante remarcar que los servicios de nodos no almacenan ni deben almacenar sus claves o información privadas.

## ¿Qué ventajas supone el uso de un servicio de nodos? {#benefits-of-using-a-node-service}

La principal ventaja que se obtiene al usar un servicio de nodo es no tener que dedicar parte de su tiempo a la ingeniería con el mantenimiento y la administración de los nodos. Esto le permite centrarse en crear su producto, en lugar de tener que preocuparse por el mantenimiento de la infraestructura.

Ejecutar sus propios nodos puede ser muy caro: desde el almacenamiento al ancho de banda, pasando por el elevadísimo coste que supone el tiempo dedicado a la ingeniería. Operaciones como activar más nodos al escalar, actualizar los nodos a las últimas versiones y asegurar la consistencia del estado pueden desviar la atención de la construcción y de la asignación de recursos en su producto Web3 deseado.

## ¿Qué desventajas supone el uso de un servicio de nodos? {#cons-of-using-a-node-service}

Al utilizar un servicio de nodos, centraliza el aspecto infraestructural de su producto. Por este motivo, los proyectos que se basan en la descentralización como uno de sus puntos fuertes quizá prefieran utilizar nodos autoalojados que externalizarlos a un tercero.

Obtenga más información aquí sobre [las ventajas de ejecutar su propio nodo](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servicios de nodos populares {#popular-node-services}

A continuación se incluye una lista con algunos de los proveedores de nodos de Ethereum más populares. Si nota que falta alguno, puede añadirlo. Cada servicio de nodos ofrece diferentes beneficios y características, además de niveles gratuitos o de pago. Te recomendamos que investigues cuáles se adaptan mejor a tus necesidades antes de tomar una decisión.

- [**Alchemy**](https://alchemy.com/)
  - [Documentos](https://docs.alchemyapi.io/)
  - Características
    - El mayor nivel gratis con un cómputo de 300 millones de unidades al mes (~30M getLatestBlock requests)
    - Compatibilidad multicadena para Polygon, Starknet, Optimism, Arbitrum
    - Funciona con ~70 % de las mayores DApps de Ethereum y volumen de transacciones de DeFi
    - Alertas de Webhooks en tiempo real a través de las notificaciones de Alchemy
    - Estabilidad/Fiabilidad y mejor compatibilidad en su categoría
    - API NFT de Alchemy
    - Panel de control con Explorador de Solicitudes, Mempool Watcher y Composer
    - Acceso intregrado a un grifo de red de pruebas
    - Comunidad constructora activa en Discord con 18.000 usuarios
- [**All That Node**](https://allthatnode.com/)
  - [Documentos](https://docs.allthatnode.com/)
  - Características
    - Nivel gratuito más grande con 150.000 peticiones diarias
    - Acceso a más de 24 nodos de la cadena de bloques
    - Terminales de conexión RPC, HTTPS y WSS
    - Acceso ilimitado a datos de archivos
    - Soporte 24/7 y un tiempo de actividad superior al 99,9 %
    - Grifo (faucet) disponible en múltiples cadenas
    - Acceso ilimitado a terminales con un número ilimitado de claves API
    - Trazado/Depuración de espacio de nombres disponible
    - Actualizaciones automáticas
    - Soporte técnico
- [**Ankr**](https://www.ankr.com/)
  - [Documentos](https://docs.ankr.com/)
  - Características
    - Protocolo Ankr: acceso abierto a los puntos de conexión de la API RPC pública para más de ocho cadenas.
    - Carga del saldo y supervisión del estado del nodo como pasarela rápida y segura al nodo disponible más cercano.
    - Nivel prémium que habilita el punto de conexión WSS y límite de tasa ilimitado
    - Despliegue de nodo completo y validador para más de 40 cadenas en un solo clic.
    - Escalabilidad en función del uso
    - Herramientas de análisis
    - Panel de control
    - Puntos de conexión RPC, HTTPS y WSS
    - Asistencia directa
- [**Blast**](https://blastapi.io/)
  - [Documentos](https://docs.blastapi.io/)
  - Características
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
  - [Documentos](https://ubiquity.docs.blockdaemon.com/)
  - Beneficios
    - Tablero
    - Base por nodo
    - Analíticas
- [**BlockPI**](https://blockpi.io/)
  - [Documentación](https://docs.blockpi.io/)
  - Características
    - Estructura de nodos distriduida & robusta
    - Puntos de conexión RPC, HTTPS y WSS
    - Paquete de registro gratuito y abono mensual
    - Método de trazabilidad + Soporte de datos de archivos
    - Paquetes con una validez de hasta 90 días
    - Plan personalizado y pago en función del uso
    - Pagar en cripto
    - Soporte directo & Soporte técnico
- [**Chainstack**](https://chainstack.com/)
  - [Documentos](https://docs.chainstack.com/)
  - Características
    - Nodos compartidos libres
    - Nodos de archivo compartidos
    - Compatible con GraphQL
    - Terminales de conexión RPC y WSS
    - Nodos dedicados completos y de archivo
    - Sincronización rápida para los despliegues dedicados
    - Traiga su nube (Bring Your Own Cloud o BYOC)
    - Precio por hora
    - Soporte directo 24/7
- [**DataHub**](https://datahub.figment.io)
  - [Documentos](https://docs.figment.io/)
  - Características
    - Opción de categoría gratuita con 3.000.000 sol/mes
    - Puntos de conexión RPC y WSS
    - Nodos dedicados completos y de archivo
    - Escalabilidad automática (descuentos por volumen)
    - Datos de archivo gratuitos
    - Analíticas de servicio
    - Panel
    - Soporte directo 24/7
    - Pago en criptomonedas (para empresas)
- [DRPC](https://drpc.org/)
  - [Documentos](https://docs.drpc.org/)
  - Características
    - Nodos RPC descentralizados
    - Proveedores de más de 15 nodos
    - Saldo del nodo
    - Unidades de cómputo ilimitadas al mes en la categoría gratuita
    - Verificación de datos
    - Terminales personalizados
    - Terminales HTTP y WSS
    - Claves ilimitadas (gratuitas y de pago)
    - Opciones de retroceso flexible
    - [Extremo público](https://eth.drpc.org)
    - Nodos de archivos compartidos libres
- [**GetBlock**](https://getblock.io/)
  - [Documentos](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Características
    - Acceso a más de 40 nodos de la cadena de bloques
    - 40.000 solicitudes gratuitas diarias
    - Número ilimitado de claves de API
    - Alta velocidad de conexión a 1 GB/s
    - Trazabilidad + Archivado
    - Analíticas avanzadas
    - Actualizaciones automáticas
    - Soporte técnico
- [**InfStones**](https://infstones.com/)
  - Características
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
  - [Documentos](https://infura.io/docs)
  - Características
    - Opción de nivel gratuito
    - Escalabilidad en función del uso
    - Datos de archivo de pago
    - Soporte directo
    - Panel de control
- [**Kaleido**](https://kaleido.io/)
  - [Documentos](https://docs.kaleido.io/)
  - Características
    - Categoría de inicio gratuita
    - Despliegue de nodo de Ethereum en un clic
    - Clientes y algoritmos personalizables (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - Más de 500 API administrativas y de servicio
    - Interfaz RESTful para envío de transacciones de Ethereum (Apache Kafka respaldado)
    - Flujos salientes para la entrega del evento (Apache Kafka respaldado)
    - Colección exhaustiva de servicios auxiliares y «fuera de cadena» (por ejemplo, transporte bilateral de mensajes cifrados)
    - Incorporación de la red sencilla con gobernanza y control de acceso basado en funciones
    - Gestión sofisticada de usuarios tanto para administradores como para usuarios finales
    - Infraestructura altamente escalable, resistente y de grado empresarial
    - Gestión de claves privadas HSM en la nube
    - Tethering en la red principal Ethereum
    - ISO 27k y SOC 2, Certificaciones de tipo 2
    - Configuración dinámica de tiempo de ejecución (por ejemplo, añadiendo integraciones en la nube, alterando entradas de nodos, etc.)
    - Compatible con multinube, multiregión y modelos de despliegue híbrido
    - Precios simples por hora basados en tasación SaaS
    - Soporte 24/7 y SLA
- [**Lava Network**](https://www.lavanet.xyz/)
  - [Documentos](https://docs.lavanet.xyz/)
  - Características
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
  - Características
    - Nodos compartidos libres
    - Nodos de archivos compartidos libres
    - Enfoque centrado en la privacidad (sin políticas de registros)
    - Compatibilidad con la cadena cruzada
    - Escalabilidad en función del uso
    - Panel de control
    - SDK exclusivo de Ethereum
    - Terminales de conexión de API exclusivas
    - Soporte técnico directo
- [**MegaNode de NodeReal**](https://nodereal.io/)
  - [Documentos](https://docs.nodereal.io/nodereal/meganode/introduction)
  - Características
    - Servicios de API RPC de confianza, rápidos y escalables
    - API mejorada para desarrolladores de Web3
    - Compatibilidad con multicadena
    - Comience gratis
- [**NOWNodes**](https://nownodes.io/)
  - [Documentos](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Características
    - Acceso a más de 50 nodos de la cadena de bloques
    - Clave API gratuita
    - Exploradores de bloques
    - Tiempo de respuesta de la API ⩽ 1 seg
    - Equipo de Soporte 24/7
    - Gestor de cuentas personales
    - Copias de seguridad, archivos, documentos compartidos y nodos dedicados
- [**Pocket Network**](https://www.pokt.network/)
  - [Documentos](https://docs.pokt.network/home/)
  - Características
    - Protocolo RPC descentralizado y mercado
    - 1 millón de solicitudes por día en la categoría gratuita (por terminal, máx. 2)
    - [Terminales públicas](https://docs.pokt.network/developers/public-endpoints)
    - Programa Pre-Stake+ (si necesita más de 1 millón de solicitudes por día)
    - Compatibilidad con más de 15 cadenas de bloques
    - Más de 6.400 nodos que generan Pocket Network (POKT) por alojar aplicaciones
    - Nodo de archivo, nodo de archivo con trazabilidad, & Compatibilidad con el nodo de la red de prueba
    - Diversidad de clientes para nodos de red principal de Ethereum
    - Ningún punto único de error
    - Sin tiempo de inactividad
    - Economía de tókenes (Tokenomics) rentable cercana a cero (una participación de POKT para el ancho de banda de red)
    - Ningún coste mensual irrecuperable, convierta su infraestructura en un activo
    - Equilibrio de carga incluido en el protocolo
    - Escale infinitamente el número de solicitides por día y nodos por hora en función del uso
    - La opción más privada y resistente a la censura
    - Soporte práctico para desarrolladores
    - [Portal Pocket](https://bit.ly/ETHorg_POKTportal): panel de control y analíticas
- [**QuickNode**](https://www.quicknode.com)
  - [Documentos](https://www.quicknode.com/docs/)
  - Características
    - Soporte técnico 24/7 & desarrollo de la comunidad de Discord
    - Geoequilibrado, multinube/metal, red de baja latencia
    - Compatibilidad con multicadena (Optism, Arbitrum, Poligon + otros 11)
    - Capas intermedias para velocidad & estabilidad (enrutamiento de reuniones, caché, indexación)
    - Supervisión de contratos inteligentes a través de Webhooks
    - Panel de control intuitivo, suite de analíticas, compositor de RPC
    - Funciones de seguridad avanzadas (JWT, ocultación, elaboración de lista blanca)
    - API de analíticas y datos de NFT
    - [Certificado SOC2](https://www.quicknode.com/security)
    - Adecuado para desarrolladores y empresas
- [**Rivet**](https://rivet.cloud/)
  - [Documentos](https://rivet.readthedocs.io/en/latest/)
  - Características
    - Opción de nivel gratuito
    - Escalabilidad en función del uso
- [**SenseiNode**](https://senseinode.com)
  - [Documentos](https://docs.senseinode.com/)
  - Características
    - Nodos dedicados y compartidos
    - Panel de control
    - Alojamiento fuera de AWS en múltiples proveedores de alojamiento por diferentes ubicaciones en América Latina
    - Clientes Prism y Lighthouse
- [**SettleMint**](https://console.settlemint.com/)
  - [Documentos](https://docs.settlemint.com/)
  - Características
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
- [**Antiguamente**](https://tenderly.co/web3-gateway)
  - [Documentos](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Características
    - Categoría gratuita que incluye 25 millones de unidades Tenderly por mes
    - Acceso libre a datos históricos
    - Carga de flujos de trabajo con mucho texto de lectura hasta 8 veces más rápidas
    - Acceso a la lectura 100 % coherente
    - Puntos finales RPC JSON
    - Constructor de solicitudes RPC basado en la interfaz y vista previa de las solicitudes
    - Estrechamente incorporado en las herramientas de desarrollo, depuración y pruebas de Tenderly
    - Simulaciones de transacciones
    - Analíticas de uso y filtrado
    - Cómoda y sencilla gestion de claves de acceso
    - Soporte de ingeniería dedicado por chat, correo electrónico y Discord
- [**Watchdata**](https://watchdata.io/)
  - [Documentos](https://docs.watchdata.io/)
  - Características
    - Fiabilidad de datos
    - Conexión ininterrumpida sin tiempos de inactividad
    - Automatización de procesos
    - Tarifas gratuitas
    - Límites elevados que se adaptan a cualquier usuario
    - Compatibilidad con varios nodos
    - Escalabilidad de recursos
    - Velocidades de procesamiento altas
- [**ZMOK**](https://zmok.io/)
  - [Documentos](https://docs.zmok.io/)
  - Características
    - Se ejecuta como un servicio
    - Transacciones globales como zona de espera con métodos de búsqueda/filtrado
    - Tarifa ilimitada de transacciones y gas infinito por enviar transacciones
    - El más rápido del nuevo bloque en obtener y leer la cadena de bloques
    - El mejor precio por garantía de llamada API
- [**Chainbase**](https://www.chainbase.com/)
  - [Documentos](https://docs.chainbase.com)
  - Características
    - Servicio de RPC de alta disponibilidad, velóz y escalable
    - Compatibilidad con multicadena
    - Tarifas gratuitas
    - Panel de control sencillo para el usuario
    - Proporciona servicios de datos de la cadena de bloques más allá de RPC

[**Zeeve**](https://www.zeeve.io/)

- [Documentos](https://www.zeeve.io/docs/)
- Características
  - Plataforma de automatización sin código de grado empresarial que proporciona implementación, supervisión y gestión de nodos y redes de la cadena de bloques.
  - Compatibilidad con más de 30 protocolos & integraciones, entre otras funciones
  - Servicios de infraestructura Web3 de valor añadido como el almacenamiento descentralizado, la identidad descentralizada y API de datos de la cadena de bloques del libro mayor para casos de uso en el mundo real
  - El soporte 24/7 y el seguimiento proactivo garantizan el buen estado de los nodos todo el tiempo.
  - Las terminales RPC ofrecen acceso autenticado a la API, gestión libre de problemas con un panel de control intuitivo y analíticas.
  - Proporciona tanto una nube gestionada, como opciones de nuebe propias de libre elección y es compatible con los principales proveedores de nube, como AWS, Azure, Google Cloud, Digital Ocean y en las instalaciones.
  - Utilizamos el enrutamiento inteligente para elegir siempre el nodo más cercano a su usuario

[**Vista de token**](https://services.tokenview.io/)

- [Documentos](https://services.tokeniew/docs?type=nodeService)
- Características
  - Soporte técnico 24/7 & comunidad de desarrolladores en Telegram
  - Compatibilidad con multicadena (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
  - Las terminales RPC y WSS están abiertas para su uso
  - Acceso ilimitado para archivar datos API
  - Panel de control con explorador de solicitudes y Mempool Watcher
  - API de datos NFT y notificaciones Webhook
  - Pago con criptomoneda
  - Soporte externo para requisitos de comportamiento adicionales

## Más información {#further-reading}

- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)

## Temas relacionados {#related-topics}

- [ Nodos y clientes](/developers/docs/nodes-and-clients/)

## Tutoriales relacionados {#related-tutorials}

- [Primeros pasos con el desarrollo de Ethereum usando Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guía para enviar transacciones usando Web 3.0 y Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
