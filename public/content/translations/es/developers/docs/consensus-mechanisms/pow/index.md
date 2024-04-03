---
title: Prueba de trabajo (PoW, por sus siglas en inglés)
description: Una explicación del protocolo de consenso de la prueba de trabajo y su función en Ethereum.
lang: es
---

La red Ethereum comenzó utilizando un mecanismo de consenso que implica una**[prueba de trabajo (o PoW, por sus siglas en inglés)](/developers/docs/consensus-mechanisms/pow)**. Esto permite a la red de Ethereum ponerse de acuerdo sobre el estado de toda la información registrada en la cadena de bloques de Ethereum y prevenir ciertos tipos de ataques económicos. Sin embargo, Ethereum se desconectó de la prueba de trabajo en 2022 y empezó a usar la [prueba de participación](/developers/docs/consensus-mechanisms/pos) en su lugar.

<InfoBanner emoji=":wave:">
    La prueba de trabajo ha quedado obsoleta. Ethereum ya no utiliza la prueba de trabajo como parte de su mecanismo de consenso. En su lugar, utiliza la prueba de participación. Descubra más cosas sobre la <a href="/developers/docs/consensus-mechanisms/pos/">prueba de participación</a> y la <a href="/staking/">participación</a>.
</InfoBanner>

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que en primer lugar se informe sobre las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/) y los [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es la prueba de trabajo (PoW)? {#what-is-pow}

El consenso Nakamoto, que utiliza la prueba de trabajo, es el mecanismo que una vez permitió que la red descentralizada Ethereum llegara a un consenso (es decir, que todos los nodos estuvieran de acuerdo) en asuntos como los saldos de cuentas y el orden de las transacciones. De esta manera, se evita que los usuarios realicen un «doble gasto» de sus monedas y se garantiza que resulte muy difícil atacar o manipular la cadena Ethereum. Estas propiedades de seguridad ahora provienen de la prueba de particpación en su lugar utilizando el mecanismo de consenso conocido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## La Prueba de trabajo y la minería {#pow-and-mining}

La prueba de trabajo es el algoritmo subyacente que establece la dificultad y las reglas para el trabajo que realizan los mineros. Entendemos como minería el "trabajo" en sí mismo. Es el acto de añadir bloques válidos a la cadena. Esto es importante, porque la longitud de la cadena ayuda a la red a seguir la bifurcación correcta de la cadena de bloques. Cuanto más «trabajo» se haga; cuanto más larga será la cadena; y cuanto mayor sea la cantidad de bloques, mayor será la seguridad con que la red podrá adaptarse al estado actual de las cosas.

[Más información sobre la minería](/developers/docs/consensus-mechanisms/pow/mining/)

## ¿Cómo funciona la prueba de trabajo de Ethereum? {#how-it-works}

Las transacciones de Ethereum se procesan en bloques. En la prueba de trabajo de Ethereum que en la actualidad se considera obsoleta, cada bloque contenía:

- Dificultad del bloque: p. ej., 3,324,092,183,262,715
- mixHash: p. ej.: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce: p. ej., `0xd3ee432b4fb3d26b`

Los datos de este bloque estaban directamente relacionados con la prueba de trabajo.

### El trabajo durante la Prueba de trabajo {#the-work}

El protocolo de prueba de trabajo, conocido como Ethash, requería que los mineros atraviesen una intensa carrera de prueba y error para encontrar el nonce para un bloque. Únicamente los bloques con nonce válido podrán añadirse a la cadena.

Cuando se compite para crear un bloque, un minero presentará repetidamente un conjunto de datos que solo se puede obtener de la descarga y la ejecución de la cadena completa (como lo hace un minero) a través de una función matemática. El conjunto de datos se utiliza para generar un mixHash que esté por debajo de un objetivo nonce, según lo indicado por la dificultad del bloque. La mejor manera de hacerlo es a través del sistema de prueba y error.

La dificultad determina el objetivo del hash. Cuanto menor sea el objetivo, menor será el conjunto de hashes válidos. Una vez generado, otros mineros y clientes podrán verificarlo con mucha facilidad. Aunque una transacción se modificarae, el hash sería completamente diferente e indicaría el fraude.

La funcionalidad «hashing» hace que el fraude sea fácil de detectar. Sin embargo, la prueba de trabajo como proceso también dificulta en gran medida el ataque a la cadena.

### La Prueba de trabajo y la seguridad {#security}

A los mineros se les incentiva para realizar este trabajo en la cadena principal de Ethereum. Existen pocos incentivos para que un subconjunto de mineros comience su propia cadena, ya que debilita el sistema. Las cadenas de bloques dependen de tener un solo estado como fuente de verdad.

El objetivo de la prueba de trabajo es ampliar la cadena. La cadena más larga era más creíble como la válida, porque tenía el trabajo más computacional hecho para generarla. Dentro del sistema de la PoW de Ethereum es casi imposible crear nuevos bloques que borren las transacciones, creen transacciones falsas o mantengan una segunda cadena. Esto se debe a que un minero malicioso tendría que resolver el bloque nonce más rápido que el resto.

Para crear sistemáticamente bloques maliciosos pero que sean válidos, un minero malicioso habría necesitado más del 51 % del poder de la minería de la red para tener más control que todos los demás. Esa cantidad de «trabajo» requiere una gran cantidad de energía de computación costosa y la energía gastada podría incluso haber superado los beneficios obtenidos en un ataque.

### La economía de la Prueba de trabajo {#economics}

La prueba de trabajo también es responsable de la generación de nuevas monedas en el sistema e incentivar a que los mineros lleven a cabo el trabajo.

Desde la actualización del [Constantinople](/history/#constantinople), los mineros que crearon con éxito un bloque fueron recompensados con dos ETH y parte de las comisiones de transacción. Los bloques de Ommer también compensaron 1,75 ETH. Los bloques de Ommer eran bloques válidos creados por un minero prácticamente al mismo tiempo que otro minero creó el bloque exacto, que fue determinado en última instancia por la cadena que se construyó sobre la parte superior de la primera. Los bloques Ommer suelen producirse debido a la latencia de la red.

## Finalidad {#finality}

Una transacción tiene «finalidad» en Ethereum cuando forma parte de un bloque que no puede cambiar.

Debido a que los mineros trabajan de forma descentralizada, es posible minar dos bloques válidos al mismo tiempo. Esto crea una bifurcación temporal. Con el tiempo, una de esas cadenas será aceptada una vez que el bloque subsecuente haya sido minado y añadido, haciéndola más grande.

Pero, para enreversarlo todo un poco más, las transacciones rechazadas durante la bifurcación temporal podrían haberse incluido en la cadena aceptada. Esto significa que esa transacción se podría revertir. Con lo cual, la finalidad se refiere al tiempo que se debería esperar antes de considerar una transacción irreversible. Bajo la prueba de trabajo anterior de Ethereum, cuantos más bloques se minaron sobre un bloque específico `N`, mayor confianza existió de que las transacciones en `N` serían exitosas y no se revertirían. Ahora, con la prueba de participación, la finalización es una propiedad explícita ―más que probabilística― de un bloque.

## Consumo energético de la prueba de trabajo {#energy}

Una de las críticas principales de la prueba de trabajo es la cantidad de energía que se necesita para mantener la seguridad de la red. Para mantener la seguridad y la descentralización, Ethereum en la prueba de trabajo consumía grandes cantidades de energía. Antes del cambio a la «prueba de participación», los mineros de Ethereum consumían colectivamente alrededor de 70 TWh/año (aproximadamente lo mismo que toda la Republica Checa, según [digiconomist](https://digiconomist.net/) el 18 de julio de 2022).

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                                                                                                                                              | Desventajas                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La prueba de trabajo es neutral. No necesitas disponer de ETH para comenzar y las recompensas del bloque te permiten crecer de 0 ETH a un saldo positivo. Con la [prueba de participación](/developers/docs/consensus-mechanisms/pos/), se necesita ETH para empezar. | La prueba de trabajo consume tanta energía que es perjudicial para el medio ambiente.                                                                                                         |
| La prueba de trabajo es un mecanismo de consenso aprobado y probado que ha mantenido la seguridad y la descentralización de Bitcoin y Ethereum durante muchos años.                                                                                                   | Si quieres minar, necesitas un equipo tan especializado que es una gran inversión para empezar.                                                                                               |
| Comparado con la Prueba de participación es relativamente fácil de implementar.                                                                                                                                                                                       | Debido al aumento de los cálculos necesarios, las piscinas (pools) de minería podrían dominar potencialmente el juego minero, lo que conduciría a la centralización y a riesgos de seguridad. |

## Comparación con la prueba de participación (PoS, por sus siglas en inglés) {#compared-to-pos}

A un alto nivel, la prueba de participación tiene el mismo objetivo final que la prueba de trabajo: ayudar a la red descentralizada a alcanzar un consenso de forma segura. Pero tiene algunas diferencias en el proceso y el personal:

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
