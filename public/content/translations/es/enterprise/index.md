---
title: Empresa en la red principal de Ethereum
description: Guías, artículos y herramientas sobre aplicaciones empresariales en la cadena de bloques pública de Ethereum
lang: es
---

# Ethereum para empresas {#ethereum-for-enterprise}

Ethereum puede ayudar a muchos tipos de empresas, incluidas las grandes empresas:

- Incrementando la confianza mientras reducen los gastos de coordinación entre las partes implicadas en el negocio.
- Mejorando la confiabilidad de la red de negocios y la eficiencia operacional.
- Construyendo nuevos modelos de negocio y oportunidades de creación de valor.
- Asegurando una organización competitiva a prueba de todo futuro.

Las aplicaciones de cadenas de bloques empresariales se pueden crear en la [red principal](/glossary/#mainnet), pública sin permisos, o en cadenas de bloques privadas que están basadas en tecnología de Ethereum. Más información en [cadenas privadas de Ethereum para empresa](/enterprise/private-ethereum/).

## Ethereum público frente a privado {#private-vs-public}

Solo existe una red principal pública de Ethereum. Las aplicaciones creadas en la red principal son capaces de interoperar. De forma similar a cómo lo haría una aplicación creada en Internet, pueden conectarse con otras e impulsar así el potencial completo de la cadena de bloques descentralizada.

Muchas empresas y consorcios han implementado cadenas de bloques privadas y permisionadas basadas en la tecnología de Ethereum, para aplicaciones específicas.

### Principales diferencias {#key-differences}

- Seguridad/Inmutabilidad de la cadena de bloques: la resistencia de la cadena a la manipulación está determinada por su algoritmo de consenso. La red principal de Ethereum está asegurada por la interacción de miles de nodos independientes ejecutados por individuos y mineros alrededor del mundo. Las cadenas privadas suelen tener un pequeño número de nodos controlados por una o varias organizaciones. Esos nodos se pueden controlar rigurosamente, pero solo unos pocos deben estar comprometidos para reescribir la cadena o cometer transacciones fraudulentas.
- Rendimiento: Como las cadenas privadas de Enterprise Ethereum pueden usar nodos de alto rendimiento con requisitos especiales de hardware y diferentes algoritmos de consenso como prueba de autoridad, pueden lograr una transacción más alta a través de la capa base (capa 1). En la red principal de Ethereum, se puede lograr un alto rendimiento con el uso de [soluciones de escalado de capa 2](/layer-2).
- Coste: el coste de operar una cadena privada se refleja principalmente en la mano de obra necesaria para instalar y gestionar la cadena, así como en los servidores para ejecutarla. Si bien no hay ningún costo para conectarse a la red principal de Ethereum, hay un costo de gas por cada transacción que debe pagarse en Ether. Los retransmisores de metatransacciones pueden eliminar la necesidad de que los usuarios finales e incluso las empresas mantengan y utilicen directamente el ether en sus transacciones. Algunos [análisis](https://theblockchaintest.com/uploads/resources/EY%20-%20Total%20cost%20of%20ownership%20for%20blockchain%20solutions%20-%202019%20-%20Apr.pdf) han demostrado que el costo total para operar una aplicación puede ser menor en la red principal que en el funcionamiento de una cadena privada.
- Permiso del nodo: solo los nodos autorizados pueden unirse a cadenas privadas. Cualquiera puede configurar un nodo en la red principal de Ethereum.
- Privacidad: El acceso a los datos escritos en cadenas privadas puede ser controlado restringiendo el acceso a la red, y sobre una base más fina con controles de acceso y transacciones privadas. Todos los datos escritos en la capa 1 de red principal son visibles para cualquier persona, por lo que la información sensible debe ser almacenada y transmitida fuera de la cadena, o cifrada. Están surgiendo patrones de diseño que facilitan esto (por ejemplo, Baseline, Nightfall), así como soluciones de Capa 2 que pueden mantener los datos compartimentados y fuera de la Capa 1.

### Por qué construir en la red principal de Ethereum {#why-build-on-ethereum-mainnet}

Un beneficio clave de las cadenas de bloques públicas para las empresas es la resistencia del monopolio. El uso de la red principal de Ethereum como árbitro neutral para coordinar transacciones comerciales evita poner su confianza en otra empresa, sobre la que sus competidores pueden ganar control o influencia, lo que lo pone en desventaja. En una plataforma abierta, sin autorización y decentralizada que cualquiera pueda unirse, usar y contribuir, no hay una autoridad central que pueda usar su poder para tomar ventaja sobre ti.

Las empresas han estado experimentando con tecnología de cadena de bloques desde 2016, cuando se lanzaron los proyectos Hyperledger, Quorum y Corda. Inicialmente el foco fue en gran parte en cadenas de bloques empresariales que permiten la privatización, pero comenzando el 2019 hubo un cambio en el pensamiento acerca de cadenas de bloques publicas versus privadas para aplicaciones de negocios. EY’s Paul Brody tiene [ donde ](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) habla acerca de los beneficios de construir en cadenas de bloques publicas (versus privadas), que (dependiendo de la aplicación) puede incluir seguridad/inmutabilidad más fuerte, transparencia, costos de propiedad más bajos, y la habilidad de interoperar con todas las otras aplicaciones que también están en la red principal (efectos de red). Compartir un marco común de referencia entre las empresas evita la creación innecesaria de numerosos silos aislados que no pueden comunicarse y compartir o sincronizar información entre sí.

Otro desarrollo el cual esta cambiendo el enfoque hacía las cadenas de bloques públicas es [Capa 2](/layer-2). La capa 2 es principalmente una categoría de tecnología de escalabilidad que hace posibles aplicaciones de alto rendimiento en cadenas públicas. Sin embargo, las soluciones de la capa 2 también pueden [abordar algunos de los otros desafíos que han llevado a los desarrolladores de empresas a elegir cadenas privadas en el pasado](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

## Recursos {#enterprise-resources}

### Más información {#further-reading}

Recursos no técnicos para poder entender como los negocios se pueden beneficiar de Ethereum

- [El reporte de preparación de negocios en alianza con la empresa Ethereum 2023](https://entethalliance.org/eea-ethereum-business-readiness-report-2023/) - _encuesta el potencial y las capacidades del Ethereum público y el ecosistema más amplio de Ethereum para negocios_
- [_Ethereum para Negocios_ por Paul Brody](https://www.uapress.com/product/ethereum-for-business/) - _es una guía en inglés simple para los casos de uso que generan retornos del manejo de activos para pagos para suplir las cadenas_

### Organizaciones {#organizations}

Diferentes organizaciones han emprendido iniciativas de colaboración para que Ethereum sea fácil de usar

- [Alianza de la empresa Ethereum](https://entethalliance.org/) - La EEA ayuda a las organizaciones a adoptar y usar tecnología de Ethereum en sus operaciones de negocio diarias. Su meta es acelerar el negocio de Ethereum a través de ayuda profesional y comercial, abogar e investigar, desarrollos estándar y servicios de confianza del ecosistema.
- [Consejo de negocios global de cadena de bloques](https://www.gbbc.io/) - La GBBC en una industria asociada por el ecosistema de tecnología de la cadena de bloques. A través del compromiso de los responsables de las pólizas y los reguladores, creando eventos y discusiones a profundidad, y haciendo investigaciones, GBBC está dedicado a más adopción de la cadena de bloques para crear más seguridad, equidad y sociedades funcionales.


## Recursos del desarrollador de empresa {#enterprise-developer-resources}

### Productos y servicios {#products-and-services}

- [4EVERLAND](https://www.4everland.org/) - _provides APIs, RPC services and tools for hosting decentralized applications and enabling decentralized storage on Ethereum_
- [Alchemy](https://www.alchemy.com/) - _provee servios de API y herramientas para crear y monitorear aplicaciones en Ethereum_
- [Blast](https://blastapi.io/) - _una plataforma API que provee API's RPC/WSS para la red principal de archivos de Ethereum y redes de prueba._
- [Blockapps](https://blockapps.net/) - _implementación del protocolo de la empresa Ethereum, herramientas y API que forman la plataforma STRATO_
- [Chainstack](https://chainstack.com/) - _la infraestructura de Ethereum de la red principal y la red de prueba que alojan en público & nubes de clientes isolados_
- [ConsenSys](https://consensys.io/) - _provee un rango de productos y herramientas para construir en Ethereum, al igual que consultar y customizar servicios de desarrollos_
- [Visión de la cadena de bloques](https://envisionblockchain.com/) - _ provee consultas enfocadas en empresas y especialización en servicios de desarrollo en la red principal de Ethereum_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) - _provee un flujo de trabajo procurador usando RFQ's, contratos, ordenes de compras, y recibos a través de la red de compañeros de trabajo de confianza_
- [Hyperledger](https://www.hyperledger.org/use/besu)_un cliente de Ethereum de código abierto enfocado en empresa, desarrollado bajo la licencia de Apache 2.0 y escrito en Java_
- [Infura](https://infura.io/) - _ acceso escalable a través de API a las redes Ethereum e IPFS_
- [Kaleido](https://kaleido.io/) - _una plataforma de desarrollo enfocada a empresa que ofrece aplicaciones simplificadas de blockchain activos digitales_
- [NodeReal](https://nodereal.io/) - _proporciona infraestructura escalable blockchain y servicios de API para el ecosistema Web3_
- [Provide](https://provide.services/) -_middieware zero-knowledge empresarial_
- [QuickNode](https://www.quicknode.com/) - _proporciona nodos confiables y rápidos con APIs de alto nivel como NFT API, Token API, etc., al tiempo que ofrece un conjunto unificado de productos y soluciones de nivel empresarial_
- [Tenderly](https://tenderly.co) - _una plataforma de desarrollo Web3 que proporciona bloques de depuración, observabilidad, y una infraestructura construida en bloque para desarrollar, testear, supervisar, y operar contratos inteligentes_
- [Unibright](https://unibright.io/) - _un equipo de especialistas blockchain, arquitectos, desarrolladores y consultores con más de 20 años de experiencia en procesos empresariales e integraciones_
- [Zeeve](https://www.zeeve.io/) - _proporciona una gama de productos y herramientas para construir en Ethereum, así como infraestructura y APIs para aplicaciones Web3 empresariales _

### Herramientas y bibliotecas {#tooling-and-libraries}

- [Baseline Project](https://www.baseline-protocol.org/) - _ El procotolo Baseline es un conjunto de herramientas y librarias que ayuda a coordinar procesos empresariales y flujos de trabajo complejos y multipartido con privacidad, mantenimiento de datos en los respectivos sistemas de registro. La norma permite a dos o más máquinas de estado lograr y mantener la coherencia de los datos y la continuidad del flujo de trabajo usando una red como marco de referencia común_
- [Chainlens](https://www.chainlens.com/) - _SaaS y on-prem de datos y análisis blockchain de Web3 Labs_
- [Ernst &Young's 'Nightfall'](https://github.com/EYBlockchain/nightfall_3) - _una aplicación para transferir aplicaciones ERC20, ERC721 y ERC1155 bajo Zero Knowledge, utilizaando un Optimistic rollup_
- [Truffle Suite](https://trufflesuite.com) - _suite de desarrollo blockchain (Truffle, Ganache, Drizzle)_

### Soluciones de escalabilidad {#scalability-solutions}

[Capa 2](/layer-2) es un conjunto de tecnologías o sistemas que se ejecuta en Ethereum (Capa 1), hereda propiedades de seguridad de Capa 1, proporciona una mayor capacidad de procesamiento de transacciones (rendimiento), reduce las comisiones de transacción (costes operativos) y acelera las confirmaciones de las transacciones con respecto a Capa 1. Las soluciones de escalabilidad de Capa 2 están aseguradas mediante Capa 1, no obstante permiten a las aplicaciones de cadena de bloques manejar muchos más usuarios o acciones o datos de los que la Capa 1 podría alojar. Muchos de ellos aprovechan recientes avances en criptografía y pruebas de conocimiento cero (ZK) para maximizar el desempeño y la seguridad.

Building your application on top of a Layer 2 scalability solution can help [address many of the concerns that have previously driven companies to build on private blockchains](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), yet retain the benefits of building on Mainnet.

## Aplicaciones empresariales en vivo en la red principal {#enterprise-live-on-mainnet}

Estas son algunas de las aplicaciones empresariales que se han apoyándose en la red principal pública de Ethereum:

### Pagos {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _pays users for their attention to advertisements and users can pay publishers to support them, via the Basic Attention Token_
- [hCaptcha](https://www.hcaptcha.com/) _Bot prevention CAPTCHA system which pays web site operators for the work done by users to label data for machine learning. Ahora lo implementa Cloudflare._
- [EthereumAds](https://ethereumads.com/) _lets web site operators sell advertising space and get paid via Ethereum_

### Finanzas {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _bond issuance and settlement_
- [Societe Generale](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _bond issuance_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _bond offering and tokenization for FAT Brands_
- [Sila](https://silamoney.com/) _banking and ACH payments infrastructure-as-a-service, using a stablecoin_
- [Taurus](https://www.taurushq.com/) _issues tokenized securities_

### Tokenización de activos {#tokenization}

- [Tinlake](https://tinlake.centrifuge.io/) _receivables financing via tokenized real-world assets such as invoices, mortgages or streaming royalties_
- [RealT](https://realt.co/) _Los inversores de todo el mundo pueden comprar en el mercado inmobiliario estadounidense a través de una propiedad completamente compatible, fraccionada y con tokenizada._
- [AgroToken](https://agrotoken.io/en/home) _tokenizing and trading agricultural commodities_
- [Fasset](https://www.fasset.com/) _a platform for supporting sustainable infrastructure_

### Notarización de datos {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _details of finalized loans are hashed and recorded on Mainnet_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _Italy's largest news agency fights fake news and enables readers to verify the origin of news stories by recording them on Mainnet_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _logs press releases on Ethereum to ensure corporate accountability and trust_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _records provenance and repair history of watches on Ethereum_
- [EthSign](https://ethsign.xyz/) _records signed electronic documents on the Ethereum blockchain_

### Cadena de suministro {#supply-chain}

- [Morpheus.network](https://morpheus.network/) _supply chain automation platform which implements a hybrid of private chains with notarized data on the Ethereum Mainnet, and is in use by companies such as Canadian food, oil & gas distributor Federated Co-op Ltd. and Argentinian pet food provider Vitalcan_
- [Minespider](https://www.minespider.com/) _supply chain tracking_
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _enables companies to engage in a procurement workflow by issuing RFQ’s, contracts, purchase orders, and invoices across your network of trusted business partners_
- [Treum](https://treum.io/) _brings transparency, traceability, and tradability to supply chains, using blockchain technology_
- [TradeTrust](https://www.tradetrust.io/) _verifies electronic Bills of Lading (eBLs) for international shipping_

### Seguros {#insurance}

- [Arbol](https://www.arbolmarket.com/) _parmetric insurance to cover weather related risks_
- [Etherisc](https://etherisc.com/) _decentralized insurance for a variety of risks_

### Credenciales y certificaciones {#credentials}

- [Two Italian high schools](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _digital diplomas issued on Ethereum Mainnet_
- [University of St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _pilot project to verify degrees by a Swiss university_
- [Hyland Credentials](https://www.hylandcredentials.com) _digital diplomas and other education credentials, licenses, and certificates_
- [OpenCerts](https://opencerts.io/faq) _issues blockchain education credentials in Singapore_
- [BlockCerts](https://www.blockcerts.org/) _developed an open standard for blockchain credentials_

### Utilidades {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _electricity payments_

Si desea añadir información a esta lista, consulte las [instrucciones para contribuir](/contributing/).
