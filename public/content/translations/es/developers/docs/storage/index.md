---
title: Almacenamiento descentralizado
description: Descripción general de qué es el almacenamiento descentralizado y las herramientas disponibles para integrarlo en una aplicación descentralizada (dapp).
lang: es
authors: ["Patrick Collins"]
---

A diferencia de un servidor centralizado operado por una sola empresa u organización, los sistemas de almacenamiento descentralizado consisten en una red entre pares de usuarios-operadores que mantienen una parte de los datos generales, creando un sistema resistente para compartir y almacenar archivos. Estos pueden estar en una aplicación basada en una cadena de bloques o en cualquier red basada entre pares.

Ethereum en sí mismo puede usarse como un sistema de almacenamiento descentralizado, y lo es cuando se trata del almacenamiento de código en todos los contratos inteligentes. Sin embargo, cuando se trata de grandes cantidades de datos, Ethereum no fue diseñado para eso. La cadena está creciendo constantemente, pero en el momento de escribir este artículo, la cadena de Ethereum tiene alrededor de 500 GB - 1 TB ([dependiendo del cliente](https://etherscan.io/chartsync/chaindefault)), y cada nodo de la red debe poder almacenar todos los datos. Si la cadena se expandiera a grandes cantidades de datos (digamos 5 TB), no sería factible que todos los nodos continuaran funcionando. Además, el costo de implementar esta cantidad de datos en la Red principal sería prohibitivamente caro debido a las tarifas de [gas](/developers/docs/gas).

Debido a estas limitaciones, necesitamos una cadena o metodología diferente para almacenar grandes cantidades de datos de forma descentralizada.

Al analizar las opciones de almacenamiento descentralizado (dStorage), hay algunas cosas que un usuario debe tener en cuenta.

- Mecanismo de persistencia / estructura de incentivos
- Aplicación de la retención de datos
- Descentralización
- Consenso

## Mecanismo de persistencia / estructura de incentivos {#persistence-mechanism}

### Basado en cadena de bloques {#blockchain-based}

Para que un dato persista para siempre, necesitamos usar un mecanismo de persistencia. Por ejemplo, en Ethereum, el mecanismo de persistencia es que se debe tener en cuenta toda la cadena al ejecutar un nodo. Se añaden nuevos datos al final de la cadena, y esta continúa creciendo, lo que requiere que cada nodo replique todos los datos integrados.

Esto se conoce como persistencia **basada en cadena de bloques**.

El problema con la persistencia basada en cadena de bloques es que la cadena podría volverse demasiado grande para mantener y almacenar todos los datos de manera factible (por ejemplo, [muchas fuentes](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estiman que Internet requiere más de 40 zettabytes de capacidad de almacenamiento).

La cadena de bloques también debe tener algún tipo de estructura de incentivos. Para la persistencia basada en cadena de bloques, se realiza un pago al validador. Cuando los datos se agregan a la cadena, se les paga a los validadores por agregarlos.

Plataformas con persistencia basada en cadena de bloques:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Basado en contratos {#contract-based}

La persistencia **basada en contratos** parte de la intuición de que los datos no pueden ser replicados por cada nodo y almacenados para siempre, sino que deben mantenerse mediante acuerdos de contrato. Estos son acuerdos realizados con múltiples nodos que han prometido conservar un dato durante un período de tiempo. Deben ser reembolsados o renovados cada vez que se agoten para mantener los datos persistentes.

En la mayoría de los casos, en lugar de almacenar todos los datos en cadena, se almacena el hash de la ubicación de los datos en una cadena. De esta manera, no es necesario que toda la cadena escale para conservar todos los datos.

Plataformas con persistencia basada en contratos:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Consideraciones adicionales {#additional-consideration}

IPFS es un sistema distribuido para almacenar y acceder a archivos, sitios web, aplicaciones y datos. No tiene un esquema de incentivos incorporado, pero en su lugar se puede usar con cualquiera de las soluciones de incentivos basadas en contratos mencionadas anteriormente para una persistencia a más largo plazo. Otra forma de persistir datos en IPFS es trabajar con un servicio de fijación (pinning), que "fijará" sus datos por usted. ¡Incluso puede ejecutar su propio nodo IPFS y contribuir a la red para persistir sus datos y/o los de otros de forma gratuita!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(servicio de fijación de IPFS)_
- [web3.storage](https://web3.storage/) _(servicio de fijación de IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(servicio de fijación de IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(explorador de fijación de IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（servicio de fijación de IPFS）_
- [Filebase](https://filebase.com) _(servicio de fijación de IPFS)_
- [Spheron Network](https://spheron.network/) _(servicio de fijación de IPFS/Filecoin)_

SWARM es una tecnología de distribución y almacenamiento de datos descentralizado con un sistema de incentivos de almacenamiento y un oráculo de precios de alquiler de almacenamiento.

## Retención de datos {#data-retention}

Para retener datos, los sistemas deben tener algún tipo de mecanismo para asegurarse de que los datos se retengan.

### Mecanismo de desafío {#challenge-mechanism}

Una de las formas más populares de asegurarse de que los datos se retengan es utilizar algún tipo de desafío criptográfico que se emite a los nodos para asegurarse de que todavía tienen los datos. Un ejemplo sencillo es observar la prueba de acceso de Arweave. Emiten un desafío a los nodos para ver si tienen los datos tanto en el bloque más reciente como en un bloque aleatorio del pasado. Si el nodo no puede dar con la respuesta, es penalizado.

Tipos de dStorage con un mecanismo de desafío:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Descentralización {#decentrality}

No existen grandes herramientas para medir el nivel de descentralización de las plataformas, pero en general, querrá utilizar herramientas que no tengan algún tipo de KYC para proporcionar evidencia de que no están centralizadas.

Herramientas descentralizadas sin KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Consenso {#consensus}

La mayoría de estas herramientas tienen su propia versión de un [mecanismo de consenso](/developers/docs/consensus-mechanisms/), pero generalmente se basan en [**prueba de trabajo (PoW)**](/developers/docs/consensus-mechanisms/pow/) o [**prueba de participación (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Basado en prueba de trabajo:

- Skynet
- Arweave

Basado en prueba de participación:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Herramientas relacionadas {#related-tools}

**IPFS: _InterPlanetary File System es un sistema de almacenamiento descentralizado y de referencia de archivos para Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentación](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS: _almacenamiento de objetos en la nube descentralizado, seguro, privado y compatible con S3 para desarrolladores._**

- [Storj.io](https://storj.io/)
- [Documentación](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia: _aprovecha la criptografía para crear un mercado de almacenamiento en la nube sin necesidad de confianza, lo que permite a compradores y vendedores realizar transacciones directamente._**

- [Skynet.net](https://sia.tech/)
- [Documentación](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin: _Filecoin fue creado por el mismo equipo detrás de IPFS. Es una capa de incentivos sobre los ideales de IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentación](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave: _Arweave es una plataforma dStorage para almacenar datos._**

- [Arweave.org](https://www.arweave.org/)
- [Documentación](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs: _Züs es una plataforma dStorage de prueba de participación con fragmentación y blobbers._**

- [zus.network](https://zus.network/)
- [Documentación](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network: _Crust es una plataforma dStorage sobre IPFS._**

- [Crust.network](https://crust.network)
- [Documentación](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm: _una plataforma de almacenamiento distribuido y servicio de distribución de contenido para la pila Web3 de Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentación](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB: _una base de datos descentralizada entre pares sobre IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentación](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im: _proyecto de nube descentralizada (base de datos, almacenamiento de archivos, computación e identidad descentralizada (DID)). Una combinación única de tecnología entre pares fuera de la cadena y en cadena. Compatibilidad con IPFS y múltiples cadenas._**

- [Aleph.im](https://aleph.cloud/)
- [Documentación](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic: _almacenamiento de base de datos IPFS controlado por el usuario para aplicaciones atractivas y ricas en datos._**

- [Ceramic.network](https://ceramic.network/)
- [Documentación](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase: _almacenamiento descentralizado compatible con S3 y servicio de fijación de IPFS con redundancia geográfica. Todos los archivos subidos a IPFS a través de Filebase se fijan automáticamente a la infraestructura de Filebase con una replicación triple en todo el mundo._**

- [Filebase.com](https://filebase.com/)
- [Documentación](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND: _una plataforma de computación en la nube Web 3.0 que integra capacidades centrales de almacenamiento, computación y redes, es compatible con S3 y proporciona almacenamiento de datos sincrónico en redes de almacenamiento descentralizado como IPFS y Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentación](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido: _una plataforma de cadena de bloques como servicio con nodos IPFS que se activan con un clic._**

- [Kaleido](https://kaleido.io/)
- [Documentación](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network: _Spheron es una plataforma como servicio (PaaS) diseñada para dapps que buscan lanzar sus aplicaciones en una infraestructura descentralizada con el mejor rendimiento. Proporciona computación, almacenamiento descentralizado, CDN y alojamiento web listos para usar._**

- [spheron.network](https://spheron.network/)
- [Documentación](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3: _resolutor para páginas web descentralizadas, similar a eth.limo, que admite todos los tipos y no se limita a ENS e IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass: _motor de búsqueda para sitios web descentralizados respaldados por IPFS y ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [Documentación](https://www.web3compass.net/statistics)

## Más información {#further-reading}

- [¿Qué es el almacenamiento descentralizado?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Desmintiendo cinco mitos comunes sobre el almacenamiento descentralizado](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? ¡Edite esta página y añádalo!_

## Temas relacionados {#related-topics}

- [Entornos de desarrollo](/developers/docs/frameworks/)