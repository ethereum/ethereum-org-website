---
title: Prueba de autoridad (PoA)
description: Explicación del protocolo de consenso "Prueba de autoridad" y su papel en el ecosistema de cadenas de bloques.
lang: es
---

Prueba de autoridad (PoA) es un algoritmo de consenso basado en reputación que es una versión modificada de la [prueba de participación](/developers/docs/consensus-mechanisms/pos/). Se utiliza principalmente en cadenas privadas, redes de prueba y redes de desarrollo local. PoA es un algoritmo de consenso basado en reputación que requiere confiar en un conjunto de firmantes autorizados para producir bloques, en lugar de utilizar un mecanismo basado en participación en PoS.

## Requisitos previos {#prerequisites}

Para un mejor entendimiento de esta página, le recomendamos leer primero [transacciones](/developers/docs/transactions/), [bloques](/developers/docs/blocks/) y [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es Prueba de autoridad (PoA)? {#what-is-poa}

La Prueba de autoridad es una versión modificada de **[prueba de participación](/developers/docs/consensus-mechanisms/pos/) (PoS)** que es un algoritmo de consenso basado en reputación en lugar del mecanismo basado en participación en PoS. El término fue introducido por primera vez en 2017 por Gavin Wood, y este algoritmo de consenso ha sido utilizado principalmente en cadenas privadas, redes de prueba y redes de desarrollo local, ya que supera la necesidad de recursos de alta calidad de PoW y resuelve los problemas de escalabilidad de PoS al tener un pequeño subconjunto de nodos almacenando la cadena de bloques y produciendo bloques.

La prueba de autoridad requiere confiar en un grupo establecido de firmantes que se establece en el [bloque inicial](/glossary/#genesis-block). En la mayoría de las implementaciones actuales, todos los firmantes autorizados conservan el mismo poder y privilegios al determinar el consenso de la cadena. La idea detrás del staking de reputación es que cada validador autorizado sea conocido por todos a través de mecanismos como el conocimiento del cliente (KYC), o teniendo una organización reconocida como único validador; de este modo, si un validador hace algo incorrecto, se conoce su identidad.

Existen diversas implementaciones de PoA, pero la implementación estándar de Ethereum es **clique**, que implementa [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique es fácil de utilizar para los desarrolladores y un estándar fácil de implementar dado que soporta todo tipo de sincronización de clientes. Otras implementaciones incluyen [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) y [Aura](https://openethereum.github.io/Chain-specification).

## Cómo funciona {#how-it-works}

En PoA, se selecciona un grupo de firmantes autorizados para crear nuevos bloques. Los firmantes son seleccionados en función de su reputación y son los únicos autorizados a crear nuevos bloques. Los firmantes se seleccionan por turnos y cada uno puede crear un bloque en un período de tiempo específico. El tiempo de creación del bloque es fijo, y los firmantes deben crear un bloque dentro de ese período de tiempo.

La reputación en este contexto no es algo cuantificado, sino que se basa en la reputación de corporaciones bien conocidas, como Microsoft y Google. Por lo tanto, la forma de seleccionar a los firmantes de confianza no es algorítmica, sino que se basa en el acto humano normal de _confianza_. Por ejemplo, una entidad como Microsoft crea una red privada PoA entre cientos o miles de startups, y al ser el único firmante de confianza con la posibilidad de agregar otros firmantes conocidos como Google en el futuro, las startups confiarían sin duda en que Microsoft actuará de manera honesta en todo momento y utilizar la red. Esto resuelve la necesidad de realizar staking in diferentes redes pequeñas o privadas que se construyeron con diferentes propósitos para mantenerlas descentralizadas y en funcionamiento, junto con la necesidad de mineros, lo cual consume mucha energía y recursos. Algunas redes privadas utilizan el estándar PoA, como VeChain, mientras que otras lo modifican, como Binance, que utiliza [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), una versión modificada de PoA y PoS.

El proceso de votación lo realizan los propios firmantes. Cada firmante vota por la adición o eliminación de otro firmante en su bloque cuando crean un nuevo bloque. Los votos son contabilizacos por los nodos, y los firmantes se agregan o eliminan en función de que los votos alcancen un umbral específico, denominado SIGNER_LIMIT.

Puede haber situaciones en la que ocurran pequeñas bifurcaciones. La dificultad de un bloque depende de si el bloque fué firmado en turno o fuera de turno. Los bloques "en turno" tienen dificultad 2, y los bloques "fuera de turno" tienen dificultad 1. En el caso de pequeñas bifurcaciones, la cadena en la que la mayoría de los firmantes sellen bloques "a turno" acumulará la mayor dificultad y ganará.

## Vectores de ataque {#attack-vectors}

### Firmantes maliciosos {#malicious-signers}

Un usuario malicioso podría ser incluido en la lista de firmantes, o una clave o máquina firmante podría encontrarse comprometida. En estas situaciones, el protocolo debe poder defenderse en contra de reorganizaciones y spamming. La solución propuesta es que, para una lista dada de N firmantes autorizados, cada firmante pueda mintear 1 de cada K bloques. Esto asegura que los daños sean limitados y que el resto de los validadores puedan votar y eliminar al usuario malicioso.

### Censura {#censorship-attack}

Otro tipo de vector de ataque que resulta interesante ocurre cuando un firmante (o grupo de firmantes) intenta censurar bloques que votan para retirarlo de la lista de autorización. Para lidiar con esto, la frecuencia de minteo de los firmantes se encuentra restringida a 1 de N/2. Esto asegura que firmantes maliciosos necesiten controlar aunque sea el 51% del total de cuentas firmantes, punto en el cual se volverían la nueva fuente de verdad para la cadena.

### Spam {#spam-attack}

Otro vector de ataque más pequeño ocurre cuando firmantes maliciosos inyectan nuevas propuestas de voto dentro de cada bloque que mintean. Dado que los nodos necesitan realizar un conteo de todos los votos para crear la lista de firmantes autorizados, deben registrar todos los votos a lo largo del tiempo. Sin establecer un límite al período de voto, esto podría incrementar lentamente a lo largo del tiempo. La solución es colocar una ventana _móvil_ de W bloques luego de la cual los votos se consideren obsoletos. _Una duración de ventana móvil que resulta razonable podría ser 1-2 épocas._

### Bloques concurrentes {#concurrent-blocks}

En una red de PoA, cuando hay N firmantes autorizados, a cada firmante se le permite mintear 1 de K bloques, lo cual significa que N-K+1 validadores pueden mintear en cualquier momento dado. Para evitar que los validadores se apresuren por los bloques, cada firmante debería agregar una cantidad aleatoria de tiempo al tiempo que toma lanzar un nuevo bloque. Aunque este proceso asegura que pequeñas bifurcaciones en el código sean raras, estas pueden ocurrir igualmente, como ocurre en la Red principal. Si se descubre que un firmante está abusando de su poder y originando caos, los firmantes restantes pueden votar en su contra para retirarle su condición de firmante.

Si, por ejemplo, hubiera 10 firmantes autorizados y cada firmante puede crear 1 de 20 bloques, entonces en cualquier momento 11 validadores pueden crear bloques. Para evitar que los validadores se apresuren a crear bloques, cada firmante incluye un tiempo adicional aleatorio al tiempo que les toma lanzar un nuevo bloque. Esto reduce la cantidad de bifurcaciones en el código, pero aún permite bifurcaciones ocasionales, como se observa en la Red principal de Ethereum. Si un firmante utiliza su autoridad de forma incorrecta alterando el funcionamento correcto de los procesos, otros firmantes pueden votar en su contra y excluirlo de la red.

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                                 | Desventajas                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Más escalable que otros mecanismos populares, tales como PoS y PoW, dado que está basado en un cantidad limitada de firmantes de bloque. | Las redes de PoA suelen tener una cantidad relativamente pequeña de nodos validadores. Esto hace que las redes PoA sean más centralizadas.                                                           |
| Las cadenas de bloques de PoA son muy baratas de ejecutar y mantener.                                                                    | Volverse un firmante autorizado suele estár estar fuera del alcance de una persona común y corriente, dado que las cadenas de bloques requieren entidades con reputación establecida.                                |
| Las transacciones son confirmadas rápidamente dado que la cantidad de firmantes necesarios para validar nuevos bloques es limitada.      | Firmantes maliciosos podrían reorganizar el orden de los bloques, realizar un doble gasto, censurar transacciones en la red. La posibilidad de estos ataques se reduce, pero siguen siendo posibles. |

## Lecturas adicionales {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225): _estándar clique_
- [Estudio de Prueba de autoridad](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md): _aspectos económicos de las cripto_
- [¿Qué es Prueba de autoridad?](https://forum.openzeppelin.com/t/proof-of-authority/3577): _OpenZeppelin_
- [Explicación de la Prueba de autoridad](https://academy.binance.com/en/articles/proof-of-authority-explained): _Binance_
- [PoA en la cadena de bloques](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique explicado](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA obsoleta, especificación Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, otro tipo de implementación de PoA](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### ¿Es más bien de los que aprende viendo? {#visual-learner}

Vea una explicación visual de la prueba de autoridad:

<YouTube id="Mj10HSEM5_8" />

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
