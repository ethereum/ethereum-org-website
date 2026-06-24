---
title: Gasper
description: "Una explicación del mecanismo de prueba de participación (PoS) Gasper."
lang: es
---

Gasper es una combinación de Casper the Friendly Finality Gadget (Casper FFG) y el algoritmo de elección de bifurcación LMD-GHOST. Juntos, estos componentes forman el mecanismo de consenso que asegura la prueba de participación (PoS) de Ethereum. Casper es el mecanismo que actualiza ciertos bloques a «finalizados» para que los nuevos participantes en la red puedan estar seguros de que están sincronizando la cadena canónica. El algoritmo de elección de bifurcación utiliza los votos acumulados para garantizar que los nodos puedan seleccionar fácilmente la correcta cuando surgen bifurcaciones en la cadena de bloques.

**Nota:** la definición original de Casper FFG se actualizó ligeramente para su inclusión en Gasper. En esta página consideramos la versión actualizada.

## Requisitos previos {#prerequisites}

Para comprender este material, es necesario leer la página introductoria sobre la [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/).

## El papel de Gasper {#role-of-gasper}

Gasper se asienta sobre una cadena de bloques de prueba de participación donde los nodos proporcionan ether como depósito de seguridad que puede ser destruido si son perezosos o deshonestos al proponer o validar bloques. Gasper es el mecanismo que define cómo los validadores son recompensados y penalizados, deciden qué bloques aceptar y rechazar, y sobre qué bifurcación de la cadena de bloques construir.

## ¿Qué es la finalidad? {#what-is-finality}

La finalidad es una propiedad de ciertos bloques que significa que no pueden ser revertidos a menos que haya habido un fallo crítico de consenso y un atacante haya destruido al menos 1/3 del total de ether en participación. Los bloques finalizados pueden considerarse como información de la que la cadena de bloques está segura. Un bloque debe pasar por un procedimiento de actualización de dos pasos para que sea finalizado:

1. Dos tercios del total de ether en participación deben haber votado a favor de la inclusión de ese bloque en la cadena canónica. Esta condición actualiza el bloque a «justificado». Es poco probable que los bloques justificados se reviertan, pero pueden serlo bajo ciertas condiciones.
2. Cuando otro bloque es justificado sobre un bloque justificado, se actualiza a «finalizado». Finalizar un bloque es un compromiso de incluir el bloque en la cadena canónica. No puede ser revertido a menos que un atacante destruya millones de ether (miles de millones de dólares estadounidenses).

Estas actualizaciones de bloques no ocurren en cada slot. En su lugar, solo los bloques de límite de época pueden ser justificados y finalizados. Estos bloques se conocen como «puntos de control». La actualización considera pares de puntos de control. Debe existir un «enlace de supermayoría» entre dos puntos de control sucesivos (es decir, dos tercios del total de ether en participación votando que el punto de control B es el descendiente correcto del punto de control A) para actualizar el punto de control menos reciente a finalizado y el bloque más reciente a justificado.

Debido a que la finalidad requiere un acuerdo de dos tercios de que un bloque es canónico, un atacante no puede crear una cadena finalizada alternativa sin:

1. Poseer o manipular dos tercios del total de ether en participación.
2. Destruir al menos un tercio del total de ether en participación.

La primera condición surge porque se requieren dos tercios del ether en participación para finalizar una cadena. La segunda condición surge porque si dos tercios de la participación total han votado a favor de ambas bifurcaciones, entonces un tercio debe haber votado en ambas. El doble voto es una condición de recorte que sería castigada al máximo, y un tercio de la participación total sería destruida. A partir de mayo de 2022, esto requiere que un atacante queme alrededor de 10 mil millones de dólares en ether. El algoritmo que justifica y finaliza bloques en Gasper es una forma ligeramente modificada de [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Incentivos y recortes {#incentives-and-slashing}

Los validadores son recompensados por proponer y validar bloques honestamente. Se les recompensa con ether que se añade a su participación. Por otro lado, los validadores que están ausentes y no actúan cuando se les solicita, pierden estas recompensas y a veces pierden una pequeña porción de su participación existente. Sin embargo, las penalizaciones por estar desconectado son pequeñas y, en la mayoría de los casos, equivalen a los costos de oportunidad de perder recompensas. No obstante, algunas acciones de los validadores son muy difíciles de realizar accidentalmente y denotan cierta intención maliciosa, como proponer múltiples bloques para el mismo slot, dar fe de múltiples bloques para el mismo slot o contradecir votos de puntos de control anteriores. Estos son comportamientos «recortables» que se penalizan más duramente: el recorte da como resultado la destrucción de una parte de la participación del validador y la eliminación del validador de la red de validadores. Este proceso dura 36 días. El día 1, hay una penalización inicial de hasta 1 ETH. Luego, el ether del validador recortado se drena lentamente a lo largo del período de salida, pero el día 18, reciben una «penalización por correlación», que es mayor cuando más validadores son recortados casi al mismo tiempo. La penalización máxima es la participación completa. Estas recompensas y penalizaciones están diseñadas para incentivar a los validadores honestos y desincentivar los ataques a la red.

### Fuga por inactividad {#inactivity-leak}

Además de la seguridad, Gasper también proporciona «vitalidad plausible». Esta es la condición de que, siempre que dos tercios del total de ether en participación voten honestamente y sigan el protocolo, la cadena podrá finalizar independientemente de cualquier otra actividad (como ataques, problemas de latencia o recortes). Dicho de otra manera, un tercio del total de ether en participación debe estar comprometido de alguna manera para evitar que la cadena finalice. En Gasper, hay una línea de defensa adicional contra un fallo de vitalidad, conocida como la «fuga por inactividad». Este mecanismo se activa cuando la cadena no ha logrado finalizar durante más de cuatro épocas. A los validadores que no están dando fe activamente de la cadena mayoritaria se les drena gradualmente su participación hasta que la mayoría recupera dos tercios de la participación total, asegurando que los fallos de vitalidad sean solo temporales.

### Elección de bifurcación {#fork-choice}

La definición original de Casper FFG incluía un algoritmo de elección de bifurcación que imponía la regla: `follow the chain containing the justified checkpoint that has the greatest height` donde la altura se define como la mayor distancia desde el bloque génesis. En Gasper, la regla original de elección de bifurcación está obsoleta en favor de un algoritmo más sofisticado llamado LMD-GHOST. Es importante darse cuenta de que, en condiciones normales, una regla de elección de bifurcación es innecesaria: hay un único proponente de bloque para cada slot, y los validadores honestos dan fe de ello. Solo en casos de gran asincronía de la red o cuando un proponente de bloque deshonesto se ha equivocado, se requiere un algoritmo de elección de bifurcación. Sin embargo, cuando surgen esos casos, el algoritmo de elección de bifurcación es una defensa crítica que asegura la cadena correcta.

LMD-GHOST significa «latest message-driven greedy heaviest observed sub-tree» (subárbol observado más pesado codicioso impulsado por el último mensaje). Esta es una forma llena de jerga para definir un algoritmo que selecciona la bifurcación con el mayor peso acumulado de atestaciones como la canónica (subárbol más pesado codicioso) y que, si se reciben múltiples mensajes de un validador, solo se considera el último (impulsado por el último mensaje). Antes de agregar el bloque más pesado a su cadena canónica, cada validador evalúa cada bloque utilizando esta regla.

## Más información {#further-reading}

- [Gasper: Combinando GHOST y Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)