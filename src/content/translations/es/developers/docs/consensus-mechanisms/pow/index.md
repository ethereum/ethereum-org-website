---
title: Prueba de trabajo (PoW, por sus siglas en inglés)
description: Una explicación del protocolo de consenso de la prueba de trabajo y su función en Ethereum.
lang: es
sidebar: true
incomplete: verdadero
---

Ethereum, como Bitcoin, utiliza actualmente un protocolo de consenso llamado [Prueba de trabajo (PoW, por sus siglas en inglés)](https://en.wikipedia.org/wiki/Proof_of_work). Esto permite a la red de Ethereum ponerse de acuerdo sobre el estado de toda la información registrada en la blockchain de Ethereum y prevenir ciertos tipos de ataques económicos.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, te recomendamos leer primero sobre [transacciones](/en/developers/docs/transactions/) y [bloques](/en/developers/docs/blocks/).

## ¿Qué es la prueba de trabajo (PoW)? {#what-is-pow}

La Prueba de trabajo (PoW) es el mecanismo que permite que la red descentralizada de Ethereum llegue a alcanzar un consenso o un acuerdo en relación a aspectos como los saldos de las cuentas y el orden de las transacciones. Esto evita que los usuarios realicen un "doble gasto" de sus monedas y garantiza que la cadena Ethereum sea increíblemente difícil de atacar o sobrescribir.

## La Prueba de trabajo y la minería {#pow-and-mining}

La Prueba de trabajo es el algoritmo subyacente que establece la dificultad y las reglas para el trabajo que realizan los mineros. Entendemos como minería el "trabajo" en sí mismo. Es el acto de añadir bloques válidos a la cadena. Esto es importante porque la longitud de la cadena ayuda a la red a detectar la cadena Ethereum válida y a entender el estado actual de Ethereum. Cuanto más "trabajo" se haga, cuanto más larga será la cadena y cuanto mayor sea la cantidad de bloques, con mayor seguridad la red podrá adaptarse al estado actual de las cosas.

[Más información sobre la minería](/developers/docs/consensus-mechanisms/pow/mining/)

## ¿Cómo funciona la Prueba de trabajo de Ethereum? {#how-it-works}

Las transacciones de Ethereum se procesan en bloques. Cada bloque tiene:

- Dificultad del bloque: p. ej., 3,324,092,183,262,715
- mixHash: p. ej.: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce: p. ej., `0xd3ee432b4fb3d26b`

Los datos de este bloque están directamente relacionados con la PoW.

### El trabajo durante la Prueba de trabajo {#the-work}

El protocolo de Prueba de trabajo, conocido como Ethash, requiere que los mineros atraviesen una intensa carrera de prueba y error para encontrar la nonce para un bloque. Únicamente los bloques con nonce válido podrán añadirse a la cadena.

Cuando se compite para crear un bloque, un minero pondrá repetidamente un conjunto de datos que solo se puede obtener de la descarga y ejecución de la cadena completa (como lo hace un minero) a través de una función matemática. Esto es para generar un mixHash que esté por debajo de un objetivo nonce, según lo indicado por la dificultad del bloque. La mejor manera de hacerlo es a través del sistema de prueba y error.

La dificultad determina el objetivo del hash. Cuanto menor sea el objetivo, menor será el conjunto de hashes válidos. Una vez generado, esto es increíblemente fácil de verificar para otros mineros y clientes. Incluso si una transacción se modificara, el hash sería completamente diferente e indicaría el fraude.

El hashing hace que el fraude sea fácil de detectar. Sin embargo, la PoW como proceso también supone un gran impedimento para atacar la cadena.

### La Prueba de trabajo y la seguridad {#security}

A los mineros se les incentiva para realizar este trabajo en la cadena principal de Ethereum. Hay pocos incentivos para que un subconjunto de mineros comience su propia cadena: es la que subyace al sistema. Las blockchains dependen de tener un solo estado como fuente de verdad. Y los usuarios siempre elegirán la cadena más larga o "más pesada".

El objetivo de la PoW es ampliar la cadena. La cadena más larga es más creíble como la válida, ya en ella se ha realizado el mayor trabajo informático. Dentro del sistema de la PoW de Ethereum es casi imposible crear nuevos bloques que borren las transacciones, creen transacciones falsas o mantengan una segunda cadena. Esto se debe a que un minero malicioso tendría que resolver el bloque nonce más rápido que el resto.

Para crear sistemáticamente bloques maliciosos pero válidos, necesitarías más del 51% de la potencia de la míneria de la red para vencer a todos los demás. Necesitarías mucha potencia computacional para ser capaz de hacer esta cantidad de "trabajo", y el gasto energético podría incluso superar las ganancias que conseguirías en un ataque.

### La economía de la Prueba de trabajo {#economics}

La PoW es también responsable de la emisión de nuevas monedas en el sistema, así como de incentivar a los mineros a realizar el trabajo.

A los mineros que hayan creado un bloque con éxito se les recompensa con lo siguiente: 2 ETH nuevos y todas las comisiones de transacción dentro del bloque. Un minero también podría obtener 1,75 ETH a cambio de un bloque de tipo "uncle" (es decir, que se ha minado, pero todavía no se ha añadido a la blockchain). Se trata de un bloque válido, que otro minero ha creado simultáneamente al bloque correcto. Esto suele suceder debido a la latencia de la red.

## Finalidad {#finality}

En redes distribuidas, una transacción tiene "finalidad" cuando es parte de un bloque que no se puede cambiar.

Como los mineros trabajan de manera descentralizada, es posible que dos bloques válidos se minen simultáneamente. Esto crea una bifurcación temporal. Eventualmente una cadena será la cadena aceptada una vez que el bloque subsecuente haya sido minado y añadido, haciéndola más grande.

Pero, para complicar las cosas un poco más, las transacciones que los desarrolladores no aceptaron durante el tiempo de revisión podrían haberse incluido en la cadena aceptada. Esto significa que esa transacción se podría revertir. Con lo cual, la finalidad se refiere al tiempo que deberías esperar antes de considerar una transacción irreversible. Para Ethereum el tiempo recomendado es de 6 bloques o de poco más de 1 minuto. A continuación se puede decir con relativa confianza que la transacción ha sido un éxito. Por supuesto, puedes esperar más tiempo para obtener garantías aún mayores.

Esto es algo que hay que tener en cuenta al diseñar dapps (aplicaciones descentralizadas), ya que sería una mala experiencia de usuario falsear la información de transacción a sus usuarios. Especialmente si la transacción es de alto valor.

Recuerda, este tiempo no incluye los tiempos de espera para que un minero recoja una transacción.

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                                                                                                                             | Desventajas                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La PoW es neutral. No necesitas disponer de ETH para comenzar y las recompensas del bloque te permiten crecer de 0 ETH a un saldo positivo. Con la [Prueba de participación](/developers/docs/consensus-mechanisms/pos/) necesitas ETH para empezar. | La PoW consume tanta energía que es perjudicial para el medio ambiente.                                                                                                                       |
| La PoW es un mecanismo de consenso aprobado y probado que ha mantenido a Bitcoin y Ethereum seguro y descentralizado durante muchos años.                                                                                                            | Si quieres minar, necesitas un equipo tan especializado que es una gran inversión para empezar.                                                                                               |
| Comparado con la Prueba de participación es relativamente fácil de implementar.                                                                                                                                                                      | Debido al aumento de los cálculos necesarios, las piscinas (pools) de minería podrían dominar potencialmente el juego minero, lo que conduciría a la centralización y a riesgos de seguridad. |

## Comparación con la Prueba de participación (PoS, por sus siglas en inglés) {#compared-to-pos}

En un nivel alto, la Prueba de participación tiene el mismo objetivo final que la Prueba de trabajo: ayudar a la red descentralizada a alcanzar un consenso de forma segura. Pero tiene algunas diferencias en el proceso y el personal:

- La PoS cambia la importancia del poder computacional para los ETH apostados.
- La PoS sustituye a los mineros por validadores. Los validadores apuestan su ETH para activar la capacidad de crear nuevos bloques.
- Los validadores no compiten para crear bloques, sino que son elegidos al azar por un algoritmo.
- La finalidad es más clara: en ciertos puntos de control, si dos tercios de los validadores acuerdan el estado del bloque, se considera definitivo. Los validadores deben apostar toda su apuesta por esto, así que si intentan confabular, perderán toda su apuesta.

[Más información sobre la Prueba de participación](/developers/docs/consensus-mechanisms/pos/)

## Leer más {#further-reading}

- [Ataque mayoritario](https://en.bitcoin.it/wiki/Majority_attack)
- [En la finalidad del acuerdo](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

## Temas relacionados {#related-topics}

- [Minería](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
