---
title: Prueba de trabajo (PoW)
description: Una explicación del protocolo de consenso de prueba de trabajo y su papel en Ethereum.
lang: es
---

La red [Ethereum](/) comenzó utilizando un mecanismo de consenso que involucraba la **[prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow)**. Esto permitía a los nodos de la red Ethereum llegar a un consenso sobre el estado de toda la información registrada en la cadena de bloques de Ethereum y prevenía ciertos tipos de ataques económicos. Sin embargo, Ethereum desactivó la prueba de trabajo en 2022 y comenzó a utilizar la [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos) en su lugar.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    La prueba de trabajo ha quedado obsoleta. Ethereum ya no utiliza la prueba de trabajo como parte de su mecanismo de consenso. En su lugar, utiliza la prueba de participación. Lea más sobre la [prueba de participación](/developers/docs/consensus-mechanisms/pos/) y el [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Requisitos previos {#prerequisites}

Para entender mejor esta página, le recomendamos que primero lea sobre las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/) y los [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es la prueba de trabajo (PoW)? {#what-is-pow}

El consenso de Nakamoto, que utiliza la prueba de trabajo, es el mecanismo que alguna vez permitió a la red descentralizada de Ethereum llegar a un consenso (es decir, que todos los nodos estén de acuerdo) sobre cosas como los saldos de las cuentas y el orden de las transacciones. Esto evitaba que los usuarios "gastaran dos veces" sus monedas y garantizaba que la cadena de Ethereum fuera tremendamente difícil de atacar o manipular. Estas propiedades de seguridad ahora provienen de la prueba de participación en su lugar, utilizando el mecanismo de consenso conocido como [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Prueba de trabajo y minería {#pow-and-mining}

La prueba de trabajo es el algoritmo subyacente que establece la dificultad y las reglas para el trabajo que hacen los mineros en las cadenas de bloques de prueba de trabajo. La minería es el "trabajo" en sí. Es el acto de agregar bloques válidos a la cadena. Esto es importante porque la longitud de la cadena ayuda a la red a seguir la bifurcación correcta de la cadena de bloques. Cuanto más "trabajo" se haya hecho, más larga será la cadena y mayor será el número de bloque, por lo que la red podrá estar más segura del estado actual de las cosas.

[Más sobre la minería](/developers/docs/consensus-mechanisms/pow/mining/)

## ¿Cómo funcionaba la prueba de trabajo de Ethereum? {#how-it-works}

Las transacciones de Ethereum se procesan en bloques. En el ahora obsoleto Ethereum de prueba de trabajo, cada bloque contenía:

- dificultad del bloque: por ejemplo, 3,324,092,183,262,715
- mixHash: por ejemplo, `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce: por ejemplo, `0xd3ee432b4fb3d26b`

Estos datos del bloque estaban directamente relacionados con la prueba de trabajo.

### El trabajo en la prueba de trabajo {#the-work}

El protocolo de prueba de trabajo, Ethash, requería que los mineros pasaran por una intensa carrera de prueba y error para encontrar el nonce de un bloque. Solo los bloques con un nonce válido podían agregarse a la cadena.

Al competir para crear un bloque, un minero pasaba repetidamente un conjunto de datos, que solo se podía obtener descargando y ejecutando la cadena completa (como hace un minero), a través de una función matemática. El conjunto de datos se utilizaba para generar un mixHash por debajo de un objetivo dictado por la dificultad del bloque. La mejor manera de hacer esto es mediante prueba y error.

La dificultad determinaba el objetivo para el hash. Cuanto menor era el objetivo, menor era el conjunto de hashes válidos. Una vez generado, esto era increíblemente fácil de verificar para otros mineros y clientes. Incluso si una sola transacción cambiara, el hash sería completamente diferente, lo que indicaría un fraude.

El hashing hace que el fraude sea fácil de detectar. Pero la prueba de trabajo como proceso también era un gran elemento disuasorio para atacar la cadena.

### Prueba de trabajo y seguridad {#security}

Los mineros estaban incentivados a hacer este trabajo en la cadena principal de Ethereum. Había pocos incentivos para que un subconjunto de mineros iniciara su propia cadena: esto socava el sistema. Las cadenas de bloques dependen de tener un único estado como fuente de la verdad.

El objetivo de la prueba de trabajo era extender la cadena. La cadena más larga era la más creíble como válida porque tenía la mayor cantidad de trabajo computacional realizado para generarla. Dentro del sistema PoW de Ethereum, era casi imposible crear nuevos bloques que borraran transacciones, crearan transacciones falsas o mantuvieran una segunda cadena. Esto se debe a que un minero malintencionado habría necesitado resolver siempre el nonce del bloque más rápido que todos los demás.

Para crear de manera consistente bloques malintencionados pero válidos, un minero malintencionado habría necesitado más del 51 % del poder de minería de la red para vencer a todos los demás. Esa cantidad de "trabajo" requiere mucha potencia informática costosa y la energía gastada podría incluso haber superado las ganancias obtenidas en un ataque.

### Economía de la prueba de trabajo {#economics}

La prueba de trabajo también era responsable de emitir nueva moneda en el sistema e incentivar a los mineros a hacer el trabajo.

Desde la [actualización de Constantinopla](/ethereum-forks/#constantinople), los mineros que creaban con éxito un bloque eran recompensados con dos ETH recién acuñados y parte de las tarifas de transacción. Los bloques ommer también compensaban con 1,75 ETH. Los bloques ommer eran bloques válidos creados por un minero prácticamente al mismo tiempo que otro minero creaba el bloque canónico, lo que en última instancia estaba determinado por qué cadena se construía primero. Los bloques ommer generalmente ocurrían debido a la latencia de la red.

## Finalidad {#finality}

Una transacción tiene "finalidad" en Ethereum cuando forma parte de un bloque que no puede cambiar.

Debido a que los mineros trabajaban de manera descentralizada, se podían minar dos bloques válidos al mismo tiempo. Esto crea una bifurcación temporal. Eventualmente, una de estas cadenas se convertía en la cadena aceptada después de que se minaran y agregaran bloques posteriores a ella, haciéndola más larga.

Para complicar aún más las cosas, es posible que las transacciones rechazadas en la bifurcación temporal no se hayan incluido en la cadena aceptada. Esto significa que podrían revertirse. Por lo tanto, la finalidad se refiere al tiempo que debe esperar antes de considerar que una transacción es irreversible. Bajo el anterior Ethereum de prueba de trabajo, cuantos más bloques se minaban sobre un bloque específico `N`, mayor era la confianza de que las transacciones en `N` habían sido exitosas y no se revertirían. Ahora, con la prueba de participación, la finalización es una propiedad explícita, en lugar de probabilística, de un bloque.

## Consumo de energía de la prueba de trabajo {#energy}

Una de las principales críticas a la prueba de trabajo es la cantidad de producción de energía requerida para mantener la red segura. Para mantener la seguridad y la descentralización, Ethereum en prueba de trabajo consumía grandes cantidades de energía. Poco antes de cambiar a la prueba de participación, los mineros de Ethereum consumían colectivamente alrededor de 70 TWh/año (aproximadamente lo mismo que la República Checa, según [digiconomist](https://digiconomist.net/) el 18 de julio de 2022).

## Pros y contras {#pros-and-cons}

| Pros                                                                                                                                                                                                                         | Contras                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| La prueba de trabajo es neutral. No necesita ETH para comenzar y las recompensas por bloque le permiten pasar de 0 ETH a un saldo positivo. Con la [prueba de participación](/developers/docs/consensus-mechanisms/pos/) necesita ETH para empezar. | La prueba de trabajo consume tanta energía que es perjudicial para el medio ambiente.                                                                      |
| La prueba de trabajo es un mecanismo de consenso probado y comprobado que ha mantenido a Bitcoin y Ethereum seguros y descentralizados durante muchos años.                                                                                          | Si desea minar, necesita un equipo tan especializado que supone una gran inversión para empezar.                                                |
| En comparación con la prueba de participación, es relativamente fácil de implementar.                                                                                                                                                                | Debido a la creciente necesidad de computación, los grupos de minería (mining pools) podrían dominar potencialmente el juego de la minería, lo que llevaría a la centralización y a riesgos de seguridad. |

## Comparación con la prueba de participación {#compared-to-pos}

A un alto nivel, la prueba de participación tiene el mismo objetivo final que la prueba de trabajo: ayudar a la red descentralizada a llegar a un consenso de forma segura. Pero tiene algunas diferencias en el proceso y el personal:

- La prueba de participación cambia la importancia del poder computacional por el ETH en staking.
- La prueba de participación reemplaza a los mineros por validadores. Los validadores hacen staking de su ETH para activar la capacidad de crear nuevos bloques.
- Los validadores no compiten para crear bloques, sino que son elegidos al azar por un algoritmo.
- La finalidad es más clara: en ciertos puntos de control, si 2/3 de los validadores están de acuerdo con el estado del bloque, se considera definitivo. Los validadores deben apostar toda su participación en esto, por lo que si intentan confabularse más adelante, perderán toda su participación.

[Más sobre la prueba de participación](/developers/docs/consensus-mechanisms/pos/)

## ¿Aprende mejor de forma visual? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Más información {#further-reading}

- [Ataque de mayoría](https://en.bitcoin.it/wiki/Majority_attack)
- [Sobre la finalidad de la liquidación](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Videos {#videos}

- [Una explicación técnica de los protocolos de prueba de trabajo](https://youtu.be/9V1bipPkCTU)

## Temas relacionados {#related-topics}

- [Minería](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prueba de participación](/developers/docs/consensus-mechanisms/pos/)
- [Prueba de autoridad (PoA)](/developers/docs/consensus-mechanisms/poa/)