---
title: Empresa en la red principal de Ethereum
description: Guías, artículos y herramientas sobre aplicaciones empresariales en la cadena de bloques pública de Ethereum
lang: es
---

# Red principal de Ethereum para empresas {#ethereum-for-enterprise}

Las aplicaciones de cadenas de bloques ayudan a los negocios:

- Incrementando la confianza mientras reducen los gastos de coordinación entre las partes implicadas en el negocio.
- Mejorando la confiabilidad de la red de negocios y la eficiencia operacional.
- Construyendo nuevos modelos de negocio y oportunidades de creación de valor.
- Asegurando una organización competitiva a prueba de todo futuro.

Las aplicaciones de cadenas de bloques empresariales se pueden crear en la [red principal](/glossary/#mainnet), pública sin permisos, o en cadenas de bloques privadas que están basadas en tecnología de Ethereum. Más información en [cadenas privadas de Ethereum para empresa](/enterprise/private-ethereum/).

## Ethereum público frente a privado {#private-vs-public}

Solo existe una red principal pública de Ethereum. Las aplicaciones creadas en la red principal son capaces de interoperar. De forma similar a cómo lo haría una aplicación creada en Internet, pueden conectarse con otras e impulsar así el potencial completo de la cadena de bloques descentralizada.

Muchos negocios y consorcios han implementado cadenas privadas con permisos para aplicaciones específicas basadas en la tecnología de Ethereum.

### Principales diferencias {#key-differences}

- Seguridad/Inmutabilidad de la cadena de bloques: la resistencia de la cadena a la manipulación está determinada por su algoritmo de consenso. La red principal de Ethereum está asegurada por la interacción de miles de nodos independientes ejecutados por individuos y mineros alrededor del mundo. Las cadenas privadas suelen tener un pequeño número de nodos controlados por una o varias organizaciones. Esos nodos se pueden controlar rigurosamente, pero solo unos pocos deben estar comprometidos para reescribir la cadena o cometer transacciones fraudulentas.
- Rendimiento: Como las cadenas privadas de Enterprise Ethereum pueden usar nodos de alto rendimiento con requisitos especiales de hardware y diferentes algoritmos de consenso como prueba de autoridad, pueden lograr una transacción más alta a través de la capa base (capa 1). En la red principal de Ethereum, se puede lograr un alto rendimiento con el uso de [soluciones de escala de capa 2](/developers/docs/scaling/#layer-2-scaling).
- Coste: el coste de operar una cadena privada se refleja principalmente en la mano de obra necesaria para instalar y gestionar la cadena, así como en los servidores para ejecutarla. Aunque no hay coste para conectarse a la red principal de Ethereum, sí que hay un coste de gas por cada transacción que se debe pagar en Ether. Se están desarrollando repetidores de transacciones (conocidos como estaciones de gas) con el objeto de eliminar la necesidad de que los usuarios finales e incluso las empresas utilicen directamente Ether en sus transacciones. Algunos [análisis](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) han demostrado que el coste total de operación de una aplicación puede ser menor en la red principal que ejecutar una cadena privada.
- Permiso del nodo: solo los nodos autorizados pueden unirse a cadenas privadas. Cualquiera puede configurar un nodo en la red principal de Ethereum.
- Privacidad: El acceso a los datos escritos en cadenas privadas puede ser controlado restringiendo el acceso a la red, y sobre una base más fina con controles de acceso y transacciones privadas. Todos los datos escritos en la capa 1 de red principal son visibles para cualquier persona, por lo que la información sensible debe ser almacenada y transmitida fuera de la cadena, o cifrada. Están surgiendo patrones de diseño que facilitan esto (p. ej., Baseline, Aztec), así como soluciones de capa 2 que pueden mantener los datos compartimentados y fuera de la capa 1.

### Por qué construir en la red principal de Ethereum {#why-build-on-ethereum-mainnet}

Las empresas han estado experimentando con tecnología de cadena de bloques desde 2016, cuando se lanzaron los proyectos Hyperledger, Quorum y Corda. El foco se centró en gran medida en las cadenas de bloques privadas empresariales. Sin embargo, a partir de 2019 ha habido un cambio en el pensamiento sobre las cadenas de bloques públicas frente a las privadas para aplicaciones de negocios. Una [encuesta](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) realizada por Forrester reveló que "Los encuestados... ven este potencial, ya que un 75 % afirma que es posible que en el futuro se aprovechen las ventajas de las blockchain públicas, y casi un tercio indica que es algo muy probable”. Paul Brody, de EY, [habló](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) sobre los beneficios de construir en una cadena de bloques pública, que (según la aplicación) puede incluir mayor seguridad o inmutabilidad, más transparencia, menos coste total de propiedad y la capacidad de interactuar con todas las demás aplicaciones que también están en la red principal (efectos de red). Compartir un marco común de referencia entre las empresas evita la creación innecesaria de numerosos silos aislados que no pueden comunicarse y compartir o sincronizar información entre sí.

Otro avance que está desplazando el foco de atención hacia las cadenas de bloques públicas es una [capa 2](/developers/docs/scaling/#layer-2-scaling). La capa 2 es principalmente una categoría de tecnología de escalabilidad que hace posibles aplicaciones de alto rendimiento en cadenas públicas. Sin embargo, las soluciones de la capa 2 también pueden [abordar algunos de los otros desafíos que han llevado a los desarrolladores de empresas a elegir cadenas privadas en el pasado](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

## Recursos del desarrollador de empresa {#enterprise-developer-resources}

### Organizaciones {#organizations}

Diferentes organizaciones han emprendido iniciativas de colaboración para que Ethereum sea fácil de usar:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) El EEA permite a las organizaciones adoptar y utilizar la tecnología de Ethereum en sus operaciones diarias. Permite al ecosistema de Ethereum desarrollar nuevas oportunidades de negocio e impulsar la adopción de la industria, así como aprender y colaborar entre sí. El grupo de trabajo de la red principal de la EEA está enfocado hacia los representantes de negocios que estén interesados en construir sobre la red principal pública de Ethereum, así como también hacia los miembros de la comunidad de Ethereum que quieran apoyarlos.
- [Proyecto abierto Ethereum OASIS](https://github.com/ethereum-oasis/oasis-open-project) El proyecto abierto Ethereum OASIS es un proyecto abierto OASIS que existe para proporcionar un foro neutral dedicado a diversas partes interesadas para crear especificaciones de alta calidad que faciliten la longevidad de Ethereum, su interoperabilidad y su facilidad de integración. El proyecto pretende desarrollar estándares claros y abiertos, documentación de alta calidad y conjuntos de pruebas compartidos que faciliten nuevas características y mejoras al protocolo de Ethereum.
- [Proyecto Baseline](https://www.baseline-protocol.org/) El protocolo Baseline es una iniciativa de código abierto que combina avances en criptografía, mensajería y cadena de bloques para entregar procesos comerciales seguros y privados, a bajo coste, a través de la red principal pública de Ethereum. El protocolo permite realizar una colaboración confidencial y compleja entre empresas sin dejar ningún dato sensible en cadena. El proyecto Baseline es un subproyecto del proyecto abierto Ethereum OASIS y está coordinado por el Comité Directivo Técnico de Baseline.

### Productos y servicios {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _proporciona servicios y herramientas de API para crear y monitorear aplicaciones en Ethereum_
- [Blast](https://blastapi.io/)_es una plataforma API que proporciona API RPC/WSS para la red principal del archivo de Ethereum y redes de prueba._
- Implementación de [blockapps](https://blockapps.net/) _ del protocolo de Ethereum para empresas, herramientas y API, que forman la plataforma STRATO._
- [Chainstack](https://chainstack.com/) _es la red principal y red de prueba Ethereum alojada en & nubes públicas aisladas de clientes._
- [ConsenSys](https://consensys.net/) _proporciona una gama de productos y herramientas para construir en Ethereum, así como servicios de asesoramiento y desarrollo personalizado._
- [Envision Blockchain](https://envisionblockchain.com/) _proporciona servicios de consultoría y desarrollo enfocados a empresas, especializándose en la red principal de Ethereum._
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _proporciona un flujo de trabajo de compras mediante la emisión de RFQ, contratos, órdenes de compra y facturas a través de su red de socios comerciales de confianza._
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _ es un cliente Ethereum de código abierto enfocado en empresas, desarrollado bajo licencia Apache 2.0 y escrito en Java._
- [Infura:](https://infura.io/) _acceso API escalable a las redes Ethereum e IPFS._
- [Kaleido](https://kaleido.io/) _una plataforma empresarial, centrada en el desarrollo que ofrece aplicaciones de cadena de bloques simplificadas y activos digitales._
- [NodeReal](https://nodereal.io/) _proporciona una infraestructura de cadena de bloque escalable, a la par que es proveedora de servicios API para el ecosistema Web3._
- [Proporciona](https://provide.services/) _infraestructura y API para aplicaciones Enterprise Web3._
- [QuickNode](https://www.quicknode.com/) _proporciona nodos fiables y rápidos con API de alto nivel, como la API NFT, la API de Token, etc., y ofrece al mismo tiempo una suite de productos unificada y soluciones de calidad superior._
- [Tenderly](https://tenderly.co) _es una plataforma de desarrollo Web3 que proporciona bloques de construcción de infraestructura y de depuración, observabilidad para desarrollar, probar, monitorear y ejecutar contratos inteligentes._
- [Unibright](https://unibright.io/) _es un equipo de especialistas en cadenas de bloques, arquitectos, desarrolladores y consultores con más de 20 años de experiencia en procesos de negocio e integración._
- [Zero Services GmbH](https://www.zeroservices.eu/) _es un proveedor de servicios administrados, distribuidos por coubicaciones en Europa y Asia. Funciona & supervisa sus nodos de forma segura y confiable_
- [Zeeve](https://www.zeeve.io/) _proporciona una gama de productos y herramientas para construir en Ethereum, así como infraestructura y API para aplicaciones Web3 para empresas._

### Herramientas y bibliotecas {#tooling-and-libraries}

- [Alethio:](https://explorer.aleth.io/) _plataforma de análisis de datos de Ethereum_
- [Sirato](https://www.web3labs.com/sirato)_es una plataforma de datos y análisis para redes públicas y privadas de Web3 Labs compatibles con Ethereum._
- [Ernst & Nightfall's "Nightfall"](https://github.com/EYBlockchain/nightfall) _: un conjunto de herramientas para realizar transacciones privadas_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _: una aplicación de firmado de transacción para utilizarse con un proveedor de web3_
- [Anteriormente](https://tenderly.co/) _era una plataforma de datos que proporciona análisis en tiempo real, alertas y monitoreo con soporte para redes privadas._
- [Truffle Suite:](https://trufflesuite.com) _suite de desarrollo de cadena de bloques (Truffle, Ganache, Drizzle)_

### Soluciones de escalabilidad {#scalability-solutions}

[Capa 2](/layer-2) es un conjunto de tecnologías o sistemas que se ejecuta en Ethereum (Capa 1), hereda propiedades de seguridad de Capa 1, proporciona una mayor capacidad de procesamiento de transacciones (rendimiento), reduce las comisiones de transacción (costes operativos) y acelera las confirmaciones de las transacciones con respecto a Capa 1. Las soluciones de escalabilidad de Capa 2 están aseguradas mediante Capa 1, no obstante permiten a las aplicaciones de cadena de bloques manejar muchos más usuarios o acciones o datos de los que la Capa 1 podría alojar. Muchos de ellos aprovechan recientes avances en criptografía y pruebas de conocimiento cero (ZK) para maximizar el desempeño y la seguridad.

Crear su aplicación apoyándose en la solución de escalabilidad de Capa 2 puede ayudarle [a abordar muchas de las preocupaciones que anteriormente han motivado a las empresas a construir sobre cadenas de bloques privadas](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), sin perder las ventajas que supone construir en una red principal.

## Aplicaciones empresariales en vivo en la red principal {#enterprise-live-on-mainnet}

Estas son algunas de las aplicaciones empresariales que se han apoyándose en la red principal pública de Ethereum:

### Pagos {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _paga a los usuarios por ver los anuncios y los usuarios pueden pagar a los editores para que les apoyen mediante el token de atención básica._
- [hCaptcha](https://www.hcaptcha.com/) _El sistema CAPTCHA de prevención de bots paga a los operadores del sitio web a cambio del trabajo realizado por los usuarios a la hora de etiquetar datos para el aprendizaje automático. Actualmente lo implementa Cloudflare._
- [EthereumAds](https://ethereumads.com/) _permite a los operadores del sitio web vender espacio de publicidad y recibir pagos vía Ethereum._

### Finanzas {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _ es una entidad de emisión de bonos y liquidación._
- [Société Générale](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _emite bonos._
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _realiza ofertas de bonos y tokenización para marcas FAT._
- [Sila](https://silamoney.com/)_es una infraestructura de servicios bancarios y pagos ACH, que utiliza una moneda estable._
- [Taurus](https://www.taurushq.com/) _emite valores tokenizados._

### Tokenización de activos {#tokenization}

- [Tinlake](https://tinlake.centrifuge.io/) _recibe financiación mediante activos tokenizados del mundo real como facturas, hipotecas o recaudaciones por derechos de autor en retransmisiones._
- [RealT](https://realt.co/) _Los inversores de todo el mundo pueden comprar en el mercado inmobiliario estadounidense a través de una propiedad completamente compatible, fraccionada y tokenizada._
- [AgroToken](https://agrotoken.io/en/) _tokenizar y comerciar con productos agrícolas._
- [Fasset](https://www.fasset.com/) _es una plataforma para apoyar la infraestructura sostenible._

### Notarización de datos {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _los detalles de los préstamos finalizados se cifran y se registran en la red principal._
- [La integridad de los datos de Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _se puede garantizar escribiendo periódicamente el código de los datos indexados a la red principal._
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _es la agencia de noticias más grande de Italia, lucha contra noticias falsas y permite a los lectores verificar el origen de las noticias registrándolas en la red principal._
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _registra comunicados de prensa en Ethereum para asegurar la responsabilidad corporativa y la confianza._
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _registra la procedencia y el historial de reparación de relojes en Ethereum._
- [EthSign](https://ethsign.xyz/) _registros firmados de documentos electrónicos en la cadena de bloques de Ethereum._

### Cadena de suministro {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _es la factura de embarque y proveedor de transferencia de documentos._
- [Morfeo. network](https://morpheus.network/) _es una plataforma de automatización de cadena de suministro que implementa un híbrido de cadenas privadas con datos notariados en la red principal de Ethereum. La utilizan empresas como el distribuidor canadiense de alimentos, petróleo y gas Federated Co-op Ltd. y el proveedor argentino de comida para animales domésticos Vitalcan._
- [Minespider](https://www.minespider.com/) _se encarga del seguimiento de la cadena de suministro._
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _proporciona un flujo de trabajo de compras mediante la emisión de RFQ, contratos, órdenes de compra y facturas a través de su red de socios comerciales de confianza._
- [Treum](https://treum.io/) _ofrece transparencia, trazabilidad y comerciabilidad para cadenas de suministro mediante la tecnología de cadena de bloques._
- [TradeTrust](https://www.tradetrust.io/) _verifica facturas electrónicas de Lading (eBLs) para envío internacionales._
- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _acuña NFT por cada nuevo lote de cerveza, lo que permite una mayor visibilidad y eficiencia en toda su cadena de suministros._

### Seguros {#insurance}

- [Arbol](https://www.arbolmarket.com/) _seguro paramétrico para cubrir los riesgos meteorológicos._
- [Etherisc](https://etherisc.com/) _seguro descentralizado para una variedad de riesgos._

### Credenciales y certificaciones {#credentials}

- [Los títulos digitales de dos centros de secundaria italianos](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _se emitieron en la red principal de Ethereum._
- [Proyecto piloto de la Universidad de St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _para verificar las titulaciones mediante una universidad suiza_
- [Credenciales Hyland](https://www.hylandcredentials.com)_diplomas digitales y otros credenciales, licencias y certificados educativos._
- [OpenCerts](https://opencerts.io/faq) _emite credenciales académicos de la cadena de bloques en Singapur._
- [BlockCerts](https://www.blockcerts.org/) _ha desarrollado un estándar abierto para credenciales de la cadena de bloques._

### Utilidades {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _pagos de electricidad_

Si desea añadir información a esta lista, consulte las [instrucciones para contribuir](/contributing/).
