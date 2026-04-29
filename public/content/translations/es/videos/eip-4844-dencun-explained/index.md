---
title: "Desbloqueando el escalado de Ethereum: EIP-4844 explicado"
description: "Finematics explica el EIP-4844 (Proto-Danksharding), la actualización clave en la bifurcación dura Dencun que introduce transacciones de blobs para reducir drásticamente los costos de los rollups de capa 2 en Ethereum."
lang: es
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "como-funciona-ethereum"
  - "escalado"
  - "eip-4844"
  - "dencun"
  - "actualizaciones"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 explicado"
---

Una explicación de **Finematics** que cubre el EIP-4844 (Proto-Danksharding), la actualización clave en la bifurcación dura Dencun que introduce transacciones de blobs para reducir drásticamente los costos de los rollups de capa 2 en Ethereum.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=HT9PHWloIiU) publicada por Finematics. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

El escalado de Ethereum ha sido un tema muy debatido durante un tiempo. Las soluciones de capa 2 (L2) han estado a la vanguardia de esta batalla, ofreciendo una forma de manejar transacciones fuera de la cadena principal para aliviar la congestión y reducir las tarifas. Pero hay un inconveniente: incluso las L2 enfrentan limitaciones que obstaculizan su eficiencia y escalabilidad. El EIP-4844 es el siguiente paso para aumentar el potencial de las L2 y alinear a Ethereum con su hoja de ruta de escalado.

Entonces, ¿de qué trata exactamente el EIP-4844? ¿Cómo ayuda exactamente con el escalado de las L2? ¿Qué nuevas posibilidades desbloquea? ¿Y es cierto que puede reducir las tarifas de transacción en las L2 en más del 90 %?

#### Qué es el EIP-4844 y el Proto-Danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Como recordatorio, EIP significa Propuesta de Mejora de Ethereum (Ethereum Improvement Proposal), un proceso a través del cual los desarrolladores pueden sugerir cambios al protocolo de Ethereum. El EIP-4844, específicamente, presenta una propuesta para un nuevo tipo de transacción que puede mejorar significativamente la forma en que se manejan y procesan los datos en Ethereum. Es posible que también haya escuchado el nombre "Proto-Danksharding", que ahora se usa indistintamente con EIP-4844.

El Proto-Danksharding es una implementación inicial del danksharding completo. Sienta las bases para un mayor escalado con danksharding en el futuro. Esto se logra implementando la mayor parte de la lógica y el "andamiaje" que conforman una especificación completa de danksharding, sin implementar la fragmentación de datos real. Hacerlo de esta manera permite una transición más fácil y menos disruptiva que puede llevarse a cabo a lo largo de múltiples actualizaciones de la red sin introducir demasiado riesgo para Ethereum en una sola actualización.

La idea central detrás del EIP-4844 es apoyar el futuro "centrado en rollups" de Ethereum. Los rollups son soluciones de capa 2 que procesan transacciones fuera de la cadena principal de Ethereum, pero heredan la seguridad de Ethereum. El EIP-4844 tiene como objetivo hacer que los rollups sean más baratos y eficientes mediante la introducción de un nuevo tipo de transacción que los rollups pueden aprovechar para permitirles disminuir sus costos operativos en un orden de magnitud. Esto, a su vez, permitirá que las aplicaciones construidas sobre los rollups sean mucho más baratas de usar y aumentará la adopción de todo el ecosistema de Ethereum.

Imagine hacer un intercambio (swap) en un DEX en uno de los rollups. Si el costo actual de realizar dicha operación es, digamos, de $1, lo más probable es que disminuya a alrededor de $0.10 después del EIP-4844. Sin embargo, el impacto en este ejemplo tiene algunas advertencias que cubriremos más adelante en el video.

El EIP-4844, junto con algunos otros EIP, se incluirá en la próxima actualización Dencun de la red.

#### Detalles técnicos (2:50) {#technical-details-250}

Ahora, echemos un vistazo más de cerca a cómo funciona el EIP-4844.

El EIP-4844 introduce un nuevo tipo de transacción en Ethereum que acepta "blobs" de datos para que persistan en el nodo baliza durante un corto período de tiempo. Estos cambios son compatibles con el futuro de la hoja de ruta de escalado de Ethereum, y los blobs son lo suficientemente pequeños como para mantener el uso del disco manejable. Las transacciones de blobs tienen el mismo formato en el que se espera que existan en la especificación final de danksharding.

Esto viene acompañado de un "mercado de tarifas de blob", lo que garantiza que el espacio de los blobs se utilice de manera eficiente y siga siendo económicamente viable. Esto se logra introduciendo el gas de blob como un nuevo tipo de gas. Es independiente del gas normal. Por ahora, solo los blobs se cotizan en gas de blob.

Los blobs son 4.096 elementos de campo de 32 bytes cada uno. El límite de blobs por bloque está controlado por el parámetro MAX_BLOBS_PER_BLOCK. El límite puede comenzar bajo y crecer a lo largo de múltiples actualizaciones de la red. Inicialmente, Dencun apunta a 6 blobs por bloque. 4.096 × 32 bytes × 6 por bloque = 0,75 MB por bloque.

Los blobs persisten en los nodos baliza (capa de consenso), no en la capa de ejecución. El trabajo futuro de fragmentación solo requiere cambios en el nodo baliza, lo que permite que la capa de ejecución trabaje en otras iniciativas en paralelo.

Los blobs son de corta duración y se podan después de unas dos semanas. Están disponibles el tiempo suficiente para que todos los actores de un rollup los recuperen, pero lo suficientemente corto como para mantener el uso del disco manejable. Esto permite que los blobs tengan un precio más barato que los datos de llamada, que son datos almacenados en el historial para siempre.

La columna vertebral criptográfica del EIP-4844 son los compromisos KZG. Sin entrar en demasiados detalles técnicos, permiten una inclusión de datos eficiente y segura, crucial para la funcionalidad de las transacciones de blobs. De esta manera, solo los compromisos de los blobs tienen que ser interpretados por la EVM en la capa de ejecución y no los blobs en sí.

Para generar el secreto compartido para los compromisos KZG, se llevó a cabo una ceremonia ampliamente distribuida basada en el navegador para que todos los participantes de la red Ethereum tuvieran la oportunidad de asegurarse de que se generara de manera correcta y segura.

El EIP-4844 agrega un nuevo precompilado llamado evaluación de puntos que verifica una prueba KZG que afirma que un blob (representado por un compromiso) se evalúa a un valor dado en un punto dado.

Entonces, ¿cómo se aplica exactamente todo esto a los rollups? Con el nuevo espacio de blobs, los rollups podrán poner los datos de su bloque en blobs en lugar de los datos de llamada más caros que se han utilizado para este propósito hasta ahora. Aprovechar un espacio de blobs de corta duración en la capa de consenso es posible ya que los rollups necesitan que los datos estén disponibles solo el tiempo suficiente para garantizar que los actores honestos puedan construir el espacio del rollup.

En el caso de los rollups optimistas como Optimism o Arbitrum, solo necesitan proporcionar los datos subyacentes mientras la ventana de desafío de fraude esté abierta. La prueba de fraude puede verificar la transición en pasos más pequeños, cargando como máximo unos pocos valores del blob a la vez a través de los datos de llamada.

Los rollups de conocimiento cero (ZK rollups) proporcionarían dos compromisos para su transacción o datos delta de estado: el compromiso del blob y el propio compromiso del ZK rollup utilizando cualquier sistema de prueba que el rollup use internamente. También usarían un protocolo de prueba de equivalencia, utilizando el precompilado de evaluación de puntos mencionado anteriormente, para demostrar que los dos compromisos se refieren a los mismos datos.

#### Impacto (6:25) {#impact-625}

El impacto del EIP-4844 en el ecosistema de Ethereum no se puede exagerar. Para empezar, mejora drásticamente la escalabilidad de las soluciones de capa 2, reduciendo sus costos operativos y haciéndolas más competitivas con otras cadenas de bloques alternativas y baratas. La reducción del costo operativo es posible ya que la gran mayoría del costo en el que incurren actualmente los rollups se debe a las tarifas pagadas por los datos de llamada.

Además, el EIP-4844 sienta las bases para un escalado aún mayor a través del danksharding completo. Esta futura actualización dividirá la red Ethereum en múltiples fragmentos de datos, cada uno capaz de almacenar datos de forma independiente, mejorando aún más la capacidad de la red.

Con la reducción de los costos operativos, podríamos presenciar el surgimiento de una ola de nuevas soluciones de capa 2, atrayendo a desarrolladores para construir aplicaciones innovadoras en los rollups.

Cuando se trata de la disminución de los costos de transacción en los rollups, ilustrada por nuestro ejemplo anterior de intercambio en un DEX, la situación es compleja. Suponiendo que la demanda de rollups se mantenga constante después del EIP-4844, de hecho podríamos anticipar una reducción significativa en los costos para los usuarios. Sin embargo, las mejoras en la escalabilidad pueden conducir a efectos económicos imprevistos. Por ejemplo, tarifas de transacción más bajas para los usuarios finales podrían impulsar a más personas a usar rollups, aumentando posteriormente la demanda de recursos de la red y potencialmente elevando los costos de transacción.

Una cosa es segura: incluso si el resultado principal es el aumento en la capacidad de procesamiento de transacciones y el costo de las transacciones sigue siendo el mismo, el EIP-4844 sienta las bases para una escalabilidad aún mayor en el futuro que eventualmente resultará en transacciones más baratas para los usuarios.

#### Resumen (8:04) {#summary-804}

La comunidad de Ethereum ya ha completado las pruebas del EIP-4844 en varias redes de prueba, y se espera un lanzamiento en la Red principal el 13 de marzo. Este es un paso monumental hacia el logro de una escalabilidad sin precedentes para Ethereum. Ya podemos ver a la mayoría de las principales L2 comprometiéndose a comenzar a usar el nuevo espacio de blobs tan pronto como ocurra la actualización Dencun.

En conclusión, el EIP-4844 es más que una simple actualización. Es un momento crucial en el viaje de Ethereum hacia convertirse en una cadena de bloques más escalable, eficiente y fácil de usar. Al reducir los costos y aumentar la eficiencia de las soluciones de capa 2, Ethereum está listo para consolidar su posición como la plataforma líder para aplicaciones descentralizadas.