---
title: Preguntas frecuentes sobre Cancun-Deneb (Dencun)
description: Preguntas frecuentes relacionadas con la actualización de red Cancun-Deneb (Dencun)
lang: es
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) es una actualización de la red de Ethereum, la cual activa **Proto-Danksharding (EIP-4844)**, introduciendo los **blobs** de datos temporales para tener un almacenamiento más barato en los rollups de [capa 2 (L2)](/glossary/#layer-2).

Un nuevo tipo de transacción permite a los proveedores de los rollups almacenar datos de una manera más rentable a través de los denominados "blobs". Los blobs ofrecen garantía de disponibilidad en la red durante 18 días (más precisamente, 4096 [épocas](/glossary/#epoch)). Tras este período, los blobs son eliminados de la red, pero las aplicaciones aún pueden verificar la validez de sus datos mediante pruebas.

Esto reduce significativamente el costo de los rollups, límita el crecimiento de la cadena y ayuda a dar soporte a más usuarios mientras se mantiene la seguridad y un conjunto descentralizado de operadores de nodos.

## ¿Cuándo esperamos que los rollups reflejen tarifas más bajas gracias al Proto-Danksharding? {#when}

- Esta actualización se activó en la época 269568, el **13 de marzo de 2024 a las 13:55 p. m. (UTC)**.
- Todos los principales proveedores de rollups, como Arbitrum u Optimism, han señalado que los blobs serán compatibles inmediatamente después de la actualización.
- El cronograma para el soporte de rollup individual puede variar, ya que cada proveedor debe actualizar sus sistemas para aprovechar el nuevo espacio de blobs.

## ¿Cómo se puede convertir ETH después de la bifurcación dura? {#scam-alert}

- **No se requiere ninguna acción para su ETH**: Después de la actualización Ethereum Dencun, no hay necesidad de convertir o actualizar su ETH. Los saldos de su cuenta seguirán siendo los mismos, y el ETH que tiene actualmente seguirá siendo accesible en su forma existente después de la bifurcación dura.
- **¡Cuídese de fraudes!** <Emoji text="⚠️" /> **Cualquiera que le indique que "actualice" su ETH está tratando de estafarlo.** No hay nada que tenga que hacer en relación con esta actualización. Sus activos no se verán afectados en absoluto. Recuerde, mantenerse informado es la mejor defensa contra las estafas.

[Más sobre el reconocimiento y la prevención de estafas](/security/)

## ¿Qué problema está resolviendo la actualización de la red Dencun? {#network-impact}

Dencun aborda principalmente la **escalabilidad** (manejar más usuarios y más transacciones) con **tarifas asequibles**, al tiempo que **se mantiene la descentralización** de la red.

La comunidad de Ethereum ha estado adoptando un enfoque "centrado en rollups" para su crecimiento, que coloca los rollups de capa 2 como medio principal para apoyar de forma segura a más usuarios.

Las redes de rollups manejan el _procesamiento_ (o "ejecución") de las transacciones separado de la Red principal y luego publican una prueba criptográfica y/o datos de transacción comprimidos de los resultados en la Red principal para el mantenimiento de registros. El almacenamiento de estas pruebas conlleva un gasto (en forma de [gas](/glossary/#gas)), que, antes de Proto-Danksharding, tenía que ser almacenado permanentemente por todos los operadores de nodos de la red, lo que lo convertía en una tarea costosa.

La introducción de Proto-Danksharding en la actualización Dencun agrega almacenamiento de datos más barato para estas pruebas, ya que solo requiere que los operadores de nodos almacenen estos datos durante unos 18 días, después de lo cual los datos se pueden eliminar de forma segura para evitar la expansión de los requisitos de hardware.  Debido a que los rollups suelen tener un período de retiro de 7 días, su modelo de seguridad no cambia siempre y cuando los blobs estén disponibles en L1 durante este período. La ventana de poda, o eliminación, de 18 días proporciona buffer o margen significativo para este período.

[Más sobre el escalado de Ethereum](/roadmap/scaling/)

## ¿Cómo se accede a los datos de blob antiguos? {#historical-access}

Mientras que los nodos regulares de Ethereum siempre tendrán _el estado actual_ de la red, los datos de blob históricos pueden ser descartados aproximadamente 18 días después de su introducción. Antes de descartar estos datos, Ethereum se asegura de que hayan estado disponibles para todos los participantes de la red, dando tiempo para:

- Que las partes interesadas descarguen y almacenen los datos.
- La terminación de todos los períodos de desafío de los rollups.
- La culminación de las transacciones de los rollups.

Los datos de blob _históricos_ pueden pretenderse por varias razones y se puede acceder a ellos usando distintos protocolos:

- **Los protocolos de indexación de terceros**, como The Graph, almacenan estos datos a través de una red descentralizada de operadores de nodos incentivada por mecanismos criptoeconómicos.
- **BitTorrent** es un protocolo descentralizado donde los voluntarios pueden mantener y distribuir estos datos a terceros.
- **[La red del portal de Ethereum](/developers/docs/networking-layer/portal-network/)** pretende dar acceso a todos los datos de Ethereum a través de una red descentralizada de operadores de nodos distribuyendo datos entre los participantes relacionados a BitTorrent.
- **Los usuarios individuales** siempre son libres de almacenar sus propias copias de cualquier dato que deseen para referencia histórica.
- **Los proveedores de rollups** son incentivados a almacenar estos datos para mejorar la experiencia de usuario de su rollup.
- **Los exploradores de bloques** normalmente ejecutan nodos de archivo que indexan y almacenan toda esta información para una fácil referencia histórica, accesible para los usuarios a través de una interfaz web.

Es importante notar que la recuperación del estado histórico opera en un **modelo de confianza 1-de-N**. Esto significa que solo necesita datos de _una única fuente confiable_ para verificar su exactitud usando el estado actual de la red.

## ¿Cómo contribuye esta actualización a la hoja de ruta más amplia de Ethereum? {#roadmap-impact}

Proto-Danksharding coloca los cimientos para la completa implementación de [Danksharding](/roadmap/danksharding/). Danksharding está diseñado para distribuir el almacenamiento de datos de rollup entre los operadores de nodos, de forma que cada operador solo necesite encargarse de una pequeña parte de los datos totales. Esta distribución va a incrementar el número de datos de blobs por bloque, lo cual es esencial para la escalabilidad de Ethereum con el objetivo de dar lugar a más usuarios y transacciones.

Esta escalabilidad es crucial para [apoyar a miles de millones de usuarios en Ethereum](/roadmap/scaling/) con tasas asequibles y aplicaciones más avanzadas, a la vez que se mantiene una red descentralizada. Sin estos cambios, las demandas de hardware para los operadores de nodos aumentarían, llevando a la necesidad de equipamiento cada vez más costoso. Esto podría sacar del juego a operadores más pequeños, resultando en una concentración del control de la red entre un par de operadores importantes, lo cual iría en contra del principio de descentralización.

## ¿Afecta esta actualización a todos los clientes de consenso y clientes validadores de Ethereum? {#client-impact}

Sí, Proto-Danksharding (EIP-4844) requiere actualizaciones tanto para los clientes de ejecución como para los clientes de consenso. Todos los principales clientes de Ethereum han lanzado versiones que admiten la actualización. Para mantener la sincronización con la red de Ethereum posactualización, los operadores de nodos deben asegurarse de que están ejecutando una versión de cliente compatible. Tenga en cuenta que la información sobre las versiones de los clientes es sensible al tiempo, y los usuarios deben consultar las últimas actualizaciones para obtener los últimos detalles. [Ver detalles sobre las versiones de clientes compatibles] (https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Los clientes de consenso manejan el software _Validador_, que se ha actualizado para dar lugar a la actualización.

## ¿Cómo afecta Cancun-Deneb (Dencun) a Goerli u otras redes de prueba de Ethereum? {#testnet-impact}

- Devnets, Goerli, Sepolia y Holesky se han sometido a la actualización Dencun y tienen Proto-Danksharding en pleno funcionamiento.
- Los desarrolladores de rollups pueden usar estas redes para las pruebas EIP-4844.
- La mayoría de los usuarios no se verán para nada afectados por este cambio en cada red de prueba.

## ¿Todas las transacciones en L2 ahora utilizarán espacio de blob temporal o podrá elegir? {#calldata-vs-blobs}

Las transacciones de rollups en Capa 2 (L2) de Ethereum tienen la opcion de usar dos tipos de almacenamiento de datos: espacio de blob temporal o datos de llamada de contrato inteligente permanente. El espacio de blob es una opción económica, ya que proporciona almacenamiento temporal a un costo menor. Garantiza la disponibilidad de datos para todos los períodos de desafío necesarios. Por otro lado, los datos de llamada de contratos inteligentes ofrecen almacenamiento permanente, pero son más caros.

La decisión entre usar espacio de blob o datos de llamada la toman principalmente los proveedores de rollups. Basan esta decisión en la demanda actual de espacio para blobs. Si el espacio de blob tiene una gran demanda, los rollups pueden optar por los datos de llamada para garantizar que los datos se publiquen de manera oportuna.

Si bien es teóricamente posible que los usuarios elijan su tipo de almacenamiento preferido, los proveedores de rollups suelen gestionar esta elección. Ofrecer esta opción a los usuarios añadiría complejidad, especialmente en las transacciones de agrupación rentables. Para obtener detalles específicos sobre esta elección, los usuarios deben consultar la documentación proporcionada por los proveedores individuales de rollups.

## ¿4844 reducirá el gas de L1? {#l1-fee-impact}

No de manera significativa. Se introduce un nuevo mercado de gas exclusivamente para el espacio de blob, para el uso de proveedores de rollups. _Aunque las tarifas de L1 pueden reducirse al descargar los datos de rollup a blobs, esta actualización se centra principalmente en la reducción de las tarifas de L2. La reducción de las tarifas en L1 (Red principal) puede ocurrir como un efecto de segundo orden en menor medida._

- La reducción del gas L1 será proporcional a la adopción/uso de los datos de blob por parte de los proveedores de rollups.
- Es probable que el gas L1 siga siendo competitivo por la actividad no relacionada con rollups.
- Los rollups que adopten el uso de espacio de blob demandarán menos gas L1, lo que contribuirá a reducir las tarifas del gas L1 a corto plazo.
- El espacio de blob sigue siendo limitado, por lo que si los blobs de un bloque están saturados o llenos, es posible que los rollups tengan que publicar sus datos como datos permanentes en el mientrastanto, lo que provocaría un aumento de los precios del gas L1 y L2.

## ¿Reducirá esto las tasas en otras cadenas de bloques de Capa 1 de EVM? {#alt-l1-fee-impact}

No. Las ventajas de Proto-Danksharding son específicas de los rollups de capa 2 de Ethereum que almacenan sus pruebas en la Capa 1 (red principal).

El hecho de ser compatible con la máquina virtual de Ethereum (EVM) no significa que una red vaya a obtener ningún beneficio de esta actualización. Las redes que operan independientemente de Ethereum (sean o no compatibles con EVM) no almacenan sus datos en Ethereum y no verán ningún beneficio con esta actualización.

[Más información sobre los rollups de Capa 2](/layer-2/)

## ¿Es más bien de los que aprende viendo? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Desbloquear la escalabilidad de Ethereum, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Aspectos básicos del espacio de blob con Domothy — Bankless_

## Lecturas adicionales {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transacciones de blobs de fragmentos (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Anuncio de la red principal de Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog de la Ethereum Foundation_
- [La guía de Hitchhiker de Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Preguntas frecuentes sobre Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Explicación en profundidad de EIP-4844: el núcleo de la actualización Cancun] (https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Actualización AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
