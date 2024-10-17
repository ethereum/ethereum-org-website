---
title: Áreas activas de investigación en Ethereum
description: Explore las diferentes áreas de investigación abierta y aprenda a involucrarse.
lang: es
---

# Áreas activas de investigación en Ethereum {#active-areas-of-ethereum-research}

Una de las fortalezas principales de Ethereum es que una comunidad activa de investigación e ingeniería está constantemente mejorándolo. A muchas personas entusiastas y expertas de todo el mundo les gustaría dedicarse a resolver los problemas pendientes en Ethereum, pero no siempre es fácil averiguar cuáles son esos problemas. Esta página describe las principales áreas de investigación activas como una guía aproximada de la vanguardia de Ethereum.

## Cómo funciona la investigación en Ethereum {#how-ethereum-research-works}

La investigación en Ethereum es abierta y transparente, incorporando principios de la [Ciencia Descentralizada (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). La filosofía consiste en hacer que las herramientas y los resultados de las investigaciones sean lo más abiertos e interactivos posible, por ejemplo, a través de libretas ejecutables. La investigación en Ethereum se mueve rápidamente, con nuevos hallazgos publicados y que se debaten en foros abiertos como [ethresear.ch](https://ethresear.ch/) en lugar de llegar a la comunidad a través de publicaciones tradicionales después de rondas de revisión de pares.

## Recursos de investigación general {#general-research-resources}

Independientemente del tema específico, hay una gran cantidad de información sobre investigación en Ethereum que puede encontrar en [ethresear.ch](https://ethresear.ch) y también en el [canal de Discord sobre Investigación y Desarrollo de Eth](https://discord.gg/qGpsxSA). Estos son los principales lugares donde los investigadores de Ethereum debaten sobre las últimas ideas y oportunidades de desarrollo.

Este reporte publicado en mayo de 2022 por [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) proporciona una buena visión general de la hoja de ruta de Ethereum.

## Fuentes de financiación {#sources-of-funding}

¡Puede involucrase en la investigación de Ethereum y que le paguen por ello! Por ejemplo, [la Ethereum Foundation](/foundation/) recientemente realizó una [Convocatoria de Becas Académicas](https://esp.ethereum.foundation/academic-grants). Puede encontrar información sobre oportunidades de financiación activa y proxima en [la página de becas de Ethereum](/community/grants/).

## Investigación de protocolos {#protocol-research}

La investigación de protocolos se ocupa de la capa base de Ethereum: el conjunto de reglas que definen cómo los nodos se conectan, comunican, intercambian y almacenan los datos de Ethereum, y llegan a un consenso sobre el estado de la cadena de bloques. La investigación de protocolos se divide en dos categorías principales: consenso y ejecución.

### Consenso {#consensus}

La investigacion del consenso tiene que ver con [el mecanismo de prueba de participación de Ethereum](/developers/docs/consensus-mechanisms/pos/). Algunos ejemplos de temas de investigación de consenso son los siguientes:

- identificar y corregir puntos vulnerables;
- cuantificar la seguridad criptoeconómica;
- aumentar la seguridad o el rendimiento de las implementaciones de clientes;
- desarrollar clientes ligeros.

Además de la investigación de perspectivas futuras, se están investigando algunos rediseños fundamentales del protocolo, como la finalidad de una sola ranura, para permitir mejoras significativas en Ethereum. Además, la eficiencia, la seguridad y la supervisión del establecimiento de contactos entre pares de clientes consensuados también son temas de investigación importantes.

#### Lectura de fondo {#background-reading}

- [Introducción a prueba de participación](/developers/docs/consensus-mechanisms/pos/)
- [Documento Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Explicación de Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Documento de Gasper](https://arxiv.org/abs/2003.03052)

#### Investigación reciente {#recent-research}

- [Consenso de Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema Disponibilidad/Finalidad](https://arxiv.org/abs/2009.04987)
- [Finalidad de una sola ranura](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separación Proponente-Constructor](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Ejecución {#execution}

La capa de ejecución se ocupa de ejecutar transacciones, ejecutar la [máquina virtual de Ethereum (EVM)](/developers/docs/evm/) y generar cargas útiles de ejecución para pasarlas a la capa de consenso. Hay muchas áreas de investigación activas, entre ellas:

- establecer soporte al cliente ligero;
- investigar los límites del gas;
- incorporar nuevas estructuras de datos (por ejemplo, Verkle Tries).

#### Lectura de fondo {#background-reading-1}

- [Introducción a la EVM](/developers/docs/evm)
- [Capa de ejecución de Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Investigación reciente {#recent-research-1}

- [Optimizaciones de bases de datos](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Caducidad de estado](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Caminos hacia la caducidad de estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Propuesta de caducidad de Verkle y de estado](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gestión del historial](https://eips.ethereum.org/EIPS/eip-4444)
- [Árboles de Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Muestreo de disponibilidad de datos](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Desarrollo de clientes {#client-development}

Los clientes de Ethereum son implementaciones del protocolo Ethereum. El desarrollo de clientes convierte los resultados de la investigación de protocolos en realidad al incorporarlos en estos clientes. El desarrollo de clientes incluye la actualización de las especificaciones del cliente, así como la creación de implementaciones específicas.

Se requiere un nodo de Ethereum para ejecutar dos piezas de software:

1. un cliente de consenso para hacer un seguimiento de la cabeza de la cadena de bloques, bloqueos gossip y la gestión de la lógica de consenso;
2. un cliente de ejecución para dar soporte a la máquina virtual de Ethereum y ejecutar transacciones y contratos inteligentes.

Véase la [página de nodos y clientes](/developers/docs/nodes-and-clients/) para ver más detalle de los nodos y clientes, y para obtener una lista de todas las implementaciones de clientes. También puede encontrar un historial de todas las actualizaciones de Ethereum en la [página del historial](/history/).

### Clientes de ejecución {#execution-clients}

- [Especificación del cliente de ejecución](https://github.com/ethereum/execution-specs)
- [Especificación de la API de ejecución](https://github.com/ethereum/execution-apis)

### Clientes de consenso {#consensus-clients}

- [Especificación del cliente de consenso](https://github.com/ethereum/consensus-specs)
- [Especificación de la API de Baliza](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Escalado y rendimiento {#scaling-and-performance}

La escalabilidad en Ethereum es una gran área de estudio para los investigadores de Ethereum. Los enfoques actuales incluyen la descarga de transacciones en "rollups" y abaratarlas al máximo utilizando blobs de datos. Información introductoria al escalado de Ethereum está disponible en nuestra [página de escalado](/developers/docs/scaling).

### Capa 2 {#layer-2}

Ahora hay varios protocolos de capa 2 que escalan Ethereum utilizando diferentes técnicas para realizar transacciones por lotes y protegerlas en la capa 1 de Ethereum. Este es un tema que está cobrando relevancia rápidamente con mucho potencial de investigación y desarrollo.

#### Lectura de fondo {#background-reading-2}

- [Introducción a la Capa 2](/layer-2/)
- [Polynya: Rollups, DA y cadenas modulares](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Investigación reciente {#recent-research-2}

- [Ordenación justa de Arbitrum para secuenciadores](https://eprint.iacr.org/2021/1465)
- [Capa 2 de ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Hoja de ruta centrada en los rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Puentes {#bridges}

Un área particular de la capa 2 que requiere más investigación y desarrollo son los puentes seguros y de alto rendimiento. Esto incluye puentes entre varias capas 2 y puentes entre la capa 1 y la capa 2. Esta es un área de investigación particularmente importante porque los puentes suelen ser el objetivo de los hackers.

#### Lectura de fondo{#background-reading-3}

- [Introducción a puentes en cadenas de bloques](/bridges/)
- [Vitalik sobre los puentes](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artículo sobre puentes en la cadena de bloques](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valor bloqueado en los puentes](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Investigación reciente {#recent-research-3}

- [Puentes de validación](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

La fragmentación (sharding) de la cadena de bloques de Ethereum ha sido durante mucho tiempo parte de la hoja de ruta de desarrollo. No obstante, nuevas soluciones de escalabilidad como "Danksharding" están actualmente en el foco de atención.

El precursor de full Danksharding, conocido como Proto-Danksharding, se puso en marcha con la actualización de red Cancun-Deneb ("Dencun").

[Más sobre la actualización Dencun](/roadmap/dencun/)

#### Lectura de fondo {#background-reading-4}

- [Notas de Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video de Danksharding sin banco](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Compendio de Investigación de Fragmentación de Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Investigación reciente {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sobre fragmentación y muestreo de disponibilidad de datos](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Ejecutar nodos](/developers/docs/nodes-and-clients/run-a-node/) en hardware modesto es fundamentales para mantener Ethereum descentralizado. Por lo tanto, la investigación activa para minimizar los requisitos de hardware para ejecutar nodos es un área importante de investigación.

#### Lectura de fondo {#background-reading-5}

- [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Investigación reciente {#recent-research-5}

- [ECDSA en FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Seguridad {#security}

La seguridad es un tema amplio que podría incluir la prevención de spam/estafas, la seguridad de las billeteras, la seguridad del hardware, la seguridad criptoeconómica, la búsqueda de errores y los testeos de aplicaciones y software cliente, así como la gestión de claves. Contribuir al conocimiento en estas áreas contribuirá a fomentar la adopción masiva de Ethereum.

### Criptografía y pruebas de conocimiento cero {#cryptography--zkp}

Las pruebas de conocimiento cero (ZKP) y la criptografía son fundamentales para velar por la privacidad y seguridad de Ethereum y de sus aplicaciones. El conocimiento cero es un espacio relativamente joven, aunque de rápida expansión, que ofrece muchas oportunidades de investigación y desarrollo. Algunas posibilidades incluyen desarrollar implementaciones más eficientes del [algoritmo hash Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview),
encontrar mejores compromisos polinómicos que los que existen actualmente o reducir el costo de la generación de claves públicas ecdsa y los circuitos de verificación de firmas.

#### Lectura de fondo {#background-reading-6}

- [Blog de 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Investigación reciente {#recent-research-6}

- [Avance reciente en la criptografía de curvas elípticas](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Billeteras {#wallets}

Las billeteras de Ethereum pueden ser extensiones de navegador, aplicaciones de escritorio y móviles, o contratos inteligentes en Ethereum. Hay una investigación activa sobre las billeteras de recuperación social que reducen parte del riesgo asociado con la gestión de claves de usuario individual. Asociada con el desarrollo de billeteras está la investigación de formas alternativas de abstracción de cuentas, que es un área importante e incipiente de investigación.

#### Lectura de fondo {#background-reading-7}

- [Introducción a las billeteras](/wallets/)
- [Introducción a la seguridad de las billeteras](/security/)
- [Seguridad ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938: Abstracción de cuentas](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337: Abstracción de cuentas](https://eips.ethereum.org/EIPS/eip-4337)

#### Investigación reciente {#recent-research-7}

- [Billeteras de contratos inteligentes enfocadas en validación](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [El futuro de las cuentas](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: Códigos de operación AUTH y AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publicar código en una dirección EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Comunidad, educación y divulgación {#community-education-and-outreach}

La introducción de nuevos usuarios en Ethereum requiere de nuevos recursos educativos y enfoques para su divulgación. Esto puede incluir publicaciones de blog, artículos, libros, podcasts, memes, recursos de enseñanza, eventos y todo lo que construya comunidades, dé la bienvenida a principiantes y eduque a personas acerca de Ethereum.

### UX/UI {#uxui}

Para incorporar a nuevas personas en Ethereum, el ecosistema debe mejorar su IU/UX. Para ello, es preciso que diseñadores y expertos de producto vuelvan a examinar el diseño de billeteras y aplicaciones.

#### Lectura de fondo {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Investigación reciente {#recent-research-8}

- [Discord de diseño web3](https://discord.gg/FsCFPMTSm9)
- [Principios de diseño web3](https://www.web3designprinciples.com/)
- [Discusión sobre la UX de Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Aspectos econónicos {#economics}

La investigación económica en Ethereum sigue ampliamente dos enfoques: validar la seguridad de los mecanismos que dependen de los incentivos económicos ("microeconomía") y analizar los flujos de valor entre protocolos, aplicaciones y usuarios ("macroeconomía"). Hay factores criptoeconómicos complejos relacionados con el activo nativo de Ethereum (ether) y los tokens basados en él (por ejemplo, NFT y tokens ERC20).

#### Lectura de fondo {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [Workshop de ETHconomics en Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Investigación reciente {#recent-research-9}

- [Análisis empírico de EIP-1559](https://arxiv.org/abs/2201.05574)
- [El equilibrio de oferta circulante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Cuantificar el MEV: ¿qué tan oscuro es el bosque?](https://arxiv.org/abs/2101.05511)

### Mercados de espacios de bloque y tarifas {#blockspace-fee-markets}

Los mercados de espacio en bloque rigen la inclusión de las transacciones de los usuarios finales, ya sea directamente en Ethereum (Capa 1) o en redes puenteadas, por ejemplo, los "rollups" (Capa 2). En Ethereum, las transacciones se envían al mercado de tarifas implementado en el protocolo como EIP-1559, protegiendo la cadena de spam y la congestión de precios. En ambas capas, las transacciones pueden producir externalidades, conocidas como valor máximo extraíble (o MEV), que inducen a nuevas estructuras de mercado para capturar o gestionar estas externalidades.

#### Lectura de fondo {#background-reading-10}

- [Diseño del mecanismo de comisiones por transacción para la cadena de bloques de Ethereum: análisis de aspectos económicos del EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulaciones de EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Aspectos económicos de los rollups desde los primeros principios](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, reordenación de transacciones e inestabilidad del consenso en exchanges descentralizados](https://arxiv.org/abs/1904.05234)

#### Investigación reciente {#recent-research-10}

- [Presentación en video de EIP-1559 multidimensional](https://youtu.be/QbR4MTgnCko)
- [MEV de dominio cruzado](http://arxiv.org/abs/2112.01472)
- [Subastas de MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incentivos de prueba de participación {#proof-of-stake-incentives}

Los validadores utilizan el activo nativo de Ethereum (ether) como garantía frente al comportamiento deshonesto. La criptoeconomía de esto determina la seguridad de la red. Los validadores sofisticados pueden ser capaces de explotar los matices de la capa de incentivos para lanzar ataques explícitos.

#### Lectura de fondo {#background-reading-11}

- [Clase magistral de economía y modelo económico de Ethereum](https://github.com/CADLabs/ethereum-economic-model)
- [Simulaciones de incentivos PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Investigación reciente {#recent-research-11}

- [Incrementar la resistencia a la censura de transacciones con la separación de proponente/constructor (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Tres ataques a Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Staking líquido y derivados {#liquid-staking-and-derivatives}

El staking líquido permite a los usuarios con menos de 32 ETH recibir rendimiento sobre su participación intercambiando ether por un token que representa ether en participación que se puede utilizar en DeFi. No obstante, todavía se están descubriendo los incentivos y la dinámica del mercado asociados con el staking líquido, así como su efecto en la seguridad de Ethereum (por ejemplo, los riesgos de centralización).

#### Lectura de fondo {#background-reading-12}

- [Ethresear.ch staking líquido](https://ethresear.ch/search?Q=liquid%20staking)
- [Lido: El camino hacia el staking en Ethereum sin confianza](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Introducción al protocolo de staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Investigación reciente {#recent-research-12}

- [Gestión de retirada de fondos de Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Credenciales de retirada](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Los riesgos de los derivados del staking líquido] (https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Pruebas {#testing}

### Verificación formal {#formal-verification}

La verificación formal consiste en escribir código para verificar que las especificaciones de consenso de Ethereum sean correctas y estén libres de errores. Hay una versión ejecutable de la especificación escrita en Python que requiere mantenimiento y desarrollo. Una mayor investigación puede ayudar a mejorar la implementación de Python de la especificación y agregar herramientas que puedan verificar la corrección e identificar problemas de forma más sólida.

#### Lectura de fondo {#background-reading-13}

- [Introducción a la verificación formal](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verificación formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Investigación reciente {#recent-research-13}

- [Verificación formal del contrato de depósito](https://github.com/runtimeverification/deposit-contract-verification)
- [Verificación formal de la especificación de la Cadena de Baliza](https://github.com/runtimeverification/deposit-contract-verification)

## Ciencia de datos y análisis de datos {#data-science-and-analytics}

Se necesitan más herramientas de análisis de datos y paneles que proporcionen información detallada sobre la actividad en Ethereum y el estado de la red.

### Lectura de fondo {#background-reading-14}

- [Análisis de Dune](https://dune.com/browse/dashboards)
- [Panel de diversidad de clientes](https://clientdiversity.org/)

#### Investigación reciente {#recent-research-14}

- [Análisis de datos del Robust Incentives Group] (https://ethereum.github.io/rig/)

## Aplicaciones y herramientas {#apps-and-tooling}

La capa de aplicación es compatible con un ecosistema diverso de programas que establecen transacciones en la capa base de Ethereum. Los equipos de desarrollo están buscando constantemente nuevas formas de aprovechar Ethereum para crear versiones compuestas, sin permisos y resistentes a la censura de aplicaciones importantes Web2 o crear conceptos nativos de Web3 completamente nuevos. Al mismo tiempo, se están desarrollando nuevas herramientas que hacen que la elaboración de DApps en Ethereum sea menos compleja.

### DeFi {#defi}

Las finanzas descentralizadas (DeFi) son una de las principales clases de aplicaciones construidas sobre Ethereum. Las DeFi tienen por objetivo crear "bloques de construcción de dinero" compuestos que permitan a los usuarios almacenar, transferir, prestar, pedir prestado e invertir en criptoactivos utilizando contratos inteligentes. Las DeFi son un espacio en constante evolución y cambio. Es necesaria una investigación continua de protocolos seguros, eficientes y accesibles.

#### Lectura de fondo {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: ¿Qué es DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Investigación reciente {#recent-research-15}

- [Finanzas descentralizadas, ¿propiedad centralizada?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: El camino a transacciones por menos de un dólar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Un caso de uso de alto impacto para Ethereum es la capacidad de organizarse de manera descentralizada a través del uso de las organizaciones autónomas descentralizadas (DAO). Existe una gran cantidad de investigación activa sobre cómo pueden desarrollarse y utilizarse las DAO en Ethereum como herramientas de coordinación que requieren la confianza mínima y necesaria para llevar a cabo mejores formas de gobernanza, lo que amplía en gran medida las opciones de las personas más allá de las corporaciones y organizaciones tradicionales.

#### Lectura de fondo {#background-reading-16}

- [Introducción a las DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Investigación reciente {#recent-research-16}

- [Mapeo del ecosistema de DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Herramientas para desarrolladores {#developer-tools}

Las herramientas para desarrolladores de Ethereum están evolucionando rápidamente. Hay mucha investigación y desarrollo activo por hacer en esta área general.

#### Lectura de fondo {#lectura de fondo-17}

- [Herramientas por lenguaje de programación](/developers/docs/programming-languages/)
- [Marcos de desarrolladores](/developers/docs/frameworks/)
- [Lista de herramientas de desarrollo de consenso] (https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Estándares de tokens](/desarrolladores/documentos/estándares/tokens/)
- [CryptoDevHub: herramientas de EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Investigación reciente {#recent-research-17}

- [Canal de herramientas de consenso de Discord de I+D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oráculos {#oracles}

Los oráculos importan datos fuera de la cadena a la cadena de bloques de manera descentralizada y sin permisos. Obtener estos datos dentro de la cadena permite que las dapps puedan reaccionar ante los fenómenos del mundo real, como las fluctuaciones de precios en los activos del mundo real, los eventos en las aplicaciones fuera de la cadena o incluso los cambios en el clima.

#### Lectura de fondo {#background-reading-18}

- [Introducción a los oráculos](/developers/docs/oracles/)

#### Investigación reciente {#recent-research-18}

- [Encuesta de oráculos de cadenas de bloques](https://arxiv.org/pdf/2004.07140.pdf)
- [Documento técnico de Chainlink](https://chain.link/whitepaper)

### Seguridad de aplicaciones {#app-security}

Por lo general, los hackeos en Ethereum se aprovechan de puntos flacos en aplicaciones individuales y no en el propio protocolo. Los hackers y los desarrolladores de aplicaciones están enfrascados en una carrera armamentística para desarrollar nuevos ataques y defensas. Esto significa que siempre es necesario realizar una investigación y un desarrollo importantes para mantener las aplicaciones a salvo de los hackeos.

#### Lectura de fondo {#lectura de fondo-19}

- [Informe de explotación de agujero de gusano] (https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Lista de hackeo de contratos de Ethereum post mórtem](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Investigación reciente {#recent-research-19}

- [ethresear.ch Aplicaciones](https://ethresear.ch/c/applications/18)

### Pila de tecnología {#technology-stack}

La descentralización de toda la pila de tecnología de Ethereum es un área de investigación importante. Actualmente, las dapps en Ethereum suelen tener algunos puntos de centralización, ya que dependen de herramientas o infraestructuras centralizadas.

#### Lectura de fondo {#lectura de fondo-20}

- [Pila de Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Introducción al Stack Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introducción a contratos inteligentes](/developers/docs/smart-contracts/)
- [Introducción a almacenamiento descentralizado](/developers/docs/storage/)

#### Investigación reciente {#recent-research-20}

- [Capacidad de composición de los contratos inteligentes](/developers/docs/smart-contracts/composability/)
