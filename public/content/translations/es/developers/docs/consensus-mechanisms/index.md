---
title: Mecanismos de consenso
description: "Una explicación de los protocolos de consenso en sistemas distribuidos y el papel que desempeñan en Ethereum."
lang: es
authors: ["Patrick Collins"]
---

El término "mecanismo de consenso" se utiliza a menudo coloquialmente para referirse a los protocolos de "prueba de participación (PoS)", "prueba de trabajo (PoW)" o "prueba de autoridad (PoA)". Sin embargo, estos son solo componentes de los mecanismos de consenso que protegen contra los [ataques Sybil](/glossary/#sybil-attack). Los mecanismos de consenso son el conjunto completo de ideas, protocolos e incentivos que permiten a un grupo distribuido de nodos acordar el estado de una cadena de bloques.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es el consenso? {#what-is-consensus}

Por consenso, entendemos que se ha llegado a un acuerdo general. Imagine a un grupo de personas que van al cine. Si no hay desacuerdo sobre la elección de la película propuesta, entonces se logra un consenso. Si hay desacuerdo, el grupo debe tener los medios para decidir qué película ver. En casos extremos, el grupo acabará dividiéndose.

En lo que respecta a la cadena de bloques de [Ethereum](/), el proceso está formalizado, y alcanzar el consenso significa que al menos el 66 % de los nodos de la red están de acuerdo con el estado global de la red.

## ¿Qué es un mecanismo de consenso? {#what-is-a-consensus-mechanism}

El término mecanismo de consenso se refiere a todo el conjunto de protocolos, incentivos e ideas que permiten a una red de nodos acordar el estado de una cadena de bloques.

Ethereum utiliza un mecanismo de consenso basado en prueba de participación que deriva su seguridad criptoeconómica de un conjunto de recompensas y penalizaciones aplicadas al capital bloqueado por los participantes. Esta estructura de incentivos anima a los participantes individuales a operar validadores honestos, castiga a los que no lo hacen y crea un costo extremadamente alto para atacar la red.

Luego, hay un protocolo que rige cómo se seleccionan los validadores honestos para proponer o validar bloques, procesar transacciones y votar por su visión de la cabeza de la cadena. En las raras situaciones en las que varios bloques se encuentran en la misma posición cerca de la cabeza de la cadena, existe un mecanismo de elección de bifurcación que selecciona los bloques que conforman la cadena más "pesada", medida por el número de validadores que votaron por los bloques ponderados por su saldo de ether en participación.

Algunos conceptos son importantes para el consenso que no están definidos explícitamente en el código, como la seguridad adicional que ofrece la posible coordinación social fuera de banda como última línea de defensa contra los ataques a la red.

Estos componentes juntos forman el mecanismo de consenso.

## Tipos de mecanismos de consenso {#types-of-consensus-mechanisms}

### Basados en prueba de trabajo {#proof-of-work}

Al igual que Bitcoin, Ethereum utilizó una vez un protocolo de consenso basado en **prueba de trabajo (PoW)**.

#### Creación de bloques {#pow-block-creation}

Los mineros compiten para crear nuevos bloques llenos de transacciones procesadas. El ganador comparte el nuevo bloque con el resto de la red y gana algo de ETH recién acuñado. La carrera la gana la computadora que es capaz de resolver un acertijo matemático más rápido. Esto produce el enlace criptográfico entre el bloque actual y el bloque anterior. Resolver este acertijo es el trabajo en la "prueba de trabajo". La cadena canónica se determina entonces mediante una regla de elección de bifurcación que selecciona el conjunto de bloques que han tenido la mayor cantidad de trabajo realizado para minarlos.

#### Seguridad {#pow-security}

La red se mantiene segura por el hecho de que se necesitaría el 51 % de la potencia informática de la red para defraudar a la cadena. Esto requeriría inversiones tan enormes en equipos y energía que es probable que gaste más de lo que ganaría.

Más sobre la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)

### Basados en prueba de participación {#proof-of-stake}

Ethereum ahora utiliza un protocolo de consenso basado en **prueba de participación (PoS)**.

#### Creación de bloques {#pos-block-creation}

Los validadores crean bloques. Se selecciona aleatoriamente a un validador en cada slot para que sea el proponente de bloque. Su cliente de consenso solicita un paquete de transacciones como una "carga útil de ejecución" a su cliente de ejecución emparejado. Envuelven esto en datos de consenso para formar un bloque, que envían a otros nodos en la red Ethereum. Esta producción de bloques se recompensa en ETH. En casos raros en los que existen múltiples bloques posibles para un solo slot, o los nodos se enteran de los bloques en diferentes momentos, el algoritmo de elección de bifurcación elige el bloque que forma la cadena con el mayor peso de atestaciones (donde el peso es el número de validadores que atestiguan escalado por su saldo de ETH).

#### Seguridad {#pos-security}

Un sistema de prueba de participación es seguro criptoeconómicamente porque un atacante que intente tomar el control de la cadena debe destruir una cantidad masiva de ETH. Un sistema de recompensas incentiva a los participantes individuales a comportarse de manera honesta, y las penalizaciones desincentivan a los participantes de actuar de manera maliciosa.

Más sobre la [prueba de participación](/developers/docs/consensus-mechanisms/pos/)

### Una guía visual {#types-of-consensus-video}

Vea más sobre los diferentes tipos de mecanismos de consenso utilizados en Ethereum:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Resistencia Sybil y selección de cadena {#sybil-chain}

La prueba de trabajo y la prueba de participación por sí solas no son protocolos de consenso, pero a menudo se les llama así por simplicidad. En realidad, son mecanismos de resistencia a ataques Sybil y selectores de autores de bloques; son una forma de decidir quién es el autor del último bloque. Otro componente importante es el algoritmo de selección de cadena (también conocido como elección de bifurcación) que permite a los nodos elegir un único bloque correcto en la cabeza de la cadena en escenarios donde existen múltiples bloques en la misma posición.

La **resistencia Sybil** mide cómo se comporta un protocolo frente a un ataque Sybil. La resistencia a este tipo de ataque es esencial para una cadena de bloques descentralizada y permite que los mineros y validadores sean recompensados equitativamente en función de los recursos invertidos. La prueba de trabajo y la prueba de participación protegen contra esto al hacer que los usuarios gasten mucha energía o aporten mucho colateral. Estas protecciones son un elemento disuasorio económico para los ataques Sybil.

Una **regla de selección de cadena** se utiliza para decidir qué cadena es la cadena "correcta". Bitcoin utiliza la regla de la "cadena más larga", lo que significa que la cadena de bloques que sea más larga será la que el resto de los nodos acepten como válida y con la que trabajen. Para las cadenas de prueba de trabajo, la cadena más larga está determinada por la dificultad total acumulada de la prueba de trabajo de la cadena. Ethereum también solía usar la regla de la cadena más larga; sin embargo, ahora que Ethereum funciona con prueba de participación, adoptó un algoritmo de elección de bifurcación actualizado que mide el "peso" de la cadena. El peso es la suma acumulada de los votos de los validadores, ponderada por los saldos de ether en participación de los validadores.

Ethereum utiliza un mecanismo de consenso conocido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) que combina la [prueba de participación Casper FFG](https://arxiv.org/abs/1710.09437) con la [regla de elección de bifurcación GHOST](https://arxiv.org/abs/2003.03052).

## Lecturas adicionales {#further-reading}

- [¿Qué es un algoritmo de consenso de cadena de bloques?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [¿Qué es el consenso de Nakamoto? Guía completa para principiantes](https://blockonomi.com/nakamoto-consensus/)
- [¿Cómo funciona Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sobre la seguridad y el rendimiento de las cadenas de bloques de prueba de trabajo](https://eprint.iacr.org/2016/555.pdf)
- [Falla bizantina](https://en.wikipedia.org/wiki/Byzantine_fault)

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
- [Minería](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
- [Prueba de autoridad](/developers/docs/consensus-mechanisms/poa/)