---
title: Guía de Ethereum
description: Una guía introductoria a Ethereum publicada en 2013 antes de su lanzamiento.
lang: es
sidebarDepth: 2
hideEditButton: true
---

# Guía de Ethereum {#ethereum-whitepaper}

_Este artículo introductorio fue publicado originalmente en 2014 por Vitalik Buterin, el fundador de [Ethereum](/what-is-ethereum/), antes del lanzamiento del proyecto en 2015. Vale la pena señalar que Ethereum, al igual que muchos proyectos de software de código abierto impulsados por la comunidad, ha evolucionado desde su inicio._

_Aunque tenga varios años de antigüedad, mantenemos este documento porque sigue sirviendo como una referencia útil y una representación precisa de Ethereum y su visión. Para aprender sobre los últimos desarrollos de Ethereum, y cómo se hacen los cambios en el protocolo, recomendamos [esta guía](/learn/)._

[Los investigadores y académicos que busquen una versión histórica o canónica del informe [de diciembre de 2014] deben utilizar este PDF.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Un contrato inteligente de próxima generación y una plataforma de aplicaciones descentralizadas {#a-next-generation-smart-contract-and-decentralized-application-platform}

El desarrollo de Bitcoin por parte de Satoshi Nakamoto en 2009 ha sido aclamado a menudo como un desarrollo radical en dinero y moneda, siendo el primer ejemplo de un activo digital que simultáneamente no tiene respaldo ni "[valor intrínseco](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)" y ningún emisor o controlador centralizado. Sin embargo, otra parte del experimento de Bitcoin, posiblemente más importante, es la tecnología blockchain subyacente como una herramienta de consenso distribuido, y la atención está comenzando a cambiar rápidamente a este otro aspecto de Bitcoin. Las aplicaciones alternativas que se citan comunmente de la tecnología de cadena de bloques incluyen el el uso de los activos digitales de cadena de bloques para representar divisas a medida e instrumentos financieros ("[monedas de color](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), la propiedad de un artefacto físico subyacente ([propiedad inteligente](https://en.bitcoin.it/wiki/Smart_Property)), activos no fungibles como nombres de dominio ([Namecoin](http://namecoin.org)), así como aplicaciones más complejas que involucran activos digitales controlados directamente por un fragmento de código que implementa reglas arbitrarias ("[contratos inteligentes](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") o incluso [organizaciones autónomas descentralizadas (DAO)](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/) basadas en la cadena de bloques. Ethereum pretende proporcionar una cadena de bloques con un lenguaje de programación completo de Turing que se integra a la perfección y puede utilizarse para crear «contratos» que pueden servir para codificar funciones de transición de estado arbitrario, permitiendo a los usuarios crear cualquiera de los sistemas descritos anteriormente, así como muchos otros que todavía no hemos imaginado, simplemente escribiendo la lógica en algunas líneas de código.

## Introducción a Bitcoin y a los conceptos existentes {#introduction-to-bitcoin-and-existing-concepts}

### Historial {#history}

El concepto de moneda digital descentralizada, así como aplicaciones alternativas como registros de propiedades, ha existido durante décadas. Los protocolos anónimos de dinero electrónico de las décadas de 1980 y 1990, que en su mayoría dependían de una primitiva criptográfica conocida como firma digital ciega, proporcionaban una moneda con un alto grado de privacidad, pero los protocolos en gran medida no lograron ganar terreno, debido a su dependencia de un intermediario centralizado. En 1988, [b-money](http://www.weidai.com/bmoney.txt) de Wei Dai se convirtió en la primera propuesta de introducir la idea de crear dinero a través de la resolución de rompecabezas computacionales, así como de consensos descentralizados, pero la propuesta no entraba en detalle sobre cómo se podría aplicar realmente el consenso descentralizado. En 2005, Hal Finney introdujo un concepto de "[pruebas de trabajo reutilizables (PoW)](https://nakamotoinstitute.org/finney/rpow/)", un sistema que utiliza ideas de b-money junto con los rompecabezas Hashcash de Adam Back difíciles para crear un concepto de criptomoneda, pero una vez más no cumplió con el ideal al apoyarse en la computación confiable como backend. En 2009, Satoshi Nakamoto implementó por primera vez en la práctica una moneda descentralizada, combinando primitivas establecidas para administrar la propiedad a través de criptografía de clave pública con un algoritmo de consenso para realizar un seguimiento de quién posee monedas, conocido como «prueba de trabajo».

El mecanismo detrás de la prueba de trabajo fue un gran avance en el espacio, ya que resolvió simultáneamente dos problemas. Primero, proporcionó un algoritmo de consenso simple y moderadamente efectivo, que permitió a los nodos de la red acordar colectivamente un conjunto de actualizaciones canónicas del estado del libro mayor de Bitcoin. En segundo lugar, proporcionó un mecanismo para permitir la libre entrada en el proceso de consenso, resolviendo el problema político de decidir quién puede influir en el consenso y, al mismo tiempo, prevenir los ataques sybil. Lo logra sustituyendo una barrera formal a la participación, como el requisito de estar registrado como una entidad única en una lista en particular, con una barrera económica: el peso de un solo nodo en el proceso de votación por consenso es directamente proporcional a la potencia computacional que aporta el nodo. Desde entonces, se ha propuesto un enfoque alternativo llamado _prueba-de-participación_, calculando el peso de un nodo que sea proporcional a sus tenencias monetarias y no a los recursos computacionales; la discusión de los méritos relativos de los dos enfoques va más allá del alcance de este informe, pero debe tenerse en cuenta que ambos enfoques se pueden utilizar como columna vertebral de una criptomoneda.

### Bitcoin como un sistema de transición de estados {#bitcoin-as-a-state-transition-system}

![Transición de estado de Ethereum](./ethereum-state-transition.png)

Desde un punto de vista técnico, el libro mayor de una criptomoneda como Bitcoin se puede considerar como un sistema de transición de estados, donde existe un «estado» que consiste en el estado de propiedad de todos los bitcoins existentes y una «función de transición de estados» que tome un estado y una transacción y devuelva un nuevo estado como resultado. En un sistema bancario estándar, por ejemplo, el estado es una hoja de balance, una transacción es una petición para mover $X de A a B, y la función de transición de estado reduce el valor en la cuenta A en $X y aumenta el valor en la cuenta B en $X. Si la cuenta A tiene menos de $X en primer lugar, la función de transición de estado devuelve un error. Por lo tanto, se puede definir formalmente:

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

La función de transición de estado `APPLY(S,TX) -> S'` puede definirse aproximadamente de la siguiente manera:

<ol>
  <li>
    Para cada entrada en <code>TX</code>:
    <ul>
    <li>
        Si la UTXO referenciada no está en <code>S</code>, da error.
    </li>
    <li>
        Si la firma proporcionada no coincide con el propietario de la UTXO, devuelve un error.
    </li>
    </ul>
  </li>
  <li>
    Si la suma de las denominaciones de todas las UTXO de entrada es menor que la suma de las denominaciones de todas las UTXO de salida, da error.
  </li>
  <li>
    Da <code>S</code> en todas las entradas UTXO eliminadas y todas las salidas UTXO añadidas.
  </li>
</ol>

La primera mitad del primer paso impide a los emisores de transacciones que gasten monedas que no existen, la segunda mitad del primer paso impide que los emisores de transacciones gasten las monedas de otras personas, y el segundo paso hace cumplir la conservación del valor. Para poder utilizar esto para hacer pagos, el protocolo es el siguiente. Supongamos que Alice quiere enviar 11,7 BTC a Bob. En primer lugar, Alice buscará un conjunto de UTXO disponibles en su poder que sumen un total de al menos 11,7 BTC. En la práctica, Alice no será capaz de obtener exactamente 11,7 BTC; digamos que la cifra más pequeña que puede obtener es 6+4+2=12. A continuación, crea una transacción con estas tres entradas y dos salidas. La primera salida será 11,7 BTC con la dirección de Bob como propietario, y la segunda salida será el "cambio" restante de 0,3 BTC, siendo la propietaria la misma Alice.

### Minería {#mining}

![Bloques de Ethereum](./ethereum-blocks.png)

Si tuviéramos acceso a un servicio centralizado de confianza, este sistema sería trivial de implementar; se podría exactamente como se ha descrito, usando el disco duro de un servidor centralizado para mantener el registro del estado. Sin embargo, con Bitcoin estamos tratando de construir un sistema monetario descentralizado, así que necesitaremos combinar el sistema de transición de estados con un sistema de consenso para asegurarse de que todo el mundo esté de acuerdo en el orden de las transacciones. El proceso de consenso descentralizado de Bitcoin requiere que los nodos que integran la red intenten producir continuamente paquetes de transacciones llamados "bloques". La red está pensada para producir aproximadamente un bloque cada diez minutos, donde cada bloque contiene una marca temporal, un nonce, una referencia (es decir, un hash de) al bloque anterior y una lista de todas las transacciones que han tenido lugar desde el bloque anterior. Con el tiempo, esto crea una "blockchain" persistente, cada vez mayor, que se actualiza constantemente para representar el último estado del libro de contabilidad de Bitcoin.

El algoritmo para comprobar si un bloque es válido, expresado en este paradigma, es el siguiente:

1. Comprueba si el bloque anterior al que hace referencia el bloque existe y es válido.
2. Compruebe que la marca temporal del bloque es mayor que la del bloque anterior<sup>[fn2](#notes)</sup> y menor de 2 horas en el futuro.
3. Compruebe que la prueba de trabajo del bloque sea válida.
4. Permita que `S[0]` sea el estado al final del bloque anterior.
5. Supongamos que `TX` es la lista de transacciones del bloque con `n` transacciones. Para todo `i` de `0... -1`, asigne `S[i+1] = APPLY(S[i], X[i])` Si cualquier aplicación da error, salga y mostrará False.
6. Muestra true y registra `S[n]` como el estado al final de este bloque.

Fundamentalmente, cada transacción en el bloque debe proporcionar una transición de estado válido de lo que era el estado canónico antes de que la transacción fuera ejecutada a otro nuevo estado. Obsérvese que el estado no se codifica en el bloque en modo alguno; es una abstracción pura que debe ser recordada por el nodo validador y solo puede ser calculada (de forma segura) para cualquier bloque empezando desde el estado de génesis y aplicando secuencialmente cada transacción en cada bloque. Además, hay que tener en cuenta que es importante el orden en el que el minero incluye transacciones en el bloque; si hay dos transacciones A y B en un bloque tal que B gasta un UTXO creado por A, entonces el bloque será válido si A viene antes que B pero no en caso contrario.

La única condición de validación presente en la lista anterior que no se encuentra en otros sistemas es el requisito de la "prueba de trabajo". La condición concreta es que el hash SHA256 doble de cada bloque, tratado como un número de 256 bits, debe ser inferior a un objetivo ajustado dinámicamente, que en el momento de escribir estas líneas es aproximadamente 2<sup>187</sup>. El propósito de esto es hacer que la creación de bloques sea computacionalmente "difícil", impidiendo así que los atacantes de sybil reconstruyan todo el blockchain en su beneficio. Dado que SHA256 está diseñada para ser una función pseudoraleatoria completamente impredecible, la única forma de crear un bloque válido es mediante simple prueba y error, incrementando repetidamente el nonce y comprobando si el nuevo hash coincide.

Para el objetivo actual de \~2<sup>187</sup>, la red debe hacer un promedio de \~2<sup>69</sup> intentos antes de encontrar un bloque válido; en general el objetivo se recalibra por la red cada 2016 blques, por lo que que en promedio se crea un bloque nuevo por parte de algún nodo en la red cada diez minutos. Para compensar a los mineros por este trabajo computacional, el minero de cada bloque tiene derecho a incluir una transacción dándose a si mismo 12,5 BTC creados de la nada. Además, si cualquier transacción tiene un valor total más alto en sus entradas que en sus salidas, la diferencia también se destina al minero como "tarifa de transacción". Por otra parte, este es también el único mecanismo por el cual se emiten BTC; el estado inicial no contenía monedas en absoluto.

Para comprender mejor el propósito de la minería, examinemos que ocurre en el caso de un atacante malicioso. Puesto que se sabe que la criptografía subyacente de Bitcoin es segura, el atacante se enfoncará en una parte del sistema Bitcoin que no está protegida directamente por criptografía: el orden de las transacciones. La estrategia del atacante es simple:

1. Envía 100 BTC a un comerciante como intercambio de algún producto (preferentemente un bien digital de entrega rápida).
2. Espera a la entrega del producto.
3. Crea otra transacción en la que se envía los mismos 100 BTC a sí mismo.
4. Intenta convencer a la red que su transacción a sí mismo fue la primera en surgir.

Una vez que se ha dado el paso (1), después de unos minutos algún minero incluirá la transacción en un bloque, digamos el bloque número 270000. Tras aproximadamente una hora, se habrán añadido cinco bloques más a la cadena tras ese bloque, con cada uno de esos bloques apuntando indirectamente a la transacción y así "confirmándola". En este punto, el vendedor aceptará el pago, lo tomará como finalizado y entregará el producto; ya que estamos asumiendo que se trata de un bien digital, la entrega es instantánea. Ahora, el atacante crea otra transacción en la que se envía 100 BTC a sí mismo. Si el atacante lo suelta sin más, la transacción no se procesará; los mineros intentarán ejecutar `APPLY(S, X)` y observarán que `TX` consume una UTXO que ya no está en el estado. En su lugar, el atacante crea una "bifurcación" del blockchain, comenzando por minar otra versión del bloque 270 apuntando al mismo bloque 269 como padre pero con la nueva transacción en lugar de la antigua. Dado que los datos del bloque son diferentes, esto requiere volver a hacer la prueba de trabajo. Además, la nueva versión del bloque 270 del atacante tiene un hash diferente, por lo que los bloques originales 271 a 275 no "apuntan" a él; por lo tanto, la cadena original y la nueva cadena del atacante están completamente separadas. La regla es que en una bifurcación se toma la blockchain más larga como la verdadera, y así los mineros legítimos trabajarán en la cadena 275 mientras el atacante por sí solo está trabajando en la cadena 270. Para que el atacante haga que su blockchain sea el más largo, necesitaría tener más poder computacional que el resto de la red combinada para alcanzarles (de ahí, "ataque del 51%").

### Árboles de Merkle {#merkle-trees}

![SPV en Bitcoin](./spv-bitcoin.png)

_Izquierda: Basta con presentar solo un pequeño número de nodos en un árbol de Merkle para demostrar la validez de una bifurcación._

_Derecha: Cualquier intento de cambiar cualquier parte del árbol de Merkle llevará eventualmente a una inconsistencia en algún lugar previo de la cadena._

Una característica importante de escalabilidad de Bitcoin es que el bloque se almacena en una estructura de datos multinivel. El "hash" de un bloque es en realidad solo el hash del encabezado del bloque, aproximadamente 200 bytes de datos que contienen la marca de tiempo, el nonce, el hash del bloque anterior y el hash raíz de una estructura de datos llamada el árbol de Merkle que almacena todas las transacciones en el bloque. Un árbol de Merkle es un tipo de árbol binario, compuesto por un conjunto de nodos con un gran número de nodos hoja en la parte inferior del árbol que contienen los datos subyacentes, un conjunto de nodos intermedios donde cada nodo es el hash de sus dos hijos, y finalmente un único nodo raíz, también formado por el hash de sus dos hijos, representando la parte "superior" del árbol. El propósito del árbol de Merkle es permitir que los datos en un bloque se entreguen fragmentados: un nodo solo puede descargar el encabezado de un bloque de una fuente, la pequeña parte del árbol relevante para ellos de otra fuente, y aún así tener la certeza de que todos los datos son correctos. La razón por la que esto funciona es que los hashes se propagan hacia arriba: si un usuario malicioso intenta insertar una transacción falsa en la parte inferior de un árbol Merkle, este cambio causará un cambio en el nodo anterior, y luego un cambio en el nodo anterior, finalmente cambiando la raíz del árbol y por lo tanto el hash del bloque, causando que el protocolo lo registre como un bloque completamente diferente (casi con total seguridad con una prueba de trabajo no válida).

Se podría decir que el protocolo del árbol de Merkle es esencial para la sostenibilidad a largo plazo. Un "nodo completo" en la red Bitcoin, uno que almacene y procesa la totalidad de todos los bloques, ocupa unos 15 GB de espacio en disco en la red Bitcoin a fecha de abril de 2014, y está creciendo más de un gigabyte al mes. Actualmente, esto es viable para algunos ordenadores de escritorio y no para teléfonos, y más adelante en el futuro sólo las empresas y entusiastas podrán participar. Un protocolo conocido como "verificación de pago simplificada" (SPV) permite que existan otra clase de nodos, llamados "nodos ligeros", que descargan los encabezados del bloque, verifican la prueba de trabajo en los encabezados de bloque, y luego descargan solo las "bifurcaciones" asociadas con las transacciones que son relevantes para ellos. Esto permite que los nodos ligeros determinen con una sólida garantía de seguridad cuál es el estado de cualquier transacción de Bitcoin, y cuál es su saldo actual con tan solo descargar una pequeña porción de toda la blockchain.

### Aplicaciones alternativas de la blockchain {#alternative-blockchain-applications}

La idea de tomar el concepto subyacente de blockchain y aplicarla a otros conceptos también tiene un largo historial. En 2005, Nick Szabo publicó el concepto de "[títulos de propiedad seguros con autoridad del propietario](https://nakamotoinstitute.org/secure-property-titles/)", un documento que describe cómo los «nuevos avances en la tecnología de bases de datos replicadas» permitirían un sistema basado en cadena de bloques para almacenar un registro de quién posee qué tierra, creando un marco elaborado que incluye conceptos de la vivienda, la posesión adversa y el impuesto sobre la tierra de Georgia. Lamentablemente, no había ningún sistema efectivo de bases de datos replicadas disponible en ese momento, por lo que el protocolo nunca se implementó en la práctica. Sin embargo, después de 2009, una vez que se desarrolló el consenso descentralizado de Bitcoin, un número de aplicaciones alternativas comenzaron a surgir rápidamente.

- **Namecoin**: creada en 2010, [Namecoin](https://namecoin.org/) se describe como una base de datos de registro de nombres descentralizada. En protocolos descentralizados como Tor, Bitcoin y BitMessage, existe la necesidad de identificar las cuentas de alguna manera para que otra gente pueda interactuar con ellas, pero en todas las soluciones existentes la única clase de identificador disponible es un hash pseudoaleatorio como `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idóneamente, a uno le gustaría poder tener una cuenta con un nombre como «George». Sin embargo, el problema es que si una persona puede crear una cuenta llamada «George», otras personas podrían usar el mismo proceso para registrar «George» para sí mismas y suplantarlos. La única solución es un paradigma de «primero que realiza la inscripción», donde la primer persona en registrar triunfa y la segunda falla: un problema perfectamente adaptado para el protocolo de consenso de Bitcoin. Namecoin es la implementación más antigua y exitosa de un sistema de registro de nombres utilizando tal idea.
- **Monedas de color**: el propósito de las[monedas de color](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) es servir como un protocolo que le permita a la gente crear su propia moneda digital o, en el importante caso trivial de una moneda con una unidad, tókenes digitales, en la cadena de bloques de Bitcoin. En el protocolo de monedas de color, alguien «emite» una nueva moneda al asignar públicamente un color a una UTXO específica de Bitcoin, y el protocolo define recursivamente el color de otra UTXO para que sea el mismo que gastaron las entradas de la transacción creándolas (se aplican algunas reglas especiales en caso de entradas de color mixto). Esto permite a los usuarios tener sus carteras con solo UTXO de un color específico y enviarlas como bitcoins normales, siendo rastreados por la cadena de bloques para determinar el color de cualquier UTXO que reciban.
- **Metacoin**: la idea detrás de una metacoin es tener un protocolo que está montado sobre Bitcoin, usando transacciones de Bitcoin para almacenar las transacciones de metacoin, pero con una función de transición de estado diferente, `APPLY'`. Dado que el protocolo de metacoin no puede evitar que aparezcan transacciones de metacoin inválidas en la cadena de bloques de Bitcoin, se añade una regla por la que si `APPLY'(S,TX)` da error, el protocolo por defecto es `APPLY'(S,TX) = S`. Esto proporciona un mecanismo fácil para crear un protocolo arbitrario de criptomonedas, con potenciales funcionalidades avanzadas que no se pueden implementar sobre el propio Bitcoin, pero con un coste de desarrollo muy bajo, ya que las complejidades de minado y de trabajo en red ya las gestiona el protocolo de Bitcoin. Metacoins se han utilizado para implementar algunas clases de contratos financieros, registros de nombre e intercambios descentralizados.

Por lo tanto, en general, hay dos enfoques para la construcción de un protocolo de consenso: construir una red independiente, o construir un protocolo sobre Bitcoin. El primer enfoque, aunque ha sido razonablemente exitoso en el caso de aplicaciones como Namecoin, es difícil de implementar; cada implementación individual necesita iniciar una blockchain independiente, además de construir y probar todas las transiciones de estado necesarias y el código de red. Además, predecimos que el conjunto de aplicaciones para la tecnología de consenso descentralizado seguirá una distribución de ley de potencias donde la gran mayoría de las aplicaciones serían demasiado pequeñas para garantizar su propia blockchain, y observamos que existen grandes clases de aplicaciones descentralizadas, en particular organizaciones autónomas descentralizadas, que necesitan interactuar entre sí.

El enfoque basado en Bitcoin, por otra parte, tiene el defecto de que no hereda las características de verificación de pago simplificada de Bitcoin. SPV funciona en Bitcoin porque puede usar la profundidad de blockchain como indicador de validez; en algún momento, una vez que los antecesores de una transacción van lo suficientemente atrás, se puede afirmar con seguridad que fueron legítimamente parte del estado. Los metaprotocolos basados en blockchain, por otra parte, no pueden forzar a la blockchain a no incluir transacciones que no son válidas en el contexto de sus propios protocolos. Por lo tanto, una implementación de metaprotocolo SPV completamente segura necesitaría escanear hasta el comienzo de la blockchain de Bitcoin para determinar si ciertas transacciones son válidas. Actualmente, todas las implementaciones "ligeras" de los metaprotocolos basados en Bitcoin dependen de un servidor de confianza para proporcionar los datos, lo que es presumiblemente un resultado altamente subóptimo, especialmente cuando uno de los propósitos primarios de una criptomoneda es eliminar la necesidad de confianza.

### Scripting {#scripting}

Incluso sin ninguna extensión, el protocolo Bitcoin de hecho facilita una versión débil del concepto de "contratos inteligentes". La UTXO en Bitcoin puede ser propiedad no solo de una clave pública, sino también de un script más complicado expresado en un lenguaje simple de programación basado en pila. En este paradigma, una transacción que gaste esa UTXO debe proporcionar datos que satisfagan el script. De hecho, incluso el mecanismo público básico de propiedad de claves se implementa a través de un script: el script toma una firma de curva elíptica como entrada, lo verifica contra la transacción y la dirección que posee la UTXO, y devuelve 1 si la verificación es correcta y 0 en caso contrario. Existen otros scripts más complicados para varios casos de uso adicionales. Por ejemplo, se puede desarrollar un script que requiere firmas de dos de cada tres claves privadas para la validación ("multisig"), una configuración útil para cuentas corporativas, cuentas de ahorro seguras y algunos contextos de fideicomiso de comerciantes. Los scripts también pueden utilizarse para pagar recompensas por soluciones a problemas computacionales. y uno puede incluso construir un script que diga algo como: "este Bitcoin UTXO es tuyo si puedes proporcionar una prueba de SPV en la que enviaste una transacción de Dogecoin de esta denominación", permitiendo en esencia un intercambio descentralizado de criptomonedas.

Sin embargo, el lenguaje de scripting implementado en Bitcoin tiene varias limitaciones importantes:

- **Falta de conclusion de Turing**: es decir, mientras hay un gran subconjunto de computación que el lenguaje de scripting de Bitcoin soporta, no es compatible con todo. La categoría principal que falta son los bucles. Esto se hace para evitar bucles infinitos durante la verificación de transacciones; teóricamente es un obstáculo superable para los programadores de scripts, ya que cualquier bucle se puede simular simplemente repitiendo el código subyacente muchas veces con una sentencia condicional, pero esto conduce a scripts que son muy ineficientes en cuanto al espacio. Por ejemplo, la implementación de un algoritmo alternativo de firma de curva elíptica probablemente requeriría 256 rondas de multiplicación repetidas, todas incluidas individualmente en el código.
- **Indiferencia al valor**: no hay forma de que un script UTXO proporcione un control detallado de la cantidad que se pueda retirar. Por ejemplo, un caso de uso importante de un contrato de oráculo podría ser un contrato de cobertura, donde A y B ponen 1.000 $ en BTC, y después de 30 días el código envía 1.000 $ en BTC a A y el resto a B. Este proceso requiere un oráculo para determinar el valor de 1 BTC en USD, pero aún así se trata de una gran mejora en términos de confianza y requerimientos de infraestructura sobre las soluciones completamente centralizadas que existen hoy en día. Sin embargo, debido a que las UTXO son de todo o nada, la única forma de logralo es a través del truco muy ineficiente de tener muchas UTXO de diferentes denominaciones, (por ejemplo, una UTXO de dos<sup>k</sup> por cada 1.000 hasta 30) y hacer que el oráculo elija qué UTXO enviar a A y cuál a B.
- **Falta de estado**: una UTXO se puede gastar o no gastar; no hay ninguna posibilidad de contratos multietapa o scripts que mantengan cualquier otro estado interno más allá de eso. Esto hace difícil realizar contratos de opciones multietapa, ofertas de intercambio descentralizadas o protocolos de compromiso criptográficos de dos etapas (necesarios para recompensas computacionales seguras). También significa que UTXO solo puede utilizarse para construir contratos únicos aislados y no más contratos complejos «con estado», como organizaciones descentralizadas, y dificulta la implementación de metaprotocolos. El estado binario combinado con la indiferencia al valor también significa que otra aplicación importante, el límite de retirada, es imposible.
- **Indiferencia a la cadena de bloques**: las UTXO no pueden ver datos de la cadena de bloques como el nonce, la marca temporal y el hash del bloque anterior. Esto limita severamente las aplicaciones en juegos de azar y en otras categorías, al privar al lenguaje de scripting de una fuente potencialmente valiosa de aleatoriedad.

Por tanto, consideramos tres enfoques para construir aplicaciones avanzadas encima de las criptomonedas: construir una nueva blockchain, usando scripting por encima de Bitcoin, y construyendo un metaprotocolo encima de Bitcoin. Construir una nueva blockchain permitiría libertad ilimitada al construir un conjunto de funcionalidades, pero a costa del tiempo de desarrollo, esfuerzo para ponerla en marcha, y seguridad. El uso de scripts es fácil de implementar y estandarizar, pero está muy limitado en sus capacidades, y los metaprotocolos, aunque sencillos, sufren de defectos en la escalabilidad. Con Ethereum, pretendemos construir un framework alternativo que proporcione mejoras aún mayores en cuanto a facilidad de desarrollo, así como como propiedades más robustas para clientes ligeros, al tiempo que permite a las aplicaciones compartir un entorno económico y la seguridad de la blockchain.

## Ethereum {#ethereum}

El propósito de Ethereum es crear un protocolo alternativo para construir aplicaciones descentralizadas, proporcionando un conjunto diferente de contrapartidas que creemos que serán muy útiles para un amplio abanico de aplicaciones descentralizadas, con especial énfasis en situaciones en las que el rápido tiempo de desarrollo, la seguridad para aplicaciones pequeñas y rara vez usadas y la capacidad de las diferentes aplicaciones para interactuar de manera muy eficiente son importantes. Ethereum lo logra construyendo lo que es esencialmente la capa fundacional abstracta definitiva: una blockchain con un lenguaje de programación Turing completo, que permite a cualquiera escribir contratos y aplicaciones descentralizadas donde pueden crear sus propias reglas reglas arbitrarias de propiedad, formatos de transacción y funciones de transición de estado. Una versión básica de Namecoin puede escribirse en dos líneas de código, y otros protocolos como monedas y sistemas de reputación se pueden incorporar en menos de veinte. Los contratos inteligentes, "cajas" criptográficas que contienen valor y sólo lo desbloquean si se cumplen ciertas condiciones también se pueden desarrollar por encima de la plataforma, con mucho más poder que el que ofrece el script de Bitcoin gracias a los poderes añadidos de completitud Turing, conocimiento del valor, conocimiento de la blockchain y estado.

### Cuentas de Ethereum {#ethereum-accounts}

En Ethereum, el estado esta compuesto por objetos llamados «cuentas», donde cada cuenta posee una dirección de 20 bytes y transiciones de estado, que son transferencias directas de valor e información entre cuentas. Una cuenta de Ethereum tiene cuatro campos:

- El **nonce**: un contador usado para comprobar que cada transacción se haya procesado solo una vez.
- El **saldo ether** actual de la cuenta.
- El **código de contrato** de la cuenta si está presente.
- El **almacenamiento** de la cuenta (vacío por defecto).

«Ether» es el principal criptocombustible interno de Ethereum, y se utiliza para pagar las comisiones por transacción. En general, hay dos tipos de cuentas: **cuentas de propiedad externa**, manejadas por claves privadas y **cuentas de contrato**, manejadas por el código del contrato. Una cuenta de propiedad externa no tiene código, y uno puede enviar mensajes desde una cuenta de propiedad externa creando y firmando una transacción; en una cuenta de contrato, cada vez que una cuenta de contrato recibe un mensaje su código se activa, permitiendo leer y escribir en el almacenamiento interno y enviar otros mensajes o crear contratos a su vez.

Observe que los «contratos» en Ethereum no deben entenderse como algo que debe estar «satisfecho» o «cumplido»; al contrario, son más parecidos a «agentes independientes» que viven dentro del ambiente de ejecución de Ethereum, siempre ejecutando un pedazo de código específico cuando un mensaje o transacción les da «un toque», y tienen control directo sobre su propio saldo en ether y su propio almacén de clave/valor para hacer un seguimiento de las variables persistentes.

### Mensajes y transacciones {#messages-and-transactions}

El término «transacción» se utiliza en Ethereum para referirse al paquete de datos que almacena el mensaje enviado por una cuenta de propiedad externa. Las transacciones contienen:

- El destinatario del mensaje
- Una firma que identifica al remitente
- La cantidad de ether por transferir del remitente al destinatario.
- Un campo de datos opcional
- Un valor `STARTGAS`, que representa el número máximo de pasos computacionales que puede ejecutar la transacción.
- Un valor `GASPRICE`, que representa la comisión que el remitente paga por paso computacional.

Los tres primeros son campos estándar que se esperan en cualquier criptomoneda. El campo de datos no tiene ninguna función por defecto, pero la máquina virtual tiene un código de operación con el que un contrato puede acceder a los datos; como ejemplo práctico, si un contrato funciona como un servicio de registro de dominios sobre la cadena de bloques, es posible que se desee interpretar la información que se le pasa contienen dos «campos», el primer campo es un dominio para registrar y el segundo campo es la dirección IP para registrarlo. El contrato leería estos valores de los datos del mensaje y los guardaría adecuadamente en el almacenamiento.

Los campos `STARTGAS` y `GASPRICE` son cruciales para el modelo de antidenegación de servicio de Ethereum. Para prevenir la generación de bucles infinitos o accidentales hostiles, así como de otros desperdicios computacionales generados en el código, cada transacción debe establecer un límite del número de pasos computacionales de código que puede utilizar. La unidad fundamental de computación es el «gas»; usualmente, un paso computacional cuesta 1 gas, pero algunas operaciones cuestan más gas, porque son computacionalmente más caras, o incrementan la cantidad de información que se debe guardar como parte del estado. También hay una tarifa de 5 gas por cada byte en los datos de la transacción. La intención del sistema de tarifas es obligar a un atacante a pagar proporcionalmente por cada recurso que consuma, incluyendo la computación, el ancho de banda y el almacenamiento; por ende, cualquier transacción que lleve a la red un mayor consumo que cualquiera de estos recursos, debe tener una comisión aproximadamente proporcional al incremento.

### Mensajes {#messages}

Los contratos tienen la capacidad de enviar «mensajes» a otros contratos. Los mensajes son objetos virtuales que nunca se serializan y existen sólo en el entorno de ejecución de Ethereum. Un mensaje contiene:

- El remitente del mensaje (implícito)
- El destinatario del mensaje
- La cantidad de ether por transferir junto con el mensaje
- Un campo de datos opcional
- Un valor de `STARTGAS`

Esencialmente, un mensaje es como una transacción, con la salvedad de que lo produce un contrato y no un actor externo. Se produce un mensaje cuando un código de ejecución actual del contrato ejecuta el código de operación `CALL`, que produce y ejecuta un mensaje. Al igual que una transacción, un mensaje conduce a la cuenta del destinatario que ejecuta su código. Por lo tanto, los contratos pueden tener relaciones con otros contratos exactamente de la misma manera que los actores externos.

Tenga en cuenta que la asignación de gas asignada por una transacción o contrato se aplica al gas total consumido por esa transacción y todas las subejecuciones. Por ejemplo, si un actor externo A envía una transacción a B con 1.000 gases y B consume 600 gases antes de enviar un mensaje a C, y la ejecución interna de C consume 300 gases antes de regresar, entonces B puede gastar otros 100 gases antes de ejecutar sin gas.

### Función de transición de estado de Ethereum {#ethereum-state-transition-function}

![Transición de estado de Ether](./ether-state-transition.png)

La función de transición de estado de Ethereum, `APPLY(S,TX) -> S'` se puede definir de la siguiente manera:

1. Comprobar si la transacción está bien formada (es decir, si tiene el número correcto de valores), si la firma es válida, y el nonce coincide con el nonce en la cuenta del remitente. De lo contrario, da error.
2. Calcular la tarifa de transacción como `STARTGAS * GASPRICE` y determinar la dirección de envío a partir de la firma. Restar la tarifa del saldo de la cuenta del remitente e incrementar el nonce del remitente. Si no hay suficiente saldo para gastar, da error.
3. Inicializar `GAS = STARTGAS` y retirar una cierta cantidad de gas por byte para pagar por los bytes de la transacción.
4. Transferir el valor de la transacción desde la cuenta del remitente a la cuenta receptora. Si la cuenta receptora aún no existe, créela. Si la cuenta receptora es un contrato, ejecute el código del contrato hasta su finalización o hasta que la ejecución se quede sin gas.
5. Si la transferencia de valor falló porque el remitente no tenía suficiente dinero, o la ejecución del código se quedó sin energía, revierta todos los cambios de estado excepto el pago de las tarifas y añada las tarifas a la cuenta del minero.
6. En caso contrario, devuelva las comisiones por todo el gas restante al remitente y envíe las tarifas pagadas por el gas consumido al minero.

Por ejemplo, supongamos que el código del contrato es:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Tenga en cuenta que, en realidad, el código del contrato está escrito en el código de EVM de bajo nivel —en este ejemplo, para mayor claridad, está escrito en Serpent, uno de nuestros lenguajes de alto nivel— y se puede compilar en código de EVM. Imagine que el almacenamiento del contrato comienza vacío y se envía una transacción con 10 valores de éter, 2000 gases, 0,001 de precio de gas de éter y 64 bytes de datos, donde los bytes 0-31 representan el número `2` y los bytes 32-63 representan la cadena `CHARLIE`. El proceso para la función de transición de estado en este caso es el siguiente:

1. Comprobar que la transacción es válida y está bien formada.
2. Comprobar que el remitente de la transacción tiene al menos 2000 \* 0,001 = 2 ether. Si los tiene, restar 2 ether de la cuenta del remitente.
3. Inicializar gas = 2000; suponiendo que la transacción tenga 170 bytes de longitud y que la tarifa por byte sea 5, restar 850 y quedarán 1150 gases.
4. Restar 10 ether más de la cuenta del remitente y añadirlos a la cuenta del contrato.
5. Ejecutar el código. En este caso es simple: comprueba si se utiliza el almacenamiento del contrato en índice `2`; observa que no, por tanto, se asigna el almacenamiento en el índice `2` al valor `CHARLIE`. Supongamos que esto consume 187 gases, así que la cantidad restante de gas es 1.150 - 187 = 963.
6. Añadir 963 \* 0,001 = 0,963 ether de vuelta a la cuenta del remitente y devolver el estado resultante.

Si no hubiera ningún contrato en el extremo receptor de la transacción, la tarifa total de la transacción simplemente sería igual al `GASPRICE` proporcionado, multiplicado por la longitud de la transacción en bytes, y los datos enviados junto con la transacción serían irrelevantes.

Tenga en cuenta que los mensajes funcionan de manera equivalente a las transacciones en lo referente a las reversiones: si la ejecución de un mensaje se queda sin gas, entonces la ejecución de ese mensaje y todas las demás ejecuciones desencadenadas por esa ejecución, revertirán, pero las ejecuciones principales no necesitan revertirse. Esto significa que es «seguro» que un contrato llame a otro contrato, ya que si A llama a B con G gas, entonces se garantiza que la ejecución de A perderá como máximo G gas. Finalmente, tenga en cuenta que hay un código de operación, `CREATE`, que crea un contrato; su mecánica de ejecución es generalmente similar a `CALL`, con la excepción de que la salida de la ejecución determina el código de un contrato recién creado.

### Ejecución de código {#code-execution}

El código en los contratos de Ethereum está escrito en un lenguaje de bajo nivel, en bytecode, conocido como «código de la máquina virtual de Ethereum» o «código de la EVM». El código consiste en una serie de bytes, donde cada byte representa una operación. Por lo general, la ejecución del código es un bucle infinito que consiste en ejecutar repetidamente la operación en el contador del programa actual (que comienza en cero) y luego incrementa el contador en uno, hasta que se alcanza el final del código, o se detecta un error o una instrucción `STOP` o `RETURN`. Las operaciones tienen acceso a tres tipos de espacio en el que almacenar datos:

- La **pila**, un contenedor «último en entrar, primero en salir» cuyos valores se pueden apilar y retirar.
- **Memoria** es una matriz de bytes expandible infinitamente.
- El **almacenamiento** a largo plazo del contrato es un almacén de clave/valor. A diferecia de la pila y la memoria, que se resetean una vez terminada la computación, el almacenamiento persiste en el largo plazo.

El código también puede acceder al valor, emisor y datos del mensaje entrante, así como datos de la cabecera del bloque, y el código también puede dar una matriz de bytes de datos como salida.

El modelo de ejecución formal de código de la EVM es sorprendentemente simple. Mientras la máquina virtual de Ethereum está corriendo, su estado computacional completo se puede definir por la tupla `(estado_del_bloque, transacción, mensaje, código, memoria, pila, pc, gas)`, donde `estado_del_bloque` es el estado global que contiene todas las cuentas e incluye saldos y almacenamiento. Al comienzo de cada ronda de ejecución, la instrucción actual se encuentra tomando el `pc`-ésimo byte del `código` (o 0 en caso de `pc >= len(código)`), y cada instrucción tiene su propia definición en terminos de cómo afecta a la tupla. Por ejemplo,`ADD` saca dos elementos de la pila y empuja su suma, reduce `gas` en 1 y aumenta `pc` otro factor, y `SSTORE` extrae los dos elementos superiores de la pila e inserta el segundo elemento en el almacenamiento del contrato en el índice especificado por el primer elemento. Aunque hay muchas maneras de optimizar la ejecución de la máquina virtual de Ethereum mediante la compilación en tiempo de ejecución, una implementación básica de Ethereum puede hacerse en unos pocos cientos de líneas de código.

### Cadena de bloques y minería {#blockchain-and-mining}

![Ethereum aplica diagrama de bloque](./ethereum-apply-block-diagram.png)

La cadena de bloque de Ethereum es similar en muchas maneras a la cadena de bloques de Bitcoin, aunque con alguna salvedad. La principal diferencia entre Ethereum y Bitcoin en relación a la arquitectura de la cadena de bloques radica en que, a diferencia de Bitcoin, los bloques de Ethereum contienen una copia tanto de la lista de transacciones como del estado más reciente. Aparte de esto, hay otros dos valores, que son el número de bloque y la dificultad, que también se guardan en el bloque. El algoritmo básico de validación de un bloque de Ethereum es el siguiente:

1. Comprobar si el bloque anterior referenciado existe y es válido.
2. Comprobar que la marca temporal del bloque es mayor que la del bloque anterior referenciado e inferior a 15 minutos en el futuro
3. Verificar que el número de bloque, la dificultad, la raíz de la transacción, la raíz del tío y el límite de gas (varios conceptos específicos de Ethereum de bajo nivel) sean válidos.
4. Chequea que la prueba de trabajo del bloque sea válida.
5. Permitir que `S[0]` sea el estado al final del bloque anterior.
6. Dejar que `TX` sea la lista de transacciones del bloque, con `n` transacciones. Para todo `i` en `0...n-1`, asigne `S[i+1] = APPLY(S[i],TX[i])`. Si cualquier aplicación da error, o si el gas total consumido en el bloque hasta este punto excede el `GASLIMIT`, da error.
7. Dejar que `S_FINAL` sea `S[n]`, pero añadiendo la recompensa del bloque pagada al minero.
8. Comprobar si la raíz del árbol Merkle del estado `S_FINAL` es igual a la raíz del estado final proporcionada en la cabecera del bloque. Si es así, el bloque es válido; de lo contrario, no es válido.

El enfoque puede parecer altamente ineficiente a primera vista, porque necesita almacenar todo el estado con cada bloque, pero en realidad la eficiencia debería ser comparable a la de Bitcoin. La razón es que el estado se almacena en la estructura del árbol, y después de cada bloque solo se tiene que modificar una pequeña parte del árbol. Por lo tanto, en general, entre dos bloques adyacentes, la mayoría del árbol debe ser el mismo y, por lo tanto, los datos se pueden almacenar una vez y referenciar dos veces utilizando punteros (es decir, hashes de subárboles). Para lograrlo, se utiliza un tipo especial de árbol conocido como «árbol de Patricia», incluida una modificación del concepto de árbol de Merkle que permite que los nodos se inserten y eliminen —y no solo se cambien— eficientemente. Además, debido a que toda la información del estado es parte del último bloque, no hay necesidad de almacenar todo el historial de la cadena de bloques —una estrategia que, si se pudiera aplicar a Bitcoin— podría calcularse para ahorrar entre 5 y 20 veces más espacio.

Una pregunta habitual es «dónde» se ejecuta el código del contrato, en términos del hardware físico. La respuesta a esto es sencilla: el proceso de ejecución del código del contrato es parte de la definición de la función de transición de estado, que a su vez es parte del algoritmo de validación de bloques. Por tanto, si una transacción se añade al bloque `B`, la ejecución del código que genera esa transacción la ejecutarán todos los nodos, ahora y en el futuro, que descarguen y validen el bloque `B`.

## Aplicaciones {#applications}

En general, hay tres tipos de aplicaciones además de Ethereum. La primer categoría son las aplicaciones financieras, que ofrecen a los usuarios formas más potentes de gestionar y suscribir contratos con su dinero. Esto incluye submonedas, derivados financieros, contratos de cobertura, carteras de ahorro, testamentos e incluso, en última instancia, algunas clases de contratos de empleos a gran escala. La segunda categoría son las aplicaciones semifinancieras, donde el dinero está presente pero también le acompaña un importante factor no-monetario; un ejemplo perfecto son las recompensas autoaplicadas por resolver problemas computacionales. Por último, hay aplicaciones como el voto en línea y la gobernanza descentralizada que no son en absoluto financieras.

### Sistemas de token {#token-systems}

Los sistemas de token en la blockchain tienen muchas aplicaciones que van desde submonedas que representan activos, como el USD o el oro, hasta acciones de empresas, tokens individuales que representan propiedad inteligente, cuponse seguros infalsificables, e incluso sistemas de tokens sin ningún vínculo con un valor convecional en absoluto, utilizados como sistemas de puntos para incentivos. Los sistemas de token son sorprendentemente fáciles de implementar en Ethereum. El punto clave por retener es que una moneda, o sistema de token, fundamentalmente es una base de datos con una operación: restar X unidades de A y dar X unidades a B, con la disposición de que (1) A tuviera al menos X unidades antes de la transacción y (2) que la transacción la apruebe A. Lo único que se necesita para implementar un sistema de token es implementar esta lógica en un contrato.

El código básico para implementar un sistema de token en Serpent tiene este aspecto:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Esta es en esencia una implementación literal de la función de transición de estado de un «sistema bancario» descrita más arriba en este documento. Hay que añadir algunas líneas de código adicionales para crear, en primer lugar, el paso inicial en el que se distribuyen las unidades de moneda y otros casos extremos, e idóneamente se añadiría una función para permitir que otros contratos puedan consultar el saldo de una dirección. ¡Y eso es todo lo que hay que hacer! Theoretically, Ethereum-based token systems acting as sub-currencies can potentially include another important feature that on-chain Bitcoin-based meta-currencies lack: the ability to pay transaction fees directly in that currency. La forma en que se implementaría esto sería hacer que el contrato mantenga un saldo de ether con el cual reembolsaría el ether utilizado para pagar comisiones al remitente, y recargar este saldo recolectando las unidades de moneda interna que cobra en tarifas y revenderlas en una subasta en ejecución constante. De esta manera, los usuarios necesitarían «activar» sus cuentas con ether, pero una vez que el ether está ahí, sería reutilizable porque el contrato lo reembolsaría cada vez.

### Derivados financieros y monedas de valor estable {#financial-derivatives-and-stable-value-currencies}

Los derivados financieros son la aplicación más común de un «contrato inteligente», y uno de los más sencillos de implementar en código. El mayor desafío a la hora de implementar contratos financieros es que la mayoría de ellos requiere una referencia a una cotización externa; por ejemplo, una aplicación muy deseable es un contrato inteligente que protege contra la volatibilidad del ether (o de cualquier otra criptomoneda) con respecto al valor del dólar, pero hacer esto requiere que el contrato sepa el valor de la paridad ETH/USD. La forma más sencilla de hacerlo es a través de un contrato de «fuente de datos» que sea gestionado por una entidad específica (como el NASDAQ) designada, para que dicha entidad tenga la potestad de actualizar el contrato según sea necesario, y que provea una interfaz que permita a otros contratos enviar mensajes a ese contrato y obtener una respuesta que proporcione el precio.

Dado dicho ingrediente crítico, el contrato de cobertura se vería así:

1. Esperar a que la parte A introduzca 1.000 ether.
2. Esperar a que la parte B introduzca 1000 ether.
3. Almacenar el valor de 1.000 ether en USD, calculados mediante la consulta al contrato de la fuente de datos, en el almacenamiento, diegamos que es $x.
4. Transcurridos 30 días, permitir a A o B «reactivar» el contrato para enviar $x en ether (calculado mediante consulta al contrato de la fuente de datos para obtener el nuevo precio) a A y el resto a B.

Un contrato así tendría un gran potencial en el comercio en criptomonedas. Uno de los mayores problemas que se citan sobre las criptomonedas es su volatilidad. Aunque muchos usuarios y comerciantes quieran la seguridad y conveniencia de operar con activos criptográficos, tal vez no quieran afrontar la perspectiva de perder el 23 % del valor de sus fondos en un solo día. Hasta ahora, la solución más propuesta ha sido la de activos respaldados por sus emisores; la idea consiste en que un emisor cree una submoneda en la que yace el derecho de emitir y retirar unidades, y proporcionar una unidad de la moneda a cualquiera que les provea (fuera de línea) una unidad de un activo subyacente especificado (p. ej., oro, USD). El emisor por su parte se compromete a proporcionar una unidad del activo subyacente a cualquiera que envíe de vuelta una unidad del criptoactivo. Este mecanismo permite que cualquier activo no criptográfico pueda ser «recatalogado» en un activo criptográfico, siempre que se pueda confiar en el emisor.

En la práctica, sin embargo, los emisores no siempre son fiables, y en algunos casos la infraestructura bancaria es demasiado débil o demasiado hostil para que estos servicios existan. Los derivados financieros ofrecen una alternativa. En este caso, en lugar de un único emisor que proporciona los fondos para respaldar un activo, un mercado descentralizado de especuladores que apuestan a que el precio de un activo criptográfico de referencia (p. ej., ETH) subirá, desempeñará ese papel. A diferencia de los emisores, los especuladores no tienen la opción de suspender pagos en su parte del acuerdo, porque el contrato de cobertura mantiene sus fondos en fideicomiso. Observe que este enfoque no está completamente descentralizado, dado que todavía se necesita una fuente de confianza para proporcionar el indicador de precios, aunque presumiblemente incluso esto sea una notable mejora en términos de reducción de requisitos de infraestructura (a diferencia de ser un emisor, la emisión de una fuente de precios no requiere ninguna licencia y es probable que se pueda categorizar dentro de la libre expresión) y de reducción del riesgo de fraude.

### Sistemas de identidad y reputación {#identity-and-reputation-systems}

La criptomoneda alternativa más antigua de todas, [Namecoin](http://namecoin.org/), intentó usar una cadena de bloques similar a Bitcoin para proporcionar un sistema de registro de nombres, donde los usuarios pueden registrar sus nombres en una base de datos pública junto con otros datos. El principal caso de uso citado es para un sistema [DNS](https://wikipedia.org/wiki/Domain_Name_System), que asigna nombres de dominio como "bitcoin.org" (o, en el caso de Namecoin, «bitcoin.bit») a una dirección IP. Otros casos de uso incluyen la autenticación de correo electrónico y sistemas de reputación potencialmente más avanzados. He aquí el contrato básico para proporcionar un sistema de registro de nombres similar a Namecoin en Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

El contrato es muy simple; es una base de datos dentro de la red Ethereum que se puede agregar, pero no modificar ni eliminar. Cualquiera puede registrar un nombre con algún valor, y ese registro se mantiene para siempre. Un contrato de registro de nombres más sofisticado también tendrá una «cláusula de función» que permitirá que otros contratos lo consulten, así como un mecanismo para que el «propietario» (es decir, el primer registrador) de un nombre cambie los datos o transfiera la propiedad. Incluso se puede añadir la reputación y la funcionalidad web de confianza en la parte superior.

### Almacenamiento de archivos descentralizado {#decentralized-file-storage}

En los últimos años, ha surgido una serie de almacenamientos de archivos en línea populares, siendo Dropbox el más destacado, que permite a los usuarios cargar una copia de seguridad de su disco duro y tener el servicio de almacenamiento de la copia de seguridad y permitir al usuario acceder a ella a cambio de una cuota mensual. Sin embargo, en este punto el mercado de almacenamiento de archivos es a veces relativamente ineficiente; una mirada superficial a varias soluciones existentes muestra que, particularmente en el «valle misterioso» del nivel de 20-200 GB en que ni las cuotas libres, ni los descuentos a nivel de empresa se ponen en marcha, los precios mensuales de los costes de almacenamiento de archivos principales son tales que usted está pagando más que el coste de todo el disco duro en un solo mes. Los contratos de Ethereum pueden permitir el desarrollo de un ecosistema de almacenamiento de archivos descentralizado, donde los usuarios individuales pueden ganar pequeñas cantidades de dinero alquilando sus propios discos duros y el espacio no utilizado puede servir para reducir aún más el coste del almacenamiento de archivos.

La pieza clave fundamental de dicho dispositivo sería lo que hemos llamado el «contrato Dropbox descentralizado». Este contrato funciona como se indica a continuación. First, one splits the desired data up into blocks, encrypting each block for privacy, and builds a Merkle tree out of it. Se crea entonces un contrato con la regla de que cada N bloques, el contrato elegirá un índice aleatorio en el árbol de Merkle (usando el hash del bloque anterior, accesible desde el código del contrato, como fuente de aleatoriedad), y dará X ether a la primera entidad que proporcione una transacción con una prueba de propiedad similar a la verificación de pago simplificado del bloque para ese índice específico del árbol. Cuando un usuario quiere volver a descargar su archivo, puede utilizar un protocolo de canal de micropago (p. ej., pagar 1 szabo por cada 32 kilobytes) para recuperar el archivo; el enfoque más eficiente de tarificación es que el pagador no publique la transacción hasta el final, y en su lugar reemplace la transacción por otra ligeramente más lucrativa con el mismo nonce tras cada 32 kilobytes.

Una característica importante del protocolo es que, aunque pueda parecer que se confía en que muchos nodos aleatorios decidan no olvidar el archivo, se puede reducir ese riesgo a casi cero dividiendo el archivo en muchas piezas a través de una compartición secreta, y observar los contratos para comprobar si cada pieza sigue en posesión de algunos nodos. Si un contrato sigue remunerando, esto proporciona una prueba criptográfica de que alguien todavía está almacenando el archivo.

### Organizaciones autonómas descentralizadas {#decentralized-autonomous-organizations}

El concepto general de una «organización autónoma descentralizada» (DAO, por sus siglas en inglés) es el de una entidad virtual que tiene cierto número de miembros o accionistas que, quizás con una mayoría del 67 %, tienen el derecho a gastar los fondos de la entidad y modificar su código. Los miembros decidirían colectivamente el modo en el que la organización debe destinar sus fondos. Los métodos para destinar los fondos de una DAO podrían variar, desde recompensas y sueldos, hasta mecanismos más exóticos, como una moneda interna para recompensar el trabajo. Esto esencialmente replica los elementos legales de una empresa tradicional o sin fines de lucro, pero utiliza solo tecnología criptográfica de cadena de bloques para su cumplimiento. Hasta ahora, gran parte de las conversaciones sobre las DAO giraban en torno al modelo «capitalista» de una «corporación autónoma descentralizada» (o DAC, por sus siglas en inglés), con accionistas que reciben dividendos y acciones negociables. Una alternativa tal vez descrita como una «comunidad autónoma descentralizada» haría que todos los miembros tuvieran una parte idéntica en la toma de decisiones y requeriría que el 67 % de los miembros existentes aceptaran añadir o eliminar a un miembro. El grupo debería imponer colectiviamente el requisito de que una persona pueda ser miembro solo una vez.

Un esquema general de cómo implementar una DAO es el siguiente: El diseño más simple consiste en una sección de código automodificable que cambia si dos tercios de los miembros están de acuerdo en un cambio. Aunque el código es teóricamente inmutable, esto se puede eludir fácilmente y tener mutabilidad de facto mediante fragmentos del código en contratos separados, y teniendo la dirección de los contratos que puedan considerar guardados en el almacenamiento modificable. En una sencilla implementación de dicho contrato DAO, habría tres tipos de transacción, diferenciados por los datos proporcionados en la transacción:

- `[0,i,K,V]` para registrar una propuesta con índice `i` para cambiar la dirección en el índice de almacenamiento `K` al valor `V`
- `[1,i]` para registrar un voto a favor de la propuesta `i`
- `[2,i]` para finalizar la propuesta `i` si tiene los suficientes votos

El contrato tendría entonces cláusulas para cada una de ellas. Mantendría un registro de todos los cambios de almacenamiento abiertos, junto con una lista de quienes los han votado. También tendría una lista de todos los miembros. Cuando cualquier cambio de almacenamiento alcanza el voto de dos tercios de los miembros, una transacción finalizadora podría ejecutar el cambio. Un esquema más sofisticado también tendría capacidad de voto incorporada para funciones tales como el envío de una transacción, añadir y borrar miembros, e incluso proporcionar una delegación de votos tipo [Democracia líquida](https://es.wikipedia.org/wiki/Democracia_l%C3%ADquida) (p. ej., cualquiera puede asignar a alguien para votar por él, y dicha asignación es transitiva, de modo que si A asigna a B y B asigna a C, entonces C determina el voto de A). Este diseño permitiría que la DAO crezca orgánicamente como una comunidad descentralizada, permitiendo que la gente eventualmente delegue la tarea de filtrar quién sería miembro a especialistas, aunque a diferencia de lo que ocurre en el «sistema actual», los especialistas pueden aparecer y desaparecer a medida que los miembros individuales de la comunidad cambian de postura.

Hay un modelo alternativo para una corporación descentralizada, donde cualquier cuenta puede tener cero o más acciones, y se necesitan dos tercios de las acciones para tomar una decisión. A complete skeleton would involve asset management functionality, the ability to make an offer to buy or sell shares, and the ability to accept offers (preferably with an order-matching mechanism inside the contract). La delegación también existiría al estilo de la Democracia líquida, generalizando el concepto de un «consejo directivo».

### Otras aplicaciones {#further-applications}

**1. Carteras de ahorro**. Supongamos que Alice quiere mantener sus ahorros a salvo, pero le preocupa perder su clave privada o que alguien la piratee. Entonces pone ether en un contrato con Bob, un banco, de la siguiente manera:

- Alice solo puede retirar un máximo del 1 % de los fondos por día.
- Bob por su parte solo puede retirar un máximo del 1% de los fondos por día, pero Alice tiene la habilidad para realizar una transacción con su clave que elimine esta habilidad.
- Alice y Bob juntos pueden retirar cualquier cantidad.

Normalmente, el 1% diario es suficiente para Alice, y si ella quiere retirar fondos, puede contactar a Bob para que le ayude. Si se piratea la clave de Alice, ella se dirige a Bob para mover los fondos a un nuevo contrato lo más rápido posible. Si pierde su clave, Bob sacará los fondos eventualmente. Si resulta que Bob tiene malas intenciones, entonces ella puede desactivar su capacidad de retirar fondos.

**2. Seguro de cosecha**. Uno puede hacer fácilmente un contrato de derivados financieros, pero utilizando una fuente de datos del clima, en lugar de cualquier índice de precios. Si un agricultor en Iowa compra un derivado que paga inversamente en función de las precipitaciones en Iowa, entonces si hay una sequía, el agricultor recibirá dinero automáticamente y si hay suficiente lluvia, el agricultor estará feliz porque a sus cultivos les iría bien. Esto puede ampliarse a los seguros de desastres naturales en general.

**3. Una fuente de datos descentralizada**. Para los contratos financieros por diferencia, puede ser posible descentralizar la fuente de datos a través de un protocolo llamado "[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". SchellingCoin básicamente funciona de la siguiente manera: N partes ponen en el sistema el valor de un dato determinado (por ejemplo, el precio ETH/USD), los valores se ordenan y todos aquellos entre el percentil 25 y 75 obtienen un token como recompensa. Todos tienen el incentivo de proporcionar la respuesta que todos los demás proporcionarán, y el único valor en el que un gran número de jugadores pueden estar de acuerdo de manera realista es el valor predeterminado obvio: la verdad. Esto crea un protocolo descentralizado que teóricamente puede proporcionar cualquier número de valores, incluido el precio ETH/USD, la temperatura en Berlín o incluso el resultado de un cálculo particularmente dificil.

**4. Fideicomiso multifirma inteligente**. Bitcoin permite contratos de transacción multifirma donde, por ejemplo, tres de las cinco claves dadas pueden gastar los fondos. Ethereum permite una mayor granularidad; por ejemplo, cuatro de los cinco pueden gastarlo todo, tres de los cinco pueden gastar hasta un 10 % al día y dos de los cinco pueden gastar hasta un 0,5 % al día. Además, la multifirma de Ethereum es asíncrona: dos partes pueden registrar sus firmas en la cadena de bloques en diferentes momentos y la última firma enviará automáticamente la transacción.

**5. Computación en la nube**. La tecnología EVM también se puede utilizar para crear un entorno informático verificable, lo que permite a los usuarios pedir a otros que realicen cálculos y luego, opcionalmente, solicitar pruebas de que los cálculos en ciertos puntos de control seleccionados al azar se realizaron correctamente. Esto permite la creación de un mercado de computación en la nube donde cualquier usuario puede participar con su computadora de escritorio, portátil o servidor especializado, y efectuar comprobaciones al azar, junto con los depósitos de seguridad, para garantizar que el sistema sea fiable (es decir, los nodos no pueden hacer trampa y obtener beneficios). Aunque puede que tal sistema no sea el adecuado para todas las tareas; estas requieren un alto nivel de comunicación entre procesos, por ejemplo, no se pueden realizar fácilmente en una gran nube de nodos. Otras tareas, sin embargo, son mucho más fáciles de hacer en paralelo; proyectos como SETI@home, folding@home y algoritmos genéticos se pueden implementar fácilmente sobre dicha plataforma.

**6. Apuestas entre pares**. Cualquier número de protocolos de juego de persona a persona, como los de Frank Stajano y Richard Clayton's [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf), se pueden implementar en la cadena de bloques de Ethereum. El protocolo de juego más sencillo es, en realidad simplemente, un contrato por diferencia en el siguiente hash de bloque, y se pueden construir protocolos más avanzados a partir de ahí, creando servicios de juego con tárifas cercanas a cero que no tienen la capacidad de hacer trampa.

**7. Mercados de predicciones**. Con un oráculo o SchellingCoin, los mercados de predicción tambien son fáciles de implementar, y junto con SchelligCoin pueden llegar a ser la primera aplicación principal de[futarchy](http://hanson.gmu.edu/futarchy.html) como protocolo de gobernanza para organizaciones descentralizadas.

**8. Plataformas decentralizadas sobre la cadena de bloques** usando el sistema de identidad y de reputación como base.

## Miscelánea y dudas {#miscellanea-and-concerns}

### Implementación de GHOST modificada {#modified-ghost-implementation}

El protocolo «Subárbol observado más pesado codicioso» (GHOST) es una innovación introducida por primera vez por Yonatan Sompolinsky y Aviv Zohar en[diciembre 2013](https://eprint.iacr.org/2013/881.pdf). La motivación subyacente a GHOST es que las cadenas de bloques con tiempos de confirmación rápidos actualmente sufren una seguridad reducida debido a una alta tasa de obsolescencia, ya que los bloques tardan cierto tiempo en propagarse a través de la red, si el minero A extrae un bloque y luego el minero B extrae otro bloque, antes de que el bloque del minero A se propague a B, el bloque del minero B se desperdiciará y no contribuirá a la seguridad de la red. Además, hay un problema de centralización: si suponemos que el minero A es una plataforma de minería con un 30 % de potencia de hash y que el minero B tiene un 10 % de potencia de hash, el minero A correrá el riesgo de producir bloques obsoletos el 70 % del tiempo (ya que en el otro 30 % del tiempo, el minero A producirá el último bloque y entonces obtendrá los datos de minado inmediatamente) mientras que el minero B correrá el riesgo de producir bloques obsoletos el 90 % del tiempo. Por lo tanto, si el intervalo de bloque es lo suficientemente corto como para que la tasa obsoleta sea alta, A será sustancialmente más eficiente, simplemente en virtud de su tamaño. Con estos dos efectos combinados, es muy probable que las cadenas de bloques que producen bloques rápidamente conduzcan a que un grupo de míneria tenga un porcentaje lo suficientemente grande del poder de hash de la red para tener control de facto sobre el proceso de mineria.

Como lo describen Sompolinsky y Zohar, GHOST resuelve el primer problema de la pérdida de seguridad de la red al incluir bloques obsoletos en el cálculo de qué cadena es la «más larga»; es decir, no solo el padre y los ancestros de un bloque, sino también los descendientes obsoletos del ancestro del bloque (conocidos en la jerga de Ethereum, como «tíos») se añaden al cálculo de qué bloque tiene la mayor prueba de trabajo que lo respalda. Para resolver el segundo problema del sesgo de centralización, vamos más allá del protocolo descrito por Sompolinsky y Zohar, y también proporcionamos recompensas en bloque a los obsoletos: un bloque obsoleto recibe el 87,5 % de su recompensa base, y el sobrino que incluye el bloque obsoleto recibe el resto del 12,5 %. Sin embargo, las tasas de transacción no se otorgan a los tíos.

En Ethereum, se emplea una versión simplificada de GHOST que se solo extiende hasta siete niveles. Concretamente, se define de la manera siguiente:

- Un bloque debe especificar un padre, y debe especificar 0 o más tíos.
- Un bloque tío incluido en el bloque B debe tener las siguientes propiedades:
  - Debe ser un hijo directo del antepasado de la generación kth, donde `2 <= k <= 7`.
  - No puede ser ancestro de B
  - Un tío debe ser una cabecera de bloque válida, pero no necesita ser un bloque previamente verificado, ni siquiera válido.
  - Un tío debe ser distinto de todos los tíos incluidos en bloques anteriores y de todos los otros tíos incluidos en el mismo bloque (no debe haber doble inclusión).
- Por cada tío U en el bloque B, el minero de B recibe un 3,125 % adicional, añadido a su recompensa de coinbase, y el minero de U recibe el 93,75 % de una recompensa de coinbase estándar.

Esta versión limitada de GHOST, con tíos que solo se pueden incluir hasta 7 generaciones, se utilizó por dos razones. Primero, GHOST ilimitado incluiría demasiadas complicaciones en el cálculo de qué tíos son válidos para un bloque determinado. En segundo lugar, GHOST ilimitado con compensación como se usa en Ethereum elimina el incentivo para que un minero extraiga en la cadena principal y no en la cadena de un atacante público.

### Tarifas {#fees}

Debido a que cada transacción publicada en la cadena de bloques impone a la red el coste de descargarla y verificarla, se necesita algún mecanismo regulatorio, que generalmente involucra tarifas de transacción, para evitar abusos. El enfoque predeterminado, utilizado en Bitcoin, es tener tarifas puramente voluntarias, confiando en que los mineros actúen como guardianes y establezcan mínimos dinámicos. Este enfoque ha gozado de una gran acogida en la comunidad de Bitcoin, particularmente porque está «basado en el mercado», lo que permite que la oferta y la demanda entre los mineros y los remitentes de transacciones determinen el precio. Sin embargo, el problema con esta línea de razonamiento es que el procesamiento de transacciones no es un mercado. Aunque es intuitivamente atractivo interpretar el procesamiento de transacciones como un servicio que el minero ofrece al remitente, en realidad, cada transacción que incluya un minero deberá procesarla cada nodo de la red, por lo que la gran mayoría del coste de la transacción el procesamiento corre a cargo de terceros y no del minero que está tomando la decisión de incluirlo o no. Por lo tanto, es muy probable que surjan problemas del estilo «tragedia de los comunes».

Sin embargo, resulta que este fallo en el mecanismo basado en el mercado, cuando se le da un supuesto simplificador particular e inexacto, se cancela por arte de magia. El argumento es el siguiente. Supongamos que:

1. Una transacción conduce a `k` operaciones, ofreciendo la recompensa `kR` a cualquier minero que la incluya, donde `R` lo establece el remitente y `k` y `R` son (aproximadamente) visibles para el minero de antemano.
2. Una operación tiene un coste de procesamiento de `C` para cualquier nodo (es decir, todos los nodos tienen la misma eficiencia).
3. Hay `N` nodos de minado, cada uno con exactamente la misma potencia de procesamiento (es decir, `1/N` del total)
4. No existen nodos completos que no minen.

Un minero estaría dispuesto a procesar una transacción si la recompensa esperada es mayor que el coste. Por lo tanto, la recompensa esperada es `kR/N` ya que el minero tiene una `1/N` probabilidad de procesar el siguiente bloque, y el coste del procesamiento para el minero es simplemente `kC`. Por lo tanto, los mineros incluirán transacciones en las que `kR/N> kC`, o `R> NC`. Tenga en cuenta que `R` es la tarifa por operación facilitada por el remitente, y es un límite inferior del beneficio que obtiene el remitente de la transacción, y `NC` es el coste de toda la red en conjunto para procesar una operación. Por eso, los mineros tienen el incentivo de incluir solo aquellas transacciones cuyo beneficio utilitario total exceda el coste.

No obstante, hay varias desviaciones de esos supuestos en la realidad:

1. El minero paga un coste superior para procesar la transacción que otros nodos de verificación, ya que el tiempo de verificación adicional retrasa la propagación del bloque y, por lo tanto, aumenta la probabilidad de que el bloque se convierta en caducado.
2. Existen nodos completos no minables.
3. La distribución de potencia de minado puede acabar siendo radicalmente desigualitaria en la práctica.
4. Los especuladores, enemigos políticos y dementes, cuya función de utilidad incluye causar daño a la red, existen y pueden establecer hábilmente contratos cuyo coste es mucho menor que el coste pagado por otros nodos de verificación.

(1) proporciona una tendencia al minero a que incluya menos transacciones, e (2) incrementa `NC`; por lo tanto, estos dos efectos al menos parcialmente se cancelan entre sí.<sup>[¿Cómo?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> (3) y (4) son el principal problema; para resolverlos, simplemente fijamos un límite reajustable: ningún bloque puede tener más operaciones que `BLK_LIMIT_FACTOR` veces el promedio de la media móvil exponencial a largo plazo. Específicamente:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` y `EMA_FACTOR` son constantes que se establecerán a 65536 y 1,5 de momento, pero será posible cambiarlas después de más análisis.

Hay otro factor que desincentiva los grandes tamaños de bloques en Bitcoin: la propagación de bloques que son grandes llevará más tiempo y tendrán mayor probabilidad de volverse rancios. En Ethereum, los bloques que consumen la mayor cantidad de gas pueden tardar más en propagarse, porque sus dimensiones son mayores y porque les lleva más tiempo procesar las transiciones del estado por validar. Este desincentivo por demora es una consideración importante en Bitcoin, aunque menos en Ethereum debido al protocolo GHOST; por lo tanto, confiar en límites de bloques regulados proporciona una base más estable.

### Computación y conclusión de Turing {#computation-and-turing-completeness}

Un dato importante a tener en cuenta es que la máquina virtual de Ethereum es Turing al 100 %; esto implica que el código de la EVM puede representar cualquier cálculo que pueda concebirse, incluyendo bucles infinitos. El código de la EVM permite realizar bucles de dos maneras. En primer lugar, hay una instrucción `JUMP` que permite al programa volver a un punto previo en el código, y una instrucción `JUMPI` para realizar saltos condicionales, permitiendo sentencias como `while x < 27: x = x * 2`. En segundo lugar, los contratos pueden invocar a otros contratos, lo que permite potenciales bucles a través de la recursión. Esto lleva naturalmente a un problema: ¿pueden los usuarios maliciosos paralizar a los mineros y a los nodos completos al obligarlos a entrar en un bucle infinito? El problema surge debido a un dilema en la informática conocido como el problema de la detención: generalmente no hay forma de saber si tal programa se va a detener o no.

Como se explica en la sección de transición de estado, nuestra solución funciona al requerir que una transacción establezca un número máximo de pasos computacionales que se le permiten tomar, y si la ejecución lleva más tiempo, la computación se revierte, pero las tarifas se siguen pagando. Los mensajes funcionan del mismo modo. Para ilustrar la motivación detrás de nuestra solución, considera los siguientes ejemplos:

- Un atacante crea un contrato que ejecuta un bucle infinito y luego envía una transacción para activarle ese bucle al minero. El minero procesa la transacción, ejecutando de esta manera el bucle infinito, y espera a que se le agote el gas. Aunque la ejecución se quede sin gas y se detenga a la mitad, la transacción sigue siendo válida y el minero todavía cobra la tarifa al atacante por cada paso computacional.
- Un atacante crea un bucle infinito extremadamente largo para obligar al minero a realizar cálculos durante tanto tiempo que, de manera que cuando termine la computación, aparecen varios bloques más y no es posible que el minero incluya la transacción para reclamar la tarifa. Sin embargo, requiere que el atacante proporcione un valor para `STARTGAS` que limite el número de pasos computacionales que la ejecución puede realizar, motivo por el cual el minero sabe de antemano que la computación lleva un número excesivamente grande de pasos.
- Un atacante observa un contrato con un código similar a `send(A,contract.storage[A]); contract.storage[A] = 0`, y envía una transacción con el gas justo para ejecutar el primer paso pero no el segundo (es decir, hace una retirada sin que el saldo disminuya). El autor del contrato no se tiene que preocuparse por protegerse contra este tipo de ataques, ya que si la ejecución se detiene a la mitad, los cambios se revierten.
- Un contrato financiero funciona tomando el punto medio de nueve fuentes de datos en propiedad con el objetivo de reducir el riesgo al mínimo. Un atacante toma el control de una de las fuentes de datos, la cual está diseñada para que se modifique mediante el mecanismo de llamada-dirección-variable, descrito en la sección de DAO, y la convierte en un bucle infinito, intentando de esta manera forzar que cualquier intento de reclamar fondos del contrato financiero se quede sin gas. Sin embargo, el contrato financiero puede configurarse limitando el gas en el mensaje para que este problema no suceda.

La alternativa a la conclusión de Turing es la inconclusión de Turing, donde `JUMP` y `JUMPI` no existen, y donde solo se permite una copia de cada contrato en la pila de llamadas en cualquier momento. Con este sistema, el sistema de tarifas descrito y las incertidumbres en torno a la eficacia de nuestra solución podrían no ser necesarios, ya que el coste de ejecutar un contrato estaría limitado por su tamaño. Además, la Turing incompletitud ni siquiera es una limitación tan significativa; de todos los ejemplos de contratos que hemos concebido internamente, solo uno requería de un bucle hasta el momento, e incluso ese bucle se puede eliminar haciendo 26 repeticiones de una línea de código. Dadas las graves implicaciones de la conclusión de Turing y el beneficio limitado, ¿por qué no basta con tener un lenguaje incompleto de Turing? En la práctica, no obstante, la inconclusión de Turing está lejos de ser la solución perfecta al problema. Examina los siguientes contratos para entender el por qué:

```sh
C0: llamada(C1); llamada(C1);
C1: llamada(C2); llamada(C2);
C2: llamada(C3); llamada(C3);
...
C49: llamada (C50); llamada(C50);
C50: (ejecutar un paso de un programa y guardar el cambio en el almacenamiento)
```

Ahora, envié una transacción a A. Así, en 51 transacciones, tenemos un contrato que ocupa 2<sup>50</sup> pasos computacionales. Los mineros pueden intentar detectar este tipo de bombas lógicas con antelación manteniendo un valor junto a cada contrato que especifique el número máximo de pasos computacionales que pueden adoptar, y calculándolo para contratos que llaman recursivamente a otros contratos. Sin embargo, eso requiere que los mineros prohíban contratos que creen otros contratos (ya que la creación y ejecución de los 26 contratos mencionados anteriormente podría integrar fácilmente en un solo contrato). Otro punto problemático es que el campo de dirección de un mensaje es una variable, por lo que, en general, puede que ni siquiera se pueda saber qué otros contratos dentro de un contrato determinado se invocarán antes de tiempo. Por lo tanto y en definitiva, tenemos una conclusión sorprendente: la conclusión de Turing es sorprendentemente fácil de gestionar y la falta de conclusión de Turing también es sorprendentemente dificil de gestionar, a menos que se establezcan exactamente los mismos controles, pero en ese caso ¿por qué no dejar que el protocolo sea completo de Turing?

### Moneda y emisión monetaria {#currency-and-issuance}

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

Las dos opciones principales en el modelo anterior son (1) la existencia y el tamaño de un fondo de dotación, y (2) la existencia de una oferta lineal en permanente crecimiento, a diferencia de una oferta limitada como en Bitcoin. La justificación del fondo de dotación es la siguiente. Si el fondo de dotación no existiera, y la emisión lineal se redujera a x 0,217 para proporcionar la misma tasa de inflación, entonces la cantidad total de ether sería un 16,5 % menor y, por lo tanto, cada unidad sería un 19,8 % más valiosa. Por lo tanto, en el equilibrio se compraría un 19,8 % más ether en la venta, por lo que cada unidad volvería a ser exactamente tan valiosa como antes. La organización también tendría entonces 1,198 veces más BTC, que se puede considerar dividido en dos porciones: el BTC original y el 0,198 veces adicional. Por lo tanto, esta situación es _exactamente equivalente_ a la dotación, pero con una diferencia importante: la organización posee solo BTC y, por lo tanto, no está incentivada a respaldar el valor de la unidad de ether.

El modelo de crecimiento lineal permanente de la oferta reduce el riesgo de lo que algunos ven como una concentración excesiva de riqueza de Bitcoin y brinda a las personas que viven en épocas presentes y futuras una oportunidad justa de aquirir unidades monetarias, al mismo tiempo que conserva un fuerte incentivo para obtener y mantener ether, porque la «tasa de crecimiento de la oferta» como porcentaje todavía tiende a cero con el tiempo. También pensamos que debido a que las monedas siempre se pierden con el tiempo a causa de descuidos, fallecimientos, etc., y la pérdida de monedas se puede modelar como un porcentaje de la oferta total por año, la oferta total de moneda en circulación, de hecho, eventualmente se estabilizará en un valor igual a la emisión anual dividida entre la tasa de pérdida (por ejemplo, con una tasa de pérdida de 1%, una vez que la oferta alcance x 26, se extraerá x 0,26 y se perderá x 0,26 cada año, creando un equilibrio).

Tenga en cuenta que, en el futuro, es probable que Ethereum cambie a un modelo de prueba de participación por motivos de seguridad, reduciendo el requisito de emisión de entre cero y 0,05 veces por año. En caso de que la organización de Ethereum pierda financiación o por cualquier otro motivo desaparezca, dejamos abierto un «contrato social»: cualquiera tiene derecho a crear una futura versión candidata de Ethereum, con la única condición de que la cantidad de ether sea como máximo igual a `60102216 * (1,198 + 0,26 *n)`donde `n` es el número de años despues del bloque de génesis. Los creadores son libres de realizar ventas colectivas o asignar parte o la totalidad de la diferencia entre la expansión de la oferta impulsada por PoS y la expansión de la oferta máxima permitida para pagar el desarrollo. Las actualizaciones de candidatos que no cumplan con el contrato social pueden, justificadamente, bifurcarse en versiones compatibles.

### Centralización del minado {#mining-centralization}

El algoritmo de míneria de Bitcoin funciona haciendo que los mineros calculen SHA256 en versiones ligeramente modificadas del encabezado del bloque millones de veces una y otra vez, hasta que finalmente un nodo genera una versión cuyo hash es menor que el objetivo (actualmente alrededor de 2<sup>192</sup>). Sin embargo, este algoritmo de míneria es vulnerable a dos forma de centralización. En primer lugar, el ecosistema minero ha llegado a estar dominado por los ASIC (circuitos integrados de aplicaciones específicas), chips de computadora diseñados para la tarea específica de la minería de Bitcoin y, por lo tanto, miles de veces más eficientes. Esto significa que la minería de Bitcoin ya no es una actividad altamente descentralizada o igualitaria, que requiere millones de dólares de capital para participar efectivamente. En segundo lugar, la mayoría de los míneros de Bitcoin en realidad no realizan la validación de bloques localmente; en cambio, dependen de un grupo de míneria centralizado para proporcionar los encabezados de los bloques. Podría decirse que este problema es peor: al momento de escribir este artículo, los tres grupos principales de míneria controlan indirectamente aproximadamente el 50 % de la potencia de procesamiento en la red de Bitcoin, aunque esto se ve mitigado por el hecho de que los mineros pueden cambiar a otros grupos de míneria si un grupo o coalición intenta un ataque del 51 %.

La intención actual en Ethereum es utilizar un algoritmo de míneria en el que los mineros deben obtener datos aleatorios del estado, calcular algunas transacciones seleccionadas al azar de los últimos N bloques de la cadena de bloques y devolver el hash del resultado. Esto tiene dos ventajas importantes. En primer lugar, los contratos de Ethereum pueden incluir cualquier tipo de cálculo, por lo que un ASIC de Ethereum sería escencialmente un ASIC para cálculo general, es decir un mejor CPU. En segundo lugar, la míneria requiere acceso a toda la cadena de bloques, lo que obliga a los mineros a almacenar toda la cadena de bloques y al menos ser capaces de verificar cada transacción. Esto elimina la necesidad de grupos de míneria centralizados; aunque las reservas de minería aún pueden desempeñar el papel legítimo de equilibrar la aleatoriedad en la distribución de recompensas, esta función puede ser igualmente cumplida por reservas entre pares sin control central.

Este modelo aún no ha sido probado, y puede haber dificultades a lo largo del camino para evitar ciertas optimizaciones inteligentes cuando se utiliza la ejecución del contrato como algoritmo de minado. Sin embargo, una característica notablemente interesante de este algoritmo es que permite a cualquiera «envenenar el pozo», al introducir un gran número de contratos en la cadena de bloques específicamente diseñados para bloquear ciertos ASIC. Existen incentivos económicos para que los fabricantes de ASIC utilicen un truco así para atacarse mutuamente. Por tanto, la solución que estamos desarrollando es en última instancia, una solución adaptativa humana en vez de una solución puramente técnica.

### Escalabilidad {#scalability}

Una preocupación común en Ethereum es la cuestión de la escalabilidad. Así como Bitcoin, Ethereum sufre el desperfecto de que cada transaccion debe ser procesada por todos los nodos dentro de la red. Con Bitcoin, el tamaño actual de la cadena de bloques se estima es de alrededor de 15 GB, incrementando su tamaño en alrededor de 1 MB por hora. Si la red de Bitcoin procesara 2.000 transacciones por segundo, crecería entre 1 MB por cada tres segundos (1 GB por hora, 8 TB por año). Es probable que Ethereum sufra un patrón de crecimiento similar, empeorado por el hecho de que habrá muchas aplicaciones funcionando además de la cadena de bloque de Ethereum, en lugar de solo una moneda, como es el caso de Bitcoin, pero mitigado por el hecho de que los nodos completos de Ethereum necesitan almacenar sólo el estado en lugar de todo el historial de la cadena de bloques.

El problema con un tamaño tan grande de cadena de bloques es el riesgo de centralización. Si el tamaño de la cadena de bloques incrementara, por decir, 100 TB, entonces el posible escenario sería que solo una pequeña parte de los numerosos negocios se ejecurarían por nodos enteros y todos los usuarios utilizarían nodos ligeros SPV. En esta situación, surge el problema potencial de que los nodos completos se unan y acuerden hacer trampas de algún modo rentable (p. ej., cambiando la recompensa por bloque, darse a sí mismos BTC). Los nodos de luz no tendrían forma de detectarlo inmediatamente. Por supuesto, probablemente existiría al menos un nodo completo honesto, y al cabo de unas horas la información sobre el fraude se iría filtrando a través de canales como Reddit, pero llegados a ese punto sería demasiado tarde: correspondería a los usuarios ordinarios organizar un esfuerzo para elaborar una lista negra de dichos bloques, un problema masivo y probablemente no factible de coordinación a una escala similar a la de lograr con éxito un ataque del 51 %. En el caso de Bitcoin, esto es actualmente un problema, pero existe una modificación de la cadena de bloques [propuesta por Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) que mitigará este problema.

A corto plazo, Ethereum utilizará dos estrategias adicionales para hacer frente a este problema. Primera, dados los algoritmos de minado basados en la cadena de bloque, todos y cada uno de los mineros estarán obligados a ser nodos completos, creando un límite inferior en el número de nodos completos. Segunda —y sin embargo, más importante—, incluiremos una raíz del árbol de estado intermedio en la cadena de bloques después de procesar cada transacción. Incluso si la validación del bloque está centralizada, siempre y cuando exista un nodo de verificación honesto, el problema de la centralización se puede eludir a través de un protocolo de verificación. Si un minero publica un bloque no válido, ese bloque debe tener un mal formato o el estado `S[n]` es incorrecto. Dado que se sabe que `S[0]` es correcto, debe haber algún primer estado `S[i]` que sea incorrecto donde `S[i-1]` sea correcto. El nodo de verificación proporcionaría el índice `i`, junto con una «prueba de invalidez» que consiste en el subconjunto de nodos del árbol Patricia que necesitan procesar `APPLY(S[i-1],TX[i]) -> S[i]`. Los nodos podrían usar esos nodos para ejecutar esa parte del cálculo, y ver que el `S[i]` generado no coincide con el `S[i]` proporcionado.

Otro ataque más sofisticado implicaría que los mineros maliciosos publiquen bloques incompletos, por lo que la información completa ni siquiera existe para determinar si los bloques son válidos o no. La solución a esto es un protocolo de desafío-respuesta: los nodos de verificación emiten «desafíos» en forma de índices de transacción objetivo, y al recibir un nodo, un nodo ligero trata el bloque como no fiable hasta que otro nodo, ya sea el minero u otro verificador, proporcione un subconjunto de nodos Patricia como prueba de validez.

## Conclusión {#conclusion}

El protocolo Ethereum fue concebido originalmente como una versión actualizada de una criptomoneda, proporcionando características avanzadas como depósitos de garantía en cadena de bloques, límites de retirada, contratos financieros, mercados de juegos de azar y similares, a través de un lenguaje de programación altamente generalizado. El protocolo Ethereum no «apoyaría» ninguna de las aplicaciones directamente, pero la existencia de un lenguaje de programación Turing completo significa que teóricamente se pueden crear contratos arbitrarios para cualquier tipo de transacción o aplicación. Sin embargo, lo que es más interesante de Ethereum es que el protocolo Ethereum va mucho más allá de la moneda. Los protocolos acerca del almacenamiento descentralizado de archivos, la computación descentralizada y los mercados de predicción descentralizados, entre docenas de otros conceptos similares, tienen el potencial de aumentar sustancialmente la eficiencia de la industria computacional y proporcionar un impulso masivo a otros protocolos de igual a igual al añadir por primera vez una capa económica. Por último, también hay una amplia gama de aplicaciones que no tienen nada que ver con el dinero.

El concepto de una función de transición de estado arbitraria implementada por el protocolo de Ethereum proporciona una plataforma con un potencial único; en lugar de ser un protocolo cerrado y de un solo propósito destinado a una matriz específica de aplicaciones en el almacenamiento de datos, juegos de azar o finanzas, Ethereum es de acceso abierto por diseño, y creemos que es extremadamente adecuado para servir como una capa fundamental para un gran número de protocolos financieros y no financieros en los próximos años.

## Notas y lecturas adicionales {#notes-and-further-reading}

### Notas {#notes}

1. Un lector sofisticado puede haber notado que una dirección de Bitcoin es el hash de la clave pública de la curva elíptica, y no la clave pública en sí. Sin embargo, de hecho, es una terminología criptográfica perfectamente legítima referirse al hash de clave pública como una clave pública en sí misma. Esto se debe a que la criptografía de Bitcoin se puede considerar un algoritmo de firma digital personalizado, donde la clave pública consiste en el hash de la clave de publicación de ECC, la firma consiste en la clave de publicación de ECC concatenada con la firma de ECC, y el algoritmo de verificación implica verificar la clave de publicación de ECC en la firma contra el hash de la clave de publicación de ECC proporcionado como clave pública y luego verificar la firma de ECC con respecto a la clave de publicación de ECC.
2. Técnicamente, el punto medio de los 11 bloques anteriores.
3. Internamente, 2 y «CHARLIE» son ambos números<sup>[fn3](#notes)</sup>, estando estos últimos almacenados en representación base 256 "big-endian". Los números pueden ser como mínimo 0 y como máximo 2<sup>256</sup>-1.

### Más información {#further-reading}

1. [Valor intrínseco](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Propiedad inteligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contratos inteligentes](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Pruebas de trabajo reutilizables](https://nakamotoinstitute.org/finney/rpow/)
6. [Títulos de propiedad seguros con autoridad del propietario](https://nakamotoinstitute.org/secure-property-titles/)
7. [Informe de Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triángulo de Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Informe de monedas de color](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Informe de Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Corporaciones autónomas descentralizadas, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verificación de pago simplificada](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Árboles de Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Árboles de Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ y agentes autónomos, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn, sobre propiedad inteligente en Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP en Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Árboles de Merkle y Patricia en Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd sobre los árboles de suma Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Para consultar el historial del informe, ver [este enlace](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, al igual que muchos proyectos de software de código abierto impulsados por la comunidad, ha evolucionado desde su concepción inicial. Para aprender sobre los últimos desarrollos de Ethereum, y cómo se hacen los cambios en el protocolo, recomendamos [esta guía](/learn/)._
