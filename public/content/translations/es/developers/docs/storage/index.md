---
title: Almacenamiento descentralizado
description: Resumen de qué es el almacenamiento descentralizado y herramientas disponibles para integrarse en una dapp.
lang: es
---

A diferencia de un servidor centralizado operado por una sola compañía u organización, los sistemas de almacenamiento descentralizado constan de una red de pares de usuario-operadores que mantienen una parte de la información general, lo que crea un sistema flexible de almacenamiento de archivos compartidos. Estos pueden estar en una aplicación basada en cadena de bloques o cualquier red de pares.

Ethereum en sí puede usarse como un sistema de almacenamiento descentralizado, y de hecho lo es cuando se trata de almacenamiento de código en todos los contratos inteligentes. Sin embargo, cuando se trata de grandes cantidades de datos, no es para ello que se diseñó Ethereum. La cadena crece constantemente, pero al momento de escribir este artículo, la cadena de Ethereum tiene alrededor de 500 GB - 1 TB ([dependiendo del cliente](https://etherscan.io/chartsync/chaindefault)), y cada nodo de la red debe poder almacenar toda la información. Si la cadena se expandiera a grandes cantidades de información (digamos 5 TB), no sería viable que todos los nodos siguieran ejecutándose. Además, el costo de implementar todos estos datos en la red principal sería prohibitivo por las tarifas de [gas](/developers/docs/gas).

Debido a estas limitaciones, necesitamos una cadena o metodología diferente para almacenar grandes cantidades de datos de manera descentralizada.

Al analizar opciones de almacenamiento descentralizado (dStorage), hay algunas cosas que el usuario debe tener en cuenta.

- Mecanismo de persistencia / estructura de incentivos
- Aplicación de retención de datos
- Descentralidad
- Consensos

## Mecanismo de persistencia / estructura de incentivos {#persistence-mechanism}

### Basado en Blockchain {#blockchain-based}

Para que cierta información persista para siempre, necesitamos utilizar un mecanismo de persistencia. Por ejemplo, en Ethereum el mecanismo de persistencia se basa en dar cuenta de toda la cadena al ejecutar un nodo. Se van añadiendo datos al final de la cadena, y esta continúa creciendo, lo que requiere que cada nodo replique todos los datos incorporados.

Esto se conoce como persistencia **basada en la cadena de bloques**.

El problema de la persistencia basada en la cadena de bloques es que la cadena podría llegar a ser demasiado grande para mantener y almacenar todos los datos de forma viable (p. ej., [distintas fuentes](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estiman que Internet requeriría más de 40 Zetabytes de capacidad de almacenamiento).

La cadena de bloques, además, debe tener alguna estructura de incentivos. Por la persistencia basada en la cadena de bloques, se realiza un pago al validador. Cuando los datos se añaden a la cadena, se paga a los validadores para que añadan los datos.

Plataformas con persistencia basada en la cadena de bloques:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Basado en contratos {#contract-based}

La persistencia **basada en contratos** intuye que los datos no pueden ser replicados por cada nodo y almacenados para siempre, y en su lugar deben ser mantenidos con acuerdos contractuales. Hay acuerdos realizados con múltiples nodos que se comprometen a mantener ciertos datos durante un período de tiempo. Estos deberán ser reembolsados o renovados cuando expiran para seguir manteniendo los datos.

En la mayoría de los casos, en lugar de almacenar todos los datos en la cadena, se almacena solo el hash del lugar donde se encuentran los datos en la cadena. De esta manera no es necesario escalar toda la cadena para poder mantener la información completa.

Plataformas con persistencia basada en contratos:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Consideraciones adicionales {#additional-consideration}

IPFS es un sistema distribuido para almacenar y acceder a archivos, sitios web, aplicaciones y datos. No cuenta con un sistema de incentivos, pero se puede utilizar con cualquiera de las soluciones de incentivos basadas en contrato anteriores para una mayor persistencia. Otra forma de persistir datos en IPFS es trabajar con un servicio de "pinning" de datos, que mantendrá los datos fijados para usted. Incluso puede ejecutar su propio nodo de IPFS y contribuir a la red para persistir gratuitamente sus datos y/o los de los demás.

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata:](https://www.pinata.cloud/) _Servicio de fijación de IPFS_
- [web3.storage:](https://web3.storage/) _Servicio de pinning para IPFS/Filecoin_
- [Infura:](https://infura.io/product/ipfs) _Servicio de pinning en IPFS_
- [IPFS Scan:](https://ipfs-scan.io) _Explorador de pinning de IPFS_
- [4EVERLAND:](https://www.4everland.org/) Servicio de pinning de IPFS
- [Filebase:](https://filebase.com) _Servicio de pinning de IPFS_
- [Spheron Network](https://spheron.network/): _Servicio de pinning de IPFS/Filecoin_

SWARM es una tecnología descentralizada de almacenamiento y distribución de datos con un sistema de incentivos de almacenamiento y un oráculo del precios de alquiler de almacenamiento.

## Retención de datos {#data-retention}

Para conservar los datos, es necesario que los sistemas cuenten con algún mecanismo que asegure la conservación de los datos.

### Mecanismo de desafíos {#challenge-mechanism}

Una de las formas más populares de aseguraese de que se están conservando los datos es usar un tipo de desafío criptográfico que se emita a los nodos para asegurarse de que aún tienen los datos. Un ejemplo simple de esto es la prueba de acceso de Arweave. Emiten un desafío a los nodos para comprobar si tienen los datos en el bloque más reciente y en un bloque pasado aleatorio. Si el nodo no responde, se lo penaliza.

Tipos de dStorage que utilizan un mecanismo de desafíos:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Descentralización {#decentrality}

No existen buenas herramientas para medir el nivel de descentralización de las plataformas, pero en general querrá utilizar herramientas que no requieran de algún tipo de KYC para proporcionar evidencia de que no son centralizadas.

Herramientas descentralizadas sin KYC:

- Züs (implementando una edición sin KYC)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Consensos {#consensus}

La mayoría de estas herramientas tienen su propia versión de un [mecanismo de consenso](/developers/docs/consensus-mechanisms/) pero generalmente se basan en la [**prueba de trabajo (PoW)**](/developers/docs/consensus-mechanisms/pow/) o la [**prueba de participación (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Basado en prueba de trabajo:

- Skynet
- Arweave

Basado en prueba de participación:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Herramientas relacionadas {#related-tools}

**IPFS: _InterPlanetary File System es un sistema descentralizado de almacenamiento y referencia de archivos para Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentación](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS: _Almacenamiento de objetos de nube descentralizado seguro, privado y compatible con S3 para desarrolladores._**

- [Storj.io](https://storj.io/)
- [Documentación](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet: _Skynet es una cadena de PoW descentralizada dedicada a una Web descentralizada._**

- [Skynet.net](https://siasky.net/)
- [Documentación](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin: _Filecoin fue creado por el equipo creador de IPFS. Es una capa de incentivos basada en los ideales de IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentación](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave: _Arweave es una plataforma de dStorage._**

- [Arweave.org](https://www.arweave.org/)
- [Documentación](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs: _Züs es una plataforma de dStorage de prueba de participación con sharding y blobbers._**

- [zus.network](https://zus.network/)
- [Documentación](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Crust Network: _Crust es una plataforma de dStorage basada en IPFS._**

- [Crust.network](https://crust.network)
- [Documentación](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm: _Plataforma de almacenamiento distribuido y servicio de distribución de contenido para la pila web3 de Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentación](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB: _Base de datos "peer-to-peer" sobre IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentación](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im: _Proyecto de nube descentralizada (base de datos, almacenamiento de archivos, computación y DID). Una combinación única de tecnología P2P fuera de cadena y en cadena. Compatibilidad con IPFS y multicadena._**

- [Aleph.im](https://aleph.im/)
- [Documentación](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic: _Almacenamiento de bases de datos IPFS con control del usuario para aplicaciones ricas en datos e interesantes._**

- [Ceramic.network](https://ceramic.network/)
- [Documentación](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase: _Almacenamiento descentralizado compatible con S3 y servicio de pinning de IPFS con redundancia geográfica. Todos los archivos subidos a IPFS a través de Filebase se fijan automáticamente a la infraestructura de Filebase con una replicación 3x en todo el mundo._**

- [Filebase.com](https://filebase.com/)
- [Documentación](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND: _Plataforma de computación en la nube web 3.0 que integra capacidades centrales de almacenamiento, computación y redes, es compatible con S3 y proporciona almacenamiento de datos sincrónico en redes de almacenamiento descentralizadas como IPFS y Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentación](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido: _Plataforma de cadena de bloques como servicio con nodos IPFS con clic en un botón_**

- [Kaleido](https://kaleido.io/)
- [Documentación](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network: _Spheron es una plataforma como servicio (PaaS) diseñada para dApps que buscan lanzar sus aplicaciones en infraestructura descentralizada con el mejor rendimiento. Proporciona cómputo, almacenamiento descentralizado, CDN y alojamiento web listo para usar._**

- [spheron.network](https://spheron.network/)
- [Documentación](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Más información {#further-reading}

- [¿Qué es el almacenamiento descentralizado?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Cinco mitos comunes que no son ciertos sobre el almacenamiento descentralizado](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_¿Conoce algún recurso en la comunidad que le ayudara? ¡Edite la página y añádala!_

## Temas relacionados {#related-topics}

- [Entornos de desarrollo](/developers/docs/frameworks/)
