---
title: Minería
description: Una explicación sobre el funcionamiento de la minería en Etherum y sobre cómo mantiene a Etherum seguro y descentralizado.
lang: es
sidebar: true
incomplete: true
---

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, te recomendamos que en primer lugar leas sobre las [transacciones](/en/developers/docs/transactions/), [los bloques](/en/developers/docs/blocks/) y [la Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/).

## ¿Qué es la minería de Ethereum? {#what-is-ethereum-mining}

La minería es el proceso de crear un bloque de transacciones para agregarlo posteriormente al blockchain de Ethereum.

Ethereum, al igual que Bitcoin, utiliza actualmente un mecanismo de concenso denominado [Prueba de trabajo (PoW, por sus siglas en inglés)](/developers/docs/consensus-mechanisms/pow/). La minería es el alma de la Prueba de trabajo. Los mineros de Ethereum (es decir, los ordenadores que ejecutan el software) utilizan su tiempo y su potencia informática para procesar transacciones y producir bloques.

## ¿Por qué existen los mineros? {#why-do-miners-exist}

En sistemas descentralizados como Ethereum, necesitamos cerciorarnos de que todo el mundo está de acuerdo en el orden de las transacciones. Los mineros contribuyen a que esto suceda al resolver difíciles rompecabezas informáticos para producir bloques, lo que sirve para proteger a la red frente a los ataques.

[Más información sobre la Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)

## ¿Cómo se minan las transacciones en Ethereum? {#how-ethereum-transactions-are-mined}

1. Un usuario escribe y firma una solicitud de [transacción](/en/developers/docs/transactions/) con una clave privada de alguna [cuenta](/en/developers/docs/accounts/).
2. El usuario transmite la solicitud de la transacción a toda la red de Ethereum desde algún [nodo](/en/developers/docs/nodes-and-clients/).
3. Al enterarse de la nueva solicitud de la transacción, cada nodo de la red Ethereum agrega la solicitud a sus bases de datos temporales locales (mempool), una lista que incluye todas las solicitudes de transacciones de las que se obtiene información, pero que todavía no se han comprometido a la blockchain de un bloque.
4. En algún punto, un nodo de minería agrega varias decenas o cientos de solicitudes de transacciones a un [bloque](/en/developers/docs/blocks/) potencial de manera que maximiza las [comisiones de transacción](/en/developers/docs/gas/) que obtienen mientras permanecen bajo el límite de gas del bloque. A continuación, el nodo de minería debe:
   1. Comprobar la veracidad de cada solicitud de transacción (es decir que nadie esté intentando transferir ether desde una cuenta de la que no ha producido una firma de la solicitud, etc.) y, a continuación, ejecutar el código de la solicitud, alterando el estado de su copia local de la EVM. El minero otorga la comisión por transacción para cada solicitud de transacción a su propia cuenta.
   2. Iniciar el proceso de producción del "certificado de legitimidad" de la Prueba de trabajo para el bloque potencial, una vez que todas las solicitudes de las transacciones en el bloque hayan sido verificadas y ejecutadas en la copia local de la EVM.
5. En algún momento en el futuro, un minero finalizará la producción de un certificado para un bloque que incluye nuestra solicitud de transacción específica. A continuación, el minero transmite el bloque completo, que incluye el certificado y una suma de verificación del nuevo estado del EVM mencionado.
6. Otros nodos obtienen información acerca del nuevo bloque. Los nodos validan el certificado, ejecutan todas las transacciones en el bloque (lo que incluye la transacción originalmente emitida por nuestro usuario) y comprueban que la suma de verificación de su estado nuevo de la EVM después de la ejecución de todas las transacciones coincide con la suma de verificación del estado reclamado por el bloque del minero. Solo entonces estos nodos anexan este bloque a la cola de su blockchain y aceptan el nuevo estado de la EVM como el estado canónico.
7. Cada nodo elimina todas las transacciones en el nuevo bloque de su memoria local de solicitudes de transacciones insatisfechas.
8. Los nuevos nodos que se unen a la red descargan todos los bloques de manera secuencia, incluido el bloque que contiene nuestra transacción de interés. Estos nodos inicializan una copia de la EVM local (que se inicia como una EVM de estado en blanco) y, a continuación, atraviesan el proceso de ejecución de cada transacción en cada bloque encima de su copia de la EVM local, verificando así las sumas de comprobación de estado en cada bloque a lo largo del proceso.

Cada transacción se mina (es decir, se incluye en un nuevo bloque y se propaga por primera vez) una vez, pero cada participante la ejecuta y la verifica durante el proceso de avance del estado canónico de la EVM. Esto pone de manifiesto uno de los mantras centrales de la blockchain: **no confíes, verifica**.

## Una demostración visual {#a-visual-demo}

Observa a Austin mientras te guía por el proceso de minería y la blockchain de la Prueba de trabajo. <iframe width="100%" height="315" src="https://www.youtube.com/embed/zcX7OJ-L8XQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Más información {#further-reading}

- [¿Qué significa minar Ethereum?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_
- [¿Cómo funcionan los trabajos de minería en Ethereum?](https://www.coindesk.com/information/ethereum-mining-works) _Coindesk_

## Temas relacionados {#related-tools}

- [Mineros principales de Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Calculadora de minería de Ethereum](https://minerstat.com/coin/ETH)

## Temas relacionados {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
