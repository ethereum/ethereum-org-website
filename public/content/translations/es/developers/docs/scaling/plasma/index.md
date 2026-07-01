---
title: Cadenas Plasma
description: "Una introducción a las cadenas Plasma como solución de escalabilidad utilizada actualmente por la comunidad de Ethereum."
lang: es
incomplete: true
sidebarDepth: 3
---

Una cadena Plasma es una cadena de bloques separada anclada a la [red principal de Ethereum](/) pero que ejecuta transacciones fuera de la cadena con su propio mecanismo para la validación de bloques. A veces, a las cadenas Plasma se les llama cadenas "hijas", que son esencialmente copias más pequeñas de la red principal de Ethereum. Las cadenas Plasma utilizan [pruebas de fraude](/glossary/#fraud-proof) (como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Los árboles de Merkle permiten la creación de una pila interminable de estas cadenas que pueden funcionar para descargar el ancho de banda de las cadenas principales (incluida la red principal de Ethereum). Sin embargo, aunque estas cadenas derivan cierta seguridad de Ethereum (a través de pruebas de fraude), su seguridad y eficiencia se ven afectadas por varias limitaciones de diseño.

## Requisitos previos {#prerequisites}

Debería tener una buena comprensión de todos los temas fundamentales y una comprensión de alto nivel sobre la [escalabilidad de Ethereum](/developers/docs/scaling/).

## ¿Qué es Plasma? {#what-is-plasma}

Plasma es un marco de trabajo para mejorar la escalabilidad en cadenas de bloques públicas como Ethereum. Como se describe en el [documento técnico original de Plasma](https://plasma.io/plasma.pdf), las cadenas Plasma se construyen sobre otra cadena de bloques (llamada "cadena raíz"). Cada "cadena hija" se extiende desde la cadena raíz y generalmente es administrada por un contrato inteligente implementado en la cadena principal.

El contrato de Plasma funciona, entre otras cosas, como un [puente](/developers/docs/bridges/) que permite a los usuarios mover activos entre la red principal de Ethereum y la cadena Plasma. Aunque esto las hace similares a las [cadenas laterales](/developers/docs/scaling/sidechains/), las cadenas Plasma se benefician —al menos, hasta cierto punto— de la seguridad de la red principal de Ethereum. Esto es diferente a las cadenas laterales, que son las únicas responsables de su propia seguridad.

## ¿Cómo funciona Plasma? {#how-does-plasma-work}

Los componentes básicos del marco de trabajo de Plasma son:

### Computación fuera de la cadena {#offchain-computation}

La velocidad de procesamiento actual de Ethereum está limitada a ~ 15-20 transacciones por segundo, lo que reduce la posibilidad a corto plazo de escalar para manejar a más usuarios. Este problema existe principalmente porque el [mecanismo de consenso](/developers/docs/consensus-mechanisms/) de Ethereum requiere que muchos nodos entre pares verifiquen cada actualización del estado de la cadena de bloques.

Aunque el mecanismo de consenso de Ethereum es necesario para la seguridad, puede que no se aplique a todos los casos de uso. Por ejemplo, es posible que Alice no necesite que toda la red de Ethereum verifique sus pagos diarios a Bob por una taza de café, ya que existe cierta confianza entre ambas partes.

Plasma supone que la red principal de Ethereum no necesita verificar todas las transacciones. En su lugar, podemos procesar transacciones fuera de la Red principal, liberando a los nodos de tener que validar cada transacción.

La computación fuera de la cadena es necesaria ya que las cadenas Plasma pueden optimizarse en cuanto a velocidad y costo. Por ejemplo, una cadena Plasma puede —y muy a menudo lo hace— usar un solo "operador" para administrar el ordenamiento y la ejecución de las transacciones. Con solo una entidad verificando las transacciones, los tiempos de procesamiento en una cadena Plasma son más rápidos que en la red principal de Ethereum.

### Compromisos de estado {#state-commitments}

Si bien Plasma ejecuta transacciones fuera de la cadena, estas se liquidan en la capa de ejecución principal de Ethereum; de lo contrario, las cadenas Plasma no podrían beneficiarse de las garantías de seguridad de Ethereum. Pero finalizar transacciones fuera de la cadena sin conocer el estado de la cadena Plasma rompería el modelo de seguridad y permitiría la proliferación de transacciones no válidas. Es por esto que el operador, la entidad responsable de producir bloques en la cadena Plasma, debe publicar "compromisos de estado" en Ethereum periódicamente.

Un [esquema de compromiso](https://en.wikipedia.org/wiki/Commitment_scheme) es una técnica criptográfica para comprometerse con un valor o declaración sin revelarlo a otra parte. Los compromisos son "vinculantes" en el sentido de que no se puede cambiar el valor o la declaración una vez que se ha comprometido con él. Los compromisos de estado en Plasma toman la forma de "raíces de Merkle" (derivadas de un [árbol de Merkle](/whitepaper/#merkle-trees)) que el operador envía a intervalos al contrato de Plasma en la cadena de Ethereum.

Las raíces de Merkle son primitivas criptográficas que permiten comprimir grandes cantidades de información. Una raíz de Merkle (también llamada "raíz de bloque" en este caso) podría representar todas las transacciones en un bloque. Las raíces de Merkle también facilitan la verificación de que un pequeño fragmento de datos forma parte del conjunto de datos más grande. Por ejemplo, un usuario puede producir una [prueba de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) para demostrar la inclusión de una transacción en un bloque específico.

Las raíces de Merkle son importantes para proporcionar información sobre el estado fuera de la cadena a Ethereum. Puede pensar en las raíces de Merkle como "puntos de guardado": el operador está diciendo: "Este es el estado de la cadena Plasma en el momento x, y esta es la raíz de Merkle como prueba". El operador se compromete con el _estado actual_ de la cadena Plasma con una raíz de Merkle, por lo que se denomina "compromiso de estado".

### Entradas y salidas {#entries-and-exits}

Para que los usuarios de Ethereum aprovechen Plasma, debe haber un mecanismo para mover fondos entre la Red principal y las cadenas Plasma. Sin embargo, no podemos enviar ether arbitrariamente a una dirección en la cadena Plasma; estas cadenas son incompatibles, por lo que la transacción fallaría o provocaría la pérdida de fondos.

Plasma utiliza un contrato maestro que se ejecuta en Ethereum para procesar las entradas y salidas de los usuarios. Este contrato maestro también es responsable de rastrear los compromisos de estado (explicados anteriormente) y castigar el comportamiento deshonesto a través de pruebas de fraude (más sobre esto más adelante).

#### Entrar a la cadena Plasma {#entering-the-plasma-chain}

Para entrar a la cadena Plasma, Alice (la usuaria) tendrá que depositar ETH o cualquier token ERC-20 en el contrato de Plasma. El operador de Plasma, que vigila los depósitos del contrato, recrea una cantidad igual al depósito inicial de Alice y la libera a su dirección en la cadena Plasma. Se requiere que Alice certifique haber recibido los fondos en la cadena hija y luego puede usar estos fondos para transacciones.

#### Salir de la cadena Plasma {#exiting-the-plasma-chain}

Salir de la cadena Plasma es más complejo que entrar a ella por varias razones. La principal es que, si bien Ethereum tiene información sobre el estado de la cadena Plasma, no puede verificar si la información es verdadera o no. Un usuario malintencionado podría hacer una afirmación incorrecta ("Tengo 1000 ETH") y salirse con la suya proporcionando pruebas falsas para respaldar el reclamo.

Para evitar retiros malintencionados, se introduce un "período de desafío". Durante el período de desafío (generalmente una semana), cualquiera puede desafiar una solicitud de retiro utilizando una prueba de fraude. Si el desafío tiene éxito, entonces se deniega la solicitud de retiro.

Sin embargo, por lo general, los usuarios son honestos y hacen reclamos correctos sobre los fondos que poseen. En este escenario, Alice iniciará una solicitud de retiro en la cadena raíz (Ethereum) enviando una transacción al contrato de Plasma.

También debe proporcionar una prueba de Merkle que verifique que una transacción que creó sus fondos en la cadena Plasma se incluyó en un bloque. Esto es necesario para las iteraciones de Plasma, como Plasma MVP, que utilizan un modelo de [salida de transacción no gastada (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Otras, como Plasma Cash, representan los fondos como [tokens no fungibles](/developers/docs/standards/tokens/erc-721/) en lugar de UTXO. Retirar, en este caso, requiere una prueba de propiedad de los tokens en la cadena Plasma. Esto se hace enviando las dos últimas transacciones que involucran el token y proporcionando una prueba de Merkle que verifique la inclusión de esas transacciones en un bloque.

El usuario también debe agregar una fianza a la solicitud de retiro como garantía de comportamiento honesto. Si un retador demuestra que la solicitud de retiro de Alice no es válida, su fianza sufre un recorte, y parte de ella va al retador como recompensa.

Si el período de desafío transcurre sin que nadie proporcione una prueba de fraude, la solicitud de retiro de Alice se considera válida, lo que le permite recuperar los depósitos del contrato de Plasma en Ethereum.
### Arbitraje de disputas {#dispute-arbitration}

Al igual que cualquier cadena de bloques, las cadenas Plasma necesitan un mecanismo para hacer cumplir la integridad de las transacciones en caso de que los participantes actúen de manera malintencionada (por ejemplo, el doble gasto de fondos). Con este fin, las cadenas Plasma utilizan pruebas de fraude para arbitrar disputas relacionadas con la validez de las transiciones de estado y penalizar el mal comportamiento. Las pruebas de fraude se utilizan como un mecanismo a través del cual una cadena hija de Plasma presenta una queja a su cadena principal o a la cadena raíz.

Una prueba de fraude es simplemente un reclamo de que una transición de estado en particular no es válida. Un ejemplo es si un usuario (Alice) intenta gastar los mismos fondos dos veces. Tal vez gastó el UTXO en una transacción con Bob y quiere gastar el mismo UTXO (que ahora es de Bob) en otra transacción.

Para evitar el retiro, Bob construirá una prueba de fraude proporcionando evidencia de que Alice gastó dicho UTXO en una transacción anterior y una prueba de Merkle de la inclusión de la transacción en un bloque. El mismo proceso funciona en Plasma Cash: Bob tendría que proporcionar pruebas de que Alice transfirió anteriormente los tokens que intenta retirar.

Si el desafío de Bob tiene éxito, la solicitud de retiro de Alice se cancela. Sin embargo, este enfoque se basa en la capacidad de Bob para vigilar la cadena en busca de solicitudes de retiro. Si Bob está desconectado, entonces Alice puede procesar el retiro malintencionado una vez que transcurra el período de desafío.

## El problema de la salida masiva en Plasma {#the-mass-exit-problem-in-plasma}

El problema de la salida masiva ocurre cuando una gran cantidad de usuarios intentan retirarse de una cadena Plasma al mismo tiempo. La razón por la que existe este problema tiene que ver con uno de los mayores problemas de Plasma: **la falta de disponibilidad de datos**.

La disponibilidad de datos es la capacidad de verificar que la información de un bloque propuesto se publicó realmente en la red de la cadena de bloques. Un bloque "no está disponible" si el productor publica el bloque en sí pero retiene los datos utilizados para crear el bloque.

Los bloques deben estar disponibles para que los nodos puedan descargar el bloque y verificar la validez de las transacciones. Las cadenas de bloques garantizan la disponibilidad de datos al obligar a los productores de bloques a publicar todos los datos de las transacciones en cadena.

La disponibilidad de datos también ayuda a asegurar los protocolos de escalabilidad fuera de la cadena que se basan en la capa base de Ethereum. Al obligar a los operadores de estas cadenas a publicar datos de transacciones en Ethereum, cualquiera puede desafiar bloques no válidos construyendo pruebas de fraude que hagan referencia al estado correcto de la cadena.

Las cadenas Plasma almacenan principalmente datos de transacciones con el operador y **no publican ningún dato en la Red principal** (es decir, además de los compromisos de estado periódicos). Esto significa que los usuarios deben confiar en que el operador proporcione datos de bloques si necesitan crear pruebas de fraude que desafíen transacciones no válidas. Si este sistema funciona, entonces los usuarios siempre pueden usar pruebas de fraude para asegurar los fondos.

El problema comienza cuando el operador, no cualquier usuario, es la parte que actúa de manera malintencionada. Debido a que el operador tiene el control exclusivo de la cadena de bloques, tiene más incentivos para avanzar transiciones de estado no válidas a mayor escala, como robar fondos pertenecientes a los usuarios en la cadena Plasma.

En este caso, el uso del sistema clásico de prueba de fraude no funciona. El operador podría realizar fácilmente una transacción no válida transfiriendo los fondos de Alice y Bob a su billetera y ocultar los datos necesarios para crear la prueba de fraude. Esto es posible porque no se requiere que el operador ponga los datos a disposición de los usuarios o de la Red principal.

Por lo tanto, la solución más optimista es intentar una "salida masiva" de usuarios de la cadena Plasma. La salida masiva ralentiza el plan del operador malintencionado de robar fondos y proporciona cierta medida de protección para los usuarios. Las solicitudes de retiro se ordenan en función de cuándo se creó cada UTXO (o token), lo que evita que los operadores malintencionados hagan front-running a los usuarios honestos.

No obstante, todavía necesitamos una forma de verificar la validez de las solicitudes de retiro durante una salida masiva, para evitar que personas oportunistas se beneficien del caos procesando salidas no válidas. La solución es simple: requerir que los usuarios publiquen el último **estado válido de la cadena** para retirar su dinero.

Pero este enfoque todavía tiene problemas. Por ejemplo, si todos los usuarios de una cadena Plasma necesitan salir (lo cual es posible en el caso de un operador malintencionado), entonces todo el estado válido de la cadena Plasma debe volcarse en la capa base de Ethereum a la vez. Con el tamaño arbitrario de las cadenas Plasma (alta capacidad de procesamiento = más datos) y las limitaciones en las velocidades de procesamiento de Ethereum, esta no es una solución ideal.

Aunque los juegos de salida suenan bien en teoría, es probable que las salidas masivas en la vida real desencadenen una congestión en toda la red en el propio Ethereum. Además de dañar la funcionalidad de Ethereum, una salida masiva mal coordinada significa que los usuarios pueden no poder retirar fondos antes de que el operador vacíe todas las cuentas en la cadena Plasma.

## Pros y contras de Plasma {#pros-and-cons-of-plasma}

| Pros                                                                                                                                                                                                                             | Contras                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ofrece alta capacidad de procesamiento y bajo costo por transacción.                                                                                                                                                                             | No admite computación general (no puede ejecutar contratos inteligentes). Solo se admiten transferencias básicas de tokens, intercambios y algunos otros tipos de transacciones a través de la lógica de predicados.    |
| Bueno para transacciones entre usuarios arbitrarios (sin gastos generales por par de usuarios si ambos están establecidos en la cadena Plasma)                                                                                                            | Necesidad de vigilar periódicamente la red (requisito de actividad) o delegar esta responsabilidad a otra persona para garantizar la seguridad de sus fondos.                          |
| Las cadenas Plasma se pueden adaptar a casos de uso específicos que no están relacionados con la cadena principal. Cualquiera, incluidas las empresas, puede personalizar los contratos inteligentes de Plasma para proporcionar una infraestructura escalable que funcione en diferentes contextos. | Depende de uno o más operadores para almacenar datos y servirlos a pedido.                                                                                                     |
| Reduce la carga en la red principal de Ethereum al mover la computación y el almacenamiento fuera de la cadena.                                                                                                                                                    | Los retiros se retrasan varios días para permitir desafíos. Para los activos fungibles, esto puede ser mitigado por los proveedores de liquidez, pero hay un costo de capital asociado. |
|                                                                                                                                                                                                                                  | Si demasiados usuarios intentan salir simultáneamente, la red principal de Ethereum podría congestionarse.                                                                                          |

## Plasma frente a los protocolos de escalabilidad de capa 2 {#plasma-vs-layer-2}

Si bien Plasma alguna vez se consideró una solución de escalabilidad útil para Ethereum, desde entonces se ha abandonado a favor de los [protocolos de escalabilidad de capa 2 (l2)](/layer-2/). Las soluciones de escalabilidad de capa 2 remedian varios de los problemas de Plasma:

### Eficiencia {#efficiency}

Los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups) generan pruebas criptográficas de la validez de cada lote de transacciones procesadas fuera de la cadena. Esto evita que los usuarios (y operadores) avancen transiciones de estado no válidas, eliminando la necesidad de períodos de desafío y juegos de salida. También significa que los usuarios no tienen que vigilar la cadena periódicamente para asegurar sus fondos.

### Soporte para contratos inteligentes {#support-for-smart-contracts}

Otro problema con el marco de trabajo de Plasma fue [la incapacidad de soportar la ejecución de contratos inteligentes de Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Como resultado, la mayoría de las implementaciones de Plasma se construyeron principalmente para pagos simples o el intercambio de tokens ERC-20.

Por el contrario, los rollups optimistas son compatibles con la [Máquina Virtual de Ethereum](/developers/docs/evm/) y pueden ejecutar [contratos inteligentes](/developers/docs/smart-contracts/) nativos de Ethereum, lo que los convierte en una solución útil y _segura_ para escalar [aplicaciones descentralizadas](/developers/docs/dapps/). Del mismo modo, hay planes en marcha para [crear una implementación de conocimiento cero de la EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) que permitiría a los ZK-rollups procesar lógica arbitraria y ejecutar contratos inteligentes.

### Falta de disponibilidad de datos {#data-unavailability}

Como se explicó anteriormente, Plasma sufre de un problema de disponibilidad de datos. Si un operador malintencionado avanzara una transición no válida en la cadena Plasma, los usuarios no podrían desafiarla ya que el operador puede retener los datos necesarios para crear la prueba de fraude. Los rollups resuelven este problema al obligar a los operadores a publicar datos de transacciones en Ethereum, lo que permite a cualquiera verificar el estado de la cadena y crear pruebas de fraude si es necesario.

### Problema de salida masiva {#mass-exit-problem}

Los ZK-rollups y los rollups optimistas resuelven el problema de salida masiva de Plasma de varias maneras. Por ejemplo, un ZK-rollup se basa en mecanismos criptográficos que garantizan que los operadores no puedan robar los fondos de los usuarios bajo ningún escenario.

Del mismo modo, los rollups optimistas imponen un período de retraso en los retiros durante el cual cualquiera puede iniciar un desafío y evitar solicitudes de retiro malintencionadas. Si bien esto es similar a Plasma, la diferencia es que los verificadores tienen acceso a los datos necesarios para crear pruebas de fraude. Por lo tanto, no hay necesidad de que los usuarios de los rollups participen en una migración frenética de "el primero en salir" a la red principal de Ethereum.

## ¿En qué se diferencia Plasma de las cadenas laterales y la fragmentación? {#plasma-sidechains-sharding}

Plasma, las cadenas laterales y la fragmentación son bastante similares porque todas se conectan a la red principal de Ethereum de alguna manera. Sin embargo, el nivel y la fuerza de estas conexiones varían, lo que afecta las propiedades de seguridad de cada solución de escalabilidad.

### Plasma frente a cadenas laterales {#plasma-vs-sidechains}

Una [cadena lateral](/developers/docs/scaling/sidechains/) es una cadena de bloques operada de forma independiente conectada a la red principal de Ethereum a través de un puente bidireccional. Los [puentes](/bridges/) permiten a los usuarios intercambiar tokens entre las dos cadenas de bloques para realizar transacciones en la cadena lateral, reduciendo la congestión en la red principal de Ethereum y mejorando la escalabilidad.
Las cadenas laterales utilizan un mecanismo de consenso separado y suelen ser mucho más pequeñas que la red principal de Ethereum. Como resultado, puentear activos a estas cadenas implica un mayor riesgo; dada la falta de garantías de seguridad heredadas de la red principal de Ethereum en el modelo de cadena lateral, los usuarios corren el riesgo de perder fondos en un ataque a la cadena lateral.

Por el contrario, las cadenas Plasma derivan su seguridad de la Red principal. Esto las hace considerablemente más seguras que las cadenas laterales. Tanto las cadenas laterales como las cadenas Plasma pueden tener diferentes protocolos de consenso, pero la diferencia es que las cadenas Plasma publican raíces de Merkle para cada bloque en la red principal de Ethereum. Las raíces de bloque son pequeños fragmentos de información que podemos usar para verificar información sobre las transacciones que ocurren en una cadena Plasma. Si ocurre un ataque en una cadena Plasma, los usuarios pueden retirar sus fondos de manera segura a la Red principal utilizando las pruebas adecuadas.

### Plasma frente a fragmentación {#plasma-vs-sharding}

Tanto las cadenas Plasma como las cadenas de fragmentos publican periódicamente pruebas criptográficas en la red principal de Ethereum. Sin embargo, ambas tienen diferentes propiedades de seguridad.

Las cadenas de fragmentos comprometen "encabezados de intercalación" en la Red principal que contienen información detallada sobre cada fragmento de datos. Los nodos en la Red principal verifican y hacen cumplir la validez de los fragmentos de datos, reduciendo la posibilidad de transiciones de fragmentos no válidas y protegiendo la red contra actividades malintencionadas.

Plasma es diferente porque la Red principal solo recibe información mínima sobre el estado de las cadenas hijas. Esto significa que la Red principal no puede verificar de manera efectiva las transacciones realizadas en las cadenas hijas, lo que las hace menos seguras.

**Nota:** la fragmentación de la cadena de bloques de Ethereum ya no está en la hoja de ruta. Ha sido reemplazada por la escalabilidad a través de rollups y [danksharding](/roadmap/danksharding).

### Usar Plasma {#use-plasma}

Múltiples proyectos proporcionan implementaciones de Plasma que puede integrar en sus dapps:

- [Polygon](https://polygon.technology/) (anteriormente Matic Network)

## Lecturas adicionales {#further-reading}

- [Un breve recordatorio de lo que significa la "seguridad compartida" y por qué es tan importante](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Cadenas laterales vs. Plasma vs. fragmentación](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Comprendiendo Plasma, parte 1: los conceptos básicos](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [La vida y muerte de Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_
## Tutoriales: Cadenas Plasma en Ethereum {#tutorials}

- [Escriba un Plasma específico para una aplicación que preserve la privacidad](/developers/tutorials/app-plasma/) _– Construya una aplicación Plasma que preserve la privacidad utilizando pruebas de conocimiento cero y componentes fuera de la cadena._
