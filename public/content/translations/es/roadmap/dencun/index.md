---
title: "Cancún-Deneb (Dencun)"
metaTitle: "Preguntas frecuentes sobre Cancún-Deneb (Dencun)"
description: "Preguntas frecuentes sobre la actualización de la red Cancún-Deneb (Dencun)"
lang: es
---

Cancún-Deneb (Dencun) es una actualización de la red Ethereum, que activa **Proto-Danksharding (EIP-4844)**, introduciendo **blobs** de datos temporales para un almacenamiento más económico de los rollup de [capa 2 (L2)](/glossary/#layer-2).

Un nuevo tipo de transacción permite a los proveedores de rollup almacenar datos de manera más rentable en lo que se conoce como "blobs". Se garantiza que los blobs estén disponibles para la red durante unos 18 días (más precisamente, 4096 [épocas](/glossary/#epoch)). Después de este período, los blobs se eliminan de la red, pero las aplicaciones aún pueden verificar la validez de sus datos utilizando pruebas. 

Esto reduce significativamente el costo de los rollup, limita el crecimiento de la cadena y ayuda a dar soporte a más usuarios mientras mantiene la seguridad y un conjunto descentralizado de operadores de nodos.

## ¿Cuándo esperamos que los rollup reflejen tarifas más bajas debido a Proto-Danksharding? {#when}

- Esta actualización se activó en la época 269568, el **13 de marzo de 2024 a las 13:55 (UTC)**
- Todos los principales proveedores de rollup, como Arbitrum u Optimism, han señalado que los blobs serán compatibles inmediatamente después de la actualización.
- El cronograma para el soporte individual de cada rollup puede variar, ya que cada proveedor debe actualizar sus sistemas para aprovechar el nuevo espacio de blobs.

## ¿Cómo se puede convertir ETH después de la bifurcación dura? {#scam-alert}

- **No se requiere ninguna acción para su ETH**: Tras la actualización Dencun de Ethereum, no hay necesidad de convertir o actualizar su ETH. Los saldos de su cuenta seguirán siendo los mismos, y el ETH que posee actualmente seguirá siendo accesible en su forma actual después de la bifurcación dura.
- **¡Cuidado con las estafas!** <Emoji text="⚠️" /> **cualquiera que le indique que "actualice" su ETH está intentando estafarle.** No hay nada que deba hacer en relación con esta actualización. Sus activos permanecerán completamente inalterados. Recuerde, mantenerse informado es la mejor defensa contra las estafas.

[Más sobre cómo reconocer y evitar estafas](/security/)

## ¿Qué problema resuelve la actualización de la red Dencun? {#network-impact}

Dencun aborda principalmente la **escalabilidad** (manejar más usuarios y más transacciones) con **tarifas asequibles**, mientras **mantiene la descentralización** de la red.

La comunidad de Ethereum ha estado adoptando un enfoque "centrado en los rollup" para su crecimiento, lo que sitúa a los rollup de capa 2 (L2) como el medio principal para dar soporte de forma segura a más usuarios.

Las redes rollup manejan el _procesamiento_ (o "ejecución") de las transacciones de forma separada de la Red principal y luego publican una prueba criptográfica y/o datos de transacciones comprimidos de los resultados de vuelta a la Red principal para su registro. Almacenar estas pruebas conlleva un gasto (en forma de [gas](/glossary/#gas)), que, antes de Proto-Danksharding, tenía que ser almacenado permanentemente por todos los operadores de nodos de la red, convirtiéndolo en una tarea costosa.

La introducción de Proto-Danksharding en la actualización Dencun añade un almacenamiento de datos más económico para estas pruebas al requerir únicamente que los operadores de nodos almacenen estos datos durante unos 18 días, después de los cuales los datos pueden eliminarse de forma segura para evitar la expansión de los requisitos de hardware. Debido a que los rollup suelen tener un período de retiro de 7 días, su modelo de seguridad no cambia siempre que los blobs estén disponibles en la capa 1 (L1) durante esta duración. La ventana de eliminación de 18 días proporciona un margen significativo para este período.

[Más sobre el escalado de Ethereum](/roadmap/scaling/)

## ¿Cómo se accede a los datos antiguos de los blobs? {#historical-access}

Mientras que los nodos regulares de Ethereum siempre mantendrán el _estado actual_ de la red, los datos históricos de los blobs pueden descartarse aproximadamente 18 días después de su introducción. Antes de descartar estos datos, Ethereum se asegura de que se hayan puesto a disposición de todos los participantes de la red, dando tiempo para:

- Que las partes interesadas descarguen y almacenen los datos.
- La finalización de todos los períodos de desafío de los rollup.
- La finalización de las transacciones de los rollup.

Los datos _históricos_ de los blobs pueden ser deseados por diversas razones y pueden almacenarse y accederse utilizando varios protocolos descentralizados:

- **Protocolos de índice de terceros**, como The Graph, almacenan estos datos a través de una red descentralizada de operadores de nodos incentivados por mecanismos criptoeconómicos.
- **BitTorrent** es un protocolo descentralizado donde los voluntarios pueden guardar y distribuir estos datos a otros.
- **[Portal Network de Ethereum](/developers/docs/networking-layer/portal-network/)** tiene como objetivo proporcionar acceso a todos los datos de Ethereum a través de una red descentralizada de operadores de nodos mediante la distribución de datos entre los participantes de manera similar a BitTorrent.
- **Los usuarios individuales** siempre son libres de almacenar sus propias copias de cualquier dato que deseen para referencia histórica.
- **Los proveedores de rollup** están incentivados a almacenar estos datos para mejorar la experiencia de usuario de su rollup.
- **Los exploradores de bloques** suelen ejecutar nodos de archivo que indexan y almacenan toda esta información para facilitar la referencia histórica, accesible a los usuarios a través de una interfaz web.

Es importante tener en cuenta que la recuperación del estado histórico opera en un **modelo de confianza 1 de N**. Esto significa que solo necesita datos de _una única fuente confiable_ para verificar su exactitud utilizando el estado actual de la red.

## ¿Cómo contribuye esta actualización a la hoja de ruta más amplia de Ethereum? {#roadmap-impact}

Proto-Danksharding prepara el escenario para la implementación completa del [danksharding](/roadmap/danksharding/). El danksharding está diseñado para distribuir el almacenamiento de los datos de los rollup entre los operadores de nodos, de modo que cada operador solo necesite manejar una pequeña parte de los datos totales. Esta distribución aumentará el número de blobs de datos por bloque, lo cual es esencial para escalar Ethereum y manejar más usuarios y transacciones.

Esta escalabilidad es crucial para [dar soporte a miles de millones de usuarios en Ethereum](/roadmap/scaling/) con tarifas asequibles y aplicaciones más avanzadas, mientras se mantiene una red descentralizada. Sin estos cambios, las demandas de hardware para los operadores de nodos aumentarían, lo que llevaría a la necesidad de equipos cada vez más costosos. Esto podría dejar fuera del mercado a los operadores más pequeños, resultando en una concentración del control de la red entre unos pocos operadores grandes, lo que iría en contra del principio de descentralización.

## ¿Afecta esta actualización a todos los clientes de consenso y validadores de Ethereum? {#client-impact}

Sí, Proto-Danksharding (EIP-4844) requiere actualizaciones tanto para los clientes de ejecución como para los clientes de consenso. Todos los principales clientes de Ethereum han lanzado versiones compatibles con la actualización. Para mantener la sincronización con la red Ethereum después de la actualización, los operadores de nodos deben asegurarse de que están ejecutando una versión de cliente compatible. Tenga en cuenta que la información sobre las versiones de los clientes es sensible al tiempo, y los usuarios deben consultar las últimas actualizaciones para obtener los detalles más recientes. [Ver detalles sobre las versiones de clientes compatibles](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Los clientes de consenso manejan el software del _validador_, el cual ha sido actualizado en su totalidad para adaptarse a la actualización.

## ¿Cómo afecta Cancún-Deneb (Dencun) a las redes de prueba de Ethereum? {#testnet-impact}

- Las redes de desarrollo (devnets), Sepolia y Holesky han pasado por la actualización Dencun y tienen Proto-Danksharding funcionando completamente.
- Los desarrolladores de rollup pueden usar estas redes para realizar pruebas de EIP-4844.
- La mayoría de los usuarios no se verán afectados en absoluto por este cambio en cada red de prueba.

## ¿Todas las transacciones en las L2 usarán ahora espacio de blobs temporal, o se podrá elegir? {#calldata-vs-blobs}

Las transacciones de rollup en la capa 2 (L2) de Ethereum tienen la opción de usar dos tipos de almacenamiento de datos: espacio de blobs temporal o datos de llamada (calldata) de contratos inteligentes permanentes. El espacio de blobs es una opción económica, que proporciona almacenamiento temporal a un costo menor. Garantiza la disponibilidad de los datos para todos los períodos de desafío necesarios. Por otro lado, los datos de llamada de los contratos inteligentes ofrecen almacenamiento permanente, pero son más caros.

La decisión entre usar espacio de blobs o datos de llamada la toman principalmente los proveedores de rollup. Basan esta decisión en la demanda actual de espacio de blobs. Si el espacio de blobs tiene una gran demanda, los rollup pueden optar por los datos de llamada para garantizar que los datos se publiquen de manera oportuna.

Aunque teóricamente es posible que los usuarios elijan su tipo de almacenamiento preferido, los proveedores de rollup suelen gestionar esta elección. Ofrecer esta opción a los usuarios añadiría complejidad, particularmente en las transacciones de agrupación rentables. Para obtener detalles específicos sobre esta elección, los usuarios deben consultar la documentación proporcionada por los proveedores de rollup individuales.

## ¿Reducirá 4844 el gas de la L1? {#l1-fee-impact}

No de manera significativa. Se introduce un nuevo mercado de gas exclusivamente para el espacio de blobs, para uso de los proveedores de rollup. _Aunque las tarifas en la capa 1 (L1) pueden reducirse al descargar los datos de los rollup a los blobs, esta actualización se centra principalmente en la reducción de las tarifas de la L2. La reducción de las tarifas en la L1 (Red principal) puede ocurrir como un efecto de segundo orden en menor medida._

- La reducción de gas en la L1 será proporcional a la adopción/uso de datos de blobs por parte de los proveedores de rollup.
- Es probable que el gas de la L1 siga siendo competitivo debido a la actividad no relacionada con los rollup.
- Los rollup que adopten el uso del espacio de blobs demandarán menos gas de la L1, lo que ayudará a empujar las tarifas de gas de la L1 a la baja a corto plazo.
- El espacio de blobs sigue siendo limitado, por lo que si los blobs dentro de un bloque están saturados/llenos, es posible que se requiera que los rollup publiquen sus datos como datos permanentes mientras tanto, lo que impulsaría al alza los precios del gas de la L1 y la L2.

## ¿Reducirá esto las tarifas en otras cadenas de bloques de capa 1 compatibles con la EVM? {#alt-l1-fee-impact}

No. Los beneficios de Proto-Danksharding son específicos para los rollup de capa 2 (L2) de Ethereum que almacenan sus pruebas en la capa 1 (Red principal).

El simple hecho de ser compatible con la Máquina Virtual de Ethereum (EVM) no significa que una red vaya a ver algún beneficio de esta actualización. Las redes que operan independientemente de Ethereum (sean compatibles con la EVM o no) no almacenan sus datos en Ethereum y no verán ningún beneficio de esta actualización.

[Más sobre los rollup de capa 2](/layer-2/)

## ¿Aprende mejor de forma visual? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Desbloqueando el escalado de Ethereum, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 con Domothy — Bankless_

## Lecturas adicionales {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transacciones de blobs de fragmentos (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Anuncio de Dencun en la Red principal](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog de la Fundación Ethereum_
- [La guía del autoestopista para Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Preguntas frecuentes sobre Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Una explicación en profundidad de EIP-4844: El núcleo de la actualización Cancún](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Actualización 016 de AllCoreDevs](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_