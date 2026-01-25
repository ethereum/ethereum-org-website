---
title: Informe oficial de Ethereum
description: "Una guía introductoria a Ethereum publicada en 2013 antes de su lanzamiento."
lang: es
sidebarDepth: 2
hideEditButton: true
---

# Informe de Ethereum {#ethereum-whitepaper}

_Este documento introductorio fue publicado originalmente en 2014 por Vitalik Buterin, el fundador de [Ethereum](/what-is-ethereum/), antes del lanzamiento del proyecto en 2015. Vale la pena señalar que Ethereum, al igual que muchos proyectos de software de código abierto impulsados por la comunidad, ha evolucionado desde su inicio._

_Aunque tenga varios años de antigüedad, mantenemos este documento porque sigue sirviendo como una referencia útil y una representación precisa de Ethereum y su visión. Para obtener más información sobre los últimos desarrollos de Ethereum y cómo se realizan los cambios en el protocolo, le recomendamos [esta guía](/learn/)._

[Los investigadores y académicos que busquen una versión histórica o canónica del informe [de diciembre de 2014] deben utilizar este PDF.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Una plataforma de contratos inteligentes y aplicaciones descentralizadas de nueva generación {#a-next-generation-smart-contract-and-decentralized-application-platform}

El desarrollo de Bitcoin por parte de Satoshi Nakamoto en 2009 ha sido aclamado a menudo como un desarrollo radical en el dinero y la moneda, siendo el primer ejemplo de un activo digital que simultáneamente no tiene respaldo o "[valor intrínseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" y no tiene un emisor o controlador centralizado. Sin embargo, otra parte del experimento de Bitcoin, posiblemente más importante, es la tecnología blockchain subyacente como una herramienta de consenso distribuido, y la atención está comenzando a cambiar rápidamente a este otro aspecto de Bitcoin. Las aplicaciones alternativas de la tecnología de cadena de bloques que se citan habitualmente incluyen el uso de activos digitales en la cadena de bloques para representar monedas e instrumentos financieros personalizados ("[monedas coloreadas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), la propiedad de un dispositivo físico subyacente ("[propiedad inteligente](https://en.bitcoin.it/wiki/Smart_Property)"), activos no fungibles como nombres de dominio ("[Namecoin](http://namecoin.org)"), así como aplicaciones más complejas que implican que los activos digitales sean controlados directamente por un fragmento de código que implementa reglas arbitrarias ("[contratos inteligentes](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") o incluso "[organizaciones autónomas descentralizadas](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) basadas en la cadena de bloques. Ethereum pretende proporcionar una cadena de bloques con un lenguaje de programación completo de Turing que se integra a la perfección y puede utilizarse para crear «contratos» que pueden servir para codificar funciones de transición de estado arbitrario, permitiendo a los usuarios crear cualquiera de los sistemas descritos anteriormente, así como muchos otros que todavía no hemos imaginado, simplemente escribiendo la lógica en algunas líneas de código.

## Introducción a Bitcoin y a los conceptos existentes {#introduction-to-bitcoin-and-existing-concepts}

### Historia {#history}

El concepto de moneda digital descentralizada, así como aplicaciones alternativas como registros de propiedades, ha existido durante décadas. Los protocolos anónimos de dinero electrónico de las décadas de 1980 y 1990, que en su mayoría dependían de una primitiva criptográfica conocida como firma digital ciega, proporcionaban una moneda con un alto grado de privacidad, pero los protocolos en gran medida no lograron ganar terreno, debido a su dependencia de un intermediario centralizado. En 1998, el [b-money](http://www.weidai.com/bmoney.txt) de Wei Dai se convirtió en la primera propuesta que introdujo la idea de crear dinero mediante la resolución de acertijos computacionales y el consenso descentralizado, pero la propuesta era escasa en detalles sobre cómo se podría implementar realmente el consenso descentralizado. En 2005, Hal Finney introdujo un concepto de "[pruebas de trabajo reutilizables](https://nakamotoinstitute.org/finney/rpow/)", un sistema que utiliza ideas de b-money junto con los enigmas computacionalmente difíciles de Hashcash de Adam Back para crear un concepto de criptomoneda, pero que una vez más se quedó corto del ideal al depender de la computación confiable como backend. En 2009, Satoshi Nakamoto implementó por primera vez en la práctica una moneda descentralizada, combinando primitivas establecidas para administrar la propiedad a través de criptografía de clave pública con un algoritmo de consenso para realizar un seguimiento de quién posee monedas, conocido como «prueba de trabajo».

El mecanismo detrás de la prueba de trabajo fue un gran avance en el espacio, ya que resolvió simultáneamente dos problemas. Primero, proporcionó un algoritmo de consenso simple y moderadamente efectivo, que permitió a los nodos de la red acordar colectivamente un conjunto de actualizaciones canónicas del estado del libro mayor de Bitcoin. En segundo lugar, proporcionó un mecanismo para permitir la libre entrada en el proceso de consenso, resolviendo el problema político de decidir quién puede influir en el consenso y, al mismo tiempo, prevenir los ataques sybil. Lo logra sustituyendo una barrera formal a la participación, como el requisito de estar registrado como una entidad única en una lista en particular, con una barrera económica: el peso de un solo nodo en el proceso de votación por consenso es directamente proporcional a la potencia computacional que aporta el nodo. Desde entonces, se ha propuesto un enfoque alternativo llamado _prueba de participación_, que calcula el peso de un nodo como proporcional a sus tenencias de moneda y no a sus recursos computacionales; la discusión de los méritos relativos de los dos enfoques está fuera del alcance de este documento, pero debe tenerse en cuenta que ambos enfoques pueden servir como la columna vertebral de una criptomoneda.

### Bitcoin como un sistema de transición de estado {#bitcoin-as-a-state-transition-system}

![Transición de estado de Ethereum](./ethereum-state-transition.png)

Desde un punto de vista técnico, el libro mayor de una criptomoneda como Bitcoin se puede considerar como un sistema de transición de estados, donde existe un «estado» que consiste en el estado de propiedad de todos los bitcoins existentes y una «función de transición de estados» que tome un estado y una transacción y devuelva un nuevo estado como resultado. En un sistema bancario estándar, por ejemplo, el estado es un balance general, una transacción es una solicitud para mover X $ de A a B y la función de transición de estado reduce el valor en la cuenta de A en X $ y aumenta el valor en la cuenta de B en X $. Si, en primer lugar, la cuenta de A tiene menos de X $, la función de transición de estado devuelve un error. Por lo tanto, se puede definir formalmente:

```
APPLY(S,TX) -> S' o ERROR
```

En el sistema bancario definido anteriormente:

```js
APPLY({ Alice: $50, Bob: $50 },"enviar $20 de Alice a Bob") = { Alice: $30, Bob: $70 }
```

Pero:

```js
APPLY({ Alice: $50, Bob: $50 },"enviar $70 de Alice a Bob") = ERROR
```

El «estado» en Bitcoin es el conjunto de todas las monedas (técnicamente, «transacciones de salida no gastadas» o UTXO, por sus siglas en inglés) que se han creado, pero que aún no se han gastado, donde cada UTXO tiene una denominación y un propietario (definido por una dirección de 20 bytes, que es esencialmente una clave pública criptográfica<sup>[fn1](#notes)</sup>). Una transacción contiene uno o más entradas, donde cada entrada contiene una referencia a una UTXO existente y una firma criptográfica producida por una clave privada asociada con la dirección del propietario y una o más salidas, donde cada salida contiene una nueva UTXO que se añadirá al estado.

La función de transición de estado `APPLY(S,TX) -> S'` se puede definir a grandes rasgos de la siguiente manera:

<ol>
  <li>
    Por cada entrada en <code>TX</code>:
    <ul>
    <li>
        Si la UTXO a la que se hace referencia no está en <code>S</code>, se devuelve un error.
    </li>
    <li>
        Si la firma proporcionada no coincide con el propietario de la UTXO, se devuelve un error.
    </li>
    </ul>
  </li>
  <li>
    Si la suma de las denominaciones de todas las UTXO de entrada es menor que la suma de las denominaciones de todas las UTXO de salida, se devuelve un error.
  </li>
  <li>
    Devuelve <code>S</code> con todas las UTXO de entrada eliminadas y todas las UTXO de salida añadidas.
  </li>
</ol>

La primera mitad del primer paso evita que los remitentes de transacciones gasten monedas que no existen, la segunda mitad del primer paso evita que los remitentes de transacciones gasten las monedas de otras personas, y el segundo paso hace cumplir la conservación del valor. Para utilizar esto para el pago, el protocolo es el siguiente. Suponga que Alice quiere enviar 11,7 BTC a Bob. Primero, Alice buscará un conjunto de UTXO disponibles que posea y que sumen al menos 11,7 BTC. Siendo realistas, Alice no podrá obtener exactamente 11,7 BTC; digamos que lo mínimo que puede conseguir es 6+4+2=12. Luego crea una transacción con esas tres entradas y dos salidas. La primera salida será de 11,7 BTC con la dirección de Bob como propietaria, y la segunda salida será el "cambio" restante de 0,3 BTC, con la propietaria siendo la propia Alice.

### Minería {#mining}

![Bloques de Ethereum](./ethereum-blocks.png)

Si tuviéramos acceso a un servicio centralizado de confianza, este sistema sería trivial de implementar; podría codificarse exactamente como se describe, utilizando el disco duro de un servidor centralizado para hacer un seguimiento del estado. Sin embargo, con Bitcoin estamos tratando de construir un sistema monetario descentralizado, por lo que tendremos que combinar el sistema de transacción de estado con un sistema de consenso para asegurar que todos estén de acuerdo en el orden de las transacciones. El proceso de consenso descentralizado de Bitcoin requiere que los nodos de la red intenten continuamente producir paquetes de transacciones llamados "bloques". La red está diseñada para producir aproximadamente un bloque cada diez minutos, y cada bloque contiene una marca de tiempo, un nonce, una referencia (es decir, el hash) del bloque anterior y una lista de todas las transacciones que han tenido lugar desde el bloque anterior. Con el tiempo, esto crea una "cadena de bloques" persistente y en constante crecimiento que se actualiza constantemente para representar el último estado del libro mayor de Bitcoin.

El algoritmo para comprobar si un bloque es válido, expresado en este paradigma, es el siguiente:

1. Comprueba si el bloque anterior al que hace referencia el bloque existe y es válido.
2. Compruebe que la marca temporal del bloque es mayor que la del bloque anterior<sup>[fn2](#notes)</sup> y menor de 2 horas en el futuro.
3. Compruebe que la prueba de trabajo del bloque sea válida.
4. Sea `S[0]` el estado al final del bloque anterior.
5. Suponga que `TX` es la lista de transacciones del bloque con `n` transacciones. Para todo `i` en `0...n-1`, establezca `S[i+1] = APPLY(S[i],TX[i])`. Si alguna aplicación devuelve un error, salga y devuelva falso.
6. Devuelva verdadero y registre `S[n]` como el estado al final de este bloque.

En esencia, cada transacción en el bloque debe proporcionar una transición de estado válida desde lo que era el estado canónico antes de que se ejecutara la transacción a un nuevo estado. Tenga en cuenta que el estado no está codificado en el bloque de ninguna manera; es puramente una abstracción para ser recordada por el nodo de validación y solo puede ser calculada (de forma segura) para cualquier bloque partiendo del estado de génesis y aplicando secuencialmente cada transacción en cada bloque. Además, tenga en cuenta que el orden en que el minero incluye las transacciones en el bloque es importante; si hay dos transacciones A y B en un bloque tales que B gasta una UTXO creada por A, entonces el bloque será válido si A viene antes que B, pero no de otra manera.

La única condición de validez presente en la lista anterior que no se encuentra en otros sistemas es el requisito de la "prueba de trabajo". La condición precisa es que el hash doble SHA256 de cada bloque, tratado como un número de 256 bits, debe ser menor que un objetivo ajustado dinámicamente, que en el momento de escribir este artículo es de aproximadamente 2<sup>187</sup>. El propósito de esto es hacer que la creación de bloques sea computacionalmente "difícil", evitando así que los atacantes Sybil rehagan toda la cadena de bloques a su favor. Dado que SHA256 está diseñada para ser una función pseudoaleatoria completamente impredecible, la única forma de crear un bloque válido es mediante el sencillo método de ensayo y error, incrementando repetidamente el nonce y comprobando si el nuevo hash coincide.

En el objetivo actual de ~2<sup>187</sup>, la red debe realizar un promedio de ~2<sup>69</sup> intentos antes de que se encuentre un bloque válido; en general, el objetivo es recalibrado por la red cada 2016 bloques para que, en promedio, un nuevo bloque sea producido por algún nodo de la red cada diez minutos. Para compensar a los mineros por este trabajo computacional, el minero de cada bloque tiene derecho a incluir una transacción que le otorga 25 BTC de la nada. Además, si alguna transacción tiene una denominación total más alta en sus entradas que en sus salidas, la diferencia también va al minero como una "comisión de transacción". Por cierto, este es también el único mecanismo por el que se emiten los BTC; el estado de génesis no contenía ninguna moneda.

Para entender mejor el propósito de la minería, examinemos lo que sucede en caso de un atacante malicioso. Dado que se sabe que la criptografía subyacente de Bitcoin es segura, el atacante se centrará en la única parte del sistema de Bitcoin que no está protegida directamente por la criptografía: el orden de las transacciones. La estrategia del atacante es simple:

1. Envía 100 BTC a un comerciante como intercambio de algún producto (preferentemente un bien digital de entrega rápida).
2. Espera a la entrega del producto.
3. Crea otra transacción en la que se envía los mismos 100 BTC a sí mismo.
4. Intenta convencer a la red que su transacción a sí mismo fue la primera en surgir.

Una vez que se ha dado el paso (1), después de unos minutos algún minero incluirá la transacción en un bloque, digamos el bloque número 270000. Después de aproximadamente una hora, se habrán agregado cinco bloques más a la cadena después de ese bloque, y cada uno de esos bloques apuntará indirectamente a la transacción y, por lo tanto, la "confirmará". En este punto, el comerciante aceptará el pago como finalizado y entregará el producto; como asumimos que se trata de un bien digital, la entrega es instantánea. Ahora, el atacante crea otra transacción enviándose los 100 BTC a sí mismo. Si el atacante simplemente la libera, la transacción no se procesará; los mineros intentarán ejecutar `APPLY(S,TX)` y notarán que `TX` consume una UTXO que ya no está en el estado. Así que, en su lugar, el atacante crea una "bifurcación" de la cadena de bloques, comenzando por minar otra versión del bloque 270000 que apunta al mismo bloque 269999 como padre, pero con la nueva transacción en lugar de la antigua. Debido a que los datos del bloque son diferentes, esto requiere rehacer la prueba de trabajo. Además, la nueva versión del atacante del bloque 270000 tiene un hash diferente, por lo que los bloques originales del 270001 al 270005 no "apuntan" a él; por lo tanto, la cadena original y la nueva cadena del atacante están completamente separadas. La regla es que en una bifurcación, la cadena de bloques más larga se considera la verdadera, por lo que los mineros legítimos trabajarán en la cadena 270005 mientras que el atacante solo trabaja en la cadena 270000. Para que el atacante haga que su cadena de bloques sea la más larga, necesitaría tener más poder computacional que el resto de la red combinada para ponerse al día (de ahí, el "ataque del 51 %").

### Árboles de Merkle {#merkle-trees}

![SPV en Bitcoin](./spv-bitcoin.png)

_Izquierda: es suficiente presentar solo un pequeño número de nodos en un árbol de Merkle para dar una prueba de la validez de una rama._

_Derecha: cualquier intento de cambiar cualquier parte del árbol de Merkle conducirá finalmente a una inconsistencia en algún punto de la cadena._

Una característica importante de la escalabilidad de Bitcoin es que el bloque se almacena en una estructura de datos de varios niveles. El "hash" de un bloque es en realidad solo el hash de la cabecera del bloque, un fragmento de datos de aproximadamente 200 bytes que contiene la marca de tiempo, el nonce, el hash del bloque anterior y el hash raíz de una estructura de datos llamada árbol de Merkle que almacena todas las transacciones del bloque. Un árbol de Merkle es un tipo de árbol binario, compuesto por un conjunto de nodos con un gran número de nodos hoja en la parte inferior del árbol que contienen los datos subyacentes, un conjunto de nodos intermedios donde cada nodo es el hash de sus dos hijos y, finalmente, un único nodo raíz, también formado a partir del hash de sus dos hijos, que representa la "cima" del árbol. El propósito del árbol de Merkle es permitir que los datos de un bloque se entreguen por partes: un nodo puede descargar solo la cabecera de un bloque de una fuente, la pequeña parte del árbol relevante para él de otra fuente, y aun así tener la seguridad de que todos los datos son correctos. La razón por la que esto funciona es que los hashes se propagan hacia arriba: si un usuario malicioso intenta intercambiar una transacción falsa en la parte inferior de un árbol de Merkle, este cambio provocará un cambio en el nodo superior, y luego un cambio en el nodo que está por encima de ese, cambiando finalmente la raíz del árbol y, por lo tanto, el hash del bloque, lo que hace que el protocolo lo registre como un bloque completamente diferente (casi con toda seguridad con una prueba de trabajo no válida).

El protocolo del árbol de Merkle es posiblemente esencial para la sostenibilidad a largo plazo. Un "nodo completo" en la red de Bitcoin, uno que almacena y procesa la totalidad de cada bloque, ocupa alrededor de 15 GB de espacio en disco en la red de Bitcoin a fecha de abril de 2014, y está creciendo en más de un gigabyte por mes. Actualmente, esto es viable para algunos ordenadores de sobremesa y no para teléfonos, y más adelante en el futuro solo las empresas y los aficionados podrán participar. Un protocolo conocido como "verificación de pago simplificada" (SPV) permite la existencia de otra clase de nodos, llamados "nodos ligeros", que descargan las cabeceras de los bloques, verifican la prueba de trabajo en las cabeceras de los bloques y luego descargan solo las "ramas" asociadas a las transacciones que son relevantes para ellos. Esto permite a los nodos ligeros determinar con una fuerte garantía de seguridad cuál es el estado de cualquier transacción de Bitcoin, y su saldo actual, mientras descargan solo una porción muy pequeña de toda la cadena de bloques.

### Aplicaciones alternativas de la cadena de bloques {#alternative-blockchain-applications}

La idea de tomar la idea subyacente de la cadena de bloques y aplicarla a otros conceptos también tiene una larga historia. En 2005, Nick Szabo presentó el concepto de "[títulos de propiedad seguros con autoridad del propietario](https://nakamotoinstitute.org/library/secure-property-titles/)", un documento que describe cómo los "nuevos avances en la tecnología de bases de datos replicadas" permitirán un sistema basado en la cadena de bloques para almacenar un registro de quién posee qué tierra, creando un marco elaborado que incluye conceptos como la ocupación de tierras, la posesión adversa y el impuesto sobre la tierra georgiano. Sin embargo, desafortunadamente no había ningún sistema de base de datos replicada eficaz disponible en ese momento, por lo que el protocolo nunca se implementó en la práctica. Sin embargo, a partir de 2009, una vez que se desarrolló el consenso descentralizado de Bitcoin, comenzaron a surgir rápidamente varias aplicaciones alternativas.

- **Namecoin**: creada en 2010, [Namecoin](https://namecoin.org/) se describe mejor como una base de datos de registro de nombres descentralizada. En protocolos descentralizados como Tor, Bitcoin y BitMessage, es necesario que haya alguna forma de identificar las cuentas para que otras personas puedan interactuar con ellas, pero en todas las soluciones existentes el único tipo de identificador disponible es un hash pseudoaleatorio como `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idóneamente, a uno le gustaría poder tener una cuenta con un nombre como «George». Sin embargo, el problema es que si una persona puede crear una cuenta llamada «George», otras personas podrían usar el mismo proceso para registrar «George» para sí mismas y suplantarlos. La única solución es un paradigma de «primero que realiza la inscripción», donde la primer persona en registrar triunfa y la segunda falla: un problema perfectamente adaptado para el protocolo de consenso de Bitcoin. Namecoin es la implementación más antigua y exitosa de un sistema de registro de nombres utilizando tal idea.
- **Monedas coloreadas**: el propósito de las [monedas coloreadas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) es servir como un protocolo para permitir a las personas crear sus propias monedas digitales o, en el importante caso trivial de una moneda con una sola unidad, tokens digitales, en la cadena de bloques de Bitcoin. En el protocolo de monedas de color, alguien «emite» una nueva moneda al asignar públicamente un color a una UTXO específica de Bitcoin, y el protocolo define recursivamente el color de otra UTXO para que sea el mismo que gastaron las entradas de la transacción creándolas (se aplican algunas reglas especiales en caso de entradas de color mixto). Esto permite a los usuarios tener sus carteras con solo UTXO de un color específico y enviarlas como bitcoins normales, siendo rastreados por la cadena de bloques para determinar el color de cualquier UTXO que reciban.
- **Metamonedas**: la idea detrás de una metamoneda es tener un protocolo que se ejecuta sobre Bitcoin, utilizando las transacciones de Bitcoin para almacenar las transacciones de la metamoneda pero teniendo una función de transición de estado diferente, `APPLY'`. Debido a que el protocolo de la metamoneda no puede evitar que aparezcan transacciones de metamoneda no válidas en la cadena de bloques de Bitcoin, se añade una regla que establece que si `APPLY'(S,TX)` devuelve un error, el protocolo por defecto es `APPLY'(S,TX) = S`. Esto proporciona un mecanismo fácil para crear un protocolo arbitrario de criptomonedas, con potenciales funcionalidades avanzadas que no se pueden implementar sobre el propio Bitcoin, pero con un coste de desarrollo muy bajo, ya que las complejidades de minado y de trabajo en red ya las gestiona el protocolo de Bitcoin. Metacoins se han utilizado para implementar algunas clases de contratos financieros, registros de nombre e intercambios descentralizados.

Por lo tanto, en general, hay dos enfoques para construir un protocolo de consenso: construir una red independiente y construir un protocolo sobre Bitcoin. El primer enfoque, aunque razonablemente exitoso en el caso de aplicaciones como Namecoin, es difícil de implementar; cada implementación individual necesita arrancar una cadena de bloques independiente, así como construir y probar todo el código de transición de estado y de red necesario. Además, predecimos que el conjunto de aplicaciones para la tecnología de consenso descentralizado seguirá una distribución de ley de potencias donde la gran mayoría de las aplicaciones serían demasiado pequeñas para justificar su propia cadena de bloques, y observamos que existen grandes clases de aplicaciones descentralizadas, en particular las organizaciones autónomas descentralizadas, que necesitan interactuar entre sí.

El enfoque basado en Bitcoin, por otro lado, tiene el defecto de que no hereda las características de verificación de pago simplificada de Bitcoin. La SPV funciona para Bitcoin porque puede utilizar la profundidad de la cadena de bloques como un indicador de validez; en algún momento, una vez que los ancestros de una transacción retroceden lo suficiente, es seguro decir que formaban parte legítimamente del estado. Los metaprotocolos basados en la cadena de bloques, por otro lado, no pueden forzar a la cadena de bloques a no incluir transacciones que no son válidas en el contexto de sus propios protocolos. Por lo tanto, una implementación de metaprotocolo SPV totalmente segura necesitaría escanear hacia atrás hasta el principio de la cadena de bloques de Bitcoin para determinar si ciertas transacciones son válidas o no. Actualmente, todas las implementaciones "ligeras" de los metaprotocolos basados en Bitcoin dependen de un servidor de confianza para proporcionar los datos, lo que es un resultado muy subóptimo, especialmente cuando uno de los propósitos principales de una criptomoneda es eliminar la necesidad de confianza.

### Scripts {#scripting}

Incluso sin ninguna extensión, el protocolo de Bitcoin facilita una versión débil del concepto de "contratos inteligentes". Las UTXO en Bitcoin pueden ser propiedad no solo de una clave pública, sino también de un script más complicado expresado en un lenguaje de programación simple basado en pilas. En este paradigma, una transacción que gaste esa UTXO debe proporcionar datos que satisfagan el script. De hecho, incluso el mecanismo básico de propiedad de clave pública se implementa a través de un script: el script toma una firma de curva elíptica como entrada, la verifica contra la transacción y la dirección que posee la UTXO, y devuelve 1 si la verificación es exitosa y 0 en caso contrario. Existen otros scripts más complicados para diversos casos de uso adicionales. Por ejemplo, se puede construir un script que requiera firmas de dos de un conjunto de tres claves privadas para validar ("multifirma"), una configuración útil para cuentas corporativas, cuentas de ahorro seguras y algunas situaciones de depósito en garantía de comerciantes. Los scripts también se pueden usar para pagar recompensas por soluciones a problemas computacionales, e incluso se puede construir un script que diga algo como "esta UTXO de Bitcoin es tuya si puedes proporcionar una prueba de SPV de que me enviaste una transacción de Dogecoin de esta denominación", permitiendo esencialmente el intercambio descentralizado entre criptomonedas.

Sin embargo, el lenguaje de scripting tal como se implementa en Bitcoin tiene varias limitaciones importantes:

- **Falta de completitud de Turing**: es decir, aunque hay un gran subconjunto de computación que el lenguaje de scripting de Bitcoin soporta, no lo soporta casi todo. La categoría principal que falta son los bucles. Esto se hace para evitar bucles infinitos durante la verificación de transacciones; teóricamente es un obstáculo superable para los programadores de scripts, ya que cualquier bucle se puede simular simplemente repitiendo el código subyacente muchas veces con una sentencia condicional, pero esto conduce a scripts que son muy ineficientes en cuanto al espacio. Por ejemplo, la implementación de un algoritmo alternativo de firma de curva elíptica probablemente requeriría 256 rondas de multiplicación repetidas, todas incluidas individualmente en el código.
- **Indiferencia al valor**: no hay forma de que un script de UTXO proporcione un control detallado sobre la cantidad que se puede retirar. Por ejemplo, un caso de uso importante de un contrato de oráculo podría ser un contrato de cobertura, donde A y B ponen 1.000 $ en BTC, y después de 30 días el código envía 1.000 $ en BTC a A y el resto a B. Este proceso requiere un oráculo para determinar el valor de 1 BTC en USD, pero aún así se trata de una gran mejora en términos de confianza y requerimientos de infraestructura sobre las soluciones completamente centralizadas que existen hoy en día. Sin embargo, como las UTXO son de todo o nada, la única forma de lograrlo es a través del truco muy ineficiente de tener muchas UTXO de diferentes denominaciones (p. ej., una UTXO de 2<sup>k</sup> por cada k hasta 30) y hacer que el oráculo elija qué UTXO enviar a A y cuál a B.
- **Falta de estado**: las UTXO pueden ser gastadas o no gastadas; no hay oportunidad para contratos o scripts de varias etapas que mantengan cualquier otro estado interno más allá de eso. Esto hace difícil realizar contratos de opciones multietapa, ofertas de intercambio descentralizadas o protocolos de compromiso criptográficos de dos etapas (necesarios para recompensas computacionales seguras). También significa que UTXO solo puede utilizarse para construir contratos únicos aislados y no más contratos complejos «con estado», como organizaciones descentralizadas, y dificulta la implementación de metaprotocolos. El estado binario combinado con la indiferencia al valor también significa que otra aplicación importante, el límite de retirada, es imposible.
- **Indiferencia a la cadena de bloques**: las UTXO no ven los datos de la cadena de bloques, como el nonce, la marca de tiempo y el hash del bloque anterior. Esto limita severamente las aplicaciones en juegos de azar y en otras categorías, al privar al lenguaje de scripting de una fuente potencialmente valiosa de aleatoriedad.

Así, vemos tres enfoques para construir aplicaciones avanzadas sobre una criptomoneda: construir una nueva cadena de bloques, usar scripts sobre Bitcoin y construir un metaprotocolo sobre Bitcoin. Construir una nueva cadena de bloques permite una libertad ilimitada en la construcción de un conjunto de características, pero a costa del tiempo de desarrollo, el esfuerzo de arranque y la seguridad. El uso de scripts es fácil de implementar y estandarizar, pero tiene capacidades muy limitadas, y los metaprotocolos, aunque fáciles, sufren de fallos de escalabilidad. Con Ethereum, tenemos la intención de construir un marco alternativo que proporcione ganancias aún mayores en la facilidad de desarrollo, así como propiedades de cliente ligero aún más fuertes, al mismo tiempo que permite a las aplicaciones compartir un entorno económico y la seguridad de la cadena de bloques.

## Ethereum {#ethereum}

La intención de Ethereum es crear un protocolo alternativo para construir aplicaciones descentralizadas, proporcionando un conjunto diferente de compensaciones que creemos que serán muy útiles para una gran clase de aplicaciones descentralizadas, con especial énfasis en situaciones donde el tiempo de desarrollo rápido, la seguridad para aplicaciones pequeñas y poco usadas, y la capacidad de diferentes aplicaciones para interactuar de manera muy eficiente, son importantes. Ethereum logra esto construyendo lo que es esencialmente la capa fundamental abstracta definitiva: una cadena de bloques con un lenguaje de programación de completitud de Turing incorporado, que permite a cualquiera escribir contratos inteligentes y aplicaciones descentralizadas donde pueden crear sus propias reglas arbitrarias para la propiedad, los formatos de transacción y las funciones de transición de estado. Una versión básica de Namecoin se puede escribir en dos líneas de código, y otros protocolos como monedas y sistemas de reputación se pueden construir en menos de veinte. Los contratos inteligentes, "cajas" criptográficas que contienen valor y solo lo desbloquean si se cumplen ciertas condiciones, también se pueden construir sobre la plataforma, con un poder mucho mayor que el ofrecido por los scripts de Bitcoin debido a los poderes añadidos de la completitud de Turing, la conciencia del valor, la conciencia de la cadena de bloques y el estado.

### Cuentas de Ethereum {#ethereum-accounts}

En Ethereum, el estado esta compuesto por objetos llamados «cuentas», donde cada cuenta posee una dirección de 20 bytes y transiciones de estado, que son transferencias directas de valor e información entre cuentas. Una cuenta de Ethereum tiene cuatro campos:

- El **nonce**, un contador utilizado para asegurar que cada transacción solo se pueda procesar una vez.
- El **saldo actual de ether** de la cuenta.
- El **código del contrato** de la cuenta, si está presente.
- El **almacenamiento** de la cuenta (vacío por defecto).

«Ether» es el principal criptocombustible interno de Ethereum, y se utiliza para pagar las comisiones por transacción. En general, hay dos tipos de cuentas: **cuentas de propiedad externa**, controladas por claves privadas, y **cuentas de contrato**, controladas por el código de su contrato. Una cuenta de propiedad externa no tiene código, y uno puede enviar mensajes desde una cuenta de propiedad externa creando y firmando una transacción; en una cuenta de contrato, cada vez que una cuenta de contrato recibe un mensaje su código se activa, permitiendo leer y escribir en el almacenamiento interno y enviar otros mensajes o crear contratos a su vez.

Observe que los «contratos» en Ethereum no deben entenderse como algo que debe estar «satisfecho» o «cumplido»; al contrario, son más parecidos a «agentes independientes» que viven dentro del ambiente de ejecución de Ethereum, siempre ejecutando un pedazo de código específico cuando un mensaje o transacción les da «un toque», y tienen control directo sobre su propio saldo en ether y su propio almacén de clave/valor para hacer un seguimiento de las variables persistentes.

### Mensajes y transacciones {#messages-and-transactions}

El término «transacción» se utiliza en Ethereum para referirse al paquete de datos que almacena el mensaje enviado por una cuenta de propiedad externa. Las transacciones contienen:

- El destinatario del mensaje
- Una firma que identifica al remitente
- La cantidad de ether por transferir del remitente al destinatario.
- Un campo de datos opcional
- Un valor `STARTGAS`, que representa el número máximo de pasos computacionales que se permite que tome la ejecución de la transacción.
- Un valor `GASPRICE`, que representa la comisión que el remitente paga por cada paso computacional.

Los tres primeros son campos estándar que se esperan en cualquier criptomoneda. El campo de datos no tiene ninguna función por defecto, pero la máquina virtual tiene un código de operación con el que un contrato puede acceder a los datos; como ejemplo práctico, si un contrato funciona como un servicio de registro de dominios sobre la cadena de bloques, es posible que se desee interpretar la información que se le pasa contienen dos «campos», el primer campo es un dominio para registrar y el segundo campo es la dirección IP para registrarlo. El contrato leería estos valores de los datos del mensaje y los guardaría adecuadamente en el almacenamiento.

Los campos `STARTGAS` y `GASPRICE` son cruciales para el modelo de anti-denegación de servicio de Ethereum. Para prevenir la generación de bucles infinitos o accidentales hostiles, así como de otros desperdicios computacionales generados en el código, cada transacción debe establecer un límite del número de pasos computacionales de código que puede utilizar. La unidad fundamental de computación es el «gas»; usualmente, un paso computacional cuesta 1 gas, pero algunas operaciones cuestan más gas, porque son computacionalmente más caras, o incrementan la cantidad de información que se debe guardar como parte del estado. También hay una tarifa de 5 gas por cada byte en los datos de la transacción. La intención del sistema de tarifas es obligar a un atacante a pagar proporcionalmente por cada recurso que consuma, incluyendo la computación, el ancho de banda y el almacenamiento; por ende, cualquier transacción que lleve a la red un mayor consumo que cualquiera de estos recursos, debe tener una comisión aproximadamente proporcional al incremento.

### Mensajes {#messages}

Los contratos tienen la capacidad de enviar «mensajes» a otros contratos. Los mensajes son objetos virtuales que nunca se serializan y existen sólo en el entorno de ejecución de Ethereum. Un mensaje contiene:

- El remitente del mensaje (implícito)
- El destinatario del mensaje
- La cantidad de ether por transferir junto con el mensaje
- Un campo de datos opcional
- Un valor `STARTGAS`

Esencialmente, un mensaje es como una transacción, con la salvedad de que lo produce un contrato y no un actor externo. Se produce un mensaje cuando un contrato que está ejecutando código ejecuta el código de operación `CALL`, que produce y ejecuta un mensaje. Al igual que una transacción, un mensaje conduce a la cuenta del destinatario que ejecuta su código. Por lo tanto, los contratos pueden tener relaciones con otros contratos exactamente de la misma manera que los actores externos.

Tenga en cuenta que la asignación de gas asignada por una transacción o contrato se aplica al gas total consumido por esa transacción y todas las subejecuciones. Por ejemplo, si un actor externo A envía una transacción a B con 1.000 gases y B consume 600 gases antes de enviar un mensaje a C, y la ejecución interna de C consume 300 gases antes de regresar, entonces B puede gastar otros 100 gases antes de ejecutar sin gas.

### Función de transición de estado de Ethereum {#ethereum-state-transition-function}

![Transición de estado del ether](./ether-state-transition.png)

La función de transición de estado de Ethereum, `APPLY(S,TX) -> S'`, se puede definir de la siguiente manera:

1. Compruebe si la transacción está bien formada (es decir, tiene el número correcto de valores), si la firma es válida y si el nonce coincide con el nonce de la cuenta del remitente. De lo contrario, da error.
2. Calcular la comisión de la transacción como `STARTGAS * GASPRICE`, y determinar la dirección de envío a partir de la firma. Restar la tarifa del saldo de la cuenta del remitente e incrementar el nonce del remitente. Si no hay suficiente saldo para gastar, da error.
3. Inicialice `GAS = STARTGAS`, y reste una cierta cantidad de gas por byte para pagar los bytes de la transacción.
4. Transferir el valor de la transacción desde la cuenta del remitente a la cuenta receptora. Si la cuenta receptora aún no existe, créela. Si la cuenta receptora es un contrato, ejecute el código del contrato hasta su finalización o hasta que la ejecución se quede sin gas.
5. Si la transferencia de valor falló porque el remitente no tenía suficiente dinero, o la ejecución del código se quedó sin energía, revierta todos los cambios de estado excepto el pago de las tarifas y añada las tarifas a la cuenta del minero.
6. En caso contrario, devuelva las comisiones por todo el gas restante al remitente y envíe las tarifas pagadas por el gas consumido al minero.

Por ejemplo, supongamos que el código del contrato es:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Tenga en cuenta que, en realidad, el código del contrato está escrito en el código de EVM de bajo nivel —en este ejemplo, para mayor claridad, está escrito en Serpent, uno de nuestros lenguajes de alto nivel— y se puede compilar en código de EVM. Suponga que el almacenamiento del contrato comienza vacío, y se envía una transacción con un valor de 10 ether, 2000 de gas, 0,001 ether de precio de gas y 64 bytes de datos, con los bytes 0-31 representando el número `2` y los bytes 32-63 representando la cadena `CHARLIE`. El proceso para la función de transición de estado en este caso es el siguiente:

1. Comprobar que la transacción es válida y está bien formada.
2. Comprobar que el remitente de la transacción tiene al menos 2000 \* 0,001 = 2 ether. Si los tiene, restar 2 ether de la cuenta del remitente.
3. Inicializar gas = 2000; suponiendo que la transacción tenga 170 bytes de longitud y que la tarifa por byte sea 5, restar 850 y quedarán 1150 gases.
4. Restar 10 ether más de la cuenta del remitente y añadirlos a la cuenta del contrato.
5. Ejecutar el código. En este caso, esto es simple: comprueba si se está utilizando el almacenamiento del contrato en el índice `2`, se da cuenta de que no, por lo que establece el almacenamiento en el índice `2` al valor `CHARLIE`. Supongamos que esto consume 187 gases, así que la cantidad restante de gas es 1.150 - 187 = 963.
6. Añadir 963 \* 0,001 = 0,963 ether de vuelta a la cuenta del remitente y devolver el estado resultante.

Si no hubiera ningún contrato en el extremo receptor de la transacción, entonces la comisión total de la transacción sería simplemente igual al `GASPRICE` proporcionado multiplicado por la longitud de la transacción en bytes, y los datos enviados junto con la transacción serían irrelevantes.

Tenga en cuenta que los mensajes funcionan de manera equivalente a las transacciones en lo referente a las reversiones: si la ejecución de un mensaje se queda sin gas, entonces la ejecución de ese mensaje y todas las demás ejecuciones desencadenadas por esa ejecución, revertirán, pero las ejecuciones principales no necesitan revertirse. Esto significa que es «seguro» que un contrato llame a otro contrato, ya que si A llama a B con G gas, entonces se garantiza que la ejecución de A perderá como máximo G gas. Finalmente, tenga en cuenta que hay un código de operación, `CREATE`, que crea un contrato; su mecánica de ejecución es generalmente similar a `CALL`, con la excepción de que el resultado de la ejecución determina el código de un contrato recién creado.

### Ejecución de código {#code-execution}

El código en los contratos de Ethereum está escrito en un lenguaje de bajo nivel, en bytecode, conocido como «código de la máquina virtual de Ethereum» o «código de la EVM». El código consiste en una serie de bytes, donde cada byte representa una operación. En general, la ejecución de código es un bucle infinito que consiste en llevar a cabo repetidamente la operación en el contador de programa actual (que comienza en cero) y luego incrementar el contador de programa en uno, hasta que se llega al final del código o se detecta un error o una instrucción `STOP` o `RETURN`. Las operaciones tienen acceso a tres tipos de espacio en el que almacenar datos:

- La **pila**, un contenedor de tipo último en entrar, primero en salir al que se pueden apilar y desapilar valores.
- **Memoria**, un array de bytes infinitamente expandible.
- El **almacenamiento** a largo plazo del contrato, un almacén de clave/valor. A diferecia de la pila y la memoria, que se resetean una vez terminada la computación, el almacenamiento persiste en el largo plazo.

El código también puede acceder al valor, emisor y datos del mensaje entrante, así como datos de la cabecera del bloque, y el código también puede dar una matriz de bytes de datos como salida.

El modelo de ejecución formal de código de la EVM es sorprendentemente simple. Mientras la máquina virtual de Ethereum se está ejecutando, su estado computacional completo puede definirse por la tupla `(block_state, transaction, message, code, memory, stack, pc, gas)`, donde `block_state` es el estado global que contiene todas las cuentas e incluye saldos y almacenamiento. Al principio de cada ronda de ejecución, la instrucción actual se encuentra tomando el `pc`-ésimo byte de `code` (o 0 si `pc >= len(code)`), y cada instrucción tiene su propia definición en términos de cómo afecta a la tupla. Por ejemplo, `ADD` extrae dos elementos de la pila y apila su suma, reduce `gas` en 1 e incrementa `pc` en 1, y `SSTORE` extrae los dos elementos superiores de la pila e inserta el segundo elemento en el almacenamiento del contrato en el índice especificado por el primer elemento. Aunque hay muchas maneras de optimizar la ejecución de la máquina virtual de Ethereum mediante la compilación en tiempo de ejecución, una implementación básica de Ethereum puede hacerse en unos pocos cientos de líneas de código.

### Cadena de bloques y minería {#blockchain-and-mining}

![Diagrama de aplicación de bloque de Ethereum](./ethereum-apply-block-diagram.png)

La cadena de bloque de Ethereum es similar en muchas maneras a la cadena de bloques de Bitcoin, aunque con alguna salvedad. La principal diferencia entre Ethereum y Bitcoin en relación a la arquitectura de la cadena de bloques radica en que, a diferencia de Bitcoin, los bloques de Ethereum contienen una copia tanto de la lista de transacciones como del estado más reciente. Aparte de esto, hay otros dos valores, que son el número de bloque y la dificultad, que también se guardan en el bloque. El algoritmo básico de validación de un bloque de Ethereum es el siguiente:

1. Comprobar si el bloque anterior referenciado existe y es válido.
2. Comprobar que la marca temporal del bloque es mayor que la del bloque anterior referenciado e inferior a 15 minutos en el futuro
3. Verificar que el número de bloque, la dificultad, la raíz de la transacción, la raíz del tío y el límite de gas (varios conceptos específicos de Ethereum de bajo nivel) sean válidos.
4. Compruebe que la prueba de trabajo del bloque sea válida.
5. Sea `S[0]` el estado al final del bloque anterior.
6. Sea `TX` la lista de transacciones del bloque, con `n` transacciones. Para todo `i` en `0...n-1`, establezca `S[i+1] = APPLY(S[i],TX[i])`. Si alguna aplicación devuelve un error, o si el gas total consumido en el bloque hasta este punto excede el `GASLIMIT`, se devuelve un error.
7. Sea `S_FINAL` igual a `S[n]`, pero añadiendo la recompensa de bloque pagada al minero.
8. Compruebe si la raíz del árbol de Merkle del estado `S_FINAL` es igual a la raíz del estado final proporcionada en la cabecera del bloque. Si es así, el bloque es válido; de lo contrario, no es válido.

El enfoque puede parecer altamente ineficiente a primera vista, porque necesita almacenar todo el estado con cada bloque, pero en realidad la eficiencia debería ser comparable a la de Bitcoin. La razón es que el estado se almacena en la estructura del árbol, y después de cada bloque solo se tiene que modificar una pequeña parte del árbol. Por lo tanto, en general, entre dos bloques adyacentes la gran mayoría del árbol debería ser la misma y, por lo tanto, los datos se pueden almacenar una vez y hacer referencia a ellos dos veces utilizando punteros (es decir, hashes de subárboles). Para lograrlo, se utiliza un tipo especial de árbol conocido como «árbol de Patricia», incluida una modificación del concepto de árbol de Merkle que permite que los nodos se inserten y eliminen —y no solo se cambien— eficientemente. Además, debido a que toda la información del estado es parte del último bloque, no hay necesidad de almacenar todo el historial de la cadena de bloques —una estrategia que, si se pudiera aplicar a Bitcoin— podría calcularse para ahorrar entre 5 y 20 veces más espacio.

Una pregunta habitual es «dónde» se ejecuta el código del contrato, en términos del hardware físico. Esto tiene una respuesta simple: el proceso de ejecución del código del contrato es parte de la definición de la función de transición de estado, que es parte del algoritmo de validación de bloques, por lo que si se añade una transacción al bloque `B`, la ejecución del código generada por esa transacción será ejecutada por todos los nodos, ahora y en el futuro, que descarguen y validen el bloque `B`.

## Aplicaciones {#applications}

En general, hay tres tipos de aplicaciones además de Ethereum. La primer categoría son las aplicaciones financieras, que ofrecen a los usuarios formas más potentes de gestionar y suscribir contratos con su dinero. Esto incluye submonedas, derivados financieros, contratos de cobertura, carteras de ahorro, testamentos e incluso, en última instancia, algunas clases de contratos de empleos a gran escala. La segunda categoría son las aplicaciones semifinancieras, donde el dinero está presente pero también le acompaña un importante factor no-monetario; un ejemplo perfecto son las recompensas autoaplicadas por resolver problemas computacionales. Por último, hay aplicaciones como el voto en línea y la gobernanza descentralizada que no son en absoluto financieras.

### Sistemas de tokens {#token-systems}

Los sistemas de token en la blockchain tienen muchas aplicaciones que van desde submonedas que representan activos, como el USD o el oro, hasta acciones de empresas, tokens individuales que representan propiedad inteligente, cuponse seguros infalsificables, e incluso sistemas de tokens sin ningún vínculo con un valor convecional en absoluto, utilizados como sistemas de puntos para incentivos. Los sistemas de token son sorprendentemente fáciles de implementar en Ethereum. El punto clave por retener es que una moneda, o sistema de token, fundamentalmente es una base de datos con una operación: restar X unidades de A y dar X unidades a B, con la disposición de que (1) A tuviera al menos X unidades antes de la transacción y (2) que la transacción la apruebe A. Lo único que se necesita para implementar un sistema de token es implementar esta lógica en un contrato.

El código básico para implementar un sistema de token en Serpent tiene este aspecto:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Esta es en esencia una implementación literal de la función de transición de estado de un «sistema bancario» descrita más arriba en este documento. Hay que añadir algunas líneas de código adicionales para crear, en primer lugar, el paso inicial en el que se distribuyen las unidades de moneda y otros casos extremos, e idóneamente se añadiría una función para permitir que otros contratos puedan consultar el saldo de una dirección. ¡Y eso es todo lo que hay que hacer! En teoría, los sistemas de tókenes basados en Ethereum que actúan como submonedas pueden incluir potencialmente otra funcionalidad importante de la que carecen las metamonedas basadas en la cadena de bloques de Bitcoin: la capacidad de pagar tarifas de transacción directamente en esa moneda. La forma en que se implementaría esto sería hacer que el contrato mantenga un saldo de ether con el cual reembolsaría el ether utilizado para pagar comisiones al remitente, y recargar este saldo recolectando las unidades de moneda interna que cobra en tarifas y revenderlas en una subasta en ejecución constante. De esta manera, los usuarios necesitarían «activar» sus cuentas con ether, pero una vez que el ether está ahí, sería reutilizable porque el contrato lo reembolsaría cada vez.

### Derivados financieros y monedas de valor estable {#financial-derivatives-and-stable-value-currencies}

Los derivados financieros son la aplicación más común de un «contrato inteligente», y uno de los más sencillos de implementar en código. El mayor desafío a la hora de implementar contratos financieros es que la mayoría de ellos requiere una referencia a una cotización externa; por ejemplo, una aplicación muy deseable es un contrato inteligente que protege contra la volatibilidad del ether (o de cualquier otra criptomoneda) con respecto al valor del dólar, pero hacer esto requiere que el contrato sepa el valor de la paridad ETH/USD. La forma más sencilla de hacerlo es a través de un contrato de "fuente de datos" mantenido por una parte específica (p. ej., NASDAQ) diseñado para que esa parte tenga la capacidad de actualizar el contrato según sea necesario, y que proporcione una interfaz que permita a otros contratos enviar un mensaje a ese contrato y obtener una respuesta que proporcione el precio.

Dado dicho ingrediente crítico, el contrato de cobertura se vería así:

1. Esperar a que la parte A introduzca 1.000 ether.
2. Esperar a que la parte B introduzca 1000 ether.
3. Almacenar el valor de 1.000 ether en USD, calculados mediante la consulta al contrato de la fuente de datos, en el almacenamiento, diegamos que es $x.
4. Transcurridos 30 días, permitir a A o B «reactivar» el contrato para enviar $x en ether (calculado mediante consulta al contrato de la fuente de datos para obtener el nuevo precio) a A y el resto a B.

Un contrato así tendría un gran potencial en el comercio en criptomonedas. Uno de los mayores problemas que se citan sobre las criptomonedas es su volatilidad. Aunque muchos usuarios y comerciantes quieran la seguridad y conveniencia de operar con activos criptográficos, tal vez no quieran afrontar la perspectiva de perder el 23 % del valor de sus fondos en un solo día. Hasta ahora, la solución más comúnmente propuesta ha sido la de los activos respaldados por el emisor; la idea es que un emisor crea una submoneda en la que tiene el derecho de emitir y revocar unidades, y proporciona una unidad de la moneda a cualquiera que le proporcione (fuera de línea) una unidad de un activo subyacente especificado (p. ej., oro, USD). El emisor por su parte se compromete a proporcionar una unidad del activo subyacente a cualquiera que envíe de vuelta una unidad del criptoactivo. Este mecanismo permite que cualquier activo no criptográfico pueda ser «recatalogado» en un activo criptográfico, siempre que se pueda confiar en el emisor.

En la práctica, sin embargo, los emisores no siempre son fiables, y en algunos casos la infraestructura bancaria es demasiado débil o demasiado hostil para que estos servicios existan. Los derivados financieros ofrecen una alternativa. Aquí, en lugar de un único emisor que proporciona los fondos para respaldar un activo, un mercado descentralizado de especuladores, que apuestan a que el precio de un activo de referencia criptográfico (p. ej., ETH) subirá, desempeña ese papel. A diferencia de los emisores, los especuladores no tienen la opción de suspender pagos en su parte del acuerdo, porque el contrato de cobertura mantiene sus fondos en fideicomiso. Observe que este enfoque no está completamente descentralizado, dado que todavía se necesita una fuente de confianza para proporcionar el indicador de precios, aunque presumiblemente incluso esto sea una notable mejora en términos de reducción de requisitos de infraestructura (a diferencia de ser un emisor, la emisión de una fuente de precios no requiere ninguna licencia y es probable que se pueda categorizar dentro de la libre expresión) y de reducción del riesgo de fraude.

### Sistemas de identidad y reputación {#identity-and-reputation-systems}

La primera criptomoneda alternativa, [Namecoin](http://namecoin.org/), intentó usar una cadena de bloques similar a la de Bitcoin para proporcionar un sistema de registro de nombres, donde los usuarios pueden registrar sus nombres en una base de datos pública junto con otros datos. El principal caso de uso citado es para un sistema [DNS](https://wikipedia.org/wiki/Domain_Name_System), que mapea nombres de dominio como "bitcoin.org" (o, en el caso de Namecoin, "bitcoin.bit") a una dirección IP. Otros casos de uso incluyen la autenticación de correo electrónico y sistemas de reputación potencialmente más avanzados. He aquí el contrato básico para proporcionar un sistema de registro de nombres similar a Namecoin en Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

El contrato es muy simple; es una base de datos dentro de la red Ethereum que se puede agregar, pero no modificar ni eliminar. Cualquiera puede registrar un nombre con algún valor, y ese registro se mantiene para siempre. Un contrato de registro de nombres más sofisticado también tendrá una "cláusula de función" que permitirá a otros contratos consultarlo, así como un mecanismo para que el "propietario" (es decir, el primer registrador) de un nombre cambie los datos o transfiera la propiedad. Incluso se puede añadir la reputación y la funcionalidad web de confianza en la parte superior.

### Almacenamiento de archivos descentralizado {#decentralized-file-storage}

En los últimos años, ha surgido una serie de almacenamientos de archivos en línea populares, siendo Dropbox el más destacado, que permite a los usuarios cargar una copia de seguridad de su disco duro y tener el servicio de almacenamiento de la copia de seguridad y permitir al usuario acceder a ella a cambio de una cuota mensual. Sin embargo, en este punto el mercado de almacenamiento de archivos es a veces relativamente ineficiente; una mirada superficial a varias soluciones existentes muestra que, particularmente en el «valle misterioso» del nivel de 20-200 GB en que ni las cuotas libres, ni los descuentos a nivel de empresa se ponen en marcha, los precios mensuales de los costes de almacenamiento de archivos principales son tales que usted está pagando más que el coste de todo el disco duro en un solo mes. Los contratos de Ethereum pueden permitir el desarrollo de un
ecosistema de almacenamiento de archivos descentralizado, donde los usuarios individuales pueden ganar pequeñas cantidades de dinero alquilando sus propios discos duros y el espacio no utilizado puede servir para reducir aún más el coste del almacenamiento de archivos.

La pieza clave fundamental de dicho dispositivo sería lo que hemos llamado
el «contrato Dropbox descentralizado». Este contrato funciona como se indica a continuación. First, one splits the desired data up into blocks, encrypting each block for privacy, and builds a Merkle tree out of it. Se crea entonces un contrato con la regla de que cada N bloques, el contrato elegirá un índice aleatorio en el árbol de Merkle (usando el hash del bloque anterior, accesible desde el código del contrato, como fuente de aleatoriedad), y dará X ether a la primera entidad que proporcione una transacción con una prueba de propiedad similar a la verificación de pago simplificado del bloque para ese índice específico del árbol. Cuando un usuario quiere volver a descargar su archivo, puede usar un protocolo de canal de micropagos (p. ej., pagar 1 szabo por 32 kilobytes) para recuperar el archivo; el enfoque más eficiente en cuanto a comisiones es que el pagador no publique la transacción hasta el final, sino que la reemplace por una ligeramente más lucrativa con el mismo nonce después de cada 32 kilobytes.

Una característica importante del protocolo es que, aunque pueda parecer que se confía en que muchos nodos aleatorios decidan no olvidar el archivo, se puede reducir ese riesgo a casi cero dividiendo el archivo en muchas piezas a través de una compartición secreta, y observar los contratos para comprobar si cada pieza sigue en posesión de algunos nodos. Si un contrato sigue remunerando, esto proporciona una prueba criptográfica de que alguien todavía está almacenando el archivo.

### Organizaciones autónomas descentralizadas {#decentralized-autonomous-organizations}

El concepto general de una «organización autónoma descentralizada» (DAO, por sus siglas en inglés) es el de una entidad virtual que tiene cierto número de miembros o accionistas que, quizás con una mayoría del 67 %, tienen el derecho a gastar los fondos de la entidad y modificar su código. Los miembros decidirían colectivamente el modo en el que la organización debe destinar sus fondos. Los métodos para destinar los fondos de una DAO podrían variar, desde recompensas y sueldos, hasta mecanismos más exóticos, como una moneda interna para recompensar el trabajo. Esto esencialmente replica los elementos legales de una empresa tradicional o sin fines de lucro, pero utiliza solo tecnología criptográfica de cadena de bloques para su cumplimiento. Hasta ahora, gran parte de las conversaciones sobre las DAO giraban en torno al modelo «capitalista» de una «corporación autónoma descentralizada» (o DAC, por sus siglas en inglés), con accionistas que reciben dividendos y acciones negociables. Una alternativa tal vez descrita como una «comunidad autónoma descentralizada» haría que todos los miembros tuvieran una parte idéntica en la toma de decisiones y requeriría que el 67 % de los miembros existentes
aceptaran añadir o eliminar a un miembro. El grupo debería imponer colectiviamente el requisito de que una persona pueda ser miembro solo una vez.

Un esquema general de cómo implementar una DAO es el siguiente: El diseño más simple consiste en una sección de código automodificable que cambia si dos tercios de los miembros están de acuerdo en un cambio. Aunque el código es teóricamente inmutable, esto se puede eludir fácilmente y tener mutabilidad de facto mediante fragmentos del código en contratos separados, y teniendo la dirección de los contratos que puedan considerar guardados en el almacenamiento modificable. En una sencilla implementación de dicho contrato DAO, habría tres
tipos de transacción, diferenciados por los datos proporcionados en la
transacción:

- `[0,i,K,V]` para registrar una propuesta con el índice `i` para cambiar la dirección en el índice de almacenamiento `K` al valor `V`
- `[1,i]` para registrar un voto a favor de la propuesta `i`
- `[2,i]` para finalizar la propuesta `i` si se han realizado suficientes votos

El contrato tendría entonces cláusulas para cada una de ellas. Mantendría un registro de todos los cambios de almacenamiento abiertos, junto con una lista de quienes los han votado. También tendría una lista de todos los miembros. Cuando cualquier cambio de almacenamiento alcanza el voto de dos tercios de los miembros, una transacción finalizadora podría ejecutar el cambio. Un esqueleto más sofisticado también tendría una capacidad de votación incorporada para características como el envío de una transacción, la adición de miembros y la eliminación de miembros, e incluso podría prever una delegación de votos al estilo de la [Democracia Líquida](https://wikipedia.org/wiki/Liquid_democracy) (es decir, cualquiera puede asignar a alguien para que vote por él, y la asignación es transitiva, por lo que si A asigna a B y B asigna a C, entonces C determina el voto de A). Este diseño permitiría que la DAO crezca orgánicamente como una comunidad descentralizada, permitiendo que la gente eventualmente delegue la tarea de filtrar quién sería miembro a especialistas, aunque a diferencia de lo que ocurre en el «sistema actual», los especialistas pueden aparecer y desaparecer a medida que los miembros individuales de la comunidad cambian de postura.

Hay un modelo alternativo para una corporación descentralizada, donde cualquier cuenta puede tener cero o más acciones, y se necesitan dos tercios de las acciones para tomar una decisión. A complete skeleton would involve asset management functionality, the ability to make an offer to buy or sell shares, and the ability to accept offers (preferably with an order-matching mechanism inside the contract). La delegación también existiría al estilo de la Democracia líquida, generalizando el concepto de un «consejo directivo».

### Otras aplicaciones {#further-applications}

**1. Carteras de ahorro**. Supongamos que Alice quiere mantener sus ahorros a salvo, pero le preocupa perder su clave privada o que alguien la piratee. Entonces pone ether en un contrato con Bob, un banco, de la siguiente manera:

- Alice solo puede retirar un máximo del 1 % de los fondos por día.
- Bob por su parte solo puede retirar un máximo del 1% de los fondos por día, pero Alice tiene la habilidad para realizar una transacción con su clave que elimine esta habilidad.
- Alice y Bob juntos pueden retirar cualquier cantidad.

Normalmente, el 1% diario es suficiente para Alice, y si ella quiere retirar fondos, puede contactar a Bob para que le ayude. Si se piratea la clave de Alice, ella se dirige a Bob para mover los fondos a un nuevo contrato lo más rápido posible. Si pierde su clave, Bob sacará los fondos eventualmente. Si resulta que Bob tiene malas intenciones, entonces ella puede desactivar su capacidad de retirar fondos.

**2. Seguro de cosecha**. Uno puede hacer fácilmente un contrato de derivados financieros, pero utilizando una fuente de datos del clima, en lugar de cualquier índice de precios. Si un agricultor en Iowa compra un derivado que paga inversamente en función de las precipitaciones en Iowa, entonces si hay una sequía, el agricultor recibirá dinero automáticamente y si hay suficiente lluvia, el agricultor estará feliz porque a sus cultivos les iría bien. Esto puede ampliarse a los seguros de desastres naturales en general.

**3. Una fuente de datos descentralizada**. Para los contratos financieros por diferencia, podría ser posible descentralizar la fuente de datos a través de un protocolo llamado "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". SchellingCoin funciona básicamente de la siguiente manera: N partes introducen en el sistema el valor de un dato determinado (p. ej., el precio ETH/USD), los valores se ordenan y todos los que se encuentren entre el percentil 25 y el 75 obtienen un token como recompensa. Todos tienen el incentivo de proporcionar la respuesta que todos los demás proporcionarán, y el único valor en el que un gran número de jugadores pueden estar de acuerdo de manera realista es el valor predeterminado obvio: la verdad. Esto crea un protocolo descentralizado que teóricamente puede proporcionar cualquier número de valores, incluido el precio ETH/USD, la temperatura en Berlín o incluso el resultado de un cálculo particularmente dificil.

**4. Fideicomiso multifirma inteligente**. Bitcoin permite contratos de transacción multifirma donde, por ejemplo, tres de las cinco claves dadas pueden gastar los fondos. Ethereum permite una mayor granularidad; por ejemplo, cuatro de los cinco pueden gastarlo todo, tres de los cinco pueden gastar hasta un 10 % al día y dos de los cinco pueden gastar hasta un 0,5 % al día. Además, la multifirma de Ethereum es asíncrona: dos partes pueden registrar sus firmas en la cadena de bloques en diferentes momentos y la última firma enviará automáticamente la transacción.

**5. Computación en la nube**. La tecnología EVM también se puede utilizar para crear un entorno informático verificable, lo que permite a los usuarios pedir a otros que realicen cálculos y luego, opcionalmente, solicitar pruebas de que los cálculos en ciertos puntos de control seleccionados al azar se realizaron correctamente. Esto permite la creación de un mercado de computación en la nube en el que cualquier usuario puede participar con su ordenador de sobremesa, portátil o servidor especializado, y las comprobaciones puntuales junto con los depósitos de seguridad pueden utilizarse para garantizar que el sistema es fiable (es decir, que los nodos no pueden hacer trampas de forma rentable). Aunque puede que tal sistema no sea el adecuado para todas las tareas; estas requieren un alto nivel de comunicación entre procesos, por ejemplo, no se pueden realizar fácilmente en una gran nube de nodos. Otras tareas, sin embargo, son mucho más fáciles de hacer en paralelo; proyectos como SETI@home, folding@home y algoritmos genéticos se pueden implementar fácilmente sobre dicha plataforma.

**6. Apuestas entre pares**. Cualquier número de protocolos de juego entre pares, como el [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) de Frank Stajano y Richard Clayton, se puede implementar en la cadena de bloques de Ethereum. El protocolo de juego más sencillo es, en realidad simplemente, un contrato por diferencia en el siguiente hash de bloque, y se pueden construir protocolos más avanzados a partir de ahí, creando servicios de juego con tárifas cercanas a cero que no tienen la capacidad de hacer trampa.

**7. Mercados de predicciones**. Con un oráculo o SchellingCoin, los mercados de predicción también son fáciles de implementar, y los mercados de predicción junto con SchellingCoin pueden llegar a ser la primera aplicación principal de la [futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) como protocolo de gobernanza para las organizaciones descentralizadas.

**8. Mercados descentralizados en la cadena**, utilizando el sistema de identidad y reputación como base.

## Miscelánea e inquietudes {#miscellanea-and-concerns}

### Implementación de GHOST modificada {#modified-ghost-implementation}

El protocolo "Greedy Heaviest Observed Subtree" (GHOST) es una innovación introducida por primera vez por Yonatan Sompolinsky y Aviv Zohar en [diciembre de 2013](https://eprint.iacr.org/2013/881.pdf). La motivación subyacente a GHOST es que las cadenas de bloques con tiempos de confirmación rápidos actualmente sufren una seguridad reducida debido a una alta tasa de obsolescencia, ya que los bloques tardan cierto tiempo en propagarse a través de la red, si el minero A extrae un bloque y luego el minero B extrae otro bloque, antes de que el bloque del minero A se propague a B, el bloque del minero B se desperdiciará y no contribuirá a la seguridad de la red. Además, hay un problema de centralización: si suponemos que el minero A es una plataforma de minería con un 30 % de potencia de hash y que el minero B tiene un 10 % de potencia de hash, el minero A correrá el riesgo de producir bloques obsoletos el 70 % del tiempo (ya que en el otro 30 % del tiempo, el minero A producirá el último bloque y entonces obtendrá los datos de minado inmediatamente) mientras que el minero B correrá el riesgo de producir bloques obsoletos el 90 % del tiempo. Por lo tanto, si el intervalo de bloque es lo suficientemente corto como para que la tasa obsoleta sea alta, A será sustancialmente más eficiente, simplemente en virtud de su tamaño. Con estos dos efectos combinados, es muy probable que las cadenas de bloques que producen bloques rápidamente conduzcan a que un grupo de míneria tenga un porcentaje lo suficientemente grande del poder de hash de la red para tener control de facto sobre el proceso de mineria.

Como lo describen Sompolinsky y Zohar, GHOST resuelve el primer problema de la pérdida de seguridad de la red al incluir bloques obsoletos en el cálculo de qué cadena es la «más larga»; es decir, no solo el padre y los ancestros de un bloque, sino también los descendientes obsoletos del ancestro del bloque (conocidos en la jerga de Ethereum, como «tíos») se añaden al cálculo de qué bloque tiene la mayor prueba de trabajo que lo respalda. Para resolver el segundo problema del sesgo de centralización, vamos más allá del protocolo descrito por Sompolinsky y Zohar, y también proporcionamos recompensas en bloque a los obsoletos: un bloque obsoleto recibe el 87,5 % de su recompensa base, y el sobrino que incluye el bloque obsoleto recibe el resto del 12,5 %. Sin embargo, las tasas de transacción no se otorgan a los tíos.

En Ethereum, se emplea una versión simplificada de GHOST que se solo extiende hasta siete niveles. Concretamente, se define de la manera siguiente:

- Un bloque debe especificar un padre, y debe especificar 0 o más tíos.
- Un bloque tío incluido en el bloque B debe tener las siguientes propiedades:
  - Debe ser un hijo directo del k-ésimo ancestro de la generación de B, donde `2 <= k <= 7`.
  - No puede ser ancestro de B
  - Un tío debe ser una cabecera de bloque válida, pero no necesita ser un bloque previamente verificado, ni siquiera válido.
  - Un tío debe ser distinto de todos los tíos incluidos en bloques anteriores y de todos los otros tíos incluidos en el mismo bloque (no debe haber doble inclusión).
- Por cada tío U en el bloque B, el minero de B recibe un 3,125 % adicional, añadido a su recompensa de coinbase, y el minero de U recibe el 93,75 % de una recompensa de coinbase estándar.

Esta versión limitada de GHOST, con tíos que solo se pueden incluir hasta 7 generaciones, se utilizó por dos razones. Primero, GHOST ilimitado incluiría demasiadas complicaciones en el cálculo de qué tíos son válidos para un bloque determinado. En segundo lugar, GHOST ilimitado con compensación como se usa en Ethereum elimina el incentivo para que un minero extraiga en la cadena principal y no en la cadena de un atacante público.

### Comisiones {#fees}

Debido a que cada transacción publicada en la cadena de bloques impone a la red el coste de descargarla y verificarla, se necesita algún mecanismo regulatorio, que generalmente involucra tarifas de transacción, para evitar abusos. El enfoque predeterminado, utilizado en Bitcoin, es tener tarifas puramente voluntarias, confiando en que los mineros actúen como guardianes y establezcan mínimos dinámicos. Este enfoque ha gozado de una gran acogida en la comunidad de Bitcoin, particularmente porque está «basado en el mercado», lo que permite que la oferta y la demanda entre los mineros y los remitentes de transacciones determinen el precio. Sin embargo, el problema con esta línea de razonamiento es que el procesamiento de transacciones no es un mercado. Aunque es intuitivamente atractivo interpretar el procesamiento de transacciones como un servicio que el minero ofrece al remitente, en realidad, cada transacción que incluya un minero deberá procesarla cada nodo de la red, por lo que la gran mayoría del coste de la transacción el procesamiento corre a cargo de terceros y no del minero que está tomando la decisión de incluirlo o no. Por lo tanto, es muy probable que surjan problemas del estilo «tragedia de los comunes».

Sin embargo, resulta que este fallo en el mecanismo basado en el mercado, cuando se le da un supuesto simplificador particular e inexacto, se cancela por arte de magia. El argumento es el siguiente. Supongamos que:

1. Una transacción conduce a `k` operaciones, ofreciendo la recompensa `kR` a cualquier minero que la incluya, donde `R` lo establece el remitente y `k` y `R` son (aproximadamente) visibles para el minero de antemano.
2. Una operación tiene un coste de procesamiento de `C` para cualquier nodo (es decir, todos los nodos tienen la misma eficiencia).
3. Hay `N` nodos de minería, cada uno con exactamente la misma potencia de procesamiento (es decir, `1/N` del total).
4. No existen nodos completos que no minen.

Un minero estaría dispuesto a procesar una transacción si la recompensa esperada es mayor que el coste. Por lo tanto, la recompensa esperada es `kR/N`, ya que el minero tiene una probabilidad de `1/N` de procesar el siguiente bloque, y el coste de procesamiento para el minero es simplemente `kC`. Por lo tanto, los mineros incluirán transacciones donde `kR/N > kC`, o `R > NC`. Tenga en cuenta que `R` es la comisión por operación proporcionada por el remitente, y por lo tanto es un límite inferior del beneficio que el remitente obtiene de la transacción, y `NC` es el coste para toda la red en conjunto de procesar una operación. Por eso, los mineros tienen el incentivo de incluir solo aquellas transacciones cuyo beneficio utilitario total exceda el coste.

No obstante, hay varias desviaciones de esos supuestos en la realidad:

1. El minero paga un coste superior para procesar la transacción que otros nodos de verificación, ya que el tiempo de verificación adicional retrasa la propagación del bloque y, por lo tanto, aumenta la probabilidad de que el bloque se convierta en caducado.
2. Existen nodos completos no minables.
3. La distribución de potencia de minado puede acabar siendo radicalmente desigualitaria en la práctica.
4. Los especuladores, enemigos políticos y dementes, cuya función de utilidad incluye causar daño a la red, existen y pueden establecer hábilmente contratos cuyo coste es mucho menor que el coste pagado por otros nodos de verificación.

(1) proporciona una tendencia para que el minero incluya menos transacciones, y (2) aumenta `NC`; por lo tanto, estos dos efectos se anulan mutuamente al menos en parte.<sup>[¿Cómo?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) y (4) son el problema principal; para resolverlos, simplemente instituimos un límite flotante: ningún bloque puede tener más operaciones que `BLK_LIMIT_FACTOR` veces el promedio móvil exponencial a largo plazo.
Específicamente:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` y `EMA_FACTOR` son constantes que se establecerán en 65536 y 1,5 por el momento, pero que probablemente se cambiarán después de un análisis más profundo.

Hay otro factor que desincentiva los grandes tamaños de bloques en Bitcoin: la propagación de bloques que son grandes llevará más tiempo y tendrán mayor probabilidad de volverse rancios. En Ethereum, los bloques que consumen la mayor cantidad de gas pueden tardar más en propagarse, porque sus dimensiones son mayores y porque les lleva más tiempo procesar las transiciones del estado por validar. Este desincentivo por demora es una consideración importante en Bitcoin, aunque menos en Ethereum debido al protocolo GHOST; por lo tanto, confiar en límites de bloques regulados proporciona una base más estable.

### Computación y completitud de Turing {#computation-and-turing-completeness}

Un dato importante a tener en cuenta es que la máquina virtual de Ethereum es Turing al 100 %; esto implica que el código de la EVM puede representar cualquier cálculo que pueda concebirse, incluyendo bucles infinitos. El código de la EVM permite realizar bucles de dos maneras. Primero, hay una instrucción `JUMP` que permite al programa saltar a un punto anterior en el código, y una instrucción `JUMPI` para hacer saltos condicionales, permitiendo sentencias como `while x < 27: x = x * 2`. En segundo lugar, los contratos pueden invocar a otros contratos, lo que permite potenciales bucles a través de la recursión. Esto lleva naturalmente a un problema: ¿pueden los usuarios maliciosos paralizar a los mineros y a los nodos completos al obligarlos a entrar en un bucle infinito? El problema surge debido a un dilema en la informática conocido como el problema de la detención: generalmente no hay forma de saber si tal programa se va a detener o no.

Como se explica en la sección de transición de estado, nuestra solución funciona al requerir que una transacción establezca un número máximo de pasos computacionales que se le permiten tomar, y si la ejecución lleva más tiempo, la computación se revierte, pero las tarifas se siguen pagando. Los mensajes funcionan del mismo modo. Para ilustrar la motivación detrás de nuestra solución, considera los siguientes ejemplos:

- Un atacante crea un contrato que ejecuta un bucle infinito y luego envía una transacción para activarle ese bucle al minero. El minero procesa la transacción, ejecutando de esta manera el bucle infinito, y espera a que se le agote el gas. Aunque la ejecución se quede sin gas y se detenga a la mitad, la transacción sigue siendo válida y el minero todavía cobra la tarifa al atacante por cada paso computacional.
- Un atacante crea un bucle infinito extremadamente largo para obligar al minero a realizar cálculos durante tanto tiempo que, de manera que cuando termine la computación, aparecen varios bloques más y no es posible que el minero incluya la transacción para reclamar la tarifa. Sin embargo, el atacante deberá presentar un valor para `STARTGAS` que limite el número de pasos computacionales que puede tomar la ejecución, por lo que el minero sabrá de antemano que la computación tomará un número excesivamente grande de pasos.
- Un atacante ve un contrato con un código de alguna forma como `send(A,contract.storage[A]); contract.storage[A] = 0`, y envía una transacción con el gas justo para ejecutar el primer paso pero no el segundo (es decir, hacer una retirada pero no dejar que el saldo baje). El autor del contrato no se tiene que preocuparse por protegerse contra este tipo de ataques, ya que si la ejecución se detiene a la mitad, los cambios se revierten.
- Un contrato financiero funciona tomando el punto medio de nueve fuentes de datos en propiedad con el objetivo de reducir el riesgo al mínimo. Un atacante toma el control de una de las fuentes de datos, la cual está diseñada para que se modifique mediante el mecanismo de llamada-dirección-variable, descrito en la sección de DAO, y la convierte en un bucle infinito, intentando de esta manera forzar que cualquier intento de reclamar fondos del contrato financiero se quede sin gas. Sin embargo, el contrato financiero puede configurarse limitando el gas en el mensaje para que este problema no suceda.

La alternativa a la completitud de Turing es la incompletitud de Turing, donde `JUMP` y `JUMPI` no existen y solo se permite que exista una copia de cada contrato en la pila de llamadas en un momento dado. Con este sistema, el sistema de tarifas descrito y las incertidumbres en torno a la eficacia de nuestra solución podrían no ser necesarios, ya que el coste de ejecutar un contrato estaría limitado por su tamaño. Además, la Turing incompletitud ni siquiera es una limitación tan significativa; de todos los ejemplos de contratos que hemos concebido internamente, solo uno requería de un bucle hasta el momento, e incluso ese bucle se puede eliminar haciendo 26 repeticiones de una línea de código. Dadas las graves implicaciones de la conclusión de Turing y el beneficio limitado, ¿por qué no basta con tener un lenguaje incompleto de Turing? En la práctica, no obstante, la inconclusión de Turing está lejos de ser la solución perfecta al problema. Examina los siguientes contratos para entender el por qué:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (ejecutar un paso de un programa y registrar el cambio en el almacenamiento)
```

Ahora, envié una transacción a A. Así, en 51 transacciones, tenemos un contrato que ocupa 2<sup>50</sup> pasos computacionales. Los mineros pueden intentar detectar este tipo de bombas lógicas con antelación manteniendo un valor junto a cada contrato que especifique el número máximo de pasos computacionales que pueden adoptar, y calculándolo para contratos que llaman recursivamente a otros contratos. Sin embargo, eso requiere que los mineros prohíban contratos que creen otros contratos (ya que la creación y ejecución de los 26 contratos mencionados anteriormente podría integrar fácilmente en un solo contrato). Otro punto problemático es que el campo de dirección de un mensaje es una variable, por lo que, en general, puede que ni siquiera se pueda saber qué otros contratos dentro de un contrato determinado se invocarán antes de tiempo. Por lo tanto y en definitiva, tenemos una conclusión sorprendente: la conclusión de Turing es sorprendentemente fácil de gestionar y la falta de conclusión de Turing también es sorprendentemente dificil de gestionar, a menos que se establezcan exactamente los mismos controles, pero en ese caso ¿por qué no dejar que el protocolo sea completo de Turing?

### Moneda y emisión {#currency-and-issuance}

La red Ethereum incluye su propia moneda incorporada, ether, cuyo propósito consiste tanto en proporcionar una capa de liquidez primaria para permitir un intercambio eficiente entre diversos tipos de activos digitales, como de proporcionar un mecanismo para pagar tarifas de transacción, lo cual es más importante. Por mayor comodidad y para evitar futuras discusiones (como el actual debate sobre mBTC/uBTC/satoshi en Bitcoin), las denominaciones aparecen preetiquetadas:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Esto debe considerarse como una versión ampliada del concepto de «dólares» y «centavos» o «BTC» y «satoshi». En un futuro cercano, esperamos que «ether» se utilice para transacciones ordinarias, «finney» para microtransacciones y «szabo» y «wei» para discusiones técnicas relacionadas con tarifas e implementación de protocolos; el resto de denominaciones podrían ser útiles más adelante y no se deben incluir en los clientes en este momento.

El modelo de emisión será el siguiente:

- Ether se va a poner a la venta en una oferta de moneda al precio de 1.000-2.000 ether por BTC, un mecanismo destinado a financiar la organización de Ethereum y a pagar el desarrollo que fue exitoso en otras plataformas como Mastercoin y NXT. Los primeros compradores van a obtener descuentos más grandes. Los BTC que se reciban de la venta se destinarán íntegramente al pago de salarios y a recompensas a los desarrolladores, al igual que a la inversión en varios proyectos con y sin fines de lucro en el ecosistema de Ethereum y de criptomonedas en general.
- Se va a asignar el x 0,099 del monto total vendido (60102216 ETH) a la organización para compensar a los primeros contribuyentes y para pagar los gastos denominados en ETH antes del bloque génesis.
- Del monto total vendido, el x 0,099 se va a mantener como una reserva a largo plazo.
- Del monto total vendido, se va a asignar anualmente el x 0,26 a los mineros de manera indefinida a partir de ese momento.

| Grupo                          | Durante el lanzamiento | Tras 1 año | Tras 5 años |
| ------------------------------ | ---------------------- | ---------- | ----------- |
| Unidades de divisa             | x1,198                 | x1,458     | x2,498      |
| Compradores                    | 83,5%                  | 68,6%      | 40,0%       |
| Reserva gastada en la preventa | 8,26%                  | 6,79%      | 3,96%       |
| Reserva usada en la posventa   | 8,26%                  | 6,79%      | 3,96%       |
| Mineros                        | 0 %                    | 17,8%      | 52,0%       |

#### Tasa de crecimiento del suministro a largo plazo (porcentaje)

![Inflación de Ethereum](./ethereum-inflation.png)

_A pesar de la emisión lineal de moneda, a igual que con Bitcoin, con el tiempo la tasa de crecimiento de la oferta tiende a cero._

Las dos opciones principales en el modelo anterior son (1) la existencia y el tamaño de un fondo de dotación, y (2) la existencia de una oferta lineal en permanente crecimiento, a diferencia de una oferta limitada como en Bitcoin. La justificación del fondo de dotación es la siguiente. Si el fondo de dotación no existiera, y la emisión lineal se redujera a x 0,217 para proporcionar la misma tasa de inflación, entonces la cantidad total de ether sería un 16,5 % menor y, por lo tanto, cada unidad sería un 19,8 % más valiosa. Por lo tanto, en el equilibrio se compraría un 19,8 % más ether en la venta, por lo que cada unidad volvería a ser exactamente tan valiosa como antes. La organización también tendría entonces 1,198 veces más BTC, que se puede considerar dividido en dos porciones: el BTC original y el 0,198 veces adicional. Por lo tanto, esta situación es _exactamente equivalente_ a la dotación, pero con una diferencia importante: la organización posee únicamente BTC, por lo que no tiene incentivos para respaldar el valor de la unidad de ether.

El modelo de crecimiento lineal permanente de la oferta reduce el riesgo de lo que algunos ven como una concentración excesiva de riqueza de Bitcoin y brinda a las personas que viven en épocas presentes y futuras una oportunidad justa de aquirir unidades monetarias, al mismo tiempo que conserva un fuerte incentivo para obtener y mantener ether, porque la «tasa de crecimiento de la oferta» como porcentaje todavía tiende a cero con el tiempo. También teorizamos que, como las monedas siempre se pierden con el tiempo por descuido, muerte, etc., y la pérdida de monedas puede modelarse como un porcentaje del suministro total por año, el suministro total de moneda en circulación se estabilizará finalmente en un valor igual a la emisión anual dividida por la tasa de pérdida (p. ej., a una tasa de pérdida del 1 %, una vez que el suministro alcance 26X, se minarán 0,26X y se perderán 0,26X cada año, creando un equilibrio).

Tenga en cuenta que, en el futuro, es probable que Ethereum cambie a un modelo de prueba de participación por motivos de seguridad, reduciendo el requisito de emisión de entre cero y 0,05 veces por año. En el caso de que la organización de Ethereum pierda financiación o desaparezca por cualquier otro motivo, dejamos abierto un "contrato social": cualquiera tiene derecho a crear una futura versión candidata de Ethereum, con la única condición de que la cantidad de ether debe ser como máximo igual a `60102216 * (1,198 + 0,26 * n)` donde `n` es el número de años después del bloque de génesis. Los creadores son libres de realizar ventas colectivas o asignar parte o la totalidad de la diferencia entre la expansión de la oferta impulsada por PoS y la expansión de la oferta máxima permitida para pagar el desarrollo. Las actualizaciones de candidatos que no cumplan con el contrato social pueden, justificadamente, bifurcarse en versiones compatibles.

### Centralización de la minería {#mining-centralization}

El algoritmo de míneria de Bitcoin funciona haciendo que los mineros calculen SHA256 en versiones ligeramente modificadas del encabezado del bloque millones de veces una y otra vez, hasta que finalmente un nodo genera una versión cuyo hash es menor que el objetivo (actualmente alrededor de 2<sup>192</sup>). Sin embargo, este algoritmo de míneria es vulnerable a dos forma de centralización. En primer lugar, el ecosistema minero ha llegado a estar dominado por los ASIC (circuitos integrados de aplicaciones específicas), chips de computadora diseñados para la tarea específica de la minería de Bitcoin y, por lo tanto, miles de veces más eficientes. Esto significa que la minería de Bitcoin ya no es una actividad altamente descentralizada o igualitaria, que requiere millones de dólares de capital para participar efectivamente. En segundo lugar, la mayoría de los míneros de Bitcoin en realidad no realizan la validación de bloques localmente; en cambio, dependen de un grupo de míneria centralizado para proporcionar los encabezados de los bloques. Podría decirse que este problema es peor: al momento de escribir este artículo, los tres grupos principales de míneria controlan indirectamente aproximadamente el 50 % de la potencia de procesamiento en la red de Bitcoin, aunque esto se ve mitigado por el hecho de que los mineros pueden cambiar a otros grupos de míneria si un grupo o coalición intenta un ataque del 51 %.

La intención actual en Ethereum es utilizar un algoritmo de míneria en el que los mineros deben obtener datos aleatorios del estado, calcular algunas transacciones seleccionadas al azar de los últimos N bloques de la cadena de bloques y devolver el hash del resultado. Esto tiene dos ventajas importantes. Primero, los contratos de Ethereum pueden incluir cualquier tipo de computación, por lo que un ASIC de Ethereum sería esencialmente un ASIC para la computación general, es decir, una mejor CPU. En segundo lugar, la míneria requiere acceso a toda la cadena de bloques, lo que obliga a los mineros a almacenar toda la cadena de bloques y al menos ser capaces de verificar cada transacción. Esto elimina la necesidad de grupos de míneria centralizados; aunque las reservas de minería aún pueden desempeñar el papel legítimo de equilibrar la aleatoriedad en la distribución de recompensas, esta función puede ser igualmente cumplida por reservas entre pares sin control central.

Este modelo aún no ha sido probado, y puede haber dificultades a lo largo del camino para evitar ciertas optimizaciones inteligentes cuando se utiliza la ejecución del contrato como algoritmo de minado. Sin embargo, una característica notablemente interesante de este algoritmo
es que permite a cualquiera «envenenar el pozo», al introducir
un gran número de contratos en la cadena de bloques específicamente diseñados para bloquear ciertos ASIC. Existen incentivos económicos para que los fabricantes de ASIC utilicen un truco así para atacarse mutuamente. Por tanto, la solución que estamos desarrollando es en última instancia, una solución adaptativa humana en vez de una solución puramente técnica.

### Escalabilidad {#scalability}

Una preocupación común en Ethereum es la cuestión de la escalabilidad. Así como Bitcoin, Ethereum sufre el desperfecto de que cada transaccion debe ser procesada por todos los nodos dentro de la red. Con Bitcoin, el tamaño actual de la cadena de bloques se estima es de alrededor de 15 GB, incrementando su tamaño en alrededor de 1 MB por hora. Si la red de Bitcoin procesara 2.000 transacciones por segundo, crecería entre 1 MB por cada tres segundos (1 GB por hora, 8 TB por año). Es probable que Ethereum sufra un patrón de crecimiento similar, empeorado por el hecho de que habrá muchas aplicaciones funcionando además de la cadena de bloque de Ethereum, en lugar de solo una moneda, como es el caso de Bitcoin, pero mitigado por el hecho de que los nodos completos de Ethereum necesitan almacenar sólo el estado en lugar de todo el historial de la cadena de bloques.

El problema con un tamaño tan grande de cadena de bloques es el riesgo de centralización. Si el tamaño de la cadena de bloques incrementara, por decir, 100 TB, entonces el posible escenario sería que solo una pequeña parte de los numerosos negocios se ejecurarían por nodos enteros y todos los usuarios utilizarían nodos ligeros SPV. En tal situación, surge la preocupación potencial de que los nodos completos puedan unirse y acordar hacer trampas de alguna manera rentable (p. ej., cambiar la recompensa de bloque, darse a sí mismos BTC). Los nodos de luz no tendrían forma de detectarlo inmediatamente. Por supuesto, probablemente existiría al menos un nodo completo honesto, y al cabo de unas horas la información sobre el fraude se iría filtrando a través de canales como Reddit, pero llegados a ese punto sería demasiado tarde: correspondería a los usuarios ordinarios organizar un esfuerzo para elaborar una lista negra de dichos bloques, un problema masivo y probablemente no factible de coordinación a una escala similar a la de lograr con éxito un ataque del 51 %. En el caso de Bitcoin, esto es actualmente un problema, pero existe una modificación de la cadena de bloques [sugerida por Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) que aliviará este problema.

A corto plazo, Ethereum utilizará dos estrategias adicionales para hacer frente a este problema. Primera, dados los algoritmos de minado basados en la cadena de bloque, todos y cada uno de los mineros estarán obligados a ser nodos completos, creando un límite inferior en el número de nodos completos. Segunda —y sin embargo, más importante—, incluiremos una raíz del árbol de estado intermedio en la cadena de bloques después de procesar cada transacción. Incluso si la validación del bloque está centralizada, siempre y cuando exista un nodo de verificación honesto, el problema de la centralización se puede eludir a través de un protocolo de verificación. Si un minero publica un bloque no válido, ese bloque debe estar mal formateado o el estado `S[n]` es incorrecto. Dado que se sabe que `S[0]` es correcto, debe haber un primer estado `S[i]` que sea incorrecto donde `S[i-1]` sea correcto. El nodo de verificación proporcionaría el índice `i`, junto con una "prueba de invalidez" que consiste en el subconjunto de nodos del árbol de Patricia necesarios para procesar `APPLY(S[i-1],TX[i]) -> S[i]`. Los nodos podrían usar esos nodos para ejecutar esa parte del cálculo y ver que el `S[i]` generado no coincide con el `S[i]` proporcionado.

Otro ataque más sofisticado implicaría que los mineros maliciosos publiquen bloques incompletos, por lo que la información completa ni siquiera existe para determinar si los bloques son válidos o no. La solución a esto es un protocolo de desafío-respuesta: los nodos de verificación emiten «desafíos» en forma de índices de transacción objetivo, y al recibir un nodo, un nodo ligero trata el bloque como no fiable hasta que otro nodo, ya sea el minero u otro verificador, proporcione un subconjunto de nodos Patricia como prueba de validez.

## Conclusión {#conclusion}

El protocolo Ethereum fue concebido originalmente como una versión actualizada de una criptomoneda, proporcionando características avanzadas como depósitos de garantía en cadena de bloques, límites de retirada, contratos financieros, mercados de juegos de azar y similares, a través de un lenguaje de programación altamente generalizado. El protocolo Ethereum no «apoyaría» ninguna de las aplicaciones directamente, pero la existencia de un lenguaje de programación Turing completo significa que teóricamente se pueden crear contratos arbitrarios para cualquier tipo de transacción o aplicación. Sin embargo, lo que es más interesante de Ethereum es que el protocolo Ethereum va mucho más allá de la moneda. Los protocolos acerca del almacenamiento descentralizado de archivos, la computación descentralizada y los mercados de predicción descentralizados, entre docenas de otros conceptos similares, tienen el potencial de aumentar sustancialmente la eficiencia de la industria computacional y proporcionar un impulso masivo a otros protocolos de igual a igual al añadir por primera vez una capa económica. Por último, también hay una amplia gama de aplicaciones que no tienen nada que ver con el dinero.

El concepto de una función de transición de estado arbitraria implementada por el protocolo de Ethereum proporciona una plataforma con un potencial único; en lugar de ser un protocolo cerrado y de un solo propósito destinado a una matriz específica de aplicaciones en el almacenamiento de datos, juegos de azar o finanzas, Ethereum es de acceso abierto por diseño, y creemos que es extremadamente adecuado para servir como una capa fundamental para un gran número de protocolos financieros y no financieros en los próximos años.

## Notas y lecturas adicionales {#notes-and-further-reading}

### Notas {#notes}

1. Un lector sofisticado puede haber notado que una dirección de Bitcoin es el hash de la clave pública de la curva elíptica, y no la clave pública en sí. Sin embargo, de hecho, es una terminología criptográfica perfectamente legítima referirse al hash de clave pública como una clave pública en sí misma. Esto se debe a que la criptografía de Bitcoin se puede considerar un algoritmo de firma digital personalizado, donde la clave pública consiste en el hash de la clave de publicación de ECC, la firma consiste en la clave de publicación de ECC concatenada con la firma de ECC, y el algoritmo de verificación implica verificar la clave de publicación de ECC en la firma contra el hash de la clave de publicación de ECC proporcionado como clave pública y luego verificar la firma de ECC con respecto a la clave de publicación de ECC.
2. Técnicamente, el punto medio de los 11 bloques anteriores.
3. Internamente, 2 y «CHARLIE» son ambos números<sup>[fn3](#notes)</sup>, estando estos últimos almacenados en representación base 256 "big-endian". Los números pueden ser como mínimo 0 y como máximo 2<sup>256</sup>-1.

### Lecturas recomendadas {#further-reading}

1. [Valor intrínseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Propiedad inteligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contratos inteligentes](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Pruebas de trabajo reutilizables](https://nakamotoinstitute.org/finney/rpow/)
6. [Títulos de propiedad seguros con autoridad del propietario](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Libro blanco de Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triángulo de Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Informe de monedas coloreadas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Informe de Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Corporaciones autónomas descentralizadas, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verificación de pago simplificada](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Árboles de Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Árboles de Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ y agentes autónomos, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn sobre la propiedad inteligente en el Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP de Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Árboles Merkle Patricia de Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd sobre los árboles de suma de Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Para la historia del informe, consulte [este wiki](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, al igual que muchos proyectos de software de código abierto impulsados por la comunidad, ha evolucionado desde su concepción inicial. Para obtener más información sobre los últimos desarrollos de Ethereum y cómo se realizan los cambios en el protocolo, le recomendamos [esta guía](/learn/)._
