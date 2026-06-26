---
title: Áreas activas de investigación de Ethereum
description: Explora diferentes áreas de investigación abierta y aprende cómo participar.
lang: es
---

Una de las principales fortalezas de Ethereum es que una comunidad activa de investigación e ingeniería lo mejora constantemente. A muchas personas entusiastas y capacitadas en todo el mundo les gustaría dedicarse a los problemas pendientes en Ethereum, pero no siempre es fácil descubrir cuáles son esos problemas. Esta página describe las áreas de investigación activas clave como una guía general de la vanguardia de Ethereum.

## Cómo funciona la investigación de Ethereum {#how-ethereum-research-works}

La investigación de Ethereum es abierta y transparente, y encarna los principios de la [ciencia descentralizada (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). La cultura consiste en hacer que las herramientas y los resultados de la investigación sean lo más abiertos e interactivos posible, por ejemplo, a través de cuadernos ejecutables. La investigación de Ethereum avanza rápidamente, con nuevos hallazgos publicados y discutidos abiertamente en foros como [ethresear.ch](https://ethresear.ch/) en lugar de llegar a la comunidad a través de publicaciones tradicionales después de rondas de revisión por pares.

## Recursos generales de investigación {#general-research-resources}

Independientemente del tema específico, hay una gran cantidad de información sobre la investigación de Ethereum en [ethresear.ch](https://ethresear.ch) y en el [canal de Discord de I+D de Eth](https://discord.gg/qGpsxSA). Estos son los lugares principales donde los investigadores de Ethereum discuten las últimas ideas y oportunidades de desarrollo.

Este informe publicado en mayo de 2022 por [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) proporciona una buena descripción general de la hoja de ruta de Ethereum.

## Fuentes de financiamiento {#sources-of-funding}

¡Puedes participar en la investigación de Ethereum y recibir un pago por ello! Por ejemplo, [la Fundación Ethereum](/foundation/) llevó a cabo recientemente una [ronda de financiamiento de subvenciones académicas](https://esp.ethereum.foundation/academic-grants). Puedes encontrar información sobre oportunidades de financiamiento activas y futuras en [la página de subvenciones de Ethereum](/community/grants/).

## Investigación del protocolo {#protocol-research}

La investigación del protocolo se ocupa de la capa base de Ethereum: el conjunto de reglas que definen cómo los nodos se conectan, se comunican, intercambian y almacenan datos de Ethereum y llegan a un consenso sobre el estado de la cadena de bloques. La investigación del protocolo se divide en dos categorías principales: consenso y ejecución.

### Consenso {#consensus}

La investigación del consenso se ocupa del [mecanismo de prueba de participación (PoS) de Ethereum](/developers/docs/consensus-mechanisms/pos/). Algunos ejemplos de temas de investigación de consenso son:

- identificar y parchear vulnerabilidades;
- cuantificar la seguridad de la criptoeconomía;
- aumentar la seguridad o el rendimiento de las implementaciones de clientes;
- y desarrollar clientes ligeros.

Además de la investigación prospectiva, se están investigando algunos rediseños fundamentales del protocolo, como la finalidad de un solo slot, para permitir mejoras significativas en Ethereum. Además, la eficiencia, la seguridad y el monitoreo de la red entre pares entre los clientes de consenso también son temas de investigación importantes.

#### Lecturas complementarias {#background-reading}

- [Introducción a la prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Documento de Casper FFG](https://arxiv.org/abs/1710.09437)
- [Explicación de Casper FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Documento de Gasper](https://arxiv.org/abs/2003.03052)

#### Investigaciones recientes {#recent-research}

- [Consenso en Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema de disponibilidad/finalidad](https://arxiv.org/abs/2009.04987)
- [Finalidad de un solo slot](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separación proponente-constructor (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Ejecución {#execution}

La capa de ejecución se ocupa de ejecutar transacciones, ejecutar la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/) y generar cargas útiles de ejecución para pasarlas a la capa de consenso. Hay muchas áreas activas de investigación, que incluyen:

- desarrollar soporte para clientes ligeros;
- investigar los límites de gas;
- e incorporar nuevas estructuras de datos (por ejemplo, árboles Verkle).

#### Lecturas complementarias {#background-reading-1}

- [Introducción a la EVM](/developers/docs/evm)
- [Capa de ejecución en Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Investigaciones recientes {#recent-research-1}

- [Optimizaciones de bases de datos](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Caducidad del estado](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Caminos hacia la caducidad del estado](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Propuesta de Verkle y caducidad del estado](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Gestión del historial](https://eips.ethereum.org/EIPS/eip-4444)
- [Árboles Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Muestreo de disponibilidad de datos (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Desarrollo de clientes {#client-development}

Los clientes de Ethereum son implementaciones del protocolo de Ethereum. El desarrollo de clientes convierte los resultados de la investigación del protocolo en realidad al integrarlos en estos clientes. El desarrollo de clientes incluye la actualización de las especificaciones del cliente, así como la creación de implementaciones específicas.

Se requiere que un nodo de Ethereum ejecute dos piezas de software:

1. un cliente de consenso para realizar un seguimiento de la cabecera de la cadena de bloques, propagar bloques y manejar la lógica de consenso
2. un cliente de ejecución para dar soporte a la Máquina Virtual de Ethereum y ejecutar transacciones y contratos inteligentes

Consulta la [página de nodos y clientes](/developers/docs/nodes-and-clients/) para obtener más detalles sobre los nodos y clientes, y para ver una lista de todas las implementaciones de clientes actuales. También puedes encontrar un historial de todas las actualizaciones de Ethereum en la [página de historial](/ethereum-forks/).

### Clientes de ejecución {#execution-clients}

- [Especificación del cliente de ejecución](https://github.com/ethereum/execution-specs)
- [Especificación de la API de ejecución](https://github.com/ethereum/execution-apis)

### Clientes de consenso {#consensus-clients}

- [Especificación del cliente de consenso](https://github.com/ethereum/consensus-specs)
- [Especificación de la API de la cadena de balizas](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Escalabilidad y rendimiento {#scaling-and-performance}

Escalar Ethereum es una gran área de enfoque para los investigadores de Ethereum. Los enfoques actuales incluyen descargar transacciones en rollups y hacerlas lo más baratas posible utilizando blobs de datos. La información introductoria sobre el escalado de Ethereum está disponible en nuestra [página de escalabilidad](/developers/docs/scaling).

### Capa 2 (L2) {#layer-2}

Ahora hay varios protocolos de capa 2 (L2) que escalan Ethereum utilizando diferentes técnicas para el procesamiento por lotes de transacciones y asegurándolas en la capa 1 (L1) de Ethereum. Este es un tema de muy rápido crecimiento con mucho potencial de investigación y desarrollo.

#### Lecturas complementarias {#background-reading-2}

- [Introducción a la capa 2 (L2)](/layer-2/)
- [Polynya: Rollups, DA y cadenas modulares](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Investigaciones recientes {#recent-research-2}

- [Ordenamiento justo de Arbitrum para secuenciadores](https://eprint.iacr.org/2021/1465)
- [Capa 2 en Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Hoja de ruta centrada en rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Puentes {#bridges}

Un área particular de la capa 2 que requiere más investigación y desarrollo son los puentes seguros y de alto rendimiento. Esto incluye puentes entre varias capas 2 y puentes entre la capa 1 y la capa 2. Esta es un área de investigación particularmente importante porque los puentes suelen ser el objetivo de los piratas informáticos.

#### Lecturas complementarias {#background-reading-3}

- [Introducción a los puentes de cadenas de bloques](/bridges/)
- [Vitalik sobre los puentes](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artículo sobre puentes de cadenas de bloques](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Valor bloqueado en puentes](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Investigaciones recientes {#recent-research-3}

- [Validación de puentes](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Fragmentación {#sharding}

La fragmentación de la cadena de bloques de Ethereum ha sido durante mucho tiempo parte de la hoja de ruta de desarrollo. Sin embargo, las nuevas soluciones de escalabilidad como el "danksharding" están ocupando actualmente el centro de atención.

El precursor del danksharding completo, conocido como Proto-Danksharding, se lanzó con la actualización Dencun (Cancun-Deneb) de la red.

[Más sobre la actualización Dencun](/roadmap/dencun/)

#### Lecturas complementarias {#background-reading-4}

- [Notas sobre Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video de Bankless sobre danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Compendio de investigación sobre la fragmentación de Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Investigaciones recientes {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik sobre la fragmentación y el muestreo de disponibilidad de datos (DAS)](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Ejecutar nodos](/developers/docs/nodes-and-clients/run-a-node/) en hardware modesto es fundamental para mantener a Ethereum descentralizado. Por lo tanto, la investigación activa para minimizar los requisitos de hardware para ejecutar nodos es un área de investigación importante.

#### Lecturas complementarias {#background-reading-5}

- [Ethereum en ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Investigaciones recientes {#recent-research-5}

- [ECDSA en FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Seguridad {#security}

La seguridad es un tema amplio que puede incluir la prevención de spam/estafas, la seguridad de las billeteras, la seguridad del hardware, la seguridad de la criptoeconomía, la búsqueda de errores y las pruebas de aplicaciones y software de clientes, y la gestión de claves. Contribuir al conocimiento en estas áreas ayudará a estimular la adopción generalizada.

### Criptografía y ZKP {#cryptography--zkp}

Las pruebas de conocimiento cero (ZKP) y la criptografía son fundamentales para integrar la privacidad y la seguridad en Ethereum y sus aplicaciones. El conocimiento cero es un espacio relativamente joven pero de rápido movimiento con muchas oportunidades abiertas de investigación y desarrollo. Algunas posibilidades incluyen el desarrollo de implementaciones más eficientes del [algoritmo de hashing Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), encontrar mejores compromisos polinómicos de los que existen actualmente o reducir el costo de la generación de claves públicas ECDSA y los circuitos de verificación de firmas.

#### Lecturas complementarias {#background-reading-6}

- [Blog de 0xPARC](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast de Zero Knowledge](https://zeroknowledge.fm/)

#### Investigaciones recientes {#recent-research-6}

- [Avances recientes en la criptografía de curva elíptica](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK en Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Billeteras {#wallets}

Las billeteras de Ethereum pueden ser extensiones de navegador, aplicaciones de escritorio y móviles o contratos inteligentes en Ethereum. Existe una investigación activa sobre las billeteras de recuperación social que reducen parte del riesgo asociado con la gestión de claves de usuarios individuales. Asociada con el desarrollo de billeteras está la investigación sobre formas alternativas de abstracción de cuentas, que es un área importante de investigación incipiente.

#### Lecturas complementarias {#background-reading-7}

- [Introducción a las billeteras](/wallets/)
- [Introducción a la seguridad de las billeteras](/security/)
- [Seguridad en Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938: Abstracción de cuentas](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337: Abstracción de cuentas](https://eips.ethereum.org/EIPS/eip-4337)

#### Investigaciones recientes {#recent-research-7}

- [Billeteras de contratos inteligentes centradas en la validación](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [El futuro de las cuentas](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: Códigos de operación AUTH y AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publicación de código en una dirección EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Comunidad, educación y divulgación {#community-education-and-outreach}

La incorporación de nuevos usuarios a Ethereum requiere nuevos recursos educativos y enfoques de divulgación. Esto podría incluir publicaciones de blogs y artículos, libros, podcasts, memes, recursos didácticos, eventos y cualquier otra cosa que construya comunidades, dé la bienvenida a los principiantes y eduque a las personas sobre Ethereum.

### UX/UI {#uxui}

Para incorporar a más personas a Ethereum, el ecosistema debe mejorar la UX/UI. Esto requerirá que los diseñadores y expertos en productos reexaminen el diseño de las billeteras y aplicaciones.

#### Lecturas complementarias {#background-reading-8}

- [UX/UI en Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Investigaciones recientes {#recent-research-8}

- [Discord de diseño Web3](https://discord.gg/FsCFPMTSm9)
- [Principios de diseño Web3](https://www.web3designprinciples.com/)
- [Discusión sobre UX en Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Economía {#economics}

La investigación económica en Ethereum sigue en general dos enfoques: validar la seguridad de los mecanismos que dependen de incentivos económicos ("microeconomía") y analizar los flujos de valor entre protocolos, aplicaciones y usuarios ("macroeconomía"). Existen factores complejos de la criptoeconomía relacionados con el activo nativo de Ethereum (ether) y los tokens construidos sobre él (por ejemplo, NFT y tokens ERC-20).

#### Lecturas complementarias {#background-reading-9}

- [Grupo de Incentivos Robustos](https://rig.ethereum.org/)
- [Taller de ETHconomics en Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Investigaciones recientes {#recent-research-9}

- [Análisis empírico de EIP-1559](https://arxiv.org/abs/2201.05574)
- [Equilibrio de la oferta circulante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Cuantificación del MEV: ¿Qué tan oscuro es el bosque?](https://arxiv.org/abs/2101.05511)

### Espacio de bloques y mercados de tarifas {#blockspace-fee-markets}

Los mercados de espacio de bloques rigen la inclusión de transacciones de usuarios finales, ya sea directamente en Ethereum (capa 1) o en redes conectadas por puentes, por ejemplo, rollups (capa 2). En Ethereum, las transacciones se envían al mercado de tarifas implementado en el protocolo como EIP-1559, lo que protege a la cadena del spam y fija el precio de la congestión. En ambas capas, las transacciones pueden producir externalidades, conocidas como Valor Máximo Extraíble (MEV), que inducen nuevas estructuras de mercado para capturar o gestionar estas externalidades.

#### Lecturas complementarias {#background-reading-10}

- [Diseño del mecanismo de tarifas de transacción para la cadena de bloques de Ethereum: un análisis económico de EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulaciones de EIP-1559 (Grupo de Incentivos Robustos)](https://ethereum.github.io/abm1559)
- [Economía de los rollups desde los primeros principios](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, reordenamiento de transacciones e inestabilidad del consenso en intercambios descentralizados](https://arxiv.org/abs/1904.05234)

#### Investigaciones recientes {#recent-research-10}

- [Presentación en video de EIP-1559 multidimensional](https://youtu.be/QbR4MTgnCko)
- [MEV entre dominios](https://arxiv.org/abs/2112.01472)
- [Subastas de MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Incentivos de la prueba de participación (PoS) {#proof-of-stake-incentives}

Los validadores utilizan el activo nativo de Ethereum (ether) como colateral contra el comportamiento deshonesto. La criptoeconomía de esto determina la seguridad de la red. Los validadores sofisticados pueden explotar los matices de la capa de incentivos para lanzar ataques explícitos.

#### Lecturas complementarias {#background-reading-11}

- [Clase magistral de economía de Ethereum y modelo económico](https://github.com/CADLabs/ethereum-economic-model)
- [Simulaciones de incentivos de PoS (Grupo de Incentivos Robustos)](https://ethereum.github.io/beaconrunner/)

#### Investigaciones recientes {#recent-research-11}

- [Aumento de la resistencia a la censura de las transacciones bajo la separación proponente-constructor (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Tres ataques a Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Staking líquido y derivados {#liquid-staking-and-derivatives}

El staking líquido permite a los usuarios con menos de 32 ETH recibir rendimientos de staking al intercambiar ether por un token que representa el ether en staking que se puede usar en las finanzas descentralizadas (DeFi). Sin embargo, los incentivos y la dinámica del mercado asociados con el staking líquido aún se están descubriendo, así como su efecto en la seguridad de Ethereum (por ejemplo, riesgos de centralización).

#### Lecturas complementarias {#background-reading-12}

- [Staking líquido en Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: El camino hacia el staking de Ethereum sin necesidad de confianza](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Introducción al protocolo de staking](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Investigaciones recientes {#recent-research-12}

- [Manejo de retiros de Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Credenciales de retiro](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Los riesgos de los derivados de staking líquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Pruebas {#testing}

### Verificación formal {#formal-verification}

La verificación formal consiste en escribir código para verificar que las especificaciones de consenso de Ethereum sean correctas y no tengan errores. Existe una versión ejecutable de la especificación escrita en Python que requiere mantenimiento y desarrollo. Investigaciones adicionales pueden ayudar a mejorar la implementación en Python de la especificación y agregar herramientas que puedan verificar de manera más sólida la exactitud e identificar problemas.

#### Lecturas complementarias {#background-reading-13}

- [Introducción a la verificación formal](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Verificación formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Investigaciones recientes {#recent-research-13}

- [Verificación formal del contrato de depósito](https://github.com/runtimeverification/deposit-contract-verification)
- [Verificación formal de la especificación de la cadena de balizas](https://github.com/runtimeverification/deposit-contract-verification)

## Ciencia de datos y análisis {#data-science-and-analytics}

Existe la necesidad de más herramientas de análisis de datos y paneles que brinden información detallada sobre la actividad en Ethereum y la salud de la red.

### Lecturas complementarias {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Panel de diversidad de clientes](https://clientdiversity.org/)

#### Investigaciones recientes {#recent-research-14}

- [Análisis de datos del Grupo de Incentivos Robustos](https://rig.ethereum.org/)

## Aplicaciones y herramientas {#apps-and-tooling}

La capa de aplicación admite un ecosistema diverso de programas que liquidan transacciones en la capa base de Ethereum. Los equipos de desarrollo encuentran constantemente nuevas formas de aprovechar Ethereum para crear versiones componibles, sin permisos y resistentes a la censura de aplicaciones importantes de la Web2 o crear conceptos completamente nuevos nativos de la Web3. Al mismo tiempo, se están desarrollando nuevas herramientas que hacen que la creación de aplicaciones descentralizadas (dapps) en Ethereum sea menos compleja.

### DeFi {#defi}

Las finanzas descentralizadas (DeFi) son una de las principales clases de aplicaciones construidas sobre Ethereum. DeFi tiene como objetivo crear "legos de dinero" componibles que permitan a los usuarios almacenar, transferir, prestar, pedir prestado e invertir criptoactivos utilizando contratos inteligentes. DeFi es un espacio de rápido movimiento que se actualiza constantemente. Se necesita continuamente investigación sobre protocolos seguros, eficientes y accesibles.

#### Lecturas complementarias {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: ¿Qué es DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Investigaciones recientes {#recent-research-15}

- [¿Finanzas descentralizadas, propiedad centralizada?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: El camino hacia las transacciones de menos de un dólar](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Un caso de uso impactante para Ethereum es la capacidad de organizarse de manera descentralizada mediante el uso de DAO. Hay mucha investigación activa sobre cómo se pueden desarrollar y utilizar las DAO en Ethereum para ejecutar formas mejoradas de gobernanza, como una herramienta de coordinación de confianza minimizada, ampliando en gran medida las opciones de las personas más allá de las corporaciones y organizaciones tradicionales.

#### Lecturas complementarias {#background-reading-16}

- [Introducción a las DAO](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### Investigaciones recientes {#recent-research-16}

- [Mapeo del ecosistema de las DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Herramientas para desarrolladores {#developer-tools}

Las herramientas para los desarrolladores de Ethereum están mejorando rápidamente. Hay mucha investigación y desarrollo activos por hacer en esta área general.

#### Lecturas complementarias {#background-reading-17}

- [Herramientas por lenguaje de programación](/developers/docs/programming-languages/)
- [Entornos de desarrollo](/developers/docs/frameworks/)
- [Lista de herramientas para desarrolladores de consenso](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Estándares de tokens](/developers/docs/standards/tokens/)
- [CryptoDevHub: Herramientas de la EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Investigaciones recientes {#recent-research-17}

- [Canal de herramientas de consenso en el Discord de I+D de Eth](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oráculos {#oracles}

Los oráculos importan datos fuera de la cadena a la cadena de bloques de una manera descentralizada y sin permisos. Obtener estos datos en cadena permite que las dapps reaccionen a fenómenos del mundo real, como las fluctuaciones de precios en activos del mundo real, eventos en aplicaciones fuera de la cadena o incluso cambios en el clima.

#### Lecturas complementarias {#background-reading-18}

- [Introducción a los oráculos](/developers/docs/oracles/)

#### Investigaciones recientes {#recent-research-18}

- [Encuesta sobre oráculos de cadenas de bloques](https://arxiv.org/pdf/2004.07140.pdf)
- [Documento técnico de Chainlink](https://chain.link/whitepaper)

### Seguridad de las aplicaciones {#app-security}

Los hackeos en Ethereum generalmente explotan vulnerabilidades en aplicaciones individuales en lugar de en el protocolo en sí. Los piratas informáticos y los desarrolladores de aplicaciones están inmersos en una carrera armamentista para desarrollar nuevos ataques y defensas. Esto significa que siempre se requiere una importante investigación y desarrollo para mantener las aplicaciones a salvo de los hackeos.

#### Lecturas complementarias {#background-reading-19}

- [Informe del exploit de Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Lista de análisis posteriores a hackeos de contratos de Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Investigaciones recientes {#recent-research-19}

- [Aplicaciones en Ethresear.ch](https://ethresear.ch/c/applications/18)

### Pila tecnológica {#technology-stack}

Descentralizar toda la pila tecnológica de Ethereum es un área de investigación importante. Actualmente, las dapps en Ethereum comúnmente tienen algunos puntos de centralización porque dependen de herramientas o infraestructura centralizadas.

#### Lecturas complementarias {#background-reading-20}

- [Pila de Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Introducción a la pila Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introducción a los contratos inteligentes](/developers/docs/smart-contracts/)
- [Introducción al almacenamiento descentralizado](/developers/docs/storage/)

#### Investigaciones recientes {#recent-research-20}

- [Composabilidad de los contratos inteligentes](/developers/docs/smart-contracts/composability/)