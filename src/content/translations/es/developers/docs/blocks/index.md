---
title: Bloques
description: "Una visión general de los bloques de la blockchain de Ethereum: su estructura de datos, por qué son necesarios y cómo se fabrican."
lang: es
sidebar: true
---

Los bloques son lotes de transacciones con un hash del bloque anterior en la cadena. Esta vincula bloques juntos (en una cadena) porque los hashes derivan criptográficamente de los datos del bloque. Esto previene el fraude, porque un cambio en cualquier bloque del historial invalidaría todos los siguientes bloques; asimismo, todos los hashes subsecuentes cambiarían y todos los que ejecutasen la blockchain lo notarían.

## Requisitos previos {#prerequisites}

Los bloques son muy fáciles de manejar incluso para los principiantes. Sin embargo, para ayudarte a comprender mejor esta página, te recomendamos leer primero [Cuentas](/en/developers/docs/accounts/), [Transacciones](/en/developers/docs/transactions/) y nuestra [introduccción a Ethereum](/en/developers/docs/intro-to-ethereum/).

<!--The content below was provided by Brian Gu with exception of "what's in a block"-->

## ¿Por qué se usan los bloques? {#why-blocks}

Organizamos las transacciones en bloques para garantizar que todos los participantes en la red Ethereum mantienen un estado sincronizado y están de acuerdo sobre el historial preciso de las transacciones. Esto significa que decenas (o cientos) de transacciones se confirman, acuerdan y sincronizan a la vez.

![Un diagrama muestra cómo la transacción en un bloque causa cambios de estado](./tx-block.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Al separar los commits (formación exitosa de una cadena), damos a todos los participantes de la red el tiempo suficiente para llegar a un consenso: aunque las solicitudes de transacción ocurren docenas de veces por segundo, los bloques en Ethereum se confirman aproximadamente una vez cada 15 segundos.

## ¿Cómo funcionan los bloques? {#how-blocks-work}

Para preservar el historial de transacciones, los bloques se ordenan estrictamente (cada nuevo bloque creado contiene una referencia a su bloque predecesor) y las transacciones dentro de los bloques también se ordenan de manera estricta. Excepto en casos raros o en un momento determinado, todos los participantes en la red están de acuerdo en el número exacto y en el historial de los bloques. Además, están trabajando para agrupar los requerimientos de transacción en tiempo real en el próximo bloque.

Una vez que un minero ensambla un bloque en la red, este se propaga al resto de la red; todos los nodos agregan este bloque al final de su blockchain y la minería continúa. El proceso exacto de ensamblaje de bloques (minería) y el proceso de compromiso/consenso se especifican actualmente mediante el protocolo denominado "Prueba de trabajo" de Ethereum.

### Una demostración visual {#a-visual-demo} <iframe width="100%" height="315" src="https://www.youtube.com/embed/_160oMzblY8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## El protocolo "Prueba de trabajo" {#proof-of-work-protocol}

El protocolo "Prueba de trabajo" significa lo siguiente:

- Los nodos de minería tienen que gastar una cantidad variable y sustancial de energía, tiempo y potencia computancional para producir un "certificado de legitimidad" por un bloque que ellos proponen para la red. Esto ayuda a proteger a la red de ataques de spam/denegación de servicios, entre otras cosas\*, ya que los certificados son costosos de producir.
- Otros mineros que se enteran de la existencia de un nuevo bloque con un certificado válido de legitimidad deben\* aceptar el nuevo bloque como el siguiente bloque canónico en la blockchain.
- La cantidad exacta de tiempo que necesita cualquier minero para producir este certificado es una variable aleatoria con alta variabilidad. Esto garantiza que es improbable* que dos mineros produzcan validaciones para un nuevo bloque propuesto simultáneamente; cuando un minero produce y propaga un nuevo bloque certificado, los demás pueden estar casi seguros de que el bloque será aceptado por la red como un nuevo bloque canónico en la blockchain sin conflicto* (aunque hay un protocolo para resolver los conflictos, así como en el caso de que dos blockchains certificadas se produzcan casi simultáneamente).

[Más sobre minería](/en/developers/docs/consensus-mechanisms/pow/mining/)

## ¿Qué hay en un bloque? {#block-anatomy}

- Timestamp: Es el horario en el que el bloque se minó.
- Número de bloque: Es la longitud de la blockchain en bloques.
- Dificultad: Es el esfuerzo que requirió minar el bloque.
- mixHash: Un identificador único para el bloque.
- Parent hash: Identificador único del bloque predecesor (así es como los bloques están enlazados en una cadena).
- Lista de transacciones: Son las transacciones incluidas en el bloque.
- State root: Es el estado completo del sistema; incluye los saldos de las cuentas, el almacenamiento de contratos, el código del contrato y los nonces de las cuentas.
- Nonce: Es un hash que cuando se combina con un mixHash, comprueba que el bloque ha pasado por la [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/).

## Tamaño del bloque {#block-size}

Una importante nota final es que los bloques tienen limitaciones de tamaño. Cada bloque tiene un límite de gas, que establecen colectivamente la red y los mineros: la cantidad total de gas consumida por todas las transacciones en el bloque debe ser inferior al límite de gas del bloque. Esto es importante porque garantiza que los bloques no pueden ser tan grandes como queramos. Si los bloques pudieran ser tan grandes como quisiéramos, los nodos completos de menor rendimiento poco a poco dejarían de estar al día con la red debido a los requisitos de espacio y velocidad. El límite de gas del bloque en el bloque 0 fue inicializado en 5000; cualquier minero que extraiga un nuevo bloque puede alterar el límite del gas hasta aproximadamente un 0,1% en cualquier dirección desde el límite de gas del bloque primario. El límite de gas a partir de noviembre de 2018 es de aproximadamente 8 000 000.

## Más información {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Minando](/en/developers/docs/consensus-mechanisms/pow/mining/)
- [Transacciones](/en/developers/docs/transactions/)
- [Gas](/en/developers/docs/gas/)
