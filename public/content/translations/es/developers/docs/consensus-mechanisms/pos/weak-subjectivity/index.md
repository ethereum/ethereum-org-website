---
title: Subjetividad debil
description: Una explicacion de la subjetividad debil y su función en PoS Ethereum.
lang: es
---

La subjetividad en la cadena de bloques hace referencia a la confianza social en la información para acordar el estado actual. Puede haber múltiples bifurcaciones válidas que se elijan de acuerdo a la información recopilada de otros pares de la red. La conversión es la objetividad que se refiere a las cadenas en las que sólo existe una cadena válida posible sobre la que todos los nodos necesariamente estarán de acuerdo aplicando sus reglas codificadas. También existe un tercer estado, conocido como subjetividad débil. Esto se refiere a una cadena que puede progresar objetivamente después de que alguna semilla inicial de información se recupere socialmente.

## Pre requisitos {#prerequisites}

Para entender esta página, es necesario primero familiarizarse con los fundamentos de la [Prueba de participación](/developers/docs/consensus-mechanisms/pos/).

## ¿Qué problemas resuelve la subjetividad débil? {#problems-ws-solves}

La subjetividad es inherente a las cadenas de bloques de prueba de participación porque la selección de la cadena correcta de múltiples bifurcaciones se realiza contando los votos históricos. Esto expone la cadena de bloques a varios vectores de ataque, incluidos los ataques de largo alcance en los que los nodos que participaron muy temprano en la cadena mantienen una bifurcación alternativa que liberan mucho más tarde para su propio beneficio. Alternativamente, si el 33 % de los validadores retiran su participación pero continúan certificando y produciendo bloques, podrían generar una bifurcación alternativa que entre en conflicto con la cadena predilecta. Los nuevos nodos o nodos que han estado fuera de línea durante mucho tiempo podrían no ser conscientes de que estos validadores atacantes han retirado sus fondos, por lo que los atacantes podrían engañarlos para que sigan una cadena incorrecta. Ethereum puede resolver estos vectores de ataque imponiendo restricciones que disminuyen los aspectos subjetivos del mecanismo y, por lo tanto, confía en las suposiciones, al mínimo.

## Puntos de control de subjetividad débiles {#ws-checkpoints}

La subjetividad débil se implementa en la prueba de participación de Ethereum mediante el uso de «puntos de control de subjetividad débiles». Estos son declaraciones de que todos los nodos de la red están de acuerdo en pertenecer a la cadena predilecta. Sirven el mismo propósito de «verdad universal» para los bloques originales, excepto que no se encuentran en la posición original en la cadena de bloques. El algoritmo de elección de bifurcación confía en que el estado de la cadena de bloques definido en ese punto de control sea correcto y verifica de forma independiente y objetiva la cadena a partir de ese momento. Los puntos de control actúan como «límites de reversión» porque los bloques localizados antes de los puntos de control de subjetividad débil no se pueden cambiar. Esto socava los ataques de largo alcance simplemente al definir que las bifurcaciones de largo alcance no son válidas como parte del diseño del mecanismo. Asegurarse de que los puntos de control de subjetividad débiles estén separados por una distancia más pequeña que el período de retirada del validador garantiza que un validador que bifurca la cadena sea recortado al menos una cantidad de umbral antes de que puedan retirar su participación y que los validadores cuya participación haya sido retirada no puedan engañar a los nuevos participantes en bifurcaciones incorrectas.

## Diferencia entre los puntos de control de subjetividad débiles y los bloques finalizados {#difference-between-ws-and-finalized-blocks}

Los nodos de Ethereum tratan de manera diferente los bloques finalizados y los puntos de control de subjetividad débiles. Si un nodo se da cuenta de dos bloques finalizados que compiten, entonces se rompe entre los dos: no tiene forma de identificar automáticamente cuál es la bifurcación predilecta. Esto es sintomático de un fracaso de consenso. En contraste, un nodo simplemente rechaza cualquier bloque que entre en conflicto con su punto de control de subjetividad débil. Desde la perspectiva del nodo, el punto de control de subjetividad débil representa una verdad absoluta que no puede ser socavada por el nuevo conocimiento de sus pares.

## ¿Qué grado de debilidad tiene? {#how-weak-is-weak}

El aspecto subjetivo de la prueba de participación de Ethereum es el requisito de un estado reciente (punto de control de subjetividad débil) de una fuente de confianza desde la que sincronizar. El riesgo de obtener un punto de control de subjetividad débil es muy bajo porque se pueden comparar con varias fuentes públicas independientes, como exploradores de bloques o múltiples nodos. No obstante, siempre se requiere algún grado de confianza para ejecutar cualquier aplicación de software, por ejemplo, confiar en que los desarrolladores de software han producido un software honesto.

Un punto de control de subjetividad débil puede incluso venir como parte del software del cliente. Podría decirse que un atacante puede corromper el punto de control en el software y puede corromper el software con la misma facilidad. No hay una verdadera ruta criptoeconómica en torno a este problema, pero el impacto de los desarrolladores poco fiables se minimiza en Ethereum al tener múltiples equipos de clientes independientes, cada uno construyendo software equivalente en diferentes idiomas, todos ellos con un interés personal en mantener una cadena honesta. Los exploradores de bloques también pueden proporcionar puntos de control de subjetividad débiles o una forma de hacer referencias cruzadas a los puntos de control obtenidos de otros lugares contra una fuente adicional.

Finalmente, se pueden solicitar puntos de control de otros nodos; tal vez otro usuario de Ethereum que ejecute un nodo completo pueda proporcionar un punto de control que los validadores puedan verificar con los datos de un explorador de bloques. En general, confiar en el proveedor de un punto de control de subjetividad débil puede considerarse tan problemático como confiar en los desarrolladores del cliente. Se requiere una confianza general baja. Es importante tener en cuenta que estas consideraciones solo se vuelven importantes en el muy poco probable caso de que la mayoría de los validadores conspiren para producir una bifurcación alternativa de la cadena de bloques. En cualquier otra circunstancia, solo hay una cadena de Ethereum para elegir.

## Más información {#further-reading}

- [Debilidad subjetiva en Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Cómo aprendí a amar la subjetividad débil](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Subjetividad débil (documentos de Teku)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [Guía de subjetividad débil, Fase-0](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Análisis de la subjetividad débil en Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
