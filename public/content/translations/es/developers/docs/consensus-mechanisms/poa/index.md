---
title: Prueba de autoridad (PoA)
description: Una explicación del protocolo de consenso de prueba de autoridad y su papel en el ecosistema de la cadena de bloques.
lang: es
---

**La prueba de autoridad (PoA)** es un algoritmo de consenso basado en la reputación que es una versión modificada de la [prueba de participación](/developers/docs/consensus-mechanisms/pos/). Se utiliza principalmente en cadenas privadas, redes de prueba y redes de desarrollo local. La PoA es un algoritmo de consenso basado en la reputación que requiere confiar en un conjunto de firmantes autorizados para producir bloques, en lugar de un mecanismo basado en la participación como en la PoS.

## Requisitos previos {#prerequisites}

Para entender mejor esta página, le recomendamos que primero lea sobre las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/) y los [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es la prueba de autoridad (PoA)? {#what-is-poa}

La prueba de autoridad es una versión modificada de la **[prueba de participación](/developers/docs/consensus-mechanisms/pos/) (PoS)** que consiste en un algoritmo de consenso basado en la reputación en lugar del mecanismo basado en la participación de la PoS. El término fue introducido por primera vez en 2017 por Gavin Wood, y este algoritmo de consenso se ha utilizado principalmente en cadenas privadas, redes de prueba y redes de desarrollo local, ya que supera la necesidad de recursos de alta calidad como lo hace la prueba de trabajo (PoW), y supera los problemas de escalabilidad de la PoS al tener un pequeño subconjunto de nodos que almacenan la cadena de bloques y producen bloques.

La prueba de autoridad requiere confiar en un conjunto de firmantes autorizados que se establecen en el [bloque génesis](/glossary/#genesis-block). En la mayoría de las implementaciones actuales, todos los firmantes autorizados conservan el mismo poder y privilegios al determinar el consenso de la cadena. La idea detrás del staking de reputación es que cada validador autorizado es bien conocido por todos a través de procesos como KYC (conozca a su cliente), o al tener una organización reconocida como el único validador; de esta manera, si un validador hace algo mal, se conoce su identidad.

Existen múltiples implementaciones de PoA, pero la implementación estándar de Ethereum es **clique**, que implementa el [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique es un estándar fácil de implementar y amigable para los desarrolladores, que admite todos los tipos de sincronización de clientes. Otras implementaciones incluyen [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) y [Aura](https://openethereum.github.io/Chain-specification).

## Cómo funciona {#how-it-works}

En la PoA, se selecciona un conjunto de firmantes autorizados para crear nuevos bloques. Los firmantes se seleccionan en función de su reputación y son los únicos autorizados para crear nuevos bloques. Los firmantes se seleccionan de forma rotativa (round-robin), y a cada firmante se le permite crear un bloque en un período de tiempo específico. El tiempo de creación del bloque es fijo, y los firmantes deben crear un bloque dentro de ese período de tiempo.

La reputación en este contexto no es algo cuantificado, sino que es la reputación de corporaciones reconocidas como Microsoft y Google; por lo tanto, la forma de seleccionar a los firmantes de confianza no es algorítmica, sino que es el acto humano normal de _confianza_ donde una entidad, digamos por ejemplo Microsoft, crea una red privada PoA entre cientos o miles de startups y asume el rol como el único firmante de confianza con la posibilidad de agregar otros firmantes reconocidos como Google en el futuro. Las startups, sin duda, confiarían en que Microsoft actuará de manera honesta en todo momento y usarían la red. Esto resuelve la necesidad de hacer staking en diferentes redes pequeñas/privadas que se construyeron con diferentes propósitos para mantenerlas descentralizadas y en funcionamiento, junto con la necesidad de mineros, lo que consume mucha energía y recursos. Algunas redes privadas utilizan el estándar PoA tal cual, como VeChain, y otras lo modifican, como Binance, que utiliza [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), que es una versión modificada y personalizada de PoA y PoS.

El proceso de voto lo realizan los propios firmantes. Cada firmante emite un voto para la adición o eliminación de un firmante en su bloque cuando crea un nuevo bloque. Los nodos cuentan los votos, y los firmantes se agregan o eliminan en función de si los votos alcanzan un cierto umbral `SIGNER_LIMIT`.

Puede darse una situación en la que se produzcan pequeñas bifurcaciones; la dificultad de un bloque depende de si el bloque se firmó en su turno o fuera de su turno. Los bloques «en turno» tienen una dificultad de 2, y los bloques «fuera de turno» tienen una dificultad de 1. En el caso de pequeñas bifurcaciones, la cadena con la mayoría de los firmantes sellando bloques «en turno» acumulará la mayor dificultad y ganará.

## Vectores de ataque {#attack-vectors}

### Firmantes maliciosos {#malicious-signers}

Un usuario malicioso podría agregarse a la lista de firmantes, o una clave de firma/máquina podría verse comprometida. En tal escenario, el protocolo debe ser capaz de defenderse contra reorganizaciones y spam. La solución propuesta es que, dada una lista de N firmantes autorizados, cualquier firmante solo puede acuñar 1 bloque de cada K. Esto asegura que el daño sea limitado, y el resto de los validadores pueden expulsar al usuario malicioso mediante su voto.

### Censura {#censorship-attack}

Otro vector de ataque interesante es si un firmante (o grupo de firmantes) intenta censurar los bloques que votan para eliminarlos de la lista de autorización. Para solucionar esto, la frecuencia de acuñación permitida de los firmantes está restringida a 1 de cada N/2. Esto asegura que los firmantes maliciosos necesiten controlar al menos el 51 % de las cuentas de firma, momento en el que se convertirían efectivamente en la nueva fuente de verdad para la cadena.

### Spam {#spam-attack}

Otro pequeño vector de ataque son los firmantes maliciosos que inyectan nuevas propuestas de voto dentro de cada bloque que acuñan. Dado que los nodos necesitan contar todos los votos para crear la lista real de firmantes autorizados, deben registrar todos los votos a lo largo del tiempo. Sin establecer un límite en la ventana de votación, esto podría crecer lentamente, pero sin límites. La solución es colocar una ventana _móvil_ de W bloques después de la cual los votos se consideran obsoletos. _Una ventana razonable podría ser de 1 a 2 épocas._

### Bloques concurrentes {#concurrent-blocks}

En una red PoA, cuando hay N firmantes autorizados, a cada firmante se le permite acuñar 1 bloque de cada K, lo que significa que a N-K+1 validadores se les permite acuñar en cualquier momento dado. Para evitar que estos validadores compitan por los bloques, cada firmante debe agregar un pequeño «desplazamiento» aleatorio al momento en que publica un nuevo bloque. Aunque este proceso asegura que las pequeñas bifurcaciones sean raras, aún pueden ocurrir bifurcaciones ocasionales, al igual que en la Red principal. Si se descubre que un firmante está abusando de su poder y causando caos, los otros firmantes pueden expulsarlo mediante su voto.

Si, por ejemplo, hay 10 firmantes autorizados y a cada firmante se le permite crear 1 bloque de cada 6, entonces en cualquier momento dado, 5 validadores pueden crear bloques. Para evitar que compitan por crear bloques, cada firmante agrega un pequeño «desplazamiento» aleatorio al momento en que publica un nuevo bloque. Esto reduce la aparición de pequeñas bifurcaciones, pero aún permite bifurcaciones ocasionales, como se ve en la red principal de Ethereum. Si un firmante hace un mal uso de su autoridad y causa interrupciones, puede ser expulsado de la red mediante una votación.

## Pros y contras {#pros-and-cons}

| Pros                                                                                                                                                                      | Contras                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Más escalable que otros mecanismos populares como PoS y PoW, ya que se basa en un número limitado de firmantes de bloques                                                 | Las redes PoA suelen tener un número relativamente pequeño de nodos validadores. Esto hace que una red PoA sea más centralizada.                                                      |
| Las cadenas de bloques PoA son increíblemente baratas de ejecutar y mantener                                                                                              | Convertirse en un firmante autorizado suele estar fuera del alcance de una persona común, porque la cadena de bloques requiere entidades con una reputación establecida.              |
| Las transacciones se confirman muy rápido, pudiendo tardar menos de 1 segundo, porque solo se requiere un número limitado de firmantes para validar nuevos bloques        | Los firmantes maliciosos podrían causar una reorganización, realizar un doble gasto o censurar transacciones en la red; esos ataques están mitigados, pero aún son posibles           |

## Más información {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225): _estándar Clique_
- [Estudio sobre la prueba de autoridad](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md): _Criptoeconomía_
- [Qué es la prueba de autoridad](https://forum.openzeppelin.com/t/proof-of-authority/3577): _OpenZeppelin_
- [Explicación de la prueba de autoridad](https://academy.binance.com/en/articles/proof-of-authority-explained): _Binance_
- [PoA en la cadena de bloques](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Explicación de Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA obsoleta, especificación de Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, otra implementación de PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### ¿Aprende mejor de forma visual? {#visual-learner}

Vea una explicación visual de la prueba de autoridad:

<VideoWatch slug="proof-of-authority-explained" />

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)