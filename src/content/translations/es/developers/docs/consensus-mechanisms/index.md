---
title: Mecanismos de consenso
description: Una explicación de los protocolos de consenso en los sistemas distribuidos y de su función en Etherum.
lang: es
sidebar: true
incomplete: verdadero
---

Cuando se trata de blockchains como Ethereum (que, básicamente, son bases de datos distribuidas), los nodos de la red deben ser capaces de llegar a un acuerdo sobre el estado actual del sistema. Esto se consigue con ayuda de mecanismos de consenso.

A pesar de que no forma parte de la construcción de una dapp, entender los mecanismos de consenso te ayudará a explicar cuestiones que son importantes para ti y para la experiencia de tus usuarios, como los precios del gas y los tiempos de las transacciones.

## Requisitos previos {#prerequisites}

Para comprender mejor esta pagina, te recomendamos visitar nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es un mecanismo de consenso? {#what-is-a-consensus-mechanism}

Los mecanismos de consenso (también conocidos como protocolos de consenso o algoritmos de consenso) permiten a los sistemas distribuidos colaborar y mantenerse seguros.

Durante décadas, estos mecanismos se han utilizado para establecer un consenso entre los nodos de la base de datos, los servidores de aplicaciones y otras infraestructuras empresariales. Durante los últimos años se han generado nuevos protocolos de consenso para permitir que sistemas criptoeconómicos, como Ethereum, realicen acuerdos sobre el estado de la red.

Un mecanismo de consenso en un sistema criptoeconómico también ayuda a prevenir ciertos tipos de ataques económicos. En teoría, un atacante puede comprometer el consenso mediante el control del 51% de la red. Los mecanismos de consenso están diseñados para hacer inviable este "ataque del 51%". Se han diseñado diferentes mecanismos para resolver este problema de seguridad de distintas formas.

<!-- ### Consensus -->

<!-- Formal requirements for a consensus protocol may include: -->

<!-- - Agreement: All correct processes must agree on the same value. -->
<!-- - Weak validity: For each correct process, its output must be the input of some correct process. -->
<!-- - Strong validity: If all correct processes receive the same input value, then they must all output that value. -->
<!-- - Termination: All processes must eventually decide on an output value -->

<!-- ### Fault tolerance -->
<!-- TODO explain how protocols must be fault tolerant -->

## Tipos de mecanismos de consenso {#types-of-consensus-mechanisms}

<!-- TODO -->
<!-- Why do different consensus protocols exist? -->
<!-- What are the tradeoffs of each? -->

### Prueba de trabajo {#proof-of-work}

Ethereum, al igual que Bitcoin, actualmente utiliza el protocolo de consenso de Prueba de trabajo (PoW, por sus siglas en inglés).

#### Creación del bloque {#pow-block-creation}

La Prueba de trabajo la realizan los [mineros](/developers/docs/consensus-mechanisms/pow/mining/), que compiten por crear nuevos bloques repletos de transacciones procesadas. El ganador comparte el nuevo bloque con el resto de la red y gana algunos ETH minados recientemente. El ganador de la carrera será el ordenador del minero que consiga resolver el rompecabezas con más rapidez; esto produce el enlace criptográfico entre el bloque actual y el anterior. La resolución de este rompecabezas es la tarea de la Prueba de trabajo.

#### Seguridad {#pow-security}

La red se mantiene segura por el hecho de que necesitarías el 51% de la potencia computacional de la red para defraudar a la cadena. Esto requeriría inversiones grandes en equipamiento y energía, que probablemente provocarían que gastaras más de lo que ganas.

Más información sobre la [Prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Prueba de participación {#proof-of-stake}

Ethereum tiene planes de actualizarse para adoptar el protocolo de consenso de [Prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/).

#### Creación de bloques {#pos-block-creation}

La Prueba de participación la realizan los validadores que hayan apostado ETH para participar en el sistema. Un validador se elige aleatoriamente para crear nuevos bloques, compartirlos con la red y obtener recompensas. En lugar de tener que realizar un trabajo informático intenso, bastará con que apuestes tus ETH en la red. Esto fomentará un comportamiento saludable de la red.

#### Seguridad {#pos-security}

El sistema de Prueba de participación se mantiene seguro, ya que sería necesario disponer del 51 % de los ETH apostados para defraudar al sistema. Y, además, la apuesta podría interrumpirse por comportamiento malicioso.

Más información sobre la [Prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/)

## Más información {#further-reading}

<!-- TODO -->

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
- [Minería](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
