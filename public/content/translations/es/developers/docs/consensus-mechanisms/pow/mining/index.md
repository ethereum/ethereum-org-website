---
title: Minería
description: Una explicación de cómo funcionaba la minería en Ethereum.
lang: es
---

<InfoBanner emoji=":wave:">
La prueba de trabajo ya no es la base del mecanismo de consenso de Ethereum, lo que significa que la minería se ha desactivado. En lugar de ello, Ethereum está asegurado por validadores que participan en ETH. Puede comenzar hoy mismo a participar en ETH. Descubrá más cosas sobre <a href='/roadmap/merge/'>La Fusión</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>la prueba de participación (PoS)</a> y <a href='/staking/'>la participación</a>. Esta página es para interés histórico solamente.
</InfoBanner>

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que en primer lugar obtenga información sobre las [transacciones](/developers/docs/transactions/), [los bloques](/developers/docs/blocks/) y [la prueba de trabajo](/developers/docs/consensus-mechanisms/pow/).

## ¿Qué es la minería de Ethereum? {#what-is-ethereum-mining}

La minería es el proceso de crear un bloque de transacciones que se añadirán a la cadena de bloques de Ethereum en la estructura de prueba de trabajo ahora obsoleta.

La palabra minería tiene su origen en el contexto de la analogía del oro para las criptomonedas. El oro o los metales preciosos son escasos, así como los tókenes digitales, y la única forma de aumentar el volumen total en un sistema de prueba de trabajo es a través de la minería. En la prueba de trabajo de Ethereum, el único modo de emisión era a través de la minería. Sin embargo, a diferencia del oro o los metales preciosos, la minería de Ethereum también fue la manera de proteger la red mediante la creación, comprobación, publicación y propagación de bloques en la cadena de bloques.

Minar ethereum = Proteger la red

La minería es el alma de la prueba de trabajo. Los mineros de Ethereum (es decir, los ordenadores que ejecutan el software) utilizan su tiempo y su potencia informática para procesar transacciones y producir bloques antes de pasar a la prueba de participación.

## ¿Por qué existen los mineros? {#why-do-miners-exist}

En sistemas descentralizados como Ethereum, necesitamos cerciorarnos de que todo el mundo está de acuerdo en el orden de las transacciones. Los mineros ayudaron a que esto ocurriera resolviendo rompecabezas de cálculo difíciles para producir bloques, protegiendo de esta manera la red contra ataques.

[Más información sobre la prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)

Cualquiera era capaz de minar en la red Ethereum usando su ordenador. Sin embargo, no todos pueden minar ether (ETH) de forma rentable. En la mayoría de los casos, los mineros tuvieron que comprar hardware de computación dedicado y tener acceso a fuentes de energía baratas. Un ordenador corriente era poco probable que obtuviera suficientes recompensas de bloqueo para cubrir los costes asociados a la minería.

### Coste del minado {#cost-of-mining}

- Costes potenciales del hardware necesario para construir y mantener una plataforma de minado
- Coste eléctrico para alimentar la plataforma de minado
- Si se está minando en grupo, normalmente, los grupos de minado cobran una tarifa porcentual fija por cada bloque generado por el grupo.
- Coste potencial del equipo para respaldar la plataforma de minado (ventilación, monitoreo de energía, cableado eléctrico, etc.)

Para explorar más a fondo la rentabilidad de minado, utilice una calculadora de minado, como la que ofrece [Etherscan](https://etherscan.io/ether-mining-calculator).

## ¿Cómo se minaban las transacciones en Ethereum? {#how-ethereum-transactions-were-mined}

A continuación se proporciona una descripción general de cómo se minaron las transacciones en la prueba de trabajo de Ethereum. He [aquí](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos) una descripción analógica de este proceso para la prueba de participación de Ethereum.

1. Un usuario escribe y firma una solicitud de [transacción](/developers/docs/transactions/) con una clave privada de alguna [cuenta](/developers/docs/accounts/).
2. El usuario transmite la solicitud de la transacción a toda la red de Ethereum desde algún [nodo](/developers/docs/nodes-and-clients/).
3. Al enterarse de la nueva solicitud de la transacción, cada nodo de la red Ethereum agrega la solicitud a sus bases de datos temporales locales (mempool), una lista que incluye todas las solicitudes de transacciones de las que se obtiene información, pero que todavía no se han comprometido a la blockchain de un bloque.
4. En algún punto, un nodo de minado agrega varias decenas o cientos de solicitudes de transacciones a un [bloque](/developers/docs/blocks/) potencial de manera que maximiza las [comisiones de transacción](/developers/docs/gas/) que obtienen mientras permanecen bajo el límite de gas del bloque. A continuación, el nodo de minería debe:
   1. Comprobar la veracidad de cada solicitud de transacción (es decir que nadie esté intentando transferir ether desde una cuenta de la que no ha producido una firma de la solicitud, etc.) y, a continuación, ejecutar el código de la solicitud, alterando el estado de su copia local de la EVM. El minero otorga la comisión por transacción para cada solicitud de transacción a su propia cuenta.
   2. Iniciar el proceso de producción del "certificado de legitimidad" de la Prueba de trabajo para el bloque potencial, una vez que todas las solicitudes de las transacciones en el bloque hayan sido verificadas y ejecutadas en la copia local de la EVM.
5. En algún momento en el futuro, un minero finalizará la producción de un certificado para un bloque que incluye nuestra solicitud de transacción específica. A continuación, el minero transmite el bloque completo, que incluye el certificado y una suma de verificación del nuevo estado del EVM mencionado.
6. Otros nodos obtienen información acerca del nuevo bloque. Los nodos validan el certificado, ejecutan todas las transacciones en el bloque (lo que incluye la transacción originalmente emitida por nuestro usuario) y comprueban que la suma de verificación de su estado nuevo de la EVM después de la ejecución de todas las transacciones coincide con la suma de verificación del estado reclamado por el bloque del minero. Solo entonces estos nodos anexan este bloque a la cola de su blockchain y aceptan el nuevo estado de la EVM como el estado canónico.
7. Cada nodo elimina todas las transacciones en el nuevo bloque de su memoria local de solicitudes de transacciones insatisfechas.
8. Los nuevos nodos que se unen a la red descargan todos los bloques de manera secuencia, incluido el bloque que contiene nuestra transacción de interés. Estos nodos inicializan una copia de la EVM local (que se inicia como una EVM de estado en blanco) y, a continuación, atraviesan el proceso de ejecución de cada transacción en cada bloque encima de su copia de la EVM local, verificando así las sumas de comprobación de estado en cada bloque a lo largo del proceso.

Cada transacción se mina una vez (es decir, se incluye en un nuevo bloque y se propaga por primera vez), pero cada participante la ejecuta y la verifica durante el proceso de anticipar el estado exacto de la EVM. Así, se pone de manifiesto uno de los mantras principales de la cadena de bloques: **No se fíe, compruebe**.

## Bloques Ommer (tío) {#ommer-blocks}

La minería de bloques en la prueba de trabajo era probabilística, lo que significaba que a veces se publicaban dos bloques válidos simultáneamente debido a la latencia de la red. En este caso, el protocolo tenía que determinar la cadena más larga (y, por tanto, más "válida") y, al mismo tiempo, garantizar la equidad hacia los mineros recompensando parcialmente el bloque válido propuesto no incluido. Esto fomentó una mayor descentralización de la red, ya que los mineros más pequeños, que podrían enfrentarse a una mayor latencia, aún podrían generar beneficios a través de recompensas por bloque [ommer](/glossary/#ommer).

«Ommer» es el término de género neutro preferido para referirse al hermano de un bloque padre, aunque algunas veces, se le denomina «tío». **Desde el paso de Ethereum a la Prueba de Participación, los bloques Ommer ya no se minan**ya que sólo se elige un proponente en cada puesto. Puede ver este cambio consultando la página[tabla histórica](https://ycharts.com/indicators/ethereum_uncle_rate)de los bloques Ommer minados.

## Una demostración visual {#a-visual-demo}

Observe a Austin mientras le guía por el proceso de minado y la cadena de bloques de la prueba de trabajo.

<YouTube id="zcX7OJ-L8XQ" />

## El algoritmo de minería {#mining-algorithm}

La Red principal de Ethereum solo ha utilizado un algoritmo de minado: ["Ethash"](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash fue el sucesor de un algoritmo original de Investigación y Desarrollo conocido como ["Dagger-Hashimoto"](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Más sobre algoritmos de minado](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Temas relacionados {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
