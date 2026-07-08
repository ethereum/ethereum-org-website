---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Aprende sobre la actualización del protocolo Fusaka
lang: es
authors: ["Nixo", "Mario Havel"]
---

**La muy esperada actualización Fusaka de Ethereum se lanzó el 3 de diciembre de 2025**

La actualización de la red Fusaka sigue a [Pectra](/roadmap/pectra/) y trae más características nuevas y mejora la experiencia para cada usuario y desarrollador de [Ethereum](/). El nombre consiste en la actualización de la capa de ejecución Osaka y la versión de la capa de consenso nombrada en honor a la estrella Fulu. Ambas partes de Ethereum reciben una actualización que impulsa el escalado, la seguridad y la experiencia del usuario de Ethereum hacia el futuro.

<Alert variant="update">
<AlertContent>
<AlertDescription>
La actualización Fusaka es solo un paso en los objetivos de desarrollo a largo plazo de Ethereum. Aprende más sobre [la hoja de ruta del protocolo](/roadmap/) y [las actualizaciones anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Mejoras en Fusaka {#improvements-in-fusaka}

### Escalar blobs {#scale-blobs}

#### PeerDAS {#peerdas}

Este es el _atractivo principal_ de la bifurcación Fusaka, la característica principal añadida en esta actualización. Las capas 2 (L2) actualmente publican sus datos en Ethereum en blobs, el tipo de datos efímero creado específicamente para las capas 2. Antes de Fusaka, cada nodo completo tenía que almacenar cada blob para garantizar que los datos existieran. A medida que aumenta la capacidad de procesamiento de blobs, tener que descargar todos estos datos se vuelve insosteniblemente intensivo en recursos.

Con el [muestreo de disponibilidad de datos](https://notes.ethereum.org/@fradamt/das-fork-choice), en lugar de tener que almacenar todos los datos del blob, cada nodo será responsable de un subconjunto de los datos del blob. Los blobs se distribuyen de manera uniforme y aleatoria entre los nodos de la red, y cada nodo completo contiene solo 1/8 de los datos, lo que permite un escalado teórico de hasta 8 veces. Para garantizar la disponibilidad de los datos, cualquier porción de los datos se puede reconstruir a partir de cualquier 50 % existente del total con métodos que reducen la probabilidad de datos incorrectos o faltantes a un nivel criptográficamente insignificante (~uno en 10<sup>20</sup> a uno en 10<sup>24</sup>).

Esto mantiene los requisitos de hardware y ancho de banda para los nodos sostenibles al tiempo que permite el escalado de blobs, lo que resulta en una mayor escala con tarifas más pequeñas para las capas 2.

[Aprende más sobre PeerDAS](/roadmap/fusaka/peerdas/)

**Recursos**:

- [Especificación técnica de EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion sobre PeerDAS: Escalando Ethereum hoy | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Académico: Una documentación de PeerDAS de Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Bifurcaciones de solo parámetros de blob {#blob-parameter-only-forks}

Las capas 2 escalan Ethereum: a medida que sus redes crecen, necesitan publicar más datos en Ethereum. Esto significa que Ethereum necesitará aumentar la cantidad de blobs disponibles para ellas a medida que pase el tiempo. Aunque PeerDAS permite escalar los datos de los blobs, debe hacerse de manera gradual y segura.

Debido a que Ethereum es código que se ejecuta en miles de nodos independientes que requieren un acuerdo sobre las mismas reglas, no podemos simplemente introducir cambios como aumentar el recuento de blobs de la misma manera que se despliega una actualización de un sitio web. Cualquier cambio de regla debe ser una actualización coordinada donde cada nodo, cliente y software de validador se actualice antes del mismo bloque predeterminado.

Estas actualizaciones coordinadas generalmente incluyen muchos cambios, requieren muchas pruebas y eso lleva tiempo. Para adaptarse más rápido a las cambiantes necesidades de blobs de la capa 2, las bifurcaciones de solo parámetros de blob introducen un mecanismo para aumentar los blobs sin tener que esperar a ese cronograma de actualización.

Las bifurcaciones de solo parámetros de blob pueden ser configuradas por los clientes, de manera similar a otras configuraciones como el límite de gas. Entre las principales actualizaciones de Ethereum, los clientes pueden acordar aumentar los blobs `target` y `max` a, por ejemplo, 9 y 12, y luego los operadores de nodos se actualizarán para participar en esa pequeña bifurcación. Estas bifurcaciones de solo parámetros de blob se pueden configurar en cualquier momento.

Cuando se agregaron blobs por primera vez a la red en la actualización Dencun, el objetivo era 3. Eso se incrementó a 6 en Pectra y, después de Fusaka, ahora se puede aumentar a un ritmo sostenible independientemente de estas importantes actualizaciones de la red.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Fuente del gráfico: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Recursos**: [Especificación técnica de EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Tarifa base de blob limitada por los costos de ejecución {#blob-base-fee-bounded-by-execution-costs}

Las capas 2 pagan dos facturas cuando publican datos: la tarifa de blob y el gas de ejecución necesario para verificar esos blobs. Si el gas de ejecución domina, la subasta de la tarifa de blob puede caer en espiral hasta 1 Wei y dejar de ser una señal de precio.

EIP-7918 fija un precio de reserva proporcional debajo de cada blob. Cuando la reserva es mayor que la tarifa base nominal del blob, el algoritmo de ajuste de tarifas trata el bloque como si estuviera por encima del objetivo y deja de empujar la tarifa hacia abajo, permitiendo que aumente normalmente. Como resultado:

- el mercado de tarifas de blob siempre reacciona a la congestión
- las capas 2 pagan al menos una parte significativa del cómputo que imponen a los nodos
- los picos de la tarifa base en la capa de ejecución ya no pueden dejar la tarifa de blob estancada en 1 Wei

**Recursos**:

- [Especificación técnica de EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Explicación en Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Escalar la capa 1 (L1) {#scale-l1}

#### Expiración del historial y recibos más simples {#history-expiry}

En julio de 2025, los clientes de ejecución de Ethereum [comenzaron a admitir la expiración del historial parcial](https://blog.ethereum.org/2025/07/08/partial-history-exp). Esto eliminó el historial anterior a [La Fusión](https://ethereum.org/roadmap/merge/) para reducir el espacio en disco requerido por los operadores de nodos a medida que Ethereum continúa creciendo.

Esta EIP se encuentra en una sección separada de las "EIP principales" porque la bifurcación en realidad no implementa ningún cambio: es un aviso de que los equipos de clientes deben admitir la expiración del historial para la actualización Fusaka. En la práctica, los clientes pueden implementar esto en cualquier momento, pero agregarlo a la actualización lo puso concretamente en su lista de tareas pendientes y les permitió probar los cambios de Fusaka junto con esta característica.

**Recursos**: [Especificación técnica de EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Establecer límites superiores para MODEXP {#set-upper-bounds-for-modexp}

Hasta ahora, el precompilado MODEXP aceptaba números de prácticamente cualquier tamaño. Eso lo hacía difícil de probar, fácil de abusar y riesgoso para la estabilidad del cliente. EIP-7823 establece un límite claro: cada número de entrada puede tener como máximo 8192 bits (1024 bytes) de longitud. Cualquier cosa más grande es rechazada, el gas de la transacción se quema y no ocurren cambios de estado. Cubre muy cómodamente las necesidades del mundo real al tiempo que elimina los casos extremos que complicaban la planificación del límite de gas y las revisiones de seguridad. Este cambio proporciona más seguridad y protección contra DoS sin afectar la experiencia del usuario o del desarrollador.

**Recursos**: [Especificación técnica de EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Límite máximo de gas por transacción {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) añade un límite máximo de 16.777.216 (2^24) de gas por transacción. Es un endurecimiento proactivo contra DoS al limitar el costo en el peor de los casos de cualquier transacción individual a medida que aumentamos el límite de gas del bloque. Hace que la validación y la propagación sean más fáciles de modelar para permitirnos abordar el escalado mediante el aumento del límite de gas.

¿Por qué exactamente 2^24 de gas? Es cómodamente más pequeño que el límite de gas actual, es lo suficientemente grande para despliegues de contratos reales y precompilados pesados, y una potencia de 2 hace que sea fácil de implementar en todos los clientes. Este nuevo tamaño máximo de transacción es similar al tamaño de bloque promedio anterior a Pectra, lo que lo convierte en un límite razonable para cualquier operación en Ethereum.

**Recursos**: [Especificación técnica de EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Aumento del costo de gas de `MODEXP` {#modexp-gas-cost-increase}

MODEXP es una función incorporada de precompilado que calcula la exponenciación modular, un tipo de matemática de números grandes utilizada en la verificación de firmas RSA y sistemas de prueba. Permite a los contratos ejecutar estos cálculos directamente sin tener que implementarlos ellos mismos.

Los desarrolladores y los equipos de clientes identificaron a MODEXP como un obstáculo importante para aumentar el límite de gas del bloque porque el precio actual del gas a menudo subestima cuánta potencia de cálculo requieren ciertas entradas. Esto significa que una transacción que usa MODEXP podría ocupar la mayor parte del tiempo necesario para procesar un bloque entero, ralentizando la red.

Esta EIP cambia los precios para que coincidan con los costos computacionales reales al:

- aumentar el cargo mínimo de 200 a 500 de gas y eliminar el descuento de un tercio de EIP-2565 en el cálculo del costo general
- aumentar el costo más bruscamente cuando la entrada del exponente es muy larga. Si el exponente (el número de "potencia" que pasas como segundo argumento) es mayor a 32 bytes / 256 bits, el cargo de gas sube mucho más rápido por cada byte adicional
- cobrar un extra por una base o módulo grande también. Se asume que los otros dos números (la base y el módulo) son de al menos 32 bytes; si alguno de los dos es más grande, el costo aumenta en proporción a su tamaño

Al hacer coincidir mejor los costos con el tiempo de procesamiento real, MODEXP ya no puede hacer que un bloque tarde demasiado en validarse. Este cambio es uno de varios destinados a hacer que sea seguro aumentar el límite de gas del bloque de Ethereum en el futuro.

**Recursos**: [Especificación técnica de EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Límite de tamaño del bloque de ejecución RLP {#rlp-execution-block-size-limit}

Esto crea un tope sobre qué tan grande se permite que sea un bloque: este es un límite sobre lo que se _envía_ a través de la red y está separado del límite de gas, que limita el _trabajo_ dentro de un bloque. El límite de tamaño del bloque es de 10 MiB, con una pequeña asignación (2 MiB) reservada para los datos de consenso para que todo encaje y se propague limpiamente. Si aparece un bloque más grande que eso, los clientes lo rechazan.
Esto es necesario porque los bloques muy grandes tardan más en propagarse y verificarse en la red y pueden crear problemas de consenso o ser abusados como un vector de DoS. Además, el protocolo gossip de la capa de consenso ya no reenvía bloques de más de ~10 MiB, por lo que alinear la capa de ejecución a ese límite evita situaciones extrañas de "visto por algunos, descartado por otros".

Los detalles técnicos: este es un límite en el tamaño del bloque de ejecución codificado en [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB en total, con un margen de seguridad de 2 MiB reservado para el enmarcado del bloque de la cadena de balizas. En la práctica, los clientes definen

`MAX_BLOCK_SIZE = 10,485,760` bytes y

`SAFETY_MARGIN = 2,097,152` bytes,

y rechazan cualquier bloque de ejecución cuya carga útil RLP exceda

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

El objetivo es limitar el tiempo de propagación/validación en el peor de los casos y alinearse con el comportamiento de gossip de la capa de consenso, reduciendo el riesgo de reorganización/DoS sin cambiar la contabilidad del gas.

**Recursos**: [Especificación técnica de EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Establecer el límite de gas predeterminado en 60 millones {#set-default-gas-limit-to-60-million}

Antes de aumentar el límite de gas de 30M a 36M en febrero de 2025 (y posteriormente a 45M), este valor no había cambiado desde La Fusión (septiembre de 2022). Esta EIP tiene como objetivo hacer del escalado consistente una prioridad.

EIP-7935 coordina a los equipos de clientes de la capa de ejecución para elevar el límite de gas predeterminado por encima de los 45M actuales para Fusaka. Es una EIP informativa, pero pide explícitamente a los clientes que prueben límites más altos en las redes de desarrollo, converjan en un valor seguro y envíen ese número en sus lanzamientos de Fusaka.

La planificación de la red de desarrollo apunta a un estrés de ~60M (bloques completos con carga sintética) y aumentos iterativos; la investigación dice que las patologías del tamaño del bloque en el peor de los casos no deberían vincularse por debajo de ~150M. El despliegue debe combinarse con el límite máximo de gas por transacción (EIP-7825) para que ninguna transacción individual pueda dominar a medida que aumentan los límites.

**Recursos**: [Especificación técnica de EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Mejorar la experiencia del usuario (UX) {#improve-ux}

#### Previsión determinista del proponente {#deterministic-proposer-lookahead}

Con EIP-7917, la cadena de balizas será consciente de los próximos proponentes de bloques para la siguiente época. Tener una vista determinista sobre qué validadores propondrán bloques futuros puede habilitar las [preconfirmaciones](https://ethresear.ch/t/based-preconfirmations/17353): un compromiso con el próximo proponente que garantiza que la transacción del usuario se incluirá en su bloque sin esperar al bloque real.

Esta característica beneficia las implementaciones de clientes y la seguridad de la red, ya que previene casos extremos donde los validadores podrían manipular el cronograma del proponente. La previsión también permite una menor complejidad de la implementación.

**Recursos**: [Especificación técnica de EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Código de operación para contar ceros a la izquierda (CLZ) {#count-leading-zeros-opcode}

Esta característica añade una pequeña instrucción a la EVM, **contar ceros a la izquierda (CLZ)**. Casi todo en la EVM se representa como un valor de 256 bits; este nuevo código de operación devuelve cuántos bits cero hay en la parte delantera. Esta es una característica común en muchas arquitecturas de conjuntos de instrucciones, ya que permite operaciones aritméticas más eficientes. En la práctica, esto colapsa los escaneos de bits manuales de hoy en un solo paso, por lo que encontrar el primer bit establecido, escanear bytes o analizar campos de bits se vuelve más simple y económico. El código de operación es de bajo costo fijo y se ha evaluado para estar a la par con una suma básica, lo que recorta el código de bytes y ahorra gas para el mismo trabajo.

**Recursos**: [Especificación técnica de EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Precompilado para soporte de la curva secp256r1 {#secp256r1-precompile}

Introduce un verificador de firmas secp256r1 (P-256) incorporado, estilo clave de acceso, en la dirección fija `0x100` utilizando el mismo formato de llamada ya adoptado por muchas capas 2 y solucionando casos extremos, para que los contratos escritos para esos entornos funcionen en la capa 1 sin cambios.

¡Actualización de UX! Para los usuarios, esto desbloquea la firma nativa del dispositivo y las claves de acceso. Las billeteras pueden aprovechar Apple Secure Enclave, el almacén de claves de Android, los módulos de seguridad de hardware (HSM) y FIDO2/WebAuthn directamente: sin frase semilla, una incorporación más fluida y flujos multifactoriales que se sienten como aplicaciones modernas. Esto da como resultado una mejor UX, una recuperación más fácil y patrones de abstracción de cuentas que coinciden con lo que ya hacen miles de millones de dispositivos.

Para los desarrolladores, toma una entrada de 160 bytes y devuelve una salida de 32 bytes, lo que facilita la migración de bibliotecas existentes y contratos de la capa 2. Internamente, incluye comprobaciones de punto en el infinito y comparación modular para eliminar casos extremos complicados sin romper a los llamadores válidos.

**Recursos**:

- [Especificación técnica de EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Más sobre RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Ten en cuenta que EIP-7951 reemplazó a RIP-7212)_

### Meta {#meta}

#### Método JSON-RPC `eth_config` {#eth-config}

Esta es una llamada JSON-RPC que te permite preguntarle a tu nodo qué configuración de bifurcación estás ejecutando. Devuelve tres instantáneas: `current`, `next` y `last` para que los validadores y las herramientas de monitoreo puedan verificar que los clientes estén alineados para una próxima bifurcación.

En términos prácticos, esto es para abordar una deficiencia descubierta cuando la bifurcación Pectra se lanzó en la red de prueba Holesky a principios de 2025 con configuraciones erróneas menores que resultaron en un estado de no finalización. Esto ayuda a los equipos de pruebas y a los desarrolladores a garantizar que las bifurcaciones importantes se comporten como se espera al pasar de las redes de desarrollo a las redes de prueba, y de las redes de prueba a la Red principal.

Las instantáneas incluyen: `chainId`, `forkId`, el tiempo de activación planificado de la bifurcación, qué precompilados están activos, direcciones de precompilados, dependencias de contratos del sistema y el cronograma de blobs de la bifurcación.

Esta EIP se encuentra en una sección separada de las "EIP principales" porque la bifurcación en realidad no implementa ningún cambio: es un aviso de que los equipos de clientes deben implementar este método JSON-RPC para la actualización Fusaka.

**Recursos**: [Especificación técnica de EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Preguntas frecuentes {#faq}

### ¿Esta actualización afecta a todos los nodos y validadores de Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Sí, la actualización Fusaka requiere actualizaciones tanto para los [clientes de ejecución como para los clientes de consenso](/developers/docs/nodes-and-clients/). Todos los clientes principales de Ethereum lanzarán versiones que admitan la bifurcación dura marcadas como de alta prioridad. Puedes mantenerte al tanto de cuándo estarán disponibles estos lanzamientos en los repositorios de GitHub de los clientes, sus [canales de Discord](https://ethstaker.org/support), el [Discord de EthStaker](https://dsc.gg/ethstaker), o suscribiéndote al blog de Ethereum para actualizaciones del protocolo. Para mantener la sincronización con la red Ethereum después de la actualización, los operadores de nodos deben asegurarse de que están ejecutando una versión de cliente compatible. Ten en cuenta que la información sobre los lanzamientos de clientes es sensible al tiempo, y los usuarios deben consultar las últimas actualizaciones para obtener los detalles más actuales.

### ¿Cómo se puede convertir ETH después de la bifurcación dura? {#how-can-eth-be-converted-after-the-hardfork}

- **No se requiere ninguna acción para tu ETH**: Después de la actualización Fusaka de Ethereum, no hay necesidad de convertir o actualizar tu ETH. Los saldos de tu cuenta seguirán siendo los mismos, y el ETH que posees actualmente seguirá siendo accesible en su forma existente después de la bifurcación dura.
- **¡Cuidado con las estafas!** <Emoji text="⚠️" /> **cualquiera que te indique que "actualices" tu ETH está intentando estafarte.** No hay nada que debas hacer en relación con esta actualización. Tus activos permanecerán completamente inalterados. Recuerda, mantenerte informado es la mejor defensa contra las estafas.

[Más sobre cómo reconocer y evitar estafas](/security/)

### ¿Qué pasa con las cebras? <Emoji text="🦓" /> {#whats-with-the-zebras}

Una cebra es la "mascota" elegida por los desarrolladores para Fusaka porque sus rayas reflejan el muestreo de disponibilidad de datos basado en columnas de PeerDAS, donde los nodos custodian ciertas subredes de columnas y muestrean algunas otras columnas del slot de cada par para verificar que los datos del blob estén disponibles.

La Fusión en 2022 [usó un panda](https://x.com/hwwonx/status/1431970802040127498) como su mascota para señalar la unión de las capas de ejecución y consenso. Desde entonces, se han elegido mascotas informalmente para cada bifurcación y aparecen como arte ASCII en los registros del cliente en el momento de la actualización. Es solo una forma divertida de celebrar.

### ¿Qué mejoras se incluyen para el escalado de la capa 2 (L2)? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) es la característica principal de la bifurcación. Implementa el muestreo de disponibilidad de datos (DAS) que desbloquea más escalabilidad para los rollups, escalando teóricamente el espacio de blobs hasta 8 veces el tamaño actual. El mercado de tarifas de blob también se mejorará para reaccionar de manera eficiente a la congestión y garantizar que las capas 2 paguen una tarifa significativa por el cómputo y el espacio que los blobs imponen a los nodos.

### ¿En qué se diferencian las bifurcaciones BPO? {#how-are-bpo-forks-different}

Las bifurcaciones de solo parámetros de blob (BPO) proporcionan un mecanismo para aumentar continuamente el recuento de blobs (tanto el objetivo como el máximo) después de que se activa PeerDAS, sin tener que esperar a una actualización coordinada completa. Cada aumento está codificado para estar preconfigurado en los lanzamientos de clientes que admiten Fusaka.

Como usuario o validador, no necesitas actualizar tus clientes para cada BPO y solo debes asegurarte de seguir las bifurcaciones duras principales como Fusaka. Esta es la misma práctica que antes, no se necesitan acciones especiales. Aún se recomienda monitorear tus clientes en torno a las actualizaciones y BPO y mantenerlos actualizados incluso entre lanzamientos principales, ya que las correcciones u optimizaciones podrían seguir a la bifurcación dura.

### ¿Cuál es el cronograma de BPO? {#what-is-the-bpo-schedule}

El cronograma exacto de las actualizaciones de BPO se determinará con los lanzamientos de Fusaka. Sigue los [anuncios del protocolo](https://blog.ethereum.org/category/protocol) y las notas de la versión de tus clientes.

Ejemplo de cómo podría verse:

- Antes de Fusaka: objetivo 6, máximo 9
- En la activación de Fusaka: objetivo 6, máximo 9
- BPO1, unas semanas después de la activación de Fusaka: objetivo 10, máximo 15, aumentando en dos tercios
- BPO2, unas semanas después de BPO1: objetivo 14, máximo 21

### ¿Esto reducirá las tarifas en Ethereum (capa 1)? {#will-this-lower-gas}

Esta actualización no reduce las tarifas de gas en la capa 1, al menos no directamente. El enfoque principal es más espacio de blobs para los datos de los rollups, por lo tanto, reduciendo las tarifas en la capa 2. Esto podría tener algunos efectos secundarios en el mercado de tarifas de la capa 1, pero no se espera ningún cambio significativo.

### Como participante (staker), ¿qué debo hacer para la actualización? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Al igual que con cada actualización de la red, asegúrate de actualizar tus clientes a las últimas versiones marcadas con soporte para Fusaka. Sigue las actualizaciones en la lista de correo y los [Anuncios del protocolo en el blog de la EF](https://blog.ethereum.org/category/protocol) para informarte sobre los lanzamientos.
Para validar tu configuración antes de que Fusaka se active en la Red principal, puedes ejecutar un validador en las redes de prueba. Fusaka se [activa antes en las redes de prueba](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), dándote más espacio para asegurarte de que todo funcione y reportar errores. Las bifurcaciones de las redes de prueba también se anuncian en la lista de correo y en el blog.

### ¿La "Previsión determinista del proponente" (EIP-7917) afecta a los validadores? {#does-7917-affect-validators}

Este cambio no modifica cómo funciona tu cliente de validador, sin embargo, proporcionará más información sobre el futuro de tus deberes como validador. Asegúrate de actualizar tus herramientas de monitoreo para mantenerte al día con las nuevas características.

### ¿Cómo afecta Fusaka a los requisitos de ancho de banda para nodos y validadores? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS hace un cambio significativo en cómo los nodos transmiten los datos de los blobs. Todos los datos se dividen en partes llamadas columnas a través de 128 subredes, y los nodos se suscriben solo a algunas de ellas. La cantidad de columnas de subred que los nodos tienen que custodiar depende de su configuración y del número de validadores conectados. Los requisitos reales de ancho de banda dependerán de la cantidad de blobs permitidos en la red y del tipo de nodo. En el momento de la activación de Fusaka, el objetivo de blobs se mantiene igual que antes, pero con PeerDAS, los operadores de nodos pueden ver una disminución en su uso de disco de blobs y tráfico de red. A medida que las BPO configuran un mayor número de blobs en la red, el ancho de banda necesario aumentará con cada BPO.

Los requisitos de los nodos todavía están dentro de los [márgenes recomendados](https://eips.ethereum.org/EIPS/eip-7870) incluso después de las BPO de Fusaka.

#### Nodos completos {#full-nodes}

Los nodos regulares sin ningún validador se suscribirán a solo 4 subredes, proporcionando custodia para 1/8 de los datos originales. Esto significa que con la misma cantidad de datos de blob, el ancho de banda del nodo para descargarlos sería menor por un factor de ocho (8). El uso del disco y el ancho de banda de descarga de blobs para un nodo completo normal podría disminuir alrededor del 80 %, a solo unos pocos Mb.

#### Participantes en solitario (solo stakers) {#solo-stakers}

Si el nodo se utiliza para un cliente de validador, tiene que custodiar más columnas y, por lo tanto, procesar más datos. Con un validador añadido, el nodo se suscribe a al menos 8 subredes de columnas y, por lo tanto, procesa el doble de datos que un nodo regular, pero aún menos que antes de Fusaka. Si el saldo del validador es superior a 287 ETH, se suscribirá a más y más subredes.

Para un participante en solitario, esto significa que su uso de disco y ancho de banda de descarga disminuirán alrededor del 50 %. Sin embargo, para construir bloques localmente y cargar todos los blobs a la red, se necesita más ancho de banda de carga. Los constructores locales necesitarán un ancho de banda de carga 2-3 veces mayor que antes en el momento de Fusaka y con el objetivo BPO2 de 15/21 blobs, el ancho de banda de carga final necesario tendrá que ser alrededor de 5 veces mayor, a 100 Mbps.

#### Grandes validadores {#large-validators}

El número de subredes suscritas crece con más saldo y validadores añadidos al nodo. Por ejemplo, con un saldo de alrededor de 800 ETH, el nodo custodia 25 columnas y necesitará alrededor de un 30 % más de ancho de banda de descarga que antes. La carga necesaria aumenta de manera similar a los nodos regulares y se necesitan al menos 100 Mbps.

A 4096 ETH, 2 validadores de saldo máximo, el nodo se convierte en un 'supernodo' que custodia todas las columnas, por lo tanto, descarga y almacena todo. Estos nodos curan activamente la red al contribuir con los datos faltantes, pero también requieren mucho más ancho de banda y almacenamiento. Con el objetivo final de blobs siendo 6 veces mayor que antes, los supernodos tendrán que almacenar alrededor de 600 GB de datos de blobs adicionales y tener un ancho de banda de descarga sostenido más rápido de alrededor de 20 Mbps.

[Lee más detalles sobre los requisitos esperados.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### ¿Qué cambios de la EVM se implementan? {#what-evm-changes-are-implemented}

Fusaka consolida la EVM con nuevos cambios menores y características.

- Por seguridad durante el escalado, el tamaño máximo de una sola transacción estará [limitado a 16,7 millones](https://eips.ethereum.org/EIPS/eip-7825) de unidades de gas.
- [El nuevo código de operación para contar ceros a la izquierda (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) se añade a la EVM y permitirá a los lenguajes de contratos inteligentes realizar ciertas operaciones de manera más eficiente.
- [El costo del precompilado `ModExp` se incrementará](https://eips.ethereum.org/EIPS/eip-7883): los contratos que lo utilicen cobrarán más gas por la ejecución.

### ¿Cómo afecta el nuevo límite de gas de 16M a los desarrolladores de contratos? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka introduce un límite al [tamaño máximo de una sola transacción a 16,7 millones](https://eips.ethereum.org/EIPS/eip-7825) (2^24) de unidades de gas. Este es aproximadamente el tamaño anterior de un bloque promedio, lo que lo hace lo suficientemente grande como para acomodar transacciones complejas que consumirían un bloque entero. Este límite crea protección para los clientes, previniendo posibles ataques DoS en el futuro con un límite de gas de bloque más alto. El objetivo del escalado es permitir que entren más transacciones en la cadena de bloques sin que una sola consuma todo el bloque.

Las transacciones de usuarios regulares están lejos de alcanzar este límite. Ciertos casos extremos como operaciones DeFi grandes y complejas, grandes despliegues de contratos inteligentes o transacciones por lotes dirigidas a múltiples contratos podrían verse afectados por este cambio. Estas transacciones tendrán que dividirse en otras más pequeñas u optimizarse de otra manera. Usa la simulación antes de enviar transacciones que potencialmente alcancen el límite.

El método RPC `eth_call` no está limitado y permitirá la simulación de transacciones más grandes que el límite real de la cadena de bloques. El límite real para los métodos RPC puede ser configurado por el operador del cliente para garantizar la prevención de abusos.

### ¿Qué significa CLZ para los desarrolladores? {#what-clz-means-for-developers}

Los compiladores de la EVM como Solidity implementarán y utilizarán la nueva función para contar ceros internamente. Los nuevos contratos podrían beneficiarse de ahorros de gas si dependen de este tipo de operación. Sigue los lanzamientos y el anuncio de características del lenguaje de contratos inteligentes para obtener documentación sobre posibles ahorros.

### ¿Hay algún cambio para mis contratos inteligentes existentes? {#what-clz-means-for-developers-2}

Fusaka no tiene ningún efecto directo que rompa los contratos existentes o cambie su comportamiento. Los cambios introducidos en la capa de ejecución se realizan con compatibilidad con versiones anteriores, sin embargo, siempre mantente atento a los casos extremos y al impacto potencial.

[Con el aumento del costo del precompilado `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), los contratos que dependen de él consumirán más gas para su ejecución. Si tu contrato depende en gran medida de esto y se vuelve más caro para los usuarios, reconsidera cómo se utiliza.

Considera el [nuevo límite de 16,7 millones](https://eips.ethereum.org/EIPS/eip-7825) si las transacciones que ejecutan tus contratos podrían estar alcanzando un tamaño similar.

## Lecturas adicionales {#further-reading}

- [Hoja de ruta de Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [EIP Meta de Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Anuncio en el blog de la red de prueba Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Lo que Fusaka y Pectra traerán a Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Las próximas actualizaciones de Ethereum: Fusaka, Glamsterdam y más allá con Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Los archivos de Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Explicación de PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)