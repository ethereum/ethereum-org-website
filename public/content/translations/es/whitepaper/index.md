---
title: Documento técnico de Ethereum
description: Un documento introductorio a Ethereum, publicado en 2013 antes de su lanzamiento.
lang: es
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Aunque tiene varios años, mantenemos el documento original a continuación porque sigue sirviendo como una referencia útil y una representación precisa de [Ethereum](/) y su visión._

## Una plataforma de contratos inteligentes y aplicaciones descentralizadas de próxima generación {#a-next-generation-smart-contract-and-decentralized-application-platform}

El desarrollo de Bitcoin por Satoshi Nakamoto en 2009 a menudo ha sido aclamado como un avance radical en el dinero y la moneda, siendo el primer ejemplo de un activo digital que simultáneamente no tiene respaldo ni "[valor intrínseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" y carece de un emisor o controlador centralizado. Sin embargo, otra parte del experimento de Bitcoin, posiblemente más importante, es la tecnología subyacente de la cadena de bloques como herramienta de consenso distribuido, y la atención está comenzando a desplazarse rápidamente hacia este otro aspecto de Bitcoin. Las aplicaciones alternativas comúnmente citadas de la tecnología de la cadena de bloques incluyen el uso de activos digitales en la cadena de bloques para representar monedas e instrumentos financieros personalizados ("[monedas coloreadas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), la propiedad de un dispositivo físico subyacente ("[propiedad inteligente](https://en.bitcoin.it/wiki/Smart_Property)"), activos no fungibles como nombres de dominio ("[Namecoin](http://namecoin.org)"), así como aplicaciones más complejas que implican que los activos digitales sean controlados directamente por un fragmento de código que implementa reglas arbitrarias ("[contratos inteligentes](https://nakamotoinstitute.org/smart-contracts/)") o incluso "[organizaciones autónomas descentralizadas](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) basadas en la cadena de bloques. Lo que Ethereum pretende proporcionar es una cadena de bloques con un lenguaje de programación Turing completo totalmente integrado que se puede utilizar para crear "contratos" que pueden emplearse para codificar funciones de transición de estado arbitrarias, permitiendo a los usuarios crear cualquiera de los sistemas descritos anteriormente, así como muchos otros que aún no hemos imaginado, simplemente escribiendo la lógica en unas pocas líneas de código.

## Introducción a Bitcoin y conceptos existentes {#introduction-to-bitcoin-and-existing-concepts}

### Historia {#history}

El concepto de moneda digital descentralizada, así como aplicaciones alternativas como los registros de propiedad, ha existido durante décadas. Los protocolos anónimos de dinero electrónico (e-cash) de las décadas de 1980 y 1990, que dependían en su mayoría de una primitiva criptográfica conocida como firma ciega de Chaum (Chaumian blinding), proporcionaban una moneda con un alto grado de privacidad, pero los protocolos fracasaron en gran medida a la hora de ganar tracción debido a su dependencia de un intermediario centralizado. En 1998, el [b-money](https://nakamotoinstitute.org/b-money/) de Wei Dai se convirtió en la primera propuesta en introducir la idea de crear dinero mediante la resolución de acertijos computacionales, así como el consenso descentralizado, pero la propuesta carecía de detalles sobre cómo podría implementarse realmente el consenso descentralizado. En 2005, Hal Finney introdujo el concepto de «[pruebas de trabajo reutilizables](https://nakamotoinstitute.org/finney/rpow/)», un sistema que utiliza ideas de b-money junto con los acertijos computacionalmente difíciles de Hashcash de Adam Back para crear un concepto de criptomoneda, pero una vez más se quedó corto respecto al ideal al depender de la computación confiable como backend. En 2009, Satoshi Nakamoto implementó por primera vez en la práctica una moneda descentralizada, combinando primitivas establecidas para gestionar la propiedad a través de la criptografía de clave pública con un algoritmo de consenso para realizar un seguimiento de quién posee las monedas, conocido como «prueba de trabajo (PoW)».

El mecanismo detrás de la prueba de trabajo (PoW) fue un gran avance en el espacio porque resolvió simultáneamente dos problemas. En primer lugar, proporcionó un algoritmo de consenso simple y moderadamente efectivo, permitiendo a los nodos de la red acordar colectivamente un conjunto de actualizaciones canónicas para el estado del libro mayor de Bitcoin. En segundo lugar, proporcionó un mecanismo para permitir la entrada libre al proceso de consenso, resolviendo el problema político de decidir quién puede influir en el consenso, al tiempo que prevenía simultáneamente los ataques Sybil. Lo hace sustituyendo una barrera formal de participación, como el requisito de estar registrado como una entidad única en una lista particular, por una barrera económica: el peso de un solo nodo en el proceso de votación de consenso es directamente proporcional a la potencia de cálculo que aporta el nodo. Desde entonces, se ha propuesto un enfoque alternativo llamado _prueba de participación (PoS)_, que calcula el peso de un nodo como proporcional a sus tenencias de moneda y no a sus recursos computacionales; la discusión sobre los méritos relativos de los dos enfoques está más allá del alcance de este documento técnico, pero cabe señalar que ambos enfoques pueden utilizarse para servir como la columna vertebral de una criptomoneda.

### Bitcoin como un sistema de transición de estado {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Desde un punto de vista técnico, el libro mayor de una criptomoneda como Bitcoin puede considerarse como un sistema de transición de estado, donde hay un «estado» que consiste en el estado de propiedad de todos los bitcoins existentes y una «función de transición de estado» que toma un estado y una transacción y genera un nuevo estado que es el resultado. En un sistema bancario estándar, por ejemplo, el estado es un balance general, una transacción es una solicitud para mover $X de A a B, y la función de transición de estado reduce el valor en la cuenta de A en $X y aumenta el valor en la cuenta de B en $X. Si la cuenta de A tiene menos de $X en primer lugar, la función de transición de estado devuelve un error. Por lo tanto, se puede definir formalmente:

```
APPLY(S,TX) -> S' or ERROR
```

En el sistema bancario definido anteriormente:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Pero:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

El «estado» en Bitcoin es la colección de todas las monedas (técnicamente, «salidas de transacciones no gastadas» o UTXO) que han sido acuñadas y aún no gastadas, donde cada UTXO tiene una denominación y un propietario (definido por una dirección de 20 bytes que es esencialmente una clave pública criptográfica<sup>[fn1](#notes)</sup>). Una transacción contiene una o más entradas, donde cada entrada contiene una referencia a un UTXO existente y una firma criptográfica producida por la clave privada asociada con la dirección del propietario, y una o más salidas, donde cada salida contiene un nuevo UTXO que se agregará al estado.

La función de transición de estado `APPLY(S,TX) -> S'` se puede definir aproximadamente de la siguiente manera:

<ol>
  <li>
    Para cada entrada en <code>TX</code>:
    <ul>
    <li>
        Si el UTXO referenciado no está en <code>S</code>, devuelve un error.
    </li>
    <li>
        Si la firma proporcionada no coincide con el propietario del UTXO, devuelve un error.
    </li>
    </ul>
  </li>
  <li>
    Si la suma de las denominaciones de todos los UTXO de entrada es menor que la suma de las denominaciones de todos los UTXO de salida, devuelve un error.
  </li>
  <li>
    Devuelve <code>S</code> con todos los UTXO de entrada eliminados y todos los UTXO de salida agregados.
  </li>
</ol>

La primera mitad del primer paso evita que los remitentes de transacciones gasten monedas que no existen, la segunda mitad del primer paso evita que los remitentes de transacciones gasten las monedas de otras personas, y el segundo paso impone la conservación del valor. Para utilizar esto como pago, el protocolo es el siguiente. Supongamos que Alice quiere enviar 11,7 BTC a Bob. Primero, Alice buscará un conjunto de UTXO disponibles que posea y que sumen al menos 11,7 BTC. Siendo realistas, Alice no podrá obtener exactamente 11,7 BTC; digamos que lo mínimo que puede obtener es 6+4+2=12. Luego crea una transacción con esas tres entradas y dos salidas. La primera salida será de 11,7 BTC con la dirección de Bob como propietario, y la segunda salida será el «cambio» restante de 0,3 BTC, siendo la propietaria la propia Alice.

### Minería {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Si tuviéramos acceso a un servicio centralizado confiable, este sistema sería trivial de implementar; simplemente podría codificarse exactamente como se describe, utilizando el disco duro de un servidor centralizado para realizar un seguimiento del estado. Sin embargo, con Bitcoin estamos intentando construir un sistema de moneda descentralizada, por lo que necesitaremos combinar el sistema de transacciones de estado con un sistema de consenso para garantizar que todos estén de acuerdo en el orden de las transacciones. El proceso de consenso descentralizado de Bitcoin requiere que los nodos de la red intenten continuamente producir paquetes de transacciones llamados «bloques». La red está diseñada para producir aproximadamente un bloque cada diez minutos, y cada bloque contiene una marca de tiempo, un nonce, una referencia (es decir, el hash) al bloque anterior y una lista de todas las transacciones que han tenido lugar desde el bloque anterior. Con el tiempo, esto crea una «cadena de bloques» persistente y en constante crecimiento que se actualiza constantemente para representar el último estado del libro mayor de Bitcoin.

El algoritmo para comprobar si un bloque es válido, expresado en este paradigma, es el siguiente:

1. Comprobar si el bloque anterior referenciado por el bloque existe y es válido.
2. Comprobar que la marca de tiempo del bloque sea mayor que la del bloque anterior<sup>[fn2](#notes)</sup> y menor a 2 horas en el futuro.
3. Comprobar que la prueba de trabajo (PoW) en el bloque sea válida.
4. Sea `S[0]` el estado al final del bloque anterior.
5. Supongamos que `TX` es la lista de transacciones del bloque con `n` transacciones. Para todo `i` en `0...n-1`, establecer `S[i+1] = APPLY(S[i],TX[i])` Si alguna aplicación devuelve un error, salir y devolver falso.
6. Devolver verdadero y registrar `S[n]` como el estado al final de este bloque.

Esencialmente, cada transacción en el bloque debe proporcionar una transición de estado válida desde lo que era el estado canónico antes de que se ejecutara la transacción a un nuevo estado. Tenga en cuenta que el estado no está codificado en el bloque de ninguna manera; es puramente una abstracción que debe recordar el nodo validador y solo se puede calcular (de forma segura) para cualquier bloque comenzando desde el estado génesis y aplicando secuencialmente cada transacción en cada bloque. Además, tenga en cuenta que el orden en el que el minero incluye las transacciones en el bloque es importante; si hay dos transacciones A y B en un bloque de tal manera que B gasta un UTXO creado por A, entonces el bloque será válido si A viene antes que B, pero no de otra manera.

La única condición de validez presente en la lista anterior que no se encuentra en otros sistemas es el requisito de la «prueba de trabajo (PoW)». La condición precisa es que el hash doble SHA-256 de cada bloque, tratado como un número de 256 bits, debe ser menor que un objetivo ajustado dinámicamente, que en el momento de escribir este artículo es de aproximadamente 2<sup>187</sup>. El propósito de esto es hacer que la creación de bloques sea computacionalmente «difícil», evitando así que los atacantes Sybil rehagan toda la cadena de bloques a su favor. Debido a que SHA-256 está diseñado para ser una función pseudoaleatoria completamente impredecible, la única forma de crear un bloque válido es simplemente mediante prueba y error, incrementando repetidamente el nonce y viendo si el nuevo hash coincide.

Con el objetivo actual de ~2<sup>187</sup>, la red debe realizar un promedio de ~2<sup>69</sup> intentos antes de encontrar un bloque válido; en general, la red recalibra el objetivo cada 2016 bloques para que, en promedio, algún nodo de la red produzca un nuevo bloque cada diez minutos. Para compensar a los mineros por este trabajo computacional, el minero de cada bloque tiene derecho a incluir una transacción que le otorgue 25 BTC de la nada. Además, si alguna transacción tiene una denominación total mayor en sus entradas que en sus salidas, la diferencia también va al minero como una «tarifa de transacción». Por cierto, este es también el único mecanismo por el cual se emiten BTC; el estado génesis no contenía ninguna moneda en absoluto.

Para comprender mejor el propósito de la minería, examinemos qué sucede en el caso de un atacante malicioso. Dado que se sabe que la criptografía subyacente de Bitcoin es segura, el atacante apuntará a la única parte del sistema Bitcoin que no está protegida directamente por la criptografía: el orden de las transacciones. La estrategia del atacante es simple:

1. Enviar 100 BTC a un comerciante a cambio de algún producto (preferiblemente un bien digital de entrega rápida).
2. Esperar la entrega del producto.
3. Producir otra transacción enviándose los mismos 100 BTC a sí mismo.
4. Intentar convencer a la red de que su transacción hacia sí mismo fue la que se realizó primero.

Una vez que se ha llevado a cabo el paso (1), después de unos minutos, algún minero incluirá la transacción en un bloque, digamos el bloque número 270000. Después de aproximadamente una hora, se habrán agregado cinco bloques más a la cadena después de ese bloque, y cada uno de esos bloques apuntará indirectamente a la transacción y, por lo tanto, la «confirmará». En este punto, el comerciante aceptará el pago como finalizado y entregará el producto; dado que asumimos que se trata de un bien digital, la entrega es instantánea. Ahora, el atacante crea otra transacción enviándose los 100 BTC a sí mismo. Si el atacante simplemente la lanza a la red, la transacción no será procesada; los mineros intentarán ejecutar `APPLY(S,TX)` y notarán que `TX` consume un UTXO que ya no está en el estado. Así que, en su lugar, el atacante crea una «bifurcación» de la cadena de bloques, comenzando por minar otra versión del bloque 270000 que apunta al mismo bloque 269999 como padre, pero con la nueva transacción en lugar de la antigua. Debido a que los datos del bloque son diferentes, esto requiere rehacer la prueba de trabajo (PoW). Además, la nueva versión del bloque 270000 del atacante tiene un hash diferente, por lo que los bloques originales 270001 a 270005 no «apuntan» a él; por lo tanto, la cadena original y la nueva cadena del atacante están completamente separadas. La regla es que en una bifurcación, la cadena de bloques más larga se considera la verdadera, por lo que los mineros legítimos trabajarán en la cadena 270005 mientras que el atacante solo está trabajando en la cadena 270000. Para que el atacante haga que su cadena de bloques sea la más larga, necesitaría tener más potencia computacional que el resto de la red combinada para poder alcanzarla (de ahí el «ataque del 51%»).

### Árboles de Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Izquierda: basta con presentar solo un pequeño número de nodos en un árbol de Merkle para dar una prueba de la validez de una rama._

_Derecha: cualquier intento de cambiar cualquier parte del árbol de Merkle conducirá eventualmente a una inconsistencia en algún lugar más arriba en la cadena._

Una característica importante de escalabilidad de Bitcoin es que el bloque se almacena en una estructura de datos de múltiples niveles. El «hash» de un bloque es en realidad solo el hash del encabezado del bloque, un fragmento de datos de aproximadamente 200 bytes que contiene la marca de tiempo, el nonce, el hash del bloque anterior y el hash raíz de una estructura de datos llamada árbol de Merkle que almacena todas las transacciones en el bloque. Un árbol de Merkle es un tipo de árbol binario, compuesto por un conjunto de nodos con una gran cantidad de nodos hoja en la parte inferior del árbol que contienen los datos subyacentes, un conjunto de nodos intermedios donde cada nodo es el hash de sus dos hijos y, finalmente, un único nodo raíz, también formado a partir del hash de sus dos hijos, que representa la «cima» del árbol. El propósito del árbol de Merkle es permitir que los datos de un bloque se entreguen de forma fragmentada: un nodo puede descargar solo el encabezado de un bloque de una fuente, la pequeña parte del árbol relevante para ellos de otra fuente, y aun así tener la seguridad de que todos los datos son correctos. La razón por la que esto funciona es que los hashes se propagan hacia arriba: si un usuario malintencionado intenta intercambiar una transacción falsa en la parte inferior de un árbol de Merkle, este cambio provocará un cambio en el nodo superior, y luego un cambio en el nodo superior a ese, cambiando finalmente la raíz del árbol y, por lo tanto, el hash del bloque, lo que hará que el protocolo lo registre como un bloque completamente diferente (casi con certeza con una prueba de trabajo (PoW) inválida).

El protocolo del árbol de Merkle es posiblemente esencial para la sostenibilidad a largo plazo. Un «nodo completo» en la red Bitcoin, uno que almacena y procesa la totalidad de cada bloque, ocupa aproximadamente 15 GB de espacio en disco en la red Bitcoin a partir de abril de 2014, y está creciendo a un ritmo de más de un gigabyte por mes. Actualmente, esto es viable para algunas computadoras de escritorio y no para teléfonos, y más adelante en el futuro solo las empresas y los aficionados podrán participar. Un protocolo conocido como «verificación de pago simplificada» (SPV) permite que exista otra clase de nodos, llamados «nodos ligeros», que descargan los encabezados de los bloques, verifican la prueba de trabajo (PoW) en los encabezados de los bloques y luego descargan solo las «ramas» asociadas con las transacciones que son relevantes para ellos. Esto permite a los nodos ligeros determinar con una fuerte garantía de seguridad cuál es el estado de cualquier transacción de Bitcoin y su saldo actual, mientras descargan solo una porción muy pequeña de toda la cadena de bloques.

### Aplicaciones alternativas de la cadena de bloques {#alternative-blockchain-applications}

La idea de tomar el concepto subyacente de la cadena de bloques y aplicarlo a otros conceptos también tiene una larga historia. En 2005, Nick Szabo presentó el concepto de «[títulos de propiedad seguros con autoridad del propietario](https://nakamotoinstitute.org/library/secure-property-titles/)», un documento que describe cómo los «nuevos avances en la tecnología de bases de datos replicadas» permitirán un sistema basado en la cadena de bloques para almacenar un registro de quién posee qué tierra, creando un marco elaborado que incluye conceptos como la colonización (homesteading), la posesión adversa y el impuesto sobre la tierra georgiano. Sin embargo, lamentablemente no había ningún sistema de base de datos replicada eficaz disponible en ese momento, por lo que el protocolo nunca se implementó en la práctica. Después de 2009, sin embargo, una vez que se desarrolló el consenso descentralizado de Bitcoin, comenzaron a surgir rápidamente una serie de aplicaciones alternativas.

- **Namecoin**: creado en 2010, [Namecoin](https://namecoin.org/) se describe mejor como una base de datos de registro de nombres descentralizada. En protocolos descentralizados como Tor, Bitcoin y BitMessage, debe haber alguna forma de identificar las cuentas para que otras personas puedan interactuar con ellas, pero en todas las soluciones existentes el único tipo de identificador disponible es un hash pseudoaleatorio como `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealmente, a uno le gustaría poder tener una cuenta con un nombre como «george». Sin embargo, el problema es que si una persona puede crear una cuenta llamada «george», entonces otra persona puede usar el mismo proceso para registrar «george» para sí misma y hacerse pasar por ella. La única solución es un paradigma de primero en registrar (first-to-file), donde el primer solicitante tiene éxito y el segundo fracasa: un problema perfectamente adecuado para el protocolo de consenso de Bitcoin. Namecoin es la implementación más antigua y exitosa de un sistema de registro de nombres que utiliza tal idea.
- **Monedas coloreadas (Colored coins)**: el propósito de las [monedas coloreadas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) es servir como un protocolo para permitir a las personas crear sus propias monedas digitales (o, en el importante caso trivial de una moneda con una unidad, tokens digitales) en la cadena de bloques de Bitcoin. En el protocolo de monedas coloreadas, uno «emite» una nueva moneda asignando públicamente un color a un UTXO de Bitcoin específico, y el protocolo define recursivamente que el color de otros UTXO sea el mismo que el color de las entradas que gastó la transacción que los creó (se aplican algunas reglas especiales en el caso de entradas de colores mixtos). Esto permite a los usuarios mantener billeteras que contienen solo UTXO de un color específico y enviarlos de manera muy similar a los bitcoins regulares, retrocediendo a través de la cadena de bloques para determinar el color de cualquier UTXO que reciban.
- **Metacoins**: la idea detrás de una metacoin es tener un protocolo que viva sobre Bitcoin, utilizando transacciones de Bitcoin para almacenar transacciones de metacoin pero teniendo una función de transición de estado diferente, `APPLY'`. Debido a que el protocolo de metacoin no puede evitar que aparezcan transacciones de metacoin no válidas en la cadena de bloques de Bitcoin, se agrega una regla de que si `APPLY'(S,TX)` devuelve un error, el protocolo vuelve por defecto a `APPLY'(S,TX) = S`. Esto proporciona un mecanismo fácil para crear un protocolo de criptomoneda arbitrario, potencialmente con características avanzadas que no se pueden implementar dentro del propio Bitcoin, pero con un costo de desarrollo muy bajo ya que las complejidades de la minería y la red ya son manejadas por el protocolo de Bitcoin. Las metacoins se han utilizado para implementar algunas clases de contratos financieros, registro de nombres e intercambio descentralizado.

Por lo tanto, en general, hay dos enfoques para construir un protocolo de consenso: construir una red independiente y construir un protocolo sobre Bitcoin. El primer enfoque, aunque razonablemente exitoso en el caso de aplicaciones como Namecoin, es difícil de implementar; cada implementación individual necesita iniciar (bootstrap) una cadena de bloques independiente, así como construir y probar todo el código de red y de transición de estado necesario. Además, predecimos que el conjunto de aplicaciones para la tecnología de consenso descentralizado seguirá una distribución de ley de potencias donde la gran mayoría de las aplicaciones serían demasiado pequeñas para justificar su propia cadena de bloques, y notamos que existen grandes clases de aplicaciones descentralizadas, particularmente organizaciones autónomas descentralizadas, que necesitan interactuar entre sí.

El enfoque basado en Bitcoin, por otro lado, tiene el defecto de que no hereda las características de verificación de pago simplificada de Bitcoin. SPV funciona para Bitcoin porque puede usar la profundidad de la cadena de bloques como un indicador de validez; en algún momento, una vez que los ancestros de una transacción retroceden lo suficiente, es seguro decir que formaban parte legítimamente del estado. Los metaprotocolos basados en la cadena de bloques, por otro lado, no pueden obligar a la cadena de bloques a no incluir transacciones que no sean válidas dentro del contexto de sus propios protocolos. Por lo tanto, una implementación de metaprotocolo SPV completamente segura necesitaría escanear hacia atrás hasta el principio de la cadena de bloques de Bitcoin para determinar si ciertas transacciones son válidas o no. Actualmente, todas las implementaciones «ligeras» de metaprotocolos basados en Bitcoin dependen de un servidor confiable para proporcionar los datos, lo que podría decirse que es un resultado muy subóptimo, especialmente cuando uno de los propósitos principales de una criptomoneda es eliminar la necesidad de confianza.

### Scripting {#scripting}

Incluso sin ninguna extensión, el protocolo de Bitcoin en realidad facilita una versión débil del concepto de «contratos inteligentes». Los UTXO en Bitcoin pueden ser propiedad no solo de una clave pública, sino también de un script más complicado expresado en un lenguaje de programación simple basado en pila. En este paradigma, una transacción que gasta ese UTXO debe proporcionar datos que satisfagan el script. De hecho, incluso el mecanismo básico de propiedad de clave pública se implementa a través de un script: el script toma una firma de curva elíptica como entrada, la verifica contra la transacción y la dirección que posee el UTXO, y devuelve 1 si la verificación es exitosa y 0 en caso contrario. Existen otros scripts más complicados para varios casos de uso adicionales. Por ejemplo, se puede construir un script que requiera firmas de dos de tres claves privadas dadas para validar («multifirma»), una configuración útil para cuentas corporativas, cuentas de ahorro seguras y algunas situaciones de depósito en garantía (escrow) de comerciantes. Los scripts también se pueden usar para pagar recompensas por soluciones a problemas computacionales, e incluso se puede construir un script que diga algo como «este UTXO de Bitcoin es tuyo si puedes proporcionar una prueba SPV de que me enviaste una transacción de Dogecoin de esta denominación», permitiendo esencialmente el intercambio descentralizado entre criptomonedas.

Sin embargo, el lenguaje de scripting tal como se implementa en Bitcoin tiene varias limitaciones importantes:

- **Falta de completitud de Turing**: es decir, si bien hay un gran subconjunto de computación que admite el lenguaje de scripting de Bitcoin, no admite casi todo. La categoría principal que falta son los bucles. Esto se hace para evitar bucles infinitos durante la verificación de transacciones; teóricamente es un obstáculo superable para los programadores de scripts, ya que cualquier bucle se puede simular simplemente repitiendo el código subyacente muchas veces con una declaración if, pero conduce a scripts que son muy ineficientes en cuanto a espacio. Por ejemplo, implementar un algoritmo de firma de curva elíptica alternativo probablemente requeriría 256 rondas de multiplicación repetidas, todas incluidas individualmente en el código.
- **Ceguera de valor (Value-blindness)**: no hay forma de que un script UTXO proporcione un control detallado sobre la cantidad que se puede retirar. Por ejemplo, un caso de uso poderoso de un contrato de oráculo sería un contrato de cobertura, donde A y B aportan $1000 en BTC y después de 30 días el script envía $1000 en BTC a A y el resto a B. Esto requeriría un oráculo para determinar el valor de 1 BTC en USD, pero incluso entonces es una mejora masiva en términos de confianza y requisitos de infraestructura sobre las soluciones totalmente centralizadas que están disponibles ahora. Sin embargo, debido a que los UTXO son de todo o nada, la única forma de lograr esto es a través del truco muy ineficiente de tener muchos UTXO de diferentes denominaciones (por ejemplo, un UTXO de 2<sup>k</sup> por cada k hasta 30) y hacer que el oráculo elija qué UTXO enviar a A y cuál a B.
- **Falta de estado**: los UTXO pueden gastarse o no gastarse; no hay oportunidad para contratos de múltiples etapas o scripts que mantengan ningún otro estado interno más allá de eso. Esto hace que sea difícil crear contratos de opciones de múltiples etapas, ofertas de intercambio descentralizado o protocolos de compromiso criptográfico de dos etapas (necesarios para recompensas computacionales seguras). También significa que los UTXO solo se pueden usar para construir contratos simples y únicos, y no contratos «con estado» más complejos, como organizaciones descentralizadas, y hace que los metaprotocolos sean difíciles de implementar. El estado binario combinado con la ceguera de valor también significa que otra aplicación importante, los límites de retiro, es imposible.
- **Ceguera de la cadena de bloques (Blockchain-blindness)**: los UTXO son ciegos a los datos de la cadena de bloques, como el nonce, la marca de tiempo y el hash del bloque anterior. Esto limita severamente las aplicaciones en los juegos de azar y en varias otras categorías, al privar al lenguaje de scripting de una fuente potencialmente valiosa de aleatoriedad.

Por lo tanto, vemos tres enfoques para construir aplicaciones avanzadas sobre criptomonedas: construir una nueva cadena de bloques, usar scripting sobre Bitcoin y construir un metaprotocolo sobre Bitcoin. Construir una nueva cadena de bloques permite una libertad ilimitada en la construcción de un conjunto de características, pero a costa del tiempo de desarrollo, el esfuerzo de inicio (bootstrapping) y la seguridad. El uso de scripting es fácil de implementar y estandarizar, pero tiene capacidades muy limitadas, y los metaprotocolos, aunque fáciles, sufren de fallas en la escalabilidad. Con Ethereum, tenemos la intención de construir un marco alternativo que proporcione ganancias aún mayores en la facilidad de desarrollo, así como propiedades de cliente ligero aún más fuertes, al mismo tiempo que permite a las aplicaciones compartir un entorno económico y la seguridad de la cadena de bloques.

## Ethereum {#ethereum}

La intención de Ethereum es crear un protocolo alternativo para construir aplicaciones descentralizadas (dapps), proporcionando un conjunto diferente de compensaciones que creemos que será muy útil para una gran clase de aplicaciones descentralizadas, con especial énfasis en situaciones donde el tiempo de desarrollo rápido, la seguridad para aplicaciones pequeñas y raramente utilizadas, y la capacidad de diferentes aplicaciones para interactuar de manera muy eficiente, son importantes. Ethereum hace esto construyendo lo que es esencialmente la capa fundamental abstracta definitiva: una cadena de bloques con un lenguaje de programación Turing completo incorporado, lo que permite a cualquier persona escribir contratos inteligentes y aplicaciones descentralizadas donde pueden crear sus propias reglas arbitrarias para la propiedad, los formatos de transacción y las funciones de transición de estado. Una versión básica de Namecoin se puede escribir en dos líneas de código, y otros protocolos como monedas y sistemas de reputación se pueden construir en menos de veinte. Los contratos inteligentes, "cajas" criptográficas que contienen valor y solo lo desbloquean si se cumplen ciertas condiciones, también se pueden construir sobre la plataforma, con un poder enormemente mayor que el ofrecido por el scripting de Bitcoin debido a los poderes adicionales de la completitud de Turing, la conciencia de valor, la conciencia de la cadena de bloques y el estado.

### Cuentas de Ethereum {#ethereum-accounts}

En Ethereum, el estado está compuesto por objetos llamados "cuentas", donde cada cuenta tiene una dirección de 20 bytes y las transacciones de estado son transferencias directas de valor e información entre cuentas. Una cuenta de Ethereum contiene cuatro campos:

- El **nonce**, un contador utilizado para asegurarse de que cada transacción solo se pueda procesar una vez
- El **saldo de ether** actual de la cuenta
- El **código del contrato** de la cuenta, si está presente
- El **almacenamiento** de la cuenta (vacío por defecto)

El "ether" es el principal criptocombustible interno de Ethereum, y se utiliza para pagar las tarifas de transacción. En general, hay dos tipos de cuentas: **cuentas de propiedad externa**, controladas por claves privadas, y **cuentas de contrato**, controladas por su código de contrato. Una cuenta de propiedad externa no tiene código, y uno puede enviar mensajes desde una cuenta de propiedad externa creando y firmando una transacción; en una cuenta de contrato, cada vez que la cuenta de contrato recibe un mensaje, su código se activa, lo que le permite leer y escribir en el almacenamiento interno y enviar otros mensajes o crear contratos a su vez.

Tenga en cuenta que los "contratos" en Ethereum no deben verse como algo que deba "cumplirse" o "acatarse"; más bien, son más como "agentes autónomos" que viven dentro del entorno de ejecución de Ethereum, siempre ejecutando un fragmento de código específico cuando son "invocados" por un mensaje o transacción, y teniendo control directo sobre su propio saldo de ether y su propio almacén de clave/valor para realizar un seguimiento de las variables persistentes.

### Mensajes y transacciones {#messages-and-transactions}

El término "transacción" se utiliza en Ethereum para referirse al paquete de datos firmado que almacena un mensaje que se enviará desde una cuenta de propiedad externa. Las transacciones contienen:

- El destinatario del mensaje
- Una firma que identifica al remitente
- La cantidad de ether a transferir del remitente al destinatario
- Un campo de datos opcional
- Un valor `STARTGAS`, que representa el número máximo de pasos computacionales que se permite que tome la ejecución de la transacción
- Un valor `GASPRICE`, que representa la tarifa que el remitente paga por paso computacional

Los tres primeros son campos estándar esperados en cualquier criptomoneda. El campo de datos no tiene ninguna función por defecto, pero la máquina virtual tiene un código de operación mediante el cual un contrato puede acceder a los datos; como caso de uso de ejemplo, si un contrato funciona como un servicio de registro de dominios en la cadena de bloques, entonces puede desear interpretar los datos que se le pasan como si contuvieran dos "campos", siendo el primer campo un dominio a registrar y el segundo campo la dirección IP a la que registrarlo. El contrato leería estos valores de los datos del mensaje y los colocaría adecuadamente en el almacenamiento.

Los campos `STARTGAS` y `GASPRICE` son cruciales para el modelo anti-denegación de servicio de Ethereum. Para evitar bucles infinitos accidentales u hostiles u otro desperdicio computacional en el código, se requiere que cada transacción establezca un límite de cuántos pasos computacionales de ejecución de código puede usar. La unidad fundamental de computación es el "gas"; por lo general, un paso computacional cuesta 1 gas, pero algunas operaciones cuestan mayores cantidades de gas porque son más costosas computacionalmente, o aumentan la cantidad de datos que deben almacenarse como parte del estado. También hay una tarifa de 5 gas por cada byte en los datos de la transacción. La intención del sistema de tarifas es requerir que un atacante pague proporcionalmente por cada recurso que consume, incluyendo computación, ancho de banda y almacenamiento; por lo tanto, cualquier transacción que lleve a la red a consumir una mayor cantidad de cualquiera de estos recursos debe tener una tarifa de gas aproximadamente proporcional al incremento.

### Mensajes {#messages}

Los contratos tienen la capacidad de enviar "mensajes" a otros contratos. Los mensajes son objetos virtuales que nunca se serializan y existen solo en el entorno de ejecución de Ethereum. Un mensaje contiene:

- El remitente del mensaje (implícito)
- El destinatario del mensaje
- La cantidad de ether a transferir junto con el mensaje
- Un campo de datos opcional
- Un valor `STARTGAS`

Esencialmente, un mensaje es como una transacción, excepto que es producido por un contrato y no por un actor externo. Un mensaje se produce cuando un contrato que actualmente ejecuta código ejecuta el código de operación `CALL`, que produce y ejecuta un mensaje. Al igual que una transacción, un mensaje hace que la cuenta receptora ejecute su código. Por lo tanto, los contratos pueden tener relaciones con otros contratos exactamente de la misma manera que los actores externos.

Tenga en cuenta que la asignación de gas asignada por una transacción o contrato se aplica al gas total consumido por esa transacción y todas las subejecuciones. Por ejemplo, si un actor externo A envía una transacción a B con 1000 gas, y B consume 600 gas antes de enviar un mensaje a C, y la ejecución interna de C consume 300 gas antes de regresar, entonces B puede gastar otros 100 gas antes de quedarse sin gas.

### Función de transición de estado de Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

La función de transición de estado de Ethereum, `APPLY(S,TX) -> S'` se puede definir de la siguiente manera:

1. Comprobar si la transacción está bien formada (es decir, tiene el número correcto de valores), la firma es válida y el nonce coincide con el nonce en la cuenta del remitente. Si no es así, devolver un error.
2. Calcular la tarifa de transacción como `STARTGAS * GASPRICE`, y determinar la dirección de envío a partir de la firma. Restar la tarifa del saldo de la cuenta del remitente e incrementar el nonce del remitente. Si no hay suficiente saldo para gastar, devolver un error.
3. Inicializar `GAS = STARTGAS`, y restar una cierta cantidad de gas por byte para pagar los bytes en la transacción.
4. Transferir el valor de la transacción de la cuenta del remitente a la cuenta receptora. Si la cuenta receptora aún no existe, crearla. Si la cuenta receptora es un contrato, ejecutar el código del contrato hasta su finalización o hasta que la ejecución se quede sin gas.
5. Si la transferencia de valor falló porque el remitente no tenía suficiente dinero, o la ejecución del código se quedó sin gas, revertir todos los cambios de estado excepto el pago de las tarifas, y agregar las tarifas a la cuenta del minero.
6. De lo contrario, reembolsar las tarifas por todo el gas restante al remitente, y enviar las tarifas pagadas por el gas consumido al minero.

Por ejemplo, supongamos que el código del contrato es:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Tenga en cuenta que en realidad el código del contrato está escrito en el código EVM de bajo nivel; este ejemplo está escrito en Serpent, uno de nuestros lenguajes de alto nivel, para mayor claridad, y se puede compilar a código EVM. Supongamos que el almacenamiento del contrato comienza vacío, y se envía una transacción con un valor de 10 ether, 2000 de gas, un precio de gas de 0.001 ether y 64 bytes de datos, con los bytes 0-31 representando el número `2` y los bytes 32-63 representando la cadena `CHARLIE`<sup>[fn3](#notes)</sup>. El proceso para la función de transición de estado en este caso es el siguiente:

1. Comprobar que la transacción es válida y está bien formada.
2. Comprobar que el remitente de la transacción tiene al menos 2000 \* 0.001 = 2 ether. Si es así, restar 2 ether de la cuenta del remitente.
3. Inicializar gas = 2000; asumiendo que la transacción tiene 170 bytes de longitud y la tarifa por byte es 5, restar 850 para que queden 1150 de gas.
4. Restar 10 ether más de la cuenta del remitente, y agregarlo a la cuenta del contrato.
5. Ejecutar el código. En este caso, esto es simple: comprueba si el almacenamiento del contrato en el índice `2` está en uso, nota que no lo está, y por lo tanto establece el almacenamiento en el índice `2` al valor `CHARLIE`. Supongamos que esto toma 187 de gas, por lo que la cantidad restante de gas es 1150 - 187 = 963
6. Agregar 963 \* 0.001 = 0.963 ether de vuelta a la cuenta del remitente, y devolver el estado resultante.

Si no hubiera ningún contrato en el extremo receptor de la transacción, entonces la tarifa de transacción total sería simplemente igual al `GASPRICE` proporcionado multiplicado por la longitud de la transacción en bytes, y los datos enviados junto con la transacción serían irrelevantes.

Tenga en cuenta que los mensajes funcionan de manera equivalente a las transacciones en términos de reversiones: si la ejecución de un mensaje se queda sin gas, entonces la ejecución de ese mensaje, y todas las demás ejecuciones desencadenadas por esa ejecución, se revierten, pero las ejecuciones principales no necesitan revertirse. Esto significa que es "seguro" para un contrato llamar a otro contrato, ya que si A llama a B con G de gas, entonces se garantiza que la ejecución de A perderá como máximo G de gas. Finalmente, tenga en cuenta que hay un código de operación, `CREATE`, que crea un contrato; su mecánica de ejecución es generalmente similar a `CALL`, con la excepción de que la salida de la ejecución determina el código de un contrato recién creado.

### Ejecución de código {#code-execution}

El código en los contratos de Ethereum está escrito en un lenguaje de código de bytes basado en pila de bajo nivel, denominado "código de máquina virtual de Ethereum" o "código EVM". El código consta de una serie de bytes, donde cada byte representa una operación. En general, la ejecución del código es un bucle infinito que consiste en llevar a cabo repetidamente la operación en el contador de programa actual (que comienza en cero) y luego incrementar el contador de programa en uno, hasta que se alcanza el final del código o se detecta un error o una instrucción `STOP` o `RETURN`. Las operaciones tienen acceso a tres tipos de espacio en los que almacenar datos:

- La **pila**, un contenedor de último en entrar, primero en salir al que se pueden empujar (push) y sacar (pop) valores
- La **memoria**, una matriz de bytes infinitamente expandible
- El **almacenamiento** a largo plazo del contrato, un almacén de clave/valor. A diferencia de la pila y la memoria, que se restablecen después de que finaliza la computación, el almacenamiento persiste a largo plazo.

El código también puede acceder al valor, al remitente y a los datos del mensaje entrante, así como a los datos del encabezado del bloque, y el código también puede devolver una matriz de bytes de datos como salida.

El modelo de ejecución formal del código EVM es sorprendentemente simple. Mientras la máquina virtual de Ethereum se está ejecutando, su estado computacional completo puede definirse mediante la tupla `(block_state, transaction, message, code, memory, stack, pc, gas)`, donde `block_state` es el estado global que contiene todas las cuentas e incluye saldos y almacenamiento. Al comienzo de cada ronda de ejecución, la instrucción actual se encuentra tomando el `pc`-ésimo byte de `code` (o 0 si `pc >= len(code)`), y cada instrucción tiene su propia definición en términos de cómo afecta a la tupla. Por ejemplo, `ADD` saca dos elementos de la pila y empuja su suma, reduce `gas` en 1 e incrementa `pc` en 1, y `SSTORE` saca los dos elementos superiores de la pila e inserta el segundo elemento en el almacenamiento del contrato en el índice especificado por el primer elemento. Aunque hay muchas formas de optimizar la ejecución de la máquina virtual de Ethereum a través de la compilación justo a tiempo (JIT), una implementación básica de Ethereum se puede hacer en unos pocos cientos de líneas de código.

### Cadena de bloques y minería {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

La cadena de bloques de Ethereum es en muchos sentidos similar a la cadena de bloques de Bitcoin, aunque tiene algunas diferencias. La principal diferencia entre Ethereum y Bitcoin con respecto a la arquitectura de la cadena de bloques es que, a diferencia de Bitcoin, los bloques de Ethereum contienen una copia tanto de la lista de transacciones como del estado más reciente. Aparte de eso, otros dos valores, el número de bloque y la dificultad, también se almacenan en el bloque. El algoritmo básico de validación de bloques en Ethereum es el siguiente:

1. Comprobar si el bloque anterior referenciado existe y es válido.
2. Comprobar que la marca de tiempo del bloque es mayor que la del bloque anterior referenciado y menor a 15 minutos en el futuro
3. Comprobar que el número de bloque, la dificultad, la raíz de la transacción, la raíz de los tíos (uncle root) y el límite de gas (varios conceptos de bajo nivel específicos de Ethereum) son válidos.
4. Comprobar que la prueba de trabajo (PoW) en el bloque es válida.
5. Sea `S[0]` el estado al final del bloque anterior.
6. Sea `TX` la lista de transacciones del bloque, con `n` transacciones. Para todo `i` en `0...n-1`, establecer `S[i+1] = APPLY(S[i],TX[i])`. Si alguna aplicación devuelve un error, o si el gas total consumido en el bloque hasta este punto excede el `GASLIMIT`, devolver un error.
7. Sea `S_FINAL` igual a `S[n]`, pero agregando la recompensa de bloque pagada al minero.
8. Comprobar si la raíz del árbol de Merkle del estado `S_FINAL` es igual a la raíz del estado final proporcionada en el encabezado del bloque. Si lo es, el bloque es válido; de lo contrario, no es válido.

El enfoque puede parecer altamente ineficiente a primera vista, porque necesita almacenar todo el estado con cada bloque, pero en realidad la eficiencia debería ser comparable a la de Bitcoin. La razón es que el estado se almacena en la estructura de árbol, y después de cada bloque solo una pequeña parte del árbol necesita ser cambiada. Por lo tanto, en general, entre dos bloques adyacentes la gran mayoría del árbol debería ser la misma, y por lo tanto los datos se pueden almacenar una vez y referenciar dos veces usando punteros (es decir, hashes de subárboles). Se utiliza un tipo especial de árbol conocido como "árbol Patricia" para lograr esto, incluyendo una modificación al concepto de árbol de Merkle que permite que los nodos se inserten y eliminen, y no solo se cambien, de manera eficiente. Además, debido a que toda la información de estado es parte del último bloque, no hay necesidad de almacenar todo el historial de la cadena de bloques, una estrategia que, si pudiera aplicarse a Bitcoin, se puede calcular que proporcionaría un ahorro de espacio de 5 a 20 veces.

Una pregunta frecuente es "dónde" se ejecuta el código del contrato, en términos de hardware físico. Esto tiene una respuesta simple: el proceso de ejecución del código del contrato es parte de la definición de la función de transición de estado, que es parte del algoritmo de validación de bloques, por lo que si se agrega una transacción al bloque `B`, la ejecución del código generada por esa transacción será ejecutada por todos los nodos, ahora y en el futuro, que descarguen y validen el bloque `B`.

## Aplicaciones {#applications}

En general, hay tres tipos de aplicaciones sobre Ethereum. La primera categoría son las aplicaciones financieras, que proporcionan a los usuarios formas más potentes de gestionar y celebrar contratos utilizando su dinero. Esto incluye submonedas, derivados financieros, contratos de cobertura, billeteras de ahorro, testamentos y, en última instancia, incluso algunas clases de contratos de empleo a gran escala. La segunda categoría son las aplicaciones semifinancieras, donde hay dinero involucrado pero también hay un fuerte aspecto no monetario en lo que se está haciendo; un ejemplo perfecto son las recompensas autoejecutables por soluciones a problemas computacionales. Por último, hay aplicaciones como la votación en línea y la gobernanza descentralizada que no son financieras en absoluto.

### Sistemas de tokens {#token-systems}

Los sistemas de tokens en la cadena de bloques tienen muchas aplicaciones que van desde submonedas que representan activos como el USD o el oro hasta acciones de empresas, tokens individuales que representan propiedad inteligente, cupones seguros e infalsificables, e incluso sistemas de tokens sin ningún vínculo con el valor convencional, utilizados como sistemas de puntos para incentivos. Los sistemas de tokens son sorprendentemente fáciles de implementar en Ethereum. El punto clave a entender es que todo lo que es fundamentalmente una moneda, o un sistema de tokens, es una base de datos con una operación: restar X unidades de A y dar X unidades a B, con la condición de que (i) A tuviera al menos X unidades antes de la transacción y (2) la transacción sea aprobada por A. Todo lo que se necesita para implementar un sistema de tokens es implementar esta lógica en un contrato.

El código básico para implementar un sistema de tokens en Serpent es el siguiente:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Esta es esencialmente una implementación literal de la función de transición de estado del "sistema bancario" descrita más arriba en este documento. Es necesario añadir unas cuantas líneas de código adicionales para contemplar el paso inicial de distribuir las unidades de moneda en primer lugar y algunos otros casos extremos, e idealmente se añadiría una función para permitir que otros contratos consulten el saldo de una dirección. Pero eso es todo. Teóricamente, los sistemas de tokens basados en Ethereum que actúan como submonedas pueden incluir potencialmente otra característica importante de la que carecen las metamonedas basadas en Bitcoin en cadena: la capacidad de pagar tarifas de transacción directamente en esa moneda. La forma en que esto se implementaría es que el contrato mantendría un saldo de ether con el que reembolsaría el ether utilizado para pagar las tarifas al remitente, y repondría este saldo recaudando las unidades de moneda interna que toma en tarifas y revendiéndolas en una subasta en curso constante. Por lo tanto, los usuarios necesitarían "activar" sus cuentas con ether, pero una vez que el ether esté allí, sería reutilizable porque el contrato lo reembolsaría cada vez.

### Derivados financieros y monedas de valor estable {#financial-derivatives-and-stable-value-currencies}

Los derivados financieros son la aplicación más común de un "contrato inteligente", y una de las más sencillas de implementar en código. El principal desafío al implementar contratos financieros es que la mayoría de ellos requieren referencia a un indicador de precios externo; por ejemplo, una aplicación muy deseable es un contrato inteligente que cubra contra la volatilidad del ether (u otra criptomoneda) con respecto al dólar estadounidense, pero hacer esto requiere que el contrato sepa cuál es el valor de ETH/USD. La forma más sencilla de hacer esto es a través de un contrato de "fuente de datos" mantenido por una parte específica (por ejemplo, NASDAQ) diseñado para que esa parte tenga la capacidad de actualizar el contrato según sea necesario, y proporcionando una interfaz que permita a otros contratos enviar un mensaje a ese contrato y obtener una respuesta que proporcione el precio.

Dado ese ingrediente crítico, el contrato de cobertura se vería de la siguiente manera:

1. Esperar a que la parte A introduzca 1000 ether.
2. Esperar a que la parte B introduzca 1000 ether.
3. Registrar el valor en USD de 1000 ether, calculado consultando el contrato de la fuente de datos, en el almacenamiento, digamos que esto es $x.
4. Después de 30 días, permitir a A o B "reactivar" el contrato para enviar un valor de $x en ether (calculado consultando de nuevo el contrato de la fuente de datos para obtener el nuevo precio) a A y el resto a B.

Tal contrato tendría un potencial significativo en el criptocomercio. Uno de los principales problemas citados sobre las criptomonedas es el hecho de que son volátiles; aunque muchos usuarios y comerciantes pueden desear la seguridad y comodidad de tratar con activos criptográficos, es posible que no deseen enfrentarse a la perspectiva de perder el 23% del valor de sus fondos en un solo día. Hasta ahora, la solución propuesta más comúnmente han sido los activos respaldados por emisores; la idea es que un emisor crea una submoneda en la que tiene el derecho de emitir y revocar unidades, y proporciona una unidad de la moneda a cualquiera que le proporcione (fuera de línea) una unidad de un activo subyacente especificado (por ejemplo, oro, USD). El emisor promete entonces proporcionar una unidad del activo subyacente a cualquiera que devuelva una unidad del criptoactivo. Este mecanismo permite que cualquier activo no criptográfico sea "elevado" a un activo criptográfico, siempre que se pueda confiar en el emisor.

En la práctica, sin embargo, los emisores no siempre son dignos de confianza, y en algunos casos la infraestructura bancaria es demasiado débil, o demasiado hostil, para que existan tales servicios. Los derivados financieros proporcionan una alternativa. Aquí, en lugar de un único emisor que proporcione los fondos para respaldar un activo, un mercado descentralizado de especuladores, apostando a que el precio de un activo de referencia criptográfico (por ejemplo, ETH) subirá, desempeña ese papel. A diferencia de los emisores, los especuladores no tienen la opción de incumplir su parte del trato porque el contrato de cobertura mantiene sus fondos en depósito de garantía. Tenga en cuenta que este enfoque no es totalmente descentralizado, porque todavía se necesita una fuente de confianza para proporcionar el indicador de precios, aunque podría decirse que incluso así esto es una mejora masiva en términos de reducción de los requisitos de infraestructura (a diferencia de ser un emisor, emitir una fuente de precios no requiere licencias y probablemente puede categorizarse como libertad de expresión) y de reducción del potencial de fraude.

### Sistemas de identidad y reputación {#identity-and-reputation-systems}

La primera criptomoneda alternativa de todas, [Namecoin](http://namecoin.org/), intentó utilizar una cadena de bloques similar a Bitcoin para proporcionar un sistema de registro de nombres, donde los usuarios pueden registrar sus nombres en una base de datos pública junto con otros datos. El principal caso de uso citado es para un sistema [DNS](https://wikipedia.org/wiki/Domain_Name_System), que asigna nombres de dominio como "bitcoin.org" (o, en el caso de Namecoin, "bitcoin.bit") a una dirección IP. Otros casos de uso incluyen la autenticación de correo electrónico y sistemas de reputación potencialmente más avanzados. Aquí está el contrato básico para proporcionar un sistema de registro de nombres similar a Namecoin en Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

El contrato es muy simple; todo lo que es es una base de datos dentro de la red Ethereum a la que se puede añadir, pero no modificar ni eliminar. Cualquiera puede registrar un nombre con algún valor, y ese registro se mantiene para siempre. Un contrato de registro de nombres más sofisticado también tendrá una "cláusula de función" que permitirá a otros contratos consultarlo, así como un mecanismo para que el "propietario" (es decir, el primer registrador) de un nombre cambie los datos o transfiera la propiedad. Incluso se puede añadir funcionalidad de reputación y red de confianza por encima.

### Almacenamiento de archivos descentralizado {#decentralized-file-storage}

En los últimos años, han surgido varias empresas emergentes populares de almacenamiento de archivos en línea, siendo la más destacada Dropbox, que buscan permitir a los usuarios subir una copia de seguridad de su disco duro y hacer que el servicio almacene la copia de seguridad y permita al usuario acceder a ella a cambio de una tarifa mensual. Sin embargo, en este punto el mercado de almacenamiento de archivos es a veces relativamente ineficiente; un vistazo rápido a varias soluciones existentes muestra que, particularmente en el nivel del "valle inquietante" de 20-200 GB en el que no se aplican ni las cuotas gratuitas ni los descuentos a nivel empresarial, los precios mensuales de los costos de almacenamiento de archivos convencionales son tales que se está pagando por más del costo de todo el disco duro en un solo mes. Los contratos de Ethereum pueden permitir el desarrollo de un ecosistema de almacenamiento de archivos descentralizado, donde los usuarios individuales pueden ganar pequeñas cantidades de dinero alquilando sus propios discos duros y el espacio no utilizado se puede utilizar para reducir aún más los costos de almacenamiento de archivos.

La pieza fundamental clave de tal dispositivo sería lo que hemos denominado el "contrato de Dropbox descentralizado". Este contrato funciona de la siguiente manera. Primero, se dividen los datos deseados en bloques, cifrando cada bloque por privacidad, y se construye un árbol de Merkle a partir de ellos. Luego se hace un contrato con la regla de que, cada N bloques, el contrato elegiría un índice aleatorio en el árbol de Merkle (utilizando el hash del bloque anterior, accesible desde el código del contrato, como fuente de aleatoriedad), y daría X ether a la primera entidad en suministrar una transacción con una prueba de propiedad similar a la verificación de pago simplificada del bloque en ese índice particular en el árbol. Cuando un usuario quiere volver a descargar su archivo, puede utilizar un protocolo de canal de micropagos (por ejemplo, pagar 1 szabo por cada 32 kilobytes) para recuperar el archivo; el enfoque más eficiente en cuanto a tarifas es que el pagador no publique la transacción hasta el final, reemplazando en su lugar la transacción por una ligeramente más lucrativa con el mismo nonce después de cada 32 kilobytes.

Una característica importante del protocolo es que, aunque pueda parecer que se confía en muchos nodos aleatorios para que no decidan olvidar el archivo, se puede reducir ese riesgo a casi cero dividiendo el archivo en muchas partes mediante el intercambio de secretos, y observando los contratos para ver que cada parte sigue en posesión de algún nodo. Si un contrato sigue pagando dinero, eso proporciona una prueba criptográfica de que alguien por ahí sigue almacenando el archivo.

### Organizaciones autónomas descentralizadas {#decentralized-autonomous-organizations}

El concepto general de una "organización autónoma descentralizada" es el de una entidad virtual que tiene un cierto conjunto de miembros o accionistas que, tal vez con una mayoría del 67%, tienen el derecho de gastar los fondos de la entidad y modificar su código. Los miembros decidirían colectivamente cómo la organización debería asignar sus fondos. Los métodos para asignar los fondos de una DAO podrían ir desde recompensas, salarios hasta mecanismos incluso más exóticos como una moneda interna para recompensar el trabajo. Esto esencialmente replica los adornos legales de una empresa tradicional o una organización sin fines de lucro, pero utilizando únicamente tecnología de cadena de bloques criptográfica para su cumplimiento. Hasta ahora, gran parte de la conversación en torno a las DAO ha girado en torno al modelo "capitalista" de una "corporación autónoma descentralizada" (DAC) con accionistas que reciben dividendos y acciones negociables; una alternativa, tal vez descrita como una "comunidad autónoma descentralizada", haría que todos los miembros tuvieran una participación igual en la toma de decisiones y requeriría que el 67% de los miembros existentes estuvieran de acuerdo para añadir o eliminar a un miembro. El requisito de que una persona solo pueda tener una membresía tendría entonces que ser aplicado colectivamente por el grupo.

Un esquema general de cómo codificar una DAO es el siguiente. El diseño más simple es simplemente un fragmento de código automodificable que cambia si dos tercios de los miembros están de acuerdo con un cambio. Aunque el código es teóricamente inmutable, uno puede eludir esto fácilmente y tener mutabilidad de facto teniendo fragmentos del código en contratos separados, y teniendo la dirección de qué contratos llamar almacenada en el almacenamiento modificable. En una implementación simple de tal contrato DAO, habría tres tipos de transacciones, distinguidas por los datos proporcionados en la transacción:

- `[0,i,K,V]` para registrar una propuesta con el índice `i` para cambiar la dirección en el índice de almacenamiento `K` al valor `V`
- `[1,i]` para registrar un voto a favor de la propuesta `i`
- `[2,i]` para finalizar la propuesta `i` si se han emitido suficientes votos

El contrato tendría entonces cláusulas para cada uno de estos. Mantendría un registro de todos los cambios de almacenamiento abiertos, junto con una lista de quién votó por ellos. También tendría una lista de todos los miembros. Cuando cualquier cambio de almacenamiento llega a dos tercios de los miembros votando por él, una transacción finalizadora podría ejecutar el cambio. Un esqueleto más sofisticado también tendría capacidad de votación incorporada para características como enviar una transacción, añadir miembros y eliminar miembros, e incluso puede prever la delegación de votos al estilo de la [democracia líquida](https://wikipedia.org/wiki/Liquid_democracy) (es decir, cualquiera puede asignar a alguien para que vote por él, y la asignación es transitiva, por lo que si A asigna a B y B asigna a C, entonces C determina el voto de A). Este diseño permitiría a la DAO crecer orgánicamente como una comunidad descentralizada, permitiendo a las personas delegar eventualmente la tarea de filtrar quién es miembro a especialistas, aunque a diferencia del "sistema actual", los especialistas pueden aparecer y desaparecer fácilmente con el tiempo a medida que los miembros individuales de la comunidad cambian sus alineaciones.

Un modelo alternativo es para una corporación descentralizada, donde cualquier cuenta puede tener cero o más acciones, y se requieren dos tercios de las acciones para tomar una decisión. Un esqueleto completo implicaría funcionalidad de gestión de activos, la capacidad de hacer una oferta para comprar o vender acciones, y la capacidad de aceptar ofertas (preferiblemente con un mecanismo de emparejamiento de órdenes dentro del contrato). La delegación también existiría al estilo de la democracia líquida, generalizando el concepto de una "junta directiva".

### Otras aplicaciones {#further-applications}

**1. Billeteras de ahorro**. Supongamos que Alice quiere mantener sus fondos seguros, pero le preocupa perder o que alguien piratee su clave privada. Ella pone ether en un contrato con Bob, un banco, de la siguiente manera:

- Solo Alice puede retirar un máximo del 1% de los fondos por día.
- Solo Bob puede retirar un máximo del 1% de los fondos por día, pero Alice tiene la capacidad de hacer una transacción con su clave desactivando esta capacidad.
- Alice y Bob juntos pueden retirar cualquier cantidad.

Normalmente, el 1% por día es suficiente para Alice, y si Alice quiere retirar más puede contactar a Bob para pedir ayuda. Si la clave de Alice es pirateada, corre hacia Bob para mover los fondos a un nuevo contrato. Si pierde su clave, Bob sacará los fondos eventualmente. Si Bob resulta ser malicioso, entonces ella puede desactivar su capacidad de retirar.

**2. Seguro de cosechas**. Uno puede hacer fácilmente un contrato de derivados financieros pero utilizando una fuente de datos del clima en lugar de cualquier índice de precios. Si un agricultor en Iowa compra un derivado que paga de forma inversamente proporcional a la precipitación en Iowa, entonces si hay una sequía, el agricultor recibirá dinero automáticamente y si hay suficiente lluvia el agricultor estará feliz porque a sus cultivos les iría bien. Esto se puede expandir al seguro contra desastres naturales en general.

**3. Una fuente de datos descentralizada**. Para los contratos financieros por diferencia, en realidad puede ser posible descentralizar la fuente de datos a través de un protocolo llamado "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)". SchellingCoin básicamente funciona de la siguiente manera: N partes introducen en el sistema el valor de un dato dado (por ejemplo, el precio de ETH/USD), los valores se ordenan, y todos los que están entre el percentil 25 y 75 obtienen un token como recompensa. Todos tienen el incentivo de proporcionar la respuesta que todos los demás proporcionarán, y el único valor en el que un gran número de jugadores puede estar de acuerdo de manera realista es el valor predeterminado obvio: la verdad. Esto crea un protocolo descentralizado que teóricamente puede proporcionar cualquier número de valores, incluyendo el precio de ETH/USD, la temperatura en Berlín o incluso el resultado de un cálculo difícil en particular.

**4. Depósito de garantía de multifirma inteligente**. Bitcoin permite contratos de transacciones de multifirma donde, por ejemplo, tres de cinco claves dadas pueden gastar los fondos. Ethereum permite una mayor granularidad; por ejemplo, cuatro de cinco pueden gastar todo, tres de cinco pueden gastar hasta el 10% por día, y dos de cinco pueden gastar hasta el 0.5% por día. Además, la multifirma de Ethereum es asíncrona: dos partes pueden registrar sus firmas en la cadena de bloques en diferentes momentos y la última firma enviará automáticamente la transacción.

**5. Computación en la nube**. La tecnología EVM también se puede utilizar para crear un entorno de computación verificable, permitiendo a los usuarios pedir a otros que realicen cálculos y luego, opcionalmente, pedir pruebas de que los cálculos en ciertos puntos de control seleccionados al azar se hicieron correctamente. Esto permite la creación de un mercado de computación en la nube donde cualquier usuario puede participar con su computadora de escritorio, computadora portátil o servidor especializado, y las comprobaciones aleatorias junto con los depósitos de seguridad se pueden utilizar para garantizar que el sistema sea confiable (es decir, los nodos no pueden hacer trampa de manera rentable). Aunque tal sistema puede no ser adecuado para todas las tareas; las tareas que requieren un alto nivel de comunicación entre procesos, por ejemplo, no se pueden hacer fácilmente en una gran nube de nodos. Otras tareas, sin embargo, son mucho más fáciles de paralelizar; proyectos como SETI@home, folding@home y algoritmos genéticos se pueden implementar fácilmente sobre tal plataforma.

**6. Apuestas entre pares**. Cualquier número de protocolos de apuestas entre pares, como [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) de Frank Stajano y Richard Clayton, se puede implementar en la cadena de bloques de Ethereum. El protocolo de apuestas más simple es en realidad simplemente un contrato por diferencia sobre el hash del siguiente bloque, y se pueden construir protocolos más avanzados a partir de ahí, creando servicios de apuestas con tarifas casi nulas que no tienen capacidad de hacer trampa.

**7. Mercados de predicción**. Siempre que se disponga de un oráculo o SchellingCoin, los mercados de predicción también son fáciles de implementar, y los mercados de predicción junto con SchellingCoin pueden resultar ser la primera aplicación convencional de la [futurquía](https://mason.gmu.edu/~rhanson/futarchy.html) como protocolo de gobernanza para organizaciones descentralizadas.

**8. Mercados descentralizados en cadena**, utilizando el sistema de identidad y reputación como base.

## Miscelánea y preocupaciones {#miscellanea-and-concerns}

### Implementación modificada de GHOST {#modified-ghost-implementation}

El protocolo "Greedy Heaviest Observed Subtree" (GHOST) es una innovación introducida por primera vez por Yonatan Sompolinsky y Aviv Zohar en [diciembre de 2013](https://eprint.iacr.org/2013/881.pdf). La motivación detrás de GHOST es que las cadenas de bloques con tiempos de confirmación rápidos sufren actualmente de una seguridad reducida debido a una alta tasa de bloques obsoletos (stale rate): debido a que los bloques tardan un cierto tiempo en propagarse por la red, si el minero A mina un bloque y luego el minero B mina otro bloque antes de que el bloque del minero A se propague a B, el bloque del minero B terminará desperdiciado y no contribuirá a la seguridad de la red. Además, existe un problema de centralización: si el minero A es un grupo de minería (mining pool) con el 30 % del poder de hash y B tiene el 10 % del poder de hash, A tendrá el riesgo de producir un bloque obsoleto el 70 % del tiempo (ya que el otro 30 % del tiempo A produjo el último bloque y, por lo tanto, obtendrá los datos de minería de inmediato), mientras que B tendrá el riesgo de producir un bloque obsoleto el 90 % del tiempo. Por lo tanto, si el intervalo de bloques es lo suficientemente corto como para que la tasa de bloques obsoletos sea alta, A será sustancialmente más eficiente simplemente en virtud de su tamaño. Con estos dos efectos combinados, es muy probable que las cadenas de bloques que producen bloques rápidamente lleven a que un grupo de minería tenga un porcentaje lo suficientemente grande del poder de hash de la red como para tener el control de facto sobre el proceso de minería.

Tal como lo describen Sompolinsky y Zohar, GHOST resuelve el primer problema de pérdida de seguridad de la red al incluir bloques obsoletos en el cálculo de qué cadena es la "más larga"; es decir, no solo el padre y los ancestros más lejanos de un bloque, sino también los descendientes obsoletos del ancestro del bloque (en la jerga de Ethereum, "tíos" o "uncles") se agregan al cálculo de qué bloque tiene la mayor prueba de trabajo (PoW) total respaldándolo. Para resolver el segundo problema del sesgo de centralización, vamos más allá del protocolo descrito por Sompolinsky y Zohar, y también proporcionamos recompensas de bloque a los bloques obsoletos: un bloque obsoleto recibe el 87,5 % de su recompensa base, y el sobrino que incluye el bloque obsoleto recibe el 12,5 % restante. Las tarifas de transacción, sin embargo, no se otorgan a los tíos.

Ethereum implementa una versión simplificada de GHOST que solo desciende siete niveles. Específicamente, se define de la siguiente manera:

- Un bloque debe especificar un padre, y debe especificar 0 o más tíos
- Un tío incluido en el bloque B debe tener las siguientes propiedades:
  - Debe ser un hijo directo del ancestro de la k-ésima generación de B, donde `2 <= k <= 7`.
  - No puede ser un ancestro de B
  - Un tío debe ser un encabezado del bloque válido, pero no necesita ser un bloque previamente verificado o incluso válido
  - Un tío debe ser diferente de todos los tíos incluidos en bloques anteriores y de todos los demás tíos incluidos en el mismo bloque (no inclusión doble)
- Por cada tío U en el bloque B, el minero de B obtiene un 3,125 % adicional sumado a su recompensa de coinbase y el minero de U obtiene el 93,75 % de una recompensa de coinbase estándar.

Esta versión limitada de GHOST, con tíos que se pueden incluir solo hasta 7 generaciones, se utilizó por dos razones. Primero, un GHOST ilimitado incluiría demasiadas complicaciones en el cálculo de qué tíos para un bloque dado son válidos. Segundo, un GHOST ilimitado con compensación como el que se usa en Ethereum elimina el incentivo para que un minero mine en la cadena principal y no en la cadena de un atacante público.

### Tarifas {#fees}

Debido a que cada transacción publicada en la cadena de bloques impone a la red el costo de tener que descargarla y verificarla, existe la necesidad de algún mecanismo regulatorio, que generalmente involucra tarifas de transacción, para prevenir el abuso. El enfoque predeterminado, utilizado en Bitcoin, es tener tarifas puramente voluntarias, confiando en que los mineros actúen como guardianes y establezcan mínimos dinámicos. Este enfoque ha sido recibido muy favorablemente en la comunidad de Bitcoin, en particular porque está "basado en el mercado", lo que permite que la oferta y la demanda entre los mineros y los remitentes de transacciones determinen el precio. El problema con esta línea de razonamiento es, sin embargo, que el procesamiento de transacciones no es un mercado; aunque es intuitivamente atractivo interpretar el procesamiento de transacciones como un servicio que el minero ofrece al remitente, en realidad cada transacción que incluye un minero deberá ser procesada por cada nodo de la red, por lo que la gran mayoría del costo del procesamiento de transacciones recae en terceros y no en el minero que toma la decisión de incluirla o no. Por lo tanto, es muy probable que ocurran problemas de la tragedia de los comunes.

Sin embargo, resulta que esta falla en el mecanismo basado en el mercado, cuando se le da una suposición simplificadora inexacta en particular, se cancela mágicamente por sí sola. El argumento es el siguiente. Supongamos que:

1. Una transacción conduce a `k` operaciones, ofreciendo la recompensa `kR` a cualquier minero que la incluya, donde `R` es establecido por el remitente y `k` y `R` son (aproximadamente) visibles para el minero de antemano.
2. Una operación tiene un costo de procesamiento de `C` para cualquier nodo (es decir, todos los nodos tienen la misma eficiencia)
3. Hay `N` nodos mineros, cada uno con exactamente el mismo poder de procesamiento (es decir, `1/N` del total)
4. No existen nodos completos no mineros.

Un minero estaría dispuesto a procesar una transacción si la recompensa esperada es mayor que el costo. Por lo tanto, la recompensa esperada es `kR/N` ya que el minero tiene una probabilidad de `1/N` de procesar el siguiente bloque, y el costo de procesamiento para el minero es simplemente `kC`. Por lo tanto, los mineros incluirán transacciones donde `kR/N > kC`, o `R > NC`. Tenga en cuenta que `R` es la tarifa por operación proporcionada por el remitente, y por lo tanto es un límite inferior del beneficio que el remitente deriva de la transacción, y `NC` es el costo para toda la red en conjunto de procesar una operación. Por lo tanto, los mineros tienen el incentivo de incluir solo aquellas transacciones para las cuales el beneficio utilitario total excede el costo.

Sin embargo, en la realidad existen varias desviaciones importantes de esas suposiciones:

1. El minero paga un costo más alto para procesar la transacción que los otros nodos verificadores, ya que el tiempo de verificación adicional retrasa la propagación de bloques y, por lo tanto, aumenta la posibilidad de que el bloque se vuelva obsoleto.
2. Sí existen nodos completos no mineros.
3. La distribución del poder de minería puede terminar siendo radicalmente desigual en la práctica.
4. Los especuladores, enemigos políticos y locos cuya función de utilidad incluye causar daño a la red sí existen, y pueden configurar inteligentemente contratos donde su costo es mucho menor que el costo pagado por otros nodos verificadores.

(1) proporciona una tendencia para que el minero incluya menos transacciones, y
(2) aumenta `NC`; por lo tanto, estos dos efectos se cancelan mutuamente, al menos de forma parcial.<sup>[¿Cómo?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) y (4) son el problema principal; para resolverlos, simplemente instituimos un límite flotante: ningún bloque puede tener más operaciones que
`BLK_LIMIT_FACTOR` veces el promedio móvil exponencial a largo plazo.
Específicamente:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` y `EMA_FACTOR` son constantes que se establecerán en 65536 y 1,5 por el momento, pero es probable que se cambien después de un análisis más profundo.

Hay otro factor que desincentiva los tamaños de bloque grandes en Bitcoin: los bloques que son grandes tardarán más en propagarse y, por lo tanto, tienen una mayor probabilidad de volverse obsoletos. En Ethereum, los bloques que consumen mucho gas también pueden tardar más en propagarse, tanto porque son físicamente más grandes como porque tardan más en procesar las transiciones de estado de las transacciones para validarlas. Este desincentivo por retraso es una consideración importante en Bitcoin, pero menos en Ethereum debido al protocolo GHOST; por lo tanto, depender de límites de bloque regulados proporciona una línea base más estable.

### Computación y completitud de Turing {#computation-and-turing-completeness}

Una nota importante es que la máquina virtual de Ethereum es Turing completa; esto significa que el código de la EVM puede codificar cualquier computación que se pueda llevar a cabo de manera concebible, incluidos los bucles infinitos. El código de la EVM permite realizar bucles de dos maneras. Primero, hay una instrucción `JUMP` que permite que el programa salte hacia atrás a un punto anterior en el código, y una instrucción `JUMPI` para hacer saltos condicionales, lo que permite declaraciones como `while x < 27: x = x * 2`. Segundo, los contratos pueden llamar a otros contratos, lo que potencialmente permite realizar bucles a través de la recursividad. Esto naturalmente conduce a un problema: ¿pueden los usuarios malintencionados esencialmente apagar a los mineros y a los nodos completos obligándolos a entrar en un bucle infinito? El problema surge debido a un problema en la informática conocido como el problema de la parada (halting problem): no hay forma de saber, en el caso general, si un programa dado se detendrá alguna vez o no.

Como se describe en la sección de transición de estado, nuestra solución funciona al requerir que una transacción establezca un número máximo de pasos computacionales que se le permite tomar, y si la ejecución toma más tiempo, la computación se revierte pero las tarifas aún se pagan. Los mensajes funcionan de la misma manera. Para mostrar la motivación detrás de nuestra solución, considere los siguientes ejemplos:

- Un atacante crea un contrato que ejecuta un bucle infinito y luego envía una transacción que activa ese bucle al minero. El minero procesará la transacción, ejecutando el bucle infinito, y esperará a que se quede sin gas. Aunque la ejecución se queda sin gas y se detiene a la mitad, la transacción sigue siendo válida y el minero aún reclama la tarifa del atacante por cada paso computacional.
- Un atacante crea un bucle infinito muy largo con la intención de obligar al minero a seguir computando durante tanto tiempo que, para cuando termine la computación, habrán salido algunos bloques más y no será posible que el minero incluya la transacción para reclamar la tarifa. Sin embargo, se requerirá que el atacante envíe un valor para `STARTGAS` que limite el número de pasos computacionales que puede tomar la ejecución, por lo que el minero sabrá de antemano que la computación tomará un número excesivamente grande de pasos.
- Un atacante ve un contrato con código de alguna forma como `send(A,contract.storage[A]); contract.storage[A] = 0`, y envía una transacción con el gas justo para ejecutar el primer paso pero no el segundo (es decir, haciendo un retiro pero sin dejar que el saldo baje). El autor del contrato no necesita preocuparse por protegerse contra tales ataques, porque si la ejecución se detiene a la mitad, los cambios se revierten.
- Un contrato financiero funciona tomando la mediana de nueve fuentes de datos patentadas para minimizar el riesgo. Un atacante toma el control de una de las fuentes de datos, que está diseñada para ser modificable a través del mecanismo de llamada de dirección variable descrito en la sección sobre DAO, y la convierte para ejecutar un bucle infinito, intentando así forzar que cualquier intento de reclamar fondos del contrato financiero se quede sin gas. Sin embargo, el contrato financiero puede establecer un límite de gas en el mensaje para evitar este problema.

La alternativa a la completitud de Turing es la incompletitud de Turing, donde `JUMP` y `JUMPI` no existen y solo se permite que exista una copia de cada contrato en la pila de llamadas en un momento dado. Con este sistema, el sistema de tarifas descrito y las incertidumbres en torno a la efectividad de nuestra solución podrían no ser necesarios, ya que el costo de ejecutar un contrato estaría limitado por su tamaño. Además, la incompletitud de Turing ni siquiera es una limitación tan grande; de todos los ejemplos de contratos que hemos concebido internamente, hasta ahora solo uno requería un bucle, e incluso ese bucle podría eliminarse haciendo 26 repeticiones de un fragmento de código de una línea. Dadas las serias implicaciones de la completitud de Turing y el beneficio limitado, ¿por qué no tener simplemente un lenguaje Turing incompleto? En realidad, sin embargo, la incompletitud de Turing está lejos de ser una solución clara al problema. Para ver por qué, considere los siguientes contratos:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Ahora, envíe una transacción a A. Por lo tanto, en 51 transacciones, tenemos un contrato que ocupa 2<sup>50</sup> pasos computacionales. Los mineros podrían intentar detectar tales bombas lógicas con anticipación manteniendo un valor junto a cada contrato que especifique el número máximo de pasos computacionales que puede tomar, y calculando esto para los contratos que llaman a otros contratos de forma recursiva, pero eso requeriría que los mineros prohíban los contratos que crean otros contratos (ya que la creación y ejecución de los 26 contratos anteriores podría integrarse fácilmente en un solo contrato). Otro punto problemático es que el campo de dirección de un mensaje es una variable, por lo que, en general, puede que ni siquiera sea posible saber a qué otros contratos llamará un contrato dado con anticipación. Por lo tanto, en general, llegamos a una conclusión sorprendente: la completitud de Turing es sorprendentemente fácil de manejar, y la falta de completitud de Turing es igualmente sorprendentemente difícil de manejar a menos que existan exactamente los mismos controles; pero en ese caso, ¿por qué no dejar simplemente que el protocolo sea Turing completo?

### Moneda y emisión {#currency-and-issuance}

La red Ethereum incluye su propia moneda incorporada, el ether, que tiene el doble propósito de proporcionar una capa de liquidez primaria para permitir el intercambio eficiente entre varios tipos de activos digitales y, lo que es más importante, de proporcionar un mecanismo para pagar las tarifas de transacción. Por conveniencia y para evitar discusiones futuras (consulte el debate actual sobre mBTC/uBTC/satoshi en Bitcoin), las denominaciones estarán preetiquetadas:

- 1: Wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Esto debe tomarse como una versión ampliada del concepto de "dólares" y "centavos" o "BTC" y "satoshi". En el futuro cercano, esperamos que "ether" se use para transacciones ordinarias, "finney" para microtransacciones y "szabo" y "Wei" para discusiones técnicas sobre tarifas y la implementación del protocolo; las denominaciones restantes pueden volverse útiles más adelante y no deberían incluirse en los clientes en este momento.

El modelo de emisión será el siguiente:

- El ether se lanzará en una venta de moneda al precio de 1000-2000 ether por BTC, un mecanismo destinado a financiar la organización de Ethereum y pagar el desarrollo que ha sido utilizado con éxito por otras plataformas como Mastercoin y NXT. Los primeros compradores se beneficiarán de mayores descuentos. Los BTC recibidos de la venta se utilizarán en su totalidad para pagar salarios y recompensas a los desarrolladores y se invertirán en varios proyectos con y sin fines de lucro en el ecosistema de Ethereum y las criptomonedas.
- 0,099x la cantidad total vendida (60102216 ETH) se asignará a la organización para compensar a los primeros contribuyentes y pagar los gastos denominados en ETH antes del bloque génesis.
- 0,099x la cantidad total vendida se mantendrá como una reserva a largo plazo.
- 0,26x la cantidad total vendida se asignará a los mineros por año para siempre a partir de ese momento.

| Grupo | En el lanzamiento | Después de 1 año | Después de 5 años |
| ---------------------- | --------- | ------------ | ------------- |
| Unidades de moneda | 1,198X | 1,458X | 2,498X |
| Compradores | 83,5 % | 68,6 % | 40,0 % |
| Reserva gastada antes de la venta | 8,26 % | 6,79 % | 3,96 % |
| Reserva utilizada después de la venta | 8,26 % | 6,79 % | 3,96 % |
| Mineros | 0 % | 17,8 % | 52,0 % |

#### Tasa de crecimiento de la oferta a largo plazo (porcentaje) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_A pesar de la emisión lineal de la moneda, al igual que con Bitcoin, con el tiempo la tasa de crecimiento de la oferta tiende a cero._

Las dos opciones principales en el modelo anterior son (1) la existencia y el tamaño de un fondo de dotación (endowment pool), y (2) la existencia de una oferta lineal en crecimiento permanente, a diferencia de una oferta limitada como en Bitcoin. La justificación del fondo de dotación es la siguiente. Si el fondo de dotación no existiera, y la emisión lineal se redujera a 0,217x para proporcionar la misma tasa de inflación, entonces la cantidad total de ether sería un 16,5 % menor y, por lo tanto, cada unidad sería un 19,8 % más valiosa. Por lo tanto, en el equilibrio se compraría un 19,8 % más de ether en la venta, por lo que cada unidad volvería a ser exactamente tan valiosa como antes. La organización también tendría entonces 1,198x más BTC, que se puede considerar dividido en dos partes: el BTC original y el 0,198x adicional. Por lo tanto, esta situación es _exactamente equivalente_ a la dotación, pero con una diferencia importante: la organización posee puramente BTC y, por lo tanto, no está incentivada a respaldar el valor de la unidad de ether.

El modelo de crecimiento de la oferta lineal permanente reduce el riesgo de lo que algunos ven como una concentración excesiva de riqueza en Bitcoin, y brinda a las personas que viven en las eras presentes y futuras una oportunidad justa de adquirir unidades de moneda, al mismo tiempo que conserva un fuerte incentivo para obtener y mantener ether porque la "tasa de crecimiento de la oferta" como porcentaje aún tiende a cero con el tiempo. También teorizamos que debido a que las monedas siempre se pierden con el tiempo debido a descuidos, muerte, etc., y la pérdida de monedas se puede modelar como un porcentaje de la oferta total por año, la oferta total de moneda en circulación de hecho eventualmente se estabilizará en un valor igual a la emisión anual dividida por la tasa de pérdida (por ejemplo, a una tasa de pérdida del 1 %, una vez que la oferta alcance 26X, entonces se minará 0,26X y se perderá 0,26X cada año, creando un equilibrio).

Tenga en cuenta que en el futuro, es probable que Ethereum cambie a un modelo de prueba de participación (PoS) por seguridad, reduciendo el requisito de emisión a un punto entre cero y 0,05X por año. En el caso de que la organización de Ethereum pierda financiamiento o por cualquier otra razón desaparezca, dejamos abierto un "contrato social": cualquiera tiene el derecho de crear una futura versión candidata de Ethereum, con la única condición de que la cantidad de ether debe ser como máximo igual a `60102216 * (1.198 + 0.26 * n)` donde `n` es el número de años después del bloque génesis. Los creadores son libres de realizar ventas colectivas (crowd-sell) o asignar de otra manera parte o la totalidad de la diferencia entre la expansión de la oferta impulsada por PoS y la expansión de la oferta máxima permitida para pagar el desarrollo. Las actualizaciones candidatas que no cumplan con el contrato social pueden justificadamente sufrir una bifurcación hacia versiones que sí cumplan.

### Centralización de la minería {#mining-centralization}

El algoritmo de minería de Bitcoin funciona haciendo que los mineros calculen SHA-256 en versiones ligeramente modificadas del encabezado del bloque millones de veces una y otra vez, hasta que finalmente un nodo presenta una versión cuyo hash es menor que el objetivo (actualmente alrededor de 2<sup>192</sup>). Sin embargo, este algoritmo de minería es vulnerable a dos formas de centralización. Primero, el ecosistema de minería ha llegado a estar dominado por los ASIC (circuitos integrados de aplicación específica), chips de computadora diseñados para, y por lo tanto miles de veces más eficientes en, la tarea específica de la minería de Bitcoin. Esto significa que la minería de Bitcoin ya no es una actividad altamente descentralizada e igualitaria, requiriendo millones de dólares de capital para participar de manera efectiva. Segundo, la mayoría de los mineros de Bitcoin en realidad no realizan la validación de bloques localmente; en su lugar, dependen de un grupo de minería centralizado para proporcionar los encabezados de los bloques. Podría decirse que este problema es peor: al momento de escribir este artículo, los tres principales grupos de minería controlan indirectamente aproximadamente el 50 % del poder de procesamiento en la red Bitcoin, aunque esto se mitiga por el hecho de que los mineros pueden cambiar a otros grupos de minería si un grupo o coalición intenta un ataque del 51%.

La intención actual en Ethereum es utilizar un algoritmo de minería donde se requiere que los mineros obtengan datos aleatorios del estado, calculen algunas transacciones seleccionadas al azar de los últimos N bloques en la cadena de bloques y devuelvan el hash del resultado. Esto tiene dos beneficios importantes. Primero, los contratos de Ethereum pueden incluir cualquier tipo de computación, por lo que un ASIC de Ethereum sería esencialmente un ASIC para computación general, es decir, una mejor CPU. Segundo, la minería requiere acceso a toda la cadena de bloques, lo que obliga a los mineros a almacenar toda la cadena de bloques y al menos ser capaces de verificar cada transacción. Esto elimina la necesidad de grupos de minería centralizados; aunque los grupos de minería aún pueden cumplir el papel legítimo de nivelar la aleatoriedad de la distribución de recompensas, esta función puede ser cumplida igualmente bien por grupos entre pares sin control central.

Este modelo no ha sido probado y puede haber dificultades en el camino para evitar ciertas optimizaciones inteligentes al usar la ejecución de contratos como un algoritmo de minería. Sin embargo, una característica notablemente interesante de este algoritmo es que permite a cualquiera "envenenar el pozo", introduciendo una gran cantidad de contratos en la cadena de bloques diseñados específicamente para obstaculizar ciertos ASIC. Existen incentivos económicos para que los fabricantes de ASIC utilicen ese truco para atacarse entre sí. Por lo tanto, la solución que estamos desarrollando es, en última instancia, una solución humana económica adaptativa en lugar de una puramente técnica.

### Escalabilidad {#scalability}

Una preocupación común sobre Ethereum es el problema de la escalabilidad. Al igual que Bitcoin, Ethereum sufre de la falla de que cada transacción debe ser procesada por cada nodo de la red. Con Bitcoin, el tamaño de la cadena de bloques actual se sitúa en unos 15 GB, creciendo a un ritmo de aproximadamente 1 MB por hora. Si la red Bitcoin procesara las 2000 transacciones por segundo de Visa, crecería 1 MB cada tres segundos (1 GB por hora, 8 TB por año). Es probable que Ethereum sufra un patrón de crecimiento similar, empeorado por el hecho de que habrá muchas aplicaciones sobre la cadena de bloques de Ethereum en lugar de solo una moneda como es el caso de Bitcoin, pero mejorado por el hecho de que los nodos completos de Ethereum necesitan almacenar solo el estado en lugar de todo el historial de la cadena de bloques.

El problema con un tamaño de cadena de bloques tan grande es el riesgo de centralización. Si el tamaño de la cadena de bloques aumenta a, digamos, 100 TB, entonces el escenario probable sería que solo un número muy pequeño de grandes empresas ejecutaría nodos completos, y todos los usuarios habituales usarían nodos SPV ligeros. En tal situación, surge la preocupación potencial de que los nodos completos podrían unirse y acordar hacer trampa de alguna manera rentable (por ejemplo, cambiar la recompensa de bloque, darse BTC a sí mismos). Los nodos ligeros no tendrían forma de detectar esto de inmediato. Por supuesto, es probable que exista al menos un nodo completo honesto, y después de unas horas la información sobre el fraude se filtraría a través de canales como Reddit, pero en ese punto sería demasiado tarde: dependería de los usuarios comunes organizar un esfuerzo para incluir en la lista negra los bloques dados, un problema de coordinación masivo y probablemente inviable en una escala similar a la de llevar a cabo un ataque del 51% exitoso. En el caso de Bitcoin, esto es actualmente un problema, pero existe una modificación de la cadena de bloques [sugerida por Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) que aliviará este problema.

A corto plazo, Ethereum utilizará dos estrategias adicionales para hacer frente a este problema. Primero, debido a los algoritmos de minería basados en la cadena de bloques, al menos cada minero se verá obligado a ser un nodo completo, creando un límite inferior en el número de nodos completos. Segundo y más importante, sin embargo, incluiremos una raíz del árbol de estado intermedio en la cadena de bloques después de procesar cada transacción. Incluso si la validación de bloques está centralizada, siempre que exista un nodo verificador honesto, el problema de centralización se puede eludir a través de un protocolo de verificación. Si un minero publica un bloque no válido, ese bloque debe estar mal formateado o el estado `S[n]` es incorrecto. Dado que se sabe que `S[0]` es correcto, debe haber algún primer estado `S[i]` que sea incorrecto donde `S[i-1]` sea correcto. El nodo verificador proporcionaría el índice `i`, junto con una "prueba de invalidez" que consiste en el subconjunto de nodos del árbol de Patricia que necesitan procesar `APPLY(S[i-1],TX[i]) -> S[i]`. Los nodos podrían usar esos nodos para ejecutar esa parte de la computación y ver que el `S[i]` generado no coincide con el `S[i]` proporcionado.

Otro ataque más sofisticado implicaría que los mineros malintencionados publiquen bloques incompletos, por lo que ni siquiera existe la información completa para determinar si los bloques son válidos o no. La solución a esto es un protocolo de desafío-respuesta: los nodos de verificación emiten "desafíos" en forma de índices de transacciones objetivo, y al recibir un nodo, un nodo ligero trata el bloque como no confiable hasta que otro nodo, ya sea el minero u otro verificador, proporcione un subconjunto de nodos de Patricia como prueba de validez.

## Conclusión {#conclusion}

El protocolo Ethereum fue concebido originalmente como una versión mejorada de una criptomoneda, proporcionando características avanzadas como depósitos en garantía en la cadena de bloques, límites de retiro, contratos financieros, mercados de apuestas y similares a través de un lenguaje de programación altamente generalizado. El protocolo Ethereum no "soportaría" ninguna de las aplicaciones directamente, pero la existencia de un lenguaje de programación Turing completo significa que, en teoría, se pueden crear contratos arbitrarios para cualquier tipo de transacción o aplicación. Sin embargo, lo que resulta más interesante de Ethereum es que el protocolo Ethereum va mucho más allá de ser solo una moneda. Los protocolos en torno al almacenamiento de archivos descentralizado, la computación descentralizada y los mercados de predicción descentralizados, entre docenas de otros conceptos similares, tienen el potencial de aumentar sustancialmente la eficiencia de la industria computacional y proporcionar un impulso masivo a otros protocolos entre pares al agregar por primera vez una capa económica. Finalmente, también existe una gran variedad de aplicaciones que no tienen absolutamente nada que ver con el dinero.

El concepto de una función de transición de estado arbitraria, tal como la implementa el protocolo Ethereum, proporciona una plataforma con un potencial único; en lugar de ser un protocolo cerrado y de un solo propósito destinado a una serie específica de aplicaciones en almacenamiento de datos, apuestas o finanzas, Ethereum es abierto por diseño, y creemos que es extremadamente adecuado para servir como capa fundamental para un número muy grande de protocolos tanto financieros como no financieros en los próximos años.

## Notas y lecturas adicionales {#notes-and-further-reading}

### Notas {#notes}

1. Un lector sofisticado puede notar que, de hecho, una dirección de Bitcoin es el hash de la clave pública de curva elíptica, y no la clave pública en sí. Sin embargo, es terminología criptográfica perfectamente legítima referirse al hash de la clave pública como una clave pública en sí misma. Esto se debe a que la criptografía de Bitcoin puede considerarse como un algoritmo de firma digital personalizado, donde la clave pública consiste en el hash de la clave pública ECC, la firma consiste en la clave pública ECC concatenada con la firma ECC, y el algoritmo de verificación implica comprobar la clave pública ECC en la firma con el hash de la clave pública ECC proporcionado como clave pública y luego verificar la firma ECC con la clave pública ECC.
2. Técnicamente, la mediana de los 11 bloques anteriores.
3. Internamente, 2 y "CHARLIE" son ambos números, estando este último en representación base 256 big-endian. Los números pueden ser como mínimo 0 y como máximo 2<sup>256</sup>-1.

### Lecturas adicionales {#further-reading}

1. [Valor intrínseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Propiedad inteligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contratos inteligentes](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](https://nakamotoinstitute.org/b-money/)
5. [Pruebas de trabajo reutilizables](https://nakamotoinstitute.org/finney/rpow/)
6. [Títulos de propiedad seguros con autoridad del propietario](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Documento técnico de Bitcoin](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triángulo de Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Documento técnico de Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Documento técnico de Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Corporaciones autónomas descentralizadas, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verificación de pago simplificada](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Árboles de Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Árboles Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ y agentes autónomos, Jeff Garzik](https://garzikrants.blogspot.com/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn sobre la propiedad inteligente en el Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP de Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Árboles Merkle Patricia de Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd sobre los árboles de suma de Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Para conocer la historia del documento técnico, consulte [esta wiki](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, al igual que muchos proyectos de software de código abierto impulsados por la comunidad, ha evolucionado desde sus inicios. Para conocer los últimos desarrollos de Ethereum y cómo se realizan los cambios en el protocolo, recomendamos [esta guía](/learn/)._
