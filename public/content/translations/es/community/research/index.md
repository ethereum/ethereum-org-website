---
title: "Áreas activas de investigación de Ethereum"
description: "Explore diferentes áreas de investigación abierta y aprenda cómo participar."
lang: es
---

Una de las principales fortalezas de Ethereum es que una comunidad activa de investigación e ingeniería lo mejora constantemente. A muchas personas entusiastas y capacitadas en todo el mundo les gustaría dedicarse a los problemas pendientes en Ethereum, pero no siempre es fácil descubrir cuáles son esos problemas. Esta página describe las áreas de investigación activas clave como una guía general de la vanguardia de Ethereum.

## Cómo funciona la investigación de Ethereum {#how-ethereum-research-works}

La investigación de Ethereum es abierta y transparente. La cultura es hacer que las herramientas y los resultados de la investigación sean lo más abiertos e interactivos posible, por ejemplo, a través de cuadernos ejecutables. La investigación de Ethereum avanza rápidamente, con nuevos hallazgos publicados y discutidos abiertamente en foros como [ethresear.ch](https://ethresear.ch/) en lugar de llegar a la comunidad a través de publicaciones tradicionales después de rondas de revisión por pares. La Fundación Ethereum también publica lo que está priorizando y por qué, para que cualquiera pueda ver qué problemas se consideran urgentes actualmente.

## Recursos generales de investigación {#general-research-resources}

Independientemente del tema específico, hay una gran cantidad de información sobre la investigación de Ethereum en [ethresear.ch](https://ethresear.ch) y en el [canal de Discord de I+D de Eth](https://discord.gg/qGpsxSA). Estos son los lugares principales donde los investigadores de Ethereum discuten las últimas ideas y oportunidades de desarrollo.

Para obtener una descripción general de hacia dónde se dirige el protocolo, comience con la [hoja de ruta de Ethereum](/roadmap/), luego lea la [Actualización de prioridades del protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) de la Fundación Ethereum y las [actualizaciones del grupo de protocolos](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) que informan el progreso al respecto. [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) es un punto de entrada estructurado para las personas que desean trabajar en el protocolo en sí.

## Fuentes de financiación {#sources-of-funding}

Puede participar en la investigación de Ethereum y recibir un pago por ello. [La Fundación Ethereum](/foundation/) financia la investigación y los bienes públicos a través de su [Programa de Apoyo al Ecosistema](https://esp.ethereum.foundation/applicants), que publica elementos de la lista de deseos y solicitudes de propuestas que describen los problemas que le gustaría ver resueltos. Puede encontrar información sobre oportunidades de financiación activas y futuras en [la página de subvenciones de Ethereum](/community/grants/).

## Investigación del protocolo {#protocol-research}

La investigación del protocolo se ocupa de la capa base de Ethereum: el conjunto de reglas que definen cómo los nodos se conectan, se comunican, intercambian y almacenan datos de Ethereum y llegan a un consenso sobre el estado de la cadena de bloques. Sus dos categorías de larga data son el consenso y la ejecución, y varios temas de investigación ahora abarcan ambas.

### Consenso {#consensus}

La investigación del consenso se ocupa del [mecanismo de prueba de participación (PoS) de Ethereum](/developers/docs/consensus-mechanisms/pos/): la seguridad de la regla de elección de bifurcación y el dispositivo de finalidad, la criptoeconomía del staking, la red entre pares que transporta bloques, certificaciones y datos de blob, y la criptografía con la que firman los validadores. Algunos ejemplos de temas de investigación de consenso son:

- identificar y parchear vulnerabilidades;
- cuantificar la seguridad criptoeconómica;
- reducir el tiempo que tarda un bloque en alcanzar la finalidad;
- y mejorar la eficiencia, la seguridad y el monitoreo de la red entre pares entre los clientes de consenso.

Gran parte de este trabajo ha pasado del papel a la especificación. El muestreo de disponibilidad de datos (DAS) se implementó en la actualización [Fusaka](/roadmap/fusaka/), los cambios en cómo se construyen los bloques y cómo se garantiza la inclusión de las transacciones se especifican para las próximas actualizaciones, y un rediseño a más largo plazo conocido como consenso ligero (lean consensus) está explorando una finalidad más rápida junto con firmas poscuánticas.

#### Lecturas complementarias {#background-reading}

- [Introducción a la prueba de participación](/developers/docs/consensus-mechanisms/pos/)
- [Finalidad de un solo slot](/roadmap/single-slot-finality/)
- [Documento de Casper FFG](https://arxiv.org/abs/1710.09437)
- [Documento de Gasper](https://arxiv.org/abs/2003.03052)
- [Ethereum ligero (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Investigación reciente {#recent-research}

- [Consenso en Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema de disponibilidad/finalidad](https://arxiv.org/abs/2009.04987)
- [Finalidad de 3 slots: SSF no se trata de un "solo" slot](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Ejecución {#execution}

La capa de ejecución se ocupa de ejecutar transacciones, ejecutar la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/) y generar cargas útiles de ejecución para pasar a la capa de consenso. La investigación aquí se divide en dos vertientes: hacer que el estado sea barato de mantener y probar, y aumentar la capacidad de procesamiento sin imponer más costos a las personas que ejecutan nodos. Hay muchas áreas activas de investigación, que incluyen:

- revaluar el costo de gas de las operaciones que crean estado;
- expiración del historial que los nodos ya no necesitan servir;
- listas de acceso a nivel de bloque que permiten validar transacciones en paralelo;
- mercados de tarifas multidimensionales que fijan el precio del estado, los datos y la computación por separado;
- y probar la ejecución de bloques de la capa 1 (l1) con una zkEVM.

#### Lecturas complementarias {#background-reading-1}

- [Introducción a la EVM](/developers/docs/evm/)
- [Capa de ejecución en Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Especificaciones de la capa de ejecución de Ethereum](https://github.com/ethereum/execution-specs)
- [Optimizaciones de bases de datos](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Investigación reciente {#recent-research-1}

- [EIP-7928: Listas de acceso a nivel de bloque](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Aumento del costo de gas para la creación de estado](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Mercado de tarifas multidimensional unificado](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, expiración del historial y recibos más simples](https://eips.ethereum.org/EIPS/eip-7642)
- [Lanzamiento de una zkEVM de l1: pruebas en tiempo real](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Resistencia a la censura y construcción de bloques {#censorship-resistance-and-block-building}

La mayoría de los bloques de Ethereum son ensamblados actualmente por un pequeño número de constructores especializados, lo que concentra el poder de decidir qué transacciones se incluyen. La investigación en esta área abarca la incorporación del mercado de constructores al protocolo en sí, de modo que los roles de proponer y construir un bloque estén separados por reglas de consenso en lugar de por software fuera del protocolo, y brindar a los validadores una forma de forzar la inclusión de transacciones que los constructores omiten.

#### Lecturas complementarias {#background-reading-21}

- [Separación proponente-constructor (PBS)](/roadmap/pbs/)
- [Elección de líder secreto único (SSLE)](/roadmap/secret-leader-election/)

#### Investigación reciente {#recent-research-21}

- [EIP-7732: Separación proponente-constructor consagrada](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Listas de inclusión aplicadas por elección de bifurcación](https://eips.ethereum.org/EIPS/eip-7805)
- [Aumento de la resistencia a la censura de las transacciones bajo la separación proponente-constructor](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Crecimiento del estado y ausencia de estado {#state-growth-and-statelessness}

Cada nodo completo almacena el estado de Ethereum, por lo que la velocidad a la que crece ese estado establece un piso en el costo de ejecutar uno. A corto plazo, la investigación se centra en revaluar las operaciones que crean estado y en la expiración del historial que los nodos ya no necesitan conservar. A más largo plazo, el plan es reemplazar el trie hexario de Merkle-Patricia de Ethereum con un árbol binario que produzca pruebas mucho más pequeñas, y avanzar hacia la ausencia de estado, para que un nodo pueda verificar bloques sin mantener todo el estado. El trabajo anterior en esta área asumía árboles Verkle; la propuesta actual es un árbol binario unificado, que traslada el programa de gas de testigo especificado para esa línea de trabajo anterior.

#### Lecturas complementarias {#background-reading-22}

- [Ausencia de estado y caducidad del estado](/roadmap/statelessness/)
- [Libro de ausencia de estado de Ethereum](https://stateless.fyi/)

#### Investigación reciente {#recent-research-22}

- [EIP-7864: Estado de Ethereum utilizando un árbol binario unificado](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Cambios en el costo de gas por ausencia de estado](https://eips.ethereum.org/EIPS/eip-4762)
- [Por qué el estado descentralizado es importante para Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Criptografía poscuántica {#post-quantum-cryptography}

Las firmas de los validadores de Ethereum y gran parte de su capa de aplicación dependen de la criptografía de curva elíptica, que una computadora cuántica suficientemente capaz rompería. Hacer que Ethereum sea resistente a los ataques cuánticos significa reemplazar esas firmas con alternativas basadas en hash o en retículos, manteniendo la agregación de firmas lo suficientemente eficiente para un gran conjunto de validadores y brindando a las cuentas existentes una ruta de migración. La Fundación Ethereum dirige un equipo dedicado a la tecnología poscuántica, y este es uno de los programas con el horizonte más largo en la hoja de ruta.

#### Lecturas complementarias {#background-reading-23}

- [Resistencia cuántica](/roadmap/security/quantum-resistance/)
- [Ethereum poscuántico](https://pq.ethereum.org/)

#### Investigación reciente {#recent-research-23}

- [Ethereum ligero (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Criptografía en Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Implementaciones de Ethereum ligero](https://github.com/leanEthereum)

## Desarrollo de clientes {#client-development}

Los clientes de Ethereum son implementaciones del protocolo de Ethereum. El desarrollo de clientes hace realidad los resultados de la investigación del protocolo al incorporarlos en estos clientes. El desarrollo de clientes incluye la actualización de las especificaciones del cliente, así como la construcción de implementaciones específicas.

Se requiere que un nodo de Ethereum ejecute dos piezas de software:

1. un cliente de consenso para realizar un seguimiento de la cabeza de la cadena de bloques, propagar bloques y manejar la lógica de consenso
2. un cliente de ejecución para admitir la Máquina Virtual de Ethereum y ejecutar transacciones y contratos inteligentes

Se están creando prototipos de nuevas clases de clientes junto con esos dos, incluidos clientes que prueban la ejecución de bloques de la capa 1 (l1) y clientes de consenso ligero construidos en torno a firmas poscuánticas.

Consulte la [página de nodos y clientes](/developers/docs/nodes-and-clients/) para obtener más detalles sobre nodos y clientes y para obtener una lista de todas las implementaciones de clientes actuales. También puede encontrar un historial de todas las actualizaciones de Ethereum en la [página de historial](/ethereum-forks/).

### Clientes de ejecución {#execution-clients}

- [Especificación del cliente de ejecución](https://github.com/ethereum/execution-specs)
- [Especificación de la API de ejecución](https://github.com/ethereum/execution-apis)

### Clientes de consenso {#consensus-clients}

- [Especificación del cliente de consenso](https://github.com/ethereum/consensus-specs)
- [Especificación de la API de Beacon](https://ethereum.github.io/beacon-APIs/)

### Clientes zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Lanzamiento de una zkEVM de l1: los fundamentos de seguridad](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Escalabilidad y rendimiento {#scaling-and-performance}

Escalar Ethereum es una gran área de enfoque para los investigadores de Ethereum, y se ejecuta en dos vías al mismo tiempo: aumentar la capacidad de procesamiento de la capa 1 (l1) en sí y trasladar la ejecución a los rollups que publican sus datos en Ethereum. El trabajo actual incluye aumentar el límite de gas del bloque, revaluar el crecimiento del estado, expandir la capacidad de blob para los datos de los rollups y reducir lo que un nodo tiene que almacenar y verificar. La información introductoria sobre el escalado de Ethereum está disponible en nuestra [página de escalabilidad](/developers/docs/scaling/) y en la [hoja de ruta de escalabilidad](/roadmap/scaling/).

### Capa 2 {#layer-2}

Ahora hay varios protocolos de capa 2 (l2) que escalan Ethereum utilizando diferentes técnicas para el procesamiento por lotes de transacciones y asegurándolas en la capa 1 de Ethereum. La investigación abierta incluye reducir la latencia y el costo de las pruebas, acortar el tiempo que tarda una transacción en alcanzar una finalidad sin necesidad de confianza y brindar a los usuarios una experiencia única y coherente en muchos rollups.

#### Lecturas complementarias {#background-reading-2}

- [Introducción a la capa 2](/layer-2/)
- [L2BEAT: resumen de escalabilidad](https://l2beat.com/scaling/summary)
- [Una hoja de ruta de Ethereum centrada en los rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Investigación reciente {#recent-research-2}

- [Capa 2 en Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: costos en cadena](https://l2beat.com/scaling/costs)
- [Construyendo en Ethereum en 2026: qué ha cambiado](/latest/building-on-ethereum-in-2026/)

### Interoperabilidad {#interoperability}

Los usuarios y los activos están distribuidos en la capa 1 de Ethereum y en muchas capas 2, y el problema de investigación es permitirles moverse y actuar a través de esas cadenas sin confiar en un intermediario. El trabajo aquí cubre transferencias basadas en intenciones, direccionamiento y nombres estandarizados intercadena, paso de mensajes generales y abstracción de cadenas a nivel de billetera. Esto reemplaza un modelo en el que los puentes de custodia mantenían los activos, y los puentes han sido históricamente una de las mayores fuentes de pérdidas en el ecosistema, por lo que la seguridad de cualquier mecanismo intercadena sigue siendo una preocupación central.

#### Lecturas complementarias {#background-reading-3}

- [Introducción a los puentes de cadenas de bloques](/bridges/)
- [Hacer que Ethereum vuelva a sentirse como una sola cadena](https://blog.ethereum.org/2025/11/18/eil)
- [Marco de intenciones abiertas](https://openintents.xyz/)
- [Validación de puentes](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Investigación reciente {#recent-research-3}

- [ERC-7683: Intenciones intercadena](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Direcciones interoperables](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Nombres interoperables](https://eips.ethereum.org/EIPS/eip-7828)

### Disponibilidad de datos y escalabilidad de blob {#data-availability-and-blob-scaling}

Los rollup publican sus datos en Ethereum en blobs, y escalar esa capa de datos es un problema de investigación por derecho propio, separado de la ejecución de escalabilidad. Ethereum ahora utiliza el muestreo de disponibilidad de datos (DAS), por lo que los validadores pueden verificar que los datos de blob se publicaron muestreando partes de ellos en lugar de descargarlos todos, y la capacidad de blob se incrementa gradualmente a través de bifurcaciones duras solo de parámetros de blob. Las preguntas abiertas incluyen hasta dónde se puede llevar el muestreo, cómo mantener los requisitos de ancho de banda manejables para las personas que hacen staking en casa y cómo los precios de los blob deberían responder a la demanda.

#### Lecturas complementarias {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Actualización Fusaka](/roadmap/fusaka/)
- [danksharding](/roadmap/danksharding/)
- [Disponibilidad de datos](/developers/docs/data-availability/)
- [EIP-4844: Transacciones de blob de fragmento](https://eips.ethereum.org/EIPS/eip-4844)
- [Notas sobre Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Investigación reciente {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Bifurcaciones duras solo de parámetros de blob](https://eips.ethereum.org/EIPS/eip-7892)
- [Fragmentación en Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Hardware {#hardware}

[Ejecutar nodos](/developers/docs/nodes-and-clients/run-a-node/) en hardware modesto es fundamental para mantener a Ethereum descentralizado, por lo que cada aumento en la capacidad de procesamiento debe sopesarse frente a lo que le cuesta a un operador de nodo. Con el aumento del límite de gas del bloque y los aumentos adicionales planeados, la investigación activa cubre el crecimiento del estado y cómo fijarle un precio, la sincronización y el rendimiento de la base de datos en un estado más grande, los ahorros de disco disponibles a partir de la expiración del historial y, finalmente, la ausencia de estado.

#### Lecturas complementarias {#background-reading-5}

- [Ponga en marcha su propio nodo de Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Ausencia de estado y caducidad del estado](/roadmap/statelessness/)
- [Ethereum en ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Investigación reciente {#recent-research-5}

- [Escalando Ethereum: el camino hacia un límite de gas más alto y más allá](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Programa de límite de gas](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Aumento del costo de gas para la creación de estado](https://eips.ethereum.org/EIPS/eip-8037)

## Seguridad {#security}

La seguridad es un tema amplio que puede incluir la prevención de spam y estafas, la seguridad de la billetera, la seguridad del hardware, la seguridad criptoeconómica, la resistencia a la censura, la preparación poscuántica, la búsqueda de errores y las pruebas y la verificación de aplicaciones y software de cliente. La [hoja de ruta de seguridad](/roadmap/security/) de Ethereum cubre el trabajo a nivel de protocolo.

### Criptografía y ZKP {#cryptography--zkp}

Las pruebas de conocimiento cero (ZKP) y la criptografía son fundamentales para incorporar privacidad y seguridad en Ethereum y sus aplicaciones. Las pruebas de conocimiento cero han pasado de la investigación a la infraestructura de producción: los probadores que prueban bloques reales de Ethereum ahora se evalúan públicamente en cuanto a latencia, costo y solidez. Los problemas abiertos han cambiado en consecuencia, hacia la prueba de bloques de la capa 1 (l1) lo suficientemente rápido como para hacerlo en tiempo real, dando cuenta rigurosamente de la seguridad de los sistemas de prueba en uso y preparándose para la criptografía poscuántica.

#### Lecturas complementarias {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Privacidad](/roadmap/privacy/)
- [Podcast de Zero Knowledge](https://zeroknowledge.fm/)

#### Investigación reciente {#recent-research-6}

- [ZK en Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Criptografía en Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Calculadora de solidez para sistemas de prueba zkEVM basados en hash](https://github.com/ethereum/soundcalc)
- [Lanzamiento de una zkEVM de l1: los fundamentos de seguridad](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Billeteras {#wallets}

Las billeteras de Ethereum pueden ser extensiones de navegador, aplicaciones de escritorio y móviles o contratos inteligentes en Ethereum. La abstracción de cuentas ya no es experimental: ERC-4337 proporciona cuentas inteligentes sin cambios en el protocolo, y EIP-7702 permite que una cuenta ordinaria establezca código para que el procesamiento por lotes de transacciones, el patrocinio de gas y la recuperación social funcionen con la dirección que un usuario ya tiene. La investigación abierta ahora se centra en la abstracción de cuentas nativa en el protocolo en sí, en arquitecturas de cuentas modulares y auditables, y en la gestión y recuperación de claves que las personas comunes pueden operar de manera segura.

#### Lecturas complementarias {#background-reading-7}

- [Introducción a las billeteras](/wallets/)
- [Introducción a la seguridad de la billetera](/security/)
- [Abstracción de cuentas](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Seguridad en Ethresear.ch](https://ethresear.ch/c/security/25)

#### Investigación reciente {#recent-research-7}

- [EIP-8141: Transacción de marco](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: API de llamada de billetera](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Descubrimiento de múltiples proveedores inyectados](https://eips.ethereum.org/EIPS/eip-6963)
- [Billeteras de contratos inteligentes centradas en la validación](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Comunidad, educación y divulgación {#community-education-and-outreach}

La incorporación de nuevos usuarios a Ethereum requiere nuevos recursos educativos y enfoques de divulgación. Esto podría incluir publicaciones de blog y artículos, libros, podcasts, memes, recursos didácticos, eventos y cualquier otra cosa que construya comunidades, dé la bienvenida a los recién llegados y eduque a las personas sobre Ethereum.

### Diseño y UX {#design-and-ux}

Para incorporar a más personas a Ethereum, el ecosistema debe mejorar su diseño y experiencia de usuario. Esto requiere que los diseñadores y expertos en productos reexaminen cómo funcionan las billeteras y las aplicaciones, y cada vez más significa diseñar en función de los estándares que ya existen: llamadas de billetera por lotes, patrocinio de gas, cuentas que se pueden recuperar y direcciones legibles por humanos que llevan la cadena a la que pertenecen. Hay comparativamente pocos lugares canónicos para la investigación de UX de Web3, por lo que los estudios publicados y la orientación de diseño tienden a estar dispersos.

#### Lecturas complementarias {#background-reading-8}

- [Diseño y UX en Web3](/developers/docs/design-and-ux/)
- [Hoja de ruta de la experiencia del usuario de Ethereum](/roadmap/user-experience/)
- [Libro de jugadas de diseño de Web3](https://learnweb3.design/)
- [Manual de diseño de UX de Web3](https://web3ux.design/)

#### Investigación reciente {#recent-research-8}

- [UX/UI en Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: API de llamada de billetera](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Nombres interoperables](https://eips.ethereum.org/EIPS/eip-7828)

### Economía {#economics}

La investigación económica en Ethereum sigue en general dos enfoques: validar la seguridad de los mecanismos que dependen de incentivos económicos ("microeconomía") y analizar los flujos de valor entre protocolos, aplicaciones y usuarios ("macroeconomía"). Existen factores criptoeconómicos complejos relacionados con el activo nativo de Ethereum (ether) y los tokens construidos sobre él (por ejemplo, NFT y tokens ERC-20).

#### Lecturas complementarias {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Clase magistral de economía de Ethereum y modelo económico](https://github.com/CADLabs/ethereum-economic-model)

#### Investigación reciente {#recent-research-9}

- [Economía en Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Equilibrio de la oferta circulante](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Cuantificando el MEV: ¿Qué tan oscuro es el bosque?](https://arxiv.org/abs/2101.05511)

### Espacio de bloque y mercados de tarifas {#blockspace-fee-markets}

Los mercados de espacio de bloque rigen la inclusión de transacciones de usuarios finales, ya sea directamente en Ethereum (capa 1) o en redes puenteadas, por ejemplo, rollup (capa 2). En Ethereum, las transacciones se envían al mercado de tarifas implementado en el protocolo como EIP-1559, protegiendo la cadena del spam y fijando el precio de la congestión. En ambas capas, las transacciones pueden producir externalidades, conocidas como Valor Máximo Extraíble (MEV), que inducen nuevas estructuras de mercado para capturar o gestionar estas externalidades. El trabajo actual extiende esto a la fijación de precios de varios recursos a la vez, ya que el estado, los datos y la computación se congestionan de forma independiente, y a cambiar quién ensambla los bloques y en qué términos.

#### Lecturas complementarias {#background-reading-10}

- [Diseño del mecanismo de tarifas de transacción para la cadena de bloques de Ethereum: un análisis económico de EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulaciones de EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Economía de los rollups desde los primeros principios](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, reordenamiento de transacciones e inestabilidad del consenso en intercambios descentralizados](https://arxiv.org/abs/1904.05234)

#### Investigación reciente {#recent-research-10}

- [EIP-7999: Mercado de tarifas multidimensional unificado](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Listas de acceso a nivel de bloque](https://eips.ethereum.org/EIPS/eip-7928)
- [MEV de dominio cruzado](https://arxiv.org/abs/2112.01472)

### Incentivos de prueba de participación {#proof-of-stake-incentives}

Los validadores utilizan el activo nativo de Ethereum (ether) como colateral contra el comportamiento deshonesto. La criptoeconomía de esto determina la seguridad de la red. Los validadores sofisticados pueden explotar los matices de la capa de incentivos para lanzar ataques explícitos. Desde la actualización Pectra, los validadores también pueden mantener y ganar con un saldo efectivo mucho mayor y consolidar varios validadores en uno, lo que cambia la economía de ejecutarlos.

#### Lecturas complementarias {#background-reading-11}

- [Saldo efectivo máximo](/roadmap/pectra/maxeb/)
- [Clase magistral de economía de Ethereum y modelo económico](https://github.com/CADLabs/ethereum-economic-model)
- [Simulaciones de incentivos de PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Investigación reciente {#recent-research-11}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Tres ataques a Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Staking líquido y derivados {#liquid-staking-and-derivatives}

El staking líquido permite a los usuarios con menos de 32 ETH recibir rendimientos de staking intercambiando ether por un token que representa el ether en staking que se puede usar en DeFi. Sin embargo, los incentivos y la dinámica del mercado asociados con el staking líquido aún se están descubriendo, así como su efecto en la seguridad de Ethereum (por ejemplo, riesgos de centralización).

#### Lecturas complementarias {#background-reading-12}

- [Staking líquido en Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: El camino hacia el staking de Ethereum sin necesidad de confianza](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Investigación reciente {#recent-research-12}

- [Los riesgos de los derivados de staking líquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Manejo de retiros de Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Pruebas {#testing}

### Pruebas de clientes y redes {#client-and-network-testing}

Las especificaciones de Ethereum son ejecutables, y los accesorios de prueba generados a partir de ellas son con lo que los equipos de clientes verifican sus implementaciones. Junto a ellos, los arneses de prueba compartidos ejecutan clientes entre sí y contra condiciones de red deliberadamente hostiles, y las redes de prueba públicas ejercitan las actualizaciones antes de que lleguen a la Red principal. Mejorar esta infraestructura es uno de los trabajos de mayor impacto disponibles, porque así es como se detectan los errores antes de que lleguen a los usuarios.

#### Lecturas complementarias {#background-reading-24}

- [Especificaciones de la capa de ejecución de Ethereum](https://github.com/ethereum/execution-specs)
- [Especificación del cliente de consenso](https://github.com/ethereum/consensus-specs)

#### Investigación reciente {#recent-research-24}

- [hive, un arnés de prueba de cliente de extremo a extremo](https://github.com/ethereum/hive)
- [Assertoor, una herramienta de prueba de red de prueba](https://github.com/ethpandaops/assertoor)

### Verificación formal {#formal-verification}

La verificación formal utiliza pruebas matemáticas verificadas por máquina para establecer que una especificación o una implementación se comporta según lo previsto. En Ethereum, esto cubre probar que las implementaciones de EVM coinciden con una semántica formal, probar la solidez de los circuitos y los sistemas de prueba en los que confían los probadores de conocimiento cero, y verificar las primitivas criptográficas debajo de ellos. Investigaciones adicionales pueden fortalecer estas pruebas y extenderlas a una mayor parte de la pila.

#### Lecturas complementarias {#background-reading-13}

- [zkEVM verificadas](https://verified-zkevm.org/)
- [Verificación formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Investigación reciente {#recent-research-13}

- [Descripción general del proyecto zkEVM verificado](https://github.com/Verified-zkEVM/Overview)
- [KEVM: semántica de la EVM en K](https://github.com/runtimeverification/evm-semantics)
- [Verificación formal del contrato de depósito](https://github.com/runtimeverification/deposit-contract-verification)

## Ciencia de datos y análisis {#data-science-and-analytics}

Existe la necesidad de más herramientas de análisis de datos y paneles que brinden información detallada sobre la actividad en Ethereum y la salud de la red. Gran parte de los datos subyacentes son públicos y consultables, por lo que la brecha suele estar en el análisis y la presentación en lugar de en el acceso.

### Lecturas complementarias {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Panel de diversidad de clientes](https://clientdiversity.org/)
- [Especificación de la API de ejecución JSON-RPC de Ethereum](https://ethereum.github.io/execution-apis/)

#### Investigación reciente {#recent-research-14}

- [Análisis de datos del Robust Incentives Group](https://rig.ethereum.org/)
- [Datos abiertos de ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: resumen de escalabilidad](https://l2beat.com/scaling/summary)

## Aplicaciones y herramientas {#apps-and-tooling}

La capa de aplicación admite un ecosistema diverso de programas que liquidan transacciones en la capa base de Ethereum. Los equipos de desarrollo encuentran constantemente nuevas formas de aprovechar Ethereum para crear versiones componibles, sin permisos y resistentes a la censura de aplicaciones importantes de Web2 o crear conceptos nativos de Web3 completamente nuevos. Al mismo tiempo, se están desarrollando nuevas herramientas que hacen que la construcción de aplicaciones descentralizadas (dapps) en Ethereum sea menos compleja.

### DeFi {#defi}

Las finanzas descentralizadas (DeFi) son una de las principales clases de aplicaciones construidas sobre Ethereum. DeFi tiene como objetivo crear "legos de dinero" componibles que permitan a los usuarios almacenar, transferir, prestar, pedir prestado e invertir criptoactivos utilizando contratos inteligentes. DeFi es un espacio de rápido movimiento que se actualiza constantemente. Se necesita continuamente investigación sobre protocolos seguros, eficientes y accesibles.

#### Lecturas complementarias {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: ¿Qué es DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Investigación reciente {#recent-research-15}

- [¿Finanzas descentralizadas, propiedad centralizada?](https://arxiv.org/pdf/2012.09306.pdf)
- [Aplicaciones en Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAO {#daos}

Un caso de uso impactante para Ethereum es la capacidad de organizarse de manera descentralizada mediante el uso de DAO. Hay mucha investigación activa sobre cómo se pueden desarrollar y utilizar las DAO en Ethereum para ejecutar formas mejoradas de gobernanza, como una herramienta de coordinación de confianza minimizada, ampliando en gran medida las opciones de las personas más allá de las corporaciones y organizaciones tradicionales.

#### Lecturas complementarias {#background-reading-16}

- [Introducción a las DAO](/dao/)

#### Investigación reciente {#recent-research-16}

- [Mapeo del ecosistema DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Herramientas para desarrolladores {#developer-tools}

Las herramientas para los desarrolladores de Ethereum están mejorando rápidamente. Hay mucha investigación y desarrollo activos por hacer en esta área general.

#### Lecturas complementarias {#background-reading-17}

- [Herramientas por lenguaje de programación](/developers/docs/programming-languages/)
- [Marcos de desarrollo](/developers/docs/frameworks/)
- [Introducción a las dapps](/developers/docs/dapps/)
- [Estándares de tokens](/developers/docs/standards/tokens/)

#### Investigación reciente {#recent-research-17}

- [Discord de I+D de Eth](https://discord.gg/qGpsxSA)
- [Especificaciones de la API de ejecución de Ethereum](https://github.com/ethereum/execution-apis)

### Oráculos {#oracles}

Los oráculos importan datos fuera de la cadena a la cadena de bloques de una manera descentralizada y sin permisos. Obtener estos datos en cadena permite que las dapps sean reactivas a fenómenos del mundo real, como fluctuaciones de precios en activos del mundo real, eventos en aplicaciones fuera de la cadena o incluso cambios en el clima.

#### Lecturas complementarias {#background-reading-18}

- [Introducción a los oráculos](/developers/docs/oracles/)

#### Investigación reciente {#recent-research-18}

- [Encuesta de oráculos de cadenas de bloques](https://arxiv.org/pdf/2004.07140.pdf)

### Seguridad de las aplicaciones {#app-security}

Los hackeos en Ethereum generalmente explotan vulnerabilidades en aplicaciones individuales en lugar de en el protocolo en sí. Los hackers y los desarrolladores de aplicaciones están enfrascados en una carrera armamentista para desarrollar nuevos ataques y defensas. Esto significa que siempre se requiere investigación y desarrollo importantes para mantener las aplicaciones a salvo de hackeos.

#### Lecturas complementarias {#background-reading-19}

- [Seguridad de los contratos inteligentes](/developers/docs/smart-contracts/security/)
- [Informe de vulnerabilidad de Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Lista de autopsias de hackeos de contratos de Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Investigación reciente {#recent-research-19}

- [Aplicaciones en Ethresear.ch](https://ethresear.ch/c/applications/18)

### Pila tecnológica {#technology-stack}

Descentralizar toda la pila tecnológica de Ethereum es un área de investigación importante. Actualmente, las dapps en Ethereum comúnmente tienen algunos puntos de centralización porque dependen de herramientas o infraestructura centralizadas. Reducir esa dependencia significa hacer que sea práctico para las aplicaciones leer Ethereum sin confiar en un solo proveedor, que es donde entran en juego los clientes ligeros y el acceso sin necesidad de confianza a los datos del nodo.

#### Lecturas complementarias {#background-reading-20}

- [Pila de Ethereum](/developers/docs/ethereum-stack/)
- [Clientes ligeros](/developers/docs/nodes-and-clients/light-clients/)
- [Introducción a los contratos inteligentes](/developers/docs/smart-contracts/)
- [Introducción al almacenamiento descentralizado](/developers/docs/storage/)

#### Investigación reciente {#recent-research-20}

- [Composabilidad de los contratos inteligentes](/developers/docs/smart-contracts/composability/)
- [Coinbase: Introducción a la pila de Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)