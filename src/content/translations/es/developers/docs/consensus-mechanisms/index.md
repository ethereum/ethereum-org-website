---
title: Mecanismos de consenso
description: Una explicación de los protocolos de consenso en los sistemas distribuidos y de su función en Ethereum.
lang: es
incomplete: true
---

Cuando se trata de blockchains como Ethereum (que, básicamente, son bases de datos distribuidas), los nodos de la red deben ser capaces de llegar a un acuerdo sobre el estado actual del sistema. Esto se consigue con ayuda de mecanismos de consenso.

Aunque los mecanismos de consenso no están directamente relacionados con la construcción de una dapp, entenderlos aclarará conceptos relevantes para usted y para su experiencia de usuario, como los precios del gas y los tiempos de transacción.

## Requisitos previos {#prerequisites}

Para comprender mejor esta pagina, te recomendamos visitar nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es el consenso? {#what-is-consensus}

Por consenso, nos referimos a que se ha alcanzado un acuerdo general. Imaginemos a un grupo de personas que va al cine. Si no existe un desacuerdo sobre la elección de una película propuesta, se ha logrado un consenso. En un caso extremo, el grupo se acabará dividiendo.

En lo que respecta a la cadena de bloques, llegar a un consenso significa que al menos el 51 % de los nodos de la red coinciden en el siguiente estado general de la red.

## ¿Qué es un mecanismo de consenso? {#what-is-a-consensus-mechanism}

Los mecanismos de consenso (también conocidos como protocolos o algoritmos de consenso) permiten a los sistemas distribuidos (redes de ordenadores) colaborar y mantenerse seguros.

Durante décadas, estos mecanismos se han utilizado para establecer un consenso entre los nodos de bases de datos, servidores de aplicaciones y otras infraestructuras empresariales. En los últimos años, se han creado nuevos mecanismos de consenso para permitir que los sistemas criptoeconómicos, tales como Ethereum, lleguen a un acuerdo sobre el estado de la red.

Un mecanismo de consenso de un sistema criptoeconómico también ayuda a prevenir ciertos tipos de ataques económicos. En teoría, un atacante puede comprometer el consenso mediante el control del 51 % de la red. Los mecanismos de consenso están diseñados para hacer inviable este «ataque del 51 %». Se han diseñado diferentes mecanismos para resolver este problema de seguridad de distintas maneras.

<YouTube id="dylgwcPH4EA" />

## Tipos de mecanismos de consenso {#types-of-consensus-mechanisms}

### Prueba de trabajo {#proof-of-work}

En la actualidad, Ethereum, al igual que Bitcoin, emplea un protocolo de consenso de **prueba de trabajo (PoW)**.

#### Creación del bloque {#pow-block-creation}

La prueba de trabajo la realizan los [mineros](/developers/docs/consensus-mechanisms/pow/mining/), que compiten por crear nuevos bloques repletos de transacciones procesadas. El ganador comparte el nuevo bloque con el resto de la red y gana algunos ETH minados recientemente. El ganador de la carrera será el ordenador del minero que consiga resolver el rompecabezas con más rapidez; esto produce el enlace criptográfico entre el bloque actual y el anterior. Resolver este acertijo es el trabajo en la «prueba de trabajo».

#### Seguridad {#pow-security}

La red se mantiene segura por el hecho de que se necesitaría el 51 % de la potencia computacional de la red para defraudar a la cadena. Se necesitarán grandes inversiones en equipamiento y energía; es probable que gaste más de lo que gane.

Más información sobre la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)

### Prueba de participación {#proof-of-stake}

Ethereum tiene planes de actualizarse para adoptar el protocolo de consenso de **prueba de participación (PoS)**.

#### Creación de bloques {#pos-block-creation}

La prueba de participación la realizan los validadores que hayan apostado ETH para participar en el sistema. Se elige aleatoriamente un validador para crear nuevos bloques, compartirlos con la red y obtener recompensas. En lugar de tener que realizar un trabajo informático intenso, bastará con que apueste sus ETH en la red. Esto fomentará un comportamiento saludable de la red.

#### Seguridad {#pos-security}

El sistema de prueba de participación se mantiene seguro, ya que sería necesario disponer del 51 % de los ETH apostados para defraudar al sistema. Además, la apuesta podría interrumpirse por comportamiento malicioso.

Más información sobre la [prueba de participación](developers/docs/consensus-mechanisms/pos/)

### Una guía visual {#types-of-consensus-video}

Obtenga más información sobre los diferentes tipos de mecanismos de consenso usados en Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Resistencia a ataque Sybil & selección de cadena {#sybil-chain}

Técnicamente, ni la prueba de trabajo ni la prueba de participación son protocolos de consenso de por sí, pero se les etiqueta de tal manera por comodidad. En realidad son mecanismos de resistencia a Sybil y selectores de autor de bloque; son una manera de decidir quién es el autor del último bloque. Este mecanismo de resistencia a Sybil, combinado con una regla de selección de cadena, constituye un verdadero mecanismo de consenso.

La **resistencia a Sybil** mide cómo se comporta un protocolo frente a un [ataque Sybil](https://wikipedia.org/wiki/Sybil_attack). Los ataques Sybil son aquellos que se dan cuando un usuario o un grupo de usuarios fingen ser muchos usuarios. La resistencia a este tipo de ataques es esencial para una cadena de bloques descentralizada y permite a los mineros y validadores recibir una recompensa equitativa según los recursos que hayan invertido. La prueba de trabajo y la prueba de participación se protegen frente a esto haciendo que los usuarios tengan que gastar una gran cantidad de energía o entregar varias garantías. Estas protecciones son un elemento económico disuasorio frente a los ataques Sybil.

Las **reglas de selección de cadena**se utilizan para decidir qué cadena es la cadena «correcta». Actualmente, Ethereum y Bitcoin usan la regla «cadena más larga», lo cual significa que la cadena de bloques más larga será la que el resto de los nodos acepten como válida y trabajen con ella. Para las cadenas de prueba de trabajo, la cadena más larga está determinada por la dificultad total de la prueba de trabajo acumulativa de las cadenas.

La combinación de prueba de trabajo y la regla de la cadena más larga se conoce como «Consenso de Nakamoto».

La [cadena de baliza](/upgrades/beacon-chain/) emplea un mecanismo de consenso llamado [Casper, el gadget de finalidad respetuosa](https://arxiv.org/abs/1710.09437), el cual está basado en la prueba de participación.

## Más información {#further-reading}

- [¿Qué es un algoritmo de consenso de cadena de bloques?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [¿Qué es el consenso de Nakamoto? Guía para principiantes completa](https://blockonomi.com/nakamoto-consensus/)
- [¿Cómo funciona Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sobre la seguridad y el rendimiento de las cadenas de bloques de prueba de trabajo](https://eprint.iacr.org/2016/555.pdf)

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
- [Minado](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
