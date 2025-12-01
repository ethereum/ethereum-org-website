---
title: Fulu-Osaka (Fusaka)
description: Conozca mejor la actualización del protocolo Fusaka
lang: es
---

# Fusaka {#fusaka}

La actualización de la red Fusaka llega después de [Pectra](/roadmap/pectra/) e incorpora nuevas funciones y mejora la experiencia de todos los usuarios y desarrolladores de Ethereum. El nombre combina la actualización de la capa de ejecución Osaka y la versión de la capa de consenso, que lleva el nombre de la estrella Fulu. Ambas partes de Ethereum reciben una actualización que impulsa la escalabilidad, la seguridad y la experiencia de usuario hacia el futuro de Ethereum.

Está actualización está prevista para el 4T de 2025.

<InfoBanner>
La actualización Fusaka es solo un paso dentro de los objetivos de desarrollo a largo plazo de Ethereum. Conozca mejor [la hoja de ruta del protocolo](/roadmap/) y las [actualizaciones anteriores](/history/).
</InfoBanner>

## Mejoras de Fusaka {#improvements-in-fusaka}

### Disponibilidad de datos y escalado en L2 {#data-availability-and-l2-scaling}

#### PeerDAS {#peerdas}

Especificación: https://eips.ethereum.org/EIPS/eip-7594

Recursos: https://youtu.be/bONWd1x2TjQ?t=328 (dapplion en PeerDAS)

Esta es la _novedad principal_ de la bifurcación Fusaka; la principal función añadida en esta actualización. La capa 2 publica actualmente sus datos en Ehtereum usando blobs, un tipo de dato efímero creado específicamente para la capa 2. Antes de Fusaka, cada nodo completo tenía que almacenar todos los blobs para asegurase que los datos existían. A medida que aumenta el rendimiento de los blobs, tener que descargar todos estos datos se vuelve insostenible en cuanto a recursos.

Con el [muestreo de disponibilidad de datos](https://notes.ethereum.org/@fradamt/das-fork-choice), en lugar de tener que almacenar todos los datos de los blobs, cada nodo será responsable de una parte del total. Los blobs se distribuyen de forma uniforme y aleatoria entre los nodos de la red, y cada nodo completo solo almacena una octava parte de los datos, lo que permite, en teoría, escalar hasta 8 veces más. Para garantizar la disponibilidad de los datos, cualquier parte del conjunto puede reconstruirse a partir de cualquier 50 % existente, utilizando métodos que reducen la probabilidad de datos erróneos o perdidos a un nivel criptográficamente insignificante (aproximadamente uno entre 10²⁰ a 10²⁴).

Esto mantiene unos requisitos de hardware y ancho de banda asumibles para los nodos, mientras permite escalar los blobs, lo que se traduce en más capacidad y comisiones bajas para la capa 2.

Para profundizar más al respecto: https://eprint.iacr.org/2024/1362.pdf

#### Bifurcaciones que solo modifican los parámetros de blobs {#blob-parameter-only-forks}

Especificación: https://eips.ethereum.org/EIPS/eip-7892

Las capas 2 escalan Ethereum: a medida que sus redes crecen, necesitan publicar más datos en Ethereum. Esto significa que Ethereum tendrá que aumentar el número de blobs disponibles para ellas con el tiempo. Aunque PeerDAS permite escalar los datos de blobs, es algo que debe hacerse de forma gradual y segura.

Como Ethereum es un código que se ejecuta en miles de nodos independientes que deben estar de acuerdo en seguir las mismas reglas, no se pueden introducir cambios, como aumentar el número de blobs, de la misma forma que se lanza una actualización en una web. Cualquier cambio en las reglas debe hacerse mediante una actualización coordinada, en la que todos los nodos, clientes y actualizaciones del software del validador antes de un mismo bloque predeterminado.

Estas actualizaciones coordinadas generalmente suelen incluir muchos cambios, requieren muchas pruebas y eso lleva tiempo. Para poder adaptarse más rápido a las necesidades cambiantes de los blobs en las capas 2, las bifurcaciones que solo modifican parámetros de blobs permiten aumentar su cantidad sin esperar a una actualización mayor.

Los clientes pueden configurar las bifurcaciones que solo modifican parámetros de blobs, de forma similar a otros ajustes como el límite de gas. Entre actualizaciones extensas de Ethereum, los clientes pueden acordar aumentar los valores «target» y «max» de blobs, por ejemplo, a 9 y 12, y luego los operadores de nodos actualizan su software para participar en esa pequeña bifurcación. Las bifurcaciones que solo modifican parámetros de blobs se pueden configurar en cualquier momento.

#### Blobs basados en comisiones limitados por los costes de ejecución {#blob-base-fee-bounded-by-execution-costs}

Especificación: https://eips.ethereum.org/EIPS/eip-7918

Explicación en formato Storybook: https://notes.ethereum.org/@anderselowsson/AIG

Las capas 2 pagan dos facturas al publicar datos: la comisión por blob y el gas de ejecución necesario para verificar esos blobs. Si el gas de ejecución domina, la subasta de la comisión por blob puede caer hasta 1 wei y dejar de ser una señal de precio.

EIP-7918 fija un precio mínimo proporcional para cada blob. Cuando el precio mínimo es más alto que la comisión base nominal del blob, el algoritmo de ajuste de comisiones trata el bloque como si estuviera por encima del objetivo, deja de reducir la comisión y permite que esta aumente con normalidad. Como resultado:

- el mercado de comisiones por blobs siempre reacciona al embotellamiento
- Las capas 2 pagan como mínimo una parte significativa del cómputo que imponen a los nodos
- los picos en la comisión base de la capa de ejecución ya no pueden dejar la comisión por blob atrapada en 1 wei

### Límites de gas, comisiones y refuerzo contra ataques DoS {#gas-limits-fees-and-dos-hardening}

#### Establecer límites superiores para MODEXP {#set-upper-bounds-for-modexp}

Especificación: https://eips.ethereum.org/EIPS/eip-7823

Hasta ahora, la MODEXP precompilada aceptaba números de prácticamente cualquier tamaño. Eso hacía que fuera difícil de comprobar, fácil de abusar y un riesgo para la estabilidad de los clientes. EIP-7823 establece un límite claro: cada número de entrada puede tener como máximo 8192 bits (1024 bytes) de longitud. Cualquier valor que supere ese límite será rechazado, se consumirá el gas de la transacción y no se producirá ningún cambio de estado. Cubre de sobra las necesidades del mundo real, eliminando los casos extremos que complicaban la planificación de límite de gas y las revisiones de seguridad. Este cambio proporciona mayor seguridad y protección contra ataques DoS sin interferir en la experiencia de usuarios ni desarrolladores.

#### Límite de gas por transacción {#transaction-gas-limit-cap}

Especificación: https://eips.ethereum.org/EIPS/eip-7825

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) introduce un límite máximo de 16.777.216 (2^24) de gas por transacción. Es una medida proactiva de refuerzo contra ataques DoS, que pone un límite al peor caso posible de coste por transacción individual a medida que se aumenta el límite de gas por bloque. Facilita la validación y la propagación, lo que permite modelarlas mejor para abordar la escalabilidad aumentando el límite de gas.

¿Por qué exactamente 2^24 en gas? Es una cifra cómodamente inferior que el límite de gas actual, lo bastante grande para desplegar contratos reales y ejecutar precompilaciones de envergadura, y al tener una potencia de 2, es fácil de implementar en todos los clientes. Este nuevo tamaño máximo por transacción es similar al tamaño medio de bloque antes de Pectra, lo que lo convierte en un límite razonable para cualquier operación en Ethereum.

#### Aumento del coste de gas de MODEXP {#modexp-gas-cost-increase}

Especificación: https://eips.ethereum.org/EIPS/eip-7883

MODEXP es una función precompilada integrada que realiza potenciación modular, un tipo de cálculo de grandes cifras utilizado en la verificación de firmas RSA y en sistemas de pruebas. Permite que los contratos ejecuten estos cálculos directamente, sin tener que implementarlos por su cuenta.

Los equipos de desarrollo y de cliente identificaron MODEXP como un gran obstáculo para aumentar el límite de gas por bloque, ya que el precio de gas actual suele subestimar la cantidad de potencia de cómputo que requieren ciertas entradas. Esto significa que una sola transacción que use MODEXP podría consumir la mayor parte del tiempo necesario para procesar un bloque entero, ralentizando la red.

EIP‑7883 ajusta el coste de gas para que refleje el coste computacional real mediante:

- el aumento del cargo mínimo de 200 a 500 unidades de gas y la eliminación del descuento de un tercio introducido por EIP-2565 en el cálculo general del coste
- incrementar el coste de forma más pronunciada cuando la entrada del exponente es muy larga. si el exponente (la "potencia" del número que se pasa como segundo argumento) supera los 32 bytes / 256 bits, el coste de gas aumenta mucho más rápido por cada byte adicional
- el cobro de un coste adicional también cuando la base o el módulo sean grandes. Las otras dos cifras (la base y el módulo) tienen al menos 32 bytes; si alguna de ellas es más grande, el coste aumenta en proporcion a su tamaño

Al ajustar mejor los costes al tiempo de procesamiento real, MODEXP ya no puede hacer que un bloque tarde demasiado en validarse. Este cambio es uno de varios pensados para hacer seguro un posible aumento del límite de gas por bloque en Ethereum en el futuro.

#### Límite de tamaño de bloque de ejecución en RLP {#rlp-execution-block-size-limit}

Especificación: https://eips.ethereum.org/EIPS/eip-7934

Ethereum añade un límite máximo estricto al tamaño del bloque de ejecución codificado en [RLP](/developers/docs/data-structures-and-encoding/rlp/): 10 MiB en total, con un margen de seguridad de 2 MiB reservado para el encuadre del bloque de baliza. En la práctica, los clientes definen `MAX_BLOCK_SIZE = 10.485.760` bytes y `SAFETY_MARGIN = 2.097.152` bytes, y rechazan cualquier bloque de ejecución cuya carga RLP supere `MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`. El objetivo es limitar el peor caso de tiempo de propagación y validación, y alinearlo con el comportamiento de protocolo Gossip en la capa de consenso (los bloques de más de ~10 MiB no se propagan). Así, se reduce el riesgo de reorganizaciones o ataques DoS sin modificar el sistema de contabilización de gas.

#### Establecer el límite de gas por defecto en XX millones {#set-default-gas-limit-to-xx-million}

Especificación: https://eips.ethereum.org/EIPS/eip-7935

Antes de aumentar el límite de gas de 30M a 36M en febrero de 2025 (y posteriormente a 45M), este valor no había cambiado desde la Fusión (septiembre de 2022). Esta EIP tiene como objetivo dar prioirdad a una escalabilidad constante.

EIP-7935 coordina a los equipos de clientes de la capa de ejecución para aumentar el límite de gas por defecto por encima de los 45M actuales como parte de Fusaka. Es una EIP informativa, pero pide explícitamente a los clientes que prueben límtes más altos en redes de desarrollo, que lleguen a un valor seguro en común y lo incluyan en sus versiones de Fusaka.

La planificación en Devnet apunta a un estrés de ~60M (bloques completos con carga sintética) y aumentos iterativos; según la investigación, las patologías de tamaño de bloque en el peor caso no deberían imponer límites por debajo de ~150M. El despliegue debería ir acompañado del límite de gas por transacción (EIP-7825), para que ninguna transacción individual pueda dominar a medida que aumentan los límites.

### Compatibilidad con preconfirmaciones {#preconfirmation-support}

#### Anticipación determinista del proponente {#deterministic-proposer-lookahead}

Especificación: https://eips.ethereum.org/EIPS/eip-7917

Con EIP-7917, la cadena de baliza tendrá conocimiento anticipado de los proponentes de bloques para la próxima época. Tener una visión determinista de qué validadores propondrán los próximos bloques permite habilitar [preconfirmaciones](https://ethresear.ch/t/based-preconfirmations/17353): un compromiso con el proponente entrante que garantiza que la transacción del usuario se incluya en su bloque sin necesidad de esperar al bloque real.

Esta funcionalidad beneficia tanto a las implementaciones de clientes como a la seguridad de la red, ya que evita casos extremos en los que los validadores prodrían manipular el calendario de proponentes. La anticipación también permite una implementación menos compleja.

### Códigos de operación y precompilaciones (golosinas para desarrolladores) {#opcodes-and-precomliles}

#### Código operativo CLZ (que cuenta los ceros iniciales) {#count-leading-zeros-opcode}

Especificación: https://eips.ethereum.org/EIPS/eip-7939

EIP-7939 añade una pequeña instrucción a la EVM, CLZ («contar ceros iniciales»). Dado un valor de 256 bits, devuelve cuántos bits en cero hay al principio y devuelve 256 si el valor es completamente cero. Es una funcionalidad común en muchas arquitecturas de conjuntos de instrucciones, ya que permite realizar operaciones aritméticas de forma más eficiente. En la práctica, esto reemplaza los escaneos de bits hechos a mano que se usan hoy en día por una sola instrucción, lo que simplifica y abarata tareas como encontrar el primer bit, escanear bytes o analizar campos de bits. El código de operación tiene un coste bajo y fijo, y se ha comprobado que su rendimiento es comparable al de una suma básica, lo que reduce el código de bytes y ahorra gas para realizar el mismo trabajo.

## ¿Afecta esta actualización a todos los nodos y validadores de Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Sí, la actualización Fusaka requiere actualizar [los clientes de ejecución y los clientes de consenso](/developers/docs/nodes-and-clients/). Todos los principales clientes de Ethereum lanzarán versiones compatibles con la bifurcación dura marcada como alta prioridad. Puede estar al tanto de cuándo estarán disponibles estas versiones en los repositorios de GitHub de los clientes, en sus [canales de Discord](https://ethstaker.org/support), en el [Discord EthStaker](https://dsc.gg/ethstaker), o suscribiéndose al blog de Ethereum para recibir actualizaciones del protocolo. Para mantener la sincronización con la red de Ethereum posactualización, los operadores de nodos deben asegurarse de que están ejecutando una versión de cliente compatible. Tenga en cuenta que la información sobre las versiones de los clientes es sensible al tiempo, y los usuarios deben consultar las últimas actualizaciones para obtener los últimos detalles.

## ¿Cómo se puede convertir ETH después de la bifurcación dura? {#how-can-eth-be-converted-after-the-hardfork}

- **No se requiere ninguna acción para sus ETH**: después de la actualización Fusaka de Ethereum, no hay necesidad de convertir o actualizar sus ETH. Los saldos de su cuenta seguirán siendo los mismos, y el ETH que tiene actualmente seguirá siendo accesible en su forma existente después de la bifurcación dura.
- **¡Cuídese de fraudes!** <Emoji text="⚠️" /> **Cualquiera que le indique que "actualice" su ETH está tratando de estafarlo.** No hay nada que tenga que hacer en relación con esta actualización. Sus activos no se verán afectados en absoluto. Recuerde, mantenerse informado es la mejor defensa contra las estafas.

[Más sobre el reconocimiento y la prevención de estafas](/security/)

## Lecturas adicionales {#further-reading}

- [Hoja de ruta de Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Bankless: qué le aportarán a Ethereum Fusaka y Pectra](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: las próximas actualizaciones de Ethereum: Fusaka, Glamsterdam y más, con Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
