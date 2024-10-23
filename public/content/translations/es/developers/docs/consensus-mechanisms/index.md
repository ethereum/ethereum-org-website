---
title: Mecanismos de consenso
description: Una explicación de los protocolos de consenso en los sistemas distribuidos y de su función en Ethereum.
lang: es
---

El término «mecanismo de consenso» a menudo se usa coloquialmente para referirse a los protocolos de «prueba de participación», «prueba de trabajo» o «prueba de autoridad». Sin embargo, estos son solo componentes de los mecanismos de consenso que protegen contra los [ataques Sybil](/glossary/#sybil-attack). Los mecanismos de consenso son el bloque de ideas completo, protocolos e incentivos que permiten que un conjunto distribuido de nodos acuerde el estado de una cadena de bloques.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos visitar nuestra [Introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es el consenso? {#what-is-consensus}

Por consenso, nos referimos a que se ha alcanzado un acuerdo general. Imaginemos a un grupo de personas que va al cine. Si todo el grupo está de acuerdo en ver la misma película, entonces se logra un consenso. Si no se logra el acuerdo común, entonces el grupo debe decidir de alguna manera qué película ver. En un caso extremo, el grupo se acabará dividiendo.

Trasladado este ejemplo a la cadena de bloques de Ethereum, llegar a un consenso significa que al menos el 66 % de los nodos de la red coincidan en el estado general de la red.

## ¿Qué es un mecanismo de consenso? {#what-is-a-consensus-mechanism}

Por «mecanismo de consenso» se hace referencia a todo el bloque de protocolos, incentivos e ideas que permiten a una red de nodos acordar el estado de una cadena de bloques.

Ethereum utiliza un mecanismo de consenso basado en la prueba de participación que deriva su seguridad criptoeconómica de un conjunto de recompensas y sanciones aplicadas al capital bloqueado por los participantes. Esta estructura de incentivos alienta a los participantes individuales a operar con validadores honestos, castiga a quienes no lo hacen y hace que atacar a la red resulte elevadamente costoso.

Y después tenemos un protocolo que rige cómo se seleccionan los validadores honestos para proponer o validar bloques, procesar las transacciones y votar por su visión de la cabeza de la cadena. En las raras situaciones en las que varios bloques están en la misma posición cerca de la cabeza de la cadena, existe un mecanismo de elección de bifurcación, que selecciona los bloques que forman la cadena «más sólida», medida por la cantidad de validadores que votaron por los bloques ponderados por su saldo de ether apostados.

Algunos conceptos son importantes para el consenso que no están explícitamente definidos en el código, como la seguridad adicional ofrecida por la posible coordinación social fuera de la banda como una última línea de defensa contra ataques en la red.

Estos componentes juntos forman el mecanismo del consenso.

## Tipos de mecanismos de consenso {#types-of-consensus-mechanisms}

### Basados en la prueba de trabajo {#proof-of-work}

Al igual que Bitcoin, Ethereum una vez usó un protocolo de consenso basado en la **prueba de trabajo (PoW)**.

#### Creación del bloque {#pow-block-creation}

Los mineros compiten para crear nuevos bloques llenos de transacciones procesadas. El ganador comparte el nuevo bloque con el resto de la red y gana algunos ETH minados recientemente. La carrera la gana el ordenador que sea capaz de resolver un acertijo matemático más rápido. Esto produce el enlace criptografico entre el bloque actual y el bloque anterior. De resolver este acertijo se encarga la «prueba de trabajo». Luego la cadena predilecta se determina mediante una regla de elección de bifurcación que selecciona el conjunto de bloques en los que se ha realizado la mayor parte del trabajo para extraerlos.

#### Seguridad {#pow-security}

La red se mantiene segura por el hecho de que se necesitaría el 51 % de la potencia computacional de la red para defraudar a la cadena. Esto implicaría grandes inversiones en equipamiento y energía, y es probable que los gastos superarán a los ingresos.

Más información sobre la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)

### Basados en la prueba de participación {#proof-of-stake}

Ethereum ahora usa un protocolo de consenso basado en la **prueba de participación (PoS)**.

#### Creación de bloques {#pos-block-creation}

Los validadores crean bloques. Un validador se selecciona aleatoriamente en cada ranura para ser el que proponga el bloque. Su cliente de consenso solicita un grupo de transacciones como una «carga de ejecución» desde su cliente de ejecución emparejado. Recogen esto en datos de consenso para formar un bloque, que envían a otros nodos de la red Ethereum. Esta producción de bloques se recompensa en ETH. En casos excepcionales, cuando existen múltiples bloques posibles para una sola ranura, o los nodos escuchan sobre bloques en diferentes momentos, el algoritmo de elección de bifurcación elige el bloque que forma la cadena con el mayor peso de certificaciones (por peso se entiende el número de validadores que certifican en función de su saldo de ETH).

#### Seguridad {#pos-security}

Un sistema de prueba de participación es criptoeconómicamente seguro, porque un atacante que intente tomar el control de la cadena debe destruir una cantidad masiva de ETH. Un sistema de recompensas alienta a participantes individuales a comportarse honestamente, y las penalizaciones desaniman a los participantes a actuar malintencionadamente.

Más información sobre la [prueba de participación](/developers/docs/consensus-mechanisms/pos/).

### Una guía visual {#types-of-consensus-video}

Obtenga más información sobre los diferentes tipos de mecanismos de consenso usados en Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Resistencia a ataque Sybil & selección de cadena {#sybil-chain}

Técnicamente, ni la prueba de trabajo ni la prueba de participación son protocolos de consenso de por sí, pero se les etiqueta de tal manera por simplicidad. En realidad son mecanismos de resistencia a Sybil y selectores de autor de bloque; son una manera de decidir quién es el autor del último bloque. Otro componente importante es el algoritmo de selección de cadena (también conocido como bifurcación) que permite a los nodos elegir un único bloque correcto en la cabeza de la cadena en escenarios donde existen múltiples bloques en la misma posición.

La **resistencia a Sybil** mide cómo le va a un protocolo frente a un ataque Sybil. La resistencia a este tipo de ataques es esencial para una cadena de bloques descentralizada y permite a los mineros y validadores recibir una recompensa equitativa según los recursos que hayan invertido. La prueba de trabajo y la prueba de participación se protegen frente a esto haciendo que los usuarios tengan que gastar una gran cantidad de energía o entregar varias garantías. Estas protecciones son un elemento económico disuasorio frente a los ataques Sybil.

Las **reglas de selección de cadena**se utilizan para decidir qué cadena es la cadena «correcta». Bitcoin utiliza la regla de la «cadena más larga», lo que significa que la cadena de bloques más larga será la que el resto de los nodos acepten como válida y con la que trabajen. Para las cadenas de prueba de trabajo, la cadena más larga viene determinada por la dificultad total de la prueba de trabajo acumulativa de las cadenas. Ethereum también solía usar la regla de la cadena más larga; sin embargo, ahora que Ethereum se ejecuta con prueba de participación, adoptó un algoritmo de elección de bifurcación actualizado que mide el «peso» de la cadena. El peso es la suma acumulada de los votos del validador, ponderada por los saldos de ether apostado del validador.

Ethereum utiliza un mecanismo de consenso conocido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) que combina [la prueba de participación de Casper FFG](https://arxiv.org/abs/1710.09437) con la [regla de elección de bifurcación GHOST](https://arxiv.org/abs/2003.03052).

## Más información {#further-reading}

- [¿Qué es un algoritmo de consenso de cadena de bloques?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [¿Qué es el consenso de Nakamoto? Guía para principiantes completa](https://blockonomi.com/nakamoto-consensus/)
- [¿Cómo funciona Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sobre la seguridad y el rendimiento de las cadenas de bloques de prueba de trabajo](https://eprint.iacr.org/2016/555.pdf)
- [Fallo bizantino](https://en.wikipedia.org/wiki/Byzantine_fault)

_¿Conoce algún recurso comunitario que le haya sido de ayuda? Edite la página y añádalo._

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
- [Minado](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
- [Prueba de autoridad](/developers/docs/consensus-mechanisms/poa/)
