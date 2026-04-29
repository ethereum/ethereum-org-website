---
title: "Transacciones — ETH.BUILD"
description: "Una demostración de cómo funcionan las transacciones de Ethereum utilizando la herramienta educativa ETH.BUILD. Vea cómo se construyen, firman y envían las transacciones en la red Ethereum."
lang: es
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transacciones"
format: tutorial
author: Austin Griffith
breadcrumb: "Transacciones (ETH.BUILD)"
---

Un tutorial de **Austin Griffith** que demuestra cómo funcionan las transacciones de Ethereum utilizando la herramienta de programación visual ETH.BUILD, cubriendo la estructura de la transacción, los precios del gas, la firma, la transmisión y el pool de transacciones.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=er-0ihqFQB0) publicada por Austin Griffith. Ha sido ligeramente editada para facilitar su lectura.*

#### Tarifas de transacción e incentivos para mineros (0:00) {#transaction-fees-and-miner-incentives-000}

Hoy en ETH.BUILD vamos a hablar sobre transacciones. Hasta ahora, hemos visto cómo estas transacciones se minan en bloques, se empaquetan en bloques y se minan en una cadena. Queremos hablar sobre qué incentiva al minero, aparte de la recompensa de bloque, a sacar nuestra transacción del pool de transacciones y ponerla en un bloque y minarla en la cadena, en comparación con otras personas en el pool. Podría haber miles de personas en el pool que están pujando, y esa puja se hace con esta tarifa.

Podría tener una tarifa en mi transacción que diga: "Soy Alice y le envío cinco a Bob, y mi nonce es uno para protección contra repeticiones". Además, quien mine esto puede quedarse con la tarifa. Básicamente, Alice le está enviando cinco a Bob, pero también le está pagando al minero cinco centavos para que lo ponga en la cadena.

#### Anatomía de una transacción de Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

¿Cómo se ve una transacción en Ethereum? Ya no tendremos a "Bob" y "Alice", tendremos direcciones. El valor estaría en Wei, no en ETH. Y la tarifa también estaría en Wei.

Entremos y veamos esta transacción. Tengo una cuenta con una frase mnemotécnica introducida, y estoy conectado a la red principal de Ethereum. También estoy ejecutando un módulo para obtener datos de precios de CoinMarketCap, por lo que puedo ver que cero punto uno y algo de ETH se traduce en unos veintitrés dólares.

#### Configuración de la transacción (2:25) {#setting-up-the-transaction-225}

Lo que voy a hacer es crear una transacción e incentivar al minero para que la recoja y la ponga en cadena. Tengo dos personajes: Alice y Bob. Alice va a enviar con su clave privada algo de valor a Bob. No hay un campo de dirección "de" (from) aquí porque, recuerde, estamos firmando y recuperando con nuestro par de claves. La transacción se empaqueta, se firma y luego se envía a través de la red. Nadie puede alterarla, y en el otro lado alguien puede recuperarla y descubrir que efectivamente fuimos nosotros quienes la firmamos. La dirección "de" se deriva.

#### Estrategia de precio del gas (4:20) {#gas-price-strategy-420}

El precio del gas está establecido en aproximadamente 4.1 Gwei por defecto, eso es 4.1 mil millones de Wei. Pero queremos ser más estratégicos al respecto y ver qué está pasando en cadena en este momento. Podemos ver que el último bloque tuvo 78 transacciones, y el precio del gas osciló desde aproximadamente 5 hasta un mínimo. Básicamente, necesitaríamos estar por encima de 5 para ser minados en ese bloque. Así que establezcamos el precio del gas en 5.001, solo un poco más.

#### Conversión a Wei (5:20) {#converting-to-wei-520}

Necesitamos hacer una conversión a Wei. En Ethereum, principalmente se manejan dos denominaciones: ETH, que es de la que la gente normalmente habla, y luego Wei, que es como una fracción muy pequeña de ETH. Un Gwei, lo que usamos para los precios del gas, está en el medio. La razón de esto es similar a por qué no andamos por ahí hablando en fracciones de centavos.

Alice tiene 0.18 ETH, y vamos a enviar 0.05 ETH a Bob. Ponemos un precio del gas de 5 Gwei.

#### Firma y transmisión (7:02) {#signing-and-broadcasting-702}

Cuando Alice decide firmar la transacción, sale disparada como una transacción firmada que puede viajar a través de la red. Nadie puede meterse con ella: en el otro lado, alguien puede derivar que fue Alice quien la firmó, y contiene toda la información sobre a quién queremos enviar y el gas que va al minero.

Tomamos esa transacción firmada y la conectamos a la función de envío del módulo de la cadena de bloques. Cuando hago clic en enviar, nos da un hash: el hash de la transacción. Básicamente, lo envié a la red distribuida y me devolvieron un hash de transacción. Sale a la red, y luego está este pool de transacciones: personas que pujan para que su transacción se apruebe.

#### Comprobación del bloque (8:41) {#checking-the-block-841}

Podemos consultar la cadena de bloques para buscar nuestra transacción. Efectivamente, ya ha sido minada. Podemos mirar el bloque, ordenar por precio del gas y encontrarnos a nosotros mismos. Ahí está nuestra transacción a un precio del gas de 5.001: Alice enviando a Bob, sin datos adicionales. Estamos ahí, a unas cuatro o cinco posiciones desde abajo.

#### Envío de datos con una transacción (9:54) {#sending-data-with-a-transaction-954}

Podemos enviar valor y pujar para que nuestra transacción sea reconocida en cadena. Pero veamos una cosa más: el campo de datos. Podemos enviar cosas junto con nuestra transacción. Va a estar en formato hexadecimal. Alice va a enviar otros seis dólares a Bob, y adjuntaremos un mensaje: "hey Bob". Podemos ver "hey Bob" convertido a hexadecimal.

Firmamos esa transacción, la enviamos a un minero, va a la red y obtenemos un hash de vuelta. Esperamos a que se mine, y así sucede. Cuando revisamos ese bloque, podemos ver nuestra transacción con los datos adjuntos.

#### Pool de transacciones y aumento de gas (12:43) {#transaction-pool-and-gas-bumping-1243}

Para una última demostración, puse una transacción en el pool con un precio del gas muy bajo, alrededor de 1.001 Gwei. Está ahí sin minar porque no estamos incentivando lo suficiente a los mineros. Podemos ver que la transacción está pendiente en el pool de transacciones. El pool tiene entre cien y trescientas transacciones, pero los últimos bloques que se están minando muestran que el precio del gas más pequeño es de aproximadamente 5.

Así que necesitamos volver a enviar esta transacción; vamos a subirla a 10. Eso es mucho más de lo necesario, pero volveremos a enviar la misma transacción con el mismo nonce pero con un precio del gas más alto. La red dice: "misma persona, misma transacción, dispuesta a pagar más". Es recogida y minada en el siguiente bloque.

#### Resumen (14:52) {#summary-1452}

Enviamos una transacción, pagamos algo de gas para incentivar al minero a ponerla en la cadena de bloques. También enviamos datos junto con una transacción: hay todo tipo de cosas realmente geniales que podemos hacer ahora que tenemos estos datos de llamada, y nos adentraremos en los contratos inteligentes y en muchas cosas divertidas más adelante.