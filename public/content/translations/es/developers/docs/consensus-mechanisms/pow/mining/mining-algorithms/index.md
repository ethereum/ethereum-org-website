---
title: Algoritmos de minería
description: Un examen detallado de los algoritmos utilizados para la minería de Ethereum.
lang: es
---

<InfoBanner emoji=":wave:">
La prueba de trabajo ya no es parte de la base del mecanismo de consenso de Ethereum, esto quiere decir que el minado ha sido apagado. En cambio, Ethereum está asegurado por validadores que participan en ETH. Puede comenzar su participación con ETH hoy. Descubrá más cosas sobre <a href='/roadmap/merge/'>La Fusión</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>la prueba de participación (PoS)</a> y <a href='/staking/'>la participación</a>. Esta página es solo de interés histórico.
</InfoBanner>

La minería de Ethereum utilizo un algoritmo conocido como Ethash. La idea fundamental del algoritmo es que un minero intenta encontrar un contador nonce usando el cálculo computacional en bruto, de esta forma el hash resultante es menor que el umbral determinado por la dificultad calculada. Este nivel de dificultad se puede ajustar de forma dinámica, permitiendo que la producción de bloques ocurra en un intervalo regular.

## Pre requisitos {#prerequisites}

Para comprender mejor esta página, le recomendamos leer primero sobre el [consenso de prueba de trabajo](/developers/docs/consensus-mechanisms/pow) y la [minería](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto fue un algoritmo de investigación precursor para la minería de Ethereum que Ethash reemplazó. Fue una combinación de dos algoritmos diferentes: Dagger y Hashimoto. Sólo fue en realidad una implementacion de investigación y fue superada por «Ethash» en el momento en el que se lanzó la red principal de Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) involucra la generación de un [Grafo Acíclico Dirigido](https://en.wikipedia.org/wiki/Directed_acyclic_graph) en el cual secciones aleatorias del grafo se les aplica una función resumen ("hash function"). El principio fundamental es que cada nonce sólo requiere una pequeña porción del total de un gran árbol de datos. Recalcular el subárbol para cada nonce es algo prohibitivo para la minería, de ahí la necesidad de almacenar el árbol, aunque sirve para la verificación de un solo nonce. Dagger se diseñó para ser una alternativa a los algoritmos existentes como Scrypt, que requieren grandes capacidades de memoria, pero son difíciles de verificar cuando su memoria aumenta a niveles realmente seguros. No obstante, Dagger era vulnerable a la aceleración del hardware de memoria compartida y quedó relegado por otras vías de investigación.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) es un algoritmo que añade resistencia ASIC al estar vinculado a E/S (es decir, las lecturas de memoria son el factor limitante en el proceso de minería). La teoría es que la RAM está más disponible que la computación; se han invertido miles de millones de dólares en la optimización de la RAM para diferentes casos de uso, que a menudo implican patrones de acceso casi aleatorios (de ahí el nombre de «memoria de acceso aleatorio»). Como resultado, es probable que la RAM existente sea moderadamente cercana a la óptima para evaluar el algoritmo. Hashimoto utiliza la cadena de bloques como fuente de datos, satisfaciendo simultáneamente las explicaciones (1) y (3) anteriores.

Dagger-Hashimoto utilizó versiones modificadas de los algoritmos Dagger y Hashimoto. La diferencia entre Dagger Hashimoto y Hashimoto es que, en lugar de usar la cadena de bloques como fuente de datos, Dagger Hashimoto utiliza un conjunto de datos generados a medida, que se actualiza en función de los datos de bloque cada N bloques. El conjunto de datos se genera utilizando el algoritmo Dagger, lo que permite calcular de manera eficiente un subconjunto específico de cada nonce para el algoritmo de verificación del cliente ligero. La diferencia entre Dagger Hashimoto y Dagger es que, a diferencia del Dagger original, el conjunto de datos utilizado para consultar el bloque es semipermanente y solo se actualiza a intervalos ocasionales (por ejemplo, una vez por semana). Esto significa que la parte del esfuerzo de generar el conjunto de datos es cercana a cero, por lo que los argumentos de Sergio Lerner con respecto a las aceleraciones de memoria compartida se vuelven insignificantes.

Más sobre [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash era el algoritmo de minería que en realidad se usaba en la verdadera red principal de Ethereum bajo la estructura de prueba de trabajo, que ahora ha quedado obsoleta. Ethash fue esencialmente el nuevo nombre dado a una versión específica de Dagger-Hashimoto después de que el algoritmo se actualizara considerablemente, aunque aun heredando los principios fundamentales de su predecesor. La Red principal de Ethereum solo usó Ethash; Dagger Hashimoto fue una versión de I+D del algoritmo de minado que fue reemplazada antes de que comenzara el minado en la Red principal de Ethereum.

[Más sobre Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Más información {#further-reading}

_¿Conoces un recurso comunitario que te ayudó? Edita esta página y añádelo!_
