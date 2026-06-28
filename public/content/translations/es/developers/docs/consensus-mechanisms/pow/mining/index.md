---
title: "Minería"
description: "Una explicación de cómo funcionaba la minería en Ethereum."
lang: es
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
La prueba de trabajo (PoW) ya no es la base del mecanismo de consenso de Ethereum, lo que significa que la minería se ha apagado. En su lugar, [Ethereum](/) está protegido por validadores que hacen staking de ETH. Puedes empezar a hacer staking de tus ETH hoy mismo. Lee más sobre <a href='/roadmap/merge/'>La Fusión</a>, la <a href='/developers/docs/consensus-mechanisms/pos/'>prueba de participación (PoS)</a> y el <a href='/staking/'>staking</a>. Esta página es solo de interés histórico.
</AlertDescription>
</AlertContent>
</Alert>

## Requisitos previos {#prerequisites}

Para entender mejor esta página, te recomendamos que primero leas sobre las [transacciones](/developers/docs/transactions/), los [bloques](/developers/docs/blocks/) y la [prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow/).

## ¿Qué es la minería de Ethereum? {#what-is-ethereum-mining}

La minería es el proceso de crear un bloque de transacciones para ser añadido a la cadena de bloques de Ethereum en la arquitectura de prueba de trabajo de Ethereum, ahora obsoleta.

La palabra minería se origina en el contexto de la analogía del oro para las criptomonedas. El oro o los metales preciosos son escasos, al igual que los tokens digitales, y la única forma de aumentar el volumen total en un sistema de prueba de trabajo es a través de la minería. En el Ethereum de prueba de trabajo, el único modo de emisión era a través de la minería. Sin embargo, a diferencia del oro o los metales preciosos, la minería de Ethereum también era la forma de asegurar la red mediante la creación, verificación, publicación y propagación de bloques en la cadena de bloques.

Minar ether = Asegurar la red

La minería es el elemento vital de cualquier cadena de bloques de prueba de trabajo. Los mineros de Ethereum (computadoras que ejecutan software) utilizaban su tiempo y poder de cómputo para procesar transacciones y producir bloques antes de la transición a la prueba de participación.

## ¿Por qué existen los mineros? {#why-do-miners-exist}

En sistemas descentralizados como Ethereum, necesitamos asegurarnos de que todos estén de acuerdo en el orden de las transacciones. Los mineros ayudaban a que esto sucediera resolviendo acertijos computacionalmente difíciles para producir bloques, asegurando la red contra ataques.

[Más sobre la prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)

Anteriormente, cualquiera podía minar en la red Ethereum usando su computadora. Sin embargo, no todos podían minar ether (ETH) de manera rentable. En la mayoría de los casos, los mineros tenían que comprar hardware informático dedicado y tener acceso a fuentes de energía económicas. Era poco probable que una computadora promedio ganara suficientes recompensas de bloque para cubrir los costos asociados de la minería.

### Costo de la minería {#cost-of-mining}

- Costos potenciales del hardware necesario para construir y mantener un equipo de minería
- Costo eléctrico de alimentar el equipo de minería
- Si minabas en un pool, estos pools normalmente cobraban una tarifa porcentual fija de cada bloque generado por el pool
- Costo potencial del equipo para dar soporte al equipo de minería (ventilación, monitoreo de energía, cableado eléctrico, etc.)

Para explorar más a fondo la rentabilidad de la minería, usa una calculadora de minería, como la que proporciona [Etherscan](https://etherscan.io/ether-mining-calculator).

## Cómo se minaban las transacciones de Ethereum {#how-ethereum-transactions-were-mined}

A continuación se ofrece una descripción general de cómo se minaban las transacciones en la prueba de trabajo de Ethereum. Se puede encontrar una descripción análoga de este proceso para la prueba de participación de Ethereum [aquí](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Un usuario escribe y firma una solicitud de [transacción](/developers/docs/transactions/) con la clave privada de alguna [cuenta](/developers/docs/accounts/).
2. El usuario transmite la solicitud de transacción a toda la red Ethereum desde algún [nodo](/developers/docs/nodes-and-clients/).
3. Al enterarse de la nueva solicitud de transacción, cada nodo de la red Ethereum añade la solicitud a su mempool local, una lista de todas las solicitudes de transacciones de las que han oído hablar y que aún no se han confirmado en la cadena de bloques dentro de un bloque.
4. En algún momento, un nodo minero agrega varias docenas o cientos de solicitudes de transacciones en un [bloque](/developers/docs/blocks/) potencial, de una manera que maximiza las [tarifas de transacción](/developers/docs/gas/) que ganan mientras se mantienen por debajo del límite de gas del bloque. El nodo minero entonces:
   1. Verifica la validez de cada solicitud de transacción (es decir, que nadie esté intentando transferir ether de una cuenta para la que no ha producido una firma, que la solicitud no esté mal formada, etc.), y luego ejecuta el código de la solicitud, alterando el estado de su copia local de la EVM. El minero otorga la tarifa de transacción por cada una de estas solicitudes de transacción a su propia cuenta.
   2. Comienza el proceso de producir el "certificado de legitimidad" de prueba de trabajo para el bloque potencial, una vez que todas las solicitudes de transacciones en el bloque han sido verificadas y ejecutadas en la copia local de la EVM.
5. Eventualmente, un minero terminará de producir un certificado para un bloque que incluye nuestra solicitud de transacción específica. El minero luego transmite el bloque completado, que incluye el certificado y una suma de comprobación (checksum) del nuevo estado reclamado de la EVM.
6. Otros nodos se enteran del nuevo bloque. Verifican el certificado, ejecutan todas las transacciones en el bloque ellos mismos (incluyendo la transacción transmitida originalmente por nuestro usuario), y verifican que la suma de comprobación de su nuevo estado de la EVM después de la ejecución de todas las transacciones coincida con la suma de comprobación del estado reclamado por el bloque del minero. Solo entonces estos nodos añaden este bloque al final de su cadena de bloques, y aceptan el nuevo estado de la EVM como el estado canónico.
7. Cada nodo elimina todas las transacciones en el nuevo bloque de su mempool local de solicitudes de transacciones no cumplidas.
8. Los nuevos nodos que se unen a la red descargan todos los bloques en secuencia, incluyendo el bloque que contiene nuestra transacción de interés. Inicializan una copia local de la EVM (que comienza como una EVM en estado en blanco), y luego pasan por el proceso de ejecutar cada transacción en cada bloque sobre su copia local de la EVM, verificando las sumas de comprobación del estado en cada bloque a lo largo del camino.

Cada transacción se mina (se incluye en un nuevo bloque y se propaga por primera vez) una vez, pero es ejecutada y verificada por cada participante en el proceso de avanzar el estado canónico de la EVM. Esto resalta uno de los mantras centrales de la cadena de bloques: **No confíes, verifica**.

## Bloques ommer (tíos) {#ommer-blocks}

La minería de bloques en la prueba de trabajo era probabilística, lo que significa que a veces se publicaban dos bloques válidos simultáneamente debido a la latencia de la red. En este caso, el protocolo tenía que determinar la cadena más larga (y por lo tanto más "válida") mientras aseguraba la equidad hacia los mineros recompensando parcialmente el bloque válido propuesto no incluido. Esto fomentaba una mayor descentralización de la red, ya que los mineros más pequeños, que podrían enfrentar una mayor latencia, aún podían generar retornos a través de las recompensas de [bloque ommer](/glossary/#ommer).

El término "ommer" es el término preferido de género neutro para el hermano de un bloque padre, pero a veces también se le llama "tío" (uncle). **Desde el paso de Ethereum a la prueba de participación, los bloques ommer ya no se minan**, ya que solo se elige un proponente en cada slot. Puedes ver este cambio viendo el [gráfico histórico](https://ycharts.com/indicators/ethereum_uncle_rate) de los bloques ommer minados.

## Una demostración visual {#a-visual-demo}

Mira a Austin guiarte a través de la minería y la cadena de bloques de prueba de trabajo.

<VideoWatch slug="blockchain-eth-build" />

## El algoritmo de minería {#mining-algorithm}

La red principal de Ethereum solo usó un algoritmo de minería: ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash fue el sucesor de un algoritmo original de I+D conocido como ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Más sobre algoritmos de minería](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Temas relacionados {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow/)