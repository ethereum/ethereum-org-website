---
title: Algoritmos de minería
description: Un vistazo detallado a los algoritmos utilizados para la minería de Ethereum.
lang: es
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
La prueba de trabajo (PoW) ya no es la base del mecanismo de consenso de Ethereum, lo que significa que la minería se ha apagado. En su lugar, Ethereum está protegido por validadores que hacen staking de ETH. Puede comenzar a hacer staking de su ETH hoy mismo. Lea más sobre <a href='/roadmap/merge/'>La Fusión</a>, la <a href='/developers/docs/consensus-mechanisms/pos/'>prueba de participación (PoS)</a> y el <a href='/staking/'>staking</a>. Esta página es solo para interés histórico.
</AlertDescription>
</AlertContent>
</Alert>

La minería de Ethereum utilizaba un algoritmo conocido como Ethash. La idea fundamental del algoritmo es que un minero intenta encontrar una entrada de nonce mediante computación de fuerza bruta para que el hash resultante sea menor que un umbral determinado por la dificultad calculada. Este nivel de dificultad se puede ajustar dinámicamente, lo que permite que la producción de bloques ocurra a intervalos regulares.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre el [consenso de prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow) y la [minería](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto fue un algoritmo de investigación precursor para la minería de Ethereum que Ethash reemplazó. Era una amalgama de dos algoritmos diferentes: Dagger y Hashimoto. Solo fue una implementación de investigación y fue reemplazado por Ethash para cuando se lanzó la red principal de Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) implica la generación de un [Grafo Acíclico Dirigido (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), del cual se combinan porciones aleatorias mediante hash. El principio fundamental es que cada nonce solo requiere una pequeña porción de un gran árbol de datos total. Volver a calcular el subárbol para cada nonce es prohibitivo para la minería (de ahí la necesidad de almacenar el árbol), pero es aceptable para la verificación del valor de un solo nonce. Dagger fue diseñado para ser una alternativa a los algoritmos existentes como Scrypt, que requieren mucha memoria pero son difíciles de verificar cuando su exigencia de memoria aumenta a niveles genuinamente seguros. Sin embargo, Dagger era vulnerable a la aceleración de hardware de memoria compartida y se descartó en favor de otras vías de investigación.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) es un algoritmo que añade resistencia a los ASIC al estar limitado por la entrada/salida (es decir, las lecturas de memoria son el factor limitante en el proceso de minería). La teoría es que la memoria RAM está más disponible que la computación; miles de millones de dólares en investigación ya han investigado la optimización de la RAM para diferentes casos de uso, que a menudo implican patrones de acceso casi aleatorios (de ahí la "memoria de acceso aleatorio"). Como resultado, es probable que la RAM existente esté moderadamente cerca de ser óptima para evaluar el algoritmo. Hashimoto utiliza la cadena de bloques como fuente de datos, satisfaciendo simultáneamente (1) y (3) anteriores.

Dagger-Hashimoto utilizaba versiones modificadas de los algoritmos Dagger y Hashimoto. La diferencia entre Dagger-Hashimoto y Hashimoto es que, en lugar de utilizar la cadena de bloques como fuente de datos, Dagger-Hashimoto utiliza un conjunto de datos generado de forma personalizada, que se actualiza en función de los datos del bloque cada N bloques. El conjunto de datos se genera utilizando el algoritmo Dagger, lo que permite calcular de manera eficiente un subconjunto específico para cada nonce para el algoritmo de verificación del cliente ligero. La diferencia entre Dagger-Hashimoto y Dagger es que, a diferencia del Dagger original, el conjunto de datos utilizado para consultar el bloque es semipermanente y solo se actualiza a intervalos ocasionales (por ejemplo, una vez a la semana). Esto significa que la parte del esfuerzo de generar el conjunto de datos es cercana a cero, por lo que los argumentos de Sergio Lerner con respecto a las aceleraciones de memoria compartida se vuelven insignificantes.

Más sobre [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash fue el algoritmo de minería que se utilizó realmente en la red principal de Ethereum bajo la arquitectura de prueba de trabajo (PoW) ahora obsoleta. Ethash fue efectivamente un nuevo nombre dado a una versión específica de Dagger-Hashimoto después de que el algoritmo se actualizara significativamente, aunque seguía heredando los principios fundamentales de su predecesor. La red principal de Ethereum solo utilizó Ethash; Dagger-Hashimoto fue una versión de I+D del algoritmo de minería que fue reemplazada antes de que comenzara la minería en la red principal de Ethereum.

[Más sobre Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Más información {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? ¡Edite esta página y añádalo!_