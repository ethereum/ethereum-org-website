---
title: Bloques
description: "Una visión general de los bloques de la blockchain de Ethereum: su estructura de datos, por qué son necesarios y cómo se fabrican."
lang: es
---

Los bloques son lotes de transacciones con un hash del bloque anterior en la cadena. Esta vincula bloques juntos (en una cadena) porque los hashes derivan criptográficamente de los datos del bloque. Esto previene el fraude, porque un cambio en cualquier bloque del historial invalidaría todos los siguientes bloques; asimismo, todos los hashes subsecuentes cambiarían y todos los que ejecutasen la blockchain lo notarían.

## Requisitos previos {#prerequisites}

Los bloques son muy fáciles de manejar incluso para los principiantes. Sin embargo, para ayudarle a comprender mejor esta página, le recomendamos leer primero las secciones de [Cuentas](/developers/docs/accounts/) y [Transacciones](/developers/docs/transactions/) y nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Por qué se usan los bloques? {#why-blocks}

Para asegurarse de que todos los participantes de la red Ethereum mantienen un estado sincronizado y aceptan el registro de transacciones, estas se organizan en bloques. Esto significa que decenas (o cientos) de transacciones se confirman, acuerdan y sincronizan a la vez.

![Un diagrama que muestra una transacción en un bloque, lo que provoca cambios de estado](./tx-block.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Al separar los commits (formación exitosa de una cadena), damos a todos los participantes de la red el tiempo suficiente para llegar a un consenso: aunque las solicitudes de transacción ocurren docenas de veces por segundo, los bloques en Ethereum se confirman aproximadamente una vez cada 15 segundos.

## ¿Cómo funcionan los bloques? {#how-blocks-work}

Para preservar el historial de transacciones, los bloques se ordenan estrictamente (cada nuevo bloque creado contiene una referencia a su bloque predecesor) y las transacciones dentro de los bloques también se ordenan de manera estricta. Excepto en casos raros o en un momento determinado, todos los participantes en la red están de acuerdo en el número exacto y en el historial de los bloques. Además, están trabajando para agrupar los requerimientos de transacción en tiempo real en el próximo bloque.

Una vez que un minero ensambla un bloque en la red, este se propaga al resto de la red; todos los nodos agregan este bloque al final de su blockchain y la minería continúa. El proceso exacto de ensamblaje de bloques (minería) y el proceso de compromiso/consenso se especifican actualmente mediante el protocolo denominado "Prueba de trabajo" de Ethereum.

### Una demostración visual {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## El protocolo "Prueba de trabajo" {#proof-of-work-protocol}

Una prueba de trabajo implica lo siguiente:

- Los nodos de minería tienen que gastar una cantidad variable y sustancial de energía, tiempo y potencia computacional para producir un "certificado de legitimidad" por un bloque que ellos proponen para la red. Esto ayuda a proteger la red frente a ataques de spam/denegación de servicios, entre otras cosas, ya que la producción de los certificados resulta costosa.
- Los demás mineros que tengan información sobre un bloque nuevo con un certificado válido deberán aceptar el nuevo bloque como el siguiente bloque de la cadena.
- La cantidad exacta de tiempo que necesita cualquier minero para producir este certificado es una variable aleatoria con alta variabilidad. De esta manera se garantiza que es poco probable que dos mineros produzcan validaciones para un siguiente bloque propuesto simultáneamente; cuando un minero produce y propaga un nuevo bloque certificado, los demás pueden estar casi seguros de que el bloque será aceptado por la red como un nuevo bloque canónico en la cadena de bloques, sin conflicto (aunque existe un protocolo para resolver los conflictos, así como en el caso de que dos cadenas certificadas se produzcan casi simultáneamente).

[Más información sobre el minado](/developers/docs/consensus-mechanisms/pow/mining/)

## ¿Qué hay en un bloque? {#block-anatomy}

- `timestamp`: hora en la que se minó el bloque.
- `blockNumber`: la longitud de la cadena de bloques en bloques.
- `baseFeePerGas`: la comisión mínima por gas necesaria para que una transacción se incluya en el bloque.
- `difficulty`: el esfuerzo empleado para minar el bloque.
- `mixHash`: un identificador único del bloque.
- `parentHash`: el único identificador del bloque anterior (esta es la manera en la que los bloques son enlazan en una cadena).
- `transactions`: las transacciones incluidas en el bloque.
- `stateRoot`: el estado entero del sistema; los saldos de las cuentas, el almacenamiento de contratos, el código de contratos y los nonces de las cuentas.
- `nonce`: un hash que, cuando se combina con mixHash, comprueba que el bloque ha pasado por una [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/).

## Tiempo del bloque {#block-time}

El tiempo del bloque se refiere al tiempo que se tarda en minar un nuevo bloque. En Ethereum, el tiempo promedio de bloque es de entre 12 y 14 segundos y se evalúa después de cada bloque. El tiempo de bloque esperado se establece como una constante a nivel de protocolo y se utiliza para proteger la seguridad de la red cuando los mineros agregan más potencia computacional. El tiempo promedio del bloque se compara con el tiempo de bloque esperado, y si el tiempo promedio de bloque es mayor, la dificultad disminuye en el encabezado del bloque. Si el tiempo promedio del bloque es inferior, la dificultad del encabezado del bloque se incrementará.

## Tamaño del bloque {#block-size}

Una importante nota final es que los bloques tienen limitaciones de tamaño. Cada bloque tiene un tamaño objetivo de 15 millones de gas, pero el tamaño de los bloques incrementará o disminuirá según las exigencias de la red, hasta el límite de 30 millones de gas por bloque (el doble del tamaño objetivo). La cantidad total de gas utilizada por todas las transacciones del bloque debe ser menor al límite de gas del bloque. Esto es importante porque garantiza que los bloques no pueden tener un tamaño arbitrario. Si los bloques pudieran ser del tamaño que quisiéramos, los nodos completos de menor rendimiento poco a poco dejarían de adaptarse a la red debido a los requisitos de espacio y velocidad.

## Más información {#further-reading}

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [Minando](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transacciones](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
