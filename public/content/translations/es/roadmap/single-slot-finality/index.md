---
title: Finalidad de un solo slot
description: Explicación de la finalidad de un solo slot
lang: es
---

Un bloque de [Ethereum](/) tarda unos 15 minutos en finalizar. Sin embargo, podemos hacer que el mecanismo de consenso de Ethereum valide los bloques de manera más eficiente y reduzca drásticamente el tiempo hasta la finalidad. En lugar de esperar quince minutos, los bloques podrían proponerse y finalizarse en el mismo slot. Este concepto se conoce como **finalidad de un solo slot (SSF)**.

## ¿Qué es la finalidad? {#what-is-finality}

En el mecanismo de consenso basado en prueba de participación (PoS) de Ethereum, la finalidad se refiere a la garantía de que un bloque no puede ser alterado o eliminado de la cadena de bloques sin quemar al menos el 33 % del total de ETH en participación. Esto es seguridad "criptoeconómica" porque la confianza proviene del costo extremadamente alto asociado con cambiar el orden o el contenido de la cadena, lo que evitaría que cualquier actor económico racional lo intente.

## ¿Por qué buscar una finalidad más rápida? {#why-aim-for-quicker-finality}

El tiempo actual hasta la finalidad ha resultado ser demasiado largo. La mayoría de los usuarios no quieren esperar 15 minutos para la finalidad, y es inconveniente para las aplicaciones y los intercambios (exchanges) que podrían desear una alta capacidad de procesamiento de transacciones tener que esperar tanto tiempo para estar seguros de que sus transacciones son permanentes. Tener un retraso entre la propuesta de un bloque y su finalización también crea una oportunidad para reorganizaciones cortas que un atacante podría usar para censurar ciertos bloques o extraer MEV. El mecanismo que se encarga de actualizar los bloques en etapas también es bastante complejo y ha sido parcheado varias veces para cerrar vulnerabilidades de seguridad, lo que lo convierte en una de las partes del código base de Ethereum donde es más probable que surjan errores sutiles. Todos estos problemas podrían eliminarse reduciendo el tiempo hasta la finalidad a un solo slot.

## El equilibrio entre descentralización, tiempo y sobrecarga {#the-decentralization-time-overhead-tradeoff}

La garantía de finalidad no es una propiedad inmediata de un nuevo bloque; toma tiempo para que un nuevo bloque se finalice. La razón de esto es que los validadores que representan al menos 2/3 del total de ETH en participación en la red tienen que votar por el bloque ("atestar") para que se considere finalizado. Cada nodo validador en la red tiene que procesar las atestaciones de otros nodos para saber si un bloque ha alcanzado, o no, ese umbral de 2/3.

Cuanto más corto sea el tiempo permitido para alcanzar la finalización, más potencia de cálculo se requiere en cada nodo porque el procesamiento de atestaciones tiene que hacerse más rápido. Además, cuantos más nodos validadores existan en la red, más atestaciones se tienen que procesar para cada bloque, lo que también aumenta la potencia de procesamiento requerida. Cuanta más potencia de procesamiento se requiera, menos personas podrán participar porque se necesita hardware más costoso para ejecutar cada nodo validador. Aumentar el tiempo entre bloques disminuye la potencia de cálculo requerida en cada nodo, pero también alarga el tiempo hasta la finalidad, porque las atestaciones se procesan más lentamente.

Por lo tanto, existe un equilibrio entre la sobrecarga (potencia de cálculo), la descentralización (número de nodos que pueden participar en la validación de la cadena) y el tiempo hasta la finalidad. El sistema ideal equilibra la mínima potencia de cálculo, la máxima descentralización y el mínimo tiempo hasta la finalidad.

El mecanismo de consenso actual de Ethereum equilibró estos tres parámetros al:

- **Establecer la participación mínima en 32 ETH**. Esto establece un límite superior en el número de atestaciones de validadores que tienen que ser procesadas por nodos individuales y, por lo tanto, un límite superior en los requisitos computacionales para cada nodo.
- **Establecer el tiempo hasta la finalidad en ~15 minutos**. Esto da tiempo suficiente para que los validadores ejecutados en computadoras domésticas normales procesen de manera segura las atestaciones para cada bloque.

Con el diseño del mecanismo actual, para reducir el tiempo hasta la finalidad, es necesario reducir el número de validadores en la red o aumentar los requisitos de hardware para cada nodo. Sin embargo, se pueden hacer mejoras en la forma en que se procesan las atestaciones que pueden permitir que se cuenten más atestaciones sin aumentar la sobrecarga en cada nodo. El procesamiento más eficiente permitirá que la finalidad se determine dentro de un solo slot, en lugar de a lo largo de dos épocas.

## Rutas hacia la SSF {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

El mecanismo de consenso actual combina atestaciones de múltiples validadores, conocidos como comités, para reducir el número de mensajes que cada validador tiene que procesar para validar un bloque. Cada validador tiene la oportunidad de atestar en cada época (32 slots), pero en cada slot, solo un subconjunto de validadores, conocido como "comité", atesta. Lo hacen dividiéndose en subredes en las que se seleccionan unos pocos validadores para ser "agregadores". Cada uno de esos agregadores combina todas las firmas que ven de otros validadores en su subred en una sola firma agregada. El agregador que incluye el mayor número de contribuciones individuales pasa su firma agregada al proponente de bloque, quien la incluye en el bloque junto con la firma agregada de los otros comités.

Este proceso proporciona suficiente capacidad para que cada validador vote en cada época, porque `32 slots * 64 committees * 256 validators per committee = 524,288 validators per epoch`. En el momento de escribir este artículo (febrero de 2023) hay ~513.000 validadores activos.

En este esquema, solo es posible que cada validador vote sobre un bloque distribuyendo sus atestaciones a lo largo de toda la época. Sin embargo, existen formas potenciales de mejorar el mecanismo para que _cada validador tenga la oportunidad de atestar en cada slot_.
</ExpandableCard>

Desde que se diseñó el mecanismo de consenso de Ethereum, se ha descubierto que el esquema de agregación de firmas (BLS) es mucho más escalable de lo que se pensaba inicialmente, mientras que la capacidad de los clientes para procesar y verificar firmas también ha mejorado. Resulta que procesar atestaciones de un gran número de validadores es realmente posible dentro de un solo slot. Por ejemplo, con un millón de validadores votando cada uno dos veces en cada slot, y los tiempos de slot ajustados a 16 segundos, se requeriría que los nodos verificaran firmas a una tasa mínima de 125.000 agregaciones por segundo para procesar el millón de atestaciones dentro del slot. En realidad, a una computadora normal le toma alrededor de 500 nanosegundos hacer una verificación de firma, lo que significa que 125.000 se pueden hacer en ~62,5 ms, muy por debajo del umbral de un segundo.

Se podrían lograr mayores ganancias de eficiencia creando supercomités de, por ejemplo, 125.000 validadores seleccionados al azar por slot. Solo estos validadores pueden votar sobre un bloque y, por lo tanto, solo este subconjunto de validadores decide si un bloque se finaliza. Si esto es una buena idea o no se reduce a qué tan costoso preferiría la comunidad que fuera un ataque exitoso a Ethereum. Esto se debe a que, en lugar de requerir 2/3 del total de ether en participación, un atacante podría finalizar un bloque deshonesto con 2/3 del ether en participación _en ese supercomité_. Esta sigue siendo un área activa de investigación, pero parece plausible que para un conjunto de validadores lo suficientemente grande como para requerir supercomités en primer lugar, el costo de atacar uno de esos subcomités será extremadamente alto (por ejemplo, el costo del ataque denominado en ETH sería `2/3 * 125,000 * 32 = ~2.6 million ETH`). El costo del ataque se puede ajustar aumentando el tamaño del conjunto de validadores (por ejemplo, ajustar el tamaño del validador para que el costo del ataque sea igual a 1 millón de ether, 4 millones de ether, 10 millones de ether, etc.). Las [encuestas preliminares](https://youtu.be/ojBgyFl6-v4?t=755) de la comunidad parecen sugerir que 1-2 millones de ether es un costo de ataque aceptable, lo que implica ~65.536 - 97.152 validadores por supercomité.

Sin embargo, la verificación no es el verdadero cuello de botella: es la agregación de firmas lo que realmente desafía a los nodos validadores. Para escalar la agregación de firmas probablemente se requerirá aumentar el número de validadores en cada subred, aumentar el número de subredes o agregar capas adicionales de agregación (es decir, implementar comités de comités). Parte de la solución podría ser permitir agregadores especializados, de manera similar a cómo la construcción de bloques y la generación de compromisos para los datos de rollup se subcontratarán a constructores de bloques especializados bajo la separación proponente-constructor (PBS) y danksharding.

## ¿Cuál es el papel de la regla de elección de bifurcación en la SSF? {#role-of-the-fork-choice-rule}

El mecanismo de consenso actual se basa en un estrecho acoplamiento entre el dispositivo de finalidad (el algoritmo que determina si 2/3 de los validadores han atestado a una cierta cadena) y la regla de elección de bifurcación (el algoritmo que decide qué cadena es la correcta cuando hay múltiples opciones). El algoritmo de elección de bifurcación solo considera los bloques _desde_ el último bloque finalizado. Bajo la SSF no habría ningún bloque para que la regla de elección de bifurcación lo considere, porque la finalidad ocurre en el mismo slot en el que se propone el bloque. Esto significa que bajo la SSF, _ya sea_ el algoritmo de elección de bifurcación _o_ el dispositivo de finalidad estaría activo en cualquier momento. El dispositivo de finalidad finalizaría los bloques donde 2/3 de los validadores estuvieran en línea y atestando honestamente. Si un bloque no es capaz de superar el umbral de 2/3, la regla de elección de bifurcación entraría en acción para determinar qué cadena seguir. Esto también crea una oportunidad para mantener el mecanismo de fuga por inactividad que recupera una cadena donde >1/3 de los validadores se desconectan, aunque con algunos matices adicionales.

## Problemas pendientes {#outstanding-issues}

El problema con escalar la agregación aumentando el número de validadores por subred es que conduce a una mayor carga en la red entre pares. El problema con agregar capas de agregaciones es que es bastante complejo de diseñar y agrega latencia (es decir, podría tomar más tiempo para que el proponente de bloque reciba noticias de todos los agregadores de subred). Tampoco está claro cómo lidiar con el escenario en el que hay más validadores activos en la red de los que se pueden procesar de manera factible en cada slot, incluso con la agregación de firmas BLS. Una posible solución es que, debido a que todos los validadores atestan en cada slot y no hay comités bajo la SSF, el límite de 32 ETH en el saldo efectivo podría eliminarse por completo, lo que significa que los operadores que administran múltiples validadores podrían consolidar su participación y ejecutar menos, reduciendo el número de mensajes que los nodos validadores tienen que procesar para dar cuenta de todo el conjunto de validadores. Esto depende de que los grandes participantes (stakers) acuerden consolidar sus validadores. También es posible imponer un límite fijo en el número de validadores o la cantidad de ETH en participación en cualquier momento. Sin embargo, esto requiere algún mecanismo para decidir a qué validadores se les permite participar y a cuáles no, lo que es propenso a crear efectos secundarios no deseados.

## Progreso actual {#current-progress}

La SSF se encuentra en fase de investigación. No se espera que se lance durante varios años, probablemente después de otras actualizaciones sustanciales como los [árboles Verkle](/roadmap/verkle-trees/) y [danksharding](/roadmap/danksharding/).

## Lecturas adicionales {#further-reading}

- [Vitalik sobre la SSF en EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Notas de Vitalik: Caminos hacia la finalidad de un solo slot](https://notes.ethereum.org/@vbuterin/single_slot_finality)