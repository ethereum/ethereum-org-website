---
title: Gasper
description: Una explicación del mecanismo de prueba de participación Gasper.
lang: es
---

Gasper es una combinación de Casper apodado el cordial aparato de finalidad («Friendly Finality Gadget» o Casper-FFG) y el algoritmo de elección de bifurcación LMD-GHOST. Juntos, estos componentes conforman el mecanismo de consenso, asegurando así la prueba de participación en Ethereum. Casper es el mecanismo que actualiza determinados bloques a «finalizado» de modo que los nuevos participantes en la red puedan estar seguros de que están sincronizando la cadena predilecta. El algoritmo de elección de bifurcación utiliza votos acumulados para asegurar que los nodos puedan seleccionar fácilmente la correcta cuando las bifurcaciones surjan en la cadena de bloques.

**Observe** que la definición original de Casper-FFG se actualizó ligeramente para su inclusión en Gasper. En esta página consideramos la versión actualizada.

## Pre requisitos

Para entender este material es necesario leer la página de introducción en la [Prueba de participación](/developers/docs/consensus-mechanisms/pos/).

## La función de Gasper {#role-of-gasper}

Gasper está encima de una cadena de bloque de prueba de participación donde los nodos proporcionan ether como un depósito de seguridad que pueden ser destruido si son perezosos o deshonestos al proponer o validar bloques. Gasper es el mecanismo que define cómo se recompensa y castiga a los validadores, decide qué bloques acepta y rechaza, y en qué bifurcación de la cadena de bloques construye.

## ¿Qué es la finalidad? {#what-is-finality}

La finalidad es una propiedad de ciertos bloques que significa que no pueden revertirse a menos que haya habido un fracaso crítico en el consenso y que un atacante haya destruido al menos 1/3 del ether totales apostados. Los bloques finalizados pueden considerarse como información sobre la que la cadena de bloques está completamente segura. Un bloque debe pasar por un procedimiento de actualización de dos pasos antes de finalizarlo:

1. Dos tercios del ether total apostado deben haber votado a favor de la inclusión de ese bloque en la cadena predilecta. Esta condición actualiza el bloque a «justificado». Es poco probable que se reviertan los bloques justificados, pero pueden revertirse bajo ciertas condiciones.
2. Cuando otro bloque se justifica sobre un bloque justificado, se actualiza a «finalizado». Finalizar un bloque es un compromiso de incluir el bloque en la cadena predilecta. No se puede revertir a menos que un atacante destruya millones de ethers (miles de millones de USD).

Estas mejoras de bloques no ocurren en todas las ranuras. En cambio, sólo se pueden justificar y finalizar los bloques de límites épocas. A estos bloques se les denomina «puntos de control». La actualización tiene en cuenta a pares de puntos de control. Un «enlace supermayoritario» debe existir entre dos puntos de control sucesivos (es decir, dos tercios del total de votos de ether apostando que el punto B es el descendiente correcto del punto de control A) para actualizar como finalizado el punto de control menos reciente y como justificado el bloque más reciente.

Como la finalidad requiere un acuerdo de dos tercios de que un bloque es el predilecto, un atacante no puede crear una cadena final alternativa sin:

1. Poseer o manipular dos tercios del ether en participación.
2. Destruir al menos un tercio del total de ether en participación.

La primera condición surge porque se necesitan dos tercios del ether en participación para finalizar una cadena. La segunda condición surge porque si dos tercios del total de la apuesta han votado a favor de ambas bifurcaciones, entonces un tercio debe haber votado por ambas. El doble voto es una condición de corte que sería castigada al máximo, y una tercera parte de la apuesta total sería destruida. A partir de mayo de 2022, esto requiere que un atacante queme alrededor de 10.000 millones de USD en ether. El algoritmo que justifica y finaliza bloques en Gasper es una forma ligeramente modificada de [Casper-FFG](https://arxiv.org/pdf/1710.09437.pdf).

### Incentivos y recortes {#incentives-and-slashing}

Se recompensa a los validadores por proponer y validar bloques honestamente. Ether se recompensa y añade a su participación. Por otro lado, los validadores que están ausentes y no actúan cuando se les llama, pierden estas recompensas y, a veces, una pequeña parte de su participación. Sin embargo, las sanciones por estar fuera de línea son pequeñas y, en la mayoría de los casos, equivalen a costes de oportunidad de pérdidas de recompensas. Aunque algunas acciones del validador son muy difíciles de acometer accidentalmente y son producto de alguna intención maliciosa, tal como proponer múltiples bloques para la misma ranura, certificar múltiples bloques para la misma ranura o contradecir los votos previos de los puntos de control. Se trata de comportamientos «recortables» que se penalizan con mayor dureza, que provocan la destrucción de una parte de la participación del validador y la eliminación del validador de la red de validadores. Este proceso tarda 36 días. En el primer día, hay una penalización inicial de hasta 1 ETH. Entonces el ether del validador recortado lentamente se drenará durante el período de salida, pero el 18.º día, recibe una «penalización de correlación», que es mayor cuantos más validadores se recortan durante el mismo periodo de tiempo. La penalización máxima es su apuesta completa. Estas recompensas y penalizaciones están diseñadas para compensar a los validadores honestos y desincentivar ataques en la red.

### Pérdida por inactividad {#inactivity-leak}

Además de la seguridad, Gasper también proporciona «vivacidad plausible». Indica que mientras dos tercios del ether total estén votando honestamente y siguiendo el protocolo, la cadena será capaz de finalizar independientemente de cualquier otra actividad (como ataques, problemas de latencia, o recortes de recompensa). Dicho de otro modo, un tercio del total del ether apostado debe estar afectado de algún modo para evitar que la cadena finalice. En Gasper, existe una línea adicional de defensa contra un fracaso de la vivacidad, conocida como «fuga de inactividad». Este mecanismo se activa cuando la cadena no ha finalizado en más de cuatro épocas. Los validadores que no están certificando activamente a la cadena de la mayoría tienen su participación gradualmente drenada hasta que la mayoría recupera dos tercios de la apuesta total, garantizando de esta manera que los fracasos de la vivacidad sean sólo temporales.

### Opción de bifurcación {#fork-choice}

La definición original de Casper-FFG incluía un algoritmo de elección de bifurcación que impuso la regla: `siga la cadena que contiene el punto de control justificado con la mayor altura`, donde altura se define como la mayor distancia desde el bloque inicial. En Gasper, la regla de elección de la bifurcación original ha quedado obsoleta a favor de un algoritmo más sofisticado llamado LMD-GHOST. Es importante darse cuenta de que en condiciones normales una regla de elección de bifurcación es innecesaria: hay un único proponedor de bloque para cada ranura, y los validadores honestos lo certifican. Sólo en casos de gran asincronía de la red o cuando un proponente de bloques deshonesto se ha equivocado, se requiere un algoritmo de elección de bifurcación. Sin embargo, cuando surgen esos casos, el algoritmo de elección de la bifurcación es una defensa crítica que asegura la cadena correcta.

LMD-GHOST son las siglas de «latest message-driven greedy heaviest observed sub-tree» (o último mensaje dirigido codicioso observado del subárbol). Esta es una jerga del mundillo para definir un algoritmo que selecciona la bifurcación con el mayor peso acumulado de certificaciones como el predilecto (subárbol más pesado codicioso) y que si se reciben varios mensajes de un validador, sólo se considera el último (última unidad de mensajes). Antes de añadir el bloque más pesado a su cadena predilecta, cada validador evalúa cada bloque usando esta regla.

## Más información {#further-reading}

- [Gasper: combinar GHOST y Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper, el cordial aparato de fidelidad](https://arxiv.org/pdf/1710.09437.pdf)
