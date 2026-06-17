---
title: Subjetividad débil
description: Una explicación de la subjetividad débil y su papel en la prueba de participación (PoS) de Ethereum.
lang: es
---

La subjetividad en las cadenas de bloques se refiere a la dependencia de la información social para acordar el estado actual. Puede haber múltiples bifurcaciones válidas entre las que se elige de acuerdo con la información recopilada de otros pares en la red. Lo contrario es la objetividad, que se refiere a las cadenas donde solo hay una cadena válida posible en la que todos los nodos estarán necesariamente de acuerdo al aplicar sus reglas codificadas. También hay un tercer estado, conocido como subjetividad débil. Esto se refiere a una cadena que puede progresar objetivamente después de que se recupere socialmente alguna semilla inicial de información.

## Requisitos previos {#prerequisites}

Para entender esta página, primero es necesario comprender los fundamentos de la [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/).

## ¿Qué problemas resuelve la subjetividad débil? {#problems-ws-solves}

La subjetividad es inherente a las cadenas de bloques de prueba de participación porque la selección de la cadena correcta entre múltiples bifurcaciones se realiza contando los votos históricos. Esto expone a la cadena de bloques a varios vectores de ataque, incluidos los ataques de largo alcance mediante los cuales los nodos que participaron muy temprano en la cadena mantienen una bifurcación alternativa que publican mucho más tarde para su propio beneficio. Alternativamente, si el 33% de los validadores retiran su participación pero continúan atestiguando y produciendo bloques, podrían generar una bifurcación alternativa que entre en conflicto con la cadena canónica. Los nodos nuevos o los nodos que han estado desconectados durante mucho tiempo podrían no ser conscientes de que estos validadores atacantes han retirado sus fondos, por lo que los atacantes podrían engañarlos para que sigan una cadena incorrecta. [Ethereum](/) puede resolver estos vectores de ataque imponiendo restricciones que disminuyen los aspectos subjetivos del mecanismo —y, por lo tanto, los supuestos de confianza— al mínimo indispensable.

## Puntos de control de subjetividad débil {#ws-checkpoints}

La subjetividad débil se implementa en la prueba de participación de Ethereum mediante el uso de "puntos de control de subjetividad débil". Estas son raíces de estado que todos los nodos de la red acuerdan que pertenecen a la cadena canónica. Sirven para el mismo propósito de "verdad universal" que los bloques génesis, excepto que no se encuentran en la posición de génesis en la cadena de bloques. El algoritmo de elección de bifurcación confía en que el estado de la cadena de bloques definido en ese punto de control es correcto y que verifica de forma independiente y objetiva la cadena a partir de ese punto. Los puntos de control actúan como "límites para revertir" porque los bloques ubicados antes de los puntos de control de subjetividad débil no se pueden cambiar. Esto socava los ataques de largo alcance simplemente al definir que las bifurcaciones de largo alcance son inválidas como parte del diseño del mecanismo. Asegurar que los puntos de control de subjetividad débil estén separados por una distancia menor que el período de retiro del validador garantiza que un validador que bifurca la cadena sufra un recorte de al menos una cantidad umbral antes de que pueda retirar su participación y que los nuevos participantes no puedan ser engañados en bifurcaciones incorrectas por validadores cuya participación ha sido retirada.

## Diferencia entre los puntos de control de subjetividad débil y los bloques finalizados {#difference-between-ws-and-finalized-blocks}

Los bloques finalizados y los puntos de control de subjetividad débil son tratados de manera diferente por los nodos de Ethereum. Si un nodo se da cuenta de dos bloques finalizados que compiten entre sí, entonces se debate entre los dos: no tiene forma de identificar automáticamente cuál es la bifurcación canónica. Esto es sintomático de una falla de consenso. Por el contrario, un nodo simplemente rechaza cualquier bloque que entre en conflicto con su punto de control de subjetividad débil. Desde la perspectiva del nodo, el punto de control de subjetividad débil representa una verdad absoluta que no puede ser socavada por el nuevo conocimiento de sus pares.

## ¿Qué tan débil es débil? {#how-weak-is-weak}

El aspecto subjetivo de la prueba de participación de Ethereum es el requisito de un estado reciente (punto de control de subjetividad débil) de una fuente confiable desde la cual realizar la sincronización. El riesgo de obtener un mal punto de control de subjetividad débil es muy bajo porque se pueden verificar con varias fuentes públicas independientes, como exploradores de bloques o múltiples nodos. Sin embargo, siempre se requiere cierto grado de confianza para ejecutar cualquier aplicación de software, por ejemplo, confiar en que los desarrolladores de software han producido un software honesto.

Un punto de control de subjetividad débil puede incluso venir como parte del software del cliente. Podría decirse que un atacante puede corromper el punto de control en el software y puede corromper el software en sí con la misma facilidad. No existe una ruta criptoeconómica real para evitar este problema, pero el impacto de los desarrolladores poco confiables se minimiza en Ethereum al tener múltiples equipos de clientes independientes, cada uno construyendo software equivalente en diferentes lenguajes, todos con un interés personal en mantener una cadena honesta. Los exploradores de bloques también pueden proporcionar puntos de control de subjetividad débil o una forma de cruzar los puntos de control obtenidos de otros lugares con una fuente adicional.

Finalmente, se pueden solicitar puntos de control a otros nodos; tal vez otro usuario de Ethereum que ejecute un nodo completo pueda proporcionar un punto de control que los validadores puedan verificar con los datos de un explorador de bloques. En general, confiar en el proveedor de un punto de control de subjetividad débil puede considerarse tan problemático como confiar en los desarrolladores del cliente. La confianza general requerida es baja. Es importante tener en cuenta que estas consideraciones solo se vuelven importantes en el caso muy improbable de que la mayoría de los validadores conspiren para producir una bifurcación alternativa de la cadena de bloques. Bajo cualquier otra circunstancia, solo hay una cadena de Ethereum para elegir.

## Más información {#further-reading}

- [Subjetividad débil en Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Cómo aprendí a amar la subjetividad débil](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Subjetividad débil (documentación de Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Guía de subjetividad débil de la Fase 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Análisis de la subjetividad débil en Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)