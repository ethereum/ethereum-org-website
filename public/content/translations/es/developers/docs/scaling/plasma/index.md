---
title: Cadenas de Plasma
description: Introducción a las cadenas de Plasma como solución de escalado actualmente utilizada por la comnunidad de Ethereum.
lang: es
incomplete: true
sidebarDepth: 3
---

Una cadena de Plasma es una cadena de bloques separada anclada a la Red principal de Ethereum, pero que ejecuta transacciones fuera de la cadena con su propio mecanismo de validación de bloques. Las cadenas de Plasma a veces se conocen como "child chains" (secundarias o hijas), esencialmente copias más pequeñas de la red principal de Ethereum.Red principal Las cadenas de Plasma utilizan [pruebas de fraude](/glossary/#fraud-proof) (como [rollups optimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Los Merkle trees permiten la creación de una pila interminable de estas cadenas que pueden funcionar para descargar ancho de banda de las cadenas principales (parent chains) (incluida la red principal de Ethereum). Sin embargo, aunque estas cadenas obtienen algo de seguridad de Ethereum (a través de pruebas de fraude), su seguridad y eficiencia se ven afectadas por varias limitaciones de diseño.

## Requisitos previos {#prerequisites}

Debe tener una buena comprensión de todos los temas básicos y un alto nivel de conocimiento del [escalado de Ethereum](/developers/docs/scaling/).

## ¿Qué es Plasma?

Plasma es un marco para mejorar la escalabilidad en cadenas de bloques públicas como Ethereum. Como se describe en el [documento técnico original de Plasma](http://plasma.io/plasma.pdf), las cadenas de Plasma se construyen encima de otra cadena de bloques (llamada "cadena raíz"). Cada cadena secundaria o child se extiende desde la cadena raíz y generalmente es gestionada por un contrato inteligente implementado en la cadena principal o parent.

El contrato de Plasma funciona, entre otras cosas, como un [puente](/developers/docs/bridges/) que permite a los usuarios mover activos entre la cadena principal de Ethereum y la cadena de Plasma. Aunque esto las hace similares a las [cadenas laterales](/developers/docs/scaling/sidechains/), las cadenas de Plasma se benefician, al menos, hasta cierto punto, de la seguridad de la red principal de Ethereum. Esto se diferencia de las cadenas laterales, que son totalmente responsables de su propia seguridad.

## ¿Cómo funciona Plasma?

Los componentes básicos del marco de trabajo de Plasma son:

### Computación fuera de la cadena {#off-chain-computation}

La velocidad actual de procesamiento de Ethereum está limitada a ~ 15-20 transacciones por segundo, reduciendo a corto plazo la posibilidad de escalamiento para manejar más usuarios. Este problema existe principalmente porque el [mecanismo de consenso](/developers/docs/consensus-mechanisms/) de Ethereum requiere muchos nodos peer-to-peer para verificar cada actualización del estado de la cadena de bloques.

Aunque el mecanismo de consenso de Ethereum es necesario por seguridad, puede que no aplique a todos los caso de uso. Por ejemplo, Alice tal vez no necesite que la red entera de Ethereum verifique los pagos diarios que le hace a Bob por una taza de café, ya que existe cierta confianza entre ambas partes.

Plasma supone que la red principal de Ethereum no necesita verificar todas las transacciones. En cambio, podemos procesar transacciones fuera de la red principal para así liberar a los nodos del trabajo de tener que validar cada transacción.

La computación fuera de la cadena (off-chain) es necesaria porque las cadenas de Plasma pueden optimizar la velocidad y el costo. Por ejemplo, una cadena de Plasma tal vez –y suele ser el caso– use un único "operador" para manejar los pedidos y la ejecución de las transacciones. Con solo una entidad que verifique las transacciones, el tiempo de procesamiento en una cadena de Plasma es más rápido que el de la red principal de Ethereum.

### Compromisos de estado {#state-commitments}

Si bien Plasma ejecuta las transacciones fuera de la cadena, estas se liquidan en la capa de ejecución principal de Ethereum; de otra manera, las cadenas de Plasma no se podrían beneficiar de las garantías de seguridad de Ethereum. Pero finalizar las transacciones fuera de la cadena sin conocer el estado de la cadena de Plasma rompería el modelo de seguridad y permitiría la proliferación de transacciones invalidas. Por esto el operador, el ente responsable por producir bloques en la cadena de Plasma, debe publicar los "compromisos de estado" en Ethereum periódicamente.

Un [esquema de compromiso](https://en.wikipedia.org/wiki/Commitment_scheme) es una técnica criptográfica para comprometerse con un valor o declaración sin revelarlo a otra parte. Los compromisos son "vinculantes" en el sentido de que no puede cambiar el valor o la declaración una vez que se ha comprometido con él. Los compromisos de estado en Plasma toman la forma de "raíces de Merkle" (derivadas de un [Merkle tree](/whitepaper/#merkle-trees) o árbol) que el operador envía a intervalos al contrato de Plasma en la cadena Ethereum.

Las raíces de Merkle son primitivos criptográficos que permiten comprimir grandes cantidades de información. Una raíz de Merkle (también llamada "raíz de bloque" en este caso) podría representar todas las transacciones en un bloque. Las raíces de Merkle también facilitan la verificación de que una pequeña porción de datos sea parte de un conjunto de datos más grande. Por ejemplo, un usuario puede producir una [prueba de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) para probar la inclusión de una transacción en un bloque específico.

Las raíces de Merkle son importantes para proporcionar información sobre el estado fuera de la cadena a Ethereum. Puede pensar en las raíces de Merkle como "puntos de guardado": el operador está diciendo: "Este es el estado de la cadena de Plasma en el punto x en el tiempo, y esta es la raíz de Merkle como prueba". El operador se está comprometiendo con el _estado actual_ de la cadena de Plasma con una raíz de Merkle, razón por la que se le llama "compromiso de estado".

### Entradas y salidas {#entries-and-exits}

Para que los usuarios de Ethereum aprovechen la tecnología de Plasma, debe haber un mecanismo para mover fondos entre la cadena principal y las cadenas de Plasma. Sin embargo, no podemos enviar ether arbitrariamente a una dirección en la cadena de Plasma; estas cadenas son incompatibles, por lo que la transacción fallaría o llevaría a la pérdida de fondos.

Plasma utiliza un contrato maestro que se ejecuta en Ethereum para procesar las entradas y salidas de los usuarios. Este contrato maestro también es responsable de hacer un seguimiento de los compromisos de estado (explicado anteriormente) y castigar el comportamiento deshonesto a través de pruebas de fraude (lo explicaremos mejor más adelante).

#### Entrar a la cadena de Plasma {#entering-the-plasma-chain}

Para entrar a la cadena de Plasma, Alice (la usuaria) tiene que depositar ETH o cualquier token ERC-20 en el contrato de Plasma. El operador de Plasma, el cual vigila los depósitos en el contrato, recrea una cantidad igual a la que Alice depositó inicialmente y la libera hacia la dirección de esta en la cadena de Plasma. Alice debe dar fe de que ha recibido los fondos de la cadena secundaria o child y luego puede usar estos fondos para transacciones.

#### Salir de la cadena de Plasma {#exiting-the-plasma-chain}

Salir de la cadena de Plasma es más complejo que entrar a ella por varias razones. La más importante es que, si bien Ethereum tiene información sobre el estado de la cadena de Plasma, no puede verificar si la información es verdadera o no. Un usuario malicioso podría hacer una afirmación incorrecta ("tengo 1000 ETH") y salirse con la suya proporcionando pruebas falsas para respaldar su afirmación.

Para evitar retiros maliciosos, se introduce un "periodo de desafío" o impugnación. Durante el periodo de impugnación (generalmente una semana), cualquiera puede impugnar una solicitud de retiro utilizando una prueba de fraude. Si el desafío tiene éxito, se deniega la solicitud de retiro.

No obstante, por lo general se da el caso de que los usuarios son honestos y hacen afirmaciones correctas sobre los fondos que poseen. En este escenario, Alice iniciará una solicitud de retiro en la cadena raíz (Ethereum) enviando una transacción al contrato de Plasma.

También debe proporcionar una prueba de Merkle que verifique que una transacción que creó sus fondos en la cadena de Plasma se incluyó en un bloque. Esto es necesario para las iteraciones de Plasma, como [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), que utilizan un modelo de [Salida de transacción no gastada (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Otros, como [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), representan los fondos como [tokens no fungibles](/developers/docs/standards/tokens/erc-721/) en lugar de UTXO. La retirada, en este caso, requiere una prueba de propiedad de los tokens en la cadena de Plasma. Esto se hace enviando las dos últimas transacciones que involucran el token y proporcionando una prueba de Merkle que verifique la inclusión de esas transacciones en un bloque.

El usuario también debe añadir una fianza a la solicitud de retiro como garantía de comportamiento honesto. Si un retador demuestra que la solicitud de retiro de Alice no es válida, se recorta (slash) su fianza, y parte de ella va al retador como recompensa.

Si el periodo de impugnación transcurre sin que nadie proporcione una prueba de fraude, la solicitud de retiro de Alice se considera válida, lo que le permite recuperar los depósitos del contrato de Plasma en Ethereum.

### Arbitraje de disputas {#dispute-arbitration}

Como cualquier cadena de bloques, las cadenas de Plasma necesitan un mecanismo para hacer cumplir la integridad de las transacciones en caso de que los participantes actúen de forma maliciosa (por ejemplo, fondos de doble gasto). Con este fin, las cadenas de Plasma utilizan pruebas de fraude para arbitrar disputas sobre la validez de las transiciones de estado y penalizar el mal comportamiento. Las pruebas de fraude se utilizan como un mecanismo a traves del cual una cadena secundaria de Plasma presenta una queja a su cadena principal o a la cadena raíz.

Una prueba de fraude es simplemente un reclamo o afirmación de que una transición de estado en particular no es válida. Un ejemplo es si un usuario (Alice) intenta gastar los mismos fondos dos veces. Tal vez gastó el UTXO en una transacción con Bob y quiere gastar el mismo UTXO (que ahora es el de Bob) en otra transacción.

Para evitar el retiro, Bob construirá una prueba de fraude proporcionando evidencia de que Alice gastó dicho UTXO en una transacción anterior y una prueba de Merkle de la inclusión de la transacción en un bloque. El mismo proceso funciona en Plasma Cash: Bob tendría que proporcionar pruebas de que Alice transfirió anteriormente los tokens que está tratando de retirar.

Si el desafío de Bob tiene éxito, la solicitud de retiro de Alice se cancela. Sin embargo, este enfoque se basa en la capacidad de Bob de vigilar la cadena para detectar solicitudes de retiro. Si Bob está desconectado, Alice puede procesar el retiro malicioso una vez que transcurra el periodo de desafío.

## El problema de la salida masiva en Plasma {#the-mass-exit-problem-in-plasma}

El problema de salida masiva se produce cuando un gran número de usuarios intentan el retiro de una cadena de Plasma al mismo tiempo. La razón por la que existe este problema tiene que ver con uno de los mayores inconvenientes de Plasma: la **no disponibilidad de datos**.

La disponibilidad de datos es la capacidad de verificar que la información de un bloque propuesto se publicó realmente en la red de cadenas de bloques. Un bloque "no está disponible" si el productor publica el bloque en sí, pero retiene los datos utilizados para crear el bloque.

Los bloques deben estar disponibles para que los nodos puedan descargar el bloque y verificar la validez de las transacciones. Las cadenas de bloques garantizan la disponibilidad de los datos obligando a los productores de bloques a publicar todos los datos de las transacciones en la cadena.

La disponibilidad de datos también ayuda a asegurar los protocolos de escalado fuera de la cadena que se basan en la capa base de Ethereum. Al obligar a los operadores de estas cadenas a publicar datos de transacciones en Ethereum, cualquiera puede desafiar los bloques no válidos mediante la construcción de pruebas de fraude que hagan referencia al estado correcto de la cadena.

Las cadenas de Plasma almacenan principalmente los datos de las transacciones con el operador y **no publican ningún dato en la red principal** (es decir, además de los compromisos de estado periódicos). Esto significa que los usuarios deben confiar en que el operador proporcione datos de los bloques si necesitan crear pruebas de fraude que cuestionen transacciones no válidas. Si este sistema funciona, los usuarios siempre pueden usar pruebas de fraude para asegurar los fondos.

El problema comienza cuando el operador, no cualquier usuario, es la parte que actúa maliciosamente. Debido a que el operador tiene el control exclusivo de la cadena de bloques, tiene más incentivos para promover transiciones de estado no válidas a mayor escala, como robar fondos que pertenecen a los usuarios de la cadena de Plasma.

En este caso, el uso del sistema clásico de pruebas de fraude no funciona. El operador podría hacer fácilmente una transacción no válida transfiriendo los fondos de Alice y Bob a su billetera y ocultar los datos necesarios para crear la prueba de fraude. Esto es posible porque el operador no está obligado a poner los datos a disposición de los usuarios o de la red principal.

Por lo tanto, la solución más optimista es intentar una "salida masiva" de usuarios de la cadena de Plasma. La salida masiva ralentiza el plan del operador malicioso para robar fondos y proporciona algo de protección para los usuarios. Las solicitudes de retiro se ordenan en función de cuándo se creó cada UTXO (o token), lo que evita que los operadores maliciosos se adelanten (front-running) a los usuarios honestos.

Sin embargo, todavía necesitamos una forma de verificar la validez de las solicitudes de retiro durante una salida masiva, para evitar que las personas oportunistas saquen rédito del caos de procesar salidas inválidas. La solución es simple: requerir a los usuarios que publiquen el último **estado válido de la cadena** para sacar su dinero.

Pero este enfoque todavía tiene problemas. Por ejemplo, si todos los usuarios de una cadena de Plasma necesitan salir (lo que es posible en el caso de un operador malicioso), entonces todo el estado válido de la cadena de Plasma debe descargarse en la capa base de Ethereum a la vez. Con el tamaño arbitrario de las cadenas de Plasma (alto rendimiento = más datos) y las limitaciones en las velocidades de procesamiento de Ethereum, esta no es una solución ideal.

Aunque los juegos de salida suenan bien en teoría, las salidas masivas de la vida real probablemente desencadenarán la congestión de toda la red en el propio Ethereum. Además de dañar la funcionalidad de Ethereum, una salida masiva mal coordinada significa que es posible que los usuarios no puedan retirar fondos antes de que el operador vacíe todas las cuentas de la cadena de Plasma.

## Pros y contras de Plasma {#pros-and-cons-of-plasma}

| Ventajas                                                                                                                                                                                                                                                                                                   | Desventajas                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ofrece un alto rendimiento y un bajo coste por transacción.                                                                                                                                                                                                                                                | No admite el cálculo general (No se pueden ejecutar contratos inteligentes. Solo se admiten transferencias básicas de tokens, swaps y algunos otros tipos de transacciones a través de la lógica de primer orden. |
| Es una buena opción para realizar transacciones entre usuarios arbitrarios (no hay gastos por par de usuarios si ambos están establecidos en la cadena de plasma).                                                                                                                                         | Precisa la vigilancia periódica de la red (requisito de vivacidad) o delegar esta responsabilidad a otra persona para garantizar la seguridad de sus fondos.                                                      |
| Las cadenas de Plasma se pueden adaptar a casos de uso específicos que no están relacionados con la cadena principal. Cualquier persona, incluidas las empresas, puede personalizar contratos inteligentes de Plasma para proporcionar una infraestructura escalable que funcione en diferentes contextos. | Utiliza uno o más operadores para almacenar datos y mostrarlos bajo petición.                                                                                                                                     |
| Reduce la carga en la cadena principal de Ethereum moviendo el cálculo y el almacenamiento fuera de la cadena.                                                                                                                                                                                             | Los retiros se retrasan varios días para permitir reclamos (objeciones). Para los activos fungibles, esto puede ser mitigado por los proveedores de liquidez, pero hay un costo de capital asociado.              |
|                                                                                                                                                                                                                                                                                                            | Si demasiados usuarios intentan salir simultáneamente, la red principal de Ethereum podría congestionarse.                                                                                                        |

## Protocolos de escalado de Plasma frente a capa 2 {#plasma-vs-layer-2}

Si bien Plasma alguna vez se consideró una solución de escalado útil para Ethereum, desde entonces se ha desincentivado en favor de los [protocolos de escalado de capa 2 (L2)](/layer-2/). Las soluciones de escalado L2 solucionan varios de los problemas de Plasma:

### Eficiencia {#efficiency}

Los [rollups de conocimiento cero (ZK)](/developers/docs/scaling/zk-rollups) generan pruebas criptográficas de la validez de cada lote de transacciones procesadas fuera de la cadena. Esto evita que los usuarios (y operadores) promuevan transiciones de estado no válidas, eliminando la necesidad de periodos de desafío y juegos de salida. También significa que los usuarios no tienen que ver la cadena periódicamente para asegurar sus fondos.

### Soporte para contratos inteligentes {#support-for-smart-contracts}

Otro problema con el marco de Plasma era la [incapacidad de admitir la ejecución de contratos inteligentes de Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Como resultado, la mayoría de las implementaciones de Plasma se creaban principalmente para pagos simples o el intercambio de tokens ERC-20.

Por el contrario, los rollups optimistas son compatibles con la [Máquina virtual de Ethereum](/developers/docs/evm/) y pueden ejecutar [contratos inteligentes](/developers/docs/smart-contracts/) nativos de Ethereum, lo que los convierte en una solución útil y _segura_ para escalar [aplicaciones descentralizadas](/developers/docs/dapps/). Del mismo modo, hay planes en marcha para [crear una implementación de conocimiento cero de la EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) que permitiría que los rollups de ZK procesen lógica arbitraria y ejecuten contratos inteligentes.

### No disponibilidad de datos {#data-unavailability}

Como se explicó anteriormente, Plasma tiene el problema de la disponibilidad de datos. Si un operador malicioso promoviera una transición no válida en la cadena de Plasma, los usuarios no podrían impugnarla, ya que el operador puede retener los datos necesarios para crear la prueba de fraude. Los rollups resuelven este problema obligando a los operadores a publicar los datos de las transacciones en Ethereum, lo que permite a cualquiera verificar el estado de la cadena y crear pruebas de fraude si es necesario.

### Problema de salida masiva {#mass-exit-problem}

Los rollups de ZK y los rollups optimistas resuelven el problema de salida masiva de Plasma de varias maneras. Por ejemplo, un rollup de ZK se basa en mecanismos criptográficos que garantizan que los operadores no puedan robar fondos de los usuarios en ningún escenario.

Del mismo modo, los rollups optimistas imponen un periodo de retraso en los retiros durante el cual cualquier persona puede iniciar un desafío o reclamo y evitar solicitudes de retiro maliciosas. Si bien esto es similar a Plasma, la diferencia es que los verificadores tienen acceso a los datos necesarios para crear pruebas de fraude. Por lo tanto, no hay necesidad de que los usuarios de rollups se involucren en una migración frenética "primero en salir" a la red principal de Ethereum.

## ¿En qué se diferencia Plasma de las cadenas laterales y la fragmentación? {#plasma-sidechains-sharding}

Plasma, las cadenas laterales y la fragmentación, o sharding, son bastante similares porque todos se conectan a la red principal de Ethereum de alguna manera. Sin embargo, el nivel y la fuerza de estas conexiones varían, lo que afecta a las propiedades de seguridad de cada solución de escalado.

### Plasma vs cadenas laterales {#plasma-vs-sidechains}

Una [cadena lateral](/developers/docs/scaling/sidechains/) es una cadena de bloques operada de forma independiente conectada a la red principal de Ethereum a través de un puente bidireccional. Los [puentes](/bridges/) permiten a los usuarios intercambiar tokens entre las dos cadenas de bloques para realizar transacciones en la cadena lateral, reduciendo la congestión en la red principal de Ethereum y mejorando la escalabilidad. Las cadenas laterales utilizan un mecanismo de consenso separado y suelen ser mucho más pequeñas que la red principal de Ethereum. Como resultado, puentear activos a estas cadenas implica un mayor riesgo; dada la falta de garantías de seguridad heredadas de la red principal de Ethereum en el modelo de cadena lateral, los usuarios se arriesgan a la pérdida de fondos en un ataque en la cadena lateral.

Por el contrario, las cadenas de Plasma derivan su seguridad de la cadena principal. Esto las hace mensurablemente más seguras que las cadenas laterales. Tanto las cadenas laterales como las cadenas de Plasma pueden tener diferentes protocolos de consenso, pero la diferencia es que las cadenas de plasma publican raíces Merkle para cada bloque en la red principal de Ethereum. Las raíces de bloque son pequeñas porciones de información que podemos usar para verificar la información sobre las transacciones que ocurren en una cadena de Plasma. Si se produce un ataque en una cadena de Plasma, los usuarios pueden retirar sus fondos de forma segura a la red principal utilizando las pruebas apropiadas.

### Plasma vs. fragmentación {#plasma-vs-sharding}

Tanto las cadenas de Plasma como las cadenas de fragmentos (shards) publican periódicamente pruebas criptográficas en la red principal de Ethereum. Sin embargo, ambas tienen diferentes propiedades de seguridad.

Las cadenas de fragmentos suben o comprometen "encabezados de recopilación" a la red principal que contienen información detallada sobre cada fragmento de datos. Los nodos de la cadena principal verifican y hacen cumplir la validez de los fragmentos de datos, reduciendo la posibilidad de transiciones de fragmentos no válidas y protegiendo la red contra la actividad maliciosa.

El Plasma es diferente porque la red principal solo recibe información mínima sobre el estado de las cadenas secundarias. Esto significa que la red principal no puede verificar eficazmente las transacciones realizadas en cadenas secundarias, lo que las hace menos seguras.

**Note** que la fragmentación de la cadena de bloques de Ethereum ya no está en la hoja de ruta. Ha sido reemplazada por el escalamiento a través de rollups y [Danksharding](/roadmap/danksharding).

### Usos de Plasma {#use-plasma}

Múltiples proyectos proveen implementaciones de Plasma que puede integrar en sus dApps:

- [Polygon](https://polygon.technology/) (anteriormente, Matic Network)

## Más información {#further-reading}

- [Información sobre Plasma](https://www.learnplasma.org/en/)
- [Un recordatorio rápido de lo que significa "seguridad compartida" y por qué es tan importante](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Cadenas laterales vs. Plasma vs. sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Explicación de Plasma, parte 1: aspectos básicos](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [La vida y la muerte de Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._
