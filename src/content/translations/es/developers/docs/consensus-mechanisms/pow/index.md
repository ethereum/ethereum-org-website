---
title: Prueba de trabajo (PoW, por sus siglas en inglés)
description: Una explicación del protocolo de consenso de la prueba de trabajo y su función en Ethereum.
lang: es
incomplete: true
---

Actualmente, Ethereum, al igual que Bitcoin, emplea un protocolo de consenso llamado **[Prueba de trabajo (PoW)](https://wikipedia.org/wiki/Proof_of_work)**. Esto permite a la red de Ethereum ponerse de acuerdo sobre el estado de toda la información registrada en la blockchain de Ethereum y prevenir ciertos tipos de ataques económicos.

Durante el próximo año, la prueba de trabajo se reemplazará progresivamente por la **[prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos)**. La transición a la prueba de participación también eliminará gradualmente el minado de Ethereum. [Más información sobre la fusión.](/upgrades/merge/)

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que en primer lugar se informe sobre las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/) y los [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es la prueba de trabajo (PoW)? {#what-is-pow}

La prueba de trabajo es el mecanismo que permite que la red descentralizada de Ethereum llegue a alcanzar un consenso o un acuerdo en relación con aspectos como los saldos de las cuentas y el orden de las transacciones. De esta manera, se evita que los usuarios realicen un «doble gasto» de sus monedas y se garantiza que resulte muy difícil atacar o manipular la cadena Ethereum.

## La Prueba de trabajo y la minería {#pow-and-mining}

La prueba de trabajo es el algoritmo subyacente que establece la dificultad y las reglas para el trabajo que realizan los mineros. Entendemos como minado el «trabajo» en sí mismo. Es el acto de añadir bloques válidos a la cadena. Esto es importante porque la longitud de la cadena ayuda a que la red siga la cadena correcta de Ethereum y comprenda el estado actual. Cuanto más «trabajo» se realice, más larga sea la cadena y mayor sea la cantidad de bloques, con mayor seguridad la red podrá adaptarse a la situación actual.

[Más información sobre el minado](/developers/docs/consensus-mechanisms/pow/mining/)

## ¿Cómo funciona la Prueba de trabajo de Ethereum? {#how-it-works}

Las transacciones de Ethereum se procesan en bloques. Cada bloque tiene:

- Dificultad del bloque: p. ej., 3,324,092,183,262,715
- mixHash: p. ej.: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce: p. ej., `0xd3ee432b4fb3d26b`

Los datos de este bloque están directamente relacionados con la prueba de trabajo.

### El trabajo durante la Prueba de trabajo {#the-work}

El protocolo de prueba de trabajo, conocido como Ethash, requiere que los mineros atraviesen una intensa carrera de prueba y error para encontrar la nonce de un bloque. Únicamente los bloques con nonce válido podrán añadirse a la cadena.

Cuando se compite para crear un bloque, un minero presentará repetidamente un conjunto de datos que solo se puede obtener de la descarga y la ejecución de la cadena completa (como lo hace un minero) a través de una función matemática. El conjunto de datos se utiliza para generar un mixHash que esté por debajo de un objetivo nonce, según lo indicado por la dificultad del bloque. La mejor manera de hacerlo es a través del sistema de prueba y error.

La dificultad determina el objetivo del hash. Cuanto menor sea el objetivo, menor será el conjunto de hashes válidos. Una vez generado, esto es increíblemente fácil de verificar para otros mineros y clientes. Incluso si una transacción se modificara, el hash sería completamente diferente e indicaría el fraude.

El hashing hace que el fraude sea fácil de detectar. Sin embargo, la prueba de trabajo como proceso también dificulta en gran medida el ataque de la cadena.

### La Prueba de trabajo y la seguridad {#security}

A los mineros se les incentiva para realizar este trabajo en la cadena principal de Ethereum. Existen pocos incentivos para que un subconjunto de mineros comience su propia cadena: debilita el sistema. Las blockchains dependen de tener un solo estado como fuente de verdad. Y los usuarios siempre elegirán la cadena más larga o "más pesada".

El objetivo de la prueba de trabajo es ampliar la cadena. La cadena más larga es más creíble como la válida, ya que en ella se ha realizado el mayor trabajo informático. Dentro del sistema de la PoW de Ethereum es casi imposible crear nuevos bloques que borren las transacciones, creen transacciones falsas o mantengan una segunda cadena. Esto se debe a que un minero malicioso tendría que resolver el bloque nonce más rápido que el resto.

Para crear sistemáticamente bloques maliciosos pero válidos, se necesitaría más del 51 % de la potencia de minado de la red para vencer a todos los demás. Necesitarías mucha potencia computacional para ser capaz de hacer esta cantidad de "trabajo", El gasto energético podría incluso superar las ganancias que conseguiría en un ataque.

### La economía de la Prueba de trabajo {#economics}

La prueba de trabajo también es responsable de generar nuevas monedas en el sistema e incentivar a que los mineros lleven a cabo el trabajo.

Miners who successfully create a block get rewarded with two freshly minted ETH but no longer receive all the transaction fees, as the base fee gets burned, while the tip and block reward goes to the miner. Un minero también puede obtener 1,75 ETH por un bloque de tipo «uncle». Los bloques de tipo «uncle» son bloques válidos que crea un minero prácticamente al mismo tiempo que otro minero minó un bloque satisfactoriamente. Los bloques «uncle» de una cadena suelen surgir debido a la latencia de la red.

## Finalidad {#finality}

Una transacción tiene «finalidad» en Ethereum cuando forma parte de un bloque que no puede cambiar.

Debido a que los mineros trabajan de forma descentralizada, es posible minar dos bloques válidos al mismo tiempo. Esto crea una bifurcación temporal. Finalmente, una de esas cadenas será la aceptada una vez que el bloque posterior se haya minado y añadido, con lo que se hará más larga.

Pero, para complicar las cosas un poco más, las transacciones rechazadas durante la bifurcación temporal podrían haberse incluido en la cadena aceptada. Esto significa que esa transacción se podría revertir. Con lo cual, la finalidad se refiere al tiempo que deberías esperar antes de considerar una transacción irreversible. Para Ethereum, el tiempo recomendado es de seis bloques o de poco más de 1 minuto. Después de seis bloques, puede decir con relativa confianza que la transacción ha resultado satisfactoria. Puede esperar más tiempo para obtener mayores garantías.

La finalidad es un aspecto que se debe tener en cuenta a la hora de diseñar dapps. Sería una mala experiencia de usuario tergiversar la información de transacción para sus usuarios, especialmente si la transacción tiene un alto valor.

Recuerda, este tiempo no incluye los tiempos de espera para que un minero recoja una transacción.

## Consumo energético de la prueba de trabajo {#energy}

Una de las críticas principales de la prueba de trabajo es la cantidad de energía que se necesita para mantener la seguridad de la red. Para mantener la seguridad y la descentralización, Ethereum en la prueba de trabajo consume 73,2 TWh al año, el equivalente energético de un país mediano como Austria.

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                                                                                                                                              | Desventajas                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La prueba de trabajo es neutral. No necesitas disponer de ETH para comenzar y las recompensas del bloque te permiten crecer de 0 ETH a un saldo positivo. Con la [prueba de participación](/developers/docs/consensus-mechanisms/pos/), se necesita ETH para empezar. | La prueba de trabajo consume tanta energía que es perjudicial para el medio ambiente.                                                                                                         |
| La prueba de trabajo es un mecanismo de consenso aprobado y probado que ha mantenido la seguridad y la descentralización de Bitcoin y Ethereum durante muchos años.                                                                                                   | Si quieres minar, necesitas un equipo tan especializado que es una gran inversión para empezar.                                                                                               |
| Comparado con la Prueba de participación es relativamente fácil de implementar.                                                                                                                                                                                       | Debido al aumento de los cálculos necesarios, las piscinas (pools) de minería podrían dominar potencialmente el juego minero, lo que conduciría a la centralización y a riesgos de seguridad. |

## Comparación con la prueba de participación (PoS, por sus siglas en inglés) {#compared-to-pos}

En un nivel alto, la prueba de participación tiene el mismo objetivo final que la prueba de trabajo: ayudar a la red descentralizada a alcanzar un consenso de forma segura. Pero tiene algunas diferencias en el proceso y el personal:

- La prueba de participación cambia la importancia de la potencia computacional para los ETH apostados.
- La prueba de participación reemplaza a los mineros por los validadores. Los validadores apuestan su ETH para activar la capacidad de crear nuevos bloques.
- Los validadores no compiten para crear bloques, sino que son elegidos al azar por un algoritmo.
- La finalidad es más clara: en ciertos puntos de control, si dos tercios de los validadores acuerdan el estado del bloque, se considera definitivo. Los validadores deben apostar toda su apuesta por esto, así que si intentan confabular, perderán toda su apuesta.

[Más información sobre la prueba de participación](/developers/docs/consensus-mechanisms/pos/)

## ¿Es usted una persona que aprende de manera visual? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Más información {#further-reading}

- [Ataque mayoritario](https://en.bitcoin.it/wiki/Majority_attack)
- [En la finalidad del acuerdo](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Vídeos {#videos}

- [Una explicación técnica de los protocolos de prueba de trabajo](https://youtu.be/9V1bipPkCTU)

## Temas relacionados {#related-topics}

- [Minería](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
