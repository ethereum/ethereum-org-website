---
title: "Cadena de bloques 101: una demostración visual"
description: "Una demostración de cómo funciona la tecnología de la cadena de bloques, que cubre el hashing, los bloques, las cadenas, los libros contables distribuidos y los tokens para hacer que los conceptos de la cadena de bloques sean tangibles e intuitivos."
lang: es
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "cadena de bloques"
  - "criptografía"
format: presentation
author: Anders Brownworth
breadcrumb: "Cadena de bloques 101"
---

La demostración visual de Anders Brownworth sobre cómo funciona la tecnología de la cadena de bloques, que incluye un recorrido que cubre el hashing SHA-256, los bloques, la minería, las cadenas de bloques, los libros contables distribuidos, los tokens y más.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=_160oMzblY8) publicada por Anders Brownworth. Ha sido ligeramente editada para facilitar su lectura.*

#### Hash SHA-256 (0:01) {#sha-256-hash-001}

Esta es una demostración de la cadena de bloques. Vamos a hacer esto de una manera muy visual: vamos a hacer que sea muy fácil de entender repasando paso a paso las piezas clave de lo que es una cadena de bloques.

Antes de empezar, tenemos que echar un vistazo a esto llamado hash SHA-256. Un hash parece un montón de números aleatorios, y esencialmente lo que es, es una huella digital de algunos datos digitales. Da la casualidad de que es una huella digital de cualquier cosa que escriba en este cuadro. Si escribo mi nombre "Anders" en este cuadro, verán que el hash ha cambiado. De hecho, cambió cada vez que escribí una letra.

Así que este es el hash del nombre "Anders", todo en minúsculas: comienza con `19ea`. Si borro eso y escribo "Anders" de nuevo, pueden ver que comienza con `19ea`, exactamente el mismo hash. En ese sentido, es una huella digital de estos datos. Independientemente de los datos que haya aquí, cada vez que escriban exactamente los mismos datos, obtendrán exactamente el mismo hash.

Puedo escribir lo que quiera. Pueden no tener nada, `e3b0`, ese es el hash de la nada. O podrían escribir muchísimas cosas. De hecho, podrían poner la Biblioteca del Congreso aquí y obtendrían un hash. Lo interesante es que, independientemente de si hay una pequeña cantidad de información, ninguna información o toda la Biblioteca del Congreso, siempre van a obtener un hash de esta longitud. No van a poder adivinar de antemano qué es esto: tienen que introducir los datos para averiguar cuál es el hash, pero siempre obtendrán exactamente el mismo hash independientemente de cuántas veces introduzcan exactamente la misma información.

#### Bloque (2:10) {#block-210}

Lo que voy a hacer es extender esta idea de un hash a algo que vamos a llamar bloque. Un bloque es exactamente como el hash, pero la sección de datos se ha dividido en tres secciones: una llamada "bloque" (solo un número, este es el bloque número 1), un "nonce", que es solo otro número, y luego algunos datos tal como teníamos antes.

El hash de toda esta información está aquí abajo, y comienza con cuatro ceros. Ese es un hash relativamente inusual: la mayoría de ellos no van a comenzar con cuatro ceros de esa manera. Pero este sí, y debido a que lo hace, de manera totalmente arbitraria, voy a decir que este bloque está "firmado".

¿Qué pasaría si cambiara alguna parte de esta información? Digamos que escribo algo aquí: el hash va a cambiar, y ¿cuál es la probabilidad de que comience con cuatro ceros? Bastante baja. Solo voy a decir "hola": miren eso, este hash no comienza con cuatro ceros y el fondo se ha vuelto rojo. Así que ahora saben que este bloque con esta información no es un bloque válido o firmado.

Ahí es donde entra en juego el nonce. El nonce es solo un número que pueden configurar para intentar encontrar un valor que haga que el hash comience con cuatro ceros nuevamente. Podría sentarme aquí todo el día escribiendo números, pero tengo este pequeño botón "Minar". Lo que va a pasar cuando lo presione es que recorrerá todos los números desde el 1 en adelante para intentar encontrar uno donde el hash comience con cuatro ceros. Este proceso se llama minería.

Se detuvo en 59.396, y da la casualidad de que ese produce un hash que comienza con cuatro ceros. Satisface mi definición de lo que es un bloque firmado.

#### Cadena de bloques (5:16) {#blockchain-516}

Entonces, ¿pueden decirme qué es una cadena de bloques? Probablemente sea solo una cadena de estos bloques. Aquí está mi cadena de bloques: el bloque número uno tiene un nonce igual que antes, un área de datos, pero luego tiene este campo "anterior" que es un montón de ceros. Avanzando, este es el bloque dos, el bloque tres, el bloque cuatro: esta cadena de bloques tiene cinco bloques.

El campo "anterior" para cada bloque es el hash del bloque anterior. Pueden ver que cada bloque apunta hacia atrás al anterior. Ese primer bloque no tiene anterior, así que es solo un montón de ceros.

¿Qué pasa si cambio alguna información aquí? Va a cambiar el hash de este bloque y lo invalidará. Pero, ¿qué pasa si cambio algo en un bloque anterior? Va a cambiar ese hash, pero ese hash se copia en el campo "anterior" del siguiente bloque, por lo que rompe ambos bloques. Podemos retroceder todo lo que queramos a algún punto en el pasado y romper ese bloque, y romperá todos los bloques desde entonces. Todo lo anterior sigue siendo verde, pero todo lo posterior se vuelve rojo.

Si voy y cambio el último bloque, todo lo que tengo que hacer es volver a minar ese bloque. Si retrocedo mucho en el tiempo y hago un cambio, tengo que minar este, este, este y este. Cuantos más bloques pasan, más y más difícil es hacer un cambio. Así es como una cadena de bloques resiste la mutación: resiste el cambio.

#### Cadena de bloques distribuida (9:18) {#distributed-blockchain-918}

Entonces, ¿cómo sabría si mi cadena de bloques ha sido re-minada? Ahora tenemos una cadena de bloques distribuida. Se ve exactamente como la última cadena de bloques, pero este es el Par A. Si bajan aquí, pueden ver el Par B, y tiene una copia exacta de la cadena de bloques. También hay un Par C: esto podría seguir para siempre. Hay muchos pares en internet, y todos tienen una copia completa de la cadena de bloques.

Si miro este hash, es `e4b`. Si bajo al siguiente, también tiene `e4b`. Deben ser idénticos. Ahora, si voy aquí y escribo algo, vuelvo a minar este bloque y luego mino los siguientes bloques, todas las cadenas son verdes. Sin embargo, esta cadena dice que el último hash es `e4b`, la de abajo también dice `e4b`, y esta del medio dice `4cae`.

Así que sé con solo echar un vistazo a este pequeño hash que algo anda mal en esta cadena de bloques. Aunque todos los hashes comienzan con cuatro ceros, este es diferente. Es esencialmente dos contra uno: somos una pequeña democracia aquí. Así que `e4b` gana. Así es como tener una copia completamente distribuida en muchas computadoras diferentes permite ver rápidamente si todos los bloques son idénticos.

Las cadenas de bloques pueden tener 400.000 o 500.000 bloques muy fácilmente. En lugar de revisarlos todos, todo lo que realmente tienen que hacer es mirar el hash del más reciente, y pueden ver si algo en el pasado fue alterado.

#### Tokens (12:17) {#tokens-1217}

Eso es todo: no hay nada más que eso. Pero en cierto modo no es realmente útil porque no tenemos nada en el área de datos que signifique algo. Lo que realmente queremos es un token.

Ahora tengo estos tokens: de manera totalmente arbitraria, los llamo dólares. Tenemos veinticinco dólares de Darcy a Bingley, cuatro dólares con veintisiete centavos de Elizabeth a Jane; ya se hacen una idea. Están ocurriendo todas estas transacciones, y simplemente he reemplazado los datos con estas transacciones. Al igual que antes, si bajamos notamos que tenemos todas estas otras copias de la misma cadena de bloques.

Aquí es donde la inmutabilidad es importante. Si cambio algo aquí atrás, el hash va a ser diferente al que está en las otras copias. Es muy importante que si retroceden en el tiempo y cambian algún valor, nos daríamos cuenta. Es muy importante con el dinero que no se pierda el rastro, y ese es el objetivo principal de usar una cadena de bloques: resistir cualquier tipo de modificación a las cosas que han sucedido en el pasado.

Una cosa que mencionaría: no estamos enumerando "Darcy tiene cien dólares y le está dando 25 a Bingley". Solo estamos recordando los movimientos de dinero, no los saldos de las cuentas bancarias. Esto plantea la pregunta: ¿tiene Darcy $25?

#### Transacción Coinbase (14:34) {#coinbase-transaction-1434}

Tenemos un problema en esta versión de la cadena de bloques: en realidad no sabemos si Darcy tiene $25. Así que veamos una transacción Coinbase. Agregamos una transacción Coinbase a nuestros bloques: dice que vamos a inventar cien dólares de la nada y dárselos a Anders. No hay otras transacciones en este bloque porque nadie tenía dinero antes de esto.

En el siguiente bloque, otros cien dólares salen de la nada y van a Anders. Ahora tenemos algunas transacciones: todas son de Anders porque soy el único que tiene dinero en este momento. Le envío diez de mis dólares a Sophie. ¿Tengo diez dólares? Sí: miro hacia atrás y veo que la transacción Coinbase me dio cien, así que tengo al menos diez.

Suman todos estos y no superan los cien. Sigue una regla básica de la moneda: no se puede crear dinero de la nada, y su dispersión está controlada.

Si avanzamos rápidamente en el tiempo, vemos que Jackson le está dando a Alexa dos dólares. ¿Jackson realmente tiene dos dólares? Retrocedemos un bloque y vemos que Emily había recibido diez dólares de Anders y le dio diez a Jackson. Así que Jackson sí tiene el dinero. Podemos retroceder y averiguarlo: ese es uno de los beneficios de tener el campo "anterior".

#### Cierre (16:30) {#closing-1630}

Esa es una cadena de bloques básica que ejecuta una moneda sobre ella. Como saben, las cadenas de bloques tienen muchas copias: todos tienen una copia. Si mutamos algo y lo convertimos en seis dólares, los bloques se vuelven inválidos y no concuerdan con las otras copias. Esto resiste la manipulación, que es lo que se busca para una moneda. Funciona muy bien para cosas que son pequeñas y transaccionales.

Las cadenas de bloques son una forma muy eficiente de manejar el acuerdo sobre lo que ha sucedido en el pasado: esta historia inmutable que se registra con el tiempo. Estamos pasando por alto algunos puntos principales, pero si profundizan en la demostración, hacen clic en estas cosas y juegan con ella, tendrán una idea cada vez mejor de cómo funciona esto.